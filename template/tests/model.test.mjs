import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState } from '../data.js';
import { applyDemoAction, summarize, clone } from '../model.js';

test('approval records a bounded choice without creating or starting work', () => {
  const next = applyDemoAction(initialState,{type:'approve',id:'D-01',version:1,choice:'A five-minute hold'});
  assert.equal(next.proposals[0].status,'approved');
  assert.equal(summarize(next).pending,2);
  assert.deepEqual(next.work,initialState.work);
  assert.equal(initialState.proposals[0].status,'pending');
  assert.throws(() => applyDemoAction(next,{type:'approve',id:'D-01',version:1,choice:'A five-minute hold'}));
});
test('stale decisions and unsupported choices cannot be recorded', () => {
  assert.throws(() => applyDemoAction(initialState,{type:'approve',id:'D-01',version:2,choice:'A five-minute hold'}));
  assert.throws(() => applyDemoAction(initialState,{type:'approve',id:'D-01',version:1,choice:'Anything'}));
  assert.throws(() => applyDemoAction(initialState,{type:'revise',id:'D-01',version:1,note:'  '}));
});
test('acceptance is tied to the sample revision and changes derived progress once', () => {
  assert.throws(() => applyDemoAction(initialState,{type:'accept',id:'W-04',revision:'old'}));
  const next = applyDemoAction(initialState,{type:'accept',id:'W-04',revision:'example-a12'});
  assert.equal(summarize(next).accepted,5);
  assert.equal(summarize(next).review,1);
  assert.throws(() => applyDemoAction(next,{type:'accept',id:'W-04',revision:'example-a12'}));
});
test('pause request never claims acknowledged worker state', () => {
  const next = applyDemoAction(initialState,{type:'pause',id:'W-05',note:'Reconsider the priority'});
  assert.equal(next.work.find(w => w.id === 'W-05').status,'pause-requested');
  assert.equal(summarize(next).active,1);
});
test('rework and direction preserve the Director note in history', () => {
  const next = applyDemoAction(initialState,{type:'rework',id:'W-04',revision:'example-a12',note:'Cover daylight saving.'});
  assert.equal(next.work.find(w => w.id === 'W-04').status,'rework');
  assert.equal(next.events[0].detail,'Cover daylight saving.');
  const directed = applyDemoAction(next,{type:'steer',area:'booking',note:'Review mobile booking first.'});
  assert.deepEqual(directed.work,next.work);
  assert.equal(directed.events[0].detail,'Review mobile booking first.');
});

const approveBooking = () => applyDemoAction(initialState,{type:'approve',id:'D-01',version:1,choice:'A five-minute hold'},'2026-10-08T10:00:00Z');
const amendment = {type:'amend',id:'D-01',version:1,decisionRevision:1,outcome:'approved',choice:'A ten-minute hold',note:'Allow more time during the pilot.'};

test('changing a decision preserves the original, records a new revision and leaves work alone', () => {
  const previous = approveBooking();
  const next = applyDemoAction(previous,amendment,'2026-10-08T11:00:00Z');
  const p = next.proposals[0];
  assert.equal(p.choice,'A ten-minute hold');
  assert.equal(p.version,1);
  assert.equal(p.decisionRevision,2);
  assert.equal(p.decisionHistory[0].choice,'A five-minute hold');
  assert.equal(p.decisionHistory[0].decidedAt,'2026-10-08T10:00:00Z');
  assert.equal(next.events[0].proposalId,'D-01');
  assert.equal(next.events[0].detail,amendment.note);
  assert.deepEqual(next.events.slice(1),previous.events);
  assert.deepEqual(next.work,previous.work);
  assert.equal(previous.proposals[0].choice,'A five-minute hold');
  assert.throws(() => applyDemoAction(next,amendment),/has changed/);
});

test('amendments require rationale, current revisions, and valid outcomes and choices', () => {
  const previous = approveBooking();
  for (const patch of [{note:' '},{version:9},{decisionRevision:0},{outcome:'other'},{choice:'other'}]) {
    assert.throws(() => applyDemoAction(previous,{...amendment,...patch}));
  }
  assert.throws(() => applyDemoAction(initialState,amendment));
});

test('reopening clears authorization, restores pending counts, and rejects pre-reopen commands', () => {
  const reopened = applyDemoAction(approveBooking(),{...amendment,outcome:'pending'});
  assert.equal(summarize(reopened).pending,3);
  assert.equal(reopened.proposals[0].choice,undefined);
  assert.equal(reopened.proposals[0].decidedAt,undefined);
  const command = {type:'approve',id:'D-01',version:1,choice:'No temporary hold'};
  assert.throws(() => applyDemoAction(reopened,command));
  const next = applyDemoAction(reopened,{...command,decisionRevision:2});
  assert.equal(next.proposals[0].decisionRevision,3);
  assert.equal(next.proposals[0].decisionHistory[0].choice,'A five-minute hold');
});

test('older saved decisions remain editable, including decline and revision requests', () => {
  const saved = clone(approveBooking());
  delete saved.proposals[0].decisionRevision;
  const declined = applyDemoAction(saved,{...amendment,outcome:'declined'});
  assert.equal(declined.proposals[0].status,'declined');
  assert.equal(declined.proposals[0].choice,undefined);
  const revised = applyDemoAction(declined,{...amendment,decisionRevision:2,outcome:'changes-requested'});
  assert.equal(revised.proposals[0].status,'changes-requested');
  const approved = applyDemoAction(revised,{...amendment,decisionRevision:3});
  assert.equal(approved.proposals[0].decisionHistory.length,3);
  assert.equal(approved.proposals[0].choice,'A ten-minute hold');
});
