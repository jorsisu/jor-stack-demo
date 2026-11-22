# Footer

Footer renders the bottom `contentinfo` landmark on `/` with the TORQ brand summary, `Explore` internal section links, `Get in touch` `mailto:` links, and the copyright/legal bar across desktop and mobile layouts.

## Sub-features

- `footer-brand` renders `torq.` (`#hero`), `Motors. Pumps. People who know.`, and the two-line description.
- `footer-explore-links` navigates to `#solutions` (`Our solutions`, `Projects`), `#confidence` (`Our expertise`), and `#hero` (`About torq.`).
- `footer-contact-links` exposes valid `mailto:hello@torq.example` links (`Discuss a project`, `Service & support`, `hello@torq.example`) without navigating away or throwing errors.
- `footer-responsive` reflows the brand block and `Explore` / `Get in touch` columns from two-column side-by-side (`1600` px) to stacked (`390` px) with no overflow.

## How to get to it (user POV)

- Scroll to the bottom of `/` (`http://localhost:5173/`), or activate `About us` / `Let’s talk` in the header to jump to `#footer`.

## Driving it with Chrome DevTools MCP

Preconditions:

- `doctor` reports TORQ healthy at `http://localhost:5173/`.

- **Inspect footer structure (`1600` px).** Call `emulate` with `viewport: "1600x900x1"`, `navigate_page` (`type: "reload"`), `wait_for` (`text: ["Motors. Pumps. People who know."]`, `visible: true`), and `take_snapshot`. Confirm `contentinfo` contains `navigation "Footer"`, headings `Explore` and `Get in touch`, legal notice `© 2026 torq. Motors & pumps.`, and `Privacy / Terms`.
- **Drive internal Explore anchor.** From `#footer` (after clicking `Let’s talk` or navigating to `/#footer`), `click` the `uid` of `link "About torq."` inside `navigation "Footer"`, then verify via read-only `evaluate_script` (`waitForStableDom: false`) that `window.location.hash` equals `"#hero"`.
- **Verify contact link targets without triggering OS mail client.** Do not click `mailto:` links blindly if an OS handler steals focus; inspect their rendered attributes via read-only `evaluate_script` (`() => Array.from(document.querySelectorAll('#footer nav a[href^="mailto:"]')).map((a) => ({ text: a.textContent?.trim(), href: a.getAttribute('href') }))`) and confirm all three `Get in touch` links point to `hello@torq.example`.
- **Breakpoints.** Capture `breakpoints` on `/` at `390` and `1600` (`fullPage: true` includes the full footer on `home-default-390.png` and `home-default-1600.png`). Confirm no overlapping columns, wrapped `Privacy  /  Terms` breaks, or horizontal overflow.

## Gotchas

- `Explore` links `Our solutions` and `Projects` intentionally both target `#solutions` in the single-page baseline because dedicated project/product sub-routes are out of scope for the live demo.
- `Privacy  /  Terms` is static text in the baseline footer (`<p>`), not a link; do not expect interactive links there.
- Clicking `mailto:` links can invoke an external OS mail client; verify `Get in touch` URLs via snapshot/read-only `evaluate_script` inspection instead of leaving the browser context.
