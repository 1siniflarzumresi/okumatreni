// Ladin Ormanı — 2. sınıf Matematik haftalık çalışma kâğıtları (MEB 2026-2027 taslak yıllık planı).
// Vizyon: standart test sorusu değil, oyun ve sahne: onluk çubukları, sayı treni, kurbağa atlayışı, terazi, market, saat, kroki.
// 2. sınıf çocuğu yönergeyi kendisi okur; dil kısa ve net. Konu anlatımı: deneme/konu-anlatimi.html#mat
// Üretim: node kaynak/calisma-kagitlari/uret.js m2   (tek hafta: m2:hafta-05)
module.exports = ({ etk, resim, RY, rastgele, numarala }) => {
  const R = t => rastgele(t);
  const karistir = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tam = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const S = (w, h, ic, mm) => `<svg viewBox="0 0 ${w} ${h}" style="width:${mm}mm;height:${(mm * h / w).toFixed(1)}mm;display:block;margin:auto">${ic}</svg>`;
  const kutu = (g = 12) => `<span class="m2k" style="width:${g}mm"></span>`;
  const T = (x, y, s, fs = 16, renk = '#1f2a24', ek = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${fs}" fill="${renk}" ${ek}>${s}</text>`;

  // ---------- çizimler ----------
  const onlukSvg = (n, mm) => { const o = Math.floor(n / 10), b = n % 10; let s = '', x = 4;
    for (let i = 0; i < o; i++) { for (let j = 0; j < 10; j++) s += `<rect x="${x}" y="${4 + j * 11}" width="11" height="11" fill="#9fd3ff" stroke="#1d4e89" stroke-width="1.2"/>`; x += 15; }
    x += 4; for (let k = 0; k < b; k++) s += `<rect x="${x + (k % 2) * 14}" y="${4 + Math.floor(k / 2) * 14}" width="11" height="11" fill="#ffd166" stroke="#a0640a" stroke-width="1.2"/>`;
    if (b) x += 30; return S(Math.max(x, 30), 118, s, mm || Math.max(x, 30) * .28); };
  const CISIM = {
    kup: '<path d="M10 22 L30 12 L52 22 L52 48 L30 58 L10 48 Z M10 22 L30 32 L52 22 M30 32 V58" fill="#d9f0ff" stroke="#1f2a24" stroke-width="2.5" stroke-linejoin="round"/>',
    prizma: '<path d="M4 24 L18 14 L58 14 L44 24 Z" fill="#fff3c4" stroke="#1f2a24" stroke-width="2.5" stroke-linejoin="round"/><path d="M4 24 H44 V52 H4 Z" fill="#ffe08a" stroke="#1f2a24" stroke-width="2.5"/><path d="M44 24 L58 14 V42 L44 52 Z" fill="#ffd166" stroke="#1f2a24" stroke-width="2.5" stroke-linejoin="round"/>',
    kure: '<circle cx="30" cy="32" r="24" fill="#ffd6dc" stroke="#1f2a24" stroke-width="2.5"/><ellipse cx="30" cy="32" rx="24" ry="7" fill="none" stroke="#1f2a24" stroke-width="1.5" stroke-dasharray="3 3"/>',
    silindir: '<path d="M12 14 V48 A18 7 0 0 0 48 48 V14" fill="#d8f5e9" stroke="#1f2a24" stroke-width="2.5"/><ellipse cx="30" cy="14" rx="18" ry="7" fill="#d8f5e9" stroke="#1f2a24" stroke-width="2.5"/>',
    koni: '<path d="M30 6 L50 50 A20 7 0 0 1 10 50 Z" fill="#efe6ff" stroke="#1f2a24" stroke-width="2.5" stroke-linejoin="round"/>',
  };
  const CAD = { kup: 'küp', prizma: 'prizma', kure: 'küre', silindir: 'silindir', koni: 'koni' };
  const cisim = (ad, mm = 16) => S(62, 62, CISIM[ad], mm);
  const SEKIL = { ucgen: (x, y, s, f) => `<polygon points="${x + s / 2},${y} ${x + s},${y + s} ${x},${y + s}" fill="${f}" stroke="#1f2a24" stroke-width="2.5"/>`,
    kare: (x, y, s, f) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${f}" stroke="#1f2a24" stroke-width="2.5"/>`,
    dikdortgen: (x, y, s, f) => `<rect x="${x - s * .3}" y="${y + s * .2}" width="${s * 1.6}" height="${s * .6}" fill="${f}" stroke="#1f2a24" stroke-width="2.5"/>`,
    daire: (x, y, s, f) => `<circle cx="${x + s / 2}" cy="${y + s / 2}" r="${s / 2}" fill="${f}" stroke="#1f2a24" stroke-width="2.5"/>` };
  const saatSvg = (h, m, mm = 30, bos) => { let s = '<circle cx="60" cy="60" r="55" fill="#fff" stroke="#1f2a24" stroke-width="4"/>';
    for (let i = 1; i <= 12; i++) { const a = i * Math.PI / 6; s += T(60 + 42 * Math.sin(a), 66 - 42 * Math.cos(a), i, 15); s += `<line x1="${60 + 52 * Math.sin(a)}" y1="${60 - 52 * Math.cos(a)}" x2="${60 + 48 * Math.sin(a)}" y2="${60 - 48 * Math.cos(a)}" stroke="#1f2a24" stroke-width="2"/>`; }
    if (!bos) { const ay = (h % 12 + m / 60) * Math.PI / 6, ym = m * Math.PI / 30;
      s += `<line x1="60" y1="60" x2="${60 + 25 * Math.sin(ay)}" y2="${60 - 25 * Math.cos(ay)}" stroke="#e63946" stroke-width="6" stroke-linecap="round"/><line x1="60" y1="60" x2="${60 + 38 * Math.sin(ym)}" y2="${60 - 38 * Math.cos(ym)}" stroke="#3a86ff" stroke-width="4" stroke-linecap="round"/>`; }
    return S(120, 120, s + '<circle cx="60" cy="60" r="4" fill="#1f2a24"/>', mm); };
  const kesirSvg = (tip, parca, esit = true, mm = 26) => { let s = '';
    if (tip === 'daire') { s += '<circle cx="50" cy="50" r="44" fill="#fff" stroke="#1f2a24" stroke-width="3"/>';
      const acilar = esit ? Array.from({ length: parca }, (_, i) => i * 360 / parca) : [0, 140, 250, 300].slice(0, parca);
      acilar.forEach(a => { const r = (a - 90) * Math.PI / 180; s += `<line x1="50" y1="50" x2="${50 + 44 * Math.cos(r)}" y2="${50 + 44 * Math.sin(r)}" stroke="#1f2a24" stroke-width="2.5"/>`; });
      if (parca === 2) s = '<circle cx="50" cy="50" r="44" fill="#fff" stroke="#1f2a24" stroke-width="3"/>' + (esit ? '<line x1="50" y1="6" x2="50" y2="94" stroke="#1f2a24" stroke-width="2.5"/>' : '<line x1="70" y1="10" x2="70" y2="90" stroke="#1f2a24" stroke-width="2.5"/>');
    } else { s += '<rect x="8" y="18" width="84" height="64" fill="#fff" stroke="#1f2a24" stroke-width="3"/>';
      const kes = esit ? Array.from({ length: parca - 1 }, (_, i) => 8 + 84 * (i + 1) / parca) : [30, 58, 76].slice(0, parca - 1);
      kes.forEach(x => { s += `<line x1="${x}" y1="18" x2="${x}" y2="82" stroke="#1f2a24" stroke-width="2.5"/>`; }); }
    return S(100, 100, s, mm); };
  // para: sayı → kâğıt para (TL); '50kr' → madenî kuruş; '1TL' → madenî lira
  const para = (d, mm) => {
    if (typeof d === 'number') return S(110, 56, `<rect x="2" y="2" width="106" height="52" rx="6" fill="${{ 5: '#e9d8fd', 10: '#ffd6dc', 20: '#d8f5e9', 50: '#ffe8cc', 100: '#d0ebff', 200: '#f3d9fa' }[d]}" stroke="#1f2a24" stroke-width="2"/><circle cx="26" cy="28" r="14" fill="none" stroke="#1f2a24" stroke-width="1.5" stroke-dasharray="3 2"/>${T(72, 36, d + ' TL', 20)}`, mm || 24);
    const lira = d === '1TL'; d = String(d).replace('kr', ''); return S(60, 60, `<circle cx="30" cy="30" r="27" fill="${lira ? '#d9dde2' : '#f2d27a'}" stroke="#1f2a24" stroke-width="2"/><circle cx="30" cy="30" r="21" fill="none" stroke="#1f2a24" stroke-width="1" opacity=".5"/>${T(30, 36, lira ? '1 TL' : d, lira ? 14 : 17)}${lira ? '' : T(30, 50, 'kr', 10)}`, mm || 13); };
  const terazi = (sol, sag, mm = 80) => S(240, 120, `<line x1="120" y1="30" x2="120" y2="108" stroke="#8e5b2b" stroke-width="6"/><rect x="90" y="106" width="60" height="8" rx="3" fill="#8e5b2b"/><line x1="20" y1="34" x2="220" y2="34" stroke="#8e5b2b" stroke-width="6" stroke-linecap="round"/><circle cx="120" cy="30" r="7" fill="#f4a100"/>
    <path d="M10 44 H100 L88 64 H22 Z" fill="#ffe08a" stroke="#8e5b2b" stroke-width="2"/><path d="M140 44 H230 L218 64 H152 Z" fill="#ffe08a" stroke="#8e5b2b" stroke-width="2"/><line x1="30" y1="34" x2="30" y2="44" stroke="#8e5b2b" stroke-width="2"/><line x1="80" y1="34" x2="80" y2="44" stroke="#8e5b2b" stroke-width="2"/><line x1="160" y1="34" x2="160" y2="44" stroke="#8e5b2b" stroke-width="2"/><line x1="210" y1="34" x2="210" y2="44" stroke="#8e5b2b" stroke-width="2"/>
    ${T(55, 90, sol, 20)}${T(185, 90, sag, 20)}`, mm);
  const cetvelSvg = (cm, nesne, uz, mm = 150) => { const k = 20; let s = `<rect x="4" y="60" width="${cm * k + 16}" height="34" rx="4" fill="#fff3c4" stroke="#a0640a" stroke-width="2"/>`;
    for (let i = 0; i <= cm; i++) { s += `<line x1="${12 + i * k}" y1="60" x2="${12 + i * k}" y2="74" stroke="#a0640a" stroke-width="2"/>${T(12 + i * k, 90, i, 11, '#a0640a')}`; }
    s += `<image href="${RY(nesne)}" x="12" y="6" width="${uz * k}" height="50" preserveAspectRatio="none"/>`;
    return S(cm * k + 24, 98, s, mm); };

  // ---------- etkinlikler ----------
  const cisimEsle = (t) => { const L = [['top', 'kure'], ['kutu', 'prizma'], ['dondurma', 'koni'], ['bardak', 'silindir'], ['hediye', 'kup']]; const sag = karistir(L.map(x => x[1]), R(t));
    return etk(0, 'Her nesneyi benzediği geometrik cisimle çizgiyle eşleştir.',
      `<div class="m2-esle"><div>${L.map(([a]) => `<span>${resim(a)}<i></i></span>`).join('')}</div><div>${sag.map(c => `<span><i></i>${cisim(c, 15)}<b class="ttkb">${CAD[c]}</b></span>`).join('')}</div></div>`); };
  const cisimTablo = (yonerge, cisimler) => etk(0, yonerge,
    `<div class="m2-ctablo">${cisimler.map(c => `<div>${cisim(c, 22)}<b class="ttkb">${CAD[c]}</b><span><small class="ttkb">Kaç düz yüzü var?</small>${kutu(11)}</span><span><small class="ttkb">Yuvarlanır mı?</small><em class="ttkb">evet · hayır</em></span></div>`).join('')}</div>`);
  const kule = (t) => { const r = R(t), dizi = ['kup', 'silindir', 'prizma', 'kup', 'koni', 'silindir', 'kure', 'prizma']; let s = '', x = 0;
    const yap = [[0, ['prizma', 'kup', 'koni']], [1, ['silindir', 'silindir', 'kure']], [2, ['kup', 'prizma', 'kup', 'koni']], [3, ['prizma', 'silindir', 'koni']]];
    yap.forEach(([i, l]) => { l.forEach((c, j) => { s += `<g transform="translate(${20 + i * 90} ${250 - (j + 1) * 58})">${CISIM[c]}</g>`; }); });
    return etk(0, 'Cisim kuleleri! Kulelerde her cisimden kaç tane kullanıldığını say ve tabloya yaz.',
      `<div class="m2-kule">${S(380, 260, '<rect y="250" width="380" height="10" fill="#8e5b2b"/>' + s, 92)}<table class="m2-tablo ttkb">${['kup', 'prizma', 'silindir', 'koni', 'kure'].map(c => `<tr><td>${cisim(c, 9)}</td><td>${CAD[c]}</td><td>${kutu(10)}</td></tr>`).join('')}</table></div>`); };
  const sekilResim = (ad) => { const R2 = { ev: [['kare', 40, 60, 80, '#9fd3ff'], ['ucgen', 30, 0, 100, '#ff8fa3'], ['dikdortgen', 70, 100, 26, '#ffd166'], ['daire', 140, 4, 22, '#ffd166']],
      robot: [['kare', 50, 10, 60, '#c7b8ff'], ['dikdortgen', 50, 80, 60, '#9fd3ff'], ['daire', 60, 24, 14, '#fff'], ['daire', 86, 24, 14, '#fff'], ['kare', 34, 160, 26, '#ffd166'], ['kare', 100, 160, 26, '#ffd166'], ['ucgen', 70, -16, 20, '#ff8fa3']],
      roket: [['ucgen', 50, 0, 60, '#ff8fa3'], ['dikdortgen', 62, 80, 36, '#9fd3ff'], ['kare', 50, 120, 60, '#9fd3ff'], ['daire', 68, 132, 24, '#fff'], ['ucgen', 20, 150, 30, '#ffd166'], ['ucgen', 110, 150, 30, '#ffd166']] }[ad];
    return S(200, 200, R2.map(([k, x, y, s, f]) => SEKIL[k](x, y + 10, s, f)).join(''), 58); };
  const sekilModel = (adlar) => etk(0, 'Şekil resimleri! Her resimde kaç üçgen, kare, dikdörtgen ve daire kullanılmış? Say ve yaz.',
    `<div class="m2-model">${adlar.map(a => `<div>${sekilResim(a)}<table class="m2-tablo ttkb">${[['ucgen', 'üçgen'], ['kare', 'kare'], ['dikdortgen', 'dikdörtgen'], ['daire', 'daire']].map(([k, n]) => `<tr><td>${S(60, 60, SEKIL[k](12, 12, 36, '#eef5ff'), 7)}</td><td>${n}</td><td>${kutu(9)}</td></tr>`).join('')}</table></div>`).join('')}</div>`);
  const sekilCiz = () => etk(0, 'Noktalı kâğıtta şekil çiz! Bir üçgen, bir kare ve bir dikdörtgen çiz. Sonra bunları birleştirerek bir resim yap.',
    `<div class="m2-nokta">${S(300, 140, Array.from({ length: 8 * 18 }, (_, i) => `<circle cx="${10 + (i % 18) * 16.6}" cy="${10 + Math.floor(i / 18) * 17}" r="2" fill="#6b7a70"/>`).join(''), 176)}</div>`);
  const dondur = (t) => { const r = R(t); const satirlar = [['kare', 0], ['ucgen', 0], ['dikdortgen', 0]];
    return etk(0, 'Şekil dedektifi! Soldaki şeklin aynısını bul. Döndürülmüş ya da büyütülmüş olabilir. Aynı şekilleri boya.',
      `<div class="m2-dondur">${satirlar.map(([k], i) => { const sec = karistir([[k, 30], [k, 0, 1.4], ['daire', 0], [k === 'kare' ? 'ucgen' : 'kare', 15], [k, 60, .7]], R(t + i));
        return `<div><span class="m2-ana">${S(70, 70, SEKIL[k](15, 15, 40, '#ffd166'), 18)}</span>${sec.map(([s, a, b = 1]) => `<span>${S(80, 80, `<g transform="rotate(${a} 40 40) translate(${40 - 20 * b} ${40 - 20 * b}) scale(${b})">${SEKIL[s](0, 0, 40, '#fff')}</g>`, 17)}</span>`).join('')}</div>`; }).join('')}</div>`); };
  const sivi = () => etk(0, 'Su dolu sürahiyi farklı kaplarla boşaltıyoruz. Kaç kap dolar? Önce tahmin et, sonra resme bakıp say.',
    `<div class="m2-sivi">${[['bardak', 4], ['fincan', 8], ['kova', 1]].map(([k, n]) => `<div><span>${resim('sise')}</span><b>=</b><span class="m2-kaplar">${Array.from({ length: n }, () => resim(k)).join('')}</span><span class="m2-th"><small class="ttkb">Tahminim</small>${kutu(11)}<small class="ttkb">Saydım</small>${kutu(11)}</span></div>`).join('')}</div>`);
  const siviKarsilastir = () => etk(0, 'Hangi kapla ölçersek daha çok sayarız? Doğru cevabı daire içine al.',
    `<div class="m2-secim ttkb">${[['Kovayı bardakla mı, kaşıkla mı doldurursak daha çok sayarız?', 'bardakla', 'kaşıkla'], ['Küveti kovayla mı, bardakla mı doldurursak daha az sayarız?', 'kovayla', 'bardakla'], ['Aynı sürahiyi Ali 6 bardak, Ece 3 bardak buldu. Kimin bardağı büyük?', 'Ali\'nin', 'Ece\'nin']].map(([s, a, b]) => `<div><p>${s}</p><span>${a}</span><span>${b}</span></div>`).join('')}</div>`);

  const onlukOku = (sayilar) => etk(0, 'Onluk çubuklarını ve birlik küplerini say. Sayıyı kutulara yaz.',
    `<div class="m2-onluk">${sayilar.map(n => `<div>${onlukSvg(n, Math.min(48, (Math.floor(n / 10) * 15 + 40) * .28))}<span class="ttkb">${kutu(9)} onluk ${kutu(9)} birlik = ${kutu(13)}</span></div>`).join('')}</div>`);
  const onlukCiz = (sayilar) => etk(0, 'Sayıyı onluk çubuğu ve birlik küpü çizerek göster. (Çubuk: uzun dikdörtgen, küp: küçük kare)',
    `<div class="m2-ciz">${sayilar.map(n => `<div><b class="ttkb">${n}</b><span></span></div>`).join('')}</div>`);
  const okunus = (liste) => etk(0, 'Sayıları okunuşlarıyla eşleştir.', (() => { const sag = karistir(liste.map(x => x[1]), R(liste[0][0]));
    return `<div class="m2-esle yazi"><div>${liste.map(([n]) => `<span class="ttkb">${n}<i></i></span>`).join('')}</div><div>${sag.map(s => `<span class="ttkb"><i></i>${s}</span>`).join('')}</div></div>`; })());
  const cozumle = (sayilar) => etk(0, 'Sayıları çözümle. Basamak tablosunu doldur.',
    `<table class="m2-cozum ttkb"><tr><th>Sayı</th><th>Onlar</th><th>Birler</th><th>Çözümleme</th></tr>${sayilar.map(n => `<tr><td><b>${n}</b></td><td>${kutu(10)}</td><td>${kutu(10)}</td><td>${kutu(12)} + ${kutu(12)}</td></tr>`).join('')}</table>`);
  const basamakAvi = (t) => { const r = R(t); const L = Array.from({ length: 6 }, () => tam(r, 21, 98));
    return etk(0, 'Basamak avı! Altı çizili rakamın basamak değerini yaz.',
      `<div class="m2-avi ttkb">${L.map((n, i) => { const s = String(n); return `<div><span>${i % 2 ? s[0] + '<u>' + s[1] + '</u>' : '<u>' + s[0] + '</u>' + s[1]}</span>→${kutu(13)}</div>`; }).join('')}</div>`); };
  const karsilastir = (t) => { const r = R(t); const L = Array.from({ length: 8 }, (_, i) => { const a = tam(r, 12, 98); const b = i === 3 ? a : i % 3 === 0 ? (a % 10) * 10 + Math.floor(a / 10) || a + 1 : tam(r, 12, 98); return [a, b]; });
    return etk(0, 'Timsah iki sayıdan büyüğünü yemek ister! Aradaki daireye > , < ya da = yaz.',
      `<div class="m2-kars ttkb">${L.map(([a, b]) => `<div><b>${a}</b><i></i><b>${b}</b></div>`).join('')}</div>`); };
  const trenSirala = (t, buyuktenMi) => { const r = R(t); const L = karistir(Array.from({ length: 5 }, () => tam(r, 10, 99)), r);
    return etk(0, `Sayı treni! Sayıları ${buyuktenMi ? 'büyükten küçüğe' : 'küçükten büyüğe'} sıralayıp vagonlara yaz.`,
      `<div class="m2-yolcu ttkb">${L.map(n => `<span>${n}</span>`).join('')}</div><div class="m2-tren">${S(330, 70, `<rect x="4" y="12" width="44" height="40" rx="6" fill="#e63946"/><rect x="14" y="2" width="12" height="14" fill="#1f2a24"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${58 + i * 54}" y="14" width="48" height="38" rx="5" fill="#fff" stroke="#3a86ff" stroke-width="3"/><circle cx="${70 + i * 54}" cy="58" r="6" fill="#1f2a24"/><circle cx="${94 + i * 54}" cy="58" r="6" fill="#1f2a24"/>`).join('')}<circle cx="16" cy="58" r="7" fill="#1f2a24"/><circle cx="38" cy="58" r="7" fill="#1f2a24"/>`, 176)}</div>`); };
  const komsu = (t) => { const r = R(t);
    return etk(0, 'Sayı evleri! Her sayının önündeki ve arkasındaki komşusunu yaz.',
      `<div class="m2-komsu ttkb">${Array.from({ length: 6 }, () => tam(r, 11, 98)).map(n => `<div>${kutu(12)}<b>${n}</b>${kutu(12)}</div>`).join('')}</div>`); };
  const kurbaga = (bas, adim, n, bosluklar, yonerge) => { const k = 172 / n; let s = `<line x1="4" y1="70" x2="${n * k * 1 + 26}" y2="70" stroke="#1f2a24" stroke-width="2"/>`;
    for (let i = 0; i <= n; i++) { const x = 10 + i * k * .98, v = bas + i * adim; s += `<line x1="${x}" y1="63" x2="${x}" y2="77" stroke="#1f2a24" stroke-width="2"/>` + (bosluklar.includes(i) ? `<rect x="${x - 11}" y="80" width="22" height="18" rx="3" fill="#fff" stroke="#3a86ff" stroke-width="1.5"/>` : T(x, 94, v, 13));
      if (i < n) s += `<path d="M${x} 62 Q${x + k * .49} 30 ${x + k * .98} 62" fill="none" stroke="#12b886" stroke-width="2"/>`; }
    s += `<image href="${RY('kurbaga')}" x="0" y="20" width="26" height="26"/>`;
    return etk(0, yonerge || `Kurbağa ${adim > 0 ? adim + '’er ileri' : -adim + '’er geri'} zıplıyor. Boş kutulara sayıları yaz.`, S(n * k + 30, 104, s, 178)); };
  const oruntuSayi = (liste) => etk(0, 'Örüntünün kuralını bul, boşlukları doldur ve kuralı yaz.',
    `<div class="m2-oruntu ttkb">${liste.map(d => `<div>${d.map(x => x === null ? kutu(12) : `<b>${x}</b>`).join('<em>,</em>')}<span>Kural: ${kutu(22)}</span></div>`).join('')}</div>`);
  const oruntuSekil = () => { const F = { u: SEKIL.ucgen(6, 6, 28, '#ff8fa3'), k: SEKIL.kare(6, 6, 28, '#9fd3ff'), d: SEKIL.daire(6, 6, 28, '#ffd166') };
    const L = [['u', 'k', 'k', 'u', 'k', 'k', 'u'], ['d', 'u', 'd', 'u', 'd', 'u', 'd'], ['k', 'k', 'd', 'd', 'k', 'k', 'd']];
    return etk(0, 'Şekil örüntüsü! Sıradaki iki şekli çiz.', `<div class="m2-soruntu">${L.map(l => `<div>${l.map(x => S(40, 40, F[x], 10)).join('')}<span></span><span></span></div>`).join('')}</div>`); };
  const buyuyen = () => etk(0, 'Büyüyen örüntü! Her adımda kaç kare ekleniyor? 4. adımı çiz, kaç kare olduğunu yaz.',
    `<div class="m2-buyu">${[1, 3, 5].map((n, i) => `<div>${S(120, 60, Array.from({ length: n }, (_, j) => `<rect x="${4 + j * 16}" y="30" width="14" height="14" fill="#9fd3ff" stroke="#1d4e89"/>`).join(''), 30)}<b class="ttkb">${i + 1}. adım: ${n}</b></div>`).join('')}<div><span class="m2-bos"></span><b class="ttkb">4. adım: ${kutu(9)}</b></div></div>`);
  const tahmin = (t) => { const r = R(t); const L = [['cilek', tam(r, 22, 35)], ['yildiz', tam(r, 30, 48)]];
    return etk(0, 'Tahmin kavanozu! Önce saymadan tahmin et. Sonra 10’ar 10’ar daire içine alarak say.',
      `<div class="m2-tahmin">${L.map(([a, n]) => `<div>${S(200, 160, Array.from({ length: n }, (_, i) => `<image href="${RY(a)}" x="${8 + (i * 37) % 176}" y="${8 + Math.floor(i * 37 / 176) * 15 + (i % 3) * 3}" width="17" height="17"/>`).join(''), 70)}<span class="ttkb">Tahminim: ${kutu(12)}</span><span class="ttkb">Saydım: ${kutu(12)}</span></div>`).join('')}</div>`); };

  const dikey = (a, b, op) => `<div class="m2-dikey ttkb"><span class="m2-elde"></span><span>${String(a).padStart(2, ' ').split('').map(c => `<i>${c.trim()}</i>`).join('')}</span><span><em>${op}</em>${String(b).padStart(2, ' ').split('').map(c => `<i>${c.trim()}</i>`).join('')}</span><span class="m2-cizgi"></span><span><i class="b"></i><i class="b"></i></span></div>`;
  const toplamaElde = (t, n = 8) => { const r = R(t); const L = Array.from({ length: n }, () => { let a, b; do { a = tam(r, 12, 68); b = tam(r, 11, 29); } while ((a % 10) + (b % 10) < 10 || a + b > 99); return [a, b]; });
    return etk(0, 'Elde avcısı! Birler basamağından başla. Eldeni üstteki küçük kutuya yaz.', `<div class="m2-islemler">${L.map(([a, b]) => dikey(a, b, '+')).join('')}</div>`); };
  const cikarmaBoz = (t, n = 8) => { const r = R(t); const L = Array.from({ length: n }, () => { let a, b; do { a = tam(r, 31, 95); b = tam(r, 12, 49); } while ((a % 10) >= (b % 10) || b >= a); return [a, b]; });
    return etk(0, 'Onluk bozma! Birlikler yetmiyorsa bir onluğu boz. Bozduğun onluğu çizip düzelt.', `<div class="m2-islemler">${L.map(([a, b]) => dikey(a, b, '−')).join('')}</div>`); };
  const problem = (liste) => etk(0, 'Problemi oku. Anla, planla, çöz ve kontrol et.',
    `<div class="m2-problem">${liste.map(([ad, metin]) => `<div><span>${resim(ad)}</span><div><p class="ttkb">${metin}</p><div class="m2-adim ttkb"><span>İşlem: ${kutu(34)}</span><span>Cevap: ${kutu(20)}</span><span>Kontrol: ${kutu(30)}</span></div></div></div>`).join('')}</div>`);
  const problemKur = (resimler) => etk(0, 'Problem yazarı sensin! Resme bak, bir toplama ya da çıkarma problemi yaz ve çöz.',
    `<div class="m2-pkur">${resimler.map(a => `<div><span>${resim(a)}</span><div class="m2-cizgiler">${'<i></i>'.repeat(3)}</div></div>`).join('')}</div>`);
  const market = (urunler, t) => { const r = R(t);
    return etk(0, 'Ladin Market! Fiyatlara bak, soruları cevapla.',
      `<div class="m2-market">${urunler.map(([a, f]) => `<div><span>${resim(a)}</span><b class="ttkb">${f} TL</b></div>`).join('')}</div><div class="m2-soru ttkb">${[`1 ${urunler[0][2]} ve 1 ${urunler[1][2]} alırsam kaç lira öderim?`, 'En pahalı ürün ile en ucuz ürün arasında kaç lira fark var?', `Cebimde 50 lira var. 1 ${urunler[2][2]} alırsam kaç liram kalır?`, `3 ${urunler[3][2]} kaç lira eder?`].map(s => `<p>${s} ${kutu(18)}</p>`).join('')}</div>`); };
  const yuvarla = (t) => { const r = R(t); const L = Array.from({ length: 6 }, () => [tam(r, 11, 59), tam(r, 11, 39)]);
    return etk(0, 'Hızlı tahmin! Sayıları en yakın onluğa yuvarla, sonucu tahmin et. Sonra gerçek sonucu bul.',
      `<table class="m2-cozum ttkb"><tr><th>İşlem</th><th>Yuvarla</th><th>Tahmin</th><th>Gerçek</th></tr>${L.map(([a, b]) => `<tr><td><b>${a} + ${b}</b></td><td>${kutu(9)} + ${kutu(9)}</td><td>${kutu(11)}</td><td>${kutu(11)}</td></tr>`).join('')}</table>`); };
  const zihin = (t) => { const r = R(t); const L = Array.from({ length: 12 }, (_, i) => { const a = tam(r, 2, 8) * 10, b = i % 2 ? tam(r, 1, 9) : tam(r, 1, 3) * 10; return i % 3 === 2 ? `${a} − ${Math.min(b, a - 10)}` : `${a} + ${b}`; });
    return etk(0, 'Zihin yarışı! Kâğıt kalem kullanmadan hesapla, sonucu yaz.', `<div class="m2-zihin ttkb">${L.map(s => `<span><b>${s}</b> = ${kutu(13)}</span>`).join('')}</div>`); };
  const aile = (liste) => etk(0, 'İşlem ailesi! Üç sayıyla iki toplama ve iki çıkarma işlemi yaz.',
    `<div class="m2-aile">${liste.map(([a, b, c]) => `<div>${S(120, 100, `<polygon points="60,6 114,94 6,94" fill="#fff6dc" stroke="#f4a100" stroke-width="3"/>${T(60, 44, c, 22)}${T(32, 84, a, 20)}${T(88, 84, b, 20)}`, 30)}<div class="ttkb">${[0, 1, 2, 3].map(() => `<span>${kutu(8)} ${'○'} ${kutu(8)} = ${kutu(8)}</span>`).join('')}</div></div>`).join('')}</div>`);
  const eksik = (t) => { const r = R(t); const L = Array.from({ length: 8 }, (_, i) => { const a = tam(r, 3, 40), b = tam(r, 3, 40); return i % 2 ? `___ + ${b} = ${a + b}` : `${a + b} − ___ = ${a}`; });
    return etk(0, 'Kayıp sayılar! Ters işlemi kullanarak boşluğa gelen sayıyı bul.', `<div class="m2-zihin ttkb">${L.map(s => `<span>${s.replace('___', kutu(12))}</span>`).join('')}</div>`); };
  const carpGrup = (liste) => etk(0, 'Gruplara bak. Tekrarlı toplama ve çarpma olarak yaz.',
    `<div class="m2-carp">${liste.map(([ad, g, n]) => `<div><span class="m2-gruplar">${Array.from({ length: g }, () => `<span>${Array.from({ length: n }, () => resim(ad)).join('')}</span>`).join('')}</span><span class="ttkb">${Array.from({ length: g }, () => kutu(8)).join(' + ')} = ${kutu(9)}</span><span class="ttkb">${kutu(8)} × ${kutu(8)} = ${kutu(9)}</span></div>`).join('')}</div>`);
  const carpCiz = (liste) => etk(0, 'Çarpma işlemini resim çizerek göster, sonucu yaz.',
    `<div class="m2-ciz">${liste.map(s => `<div><b class="ttkb">${s} = ${kutu(10)}</b><span></span></div>`).join('')}</div>`);
  const paylas = (liste) => etk(0, 'Paylaştırma! Nesneleri tabaklara eşit dağıt (çizerek). Her tabağa kaç tane düştüğünü yaz.',
    `<div class="m2-pay">${liste.map(([ad, n, k]) => `<div><span class="m2-yigin">${Array.from({ length: n }, () => resim(ad)).join('')}</span><span class="m2-tabaklar">${Array.from({ length: k }, () => '<i></i>').join('')}</span><span class="ttkb">${n} ÷ ${k} = ${kutu(10)}</span></div>`).join('')}</div>`);
  const grupla = (liste) => etk(0, 'Gruplama! Nesneleri istenen sayıda daire içine alarak grupla. Kaç grup oldu?',
    `<div class="m2-pay">${liste.map(([ad, n, k]) => `<div><span class="m2-yigin">${Array.from({ length: n }, () => resim(ad)).join('')}</span><span class="ttkb">${k}’li gruplar:</span><span class="ttkb">${n} ÷ ${k} = ${kutu(10)}</span></div>`).join('')}</div>`);
  const carpimTablosuMini = () => etk(0, 'Ritmik sayarak çarpma tablosunu doldur.',
    `<table class="m2-ctab ttkb"><tr><th>×</th>${[1, 2, 3, 4, 5].map(n => `<th>${n}</th>`).join('')}</tr>${[1, 2, 3, 4, 5].map(a => `<tr><th>${a}</th>${[1, 2, 3, 4, 5].map(b => `<td>${(a + b) % 3 === 0 ? a * b : ''}</td>`).join('')}</tr>`).join('')}</table>`);
  const teraziler = (liste) => etk(0, 'Teraziler dengede! İki taraf eşit olsun diye boşluğa gelen sayıyı yaz.',
    `<div class="m2-terazi">${liste.map(([a, b]) => `<div>${terazi(a, b.replace('__', '?'), 72)}<span class="ttkb">? = ${kutu(12)}</span></div>`).join('')}</div>`);
  const esitMi = (liste) => etk(0, 'Eşit mi? Doğruysa ✓, yanlışsa ✗ işaretle.',
    `<div class="m2-zihin ttkb">${liste.map(s => `<span><b>${s}</b> <i class="m2-dy"></i></span>`).join('')}</div>`);
  const kesirBoya = () => etk(0, 'Kesir boyama! İstenen kadarını boya.',
    `<div class="m2-kesir">${[['daire', 2, 'yarım'], ['kare', 4, 'çeyrek'], ['daire', 4, 'yarım'], ['kare', 2, 'bütün'], ['daire', 4, 'üç çeyrek'], ['kare', 4, 'yarım']].map(([tip, p, s]) => `<div>${kesirSvg(tip, p, true, 26)}<b class="ttkb">${s}</b></div>`).join('')}</div>`);
  const esitParca = () => etk(0, 'Eşit parçalara mı bölünmüş? Eşitse ✓, eşit değilse ✗ işaretle.',
    `<div class="m2-kesir">${[['daire', 2, true], ['daire', 2, false], ['kare', 4, true], ['kare', 3, false], ['daire', 4, true], ['daire', 4, false]].map(([tip, p, e]) => `<div>${kesirSvg(tip, p, e, 24)}<i class="m2-dy"></i></div>`).join('')}</div>`);
  const kesirProblem = () => etk(0, 'Kesir problemleri. Çizerek çöz.',
    `<div class="m2-soru ttkb">${['Bir pizzanın yarısını yedim. Kaç çeyrek yemiş oldum?', 'Bir elmayı 4 eşit parçaya böldüm. 1 parçasını kardeşime verdim. Kardeşim elmanın ne kadarını aldı?', '8 kalemin yarısını arkadaşıma verdim. Kaç kalem verdim?', '12 cevizin çeyreğini yedim. Kaç ceviz yedim?'].map(s => `<p>${s} ${kutu(18)}</p>`).join('')}</div>`);
  const paraSay = (liste) => etk(0, 'Kumbaradaki paraları say. Toplam kaç lira ya da kuruş olduğunu yaz.',
    `<div class="m2-para">${liste.map(L => `<div><span>${L.map(d => para(d)).join('')}</span><b class="ttkb">= ${kutu(16)}</b></div>`).join('')}</div>`);
  const paraUstu = (liste) => etk(0, 'Para üstü! Ödediğin paradan fiyatı çıkar.',
    `<table class="m2-cozum ttkb"><tr><th>Ürün</th><th>Fiyat</th><th>Verdiğim</th><th>Para üstü</th></tr>${liste.map(([a, f, v]) => `<tr><td>${resim(a)}</td><td>${f} TL</td><td>${v} TL</td><td>${kutu(14)}</td></tr>`).join('')}</table>`);
  const saatOku = (liste) => etk(0, 'Saatler kaçı gösteriyor? Yaz.', `<div class="m2-saat">${liste.map(([h, m]) => `<div>${saatSvg(h, m, 30)}<span>${kutu(26)}</span></div>`).join('')}</div>`);
  const saatCiz = (liste) => etk(0, 'Akrebi (kısa, kırmızı) ve yelkovanı (uzun, mavi) çizerek saati göster.', `<div class="m2-saat">${liste.map(s => `<div>${saatSvg(0, 0, 30, true)}<b class="ttkb">${s}</b></div>`).join('')}</div>`);
  const gunum = () => etk(0, 'Günüm! Her etkinliğin saatini yaz ve saatini çiz.',
    `<div class="m2-saat">${[['uyu', 'Uyanırım'], ['okul', 'Okula giderim'], ['sofra', 'Akşam yemeği'], ['yatak', 'Uyurum']].map(([a, s]) => `<div><span class="m2-r">${resim(a)}</span>${saatSvg(0, 0, 24, true)}<b class="ttkb">${s}</b>${kutu(20)}</div>`).join('')}</div>`);
  const zamanBirim = () => { const L = [['1 saat', '7 gün'], ['1 gün', '60 dakika'], ['1 hafta', '12 ay'], ['1 yıl', '24 saat']]; const sag = karistir(L.map(x => x[1]), R(29));
    return etk(0, 'Zaman birimlerini eşleştir.', `<div class="m2-esle yazi"><div>${L.map(([a]) => `<span class="ttkb">${a}<i></i></span>`).join('')}</div><div>${sag.map(s => `<span class="ttkb"><i></i>${s}</span>`).join('')}</div></div>`); };
  const cetvelOlc = (liste) => etk(0, 'Cetvelle ölç! Nesnenin boyu kaç santimetre?', `<div class="m2-cetvel">${liste.map(([a, cm]) => `<div>${cetvelSvg(cm + 2, a, cm, 120)}<span class="ttkb">${kutu(12)} cm</span></div>`).join('')}</div>`);
  const birimSec = (liste, yonerge) => etk(0, yonerge || 'Hangi birimle ölçeriz? Doğru birimi daire içine al.',
    `<div class="m2-birim">${liste.map(([a, s, sec]) => `<div><span>${resim(a)}</span><b class="ttkb">${s}</b><span class="ttkb">${sec.map(x => `<em>${x}</em>`).join('')}</span></div>`).join('')}</div>`);
  const agirHafif = (liste) => etk(0, 'Terazide hangisi ağır basar? Ağır olanı daire içine al.',
    `<div class="m2-agir">${liste.map(([a, b]) => `<div><span>${resim(a)}</span><em class="ttkb">mı,</em><span>${resim(b)}</span><em class="ttkb">mı?</em></div>`).join('')}</div>`);
  const kroki = (yonerge, adimlar) => { const N = 8; let s = ''; for (let i = 0; i <= N; i++) s += `<line x1="${10 + i * 30}" y1="10" x2="${10 + i * 30}" y2="190" stroke="#cfe0ff" stroke-width="1.5"/>`;
    for (let j = 0; j <= 6; j++) s += `<line x1="10" y1="${10 + j * 30}" x2="250" y2="${10 + j * 30}" stroke="#cfe0ff" stroke-width="1.5"/>`;
    const yer = [['robot', 0, 5], ['okul', 6, 0], ['agac', 3, 2], ['ev', 7, 4], ['cicek', 1, 1], ['kopru', 4, 5]];
    s += yer.map(([a, x, y]) => `<image href="${RY(a)}" x="${12 + x * 30}" y="${12 + y * 30}" width="26" height="26"/>`).join('');
    return etk(0, yonerge, `<div class="m2-kroki">${S(260, 200, s, 98)}<div class="m2-soru ttkb">${adimlar.map(x => `<p>${x}</p>`).join('')}</div></div>`); };
  const simetriTamamla = () => { let s = ''; for (let i = 0; i < 10 * 9; i++) s += `<circle cx="${10 + (i % 10) * 20}" cy="${10 + Math.floor(i / 10) * 20}" r="2" fill="#9aa59d"/>`;
    const yari = [[[110, 10], [70, 50], [90, 50], [50, 110], [90, 110], [90, 170], [110, 170]], [[110, 30], [50, 50], [50, 130], [110, 150]]];
    return etk(0, 'Simetri ustası! Mavi çizgi simetri doğrusu. Şeklin öbür yarısını çiz.',
      `<div class="m2-simetri">${yari.map(p => S(200, 180, s + `<polyline points="${p.map(q => q.join(',')).join(' ')}" fill="none" stroke="#e63946" stroke-width="4" stroke-linejoin="round"/><line x1="110" y1="0" x2="110" y2="180" stroke="#3a86ff" stroke-width="3" stroke-dasharray="6 5"/>`, 74)).join('')}</div>`); };
  const simetriBul = () => etk(0, 'Hangileri simetrik? Simetrik olanlara simetri doğrusunu çiz.',
    `<div class="m2-birim">${['kelebek', 'yaprak', 'kalem', 'kalp', 'anahtar', 'yildiz'].map(a => `<div><span>${a === 'kelebek' ? S(80, 70, '<path d="M40 35 C10 0 0 30 20 40 C0 50 10 70 40 40 C70 70 80 50 60 40 C80 30 70 0 40 35 Z" fill="#c7b8ff" stroke="#1f2a24" stroke-width="2"/>', 22) : a === 'kalp' ? S(80, 70, '<path d="M40 18 C30 0 0 6 10 30 C18 46 40 62 40 62 C40 62 62 46 70 30 C80 6 50 0 40 18 Z" fill="#ffb3c1" stroke="#1f2a24" stroke-width="2"/>', 22) : resim(a)}</span></div>`).join('')}</div>`);
  const harfSimetri = () => etk(0, 'Harflerde simetri! Simetrik olan harfleri boya.',
    `<div class="m2-harfler ttkb">${'A B C D E F G H K L M N P R T U V Y Z'.split(' ').map(h => `<span>${h}</span>`).join('')}</div>`);
  const cetele = (veri, soru) => { let s = ''; const ikon = Object.keys(veri); let k = 0;
    ikon.forEach(a => { for (let i = 0; i < veri[a]; i++) { s += `<image href="${RY(a)}" x="${8 + (k * 47) % 300}" y="${8 + Math.floor(k * 47 / 300) * 24}" width="22" height="22"/>`; k++; } });
    return etk(0, soru || 'Sınıfın en sevdiği meyveler! Resimleri say, çeteleye işle ve tabloyu doldur.',
      `<div class="m2-veri">${S(320, 8 + Math.ceil(k * 47 / 300) * 24 + 24, s, 92)}<table class="m2-tablo ttkb"><tr><th></th><th>Çetele</th><th>Sayı</th></tr>${ikon.map(a => `<tr><td>${resim(a)}</td><td><span class="m2-cet"></span></td><td>${kutu(10)}</td></tr>`).join('')}</table></div>`); };
  const grafikBoya = (adlar) => etk(0, 'Tablodaki sayılara göre sütun grafiğini boya. Sonra soruları cevapla.',
    `<div class="m2-grafik">${S(240, 170, Array.from({ length: 9 }, (_, j) => `<line x1="40" y1="${150 - j * 16}" x2="230" y2="${150 - j * 16}" stroke="#cfe0ff"/>${T(28, 155 - j * 16, j, 11)}`).join('') + adlar.map((a, i) => `<rect x="${60 + i * 60}" y="22" width="34" height="128" fill="none" stroke="#9db4c8" stroke-dasharray="3 3"/><image href="${RY(a)}" x="${62 + i * 60}" y="152" width="18" height="18"/>`).join(''), 92)}<div class="m2-soru ttkb"><p>En çok sevilen hangisi?</p><p>En az sevilen hangisi?</p><p>En çok ile en az arasında kaç fark var? ${kutu(12)}</p><p>Sınıf için hangi meyveyi alırsın? Neden?</p></div></div>`);
  const anket = () => etk(0, 'Sen de anket yap! Arkadaşlarına iki seçenekli bir soru sor, çetele tut ve sonucu yaz.',
    `<div class="m2-anket ttkb"><p>Sorum: <span class="m2-cizgi2"></span></p><table class="m2-cozum"><tr><th>Seçenek</th><th>Çetele</th><th>Sayı</th></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table><p>Sonuç ve kararım: <span class="m2-cizgi2"></span></p></div>`);

  const yuzluk = (t, bos = 18) => { const r = R(t), gizli = new Set(Array.from({ length: bos }, () => tam(r, 1, 100)));
    return etk(0, 'Yüzlük tablo! Boş kutulara gelen sayıları yaz. Sonra onar onar giden sütunu boya.',
      `<table class="m2-yuz ttkb">${Array.from({ length: 10 }, (_, i) => `<tr>${Array.from({ length: 10 }, (_, j) => { const n = i * 10 + j + 1; return `<td${gizli.has(n) ? ' class="b"' : ''}>${gizli.has(n) ? '' : n}</td>`; }).join('')}</tr>`).join('')}</table>`); };
  const bilmece = (t) => { const r = R(t); const L = Array.from({ length: 4 }, (_, i) => { const o = tam(r, 2, 8), b = tam(r, 1, 8);
      return [`Onlar basamağımda ${o} var, birler basamağım ondan ${o > b ? o - b + ' eksik' : b - o + ' fazla'}. Ben kimim?`, `Ben ${o * 10 + b} sayısının 10 fazlasıyım. Ben kimim?`, `${o} onluk ve ${b} birlikten oluşurum. Ben kimim?`, `${o * 10} ile ${o * 10 + 10} arasındayım, birler basamağım ${b}. Ben kimim?`][i]; });
    return etk(0, 'Sayı bilmeceleri! Bilmeceyi oku, sayıyı bul.', `<div class="m2-soru ttkb">${L.map(s => `<p>${s} ${kutu(16)}</p>`).join('')}</div>`); };
  const hizliIslem = (t, tur) => { const r = R(t); const L = Array.from({ length: 8 }, () => { const a = tam(r, 10, 60), b = tam(r, 2, 30); return tur === '-' ? `${a + b} − ${b}` : `${a} + ${b}`; });
    return etk(0, tur === '-' ? 'Çıkarma köprüsü! İşlemleri yap.' : 'Toplama köprüsü! İşlemleri yap.', `<div class="m2-zihin ttkb">${L.map(s => `<span><b>${s}</b> = ${kutu(13)}</span>`).join('')}</div>`); };

  // ---------- haftalar ----------
  const H = (hafta, unite, baslik, konu, sayfalar) => ({ unite, hafta, baslik, konu, sayfalar });
  const M2 = {
    'hafta-01': H(1, 1, 'Cisim Avcıları', 'Geometrik cisimler', () => [
      numarala([cisimEsle(11), cisimTablo('Cisim kimlik kartı! Her cismin düz yüzlerini say. Yuvarlanabilir mi?', ['kup', 'prizma', 'silindir', 'koni', 'kure'])]),
      numarala([birimSec([['top', 'Top', ['küre', 'küp']], ['kutu', 'Ayakkabı kutusu', ['prizma', 'koni']], ['dondurma', 'Külah', ['koni', 'silindir']], ['bardak', 'Bardak', ['silindir', 'küre']], ['hediye', 'Hediye kutusu', ['küp', 'küre']], ['mum', 'Mum', ['silindir', 'koni']]], 'Nesne hangi cisme benziyor? Doğru cismi daire içine al.'), kule(12)])]),
    'hafta-02': H(2, 1, 'Cisim Kuleleri', 'Geometrik cisim modelleri', () => [
      numarala([kule(21), birimSec([['top', 'Kulenin en altına top konursa', ['dengede durur', 'yuvarlanır']], ['kutu', 'Kulenin en altına kutu konursa', ['dengede durur', 'yuvarlanır']], ['dondurma', 'Külah en üste konursa', ['olur', 'olmaz']], ['bardak', 'Bardak yan yatırılırsa', ['kayar', 'yuvarlanır']]], 'Kule ustası! Doğru cevabı daire içine al.')]),
      numarala([cisimTablo('Hangi cisimler altta durabilir? Yüzlerini say.', ['kup', 'prizma', 'silindir', 'kure']), etk(0, 'Mimar sensin! Evdeki kutu, top ve bardaklarla bir yapı yap. Yapını çiz ve hangi cisimleri kullandığını yaz.', '<div class="m2-bos2"></div>')])]),
    'hafta-03': H(3, 1, 'Şekil Resimleri', 'Geometrik şekil modelleri', () => [numarala([sekilModel(['ev', 'robot', 'roket'])]), numarala([oruntuSekil(), sekilCiz()])]),
    'hafta-04': H(4, 1, 'Şekil Dedektifi', 'Şekil ve cisimlerin biçimsel özellikleri', () => [
      numarala([dondur(41), birimSec([['kutu', 'Kutuyu yan yatırırsam', ['yine prizmadır', 'küp olur']], ['top', 'Topu büyütürsem', ['yine küredir', 'koni olur']], ['dondurma', 'Külahı ters çevirirsem', ['yine konidir', 'silindir olur']], ['hediye', 'Küpü döndürürsem', ['yine küptür', 'küre olur']]], 'Şekil değişir mi? Doğru cevabı daire içine al.')]),
      numarala([sekilModel(['ev']), sekilCiz()])]),
    'hafta-05': H(5, 1, 'Sürahi Kaç Bardak?', 'Sıvı miktarını tahmin etme', () => [numarala([sivi(), siviKarsilastir()]),
      numarala([etk(0, 'Evde deney! Bir şişeyi suyla doldur. Kaç kap su aldığını ölç ve yaz.', `<table class="m2-cozum ttkb"><tr><th>Ölçme aracı</th><th>Tahminim</th><th>Ölçtüm</th></tr>${['çay bardağı', 'su bardağı', 'kahve fincanı', 'yemek kaşığı'].map(s => `<tr><td>${s}</td><td>${kutu(12)}</td><td>${kutu(12)}</td></tr>`).join('')}</table>`),
        etk(0, 'Hangi araçla daha çok saydın? Neden? Düşünceni yaz.', '<div class="m2-cizgiler"><i></i><i></i><i></i></div>'), agirHafif([['kova', 'bardak'], ['sise', 'fincan']]).replace('Terazide hangisi ağır basar? Ağır olanı daire içine al.', 'Hangisi daha çok su alır? Daire içine al.')])]),
    'hafta-06': H(6, 2, 'Onluk Çubukları', '100\'e kadar sayılar', () => [numarala([onlukOku([23, 41, 56, 70, 18, 35])]), numarala([okunus([[46, 'kırk altı'], [64, 'altmış dört'], [90, 'doksan'], [19, 'on dokuz'], [55, 'elli beş']]), onlukCiz([27, 52, 64, 39])]), numarala([yuzluk(61), bilmece(62)])]),
    'hafta-07': H(7, 2, 'Sayıyı Parçala', 'Sayılar, çözümleme', () => [numarala([onlukOku([34, 67, 80, 92]), cozumle([47, 58, 63])]), numarala([basamakAvi(71), komsu(72), bilmece(73)])]),
    'hafta-08': H(8, 2, 'Basamak Avı', 'Sayıları çözümleme', () => [numarala([cozumle([28, 39, 51, 76, 84, 95]), basamakAvi(81)]),
      numarala([etk(0, 'Sayı makinesi! Onluk ve birlikleri birleştir, sayıyı yaz.', `<div class="m2-zihin ttkb">${[[4, 7], [8, 0], [2, 9], [6, 3], [9, 9], [1, 5]].map(([o, b]) => `<span><b>${o} onluk ${b} birlik</b> = ${kutu(13)}</span>`).join('')}</div>`), bilmece(82), onlukCiz([45, 73])])]),
    'hafta-09': H(9, 2, 'Sayı Treni', 'Sayıları sıralama', () => [numarala([karsilastir(91), trenSirala(92), komsu(94)]), numarala([trenSirala(93, true), yuzluk(95, 14)])]),
    'hafta-10': H(10, 2, 'Kurbağa Zıplıyor', 'Sayıları sıralama, ritmik sayma', () => [numarala([karsilastir(101), kurbaga(0, 2, 10, [3, 5, 8]), trenSirala(102)]), numarala([kurbaga(5, 5, 9, [2, 4, 7]), kurbaga(100, -10, 9, [2, 5, 8]), kurbaga(0, 10, 9, [3, 6, 8])])]),
    'hafta-11': H(11, 2, 'Ritim Tutalım', 'Ritmik sayma', () => [numarala([kurbaga(3, 3, 9, [2, 5, 7]), kurbaga(4, 4, 9, [1, 4, 8]), kurbaga(60, -5, 9, [3, 6, 9])]), numarala([oruntuSayi([[10, 20, 30, null, 50, null], [50, 45, null, 35, null, 25], [2, 4, null, 8, null, 12], [30, 27, 24, null, null, 15]]), yuzluk(111, 12)])]),
    'hafta-12': H(12, 2, 'Örüntü Ustası', 'Sayı ve şekil örüntüleri', () => [numarala([oruntuSekil(), buyuyen(), oruntuSayi([[5, 9, 13, null, 21, null], [90, 80, null, 60, null, 40]])]), numarala([oruntuSayi([[7, 14, 21, null, null, 42], [1, 3, 6, 10, null, null], [64, 54, 44, null, null, 14]]), etk(0, 'Kendi örüntünü yap! Bir kural seç, örüntünü yaz, kuralı arkadaşına buldur.', `<div class="m2-oruntu ttkb">${[1, 2].map(() => `<div>${Array.from({ length: 6 }, () => kutu(12)).join('<em>,</em>')}<span>Kural: ${kutu(22)}</span></div>`).join('')}</div>`), sekilCiz()])]),
    'hafta-13': H(13, 2, 'Tahmin Kavanozu', 'Örüntüler, nesne sayısını tahmin etme', () => [numarala([tahmin(131), buyuyen()]),
      numarala([etk(0, 'Evde tahmin oyunu! Bir avuç makarna, fasulye ya da düğme al. Önce tahmin et, sonra 10’ar 10’ar sayarak kontrol et.', `<table class="m2-cozum ttkb"><tr><th>Ne saydım?</th><th>Tahminim</th><th>Saydım</th><th>Fark</th></tr>${[1, 2, 3, 4].map(() => `<tr><td></td><td>${kutu(11)}</td><td>${kutu(11)}</td><td>${kutu(11)}</td></tr>`).join('')}</table>`), oruntuSayi([[12, 22, 32, null, null, 62], [8, 16, 24, null, 40, null]]), bilmece(132)])]),
    'hafta-14': H(14, 3, 'Problem Dedektifi', 'Toplama ve çıkarma problemleri', () => [numarala([tahmin(141), hizliIslem(142)]),
      numarala([problem([['otobus', 'Otobüste 35 yolcu vardı. Durakta 18 yolcu bindi. Otobüste kaç yolcu oldu?'], ['elma', 'Manavda 62 elma vardı. Günün sonunda 27 elma satıldı. Kaç elma kaldı?'], ['kitap', 'Ece pazartesi 24, salı 39 sayfa kitap okudu. İki günde kaç sayfa okudu?'], ['balik', 'Akvaryumda 41 balık vardı. 16 balık başka akvaryuma taşındı. Kaç balık kaldı?']])]),
      numarala([problemKur(['balon', 'kus', 'cicek'])])]),
    'hafta-15': H(15, 3, 'Elde Avcısı', 'Toplama ve çıkarma problemleri', () => [numarala([toplamaElde(151), hizliIslem(153)]), numarala([cikarmaBoz(152), hizliIslem(154, '-')]),
      numarala([problem([['top', 'Spor salonunda 48 top vardı. 26 top bahçeye çıkarıldı. Salonda kaç top kaldı?'], ['kalem', 'Mert\'in 37 kalemi, Ada\'nın Mert\'ten 15 fazla kalemi var. Ada\'nın kaç kalemi var?'], ['civciv', 'Çiftlikte 53 civciv vardı. 19\'u kümese girdi. Dışarıda kaç civciv kaldı?'], ['cicek', 'Bahçede 28 kırmızı, 34 sarı lale açtı. Bahçede kaç lale açtı?']])])]),
    'hafta-16': H(16, 3, 'Ladin Market', 'Toplama ve çıkarma problemleri', () => [numarala([market([['elma', 12, 'elma'], ['ekmek', 9, 'ekmek'], ['sut', 28, 'süt'], ['simit', 7, 'simit']], 161), toplamaElde(162, 4)]),
      numarala([problem([['cuzdan', 'Kumbaramda 45 lira vardı. Babam 28 lira daha verdi. Kumbaramda kaç lira oldu?'], ['seker', 'Bir pakette 60 şeker vardı. Sınıfa 34 şeker dağıttım. Kaç şeker kaldı?'], ['sepet', 'Sepette 27 yumurta vardı. Annem 18 yumurta daha aldı. Sepette kaç yumurta oldu?']]), cikarmaBoz(163, 4)]),
      numarala([problemKur(['sepet', 'otobus', 'kek'])])]),
    'hafta-17': H(17, 3, 'Zihin Yarışı', 'Tahmin etme ve zihinden işlem', () => [numarala([yuvarla(171), zihin(172)]), numarala([cikarmaBoz(173, 4), problem([['ucak', 'Uçakta 58 yolcu vardı. 29 yolcu indi. Kalan yolcu sayısı 30\'a mı, 40\'a mı daha yakın? Önce tahmin et, sonra hesapla.'], ['kitap', 'Kütüphanede 41 masal, 38 şiir kitabı var. Toplam yaklaşık kaç kitap vardır? Önce tahmin et, sonra hesapla.']]), hizliIslem(174)])]),
    'hafta-18': H(18, 3, 'Hızlı Hesap', 'Tahmin etme ve zihinden işlem', () => [numarala([zihin(181), yuvarla(182)]), numarala([toplamaElde(183, 4), cikarmaBoz(184, 4), hizliIslem(185, '-')])]),
    'hafta-19': H(19, 3, 'İşlem Ailesi', 'Toplama ve çıkarmanın ilişkisi', () => [numarala([aile([[8, 5, 13], [9, 7, 16], [24, 15, 39], [30, 40, 70]]), eksik(192)]), numarala([eksik(191), problem([['balik', 'Akvaryumda bir miktar balık vardı. 12 balık daha koyduk, 30 balık oldu. Başta kaç balık vardı?'], ['kus', 'Ağaçta 25 kuş vardı. Bir kısmı uçtu, 16 kuş kaldı. Kaç kuş uçtu?']]), hizliIslem(193)])]),
    'hafta-20': H(20, 3, 'Gruplar Hâlinde', 'Toplama-çıkarma ilişkisi, çarpma', () => [numarala([eksik(201), carpGrup([['elma', 3, 4], ['cilek', 2, 5]])]), numarala([carpGrup([['yildiz', 4, 2], ['balon', 5, 3]]), carpCiz(['2 × 6', '3 × 3', '4 × 2', '5 × 2'])])]),
    'hafta-21': H(21, 3, 'Paylaşalım', 'Çarpma ve bölme', () => [numarala([carpGrup([['ordek', 3, 5]]), paylas([['seker', 12, 3], ['elma', 10, 2]])]), numarala([grupla([['yumurta', 12, 6], ['kalem', 15, 5]]), carpCiz(['4 × 2', '5 × 3'])])]),
    'hafta-22': H(22, 3, 'Çarpım Ustası', 'Çarpma ve bölmede tahmin, zihinden işlem', () => [numarala([carpimTablosuMini(), kurbaga(0, 5, 9, [2, 5, 8], 'Beşer ritmik say: 5 × 4 kaçtır? Kurbağa sana yardım etsin.')]),
      numarala([etk(0, 'Zihinden çarp ve böl.', `<div class="m2-zihin ttkb">${['2 × 5', '3 × 4', '5 × 5', '4 × 2', '10 ÷ 2', '12 ÷ 3', '20 ÷ 5', '8 ÷ 4'].map(s => `<span><b>${s}</b> = ${kutu(12)}</span>`).join('')}</div>`), problem([['yumurta', 'Bir kolide 6 yumurta var. 3 kolide kaç yumurta vardır?'], ['kek', '16 keki 4 tabağa eşit paylaştırdık. Her tabakta kaç kek var?']])])]),
    'hafta-23': H(23, 3, 'Paylaşım Problemleri', 'Çarpma ve bölmede tahmin, zihinden işlem', () => [numarala([paylas([['kek', 15, 3]]), problem([['top', '4 arkadaş, her biri 5 top getirdi. Toplam kaç top oldu?'], ['seker', '20 şekeri 4 arkadaş eşit paylaştı. Her birine kaç şeker düştü?']])]), numarala([carpimTablosuMini(), problemKur(['cicek', 'yumurta'])])]),
    'hafta-24': H(24, 3, 'Teraziler Dengede', 'Dört işlemde eşitlik', () => [numarala([teraziler([['7 + 3', '5 + __'], ['12 − 2', '__ + 4'], ['2 × 5', '__ + 6'], ['15', '9 + __']])]), numarala([esitMi(['6 + 4 = 5 + 5', '9 − 3 = 2 + 3', '2 × 4 = 4 + 4', '10 = 15 − 5', '3 + 3 = 2 × 3', '8 + 2 = 12']), eksik(241)])]),
    'hafta-25': H(25, 3, 'Denge Oyunu', 'Dört işlemde eşitlik', () => [numarala([teraziler([['8 + 6', '__ + 7'], ['20 − 5', '10 + __'], ['3 × 4', '__ + 2'], ['16 ÷ 2', '4 + __']])]), numarala([esitMi(['20 − 10 = 5 + 5', '4 + 7 = 12 − 1', '3 × 3 = 6 + 2', '18 = 9 + 9']), etk(0, 'Kendi terazini kur! İki tarafı eşit olan dört eşitlik yaz.', `<div class="m2-zihin ttkb">${[1, 2, 3, 4].map(() => `<span>${kutu(26)} = ${kutu(26)}</span>`).join('')}</div>`), eksik(251)])]),
    'hafta-26': H(26, 4, 'Yarım ve Çeyrek', 'Eşitlik, kesirler', () => [numarala([esitParca(), kesirBoya()]), numarala([teraziler([['6 + 6', '__ + 4'], ['30 − 10', '__ + 15']]), kesirProblem()])]),
    'hafta-27': H(27, 4, 'Kumbaram', 'Kesirler, paralarımız', () => [numarala([kesirBoya(), kesirProblem()]), numarala([paraSay([['50kr', '25kr', '25kr'], [10, 10, 5, '1TL'], ['1TL', '1TL', '50kr', '50kr'], [20, 10, 5, '1TL']]), paraUstu([['dondurma', 8, 10], ['kalem', 6, 10], ['simit', 4, 5], ['kitap', 17, 20], ['top', 35, 50], ['elma', 13, 20]])])]),
    'hafta-28': H(28, 4, 'Saat Kaç?', 'Paralarımız, zaman ölçme', () => [numarala([paraSay([[100, 50, 20], [5, 5, 10, 10]]), paraUstu([['elma', 15, 20], ['kitap', 35, 50], ['top', 62, 100], ['dondurma', 8, 10]])]), numarala([saatOku([[3, 0], [7, 30], [10, 0], [1, 30], [6, 0], [11, 30]]), zamanBirim()])]),
    'hafta-29': H(29, 4, 'Günüm Saat Saat', 'Zaman ölçme', () => [numarala([saatOku([[2, 15], [5, 45], [9, 15], [12, 0], [4, 30], [8, 45]]), saatCiz(['saat 4', 'sekiz buçuk', 'dokuzu çeyrek geçiyor', 'ikiye çeyrek var', 'on bir', 'üç buçuk'])]), numarala([gunum(), zamanBirim()])]),
    'hafta-30': H(30, 4, 'Cetvel Ustası', 'Uzunluk ve kütle ölçme araç ve birimleri', () => [numarala([cetvelOlc([['kalem', 7], ['anahtar', 4], ['makas', 6], ['tarak', 8]])]),
      numarala([birimSec([['kalem', 'Kalemin boyu', ['cm', 'm', 'kg']], ['kopru', 'Köprünün uzunluğu', ['cm', 'm', 'kg']], ['elma', 'Bir kasa elmanın kütlesi', ['cm', 'm', 'kg']], ['ucurtma', 'Uçurtma ipinin uzunluğu', ['cm', 'm', 'kg']]]), agirHafif([['fil', 'fare'], ['balon', 'top'], ['ekmek', 'kalem'], ['kitap', 'yaprak']])])]),
    'hafta-31': H(31, 4, 'Tahmin Et, Ölç', 'Uzunluk ve kütle ölçmede tahmin', () => [numarala([etk(0, 'Önce tahmin et, sonra cetvelle ölç.', `<table class="m2-cozum ttkb"><tr><th>Ne ölçtüm?</th><th>Tahminim</th><th>Ölçtüm</th></tr>${['silgim', 'kalemim', 'defterimin eni', 'karışım', 'ayakkabım'].map(s => `<tr><td>${s}</td><td>${kutu(10)} cm</td><td>${kutu(10)} cm</td></tr>`).join('')}</table>`), cetvelOlc([['tarak', 8], ['kalem', 6]])]),
      numarala([birimSec([['ekmek', 'Bir ekmek', ['yaklaşık 1 kg', 'yaklaşık 50 kg']], ['bebek', 'Bir bebek', ['yaklaşık 4 kg', 'yaklaşık 400 kg']], ['kalem', 'Bir kalem', ['1 kg’dan hafif', '1 kg’dan ağır']], ['valiz', 'Dolu bir valiz', ['1 kg’dan hafif', '1 kg’dan ağır']]], 'Kütleyi tahmin et! Doğru tahmini daire içine al.'), agirHafif([['kova', 'kalem'], ['kitap', 'yaprak']])])]),
    'hafta-32': H(32, 5, 'Robotun Yolu', 'Ölçmede tahmin, yer ve yön bulma', () => [numarala([kroki('Robot okula gidecek! Kare kare ilerliyor. Soruları cevapla.', ['Robottan okula giden bir yol çiz.', 'Robot kaç kare sağa, kaç kare yukarı gitti?', 'Ağaç robottan kaç kare uzakta?', 'Evden köprüye nasıl gidilir? Yaz.']), birimSec([['ayakkabi', 'Okul ile ev arası', ['cm', 'm']], ['kalem', 'Kalem kutusu', ['cm', 'm']], ['kopru', 'Köprü', ['cm', 'm']], ['anahtar', 'Anahtar', ['cm', 'm']]])]),
      numarala([kroki('Yön oyunu! Bir arkadaşına yol tarif et.', ['Çiçekten ağaca giden yolu yaz. (Örnek: 2 kare sağa, 1 kare aşağı)', 'Okulun solunda ne var?', 'En kısa yolu kim buldu? Kaç kare?']), etk(0, 'Okulundan evine giden yolun krokisini çiz. Sağa ve sola dönüşleri ok ile göster.', '<div class="m2-bos2"></div>')])]),
    'hafta-33': H(33, 5, 'Ayna Ayna', 'Yer ve yön bulma, simetri', () => [numarala([kroki('Hazine haritası! Yönergeleri izle, hazineyi bul ve X ile işaretle.', ['Robottan başla: 3 kare sağa git.', 'Sonra 2 kare yukarı çık.', 'Ardından 1 kare sağa git. Hazine burada!']), simetriBul()]), numarala([simetriTamamla(), harfSimetri()])]),
    'hafta-34': H(34, 5, 'Simetri Ustası', 'Simetri', () => [numarala([simetriTamamla(), harfSimetri()]), numarala([simetriBul(), etk(0, 'Bir kâğıdı ikiye katla, katlı yerden bir yarım kalp kes ve aç. Ne oldu? Simetrik bir resim çiz.', '<div class="m2-bos2"></div>')])]),
    'hafta-35': H(35, 6, 'Sınıf Anketi', 'Veriyle çalışma', () => [numarala([cetele({ elma: 7, muz: 4, cilek: 9 }), grafikBoya(['elma', 'muz', 'cilek'])]), numarala([anket(), problem([['elma', 'Ankette 9 kişi çileği, 4 kişi muzu seçti. Çileği seçenler kaç kişi fazla?']])])]),
    'hafta-36': H(36, 6, 'Veri Kararı', 'Veriye dayalı karar verme', () => [numarala([cetele({ kedi: 6, kopek: 8 }, 'Hangi hayvanı daha çok seviyoruz? Resimleri say, çeteleyi ve tabloyu doldur.'), grafikBoya(['kedi', 'kopek'])]), numarala([anket(), problem([['otobus', 'Sınıf gezisi için 28 öğrenci müzeyi, 17 öğrenci hayvanat bahçesini seçti. Hangisi kaç oy fazla aldı? Gezi nereye olmalı?']])])]),
  };
  const CSS = `
.m2k{display:inline-block;height:9mm;border:.5mm solid #4a5a50;border-radius:2mm;background:#fff;vertical-align:middle}
.m2-esle{display:grid;grid-template-columns:1fr 1fr;gap:28mm;padding:0 6mm}.m2-esle>div{display:flex;flex-direction:column;gap:3mm;justify-content:space-around}
.m2-esle span{display:flex;align-items:center;gap:3mm;background:#fff;border-radius:3mm;padding:1.5mm 3mm;min-height:17mm}.m2-esle>div:first-child span{justify-content:space-between}
.m2-esle span img{width:16mm;height:16mm;object-fit:contain}.m2-esle i{flex:none;width:3.5mm;height:3.5mm;border-radius:50%;background:#1f2a24}.m2-esle b{font-weight:400;font-size:5mm}
.m2-esle.yazi span{font-size:5.4mm;min-height:11mm}
.m2-ctablo{display:grid;grid-template-columns:repeat(5,1fr);gap:3mm}.m2-ctablo>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:1.5mm;text-align:center}
.m2-ctablo b{font-weight:400;font-size:5mm}.m2-ctablo span{display:flex;flex-direction:column;align-items:center;gap:1mm}.m2-ctablo small{font-size:3.6mm}.m2-ctablo em{font-style:normal;font-size:4mm;border:.4mm solid #9db4c8;border-radius:999px;padding:.5mm 2mm}
.m2-kule{display:grid;grid-template-columns:1fr 62mm;gap:4mm;align-items:center}
.m2-tablo{border-collapse:separate;border-spacing:0 1.5mm;font-size:5mm}.m2-tablo td,.m2-tablo th{background:#fff;padding:1mm 2.5mm;font-weight:400}.m2-tablo td:first-child{border-radius:2mm 0 0 2mm}.m2-tablo td:last-child{border-radius:0 2mm 2mm 0}
.m2-tablo img{width:9mm;height:9mm;object-fit:contain}
.m2-model{display:flex;flex-direction:column;gap:3mm}.m2-model>div{display:grid;grid-template-columns:62mm 1fr;align-items:center;gap:6mm;background:#fff;border-radius:3mm;padding:2mm}
.m2-nokta{background:#fff;border-radius:3mm;padding:2mm}
.m2-dondur{display:flex;flex-direction:column;gap:3mm}.m2-dondur>div{display:flex;gap:3mm;align-items:center;background:#fff;border-radius:3mm;padding:2mm;justify-content:space-around}.m2-ana{border:.8mm solid #f4a100;border-radius:3mm;padding:1mm}
.m2-sivi{display:flex;flex-direction:column;gap:3mm}.m2-sivi>div{display:flex;align-items:center;gap:3mm;background:#fff;border-radius:3mm;padding:2mm 3mm}.m2-sivi img{width:16mm;height:16mm;object-fit:contain}.m2-sivi b{font-size:7mm}
.m2-kaplar{display:flex;flex-wrap:wrap;gap:1mm;flex:1}.m2-kaplar img{width:11mm;height:11mm}.m2-th{display:grid;grid-template-columns:auto auto;gap:1mm 2mm;align-items:center}.m2-th small{font-size:3.8mm}
.m2-secim{display:flex;flex-direction:column;gap:2.5mm}.m2-secim>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;align-items:center;gap:3mm;flex-wrap:wrap}.m2-secim p{margin:0;flex:1 1 100%;font-size:5mm}.m2-secim span{border:.5mm solid #9db4c8;border-radius:999px;padding:.6mm 4mm;font-size:4.8mm}
.m2-onluk{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.m2-onluk>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:2mm}.m2-onluk span{font-size:5mm}
.m2-ciz{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.m2-ciz>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;flex-direction:column;gap:1mm;min-height:40mm}.m2-ciz b{font-weight:400;font-size:6mm}.m2-ciz span{flex:1;border:.4mm dashed #9db4c8;border-radius:2mm}
.m2-cozum{width:100%;border-collapse:separate;border-spacing:0 1.5mm;font-size:5.2mm}.m2-cozum th{font-weight:400;background:#3a86ff;color:#fff;padding:1.5mm}.m2-cozum td{background:#fff;padding:1.5mm 2mm;text-align:center}.m2-cozum td b{font-weight:400;font-size:6mm}.m2-cozum img{width:12mm;height:12mm;object-fit:contain}
.m2-avi{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}.m2-avi>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;align-items:center;justify-content:center;gap:2mm;font-size:7mm}.m2-avi u{color:#e63946;text-decoration-thickness:.6mm}
.m2-kars{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}.m2-kars>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;align-items:center;justify-content:center;gap:2mm;font-size:7mm}.m2-kars b{font-weight:400}.m2-kars i{width:10mm;height:10mm;border-radius:50%;border:.6mm solid #12b886}
.m2-yolcu{display:flex;gap:4mm;justify-content:center;margin-bottom:3mm}.m2-yolcu span{background:#fff;border:.6mm dashed #f4a100;border-radius:3mm;padding:1mm 4mm;font-size:7mm}
.m2-komsu{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}.m2-komsu>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;align-items:center;justify-content:center;gap:2mm}.m2-komsu b{font-weight:400;font-size:7mm;background:#fff6dc;border-radius:2mm;padding:0 2mm}
.m2-oruntu{display:flex;flex-direction:column;gap:3mm}.m2-oruntu>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;align-items:center;gap:2mm;font-size:6mm;flex-wrap:wrap}.m2-oruntu b{font-weight:400}.m2-oruntu em{font-style:normal}.m2-oruntu span{margin-left:auto;font-size:4.8mm}
.m2-soruntu{display:flex;flex-direction:column;gap:3mm}.m2-soruntu>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;align-items:center;gap:2mm}.m2-soruntu>div>svg{margin:0!important}.m2-soruntu span{width:10mm;height:10mm;border:.5mm dashed #9db4c8;border-radius:2mm}
.m2-buyu{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}.m2-buyu>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:2mm;justify-content:flex-end}.m2-buyu b{font-weight:400;font-size:4.8mm}.m2-bos{width:34mm;height:16mm;border:.5mm dashed #9db4c8;border-radius:2mm}
.m2-tahmin{display:grid;grid-template-columns:1fr 1fr;gap:4mm}.m2-tahmin>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:2mm}.m2-tahmin span{font-size:5mm}
.m2-islemler{display:grid;grid-template-columns:repeat(4,1fr);gap:4mm 3mm}
.m2-dikey{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;flex-direction:column;align-items:flex-end;font-size:8mm;line-height:1.1}.m2-dikey span{display:flex;gap:1mm;align-items:center}.m2-dikey i{font-style:normal;width:8mm;text-align:center}
.m2-dikey em{font-style:normal;margin-right:2mm}.m2-elde{width:8mm;height:6mm;border:.4mm dashed #e63946;border-radius:1mm;margin-right:9mm}.m2-cizgi{width:100%;height:0;border-top:.6mm solid #1f2a24!important;margin:1mm 0}.m2-dikey i.b{height:9mm;border:.4mm solid #9db4c8;border-radius:1.5mm}
.m2-problem{display:flex;flex-direction:column;gap:3mm}.m2-problem>div{background:#fff;border-radius:3mm;padding:2.5mm 3mm;display:grid;grid-template-columns:22mm 1fr;gap:3mm;align-items:center}.m2-problem img{width:20mm;height:20mm;object-fit:contain}
.m2-problem p{margin:0 0 2mm;font-size:5.2mm;line-height:1.5}.m2-adim{display:flex;flex-wrap:wrap;gap:2mm 5mm;font-size:4.6mm;align-items:center}
.m2-pkur{display:flex;flex-direction:column;gap:3mm}.m2-pkur>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:grid;grid-template-columns:30mm 1fr;gap:3mm;align-items:center}.m2-pkur img{width:28mm;height:28mm;object-fit:contain}
.m2-cizgiler{display:flex;flex-direction:column}.m2-cizgiler i{height:10mm;border-bottom:.45mm solid #9db4c8}
.m2-market{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm;margin-bottom:3mm}.m2-market>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:1mm;border-bottom:1.2mm solid #f4a100}.m2-market img{width:20mm;height:20mm;object-fit:contain}.m2-market b{font-weight:400;font-size:6mm;background:#fff6dc;border-radius:2mm;padding:0 2mm}
.m2-soru{display:flex;flex-direction:column;gap:2.5mm}.m2-soru p{margin:0;background:#fff;border-radius:3mm;padding:2mm 3mm;font-size:5mm;display:flex;align-items:center;gap:3mm;justify-content:space-between;min-height:11mm}
.m2-zihin{display:grid;grid-template-columns:repeat(2,1fr);gap:3mm}.m2-zihin span{background:#fff;border-radius:3mm;padding:2mm 3mm;font-size:6mm;display:flex;align-items:center;gap:2mm;justify-content:center}.m2-zihin b{font-weight:400}
.m2-dy{display:inline-block;width:9mm;height:9mm;border:.5mm solid #4a5a50;border-radius:2mm}
.m2-aile{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.m2-aile>div{background:#fff;border-radius:3mm;padding:2mm;display:grid;grid-template-columns:32mm 1fr;gap:2mm;align-items:center}.m2-aile>div>div{display:flex;flex-direction:column;gap:1.5mm;font-size:5mm}.m2-aile .m2k{height:7.5mm}
.m2-carp{display:flex;flex-direction:column;gap:3mm}.m2-carp>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;flex-direction:column;gap:2mm;align-items:center;font-size:5.4mm}
.m2-gruplar{display:flex;gap:4mm;flex-wrap:wrap;justify-content:center}.m2-gruplar>span{display:flex;flex-wrap:wrap;gap:1mm;max-width:34mm;border:.6mm dashed #f4a100;border-radius:5mm;padding:2mm;justify-content:center}.m2-gruplar img{width:9mm;height:9mm}
.m2-pay{display:flex;flex-direction:column;gap:3mm}.m2-pay>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;flex-direction:column;gap:2mm;align-items:center;font-size:5.4mm}
.m2-yigin{display:flex;flex-wrap:wrap;gap:1.5mm;justify-content:center}.m2-yigin img{width:10mm;height:10mm}.m2-tabaklar{display:flex;gap:5mm}.m2-tabaklar i{width:34mm;height:16mm;border-radius:50%;border:.6mm solid #9db4c8;background:#f4f7fb}
.m2-ctab{border-collapse:collapse;margin:auto;font-size:6mm}.m2-ctab th,.m2-ctab td{border:.5mm solid #9db4c8;width:16mm;height:12mm;text-align:center;font-weight:400;background:#fff}.m2-ctab th{background:#fff6dc}
.m2-terazi{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.m2-terazi>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:2mm;font-size:5.4mm}
.m2-kesir{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}.m2-kesir>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:1.5mm}.m2-kesir b{font-weight:400;font-size:5.4mm}
.m2-para{display:flex;flex-direction:column;gap:3mm}.m2-para>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;align-items:center;justify-content:space-between}.m2-para>div>span{display:flex;gap:2mm;align-items:center;flex-wrap:wrap}.m2-para>div>span svg{margin:0!important}.m2-para b{font-weight:400;font-size:6mm}
.m2-saat{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}.m2-saat>div{background:#fff;border-radius:3mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:2mm}.m2-saat b{font-weight:400;font-size:4.8mm;text-align:center}.m2-r img{width:14mm;height:14mm;object-fit:contain}
.m2-saat:has(.m2-r){grid-template-columns:repeat(4,1fr)}
.m2-cetvel{display:flex;flex-direction:column;gap:3mm}.m2-cetvel>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;align-items:center;gap:3mm;justify-content:space-between}.m2-cetvel>div>svg{margin:0!important}.m2-cetvel span{font-size:5.4mm}
.m2-birim{display:grid;grid-template-columns:repeat(2,1fr);gap:3mm}.m2-birim>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;align-items:center;gap:3mm}.m2-birim img{width:16mm;height:16mm;object-fit:contain}.m2-birim b{font-weight:400;font-size:4.8mm;flex:1}
.m2-birim>div>span:last-child{display:flex;flex-direction:column;gap:1mm}.m2-birim em{font-style:normal;font-size:4.4mm;border:.4mm solid #9db4c8;border-radius:999px;padding:.4mm 3mm;text-align:center}
.m2-birim:not(:has(em))>div{justify-content:center}.m2-birim:not(:has(em)){grid-template-columns:repeat(3,1fr)}.m2-birim:not(:has(em)) img{width:26mm;height:26mm}
.m2-agir{display:grid;grid-template-columns:repeat(2,1fr);gap:3mm}.m2-agir>div{background:#fff;border-radius:3mm;padding:2mm 3mm;display:flex;align-items:center;justify-content:center;gap:3mm}.m2-agir img{width:18mm;height:18mm;object-fit:contain}.m2-agir em{font-style:normal;font-size:5mm}
.m2-kroki{display:grid;grid-template-columns:100mm 1fr;gap:3mm;align-items:start}.m2-kroki>svg{background:#fff;border-radius:3mm}
.m2-simetri{display:grid;grid-template-columns:1fr 1fr;gap:4mm}.m2-simetri>svg{background:#fff;border-radius:3mm}
.m2-harfler{display:grid;grid-template-columns:repeat(7,1fr);gap:2.5mm}.m2-harfler span{background:#fff;border-radius:3mm;font-size:14mm;text-align:center;line-height:1.2;-webkit-text-stroke:.3mm #1f2a24;color:#fff}
.m2-veri{display:grid;grid-template-columns:1fr 70mm;gap:3mm;align-items:center}.m2-veri>svg{background:#fff;border-radius:3mm}.m2-cet{display:inline-block;width:30mm;height:8mm;border-bottom:.4mm solid #9db4c8}
.m2-grafik{display:grid;grid-template-columns:96mm 1fr;gap:3mm;align-items:center}.m2-grafik>svg{background:#fff;border-radius:3mm}
.m2-anket{background:#fff;border-radius:3mm;padding:3mm;font-size:5mm}.m2-anket p{margin:0 0 2mm;display:flex;gap:2mm;align-items:flex-end}.m2-cizgi2{flex:1;border-bottom:.45mm solid #9db4c8;height:7mm}.m2-anket td{height:11mm;background:#f4f7fb}
/* son etkinlikte ızgaralar sayfayı doldurur */
.govde>.etk:last-child>:is(.m2-ctablo,.m2-onluk,.m2-kesir,.m2-saat,.m2-terazi,.m2-birim,.m2-agir,.m2-zihin,.m2-kars,.m2-avi,.m2-komsu,.m2-islemler,.m2-ciz,.m2-aile,.m2-tahmin,.m2-buyu,.m2-simetri,.m2-model){align-content:stretch!important}
.govde>.etk:last-child>:is(.m2-ctablo,.m2-onluk,.m2-kesir,.m2-saat,.m2-terazi,.m2-birim,.m2-agir,.m2-tahmin,.m2-buyu)>div{justify-content:center}
.m2-yuz{border-collapse:collapse;margin:auto;font-size:5.4mm}.m2-yuz td{width:15.5mm;height:12mm;border:.45mm solid #9db4c8;text-align:center;background:#fff}.m2-yuz td.b{background:#fff6dc}
.m2-bos2{min-height:70mm;flex:1;background:#fff;border:.4mm dashed #9db4c8;border-radius:3mm}
`;
  return { M2, CSS };
};
