/* ==================================================================
   UNIT 2 — People & Life Stories · Interactive Workshop
   ================================================================== */

const STORAGE_KEY = 'coeduca_unit2_v1';

/* -------- STATE -------- */
const state = {
  student: { name: '', id: '' },
  ex1: { found: [] },             // word search
  ex2: { pairs: {} },             // match
  ex3: { fills: {} },             // drag & drop fill
  ex4: { answers: {} },           // unscramble
  ex5: { choices: {} },           // multi choice
  ex6: { placed: {} },            // classify
  ex7: { choices: {} },           // dropdown
  ex8: { choices: {} },           // true/false
  ex9: { answers: {} },           // date fill
  ex10:{ answers: {} },           // emoji sentences
  ttt: { result: null, extra: 0 }
};

/* -------- DATA -------- */
const EX1_WORDS = [
  'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
  'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'
];

// Fill blanks — each sentence has a single blank; student drags 1 word
const EX3_ITEMS = [
  { id:'s1', text:'Messi ___ play for Real Madrid.', answer:"didn't", hint:"(did not)" },
  { id:'s2', text:'Shakira ___ the Bible.', answer:"didn't write", hint:"(did not write)" },
  { id:'s3', text:'We ___ crocodile yesterday.', answer:"didn't eat", hint:"(did not eat)" },
  { id:'s4', text:'Columbus ___ New York.', answer:"didn't discover", hint:"(did not discover)" },
  { id:'s5', text:'The Beatles ___ from Spain.', answer:"weren't", hint:"(were not)" },
  { id:'s6', text:'Titanic ___ in 2020.', answer:"didn't sink", hint:"(did not sink)" }
];
const EX3_BANK = [
  "didn't", "didn't write", "didn't eat", "didn't discover",
  "weren't", "didn't sink", "wasn't", "didn't played" // distractors
];

const EX4_ITEMS = [
  { id:'u1', hint:'A month (2nd month)', answer:'FEBRUARY' },
  { id:'u2', hint:'A month (12th month)', answer:'DECEMBER' },
  { id:'u3', hint:'Ordinal number (5th)', answer:'FIFTH' },
  { id:'u4', hint:'Ordinal number (9th)', answer:'NINTH' },
  { id:'u5', hint:'Ordinal number (21st)', answer:'TWENTYFIRST' }
];

const EX5_ITEMS = [
  { id:'m1', img:'sheteacherteachingthealphabet.jpg', emoji:'👩‍🏫🔤',
    question:'The teacher DIDN\'T teach the alphabet yesterday.',
    opts:[
      "The teacher didn't taught the alphabet.",
      "The teacher didn't teach the alphabet.",
      "The teacher don't teach the alphabet.",
      "The teacher doesn't taught the alphabet."
    ], answer:1 },
  { id:'m2', img:'babyboycrying.jpg', emoji:'👶😭',
    question:'The baby (not / laugh).',
    opts:[
      "The baby didn't laughed.",
      "The baby not laugh.",
      "The baby didn't laugh.",
      "The baby wasn't laugh."
    ], answer:2 },
  { id:'m3', img:'threeboysplayingsoccer.jpg', emoji:'⚽🧒🧒🧒',
    question:'They (not / play) basketball. They played soccer.',
    opts:[
      "They didn't play basketball.",
      "They didn't played basketball.",
      "They wasn't playing basketball.",
      "They don't play basketball."
    ], answer:0 },
  { id:'m4', img:'girlreadingbook.jpg', emoji:'👧📖',
    question:'She (not / watch) TV. She read a book.',
    opts:[
      "She don't watched TV.",
      "She didn't watched TV.",
      "She wasn't watch TV.",
      "She didn't watch TV."
    ], answer:3 }
];

const EX6_VERBS = [
  { v:'play', cat:'regular' },
  { v:'study', cat:'regular' },
  { v:'walk', cat:'regular' },
  { v:'listen', cat:'regular' },
  { v:'cook', cat:'regular' },
  { v:'go', cat:'irregular' },
  { v:'eat', cat:'irregular' },
  { v:'see', cat:'irregular' },
  { v:'write', cat:'irregular' },
  { v:'drink', cat:'irregular' }
];

const EX7_ITEMS = [
  { text:'I ___ go to school last Monday.', opts:["didn't","don't","wasn't"], answer:0 },
  { text:'She ___ at the party last night.', opts:["didn't","wasn't","don't"], answer:1 },
  { text:'They ___ the homework yesterday.', opts:["didn't did","didn't do","didn't done"], answer:1 },
  { text:'Shakira ___ born in Colombia on February 2nd, 1977.', opts:["didn't","wasn't","was"], answer:2 },
  { text:'We ___ hungry this morning.', opts:["didn't","weren't","wasn't"], answer:1 },
  { text:'He ___ his homework on December 31st.', opts:["didn't finish","didn't finished","not finish"], answer:0 }
];

const EX8_ITEMS = [
  { text:'Columbus discovered New York in 1492.', answer:false },
  { text:'January is the first month of the year.', answer:true },
  { text:'The Titanic didn\'t sink in 2020.', answer:true },
  { text:'The 21st of a month is written "twenty-oneth".', answer:false },
  { text:'The Beatles weren\'t from Spain.', answer:true },
  { text:'"Didn\'t went" is correct English.', answer:false }
];

const EX9_ITEMS = [
  { id:'d1', date:'9/15/1821', answer:'september 15th 1821' },     // Independence
  { id:'d2', date:'12/25/2025', answer:'december 25th 2025' },      // Christmas
  { id:'d3', date:'2/14/2000',  answer:'february 14th 2000' },      // Valentine's
  { id:'d4', date:'7/4/1776',   answer:'july 4th 1776' }            // US Indep
];

const EX10_ITEMS = [
  { id:'e1', emoji:'🏫🚫', verb:'(go)', accept:['didn\'t go to school','did not go to school'] },
  { id:'e2', emoji:'🍕🚫', verb:'(eat)', accept:['didn\'t eat pizza','did not eat pizza'] },
  { id:'e3', emoji:'📺🚫', verb:'(watch)', accept:['didn\'t watch tv','did not watch tv','didn\'t watch television','did not watch television'] },
  { id:'e4', emoji:'📚🚫', verb:'(study)', accept:['didn\'t study','did not study'] }
];

/* =======================================================
   UTILITIES
   ======================================================= */

function $(sel, ctx=document){ return ctx.querySelector(sel); }
function $$(sel, ctx=document){ return [...ctx.querySelectorAll(sel)]; }

function save(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
}
function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const data = JSON.parse(raw);
    Object.assign(state, data);
  }catch(e){}
}

function norm(s){
  return String(s||'')
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(/[.,;:!?]/g,'')
    .replace(/\s+/g,' ')
    .trim();
}

/* -------- Copy / paste / translate protection (basic) -------- */
['copy','cut','paste','contextmenu'].forEach(ev=>{
  document.addEventListener(ev, e=>{
    const t = e.target;
    if(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' )) return;
    e.preventDefault();
  });
});
document.addEventListener('keydown', e=>{
  const k = e.key.toLowerCase();
  if((e.ctrlKey||e.metaKey) && ['c','x','v','a','p','s'].includes(k)){
    const t = e.target;
    if(!(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA'))){
      e.preventDefault();
    }
  }
});
// Discourage Google Translate
document.documentElement.setAttribute('translate','no');
document.documentElement.classList.add('notranslate');
const meta = document.createElement('meta');
meta.name = 'google';
meta.content = 'notranslate';
document.head.appendChild(meta);

/* =======================================================
   AUTO-SCROLL on drag near edges
   ======================================================= */
let autoScrollTimer = null;
let autoScrollDir = 0;

function startAutoScroll(dir){
  if(autoScrollDir === dir) return;
  autoScrollDir = dir;
  stopAutoScrollTick();
  const tick = () => {
    window.scrollBy({ top: 14 * autoScrollDir, behavior:'auto' });
    autoScrollTimer = requestAnimationFrame(tick);
  };
  autoScrollTimer = requestAnimationFrame(tick);
}
function stopAutoScrollTick(){
  if(autoScrollTimer){ cancelAnimationFrame(autoScrollTimer); autoScrollTimer = null; }
}
function stopAutoScroll(){
  autoScrollDir = 0;
  stopAutoScrollTick();
  $('#scrollTop').classList.remove('active');
  $('#scrollBot').classList.remove('active');
}
function checkEdgeScroll(clientY){
  const EDGE = 70;
  const h = window.innerHeight;
  if(clientY < EDGE){
    $('#scrollTop').classList.add('active');
    $('#scrollBot').classList.remove('active');
    startAutoScroll(-1);
  } else if(clientY > h - EDGE){
    $('#scrollBot').classList.add('active');
    $('#scrollTop').classList.remove('active');
    startAutoScroll(1);
  } else {
    stopAutoScroll();
  }
}

/* =======================================================
   GENERIC DRAG & DROP (mouse + touch)
   ======================================================= */
/**
 * Makes an element draggable with a floating ghost that follows pointer.
 * On drop, calls onDrop(draggable, dropTarget).
 * Drop targets must have class `drop-zone` and data-accept attribute matching.
 */
function makeDraggable(el, groupId){
  el.dataset.group = groupId;
  el.addEventListener('mousedown', e => startDrag(e, el, false));
  el.addEventListener('touchstart', e => startDrag(e, el, true), { passive:false });
}

let currentDrag = null; // { el, ghost, group, originalParent, originalNext }

function startDrag(e, el, isTouch){
  e.preventDefault();
  if(currentDrag) return;
  const pt = getPoint(e);
  // create ghost
  const rect = el.getBoundingClientRect();
  const ghost = el.cloneNode(true);
  ghost.classList.add('drag-ghost');
  ghost.style.width = rect.width + 'px';
  ghost.style.left = pt.x + 'px';
  ghost.style.top  = pt.y + 'px';
  document.body.appendChild(ghost);
  el.classList.add('dragging');
  currentDrag = { el, ghost, group: el.dataset.group, originalParent: el.parentNode, originalNext: el.nextSibling };

  const move = ev => onDragMove(ev, isTouch);
  const end  = ev => onDragEnd(ev, isTouch, move, end);

  if(isTouch){
    document.addEventListener('touchmove', move, { passive:false });
    document.addEventListener('touchend', end);
    document.addEventListener('touchcancel', end);
  } else {
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
  }
}
function getPoint(e){
  if(e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  if(e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}
function onDragMove(e, isTouch){
  if(isTouch) e.preventDefault();
  if(!currentDrag) return;
  const pt = getPoint(e);
  currentDrag.ghost.style.left = pt.x + 'px';
  currentDrag.ghost.style.top  = pt.y + 'px';

  // Highlight drop zone under pointer
  currentDrag.ghost.style.display = 'none';
  const under = document.elementFromPoint(pt.x, pt.y);
  currentDrag.ghost.style.display = '';
  $$('.drop-zone.hover').forEach(z=>z.classList.remove('hover'));
  if(under){
    const zone = under.closest('.drop-zone');
    if(zone && canAccept(zone, currentDrag.group)){
      zone.classList.add('hover');
    }
  }
  checkEdgeScroll(pt.y);
}
function onDragEnd(e, isTouch, move, end){
  stopAutoScroll();
  if(!currentDrag){ return; }
  const pt = getPoint(e);
  currentDrag.ghost.style.display = 'none';
  const under = document.elementFromPoint(pt.x, pt.y);
  currentDrag.ghost.style.display = '';

  const { el, ghost, group } = currentDrag;

  let dropZone = under ? under.closest('.drop-zone') : null;
  if(dropZone && !canAccept(dropZone, group)) dropZone = null;

  if(dropZone){
    const onDrop = dropZone._onDrop;
    if(typeof onDrop === 'function') onDrop(el, dropZone);
  } else {
    // If element is not attached to anywhere, keep it in original
    // nothing to do - we did NOT move it yet during the drag
  }

  // cleanup
  $$('.drop-zone.hover').forEach(z=>z.classList.remove('hover'));
  ghost.remove();
  el.classList.remove('dragging');
  currentDrag = null;

  if(isTouch){
    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', end);
    document.removeEventListener('touchcancel', end);
  } else {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
  }
}
function canAccept(zone, group){
  const acc = zone.dataset.accept;
  if(!acc) return false;
  return acc === group;
}
function registerDropZone(zoneEl, group, onDrop){
  zoneEl.classList.add('drop-zone');
  zoneEl.dataset.accept = group;
  zoneEl._onDrop = onDrop;
}

/* =======================================================
   EXERCISE 1 — WORD SEARCH (12 months)
   ======================================================= */
const WS_SIZE = 14;

function buildWordSearch(){
  const grid = Array.from({length:WS_SIZE}, ()=>Array(WS_SIZE).fill(null));
  const directions = [
    [0,1], [1,0], [1,1], [-1,1]
  ];
  const placed = [];

  for(const w of EX1_WORDS){
    let done = false;
    for(let attempt=0; attempt<200 && !done; attempt++){
      const dir = directions[Math.floor(Math.random()*directions.length)];
      const r = Math.floor(Math.random()*WS_SIZE);
      const c = Math.floor(Math.random()*WS_SIZE);
      const er = r + dir[0]*(w.length-1);
      const ec = c + dir[1]*(w.length-1);
      if(er<0||er>=WS_SIZE||ec<0||ec>=WS_SIZE) continue;

      let ok = true;
      for(let k=0;k<w.length;k++){
        const cr = r + dir[0]*k;
        const cc = c + dir[1]*k;
        if(grid[cr][cc] !== null && grid[cr][cc] !== w[k]){ ok=false; break; }
      }
      if(!ok) continue;
      for(let k=0;k<w.length;k++){
        const cr = r + dir[0]*k;
        const cc = c + dir[1]*k;
        grid[cr][cc] = w[k];
      }
      placed.push({ word:w, start:[r,c], end:[er,ec] });
      done = true;
    }
  }
  // fill empties
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let r=0;r<WS_SIZE;r++){
    for(let c=0;c<WS_SIZE;c++){
      if(grid[r][c]===null){
        grid[r][c] = letters[Math.floor(Math.random()*letters.length)];
      }
    }
  }
  return { grid, placed };
}

let wsData = null;

function renderWordSearch(){
  // Use deterministic placement so reloads keep same board
  if(!state.ex1.puzzle){
    wsData = buildWordSearch();
    state.ex1.puzzle = wsData;
    save();
  } else {
    wsData = state.ex1.puzzle;
  }

  const gridEl = $('#wsGrid');
  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${WS_SIZE}, 1fr)`;

  for(let r=0;r<WS_SIZE;r++){
    for(let c=0;c<WS_SIZE;c++){
      const cell = document.createElement('div');
      cell.className = 'wsCell';
      cell.textContent = wsData.grid[r][c];
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.addEventListener('click', ()=>handleWsClick(r,c));
      gridEl.appendChild(cell);
    }
  }

  const list = $('#wsList');
  list.innerHTML = EX1_WORDS.map(w=>`<li data-w="${w}">${w.toLowerCase()}</li>`).join('');

  // Highlight already-found
  state.ex1.found.forEach(w=>highlightFoundWord(w));
  updateList1();
}

let wsStart = null;
function handleWsClick(r,c){
  const cell = $(`#wsGrid .wsCell[data-r="${r}"][data-c="${c}"]`);
  if(!wsStart){
    wsStart = { r, c };
    cell.classList.add('selected');
    return;
  }
  // Second click -> check line
  const r2 = r, c2 = c;
  const dr = r2 - wsStart.r;
  const dc = c2 - wsStart.c;
  const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
  const udr = dr === 0 ? 0 : dr/Math.abs(dr);
  const udc = dc === 0 ? 0 : dc/Math.abs(dc);

  // must be horizontal, vertical, or diagonal
  if(!(dr === 0 || dc === 0 || Math.abs(dr)===Math.abs(dc))){
    clearWsSelection(); return;
  }

  let word = '';
  const cells = [];
  for(let k=0;k<len;k++){
    const cr = wsStart.r + udr*k;
    const cc = wsStart.c + udc*k;
    word += wsData.grid[cr][cc];
    cells.push({r:cr, c:cc});
  }
  const wordR = word.split('').reverse().join('');
  const matchW = EX1_WORDS.find(w=>w===word || w===wordR);

  if(matchW && !state.ex1.found.includes(matchW)){
    state.ex1.found.push(matchW);
    cells.forEach(({r,c})=>{
      $(`#wsGrid .wsCell[data-r="${r}"][data-c="${c}"]`).classList.add('found');
    });
    updateList1();
    save();
    updateScore();
  }
  clearWsSelection();
}
function clearWsSelection(){
  $$('#wsGrid .wsCell.selected').forEach(c=>c.classList.remove('selected'));
  wsStart = null;
}
function highlightFoundWord(w){
  const placed = wsData.placed.find(p=>p.word===w);
  if(!placed) return;
  const [r0,c0] = placed.start;
  const [r1,c1] = placed.end;
  const len = Math.max(Math.abs(r1-r0), Math.abs(c1-c0)) + 1;
  const udr = r1===r0 ? 0 : (r1-r0)/Math.abs(r1-r0);
  const udc = c1===c0 ? 0 : (c1-c0)/Math.abs(c1-c0);
  for(let k=0;k<len;k++){
    const cr = r0 + udr*k;
    const cc = c0 + udc*k;
    const el = $(`#wsGrid .wsCell[data-r="${cr}"][data-c="${cc}"]`);
    if(el) el.classList.add('found');
  }
}
function updateList1(){
  $$('#wsList li').forEach(li=>{
    if(state.ex1.found.includes(li.dataset.w)) li.classList.add('done');
    else li.classList.remove('done');
  });
  const pct = state.ex1.found.length / EX1_WORDS.length;
  setPoints('p1', state.ex1.found.length, EX1_WORDS.length);
}

/* =======================================================
   EXERCISE 2 — MATCH WITH LINES
   ======================================================= */
let matchSelection = null;

function renderMatch(){
  const svg = $('#matchSvg');
  svg.innerHTML = '';

  $$('#matchLeft .match-item, #matchRight .match-item').forEach(btn=>{
    btn.classList.remove('active','done','wrong');
    btn.disabled = false;
    btn.addEventListener('click', onMatchClick);
  });

  // Restore saved pairs
  Object.keys(state.ex2.pairs).forEach(k=>{
    drawMatchLine(k, state.ex2.pairs[k]);
    $$(`#matchLeft .match-item[data-key="${k}"], #matchRight .match-item[data-key="${state.ex2.pairs[k]}"]`).forEach(b=>b.classList.add('done'));
  });
  updateMatchScore();
}

function onMatchClick(e){
  const btn = e.currentTarget;
  if(btn.classList.contains('done')) return;

  const side = btn.parentElement.id === 'matchLeft' ? 'L' : 'R';
  if(!matchSelection){
    $$('#matchLeft .match-item.active, #matchRight .match-item.active').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    matchSelection = { side, btn };
    return;
  }
  if(matchSelection.side === side){
    matchSelection.btn.classList.remove('active');
    btn.classList.add('active');
    matchSelection = { side, btn };
    return;
  }
  // we have L and R
  const L = matchSelection.side === 'L' ? matchSelection.btn : btn;
  const R = matchSelection.side === 'R' ? matchSelection.btn : btn;
  const keyL = L.dataset.key;
  const keyR = R.dataset.key;

  if(keyL === keyR){
    L.classList.add('done'); R.classList.add('done');
    L.classList.remove('active'); R.classList.remove('active');
    state.ex2.pairs[keyL] = keyR;
    drawMatchLine(keyL, keyR);
    save();
  } else {
    L.classList.add('wrong'); R.classList.add('wrong');
    setTimeout(()=>{
      L.classList.remove('wrong','active');
      R.classList.remove('wrong','active');
    },500);
  }
  matchSelection = null;
  updateMatchScore();
}
function drawMatchLine(keyL, keyR){
  const wrap = $('.match-wrap').getBoundingClientRect();
  const L = $(`#matchLeft .match-item[data-key="${keyL}"]`);
  const R = $(`#matchRight .match-item[data-key="${keyR}"]`);
  if(!L || !R) return;
  const a = L.getBoundingClientRect();
  const b = R.getBoundingClientRect();
  const x1 = a.right - wrap.left;
  const y1 = a.top + a.height/2 - wrap.top;
  const x2 = b.left - wrap.left;
  const y2 = b.top + b.height/2 - wrap.top;

  const svg = $('#matchSvg');
  svg.setAttribute('viewBox',`0 0 ${wrap.width} ${wrap.height}`);
  const line = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.setAttribute('x1',x1); line.setAttribute('y1',y1);
  line.setAttribute('x2',x2); line.setAttribute('y2',y2);
  line.setAttribute('stroke', '#3d9760');
  line.setAttribute('stroke-width', '3');
  line.setAttribute('stroke-linecap', 'round');
  line.dataset.key = keyL;
  svg.appendChild(line);
}

function updateMatchScore(){
  const ok = Object.keys(state.ex2.pairs).length;
  const total = $$('#matchLeft .match-item').length;
  setPoints('p2', ok, total);
}
$('#clearMatch').addEventListener('click', ()=>{
  state.ex2.pairs = {};
  $$('#matchLeft .match-item, #matchRight .match-item').forEach(b=>b.classList.remove('done','active','wrong'));
  $('#matchSvg').innerHTML = '';
  save();
  updateMatchScore();
});

window.addEventListener('resize', ()=>{
  $('#matchSvg').innerHTML = '';
  Object.keys(state.ex2.pairs).forEach(k=>drawMatchLine(k, state.ex2.pairs[k]));
});

/* =======================================================
   EXERCISE 3 — DRAG & DROP FILL BLANKS
   ======================================================= */
function renderEx3(){
  const bank = $('#bank3'); bank.innerHTML = '';
  const sents = $('#sents3'); sents.innerHTML = '';

  EX3_BANK.forEach((w, i)=>{
    const t = document.createElement('div');
    t.className = 'word-tile';
    t.textContent = w;
    t.dataset.idx = i;
    bank.appendChild(t);
    makeDraggable(t, 'ex3');
  });
  registerDropZone(bank, 'ex3', (el, zone) => {
    // Return tile to bank
    const from = el.parentNode;
    zone.appendChild(el);
    // Free the blank that had it
    $$('.blank', document).forEach(b=>{
      if(b.contains(el)) b.classList.remove('filled');
    });
    // Recompute state
    syncEx3FromDOM();
  });

  EX3_ITEMS.forEach(item=>{
    const li = document.createElement('li');
    const [before, after] = item.text.split('___');
    li.innerHTML = `${before}<span class="blank" data-id="${item.id}"></span>${after} <small style="color:#888">${item.hint}</small>`;
    sents.appendChild(li);
    const blank = li.querySelector('.blank');
    registerDropZone(blank, 'ex3', (el, zone) => {
      // If blank already has something, return that to bank
      const existing = zone.querySelector('.word-tile');
      if(existing) $('#bank3').appendChild(existing);
      zone.appendChild(el);
      zone.classList.add('filled');
      syncEx3FromDOM();
    });
  });

  // Restore
  Object.keys(state.ex3.fills).forEach(id=>{
    const word = state.ex3.fills[id];
    const blank = $(`#sents3 .blank[data-id="${id}"]`);
    const tiles = $$('#bank3 .word-tile').filter(t=>t.textContent === word);
    if(blank && tiles[0]){
      blank.appendChild(tiles[0]);
      blank.classList.add('filled');
    }
  });
  updateEx3Score();
}
function syncEx3FromDOM(){
  state.ex3.fills = {};
  $$('#sents3 .blank').forEach(b=>{
    const t = b.querySelector('.word-tile');
    if(t){
      state.ex3.fills[b.dataset.id] = t.textContent;
      b.classList.add('filled');
    } else {
      b.classList.remove('filled');
    }
  });
  save();
  updateEx3Score();
}
function updateEx3Score(){
  let ok = 0;
  EX3_ITEMS.forEach(it=>{
    if(norm(state.ex3.fills[it.id]) === norm(it.answer)) ok++;
  });
  setPoints('p3', ok, EX3_ITEMS.length);
}

/* =======================================================
   EXERCISE 4 — UNSCRAMBLE (letter tiles drag)
   ======================================================= */
function renderEx4(){
  const list = $('#unscrambleList');
  list.innerHTML = '';

  EX4_ITEMS.forEach((item, idx)=>{
    const row = document.createElement('div');
    row.className = 'unscramble-row';
    row.dataset.id = item.id;

    const hint = document.createElement('div');
    hint.className = 'unscramble-hint';
    hint.innerHTML = `<b>${idx+1}.</b> ${item.hint}`;

    const track = document.createElement('div');
    track.className = 'letter-track';
    track.dataset.id = item.id;

    const btn = document.createElement('button');
    btn.className = 'unscramble-check';
    btn.textContent = 'Check';

    row.appendChild(hint);
    row.appendChild(track);
    row.appendChild(btn);
    list.appendChild(row);

    // Build letter tiles (shuffled unless state has order)
    const saved = state.ex4.answers[item.id];
    let order;
    if(saved && saved.length === item.answer.length){
      order = saved.split('');
    } else {
      order = shuffle(item.answer.split(''));
    }
    order.forEach((ch, i)=>{
      const tile = document.createElement('div');
      tile.className = 'letter-tile';
      tile.textContent = ch;
      tile.dataset.ch = ch;
      track.appendChild(tile);
      makeLetterDraggable(tile, track);
    });

    btn.addEventListener('click', ()=>{
      const current = [...track.children].map(t=>t.textContent).join('');
      if(current.toUpperCase() === item.answer){
        row.classList.add('correct'); row.classList.remove('wrong');
      } else {
        row.classList.remove('correct'); row.classList.add('wrong');
      }
      state.ex4.answers[item.id] = current;
      save();
      updateEx4Score();
    });
  });
  updateEx4Score();
}
function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  // ensure not same as original
  if(a.join('') === arr.join('') && arr.length > 1){ return shuffle(arr); }
  return a;
}
function makeLetterDraggable(tile, track){
  let isDown = false;
  let startX = 0, startY = 0;
  let ghost = null;

  const downHandler = (e) => {
    e.preventDefault();
    const pt = getPoint(e);
    startX = pt.x; startY = pt.y;
    isDown = true;
    const rect = tile.getBoundingClientRect();
    ghost = tile.cloneNode(true);
    ghost.classList.add('drag-ghost');
    ghost.style.width = rect.width + 'px';
    ghost.style.left = pt.x + 'px';
    ghost.style.top = pt.y + 'px';
    document.body.appendChild(ghost);
    tile.classList.add('dragging');

    const move = (ev) => {
      if(!isDown) return;
      const p = getPoint(ev);
      if(ev.touches) ev.preventDefault();
      ghost.style.left = p.x + 'px';
      ghost.style.top = p.y + 'px';
      // auto-scroll
      checkEdgeScroll(p.y);

      // reorder inside track
      ghost.style.display = 'none';
      const under = document.elementFromPoint(p.x, p.y);
      ghost.style.display = '';
      if(under){
        const otherTile = under.closest('.letter-tile');
        if(otherTile && otherTile !== tile && otherTile.parentNode === track){
          const children = [...track.children];
          const idxThis = children.indexOf(tile);
          const idxOther = children.indexOf(otherTile);
          if(idxThis < idxOther){
            track.insertBefore(tile, otherTile.nextSibling);
          } else {
            track.insertBefore(tile, otherTile);
          }
        }
      }
    };
    const up = () => {
      isDown = false;
      stopAutoScroll();
      if(ghost) ghost.remove(); ghost = null;
      tile.classList.remove('dragging');
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', up);
      // Persist order
      const id = track.dataset.id;
      state.ex4.answers[id] = [...track.children].map(t=>t.textContent).join('');
      save();
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', up);
  };

  tile.addEventListener('mousedown', downHandler);
  tile.addEventListener('touchstart', downHandler, { passive:false });
}
function updateEx4Score(){
  let ok = 0;
  EX4_ITEMS.forEach(it=>{
    if((state.ex4.answers[it.id]||'').toUpperCase() === it.answer) ok++;
  });
  setPoints('p4', ok, EX4_ITEMS.length);
}

/* =======================================================
   EXERCISE 5 — MULTIPLE CHOICE
   ======================================================= */
function renderEx5(){
  const grid = $('#mcqGrid');
  grid.innerHTML = '';
  EX5_ITEMS.forEach(item=>{
    const card = document.createElement('div');
    card.className = 'mcq-card';
    const img = document.createElement('div');
    img.className = 'mcq-image';
    const tryImg = new Image();
    tryImg.src = `files/${item.img}`;
    tryImg.onload = () => { img.innerHTML = ''; img.appendChild(tryImg); };
    tryImg.onerror = () => { img.textContent = item.emoji; };

    const body = document.createElement('div');
    body.className = 'mcq-body';
    const q = document.createElement('p');
    q.textContent = item.question;
    body.appendChild(q);

    item.opts.forEach((opt, i)=>{
      const btn = document.createElement('button');
      btn.className = 'mcq-option';
      btn.textContent = opt;
      btn.addEventListener('click', ()=>{
        $$('.mcq-option', body).forEach(b=>b.classList.remove('sel'));
        btn.classList.add('sel');
        state.ex5.choices[item.id] = i;
        save();
        updateEx5Score();
      });
      if(state.ex5.choices[item.id] === i) btn.classList.add('sel');
      body.appendChild(btn);
    });

    card.appendChild(img);
    card.appendChild(body);
    grid.appendChild(card);
  });
  updateEx5Score();
}
function updateEx5Score(){
  let ok = 0;
  EX5_ITEMS.forEach(it=>{
    if(state.ex5.choices[it.id] === it.answer) ok++;
  });
  setPoints('p5', ok, EX5_ITEMS.length);
}

/* =======================================================
   EXERCISE 6 — CLASSIFY
   ======================================================= */
function renderEx6(){
  const bank = $('#verbsBank'); bank.innerHTML = '';
  const reg = $('#colReg'); reg.innerHTML = '';
  const irr = $('#colIrr'); irr.innerHTML = '';

  EX6_VERBS.forEach((v)=>{
    const t = document.createElement('div');
    t.className = 'word-tile';
    t.textContent = v.v;
    t.dataset.verb = v.v;
    bank.appendChild(t);
    makeDraggable(t, 'ex6');
  });

  const handleDrop = (catName) => (el, zone) => {
    zone.appendChild(el);
    state.ex6.placed[el.dataset.verb] = catName;
    save();
    updateEx6Score();
  };

  registerDropZone(bank, 'ex6', (el, zone) => {
    zone.appendChild(el);
    delete state.ex6.placed[el.dataset.verb];
    save();
    updateEx6Score();
  });
  registerDropZone(reg, 'ex6', handleDrop('regular'));
  registerDropZone(irr, 'ex6', handleDrop('irregular'));

  // restore
  Object.keys(state.ex6.placed).forEach(v=>{
    const t = $$('#verbsBank .word-tile').find(x=>x.dataset.verb === v);
    if(!t) return;
    if(state.ex6.placed[v] === 'regular') reg.appendChild(t);
    else if(state.ex6.placed[v] === 'irregular') irr.appendChild(t);
  });
  updateEx6Score();
}
function updateEx6Score(){
  let ok = 0;
  EX6_VERBS.forEach(v=>{
    if(state.ex6.placed[v.v] === v.cat) ok++;
  });
  setPoints('p6', ok, EX6_VERBS.length);
}

/* =======================================================
   EXERCISE 7 — DROPDOWN
   ======================================================= */
function renderEx7(){
  const list = $('#dropList'); list.innerHTML = '';
  EX7_ITEMS.forEach((item, idx)=>{
    const li = document.createElement('li');
    const [before, after] = item.text.split('___');
    const sel = document.createElement('select');
    sel.innerHTML = `<option value="">-- choose --</option>` + item.opts.map((o,i)=>`<option value="${i}">${o}</option>`).join('');
    sel.value = state.ex7.choices[idx] ?? '';
    sel.addEventListener('change', ()=>{
      state.ex7.choices[idx] = sel.value === '' ? '' : Number(sel.value);
      save();
      updateEx7Score();
    });
    li.appendChild(document.createTextNode(before));
    li.appendChild(sel);
    li.appendChild(document.createTextNode(after));
    list.appendChild(li);
  });
  updateEx7Score();
}
function updateEx7Score(){
  let ok = 0;
  EX7_ITEMS.forEach((it, idx)=>{
    if(state.ex7.choices[idx] === it.answer) ok++;
  });
  setPoints('p7', ok, EX7_ITEMS.length);
}

/* =======================================================
   EXERCISE 8 — TRUE / FALSE
   ======================================================= */
function renderEx8(){
  const list = $('#tfList'); list.innerHTML = '';
  EX8_ITEMS.forEach((item, idx)=>{
    const row = document.createElement('div');
    row.className = 'tf-row';
    const p = document.createElement('p');
    p.textContent = `${idx+1}. ${item.text}`;

    const btnT = document.createElement('button');
    btnT.className = 'tf-btn'; btnT.textContent = 'TRUE';
    const btnF = document.createElement('button');
    btnF.className = 'tf-btn'; btnF.textContent = 'FALSE';

    const upd = () => {
      btnT.classList.remove('sel-t'); btnF.classList.remove('sel-f');
      if(state.ex8.choices[idx] === true) btnT.classList.add('sel-t');
      if(state.ex8.choices[idx] === false) btnF.classList.add('sel-f');
    };
    btnT.addEventListener('click', ()=>{ state.ex8.choices[idx] = true; save(); upd(); updateEx8Score(); });
    btnF.addEventListener('click', ()=>{ state.ex8.choices[idx] = false; save(); upd(); updateEx8Score(); });

    row.appendChild(p); row.appendChild(btnT); row.appendChild(btnF);
    list.appendChild(row);
    upd();
  });
  updateEx8Score();
}
function updateEx8Score(){
  let ok = 0;
  EX8_ITEMS.forEach((it, idx)=>{
    if(state.ex8.choices[idx] === it.answer) ok++;
  });
  setPoints('p8', ok, EX8_ITEMS.length);
}

/* =======================================================
   EXERCISE 9 — WRITE DATE
   ======================================================= */
function renderEx9(){
  const list = $('#dateList'); list.innerHTML = '';
  EX9_ITEMS.forEach(item=>{
    const li = document.createElement('li');
    const d = document.createElement('span');
    d.className = 'date-num';
    d.textContent = item.date;
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.placeholder = 'Write the date in American format...';
    inp.value = state.ex9.answers[item.id] || '';
    inp.addEventListener('input', ()=>{
      state.ex9.answers[item.id] = inp.value;
      save();
      updateEx9Score();
    });
    li.appendChild(d); li.appendChild(inp);
    list.appendChild(li);
  });
  updateEx9Score();
}
function updateEx9Score(){
  let ok = 0;
  EX9_ITEMS.forEach(it=>{
    const v = norm(state.ex9.answers[it.id]||'');
    const target = norm(it.answer);
    // accept with or without comma (already stripped), with or without "th" before number, etc
    // We'll be lenient: compare main tokens.
    if(v === target) ok++;
    else {
      // normalize by removing 'th', 'st', 'nd', 'rd' endings to also accept "15" or "15th"
      const strip = s => s.replace(/\b(\d+)(st|nd|rd|th)\b/g,'$1');
      if(strip(v) === strip(target)) ok++;
    }
  });
  setPoints('p9', ok, EX9_ITEMS.length);
}

/* =======================================================
   EXERCISE 10 — EMOJI SENTENCES
   ======================================================= */
function renderEx10(){
  const list = $('#emojiList'); list.innerHTML = '';
  EX10_ITEMS.forEach(item=>{
    const li = document.createElement('li');
    const em = document.createElement('div');
    em.className = 'emoji-prompt';
    em.textContent = item.emoji;

    const v = document.createElement('span');
    v.className = 'emoji-verb'; v.textContent = item.verb;

    const ta = document.createElement('textarea');
    ta.placeholder = 'Write your negative past sentence...';
    ta.value = state.ex10.answers[item.id] || '';
    ta.addEventListener('input', ()=>{
      state.ex10.answers[item.id] = ta.value;
      save();
      updateEx10Score();
    });

    li.appendChild(em); li.appendChild(v); li.appendChild(document.createElement('br')); li.appendChild(ta);
    list.appendChild(li);
  });
  updateEx10Score();
}
function updateEx10Score(){
  let ok = 0;
  EX10_ITEMS.forEach(it=>{
    const v = norm(state.ex10.answers[it.id]||'');
    if(!v) return;
    const hit = it.accept.some(a => v.includes(norm(a)));
    if(hit) ok++;
  });
  setPoints('p10', ok, EX10_ITEMS.length);
  // Visual: textarea goes green if contains didn't + verb
  EX10_ITEMS.forEach(it=>{
    const ta = $$('#emojiList textarea')[EX10_ITEMS.indexOf(it)];
    if(!ta) return;
    const v = norm(ta.value);
    const hit = v && it.accept.some(a => v.includes(norm(a)));
    ta.classList.toggle('ok', hit);
  });
}

/* =======================================================
   SCORING
   ======================================================= */
function setPoints(id, ok, total){
  const el = $('#'+id); if(!el) return;
  el.textContent = `${ok}/${total}`;
  el.classList.remove('ok','ko');
  if(ok === total && total > 0) el.classList.add('ok');
  else if(ok === 0 && total>0) el.classList.add('ko');
}

function computeFinalScore(){
  // Each exercise contributes proportionally: all equally weighted 1..10 range
  const perEx = [
    state.ex1.found.length / EX1_WORDS.length,
    Object.keys(state.ex2.pairs).length / 8,
    EX3_ITEMS.filter(it=>norm(state.ex3.fills[it.id])===norm(it.answer)).length / EX3_ITEMS.length,
    EX4_ITEMS.filter(it=>(state.ex4.answers[it.id]||'').toUpperCase()===it.answer).length / EX4_ITEMS.length,
    EX5_ITEMS.filter(it=>state.ex5.choices[it.id]===it.answer).length / EX5_ITEMS.length,
    EX6_VERBS.filter(v=>state.ex6.placed[v.v]===v.cat).length / EX6_VERBS.length,
    EX7_ITEMS.filter((it,idx)=>state.ex7.choices[idx]===it.answer).length / EX7_ITEMS.length,
    EX8_ITEMS.filter((it,idx)=>state.ex8.choices[idx]===it.answer).length / EX8_ITEMS.length,
    EX9_ITEMS.filter(it=>{
      const v = norm(state.ex9.answers[it.id]||''); const t = norm(it.answer);
      const strip = s => s.replace(/\b(\d+)(st|nd|rd|th)\b/g,'$1');
      return v === t || strip(v) === strip(t);
    }).length / EX9_ITEMS.length,
    EX10_ITEMS.filter(it=>{
      const v = norm(state.ex10.answers[it.id]||'');
      return v && it.accept.some(a => v.includes(norm(a)));
    }).length / EX10_ITEMS.length,
  ];
  const avg = perEx.reduce((a,b)=>a+b,0) / perEx.length;
  return Math.round(avg * 10 * 10) / 10; // 1 decimal
}

function updateScore(){
  [updateEx3Score, updateEx4Score, updateEx5Score, updateEx6Score, updateEx7Score, updateEx8Score, updateEx9Score, updateEx10Score, updateMatchScore]
    .forEach(fn => { try{ fn(); }catch(e){} });
  const s = computeFinalScore();
  $('#finalScore').textContent = s.toFixed(1);
  const extra = state.ttt.extra || 0;
  if(extra > 0){
    $('#extraInline').textContent = `+ ${extra} extra point${extra>=1?'':''} from bonus game`;
  } else {
    $('#extraInline').textContent = '';
  }
}

/* =======================================================
   STUDENT INFO BINDINGS
   ======================================================= */
function bindStudent(){
  $('#studentName').value = state.student.name || '';
  $('#studentId').value = state.student.id || '';
  $('#studentName').addEventListener('input', e=>{ state.student.name = e.target.value; save(); });
  $('#studentId').addEventListener('input', e=>{ state.student.id = e.target.value; save(); });
}

/* =======================================================
   TIC TAC TOE
   ======================================================= */
let tttBoard, tttOver, tttTurn;

function resetTTT(){
  tttBoard = Array(9).fill(null);
  tttOver = false;
  tttTurn = 'X';
  $('#tttResult').textContent = '';
  $('#tttStatus').textContent = 'Your turn (X)';
  $('#moodEmoji').textContent = '🙂';
  $('#extraNote').textContent = '';
  renderTTT();
}
function renderTTT(){
  const board = $('#tttBoard');
  board.innerHTML = '';
  for(let i=0;i<9;i++){
    const c = document.createElement('div');
    c.className = 'ttt-cell';
    if(tttBoard[i] === 'X'){ c.classList.add('x','taken'); c.textContent = 'X'; }
    else if(tttBoard[i] === 'O'){ c.classList.add('o','taken'); c.textContent = 'O'; }
    c.addEventListener('click', ()=>playerMove(i));
    board.appendChild(c);
  }
}
function playerMove(i){
  if(tttOver || tttBoard[i] || tttTurn !== 'X') return;
  tttBoard[i] = 'X';
  renderTTT();
  if(checkTTT()) return;
  tttTurn = 'O';
  $('#tttStatus').textContent = 'Computer is thinking…';
  $('#moodEmoji').textContent = '🤔';
  setTimeout(()=>{
    aiMove();
    renderTTT();
    if(!checkTTT()){
      tttTurn = 'X';
      $('#tttStatus').textContent = 'Your turn (X)';
      $('#moodEmoji').textContent = '🙂';
    }
  }, 420);
}
function aiMove(){
  // Minimax — but easy level (random 40% of the time)
  if(Math.random() < 0.35){
    const empty = tttBoard.map((v,i)=>v?null:i).filter(v=>v!==null);
    const pick = empty[Math.floor(Math.random()*empty.length)];
    tttBoard[pick] = 'O';
    return;
  }
  const best = minimax(tttBoard, 'O').index;
  tttBoard[best] = 'O';
}
function minimax(b, player){
  const avail = b.map((v,i)=>v?null:i).filter(v=>v!==null);
  if(winsFor(b,'X')) return { score:-10 };
  if(winsFor(b,'O')) return { score:10 };
  if(avail.length === 0) return { score:0 };

  const moves = [];
  for(const idx of avail){
    const nb = b.slice(); nb[idx] = player;
    const res = minimax(nb, player === 'O' ? 'X' : 'O');
    moves.push({ index: idx, score: res.score });
  }
  if(player === 'O'){
    return moves.reduce((best, m)=> m.score > best.score ? m : best, {score:-Infinity});
  } else {
    return moves.reduce((best, m)=> m.score < best.score ? m : best, {score:Infinity});
  }
}
const TTT_WINS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
function winsFor(b, p){
  return TTT_WINS.some(line => line.every(i => b[i] === p));
}
function winningLine(b, p){
  return TTT_WINS.find(line => line.every(i => b[i] === p));
}
function checkTTT(){
  if(winsFor(tttBoard, 'X')){
    tttOver = true;
    state.ttt.result = 'win';
    state.ttt.extra = 1;
    $('#tttResult').textContent = 'Felicidades, eres bueno en este juego, ten 1 punto extra 🎉';
    $('#tttStatus').textContent = 'You win!';
    $('#moodEmoji').textContent = '🥳';
    $('#extraNote').textContent = '+1 point will appear on your PDF.';
    const line = winningLine(tttBoard, 'X');
    if(line){ const cells = $$('.ttt-cell'); line.forEach(i=>cells[i].classList.add('win')); }
    save();
    updateScore();
    return true;
  }
  if(winsFor(tttBoard, 'O')){
    tttOver = true;
    state.ttt.result = 'lose';
    state.ttt.extra = 0;
    $('#tttResult').textContent = 'Oops, más suerte para la próxima 😕';
    $('#tttStatus').textContent = 'Computer wins.';
    $('#moodEmoji').textContent = '😢';
    $('#extraNote').textContent = '';
    const line = winningLine(tttBoard, 'O');
    if(line){ const cells = $$('.ttt-cell'); line.forEach(i=>cells[i].classList.add('win')); }
    save();
    updateScore();
    return true;
  }
  if(tttBoard.every(v=>v)){
    tttOver = true;
    state.ttt.result = 'tie';
    state.ttt.extra = 0.5;
    $('#tttResult').textContent = 'Estamos a mano, ten 0.5 extra para tu nota 🤝';
    $('#tttStatus').textContent = 'Tie game.';
    $('#moodEmoji').textContent = '😐';
    $('#extraNote').textContent = '+0.5 will appear on your PDF.';
    save();
    updateScore();
    return true;
  }
  return false;
}
$('#tttReset').addEventListener('click', ()=>{
  // Keep earned bonus; don't let them re-grind.
  if(state.ttt.extra && state.ttt.extra > 0){
    if(!confirm('You already earned a bonus. Playing again will NOT add more points. Continue?')) return;
  }
  resetTTT();
});

/* =======================================================
   PDF SANITIZER & GENERATION
   ======================================================= */
/**
 * Strips HTML tags, converts problem chars to ASCII, removes emojis/unsupported unicode.
 * jsPDF's default Helvetica only supports the Win-1252 / Latin-1 range (0x00..0xFF).
 * Anything outside becomes a garbage '&' if left in place, so we strip it.
 */
function sanitize(input){
  if(input === null || input === undefined) return '';
  let s = String(input);

  // 1) Strip HTML tags (preserve inner text)
  s = s.replace(/<[^>]*>/g, '');

  // 2) Decode common HTML entities
  s = s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
       .replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ');

  // 3) Common Unicode -> ASCII replacements (iterate by code point to handle surrogates)
  const map = {
    '\u2019':"'", '\u2018':"'", '\u201C':'"', '\u201D':'"',
    '\u2013':'-', '\u2014':'-', '\u2022':'*', '\u2026':'...',
    '\u2192':'->','\u2190':'<-','\u2191':'^','\u2193':'v',
    '\u21D2':'=>','\u2265':'>=','\u2264':'<=',
    '\u2713':'[OK]','\u2717':'[X]','\u2714':'[OK]','\u2718':'[X]'
  };
  let out = '';
  // Array.from iterates by code points (proper emoji handling)
  for(const ch of Array.from(s)){
    if(map[ch] !== undefined){ out += map[ch]; continue; }
    // Strip anything outside Latin-1 (0x20..0xFF + common whitespace)
    const cp = ch.codePointAt(0);
    if(cp === 0x0A || cp === 0x0D || cp === 0x09){ out += ch; continue; }
    if(cp >= 0x20 && cp <= 0xFF){ out += ch; continue; }
    // Drop everything else (emojis, arrows not in map, CJK, etc.)
  }

  // 4) Collapse whitespace but keep some newlines workable -> we flatten
  out = out.replace(/\s+/g,' ').trim();
  return out;
}

function buildReport(){
  const lines = [];
  const add = (k, v) => lines.push({ k: sanitize(k), v: sanitize(v) });

  // Ex 1
  add('EXERCISE 1 - WORD SEARCH (MONTHS)',
      `Found: ${state.ex1.found.length}/${EX1_WORDS.length} -> ${state.ex1.found.join(', ') || 'None'}`);

  // Ex 2
  const pairsFound = Object.entries(state.ex2.pairs).map(([k,v])=>`${k}=${v}`).join(' | ');
  add('EXERCISE 2 - MATCH ORDINALS',
      `Correct pairs: ${Object.keys(state.ex2.pairs).length}/8 -> ${pairsFound || 'None'}`);

  // Ex 3
  EX3_ITEMS.forEach((it,i)=>{
    const a = state.ex3.fills[it.id] || '---';
    const ok = norm(a) === norm(it.answer) ? '[OK]' : '[X]';
    add(`EX3 Q${i+1}`, `${it.text.replace('___','[ '+a+' ]')}  ${ok} (correct: ${it.answer})`);
  });

  // Ex 4
  EX4_ITEMS.forEach((it,i)=>{
    const a = state.ex4.answers[it.id] || '---';
    const ok = a.toUpperCase() === it.answer ? '[OK]' : '[X]';
    add(`EX4 Q${i+1}`, `${it.hint} -> ${a} ${ok} (correct: ${it.answer})`);
  });

  // Ex 5
  EX5_ITEMS.forEach((it,i)=>{
    const c = state.ex5.choices[it.id];
    const ans = c !== undefined ? it.opts[c] : '---';
    const ok = c === it.answer ? '[OK]' : '[X]';
    add(`EX5 Q${i+1}`, `${it.question} -> ${ans} ${ok}`);
  });

  // Ex 6
  const regOk = EX6_VERBS.filter(v=>v.cat==='regular' && state.ex6.placed[v.v]==='regular').map(v=>v.v);
  const irrOk = EX6_VERBS.filter(v=>v.cat==='irregular' && state.ex6.placed[v.v]==='irregular').map(v=>v.v);
  add('EX6 - CLASSIFY VERBS', `Regular OK: ${regOk.join(', ')} | Irregular OK: ${irrOk.join(', ')}`);

  // Ex 7
  EX7_ITEMS.forEach((it,i)=>{
    const c = state.ex7.choices[i];
    const ans = c !== undefined && c !== '' ? it.opts[c] : '---';
    const ok = c === it.answer ? '[OK]' : '[X]';
    add(`EX7 Q${i+1}`, `${it.text.replace('___','[ '+ans+' ]')} ${ok}`);
  });

  // Ex 8
  EX8_ITEMS.forEach((it,i)=>{
    const c = state.ex8.choices[i];
    const ans = c === true ? 'TRUE' : c === false ? 'FALSE' : '---';
    const ok = c === it.answer ? '[OK]' : '[X]';
    add(`EX8 Q${i+1}`, `${it.text} -> ${ans} ${ok}`);
  });

  // Ex 9
  EX9_ITEMS.forEach((it,i)=>{
    const a = state.ex9.answers[it.id] || '---';
    const v = norm(a), t = norm(it.answer);
    const strip = s => s.replace(/\b(\d+)(st|nd|rd|th)\b/g,'$1');
    const ok = (v === t || strip(v) === strip(t)) ? '[OK]' : '[X]';
    add(`EX9 Q${i+1}`, `${it.date} -> ${a} ${ok} (correct: ${it.answer})`);
  });

  // Ex 10
  EX10_ITEMS.forEach((it,i)=>{
    const a = state.ex10.answers[it.id] || '---';
    const v = norm(a);
    const ok = (v && it.accept.some(x => v.includes(norm(x)))) ? '[OK]' : '[X]';
    add(`EX10 Q${i+1}`, `${it.verb} -> "${a}" ${ok}`);
  });

  return lines;
}

async function downloadPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'letter' });

  const score = computeFinalScore();
  const extra = state.ttt.extra || 0;
  const finalWithBonus = Math.min(10, Math.round((score + extra) * 10) / 10);

  const mLeft = 48, mTop = 48;
  let y = mTop;

  // Header band
  doc.setFillColor(29,34,48);
  doc.rect(0, 0, 612, 80, 'F');
  doc.setFillColor(232,90,42);
  doc.rect(0, 80, 612, 4, 'F');

  doc.setTextColor(255, 216, 102);
  doc.setFont('helvetica','bold');
  doc.setFontSize(18);
  doc.text(sanitize('COEDUCA - English A1+'), mLeft, 36);
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','normal');
  doc.setFontSize(11);
  doc.text(sanitize('Unit 2 - People & Life Stories | Week 8 | 9th Grade'), mLeft, 56);

  // Score badge in top right
  doc.setFillColor(232,90,42);
  doc.roundedRect(460, 18, 110, 52, 8, 8, 'F');
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','bold');
  doc.setFontSize(26);
  doc.text(String(finalWithBonus.toFixed(1)), 515, 50, { align:'center' });
  doc.setFontSize(9);
  doc.text('FINAL / 10', 515, 63, { align:'center' });

  // Bonus corner badge
  if(extra > 0){
    doc.setFillColor(61,151,96);
    doc.roundedRect(510, 92, 70, 28, 6, 6, 'F');
    doc.setTextColor(255,255,255);
    doc.setFont('helvetica','bold');
    doc.setFontSize(10);
    doc.text(sanitize(`BONUS +${extra}`), 545, 110, { align:'center' });
  }

  y = 130;

  // Student info block
  doc.setDrawColor(231,217,196);
  doc.setFillColor(250,243,232);
  doc.roundedRect(mLeft, y, 516, 90, 6, 6, 'F');
  doc.setTextColor(29,34,48);
  doc.setFont('helvetica','bold');
  doc.setFontSize(11);
  const infoL = [
    ['Teacher:', 'Jose Eliseo Martinez'],
    ['School:', 'COEDUCA'],
    ['Section:', 'A'],
    ['Grade:', '9th'],
  ];
  const infoR = [
    ['Student:', sanitize(state.student.name || '-- not provided --')],
    ['NIE:', sanitize(state.student.id || '-- not provided --')],
    ['Topic:', 'Simple Past Negative + Dates + Ordinals'],
    ['Date:', new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })],
  ];
  doc.setFontSize(10);
  infoL.forEach((row, i)=>{
    doc.setFont('helvetica','bold');
    doc.text(row[0], mLeft + 12, y + 20 + i*18);
    doc.setFont('helvetica','normal');
    doc.text(sanitize(row[1]), mLeft + 72, y + 20 + i*18);
  });
  infoR.forEach((row, i)=>{
    doc.setFont('helvetica','bold');
    doc.text(row[0], mLeft + 270, y + 20 + i*18);
    doc.setFont('helvetica','normal');
    doc.text(sanitize(row[1]).substring(0,45), mLeft + 320, y + 20 + i*18);
  });
  y += 105;

  // Score summary
  doc.setFont('helvetica','bold');
  doc.setFontSize(12);
  doc.text('SCORE BREAKDOWN', mLeft, y); y += 14;
  doc.setFont('helvetica','normal');
  doc.setFontSize(10);
  const perEx = [
    ['Ex 1 Word Search', `${state.ex1.found.length}/${EX1_WORDS.length}`],
    ['Ex 2 Match Ordinals', `${Object.keys(state.ex2.pairs).length}/8`],
    ['Ex 3 Fill Blanks', `${EX3_ITEMS.filter(it=>norm(state.ex3.fills[it.id])===norm(it.answer)).length}/${EX3_ITEMS.length}`],
    ['Ex 4 Unscramble', `${EX4_ITEMS.filter(it=>(state.ex4.answers[it.id]||'').toUpperCase()===it.answer).length}/${EX4_ITEMS.length}`],
    ['Ex 5 Multiple Choice', `${EX5_ITEMS.filter(it=>state.ex5.choices[it.id]===it.answer).length}/${EX5_ITEMS.length}`],
    ['Ex 6 Classify Verbs', `${EX6_VERBS.filter(v=>state.ex6.placed[v.v]===v.cat).length}/${EX6_VERBS.length}`],
    ['Ex 7 Dropdown', `${EX7_ITEMS.filter((it,i)=>state.ex7.choices[i]===it.answer).length}/${EX7_ITEMS.length}`],
    ['Ex 8 True/False', `${EX8_ITEMS.filter((it,i)=>state.ex8.choices[i]===it.answer).length}/${EX8_ITEMS.length}`],
    ['Ex 9 Dates', `${EX9_ITEMS.filter(it=>{const v=norm(state.ex9.answers[it.id]||''),t=norm(it.answer);const strip=s=>s.replace(/\b(\d+)(st|nd|rd|th)\b/g,'$1');return v===t||strip(v)===strip(t);}).length}/${EX9_ITEMS.length}`],
    ['Ex 10 Emoji Sentences', `${EX10_ITEMS.filter(it=>{const v=norm(state.ex10.answers[it.id]||'');return v && it.accept.some(a=>v.includes(norm(a)));}).length}/${EX10_ITEMS.length}`],
  ];
  perEx.forEach((row,i)=>{
    const col = i % 2;
    const rowIdx = Math.floor(i/2);
    const x = mLeft + col*260;
    doc.text(sanitize(row[0]) + ':', x, y + rowIdx*14);
    doc.setFont('helvetica','bold');
    doc.text(row[1], x + 150, y + rowIdx*14);
    doc.setFont('helvetica','normal');
  });
  y += Math.ceil(perEx.length/2) * 14 + 18;

  // Base + Bonus math line
  doc.setDrawColor(231,217,196);
  doc.line(mLeft, y, mLeft + 516, y);
  y += 14;
  doc.setFont('helvetica','bold');
  doc.setFontSize(11);
  doc.text(`Base Score: ${score.toFixed(1)} / 10`, mLeft, y);
  if(extra > 0){
    doc.setTextColor(61,151,96);
    doc.text(`Bonus: +${extra}`, mLeft + 170, y);
    doc.setTextColor(29,34,48);
  }
  doc.text(`FINAL: ${finalWithBonus.toFixed(1)} / 10`, mLeft + 340, y);
  y += 22;

  // Detail answers (new page if needed)
  doc.setFont('helvetica','bold');
  doc.setFontSize(12);
  doc.text('DETAIL OF ANSWERS', mLeft, y); y += 16;

  const report = buildReport();
  doc.setFont('helvetica','normal');
  doc.setFontSize(9.5);
  for(const { k, v } of report){
    if(y > 740){ doc.addPage(); y = mTop; }
    doc.setFont('helvetica','bold');
    const kLines = doc.splitTextToSize(k, 160);
    doc.text(kLines, mLeft, y);
    doc.setFont('helvetica','normal');
    const vLines = doc.splitTextToSize(v, 340);
    doc.text(vLines, mLeft + 170, y);
    y += Math.max(kLines.length, vLines.length) * 11 + 4;
  }

  // Bonus footer
  if(y > 730){ doc.addPage(); y = mTop; }
  y += 10;
  doc.setDrawColor(232,90,42);
  doc.setLineWidth(1);
  doc.line(mLeft, y, mLeft + 516, y); y += 18;
  doc.setFont('helvetica','bold');
  doc.setFontSize(11);
  doc.text('BONUS GAME (Tic-Tac-Toe)', mLeft, y); y += 14;
  doc.setFont('helvetica','normal');
  doc.setFontSize(10);
  const rTxt = state.ttt.result === 'win' ? 'WIN — +1 extra point' :
               state.ttt.result === 'tie' ? 'TIE — +0.5 extra point' :
               state.ttt.result === 'lose'? 'LOSE — No extra point' :
               'Not played';
  doc.text(sanitize(rTxt), mLeft, y);

  // Filename
  const filename = `Unit2_Workshop_${sanitize(state.student.name || 'Student').replace(/\s+/g,'_')}.pdf`;
  doc.save(filename);
}

/* =======================================================
   BUTTONS
   ======================================================= */
$('#pdfBtn').addEventListener('click', downloadPDF);

$('#checkBtn').addEventListener('click', ()=>{
  updateScore();
  // Show right/wrong colors on MCQ / Dropdown / T-F
  EX5_ITEMS.forEach(it=>{
    const card = $$('#mcqGrid .mcq-card')[EX5_ITEMS.indexOf(it)];
    if(!card) return;
    $$('.mcq-option', card).forEach((b, i)=>{
      b.classList.remove('right','wrong');
      if(i === it.answer) b.classList.add('right');
      else if(state.ex5.choices[it.id] === i) b.classList.add('wrong');
    });
  });
  EX7_ITEMS.forEach((it,i)=>{
    const sel = $$('#dropList select')[i];
    sel.classList.remove('right','wrong');
    if(state.ex7.choices[i] === it.answer) sel.classList.add('right');
    else if(state.ex7.choices[i] !== undefined && state.ex7.choices[i] !== '') sel.classList.add('wrong');
  });
  EX8_ITEMS.forEach((it,i)=>{
    const row = $$('#tfList .tf-row')[i];
    if(!row) return;
    const [btnT, btnF] = $$('.tf-btn', row);
    btnT.classList.remove('right','wrong');
    btnF.classList.remove('right','wrong');
    if(state.ex8.choices[i] === true){
      if(it.answer === true) btnT.classList.add('right');
      else btnT.classList.add('wrong');
    }
    if(state.ex8.choices[i] === false){
      if(it.answer === false) btnF.classList.add('right');
      else btnF.classList.add('wrong');
    }
  });
  EX9_ITEMS.forEach(it=>{
    const inp = $$('#dateList input')[EX9_ITEMS.indexOf(it)];
    const v = norm(state.ex9.answers[it.id]||''), t = norm(it.answer);
    const strip = s => s.replace(/\b(\d+)(st|nd|rd|th)\b/g,'$1');
    inp.classList.remove('right','wrong');
    if(!v) return;
    if(v === t || strip(v) === strip(t)) inp.classList.add('right');
    else inp.classList.add('wrong');
  });

  window.scrollTo({ top: $('.result-box').offsetTop - 20, behavior:'smooth' });
});

$('#resetBtn').addEventListener('click', ()=>{
  if(!confirm('Reset ALL your answers? This cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
});

/* =======================================================
   INIT
   ======================================================= */
function init(){
  load();
  bindStudent();
  renderWordSearch();
  renderMatch();
  renderEx3();
  renderEx4();
  renderEx5();
  renderEx6();
  renderEx7();
  renderEx8();
  renderEx9();
  renderEx10();
  resetTTT();
  // Restore extra if won previously
  if(state.ttt.extra > 0){
    $('#moodEmoji').textContent = state.ttt.result === 'win' ? '🥳' : state.ttt.result === 'tie' ? '😐' : '🙂';
    if(state.ttt.result === 'win'){
      $('#tttResult').textContent = 'Felicidades, eres bueno en este juego, ten 1 punto extra 🎉';
      $('#extraNote').textContent = '+1 point will appear on your PDF.';
    } else if(state.ttt.result === 'tie'){
      $('#tttResult').textContent = 'Estamos a mano, ten 0.5 extra para tu nota 🤝';
      $('#extraNote').textContent = '+0.5 will appear on your PDF.';
    }
  }
  updateScore();
}
document.addEventListener('DOMContentLoaded', init);
