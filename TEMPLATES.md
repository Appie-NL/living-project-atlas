# Project Record Templates

Version: **1.0.1**

Use the project brief and concept forms as versioned files before the service exists. At handover, load and verify them in the service while preserving provenance. Thereafter the service stores authoritative operational versions, and readable exports are snapshots rather than a parallel approval system. Empty templates must never appear as actual completed work.

## Project brief

```text
Project name:
Purpose and desired outcome:
Users and main situation:
First useful end-to-end capability:
Initial milestone scope:
Out of scope:
Available environment:
Constraints and protected work:
Director:
Approval and review policy:
Execution connection and observed capabilities:
System-level acceptance criteria:
Product language:
Deployment scope:
Specification version and revision:
```

## Concept baseline for Director approval

```text
Baseline ID and version:
Director's goal and intended users:
Problem and intended value:
Principal user experience:
First milestone and scope boundaries:
Options investigated and evidence:
Recommended direction and rationale:
Alternatives rejected and why:
Constraints and dependencies:
Material risks and assumptions:
Success criteria:
Blocking questions:
Non-blocking questions deferred explicitly:
Proposed atlas topics and structure:
Bounded atlas-build scope and deployment boundary:
Next action authorized by concept approval:
```

## Concept approval record

```text
Director identity:
Baseline ID and approved version:
Decision: approved / changes_requested / deferred
Actual Director response and source:
Decision time:
Approved atlas-build scope:
Conditions or limits:
Required revision, if any:
Origin: bootstrap conversation
```

Record approval only after the Director actually gives it. A research experiment approval is a separate record and does not approve the concept.

## Product topic

```text
Topic ID and version:
Title and user value:
Parent and related topics:
Intended behavior:
Observed behavior and result revision:
Capability state:
Verification freshness:
Visuals and their type: actual capture / prototype / concept / diagram
Dependencies:
Relevant decisions:
Current work packages:
Evidence:
Known limitations:
Suggested next outcome:
```

## Proposal shown to the Director

```text
Proposal ID and version:
Request and affected topics:
Recommended outcome:
Why it matters:
Options and meaningful trade-offs:
Research and uncertainty:
Selected approach:
Expected impact:
Scope and exclusions:
Work plan and dependencies:
Acceptance criteria and verification method:
Required independent review, if any:
Effort estimate and confidence, if supportable:
Readiness assessment:
Approval effect: start when ready / approve for later
Consequential actions requiring separate authorization:
```

The visible choice must match the command the button will send. If approval starts execution, label the action accordingly.

## Work assignment

```text
Work package and job attempt:
Approved proposal and input versions:
Authorization reference:
Outcome:
Allowed workspace and resources:
Deliverables:
Dependencies:
Protected areas:
Acceptance criteria:
Reporting contract:
Execution limits:
Pause/cancel capabilities:
Verification method:
Completion and stop conditions:
```

## Readiness assessment

```text
Type: approach / work
Subject and version:
Assessor and context:
Outcome: ready / needs_changes / blocked
Checks actually performed:
Supporting evidence or reasoning summary:
Unresolved material issue:
Next required action:
Recorded time:
```

## Steering request

```text
Director and authenticated request:
Target work and base version:
Requested change:
Reason:
Affected scope, dependencies, and criteria:
Impact: clarification / material_change / priority_only
Coordinator assessment:
Affected approvals:
Worker delivery and acknowledgment:
Current effect shown to the Director:
Revised proposal, if required:
```

## Verification evidence

```text
Evidence ID:
Work package and result revision:
Criteria version:
Performed by:
Independence: independent / self_review / not_performed
Method and relevant environment:
Criterion:
Expected result:
Actual observation:
Outcome: pass / fail / inconclusive / not_run
Artifact or log reference:
Performed time:
Coverage limitations:
Changes that invalidate this result:
```

No performed time or passing observation is filled in for a check that did not run.

## Director result review

```text
Review ID:
Director:
Result revision and criteria version:
Preview and evidence set reviewed:
Action: accept / request_changes
Feedback:
Technical acceptance prerequisites satisfied:
Requested scope change, if any:
Follow-up proposal or correction:
Recorded time:
```

## Accepted change

```text
Acceptance ID and actor:
Work package:
Accepted result revision:
Criteria and evidence references:
Before:
Now:
Why:
Remaining limitation:
Updated topic versions:
History event:
Next useful iteration:
```

## Director agent request

```text
Request ID and authenticated Director:
Source task or decision ID:
Expected target and decision revisions:
Contextual action and intended effect:
Director guidance:
Authorization reference and permitted scope:
Readiness, dependencies, and pause state:
Configured executor and connection status:
Existing attempt or new bounded assignment:
Idempotency key:
Recorded time and dispatch intent:
Runner claim, actual start, and provider session ID:
Current request state and blocker:
Resulting proposal, artifact, evidence, or acknowledgement:
Related history events:
Next Director action:
```

Use [AGENT_ACTIVATION.md](AGENT_ACTIVATION.md) for the lifecycle and state rules. A request record alone does not prove an agent started.

## Operational handover receipt

```text
Service location:
Application revision:
Specification version:
Approved concept baseline and original approval:
Atlas content checked against that baseline:
Director access verified:
Storage and backup:
Real execution adapter:
Runner configuration, startup, and recovery:
Task and decision activation controls:
Real proposal-preparation and approved-task nudge evidence:
Duplicate, offline, revoked-approval, and restart scenarios:
Observed capabilities and limitations:
Browser-only iteration demonstrated:
Evidence for approval, dispatch, execution, verification, and review:
Restart and reconnect checks:
Current work and pending Director actions:
Operator recovery procedure:
Remaining acceptance gaps:
```

This receipt records observed capability. It must not label a mock adapter, saved prompt, or proposed architecture as operational execution.
