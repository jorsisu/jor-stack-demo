# jor-stack-demo

Live demo project for the [jor-stack](https://github.com/jorsisu/jor-stack) front-end workflow: Figma design to reviewed component, driven by jor-stack skills in T3 Code.

Design source: [Motor and Pumps / TORQ](https://www.figma.com/design/JeHQJzcI84SD9fqPi49Tim/motor-and-pumps-design--Community-?node-id=0-1). Live scope: Hero, Confidence strip, and Product collection, reviewed at 390 and 1600 px.

## `demo-start` baseline

- **Stack:** Vite + React + TypeScript + Tailwind v4 (`npm run dev` on `http://localhost:5173`, `strictPort: true`).
- **Prepared design system & shell:** explicit Figma style tokens in [`src/styles/tokens.css`](src/styles/tokens.css), four scoped local `.jpg` assets in [`src/assets/images/`](src/assets/images/index.ts), responsive [`Navigation`](src/components/Navigation.tsx) and [`Footer`](src/components/Footer.tsx), and empty live-demo slots (`#hero`, `#confidence`, `#solutions`) in [`src/App.tsx`](src/App.tsx).
- **Verification & demo scripts:** shared project verification skill at [`.agents/skills/verify-jor-stack-demo/`](.agents/skills/verify-jor-stack-demo/SKILL.md) (trimmed to `390` and `1600` px), `npm run typecheck`, `npm run build`, `npm run demo:check`, and `npm run demo:reset`.

See [docs/DEMO-PLAN.md](docs/DEMO-PLAN.md) and [docs/PROMPTS.md](docs/PROMPTS.md).
