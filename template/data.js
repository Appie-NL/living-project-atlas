// Replace the entire example after the target project's conceptual approval.
// Never import these example approvals or evidence as real project records.
export const project = {
  id: 'common-ground-example', name: 'Common Ground', edition: '01',
  tagline: 'A shared space. A simpler way to book it.',
  description: 'A thoughtful booking service for independent studios. Find the right space, reserve a time, and give everyone a clear view of what happens next.',
  milestone: 'The first reliable booking',
  phase: 'Atlas build / handover validation',
  phaseNote: 'Illustrative phase only. Real execution and operational handover have not been verified.',
  baseline: {
    version: 'C-01', status: 'Illustrative approved baseline',
    purpose: 'Help small creative teams reserve shared studios without messages, spreadsheets, or double bookings.',
    audience: 'Independent studios with a small community of recurring members.',
    scope: 'Browse spaces, check availability, make a reservation, and receive a confirmation.',
    exclusions: 'Online payments, public discovery, multi-site administration, and recurring reservations.',
    success: 'A member can complete a reservation, and a competing reservation for the same space and time is rejected.',
    constraints: 'One location; desktop and mobile; member access only; no payment processing.',
    rationale: 'Start with one reliable booking journey before adding administrative breadth.',
    provenance: 'Fictional example supplied with this template. No real Director approval has been recorded.'
  }
};

export const areas = [
  { id:'booking', number:'01', name:'The booking journey', short:'Booking', symbol:'↗', color:'sage', x:430, y:115,
    summary:'From an available hour to a confirmed place.',
    intent:'Members should understand what is available, reserve it with confidence, and know exactly what they have booked.',
    observed:'The example contains an accepted availability view and a reservation flow awaiting review.',
    question:'How long should an unconfirmed reservation hold a space?',
    criteria:['Show only bookable time slots.', 'Reject conflicting reservations.', 'Show a clear confirmation with the space and time.'] },
  { id:'spaces', number:'02', name:'Spaces & availability', short:'Spaces', symbol:'▧', color:'sand', x:695, y:220,
    summary:'The rooms, their character, and their open hours.',
    intent:'Give each space an understandable identity, capacity, and availability calendar.',
    observed:'Example room descriptions are accepted. Calendar integration remains planned.',
    question:'Which exceptions to regular opening hours belong in the first release?',
    criteria:['Show capacity and essential facilities.', 'Respect opening hours and exceptions.', 'Make unavailable dates understandable.'] },
  { id:'members', number:'03', name:'Members & access', short:'Members', symbol:'◎', color:'lilac', x:695, y:430,
    summary:'A welcome for members. Clear boundaries for everyone.',
    intent:'Recognize studio members and keep access to bookings appropriate to each role.',
    observed:'The sample membership model is accepted; invitation behavior is under consideration.',
    question:'Should the first members receive invitations or request access?',
    criteria:['Only authorized members can reserve.', 'Members can see their own reservations.', 'Administrators can manage membership.'] },
  { id:'messages', number:'04', name:'Messages & reminders', short:'Messages', symbol:'✉', color:'blue', x:430, y:530,
    summary:'The right information, at the right moment.',
    intent:'Keep members informed without creating unnecessary notifications.',
    observed:'Reminder copy is ready for sample review. Delivery integration is blocked on provider selection.',
    question:'Do members need a reminder on the day before their visit?',
    criteria:['Confirm every successful reservation once.', 'Use the member’s selected time zone.', 'Show delivery failures to operators.'] },
  { id:'operations', number:'05', name:'How we run it', short:'Operations', symbol:'⌘', color:'rose', x:165, y:430,
    summary:'Dependable releases, visible evidence, recoverable work.',
    intent:'Operate the booking service with clear ownership, observable failures, and recoverable changes.',
    observed:'The sample board illustrates a running accessibility pass and a planned release checklist.',
    question:'What is the smallest useful operational check before the pilot?',
    criteria:['Make failures visible.', 'Record release evidence.', 'Keep a tested recovery path.'] },
  { id:'future', number:'06', name:'Beyond the first release', short:'Future', symbol:'✧', color:'peach', x:165, y:220,
    summary:'Good possibilities, kept outside today’s promise.',
    intent:'Preserve promising ideas without quietly expanding the approved scope.',
    observed:'Recurring reservations and multi-location support remain future options.',
    question:'Which expansion is supported by actual pilot feedback?',
    criteria:['Keep ideas separate from commitments.', 'Attach learning to future proposals.', 'Approve scope changes before execution.'] }
];

export const initialState = {
  schema:1, projectId:project.id,
  work:[
    {id:'W-01', area:'booking', title:'Availability at a glance', status:'accepted', evidence:'Example: availability and conflict scenarios passed against the sample revision.'},
    {id:'W-02', area:'spaces', title:'Room profiles', status:'accepted', evidence:'Example: descriptions and capacity information reviewed.'},
    {id:'W-03', area:'members', title:'Membership boundaries', status:'accepted', evidence:'Example: member and visitor access scenarios reviewed.'},
    {id:'W-04', area:'booking', title:'Reservation confirmation', status:'review', evidence:'Illustrative evidence: happy path, duplicate submission, and occupied-slot scenarios pass. This is sample text, not a test report.', revision:'example-a12'},
    {id:'W-05', area:'operations', title:'Keyboard access through booking', status:'in-flight', evidence:'Illustrative worker snapshot: checking focus order. No worker is connected.'},
    {id:'W-06', area:'messages', title:'Reservation reminder copy', status:'review', evidence:'Illustrative evidence: copy includes the room, date, local time, and cancellation route. No delivery integration has been verified.', revision:'example-b07'},
    {id:'W-07', area:'messages', title:'Connect message delivery', status:'blocked', evidence:'Waiting for a delivery provider decision.'},
    {id:'W-08', area:'spaces', title:'Opening-hour exceptions', status:'planned', evidence:'Scope has not yet been approved.'},
    {id:'W-09', area:'operations', title:'Pilot release checklist', status:'planned', evidence:'Depends on reservation review and operational checks.'},
    {id:'W-10', area:'booking', title:'Time zone labels', status:'accepted', evidence:'Example: daylight-saving and local-time labels reviewed.'},
    {id:'W-11', area:'future', title:'Recurring reservations', status:'idea', evidence:'Outside the first release.'},
    {id:'W-12', area:'future', title:'Multiple locations', status:'idea', evidence:'Revisit after pilot feedback.'}
  ],
  proposals:[
    {id:'D-01', area:'booking', title:'How long should a booking hold last?', version:1, status:'pending',
      why:'A short hold lets someone finish their reservation without another member taking the same slot. Too long a hold hides useful availability.',
      recommendation:'A five-minute hold', options:['A five-minute hold','A ten-minute hold','No temporary hold'],
      tradeoff:'Five minutes keeps availability moving; slower members may need to start again.',
      scope:'Reservation hold and expiry behavior only. Payment and recurring bookings are excluded.',
      success:'Expired holds release their slot, and two simultaneous confirmations cannot claim the same slot.'},
    {id:'D-02', area:'messages', title:'Send one reminder before the visit?', version:1, status:'pending',
      why:'Members need enough notice to plan a visit, without a stream of messages.',
      recommendation:'One reminder, 24 hours before', options:['One reminder, 24 hours before','Confirmation only','Let each member choose'],
      tradeoff:'One default is easy to understand but may not suit every member.',
      scope:'Reminder timing for confirmed reservations; delivery provider selection is separate.',
      success:'An eligible reservation receives at most one reminder, and cancelled reservations receive none.'},
    {id:'D-03', area:'members', title:'How should the first members join?', version:1, status:'pending',
      why:'The pilot is for a known studio community. Access should stay manageable while the experience is being tested.',
      recommendation:'Invite-only for the pilot', options:['Invite-only for the pilot','Request access','Open registration'],
      tradeoff:'Invitations keep onboarding bounded but require an administrator’s time.',
      scope:'Pilot membership only; public registration is outside the baseline.',
      success:'Only invited members can activate an account, and expired invitations cannot be reused.'}
  ],
  events:[
    {id:'E-3', at:'2026-10-08T09:20:00Z', actor:'Example coordinator', title:'Reservation confirmation ready for review', detail:'W-04 · Sample evidence attached. No real tests were run.'},
    {id:'E-2', at:'2026-10-07T14:00:00Z', actor:'Example Director', title:'Time zone labels accepted', detail:'W-10 · Illustrative acceptance record.'},
    {id:'E-1', at:'2026-10-06T10:00:00Z', actor:'Example Director', title:'Concept baseline established', detail:'C-01 · Fictional approval used to demonstrate a populated atlas.'}
  ]
};
