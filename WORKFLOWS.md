# Operational Workflows

Version: **1.0.1**

The project begins with the pre-service sequence below. After concept approval, atlas construction, and operational handover, the remaining workflows use the atlas as their control interface and durable record.

## 0. Concept before construction

Prepare the workspace and working brief. In the initial conversation, invite the Director to define the goal and boundaries, research credible options, challenge assumptions, and jointly refine the direction. Follow [CONCEPT.md](CONCEPT.md).

Present a versioned conceptual baseline and the bounded atlas-build scope. Record explicit Director approval before starting construction. A technical readiness result or a general project-start request cannot satisfy this decision. If approval is withheld, continue conceptual work without building the atlas.

After approval and technical readiness, build a tailored atlas from those records, preserve the original decision provenance, and verify the handover. From that point, ongoing requests, decisions, execution, review, and progress use the atlas. Do not keep the initial conversation or brief files as a competing operational plan.

## 1. From request to proposal

The Director opens a topic and requests a desired outcome. The server stores the request with its authenticated author, topic revision, and timestamp. The coordinator checks scope, relevant existing behavior, constraints, dependencies, and any unresolved decisions.

For consequential choices, investigate credible alternatives and challenge the leading approach. Record findings and uncertainties. Bounded research can run under the initial request; it must not become unapproved production implementation.

Create a proposal describing the outcome, options, recommendation, expected impact, boundaries, acceptance criteria, and execution plan. Display what approval will do. The Director receives a clear pending-action item in the atlas.

## 2. Approval and start

“Approve and start” sends a command containing the proposal ID, its version, relevant specification versions, and an idempotency key. The server checks identity, authorization, freshness, dependencies, and the proposed action's scope.

In one transaction, store the Director decision, advance the proposal, and create a durable dispatch intent. Dispatch occurs after commit through an outbox or equivalent reliable mechanism. Never start a worker before the authorization record is durable.

If dependencies are not ready, record the approval but leave work visibly waiting with the dependency reason. If required authorization or readiness is missing, do not dispatch. An approval does not waive execution controls.

The response shows the recorded decision and resulting work state. Closing the browser after the response must not lose the decision. Repeating the same command must return the same logical result rather than create a second job.

“Approve for later” creates no dispatch intent. A later Start command rechecks approval freshness, relevant versions, readiness, and dependencies before dispatch.

## 2a. The Director nudges an agent

Implement the complete contextual flow in [AGENT_ACTIVATION.md](AGENT_ACTIVATION.md). On a task or decision, **Ask agent to work on this** displays the permitted next action and its effect. Analysis creates proposal material; implementation requires current approval and readiness. Asking an agent to clarify a decision does not authorize it to decide on the Director's behalf.

Store the request and any eligible dispatch intent durably, then let a maintained runner claim the job and activate the configured real executor. Report request receipt, waiting conditions, actual start, meaningful progress, and results separately. Link all output to the originating task or decision. The Director must not need to start the worker manually for each request.

If work is already queued or running, reconcile that attempt or deliver authorized steering through supported capabilities. Do not create a competing implementation job. A deliberate pause requires explicit resume. A changed decision triggers impact assessment and revalidation, not silent reuse of its old approval. Offline requests remain visible and withdrawable; dispatch after reconnect must recheck current intent and authorization.

## 3. Readiness before execution

The coordinator records two kinds of readiness:

- **Approach readiness:** the outcome, choice, feasibility, material assumptions, and risks are sufficiently understood.
- **Work readiness:** the package has explicit inputs, outputs, ownership, dependencies, boundaries, testable criteria, and an executable verification plan.

Scale the record to the work. An obvious small correction can have a short assessment. A consequential architectural change needs stronger evidence and challenge.

The server may enforce that records exist and are current; a human or agent must still evaluate their substance. Required readiness cannot be replaced by an empty checkbox. Record the assessor and rationale.

## 4. Execution and progress

A worker claims a queued job under a lease and receives a bounded assignment. The assignment includes the approved versions, allowed workspace, scope, capabilities, criteria, reporting destination, and execution limits.

The worker acknowledges start, reports structured milestones, and attaches artifacts. The coordinator derives the work-package view from job and evidence records. The browser receives events through a live connection and can recover missed events from a cursor or refreshed snapshot.

If execution cannot start, show the actual error or missing prerequisite in plain language. An unavailable executor must never appear as running. Keep raw diagnostic details available to an operator without overwhelming the Director.

## 5. Verification and correction

Execution finishing moves a package to verification, not acceptance. Check actual artifacts against the approved criteria. Record methods, observed results, tested revision, environment, and review independence.

For failed criteria, prepare a bounded correction that remains inside approved scope. The coordinator can dispatch such a correction when project policy allows it. Criteria or scope changes require a new proposal decision. Repeated failures trigger reassessment rather than an unbounded retry cycle.

Technical checks that pass move the result to Director review. If required independent verification is unavailable, show the missing requirement and keep the result out of the ready-for-acceptance state.

## 6. Director review

The Director reviews the actual preview and criterion results. “Accept result” references the result revision, criteria version, and evidence set. The server verifies that this set is still current and that mandatory checks have passed.

Acceptance stores an immutable judgment and updates the topic's observed-state reference, work-package state, and change history transactionally. A failed topic update cannot leave the package displayed as fully accepted. Keep a recoverable command result if the operation cannot complete.

“Request changes” records the Director's feedback and creates the next bounded revision. Keep the reviewed artifact available in history. Distinguish a defect against existing criteria from a new product request, since only the latter changes approved scope.

The Director may revise criteria explicitly, with a reason and affected scope. Old evidence remains attached to the old criteria. Evaluate the revised criteria before offering acceptance again.

## 7. Steering active work

The Director can add guidance while execution is running. Store it as a change request against the current version; do not silently mutate the worker's assignment.

The coordinator classifies the impact:

- **Clarification within scope:** deliver a versioned message at a safe checkpoint, record worker acknowledgment, and keep criteria unchanged.
- **Material change:** invalidate affected approvals and readiness; prevent new dependent work from starting; request a safe stop of affected running work where supported; prepare a revised proposal.
- **Priority change only:** reorder eligible queued work without breaking dependencies; state whether running work is unaffected.

The UI shows whether guidance is received, assessed, delivered, or awaiting acknowledgment. A comment is not equivalent to an applied change.

If the worker cannot stop immediately, show “Change requested; current step still running.” Retain late outputs as superseded artifacts pending assessment. They must not update the accepted product state automatically.

## 8. Pause, resume, and cancellation

A project pause prevents new execution dispatch and requests a safe pause of affected active jobs. A work-package pause applies the same rule to that package. Browsing and proposal editing remain available.

If the adapter supports checkpoint pause, record the acknowledgment and checkpoint before reporting “paused.” Otherwise stop new dispatch and request a supported cancellation or wait for the current bounded step to finish. Display the actual condition; do not label a live process paused.

Resume reconciles the worker and workspace, rechecks versions and authorization, and continues from a valid checkpoint or creates a new bounded attempt. An expired approval requires a fresh decision.

Cancellation stops future work and requests termination where supported. The UI distinguishes request from acknowledgment. Already completed side effects are not automatically undone. Link any partial output and propose recovery separately if needed.

## 9. Conflicting and repeated commands

Two browser tabs may show the same proposal. After one approves or edits it, a command from the other must fail its version check and return the current state with a readable explanation.

An idempotency key is scoped to actor and project. Reusing it with the same payload returns the original result. Reusing it with a different payload is rejected. A different key still cannot approve an already transitioned proposal twice: enforce its legal state and unique decision transition.

Apply equivalent protection to start, accept, resume, and rework commands. The UI may disable a button after clicking, but correctness belongs on the server.

## 10. Failure and restart recovery

Persist decisions, dispatch intents, job attempts, worker leases, and event cursors. On service restart, reconcile unfinished jobs before redispatching. An expired heartbeat marks a job as uncertain or interrupted; it does not prove the underlying action stopped.

Check the executor's current status and available artifacts. If an action's completion is uncertain, block automatic repetition of consequential side effects. Resolve through reconciliation or an operator decision. Transport retries do not imply that external side effects are safe to repeat.

On browser reconnect, retrieve a current snapshot and replay subsequent events in order. Deduplicate event IDs. After reconnect, progress must match the server even if intermediate animation or notifications were missed.

## 11. Completion and the next iteration

A milestone is complete only after its required packages and system-level outcome checks are accepted. Verify important end-to-end behavior across package boundaries. Do not infer system acceptance from a count of completed subtasks.

The updated atlas becomes the starting point for the next request. The Director can select a topic, inspect evidence and limitations, and propose another outcome without opening a separate task interface.

Accepted history remains stable. New knowledge may mark an accepted capability's evidence stale or reveal a regression, but must not erase the earlier decision. Show the current issue and its relationship to the earlier acceptance.

## Phase reading and context checks

Use [START.md](START.md) and its conditional phase route for adoption. Record each phase transition, including the Director's concept approval before build and explicit handover acceptance after mandatory verification. Merely reading the next phase or completing a job cannot advance project authority.

For every operational assignment follow [CONTEXT_PROTOCOL.md](CONTEXT_PROTOCOL.md): select relevant records, validate required context and authorization before dispatch, retain the actual package supplied, and log additional scoped retrievals. A missing source blocks dependent execution. A changed decision triggers impact assessment and supported holds; preserve old packages and create a newly versioned package when resumed work is authorized. Review uses the delivered revision and applicable criteria, not a fresh interpretation of old approval.
