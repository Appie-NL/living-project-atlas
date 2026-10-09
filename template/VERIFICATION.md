# Template verification

Checked on 8 October 2026. This report covers the visual template only.

- JavaScript syntax check passed.
- Five automated demo-model tests passed: bounded approval without dispatch, stale decisions and invalid choices, revision-bound sample acceptance, unacknowledged pause requests, and recorded rework/direction.
- Browser checks passed for overview navigation, map navigation and decision lens, topic detail, proposal alternatives, required rationale validation, approval for later, counters, reload persistence, sample evidence review, sample acceptance, pause request, direction capture, search, and resetting local example data.
- A recorded approval reduced pending decisions from three to two; sample acceptance reduced pending reviews from two to one and raised accepted work from four to five. A pause remained a request without worker acknowledgement.
- Desktop layout and a 390 px mobile viewport were inspected. The mobile contents menu opens and closes; the page has no horizontal document overflow at that tested width.
- No browser console warnings or errors were recorded during the final smoke check.
- Demo data was reset to its initial state after testing.

Not verified or supplied: production authentication, database durability, real worker dispatch, actual product evidence, real pause/cancellation acknowledgements, deployment, or the operational acceptance scenarios. No full accessibility audit was performed.

## Decision editing update

- All nine model tests passed, including amendments, required reasons, invalid or stale amendments, reopening and reapproval, and compatibility with older saved decisions.
- Browser checks on a separate localhost origin verified approval followed by a changed choice, required-reason validation, persistence after reload, preserved previous decisions, and reopening with the approval removed.
- The change action is also available on existing changelog entries created before this feature. The user's existing choices on the primary preview origin were preserved.
- No browser warnings or errors were recorded in the editing smoke check.

## Version 1.0.1 context update — 9 October 2026

- JavaScript syntax check and all nine existing model tests passed.
- A non-browser rendering smoke check with DOM stubs covered nine routes, phase/baseline summaries, work dependencies, and current related decisions after approval and reopening. No execution authority was inferred from the example references.
- All relative Markdown links resolve and method/package versions agree at 1.0.1.
- The initial required method reading (root agent pointer, START, VERSION, concept phase entry, and CONCEPT) is approximately 3,700 tokens by character count. This excludes host instructions, project context, optional research, and tool overhead; it is not a tokenizer measurement.
- Follow-up live browser checks on 9 October verified the work-board phase summary and expanded task context for W-04, including baseline, scope, decision revision, and dependencies. The context dialog was inspected at the default viewport and 390 px width, with no horizontal document overflow. No browser warnings or errors were recorded. This is a focused smoke check, not a full accessibility audit.
- Operational phase enforcement, context delivery, access isolation, and real executor acceptance remain unimplemented in this demo and must be verified in each target project using ACCEPTANCE.md sections K and L.
