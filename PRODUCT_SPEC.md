# Product Specification

Version: **1.0.0**

## 1. Product purpose

Living Project Atlas lets a human direct a project through a visual understanding of the product. The atlas is both a specification and an operational workspace. Decisions made there drive authorized execution, and execution returns progress and evidence to the same place.

The Director should be able to leave and return without losing track of what is happening, why it is happening, or what needs attention. Ordinary iteration must not depend on finding the right old chat or manually transferring a prompt.

## 2. Roles

Before the service exists, the Director and assistant develop the concept in the initial project conversation according to [CONCEPT.md](CONCEPT.md). The Director supplies the goals and boundaries; the assistant researches, challenges, and refines them into a coherent baseline. Atlas construction starts only after explicit Director approval of that baseline and its bounded build scope. The service is populated from those agreed records, not invented independently of them.

| Role | Responsibility | Authority boundary |
|---|---|---|
| Director | Set outcomes and priorities, approve reserved decisions, steer work, review results | Does not alter test evidence or rewrite historical decisions |
| Coordinator | Translate direction into proposals and bounded work; manage dependencies, readiness, and acceptance preparation | Operates within authorized scope; cannot impersonate the Director |
| Executor | Perform a bounded assignment and report artifacts and actual progress | Access only the assigned workspace, resources, and actions |
| Verifier | Assess deliverables against criteria and record evidence | Cannot report independence when reviewing its own implementation |
| Observer | Read permitted project information | Cannot issue operational commands |

An individual process may perform several roles when the project permits it. The service records which context performed each action and whether review was independent. An automated coordinator need not be a permanently running language-model session; it may be a durable state machine that invokes agents when useful.

## 3. Director workspace

### Project home

Show the product's purpose, key areas, current milestone, last meaningful progress, latest accepted change, pending decisions, active work, and blockers. Prioritize items that need the Director. Explain when the execution connection is offline.

The summary must answer: what is happening, what has been accepted, what is waiting, and what can I do next?

### Product map and topic pages

Use a navigable hierarchy or relationship map with stable routes. Every topic explains user value, intended behavior, current observed behavior, dependencies, relevant decisions, evidence, and proposed next steps. Use focused diagrams and real captures where useful.

The Director can choose “Suggest a change” on a topic and describe an outcome in plain language. A new proposal inherits the topic's current version, dependencies, and relevant decisions. Show where the request is recorded and what happens next.

### Proposals and decisions inbox

A proposal includes a concise recommendation, alternatives where meaningful, expected outcome, affected areas, scope exclusions, relevant risks, effort estimate with uncertainty, dependencies, acceptance criteria, and approval effect.

Provide these actions:

- **Approve and start:** authorize this exact version and release ready work.
- **Approve for later:** record approval without queueing execution until a separate Start command.
- **Choose an alternative:** revise the selected option and assess resulting plan changes.
- **Request changes:** give guidance and return the proposal for revision.
- **Decline:** close the proposal without starting work.

Hide or disable actions that do not apply to the current state, with an explanation. Changing an option that changes scope produces a new proposal version; it is not an approval of an unseen revised plan. Low-risk routine implementation decisions can be made within an approved work package without asking the Director repeatedly.

### Execution board

Show each work package's outcome, owner, dependency status, readiness checks, current stage, recent meaningful activity, blockers, and pending review. Distinguish “queued” from “running” and “tests passed” from “accepted.”

The Director can reprioritize unstarted work, pause a package or the project, resume eligible work, request cancellation, and steer the next revision. The service explains the effect on running work. A pause request does not imply an external process stopped immediately.

### Agent activation from tasks and decisions

Implement [AGENT_ACTIVATION.md](AGENT_ACTIVATION.md) as a required part of v1. Provide **Ask agent to work on this** on tasks and decisions, with contextual actions to prepare a proposal, start approved work, request an update, send direction, or assess a changed decision. The form identifies the target, current version, intended effect, assigned executor, and any blocker. Do not ask the Director to construct an agent prompt or manually activate an external chat.

Show request receipt separately from actual executor start. The Director can inspect progress and results on the source record and in the activity feed. Preserve explicit pauses and human decisions. For queued or running work, operate on the existing attempt rather than launching competing work. Expose connection status and useful recovery guidance. One connected executor is sufficient; a provider selector or multiple simultaneous workers is not required.

### Review workspace

Display the actual preview or artifact, the agreed outcome, a comparison where useful, criterion-by-criterion evidence, limitations, and relevant changes. Link to the tested revision and the verifier report without requiring the Director to read raw logs.

Provide **Accept result** and **Request changes**. Acceptance becomes available when mandatory technical criteria and review requirements are satisfied. Exceptions require an explicit criteria-change decision and reassessment, not a hidden “ignore failure” path.

### Activity and history

Maintain a chronological, attributable history of requests, decisions, plan changes, job transitions, evidence, reviews, and accepted results. Show important changes prominently and retain detailed events for inspection. An activity feed complements the product specification; it does not replace it.

## 4. Autonomy and Director control

Default v1 policy:

- Before the atlas is built, the Director explicitly approves the versioned conceptual baseline and bounded atlas-build scope. This decision is never automatically accepted.
- The Director approves the objective and bounded proposal before its implementation starts.
- Research and proposal preparation can proceed within the Director's initial request.
- Routine, reversible implementation choices stay within the approved scope.
- Specific consequential actions remain subject to their own authorization requirements.
- A technically verified result awaits Director acceptance before the package is complete.

A project may authorize automatic acceptance for explicitly defined low-risk operational work after handover. Such a policy must identify eligible work, criteria, actor, and limits. It cannot bypass initial concept approval. The UI must show automatic acceptance accurately. Policy changes apply prospectively and require Director authority. Manual Director acceptance is the baseline for the first implementation.

## 5. Progress that reflects reality

Show progress through stages and outcomes. Use counts such as “3 of 5 work packages accepted; 1 running; 1 waiting for a decision.” Always show the denominator and explain scope changes that affect it. Do not mix future ideas into the current approved milestone's completion percentage.

An optional execution estimate is separate from accepted completion and labeled as an estimate. A worker heartbeat indicates liveness, not achievement. “Last meaningful progress” changes when a deliverable, criterion result, blocker, or decision materially changes.

The Director sees the reason for a stall and the next available action. If scope changes, report added or removed work rather than making apparent progress silently drop or jump.

## 6. Definition of an operational atlas

Before the live cycle, verify that the service reflects the approved concept and retains its versioned baseline and original Director approval. The initial handover then requires one complete live cycle:

1. The Director requests an outcome in a browser topic page.
2. The coordinator prepares a proposal and readiness assessment.
3. The Director approves the version shown.
4. The server records the decision and dispatches eligible work once.
5. A real executor changes or produces a bounded target-project artifact.
6. Verification produces actual evidence visible in the atlas.
7. The Director reviews and accepts or requests changes.
8. Acceptance updates the product's observed state, links the evidence, and records history.
9. The next iteration can begin from that updated topic page.

Copying prompts, changing frontend status labels, or demonstrating mock job events cannot satisfy this handover.

## 7. First-release scope

Required: one project, authenticated Director access, durable records, visual topic navigation, proposal decisions, contextual task and decision nudges with a real runner, real execution connection, reliable job status, steering and work controls, verification, result review, history, restart recovery, and a usable narrow-screen layout.

Optional after the working core: multiple projects, multiple Directors, parallel workers, hosted identity providers, notification integrations, advanced scheduling, rich simulations, collaborative editing, and one-click external deployment.

Choose deployment scope during bootstrap. A local service with a local worker is valid. Internet accessibility, paid hosting, public product publication, and repository write permissions are separate choices, not implicit requirements of a web service.

## 8. Exceptions after handover

Credential rotation, infrastructure repair, or restoring the service after a severe failure may require an operator outside the atlas. Record the incident and resulting state changes when the service is available again. Do not use these exceptions as the normal workflow for approving or starting project work.

External instructions are captured as attributed requests through an authorized command path. If their identity or authority cannot be established, keep them as unapproved proposals. All current execution must remain visible in the atlas.
