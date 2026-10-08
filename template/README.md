# Living Project Atlas — Visual Template

A runnable, adaptable frontend with an explicitly fictional example project. English interface; no external dependencies, fonts, images, or services.

## Run

Install Node.js 20 or later, then run in this directory:

```sh
npm start
```

Open **http://127.0.0.1:4173**. `node server.mjs` is equivalent. No `npm install` is required. The server listens on loopback only. Stop it with Ctrl+C. Set the `PORT` environment variable to change the port.

Do not open `index.html` through `file://`; its JavaScript modules need HTTP. For static hosting, serve `index.html`, `styles.css`, `app.js`, `data.js`, `model.js`, and `favicon.svg` from the same directory. Hash routes need no server-side routing. The included server is for local preview, not production deployment.

## Try a complete demo interaction

1. Open **For the Director** and consider the booking hold proposal.
2. Compare the alternatives. Choose one and select **Approve for later**.
3. Confirm the waiting count decreases and the decision appears in the history.
4. Open **Ready for review**, inspect the labeled sample evidence, and accept a sample result.
5. Check the updated work status and history, then reload to verify local persistence.
6. Open a topic and **Give direction** to record a follow-up note.
7. Use **Change decision** on a recorded decision or its changelog entry. Choose a new outcome, add a reason, and save. Open **Previous decisions** to inspect the earlier outcome, or reopen the proposal for consideration.

No actual execution occurs. The start control is disabled; pause and cancellation stay unacknowledged. Use **About this template** to export your local demo snapshot or reset the example through a confirmation dialog.

## Customize after concept approval

- `data.js`: identity, concept, chapters, work, proposals, and history.
- `styles.css`: colors, typography, layout, and responsive behavior.
- `app.js`: views, original project illustration, map layout, and interactions.
- `model.js`: local demo transitions; replace with real service commands for an operational project.

See [VISUAL_TEMPLATE.md](../VISUAL_TEMPLATE.md) for design guidance and service integration. Follow [CONCEPT.md](../CONCEPT.md) before starting a target project's atlas build. The example's fictional approval is not project authorization.

## Check

```sh
npm test
```

The tests check local decision and review semantics. A production atlas also requires the complete [operational acceptance scenarios](../ACCEPTANCE.md).
