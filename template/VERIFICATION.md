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
