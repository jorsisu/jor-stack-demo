# Prompts

Copy-paste, in order. Sections 1 and 2 are setup on the work laptop. Sections 3 and 4 are the live demo.

## 1. Bootstrap, fresh thread on the work laptop

```
Read docs/DEMO-PLAN.md in this repo. We are picking up at section 9, Open items.

First, verify this session's tooling and report what is missing, nothing else:
- Figma Dev Mode MCP: is it reachable, and can you read a selected frame?
- chrome-devtools MCP: is it reachable?
- jor-stack skills: does the picker list /jor-get-ready and /jor-browser-review?

Do not scaffold anything yet.
```

## 2. Scaffold, once the Figma file is clean and the Variables are exported

```
Read docs/DEMO-PLAN.md. Scaffold this project per section 1 and section 2:

- Vite + React + TypeScript + Tailwind v4
- design tokens mirroring the Figma Variables below
- nav and footer built to match the design
- one page, visibly empty where the hero will land
- npm run dev on 5173

Then:
- run /jor-verify, answer shared (committed) when it asks about visibility, and trim breakpoints to 360 and 1280 only
- write scripts/demo-reset.sh (git reset --hard demo-start, git clean -fdx, rm -rf .scratch) and scripts/demo-check.sh (preconditions in section 3), wired as npm run demo:reset and npm run demo:check
- tag demo-start

Figma Variables:
<paste the name to value list here>
```

## 3. Demo 1, 30–60, fresh thread

Landing page frame selected in Figma desktop first.

```
/jor-get-ready build the landing page from the selected Figma frame into this project, matching the existing design tokens
```

Then at each gate:

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
/jor-browser-review http://localhost:5173 at 360 and 1280
```

## 4. Demo 2, 60–75, fresh thread

Restructured hero frame selected in Figma desktop first.

```
/jor-get-ready the hero design changed. Read the selected Figma frame and update src/components/Hero.tsx to match
```

```
<gate reply, written after rehearsal>
/jor-implement
```

```
/jor-browser-review http://localhost:5173 at 360 and 1280
```
