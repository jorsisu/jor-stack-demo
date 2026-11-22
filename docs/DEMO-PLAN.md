# jor-stack live demo plan

Segment 30–60 and 60–75 of a 90 minute talk to UI/UX students.

**Thesis**: we are no longer responsible for writing the code, we are responsible for the outcome. The gates in the workflow are where that responsibility lives.

| Demo | Slot | Path | What it proves |
| --- | --- | --- | --- |
| 1. Figma to three sections | 30–60 | `get-ready` → `to-spec` → `to-tickets` → `implement` → `browser-review` | The full workflow: investigation, agreed spec, vertical slices, implementation, visual proof |
| 2. Design change to component | 60–75 | `get-ready` → `implement` → `browser-review` | The workflow has gears. Change is the real job, and the short path is cheap |

Grok bugfix demo: dropped. It tells a story demo 1 and 2 already tell.

---

## 1. Decisions already locked

- Harness: T3 Code. Provider decided on the day.
- Stack: Vite + React + TypeScript + Tailwind v4, new public repo `jorsisu/jor-stack-demo`.
- Repo arrives at minute 30 **pre-scaffolded**: tokens from verified Figma styles, Navigation and Footer built, with empty slots for Hero, Confidence strip, and Product collection. Jorge prepares and approves the project and design system before the demo.
- Design: the selected Motor and Pumps community file, with TORQ layouts. Demo 1 builds three sections from the existing design; demo 2 needs a separate hero variant. See section 1a.
- Everything runs live. Only Jorge's half of the dialogue is pre-written and pasted.
- No planted failures. Real ones get handled on stage.
- English throughout for prompts, artifacts and code. Narration in Spanish.
- Demo 2 runs in a **fresh thread**.
- `verify-jor-stack-demo` is committed, not private, so it travels in the clone.

---

## 1a. Figma source and live scope

Source: [Motor and Pumps / TORQ](https://www.figma.com/design/JeHQJzcI84SD9fqPi49Tim/motor-and-pumps-design--Community-?node-id=0-1&p=f&m=dev). File key: `JeHQJzcI84SD9fqPi49Tim`. Page: `0:1`.

Verified through Figma MCP on 2026-11-21: page metadata, desktop and mobile Hero design context with screenshots, desktop Product collection design context with screenshot, and desktop Variables query. The page URL is an entry point; `get_design_context` on `0:1` returned a selection error. Use the section IDs below for design context. No Figma edits were made.

| Reference | Full frame | Hero | Confidence strip | Product collection |
| --- | --- | --- | --- | --- |
| Desktop · 1600 | `2:2` | `2:4` | `2:5` | `2:6` |
| Laptop · 1366 | `2:13` | `2:15` | `2:16` | `2:17` |
| Tablet · 834 | `2:24` | `2:26` | `2:27` | `2:28` |
| Mobile · 390 | `2:35` | `2:37` | `2:38` | `2:39` |

The full page has ten sections: Navigation, Hero, Confidence strip, Product collection, Expertise, Featured project, How we help, Questions, Contact, Footer. Keep all four source layouts intact.

**Demo 1 scope:** Hero + Confidence strip + Product collection. Prepare only Navigation and Footer before the talk. Omit Expertise, Featured project, How we help, Questions, and Contact from the demo page. Confirm destinations for navigation, hero CTAs, and product links during planning; use only available targets. Limit live implementation to two proposed slices:

1. Hero + Confidence strip, responsive and with working section links.
2. Product collection: Electric motors, Submersible pumps, Surface pumps; three columns on desktop and stacked cards on mobile. Agree link destinations during the proposal gate; do not invent product routes.

**Design details already read:** the hero says “A steady force. For every flow.” Text and pump image sit side by side on desktop; mobile stacks text, the two CTAs, and the image. The pump has a caption below it. Both CTAs already exist: “Explore solutions” and “Talk to an expert”. The `01 / 03` label alone does not establish carousel behavior; confirm that at the proposal gate.

**Token source:** `get_variable_defs` on desktop `2:2` returned `{}`. Named Variables and bindings are not confirmed. Use the inspected styles as explicit scaffold tokens unless a later Variables query supplies bindings: Inter; dark green `#183c34`, accent `#387557`, muted text `#66766d`, light surface `#ebefe5`, light text `#fbfbf7`, outline `#a3b5a4`, card border `#dee4d9`, white card surface. Hero heading: 76 px desktop, 45 px mobile; radius: 16 px showcase, 6 px CTA, 10 px product card. These values come from node styles, not a Variables export.

**Assets:** use the exact pump and product photographs from design context. Download them locally during preparation. Refresh expired MCP URLs when needed; never commit temporary URLs or use design screenshots as page assets.

**Review widths:** 390 and 1600, matching the source frames. Read laptop/tablet section context during preparation to establish responsive rules. Check 360, 834, and 1366 during rehearsal if needed; the live review stays at two widths.

**Demo 2 source:** pending. No separate hero change frame appears in the page metadata. Before rehearsal, prepare a centered hero variant at 1600 and 390, preserving copy, tokens, assets, and both CTAs. Record its exact node URLs in this plan and the prompts. Do not treat the existing mobile layout as the design change.

---

## 1b. Token budget

Two rehearsals plus the live run is roughly 2.5 hours of agent work, against 5 hour usage windows.

- Rehearse **the day before**, never the same day.
- No scaffolding, verify skill generation, or fixes on the demo machine within 5 hours of going on stage.

Token levers, in order of effect:

1. **Read section nodes, not the whole page.** Use the three scoped section IDs at desktop and mobile widths. Fetch laptop/tablet nodes only to resolve a responsive question. A full TORQ page read includes seven sections outside the live build.
2. **Fresh thread for demo 2.** Context size drives burn more than call count.
3. **Two breakpoints, one browser review.** `jor-browser-review` delegates a subagent with its own fresh context, so it is the most expensive single step.
4. **Small repo.** Pre-scaffolded means few files to explore. No example pages, no component library.
5. **No `/compact`, no retries.** If a step fails, go to the recording rather than re-running live.

### Provider fallback: Antigravity, Codex, Cursor

Running out of tokens means switching provider, not stopping. But T3 Code runs each provider in an **isolated profile** (`~/.t3/userdata/providers/<provider>/<id>/`) with its own config and its own per-conversation MCP directory. **MCP servers are scoped per provider profile.** Figma MCP and chrome-devtools configured for Claude threads do not exist in an Antigravity thread.

Preconditions for each fallback provider, all before the talk:

1. jor-stack skills linked for that provider. The install doc covers Claude (`~/.claude/skills`) and Antigravity (`~/.gemini/config/skills`); Codex reads the `agents/openai.yaml` files in the repo.
2. Figma MCP and chrome-devtools MCP configured in that provider's profile. Without them the fallback cannot read the frame or run browser review, which is most of the demo.
3. Invocation syntax: Codex uses `$jor-...` or `$jor-stack:jor-...`, not `/jor-...`.

A provider switch needs a new thread, so switch only at a **demo boundary**, between demo 1 and demo 2. Never mid `implement`.

---

## 2. What travels in git, and what does not

**Built on the planning machine, pushed, cloned on the demo machine:**

- the Vite app, style tokens, Navigation, Footer, and empty slots for the three live sections; local design assets
- `.agents/skills/verify-jor-stack-demo/SKILL.md`, with `breakpoints` trimmed to **390 and 1600** only
- `scripts/demo-reset.sh` and `scripts/demo-check.sh`, wired as `npm run demo:reset` and `npm run demo:check`
- this plan, and `DEMO.md`

**Cannot travel. Manual checklist on the demo machine:**

1. Figma file accessible to the account used by MCP. Figma desktop signed in if using its local MCP server.
2. Figma MCP enabled and reachable. Smoke test: read Hero `2:4` and Mobile Hero `2:37` by file key and node ID, including screenshots. Confirm real output.
3. `chrome-devtools` MCP configured **in T3 Code**. `docs/t3code-install.md` line 5 in the jor-stack repo: standalone skill links do **not** load `jor-stack/mcp.json`, so browser tooling is configured separately. `jor-browser-review` reports a blocker and stops if this is missing.
4. `jor-stack` skills linked per that install doc, verified with `/jor` in the picker.
5. Node, `npm install` done, `npm run dev` confirmed on `http://localhost:5173`.
6. Two full rehearsals passed, the second one recorded.

---

## 3. Stage setup

- Split screen: terminal left, Chrome right. Chrome comes to the foreground for browser review, which is the only part of this demo that is visually self-evident to a design audience.
- Vite already running in a separate terminal that is never touched on stage.
- Browser review uses an isolated browser context so personal tabs and sessions never reach the projector.
- Figma desktop open on a second display, desktop frame `2:2` visible, with the separate demo 2 hero variant ready on the second display.
- Recording of the final successful rehearsal, one keystroke away, on the second display.
- Large terminal font. Maximized window.

### Preconditions, run privately at minute 29 via `npm run demo:check`

- Vite responding on 5173
- `.scratch/` absent
- git at tag `demo-start`, clean tree
- `chrome-devtools` MCP reachable
- Figma MCP reachable
- exact demo 1 node URLs available; demo 2 variant URLs recorded

---

## 4. Demo 1 runbook, 30–60

Target: 25 minutes of agent work, 5 of slack. Audience questions during agent wall time are free minutes, use them.

### 4.1 Open

Open the TORQ desktop reference. In a fresh thread, use explicit node URLs so MCP does not depend on the current selection:

```
/jor-get-ready Read docs/DEMO-PLAN.md section 1a. Use Figma MCP to inspect file JeHQJzcI84SD9fqPi49Tim: desktop Hero 2:4, Confidence strip 2:5, Product collection 2:6; mobile equivalents 2:37, 2:38, 2:39. Build only these three sections in the prepared page, reusing existing tokens and local assets. Read section design context and screenshots. Propose two vertical slices and confirm link destinations and whether the hero is static. Do not implement yet.
```

Narration while it works: what `get-ready` is and is not. It investigates and proposes. It is not authorized to change a single file. That restriction is the first gate.

### 4.2 Gate 1, after the proposal

Read the proposal against your own intent out loud. Name one thing you are checking: does the scope match what you asked, did it find the tokens, did it pick the right patterns. Then paste the prepared reply.

> Gate reply 1: written after rehearsal 1.

```
/jor-to-spec
```

### 4.3 Gate 2, test seams

`jor-to-spec` confirms the seams it intends to test at, then writes `.scratch/<slug>/spec.md`, which is git excluded by design. Show the file on screen. Most of the room has never seen a spec generated from a design.

> Gate reply 2: written after rehearsal 1.

```
/jor-to-tickets
```

### 4.4 Gate 3, the ticket breakdown

This is the gate that carries the thesis. `jor-to-tickets` quizzes granularity, blocking edges, and whether to merge or split, and it iterates until approved. Aim for **two vertical slices**; the exact shape depends on the design. Explain tracer bullets here: each slice cuts a narrow but complete path through every layer, and a finished slice is shippable on its own.

Exercise judgment visibly. If the breakdown deserves a correction, make it.

> Gate reply 3: written after rehearsal 1, once the real breakdown is known.

### 4.5 Implement

**One** `implement` call covering both tickets. `jor-implement` auto chains `jor-peer-review` before declaring done, so per ticket means two review cycles and roughly double the time and tokens for nothing the room learns twice.

```
/jor-implement both approved tickets
```

Say out loud: normally these land one at a time with a ship in between; here they are batched for time.

Narration while it works: the gate it will stop at next, and what peer review is doing. This is the longest block, 4 to 6 minutes. Take questions.

### 4.6 Gate 4, commit

> Gate reply 4: `do not commit`

### 4.7 Browser review

Once, at the end, two widths.

```
/jor-browser-review http://localhost:5173 at 390 and 1600
```

Say out loud: it normally checks five widths; this is scoped to two for time, and it is configurable. Bring Chrome to the foreground. The room watches the viewport snap from 390 to 1600 and the hero and product cards reflow.

Read the Human verification section aloud. If the 390 screenshot shows overflow or desktop spacing, that is the whole argument in one frame: the code ran, the checks passed, the outcome was still wrong, and a human noticed. Describe the problem and let the agent fix it. Do not fix it yourself.

### 4.8 Close demo 1

The three completed sections are on screen next to their Figma references. Point at the match. Name what was human: the project setup, the design system, the scope decision, the ticket correction, the visual judgment.

---

## 5. Demo 2 runbook, 60–75

In the prepared Figma variant: the desktop hero changes from side-by-side text and image to centered text above the pump showcase. Preserve the existing eyebrow, copy, caption, and both CTAs. Use the corresponding mobile variant as the responsive target. This cannot be faked by swapping a variable, so the agent has to read the new frame and rewrite the component's structure. The design changed, not the prompt, and the outcome followed.

**Fresh thread.** `get-ready` starts cold, so the opening line points at both the new frame and the existing component path.

```
/jor-get-ready Read docs/DEMO-PLAN.md section 1a. The hero layout changed. Use Figma MCP to read <demo-2-desktop-node-url> and <demo-2-mobile-node-url>, including screenshots. Update src/components/Hero.tsx to match, reusing tokens and local assets. Keep Confidence strip and Product collection in scope only for regression checks. Propose the change first.
```

Then, after the proposal gate:

```
/jor-implement
/jor-browser-review http://localhost:5173 at 390 and 1600
```

The point to land: no spec, no tickets. One component, a known change, so the short path is the right path. Choosing which gates to skip **is** the responsibility being claimed. Six to eight minutes against twenty five for the initial build; that ratio is the argument for the whole approach.

---

## 6. Rehearsal protocol

1. `npm run demo:reset`: `git reset --hard demo-start`, `git clean -fdx`, and `rm -rf .scratch` explicitly. `.scratch/` is in `.git/info/exclude`, so it is **ignored, not untracked**, and `git clean -fd` will not remove it. `jor-to-spec` reuses an existing `.scratch/<slug>/` when one matches, which means a stale rehearsal spec would be silently reused on stage.
2. Rehearsal 1, cold, nothing scripted. Capture the real proposal, spec, and ticket breakdown.
3. Write gate replies 1 to 3 from what actually came back.
4. `npm run demo:reset`. Rehearsal 2, with the scripted replies, timed per segment. Record it.
5. Copy the final spec and tickets verbatim into `DEMO.md`.
6. `npm run demo:reset`. Leave the repo at `demo-start`.

Timings to record per segment in rehearsal 2, so the cut decisions on the day are informed rather than guessed.

---

## 7. Abort paths

| Failure | Response |
| --- | --- |
| Figma MCP will not connect | Switch to the recording. Do not debug MCP on stage. |
| Out of tokens mid `implement` | Switch to the recording at the point reached. Do not switch provider mid step; a provider switch needs a new thread, so only do it at a demo boundary. |
| `browser-review` reports Chrome DevTools MCP unavailable | Skip to the Figma and browser side by side comparison manually, then the recording for the review leg. |
| Demo 1 overruns | Eat into 60–75. Demo 2 is 15 minutes and the agenda has no hard boundary there. |
| Generated output is visibly wrong | Do not fix it by hand. Describe the problem, send it back, re-run. That is the demo. |

---

## 8. Takeaway for the room

Public repo with the final code, the `verify-jor-stack-demo` skill, and `DEMO.md` listing the skills in order, the exact prompts used, and the resulting spec and tickets copied verbatim.

For this audience the valuable artifact is not the React code, it is seeing what a spec and a ticket breakdown generated from a design actually look like, and a written down repeatable way to prove a UI works. Most of them have never seen either.

---

## 9. Open items

- [x] Select the Figma source and read its structure, desktop/mobile Hero, and desktop Product collection through MCP.
- [x] Read remaining scoped section context at mobile/tablet/laptop widths during scaffold preparation.
- [ ] Prepare the demo 2 centered hero variant at 1600 and 390; record both node URLs.
- [x] Confirm whether named Variables should be added in Figma; otherwise approve the explicit style token map in section 1a.
- [x] Scaffold with verified style tokens, local assets, Navigation, Footer, and the three live section slots.
- [x] Generate `verify-jor-stack-demo` with `/jor-verify`, answer **shared** when it asks, trim breakpoints to 390 and 1600.
- [x] Write `demo-reset.sh` and `demo-check.sh`.
- [x] Tag `demo-start`.
- [ ] Demo machine setup checklist, section 2.
- [ ] Two rehearsals, second one recorded.
- [ ] Gate replies 1 to 3.

Unresolved: demo 2 node URLs; product link destinations; static hero or carousel.
