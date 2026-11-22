# Prompts

Copy-paste, in order. Sections 1 and 2 prepare the repo. Sections 3 and 4 run live.

Syntax: `/jor-...` in Claude and Antigravity; `$jor-...` (or `$jor-stack:jor-...`) in Codex. Replace the prefix for the active provider.

## Figma references

File: `JeHQJzcI84SD9fqPi49Tim`. Page `0:1` contains four TORQ layouts; use section nodes for design context.

- [Desktop, 1600](https://www.figma.com/design/JeHQJzcI84SD9fqPi49Tim/motor-and-pumps-design--Community-?node-id=2-2)
- [Mobile, 390](https://www.figma.com/design/JeHQJzcI84SD9fqPi49Tim/motor-and-pumps-design--Community-?node-id=2-35)
- Desktop live sections: Hero `2:4`, Confidence strip `2:5`, Product collection `2:6`.
- Mobile live sections: Hero `2:37`, Confidence strip `2:38`, Product collection `2:39`.
- Laptop/tablet IDs and inspected style values: [DEMO-PLAN.md, section 1a](DEMO-PLAN.md#1a-figma-source-and-live-scope).
- Demo 2 desktop/mobile variant URLs: pending preparation. Replace both placeholders in section 4 before rehearsal.

## 1. Bootstrap, fresh thread on the work laptop

```
Read docs/DEMO-PLAN.md, especially section 1a and Open items.

Check tooling and report missing items:
- Figma MCP: read design context and screenshots for file JeHQJzcI84SD9fqPi49Tim, Hero 2:4 and Mobile Hero 2:37. Use explicit IDs, not current selection.
- chrome-devtools MCP: confirm availability with standalone Chrome and --isolated=true.
- jor-stack: confirm jor-get-ready and jor-browser-review are available.

Do not scaffold yet.
```

## 2. Scaffold, after approving the style token source

```
Read docs/DEMO-PLAN.md sections 1, 1a, and 2. Prepare the demo-start baseline:

- Vite + React + TypeScript + Tailwind v4.
- Use Figma MCP with file JeHQJzcI84SD9fqPi49Tim. Read section design context and screenshots, including laptop/tablet references where needed.
- Query Variables. The initial desktop query returned {}. If still empty, use explicit style tokens from inspected nodes and document their source; do not claim they are named Figma Variables.
- Download the exact design images into local assets. No temporary MCP URLs in runtime code.
- Build only Navigation and Footer for desktop and mobile. Confirm navigation, hero CTA, and product link destinations during planning; use only available targets.
- Leave empty slots for Hero, Confidence strip, and Product collection. These three sections are the live build.
- Prepare npm run dev for port 5173. Leave server startup to me.

Then:
- Run /jor-verify; choose shared (committed) and set review widths to 390 and 1600.
- Write scripts/demo-reset.sh and scripts/demo-check.sh per the plan; wire npm run demo:reset and npm run demo:check.
- Verify the baseline, then tag demo-start.

Use GitHub account jorsisu and commit identity Jorge Galarza <jgalarzah@gmail.com>.
```

## 3. Demo 1, 30–60, fresh thread

```
/jor-get-ready Read docs/DEMO-PLAN.md section 1a. Use Figma MCP to inspect file JeHQJzcI84SD9fqPi49Tim: desktop Hero 2:4, Confidence strip 2:5, Product collection 2:6; mobile equivalents 2:37, 2:38, 2:39. Build only these three sections in the prepared page, reusing existing tokens and local assets. Read section design context and screenshots. Propose two vertical slices and confirm link destinations and whether the hero is static. Do not implement yet.
```

At each gate:

```
<gate reply 1, written after rehearsal 1>
/jor-to-spec
```

```
<gate reply 2, written after rehearsal 1>
/jor-to-tickets
```

```
<gate reply 3, written after rehearsal 1>
/jor-implement both approved tickets
```

```
do not commit
/jor-browser-review http://localhost:5173 at 390 and 1600
```

Review the three live sections against matching Figma references. Check hero CTAs, pump crop and caption, confidence items, and product card stacking. Use the running server and standalone Chrome DevTools MCP with --isolated=true.

## 4. Demo 2, 60–75, fresh thread

Prepare both variant node URLs first. The original hero already has two CTAs; the change is its layout.

```
/jor-get-ready Read docs/DEMO-PLAN.md section 1a. The hero layout changed. Use Figma MCP to read <demo-2-desktop-node-url> and <demo-2-mobile-node-url>, including screenshots. Update src/components/Hero.tsx to match, reusing tokens and local assets. Keep Confidence strip and Product collection in scope only for regression checks. Propose the change first.
```

```
<gate reply, written after rehearsal>
/jor-implement
```

```
do not commit
/jor-browser-review http://localhost:5173 at 390 and 1600
```
