const paletteContainer = document.getElementById('paletteContainer');
const generateBtn = document.getElementById('generateBtn');
const randomBtn = document.getElementById('randomBtn');
const harmonyBtn = document.getElementById('harmonyBtn');
const harmonyOptions = document.getElementById('harmonyOptions');
const colorCountRange = document.getElementById('colorCount');
const colorCountValue = document.getElementById('colorCountValue');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const copyAllBtn = document.getElementById('copyAllBtn');
const copyHexBtn = document.getElementById('copyHexBtn');
const copyCssBtn = document.getElementById('copyCssBtn');
const downloadBtn = document.getElementById('downloadBtn');
const recentContainer = document.getElementById('recentContainer');

// ---------- Utilities ----------
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function randInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomHex(){
  return `#${Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0')}`.toUpperCase();
}

function hexToHsl(hex){
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2), 16) / 255;
  const g = parseInt(hex.substring(2,4), 16) / 255;
  const b = parseInt(hex.substring(4,6), 16) / 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max + min) / 2;
  if(max === min){ h = s = 0; }
  else {
    const d = max - min;
    s = l > .5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 1); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s: s*100, l: l*100 };
}

function hslToHex(h, s, l){
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2*l - 1)) * s;
  const x = c * (1 - Math.abs((h/60) % 2 - 1));
  const m = l - c/2;
  let r=0,g=0,b=0;
  if (0<=h && h<60){ r=c; g=x; b=0; }
  else if (60<=h && h<120){ r=x; g=c; b=0; }
  else if (120<=h && h<180){ r=0; g=c; b=x; }
  else if (180<=h && h<240){ r=0; g=x; b=c; }
  else if (240<=h && h<300){ r=x; g=0; b=c; }
  else if (300<=h && h<360){ r=c; g=0; b=x; }
  const to255 = v => Math.round((v+m)*255);
  return `#${to255(r).toString(16).padStart(2,'0')}${to255(g).toString(16).padStart(2,'0')}${to255(b).toString(16).padStart(2,'0')}`.toUpperCase();
}

function adjustLightness(hex, delta){
  const {h,s,l} = hexToHsl(hex);
  return hslToHex(h, s, clamp(l + delta, 0, 100));
}

// Harmony generators
function generateComplementary(base){
  const {h,s,l} = hexToHsl(base);
  const c2 = hslToHex((h+180)%360, s, l);
  return [adjustLightness(base, 8), base, adjustLightness(base, -8), c2, adjustLightness(c2, -8)];
}

function generateTriadic(base){
  const {h,s,l} = hexToHsl(base);
  const h1 = (h+120)%360; const h2 = (h+240)%360;
  const c1 = hslToHex(h1, s, l), c2 = hslToHex(h2, s, l);
  return [adjustLightness(base, 10), base, adjustLightness(base, -10), adjustLightness(c1, 6), adjustLightness(c2, -6)];
}

function generateAnalogous(base){
  const {h,s,l} = hexToHsl(base);
  const step = 18; // softer neighbors
  const colors = [-2,-1,0,1,2].map(k => hslToHex((h + k*step + 360)%360, s, l));
  return colors;
}

function generateTetradic(base){
  const {h,s,l} = hexToHsl(base);
  const h1 = (h+90)%360, h2=(h+180)%360, h3=(h+270)%360;
  return [base, hslToHex(h1,s,l), hslToHex(h2,s,l), hslToHex(h3,s,l), adjustLightness(base,-8)];
}

function generateMonochromatic(base){
  return [adjustLightness(base,22), adjustLightness(base,10), base, adjustLightness(base,-10), adjustLightness(base,-22)];
}

const harmonyMap = {
  complementary: generateComplementary,
  triadic: generateTriadic,
  analogous: generateAnalogous,
  tetradic: generateTetradic,
  monochromatic: generateMonochromatic,
};

// ---------- Rendering ----------
function createCard(hex){
  const card = document.createElement('div');
  card.className = 'color-card';

  const colorDiv = document.createElement('div');
  colorDiv.className = 'color';
  colorDiv.style.background = hex;

  const footer = document.createElement('div');
  footer.className = 'card-footer';

  const hexEl = document.createElement('div');
  hexEl.className = 'hex';
  hexEl.textContent = hex;

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'icon-btn';
  copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
  copyBtn.title = 'Copy HEX';

  const refreshBtn = document.createElement('button');
  refreshBtn.className = 'icon-btn';
  refreshBtn.innerHTML = '<i class="fas fa-sync"></i>';
  refreshBtn.title = 'Randomize this color';

  actions.appendChild(copyBtn);
  actions.appendChild(refreshBtn);

  footer.appendChild(hexEl);
  footer.appendChild(actions);

  card.appendChild(colorDiv);
  card.appendChild(footer);

  // interactions
  card.addEventListener('click', (e) => {
    if(e.target.closest('button')) return; // buttons handle their own actions
    copyToClipboard(hex);
    showToast(`${hex} copied to clipboard!`);
  });

  copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    copyToClipboard(hex);
    showToast(`${hex} copied to clipboard!`);
  });

  refreshBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const newHex = randomHex();
    colorDiv.style.background = newHex;
    hexEl.textContent = newHex;
    card.dataset.hex = newHex;
  });

  card.dataset.hex = hex;
  return card;
}

function renderPalette(hexes){
  paletteContainer.innerHTML = '';
  const count = clamp(parseInt(colorCountRange.value, 10), 3, 8);
  const usable = hexes.slice(0, count);
  usable.forEach(h => paletteContainer.appendChild(createCard(h)));
}

function getCurrentPalette(){
  return Array.from(paletteContainer.querySelectorAll('.color-card')).map(c => c.dataset.hex);
}

// Resize palette to match slider count (adds or trims colors)
function resizePaletteTo(targetCount){
  const current = getCurrentPalette();
  if(!current.length){
    generateRandomPalette();
    return;
  }
  const count = clamp(targetCount, 3, 8);
  let next = current.slice(0, count);
  if(current.length < count){
    for(let i = 0; i < count - current.length; i++) next.push(randomHex());
  }
  renderPalette(next);
}

// ---------- Generation ----------
function generateRandomPalette(){
  const count = clamp(parseInt(colorCountRange.value, 10), 3, 8);
  const list = Array.from({length: count}, () => randomHex());
  renderPalette(list);
}

function generateHarmonyPalette(kind){
  const base = randomHex();
  const gen = harmonyMap[kind] || generateAnalogous;
  const list = gen(base);
  renderPalette(list);
}

// ---------- Clipboard / Export ----------
async function copyToClipboard(text){
  try { await navigator.clipboard.writeText(text); } catch {}
}

function paletteToCssVars(hexes){
  return `:root{\n${hexes.map((h,i)=>`  --color-${i+1}: ${h};`).join('\n')}\n}`;
}

async function copyAll(){
  const hexes = getCurrentPalette();
  await copyToClipboard(hexes.join(', '));
  showToast('All colors copied!');
}

async function copyHex(){
  const hexes = getCurrentPalette();
  await copyToClipboard(hexes.join('\n'));
  showToast('HEX codes copied!');
}

async function copyCss(){
  const hexes = getCurrentPalette();
  await copyToClipboard(paletteToCssVars(hexes));
  showToast('CSS variables copied!');
}

function downloadPalette(){
  const hexes = getCurrentPalette();
  const data = {
    createdAt: new Date().toISOString(),
    colors: hexes,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `palette-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

// ---------- Toast ----------
let toastTimer;
function showToast(message){
  toastMessage.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 1800);
}


// ---------- Recent Palettes ----------
const RECENT_KEY = 'cpg_recents_v1';

function saveRecent(){
  const hexes = getCurrentPalette();
  const recents = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  recents.unshift({ colors: hexes, ts: Date.now() });
  const dedup = [];
  for(const r of recents){
    const key = r.colors.join('-');
    if(!dedup.some(d => d.colors.join('-') === key)) dedup.push(r);
  }
  localStorage.setItem(RECENT_KEY, JSON.stringify(dedup.slice(0, 12)));
  renderRecents();
}

function renderRecents(){
  const recents = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  recentContainer.innerHTML = '';
  recents.forEach(r => {
    const item = document.createElement('div');
    item.className = 'recent-item';
    const swatches = document.createElement('div');
    swatches.className = 'recent-swatches';
    const meta = document.createElement('div');
    meta.className = 'recent-meta';
    const dt = new Date(r.ts);
    meta.textContent = dt.toLocaleString();

    const useBtn = document.createElement('button');
    useBtn.className = 'export-btn';
    useBtn.textContent = 'Use';
    useBtn.addEventListener('click', () => renderPalette(r.colors));

    meta.appendChild(useBtn);

    const cols = r.colors.length;
    swatches.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    r.colors.forEach(h => {
      const s = document.createElement('div');
      s.style.background = h;
      swatches.appendChild(s);
    });

    item.appendChild(swatches);
    item.appendChild(meta);
    recentContainer.appendChild(item);
  });
}

// ---------- Events ----------
colorCountRange.addEventListener('input', () => {
  const val = parseInt(colorCountRange.value, 10);
  colorCountValue.textContent = String(val);
  resizePaletteTo(val);
});

generateBtn.addEventListener('click', () => {
  generateRandomPalette();
  saveRecent();
});

randomBtn.addEventListener('click', () => {
  generateRandomPalette();
});

harmonyBtn.addEventListener('click', () => {
  harmonyOptions.classList.toggle('open');
});

harmonyOptions.addEventListener('click', (e) => {
  const btn = e.target.closest('.harmony-btn');
  if(!btn) return;
  const kind = btn.dataset.harmony;
  generateHarmonyPalette(kind);
  saveRecent();
});

copyAllBtn.addEventListener('click', copyAll);
copyHexBtn.addEventListener('click', copyHex);
copyCssBtn.addEventListener('click', copyCss);

downloadBtn.addEventListener('click', () => {
  downloadPalette();
});


// ---------- Init ----------
renderRecents();
generateRandomPalette();


