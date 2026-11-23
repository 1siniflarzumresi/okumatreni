// Ladin Kasabası — 2. sınıf oyun dünyası: ortak motor (ses, sahne, sürükle-bırak, seviye, harita).
// Kurallar 1. sınıf oyunlarıyla aynı: speak = çocuğun dokunuşuna cevap, sayAfter = otomatik ses (sıraya girer),
// afterSay = robot konuşmasını bitirmeden ekran değişmez, doğru cevapta tahta kilitlenir.
"use strict";
const NS = 'http://www.w3.org/2000/svg';
// Oyun dünyası: sayfa window.DUNYA ile ad, kayıt anahtarı, harita arka planı ve maskotu değiştirebilir (varsayılan Ladin Kasabası)
const DUNYA = Object.assign({ ad: 'Ladin Kasabası', kayit: 'lk2_ilerleme', giris: 'Ladin Kasabası sana yardım için bekliyor. Bir yere dokun.' }, window.DUNYA || {});
const $ = id => document.getElementById(id);
const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// TTKB'de kesme işareti ters tırnağa benziyor: Andika ile yazılır
const kes = s => esc(s).replace(/'/g, '<span class="kesme">\'</span>');
const BUYUK = s => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);
const R = ad => `oyun2/r/${ad}.webp`;
const CV = document.createElement('canvas').getContext('2d');
const olc = (t, px) => { CV.font = `${px}px TTKB, Andika, sans-serif`; return CV.measureText(String(t)).width; };
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- sayılar ve saatler sözle (sayıya ek eklenmez) ---------- */
const BIRLER = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'], ONLAR = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
const sayiSoz = n => n === 0 ? 'sıfır' : n === 100 ? 'yüz' : (ONLAR[Math.floor(n / 10)] + ' ' + BIRLER[n % 10]).trim();
const SAAT = ['on iki', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on', 'on bir'];
const SAAT_DA = ['on ikide', 'birde', 'ikide', 'üçte', 'dörtte', 'beşte', 'altıda', 'yedide', 'sekizde', 'dokuzda', 'onda', 'on birde'];
const SAAT_E = ['on ikiye', 'bire', 'ikiye', 'üçe', 'dörde', 'beşe', 'altıya', 'yediye', 'sekize', 'dokuza', 'ona', 'on bire'];
const SAAT_I = ['on ikiyi', 'biri', 'ikiyi', 'üçü', 'dördü', 'beşi', 'altıyı', 'yediyi', 'sekizi', 'dokuzu', 'onu', 'on biri'];

/* ---------- ses ---------- */
let VOICE = null, AC = null, SES = true;
function loadVoice(){ try { const v = speechSynthesis.getVoices().filter(x => /^tr/i.test(x.lang));
  VOICE = v.find(x => /tolga|ahmet|erkek|male(?!.*female)/i.test(x.name + ' ' + x.voiceURI)) || v.find(x => x.localService) || v[0] || null; } catch(e){} }
if ('speechSynthesis' in window) { loadVoice(); speechSynthesis.onvoiceschanged = loadVoice; }
function queueSay(t){ if (!SES) return; String(t).split(/(?<=[.!?])\s+/).filter(Boolean).forEach(part => { const u = new SpeechSynthesisUtterance(part); u.lang = 'tr-TR'; if (VOICE) u.voice = VOICE; u.rate = .72; speechSynthesis.speak(u); }); }
function speak(t){ if (!('speechSynthesis' in window)) return; try { speechSynthesis.cancel(); queueSay(t); } catch(e){} }
function sayAfter(t){ if (!('speechSynthesis' in window)) return; try { queueSay(t); } catch(e){} }
let GEN = 0;
function afterSay(fn, ms){ const g = GEN, t0 = Date.now(); const busy = () => { try { return speechSynthesis.speaking || speechSynthesis.pending; } catch(e){ return false; } };
  const go = () => { if (g !== GEN) return; if (busy() && Date.now() - t0 < 12000) { setTimeout(go, 200); return; } fn(); }; return setTimeout(go, ms || 0); }
function zaman(fn, ms){ const g = GEN; return setTimeout(() => { if (g === GEN) fn(); }, ms); }
function tone(f, d, type = 'sine', vol = .14, delay = 0){ if (!SES) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime + delay;
  o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g).connect(AC.destination); o.start(t); o.stop(t + d + .02); } catch(e){} }
const sOk = () => { tone(660, .12); tone(880, .18, 'sine', .14, .11); };
const sBad = () => tone(200, .22, 'triangle', .12);
const sPop = () => tone(950, .07, 'square', .05);
const sTik = () => tone(1400, .03, 'square', .03);
const sWin = () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .2, 'sine', .13, i * .12));
const sCan = (n) => { for (let i = 0; i < n; i++) { tone(392, 1.1, 'sine', .16, i * .75); tone(784, .6, 'sine', .05, i * .75); } };

/* ---------- SVG yardımcıları ---------- */
const sv = $('sv');
const S = (p, html) => { p.insertAdjacentHTML('beforeend', html); return p.lastElementChild; };
function tween(ms, f, done){ const g = GEN, t0 = performance.now(); if (RM) ms = Math.min(ms, 120);
  const step = now => { if (g !== GEN) return; const t = Math.min(1, (now - t0) / ms); f(t); if (t < 1) requestAnimationFrame(step); else if (done) done(); }; requestAnimationFrame(step); }
function nokta(e){ const p = sv.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(sv.getScreenCTM().inverse()); }
const konum = (g, x, y, s) => { g.dataset.x = x; g.dataset.y = y; if (s != null) g.dataset.s = s; g.setAttribute('transform', `translate(${x} ${y})${g.dataset.s && g.dataset.s !== '1' ? ` scale(${g.dataset.s})` : ''}`); };
function git(g, x, y, ms, done){ const x0 = +g.dataset.x, y0 = +g.dataset.y; tween(ms || 260, t => { const e = ease(t); konum(g, x0 + (x - x0) * e, y0 + (y - y0) * e); }, done); }
const icinde = (x, y, [a, b, c, d]) => x >= a && x <= c && y >= b && y <= d;
// sürükle ya da dokun: o.birak(x, y) true dönerse yerinde kalır, false dönerse yerine döner; o.dokun() dokunmada çağrılır
function surukle(g, o){
  g.classList.add('tutulur');
  g.addEventListener('pointerdown', e => {
    if (KILIT || (o.izin && !o.izin())) return; e.preventDefault(); e.stopPropagation();
    const p = nokta(e), x0 = +g.dataset.x, y0 = +g.dataset.y, dx = p.x - x0, dy = p.y - y0; let oynadi = false;
    try { g.setPointerCapture(e.pointerId); } catch(_){}
    g.parentNode.appendChild(g); g.classList.add('tutuldu'); if (o.basla) o.basla();
    const mv = ev => { const q = nokta(ev); if (!oynadi && Math.hypot(q.x - p.x, q.y - p.y) < 8) return; oynadi = true; konum(g, q.x - dx, q.y - dy); if (o.hareket) o.hareket(q.x, q.y); };
    const up = ev => { g.removeEventListener('pointermove', mv); g.removeEventListener('pointerup', up); g.removeEventListener('pointercancel', up); g.classList.remove('tutuldu');
      const q = nokta(ev);
      if (!oynadi) { konum(g, x0, y0); if (o.dokun) o.dokun(); return; }
      if (!o.birak(q.x, q.y)) git(g, x0, y0, 220); };
    g.addEventListener('pointermove', mv); g.addEventListener('pointerup', up); g.addEventListener('pointercancel', up);
  });
}
function zipla(g){ const s0 = g.getAttribute('transform') || ''; tween(380, t => g.setAttribute('transform', s0 + ` translate(0 ${-Math.sin(t * Math.PI) * 18})`), () => g.setAttribute('transform', s0)); }
function salla(g){ const s0 = g.getAttribute('transform') || ''; tween(360, t => g.setAttribute('transform', s0 + ` translate(${Math.sin(t * Math.PI * 4) * 8} 0)`), () => g.setAttribute('transform', s0)); }
function yildizPatla(x, y){ const g = S(sv, '<g pointer-events="none"></g>'); const c = ['#ffc93c', '#12b886', '#3a86ff', '#f2546b', '#8b5cf6'];
  tween(700, t => { g.innerHTML = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, r = 14 + 70 * t; return `<circle cx="${x + Math.cos(a) * r}" cy="${y + Math.sin(a) * r}" r="${6 * (1 - t) + 1}" fill="${c[i % 5]}"/>`; }).join(''); }, () => g.remove()); }

/* ---------- ortak çizimler ---------- */
const golge = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry || rx * .22}" fill="#000" opacity=".12"/>`;
const resimDaire = (ad, r, kenar) => `<circle r="${r}" fill="#fff" stroke="${kenar || '#fff'}" stroke-width="3"/><clipPath id="k${ad}${r}"><circle r="${r - 2}"/></clipPath><image href="${R(ad)}" x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" clip-path="url(#k${ad}${r})" preserveAspectRatio="xMidYMid meet"/>`;
const agac = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-10" width="12" height="26" fill="#8a5a2b"/><path d="M0 -120 L34 -60 L18 -60 L44 -14 L-44 -14 L-18 -60 L-34 -60 Z" fill="${c || '#2e8b57'}"/><path d="M0 -120 L34 -60 L18 -60 L44 -14 L0 -14 Z" fill="#000" opacity=".1"/></g>`;
const bulut = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".92">${RM ? '' : `<animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;30 0;0 0" dur="${18 + (x % 7)}s" repeatCount="indefinite"/>`}<ellipse cx="0" cy="0" rx="50" ry="22"/><ellipse cx="-30" cy="6" rx="32" ry="16"/><ellipse cx="34" cy="8" rx="34" ry="15"/><ellipse cx="6" cy="-14" rx="30" ry="18"/></g>`;
const dugme = (x, y, w, metin, renk, id) => `<g class="dugmeS" data-id="${id}" transform="translate(${x} ${y})"><rect x="${-w / 2}" y="-30" width="${w}" height="60" rx="30" fill="${renk || '#3a86ff'}"/><rect x="${-w / 2}" y="22" width="${w}" height="8" rx="4" fill="#000" opacity=".15"/><text y="11" text-anchor="middle" class="ttkb" font-size="30" fill="#fff">${metin}</text></g>`;
// Karakterler: hepsi kendi SVG çizimi; ruh hâli ağızdan okunur (mutlu, dusun, uzgun)
const agiz = (x, y, m, w) => m === 'uzgun' ? `<path d="M${x - w} ${y + 6} Q${x} ${y - 6} ${x + w} ${y + 6}" fill="none" stroke="#3b2414" stroke-width="4" stroke-linecap="round"/>` : m === 'dusun' ? `<ellipse cx="${x}" cy="${y + 2}" rx="${w * .35}" ry="${w * .3}" fill="#3b2414"/>` : `<path d="M${x - w} ${y - 2} Q${x} ${y + 14} ${x + w} ${y - 2}" fill="#7a2d1d" stroke="#3b2414" stroke-width="3" stroke-linecap="round"/>`;
function ayiUsta(m){ return `<g class="karakter">${golge(0, 6, 90)}
  <path d="M-80 0 Q-86 -120 0 -130 Q86 -120 80 0 Z" fill="#9a6235"/><path d="M-52 0 Q-56 -96 0 -104 Q56 -96 52 0 Z" fill="#fff" stroke="#e3d8c8" stroke-width="3"/><circle cx="0" cy="-60" r="7" fill="#f2546b"/>
  <circle cx="-62" cy="-232" r="22" fill="#9a6235"/><circle cx="62" cy="-232" r="22" fill="#9a6235"/><circle cx="-62" cy="-232" r="11" fill="#d8a67a"/><circle cx="62" cy="-232" r="11" fill="#d8a67a"/>
  <circle cx="0" cy="-185" r="74" fill="#a86b3a"/><ellipse cx="0" cy="-160" rx="38" ry="30" fill="#e2b98c"/><ellipse cx="0" cy="-174" rx="13" ry="9" fill="#3b2414"/>
  <circle cx="-27" cy="-205" r="8" fill="#2a1a10"/><circle cx="27" cy="-205" r="8" fill="#2a1a10"/><circle cx="-24" cy="-208" r="3" fill="#fff"/><circle cx="30" cy="-208" r="3" fill="#fff"/>
  <circle cx="-46" cy="-170" r="9" fill="#f2546b" opacity=".35"/><circle cx="46" cy="-170" r="9" fill="#f2546b" opacity=".35"/>${agiz(0, -150, m, 14)}
  <path d="M-50 -240 Q-70 -300 -20 -300 Q0 -330 25 -300 Q72 -300 50 -240 Z" fill="#fff" stroke="#d9d2c6" stroke-width="3"/><rect x="-52" y="-252" width="104" height="18" rx="6" fill="#fff" stroke="#d9d2c6" stroke-width="3"/></g>`; }
function baykus(m){ return `<g class="karakter">${golge(0, 4, 70)}
  <ellipse cx="0" cy="-90" rx="70" ry="92" fill="#8a6a4a"/><ellipse cx="0" cy="-70" rx="46" ry="62" fill="#e9d7b6"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${-28 + (i % 3) * 28} ${-100 + Math.floor(i / 3) * 26} q10 10 20 0" fill="none" stroke="#c7ad86" stroke-width="3"/>`).join('')}
  <path d="M-60 -170 L-48 -205 L-28 -172 Z M60 -170 L48 -205 L28 -172 Z" fill="#6e5236"/>
  <circle cx="-28" cy="-140" r="26" fill="#fff" stroke="#3b2414" stroke-width="5"/><circle cx="28" cy="-140" r="26" fill="#fff" stroke="#3b2414" stroke-width="5"/><line x1="-2" y1="-142" x2="2" y2="-142" stroke="#3b2414" stroke-width="5"/>
  <circle cx="-26" cy="-138" r="10" fill="#2a1a10"/><circle cx="30" cy="-138" r="10" fill="#2a1a10"/><circle cx="-23" cy="-141" r="3.5" fill="#fff"/><circle cx="33" cy="-141" r="3.5" fill="#fff"/>
  <path d="M-8 -116 L8 -116 L0 -100 Z" fill="#f4a100"/>${m === 'uzgun' ? '<path d="M-16 -88 Q0 -96 16 -88" fill="none" stroke="#3b2414" stroke-width="3"/>' : ''}
  <path d="M-70 -90 Q-96 -40 -60 -10" fill="#7a5a3a"/><path d="M70 -90 Q96 -40 60 -10" fill="#7a5a3a"/><path d="M-20 0 l-6 10 M-10 0 l0 12 M10 0 l0 12 M20 0 l6 10" stroke="#f4a100" stroke-width="5" stroke-linecap="round"/></g>`; }
function guvercin(m){ return `<g class="karakter">${golge(0, 4, 60)}
  <ellipse cx="0" cy="-60" rx="62" ry="54" fill="#b8c2d6"/><ellipse cx="-10" cy="-48" rx="40" ry="34" fill="#d6dcea"/><path d="M40 -70 Q96 -60 70 -20 Q50 -40 30 -40 Z" fill="#9aa6bf"/>
  <circle cx="-40" cy="-118" r="38" fill="#c9d2e4"/><path d="M-60 -150 Q-40 -176 -12 -150 Z" fill="#1d4e89"/><rect x="-66" y="-152" width="60" height="10" rx="5" fill="#1d4e89"/><rect x="-4" y="-150" width="22" height="6" rx="3" fill="#163d6c"/>
  <circle cx="-50" cy="-122" r="7" fill="#2a1a10"/><circle cx="-48" cy="-124" r="2.4" fill="#fff"/><path d="M-80 -114 L-96 -108 L-80 -102 Z" fill="#f4a100"/>${m === 'uzgun' ? '<path d="M-60 -98 q8 -6 16 0" stroke="#3b2414" stroke-width="3" fill="none"/>' : ''}
  <path d="M-30 -40 Q-10 10 30 -10" fill="none" stroke="#c0392b" stroke-width="6"/><rect x="18" y="-26" width="44" height="34" rx="6" fill="#c0392b"/><rect x="24" y="-20" width="32" height="5" fill="#fff" opacity=".7"/>
  <path d="M-14 -6 l-4 12 M8 -6 l4 12" stroke="#f4a100" stroke-width="5" stroke-linecap="round"/></g>`; }
function kaplumbaga(m){ return `<g class="karakter">${golge(0, 6, 80)}<image href="${R('kaplumbaga')}" x="-90" y="-150" width="180" height="160"/><g transform="translate(-58 -96)"><circle r="16" fill="none" stroke="#3b2414" stroke-width="4"/><circle cx="34" r="16" fill="none" stroke="#3b2414" stroke-width="4"/><line x1="16" x2="18" y1="0" y2="0" stroke="#3b2414" stroke-width="4"/></g>${m === 'uzgun' ? '' : ''}</g>`; }
function sincap(){ return `<g class="karakter">${golge(0, 4, 50)}<image href="${R('sincap')}" x="-70" y="-140" width="140" height="140"/></g>`; }

/* ---------- uygulama: üst çubuk, yönerge, eylem çubuğu ---------- */
const app = $('app');
let INSTR = '', KILIT = false;
function setInstr(t){ KILIT = false; INSTR = t; $('yonerge').innerHTML = kes(t); sayAfter(t); }
$('dinle').onclick = () => speak(INSTR);
$('sesac').onclick = () => { SES = !SES; $('sesac').textContent = SES ? '🔊' : '🔇'; if (!SES) try { speechSynthesis.cancel(); } catch(e){} };
function eylem(html){ $('eylem').innerHTML = html || ''; }
function ilerleme(n, k){ $('ilerleme').innerHTML = Array.from({ length: n }, (_, i) => `<i class="${i < k ? 'd' : ''}"></i>`).join(''); }
// Geri bildirim: doğruysa kilitlenir (çift dokunma turu atlatmaz)
function FB(t, iyi){ if (iyi) { KILIT = true; sOk(); } else sBad(); speak(t); const f = $('bildirim'); f.innerHTML = kes(t); f.className = iyi ? 'iyi' : 'kotu'; clearTimeout(FB.t); FB.t = setTimeout(() => { f.className = ''; }, 2600); }
function kart(html, yer){ const k = $('kart'); k.innerHTML = html.replace(/'/g, '<span class="kesme">\'</span>'); k.className = yer || ''; k.hidden = false; }
function bildirimKapat(){ clearTimeout(FB.t); $('bildirim').className = ''; }
function kartKapat(){ $('kart').hidden = true; }

/* ---------- ilerleme kaydı (cihazda; açılmazsa oyun yine çalışır) ---------- */
let KAYIT = {};
try { KAYIT = JSON.parse(localStorage.getItem(DUNYA.kayit) || '{}') || {}; } catch(e){ KAYIT = {}; }
const kaydet = () => { try { localStorage.setItem(DUNYA.kayit, JSON.stringify(KAYIT)); } catch(e){} };
const yildizlar = id => KAYIT[id] || [0, 0, 0];

/* ---------- yerler ve seviye akışı ---------- */
const YER = {};
const N_GOREV = 6;
let AKTIF = null;
function seviyeBasla(id, lvl){
  GEN++; try { speechSynthesis.cancel(); } catch(e){}
  const Y = YER[id]; AKTIF = { id, lvl, k: 0, hata: 0 };
  $('baslik').textContent = `${Y.ad} · ${Y.seviyeler[lvl][0]}`; kartKapat(); $('secim').hidden = true; $('sonuc').hidden = true;
  bildirimKapat(); ilerleme(N_GOREV, 0); gorevCiz();
}
function gorevCiz(){ const a = AKTIF; kartKapat(); bildirimKapat(); app.classList.remove('haritada'); eylem(''); sv.innerHTML = ''; KILIT = false; YER[a.id].gorev(a.lvl, a.k, CTX); }
const CTX = {
  yanlis(t){ AKTIF.hata++; FB(t || 'Bir daha dene.', false); },
  dogru(t, kartHtml, sure, yer){ FB(t || pick(['Aferin!', 'Harika!', 'Çok güzel!', 'Süper!', 'Bravo!']), true); if (kartHtml) kart(kartHtml, yer);
    AKTIF.k++; ilerleme(N_GOREV, AKTIF.k);
    afterSay(() => { if (AKTIF.k >= N_GOREV) seviyeBitti(); else gorevCiz(); }, sure || 1800); },
};
function seviyeBitti(){
  const { id, lvl, hata } = AKTIF, Y = YER[id], yz = hata <= 1 ? 3 : hata <= 4 ? 2 : 1;
  const k = yildizlar(id).slice(); k[lvl] = Math.max(k[lvl], yz); KAYIT[id] = k; kaydet();
  sWin(); kartKapat(); bildirimKapat(); eylem('');
  const s = $('sonuc'); s.hidden = false;
  s.innerHTML = `<div class="sonuc-ic"><div class="konfeti">${Array.from({ length: 40 }, (_, i) => `<i style="left:${Math.random() * 100}%;animation-delay:${Math.random() * 1.2}s;background:${['#ffc93c', '#12b886', '#3a86ff', '#f2546b', '#8b5cf6'][i % 5]}"></i>`).join('')}</div>
    <div class="muhur">${Y.ikon}<span>${esc(Y.ad)}</span></div><h2 class="ttkb">${['Harika!', 'Çok güzel!', 'Süper!'][yz - 1]}</h2>
    <p class="yildiz3">${'★'.repeat(yz)}<span>${'★'.repeat(3 - yz)}</span></p><p class="ttkb">${kes(Y.seviyeler[lvl][0])} tamam. Pasaportuna bir mühür daha!</p>
    <div class="satir">${lvl < 2 ? `<button class="cta" id="sonraki">Seviye ${lvl + 2}: ${esc(Y.seviyeler[lvl + 1][0])}</button>` : ''}<button class="cta ${lvl < 2 ? 'alt' : ''}" id="tekrar">Tekrar oyna</button><button class="cta alt" id="haritaya">Haritaya dön</button></div></div>`;
  speak(`${['Harika!', 'Çok güzel!', 'Süper!'][yz - 1]} ${yz} yıldız kazandın.`);
  if ($('sonraki')) $('sonraki').onclick = () => seviyeBasla(id, lvl + 1);
  $('tekrar').onclick = () => seviyeBasla(id, lvl); $('haritaya').onclick = harita;
}
// Yer kartı: üç seviye; bir seviye bitince sonraki açılır. Kilitli seviyeye 3 kez dokunmak öğretmen kilidini açar.
let OGR = 0;
function yerSec(id){
  const Y = YER[id], st = yildizlar(id), s = $('secim'); s.hidden = false;
  s.innerHTML = `<div class="secim-ic"><button class="kapat" id="secKapat" aria-label="Kapat">✕</button><div class="secim-bas"><div class="muhur kucuk">${Y.ikon}</div><div><h2 class="ttkb">${esc(Y.ad)}</h2><p>${esc(Y.ders)} · ${esc(Y.beceri)}</p></div></div>
    <p class="ttkb hikaye">${kes(Y.hikaye)}</p><div class="seviyeler">${Y.seviyeler.map(([ad, ac], i) => { const acik = i === 0 || st[i - 1] > 0 || st[i] > 0;
      return `<button class="seviye ${acik ? '' : 'kilitli'}" data-l="${i}"><b>Seviye ${i + 1}</b><span class="ttkb">${kes(ad)}</span><small>${esc(ac)}</small><em>${acik ? '★'.repeat(st[i]) + '<i>' + '★'.repeat(3 - st[i]) + '</i>' : '🔒'}</em></button>`; }).join('')}</div></div>`;
  sayAfter(Y.hikaye);
  $('secKapat').onclick = () => { s.hidden = true; };
  s.querySelectorAll('.seviye').forEach(b => b.onclick = () => { const l = +b.dataset.l;
    if (b.classList.contains('kilitli')) { if (++OGR >= 3) { OGR = 0; b.classList.remove('kilitli'); speak('Öğretmen kilidi açıldı.'); } else speak('Önce bir önceki seviyeyi bitir.'); return; }
    seviyeBasla(id, l); });
}

/* ---------- harita ---------- */
const YAKINDA = (window.DUNYA && window.DUNYA.yakinda) || [
  { ad: 'Pazar Yeri', beceri: 'Para, alışveriş ve para üstü', x: 430, y: 700 },
  { ad: 'Fidanlık', beceri: 'Eş gruplar ve çarpma', x: 200, y: 590 },
  { ad: 'Pastane', beceri: 'Bütün, yarım, çeyrek', x: 790, y: 700 },
  { ad: 'Terzi', beceri: 'Uzunluk ölçme', x: 840, y: 500 },
  { ad: 'Tabelacı', beceri: 'Büyük harf ve yazım', x: 770, y: 250 },
  { ad: 'Ayna Gölü', beceri: 'Eş ve zıt anlam', x: 440, y: 230 },
];
const kasabaArka = () => `<defs><linearGradient id="hGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#e8f7ff"/></linearGradient><linearGradient id="hCim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9df86"/><stop offset="1" stop-color="#7cc46a"/></linearGradient></defs>
    <rect x="-3000" y="-400" width="7200" height="1600" fill="url(#hGok)"/>${bulut(260, 60, .9)}${bulut(760, 40, .7)}${bulut(1060, 90, .8)}
    <path d="M-3000 200 Q-100 80 160 60 Q300 50 420 170 Q700 120 900 170 Q1100 110 4200 160 L4200 1200 L-3000 1200 Z" fill="#8cc97b"/>
    <rect x="-3000" y="180" width="7200" height="1100" fill="url(#hCim)"/>
    <path d="M-3000 760 L4200 760 L4200 1200 L-3000 1200 Z" fill="#7cc46a"/>
    <path d="M600 760 L600 480 M600 480 C540 440 440 480 380 470 C300 455 240 380 170 330 M600 480 C700 430 880 420 1000 380 M600 480 C700 560 900 620 1040 620 M380 470 C330 520 260 540 210 590 M600 610 C530 640 480 660 440 690 M600 610 C680 640 740 660 780 690 M600 400 C700 380 740 300 770 260 M600 400 C520 380 470 300 440 240" fill="none" stroke="#f1dfb8" stroke-width="34" stroke-linecap="round"/>
    <path d="M600 760 L600 480 M600 480 C540 440 440 480 380 470 C300 455 240 380 170 330 M600 480 C700 430 880 420 1000 380 M600 480 C700 560 900 620 1040 620 M380 470 C330 520 260 540 210 590 M600 610 C530 640 480 660 440 690 M600 610 C680 640 740 660 780 690 M600 400 C700 380 740 300 770 260 M600 400 C520 380 470 300 440 240" fill="none" stroke="#e5cc97" stroke-width="34" stroke-dasharray="2 22" stroke-linecap="round"/>
    ${[[30, 300, .7], [70, 380, .6], [1160, 300, .7], [1130, 380, .55], [900, 250, .5], [960, 230, .45], [300, 250, .5], [380, 230, .4], [80, 720, .6], [1180, 730, .5], [300, 640, .45], [680, 330, .4], [480, 560, .4], [960, 700, .45]].map(([x, y, k]) => agac(x, y, k, ['#2e8b57', '#3a9d63', '#267a4a'][Math.round(x) % 3])).join('')}`;
function harita(){
  GEN++; try { speechSynthesis.cancel(); } catch(e){} AKTIF = null; KILIT = false;
  $('baslik').textContent = DUNYA.ad; app.classList.add('haritada'); ilerleme(0, 0); eylem(''); kartKapat(); bildirimKapat(); $('sonuc').hidden = true; $('secim').hidden = true;
  let s = DUNYA.arka ? DUNYA.arka() : kasabaArka();
  const yerler = Object.values(YER).sort((a, b) => a.harita.y - b.harita.y);
  s += YAKINDA.filter(o => !Object.values(YER).some(Y => Y.ad === o.ad)).map(o => `<g class="yakinda" transform="translate(${o.x} ${o.y})">${golge(0, 4, 60)}<rect x="-50" y="-80" width="100" height="80" fill="#f1eadb" stroke="#c9b48c" stroke-width="3"/><path d="M-50 -80 L50 0 M50 -80 L-50 0 M-50 -40 L50 -40" stroke="#c48a4f" stroke-width="5"/><path d="M-8 -6 L0 -26 L8 -6 Z" fill="#f4a100"/><path d="M-5 -14 L5 -14" stroke="#fff" stroke-width="3"/>
    <g transform="translate(0 22)"><rect x="-64" y="-14" width="128" height="30" rx="8" fill="#fff" opacity=".9"/><text y="7" text-anchor="middle" class="ttkb" font-size="19" fill="#5b6b7b">${esc(o.ad)}</text></g><text y="-90" text-anchor="middle" font-size="15" font-family="Andika" fill="#8a6a3a" font-weight="700">Yapım aşamasında</text></g>`).join('');
  s += yerler.map(Y => { const { x, y } = Y.harita, st = yildizlar(Y.id);
    return `<g class="yer" data-yer="${Y.id}" transform="translate(${x} ${y})">${Y.bina()}<g transform="translate(0 28)"><rect x="-84" y="-18" width="168" height="40" rx="12" fill="#fff" stroke="${Y.renk}" stroke-width="4"/><text y="10" text-anchor="middle" class="ttkb" font-size="24" fill="#1f2a24">${esc(Y.ad)}</text>
      <text y="44" text-anchor="middle" font-size="22" fill="#f4a100" stroke="#b45309" stroke-width=".8">${st.map(v => v ? '★' : '☆').join('')}</text></g></g>`; }).join('');
  s += DUNYA.maskot ? DUNYA.maskot() : `<g transform="translate(1120 210)">${sincap()}<g transform="translate(-190 -150)"><rect x="-150" y="-40" width="300" height="74" rx="18" fill="#fff" stroke="#3a86ff" stroke-width="3"/><path d="M110 30 L160 70 L130 30 Z" fill="#fff" stroke="#3a86ff" stroke-width="3"/><path d="M108 31 L134 31" stroke="#fff" stroke-width="5"/><text y="-6" text-anchor="middle" class="ttkb" font-size="22">Kasabaya hoş geldin!</text><text y="24" text-anchor="middle" class="ttkb" font-size="22">Bir yere dokun.</text></g></g>`;
  sv.innerHTML = s;
  setInstr(DUNYA.giris);
  sv.querySelectorAll('.yer').forEach(g => { g.addEventListener('click', () => { sPop(); yerSec(g.dataset.yer); }); });
}

/* ---------- aç / kapat, yön uyarısı ---------- */
function ac(yer){ app.hidden = false; document.body.style.overflow = 'hidden';
  try { const el = document.documentElement; if (matchMedia('(pointer: coarse)').matches && el.requestFullscreen) el.requestFullscreen().catch(() => {}); } catch(e){}
  yonKontrol(); harita(); if (yer && YER[yer]) yerSec(yer); }
function kapat(){ GEN++; try { speechSynthesis.cancel(); } catch(e){} app.hidden = true; document.body.style.overflow = ''; sv.innerHTML = ''; try { if (document.fullscreenElement) document.exitFullscreen(); } catch(e){} }
let YON_GEC = false;
function yonKontrol(){ $('cevir').hidden = YON_GEC || !(innerHeight > innerWidth && innerWidth < 760); }
addEventListener('resize', yonKontrol);
$('cevirGec').onclick = () => { YON_GEC = true; yonKontrol(); };
$('haritaD').onclick = () => { if (AKTIF) harita(); else kapat(); };
$('cikis').onclick = kapat;
addEventListener('keydown', e => { if (e.key === 'Escape' && !app.hidden) { if (!$('secim').hidden) $('secim').hidden = true; else if (AKTIF) harita(); else kapat(); } });
