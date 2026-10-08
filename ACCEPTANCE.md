# Implementation Acceptance

Version: **1.0.0**

These are acceptance scenarios for an implemented Living Project Atlas service. They have not been executed merely because this specification exists. Record the actual application revision, environment, steps, observed result, artifacts, reviewer, and limitations when running them.

## A0. Concept approval precedes the atlas build

- Start with only an idea. Verify that the assistant prepares the project and develops the Director's goals and boundaries before creating an atlas application.
- Inspect the concept baseline for alternatives, rationale, scope, constraints, success criteria, material uncertainty, and a proposed atlas structure.
- Withhold or defer concept approval. Verify that conceptual work can continue but atlas and product implementation do not start.
- Approve only a research experiment. Verify that this does not authorize service construction.
- Request changes to the concept. Verify that the baseline is revised and the assistant does not treat an earlier discussion as approval of the new version.
- Explicitly approve the baseline and bounded build scope. Verify that construction references that decision and begins only after relevant technical readiness checks.
- Inspect the built atlas against the approved concept. Verify its initial topics, scope, priorities, and decisions reflect that baseline.
- Confirm the original approval's author, version, source, and time are preserved without a fabricated browser action.
- Verify that routine operational control transfers to the atlas only after the real execution and review demonstration passes.

## A. A complete iteration inside the atlas

Prerequisite: the Director approved the concept and build scope, and the service has been built far enough to exercise this cycle. This demonstration supplies evidence for operational handover; it does not assume handover has already been accepted.

1. Sign in as the Director and open a product topic.
2. Request a small observable product change.
3. Inspect the resulting proposal, recommendation, boundaries, and criteria.
4. Use “Approve and start.”
5. Observe a durable approval and exactly one logical queued assignment.
6. Let a real executor produce the bounded artifact in the target workspace.
7. Observe actual progress and verification evidence in the atlas.
8. Review the real result and accept it.
9. Confirm updated observed behavior, evidence links, accepted work state, and history.
10. Start another iteration from the updated topic.

**Pass condition:** steps 1–10 require no prompt copying, external task chat, manual status-file editing, or terminal action by the Director. Initial installation and exceptional operator maintenance are outside this journey. Retain proof of the real execution connection and resulting artifact.

## B. Approval is a reliable command

| Scenario | Required result |
|---|---|
| Director approves the displayed proposal | Decision identifies that exact version and scope |
| Director chooses “Approve for later” | Approval is recorded and no job starts |
| The Director later starts approved work | Freshness and readiness are rechecked before one dispatch |
| Double-click or network retry uses the same command | One logical decision and job; repeated response is consistent |
| Retry uses a new key after the transition already happened | State checks still prevent duplicate execution |
| Same key is reused with a different payload | Server rejects it |
| Another tab changes the proposal before approval | Stale approval is rejected and current proposal is shown |
| Dependency is not ready | Approval can remain recorded; execution waits visibly |

## C. Director steering changes execution correctly

- Request clarification during execution; verify the worker's acknowledgment and the visible delivery state.
- Request a material scope change; verify affected approvals become unusable and dependent dispatch stops.
- Confirm a running job receives the supported stop request and is not falsely labeled stopped.
- Submit a late result from the old scope; preserve it without updating accepted product state.
- Approve the revised proposal and verify the next assignment uses its new versions.

## D. Pause, resume, and cancellation are honest

- Pause the project and confirm no new implementation jobs are dispatched.
- For a checkpoint-capable executor, confirm the actual checkpoint before “paused” is displayed.
- For an executor without immediate pause, show the real pending condition and bounded fallback.
- Resume only after checking current authorization, workspace, and checkpoint validity.
- Cancel work and distinguish the request from confirmed cancellation.
- Preserve partial outputs and explain that cancellation does not undo completed side effects.

## E. Verification controls acceptance

- Intentionally fail a mandatory criterion. The result must not be ready for acceptance.
- Correct the defect within scope and attach new evidence from the corrected revision.
- Change the artifact after verification. The stale evidence must not permit acceptance.
- Require independent verification, then supply only self-review. Acceptance must remain unavailable.
- Change criteria through an authorized decision. Preserve the old criteria and reassess the new set.
- Reject a result in the review interface. Confirm a bounded correction or revised proposal is created.

## F. Progress and views agree

- Compare the overview, topic page, work board, and canonical records for the same work.
- Verify that queued, running, verifying, awaiting review, and accepted are distinguishable.
- Confirm accepted completion uses the stated milestone scope and excludes unrelated future ideas.
- Add approved scope and confirm the denominator change is explained.
- Stop meaningful worker progress while heartbeats continue. Do not report those heartbeats as deliverable progress.
- Rebuild a view without verification. Confirm evidence dates remain unchanged.

## G. Recover from interruption

- Close the browser immediately after an approval commits; the decision and job must survive.
- Restart the service with a pending dispatch intent; the job must not be lost or logically duplicated.
- Interrupt a worker and expire its lease; reconcile actual execution before retrying.
- Let an obsolete worker return after a new attempt starts; reject its authority to overwrite current state.
- Simulate an uncertain external side effect; require reconciliation rather than blindly repeating it.
- Disconnect and reconnect the browser; rebuild the current view without missing or double-counting events.
- Restore a backup and verify both records and referenced artifacts are recoverable within the documented limits.

## H. Protect operational authority

- Attempt a Director mutation as an observer and while signed out; the server rejects both.
- Try to target a record outside the authorized project; reject cross-project access.
- Attempt to change permissions or approve through worker output; ignore the instruction and retain only permitted data.
- Check that browser payloads and public exports contain no execution credentials.
- If artifact previews contain active content, verify they cannot act with atlas credentials.
- If public sharing exists, verify internal records are excluded from pages, search data, downloads, and assets.

## I. Make the interface usable

- Complete the main Director journey on a wide and narrow viewport.
- Operate approval and review actions using the keyboard with visible focus.
- Confirm status and decision meaning does not depend on color alone.
- Verify empty, offline, loading, failed, and stale-version states offer useful explanations.
- Open a topic directly by its stable route and navigate back to context.

## J. Validate the delivered system

Demonstrate the original project outcome across accepted work packages. Confirm that integrations and end-to-end behavior work, remaining limitations are visible, and the Director can continue the project through the atlas.

Document actual launch, connection, backup, and recovery steps. Report unsupported capabilities. Overall acceptance requires passing applicable mandatory scenarios, not just successful component tests or a polished interface.

## K. Director nudges start real agent work

Required for operational handover. Use the connected real executor and retain request, job, provider session, and output references. UI simulations cannot satisfy these scenarios.

| Scenario | Required result |
|---|---|
| Director opens an unresolved decision and asks the agent to prepare a proposal | A real analysis job produces linked proposal material in the atlas; no product implementation or human approval is fabricated |
| Director starts a task previously approved for later | Current approval and readiness are checked; one real job creates a bounded workspace artifact, with progress and evidence returned to the atlas |
| Director nudges an item from an older changelog entry | Current target and decision revisions are shown and validated; obsolete authorization is never reused |
| Director asks for help on a decision reserved to the Director | Agent clarifies or analyzes; the decision remains awaiting the Director |
| Director repeats a nudge or two tabs submit distinct requests for the same active task | Requests link to the same active work where appropriate; no duplicate implementation run or overlapping workspace mutation occurs |
| Director requests an update on active work | Current attempt is queried or receives a supported request; no replacement implementation run starts |
| Director sends new guidance during execution | Impact is assessed; delivery and acknowledgement are visible, or unsupported delivery is honestly reported |
| Director changes a decision and asks the agent to assess it | Earlier decision is retained, affected authorization is revalidated, and dependent execution cannot use the superseded approval |
| Runner is offline when valid work is requested | Request survives as waiting with a reason and next action; no running state is fabricated |
| Runner reconnects after the request was withdrawn, approval changed, or project paused | Revalidation prevents obsolete or withdrawn dispatch; deliberate pause remains in force |
| Director closes the browser after request receipt | The durable request and runner continue independently and are visible after reconnect |
| Runner or service restarts while a job may still be active | Existing process and side effects are reconciled before retry; no blind duplicate run |
| Executor fails or exceeds a configured limit | Actual failure is shown with retained context; a nudge cannot reset limits or create unlimited retries |
| Observer or signed-out browser sends an agent request | Server rejects it, including cross-project targets and arbitrary workspace or shell payloads |
| Director completes the journey on desktop and a narrow viewport | Target, effect, connection state, acknowledgement, and next step remain understandable and keyboard accessible |

Pass condition: the Director initiates both decision analysis and approved task execution entirely inside the atlas, obtains real output, and can continue the workflow without copying prompts, sending an external chat message, or launching a terminal command. Initial connection setup may happen during bootstrap. Deliver actual runner startup and recovery instructions and record unsupported controls as limitations.

## Evaluation record

```text
Scenario:
Application and specification versions:
Environment and real executor:
Preconditions:
Actions performed:
Expected result:
Observed result:
Evidence references:
Reviewer and independence:
Outcome: pass / fail / inconclusive / not_run
Remaining gap and next action:
```
