// Demo state only. This module is NOT an authorization boundary or an executor.
export const labels = {
  accepted:'Accepted', 'in-flight':'In flight', review:'For review', planned:'Planned',
  blocked:'Blocked', idea:'Idea', 'pause-requested':'Pause requested',
  'cancel-requested':'Cancel requested', rework:'Changes requested'
};
export const clone = value => JSON.parse(JSON.stringify(value));
export const decisionRevision = p => p.decisionRevision ?? (p.status === 'pending' ? 0 : 1);
export function summarize(state, area) {
  const work = state.work.filter(w => !area || w.area === area);
  return { total:work.length, accepted:work.filter(w => w.status === 'accepted').length,
    active:work.filter(w => ['in-flight','pause-requested','cancel-requested'].includes(w.status)).length,
    review:work.filter(w => w.status === 'review').length,
    pending:state.proposals.filter(p => p.status === 'pending' && (!area || p.area === area)).length };
}
export function applyDemoAction(current, action, now = new Date().toISOString()) {
  const next = clone(current);
  const p = next.proposals.find(p => p.id === action.id);
  const w = next.work.find(w => w.id === action.id);
  const note = (action.note || '').trim();
  if (note.length > 2000) throw new Error('Keep your direction under 2,000 characters.');
  let title;
  if (['approve','revise','decline'].includes(action.type)) {
    if (!p || p.status !== 'pending' || p.version !== action.version || decisionRevision(p) !== (action.decisionRevision ?? 0)) throw new Error('This proposal has changed. Open its current version.');
    const previousRevision = decisionRevision(p);
    if (action.type === 'approve') {
      if (!p.options.includes(action.choice)) throw new Error('Choose one of the proposed options.');
      p.status = 'approved'; p.choice = action.choice;
      title = `${p.id} approved for later: ${action.choice}`;
    } else {
      if (!note) throw new Error('Add your direction before recording this decision.');
      p.status = action.type === 'revise' ? 'changes-requested' : 'declined';
      title = `${p.id}: ${action.type === 'revise' ? 'changes requested' : 'declined'}`;
    }
    p.note = note; p.decidedAt = now; p.decisionRevision = previousRevision + 1;
  } else if (action.type === 'amend') {
    if (!p || !['approved','declined','changes-requested'].includes(p.status) || p.version !== action.version || decisionRevision(p) !== action.decisionRevision) throw new Error('This decision has changed. Open its current version.');
    if (!note) throw new Error('Explain why you are changing this decision.');
    if (!['approved','declined','changes-requested','pending'].includes(action.outcome)) throw new Error('Choose a valid decision outcome.');
    if (action.outcome === 'approved' && !p.options.includes(action.choice)) throw new Error('Choose one of the proposed options.');
    const oldRevision = decisionRevision(p);
    const previous = { revision:oldRevision, proposalVersion:p.version, status:p.status, choice:p.choice, note:p.note, decidedAt:p.decidedAt };
    p.decisionHistory = [...(p.decisionHistory || []), previous];
    p.decisionRevision = oldRevision + 1;
    p.status = action.outcome; p.note = note;
    if (p.status === 'approved') p.choice = action.choice; else delete p.choice;
    if (p.status === 'pending') delete p.decidedAt; else p.decidedAt = now;
    p.changedAt = now;
    const outcome = value => value.status === 'approved' ? value.choice : ({pending:'Reopened for consideration',declined:'Declined','changes-requested':'Changes requested'}[value.status]);
    title = `${p.id} decision changed (r${oldRevision} → r${p.decisionRevision}): ${outcome(previous)} → ${outcome(p)}`;
  } else if (['accept','rework'].includes(action.type)) {
    if (!w || w.status !== 'review' || w.revision !== action.revision) throw new Error('This result is no longer awaiting review.');
    if (action.type === 'rework' && !note) throw new Error('Explain what needs to change.');
    w.status = action.type === 'accept' ? 'accepted' : 'rework';
    w.note = note;
    title = `${w.id}: ${action.type === 'accept' ? 'sample result accepted' : 'changes requested'}`;
  } else if (['pause','cancel'].includes(action.type)) {
    if (!w || w.status !== 'in-flight') throw new Error('This work is no longer in flight.');
    if (!note) throw new Error('Add a reason for this request.');
    w.status = `${action.type}-requested`; w.note = note;
    title = `${w.id}: ${action.type} requested — no worker acknowledgement`;
  } else if (action.type === 'steer') {
    if (!note) throw new Error('Describe the improvement you want.');
    if (!action.area) throw new Error('Select a project area.');
    title = `Direction recorded for ${action.area}`;
  } else throw new Error('Unsupported demo command.');
  next.events.unshift({ id:`local-${next.events.length + 1}-${now}`, at:now, actor:'Director · local demo', title,
    ...(p ? {proposalId:p.id, decisionRevision:decisionRevision(p)} : {}),
    detail:note || 'Saved in this browser only. No execution started.' });
  return next;
}
