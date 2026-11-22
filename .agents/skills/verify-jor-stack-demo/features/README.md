# TORQ (`jor-stack-demo`) verification map

This directory is the maintained source for verifying the user-facing behavior of `jor-stack-demo` (TORQ — Motors & Pumps). Read this index before driving the app, then follow the matching feature file.

## Baseline preconditions

- The user's Vite dev server serves TORQ at `http://localhost:5173`. Do not start, stop, or restart it; if `doctor` cannot reach it, report `npm run dev` as the start command and stop.
- Open every run in a fresh isolated context (`new_page` with `isolatedContext: "verify-jor-stack-demo"`) so the user's own tabs and storage stay untouched.
- No auth or database seeding is required.
- Run `doctor` first and require the `torq.` banner wordmark, `Motors. Pumps. People who know.` in the footer, `0` console errors, and `0` failed network requests on load.

## Driving conventions

- Start every recipe from `http://localhost:5173/` (clear any `#hash` when resetting between journeys).
- Take a snapshot before each interaction and use its `uid`s; re-snapshot after every navigation, click, or drawer state change.
- Prefer ARIA roles and literal accessible names over CSS selectors or DOM position.
- Notice literal typography: the header CTA uses a curly apostrophe (`Let’s talk`, U+2019).
- Preserve all proof artifacts during cleanup; remove only isolated browser pages and emulation overrides.

## Proof and skip reporting

- Capture the user action and the resulting state, not only a pre-action or final screenshot.
- UI proof includes a `take_snapshot` `.txt` file, a full-page `.png` screenshot, and `console.txt` / `network.txt` alongside.
- Responsive proof is `breakpoints` on the feature's route at **390** and **1600** px only (matching the Mobile `2:35` and Desktop `2:2` Figma frames).
- Save artifacts under `.scratch/verify/<YYYYMMDD-HHMM>-<feature>/` and record the feature ID and entry point used.
- Report an unreachable path with the attempted entry point and unmet precondition; never report a skipped path as verified through another entry point.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior, followed by exactly four H2 sections in this order:

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point and the route it lives on.
3. `Driving it with Chrome DevTools MCP` starts with `Preconditions:` and uses labeled bullets pairing each user action with the exact tool call and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

## Features

- [Navigation](./navigation.md) covers the skip link, brand link, responsive `Primary` nav, `Let’s talk` CTA, mobile `MENU` drawer, keyboard `Escape` focus return, and 390/1600 layout.
- [Footer](./footer.md) covers the footer brand lockup, `Explore` section links, `Get in touch` `mailto:` links, legal bar, and 390/1600 layout.
- [Live demo slots](./live-demo-slots.md) covers the prepared `#hero`, `#confidence`, and `#solutions` slots in `main#main-content` and anchor link targets at `demo-start`.
