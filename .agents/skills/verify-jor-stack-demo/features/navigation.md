# Navigation

Navigation provides the persistent TORQ header across `/` with a keyboard skip link, brand home link, desktop primary links and `Let’s talk` CTA, and an accessible mobile `MENU` drawer at narrow viewports.

## Sub-features

- `nav-skip-link` moves keyboard focus to `main#main-content` via `Skip to main content`.
- `nav-desktop-links` exposes `Primary` section links (`Solutions`, `Our expertise`, `Projects`, `About us`) and `Let’s talk` at desktop width (`1600` px).
- `nav-mobile-drawer` toggles the `#mobile-primary-nav` `Mobile` navigation via `MENU` at mobile width (`390` px), closes on link click, and closes on `Escape` while restoring focus to `MENU`.
- `nav-responsive` keeps header controls single-row without clipping or horizontal overflow at `390` and `1600` px.

## How to get to it (user POV)

- Load `/` (`http://localhost:5173/`) at desktop width (`1600` px) to see the header brand link, `Primary` navigation, and `Let’s talk` CTA.
- Load `/` at mobile width (`390` px) to see the brand link and `MENU` toggle button, and activate `MENU` to open the `Mobile` navigation drawer.
- Press `Tab` from the top of `/` to reveal and activate `Skip to main content`.

## Driving it with Chrome DevTools MCP

Preconditions:

- `doctor` reports TORQ healthy at `http://localhost:5173/`.

- **Desktop navigation (`1600` px).** Call `emulate` with `viewport: "1600x900x1"`, `navigate_page` (`type: "reload"`), `wait_for` (`text: ["Motors. Pumps. People who know."]`, `visible: true`), and `take_snapshot`. Confirm `banner` contains `navigation "Primary"` with links `Solutions`, `Our expertise`, `Projects`, `About us`, plus `link "Let’s talk"` and no `button "MENU"`.
- **Skip link (`nav-skip-link`).** From the top of `/`, press `Tab` (`press_key` `key: "Tab"`) to focus `link "Skip to main content"`, then `press_key` (`key: "Enter"`), or `click` the `uid` of `link "Skip to main content"`. Confirm via read-only `evaluate_script` (`waitForStableDom: false`, `() => ({ hash: window.location.hash, activeId: document.activeElement?.id })`) that `hash` equals `"#main-content"` and `activeId` equals `"main-content"`.
- **Desktop CTA anchor.** `click` the `uid` of `link "Let’s talk"`. Confirm via read-only `evaluate_script` (`waitForStableDom: false`) that `window.location.hash` equals `"#footer"`.
- **Mobile closed state (`390` px).** Call `emulate` with `viewport: "390x900x1,mobile,touch"`, `navigate_page` (`type: "url"`, `url: "http://localhost:5173/"`), `wait_for` (`text: ["Motors. Pumps. People who know."]`, `visible: true`), and `take_snapshot`. Confirm `button "MENU"` is visible (`expanded` false / not expanded) and `navigation "Primary"` and `navigation "Mobile"` are absent.
- **Mobile drawer open.** `click` the `uid` of `button "MENU"`, then `take_snapshot`. Confirm `button "MENU"` is expanded and `navigation "Mobile"` renders `Solutions`, `Our expertise`, `Projects`, `About us`, and `Let’s talk`. Capture `home-mobile-menu-open-390.png` with `take_screenshot` (`fullPage: true`).
- **Keyboard Escape close & focus return.** Call `press_key` (`key: "Escape"`), then `take_snapshot` and read-only `evaluate_script` (`() => ({ menuOpen: Boolean(document.querySelector('#mobile-primary-nav')), activeText: document.activeElement?.textContent?.trim() })`). Confirm `menuOpen` is `false` and `activeText` starts with `"MENU"`.
- **Mobile link click close.** `click` `button "MENU"`, `take_snapshot`, then `click` `link "Solutions"` inside `navigation "Mobile"`. Call `take_snapshot` and read-only `evaluate_script` to confirm `#mobile-primary-nav` is closed and `window.location.hash` equals `"#solutions"`.
- **Breakpoints.** Capture `breakpoints` on `/` at `390` and `1600` for `default`, plus `mobile-menu-open` at `390` after opening `MENU`. Verify `document.documentElement.scrollWidth <= window.innerWidth` and `0` console errors at each width.

## Gotchas

- `Our expertise`, `Projects`, and `About us` in `Primary` use `hidden laptop:block` (`>= 1366px`); at tablet width only `Solutions` and `Let’s talk` appear in the desktop bar, whereas `1600` px shows all four links.
- The CTA label uses a curly apostrophe (`Let’s talk`, U+2019 `’`), not an ASCII straight apostrophe (`'`).
- On `< 834px` (`390` px), the `MOTORS & PUMPS` subtitle under `torq.` is hidden (`hidden tablet:block`), so the brand link accessible name changes between `390` and `1600` px.
- Resize across `>= 834px` automatically closes an open mobile drawer (`matchMedia('(min-width: 52.125rem)')`); re-open `MENU` after reloading at `390` px when capturing `mobile-menu-open`.
