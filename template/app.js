import { project, areas, initialState } from './data.js';
import { clone, summarize, applyDemoAction, labels, decisionRevision } from './model.js';

const $ = selector => document.querySelector(selector);
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key = `living-project-atlas:template:v1:${project.id}`;
let state = clone(initialState), storageWarning = '', search = '', filter = 'all', mapLens = 'all', dialogContext;
let toastTimer;
try {
  const saved = JSON.parse(localStorage.getItem(key) || 'null');
  if (saved?.schema === 1 && saved.projectId === project.id && Array.isArray(saved.work) && Array.isArray(saved.proposals) && Array.isArray(saved.events)) state = saved;
} catch { storageWarning = 'Browser storage is unavailable or unreadable. Changes will last only for this session.'; }

const areaById = id => areas.find(a => a.id === id);
const areaName = id => areaById(id)?.name || id;
const badge = status => `<span class="pill ${escape(status)}">${escape(labels[status] || ({pending:'For the Director',approved:'Approved for later','changes-requested':'Changes requested',declined:'Declined'}[status]) || status)}</span>`;
const date = value => new Date(value).toLocaleDateString('en-GB', {day:'numeric',month:'short'});
const progress = work => `<div class="progress-track" role="img" aria-label="${work.filter(w => w.status === 'accepted').length} of ${work.length} items accepted">${work.map(w => `<span class="${w.status === 'accepted' ? 'done' : ''}"></span>`).join('')}</div>`;
const action = (label, type, id, primary = false) => `<button class="button${primary ? ' primary' : ''}" data-action="${type}" data-id="${escape(id)}">${label}</button>`;
const notice = text => `<div class="notice"><span aria-hidden="true">ⓘ</span><p>${text}</p></div>`;
const header = (eyebrow, title, intro) => `<header class="page-heading"><div class="eyebrow">${eyebrow}</div><h1>${escape(title)}</h1><p>${escape(intro)}</p></header>`;
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 6500); }
function persist(next) {
  state = next;
  try { localStorage.setItem(key, JSON.stringify(state)); }
  catch { storageWarning = 'Browser storage is unavailable. Changes will last only for this session.'; }
}

function renderRail() {
  const s = summarize(state), current = location.hash.slice(1) || 'overview';
  const link = (href, title, icon, count, alert = false) => `<a class="nav-link" href="#${href}"${current === href ? ' aria-current="page"' : ''}><span class="num">${icon}</span><span>${title}</span>${count === undefined ? '' : `<span class="count${alert ? ' alert' : ''}">${count}</span>`}</a>`;
  $('#rail').innerHTML = `<a href="#overview" class="brand"><span class="brand-line"><span class="brand-star">✳</span><span class="eyebrow">Living Project Atlas</span></span><span class="brand-title">${escape(project.name)}</span></a><button class="mobile-close" aria-label="Close contents">×</button>
    <div class="rail-content"><label class="searchbox"><span aria-hidden="true">⌕</span><input type="search" id="search" aria-label="Search the atlas" placeholder="Search the atlas" value="${escape(search)}"><kbd>/</kbd></label>
    <a class="map-shortcut" href="#map"><span class="map-icon">✳</span><span><strong>The project map</strong><small>The whole picture. Then zoom in.</small></span></a>
    <nav aria-label="Workspace"><div class="nav-label">The workspace</div>${link('overview','Project at a glance','◉')}${link('decisions','For the Director','◇',s.pending,true)}${link('work','Work & progress','↗',s.active)}${link('review','Ready for review','☷',s.review)}
    <div class="nav-label">Inside the project</div>${areas.map(a => `${link(`area/${a.id}`,escape(a.name),a.number)}<div class="tiny-progress" aria-hidden="true">${state.work.filter(w => w.area === a.id).map(w => `<span class="${w.status === 'accepted' ? 'done' : ''}"></span>`).join('')}</div>`).join('')}
    <div class="nav-label">The record</div>${link('concept','The agreed direction','⊙')}${link('activity','Decisions & changelog','≡',state.events.length)}</nav></div>
    <div class="rail-bottom"><a href="#about">About this template ↗</a><span>${s.total} parts · ${areas.length} areas · Example project</span></div>`;
  $('#search').addEventListener('input', event => {
    search = event.target.value;
    if (location.hash !== '#search') location.hash = 'search'; else renderPage();
  });
  $('.mobile-close').addEventListener('click', closeMenu);
}

function heroArt() {
  return `<svg class="hero-art" viewBox="0 0 640 440" aria-label="Concept illustration: a shared studio floor plan" role="img"><defs><pattern id="blueprint" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#81967d" stroke-width=".4" opacity=".32"/></pattern></defs><rect width="640" height="440" fill="url(#blueprint)"/><g fill="none" stroke="#b0bd93" stroke-width="1"><circle cx="418" cy="230" r="183" opacity=".2"/><circle cx="418" cy="230" r="151" opacity=".2"/><path d="M70 386L613 90M141 430L640 158M180 8L640 271" opacity=".25"/></g><g transform="translate(220 85) rotate(-17 140 140) skewX(10)"><path d="M0 30H280V276H0Z" fill="#345849" stroke="#aebc91" stroke-width="2"/><path d="M0 30L15 10H296L280 30M280 30L296 10V258L280 276" fill="#48634e" stroke="#b9c49e"/><path d="M0 149H280M151 30V276M0 42H139V137H0M162 42H268V137H162" fill="none" stroke="#c0c6a2" stroke-width="4"/><path d="M139 100V137H101M151 149V202M151 244V276M0 263H139" fill="none" stroke="#d1cfac" stroke-width="3"/><path d="M102 137A37 37 0 0 1 139 100M151 202A42 42 0 0 1 193 244H151" fill="none" stroke="#92a686" stroke-dasharray="3 3"/><rect x="35" y="62" width="64" height="37" rx="3" fill="#627859" stroke="#d6d2a9"/><path d="M43 55H91M43 106H91" stroke="#d6d2a9" stroke-width="5"/><rect x="192" y="55" width="47" height="60" rx="2" fill="#aaab79"/><path d="M180 68V100M250 68V100" stroke="#d0caa0" stroke-width="5"/><rect x="26" y="181" width="75" height="44" rx="2" fill="#526e51" stroke="#b7c497"/><path d="M35 174H92M35 233H92" stroke="#b7c497" stroke-width="5"/><circle cx="227" cy="198" r="26" fill="#799068" stroke="#d0cba3"/><circle cx="257" cy="245" r="12" fill="#688654" stroke="#b8c68f"/><circle cx="119" cy="63" r="11" fill="#688654" stroke="#b8c68f"/><g fill="#d5dab9" font-family="monospace" font-size="8"><text x="39" y="125">STUDIO 01</text><text x="184" y="130">STUDIO 02</text><text x="24" y="252">THE WORKSHOP</text><text x="185" y="258">COMMON ROOM</text></g><path d="M-14 30H-27V276H-14M0 296V310H280V296" fill="none" stroke="#96a783" stroke-width=".7"/></g><g fill="#c4cbae" font-family="monospace" font-size="9"><text x="440" y="58">ROOM TO MAKE THINGS.</text><text x="388" y="410">FIG. 01 / THE SHARED STUDIO</text></g><g transform="translate(581 347)" stroke="#d5d2a9" fill="none"><circle r="22" opacity=".5"/><path d="M0 -30V30M-30 0H30" opacity=".5"/><path d="M0 -18L-5 8L0 4L5 8Z" fill="#d5d2a9"/></g></svg>`;
}

function atlasMap(lens = 'all', large = false) {
  const hasLens = a => lens === 'all' || (lens === 'decisions' ? state.proposals.some(p => p.area === a.id && p.status === 'pending') : state.work.some(w => w.area === a.id && (w.status === lens || (lens === 'in-flight' && ['pause-requested','cancel-requested'].includes(w.status)))));
  return `<div class="map-panel${large ? ' large' : ''}"><svg viewBox="0 0 860 640" role="group" aria-label="Project map. Select an area to explore it."><defs><pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path class="map-grid" d="M24 0H0V24" fill="none"/></pattern></defs><rect width="860" height="640" fill="url(#map-grid)"/><ellipse cx="430" cy="320" rx="300" ry="230" fill="none" stroke="#cad3bf" stroke-dasharray="2 7"/>
    ${areas.map(a => `<path class="map-line" d="M430 320Q${a.x} 320 ${a.x} ${a.y}"/>`).join('')}
    <circle cx="430" cy="320" r="83" fill="#e0e6d5" stroke="#c3cfb5"/><circle cx="430" cy="320" r="68" fill="#faf9ef" stroke="#afc09f"/><text x="430" y="306" text-anchor="middle" fill="#385240" font-family="Georgia" font-size="23">${escape(project.name)}</text><text x="430" y="330" text-anchor="middle" fill="#6c7e61" font-family="sans-serif" font-size="9" letter-spacing="2">THE WHOLE PROJECT</text><text x="430" y="353" text-anchor="middle" fill="#6c7e61" font-family="sans-serif" font-size="10">${state.work.length} parts · ${areas.length} areas</text>
    ${areas.map(a => { const s = summarize(state,a.id); return `<a href="#area/${a.id}" class="map-node${hasLens(a) ? '' : ' dim'}" aria-label="${escape(a.name)}, ${s.total} parts, ${s.pending} decisions"><g transform="translate(${a.x - 109} ${a.y - 45})"><rect width="218" height="91" rx="8" class="fill-${a.color}"/><circle cx="29" cy="30" r="15" fill="#fffef9" opacity=".65"/><text x="29" y="35" text-anchor="middle" font-size="17">${a.symbol}</text><text x="54" y="25" font-size="8">AREA ${a.number}</text><text x="54" y="46" class="node-name">${a.short}</text><text x="18" y="73" font-size="10">${s.total} parts · ${s.accepted} accepted</text>${s.pending ? `<circle cx="201" cy="9" r="12" fill="#b99148"/><text x="201" y="13" text-anchor="middle" fill="#fff" font-size="10">${s.pending}</text>` : ''}</g></a>`; }).join('')}
    <text x="26" y="610" font-family="monospace" font-size="9" fill="#7d8a71">LPA / PROJECT CARTOGRAPHY</text><text x="824" y="34" text-anchor="end" font-family="monospace" font-size="10" fill="#7d8a71">N ↑</text></svg>
    <div class="map-footer"><div class="legend"><span><i class="dot"></i> Project area</span><span><i class="dot amber"></i> Director decision</span></div><span>Select an area to read its story ↗</span></div></div>`;
}

function areaCards() {
  return `<div class="area-grid">${areas.map(a => { const s = summarize(state,a.id); return `<a class="area-card" href="#area/${a.id}"><div class="area-card-top"><span class="mono">${a.number} / ${a.short.toUpperCase()}</span><span class="area-symbol">${a.symbol}</span></div><h3>${escape(a.name)}</h3><p>${escape(a.summary)}</p><footer><span>${s.accepted} of ${s.total} parts accepted</span><span>${s.pending ? `${s.pending} to decide` : 'Explore'} ↗</span></footer></a>`; }).join('')}</div>`;
}
function eventsList(limit = Infinity) {
  return `<div class="record">${state.events.slice(0,limit).map(e => {
    const p = state.proposals.find(p => e.proposalId === p.id || (!e.proposalId && (e.title.startsWith(`${p.id} `) || e.title.startsWith(`${p.id}:`))));
    return `<article class="event"><time datetime="${escape(e.at)}">${escape(date(e.at))}</time><div><h3>${escape(e.title)}</h3><p>${escape(e.detail)}</p>${p ? `<div class="actions">${action('View current decision','proposal',p.id)}${p.status !== 'pending' ? action('Change decision','change-decision',p.id) : ''}</div>` : ''}</div><small>${escape(e.actor)}</small></article>`;
  }).join('')}</div>`;
}

function decisionHistory(p) {
  if (!p.decisionHistory?.length) return '';
  return `<details class="decision-history"><summary>Previous decisions (${p.decisionHistory.length})</summary>${[...p.decisionHistory].reverse().map(d => `<section><h3>Decision r${d.revision} · proposal v${d.proposalVersion}</h3><p>${escape(d.choice || ({declined:'Declined','changes-requested':'Changes requested',pending:'Reopened for consideration'}[d.status]) || d.status)}</p>${d.note ? `<p>${escape(d.note)}</p>` : ''}${d.decidedAt ? `<p class="mono">${escape(new Date(d.decidedAt).toLocaleString('en-GB'))}</p>` : ''}</section>`).join('')}</details>`;
}
function phaseSummary() {
  return `<section class="context-summary" aria-label="Project phase and direction"><div><span class="eyebrow">Current phase · example</span><h2>${escape(project.phase)}</h2><p>${escape(project.phaseNote)}</p></div><div><span class="eyebrow">Leading concept</span><p><a href="#concept">${escape(project.baseline.version)} · Read the agreed direction ↗</a></p><p>Fictional approval only. No real build or execution authority.</p></div></section>`;
}
function workBasis(w) {
  const area = areaById(w.area);
  const related = state.proposals.filter(p => p.area === w.area);
  const dependencyIds = ({'W-04':['W-01','W-03'],'W-05':['W-04'],'W-06':['W-04'],'W-07':['W-06'],'W-09':['W-04','W-05','W-07']})[w.id] || [];
  const dependencies = dependencyIds.map(id => state.work.find(item => item.id === id)).filter(Boolean);
  return `<details class="work-basis"><summary>Basis for this work</summary><p class="sample-label">Current example planning references · not delivered agent context</p><dl><dt>Phase and concept</dt><dd>${escape(project.phase)} · ${escape(project.baseline.version)}. ${escape(project.phaseNote)}</dd><dt>Objective and scope</dt><dd>${escape(w.title)} — ${escape(area?.intent)} ${w.area === 'future' ? 'Outside the approved example milestone; a new scope decision would be required.' : `Within the example milestone: ${escape(project.baseline.scope)}`} Exclusions: ${escape(project.baseline.exclusions)}</dd><dt>Related decisions now</dt><dd>${related.length ? related.map(p => `${escape(p.id)} · proposal v${p.version} · decision r${decisionRevision(p)} · ${escape(p.status)}${p.choice ? ` · ${escape(p.choice)}` : ''}`).join('<br>') : 'No related decision is included in this example.'}</dd><dt>Example dependencies</dt><dd>${dependencies.length ? dependencies.map(d => `${escape(d.id)} · ${escape(d.title)} · ${escape(labels[d.status] || d.status)}`).join('<br>') : 'No dependency is specified in this example; this is not a verified readiness assessment.'}</dd><dt>Criteria to check</dt><dd><ul>${(area?.criteria || []).map(c => `<li>${escape(c)}</li>`).join('')}</ul></dd><dt>Authority and freshness</dt><dd>No real execution authorization or delivered context package exists. These references reflect current local demo records, including changed decisions. Historical attempts in an operational atlas must retain the exact context originally delivered; current choices cannot retroactively authorize work.</dd></dl></details>`;
}
function overview() {
  const s = summarize(state), pending = state.proposals.find(p => p.status === 'pending');
  return `<section class="hero">${heroArt()}<div class="hero-edition">EXAMPLE PROJECT / VOL. ${project.edition}</div><div class="hero-copy"><div class="eyebrow">The living project atlas</div><h1>${escape(project.name)}</h1><p class="hero-intro">${escape(project.tagline)}<br>From the first idea to the work in motion.</p><span class="pill">First milestone · ${escape(project.milestone)}</span></div><div class="hero-caption">CONCEPT ILLUSTRATION · NOT A PRODUCT SCREENSHOT</div></section>
    <div class="content">${phaseSummary()}<div class="stats"><a class="stat" href="#map"><span class="eyebrow">The whole picture</span><span class="stat-number">${areas.length} <small>areas</small></span><span class="stat-note">One connected project ↗</span></a><a class="stat" href="#decisions"><span class="eyebrow">For the Director</span><span class="stat-number">${s.pending} <small>decisions</small></span><span class="stat-note">Your direction is needed ↗</span></a><a class="stat" href="#work"><span class="eyebrow">In motion</span><span class="stat-number">${s.active} <small>in flight</small></span><span class="stat-note">${s.review} results ready for review ↗</span></a><a class="stat" href="#work"><span class="eyebrow">Accepted progress</span><span class="stat-number">${s.accepted}<small> / ${s.total} parts</small></span><span class="stat-note">Example records, with evidence ↗</span></a></div>
    <section class="section"><div class="section-heading"><div><div class="eyebrow">Right now</div><h2>On the desk</h2></div><a class="text-link" href="#decisions">Open the Director’s desk ↗</a></div><div class="desk"><article class="decision-preview">${pending ? `${badge('pending')}<h3>${escape(pending.title)}</h3><p>Recommended: ${escape(pending.recommendation)}.</p><div class="actions">${action('Consider the proposal ↗','proposal',pending.id,true)}<span class="mono">${pending.id} · v${pending.version}</span></div>` : `<span class="eyebrow">All caught up</span><h3>No decisions waiting.</h3><p>Your recorded choices are in the decision history.</p><div class="actions"><a class="button" href="#decisions">View decisions ↗</a></div>`}</article><article class="work-preview"><div class="eyebrow">The first useful release</div>${state.work.filter(w => ['in-flight','review'].includes(w.status)).slice(0,2).map(w => `<a href="#${w.status === 'review' ? 'review' : 'work'}" class="mini-row"><span><strong>${escape(w.title)}</strong><small>${escape(areaName(w.area))}</small></span>${badge(w.status)}</a>`).join('')}<div class="progress-summary"><span>Accepted work · example records</span><strong>${s.accepted} / ${s.total}</strong></div>${progress(state.work)}</article></div></section>
    <section class="section"><div class="section-heading"><div><div class="eyebrow">The map</div><h2>${areas.length} areas. One shared direction.</h2><p>Follow the connections, or step into a part of the project.</p></div><a class="text-link" href="#map">Unfold the map ↗</a></div>${atlasMap()}</section>
    <section class="section"><div class="section-heading"><div><div class="eyebrow">Inside the atlas</div><h2>The project, chapter by chapter</h2></div></div>${areaCards()}</section>
    <section class="section"><div class="section-heading"><div><div class="eyebrow">The record</div><h2>What moved forward</h2></div><a class="text-link" href="#activity">The full changelog ↗</a></div>${eventsList(3)}</section></div>`;
}

function decisions() {
  const list = state.proposals.filter(p => filter === 'all' || p.status === filter);
  return `${header('The Director’s desk','A little direction. A clear next step.','Understand the choice, compare the alternatives, and tell the project where to go.')}<div class="content page-content">${notice('Interactive example. Decisions are stored in this browser. Approval records a choice for later; it does not start execution.')}<div class="filters" aria-label="Filter decisions">${[['all','All decisions'],['pending','Waiting for you'],['approved','Approved'],['changes-requested','Changes requested'],['declined','Declined']].map(([id,name]) => `<button class="filter" data-filter="${id}" aria-pressed="${filter === id}">${name}</button>`).join('')}</div>${list.length ? list.map(p => `<article class="list-card"><div class="card-meta"><span class="mono">${escape(p.id)} · v${p.version}</span><a href="#area/${p.area}">${escape(areaName(p.area))} ↗</a>${badge(p.status)}</div><h3>${escape(p.title)}</h3><p>${escape(p.why)}</p>${p.choice ? `<p><strong>Recorded choice:</strong> ${escape(p.choice)}</p>` : `<p><strong>Recommended:</strong> ${escape(p.recommendation)}</p>`}${p.note ? `<p><strong>Director’s note:</strong> ${escape(p.note)}</p>` : ''}<div class="actions">${action(p.status === 'pending' ? 'Consider the proposal ↗' : 'Read the decision ↗','proposal',p.id,p.status === 'pending')}${p.status !== 'pending' ? action('Change decision','change-decision',p.id) : ''}</div></article>`).join('') : empty('Nothing in this view','Try another decision filter.')}</div>`;
}
function empty(title, text) { return `<div class="empty"><h3>${title}</h3><p>${text}</p></div>`; }
function workCard(w) {
  return `<article class="work-card"><div class="card-meta"><span class="mono">${w.id}</span>${badge(w.status)}</div><h3>${escape(w.title)}</h3><p>${escape(areaName(w.area))}</p><p>${escape(w.note || w.evidence)}</p><div class="actions">${w.status === 'review' ? action('Review result','result',w.id) : action('Inspect work','work-detail',w.id)}</div></article>`;
}
function workPage() {
  const groups = [['Next & waiting',['planned','blocked','idea','rework']],['In motion',['in-flight','pause-requested','cancel-requested']],['Review & accepted',['review','accepted']]];
  return `${header('The work','Progress you can account for.','Follow each piece of work from a bounded proposal to an accepted result.')}<div class="content page-content">${phaseSummary()}${notice('This board shows illustrative records. No worker is connected. Pause and cancel controls record a demo request; they cannot stop a real process.')}<div class="board">${groups.map(([title,statuses]) => { const list = state.work.filter(w => statuses.includes(w.status)); return `<section class="board-column"><h2>${title}<span>${list.length}</span></h2>${list.map(workCard).join('') || '<p class="muted">No work here.</p>'}</section>`; }).join('')}</div></div>`;
}
function reviewPage() {
  const list = state.work.filter(w => w.status === 'review');
  return `${header('Close the loop','Ready for your review.','Inspect what changed and the evidence attached to that exact result before accepting it.')}<div class="content page-content">${notice('The evidence below is fictional example text. Accepting it only changes the local demonstration. A real project must attach actual checks, artifacts, and revision identifiers.')}${list.map(w => `<article class="list-card"><div class="card-meta"><span class="mono">${w.id} · ${w.revision}</span>${badge(w.status)}</div><h3>${escape(w.title)}</h3><p>${escape(w.evidence)}</p><div class="actions">${action('Inspect evidence & review ↗','result',w.id,true)}</div></article>`).join('') || empty('The review desk is clear','Accepted results remain visible in Work & progress and the changelog.')}</div>`;
}
function areaPage(id) {
  const a = areaById(id); if (!a) return notFound();
  const proposals = state.proposals.filter(p => p.area === id), work = state.work.filter(w => w.area === id);
  return `${header(`Chapter ${a.number} / ${a.short}`,a.name,a.summary)}<div class="content page-content"><div class="article-layout"><article><section class="article-section"><h2>What this part is for</h2><p>${escape(a.intent)}</p></section><section class="article-section"><h2>Where it stands</h2><div class="sample-label">Initial example context</div><p>${escape(a.observed)}</p><div class="progress-summary"><span>Accepted example records</span><span>${work.filter(w => w.status === 'accepted').length} / ${work.length}</span></div>${progress(work)}${work.map(w => `<div class="mini-row"><div><strong>${escape(w.title)}</strong><small>${w.id}</small></div>${badge(w.status)}</div>`).join('')}</section><section class="article-section"><h2>What needs to be true</h2><ul>${a.criteria.map(c => `<li>${escape(c)}</li>`).join('')}</ul></section><section class="article-section"><h2>The question on the table</h2><div class="question">${escape(a.question)}</div>${proposals.map(p => `<div class="mini-row"><span>${escape(p.title)}<br>${badge(p.status)}</span>${action('Read proposal','proposal',p.id)}</div>`).join('')}</section><section><h2>Shape the next iteration</h2><p class="muted">Capture a correction, a new possibility, or a change in priority.</p><div class="actions">${action('Give direction ↗','steer',a.id,true)}</div></section></article><aside class="article-aside"><h3>This chapter</h3><p>${a.number} / ${escape(a.name)}</p><a href="#map">← Back to the project map</a><a href="#concept">The agreed direction ↗</a><h3>Connected work</h3><a href="#work">${work.length} work items ↗</a><a href="#decisions">${proposals.filter(p => p.status === 'pending').length} decisions waiting ↗</a><h3>Reading this page</h3><p class="muted">Intent describes the goal. The work records show current example status. A decision authorizes a choice; evidence supports acceptance.</p>${action('Give direction','steer',a.id)}</aside></div></div>`;
}
function mapPage() {
  return `${header('The fold-out / the whole project','The map of the project.','Every area has a purpose. Every piece of work belongs somewhere. Select an area to explore it.')}<div class="content page-content"><div class="map-toolbar"><div class="filters" aria-label="Map lenses">${[['all','Everything'],['decisions','Director decisions'],['in-flight','In flight'],['review','For review'],['accepted','Accepted']].map(([id,label]) => `<button class="filter" data-lens="${id}" aria-pressed="${mapLens === id}">${label}</button>`).join('')}</div></div>${atlasMap(mapLens,true)}<details class="map-list"><summary>Browse all areas as a list</summary>${areaCards()}</details></div>`;
}
function conceptPage() {
  const b = project.baseline;
  return `${header('The foundation / baseline '+b.version,'The direction we build from.','Agree on the idea and its boundaries first. Build the project’s atlas only after explicit Director approval.')}<div class="content page-content">${notice(escape(b.provenance))}${phaseSummary()}<div class="steps"><div class="step"><b>01 · Prepare</b>Workspace and context</div><div class="step"><b>02 · Explore</b>Research and refine</div><div class="step"><b>03 · Agree</b>Director approves concept</div><div class="step current"><b>04 · Build & hand over</b>Then operate through the atlas</div></div><div class="concept-grid">${[['Purpose',b.purpose],['Who it serves',b.audience],['First useful scope',b.scope],['Outside this release',b.exclusions],['Observable success',b.success],['Practical boundaries',b.constraints],['Why this direction',b.rationale],['Approval provenance',b.provenance]].map(([title,value]) => `<section class="concept-block"><h3>${title}</h3><p>${escape(value)}</p></section>`).join('')}</div><section class="section"><h2>When the direction changes</h2><p class="muted">Record the proposed revision and its impact. A material change needs a fresh Director decision on the affected scope.</p><div class="actions">${action('Propose a change in direction','steer','operations',true)}</div></section></div>`;
}
function searchPage() {
  const q = search.trim().toLowerCase();
  const records = [...areas.map(a => ({title:a.name,text:a.summary+' '+a.intent,kind:'Project area',href:`#area/${a.id}`})), ...state.proposals.map(p => ({title:p.title,text:p.why,kind:'Decision',action:'proposal',id:p.id})),...state.work.map(w => ({title:w.title,text:w.evidence,kind:'Work item',action:'work-detail',id:w.id}))];
  const found = q ? records.filter(r => `${r.title} ${r.text}`.toLowerCase().includes(q)) : [];
  return `${header('Search the atlas',q ? `Results for “${search}”` : 'Find your way in.','Search project areas, decisions, and work records.')}<div class="content page-content"><p class="sample-label">${q ? `${found.length} results` : 'Type in the search field in the contents panel.'}</p>${found.map(r => `<article class="search-result"><span class="eyebrow">${r.kind}</span><h3>${escape(r.title)}</h3><p>${escape(r.text)}</p><div class="actions">${r.href ? `<a class="button" href="${r.href}">Open area ↗</a>` : action('Open record ↗',r.action,r.id)}</div></article>`).join('') || (q ? empty('No matching records','Try a broader term such as booking, member, or reminder.') : '')}</div>`;
}
function aboutPage() {
  return `${header('The colophon','A frame for your next project.','An adaptable visual workspace for Living Project Atlas.')}<div class="content page-content about-copy"><h2>What you can try here</h2><p>Explore the project map, read an area, compare proposals, record a local decision, review sample evidence, and follow the resulting history. Your demo changes survive a reload in this browser when storage is available.</p><h2>What this template contains</h2><p>Original HTML, CSS, JavaScript, and SVG illustrations. No dependencies, accounts, external fonts, analytics, or hosted services. The layout takes inspiration from <a href="https://excavator.incodicelux.com/" target="_blank" rel="noreferrer">Excavator: the Project Atlas</a>: a contents rail, visual project introduction, fold-out map, topic chapters, status views, and a lasting record. Its code, game imagery, and project text are not included.</p><h2>Make it your project</h2><p>After concept approval, replace <code>data.js</code> with the approved project’s topics and records. Adjust the design tokens in <code>styles.css</code> and replace the concept illustration. Follow the root specification to implement a persistent service and a real execution connection. Read <code>VISUAL_TEMPLATE.md</code> for the full handover.</p><h2>A working preview, with a clear boundary</h2><p>The execution connection is unavailable. Start controls remain disabled. Browser storage is a demo convenience, not an operational database, approval authority, or work queue. Sample acceptance is not evidence of real work.</p><div class="actions"><button class="button" data-action="export">Export demo snapshot</button><button class="button danger" data-action="reset">Reset example data</button></div></div>`;
}
function notFound() { return `${header('Page not found','A path still to be drawn.','This address does not match a page in the atlas.')}<div class="content"><a class="button primary" href="#overview">Back to the project ↗</a></div>`; }

function renderPage() {
  const route = location.hash.slice(1) || 'overview';
  let html, name;
  if (route === 'overview' || route === 'main') { html = overview(); name = 'Project at a glance'; }
  else if (route === 'map') { html = mapPage(); name = 'The project map'; }
  else if (route === 'decisions') { html = decisions(); name = 'For the Director'; }
  else if (route === 'work') { html = workPage(); name = 'Work & progress'; }
  else if (route === 'review') { html = reviewPage(); name = 'Ready for review'; }
  else if (route === 'concept') { html = conceptPage(); name = 'The agreed direction'; }
  else if (route === 'activity') { html = `${header('The record','Every change has a story.','Decisions, direction, and accepted results in one attributable record.')}<div class="content page-content"><p class="sample-label">Seeded example events and your local demo actions.</p>${eventsList()}</div>`; name = 'Decisions & changelog'; }
  else if (route === 'search') { html = searchPage(); name = 'Search'; }
  else if (route === 'about') { html = aboutPage(); name = 'About this template'; }
  else if (route.startsWith('area/')) { html = areaPage(route.slice(5)); name = areaName(route.slice(5)); }
  else { html = notFound(); name = 'Page not found'; }
  $('#main').innerHTML = (storageWarning ? notice(escape(storageWarning)) : '') + html;
  $('#breadcrumbs').innerHTML = `<a href="#map">✳ <span class="breadcrumb-map">The map</span></a><span aria-hidden="true">/</span><span>${escape(name)}</span>`;
  document.title = `${name} · ${project.name} · Living Project Atlas`;
}
function render() { renderRail(); renderPage(); }
const narrowScreen = matchMedia('(max-width:780px)');
function closeMenu() {
  const wasFocused = $('#rail').contains(document.activeElement);
  $('#rail').classList.remove('open'); $('#menu').setAttribute('aria-expanded','false');
  $('#rail').inert = narrowScreen.matches;
  if (wasFocused && narrowScreen.matches) $('#menu').focus({preventScroll:true});
}
function openMenu() {
  $('#rail').inert = false; $('#rail').classList.add('open');
  $('#menu').setAttribute('aria-expanded','true'); $('#search').focus({preventScroll:true});
}
narrowScreen.addEventListener('change', closeMenu);
function openDialog(type, id) {
  const p = state.proposals.find(p => p.id === id), w = state.work.find(w => w.id === id);
  let title, content;
  dialogContext = { type,id,version:p?.version,revision:w?.revision,decisionRevision:p ? decisionRevision(p) : undefined };
  const noteField = label => `<label for="direction-note">${label}</label><textarea id="direction-note" maxlength="2000" placeholder="What should the project take into account?"></textarea>`;
  const connectionNotice = notice('Demo mode · saved in this browser only. Execution is not connected.');
  if (type === 'change-decision' && p && p.status !== 'pending') {
    title = 'Change decision';
    content = `<p><strong>${escape(p.title)}</strong></p><div class="card-meta"><span>${escape(p.id)} · proposal v${p.version} · decision r${decisionRevision(p)}</span>${badge(p.status)}</div><h3>Current decision</h3><p>${escape(p.choice || ({declined:'Declined','changes-requested':'Changes requested'}[p.status]))}${p.note ? ` · ${escape(p.note)}` : ''}</p><label for="decision-outcome">New outcome</label><select id="decision-outcome">${[['approved','Approve a choice for later'],['changes-requested','Request changes'],['declined','Decline'],['pending','Reopen for consideration']].map(([value,label]) => `<option value="${value}"${p.status === value ? ' selected' : ''}>${label}</option>`).join('')}</select><div id="choice-field"${p.status !== 'approved' ? ' hidden' : ''}><label for="decision-choice">Your new choice</label><select id="decision-choice">${p.options.map(o => `<option${o === (p.choice || p.recommendation) ? ' selected' : ''}>${escape(o)}</option>`).join('')}</select></div>${noteField('Reason for this change (required)')}${notice('The previous decision stays in the history. This changes the local decision only; it does not undo completed work or start execution.')}<div class="actions"><button class="button primary" data-command="amend">Save changed decision</button><button class="button" data-action="proposal" data-id="${escape(p.id)}">Cancel</button></div>${decisionHistory(p)}`;
  } else if (type === 'proposal' && p) {
    title = p.title;
    content = `<div class="card-meta"><span>${p.id} · proposal v${p.version}</span>${badge(p.status)}</div><h3>Why this needs a choice</h3><p>${escape(p.why)}</p><h3>Recommendation & trade-off</h3><p><strong>${escape(p.recommendation)}.</strong> ${escape(p.tradeoff)}</p><h3>Bounded scope</h3><p>${escape(p.scope)}</p><h3>What success means</h3><p>${escape(p.success)}</p>${p.status === 'pending' ? `<label for="decision-choice">Your choice</label><select id="decision-choice">${p.options.map(o => `<option>${escape(o)}</option>`).join('')}</select>${noteField('Direction or rationale (required for changes or decline)')}${connectionNotice}<div class="actions"><button class="button primary" data-command="approve">Approve for later</button><button class="button" disabled title="Connect a real execution service first">Approve and start</button><button class="button" data-command="revise">Request changes</button><button class="button danger" data-command="decline">Decline</button></div>` : `<h3>Recorded outcome</h3><p>${escape(p.choice || p.status)}${p.note ? ` · ${escape(p.note)}` : ''}</p>${connectionNotice}`}`;
    content += `${p.status !== 'pending' ? `<div class="actions">${action('Change decision','change-decision',p.id,true)}</div>` : ''}${decisionHistory(p)}`;
  } else if (['result','work-detail'].includes(type) && w) {
    title = w.title;
    content = `<div class="card-meta"><span>${w.id} · ${escape(areaName(w.area))}</span>${badge(w.status)}</div>${workBasis(w)}<h3>Evidence / example only</h3><p>${escape(w.evidence)}</p>${w.revision ? `<p class="mono">Result revision: ${escape(w.revision)}</p>` : ''}${w.note ? `<h3>Director’s direction</h3><p>${escape(w.note)}</p>` : ''}${connectionNotice}${w.status === 'review' ? `${noteField('Review notes (required when requesting changes)')}<div class="actions"><button class="button primary" data-command="accept">Accept sample result</button><button class="button" data-command="rework">Request changes</button></div>` : w.status === 'in-flight' ? `${noteField('Reason for your request')}<div class="actions"><button class="button" data-command="pause">Request pause</button><button class="button danger" data-command="cancel">Request cancellation</button></div><p>Requests remain unacknowledged while no execution service is connected.</p>` : '<p>No execution action is available for this record.</p>'}`;
  } else if (type === 'steer') {
    title = 'Give the project direction';
    content = `<p>Capture a correction, improvement, or change in priority. This demo records it in the history for discussion; it does not create or start executable work.</p><label for="direction-area">Project area</label><select id="direction-area">${areas.map(a => `<option value="${a.id}"${a.id === id ? ' selected' : ''}>${escape(a.name)}</option>`).join('')}</select>${noteField('Your direction')}${connectionNotice}<div class="actions"><button class="button primary" data-command="steer">Record direction</button></div>`;
  } else if (type === 'reset') {
    title = 'Start the example again?';
    content = `<p>This replaces only this browser’s local demo decisions and history with the original example. Export your snapshot first if you want to keep it.</p><div class="actions"><button class="button danger" data-command="reset">Reset local example</button></div>`;
  } else return;
  $('#action-dialog').innerHTML = `<div class="dialog-head"><span class="eyebrow">Living Project Atlas / Director</span><h2 id="dialog-title">${escape(title)}</h2><button class="dialog-close" aria-label="Close dialog">×</button></div><div class="dialog-body">${content}<p class="form-error" id="form-error" role="alert"></p></div>`;
  if (!$('#action-dialog').open) $('#action-dialog').showModal();
  else $('#action-dialog .dialog-close').focus();
}

document.addEventListener('change', event => {
  if (event.target.id === 'decision-outcome') $('#choice-field').hidden = event.target.value !== 'approved';
});
document.addEventListener('click', event => {
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) { filter = filterButton.dataset.filter; renderPage(); return; }
  const lens = event.target.closest('[data-lens]');
  if (lens) { mapLens = lens.dataset.lens; renderPage(); return; }
  if (event.target.closest('.dialog-close')) { $('#action-dialog').close(); return; }
  const button = event.target.closest('[data-action]');
  if (button) {
    const { action:type, id } = button.dataset;
    if (type === 'export') {
      const blob = new Blob([JSON.stringify({demo:true, exportedAt:new Date().toISOString(), ...state},null,2)], {type:'application/json'});
      const url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = 'living-project-atlas-demo.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
    } else openDialog(type,id);
  }
  const command = event.target.closest('[data-command]');
  if (command) {
    try {
      if (command.dataset.command === 'reset') { persist(clone(initialState)); }
      else persist(applyDemoAction(state, { ...dialogContext, type:command.dataset.command, choice:$('#decision-choice')?.value, outcome:$('#decision-outcome')?.value, note:$('#direction-note')?.value, area:$('#direction-area')?.value }));
      $('#action-dialog').close(); render(); $('#main').focus({preventScroll:true}); toast(storageWarning || 'Saved in this browser’s demo. No execution started.');
    } catch (error) { $('#form-error').textContent = error.message; }
  }
});
$('#menu').addEventListener('click', () => { if ($('#rail').classList.contains('open')) closeMenu(); else openMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
  if (event.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) && !$('#action-dialog').open) {
    event.preventDefault(); if (narrowScreen.matches) openMenu(); else $('#search').focus();
  }
});
window.addEventListener('hashchange', () => {
  if ($('#action-dialog').open) $('#action-dialog').close();
  const searching = location.hash === '#search';
  if (searching) { renderPage(); }
  else { filter = 'all'; render(); closeMenu(); $('#main').focus({preventScroll:true}); }
  window.scrollTo(0,0);
});
window.addEventListener('storage', event => {
  if (event.key !== key) return;
  try {
    const saved = JSON.parse(event.newValue);
    if (saved?.schema === 1 && saved.projectId === project.id) { state = saved; if ($('#action-dialog').open) $('#action-dialog').close(); render(); toast('Demo updated in another tab. Reopen any decision before acting.'); }
  } catch { toast('Could not read the changed demo snapshot.'); }
});
render();
closeMenu();
