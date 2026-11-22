# Live demo slots

Live demo slots are the three prepared section placeholders (`#hero`, `#confidence`, and `#solutions`) inside `main#main-content` on `/` that remain empty at `demo-start` and receive live implementations during Demo 1 and Demo 2.

## Sub-features

- `slots-baseline-anchors` confirms `#hero[data-slot="hero"]`, `#confidence[data-slot="confidence-strip"]`, and `#solutions[data-slot="product-collection"]` exist in DOM order inside `main#main-content` so Navigation and Footer hash links resolve at `demo-start`.
- `slots-live-demo-1` hosts Hero (`2:4` / `2:37`), Confidence strip (`2:5` / `2:38`), and Product collection (`2:6` / `2:39`) once built live.
- `slots-live-demo-2` hosts the updated centered Hero variant inside `#hero` while preserving `#confidence` and `#solutions` against regressions.

## How to get to it (user POV)

- Load `/` (`http://localhost:5173/`) to observe `Navigation`, `main#main-content`, and `Footer` framing the live demo region.
- Click `Skip to main content`, `Solutions`, `Our expertise`, or `About torq.` to target `#main-content`, `#solutions`, `#confidence`, or `#hero`.

## Driving it with Chrome DevTools MCP

Preconditions:

- `doctor` reports TORQ healthy at `http://localhost:5173/`.

- **Verify prepared slot DOM structure.** On `/` at `1600` px (`navigate_page` / `wait_for` `"Motors. Pumps. People who know."`), run read-only `evaluate_script` (`waitForStableDom: false`, `() => Array.from(document.querySelectorAll('main#main-content > section[data-slot]')).map((el) => ({ id: el.id, slot: el.getAttribute('data-slot'), childCount: el.childElementCount }))`). At `demo-start`, confirm the three sections appear in order (`hero`, `confidence-strip`, `product-collection`) with `0` child elements; after Demo 1/2 implementation, confirm each slot is populated and inspect its accessibility snapshot and screenshots against Figma.
- **Verify anchor resolution at `demo-start`.** Click `Solutions` (or mobile `Solutions`) and `Our expertise` (at `1600` px), verifying `window.location.hash` updates to `"#solutions"` and `"#confidence"` with `0` console errors.
- **Breakpoints.** Capture `/` at `390` and `1600` via `breakpoints` (`fullPage: true`). Confirm `main#main-content` holds its `min-h-dvh` flex layout with header at top, footer at bottom, and `0` horizontal overflow.

## Gotchas

- At `demo-start`, the three `<section>` slots are intentionally empty (`childCount: 0`); do not report empty slots as a bug at `demo-start`, and do not treat `demo-start` screenshots as proof of Demo 1 or Demo 2 content.
- Once Demo 1 or Demo 2 populates `#hero`, `#confidence`, and `#solutions`, run `/jor-verify-maintain` or update this feature file if explicit interactive assertions (hero CTAs, product card links, responsive stacking) are added.
