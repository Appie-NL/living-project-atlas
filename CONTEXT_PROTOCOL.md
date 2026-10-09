# Context Delivery Protocol

Version: **1.0.1**

Implement this protocol during the atlas build. START.md and the phase entries govern initial reading; this document governs the operational service's delivery of task context. A short prompt alone is not an implementation of this protocol.

## 1. Fixed core and current records

Every assignment includes the fixed rules from START.md at the project's adopted method commit, plus the current project phase, goal, approved scope and exclusions, baseline and approval references, agent authority, and relevant limits. The atlas is the authoritative source after handover. The runner supplies this core to a fresh session rather than assuming it exists in chat history.

Phase names in the reading route map to DATA_MODEL.md's lifecycle: concept covers preparation through awaiting concept approval; build covers atlas construction and handover validation; operate begins only after accepted handover. Phase labels are derived from verified records, not a user-editable permission toggle.

## 2. Assemble an immutable package per attempt

Store a package ID, revision, creation time, method commit, project/task/request/attempt IDs, and assembly rationale. Include:

- The requested outcome and action type, with actual Director instruction provenance.
- Approved scope and exclusions, baseline, proposal, decision and plan revisions; authorization reference and explicit limits. For analysis without implementation approval, state that limitation.
- Relevant dependencies, unresolved blockers, protected areas, permitted tools and workspace, base code revision, and time or cost limits.
- Acceptance criteria and versions, required outputs, verification method, return channel, and stop conditions.
- Required source excerpts or full records, with resolvable identifiers, immutable revisions or hashes, and reasons for inclusion. Preserve necessary exceptions and constraints when summarizing.
- Optional references with reasons to retrieve them; deferred material is not preloaded. Mark missing required context as a blocker, not an empty field to infer.

Select dependencies transitively where they can change the assignment's correctness or authority. For each omitted area, there need not be a lengthy exclusion list: record the selection rule and material omissions. Never remove relevant cross-cutting security, data, or authorization requirements merely to fit a token target.

Record the actual payload delivered, or an immutable retrievable copy and hash, plus adapter delivery/acknowledgment evidence. A manifest of links alone is insufficient if the executor cannot retrieve them. Do not log secrets or grant access beyond the authorized project scope. Delivery acknowledgment does not prove that a model understood or obeyed the content.

## 3. Check before dispatch and during work

The server and runner validate phase, current authorization, required sources, dependencies, permissions, and approval-relevant versions immediately before launch. Reject or hold incomplete, contradictory, inaccessible, or stale packages. Reassemble from current records and obtain renewed approval only where the approved scope or basis actually changed.

The agent checks the package before dependent execution and reports concrete gaps. If additional context becomes necessary, retrieve the smallest relevant authorized reference and append its revision and purpose to the attempt's read manifest. Do not use that as permission to scan the repository. If required access is unavailable, report the blocker.

Revalidate at consequential action boundaries. A decision change while a job is active triggers impact assessment and a supported hold/stop request where needed. Preserve the original package and late outputs; do not rewrite them as if the attempt ran under the new decision. A new or resumed authorized attempt receives a newly versioned package.

## 4. Recovery and visibility

Persist the phase record, transition evidence, context packages, delivered payload references, additional reads, results, and acceptance separately from conversations. On restart, verify current state and reconcile active attempts and side effects before dispatching or resuming work. Compaction is not a new approval or a reason to reload every file.

The Director can inspect the current phase and leading concept approval, and open a task's "Basis for this work": objective, scope, governing decisions and revisions, dependencies, criteria, authority, context freshness, and blocking gaps. Use plain language; detailed manifests can be secondary. Historical attempts show the basis actually used, alongside any newer decision.

## 5. Access limits and acceptance

Markdown routing guides behavior; it cannot deny filesystem access. Document whether the adapter supplies only selected context, limits repository access, reuses an existing session, or permits broad reads. Prefer a fresh bounded session or supported isolation for a changed assignment; do not claim that sending a small package removes earlier session context. If broader access is necessary, disclose it and retain the reading discipline.

Verify actual delivery, stale and missing context rejection, changed decisions, recovery, phase transitions, and Director visibility using ACCEPTANCE.md section L. The demo may illustrate these concepts but must not claim real dispatch, enforced isolation, or production authorization.
