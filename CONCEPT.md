# Concept Development and Director Approval

Version: **1.0.0**

This stage happens before the atlas is built. The Director and assistant work in the initial project conversation, supported by durable project files. It establishes what the project should achieve and why the proposed direction is worth pursuing.

## 1. Prepare the project

Confirm the workspace, load this specification, preserve existing instructions, and prepare a small place for the brief, research, and decisions. Identify available capabilities and practical constraints. Do not create the atlas application, connect production execution, or begin product implementation at this point.

A request to use Living Project Atlas authorizes this preparation and conceptual work. It does not by itself approve a yet-unwritten product concept.

The repository includes an already-built, generic visual template. The Director may inspect this example during concept development to understand the eventual workspace. Previewing the existing example is not a project-specific atlas build. Do not seed it with authoritative project records, treat its fictional approval as real, or connect execution before the project's own concept approval.

## 2. Let the Director establish the frame

Invite the Director to explain the goal in their own words. Develop the brief together through focused questions rather than requiring a long technical form upfront. Cover:

- The problem, motivation, intended users, and desired experience.
- The outcome that would make the project worthwhile.
- Essential capabilities, priorities, and explicit exclusions.
- Time, budget, platform, integration, operational, and design constraints.
- Existing resources or decisions that must be respected.
- What the Director wants to decide personally and what can be delegated.

Distinguish the Director's requirements from the assistant's assumptions. Reflect back the interpretation and correct misunderstandings before refining the solution.

## 3. Investigate and challenge the direction

Research options in proportion to uncertainty and consequence. Consider using an existing solution, extending available capabilities, and building something new. Compare serious candidates against the same project goals and constraints.

Challenge the favored direction: is the problem framed correctly, does a simpler option exist, what assumptions could fail, and what dependencies or costs are easy to miss? Explain the recommendation, important rejected alternatives, evidence, and remaining uncertainty.

Use sketches, diagrams, and written scenarios to clarify the concept. These are discussion artifacts, not an early atlas application. If a material uncertainty needs executable investigation, propose a separately bounded research experiment and obtain the Director's explicit authorization for that experiment. Completing it does not approve the concept or the atlas build.

## 4. Assemble a reviewable concept baseline

Create a versioned baseline the Director can understand without technical implementation detail. It includes:

1. Purpose, users, problem, and intended value.
2. A coherent product concept and its principal user journey.
3. The first useful scope, priorities, and out-of-scope work.
4. The selected direction, alternatives considered, and rationale.
5. Important constraints, dependencies, risks, and assumptions.
6. Observable success criteria for the first milestone.
7. Unresolved questions, distinguishing blockers from items that can wait.
8. A proposed atlas structure tailored to this product's topics and decisions.
9. The bounded atlas-build scope, deployment boundary, and execution expectations.
10. The exact next step that approval will authorize.

“Sufficiently developed” means the direction is coherent, material contradictions are resolved, and remaining uncertainty is acceptable and visible. It does not mean every future feature or implementation detail is predetermined.

## 5. Obtain the Director's concept approval

Present the baseline with a version identifier and request a clear decision: approve this concept and begin the atlas build, request changes, or defer.

Record the Director's actual response, its source, the approved baseline version, and any limits. Unambiguous natural-language approval is sufficient; no special phrase is required. Silence, enthusiasm, a research approval, a technical readiness check, or an assistant-authored statement is not concept approval.

This is a mandatory Director decision. It cannot be automatically accepted under a low-risk work policy. While awaiting approval, continue useful research or clarification within scope, but do not start the atlas or product implementation.

If the Director asks for changes, revise the baseline and present the affected choices again. Do not ask repeatedly for approval of an unchanged version already approved. A material change to the agreed purpose, scope, constraints, or direction invalidates the affected build authorization until the Director approves the revision.

## 6. Build the atlas from the approved baseline

Once approval is recorded, perform the technical readiness checks and build the bounded atlas service. Its initial topics, navigation, decisions, priorities, and first milestone must reflect the approved concept. Do not substitute a generic dashboard disconnected from the product.

Use the visual frame in `template/` as the default starting point, following [VISUAL_TEMPLATE.md](VISUAL_TEMPLATE.md). Replace its example identity, concept illustration, topics, decisions, work records, and history with the approved project material. Preserve the useful structure while adapting the content and visuals to the project.

The proposed build scope must include [AGENT_ACTIVATION.md](AGENT_ACTIVATION.md): contextual Director requests on tasks and decisions, an actual execution connection, a maintained runner, durable dispatch, and visible feedback. Once that scope is approved, the implementing agent completes this flow autonomously. Initial executor setup and practical limitations belong in the build plan; they must not be discovered only after declaring handover complete.

Seed the service with the baseline, research, decisions, assumptions, and the original approval record. Mark that approval's origin as the bootstrap conversation; do not fabricate a browser action or new approval timestamp.

Before handover, compare the atlas's content and implementation scope to the approved baseline. Resolve unexplained departures. The initial demonstration work must remain within approved scope or receive its own approval.

## 7. Transfer ongoing direction to the atlas

Complete the operational handover only after a real browser-based project iteration passes the acceptance criteria. Then the service becomes the authoritative operational workspace for subsequent direction, approvals, execution, review, and progress.

Archive the initial files as a read-only historical baseline once the records have been transferred and checked. Subsequent changes use the atlas's versioned command path. The initial conversation remains provenance, not a second active execution channel.

Concept approval authorizes the bounded atlas build. It is distinct from technical readiness, successful service handover, approval of later work, and acceptance of delivered product results.
