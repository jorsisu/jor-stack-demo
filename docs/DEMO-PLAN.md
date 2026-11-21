# jor-stack live demo plan

Segment 30–60 and 60–75 of a 90 minute talk to UI/UX students.

**Thesis**: we are no longer responsible for writing the code, we are responsible for the outcome. The gates in the workflow are where that responsibility lives.

| Demo | Slot | Path | What it proves |
| --- | --- | --- | --- |
| 1. Figma to landing page | 30–60 | `get-ready` → `to-spec` → `to-tickets` → `implement` → `browser-review` | The full workflow: investigation, agreed spec, vertical slices, implementation, visual proof |
| 2. Design change to component | 60–75 | `get-ready` → `implement` → `browser-review` | The workflow has gears. Change is the real job, and the short path is cheap |

Grok bugfix demo: dropped. It tells a story demo 1 and 2 already tell.

---

## 1. Decisions already locked

- Harness: T3 Code. Provider decided on the day.
- Stack: Vite + React + TypeScript + Tailwind v4, new public repo `jorsisu/jor-stack-demo`.
- Repo arrives at minute 30 **pre-scaffolded**: tokens mirroring the Figma Variables, nav and footer built, a visibly empty page where the hero lands. Setting up the project and the design system is the human's job; what happens after is not.
- Design: a duplicated free Figma file, cleaned up (named layers, auto-layout, Variables), 3 sections.
- Everything runs live. Only Jorge's half of the dialogue is pre-written and pasted.
- No planted failures. Real ones get handled on stage.
- English throughout for prompts, artifacts and code. Narration in Spanish.
- Demo 2 runs in a **fresh thread**.
- `verify-jor-stack-demo` is committed, not private, so it travels in the clone.

---

## 1b. Token budget

Two rehearsals plus the live run is roughly 2.5 hours of agent work, against 5 hour usage windows.

- Rehearse **the day before**, never the same day.
- No scaffolding, verify skill generation, or fixes on the demo machine within 5 hours of going on stage.

Token levers, in order of effect:

1. **Keep the Figma frame simple.** Dev Mode MCP returns the frame's full node tree. A deeply nested, heavily grouped design can return tens of thousands of tokens before any work starts. Flat auto-layout, few groups, three sections. This is the largest and least obvious lever.
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

- the Vite app, tokens, nav, footer, empty page
- `.agents/skills/verify-jor-stack-demo/SKILL.md`, with `breakpoints` trimmed to **360 and 1280** only
- `scripts/demo-reset.sh` and `scripts/demo-check.sh`, wired as `npm run demo:reset` and `npm run demo:check`
- this plan, and `DEMO.md`

**Cannot travel. Manual checklist on the demo machine:**

1. Figma desktop installed, signed in, seat allows Dev Mode MCP.
2. Figma MCP enabled and reachable. Smoke test: select a frame, ask the agent to read it, confirm real output.
3. `chrome-devtools` MCP configured **in T3 Code**. `docs/t3code-install.md` line 5 in the jor-stack repo: standalone skill links do **not** load `jor-stack/mcp.json`, so browser tooling is configured separately. `jor-browser-review` reports a blocker and stops if this is missing.
4. `jor-stack` skills linked per that install doc, verified with `/jor` in the picker.
5. Node, `npm install` done, `npm run dev` confirmed on `http://localhost:5173`.
6. Two full rehearsals passed, the second one recorded.

---

## 3. Stage setup

- Split screen: terminal left, Chrome right. Chrome comes to the foreground for browser review, which is the only part of this demo that is visually self-evident to a design audience.
- Vite already running in a separate terminal that is never touched on stage.
- Browser review uses an isolated browser context so personal tabs and sessions never reach the projector.
- Figma desktop open on a second display, correct frame selected, with the demo 2 version of the hero ready but not yet selected.
- Recording of the final successful rehearsal, one keystroke away, on the second display.
- Large terminal font. Maximized window.

### Preconditions, run privately at minute 29 via `npm run demo:check`

- Vite responding on 5173
- `.scratch/` absent
- git at tag `demo-start`, clean tree
- `chrome-devtools` MCP reachable
- Figma MCP reachable
- correct Figma frame selected

---

## 4. Demo 1 runbook, 30–60

Target: 25 minutes of agent work, 5 of slack. Audience questions during agent wall time are free minutes, use them.

### 4.1 Open

Select the landing page frame in Figma desktop. Then, in a fresh thread:

```
/jor-get-ready build the landing page from the selected Figma frame into this project, matching the existing design tokens
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
/jor-browser-review http://localhost:5173 at 360 and 1280
```

Say out loud: it normally checks five widths; this is scoped to two for time, and it is configurable. Bring Chrome to the foreground. The room watches the viewport snap from 360 to 1280 and the hero reflow.

Read the Human verification section aloud. If the 360 screenshot shows overflow or desktop spacing, that is the whole argument in one frame: the code ran, the checks passed, the outcome was still wrong, and a human noticed. Describe the problem and let the agent fix it. Do not fix it yourself.

### 4.8 Close demo 1

The hero and the rest of the page are on screen next to the Figma frame. Point at the match. Name what was human: the project setup, the design system, the scope decision, the ticket correction, the visual judgment.

---

## 5. Demo 2 runbook, 60–75

In Figma: the hero is restructured, not re-tokened. Left aligned text and image becomes centered, with a badge above the headline and two CTAs. This cannot be faked by swapping a variable, so the agent has to read the new frame and rewrite the component's structure. The design changed, not the prompt, and the outcome followed.

**Fresh thread.** `get-ready` starts cold, so the opening line points at both the new frame and the existing component path.

```
/jor-get-ready the hero design changed. Read the selected Figma frame and update src/components/Hero.tsx to match
```

Then, after the proposal gate:

```
/jor-implement
/jor-browser-review http://localhost:5173 at 360 and 1280
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

- [ ] Build the Figma file: duplicate, clean layer names, auto-layout, Variables, 3 sections, plus the demo 2 hero variant.
- [ ] Export Figma Variables as a name to value list and hand it over, so the scaffold's tokens mirror the design instead of approximating it.
- [ ] Scaffold the repo against the real tokens.
- [ ] Generate `verify-jor-stack-demo` with `/jor-verify`, answer **shared** when it asks, trim breakpoints to 360 and 1280.
- [ ] Write `demo-reset.sh` and `demo-check.sh`.
- [ ] Tag `demo-start`.
- [ ] Demo machine setup checklist, section 2.
- [ ] Two rehearsals, second one recorded.
- [ ] Gate replies 1 to 3.
