# Implementation Instructions

Version: **1.0.0**

Prepare the user's project and establish an approved conceptual foundation before building Living Project Atlas. Follow the user's scope and higher-priority instructions. Read this complete file and the relevant specification documents before claiming the method is loaded. Preserve unrelated existing work and user choices.

## The required outcome

Deliver a visual project atlas running as a web service, connected to real project execution. After bootstrap, the Director must be able to propose work, approve or steer decisions, follow execution, inspect evidence, review outcomes, and initiate the next iteration through that service.

Read [AGENT_ACTIVATION.md](AGENT_ACTIVATION.md) in full. Include its Director-initiated agent flow in the atlas-build scope and implement it autonomously after concept approval. The Director must be able to nudge an agent from a task or decision to prepare a proposal, start approved work, request an update, or assess changed direction. Choose and connect an available authorized executor, build durable dispatch and real feedback, and demonstrate the complete path. Do not defer the runner or agent integration as unspecified future work or require the Director to copy prompts into another chat.

A static dashboard, copied prompt, simulated worker, or externally managed task list does not satisfy this outcome. Those may be temporary development aids and must be labeled accurately.

## Discover and decide

Follow CONCEPT.md before any atlas build. Prepare the workspace and durable brief, then work with the Director in the initial conversation to establish a sufficiently developed product concept. Do not start the atlas application or product implementation during this stage.

Establish the project's purpose, users, initial user journey, constraints, available environment, and observable success criteria. Ask only for missing information that materially affects execution or the result. Make reversible implementation choices autonomously within the task.

Investigate credible existing solutions and the current stack before selecting an architecture. Evaluate fit, maintenance, cost, operating complexity, portability, and relevant security or privacy concerns. Use current evidence for changing technical facts and label unknowns. Challenge the leading option: identify assumptions, simpler alternatives, dependencies, and realistic failure cases.

Record the selected approach and why it serves this project's goal. Present a versioned concept baseline covering the intended experience, scope, priorities, constraints, rationale, risks, open questions, success criteria, proposed atlas structure, and bounded build scope.

Obtain and record the Director's explicit approval of that baseline before starting the atlas build. This concept decision is mandatory and cannot be supplied by the assistant or bypassed by a technical readiness check. Approval already given for the unchanged baseline remains valid. If direction materially changes, request approval of the affected revision. Research experiments require separate explicit authorization and do not substitute for concept approval.

## Bootstrap the service

Read VISUAL_TEMPLATE.md and inspect the existing `template/` before creating new interface structure. Its reusable layout is supplied in advance; showing the unchanged example during concept discussion is allowed. After concept approval, adapt this frame to the approved product, replace every fictional example record and approval, and connect it to the operational architecture. Do not mistake the local demo reducer or browser storage for the required service.

Begin only after the concept approval is recorded and the relevant technical readiness checks pass. Build the atlas around the agreed product topics, priorities, decisions, and first milestone. Transfer the approved baseline and its actual approval provenance into the service. Use a small complete implementation before adding optional capabilities. The minimum foundation is:

1. A persistent project store with versioned specifications and attributable decisions.
2. A browser interface for the Director to inspect topics, proposals, work, and results.
3. Authenticated server commands that enforce permissions and valid state transitions.
4. Durable work dispatch and a real execution adapter with a documented capability contract.
5. Evidence collection, review, progress reporting, and restart recovery.
6. Contextual agent activation from task and decision pages, with a real runner, current authorization checks, duplicate prevention, connection status, and attributable results as required by AGENT_ACTIVATION.md.

Implement the architecture and state rules in ARCHITECTURE.md and DATA_MODEL.md. UI controls must cause real validated state changes. Never let a browser-only flag stand in for server authorization or completed work.

If no permitted execution connection is available, surface the exact missing capability and finish useful independent components. Leave execution acceptance incomplete. Do not invent a provider integration, silently switch to manual prompt copying, or claim autonomous execution works.

## Work in bounded phases

Before a substantial implementation phase, write its outcome, scope, inputs, deliverables, dependencies, protected areas, objective criteria, verification method, and stop conditions. Check that prerequisites are present and criteria are testable. Correct material gaps before building.

Maintain a coordinator role accountable for scope, sequencing, conflicts, and acceptance. Use separate implementers or reviewers only when supported, authorized, and useful. Respect a request to use a single session. Do not describe self-review as independent verification; where independence is required, obtain it before acceptance.

Use concrete checks, not open-ended demands for perfection. Stop polishing when the defined outcome is achieved and relevant defects are resolved. If progress stalls, diagnose the blocker or change the approach instead of repeating unproductive work.

## Preserve the operational contract

Implement proposals, Director decisions, readiness, queueing, execution, verification, review, acceptance, and specification updates as one connected workflow. Keep product decisions separate from command processing status and technical test results.

Bind approvals to the proposal, scope, plan, and relevant specification versions. Reject stale approvals. A changed plan or acceptance criterion must be assessed before more work starts. Director steering becomes an attributable revision; it must not silently rewrite the context of an already running job.

Record accepted commands durably. Prevent duplicate approvals and dispatch when requests are retried. Do not claim pause or cancellation took effect until execution acknowledges a supported safe stop. Preserve late results without accepting them as current work automatically.

Store progress, evidence, and pending actions outside any single conversation. A service restart must not lose a decision or repeat a consequential side effect blindly. Report actual worker capabilities, connection state, and execution limits.

## Make the atlas useful

Organize topics around the product's users and concepts. Provide a clear overview, navigable product map, readable topic pages, decisions inbox, execution board, review workspace, and activity history.

Use visuals to explain behavior, relationships, choices, and results. Label real captures, prototypes, concepts, and diagrams. Keep proposed, intended, and observed behavior distinguishable. Separate implementation state from verification freshness.

The Director should see the recommended next action and its consequence in plain language. Use clear controls such as “Approve and start,” “Request changes,” “Pause work,” and “Accept result.” Do not expose queue internals or agent jargon where a product explanation is enough.

Derive counters and status views from authoritative records. Display queueing, execution, verification, and human review separately. Never treat a worker's self-reported percentage as accepted completion. Make stale evidence, unavailable workers, and required decisions visible.

Support keyboard operation, visible focus, meaningful labels, readable contrast, narrow screens, and reduced motion. Provide an accessible list alternative to complex maps.

## Verify and hand over

Test the actual service and executor, including the Director's complete browser journey. Follow ACCEPTANCE.md. Tie evidence to the delivered revision and relevant environment. Check failure paths, duplicate commands, conflicting updates, restart behavior, and authorization boundaries as well as the successful path.

The mandatory activation demonstration includes both decision-to-analysis and approved-task-to-execution paths, existing saved decisions, duplicate nudges, offline recovery, and changed authorization. Execute ACCEPTANCE.md section K with real agent output. Until it passes, describe the atlas as not yet operationally handed over.

Require passing technical criteria before presenting a result as ready for acceptance. A Director's approval cannot turn an unperformed check into passing evidence. If criteria change, preserve the old version and reassess against the newly authorized criteria.

Check that the atlas reflects the approved concept and preserves the original approval record. Complete the initial handover only when a Director action in the atlas can cause real bounded execution, yield visible evidence, receive review, and leave an updated product record. Archive pre-service files as historical snapshots after their records are verified in the service. Then accept ordinary project direction through atlas commands. If direction arrives in an external chat, record and attribute it in the atlas before acting; do not manufacture a UI approval or run a hidden parallel plan.

Keep operational actions in the atlas after handover. The Director's dashboard must manage the next iteration, not simply document work completed elsewhere. Necessary exceptional maintenance outside the service must be recorded with its impact on current work.

## Deliver honestly

Report what runs, where it runs, which real execution capability is connected, what was checked, and what remains incomplete. Include actual launch and recovery instructions. Do not claim a public deployment, independent review, model setting, or account-wide installation without evidence.

Keep project artifacts in English unless the user requests otherwise. Speak to the user in their preferred language. Stay within explicit budget, access, model, and publication constraints. A workflow decision never overrides a platform permission requirement.
