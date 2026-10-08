# Example: One Iteration in the Atlas

This is an illustrative user journey, not a report of executed software or tests.

## The project

A Director wants to build a small booking product. The assistant first prepares the project workspace and asks about intended users, desired outcomes, constraints, and priorities. Together they compare possible directions and refine a concept for the first useful booking journey.

The assistant presents a versioned conceptual baseline with the selected direction, scope, assumptions, success criteria, and proposed atlas structure. The Director requests one clarification, then explicitly approves the revised concept and its bounded atlas-build scope.

Only then does the assistant build the operational atlas, seed it from the approved baseline, connect a real executor, and verify the handover. Its topics include reservations, availability, and history. Subsequent direction takes place in the atlas.

The Director opens “Reservations” and selects “Suggest a change”:

> Let a customer cancel a reservation while keeping it visible in their history.

The request appears immediately in the topic's activity. The Director can see that the coordinator is assessing it.

## The proposal

The coordinator checks the current product and prepares a proposal. It recommends a cancellation state on the reservation, keeps payments outside scope, and explains how the active and historical lists are affected.

The Director sees these acceptance criteria:

- A cancelled reservation disappears from active reservations.
- It remains in history after reloading the page.
- Repeating cancellation does not duplicate the record.
- A failed request does not display a successful cancellation.

The proposal explains that “Approve and start” will authorize one bounded implementation package. The Director approves it inside the atlas. The service stores the decision, then queues the assignment. The board moves from queued to running only after the worker acknowledges start.

## A change of direction

While the executor works, the Director realizes cancellation needs a reason. They open the running package and select “Change direction”:

> Ask for an optional reason and include it in the history entry.

The coordinator identifies a material change to the data and interface. The atlas shows the stop request's actual status, marks the affected plan for revision, and presents the updated proposal. It does not silently change the worker's criteria.

After approval, a new attempt uses the revised specification. Any output from the earlier assignment remains linked to that earlier version.

## Review and correction

Verification finds that cancellation works, but the reason is missing after a reload. The atlas reports the failed criterion. The coordinator sends a bounded correction within the approved scope. The package is not presented as accepted.

After the correction, the atlas shows a real preview, the relevant before-and-after view, and passing evidence for the revised criteria. The Director inspects the result and selects “Accept result.”

## The updated project

The acceptance record references the reviewed result and evidence. The reservations topic now describes the implemented behavior and links to that evidence. The work board shows the package as accepted, and the project history explains the change.

The Director starts the next iteration from the history topic. No prompt was copied to another chat, no progress file was edited manually, and the work's approval and execution history remain visible in the atlas.
