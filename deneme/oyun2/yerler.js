// Ladin Kasabası — yerler. Her yer bir beceri; her seviye 6 görev. Öğrenilecek şey oyunun mekaniğinin içinde:
// simit siparişi doğru sayıda sırık + tek simit olmadan gitmez, teleferik dolmadan kalkmaz, saat kulesi doğru saatte çalar…
"use strict";

/* ===================== 1) SİMİTÇİ FIRINI: onluk ve birlik ===================== */
const simitYan = y => `<g transform="translate(0 ${y})"><ellipse rx="25" ry="10" fill="#c9823b" stroke="#8a5420" stroke-width="2"/><ellipse cy="-2" rx="9" ry="3.6" fill="#5e3514"/>${[-16, -6, 6, 16].map((x, i) => `<ellipse cx="${x}" cy="${i % 2 ? -5 : 2}" rx="2.2" ry="1.2" fill="#fff4d6"/>`).join('')}</g>`;
function sirikSVG(n, dugum){ let s = `<rect x="-4.5" y="-236" width="9" height="236" rx="4" fill="#8b5a2b"/><rect x="-24" y="-8" width="48" height="12" rx="5" fill="#6e4421"/>`;
  for (let i = 0; i < n; i++) s += simitYan(-18 - i * 21);
  if (dugum) s += `<g class="dugum" transform="translate(0 -236)"><circle r="22" fill="transparent"/><path d="M0 0 C-18 -14 -22 4 -4 2 M0 0 C18 -14 22 4 4 2" fill="none" stroke="#e03131" stroke-width="5" stroke-linecap="round"/><circle r="5" fill="#e03131"/></g>`;
  return s; }
const simitUst = r => `<circle r="${r}" fill="#c9823b" stroke="#8a5420" stroke-width="2.5"/><circle r="${r * .38}" fill="#efd9b4" stroke="#8a5420" stroke-width="2"/>${Array.from({ length: 7 }, (_, i) => { const a = i * 0.9; return `<ellipse cx="${Math.cos(a) * r * .7}" cy="${Math.sin(a) * r * .7}" rx="2.4" ry="1.3" fill="#fff4d6" transform="rotate(${a * 57} ${Math.cos(a) * r * .7} ${Math.sin(a) * r * .7})"/>`; }).join('')}`;
YER.firin = {
  id: 'firin', ad: 'Simitçi Fırını', ders: 'Matematik', beceri: 'Onluk ve birlik, 100\'e kadar sayılar', ikon: '🥯', renk: '#e07a1f', harita: { x: 380, y: 480 },
  hikaye: 'Ayı Usta sabahtan beri simit pişiriyor. Simitleri onar onar sırıklara diziyor. Siparişleri hazırlamasına yardım et.',
  seviyeler: [['Sırıklara diz', 'Siparişi dolu sırıklar ve tek simitlerle hazırla.'], ['Etiket yaz', 'Kasadaki simitleri say, etikete sayıyı yaz.'], ['Sırık çöz', 'Tek simit yetmezse bir sırığın düğümünü çöz.']],
  bina(){ return `${golge(0, 4, 90)}<rect x="-80" y="-120" width="160" height="120" fill="#f6d7a7" stroke="#b07a3c" stroke-width="3"/><path d="M-96 -116 L0 -176 L96 -116 Z" fill="#b5533c"/><rect x="40" y="-190" width="22" height="50" fill="#8a3a2a"/>
    ${RM ? '' : '<g fill="#fff" opacity=".7"><circle cx="51" cy="-205" r="9"><animate attributeName="cy" values="-205;-245" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="3s" repeatCount="indefinite"/></circle></g>'}
    <rect x="-60" y="-86" width="56" height="44" rx="6" fill="#bfe6ff" stroke="#b07a3c" stroke-width="3"/><rect x="14" y="-80" width="44" height="80" rx="4" fill="#8a5a2b"/><g transform="translate(-32 -62) scale(.55)">${simitUst(22)}</g>`; },
  gorev(lvl, k, ctx){
    const MUS = ['Okul kantini', 'Kütüphane çay saati', 'Futbol takımı', 'Belediye toplantısı', 'Hastane kafeteryası', 'Köşedeki bakkal', 'Sinema salonu', 'Yüzme kulübü'];
    const musteri = MUS[(k + rint(0, 7)) % MUS.length];
    let hedef, raf, tepsi, kp = 0, kt = 0;
    if (lvl === 0) { do { hedef = rint(21, 79); } while (hedef % 10 === 0); raf = Math.min(8, Math.floor(hedef / 10) + rint(1, 2)); tepsi = 9; }
    else if (lvl === 2) { do { hedef = rint(16, 68); } while (hedef % 10 < 3); raf = Math.min(8, Math.floor(hedef / 10) + 2); tepsi = rint(0, Math.min(2, hedef % 10 - 1)); }
    else { kp = rint(1, 6); kt = k >= 3 ? rint(10, 15) : rint(1, 9); hedef = kp * 10 + kt; raf = 0; tepsi = 0; }
    let ayiMood = 'mutlu', d1 = 0, d2 = 0, mesgul = false;
    const kasa = [840, 360, 1180, 745];
    const arka = `<defs><linearGradient id="fDuvar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe7c6"/><stop offset="1" stop-color="#f3d3a2"/></linearGradient>
      <radialGradient id="fAtes" cx=".5" cy=".8" r=".7"><stop offset="0" stop-color="#ffe066"/><stop offset=".5" stop-color="#ff922b"/><stop offset="1" stop-color="#7a1f0e"/></radialGradient>
      <linearGradient id="fMasa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3b27a"/><stop offset="1" stop-color="#c98d55"/></linearGradient></defs>
      <rect x="-3000" y="-400" width="7200" height="1600" fill="#f3d3a2"/><rect x="-3000" y="0" width="7200" height="340" fill="url(#fDuvar)"/>
      ${Array.from({ length: 30 }, (_, i) => `<rect x="${(i % 10) * 124 - 10 + (Math.floor(i / 10) % 2) * 62}" y="${30 + Math.floor(i / 10) * 100}" width="110" height="88" rx="6" fill="#fff" opacity=".18"/>`).join('')}
      <clipPath id="fKub"><path d="M10 340 L10 170 Q160 0 310 170 L310 340 Z"/></clipPath><g><path d="M10 340 L10 170 Q160 0 310 170 L310 340 Z" fill="#b5533c"/><g clip-path="url(#fKub)">${Array.from({ length: 14 }, (_, i) => `<path d="M${10 + (i % 4) * 75 + (Math.floor(i / 4) % 2) * 37} ${200 + Math.floor(i / 4) * 36} h60" stroke="#8e3a28" stroke-width="3"/>`).join('')}</g>
        <path d="M80 340 L80 250 Q160 160 240 250 L240 340 Z" fill="#2b140c"/><ellipse cx="160" cy="318" rx="70" ry="34" fill="url(#fAtes)">${RM ? '' : '<animate attributeName="ry" values="34;40;31;38;34" dur="1.6s" repeatCount="indefinite"/>'}</ellipse>
        <rect x="104" y="318" width="112" height="16" rx="6" fill="#6e3b1e"/><text x="160" y="110" text-anchor="middle" class="ttkb" font-size="30" fill="#fff6dc">FIRIN</text></g>
      <g><rect x="620" y="50" width="230" height="200" rx="14" fill="#8a5a2b"/><rect x="634" y="64" width="202" height="172" rx="8" fill="#bfe6ff"/><path d="M634 190 h40 v-40 h30 v40 h40 v-60 h36 v60 h56 v46 h-202 Z" fill="#9ec6e0"/><line x1="735" y1="64" x2="735" y2="236" stroke="#8a5a2b" stroke-width="8"/><line x1="634" y1="150" x2="836" y2="150" stroke="#8a5a2b" stroke-width="8"/></g>
      <rect x="-3000" y="330" width="7200" height="16" fill="#9b6a3c"/><rect x="-3000" y="346" width="7200" height="1000" fill="url(#fMasa)"/>
      <rect x="22" y="600" width="480" height="16" rx="6" fill="#8b5a2b"/><text x="262" y="650" text-anchor="middle" class="ttkb" font-size="26" fill="#6e4421">Sırık rafı</text>
      <ellipse cx="690" cy="652" rx="158" ry="98" fill="#d9a56b" stroke="#8b5a2b" stroke-width="6"/><ellipse cx="690" cy="652" rx="140" ry="84" fill="#e8bd86"/><text x="690" y="540" text-anchor="middle" class="ttkb" font-size="26" fill="#6e4421">Tepsi</text>
      <rect x="840" y="360" width="340" height="385" rx="14" fill="#a8743f" stroke="#6e4421" stroke-width="5"/>${[0, 1, 2, 3].map(i => `<rect x="840" y="${398 + i * 90}" width="340" height="10" fill="#8b5a2b" opacity=".5"/>`).join('')}<text x="1010" y="395" text-anchor="middle" class="ttkb" font-size="26" fill="#fff6dc">Teslim kasası</text>`;
    function ciz(){
      let s = arka + `<g transform="translate(470 335)">${ayiUsta(ayiMood)}</g>`;
      // sipariş panosu ya da etiket
      s += `<g transform="translate(880 30)"><rect width="290" height="300" rx="14" fill="#c9965e" stroke="#8b5a2b" stroke-width="5"/><g transform="rotate(-2 145 150)"><rect x="20" y="22" width="250" height="262" rx="8" fill="#fffdf6"/><circle cx="145" cy="30" r="9" fill="#e03131"/>`;
      if (lvl === 1) s += `<text x="145" y="72" text-anchor="middle" class="ttkb" font-size="28">Kasa etiketi</text>
        ${[['onlar', 85, d1], ['birler', 205, d2]].map(([ad, x, v], i) => `<g transform="translate(${x} 100)"><g class="ok" data-d="${i}" data-y="1"><path d="M-30 18 L0 -6 L30 18 Z" fill="#3a86ff"/></g><rect x="-38" y="26" width="76" height="92" rx="10" fill="#fff" stroke="#1d4e89" stroke-width="4"/><text y="98" text-anchor="middle" class="ttkb" font-size="74">${v}</text><g class="ok" data-d="${i}" data-y="-1"><path d="M-30 126 L0 150 L30 126 Z" fill="#3a86ff"/></g><text y="180" text-anchor="middle" class="ttkb" font-size="22" fill="#5b6b7b">${ad}</text></g>`).join('')}`;
      else s += `<text x="145" y="72" text-anchor="middle" class="ttkb" font-size="26">Sipariş</text><text x="145" y="110" text-anchor="middle" class="ttkb" font-size="24" fill="#5b6b7b">${musteri}</text><text x="145" y="215" text-anchor="middle" class="ttkb" font-size="104" fill="#c0392b">${hedef}</text><text x="145" y="262" text-anchor="middle" class="ttkb" font-size="26">simit</text>`;
      s += `</g></g>`;
      s += `<g id="fDin"></g>`;
      sv.innerHTML = s;
      const dg = $('fDin'); let h = '';
      for (let i = 0; i < raf; i++) h += `<g class="rsirik" data-i="${i}" transform="translate(${60 + i * 58} 600)">${sirikSVG(10, lvl === 2)}</g>`;
      for (let j = 0; j < tepsi; j++) h += `<g class="tsimit" data-j="${j}" transform="translate(${610 + (j % 5) * 40} ${606 + Math.floor(j / 5) * 44})">${simitUst(18)}</g>`;
      for (let i = 0; i < kp; i++) h += `<g class="ksirik" data-i="${i}" transform="translate(${874 + i * 46} 612) scale(.92)">${sirikSVG(10)}</g>`;
      h += `<rect x="846" y="620" width="328" height="118" rx="10" fill="#8b5a2b"/>`;
      for (let j = 0; j < kt; j++) h += `<g class="ksimit" data-j="${j}" transform="translate(${872 + (j % 8) * 37} ${646 + Math.floor(j / 8) * 36})">${simitUst(15)}</g>`;
      if (lvl === 1 && kt >= 10) h += `<g class="bossirik" transform="translate(1150 612) scale(.92)"><rect x="-26" y="-250" width="52" height="250" fill="transparent"/><rect x="-4.5" y="-236" width="9" height="236" rx="4" fill="#8b5a2b" opacity=".85"/><rect x="-24" y="-8" width="48" height="12" rx="5" fill="#6e4421"/></g>`;
      dg.innerHTML = h;
      dg.querySelectorAll('.rsirik').forEach(g => { konum(g, +g.getAttribute('transform').match(/translate\(([\d.]+)/)[1], 600);
        const kn = g.querySelector('.dugum'); if (kn) kn.addEventListener('pointerdown', e => { e.stopPropagation(); if (KILIT || mesgul) return; coz(g); });
        surukle(g, { izin: () => !mesgul, dokun: () => { raf--; kp++; sPop(); ciz(); }, birak: (x, y) => { if (icinde(x, y, kasa)) { raf--; kp++; sPop(); ciz(); return true; } return false; } }); });
      dg.querySelectorAll('.tsimit').forEach(g => { const t = g.getAttribute('transform').match(/translate\(([\d.]+) ([\d.]+)/); konum(g, +t[1], +t[2]);
        surukle(g, { izin: () => !mesgul, dokun: () => { tepsi--; kt++; sTik(); ciz(); }, birak: (x, y) => { if (icinde(x, y, kasa)) { tepsi--; kt++; sTik(); ciz(); return true; } return false; } }); });
      if (lvl !== 1) {
        dg.querySelectorAll('.ksirik').forEach(g => g.addEventListener('click', () => { if (KILIT || mesgul) return; kp--; raf++; sPop(); ciz(); }));
        dg.querySelectorAll('.ksimit').forEach(g => g.addEventListener('click', () => { if (KILIT || mesgul) return; kt--; tepsi++; sTik(); ciz(); }));
      }
      const bs = dg.querySelector('.bossirik'); if (bs) bs.addEventListener('click', () => { if (KILIT || mesgul) return; if (kt >= 10) { kt -= 10; kp++; sOk(); speak('On simit bir sırık oldu.'); ciz(); } });
      sv.querySelectorAll('.ok').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const i = +g.dataset.d, y = +g.dataset.y; if (i === 0) d1 = (d1 + y + 10) % 10; else d2 = (d2 + y + 10) % 10; sTik(); ciz(); }));
    }
    function coz(g){ mesgul = true; tone(500, .1); tween(500, t => { g.setAttribute('transform', `translate(${g.dataset.x} ${600 + t * 30}) rotate(${t * 70})`); g.setAttribute('opacity', 1 - t); }, () => { raf--; tepsi += 10; mesgul = false; speak('Düğüm çözüldü. On simit tepsiye döküldü.'); ciz(); }); }
    function say(sonra){ mesgul = true; let i = 0; const top = kp * 10 + kt; const dg = $('fDin');
      const adim = () => { if (i < kp) { const x = 874 + i * 46; S(dg, `<g><circle cx="${x}" cy="350" r="22" fill="#12b886"/><text x="${x}" y="358" text-anchor="middle" font-size="20" font-weight="700" font-family="Andika" fill="#fff">${(i + 1) * 10}</text></g>`); tone(500 + i * 60, .1); i++; zaman(adim, 380); }
        else if (i < kp + kt) { const j = i - kp; const x = 872 + (j % 8) * 37, y = 646 + Math.floor(j / 8) * 36; S(dg, `<text x="${x}" y="${y + 6}" text-anchor="middle" font-size="15" font-weight="700" font-family="Andika" fill="#fff" stroke="#12805c" stroke-width="3" paint-order="stroke">${kp * 10 + j + 1}</text>`); sTik(); i++; zaman(adim, 200); }
        else { mesgul = false; sonra(top); } };
      adim(); }
    ciz();
    if (lvl === 0) setInstr(k === 0 ? `${musteri} ${hedef} simit istiyor. Dolu sırıkları ve tek simitleri teslim kasasına taşı. Hazır olunca Gönder'e bas.` : `${musteri} ${hedef} simit istiyor.`);
    else if (lvl === 2) setInstr(k === 0 ? `${musteri} ${hedef} simit istiyor. Tepside az simit var. Gerekirse kırmızı düğüme dokunup bir sırığı çöz.` : `${musteri} ${hedef} simit istiyor.`);
    else setInstr(k === 0 ? 'Kasada kaç simit var? Sırıkları ve tek simitleri say. Etikete onlar ve birler basamağını yaz.' : (kt >= 10 ? 'Kasada çok tek simit var. Onlarını sırığa dizebilirsin. Etiketi yaz.' : 'Kasadaki simitleri say ve etiketi yaz.'));
    eylem(lvl === 1 ? '<button class="cta" id="fGo">Etiketi yapıştır</button>' : '<button class="cta alt" id="fBos">Kasayı boşalt</button><button class="cta" id="fGo">Gönder 🚲</button>');
    if ($('fBos')) $('fBos').onclick = () => { if (KILIT || mesgul) return; raf += kp; tepsi += kt; kp = 0; kt = 0; ciz(); };
    $('fGo').onclick = () => { if (KILIT || mesgul) return;
      if (lvl === 1) { const v = d1 * 10 + d2;
        if (v === hedef) { ayiMood = 'mutlu'; ciz(); say(() => ctx.dogru(`Evet! Kasada ${sayiSoz(hedef)} simit var.`, `<b>${hedef}</b> = ${Math.floor(hedef / 10)} onluk ${hedef % 10} birlik<small>${kp} sırık ve ${kt} tane simit</small>`)); }
        else { ayiMood = 'uzgun'; ciz(); ctx.yanlis(kt >= 10 ? `Etikette ${v} yazıyor. Tek simitler ${kt} tane; bunların onu bir sırık eder. Boş sırığa dokun.` : `Etikette ${v} yazıyor. Kasada ${kp} sırık ve ${kt} tane simit var. Onlar basamağı sırıkları, birler basamağı tek simitleri gösterir.`); }
        return; }
      if (!kp && !kt) { FB('Kasa boş. Önce simitleri kasaya taşı.', false); return; }
      say(top => { if (top === hedef) { ayiMood = 'mutlu';
          ctx.dogru(`Tam ${sayiSoz(hedef)} simit! Sipariş yola çıktı.`, `<b>${hedef}</b> = ${kp} sırık + ${kt} simit<small>${kt < 10 ? `${kp} onluk ${kt} birlik` : `${kp * 10} + ${kt} = ${hedef}`}</small>`); }
        else { ayiMood = 'uzgun'; ciz(); const f = Math.abs(top - hedef); ctx.yanlis(`Kasada ${top} simit var. Sipariş ${hedef} simit. ${f} simit ${top < hedef ? 'eksik' : 'fazla'}.`); } }); };
    if (window.__TEST) window.__coz = () => { if (lvl === 1) { d1 = Math.floor(hedef / 10); d2 = hedef % 10; } else { const o = Math.floor(hedef / 10), b = hedef % 10; while (tepsi < b) { raf--; tepsi += 10; } raf -= o; tepsi -= b; kp = o; kt = b; } ciz(); $('fGo').click(); };
  },
};

/* ===================== 2) TELEFERİK: onluğa tamamlayarak toplama ve çıkarma ===================== */
const YOLCU = ['ayi', 'fil', 'fare', 'kedi', 'kopek', 'kuzu', 'inek', 'at', 'tilki', 'zebra', 'zurafa', 'maymun', 'kanguru', 'kurbaga', 'ordek', 'civciv', 'deve', 'papagan', 'sincap', 'kaplumbaga'];
function kabinSVG(dolu, renk){ const kn = renk === '#3a86ff' ? '#1d4e89' : '#7a1f1f'; let s = `<line x1="120" y1="-128" x2="120" y2="0" stroke="#4a5a50" stroke-width="7"/><rect x="0" y="0" width="240" height="152" rx="26" fill="${renk || '#e03131'}" stroke="${kn}" stroke-width="5"/><rect x="0" y="118" width="240" height="34" rx="12" fill="#000" opacity=".12"/>`;
  for (let i = 0; i < 10; i++) { const x = 12 + (i % 5) * 44, y = 12 + Math.floor(i / 5) * 66; s += `<rect x="${x}" y="${y}" width="40" height="58" rx="9" fill="#d8f0ff" stroke="${kn}" stroke-width="3"/>`;
    if (dolu[i]) s += `<g transform="translate(${x + 20} ${y + 32})">${resimDaire(dolu[i], 18, '#d8f0ff')}</g>`; }
  return s; }
YER.teleferik = {
  id: 'teleferik', ad: 'Teleferik', ders: 'Matematik', beceri: 'Onluğa tamamlayarak toplama ve çıkarma', ikon: '🚡', renk: '#e03131', harita: { x: 170, y: 330 },
  hikaye: 'Ladin Tepesi\'ne teleferikle çıkılır. Her kabinde 10 koltuk var. Kabin ancak dolunca kalkar. Yolcuları bindir, tepeye kaç yolcu çıktığını bul.',
  seviyeler: [['Kabini doldur', '20\'ye kadar toplama: önce kabini 10\'a tamamla.'], ['Kalabalık tepe', 'İki basamaklı sayıya ekleme: önce onluğa tamamla.'], ['Kafeterya molası', 'Çıkarma: önce yarım kabini boşalt, sonra dolu kabinden al.']],
  bina(){ return `${golge(0, 4, 80)}<line x1="0" y1="-120" x2="150" y2="-290" stroke="#4a5a50" stroke-width="4"/><g transform="translate(36 -194) scale(.32)">${kabinSVG(['kedi', 'ayi', 'fil'])}</g><rect x="-70" y="-100" width="140" height="100" fill="#f1e4cf" stroke="#8b5a2b" stroke-width="3"/><path d="M-84 -96 L0 -140 L84 -96 Z" fill="#e03131"/><circle cx="0" cy="-104" r="14" fill="#4a5a50"/><rect x="-24" y="-56" width="48" height="56" fill="#8a5a2b"/>`; },
  gorev(lvl, k, ctx){
    const kuyrukX = i => 800 - i * 66;
    let kabin = [], kuyruk = [], ust = 0, mesgul = false, soruAcik = false, a, b, ust0;
    let A = [], B = [], gitti = 0, c = 0, r = 0; const gidenler = [];
    if (lvl < 2) { a = rint(5, 9); b = rint(11 - a, 9); ust0 = lvl === 1 ? rint(2, 6) * 10 : 0; ust = ust0;
      const h = shuffle(YOLCU); kabin = h.slice(0, a); kuyruk = h.slice(a, a + b); }
    else { r = rint(2, 8); c = rint(r + 1, 9); const h = shuffle(YOLCU); A = h.slice(0, 10); B = h.slice(10, 10 + r); }
    const arka = `<defs><linearGradient id="tGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset="1" stop-color="#e6f6ff"/></linearGradient></defs>
      <rect x="-3000" y="-400" width="7200" height="1600" fill="url(#tGok)"/><circle cx="1060" cy="90" r="46" fill="#ffd23f"/>${bulut(380, 90, .8)}${bulut(760, 60, .6)}
      <path d="M-3000 380 L-100 150 L60 40 L300 260 L520 120 L760 330 L1000 200 L4200 420 L4200 1200 L-3000 1200 Z" fill="#a9c8de"/><path d="M60 40 L110 86 L80 80 L50 100 L20 76 Z M520 120 L560 156 L530 150 L500 166 Z" fill="#fff"/>
      <path d="M-3000 520 Q200 330 600 470 Q900 560 1800 450 L4200 450 L4200 1200 L-3000 1200 Z" fill="#7cc46a"/>${[[60, 460, .7], [150, 430, .6], [400, 470, .55], [660, 500, .5], [1150, 470, .6], [20, 560, .8]].map(([x, y, s]) => agac(x, y, s)).join('')}
      ${lvl < 2 ? `<line x1="1110" y1="283" x2="110" y2="110" stroke="#4a5a50" stroke-width="5"/><g transform="translate(110 110)"><rect x="-60" y="-40" width="120" height="70" fill="#f1e4cf" stroke="#8b5a2b" stroke-width="3"/><path d="M-72 -36 L0 -76 L72 -36 Z" fill="#e03131"/><circle r="14" fill="#4a5a50"/></g>
        <g id="tTepe" transform="translate(150 190)"></g><rect x="880" y="250" width="320" height="22" fill="#e03131"/><rect x="890" y="272" width="16" height="340" fill="#8b5a2b"/><rect x="1176" y="272" width="16" height="340" fill="#8b5a2b"/><circle cx="960" cy="257" r="16" fill="#4a5a50"/>` : ''}
      <rect x="-3000" y="610" width="7200" height="30" fill="#b9874f"/><rect x="-3000" y="640" width="7200" height="600" fill="#d9b07a"/>${Array.from({ length: 16 }, (_, i) => `<line x1="${i * 80}" y1="640" x2="${i * 80 - 40}" y2="760" stroke="#b9874f" stroke-width="3"/>`).join('')}
      ${lvl === 2 ? `<rect x="360" y="236" width="760" height="22" fill="#e03131"/><rect x="372" y="258" width="16" height="352" fill="#8b5a2b"/><rect x="1090" y="258" width="16" height="352" fill="#8b5a2b"/><text x="740" y="228" text-anchor="middle" class="ttkb" font-size="26">Alt istasyon</text><g transform="translate(40 400)"><rect width="250" height="210" fill="#fff6dc" stroke="#b07a3c" stroke-width="4"/><path d="M-14 4 L125 -60 L264 4 Z" fill="#f4a100"/><rect x="20" y="40" width="90" height="70" fill="#bfe6ff" stroke="#b07a3c" stroke-width="3"/><rect x="140" y="80" width="80" height="130" fill="#8a5a2b"/><text x="125" y="-10" text-anchor="middle" class="ttkb" font-size="28">Kafeterya</text><image href="${R('cay')}" x="30" y="125" width="70" height="70"/></g>` : ''}`;
    function tepeCiz(){ const t = $('tTepe'); if (!t) return; let h = '';
      if (lvl === 1) { const m = `Tepede ${ust0} yolcu vardı`, w = olc(m, 26) + 36; h += `<rect x="-100" y="-26" width="${w}" height="52" rx="12" fill="#fff" stroke="#e03131" stroke-width="4"/><text x="${w / 2 - 100}" y="10" text-anchor="middle" class="ttkb" font-size="26">${m}</text>`; }
      gidenler.forEach((d, i) => { h += `<g transform="translate(${-90 + i * 120} 46) scale(.44)">${kabinSVG(d)}</g>`; });
      t.innerHTML = h; }
    function ciz(){
      let s = arka;
      if (lvl < 2) { s += `<g id="tKabin" transform="translate(840 385)">${kabinSVG(kabin)}</g>`;
        s += kuyruk.map((y, i) => `<g class="yolcu" data-i="${i}" transform="translate(${kuyrukX(i)} 676)">${golge(0, 30, 26)}${resimDaire(y, 30, '#3a86ff')}</g>`).join(''); }
      else { s += `<g transform="translate(400 385)">${kabinSVG(A, '#e03131')}</g><g transform="translate(800 385)">${kabinSVG(B, '#3a86ff')}</g><text x="520" y="590" text-anchor="middle" class="ttkb" font-size="24">Kırmızı kabin</text><text x="920" y="590" text-anchor="middle" class="ttkb" font-size="24">Mavi kabin</text>
        <g transform="translate(1060 690)"><rect x="-120" y="-34" width="240" height="64" rx="14" fill="#fff" stroke="#f4a100" stroke-width="4"/><text y="10" text-anchor="middle" class="ttkb" font-size="26">Kafeteryaya: ${gitti} / ${c}</text></g>`;
        A.forEach((y, i) => { if (y) s += `<g class="koltuk" data-k="A" data-i="${i}" transform="translate(${400 + 32 + (i % 5) * 44} ${385 + 44 + Math.floor(i / 5) * 66})"><circle r="22" fill="transparent"/></g>`; });
        B.forEach((y, i) => { if (y) s += `<g class="koltuk" data-k="B" data-i="${i}" transform="translate(${800 + 32 + (i % 5) * 44} ${385 + 44 + Math.floor(i / 5) * 66})"><circle r="22" fill="transparent"/></g>`; }); }
      sv.innerHTML = s; tepeCiz();
      sv.querySelectorAll('.yolcu').forEach(g => { const i = +g.dataset.i; konum(g, kuyrukX(i), 676);
        surukle(g, { izin: () => !mesgul && !soruAcik, dokun: () => bin(i), birak: (x, y) => { if (icinde(x, y, [820, 360, 1100, 560])) { bin(i); return true; } return false; } }); });
      sv.querySelectorAll('.koltuk').forEach(g => g.addEventListener('click', () => { if (KILIT || mesgul || soruAcik) return; in_(g.dataset.k, +g.dataset.i); }));
    }
    function bin(i){ if (kabin.length >= 10 || mesgul) return; const n = kabin.length, ad = kuyruk.splice(i, 1)[0]; mesgul = true; ciz();
      const yg = S(sv, `<g pointer-events="none">${resimDaire(ad, 22, '#3a86ff')}</g>`); konum(yg, kuyrukX(i), 676);
      git(yg, 840 + 32 + (n % 5) * 44, 385 + 44 + Math.floor(n / 5) * 66, 260, () => { yg.remove(); mesgul = false; kabin.push(ad); sPop(); ciz(); if (kabin.length === 10) kalk(); else if (!kuyruk.length) kalk(); }); }
    function kalk(){ mesgul = true; const tam = kabin.length === 10; speak(tam ? 'Kabin doldu. Kalkıyor!' : 'Son kabin de kalkıyor.'); const g = $('tKabin');
      tween(1700, t => { const e = ease(t); g.setAttribute('transform', `translate(${840 - 720 * e} ${385 - 300 * e}) scale(${1 - .78 * e})`); }, () => {
        ust += kabin.length; gidenler.push(kabin); kabin = []; mesgul = false;
        if (kuyruk.length) { ciz(); const g2 = $('tKabin'); tween(700, t => g2.setAttribute('transform', `translate(${1300 - 460 * ease(t)} 385)`)); }
        else soru(); }); }
    function soru(){ soruAcik = true; ciz(); const top = ust0 + a + b;
      setInstr(lvl === 1 ? `Bütün yolcular tepeye çıktı. Tepede önceden ${ust0} yolcu vardı. Şimdi kaç yolcu var?` : 'Bütün yolcular tepeye çıktı. Tepeye kaç yolcu çıktı?');
      const se = shuffle([...new Set([top, top + 1, top - 1, top + 10, top - 10].filter(x => x > 0))]).slice(0, 3); if (!se.includes(top)) se[0] = top;
      eylem(shuffle(se).map(v => `<button class="cta sec" data-v="${v}">${v}</button>`).join(''));
      $('eylem').querySelectorAll('.sec').forEach(bt => bt.onclick = () => { if (KILIT) return;
        if (+bt.dataset.v === top) { const x = ust0 + a, cc = 10 - a, rr = b - cc;
          ctx.dogru(`Evet! Tepede ${sayiSoz(top)} yolcu var.`, lvl === 0 ? `${a} + ${b} = ${a} + ${cc} + ${rr} = 10 + ${rr} = <b>${top}</b><small>Önce kabini 10'a tamamladık.</small>` : `${x} + ${b} = ${x} + ${cc} + ${rr} = ${x + cc} + ${rr} = <b>${top}</b><small>Önce onluğa tamamladık.</small>`); }
        else { bt.disabled = true; ctx.yanlis(lvl === 1 ? `Tepede ${ust0} yolcu vardı. Tepeye çıkan kabinlere bak. Dolu kabin 10 yolcu taşır.` : 'Tepeye çıkan kabinlere bak. Dolu kabin 10 yolcu taşır.'); } }); }
    function in_(kb, i){ if (gitti >= c) { FB(`Kafeteryaya ${c} yolcu gidiyor. Daha fazlası gitmiyor.`, false); return; }
      const ad = (kb === 'A' ? A : B)[i]; (kb === 'A' ? A : B)[i] = null; gitti++; sPop(); ciz();
      const x0 = (kb === 'A' ? 400 : 800) + 32 + (i % 5) * 44, y0 = 385 + 44 + Math.floor(i / 5) * 66, yg = S(sv, `<g pointer-events="none">${resimDaire(ad, 22, '#f4a100')}</g>`); konum(yg, x0, y0); git(yg, 165, 590, 700, () => yg.remove());
      if (gitti === c) soru3(); }
    function soru3(){ soruAcik = true; const top = 10 + r - c; setInstr('Teleferikte kaç yolcu kaldı?');
      const se = shuffle([...new Set([top, top + 1, top + 2, Math.max(0, top - 1), top + 10])]).slice(0, 3); if (!se.includes(top)) se[0] = top;
      eylem(shuffle(se).map(v => `<button class="cta sec" data-v="${v}">${v}</button>`).join(''));
      $('eylem').querySelectorAll('.sec').forEach(bt => bt.onclick = () => { if (KILIT) return;
        if (+bt.dataset.v === top) ctx.dogru(`Evet! ${sayiSoz(top)} yolcu kaldı.`, `${10 + r} − ${c} = ${10 + r} − ${r} − ${c - r} = 10 − ${c - r} = <b>${top}</b><small>Önce mavi kabini boşalttık, sonra kırmızı kabinden aldık.</small>`);
        else { bt.disabled = true; ctx.yanlis('Kabinlerdeki yolcuları say.'); } }); }
    ciz();
    if (lvl === 0) setInstr(`Kabinde ${a} yolcu var. Durakta ${b} yolcu bekliyor. Teleferik dolunca kalkar. Yolcuları kabine bindir.`);
    else if (lvl === 1) setInstr(`Tepede ${ust0} yolcu var. Kabinde ${a} yolcu, durakta ${b} yolcu var. Yolcuları bindir.`);
    else setInstr(`İki kabin indi: kırmızı kabinde 10, mavi kabinde ${r} yolcu var. ${c} yolcu kafeteryaya gidecek. Gidecek yolculara dokun.`);
    if (window.__TEST) window.__coz = () => { const cevap = () => { const top = lvl < 2 ? ust0 + a + b : 10 + r - c; const bt = $('eylem').querySelector(`[data-v="${top}"]`); if (bt) bt.click(); };
      if (lvl < 2) { const adim = () => { if (soruAcik) return cevap(); if (!mesgul && kuyruk.length) bin(0); zaman(adim, 60); }; adim(); }
      else { for (let i = 0; i < r && gitti < c; i++) in_('B', i); for (let i = 0; gitti < c; i++) if (A[i]) in_('A', i); cevap(); } };
  },
};

/* ===================== 3) SAAT KULESİ: tam, yarım, çeyrek ===================== */
const GOK = { sabah: ['#9fd8ff', '#fff3d6', 180, 170, '#ffd23f'], ogle: ['#5cb8ff', '#dff2ff', 300, 80, '#ffe066'], aksam: ['#5b3c88', '#ff9a62', 1050, 250, '#ff7b39'], gece: ['#101b3f', '#2c3d72', 1050, 110, '#f8f3d4'] };
YER.saat = {
  id: 'saat', ad: 'Saat Kulesi', ders: 'Matematik', beceri: 'Tam, yarım ve çeyrek saatler', ikon: '🕰️', renk: '#3a86ff', harita: { x: 600, y: 480 },
  hikaye: 'Kasabanın saat kulesi ayarını kaçırdı. Saatçi Tıkır sana güveniyor. Yelkovanı çevir, saati ayarla, sonra çanı çal.',
  seviyeler: [['Tam saatler', 'Yelkovanı 12\'ye getir, akrebi doğru saate götür.'], ['Buçuklar', 'Yarım saatleri ayarla: yelkovan 6\'yı gösterir.'], ['Çeyrekler ve süreler', 'Çeyrek geçe, çeyrek kala ve yarım saat sonrası.']],
  bina(){ return `${golge(0, 4, 60)}<rect x="-38" y="-230" width="76" height="230" fill="#e8d3b0" stroke="#9c7b55" stroke-width="3"/><path d="M-50 -226 L0 -290 L50 -226 Z" fill="#3a86ff"/><circle cy="-180" r="28" fill="#fff" stroke="#1d4e89" stroke-width="4"/><line y1="-180" y2="-200" stroke="#1d4e89" stroke-width="4"/><line y1="-180" x2="14" y2="-180" stroke="#f2546b" stroke-width="4"/><rect x="-16" y="-50" width="32" height="50" rx="16" fill="#8a5a2b"/>`; },
  gorev(lvl, k, ctx){
    const L1 = [['sabah', 'Okul servisi', 'otobus', [7, 8], 'geliyor'], ['sabah', 'Kahvaltı', 'ekmek', [7, 8], 'hazır oluyor'], ['ogle', 'Öğle yemeği', 'tencere', [12, 1], 'başlıyor'], ['ogle', 'Futbol maçı', 'top', [2, 3, 4], 'başlıyor'], ['aksam', 'Doğum günü partisi', 'kek', [5, 6], 'başlıyor'], ['gece', 'Uyku vakti', 'yildiz', [9], 'geliyor'], ['sabah', 'Kütüphane', 'kitap', [9, 10], 'açılıyor'], ['aksam', 'Uçurtma şenliği', 'ucurtma', [4, 5], 'başlıyor']];
    const ifade = (h, m) => m === 0 ? `saat ${SAAT_DA[h % 12]}` : m === 30 ? `saat ${SAAT[h % 12]} buçukta` : m === 15 ? `${SAAT_I[h % 12]} çeyrek geçe` : `${SAAT_E[(h + 1) % 12]} çeyrek kala`;
    const ad = (h, m) => m === 0 ? `saat ${SAAT[h % 12]}` : m === 30 ? `saat ${SAAT[h % 12]} buçuk` : m === 15 ? `${SAAT_I[h % 12]} çeyrek geçiyor` : `${SAAT_E[(h + 1) % 12]} çeyrek var`;
    const [gok, olay, resim, saatler, fiil] = L1[(k * 3 + rint(0, 7)) % L1.length];
    let h = pick(saatler), m = lvl === 0 ? 0 : lvl === 1 ? 30 : pick([15, 45, 15, 45, 30]), cumle;
    if (lvl === 2 && k >= 4) { const h0 = rint(1, 10), ek = k === 4 ? 30 : 15; h = h0; m = ek; cumle = ek === 30 ? `Konser saat ${SAAT_DA[h0]} başladı. Yarım saat sürdü. Konserin bittiği saati ayarla.` : `Çay saat ${SAAT_DA[h0]} demlendi. Çeyrek saat sonra hazır oldu. Çayın hazır olduğu saati ayarla.`; }
    else cumle = `${olay} ${ifade(h, m)} ${fiil}. Saati ayarla.`;
    const hedef = (h % 12) * 60 + m;
    let T; do { T = rint(0, 143) * 5; } while (Math.abs(T - hedef) < 40);
    const [g1, g2, gx, gy, gr] = GOK[lvl === 2 && k >= 4 ? 'ogle' : gok];
    const cx = 600, cy = 290, RR = 128, gece = gok === 'gece';
    const arka = `<defs><linearGradient id="sGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g1}"/><stop offset="1" stop-color="${g2}"/></linearGradient></defs>
      <rect x="-3000" y="-400" width="7200" height="1600" fill="url(#sGok)"/>${gece ? Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 137) % 1300 - 50}" cy="${(i * 71) % 300}" r="${1 + i % 3}" fill="#fff" opacity=".8"/>`).join('') + `<circle cx="${gx}" cy="${gy}" r="38" fill="${gr}"/><circle cx="${gx + 16}" cy="${gy - 10}" r="32" fill="${g1}"/>` : `<circle cx="${gx}" cy="${gy}" r="46" fill="${gr}"/>${bulut(320, 120, .7)}${bulut(900, 90, .6)}`}
      ${[[0, 300, 200, '#f6a6a6'], [200, 360, 170, '#ffd59e'], [830, 330, 190, '#a8d8ea'], [1020, 290, 200, '#c3b1e1']].map(([x, y, w, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${760 - y}" fill="${c}" stroke="#8a6a4a" stroke-width="3"/><path d="M${x - 10} ${y + 4} L${x + w / 2} ${y - 60} L${x + w + 10} ${y + 4} Z" fill="#b5533c"/>${[0, 1, 2, 3].map(i => `<rect x="${x + 28 + (i % 2) * (w - 96)}" y="${y + 40 + Math.floor(i / 2) * 110}" width="40" height="56" rx="6" fill="${gece ? '#ffe066' : '#d8f0ff'}" stroke="#8a6a4a" stroke-width="3"/>`).join('')}`).join('')}
      <rect x="-3000" y="660" width="7200" height="600" fill="#cfc6b8"/>${Array.from({ length: 30 }, (_, i) => `<rect x="${(i % 15) * 84 - 20 + (Math.floor(i / 15)) * 42}" y="${672 + Math.floor(i / 15) * 40}" width="72" height="30" rx="8" fill="#bdb3a3"/>`).join('')}
      <rect x="460" y="150" width="280" height="610" fill="#e8d3b0" stroke="#9c7b55" stroke-width="5"/><path d="M440 154 L600 10 L760 154 Z" fill="#3a86ff" stroke="#1d4e89" stroke-width="4"/><rect x="545" y="60" width="110" height="90" rx="50" fill="#5b3c1e"/>
      <g id="can" transform="translate(600 72)"><path d="M-30 50 Q-30 0 0 0 Q30 0 30 50 Z" fill="#f4a100" stroke="#b45309" stroke-width="3"/><circle cy="54" r="7" fill="#b45309"/></g>
      <rect x="560" y="640" width="80" height="120" rx="40" fill="#8a5a2b"/>
      <circle cx="${cx}" cy="${cy}" r="${RR + 14}" fill="#c9a26b" stroke="#8a6a4a" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="${RR}" fill="#fffdf6" stroke="#1d4e89" stroke-width="5"/>
      ${Array.from({ length: 60 }, (_, i) => { const a = i * Math.PI / 30, r1 = i % 5 ? RR - 10 : RR - 18; return `<line x1="${cx + r1 * Math.sin(a)}" y1="${cy - r1 * Math.cos(a)}" x2="${cx + (RR - 4) * Math.sin(a)}" y2="${cy - (RR - 4) * Math.cos(a)}" stroke="#1d4e89" stroke-width="${i % 5 ? 2 : 4}"/>`; }).join('')}
      ${Array.from({ length: 12 }, (_, i) => { const a = (i + 1) * Math.PI / 6; return `<text x="${cx + (RR - 40) * Math.sin(a)}" y="${cy - (RR - 40) * Math.cos(a) + 11}" text-anchor="middle" font-size="30" font-family="Andika" font-weight="700" fill="#1f2a24">${i + 1}</text>`; }).join('')}
      <g transform="translate(40 380)"><rect width="300" height="250" rx="16" fill="#fffdf6" stroke="#8a6a4a" stroke-width="4"/><rect x="138" y="-30" width="24" height="40" fill="#8a6a4a"/><image href="${R(lvl === 2 && k >= 4 ? (k === 4 ? 'piyano' : 'cay') : resim)}" x="90" y="16" width="120" height="120"/><text x="150" y="176" text-anchor="middle" class="ttkb" font-size="26">${lvl === 2 && k >= 4 ? (k === 4 ? 'Konser' : 'Çay') : olay}</text><text x="150" y="218" text-anchor="middle" class="ttkb" font-size="${ad(h, m).length > 17 ? 23 : 28}" fill="#c0392b">${lvl === 2 && k >= 4 ? '?' : esc(BUYUK(ad(h, m)))}</text></g>
      <g transform="translate(1080 750)">${kaplumbaga()}</g>`;
    const cizIbre = () => { const am = (T % 60) * 6 * Math.PI / 180, ah = ((T % 720) / 2) * Math.PI / 180, g = $('ibre');
      g.innerHTML = `<line x1="${cx}" y1="${cy}" x2="${cx + 66 * Math.sin(ah)}" y2="${cy - 66 * Math.cos(ah)}" stroke="#f2546b" stroke-width="14" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${cx + 104 * Math.sin(am)}" y2="${cy - 104 * Math.cos(am)}" stroke="#3a86ff" stroke-width="8" stroke-linecap="round"/><circle cx="${cx + 104 * Math.sin(am)}" cy="${cy - 104 * Math.cos(am)}" r="14" fill="#3a86ff" stroke="#fff" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="11" fill="#1f2a24"/>`; };
    sv.innerHTML = arka + `<g id="ibre"></g><circle id="kadran" cx="${cx}" cy="${cy}" r="${RR + 20}" fill="transparent" style="cursor:grab"/><g id="dijital"></g>`;
    cizIbre();
    const kad = $('kadran'); let suruyor = false, a0 = 0;
    const aci = p => Math.atan2(p.x - cx, -(p.y - cy)) * 180 / Math.PI;
    kad.addEventListener('pointerdown', e => { if (KILIT) return; e.preventDefault(); suruyor = true; a0 = aci(nokta(e)); try { kad.setPointerCapture(e.pointerId); } catch(_){} });
    kad.addEventListener('pointermove', e => { if (!suruyor) return; const a = aci(nokta(e)); let d = a - a0; if (d > 180) d -= 360; if (d < -180) d += 360; a0 = a; const eski = Math.floor(T / 5); T = (T + d / 6 + 720) % 720; if (Math.floor(T / 5) !== eski) sTik(); cizIbre(); });
    const birak = () => { if (!suruyor) return; suruyor = false; T = (Math.round(T / 5) * 5) % 720; cizIbre(); };
    kad.addEventListener('pointerup', birak); kad.addEventListener('pointercancel', birak);
    setInstr(k === 0 ? `${cumle} Mavi uzun yelkovanı parmağınla çevir. Kırmızı kısa akrep de onunla döner. Hazır olunca çanı çal.` : cumle);
    let hataSay = 0;
    eylem('<button class="cta" id="sCan">Çanı çal 🔔</button>');
    $('sCan').onclick = () => { if (KILIT) return; const t = Math.round(T) % 720;
      if (t === hedef) { const g = $('can'); tween(1800, x => g.setAttribute('transform', `translate(600 72) rotate(${Math.sin(x * Math.PI * 6) * 22 * (1 - x)})`)); sCan(m === 0 ? Math.min(h % 12 || 12, 4) : 1);
        $('dijital').innerHTML = `<g transform="translate(${cx} 470)"><rect x="-90" y="-36" width="180" height="62" rx="12" fill="#1f2a24"/><text y="12" text-anchor="middle" font-family="Andika" font-weight="700" font-size="38" fill="#7CFC9A">${h % 12 || 12}.${String(m).padStart(2, '0')}</text></g>`;
        ctx.dogru(`Doğru! Saat ${ad(h, m).replace('saat ', '')}.`, `<b>${h % 12 || 12}.${String(m).padStart(2, '0')}</b><small>${ad(h, m)}</small>`, 2600, 'sag'); return; }
      hataSay++; const dk = t % 60, sa = Math.floor(t / 60);
      if (dk !== m) ctx.yanlis(m === 0 ? 'Tam saatte yelkovan 12\'yi gösterir.' : m === 30 ? 'Buçukta yelkovan 6\'yı gösterir.' : m === 15 ? 'Çeyrek geçede yelkovan 3\'ü gösterir.' : 'Çeyrek kalada yelkovan 9\'u gösterir.');
      else ctx.yanlis(hataSay > 1 ? `Yelkovan doğru. Akrep ${m === 0 ? `tam ${h % 12 || 12} rakamını` : m === 30 ? `${h % 12 || 12} ile ${(h % 12) + 1} arasını` : m === 15 ? `${h % 12 || 12} rakamını biraz geçmiş` : `${(h % 12) + 1} rakamına yaklaşmış`} göstermeli. Yelkovanı bir tur çevirirsen akrep bir saat ilerler.` : 'Yelkovan doğru yerde. Şimdi kısa akrebe bak. Yelkovanı tam bir tur çevir, akrep bir saat ilerlesin.');
      void sa; };
    if (window.__TEST) window.__coz = () => { T = hedef; cizIbre(); $('sCan').click(); };
  },
};

/* ===================== 4) POSTANE: cümle kurma, büyük harf, noktalama ===================== */
// w: sözcükler doğru sırayla (özel adlar büyük harfle yazılır; Seviye 3'te pulda küçük görünür), s: cümle sonu işareti, r: kartpostal resmi, b: durum, alt: başka doğru sıralar
const KART = [
  [{ w: ['kedi', 'süt', 'içti'], s: '.', r: 'kedi' }, { w: ['annem', 'kek', 'yaptı'], s: '.', r: 'kek' }, { w: ['kuşlar', 'ağaçta', 'ötüyor'], s: '.', r: 'kus' }, { w: ['kardeşim', 'balon', 'aldı'], s: '.', r: 'balon' }, { w: ['ben', 'kitap', 'okuyorum'], s: '.', r: 'kitap' }, { w: ['babam', 'çay', 'demledi'], s: '.', r: 'cay' }, { w: ['bugün', 'yağmur', 'yağıyor'], s: '.', r: 'yagmur', alt: [['yağmur', 'bugün', 'yağıyor']] }, { w: ['köpek', 'topu', 'getirdi'], s: '.', r: 'kopek' }, { w: ['dedem', 'bahçeye', 'fidan', 'dikti'], s: '.', r: 'agac', alt: [['dedem', 'fidan', 'bahçeye', 'dikti']] }, { w: ['ninem', 'reçel', 'kaynattı'], s: '.', r: 'recel' }],
  [{ w: ['bu', 'şemsiye', 'senin', 'mi'], s: '?', r: 'semsiye', b: 'Ela arkadaşına soruyor.' }, { w: ['yaşasın,', 'kar', 'yağdı'], s: '!', r: 'kar', b: 'Can pencereden bakıp sevinçle bağırıyor.' }, { w: ['pastayı', 'kim', 'yedi'], s: '?', r: 'kek', b: 'Annem tabağı boş görünce soruyor.', alt: [['kim', 'pastayı', 'yedi']] }, { w: ['eyvah,', 'süt', 'taştı'], s: '!', r: 'sut', b: 'Babam ocağa koşarken telaşlanıyor.' }, { w: ['yarın', 'parka', 'gelecek', 'misin'], s: '?', r: 'top', b: 'Mert arkadaşına soruyor.', alt: [['parka', 'yarın', 'gelecek', 'misin']] }, { w: ['aman,', 'arı', 'geliyor'], s: '!', r: 'ari', b: 'Zeynep korkuyla bağırıyor.' }, { w: ['saat', 'kaç'], s: '?', r: 'saat', b: 'Dedem merak ediyor.' }, { w: ['denizde', 'bir', 'gemi', 'var'], s: '.', r: 'gemi', b: 'Ece gördüğünü anlatıyor.' }, { w: ['vay,', 'uçurtman', 'çok', 'yüksekte'], s: '!', r: 'ucurtma', b: 'Ali hayranlıkla bakıyor.' }, { w: ['dondurmam', 'eriyor'], s: '.', r: 'dondurma', b: 'Defne sakin sakin anlatıyor.' }],
  [{ w: ['dedem', 'bana', 'bir', 'masal', 'anlattı'], s: '.', r: 'kitap', alt: [['dedem', 'bir', 'masal', 'bana', 'anlattı']] }, { w: ['kedimin', 'adı', 'Pamuk'], s: '.', r: 'kedi' }, { w: ['Ece', 'hafta', 'sonu', 'teyzesine', 'gidecek', 'mi'], s: '?', r: 'otobus', b: 'Bir arkadaşı merak ediyor.' }, { w: ['Elif', 've', 'Can', 'parka', 'gitti'], s: '.', r: 'top', alt: [['Can', 've', 'Elif', 'parka', 'gitti']] }, { w: ['bahçedeki', 'domatesler', 'kızardı', 'mı'], s: '?', r: 'domates', b: 'Nine torununa soruyor.' }, { w: ['Ali', 'parkta', 'uçurtma', 'uçurdu'], s: '.', r: 'ucurtma', alt: [['parkta', 'Ali', 'uçurtma', 'uçurdu']] }, { w: ['Antalya', 'yazın', 'çok', 'sıcak', 'olur'], s: '.', r: 'gunes', alt: [['yazın', 'Antalya', 'çok', 'sıcak', 'olur']] }, { w: ['köpeğimizin', 'adı', 'Karabaş'], s: '.', r: 'kopek' }, { w: ['eyvah,', 'otobüs', 'kaçıyor'], s: '!', r: 'otobus', b: 'Babam durağa koşuyor.' }, { w: ['Zeynep', 'yarın', 'Bursa', 'yolculuğuna', 'çıkacak'], s: '.', r: 'valiz', alt: [['yarın', 'Zeynep', 'Bursa', 'yolculuğuna', 'çıkacak']] }]];
const ISARET = { '.': 'nokta', '?': 'soru işareti', '!': 'ünlem' };
const KUCUK = s => s.toLocaleLowerCase('tr');
YER.postane = {
  id: 'postane', ad: 'Postane', ders: 'Türkçe', beceri: 'Cümle kurma, büyük harf, noktalama', ikon: '✉️', renk: '#1d4e89', harita: { x: 1000, y: 380 },
  hikaye: 'Postacı Güvercin kartpostalları dağıtacak ama sözcük pulları karışmış. Cümleleri kur, büyük harfleri düzelt, sonuna doğru işaretin mührünü bas.',
  seviyeler: [['Kartpostal yaz', 'Kısa cümleler kur, nokta koy.'], ['Ne hissediyor?', 'Soru mu, sevinç mi, bilgi mi? Doğru işareti seç.'], ['Uzun mektuplar', 'Uzun cümleler ve özel adlar.']],
  bina(){ return `${golge(0, 4, 80)}<rect x="-76" y="-110" width="152" height="110" fill="#d8e6f7" stroke="#1d4e89" stroke-width="3"/><path d="M-88 -106 L0 -150 L88 -106 Z" fill="#1d4e89"/><rect x="-50" y="-84" width="60" height="40" fill="#fff" stroke="#1d4e89" stroke-width="3"/><path d="M-50 -84 L-20 -62 L10 -84" fill="none" stroke="#1d4e89" stroke-width="3"/><rect x="24" y="-70" width="34" height="70" fill="#8a5a2b"/><rect x="-74" y="-30" width="30" height="30" rx="4" fill="#f4a100"/>`; },
  gorev(lvl, k, ctx){
    const P = YER.postane; if (k === 0 || P._lvl !== lvl) { P._l = shuffle(KART[lvl]); P._lvl = lvl; }
    const C = P._l[k % P._l.length];
    const ozel = C.w.map((w, i) => i > 0 && w !== KUCUK(w)); // cümle içindeki özel adlar
    const gerek = C.w.map((w, i) => i === 0 || ozel[i]);
    const pullar = shuffle(C.w.map((w, i) => ({ w: lvl === 2 ? KUCUK(w) : w, o: w, i, k: false })));
    // pul yerleşimi: ölçülen genişlikle iki satıra
    let px = 60, py = 620; pullar.forEach(p => { p.en = Math.max(120, olc(p.w, 32) + 40); if (px + p.en > 980) { px = 160; py += 92; } p.x = px + p.en / 2; p.y = py; px += p.en + 20; });
    let dizi = [], buyuk = new Set(), isaret = null, adim = 'dizi', mood = 'mutlu';
    const dogruSira = [C.w, ...(C.alt || [])].map(d => d.map(KUCUK).join(' '));
    const yazim = j => { const p = pullar[dizi[j]]; return buyuk.has(j) ? (j === 0 ? BUYUK(p.o) : p.o) : p.w; };
    const cumleMetni = () => dizi.map((_, j) => yazim(j)).join(' ') + (isaret || '');
    const arka = () => `<rect x="-3000" y="-400" width="7200" height="1600" fill="#e6eef8"/><rect x="-3000" y="0" width="7200" height="140" fill="#cfdcee"/>${Array.from({ length: 24 }, (_, i) => `<rect x="${20 + (i % 12) * 98}" y="${14 + Math.floor(i / 12) * 60}" width="86" height="50" rx="4" fill="#fff" stroke="#9fb3cf" stroke-width="2"/><rect x="${36 + (i % 12) * 98}" y="${28 + Math.floor(i / 12) * 60}" width="${30 + (i * 13) % 30}" height="${14 + (i * 7) % 16}" fill="${['#ffe8a3', '#ffd0d6', '#cdeccd', '#d8e6f7'][i % 4]}"/>`).join('')}
      <rect x="-3000" y="560" width="7200" height="26" fill="#8a5a2b"/><rect x="-3000" y="586" width="7200" height="700" fill="#b9874f"/>
      <g transform="translate(240 170)"><rect x="6" y="8" width="720" height="350" rx="10" fill="#000" opacity=".12"/><rect width="720" height="350" rx="10" fill="#fffdf6" stroke="#c9b48c" stroke-width="3"/><rect x="10" y="10" width="290" height="330" rx="6" fill="#eaf4ff"/><image href="${R(C.r)}" x="40" y="50" width="230" height="230"/><line x1="320" y1="20" x2="320" y2="330" stroke="#c9b48c" stroke-width="2"/>
        ${[122, 202, 282].map(y => `<line x1="340" y1="${y}" x2="700" y2="${y}" stroke="#c9b48c" stroke-width="2" stroke-dasharray="6 6"/>`).join('')}<g transform="translate(650 55)"><rect x="-40" y="-35" width="80" height="70" rx="4" fill="#fff" stroke="#f2546b" stroke-width="3" stroke-dasharray="5 4"/>${agac(0, 22, .38)}</g></g>
      ${C.b ? `<g transform="translate(600 146)"><rect x="${-olc(C.b, 22) / 2 - 24}" y="-22" width="${olc(C.b, 22) + 48}" height="40" rx="12" fill="#fff6dc" stroke="#f4a100" stroke-width="3"/><text y="6" text-anchor="middle" class="ttkb" font-size="22">${esc(C.b)}</text></g>` : ''}`;
    function ciz(){
      let s = arka() + `<g id="guv" transform="translate(1090 545)">${guvercin(mood)}</g>`;
      let x = 345, y = 112; const yaz = [];
      dizi.forEach((_, j) => { const ww = yazim(j), en = olc(ww, 36) + 16; if (x + en > 706) { x = 345; y += 80; } yaz.push([ww, x, y, j, en]); x += en; });
      s += `<g transform="translate(240 170)">${yaz.map(([w, x, y, j, en]) => { const isa = adim === 'buyuk' && gerek[j] && !buyuk.has(j);
        return `<g class="yazili" data-j="${j}"><rect x="${x - 6}" y="${y - 40}" width="${en}" height="52" rx="8" fill="${buyuk.has(j) ? '#e6faf2' : 'transparent'}"/><text x="${x}" y="${y}" class="ttkb" font-size="36" fill="#1d4e89">${esc(w)}</text>${isa && lvl < 2 ? `<circle cx="${x + 10}" cy="${y - 14}" r="26" fill="none" stroke="#f4a100" stroke-width="4" stroke-dasharray="6 4">${RM ? '' : '<animate attributeName="r" values="24;30;24" dur="1.2s" repeatCount="indefinite"/>'}</circle>` : ''}</g>`; }).join('')}${isaret ? `<text x="${x - 10}" y="${y}" class="ttkb" font-size="44" fill="#c0392b">${isaret}</text>` : ''}</g>`;
      s += pullar.map((p, j) => p.k ? '' : `<g class="pul" data-j="${j}" transform="translate(${p.x} ${p.y})"><g transform="rotate(${(j % 3 - 1) * 3})"><rect x="${-p.en / 2}" y="-36" width="${p.en}" height="72" rx="4" fill="#fff" stroke="#f2546b" stroke-width="3" stroke-dasharray="4 3"/><rect x="${-p.en / 2 + 8}" y="-28" width="${p.en - 16}" height="56" rx="2" fill="${['#fff6dc', '#e6faf2', '#eaf3ff', '#f4edff'][j % 4]}"/><text y="11" text-anchor="middle" class="ttkb" font-size="32">${esc(p.w)}</text></g></g>`).join('');
      sv.innerHTML = s;
      sv.querySelectorAll('.pul').forEach(g => { const j = +g.dataset.j; konum(g, pullar[j].x, pullar[j].y);
        surukle(g, { izin: () => adim === 'dizi', dokun: () => koy(j), birak: (x, y) => { if (icinde(x, y, [240, 170, 960, 520])) { koy(j); return true; } return false; } }); });
      sv.querySelectorAll('.yazili').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const j = +g.dataset.j;
        if (adim === 'dizi') { const pj = dizi.splice(j, 1)[0]; pullar[pj].k = false; sTik(); ciz(); return; }
        if (adim === 'buyuk') { if (buyuk.has(j)) return;
          if (gerek[j]) { buyuk.add(j); sOk(); ciz(); if ([...gerek.keys()].every(i => !gerek[i] || buyuk.has(i))) { adim = 'isaret'; ciz(); isaretSor(); } }
          else ctx.yanlis(lvl === 2 ? 'Bu sözcük cümlenin başında değil, bir kişinin, hayvanın ya da yerin adı da değil. Küçük harfle başlar.' : 'Cümlenin başındaki sözcüğü bul.'); } }));
    }
    function koy(j){ const p = pullar[j]; if (p.k) return; p.k = true; dizi.push(j); sPop(); ciz(); if (dizi.length === C.w.length) zaman(kontrol, 250); }
    function kontrol(){ const ok = dogruSira.includes(dizi.map(j => KUCUK(pullar[j].o)).join(' '));
      if (!ok) { mood = 'uzgun'; ciz(); sBad(); speak(cumleMetni()); afterSay(() => ctx.yanlis('Bu cümle anlamlı mı? Kartın resmine bak. Yanlış yerdeki sözcüğe dokunup geri al.'), 200); return; }
      mood = 'mutlu'; adim = 'buyuk';
      if (C.w.some((_, i) => gerek[i] && pullar[dizi[i]].w !== (i === 0 ? BUYUK(C.w[i]) : C.w[i]))) { ciz(); setInstr(lvl === 2 ? 'Sözcükler doğru sırada. Şimdi büyük harfle başlaması gereken sözcüklere dokun.' : 'Sözcükler doğru sırada. Cümlenin ilk harfi nasıl yazılır? İlk sözcüğe dokun.'); }
      else { gerek.forEach((g, i) => g && buyuk.add(i)); adim = 'isaret'; ciz(); isaretSor(); } }
    function isaretSor(){ setInstr(lvl === 1 ? 'Kartın üstündeki cümleye bak. Bu cümle soru mu soruyor, sevinç ya da korku mu anlatıyor, yoksa bilgi mi veriyor? Doğru mührü bas.' : 'Cümlenin sonuna hangi işaret gelir? Doğru mührü bas.');
      eylem(Object.entries(ISARET).map(([m, a]) => `<button class="cta muhur-b" data-m="${m}"><b>${m}</b> ${a}</button>`).join(''));
      $('eylem').querySelectorAll('.muhur-b').forEach(b => b.onclick = () => { if (KILIT || adim !== 'isaret') return; const m = b.dataset.m; isaret = m; adim = 'bekle'; ciz(); speak(cumleMetni());
        if (m === C.s) { KILIT = true; afterSay(() => { const g = $('guv'); if (g) { konum(g, 1090, 545); git(g, 1500, 300, 900); }
            ctx.dogru(null, `${esc(cumleMetni())}<small>${C.s === '.' ? 'Bilgi veren cümlenin sonuna nokta konur.' : C.s === '?' ? 'Soru soran cümlenin sonuna soru işareti konur.' : 'Sevinç, korku, şaşkınlık anlatan cümlenin sonuna ünlem konur.'}</small>`, 2400); }, 300); }
        else afterSay(() => { isaret = null; adim = 'isaret'; mood = 'uzgun'; ciz(); ctx.yanlis(C.s === '?' ? 'Bu cümle bir şey soruyor. Soru soran cümlenin sonuna ne konur?' : C.s === '!' ? 'Bu cümlede güçlü bir duygu var. Sevinç ya da korku anlatan cümlenin sonuna ne konur?' : 'Bu cümle bir bilgi veriyor. Bilgi veren cümlenin sonuna ne konur?'); }, 300); }); }
    ciz();
    setInstr(k === 0 ? 'Sözcük pullarına doğru sırayla dokun ya da onları kartpostala sürükle. Kartın resmine bak, anlamlı bir cümle kur.' : 'Sözcük pullarıyla resme uygun cümleyi kur.');
    if (window.__TEST) window.__coz = () => { dizi = []; pullar.forEach(p => p.k = false); C.w.forEach(w => { const j = pullar.findIndex(p => !p.k && p.o === w); pullar[j].k = true; dizi.push(j); }); kontrol(); if (adim === 'buyuk') { gerek.forEach((g, i) => g && buyuk.add(i)); adim = 'isaret'; ciz(); isaretSor(); } zaman(() => $('eylem').querySelector(`[data-m="${C.s}"]`).click(), 50); };
  },
};

/* ===================== 5) KÜTÜPHANE: alfabetik sıra ve sözlük ===================== */
const ALF = 'abcçdefgğhıijklmnoöprsştuüvyz';
const alfKarsi = (a, b) => { for (let i = 0; i < Math.min(a.length, b.length); i++) { const d = ALF.indexOf(a[i]) - ALF.indexOf(b[i]); if (d) return d; } return a.length - b.length; };
// [resim, yazılış]
const KITAPLAR = ('agac:ağaç anahtar araba ari:arı armut ayakkabi:ayakkabı ayi:ayı ayna balik:balık balon bardak bebek borek:börek boru bulut cadir:çadır cami canta:çanta catal:çatal cay:çay ceket ceviz cicek:çiçek cilek:çilek civciv corap:çorap cuzdan:cüzdan dag:dağ davul deve domates dondurma ekmek eldiven elma etek ev fare fener fil fincan garaj gazete gemi gitar gozluk:gözlük gul:gül gunes:güneş havuc:havuç hediye helikopter horoz igne:iğne ilac:ilaç incir inek irmak:ırmak ispanak istakoz izgara:ızgara jeton jole:jöle kale kalem kanguru kapi:kapı kar kasik:kaşık kazak kedi kek kitap komur:kömür kopek:köpek kopru:köprü kova kulak kurbaga:kurbağa kurek:kürek kus:kuş kutu kuzu lale lamba leylek limon lokum makas mandalina mantar masa maymun mum muz nal nane nar nota ocak odul:ödül oklava olta ordek:ördek orumcek:örümcek otobus:otobüs palyaco:palyaço papagan:papağan patates pencere piyano plaj radyo recel:reçel robot roket saat sabun salyangoz sapka:şapka seker:şeker semsiye:şemsiye sepet simit sincap sise:şişe sut:süt tarak tavuk telefon tencere tilki top ucak:uçak ucurtma:uçurtma un utu:ütü uzum:üzüm valiz vapur vazo visne:vişne yagmur:yağmur yaprak yilan:yılan yildiz:yıldız yogurt:yoğurt yumurta zebra zeytin zil zurafa:zürafa').split(' ').map(x => { const [a, b] = x.split(':'); return [a, b || a]; });
YER.kutuphane = {
  id: 'kutuphane', ad: 'Kütüphane', ders: 'Türkçe', beceri: 'Alfabetik sıra ve sözlük kullanma', ikon: '📚', renk: '#8b5cf6', harita: { x: 1040, y: 620 },
  hikaye: 'Baykuş Bilge yeni kitaplar getirdi. Kitaplar rafa alfabetik sırayla dizilir. Raflara yerleştirmesine, sonra sözlükte sözcük bulmasına yardım et.',
  seviyeler: [['İlk harfe bak', 'Kitapları ilk harflerine göre sırala.'], ['İkinci harfe bak', 'İlk harfler aynıysa ikinci harfe bakılır.'], ['Sözlük avı', 'Sözcük sözlüğün hangi sayfasında?']],
  bina(){ return `${golge(0, 4, 90)}<rect x="-86" y="-110" width="172" height="110" fill="#efe6fb" stroke="#6d28d9" stroke-width="3"/><path d="M-100 -106 L0 -156 L100 -106 Z" fill="#8b5cf6"/>${[-60, -30, 0, 30, 60].map(x => `<rect x="${x - 6}" y="-100" width="12" height="100" fill="#fff" stroke="#6d28d9" stroke-width="2"/>`).join('')}<rect x="-20" y="-60" width="40" height="60" fill="#5b3c1e"/><g transform="translate(0 -128)"><rect x="-22" y="-10" width="44" height="20" fill="#fff" stroke="#6d28d9" stroke-width="2"/><line y1="-10" y2="10" stroke="#6d28d9" stroke-width="2"/></g>`; },
  gorev(lvl, k, ctx){
    const kitapRenk = ['#e03131', '#3a86ff', '#12b886', '#f4a100', '#8b5cf6', '#f2546b'];
    const kitapSVG = (ad, w, j) => `<rect x="-58" y="-80" width="116" height="160" rx="8" fill="${kitapRenk[j % 6]}" stroke="#2a1a10" stroke-width="3"/><rect x="-50" y="-80" width="8" height="160" fill="#000" opacity=".15"/><rect x="-40" y="-70" width="90" height="90" rx="10" fill="#fff"/><image href="${R(ad)}" x="-38" y="-68" width="86" height="86"/><rect x="-46" y="30" width="98" height="40" rx="8" fill="#fff"/><text x="3" y="60" text-anchor="middle" class="ttkb" font-size="${Math.min(28, Math.floor(28 * 88 / olc(w, 28)))}">${w}</text>`;
    let mood = 'mutlu';
    const arka = () => `<rect x="-3000" y="-400" width="7200" height="1600" fill="#6e4a2e"/><rect x="-3000" y="80" width="7200" height="560" fill="#8a5d3b"/>${Array.from({ length: 3 }, (_, r) => `<rect x="-3000" y="${200 + r * 150}" width="7200" height="14" fill="#5b3c1e"/>${Array.from({ length: 40 }, (_, i) => `<rect x="${-40 + i * 34}" y="${200 + r * 150 - 100 + (i * 7) % 22}" width="${22 + (i * 5) % 12}" height="${100 - (i * 7) % 22}" fill="${['#c0392b', '#2980b9', '#27ae60', '#f39c12', '#8e44ad', '#d35400'][(i + r) % 6]}" opacity=".35"/>`).join('')}`).join('')}
      <rect x="-3000" y="640" width="7200" height="600" fill="#a0522d"/><ellipse cx="600" cy="720" rx="460" ry="60" fill="#c0392b" opacity=".5"/>
      <rect x="-3000" y="0" width="7200" height="78" fill="#5b3c1e"/><g>${ALF.split('').map((h, i) => `<g class="harf" data-h="${h}" transform="translate(${24 + i * 40.5} 18)"><rect width="36" height="44" rx="6" fill="#fffdf6" stroke="#3b2414" stroke-width="2"/><text x="18" y="33" text-anchor="middle" class="ttkb" font-size="28">${h}</text></g>`).join('')}</g>
      <g transform="translate(1110 640)">${baykus(mood)}</g>`;
    if (lvl < 2) {
      let liste;
      if (lvl === 0) { const harfler = new Set(); liste = shuffle(KITAPLAR).filter(([, w]) => harfler.has(w[0]) ? false : (harfler.add(w[0]), true)).slice(0, k < 3 ? 4 : 5); }
      else { // aynı ilk harf, ikinci harfleri farklı (üçüncü harfe gerek kalmasın)
        const gr = {}; shuffle(KITAPLAR).forEach(x => { const w = x[1]; gr[w[0]] = gr[w[0]] || {}; if (!gr[w[0]][w[1]]) gr[w[0]][w[1]] = x; });
        const n = k < 3 ? 3 : 4, G = Object.values(gr).map(o => Object.values(o)).filter(g => g.length >= n);
        liste = shuffle(pick(G)).slice(0, n);
        if (k >= 2 && n < 5) { const h0 = liste[0][1][0]; liste.push(pick(KITAPLAR.filter(x => x[1][0] !== h0))); } }
      const n = liste.length, raf = liste.map(() => null), sira = [...liste].sort((a, b) => alfKarsi(a[1], b[1]));
      const slotX = i => 600 - (n - 1) * 65 + i * 130, slotY = 380, arabaX = j => 600 - (n - 1) * 70 + j * 140, arabaY = 590;
      const yerde = liste.map(() => null); // her kitabın raftaki yeri (null: arabada)
      function ciz(){
        let s = arka() + `<rect x="${slotX(0) - 90}" y="${slotY - 132}" width="${(n - 1) * 130 + 180}" height="236" rx="10" fill="#e9c891" stroke="#5b3c1e" stroke-width="5"/><rect x="${slotX(0) - 96}" y="${slotY + 84}" width="${(n - 1) * 130 + 192}" height="20" rx="4" fill="#5b3c1e"/>` + raf.map((_, i) => `<g transform="translate(${slotX(i)} ${slotY})"><rect x="-60" y="-82" width="120" height="164" rx="8" fill="#d2ad72" stroke="#8a5d3b" stroke-width="3" stroke-dasharray="8 6"/><circle cy="-104" r="17" fill="#fffdf6"/><text y="-94" text-anchor="middle" class="ttkb" font-size="26" fill="#5b3c1e">${i + 1}</text></g>`).join('');
        s += `<rect x="${arabaX(0) - 90}" y="${arabaY + 80}" width="${(n - 1) * 140 + 180}" height="22" rx="8" fill="#5b3c1e"/><circle cx="${arabaX(0) - 60}" cy="${arabaY + 116}" r="14" fill="#2a1a10"/><circle cx="${arabaX(n - 1) + 60}" cy="${arabaY + 116}" r="14" fill="#2a1a10"/>`;
        s += liste.map(([ad, w], j) => { const [x, y] = yerde[j] != null ? [slotX(yerde[j]), slotY] : [arabaX(j), arabaY]; return `<g class="kitap" data-j="${j}" transform="translate(${x} ${y})">${kitapSVG(ad, w, j)}</g>`; }).join('');
        sv.innerHTML = s;
        sv.querySelectorAll('.kitap').forEach(g => { const j = +g.dataset.j; const [x, y] = yerde[j] != null ? [slotX(yerde[j]), slotY] : [arabaX(j), arabaY]; konum(g, x, y);
          const isik = on => { sv.querySelectorAll('.harf').forEach(h => h.querySelector('rect').setAttribute('fill', on && (h.dataset.h === liste[j][1][0] || (lvl === 1 && h.dataset.h === liste[j][1][1])) ? '#ffe066' : '#fffdf6')); };
          surukle(g, { izin: () => true, basla: () => isik(true), dokun: () => { isik(false); if (yerde[j] != null) { raf[yerde[j]] = null; yerde[j] = null; sTik(); ciz(); return; } const bos = raf.indexOf(null); if (bos >= 0) yerlestir(j, bos); },
            birak: (x, y) => { isik(false); if (y < slotY + 110 && y > slotY - 130) { let en = 0; raf.forEach((_, i) => { if (Math.abs(slotX(i) - x) < Math.abs(slotX(en) - x)) en = i; }); yerlestir(j, en); return true; } if (yerde[j] != null) { raf[yerde[j]] = null; yerde[j] = null; ciz(); return true; } return false; } }); });
        eylem(raf.every(x => x != null) ? '<button class="cta" id="kKontrol">Baykuş Bilge kontrol etsin</button>' : '');
        if ($('kKontrol')) $('kKontrol').onclick = kontrol;
      }
      function yerlestir(j, i){ const eski = yerde[j], doluJ = raf[i]; if (eski != null) raf[eski] = null; if (doluJ != null && doluJ !== j) { yerde[doluJ] = eski; if (eski != null) raf[eski] = doluJ; } raf[i] = j; yerde[j] = i; sPop(); ciz(); }
      function kontrol(){ if (KILIT) return; const yanlis = raf.map((j, i) => liste[j][1] !== sira[i][1]);
        if (!yanlis.some(Boolean)) { mood = 'mutlu'; ciz(); eylem(''); ctx.dogru('Raf alfabetik sırada!', sira.map(x => x[1]).join(' · ') + `<small>${lvl === 0 ? 'İlk harflere baktık.' : 'İlk harfler aynıysa ikinci harfe baktık.'}</small>`); return; }
        mood = 'uzgun'; ciz(); sv.querySelectorAll('.kitap').forEach(g => { if (yanlis[yerde[+g.dataset.j]]) salla(g); });
        const i = yanlis.indexOf(true); const a = liste[raf[i]][1], b = sira[i][1];
        ctx.yanlis(a[0] === b[0] ? `${a} ile ${b} aynı harfle başlıyor. İkinci harflerine bak.` : 'Sallanan kitapların yeri yanlış. Alfabe şeridine bak: hangi harf önce geliyor?'); }
      ciz();
      setInstr(lvl === 0 ? (k === 0 ? 'Kitapları arabadan rafa taşı. Alfabede önce gelen harfle başlayan kitap başa gelir. Kitabı tutunca harfi şeritte yanar.' : 'Kitapları alfabetik sırayla rafa diz.') : (k === 0 ? 'Bu kitapların ilk harfleri aynı. İlk harfler aynıysa ikinci harfe bakarız. Kitapları sıraya diz.' : k >= 2 ? 'Kitapları alfabetik sırayla rafa diz. Biri farklı harfle başlıyor.' : 'Kitapları alfabetik sırayla rafa diz.'));
      if (window.__TEST) window.__coz = () => { sira.forEach((x, i) => { const j = liste.indexOf(x); yerlestir(j, i); }); kontrol(); };
    } else {
      // Sözlük avı: kılavuz sözcükler arasındaki sözcüğü bul
      const gr = {}; KITAPLAR.forEach(x => (gr[x[1][0]] = gr[x[1][0]] || []).push(x[1]));
      const harfG = pick(Object.values(gr).filter(g => g.length >= 5)).sort(alfKarsi); const i0 = rint(0, harfG.length - 3);
      const g1 = harfG[i0], dogru = harfG[i0 + 1], g2 = harfG[i0 + 2];
      const dis = w => alfKarsi(w, g1) < 0 || alfKarsi(w, g2) > 0;
      const yanlislar = [pick(harfG.filter(dis)), pick(KITAPLAR.map(x => x[1]).filter(w => w[0] !== g1[0]))];
      const kartlar = shuffle([dogru, ...yanlislar]); let bulundu = null;
      const sayfaNo = 40 + ALF.indexOf(g1[0]) * 9 + i0;
      function ciz(){
        let s = arka() + `<g transform="translate(600 360)"><path d="M-330 -200 Q-170 -230 0 -200 Q170 -230 330 -200 L330 160 Q170 130 0 160 Q-170 130 -330 160 Z" fill="#fffdf6" stroke="#5b3c1e" stroke-width="5"/><line x1="0" y1="-200" x2="0" y2="160" stroke="#c9b48c" stroke-width="3"/>
          <text x="-300" y="-150" class="ttkb" font-size="36" fill="#c0392b">${g1}</text><text x="300" y="-150" text-anchor="end" class="ttkb" font-size="36" fill="#c0392b">${g2}</text><text x="-170" y="140" text-anchor="middle" font-family="Andika" font-size="20" fill="#8a6a4a">${sayfaNo}</text><text x="170" y="140" text-anchor="middle" font-family="Andika" font-size="20" fill="#8a6a4a">${sayfaNo + 1}</text>
          <text x="-300" y="-90" class="ttkb" font-size="30" font-weight="700">${g1}</text>${[-60, -30].map(y => `<rect x="-280" y="${y}" width="${200 + (y % 3) * 20}" height="10" rx="5" fill="#e5d8bf"/>`).join('')}
          <g transform="translate(-170 40)"><rect x="-130" y="-34" width="260" height="62" rx="12" fill="${bulundu ? '#e6faf2' : '#fff6dc'}" stroke="${bulundu ? '#12b886' : '#f4a100'}" stroke-width="3" stroke-dasharray="${bulundu ? '0' : '8 6'}"/><text y="10" text-anchor="middle" class="ttkb" font-size="32">${bulundu || '?'}</text></g>
          ${[-100, -70, -40, -10, 20].map(y => `<rect x="50" y="${y}" width="${220 - (y % 4) * 10}" height="10" rx="5" fill="#e5d8bf"/>`).join('')}<text x="30" y="80" class="ttkb" font-size="30" font-weight="700">${g2}</text><rect x="50" y="94" width="170" height="10" rx="5" fill="#e5d8bf"/></g>`;
        s += bulundu ? '' : kartlar.map((w, j) => `<g class="skart" data-w="${w}" transform="translate(${360 + j * 240} 650)"><rect x="-105" y="-40" width="210" height="80" rx="14" fill="#fff" stroke="#8b5cf6" stroke-width="4"/><text y="14" text-anchor="middle" class="ttkb" font-size="${Math.min(36, Math.floor(36 * 180 / olc(w, 36)))}">${w}</text></g>`).join('');
        sv.innerHTML = s;
        sv.querySelectorAll('.skart').forEach(g => { konum(g, 360 + kartlar.indexOf(g.dataset.w) * 240, 650);
          surukle(g, { dokun: () => sec(g.dataset.w), birak: (x, y) => { if (icinde(x, y, [270, 160, 930, 520])) sec(g.dataset.w); return false; } }); });
      }
      const sec = w => { if (KILIT) return; if (w === dogru) { mood = 'mutlu'; bulundu = w; ciz(); ctx.dogru(`Evet! ${w} bu sayfada.`, `${g1} · <b>${w}</b> · ${g2}<small>Sayfanın başındaki ve sonundaki kılavuz sözcüklere baktık.</small>`); }
        else { mood = 'uzgun'; ciz(); ctx.yanlis(alfKarsi(w, g1) < 0 ? `${w} sözcüğü ${g1} sözcüğünden önce gelir. Bu sayfada değil.` : `${w} sözcüğü ${g2} sözcüğünden sonra gelir. Bu sayfada değil.`); } };
      ciz();
      setInstr(k === 0 ? `Sözlükte her sayfanın başında ve sonunda kılavuz sözcük yazar. Bu sayfa ${g1} ile başlıyor, ${g2} ile bitiyor. Hangi sözcük bu sayfadadır? Doğru kartı sayfaya taşı.` : `Sayfa ${g1} ile başlıyor, ${g2} ile bitiyor. Hangi sözcük bu sayfada?`);
      if (window.__TEST) window.__coz = () => sec(dogru);
    }
  },
};
