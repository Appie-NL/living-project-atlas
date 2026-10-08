# Records and State

Version: **1.0.0**

The schemas below define responsibilities and invariants. The implementation must provide actual validation, storage, and transition enforcement.

## 1. Common record fields

Use stable IDs, project ownership, revision numbers, creation and update timestamps, actor identity, and visibility on relevant records. A title or file location is not identity. References must resolve to records in an authorized project scope.

Keep immutable revisions for specifications, proposals, criteria, evidence, and acceptance. Current pointers may advance, but earlier revisions remain inspectable. Record server time for operational events; preserve source capture time separately where applicable.

## 2. Record responsibilities

| Record | Important contents |
|---|---|
| Project | Purpose, users, constraints, Director, execution policy, milestone scope |
| Concept baseline | Versioned purpose, direction, scope, constraints, rationale, uncertainty, success criteria, atlas-build scope |
| Concept approval | Director identity, baseline version, explicit response and source, limits, original decision time |
| Topic revision | Intended behavior, observed-state reference, relationships, visuals, verification freshness |
| Request | Desired outcome, author, source, target topics, initial context |
| Research | Options, dated sources, findings, uncertainty, selected recommendation |
| Proposal revision | Scope, options, recommendation, impact, plan, criteria version, start effect |
| Decision | Actor, exact approved proposal and scope, authority, start policy, time |
| Work package | Outcome, dependencies, approved plan, ownership, status, active attempt |
| Readiness assessment | Subject version, check type, assessor, outcome, supporting rationale |
| Job attempt | Executor, lease, capability snapshot, input revisions, events, output references |
| Evidence | Claim, criterion, method, observation, result, tested revision, reviewer, independence |
| Review | Director feedback, result version, criteria version, requested action |
| Acceptance | Assessor, accepted result, evidence set, criteria version, limitations |
| Change request | New guidance, base version, impact assessment, affected jobs, acknowledgment |
| Activity event | Ordered ID, actor, command, subject, before/after revisions, attributable summary |
| Dispatch intent | Authorized command, job identity, delivery state, retry metadata |
| Agent request | Authenticated actor, task or decision target, expected target and decision revisions, requested action, guidance, authorization reference, idempotency key, lifecycle state, linked job or existing attempt, blocker, timestamps |
| Execution connection | Project executor and runner identity, authorized workspace, capability snapshot, availability, last contact, credential reference without secret values |

Store method version and source revision on the project so the implementation knows which contract it adopted.

## 3. Independent dimensions

Track the initial project lifecycle separately from operational work:

`preparing -> concept_development -> awaiting_concept_approval -> atlas_build -> handover_validation -> operating`

Only an explicit Director approval of the current concept baseline permits entry into `atlas_build`; technical readiness must also be satisfied before construction work starts. Revision requests return the concept to development. A material pre-handover change returns affected construction to a hold until the revised baseline is approved. Successful service construction alone does not permit entry into `operating`: the handover criteria must pass.

The pre-service approval record is imported with its original provenance. It must never be represented as a browser command that occurred before the service existed.

Do not collapse these into a single green badge:

- Product capability: `concept`, `planned`, `in_progress`, `implemented`, `retired`.
- Verification freshness: `unverified`, `current`, `stale`.
- Proposal state: `draft`, `assessing`, `awaiting_decision`, `approved`, `changes_requested`, `declined`, `superseded`.
- Work state: `planned`, `awaiting_approval`, `ready`, `queued`, `running`, `verifying`, `awaiting_review`, `rework`, `paused`, `blocked`, `accepted`, `cancelled`.
- Job state: `queued`, `claimed`, `running`, `pause_requested`, `paused`, `cancel_requested`, `succeeded`, `failed`, `cancelled`, `interrupted`.
- Evidence result: `pass`, `fail`, `inconclusive`, `not_run`.
- Agent request state: `recorded`, `waiting`, `queued`, `active`, `fulfilled`, `blocked`, `failed`, `withdrawn`.
- Review independence: `independent`, `self_review`, `not_performed`.

Job success indicates an execution attempt ended successfully, not that the package is accepted. Technical verification can still fail. Product implementation can exist while evidence is stale or a new change is awaiting approval.

An agent request is fulfilled when its requested action has actually produced the appropriate result; this does not mean that the product work is accepted. A request for status may link to an existing job without creating a new execution attempt. Withdrawal prevents future dispatch; if a worker already claimed the job, record a supported cancellation request and reconcile before showing work as stopped. Keep analysis authorization separate from implementation approval. See [AGENT_ACTIVATION.md](AGENT_ACTIVATION.md).

## 4. Main work transitions

| From | To | Required condition |
|---|---|---|
| planned | awaiting_approval | A reviewable proposal exists |
| awaiting_approval | ready | Current Director approval, readiness, and dependencies satisfied |
| ready | queued | Authorized Start or approved automatic start; dispatch intent stored |
| queued | running | Actual worker start acknowledgment |
| running | verifying | Required outputs exist and execution attempt finished |
| verifying | rework | Specific failed criteria require bounded correction |
| rework | queued | Correction remains authorized and passes readiness |
| verifying | awaiting_review | Mandatory technical criteria and review requirements satisfied |
| awaiting_review | accepted | Current authorized acceptance stored with evidence and topic update |
| awaiting_review | rework | Requested correction fits current scope |
| awaiting_review | awaiting_approval | Requested change alters approved scope or criteria |

Blocking, pause, cancellation, and material rescoping may interrupt several states. Store the previous stage and the exact reason so resume is well defined. Only acknowledge `paused` or `cancelled` after supported execution control or reconciliation confirms that state. Until then expose the pending request separately.

An already accepted package is historical. New work uses a new revision or package linked to it. Do not mutate history to conceal a regression.

## 5. Approval command example

Illustrative payload; actor identity comes from authentication rather than a trusted browser-supplied role.

```json
{
  "command": "approve_proposal",
  "project_id": "project-demo",
  "proposal_id": "proposal-003",
  "expected_version": 4,
  "specification_versions": {
    "topic-bookings": 7
  },
  "criteria_version": 2,
  "start_policy": "when_ready",
  "idempotency_key": "demo-approval-003-v4"
}
```

Validate all referenced versions. If any approval-relevant input changed, return a conflict and the latest proposal. Do not silently reinterpret this as approval of that new version.

## 6. Progress projection example

Illustrative view of an active milestone; these numbers are not actual project results.

```json
{
  "project_id": "project-demo",
  "milestone_id": "milestone-01",
  "source_event_sequence": 184,
  "work_packages": {
    "in_scope": 5,
    "accepted": 2,
    "running": 1,
    "awaiting_review": 1,
    "blocked": 1
  },
  "accepted_completion": {
    "numerator": 2,
    "denominator": 5,
    "unit": "work_packages"
  },
  "system_validation": "not_started",
  "execution_connection": "connected"
}
```

Calculate this from canonical current scope and work records. Counts are not stored as independent editable truth. Accepted package counts do not imply overall system acceptance. If unequal work sizes make a percentage misleading, show counts and stages without a percentage.

## 7. Critical invariants

1. Every execution attempt references durable authorization and approved input revisions.
2. One command retry cannot create duplicate logical decisions or jobs.
3. A changed payload cannot reuse an idempotency key successfully.
4. No acceptance references missing, failed mandatory, or invalidated evidence.
5. Evidence remains bound to the actual tested result and criteria versions.
6. A new plan cannot inherit an old approval without an explicit applicability check.
7. Browser state cannot override server state or permissions.
8. Stale worker attempts cannot overwrite current attempts or accepted product state.
9. A public projection cannot reveal internal records through hidden data or exports.
10. Every accepted result is connected to an updated observed-state reference and history event.
11. Atlas construction references an explicitly Director-approved concept baseline; operational auto-accept policies cannot replace this approval.
12. A nudge cannot override a pause, missing approval, revoked authorization, task limit, or reserved human decision.
13. Multiple requests against one active work revision cannot create competing mutation attempts; job claims and workspace ownership enforce this beyond request-key deduplication.
14. Deferred dispatch revalidates the request, decision, scope, pause state, and dependencies after reconnection and immediately before launch.

## 8. Durable resume context

Persist the current project objective, milestone scope, active work, approved versions, worker leases, pending decisions, unresolved controls, evidence awaiting review, and next valid actions. Keep this state reconstructible without a chat transcript.

After restart, distinguish database recovery from executor reconciliation. A recovered job row is not evidence that its external process is still running or has stopped.
