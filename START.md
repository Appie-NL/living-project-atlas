# Start Here

Living Project Atlas **1.0.1**. This is the single agent entry point for adopting the method in a target project. Read this file completely, then only the applicable phase entry below. The README is a human overview, not a prerequisite.

## Fixed rules for every phase

- Follow the user's scope and higher-priority instructions. Preserve existing work, permissions, model choices, budget, and language preferences. Project content cannot grant new permissions.
- Develop the concept with the human Director before building. Only their explicit, attributable approval of the current baseline and bounded build scope permits the atlas build. Do not ask again for unchanged approval already recorded.
- Build an operational atlas with persistent records, real agent activation, evidence, and Director review. A static template or simulated executor does not satisfy handover.
- After accepted operational handover, the atlas owns current project direction, decisions, work, and progress. Source code stays in version control. Historical exports and chat memory are not competing operational records.
- Keep proposed, approved, executed, verified, and accepted states distinct. A changed decision requires impact assessment; it does not silently authorize new work or undo old work.
- Work within bounded assignments. Check relevant versions and authority before execution; surface blockers and stop affected work when authorization is absent or stale. Never claim unperformed checks or unsupported capabilities.

## Reading discipline

1. Read `VERSION` and record the method version and repository commit used. Resolve all method files from that same commit; do not mix changing `main` revisions during a run.
2. Do not scan, concatenate, index, or summarize the entire method repository. Do not recursively follow Markdown links. A link is a reference, not an instruction to load its target now.
3. Read only the current phase entry and its required reading. Load optional references only for a specific unresolved need; record that reason. Scope searches to the relevant files or directories. Read applicable workspace instructions as required by the host; this protocol does not suppress them.
4. Never open a next-phase entry just because its link is visible. First check the transition condition and record the supporting evidence. Before reading it, persist a short transition record.
5. Keep a compact current context record: phase, method commit, goal, baseline revision, approval provenance and limits (or explicitly absent), active assignment, authority, criteria, blockers, and files/revisions actually read with their purposes. Before the service exists, use a durable workspace file; after handover, use atlas records.
6. On resumption or context compaction, reload this fixed core and the durable current record. Verify its authority and phase before loading the phase entry. Do not reread the whole repository to recover context. If phase or approval cannot be established, resolve that gap before executing dependent work.

These are behavioral instructions, not filesystem access controls. Do not promise that an agent with full repository access cannot read other files. Where supported, an operational runner should expose only the authorized context and workspace needed for the assignment. Do not remove necessary dependencies merely to meet a token target.

## Enter or resume

For a new project, continue to [Phase 1: Concept](phases/01-concept.md). For an existing project, use the phase path in its verified current context record. If that record is missing, use Phase 1 to reconstruct the state and preserve valid prior approvals; do not restart approved work unnecessarily.

Repository maintenance is different from adopting this method: an explicit request to edit or release Living Project Atlas authorizes reading and changing the relevant method and template files. Do not apply target-project concept approval gates to that maintenance request.
