# The Visual Template

Version: **1.0.1**

The reusable frame of Living Project Atlas is supplied in [template/](template/). It is an English, responsive, dependency-free browser application. It runs with the included local Node.js server and requires no package installation or external services.

## Reference and design interpretation

The layout is inspired by [Excavator: the Project Atlas](https://excavator.incodicelux.com/), inspected on 8 October 2026. The reusable structure follows its contents rail, visual project introduction, status summaries, project map, topic chapters, decisions, and enduring record. The template adds Director interactions and a clear path to the execution architecture in this repository.

This is an original implementation. The reference site's source code, game assets, project prose, and branding are not bundled. The studio diagram and project map are original SVG, and the typography uses system fonts. All supplied template source is covered by the repository's MIT license. The reference site is not part of that license.

## What the Director sees

| Surface | Included behavior |
|---|---|
| Contents rail | Project identity, search, map shortcut, work views, numbered topic chapters, and history |
| Project at a glance | Illustrated cover, milestone, derived counters, pending decision, work summary, map, chapters, and recent activity |
| Project map | Clickable topic nodes and lenses for decisions, active work, reviews, and accepted work; accessible chapter-list alternative |
| Topic chapter | Intent, initial example context, current work statuses, observable criteria, question, linked proposals, and direction capture |
| Director's desk | Proposal rationale, recommendation, alternatives, trade-off, bounded scope, success criteria, approval for later, revision request, and decline |
| Work and progress | Planned and blocked work, active work, pending control requests, reviews, and accepted results |
| Review desk | Revision-linked illustrative evidence, local sample acceptance, or a request for changes |
| Agreed direction | Conceptual baseline, scope, exclusions, success criteria, constraints, and approval provenance |
| Record | Attributed example events and subsequent local demo actions |
| Colophon | Reference attribution, limitations, demo export, and explicit demo reset |

The map is a schematic with selectable chapters, not a geographic or physics simulation. The current template uses six positioned areas. Change the node coordinates and view box when adding more areas; keep labels readable and retain the list alternative.

## Working demo behavior

The fictional project **Common Ground** demonstrates a booking service for a shared studio. It is example content, not the name of the method or the repository. Sample work and approval history are explicitly labeled.

The browser stores local choices under a project-specific storage key. It records the selected proposal version, chosen option, note, and event. Counters and work views derive from the same local records. The demo rejects repeated or stale decisions in its local state, and sample review is tied to the sample result revision. These checks improve demonstration behavior; they do not provide authorization or distributed concurrency guarantees.

Approval records a choice **for later**. “Approve and start” remains disabled. Pause and cancellation actions remain requests without worker acknowledgement. Giving direction records a note for discussion; it does not generate a work plan. Review acceptance changes only the example data. No action starts an agent, changes another repository, sends a message, runs tests, or deploys software.

Recorded decisions have a **Change decision** action in the decision list, decision detail, and associated changelog entries. The Director can approve a different option, request changes, decline, or reopen the proposal for consideration. A reason is required. Every change creates a new decision revision, preserves the previous outcome, note, and timestamp, and adds a history event. Reopening clears the current approval and returns the proposal to the pending count. Previously saved demo decisions remain editable. Changing a decision never rewrites completed work or implies execution has stopped; an operational implementation must assess affected work through the service command path.

If browser storage is unavailable, the interface warns that the session is temporary. Clearing browser storage removes the demo history. Export is a labeled JSON snapshot for inspection; it is not an operational backup or an importable authorization record.

## Use the template at the right stage

1. Prepare the target workspace and read [CONCEPT.md](CONCEPT.md).
2. Show the existing example if useful in explaining the method. Develop the target concept with the Director.
3. Record explicit Director approval of the exact conceptual baseline and bounded atlas-build scope.
4. Copy or adapt the visual frame. Replace the fictional project content with the agreed target material.
5. Connect the interface to the target's durable service and real execution adapter.
6. Demonstrate actual execution, evidence, review, and updated knowledge in the atlas.
7. Complete handover. Route subsequent direction, execution, iteration, and progress through the service.

Building this reusable frame does not pre-approve any future target project. Its seeded “approved” baseline is fictional and must never be transferred as the target's approval.

## Files and customization

| File | Responsibility |
|---|---|
| `template/index.html` | Application shell, landmarks, dialog, status announcements |
| `template/styles.css` | Design tokens, rail, editorial layouts, cards, map, responsive behavior |
| `template/data.js` | Example project identity, conceptual baseline, areas, work, proposals, events |
| `template/app.js` | Routing, render functions, original SVG diagrams, search, dialogs, local demo persistence |
| `template/model.js` | Pure demo transitions and derived summaries |
| `template/server.mjs` | Loopback-only development server with an explicit public-file allowlist |
| `template/tests/model.test.mjs` | Checks for stale or duplicate decisions, review revisions, progress, control requests, and recorded direction |

Start with `data.js`: set a new stable project ID, name, description, milestone, and conceptual baseline. Define product-specific chapters, avoiding a generic list of technologies unless those technologies are themselves meaningful product areas. Every proposal and work item references an area ID. Use stable record IDs, revision identifiers, and authentic approval provenance.

Then update the concept illustration in `heroArt()` in `app.js`; it currently represents the example studio. Replace it with a meaningful product diagram, labeled prototype, or real capture. Keep the label accurate. Use `styles.css` variables for palette, type, and rail width. Keep the app's English labels unless the approved project requires another language.

The default visual vocabulary is warm paper, forest green, brass accents, editorial serif headings, compact sans-serif controls, chapter numbering, fine rules, and restrained status colors. Status must remain readable through text rather than color alone. Avoid filling the overview with unrelated decorative charts.

## Connect real execution

The template intentionally has no provider-specific integration. During the target build, replace the local browser persistence and `applyDemoAction` command handler with a service boundary that meets [ARCHITECTURE.md](ARCHITECTURE.md), [DATA_MODEL.md](DATA_MODEL.md), and [WORKFLOWS.md](WORKFLOWS.md).

Implement [AGENT_ACTIVATION.md](AGENT_ACTIVATION.md) as part of that same build. Extend task and decision details, board cards, and associated activity entries with **Ask agent to work on this** and the permitted contextual action. Add connection status, request acknowledgements, actual executor progress, and linked results. The current demo's **Give direction** only records a local note; it must become a real bounded analysis or steering path in the operational service. Existing **Change decision** interactions must preserve history and support subsequent impact assessment through the agent-request flow. Do not treat these frontend controls as a substitute for dispatch and execution.

The interface needs authenticated queries for the project, topics, proposals, jobs, evidence, and events. Commands must include the relevant expected revision, authenticated actor, and idempotency key. The server validates authorization and readiness, stores the decision and dispatch intent transactionally, and returns the authoritative outcome. Stale proposals require a refreshed decision, not a silent retry against new scope.

Use service updates or polling to report actual worker state. Only enable “Approve and start” when execution is connected, supported, ready, and permitted for that scope. Worker acknowledgements control paused or cancelled state. Verified result revisions and human review control acceptance. Do not promote the demo reducer into the production authorization layer.

Replace fictional evidence with actual artifacts and check results. Replace the local direction note with a versioned proposal path that assesses impact and obtains any required decision. Preserve user input on connection errors, show pending commands honestly, and reconcile server state after reconnecting.

## Preview and verification

Use [template/README.md](template/README.md) to run the preview. The supplied automated checks cover demo transition semantics. Manually verify navigation, search, map links and lenses, decisions, result review, history, reload persistence, keyboard use, narrow layouts, and the disconnected execution state.

These checks qualify the visual template only. They do not satisfy the operational service acceptance criteria in [ACCEPTANCE.md](ACCEPTANCE.md).

## Phase and task context in the preview

The overview, concept page, and work board show an explicitly illustrative build/handover phase and baseline C-01. Inspecting work or a review result shows current planning references: objective, scope, related decisions and revisions, dependencies, and criteria. These references update when demo decisions change. They are not immutable records of what an agent received, and do not authorize execution.

During the real build, replace these projections with authenticated phase and attempt records as required by [CONTEXT_PROTOCOL.md](CONTEXT_PROTOCOL.md). Preserve historical packages separately from current decisions and expose stale or incomplete context honestly.
