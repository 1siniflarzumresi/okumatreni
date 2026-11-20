// Ladin Kasabası — ikinci yerler: Pazar Yeri (para), Fidanlık (çarpma), Pastane (bütün, yarım, çeyrek)
"use strict";
const resimK = (ad, w) => `<g class="karakter">${golge(0, 4, w * .36)}<image href="${R(ad)}" x="${-w / 2}" y="${-w}" width="${w}" height="${w}"/></g>`;
const balon = (metin, px) => { const w = olc(metin, px || 24) + 40; return `<rect x="${-w / 2}" y="-30" width="${w}" height="56" rx="16" fill="#fff" stroke="#3a86ff" stroke-width="3"/><path d="M-14 26 L0 46 L14 26 Z" fill="#fff" stroke="#3a86ff" stroke-width="3"/><path d="M-12 24 L12 24" stroke="#fff" stroke-width="5"/><text y="8" text-anchor="middle" class="ttkb" font-size="${px || 24}">${esc(metin)}</text>`; };

/* ===================== 6) PAZAR YERİ: paralarımız ===================== */
const PARA_RENK = { 5: ['#d9c9f7', '#6b4fa8'], 10: ['#f8b4b4', '#b42b2b'], 20: ['#b5e3b5', '#2e7d32'], 50: ['#ffd59a', '#b85c00'], 100: ['#b3dbfb', '#1565c0'] };
function paraSVG(v){ if (v === 1) return `<circle r="28" fill="#e9c46a" stroke="#a87a1e" stroke-width="3"/><circle r="20" fill="#dcdcdc" stroke="#9a9a9a" stroke-width="2"/><text y="4" text-anchor="middle" font-family="Andika" font-weight="700" font-size="20" fill="#4a3a10">1</text><text y="18" text-anchor="middle" font-family="Andika" font-size="10" font-weight="700" fill="#4a3a10">TL</text>`;
  const [a, b] = PARA_RENK[v]; return `<rect x="-64" y="-34" width="128" height="68" rx="6" fill="${a}" stroke="${b}" stroke-width="3"/><rect x="-56" y="-26" width="112" height="52" rx="4" fill="none" stroke="${b}" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="-30" r="17" fill="${b}" opacity=".18"/><text x="-30" y="6" text-anchor="middle" font-family="Andika" font-weight="700" font-size="15" fill="${b}">TL</text><text x="24" y="13" text-anchor="middle" font-family="Andika" font-weight="700" font-size="36" fill="${b}">${v}</text>`; }
const enAz = (t, cs) => { let n = 0; [...cs].sort((a, b) => b - a).forEach(c => { n += Math.floor(t / c); t %= c; }); return n; };
YER.pazar = {
  id: 'pazar', ad: 'Pazar Yeri', ders: 'Matematik', beceri: 'Paralarımız: ödeme ve para üstü', ikon: '🧺', renk: '#12b886', harita: { x: 480, y: 675 },
  hikaye: 'Cumartesi günü kasabada pazar kurulur. Tilki Teyze taze meyve ve sebze satıyor. Alışveriş yap, sonra tezgâhın arkasına geç ve para üstünü ver.',
  seviyeler: [['Tam öde', 'Fiyat kadar parayı tabağa koy.'], ['Az parayla öde', 'Aynı tutarı en az sayıda parayla öde.'], ['Para üstü', 'Satıcı sensin: fiyattan sayarak para üstünü ver.']],
  bina(){ return `${golge(0, 4, 90)}<rect x="-80" y="-60" width="160" height="60" fill="#c98d55" stroke="#8b5a2b" stroke-width="3"/>${[-55, -5, 45].map((x, i) => `<rect x="${x - 20}" y="-80" width="40" height="22" fill="#8b5a2b"/>${[0, 1, 2].map(j => `<circle cx="${x - 10 + j * 10}" cy="-82" r="8" fill="${['#e03131', '#f4a100', '#12b886'][i]}"/>`).join('')}`).join('')}<rect x="-84" y="-130" width="8" height="70" fill="#8b5a2b"/><rect x="76" y="-130" width="8" height="70" fill="#8b5a2b"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${-90 + i * 30} -130 h30 v26 a15 15 0 0 1 -30 0 Z" fill="${i % 2 ? '#fff' : '#e03131'}"/>`).join('')}`; },
  gorev(lvl, k, ctx){
    const URUN = [['elma', 'elma'], ['armut', 'armut'], ['muz', 'muz'], ['nar', 'nar'], ['limon', 'limon'], ['cilek', 'çilek'], ['uzum', 'üzüm'], ['domates', 'domates'], ['patates', 'patates'], ['havuc', 'havuç'], ['mandalina', 'mandalina'], ['incir', 'incir'], ['zeytin', 'zeytin'], ['visne', 'vişne']];
    const sec = shuffle(URUN).slice(0, 3), [ur, uad] = sec[1];
    const cesit = lvl === 0 && k < 3 ? [1, 5, 10] : [1, 5, 10, 20, 50];
    let fiyat, verilen = 0;
    if (lvl === 0) fiyat = k < 3 ? rint(12, 38) : rint(41, 89);
    else if (lvl === 1) do { fiyat = rint(16, 98); } while (enAz(fiyat, cesit) < 4);
    else { verilen = k < 3 ? 50 : 100; do { fiyat = verilen === 50 ? rint(21, 48) : rint(52, 97); } while (fiyat % 10 === 0); }
    let tabak = [], mesgul = false, sayac = null;
    const TABAK = [700, 360, 1160, 590], slot = i => [790 + (i % 3) * 140, 400 + (Math.floor(i / 3) % 4) * 48 + (i >= 12 ? 14 : 0)];
    const yigin = cesit.map((v, i) => [v, 180 + i * (lvl === 2 || cesit.length === 5 ? 200 : 260)]);
    const arka = () => `<defs><linearGradient id="pGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#e6f6ff"/></linearGradient></defs>
      <rect x="-3000" y="-400" width="7200" height="1600" fill="url(#pGok)"/>${bulut(900, 150, .7)}<path d="M-3000 330 Q300 260 600 300 Q900 340 4200 280 L4200 1200 L-3000 1200 Z" fill="#a9df86"/>
      ${Array.from({ length: 22 }, (_, i) => `<path d="M${-120 + i * 70} 0 h70 v96 a35 35 0 0 1 -70 0 Z" fill="${i % 2 ? '#fff' : '#e03131'}"/>`).join('')}<rect x="-3000" y="-400" width="7200" height="402" fill="#e03131"/>
      <rect x="40" y="96" width="14" height="260" fill="#8b5a2b"/><rect x="1146" y="96" width="14" height="260" fill="#8b5a2b"/>
      ${lvl === 2 ? `<g transform="translate(640 330)">${resimK('sincap', 180)}</g>` : `<g transform="translate(660 340)">${resimK('tilki', 200)}</g>`}
      ${sec.map(([r], i) => `<g transform="translate(${90 + i * 165} 240)"><rect width="150" height="100" rx="6" fill="#c98d55" stroke="#8b5a2b" stroke-width="4"/><line x1="0" y1="50" x2="150" y2="50" stroke="#8b5a2b" stroke-width="3"/>${[0, 1, 2].map(j => `<image href="${R(r)}" x="${8 + j * 44}" y="${-30 + (j % 2) * 8}" width="${i === 1 ? 64 : 56}" height="${i === 1 ? 64 : 56}"/>`).join('')}</g>`).join('')}
      <g transform="translate(330 120)"><line x1="0" y1="-30" x2="0" y2="0" stroke="#5b3c1e" stroke-width="3"/><rect x="-96" y="0" width="192" height="104" rx="12" fill="#fffdf6" stroke="#f4a100" stroke-width="4"/><text y="34" text-anchor="middle" class="ttkb" font-size="24">1 kilo ${esc(uad)}</text><text y="84" text-anchor="middle" class="ttkb" font-size="46" fill="#c0392b">${fiyat} TL</text></g>
      <rect x="-3000" y="340" width="7200" height="20" fill="#8b5a2b"/><rect x="40" y="356" width="1120" height="240" fill="#c98d55" stroke="#8b5a2b" stroke-width="4"/>${[0, 1, 2, 3].map(i => `<line x1="40" y1="${404 + i * 52}" x2="1160" y2="${404 + i * 52}" stroke="#b07a3c" stroke-width="3"/>`).join('')}
      <rect x="704" y="364" width="452" height="224" rx="20" fill="#fffdf6" stroke="#12b886" stroke-width="4" stroke-dasharray="${lvl === 2 ? '10 6' : '0'}"/><text x="930" y="580" text-anchor="middle" class="ttkb" font-size="22" fill="#12805c">${lvl === 2 ? 'Para üstü' : 'Ödeme tabağı'}</text>
      ${lvl === 2 ? `<g transform="translate(440 470)"><text y="-60" text-anchor="middle" class="ttkb" font-size="22">Müşteri verdi</text>${paraSVG(verilen)}</g>` : ''}
      <rect x="-3000" y="596" width="7200" height="700" fill="${lvl === 2 ? '#5b3c1e' : '#7a4a26'}"/><text x="40" y="630" class="ttkb" font-size="22" fill="#ffe8c2">${lvl === 2 ? 'Kasa' : 'Cüzdan'}</text>`;
    function topla(){ return tabak.reduce((a, b) => a + b, 0); }
    function ciz(){
      let s = arka();
      s += yigin.map(([v, x]) => `<g transform="translate(${x} 690)">${[2, 1].map(o => `<g transform="translate(${o * 4} ${-o * 5})">${paraSVG(v)}</g>`).join('')}<g class="yigin" data-v="${v}" transform="translate(0 0)">${paraSVG(v)}</g></g>`).join('');
      s += tabak.map((v, i) => { const [x, y] = slot(i); return `<g class="tparasi" data-i="${i}" transform="translate(${x} ${y}) rotate(${(i * 7) % 9 - 4})">${paraSVG(v)}</g>`; }).join('');
      if (lvl === 2) { const zincir = [fiyat]; let t = fiyat; tabak.forEach(v => { t += v; zincir.push(t); });
        s += `<g transform="translate(955 320)"><rect x="-230" y="-26" width="460" height="48" rx="12" fill="#fff" stroke="#12b886" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Andika" font-weight="700" font-size="${zincir.length > 6 ? 18 : 24}" fill="#12805c">${zincir.slice(-8).join(' → ')}</text></g>`; }
      s += '<g id="pUst"></g>';
      sv.innerHTML = s;
      sv.querySelectorAll('.yigin').forEach(g => { konum(g, 0, 0);
        surukle(g, { izin: () => !mesgul, dokun: () => ekle(+g.dataset.v), birak: (x2, y2) => { if (icinde(x2, y2, TABAK)) ekle(+g.dataset.v); return false; } }); });
      sv.querySelectorAll('.tparasi').forEach(g => g.addEventListener('click', () => { if (KILIT || mesgul) return; tabak.splice(+g.dataset.i, 1); sTik(); ciz(); }));
    }
    function ekle(v){ if (tabak.length >= 15) { FB('Tabak doldu.', false); return; } tabak.push(v); v === 1 ? sTik() : sPop(); ciz();
      if (lvl === 2) { const t = fiyat + topla(); speak(sayiSoz(t)); } }
    function say(sonra){ mesgul = true; const sira = tabak.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]); let i = 0, t = 0; const u = $('pUst');
      const adim = () => { if (i < sira.length) { const [v, j] = sira[i]; t += v; const [x, y] = slot(j); S(u, `<g><circle cx="${x + 44}" cy="${y - 24}" r="22" fill="#12b886"/><text x="${x + 44}" y="${y - 17}" text-anchor="middle" font-family="Andika" font-weight="700" font-size="${t > 99 ? 16 : 19}" fill="#fff">${t}</text></g>`); tone(500 + i * 50, .1); i++; zaman(adim, 420); }
        else { mesgul = false; sonra(t); } }; adim(); }
    ciz();
    if (lvl === 0) setInstr(k === 0 ? `Bir kilo ${uad} ${fiyat} lira. Cüzdandan paraları ödeme tabağına koy. Tam ${fiyat} lira olsun. Sonra Öde düğmesine bas.` : `Bir kilo ${uad} ${fiyat} lira. Tam parayı öde.`);
    else if (lvl === 1) setInstr(k === 0 ? `Bir kilo ${uad} ${fiyat} lira. Bu kez en az sayıda parayla öde. Büyük paraları kullan.` : `Bir kilo ${uad} ${fiyat} lira. En az sayıda parayla öde.`);
    else setInstr(k === 0 ? `Şimdi satıcı sensin. Fındık ${fiyat} liralık ${uad} aldı, ${verilen} lira verdi. Para üstünü kasadan ver. ${fiyat} sayısından başlayıp ${verilen} sayısına kadar say.` : `Fındık ${fiyat} liralık ${uad} aldı, ${verilen} lira verdi. Para üstünü ver.`);
    eylem(`<button class="cta alt" id="pBos">Tabağı boşalt</button><button class="cta" id="pGo">${lvl === 2 ? 'Para üstünü ver' : 'Öde'}</button>`);
    $('pBos').onclick = () => { if (KILIT || mesgul) return; tabak = []; ciz(); };
    $('pGo').onclick = () => { if (KILIT || mesgul) return; if (!tabak.length) { FB(lvl === 2 ? 'Para üstü tabağı boş.' : 'Tabak boş. Önce para koy.', false); return; }
      const dizi = [...tabak].sort((a, b) => b - a).join(' + ');
      if (lvl === 2) { const ust = verilen - fiyat, t = topla();
        if (t === ust) { const zincir = [fiyat]; let z = fiyat; [...tabak].sort((a, b) => a - b).forEach(v => { z += v; zincir.push(z); });
          ctx.dogru(`Doğru! Para üstü ${sayiSoz(ust)} lira.`, `${verilen} − ${fiyat} = <b>${ust} TL</b><small>${zincir.join(', ')}: fiyattan başlayıp saydık.</small>`); }
        else ctx.yanlis(t > ust ? `Fiyattan sayınca ${fiyat + t} oldu. Müşteri ${verilen} lira verdi. Fazla verdin.` : `Fiyattan sayınca ${fiyat + t} oldu. Daha ${verilen} olmadı. Saymaya devam et.`); return; }
      say(t => { if (t !== fiyat) { ctx.yanlis(`Tabakta ${t} lira var. Fiyat ${fiyat} lira. ${t < fiyat ? 'Biraz daha para koy.' : 'Fazla para koydun.'}`); return; }
        const az = enAz(fiyat, cesit);
        if (lvl === 1 && tabak.length > az) { ctx.yanlis(`Tutar doğru ama ${tabak.length} para kullandın. Daha az parayla ödeyebilirsin. Küçük paraların yerine aynı değerde büyük para koy.`); return; }
        ctx.dogru(`Tam ${sayiSoz(fiyat)} lira!`, `${dizi} = <b>${fiyat} TL</b><small>${lvl === 1 ? `En az ${az} parayla ödedik.` : 'Büyük paradan başlayarak saydık.'}</small>`); }); };
    if (window.__TEST) window.__coz = () => { tabak = []; let t = lvl === 2 ? verilen - fiyat : fiyat; [...cesit].sort((a, b) => b - a).forEach(c => { while (t >= c) { tabak.push(c); t -= c; } }); ciz(); $('pGo').click(); };
  },
};

/* ===================== 7) FİDANLIK: eş gruplar, ritmik sayma, çarpma ===================== */
const fidan = (r) => `<g><path d="M0 0 C0 -14 0 -22 0 -30" stroke="#3f8f3f" stroke-width="4" fill="none"/><path d="M0 -18 C-16 -30 -26 -22 -24 -14 C-14 -10 -6 -12 0 -18 Z" fill="#5cb85c"/><path d="M0 -26 C14 -40 26 -32 24 -24 C14 -18 6 -20 0 -26 Z" fill="#7ccc63"/>${r ? `<circle cy="-34" r="9" fill="${r}"/><circle cy="-34" r="4" fill="#ffd23f"/>` : ''}</g>`;
const saksiSVG = `<path d="M-62 -20 L62 -20 L48 70 L-48 70 Z" fill="#d9774a" stroke="#9c4a26" stroke-width="4"/><rect x="-70" y="-34" width="140" height="22" rx="6" fill="#e58b5d" stroke="#9c4a26" stroke-width="4"/><ellipse cy="-30" rx="58" ry="8" fill="#6b4226"/>`;
YER.fidanlik = {
  id: 'fidanlik', ad: 'Fidanlık', ders: 'Matematik', beceri: 'Eş gruplar, ritmik sayma ve çarpma', ikon: '🌱', renk: '#2e8b57', harita: { x: 200, y: 590 },
  hikaye: 'Bahçıvan Kurbağa bahar için fidan dikiyor. Saksılara ve tarhlara eşit sayıda fidan dikmesine yardım et. Eşit gruplar çarpmanın sırrıdır.',
  seviyeler: [['Eşit saksılar', 'Her saksıya aynı sayıda fidan dik.'], ['Sıra sıra', 'Sıraları doldurarak ritmik say.'], ['Çiçek tarhı', 'Tarhtaki çiçekleri çarpma ile anlat.']],
  bina(){ return `${golge(0, 4, 90)}<path d="M-80 0 L-80 -80 L0 -140 L80 -80 L80 0 Z" fill="#dff5e8" stroke="#2e8b57" stroke-width="4"/><path d="M-80 -80 L80 -80 M0 -140 L0 0 M-40 -110 L-40 0 M40 -110 L40 0" stroke="#2e8b57" stroke-width="3"/>${[-55, -15, 25, 62].map((x, i) => `<g transform="translate(${x} -6) scale(.7)">${fidan(i % 2 ? '#f2546b' : null)}</g>`).join('')}`; },
  gorev(lvl, k, ctx){
    const arka = () => `<defs><linearGradient id="fiGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe8ff"/><stop offset="1" stop-color="#f0fbff"/></linearGradient></defs>
      <rect x="-3000" y="-400" width="7200" height="1600" fill="url(#fiGok)"/>${Array.from({ length: 9 }, (_, i) => `<line x1="${i * 150}" y1="0" x2="${i * 150}" y2="300" stroke="#fff" stroke-width="10" opacity=".7"/>`).join('')}<path d="M-3000 0 L600 -10 L4200 0" stroke="#fff" stroke-width="14" opacity=".7"/>
      <rect x="-3000" y="290" width="7200" height="40" fill="#8bc34a"/>${Array.from({ length: 30 }, (_, i) => `<rect x="${-200 + i * 56}" y="250" width="16" height="80" rx="3" fill="#e9d7b6" stroke="#b08a5a" stroke-width="2"/>`).join('')}<rect x="-3000" y="270" width="7200" height="10" fill="#e9d7b6"/>
      <rect x="-3000" y="330" width="7200" height="900" fill="#a1754f"/>${Array.from({ length: 40 }, (_, i) => `<ellipse cx="${(i * 97) % 1300 - 40}" cy="${360 + (i * 53) % 380}" rx="${6 + i % 5}" ry="3" fill="#8a6040"/>`).join('')}
      <g transform="translate(1100 720)">${resimK('kurbaga', 170)}</g>`;
    if (lvl === 0) {
      const n = k < 3 ? rint(2, 4) : rint(3, 5), m = k < 3 ? rint(2, 4) : rint(3, 5), N = n * m, sak = Array(n).fill(0); let soruAcik = false;
      const sx = i => 480 - (n - 1) * 95 + i * 190, sy = 560;
      function ciz(){ let s = arka();
        s += sak.map((c, i) => `<g class="saksi" data-i="${i}" transform="translate(${sx(i)} ${sy})">${saksiSVG}${Array.from({ length: c }, (_, j) => `<g class="fi" data-j="${j}" transform="translate(${-40 + (j % 3) * 40} ${-28 - Math.floor(j / 3) * 34})">${fidan()}</g>`).join('')}<rect x="-70" y="-130" width="140" height="200" fill="transparent"/></g>`).join('');
        s += `<g transform="translate(1040 420)"><rect x="-90" y="-50" width="180" height="90" rx="10" fill="#7a4a26"/>${Array.from({ length: 8 }, (_, j) => `<g transform="translate(${-60 + (j % 4) * 40} ${-6 + Math.floor(j / 4) * 34}) scale(.8)">${fidan()}</g>`).join('')}<text y="70" text-anchor="middle" class="ttkb" font-size="22">Fideler</text></g>`;
        sv.innerHTML = s;
        sv.querySelectorAll('.saksi').forEach(g => g.addEventListener('click', e => { if (KILIT || soruAcik) return; const i = +g.dataset.i; if (e.target.closest('.fi')) { sak[i]--; sTik(); ciz(); return; } if (sak[i] >= 6) { FB('Bu saksı doldu.', false); return; } sak[i]++; sPop(); ciz(); })); }
      ciz();
      setInstr(k === 0 ? `${n} saksının her birine ${m} fidan dik. Saksıya dokununca bir fidan dikilir. Fidana dokunursan geri alınır. Bitince Diktim düğmesine bas.` : `${n} saksının her birine ${m} fidan dik.`);
      eylem('<button class="cta" id="fiGo">Diktim</button>');
      const soru = () => { soruAcik = true; setInstr('Toplam kaç fidan diktin?');
        eylem(shuffle([...new Set([N, N + m, Math.max(1, N - m), n + m])]).slice(0, 3).concat([]).map(v => `<button class="cta sec" data-v="${v}">${v}</button>`).join(''));
        if (!$('eylem').querySelector(`[data-v="${N}"]`)) $('eylem').firstElementChild.dataset.v = N, $('eylem').firstElementChild.textContent = N;
        $('eylem').querySelectorAll('.sec').forEach(b => b.onclick = () => { if (KILIT) return;
          if (+b.dataset.v === N) ctx.dogru(`Evet! ${sayiSoz(N)} fidan.`, `${Array(n).fill(m).join(' + ')} = <b>${N}</b><small>${n} tane ${m}: ${n} × ${m} = ${N}</small>`);
          else { b.disabled = true; ctx.yanlis(`Saksılar ${m} fidanlık eşit gruplar. ${m}, ${2 * m} diye say.`); } }); };
      $('fiGo').onclick = () => { if (KILIT || soruAcik) return; const kotu = sak.map(c => c !== m);
        if (!kotu.some(Boolean)) { sOk(); soru(); return; }
        sv.querySelectorAll('.saksi').forEach(g => { if (kotu[+g.dataset.i]) salla(g); }); ctx.yanlis(`Sallanan saksılarda ${m} fidan yok. Her saksıda ${m} fidan olmalı.`); };
      if (window.__TEST) window.__coz = () => { sak.fill(m); ciz(); $('fiGo').click(); zaman(() => $('eylem').querySelector(`[data-v="${N}"]`).click(), 50); };
    } else if (lvl === 1) {
      const c = pick(k < 2 ? [2, 5, 10] : [2, 3, 4, 5, 10]), r = c === 10 ? rint(2, 5) : rint(2, 6), N = r * c; let dik = 0;
      const bx = 110, bw = 780, ry = i => 360 + i * 62, slx = j => bx + 40 + j * ((bw - 80) / Math.max(1, c - 1)) * (c > 1 ? 1 : 0);
      function ciz(goster){ let s = arka() + `<rect x="${bx - 20}" y="330" width="${bw + 40}" height="${7 * 62 + 10}" rx="18" fill="#6b4226"/>`;
        for (let i = 0; i < 7; i++) { s += `<g class="sira" data-i="${i}"><rect x="${bx}" y="${ry(i) - 26}" width="${bw}" height="52" rx="12" fill="${i < dik ? '#7a5034' : '#82583a'}" stroke="#5a3a20" stroke-width="2" stroke-dasharray="${i < dik ? '0' : '8 6'}"/>`;
          if (i < dik) s += Array.from({ length: c }, (_, j) => `<g transform="translate(${slx(j)} ${ry(i) + 18}) scale(${c === 10 ? .8 : 1})">${fidan()}</g>`).join('') + (goster ? `<g transform="translate(${bx + bw + 30} ${ry(i)})"><circle r="24" fill="#ffd23f" stroke="#b45309" stroke-width="3"/><text y="8" text-anchor="middle" font-family="Andika" font-weight="700" font-size="22">${(i + 1) * c}</text></g>` : '');
          s += '</g>'; }
        s += `<g transform="translate(1072 300)"><rect x="-120" y="-60" width="240" height="120" rx="14" fill="#fffdf6" stroke="#2e8b57" stroke-width="4"/><text y="-18" text-anchor="middle" class="ttkb" font-size="24">Her sırada</text><text y="38" text-anchor="middle" class="ttkb" font-size="50" fill="#2e8b57">${c} fidan</text></g>`;
        sv.innerHTML = s;
        sv.querySelectorAll('.sira').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const i = +g.dataset.i; if (i < dik) { dik = i; sTik(); } else { dik++; sPop(); } ciz(); })); }
      ciz();
      setInstr(k === 0 ? `Bahçıvan ${N} fidan dikecek. Her sıraya ${c} fidan dikiliyor. Bir sıraya dokununca o sıra dikilir. Ritmik sayarak ${N} fidan olunca Tamam'a bas.` : `${N} fidan dikilecek. Her sırada ${c} fidan var. Sıraları dik.`);
      eylem('<button class="cta" id="fiGo">Tamam</button>');
      $('fiGo').onclick = () => { if (KILIT) return; const t = dik * c;
        if (t === N) { ciz(true); ctx.dogru(`Evet! ${r} sıra, ${sayiSoz(N)} fidan.`, `${Array.from({ length: r }, (_, i) => (i + 1) * c).join(', ')}<br>${Array(r).fill(c).join(' + ')} = <b>${N}</b><small>${r} sıra, her sırada ${c}: ${r} × ${c} = ${N}</small>`, 2600); }
        else ctx.yanlis(`${dik} sıra dikildi. ${c}, ${2 * c}, ${3 * c} diye ritmik say. ${dik} sırada ${N} fidan ${t < N ? 'yok, daha az' : 'değil, daha fazla'} var.`); };
      if (window.__TEST) window.__coz = () => { dik = r; ciz(); $('fiGo').click(); };
    } else {
      const r = rint(2, 5), c = rint(2, 6), N = r * c, cic = pick([['#f2546b', 'lale'], ['#8b5cf6', 'menekşe'], ['#f4a100', 'papatya']]), urun = k % 2 === 0;
      let s = arka() + `<rect x="200" y="350" width="640" height="${r * 74 + 30}" rx="20" fill="#6b4226"/>`;
      for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) s += `<g transform="translate(${520 - (c - 1) * 50 + j * 100} ${410 + i * 74})">${fidan(cic[0])}</g>`;
      sv.innerHTML = s;
      if (urun) { const se = shuffle([`${r} × ${c}`, `${r} + ${c}`, `${r} × ${c + 1}`]); setInstr(`Tarhta ${cic[1]}ler sıra sıra dikilmiş. Hangi çarpma bu tarhı anlatır?`);
        eylem(se.map(v => `<button class="cta sec" data-v="${v}">${v}</button>`).join(''));
        $('eylem').querySelectorAll('.sec').forEach(b => b.onclick = () => { if (KILIT) return; if (b.dataset.v === `${r} × ${c}`) ctx.dogru(`Evet! ${r} sıra, her sırada ${c} ${cic[1]}.`, `${r} × ${c} = <b>${N}</b><small>${Array(r).fill(c).join(' + ')} = ${N}</small>`); else { b.disabled = true; ctx.yanlis(`Önce sıraları say: kaç sıra var? Sonra bir sıradaki ${cic[1]}leri say.`); } }); }
      else { setInstr(`Tarhta ${r} sıra ${cic[1]} var. Her sırada ${c} ${cic[1]}. Kaç ${cic[1]} var?`);
        const se = shuffle([...new Set([N, N + c, N - c > 0 ? N - c : N + 2 * c, r + c])]).slice(0, 3); if (!se.includes(N)) se[0] = N;
        eylem(shuffle(se).map(v => `<button class="cta sec" data-v="${v}">${v}</button>`).join(''));
        $('eylem').querySelectorAll('.sec').forEach(b => b.onclick = () => { if (KILIT) return; if (+b.dataset.v === N) ctx.dogru(`Evet! ${sayiSoz(N)} ${cic[1]}.`, `${r} × ${c} = <b>${N}</b><small>${Array.from({ length: r }, (_, i) => (i + 1) * c).join(', ')}: sıra sıra saydık.</small>`); else { b.disabled = true; ctx.yanlis(`Sıra sıra say: ${c}, ${2 * c} diye devam et.`); } }); }
      if (window.__TEST) window.__coz = () => $('eylem').querySelector(urun ? `[data-v="${r} × ${c}"]` : `[data-v="${N}"]`).click();
    }
  },
};

/* ===================== 8) PASTANE: bütün, yarım, çeyrek ===================== */
// Pasta, merkez (0,0); kesim çizgileri: {d: 'd'|'y', o: kayma}; d = dikey (x = o), y = yatay (y = o)
function pastaSVG(sek, R0){ const w = sek === 'dikdortgen' ? R0 * 2.6 : R0 * 2, h = sek === 'dikdortgen' ? R0 * 1.6 : R0 * 2;
  if (sek === 'daire') return `<circle r="${R0}" fill="#f7b6c8" stroke="#c2577a" stroke-width="5"/><circle r="${R0 - 14}" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="2 14" stroke-linecap="round"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${Math.cos(i * .785 + .39) * R0 * .55}" cy="${Math.sin(i * .785 + .39) * R0 * .55}" r="${R0 * .09}" fill="#e03131"/>`).join('')}<circle r="${R0 * .12}" fill="#fff"/>`;
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="10" fill="${sek === 'kare' ? '#c98d55' : '#f6d7a7'}" stroke="${sek === 'kare' ? '#7a4a26' : '#b07a3c'}" stroke-width="5"/><rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${h - 24}" rx="6" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="2 14" stroke-linecap="round"/>${Array.from({ length: 6 }, (_, i) => `<circle cx="${(-0.3 + (i % 3) * .3) * w}" cy="${(-0.22 + Math.floor(i / 3) * .44) * h}" r="${R0 * .08}" fill="${sek === 'kare' ? '#fff' : '#e03131'}"/>`).join('')}`; }
function pastaOlcu(sek, R0){ return sek === 'dikdortgen' ? [R0 * 1.3, R0 * .8] : [R0, R0]; }
// kesimlere göre parçalar: her parça [x0, x1, y0, y1] dikdörtgen bölgesi
function parcalar(kes, sek, R0){ const [W, H] = pastaOlcu(sek, R0); const xs = [-W - 20, ...kes.filter(c => c.d === 'd').map(c => c.o).sort((a, b) => a - b), W + 20], ys = [-H - 20, ...kes.filter(c => c.d === 'y').map(c => c.o).sort((a, b) => a - b), H + 20];
  const p = []; for (let i = 0; i < xs.length - 1; i++) for (let j = 0; j < ys.length - 1; j++) p.push([xs[i], xs[i + 1], ys[j], ys[j + 1]]); return p; }
function parcaCiz(sek, R0, pr, ayir, id){ const [x0, x1, y0, y1] = pr, mx = (x0 + x1) / 2, my = (y0 + y1) / 2, L = Math.hypot(mx, my) || 1;
  return `<clipPath id="${id}"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}"/></clipPath><g transform="translate(${mx / L * ayir} ${my / L * ayir})"><g clip-path="url(#${id})">${pastaSVG(sek, R0)}</g></g>`; }
function alan(sek, R0, pr){ // parçanın yaklaşık alanı (ızgarayla)
  const [W, H] = pastaOlcu(sek, R0); let n = 0; for (let x = -W; x <= W; x += 4) for (let y = -H; y <= H; y += 4) { const ic = sek === 'daire' ? x * x + y * y <= R0 * R0 : Math.abs(x) <= W && Math.abs(y) <= H; if (ic && x >= pr[0] && x < pr[1] && y >= pr[2] && y < pr[3]) n++; } return n; }
YER.pastane = {
  id: 'pastane', ad: 'Pastane', ders: 'Matematik', beceri: 'Bütün, yarım ve çeyrek', ikon: '🍰', renk: '#f2546b', harita: { x: 790, y: 675 },
  hikaye: 'Pastacı Fil bugün çok yoğun. Arkadaşlar pastayı eşit paylaşmak istiyor. Bıçağı doğru yerden geçir, siparişleri doğru tabakla ver.',
  seviyeler: [['İki eşit parça', 'Pastayı iki arkadaşa eşit böl: yarım.'], ['Dört eşit parça', 'Dört arkadaşa eşit böl: çeyrek.'], ['Sipariş tabakları', 'Yarım, çeyrek ve bütün siparişlerini ver.']],
  bina(){ return `${golge(0, 4, 90)}<rect x="-78" y="-104" width="156" height="104" fill="#ffeef0" stroke="#c2577a" stroke-width="3"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${-90 + i * 30} -130 h30 v20 a15 15 0 0 1 -30 0 Z" fill="${i % 2 ? '#fff' : '#f2546b'}"/>`).join('')}<rect x="-90" y="-134" width="180" height="10" fill="#c2577a"/><rect x="-60" y="-86" width="70" height="50" rx="6" fill="#bfe6ff" stroke="#c2577a" stroke-width="3"/><g transform="translate(-25 -52) scale(.16)">${pastaSVG('daire', 100)}</g><rect x="24" y="-70" width="36" height="70" fill="#8a5a2b"/>`; },
  gorev(lvl, k, ctx){
    const arka = () => `<rect x="-3000" y="-400" width="7200" height="1600" fill="#ffeef0"/>${Array.from({ length: 30 }, (_, i) => `<path d="M${-200 + i * 60} 0 h60 v70 a30 30 0 0 1 -60 0 Z" fill="${i % 2 ? '#fff' : '#f9a8b8'}"/>`).join('')}<rect x="-3000" y="-400" width="7200" height="402" fill="#f9a8b8"/>
      ${[0, 1].map(r => `<rect x="40" y="${130 + r * 110}" width="300" height="12" fill="#c2577a"/>${[0, 1, 2].map(i => `<g transform="translate(${95 + i * 95} ${118 + r * 110}) scale(.2)">${pastaSVG(['daire', 'kare', 'dikdortgen'][(i + r) % 3], 100)}</g>`).join('')}`).join('')}
      <rect x="-3000" y="560" width="7200" height="30" fill="#c2577a"/><rect x="-3000" y="590" width="7200" height="700" fill="#fbd3dc"/>
      <g transform="translate(1100 560)">${resimK('fil', 190)}</g>`;
    if (lvl < 2) {
      const sek = pick(k < 2 ? ['daire', 'kare'] : ['daire', 'kare', 'dikdortgen']), R0 = 150, [W, H] = pastaOlcu(sek, R0), cx = 600, cy = 360;
      const kisi = lvl === 0 ? 2 : 4, dost = shuffle(['kedi', 'kopek', 'tavuk', 'kuzu', 'ordek', 'tilki', 'maymun', 'zebra']).slice(0, kisi);
      const kay = [rint(45, 70) * (Math.random() < .5 ? 1 : -1), rint(40, 60) * (Math.random() < .5 ? 1 : -1)];
      let sec = [];
      const sec_ = lvl === 0 ? (Math.random() < .5 ? [{ d: 'd', o: 0, ok: 1 }, { d: 'd', o: kay[0] }, { d: 'y', o: kay[1] }] : [{ d: 'y', o: 0, ok: 1 }, { d: 'y', o: kay[1] }, { d: 'd', o: kay[0] }])
        : [{ d: 'd', o: 0, ok: 1 }, { d: 'y', o: 0, ok: 1 }, { d: 'd', o: kay[0] }, { d: 'y', o: kay[1] }];
      const secenek = shuffle(sec_);
      function ciz(kesildi, ayir){ let s = arka() + `<ellipse cx="${cx}" cy="${cy + H + 10}" rx="${W + 60}" ry="30" fill="#fff" stroke="#e5b8c4" stroke-width="4"/><g transform="translate(${cx} ${cy})">`;
        if (kesildi) s += parcalar(kesildi, sek, R0).map((p, i) => parcaCiz(sek, R0, p, ayir, 'pp' + i)).join('');
        else { s += pastaSVG(sek, R0); s += secenek.map((c, i) => { const on = sec.includes(i), L = c.d === 'd' ? `M${c.o} ${-H - 36} L${c.o} ${H + 36}` : `M${-W - 36} ${c.o} L${W + 36} ${c.o}`;
          return `<g class="kesim" data-i="${i}"><path d="${L}" stroke="transparent" stroke-width="34"/><path d="${L}" stroke="${on ? '#1d4e89' : '#5b6b7b'}" stroke-width="${on ? 7 : 4}" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="${c.d === 'd' ? c.o : -W - 46}" cy="${c.d === 'd' ? -H - 46 : c.o}" r="17" fill="${on ? '#1d4e89' : '#fff'}" stroke="#1d4e89" stroke-width="3"/><path d="M${(c.d === 'd' ? c.o : -W - 46) - 7} ${(c.d === 'd' ? -H - 46 : c.o) - 1} l5 6 l10 -12" fill="none" stroke="${on ? '#fff' : 'transparent'}" stroke-width="3"/></g>`; }).join(''); }
        s += '</g>';
        s += dost.map((d, i) => `<g class="dost" transform="translate(${cx - (kisi - 1) * 120 + i * 240} 676)">${resimDaire(d, 44, '#f2546b')}<ellipse cy="52" rx="56" ry="12" fill="#fff" stroke="#e5b8c4" stroke-width="3"/></g>`).join('');
        sv.innerHTML = s;
        sv.querySelectorAll('.kesim').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const i = +g.dataset.i;
          if (lvl === 0) { sec = [i]; kes(); return; }
          sec = sec.includes(i) ? sec.filter(x => x !== i) : [...sec, i]; sTik(); ciz(); if (sec.length === 2) zaman(kes, 300); })); }
      function kes(){ KILIT = true; const kc = sec.map(i => secenek[i]); ciz(kc, 0); tone(300, .25, 'sawtooth', .05);
        tween(600, t => { const g = sv.querySelector(`g[transform="translate(${cx} ${cy})"]`); if (g) g.querySelectorAll(':scope > g').forEach((p, i) => { const [x0, x1, y0, y1] = parcalar(kc, sek, R0)[i], mx = (x0 + x1) / 2, my = (y0 + y1) / 2, L = Math.hypot(mx, my) || 1; p.setAttribute('transform', `translate(${mx / L * 18 * t} ${my / L * 18 * t})`); }); }, () => {
          const pr = parcalar(kc, sek, R0).map(p => alan(sek, R0, p)).filter(a => a > 0), es = Math.max(...pr) - Math.min(...pr) <= Math.max(...pr) * .04;
          KILIT = false;
          if (pr.length === kisi && es) { sv.querySelectorAll('.dost').forEach(zipla); ctx.dogru(lvl === 0 ? 'İki eşit parça! Her biri yarım.' : 'Dört eşit parça! Her biri çeyrek.', lvl === 0 ? `1 bütün = <b>2 yarım</b><small>Bütünü 2 eşit parçaya böldük.</small>` : `1 bütün = <b>4 çeyrek</b><small>2 çeyrek = 1 yarım</small>`); }
          else { const m = pr.length !== kisi ? `${pr.length} parça oldu. ${kisi} arkadaş var.` : 'Parçalar eşit değil. Biri büyük, biri küçük kaldı.'; sec = []; zaman(() => { ciz(); }, 1400); ctx.yanlis(m + (lvl === 1 ? ' Pastanın tam ortasından geçen iki çizgi seç.' : ' Pastanın tam ortasından geçen çizgiyi seç.')); } }); }
      ciz();
      setInstr(lvl === 0 ? (k === 0 ? 'İki arkadaş pastayı eşit paylaşacak. Bıçak hangi çizgiden geçsin? Bir çizgiye dokun.' : 'Pastayı iki arkadaşa eşit böl. Bir çizgi seç.') : (k === 0 ? 'Dört arkadaş pastayı eşit paylaşacak. İki kesim çizgisi seç.' : 'Pastayı dört arkadaşa eşit böl. İki çizgi seç.'));
      if (window.__TEST) window.__coz = () => { sec = secenek.map((c, i) => c.ok ? i : -1).filter(i => i >= 0); if (lvl === 0) kes(); else zaman(kes, 10); };
    } else {
      const tur = ['yarım', 'çeyrek', 'bütün', 'yarım', 'çeyrek', 'yarım'][k], R0 = 100;
      const TIP = { yarim: [[{ d: 'd', o: 0 }], [0]], ceyrek: [[{ d: 'd', o: 0 }, { d: 'y', o: 0 }], [0]], butun: [[], [0]], yanlisYarim: [[{ d: 'd', o: 42 }], [1]], yanlisCeyrek: [[{ d: 'd', o: 35 }, { d: 'y', o: -30 }], [3]], ucCeyrek: [[{ d: 'd', o: 0 }, { d: 'y', o: 0 }], [0, 1, 3]], ikiYarim: [[{ d: 'y', o: 0 }], [0, 1]] };
      const dogru = tur === 'yarım' ? 'yarim' : tur === 'çeyrek' ? 'ceyrek' : 'butun';
      const ceL = { yarim: ['ceyrek', 'yanlisYarim', 'ucCeyrek'], ceyrek: ['yanlisCeyrek', 'yarim', 'ucCeyrek'], butun: ['ucCeyrek', 'yarim', 'ceyrek'] }[dogru];
      const tabaklar = shuffle([dogru, ...shuffle(ceL).slice(0, 2)]), sek = pick(['daire', 'kare']);
      let s = arka() + `<g transform="translate(600 150)">${resimDaire(pick(['kedi', 'tavuk', 'kopek', 'kuzu']), 46, '#f2546b')}<g transform="translate(0 -6)"></g></g><g transform="translate(600 76)">${balon(`${BUYUK(tur)} pasta lütfen!`, 26)}</g>`;
      s += tabaklar.map((t, i) => { const [kc, kal] = TIP[t], x = 230 + i * 320, y = 400, pr = parcalar(kc, sek, R0);
        return `<g class="tabak" data-t="${t}" transform="translate(${x} ${y})"><ellipse cy="${R0 + 14}" rx="${R0 + 50}" ry="24" fill="#fff" stroke="#e5b8c4" stroke-width="4"/><ellipse rx="${R0 + 40}" ry="${R0 + 30}" fill="#fff" opacity=".001"/>${pr.map((p, j) => kal.includes(j) ? parcaCiz(sek, R0, p, kc.length ? 8 : 0, `tb${i}${j}`) : `<g opacity=".35"><clipPath id="tz${i}${j}"><rect x="${p[0]}" y="${p[2]}" width="${p[1] - p[0]}" height="${p[3] - p[2]}"/></clipPath><g clip-path="url(#tz${i}${j})">${sek === 'daire' ? `<circle r="${R0}" fill="none" stroke="#c2577a" stroke-width="3" stroke-dasharray="6 6"/>` : `<rect x="${-R0}" y="${-R0}" width="${2 * R0}" height="${2 * R0}" fill="none" stroke="#7a4a26" stroke-width="3" stroke-dasharray="6 6"/>`}</g></g>`).join('')}</g>`; }).join('');
      sv.innerHTML = s;
      setInstr(`Müşteri ${tur} pasta istiyor. Hangi tabağı vermelisin? Tabağa dokun.`);
      const ac = { yarim: 'Bütün 2 eşit parçaya bölünmüş, 1 parçası duruyor.', ceyrek: 'Bütün 4 eşit parçaya bölünmüş, 1 parçası duruyor.', butun: 'Pasta hiç bölünmemiş.' };
      sv.querySelectorAll('.tabak').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const t = g.dataset.t;
        if (t === dogru) { zipla(g); ctx.dogru(`Doğru! Bu ${tur} pasta.`, `<b>${tur}</b><small>${ac[dogru]}</small>`); }
        else { salla(g); ctx.yanlis(t === 'yanlisYarim' || t === 'yanlisCeyrek' ? 'Bu tabaktaki parça eşit bölünmemiş. Yarım ve çeyrek için parçalar eşit olmalı.' : t === 'ucCeyrek' ? 'Bu tabakta 3 çeyrek var.' : t === 'yarim' ? 'Bu tabakta yarım pasta var.' : t === 'ceyrek' ? 'Bu tabakta çeyrek pasta var.' : 'Bu tabakta bütün pasta var.'); } }));
      if (window.__TEST) window.__coz = () => sv.querySelector(`.tabak[data-t="${dogru}"]`).dispatchEvent(new Event('click'));
    }
  },
};
