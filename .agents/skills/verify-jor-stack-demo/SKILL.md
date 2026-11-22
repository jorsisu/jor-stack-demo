---
name: verify-jor-stack-demo
description: Verify the TORQ Motors & Pumps web UI (jor-stack-demo) at http://localhost:5173 with scripted typecheck/build checks and Chrome DevTools MCP browser journeys at 390 and 1600 px. Use when explicitly asked to verify or browser-review jor-stack-demo.
disable-model-invocation: true
---

# Verify `jor-stack-demo` (TORQ — Motors & Pumps)

This skill verifies the `jor-stack-demo` web application (`src/`) using non-browser scripted checks (`typecheck`, `build`) and **Chrome DevTools MCP** against the live Vite dev server.

## Session and server rules

- **Browser request required:** Run browser journeys only when the current chat contains an explicit browser verification/review request (an explicit invocation of `verify-jor-stack-demo` or `/jor-browser-review` counts as that request).
- **Server control rule:** Start, stop, or restart dev servers only when the user explicitly requests it, including in worktrees. By default, target the server the user already runs at `http://localhost:5173`; if it isn't up, report `npm run dev` as the exact start command and stop.
- **Tool requirement:** Use **Chrome DevTools MCP** exclusively for browser actions. If Chrome DevTools MCP is unavailable in this session, report the blocker and stop — do not substitute another browser tool.
- **Session isolation:** The dev server runs locally on `http://localhost:5173` and could be inspected simultaneously in the user's own browser. Open every verification run in a fresh isolated browser context (`new_page` with `isolatedContext: "verify-jor-stack-demo"`) so the user's tabs, cookies, and storage stay untouched. Every page-scoped Chrome DevTools MCP tool requires `pageId`.

## Target

- **Base URL:** `http://localhost:5173/` (`vite.config.ts` enforces `port: 5173` and `strictPort: true`).
- **Start command (for the user when down):** `npm run dev`
- **Auth & seed data:** None required. No backend API or database exists; product and photography assets are local Vite imports in `src/assets/images/`.
- **Ready state:** Document title is `torq. — Motors & Pumps`, and the visible DOM renders:
  - `banner` landmark (`<header>`) with the `torq.` wordmark link
  - `main#main-content` landmark containing `#hero`, `#confidence`, and `#solutions`
  - `contentinfo` landmark (`<footer>`) containing `Motors. Pumps. People who know.` and `© 2026 torq. Motors & pumps.`

## `checks`

Run the repo's non-writing static and bundle verification suite from the repository root:

```sh
node .agents/skills/verify-jor-stack-demo/scripts/run-checks.mjs .agents/skills/verify-jor-stack-demo/scripts/checks.json
```

- **Plan (`scripts/checks.json`):**
  - `typecheck`: `npm run typecheck` (`tsc -b --noEmit`) — full TypeScript check across app and Vite config without emitting or mutating source files.
  - `build`: `npm run build` (`tsc -b && vite build`) — verifies production bundling into Git-ignored `dist/` without editing product source or fixtures.
- **Coverage gap:** `package.json` defines no linter or unit/component test runner (`eslint`, `vitest`). Layout, responsive rendering, interactive controls, console errors, and network requests are verified via Chrome DevTools MCP below rather than scripted assertions.
- **Prerequisite:** `.scratch/` must be excluded in Git's local exclude file (`.git/info/exclude`, resolved via `git rev-parse --git-path info/exclude`). The runner verifies exclusion and refuses symlinks before writing logs under `.scratch/verify/checks-*/`.

## `doctor`

Run this read-only health check first, and again whenever anything looks off:

1. Call `list_pages` to confirm Chrome DevTools MCP is responsive and see existing tabs without modifying them.
2. Call `new_page` with `url: "http://localhost:5173/"` and `isolatedContext: "verify-jor-stack-demo"`. Save the returned `pageId`.
3. Call `wait_for` (`pageId`, `text: ["Motors. Pumps. People who know."]`, `visible: true`) to confirm the React tree mounted (not a blank root or infinite load). If the connection fails or times out, stop and report `npm run dev` to the user.
4. Call `take_snapshot` (`pageId`) and verify the app identity: `banner` landmark with `torq.`, `main` landmark, and `contentinfo` landmark with `Explore` and `Get in touch`.
5. Call `list_console_messages` (`pageId`, `types: ["error"]`) — require `0` console errors on load.
6. Call `list_network_requests` (`pageId`) — require `0` failed, blocked, or `4xx`/`5xx` requests on load.

Report `healthy` (with `pageId`) or the exact failing check.

## `breakpoints`

This project intentionally pins browser review widths to **390** and **1600** px only (matching the Mobile `2:35` and Desktop `2:2` Figma reference frames in `docs/DEMO-PLAN.md` sections 1a and 2).

Before running `breakpoints` for a feature state, record the route (`/` -> slug `home`), target UI state slug (`default`, `mobile-menu-open`, etc.), exact UI actions to reach that state, and the visible check confirming the state.

For each width in **`390`**, **`1600`**:

1. Apply the viewport via `emulate` (preferred over `resize_page` so `1600` px does not clamp to smaller physical displays):
   - At `390`: `emulate` with `pageId`, `viewport: "390x900x1,mobile,touch"`
   - At `1600`: `emulate` with `pageId`, `viewport: "1600x900x1"`
2. Reload cleanly via `navigate_page` (`pageId`, `type: "reload"`) and `wait_for` (`pageId`, `text: ["Motors. Pumps. People who know."]`, `visible: true`).
3. Repeat the target state setup using real UI actions (never `evaluate_script` setters).
4. Confirm the target state via `take_snapshot` (`pageId`, optionally saving `.txt` alongside the screenshot). If setup fails at a width, report that width as blocked rather than screenshotting the wrong state.
5. Check horizontal overflow via read-only `evaluate_script` (`pageId`, `waitForStableDom: false`, `function: "() => ({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth, overflowX: document.documentElement.scrollWidth > window.innerWidth })"`) and check `list_console_messages` (`pageId`, `types: ["error"]`).
6. Capture `take_screenshot` with `pageId`, `fullPage: true`, and an absolute `filePath` under `.scratch/verify/<YYYYMMDD-HHMM>-<feature>/<route-slug>-<state-slug>-<width>.png`. If Chrome DevTools MCP rejects `filePath` (`Access denied: ... is not within any of the configured workspace roots`), omit `filePath` so the harness returns/offloads the image, and copy that PNG into `.scratch/verify/<YYYYMMDD-HHMM>-<feature>/<route-slug>-<state-slug>-<width>.png`.

When finished, reset the viewport override by calling `emulate` with `pageId` and omitting `viewport`. Note any horizontal overflow, clipped or wrapped navigation, hidden primary actions, or console errors per width.

## `snapshot`

Capture full state proof into `.scratch/verify/<YYYYMMDD-HHMM>-<feature>/`:

- `take_snapshot` (`pageId`, using an absolute `filePath` to `.scratch/verify/<YYYYMMDD-HHMM>-<feature>/<name>.txt`; if `filePath` returns `Access denied`, omit `filePath` and write the returned inline snapshot tree to `<name>.txt`)
- `take_screenshot` (`pageId`, `fullPage: true`, using an absolute `filePath` to `.scratch/verify/<YYYYMMDD-HHMM>-<feature>/<name>.png`; if `filePath` returns `Access denied`, omit `filePath` and copy the returned/offloaded PNG to `<name>.png`)
- Write `list_console_messages` (`pageId`) and `list_network_requests` (`pageId`) outputs alongside as `console.txt` and `network.txt`.

Use `evaluate_script` (`waitForStableDom: false`) strictly for read-only verification that snapshots cannot observe (for example `document.documentElement.scrollWidth`, `window.location.hash`, `document.activeElement?.textContent`, or `[data-slot]` element presence). Never use `evaluate_script` to mutate application state or trigger UI handlers.

## Drive

Always call `take_snapshot` first to get current `uid`s, prefer ARIA roles and literal accessible names over CSS selectors or coordinates, and re-snapshot after every navigation, click, or state transition (old `uid`s become stale):

- **Header (`banner`):**
  - `link "Skip to main content"` -> `#main-content`
  - Brand `link` (`torq.` on mobile; `torq. MOTORS & PUMPS` at `>= 834px`) -> `#hero`
  - `navigation "Primary"` (visible at `>= 834px`):
    - `link "Solutions"` -> `#solutions` (visible at `>= 834px`)
    - `link "Our expertise"` -> `#confidence` (visible at `>= 1366px`)
    - `link "Projects"` -> `#solutions` (visible at `>= 1366px`)
    - `link "About us"` -> `#footer` (visible at `>= 1366px`)
  - Desktop CTA `link "Let’s talk"` (curly apostrophe U+2019 `’`) -> `#footer` (visible at `>= 834px`)
  - Mobile menu toggle `button "MENU"` (`aria-expanded`, `aria-controls="mobile-primary-nav"`, visible at `< 834px`)
  - Mobile drawer `navigation "Mobile"` (`#mobile-primary-nav`, rendered when `MENU` is expanded): `link "Solutions"`, `link "Our expertise"`, `link "Projects"`, `link "About us"`, `link "Let’s talk"`. Pressing `Escape` (`press_key` `key: "Escape"`) closes the drawer and returns focus to `button "MENU"`.
- **Main (`main#main-content`):**
  - Prepared live-demo section slots: `#hero[data-slot="hero"]`, `#confidence[data-slot="confidence-strip"]`, `#solutions[data-slot="product-collection"]`.
- **Footer (`contentinfo#footer`):**
  - Brand `link "torq."` -> `#hero`
  - `navigation "Footer"` with headings `Explore` and `Get in touch`:
    - `Explore`: `link "Our solutions"` (`#solutions`), `link "Our expertise"` (`#confidence`), `link "Projects"` (`#solutions`), `link "About torq."` (`#hero`)
    - `Get in touch`: `link "Discuss a project"` (`mailto:hello@torq.example?subject=Discuss%20a%20project`), `link "Service & support"` (`mailto:hello@torq.example?subject=Service%20%26%20support`), `link "hello@torq.example"` (`mailto:hello@torq.example`)

## Evidence

- Before writing any artifact under `.scratch/`, confirm local Git exclusion with `git check-ignore --quiet -- .scratch/`. If missing, append `.scratch/` to `"$(git rev-parse --git-path info/exclude)"` — **never** edit `.gitignore`.
- Default folder: `.scratch/verify/<YYYYMMDD-HHMM>-<feature>/`.
- Exercise real user interactions (`click`, `press_key`) rather than internal setters or `evaluate_script` shortcuts.
- Capture both the interaction step and the resulting state (`take_snapshot` + `take_screenshot` + read-only side effects such as `window.location.hash` or `document.activeElement`).

## Cleanup

Run cleanup after every verification pass, including failed or interrupted runs:

1. Reset emulation on each test `pageId`: call `emulate` with `pageId` and no `viewport` override.
2. Close ONLY the pages opened by this run using `close_page` (`pageId`). Note: Chrome DevTools MCP refuses to close the last open tab — since the browser starts with a default `about:blank` tab and this run opens an isolated `new_page`, closing the isolated `pageId` closes only the verification tab. Never close the user's tabs and never stop `npm run dev`.
3. Confirm via `list_pages` that no verification tab remains open, and confirm that `.scratch/verify/` evidence files and check logs still exist on disk (cleanup removes browser tabs/emulation state, never proof artifacts).

## Helpers

- `.agents/skills/verify-jor-stack-demo/scripts/run-checks.mjs` (executable Node runner) + `.agents/skills/verify-jor-stack-demo/scripts/checks.json`:
  ```sh
  node .agents/skills/verify-jor-stack-demo/scripts/run-checks.mjs .agents/skills/verify-jor-stack-demo/scripts/checks.json
  ```

## Feature map

Read [features/README.md](./features/README.md) before driving features, then follow the matching feature recipe:

- [Navigation](./features/navigation.md) — responsive header, skip link, desktop nav/CTA, mobile `MENU` drawer, Escape focus return, and 390/1600 layout.
- [Footer](./features/footer.md) — footer landmarks, anchor links, `mailto:` contact links, legal bar, and 390/1600 stacking.
- [Live demo slots](./features/live-demo-slots.md) — prepared `#hero`, `#confidence`, and `#solutions` slots on `/` and anchor resolution across `demo-start` and live build stages.
