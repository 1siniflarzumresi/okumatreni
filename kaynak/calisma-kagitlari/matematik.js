// Ladin Ormanı — 1. sınıf Matematik çalışma kağıtları (Sayılar ve Nicelikler 1).
// uret.js içinden yüklenir: require('./matematik.js')(araclar) → { anahtar: { baslik, konu, hafta, sayfalar() } }
// Kural: çocuğun okuyacağı kelime yok; yalnız rakam, resim ve şekil. Yönergeleri öğretmen okur.
// İşlem işareti (+ − =) bu ünitede kullanılmaz.
module.exports = ({ etk, satir, resim, resimCizgi, RY, rastgele, numarala }) => {
  const R = (t) => rastgele(t);
  const karistir = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const NESNE = ['elma', 'top', 'balik', 'yildiz', 'cicek', 'kus', 'armut', 'cilek', 'ordek', 'mantar', 'yaprak', 'kalem', 'ari', 'yumurta', 'kedi', 'balon'];

  // onluk çerçeve (2×5), n nokta; n>10 ise iki çerçeve
  const onluk = (n, boy = 30) => {
    const tek = k => `<svg class="onluk" viewBox="0 0 100 42" style="width:${boy}mm">${Array.from({ length: 10 }, (_, i) => {
      const x = 2 + (i % 5) * 19.2, y = 2 + Math.floor(i / 5) * 19;
      return `<rect x="${x}" y="${y}" width="19.2" height="19" fill="none" stroke="#4a5a50" stroke-width="1.2"/>${i < k ? `<circle cx="${x + 9.6}" cy="${y + 9.5}" r="6.3" fill="#2e6b4a"/>` : ''}`;
    }).join('')}</svg>`;
    return n > 10 ? `<span class="onluk2">${tek(10)}${tek(n - 10)}</span>` : tek(n);
  };
  const kutu = '<span class="yazkutu"></span>';
  const boyut = n => n <= 2 ? 20 : n <= 4 ? 16 : n <= 6 ? 13.5 : n <= 9 ? 11.5 : n <= 12 ? 10 : 8.5;   // mm: az resim büyük, çok resim küçük
  const grup = (ad, n, r) => `<div class="grup" style="--rb:${boyut(n)}mm">${Array.from({ length: n }, () => `<span style="transform:rotate(${Math.round((r() - .5) * 16)}deg)">${resim(ad)}</span>`).join('')}</div>`;

  // --- bileşenler ---
  const rakamYaz = (rakamlar) => etk(0, 'Rakam treninin her vagonunda bir rakam var. Zar ya da dominodaki noktaları say. Yeşil noktadan başla, okları izle, sonra rakamı kendin yaz.',
    `<div class="rakamlar">${rakamlar.map(d => `<div class="rs">${+d <= 6 ? `<span class="rzar">${+d ? zar(+d, 40) : zar(0, 40)}</span>` : satirSvg2(64, 34, dominoG(6, +d - 6, 2, 2, 30), .42)}<div>${satir([[d, 'model'], [d, 'iz'], [d, 'iz'], [d, 'iz'], [d, 'iz'], [d, 'iz']], 150, 15)}${satir([], 150, 15)}</div></div>`).join('')}</div>`);
  const sayYaz = (liste, t) => { const r = R(t);
    return etk(0, 'Resimleri say. Kaç tane olduğunu kutuya yaz.',
      `<div class="sayyaz">${liste.map(([ad, n]) => `<div>${grup(ad, n, r)}${kutu}</div>`).join('')}</div>`); };
  const sayBoya = (liste) => etk(0, 'Rakamı oku. O kadar resmi boya.',
    `<div class="sayboya">${liste.map(([ad, n, top]) => `<div><b class="ttkb">${n}</b><div class="dizi">${Array.from({ length: top }, () => resim(ad)).join('')}</div></div>`).join('')}</div>`);
  const eslesRakam = (sayilar, t) => { const r = R(t), sag = karistir(sayilar, r);
    return etk(0, 'Noktaları say. Noktadan noktaya çizgi çekerek doğru rakamla birleştir.',
      `<div class="esles m"><div class="sol">${sayilar.map(n => `<div>${onluk(n, 34)}<i></i></div>`).join('')}</div><div class="sag">${sag.map(n => `<div><i></i><b class="ttkb">${n}</b></div>`).join('')}</div></div>`); };
  const onlukYaz = (sayilar) => etk(0, 'Çerçevelerdeki noktaları say. Sayıyı kutuya yaz.',
    `<div class="onlukyaz${sayilar.some(n => n > 10) ? ' genis' : ''}">${sayilar.map(n => `<div>${onluk(n, sayilar.some(n => n > 10) ? 24 : 34)}${kutu}</div>`).join('')}</div>`);
  const onlukCiz = (sayilar) => etk(0, 'Sayıyı oku. Çerçeveye o kadar nokta çiz.',
    `<div class="onlukyaz genis">${sayilar.map(n => `<div><b class="ttkb">${n}</b><span class="onluk2">${onluk(0, 24)}${n > 10 ? onluk(0, 24) : ''}</span></div>`).join('')}</div>`);
  const siraBul = (satirlar) => etk(0, 'Bayraktan başlayarak say. Sıradaki numarayı gösteren resmi daire içine al.',
    `<div class="sira">${satirlar.map(([ad, sira, n]) => `<div><b class="ttkb">${sira}.</b><span class="bayrak">⚑</span>${Array.from({ length: n }, () => `<span>${resim(ad)}</span>`).join('')}</div>`).join('')}</div>`);
  const siraYaz = (dizi) => etk(0, 'Yarışı kim kaçıncı bitirdi? Bitiş çizgisinden başlayarak her hayvanın altına sırasını yaz.',
    `<div class="yaris"><div class="bitis"></div>${dizi.map(ad => `<div>${resim(ad)}${kutu}</div>`).join('')}</div>`);
  const karsilastir = (ciftler, t) => { const r = R(t);
    return etk(0, 'Grupları karşılaştır. Çok olan grubu daire içine al. Eşitse ikisini de daire içine al.',
      `<div class="kars">${ciftler.map(([a, n, b, m]) => `<div>${grup(a, n, r)}${grup(b, m, r)}</div>`).join('')}</div>`); };
  const esitle = (ciftler, t) => { const r = R(t);
    return etk(0, 'Az olan gruba çizerek ekle. İki grup eşit olsun.',
      `<div class="kars">${ciftler.map(([a, n, m]) => `<div>${grup(a, n, r)}<div class="grup bos">${Array.from({ length: m }, () => `<span>${resim(a)}</span>`).join('')}</div></div>`).join('')}</div>`); };
  const birebir = (ciftler) => etk(0, 'Üstteki her resmi alttaki bir resimle çizgiyle eşle. Eşi kalmayan hangisi? Çok olan grubu daire içine al.',
    `<div class="birebir">${ciftler.map(([a, n, b, m]) => `<div><div>${Array.from({ length: n }, () => resim(a)).join('')}</div><div>${Array.from({ length: m }, () => resim(b)).join('')}</div></div>`).join('')}</div>`);
  const seritEksik = (diziler) => etk(0, 'Sayarak ilerle. Boş kutulara gelen sayıları yaz.',
    `<div class="serit">${diziler.map(d => `<div>${d.map(x => x === null ? kutu : `<b class="ttkb">${x}</b>`).join('<i>›</i>')}</div>`).join('')}</div>`);
  const ritmikResim = (liste, t) => { const r = R(t);
    return etk(0, 'Resimler gruplanmış. Gruplara bakarak ritmik say. Toplam kaç tane? Kutuya yaz.',
      `<div class="ritmik">${liste.map(([ad, kac, grupSay]) => `<div><div class="gruplar">${Array.from({ length: grupSay }, () => grup(ad, kac, r)).join('')}</div>${kutu}</div>`).join('')}</div>`); };
  const SEKIL = { d: '<circle cx="20" cy="20" r="15"/>', k: '<rect x="6" y="6" width="28" height="28"/>', u: '<path d="M20 4 L36 34 H4 Z"/>', y: '<path d="M20 3 L25 15 L38 15 L27.5 23 L31.5 36 L20 28 L8.5 36 L12.5 23 L2 15 L15 15 Z"/>' };
  const sekil = (s, renk) => `<svg viewBox="0 0 40 40" class="sekil"><g fill="${renk ? '#cfe3d4' : 'none'}" stroke="#1f2a24" stroke-width="2.2">${SEKIL[s]}</g></svg>`;
  const oruntuSekil = (diziler) => etk(0, 'Örüntüyü incele. Sıradaki şekilleri boş kutulara çiz.',
    `<div class="oruntu">${diziler.map(([d, bos]) => `<div>${d.map((s, i) => sekil(s, i % 2 === 0)).join('')}${Array.from({ length: bos }, () => '<span class="bosk"></span>').join('')}</div>`).join('')}</div>`);
  const oruntuResim = (diziler) => etk(0, 'Örüntüyü devam ettir. Sıradaki resmi daire içine al.',
    `<div class="oruntu r">${diziler.map(([d, sec]) => `<div>${d.map(a => `<span>${resim(a)}</span>`).join('')}<span class="bosk">?</span><em></em>${sec.map(a => `<span class="sec">${resim(a)}</span>`).join('')}</div>`).join('')}</div>`);
  const tahmin = (liste, t) => { const r = R(t);
    return etk(0, 'Önce resimlere bak, saymadan tahmin et; tahminini ilk kutuya yaz. Sonra say; saydığını ikinci kutuya yaz. Hangisi daha yakın?',
      `<div class="tahmin">${liste.map(([ad, n]) => `<div><div class="dagin">${karistir(Array.from({ length: 20 }, (_, i) => i), r).slice(0, n).map(i => `<span style="left:${(i % 5) * 19 + 2 + Math.round(r() * 8)}%;top:${Math.floor(i / 5) * 24 + 3 + Math.round(r() * 8)}%;transform:rotate(${Math.round((r() - .5) * 40)}deg)">${resim(ad)}</span>`).join('')}</div><div class="tk"><span class="ik">?</span>${kutu}<span class="ik">✓</span>${kutu}</div></div>`).join('')}</div>`); };

  // ---------- Sayılar ve Nicelikler (2): uzunluk ve tartma (standart olmayan birimler) ----------
  const U = 40;                                            // 1 birim (ataç / küp) = 40 svg birimi
  const MM = 13.5 / U;                                     // 1 birim = 13,5 mm
  const satirSvg = (W, H, ic) => `<svg viewBox="0 0 ${W} ${H}" style="width:${W * MM}mm;height:${H * MM}mm;display:block">${ic}</svg>`;
  const kalem = (n, y = 4) => { const L = n * U;
    return `<g transform="translate(0 ${y})"><rect x="0" y="0" width="12" height="18" rx="3" fill="#e8b4b0" stroke="#1f2a24" stroke-width="2"/><rect x="12" y="0" width="${L - 34}" height="18" fill="#f6e7a8" stroke="#1f2a24" stroke-width="2"/><path d="M${L - 22} 0 L${L} 9 L${L - 22} 18 Z" fill="#f3d9b1" stroke="#1f2a24" stroke-width="2" stroke-linejoin="round"/><path d="M${L - 7} 6.2 L${L} 9 L${L - 7} 11.8 Z" fill="#1f2a24"/></g>`; };
  const serit = (n, y = 4) => `<g transform="translate(0 ${y})"><rect x="1" y="1" width="${n * U - 2}" height="16" rx="2" fill="#cfe3d4" stroke="#1f2a24" stroke-width="2"/>${Array.from({ length: n * 2 }, (_, i) => `<path d="M${i * 20 + 8} 2 l8 14" stroke="#2e6b4a" stroke-width="2"/>`).join('')}</g>`;
  const dal = (n, y = 4) => { const L = n * U;
    return `<g transform="translate(0 ${y})"><path d="M2 9 Q${L * .3} 4 ${L * .55} 9 T${L - 2} 9" fill="none" stroke="#8e5b2b" stroke-width="10" stroke-linecap="round"/><path d="M${L * .4} 7 l10 -8" stroke="#8e5b2b" stroke-width="5" stroke-linecap="round"/><ellipse cx="${L * .4 + 13}" cy="-3" rx="7" ry="4" fill="#5fa476" transform="rotate(-30 ${L * .4 + 13} -3)"/></g>`; };
  const NESNE_CIZ = { kalem, serit, dal };
  const atac = (x, y, bos) => `<path transform="translate(${x + 3} ${y})" d="M4 8 a6 6 0 0 1 6 -6 h22 a6 6 0 0 1 0 12 h-20 a4 4 0 0 1 0 -8 h16" fill="none" stroke="${bos ? '#9aa59d' : '#2a6fdb'}" stroke-width="2.4" ${bos ? 'stroke-dasharray="3 3"' : ''}/>`;
  const kup = (x, y, bos) => `<rect x="${x + 1.5}" y="${y}" width="${U - 3}" height="${U - 3}" rx="3" fill="${bos ? 'none' : '#f2b94b'}" stroke="${bos ? '#9aa59d' : '#1f2a24'}" stroke-width="2" ${bos ? 'stroke-dasharray="4 3"' : ''}/>`;

  const uzunKisa = (satirlar) => etk(0, 'Her satırdaki nesneleri karşılaştır. En uzun olanı daire içine al.',
    `<div class="olcum">${satirlar.map(s => `<div class="kars-uz">${s.map(([tur, n]) => satirSvg(10 * U, 26, NESNE_CIZ[tur](n))).join('')}</div>`).join('')}</div>`);
  const enKisa = (satirlar) => etk(0, 'Her satırdaki nesneleri karşılaştır. En kısa olanı daire içine al.',
    `<div class="olcum">${satirlar.map(s => `<div class="kars-uz">${s.map(([tur, n]) => satirSvg(10 * U, 26, NESNE_CIZ[tur](n))).join('')}</div>`).join('')}</div>`);
  const olc = (liste, birim, ipucu) => etk(0, birim === 'atac'
      ? 'Nesnenin altındaki ataçları say. Nesne kaç ataç uzunluğunda? Kutuya yaz.'
      : 'Nesnenin altındaki küpleri say. Nesne kaç küp uzunluğunda? Kutuya yaz.',
    `<div class="olcum">${liste.map(([tur, n]) => `<div class="olc-satir">${satirSvg(10 * U, birim === 'atac' ? 50 : 70,
      NESNE_CIZ[tur](n) + Array.from({ length: n }, (_, i) => birim === 'atac' ? atac(i * U, 30, ipucu) : kup(i * U, 29, ipucu)).join('') +
      `<line x1="0" x2="0" y1="0" y2="${birim === 'atac' ? 48 : 68}" stroke="#c0392b" stroke-width="2" stroke-dasharray="4 3"/>`)}${kutu}</div>`).join('')}</div>`);
  const tahminOlc = (liste) => etk(0, 'Önce tahmin et: nesne kaç ataç uzunluğunda? İlk kutuya yaz. Sonra kesik çizgili ataçları boyayarak say; ikinci kutuya yaz.',
    `<div class="olcum">${liste.map(([tur, n]) => `<div class="olc-satir">${satirSvg(10 * U, 50, NESNE_CIZ[tur](n) + Array.from({ length: n }, (_, i) => atac(i * U, 30, true)).join(''))}<span class="tk"><span class="ik">?</span>${kutu}<span class="ik">✓</span>${kutu}</span></div>`).join('')}</div>`);
  const uzSirala = (gruplar) => etk(0, 'Nesneleri en kısadan en uzuna sırala. Kutulara 1, 2, 3 yaz.',
    `<div class="olcum">${gruplar.map(g => `<div class="sirala-uz">${g.map(([tur, n]) => `<div>${kutu}${satirSvg(10 * U, 26, NESNE_CIZ[tur](n))}</div>`).join('')}</div>`).join('')}</div>`);

  // terazi: egim = -1 sol ağır (sol kefe aşağıda), 1 sağ ağır, 0 denge. sol/sag: resim adı ya da {kup:n}
  const terazi = (sol, sag, egim) => {
    const a = egim * 12 * Math.PI / 180, cx = 120, cy = 34, R = 92;
    const uc = s => [cx + s * R * Math.cos(a), cy + s * R * Math.sin(a)];
    const kefe = ([x, y], icerik) => { const ty = y + 44;
      const ic = typeof icerik === 'string' ? `<image href="${RY(icerik)}" x="${x - 26}" y="${ty - 52}" width="52" height="52"/>`
        : Array.from({ length: icerik.kup }, (_, i) => { const sira = Math.floor(i / 4), k = i % 4; return `<rect x="${x - 34 + k * 17}" y="${ty - 17 - sira * 17}" width="16" height="16" rx="2" fill="#f2b94b" stroke="#1f2a24" stroke-width="1.6"/>`; }).join('');
      return `<path d="M${x} ${y} L${x - 36} ${ty} M${x} ${y} L${x + 36} ${ty}" stroke="#4a5a50" stroke-width="1.6"/>${ic}<path d="M${x - 42} ${ty} Q${x} ${ty + 16} ${x + 42} ${ty} Z" fill="#cfd8d1" stroke="#1f2a24" stroke-width="2"/>`; };
    return `<svg class="terazi" viewBox="0 0 240 150"><path d="M${cx} ${cy} L${cx} 136 M${cx - 34} 140 h68" stroke="#1f2a24" stroke-width="5" stroke-linecap="round"/><path d="M${uc(-1).join(' ')} L${uc(1).join(' ')}" stroke="#8e5b2b" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="#1f2a24"/>${kefe(uc(-1), sol)}${kefe(uc(1), sag)}</svg>`;
  };
  const teraziOku = (liste) => etk(0, 'Teraziye bak. Daha ağır olan nesneyi daire içine al. İkisi eşitse ikisini de daire içine al.',
    `<div class="teraziler">${liste.map(([s, g, e]) => `<div>${terazi(s, g, e)}</div>`).join('')}</div>`);
  const agirHafif = (ciftler) => etk(0, 'Hangisi daha ağır? Daha ağır olanı daire içine al.',
    `<div class="agir">${ciftler.map(([a, b]) => `<div><span>${resim(a)}</span><span>${resim(b)}</span></div>`).join('')}</div>`);
  const kupDenge = (liste) => etk(0, 'Terazi dengede. Nesne kaç küp ağırlığında? Küpleri say, kutuya yaz.',
    `<div class="teraziler">${liste.map(([ad, n]) => `<div>${terazi(ad, { kup: n }, 0)}${kutu}</div>`).join('')}</div>`);

  // ---------- oyun çizgisi: zar, domino, tren ----------
  const PIP = { 0: [], 1: [[.5, .5]], 2: [[.27, .27], [.73, .73]], 3: [[.25, .25], [.5, .5], [.75, .75]], 4: [[.27, .27], [.73, .27], [.27, .73], [.73, .73]],
    5: [[.25, .25], [.75, .25], [.5, .5], [.25, .75], [.75, .75]], 6: [[.27, .22], [.73, .22], [.27, .5], [.73, .5], [.27, .78], [.73, .78]] };
  const noktalar = (n, x, y, s, renk = '#1f2a24') => PIP[n].map(([a, b]) => `<circle cx="${x + a * s}" cy="${y + b * s}" r="${s * .09}" fill="${renk}"/>`).join('');
  const zar = (n, s = 40, bos) => `<svg class="zar" viewBox="0 0 ${s} ${s}"><rect x="1.5" y="1.5" width="${s - 3}" height="${s - 3}" rx="${s * .18}" fill="#fff" stroke="${bos ? '#9aa59d' : '#1f2a24'}" stroke-width="2.4" ${bos ? 'stroke-dasharray="4 3"' : ''}/>${bos ? '' : noktalar(n, 0, 0, s)}</svg>`;
  // domino (yatay): a | b ; b === null → boş yarı (çocuk çizer)
  const dominoG = (a, b, x, y, s = 30) => `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="${2 * s}" height="${s}" rx="5" fill="#fffdf7" stroke="#1f2a24" stroke-width="2"/><line x1="${s}" y1="4" x2="${s}" y2="${s - 4}" stroke="#1f2a24" stroke-width="1.6"/>${noktalar(a, 0, 0, s)}${b === null ? `<rect x="${s + 4}" y="4" width="${s - 8}" height="${s - 8}" rx="3" fill="none" stroke="#9aa59d" stroke-width="1.4" stroke-dasharray="3 3"/>` : noktalar(b, s, 0, s)}</g>`;
  const lokomotif = (x, y) => `<g transform="translate(${x} ${y})"><rect x="0" y="14" width="58" height="34" rx="5" fill="#2e6b4a"/><rect x="34" y="0" width="26" height="48" rx="4" fill="#1f4d36"/><rect x="39" y="6" width="16" height="13" rx="2" fill="#eef6ea"/><rect x="8" y="2" width="11" height="14" fill="#1f4d36"/><path d="M5 -4 q8 -8 16 0 q8 -8 16 0" fill="none" stroke="#9aa59d" stroke-width="3" stroke-linecap="round"/><path d="M-6 48 L0 34 L0 48 Z" fill="#c0392b"/><circle cx="14" cy="52" r="8" fill="#1f2a24"/><circle cx="44" cy="52" r="8" fill="#1f2a24"/><circle cx="14" cy="52" r="3" fill="#cfd8d1"/><circle cx="44" cy="52" r="3" fill="#cfd8d1"/></g>`;
  const vagon = (x, y, ic, renk) => `<g transform="translate(${x} ${y})"><line x1="-8" y1="40" x2="0" y2="40" stroke="#1f2a24" stroke-width="3"/><rect x="0" y="14" width="76" height="34" rx="4" fill="${renk}" stroke="#1f2a24" stroke-width="2"/>${ic}<circle cx="16" cy="52" r="7" fill="#1f2a24"/><circle cx="60" cy="52" r="7" fill="#1f2a24"/></g>`;
  const ray = (w, y) => `<line x1="0" x2="${w}" y1="${y}" y2="${y}" stroke="#8e5b2b" stroke-width="3"/>${Array.from({ length: Math.floor(w / 18) }, (_, i) => `<line x1="${i * 18 + 4}" x2="${i * 18 + 14}" y1="${y + 4}" y2="${y + 4}" stroke="#8e5b2b" stroke-width="5"/>`).join('')}`;
  const RENK = ['#f2b94b', '#a9d39b', '#f3c6c0', '#bcd7f0', '#e8d3f3'];
  // tren: dominolar vagonlarda; her vagonun altında yazma kutusu
  const dominoTren = (satirlar) => etk(0, 'Domino treni geliyor! Her vagondaki dominonun bütün noktalarını say. Sayıyı vagonun altındaki kutuya yaz.',
    `<div class="trenler">${satirlar.map(d => { const W = 70 + d.length * 86 + 10;
      const k = 172 / W;
      return `<div class="tren">${satirSvg2(W, 86, ray(W, 66) + lokomotif(4, 6) + d.map(([a, b], i) => vagon(74 + i * 86, 6, dominoG(a, b, 8, 16, 30), RENK[i % RENK.length])).join(''), k)}<div class="tren-kutu" style="padding-left:${(74 + 38) * k - 8}mm;gap:${86 * k - 16}mm">${d.map(() => kutu).join('')}</div></div>`; }).join('')}</div>`);
  // kayıp yarı: bayraktaki sayıya tamamlanacak
  const kayipYari = (liste) => etk(0, 'Her vagonun bayrağında bir sayı var. Dominonun boş yarısına nokta çiz: dominodaki bütün noktalar bayraktaki sayı kadar olsun.',
    `<div class="kayip">${liste.map(([a, hedef], i) => `<div>${satirSvg2(110, 96, `<line x1="18" x2="18" y1="2" y2="34" stroke="#1f2a24" stroke-width="2"/><path d="M18 2 h30 l-7 8 l7 8 h-30 Z" fill="#c0392b"/><text x="31" y="15" font-size="13" text-anchor="middle" fill="#fff" font-family="TTKB" font-weight="700">${hedef}</text>` + ray(110, 80) + vagon(10, 22, dominoG(a, null, 8, 16, 30), RENK[i % RENK.length]), .48)}</div>`).join('')}</div>`);
  const satirSvg2 = (W, H, ic, k = 0.27) => `<svg viewBox="0 0 ${W} ${H}" style="width:${W * k}mm;height:${H * k}mm;display:block;overflow:visible">${ic}</svg>`;
  // zar yolu: kesilmeden basılan masa oyunu
  const zarYolu = () => {
    const cols = 6, rows = 4, gx = 118, gy = 104, ox = 70, oy = 60, R = 30, N = cols * rows;
    const nok = Array.from({ length: N }, (_, i) => { const r = Math.floor(i / cols), c = r % 2 ? cols - 1 - i % cols : i % cols; return [ox + c * gx, oy + (rows - 1 - r) * gy]; });
    const OZEL = { 4: ['sincap', '→ 2'], 10: ['salyangoz', '← 1'], 15: ['kus', 'zar'], 20: ['kaplumbaga', '■'] };
    const yol = nok.map((p, i) => i ? `L${p[0]} ${p[1]}` : `M${p[0]} ${p[1]}`).join(' ');
    let s = `<path d="${yol}" fill="none" stroke="#cfe3d4" stroke-width="34" stroke-linejoin="round" stroke-linecap="round"/>`;
    nok.forEach(([x, y], i) => { const o = OZEL[i];
      s += `<circle cx="${x}" cy="${y}" r="${R}" fill="${o ? '#fff4d6' : '#fff'}" stroke="#2e6b4a" stroke-width="3"/>`;
      if (o) s += `<image href="${RY(o[0])}" x="${x - 22}" y="${y - 26}" width="44" height="44"/><rect x="${x - 22}" y="${y + 14}" width="44" height="20" rx="10" fill="#c0392b"/>` +
        (o[1] === 'zar' ? `<rect x="${x - 7}" y="${y + 17}" width="14" height="14" rx="3" fill="#fff"/><circle cx="${x - 3}" cy="${y + 21}" r="1.6"/><circle cx="${x + 3}" cy="${y + 27}" r="1.6"/>`
         : o[1] === '■' ? `<rect x="${x - 6}" y="${y + 19}" width="4" height="10" fill="#fff"/><rect x="${x + 2}" y="${y + 19}" width="4" height="10" fill="#fff"/>`
         : `<text x="${x}" y="${y + 29}" font-size="14" text-anchor="middle" fill="#fff" font-family="Andika" font-weight="700">${o[1]}</text>`);
      else if (i === N - 1) s += `<path transform="translate(${x - 18} ${y - 24})" d="M18 0 L29 16 H24 L33 28 H27 L36 42 H0 L9 28 H3 L12 16 H7 Z" fill="#2e6b4a"/><rect x="${x - 3}" y="${y + 18}" width="6" height="7" fill="#8e5b2b"/>`;
      else s += `<text x="${x}" y="${y + 9}" font-size="26" text-anchor="middle" fill="#1f2a24" font-family="TTKB">${i + 1}</text>`; });
    const [bx, by] = nok[0];
    s += `<g transform="translate(${bx - 64} ${by + 24})"><rect width="64" height="26" rx="13" fill="#2e6b4a"/><text x="32" y="18" font-size="14" text-anchor="middle" fill="#fff" font-family="Andika" font-weight="700">BAŞLA</text></g>`;
    return etk(0, 'Zar Yolu (2-4 oyuncu, 1 zar, her oyuncuya bir düğme ya da silgi). Sırayla zar atın, noktaları sayın, o kadar ilerleyin. Resimli duraklar: sincap 2 ileri, salyangoz 1 geri, kuş bir zar daha, kaplumbağa bir tur bekle. Ladin ağacına ilk ulaşan kazanır.',
      `<div class="zaryolu">${satirSvg2(ox * 2 + (cols - 1) * gx, oy * 2 + (rows - 1) * gy, s, 172 / (ox * 2 + (cols - 1) * gx))}</div>`);
  };
  const zarKaydi = (n) => etk(0, 'Oyunda attığın her zarı boş zara nokta çizerek kaydet. Altındaki kutuya kaç nokta olduğunu yaz.',
    `<div class="zarkayit">${Array.from({ length: n }, () => `<div>${zar(0, 40, true)}${kutu}</div>`).join('')}</div>`);

  // ---------- Ladin çizgisi: hikâyeli, oyunlu sahneler ----------
  const IMG = (ad, x, y, s) => `<image href="${RY(ad)}" x="${x}" y="${y}" width="${s}" height="${s}"/>`;
  const balya = (x, y, s = 22, bos) => bos ? `<rect x="${x + 1}" y="${y + 1}" width="${s - 2}" height="${s * .7 - 2}" rx="2" fill="none" stroke="#9aa59d" stroke-width="1.5" stroke-dasharray="3 2"/>`
    : `<g transform="translate(${x} ${y})"><rect x="1" y="1" width="${s - 2}" height="${s * .7 - 2}" rx="2" fill="#f2d27a" stroke="#8e5b2b" stroke-width="1.5"/><path d="M4 ${s * .2} h${s - 8} M4 ${s * .45} h${s - 8}" stroke="#d1a74a" stroke-width="1.2"/><path d="M${s * .3} 1 v${s * .7 - 2} M${s * .7} 1 v${s * .7 - 2}" stroke="#8e5b2b" stroke-width="1.6"/></g>`;
  // kamyon: n balya; 10'a ulaşınca 10'luk palet (iple bağlı, 5×2) + kalanlar. bos: boş yuva sayısı (çocuk boyar)
  const kamyon = (n, bosYuva = 0) => { const s = 22, pal = n >= 10 && !bosYuva, kalan = pal ? n - 10 : n;
    let ic = '';
    const yuva = (i, x0, dolu) => balya(x0 + (i % 5) * s, 6 + Math.floor(i / 5) * s * .7, s, !dolu);
    if (pal) { for (let i = 0; i < 10; i++) ic += yuva(i, 8, true); ic += `<rect x="6" y="4" width="${5 * s + 4}" height="${2 * s * .7 + 4}" rx="3" fill="none" stroke="#c0392b" stroke-width="2.4"/>`; }
    const x0 = pal ? 8 + 5 * s + 12 : 8, top = bosYuva || kalan;
    for (let i = 0; i < (bosYuva ? 20 : kalan); i++) ic += yuva(i % 10 + (i >= 10 ? 0 : 0), i >= 10 ? x0 + 5 * s + 12 : x0, !bosYuva && i < kalan);
    const W = Math.max(pal || bosYuva ? 2 * (5 * s + 12) + 8 : 5 * s + 16, 140);
    return `<svg class="kamyon" viewBox="-4 -4 ${W + 80} 86" style="width:${Math.min(150, (W + 80) * .5)}mm">${ic}<rect x="0" y="${6 + 2 * s * .7 + 2}" width="${W}" height="10" fill="#8e5b2b"/><path d="M${W + 4} 22 h40 l22 22 v18 h-62 Z" fill="#2e6b4a" stroke="#1f2a24" stroke-width="2"/><rect x="${W + 14}" y="28" width="22" height="14" rx="2" fill="#eef6ea"/><rect x="0" y="${6 + 2 * s * .7 + 12}" width="${W + 66}" height="10" rx="3" fill="#1f4d36"/>${[20, W - 20, W + 46].map(x => `<circle cx="${x}" cy="${6 + 2 * s * .7 + 26}" r="9" fill="#1f2a24"/><circle cx="${x}" cy="${6 + 2 * s * .7 + 26}" r="3.5" fill="#cfd8d1"/>`).join('')}</svg>`; };
  const kamyonSay = (liste) => etk(0, 'Çiftlik kamyonu yüklendi! Kırmızı iple bağlı palette 10 balya var. Kamyondaki bütün balyaları say, kutuya yaz.',
    `<div class="kamyonlar">${liste.map(n => `<div>${kamyon(n)}${kutu}</div>`).join('')}</div>`);
  const kamyonYukle = (liste) => etk(0, 'Siparişteki sayıyı oku. Kamyona o kadar balya yükle: boş yuvaları boya.',
    `<div class="kamyonlar">${liste.map(n => `<div><b class="ttkb siparis">${n}</b>${kamyon(0, 20)}</div>`).join('')}</div>`);

  // hayvan treni: sıra sayıları
  const hayvanTreni = (satirlar) => etk(0, 'Lokomotiften başlayarak vagonları say. Bayraktaki sıradaki vagonun hayvanını daire içine al.',
    `<div class="trenler">${satirlar.map(([sira, hayvanlar]) => { const W = 80 + hayvanlar.length * 86;
      return `<div class="tren hsira"><b class="ttkb bayrak-sira">${sira}.</b>${satirSvg2(W, 86, ray(W, 66) + lokomotif(4, 6) + hayvanlar.map((h, i) => vagon(74 + i * 86, 6, IMG(h, 14, -24, 48), RENK[i % RENK.length])).join(''), 150 / W)}</div>`; }).join('')}</div>`);

  // küp kuleleri
  const kule = (n, x, taban, renk = '#f2b94b', bos = 0) => Array.from({ length: n + bos }, (_, i) => `<rect x="${x}" y="${taban - (i + 1) * 20}" width="20" height="19" rx="2" fill="${i < n ? renk : 'none'}" stroke="${i < n ? '#1f2a24' : '#9aa59d'}" stroke-width="1.6" ${i < n ? '' : 'stroke-dasharray="3 2"'}/>`).join('');
  const kuleKars = (ciftler) => etk(0, 'Küp kuleleri yarışıyor! Her kutuda daha çok küpü olan kuleyi daire içine al. Kuleler eşitse ikisini de daire içine al.',
    `<div class="kuleler">${ciftler.map(([a, b]) => satirSvg2(110, 230, kule(a, 20, 220, '#f2b94b') + kule(b, 70, 220, '#a9d39b') + '<line x1="5" x2="105" y1="221" y2="221" stroke="#8e5b2b" stroke-width="3"/>', .3)).join('')}</div>`);
  const kuleEsitle = (ciftler) => etk(0, 'Kısa kuleye küp ekle: kesik çizgili küpleri boya. İki kule eşit olsun. Kaç küp ekledin? Kutuya yaz.',
    `<div class="kuleler">${ciftler.map(([a, b]) => `<div>${satirSvg2(110, 230, kule(a, 20, 220, '#f2b94b') + kule(b, 70, 220, '#a9d39b', a - b) + '<line x1="5" x2="105" y1="221" y2="221" stroke="#8e5b2b" stroke-width="3"/>', .3)}${kutu}</div>`).join('')}</div>`);
  const dominoKars = (ciftler) => etk(0, 'Hangi dominoda daha çok nokta var? Onu daire içine al. Eşitse ikisini de daire içine al.',
    `<div class="dkars">${ciftler.map(([a, b]) => `<div>${satirSvg2(64, 34, dominoG(a[0], a[1], 2, 2, 30), .34)}${satirSvg2(64, 34, dominoG(b[0], b[1], 2, 2, 30), .34)}</div>`).join('')}</div>`);

  // sayı doğrusu + kanguru zıplamaları
  const sayiDogrusu = (bas, son, adim, isaretli, bosAt) => { const n = son - bas, gx = 600 / n;
    let s = `<line x1="10" x2="630" y1="90" y2="90" stroke="#1f2a24" stroke-width="2.5"/><path d="M630 84 l10 6 l-10 6" fill="#1f2a24"/>`;
    for (let i = 0; i <= n; i++) { const x = 20 + i * gx, v = bas + i, buyuk = (v - bas) % adim === 0;
      s += `<line x1="${x}" x2="${x}" y1="${buyuk ? 80 : 85}" y2="${buyuk ? 100 : 95}" stroke="#1f2a24" stroke-width="${buyuk ? 2.5 : 1.5}"/>`;
      if (buyuk && isaretli.includes(v)) s += `<text x="${x}" y="122" font-size="20" text-anchor="middle" font-family="TTKB">${v}</text>`;
      else if (buyuk && bosAt) s += `<rect x="${x - 15}" y="104" width="30" height="26" rx="4" fill="none" stroke="#4a5a50" stroke-width="1.6"/>`; }
    for (let v = bas; v + adim <= son; v += adim) { const x1 = 20 + (v - bas) * gx, x2 = x1 + adim * gx;
      s += `<path d="M${x1} 78 Q${(x1 + x2) / 2} ${78 - Math.min(60, adim * gx * .5)} ${x2} 78" fill="none" stroke="#c0392b" stroke-width="2" stroke-dasharray="5 4"/><path d="M${x2 - 7} 70 l7 8 l-10 2" fill="none" stroke="#c0392b" stroke-width="2"/>`; }
    s += IMG('kanguru', 20 - 26, 20, 46);
    return satirSvg2(650, 135, s, 178 / 650); };
  const zipla = (liste) => etk(0, 'Kanguru zıplıyor! Her zıplayışta aynı sayıda ileri gidiyor. Kangurunun konduğu yerlerdeki sayıları kutulara yaz.',
    `<div class="dogrular">${liste.map(([bas, son, adim]) => `<div>${sayiDogrusu(bas, son, adim, [bas, bas + adim], true)}</div>`).join('')}</div>`);
  const zarCifti = (liste) => etk(0, 'Zarları ikişer ikişer say: 2, 4, 6… Bütün noktalar kaç tane? Kutuya yaz.',
    `<div class="zarcift">${liste.map(n => `<div><span class="zarlar">${Array.from({ length: n }, () => zar(2, 30)).join('')}</span>${kutu}</div>`).join('')}</div>`);

  // boncuk kolye örüntüsü
  const BON = { k: '#c0392b', y: '#2e6b4a', s: '#f2b94b', m: '#2a6fdb', b: '#ffffff' };
  const boncuk = (diziler) => etk(0, 'Kolyedeki boncuklar bir örüntüyle dizilmiş. Örüntüyü bul, boş boncukları doğru renge boya.',
    `<div class="boncuklar">${diziler.map(([d, bos]) => { const N = d.length + bos, W = N * 46 + 30;
      let s = `<path d="M5 30 Q${W / 2} 52 ${W - 5} 30" fill="none" stroke="#8e5b2b" stroke-width="2"/>`;
      for (let i = 0; i < N; i++) { const x = 26 + i * 46, y = 30 + Math.sin(Math.PI * (x / W)) * 14;
        s += i < d.length ? `<circle cx="${x}" cy="${y}" r="18" fill="${BON[d[i]]}" stroke="#1f2a24" stroke-width="2"/><circle cx="${x - 6}" cy="${y - 6}" r="4" fill="#fff" opacity=".6"/>` : `<circle cx="${x}" cy="${y}" r="18" fill="none" stroke="#4a5a50" stroke-width="2" stroke-dasharray="4 3"/>`; }
      return satirSvg2(W, 66, s, Math.min(.3, 178 / W)); }).join('')}</div>`);
  const dominoOruntu = (diziler) => etk(0, 'Domino treni bir kurala göre büyüyor. Kuralı bul, son dominonun boş yarısına noktaları çiz.',
    `<div class="trenler">${diziler.map(d => satirSvg2(d.length * 74 + 10, 40, d.map(([a, b], i) => dominoG(a, b, 4 + i * 74, 4, 30)).join(''), .4)).join('')}</div>`);

  // kavanoz tahmini
  const kavanoz = (n, r) => { let s = `<path d="M30 20 h60 v12 q18 10 18 30 v80 q0 14 -14 14 h-68 q-14 0 -14 -14 v-80 q0 -20 18 -30 Z" fill="#f4f9fc" stroke="#1f2a24" stroke-width="2.5"/><rect x="26" y="8" width="68" height="14" rx="4" fill="#8e5b2b"/>`;
    const yer = []; for (let i = 0; i < 60 && yer.length < n; i++) { const x = 26 + r() * 68, y = 70 + r() * 80; if (yer.every(([a, b]) => (a - x) ** 2 + (b - y) ** 2 > 230)) yer.push([x, y]); }
    yer.forEach(([x, y], i) => s += `<circle cx="${x}" cy="${y}" r="7" fill="${['#c0392b', '#2a6fdb', '#f2b94b', '#2e6b4a'][i % 4]}" stroke="#1f2a24" stroke-width="1.2"/>`);
    return satirSvg2(120, 162, s, .3); };
  const kavanozTahmin = (liste, t) => { const r = R(t);
    return etk(0, 'Kavanozda kaç bilye var? Önce saymadan tahmin et, soru işaretli kutuya yaz. Sonra bilyeleri tek tek işaretleyerek say, tikli kutuya yaz.',
      `<div class="kavanozlar">${liste.map(n => `<div>${kavanoz(n, r)}<span class="tk"><span class="ik">?</span>${kutu}<span class="ik">✓</span>${kutu}</span></div>`).join('')}</div>`); };

  // ölçme: domino ve tırtıl
  const dominoOlc = (liste) => etk(0, 'Nesnelerin altına domino taşları dizilmiş. Nesne kaç domino uzunluğunda? Kutuya yaz.',
    `<div class="olcum">${liste.map(([tur, n]) => `<div class="olc-satir">${satirSvg(n * U + 4, 54, NESNE_CIZ[tur](n) + Array.from({ length: n }, (_, i) => `<g transform="translate(${i * U + 1} 30) scale(${(U - 2) / 60})">${dominoG((i * 3) % 7, (i * 5 + 2) % 7, 0, 0, 30)}</g>`).join(''))}${kutu}</div>`).join('')}</div>`);
  const tirtil = (n, renk) => `<g>${Array.from({ length: n }, (_, i) => `<circle cx="${18 + i * 30}" cy="22" r="16" fill="${renk}" stroke="#1f2a24" stroke-width="2"/><path d="M${12 + i * 30} 38 l-3 7 M${24 + i * 30} 38 l3 7" stroke="#1f2a24" stroke-width="2"/>`).join('')}<circle cx="${18 + n * 30}" cy="18" r="19" fill="#5fa476" stroke="#1f2a24" stroke-width="2"/><circle cx="${24 + n * 30}" cy="13" r="4" fill="#1f2a24"/><path d="M${20 + n * 30} -1 l-4 -9 M${28 + n * 30} 1 l4 -9" stroke="#1f2a24" stroke-width="2"/></g>`;
  const tirtilYaris = (gruplar) => etk(0, 'Tırtıllar yarışa hazır! Her tırtılın kaç halkası var? Kutulara yaz. En uzun tırtılı daire içine al.',
    `<div class="olcum">${gruplar.map(g => `<div class="kars-uz">${g.map(([n, r]) => `<div class="olc-satir">${satirSvg2(n * 30 + 46, 50, tirtil(n, r), .3)}${kutu}</div>`).join('')}</div>`).join('')}</div>`);

  // çiftlik terazisi
  const terazi2 = (sol, sag, egim) => { const a = egim * 10 * Math.PI / 180, cx = 150, cy = 40, Rr = 112;
    const uc = s => [cx + s * Rr * Math.cos(a), cy + s * Rr * Math.sin(a)];
    const kefe = ([x, y], ic) => { const ty = y + 30;
      const icerik = typeof ic === 'string' ? IMG(ic, x - 36, ty - 70, 72) : Array.from({ length: ic.balya }, (_, i) => balya(x - 40 + (i % 3) * 27, ty - 18 - Math.floor(i / 3) * 19, 27)).join('');
      return `<path d="M${x} ${y} L${x - 40} ${ty} M${x} ${y} L${x + 40} ${ty}" stroke="#4a5a50" stroke-width="1.6"/>${icerik}<path d="M${x - 48} ${ty} Q${x} ${ty + 18} ${x + 48} ${ty} Z" fill="#cfd8d1" stroke="#1f2a24" stroke-width="2"/>`; };
    return `<svg class="terazi2" viewBox="0 -40 300 210"><path d="M${cx} ${cy} V160 M${cx - 40} 164 h80" stroke="#1f2a24" stroke-width="6" stroke-linecap="round"/><path d="M${uc(-1).join(' ')} L${uc(1).join(' ')}" stroke="#8e5b2b" stroke-width="7" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="7" fill="#1f2a24"/>${kefe(uc(-1), sol)}${kefe(uc(1), sag)}</svg>`; };
  const teraziOku2 = (liste) => etk(0, 'Çiftlik terazisine bak. Aşağı inen kefe daha ağırdır. Daha ağır olanı daire içine al. Terazi dengedeyse ikisini de daire içine al.',
    `<div class="teraziler2">${liste.map(([s, g, e]) => `<div>${terazi2(s, g, e)}</div>`).join('')}</div>`);
  const balyaDenge = (liste) => etk(0, 'Terazi dengede. Hayvan kaç balya ağırlığında? Balyaları say, kutuya yaz.',
    `<div class="teraziler2">${liste.map(([ad, n]) => `<div>${terazi2(ad, { balya: n }, 0)}${kutu}</div>`).join('')}</div>`);

  // =====================================================================
  //  HAFTALIK KÂĞITLAR (MEB yıllık planı sırasıyla). Her hafta en az 2 dolu sayfa.
  // =====================================================================
  const IMGm = (ad, x, y, s, ek = '') => `<image href="${RY(ad)}" x="${x}" y="${y}" width="${s}" height="${s}" ${ek}/>`;
  const sahne = (W, H, ic, mm = 178) => `<svg viewBox="0 0 ${W} ${H}" style="width:${mm}mm;height:${mm * H / W}mm;display:block">${ic}</svg>`;
  const kutuK = '<span class="yazkutu"></span>';
  const IKON = { '↑': 'M12 19V5M5 12l7-7 7 7', '↓': 'M12 5v14M5 12l7 7 7-7', '←': 'M19 12H5M12 5l-7 7 7 7', '→': 'M5 12h14M12 5l7 7-7 7', '↕': 'M12 3v18M6 8l6-5 6 5M6 16l6 5 6-5', '▣': 'M5 5h14v14H5zM9 12h6' };
  const ikon = ik => IKON[ik] ? `<svg viewBox="0 0 24 24" width="5mm" height="5mm"><path d="${IKON[ik]}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` : `<span class="ttkb">${ik}</span>`;
  const gorev = (liste) => `<ol class="gorev">${liste.map(([ik, m]) => `<li><span class="gik">${ikon(ik)}</span><span>${m}</span></li>`).join('')}</ol>`;
  const agac = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-9" y="70" width="18" height="40" fill="#8e5b2b"/><path d="M0 -10 L45 40 H25 L58 80 H-58 L-25 40 H-45 Z" fill="#5fa476" stroke="#1f4d36" stroke-width="3"/></g>`;

  // ---- 1-3. hafta: uzamsal ilişkiler, eş nesneler ----
  const raf = (katlar) => { let s = `<rect x="10" y="10" width="580" height="420" rx="8" fill="#fbf6ee" stroke="#8e5b2b" stroke-width="6"/>`;
    katlar.forEach((k, r) => { const y = 140 + r * 140; s += `<rect x="10" y="${y}" width="580" height="12" fill="#c48a4f"/>`;
      k.forEach((ad, c) => s += IMGm(ad, 50 + c * 180, y - 118, 116)); });
    return sahne(600, 440, s, 150); };
  const sepetSahne = () => { const top = (x, y, d) => `<circle cx="${x}" cy="${y}" r="28" fill="#fff" stroke="#1f2a24" stroke-width="3"/><path d="M${x - 28} ${y} h56 ${d ? `M${x} ${y - 28} v56` : `M${x - 20} ${y - 20} l40 40`}" stroke="#1f2a24" stroke-width="2.4"/>`;
    let s = [[220, 200, 1], [285, 190, 0], [350, 200, 1], [250, 150, 0], [318, 150, 1]].map(([x, y, d]) => top(x, y, d)).join('');
    s += `<path d="M130 210 H470 L440 360 H160 Z" fill="#c48a4f" stroke="#8e5b2b" stroke-width="5"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${175 + i * 50} 215 l-6 140" stroke="#8e5b2b" stroke-width="3"/>`).join('')}<path d="M140 260 H460 M150 310 H450" stroke="#8e5b2b" stroke-width="3"/><path d="M180 210 Q300 60 420 210" fill="none" stroke="#8e5b2b" stroke-width="8"/>`;
    s += [[60, 330, 0], [540, 330, 1], [530, 120, 0], [70, 130, 1], [300, 395, 0]].map(([x, y, d]) => top(x, y, d)).join('') + '<line x1="0" x2="600" y1="428" y2="428" stroke="#5fa476" stroke-width="5"/>';
    return sahne(600, 432, s, 125); };
  const kutuSahne = (iceri, disari) => { let s = '';
    s += `<path d="M180 150 L420 150 L470 110 L230 110 Z" fill="#e8d3b0" stroke="#8e5b2b" stroke-width="4"/>`;
    iceri.forEach((ad, i) => s += IMGm(ad, 200 + i * 80, 70, 100));
    s += `<rect x="180" y="150" width="240" height="160" fill="#d9b98a" stroke="#8e5b2b" stroke-width="4"/><path d="M420 150 L470 110 V270 L420 310 Z" fill="#c9a574" stroke="#8e5b2b" stroke-width="4"/>`;
    disari.forEach(([ad, x, y]) => s += IMGm(ad, x, y, 100));
    return sahne(600, 340, s, 120); };
  const saklambac = (liste) => etk(0, 'Saklambaç oynuyoruz! Ağacın ARKASINDA saklanan hayvanları daire içine al. Ağacın ÖNÜNDE duranları boya.',
    `<div class="sahneler3">${liste.map(([ad, arkada]) => { const hay = IMGm(ad, arkada ? 92 : 40, arkada ? 60 : 92, 100, arkada ? '' : '');
      const hayOn = `<image href="${RY(ad)}" x="40" y="96" width="104" height="104"/>`;
      return sahne(200, 220, arkada ? hay + agac(100, 60, 1.25) : agac(100, 60, 1.25) + hayOn, 52); }).join('')}</div>`);
  const cizSahne = () => etk(0, 'Öğretmeninin söylediklerini resme çiz.',
    gorev([['↑', 'Evin ÜSTÜNE bir güneş çiz.'], ['←', 'Ağacın SOLUNA bir çiçek çiz.'], ['↓', 'Masanın ALTINA bir top çiz.'], ['▣', 'Kutunun İÇİNE bir elma çiz.'], ['→', 'Evin SAĞINA bir kedi çiz.']]) +
    sahne(600, 300, `<line x1="0" x2="600" y1="285" y2="285" stroke="#5fa476" stroke-width="6"/><g transform="translate(20 120)"><path d="M0 70 L80 0 L160 70 Z" fill="#f3c6c0" stroke="#1f2a24" stroke-width="3"/><rect x="15" y="70" width="130" height="95" fill="#fff" stroke="#1f2a24" stroke-width="3"/><rect x="65" y="110" width="30" height="55" fill="#c48a4f" stroke="#1f2a24" stroke-width="2"/></g>${agac(270, 150, .9)}<g transform="translate(340 200)"><rect x="0" y="0" width="110" height="12" fill="#c48a4f" stroke="#1f2a24" stroke-width="2"/><path d="M8 12 v72 M102 12 v72" stroke="#8e5b2b" stroke-width="8"/></g><g transform="translate(470 182)"><path d="M0 30 L28 8 H118 L90 30 Z" fill="#e8d3b0" stroke="#8e5b2b" stroke-width="3"/><rect x="0" y="30" width="90" height="70" fill="#d9b98a" stroke="#8e5b2b" stroke-width="3"/><path d="M90 30 L118 8 V78 L90 100 Z" fill="#c9a574" stroke="#8e5b2b" stroke-width="3"/></g>`, 178));
  // sağa/sola bakan araba ve balık (kendi çizimimiz: yönü kesin)
  const araba = (x, y, sag) => `<g transform="translate(${x} ${y}) ${sag ? '' : 'translate(80 0) scale(-1 1)'}"><path d="M4 30 h72 v-10 l-12 -4 l-10 -14 h-28 l-10 14 h-12 z" fill="#bcd7f0" stroke="#1f2a24" stroke-width="2.5"/><path d="M28 6 h22 l8 11 h-30 z" fill="#fff" stroke="#1f2a24" stroke-width="2"/><circle cx="20" cy="32" r="8" fill="#1f2a24"/><circle cx="62" cy="32" r="8" fill="#1f2a24"/><circle cx="73" cy="22" r="3" fill="#f2b94b"/></g>`;
  const balikS = (x, y, sag) => `<g transform="translate(${x} ${y}) ${sag ? '' : 'translate(80 0) scale(-1 1)'}"><path d="M12 20 Q38 -4 66 20 Q38 44 12 20 Z" fill="#f2b94b" stroke="#1f2a24" stroke-width="2.5"/><path d="M14 20 L0 8 V32 Z" fill="#f2b94b" stroke="#1f2a24" stroke-width="2.5"/><circle cx="56" cy="17" r="3" fill="#1f2a24"/></g>`;
  const sagaGiden = (satirlar) => etk(0, 'Yön oyunu! SAĞA giden arabaları ve balıkları daire içine al. SOLA gidenlerin altına bir çizgi çiz.',
    `<div class="yonler">${satirlar.map(([tur, dizi]) => sahne(dizi.length * 96, 46, dizi.map((s, i) => (tur === 'a' ? araba : balikS)(8 + i * 96, 4, s)).join(''), 172)).join('')}</div>`);
  const okBoya = (dizi) => etk(0, 'Okların yönüne bak. SAĞA bakan okları yeşile, SOLA bakan okları kırmızıya boya.',
    `<div class="oklar">${dizi.map(s => `<svg viewBox="0 0 60 40"><path d="${s ? 'M4 14 h32 v-10 l20 16 l-20 16 v-10 h-32 z' : 'M56 14 h-32 v-10 l-20 16 l20 16 v-10 h32 z'}" fill="none" stroke="#1f2a24" stroke-width="2.5" stroke-linejoin="round"/></svg>`).join('')}</div>`);
  const DESEN = {
    cizgi: (id) => `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 5 h10" stroke="#1f2a24" stroke-width="2"/></pattern>`,
    nokta: (id) => `<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2.4" fill="#1f2a24"/></pattern>`,
    zikzak: (id) => `<pattern id="${id}" width="14" height="10" patternUnits="userSpaceOnUse"><path d="M0 8 l7 -6 l7 6" fill="none" stroke="#1f2a24" stroke-width="2"/></pattern>`,
    kare: (id) => `<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="6" height="6" fill="#1f2a24"/></pattern>`,
    dik: (id) => `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M5 0 v10" stroke="#1f2a24" stroke-width="2"/></pattern>`,
  };
  let desenNo = 0;
  const corap = (x, y, desen) => { const id = 'd' + (++desenNo);
    return `<defs>${DESEN[desen](id)}</defs><g transform="translate(${x} ${y})"><path d="M0 0 h34 v70 q0 10 10 14 l26 10 q12 6 6 18 q-6 10 -20 6 l-44 -16 q-12 -4 -12 -18 z" fill="url(#${id})" stroke="#1f2a24" stroke-width="3"/><rect x="0" y="0" width="34" height="12" fill="#fff" stroke="#1f2a24" stroke-width="3"/></g>`; };
  const corapIpi = (dizi) => etk(0, 'Çamaşır ipindeki çorapların eşlerini bul. Eş çorapları aynı renge boya.',
    sahne(dizi.length * 100 + 20, 170, `<path d="M0 22 Q${dizi.length * 50 + 10} 46 ${dizi.length * 100 + 20} 22" fill="none" stroke="#8e5b2b" stroke-width="3"/>` + dizi.map((d, i) => corap(20 + i * 100, 30, d) + `<rect x="${26 + i * 100}" y="20" width="10" height="22" rx="2" fill="#f2b94b" stroke="#1f2a24" stroke-width="2"/>`).join(''), 178));
  const esiniBul = (satirlar) => etk(0, 'Çerçevedeki resme bak. Onunla EŞ olanı (aynı şekil, aynı büyüklük) bul, daire içine al.',
    `<div class="esbul">${satirlar.map(([ad, digeri], k) => { const sec = [[ad, 1], [ad, .6], [ad, 1.35], [digeri, 1]]; const sira = [[0, 1, 2, 3], [1, 0, 3, 2], [2, 3, 0, 1], [3, 2, 1, 0]][k % 4].map(i => sec[i]);
      return `<div><span class="model">${resim(ad)}</span>${sira.map(([a, o]) => `<span class="sec"><img src="${RY(a)}" style="width:${o * 100}%;height:${o * 100}%"></span>`).join('')}</div>`; }).join('')}</div>`);
  const DOLGU = { b: 'none', d: '#9aa59d', c: 'url(#kc)', n: 'url(#kn)' };
  const kuleKopya = (modeller) => etk(0, 'Örnek kuleye bak. Yanındaki boş kuleyi aynı desenle boya: düz, gri, çizgili ya da noktalı.',
    `<div class="kopyalar">${modeller.map(m => sahne(240, 60 + m.length * 34, `<defs>${DESEN.cizgi('kc')}${DESEN.nokta('kn')}</defs>` + m.map((d, i) => `<rect x="30" y="${20 + (m.length - 1 - i) * 34}" width="60" height="32" fill="${DOLGU[d]}" stroke="#1f2a24" stroke-width="2.5"/><rect x="150" y="${20 + (m.length - 1 - i) * 34}" width="60" height="32" fill="none" stroke="#1f2a24" stroke-width="2.5"/>`).join('') + `<line x1="10" x2="230" y1="${22 + m.length * 34}" y2="${22 + m.length * 34}" stroke="#8e5b2b" stroke-width="4"/><path d="M105 ${30 + m.length * 15} h28 l-8 -6 m8 6 l-8 6" stroke="#2e6b4a" stroke-width="3" fill="none"/>`, 55)).join('')}</div>`);

  // ---- 4-7. hafta: rakamlar tek tek ----
  const rakamTanis = (d) => { const temsil = +d <= 6 ? zar(+d, 60) : satirSvg2(64, 34, dominoG(6, +d - 6, 2, 2, 30), .5);
    return etk(0, `${d} rakamıyla tanış! Parmağınla okların üstünden git. Zardaki, çerçevedeki ve resimdeki ${d} tane şeyi say.`,
      `<div class="tanis"><div class="buyuk-rakam">${satir([[d, 'model']], 48, 34)}</div><div class="temsil"><span class="t-zar">${temsil}</span>${onluk(+d, 46)}<span class="t-res">${Array.from({ length: +d }, () => resim(['elma', 'yildiz', 'cicek', 'balon', 'kus', 'balik', 'top', 'cilek', 'armut', 'ari'][+d])).join('') || '<em>hiç yok</em>'}</span></div></div>`); };
  const rakamIz = (d) => etk(0, 'Yeşil noktadan başla, okları izle. Sonra boş satıra kendin yaz.',
    `<div class="satirlar">${satir([[d, 'model'], ...Array(7).fill([d, 'iz'])], 178, 16)}${satir(Array(9).fill([d, 'iz']), 178, 16)}${satir([], 178, 16)}</div>`);
  const rakamBoya = (d, ad, top) => etk(0, `${d} tane ${ad === 'balon' ? 'balon' : 'resim'} boya. Sonra kalanları say.`,
    `<div class="boyadizi">${Array.from({ length: top }, () => `<span>${resimCizgi(ad)}</span>`).join('')}</div>`);
  const rakamAvi = (d, bilinen, n = 24, tohum = 3) => { const r = R(tohum + +d); const h = Array.from({ length: n }, (_, i) => i % 3 === 0 ? d : bilinen[Math.floor(r() * bilinen.length)]);
    return etk(0, `Balonlarda ${d} rakamını bul, boya.`, `<div class="balonlar r">${karistir(h, r).map(c => `<span class="ttkb">${c}</span>`).join('')}</div>`); };
  const grupBul = (d, gruplar, tohum) => { const r = R(tohum);
    return etk(0, `Hangi kutularda ${d} tane var? Daire içine al.`, `<div class="gruplar4">${gruplar.map(([ad, n]) => grup(ad, n, r)).join('')}</div>`); };
  const rakamSayfasi = (d, bilinen, ad, tohum) => numarala([rakamTanis(d), rakamIz(d), rakamBoya(d, ad, 10),
    grupBul(d, [[ad, +d], ['top', Math.max(0, +d - 1)], ['kus', +d], ['elma', +d + 1]].map(([a, n], i) => [a, n]).sort(() => R(tohum)() - .5), tohum), rakamAvi(d, bilinen, 24, tohum)]);

  // ---- tren (hayvanlar vagonun içinde) ----
  const vagonH = (x, y, ad, renk) => `<g transform="translate(${x} ${y})"><line x1="-8" y1="56" x2="0" y2="56" stroke="#1f2a24" stroke-width="3"/>${ad ? IMGm(ad, 6, -6, 64) : ''}<path d="M0 26 h76 v36 h-76 z" fill="${renk}" stroke="#1f2a24" stroke-width="2"/><circle cx="16" cy="66" r="7" fill="#1f2a24"/><circle cx="60" cy="66" r="7" fill="#1f2a24"/></g>`;
  const hayvanTreni2 = (satirlar) => etk(0, 'Lokomotiften başlayarak vagonları say. Bayraktaki sıradaki vagonda hangi hayvan var? Onu daire içine al.',
    `<div class="trenler">${satirlar.map(([sira, hay]) => { const W = 80 + hay.length * 86;
      return `<div class="tren hsira"><b class="ttkb bayrak-sira">${sira}.</b>${sahne(W, 92, ray(W, 80) + `<g transform="translate(4 20)">${lokomotif(0, 0)}</g>` + hay.map((h, i) => vagonH(74 + i * 86, 12, h, RENK[i % RENK.length])).join(''), 150)}</div>`; }).join('')}</div>`);
  const kuyruk = (hay) => etk(0, 'Hayvanlar dondurma kuyruğunda! Dükkâna en yakın olan 1. sırada. Öğretmeninin söylediklerini yap.',
    gorev([['3.', '3. sıradaki hayvanı daire içine al.'], ['5.', '5. sıradaki hayvanı boya.'], ['1.', '1. sıradaki hayvanın altına bir çizgi çiz.'], ['son', 'En sondaki hayvanın üstüne bir yıldız çiz.']]) +
    sahne(hay.length * 82 + 120, 150, `<g><rect x="4" y="20" width="96" height="110" fill="#f3c6c0" stroke="#1f2a24" stroke-width="3"/><path d="M0 20 h104 l-10 -18 h-84 z" fill="#c0392b"/><path d="M30 70 l14 40 l14 -40 z" fill="#f2d27a" stroke="#1f2a24" stroke-width="2"/><circle cx="44" cy="62" r="14" fill="#fff" stroke="#1f2a24" stroke-width="2"/></g>` + hay.map((h, i) => IMGm(h, 116 + i * 82, 54, 78)).join('') + `<line x1="0" x2="${hay.length * 82 + 120}" y1="134" y2="134" stroke="#8e5b2b" stroke-width="4"/>`, 178));
  const merdiven = () => etk(0, 'Kurbağa merdiveni! En alttaki basamak 1. basamak. Öğretmeninin söylediklerini yap.',
    gorev([['4.', '4. basamağa bir top çiz.'], ['7.', '7. basamağı boya.'], ['2.', '2. basamağa bir yıldız çiz.'], ['10.', 'En üstteki basamağa bir bayrak çiz.']]) +
    sahne(620, 330, Array.from({ length: 10 }, (_, i) => `<rect x="${20 + i * 58}" y="${290 - (i + 1) * 28}" width="58" height="${(i + 1) * 28}" fill="#fff" stroke="#1f2a24" stroke-width="2.5"/>`).join('') + IMGm('kurbaga', -6, 196, 70) + `<line x1="0" x2="620" y1="291" y2="291" stroke="#5fa476" stroke-width="6"/>`, 178));

  // ---- 10. hafta: birebir eşleme, fazla olan ----
  const birebir2 = (liste) => etk(0, 'Her hayvanı bir yiyecekle çizgiyle eşle. Eşi kalmayanları daire içine al. Hangisi çok? Çok olan grubun yanındaki kutuya ✓ koy.',
    `<div class="birebir2">${liste.map(([a, n, b, m]) => `<div><div class="s">${Array.from({ length: n }, () => `<span>${resim(a)}</span>`).join('')}${kutuK}</div><div class="s">${Array.from({ length: m }, () => `<span>${resim(b)}</span>`).join('')}${kutuK}</div></div>`).join('')}</div>`);

  // ---- Zar Yolu (kullanılabilir masa oyunu) ----
  const zarYoluPano = () => { const cols = 5, rows = 6, gx = 120, gy = 112, ox = 70, oy = 66, Rr = 40, N = cols * rows;
    const nok = Array.from({ length: N }, (_, i) => { const r = Math.floor(i / cols), c = r % 2 ? cols - 1 - i % cols : i % cols; return [ox + c * gx, oy + (rows - 1 - r) * gy]; });
    const OZEL = { 4: ['sincap', '→ 2'], 9: ['salyangoz', '← 1'], 14: ['kus', 'zar'], 19: ['kaplumbaga', '■'], 23: ['kanguru', '→ 3'], 26: ['kurbaga', '← 2'] };
    let s = `<path d="${nok.map((p, i) => (i ? 'L' : 'M') + p.join(' ')).join(' ')}" fill="none" stroke="#cfe3d4" stroke-width="44" stroke-linejoin="round" stroke-linecap="round"/>`;
    nok.forEach(([x, y], i) => { const o = OZEL[i];
      s += `<circle cx="${x}" cy="${y}" r="${Rr}" fill="${o ? '#fff4d6' : '#fff'}" stroke="#2e6b4a" stroke-width="4"/>`;
      if (o) s += IMGm(o[0], x - 30, y - 36, 58) + `<rect x="${x - 28}" y="${y + 16}" width="56" height="24" rx="12" fill="#c0392b"/>` + (o[1] === 'zar' ? `<rect x="${x - 9}" y="${y + 19}" width="18" height="18" rx="4" fill="#fff"/><circle cx="${x - 4}" cy="${y + 24}" r="2"/><circle cx="${x + 4}" cy="${y + 32}" r="2"/>` : o[1] === '■' ? `<rect x="${x - 8}" y="${y + 21}" width="5" height="14" fill="#fff"/><rect x="${x + 3}" y="${y + 21}" width="5" height="14" fill="#fff"/>` : `<text x="${x}" y="${y + 34}" font-size="17" text-anchor="middle" fill="#fff" font-family="Andika" font-weight="700">${o[1]}</text>`);
      else if (i === N - 1) s += `<path transform="translate(${x - 22} ${y - 30})" d="M22 0 L36 20 H30 L41 35 H33 L44 52 H0 L11 35 H3 L14 20 H8 Z" fill="#2e6b4a"/><rect x="${x - 4}" y="${y + 22}" width="8" height="8" fill="#8e5b2b"/>`;
      else s += `<text x="${x}" y="${y + 12}" font-size="34" text-anchor="middle" fill="#1f2a24" font-family="TTKB">${i + 1}</text>`; });
    const [bx, by] = nok[0];
    s += `<g transform="translate(${bx - 58} ${by + 30})"><rect width="76" height="30" rx="15" fill="#2e6b4a"/><text x="38" y="21" font-size="17" text-anchor="middle" fill="#fff" font-family="Andika" font-weight="700">BAŞLA</text></g>`;
    return etk(0, 'Zar Yolu: 2-4 oyuncu. Kesip katladığınız zarı ve piyonları kullanın. Sırayla zar atın, noktaları sayın, o kadar ilerleyin. Ladin ağacına ilk varan kazanır.',
      `<div class="zaryolu">${sahne(ox * 2 + (cols - 1) * gx, oy * 2 + (rows - 1) * gy, s, 168)}</div>`) +
      `<div class="kurallar">${[['sincap', '2 ileri git'], ['salyangoz', '1 geri git'], ['kus', 'bir zar daha at'], ['kaplumbaga', 'bir tur bekle'], ['kanguru', '3 ileri zıpla'], ['kurbaga', '2 geri zıpla']].map(([a, m]) => `<span>${resim(a)}<b>${m}</b></span>`).join('')}</div>`; };
  const kesKatla = () => { const k = 120; const yuz = (x, y, n) => `<rect x="${x}" y="${y}" width="${k}" height="${k}" fill="#fff" stroke="#1f2a24" stroke-width="3"/>` + noktalar(n, x, y, k);
    const pos = [[1, 0, 1], [0, 1, 2], [1, 1, 3], [2, 1, 5], [3, 1, 4], [1, 2, 6]];
    let s = pos.map(([c, r, n]) => yuz(20 + c * k, 20 + r * k, n)).join('');
    const sekme = (x, y, yon) => { const d = { u: `M${x} ${y} l18 -26 h${k - 36} l18 26`, d: `M${x} ${y} l18 26 h${k - 36} l18 -26`, r: `M${x} ${y} l26 18 v${k - 36} l-26 18` }[yon]; return `<path d="${d}" fill="#eef6ea" stroke="#1f2a24" stroke-width="2" stroke-dasharray="6 4"/>`; };
    s += sekme(20, 20 + k, 'u') + sekme(20, 20 + 2 * k, 'd') + sekme(20 + 2 * k, 20 + k, 'u') + sekme(20 + 2 * k, 20 + 2 * k, 'd') + sekme(20 + 3 * k, 20 + k, 'u') + sekme(20 + 3 * k, 20 + 2 * k, 'd') + sekme(20 + 4 * k, 20 + k, 'r');
    const piyon = (x, ad, renk) => `<g transform="translate(${x} 0)"><rect x="0" y="0" width="110" height="250" rx="8" fill="#fff" stroke="#1f2a24" stroke-width="2" stroke-dasharray="8 5"/><line x1="0" x2="110" y1="125" y2="125" stroke="#9aa59d" stroke-width="2" stroke-dasharray="4 4"/><rect x="8" y="8" width="94" height="110" rx="10" fill="${renk}"/>${IMGm(ad, 14, 14, 82)}<rect x="8" y="132" width="94" height="110" rx="10" fill="${renk}"/><g transform="rotate(180 55 187)">${IMGm(ad, 14, 146, 82)}</g></g>`;
    return etk(0, 'Kes, katla, oyna! Zarı kalın çizgilerden kes, kesik çizgilerden katla, sekmeleri yapıştır. Piyonları kes, ortadan katla; alt kısmı hafifçe açarak ayakta durmasını sağla.',
      `<div class="keskatla">${sahne(20 + 5 * k + 40, 20 + 3 * k + 30, s, 120)}${sahne(4 * 130, 260, ['sincap', 'kanguru', 'kurbaga', 'kus'].map((a, i) => piyon(i * 130, a, RENK[i])).join(''), 120)}</div>`); };


  // ---- 11-19. hafta bileşenleri ----
  const beserSay = (n) => etk(0, 'Her elde 5 parmak var. Elleri beşer beşer say: 5, 10, 15… Her elin altına o ana kadarki sayıyı yaz.',
    `<div class="eller">${Array.from({ length: n }, () => `<div>${resim('el')}${kutuK}</div>`).join('')}</div>`);
  const onarSay = (liste) => etk(0, 'Her kutuda 10 çilek var. Kutuları onar onar say. Toplam kaç çilek? Kutuya yaz.',
    `<div class="onarlar">${liste.map(n => `<div><span class="kasalar">${Array.from({ length: n }, () => `<span class="kasa">${Array.from({ length: 10 }, () => `<img src="${RY('cilek')}">`).join('')}</span>`).join('')}</span>${kutuK}</div>`).join('')}</div>`);
  const geriSay = (liste) => etk(0, 'Roket kalkıyor! Geriye doğru say. Boş kutulara gelen sayıları yaz.',
    `<div class="geri">${liste.map(d => `<div>${resim('roket')}${d.map(x => x === null ? kutuK : `<b class="ttkb">${x}</b>`).join('<i>‹</i>')}</div>`).join('')}</div>`);
  const oruntuOlustur = () => etk(0, 'Sıra sende! İki renk seç ve kendi boncuk örüntünü boya. Sonra yanındakine örüntünü anlat.',
    `<div class="boncuklar">${[0, 1].map(() => sahne(10 * 46 + 30, 66, `<path d="M5 30 Q${(10 * 46 + 30) / 2} 52 ${10 * 46 + 25} 30" fill="none" stroke="#8e5b2b" stroke-width="2"/>` + Array.from({ length: 10 }, (_, i) => { const x = 26 + i * 46, y = 30 + Math.sin(Math.PI * (x / (10 * 46 + 30))) * 14; return `<circle cx="${x}" cy="${y}" r="18" fill="#fff" stroke="#1f2a24" stroke-width="2"/>`; }).join(''), 160)).join('')}</div>`);
  const sekilOruntu2 = (diziler) => etk(0, 'Örüntüde eksik olan şekli bul. Boş kutuya çiz.',
    `<div class="oruntu">${diziler.map(d => `<div>${d.map((s, i) => s === null ? '<span class="bosk">?</span>' : sekil(s, i % 2 === 0)).join('')}</div>`).join('')}</div>`);
  const olcumTablosu = (liste, birim) => etk(0, `Sınıfta ölçelim! Nesneyi bul. Önce kaç ${birim} uzunluğunda olduğunu tahmin et, sonra ${birim}larla ölç.`,
    `<table class="olctab"><tr><th>Nesne</th><th>Tahminim</th><th>Ölçtüm</th></tr>${liste.map(a => `<tr><td>${resim(a)}</td><td>${kutuK}</td><td>${kutuK}</td></tr>`).join('')}</table>`);
  const hikayeGel = (liste) => etk(0, 'Ne oldu? Önce kaç tane vardı, kaç tane geldi? Şimdi kaç tane oldu? Say, kutuya yaz.',
    `<div class="hikayeler">${liste.map(([ad, a, b]) => `<div><span class="h-grup">${Array.from({ length: a }, () => resim(ad)).join('')}</span><span class="h-ok">${sahne(60, 30, '<path d="M54 15 H8 M18 5 L6 15 L18 25" fill="none" stroke="#2e8b57" stroke-width="4" stroke-linecap="round"/>', 16)}</span><span class="h-grup gelen">${Array.from({ length: b }, () => resim(ad)).join('')}</span>${kutuK}</div>`).join('')}</div>`);
  const hikayeGit = (liste) => etk(0, 'Ne oldu? Bazıları gitti; gidenlerin üstü çizili. Kaç tane kaldı? Say, kutuya yaz.',
    `<div class="hikayeler">${liste.map(([ad, a, b]) => `<div><span class="h-grup">${Array.from({ length: a }, (_, i) => `<span class="${i >= a - b ? 'giden' : ''}">${resim(ad)}</span>`).join('')}</span>${kutuK}</div>`).join('')}</div>`);

  const MAT = {
    'hafta-01': { unite: 1, hafta: 1, baslik: 'Ormanda Neresi?', konu: 'Uzamsal ilişkiler', sayfalar: () => [
      numarala([etk(0, 'Oyuncak rafına bak. Öğretmeninin söylediklerini yap.', gorev([['↑', 'EN ÜST raftaki oyuncakları daire içine al.'], ['↓', 'EN ALT raftaki oyuncakları boya.'], ['↕', 'ORTA raftaki oyuncakların altına çizgi çiz.']]) + `<div class="ortala">${raf([['top', 'robot', 'balon'], ['kitap', 'kedi', 'saat'], ['araba', 'kova', 'ayi']])}</div>`),
        etk(0, 'Sepete bak. Sepetin İÇİNDEKİ topları boya. DIŞINDAKİ topları daire içine al.', `<div class="ortala">${sepetSahne()}</div>`)]),
      numarala([saklambac([['kedi', 1], ['sincap', 0], ['fil', 1], ['kopek', 0], ['zurafa', 1], ['kuzu', 0]]), cizSahne()]),
    ] },
    'hafta-02': { unite: 1, hafta: 2, baslik: 'Sağ mı Sol mu?', konu: 'Uzamsal ilişkiler · Eş nesneler', sayfalar: () => [
      numarala([sagaGiden([['a', [1, 0, 0, 1, 1, 0]], ['b', [0, 1, 1, 0, 1, 0]], ['a', [0, 0, 1, 1, 0, 1]], ['b', [1, 1, 0, 0, 0, 1]], ['a', [0, 1, 0, 1, 1, 1]]]), okBoya([1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1]),
        etk(0, 'Kutuya bak. Kutunun İÇİNDEKİ hayvanları boya. DIŞINDAKİLERİ daire içine al.', `<div class="ortala">${kutuSahne(['kedi', 'kopek'], [['tavuk', 30, 210], ['fare', 480, 220], ['kus', 470, 20]])}</div>`)]),
      numarala([corapIpi(['cizgi', 'nokta', 'zikzak', 'nokta', 'kare', 'cizgi', 'dik', 'zikzak', 'kare', 'dik']), esiniBul([['elma', 'armut'], ['kedi', 'kopek'], ['top', 'balon'], ['ev', 'kale'], ['ari', 'kus'], ['limon', 'muz']])]),
    ] },
    'hafta-03': { unite: 1, hafta: 3, baslik: 'Eşini Bul', konu: 'Eş nesneler', sayfalar: () => [
      numarala([esiniBul([['yildiz', 'ay'], ['balik', 'kus'], ['saat', 'top'], ['kova', 'canta'], ['ucak', 'helikopter'], ['cicek', 'yaprak']]), kuleKopya([['b', 'd', 'b'], ['c', 'n', 'c', 'n'], ['d', 'd', 'b', 'c'], ['n', 'b', 'd']])]),
      numarala([corapIpi(['zikzak', 'kare', 'cizgi', 'kare', 'nokta', 'zikzak', 'dik', 'cizgi', 'dik', 'nokta']), kuleKopya([['c', 'c', 'b', 'd', 'n'], ['n', 'd', 'n', 'd'], ['b', 'c', 'd', 'n', 'b']]), esiniBul([['zebra', 'at'], ['gitar', 'davul'], ['semsiye', 'sapka'], ['robot', 'roket']])]),
    ] },
    'hafta-04': { unite: 1, hafta: 4, baslik: 'Rakamlar 1, 2, 3', konu: 'Nesne sayısını belirleme', sayfalar: () => [
      rakamSayfasi('1', ['1', '2', '3'], 'balon', 11), rakamSayfasi('2', ['1', '2', '3'], 'elma', 12), rakamSayfasi('3', ['1', '2', '3'], 'cicek', 13)] },
    'hafta-05': { unite: 1, hafta: 5, baslik: 'Rakamlar 4, 5 · Domino Treni', konu: 'Nesne sayısını belirleme', sayfalar: () => [
      rakamSayfasi('4', ['1', '2', '3', '4', '5'], 'yildiz', 14), rakamSayfasi('5', ['1', '2', '3', '4', '5'], 'balik', 15),
      numarala([dominoTren([[[2, 1], [3, 1], [1, 0], [2, 2]], [[1, 1], [3, 2], [4, 0], [0, 5]], [[2, 3], [1, 3], [4, 1], [0, 3]]]), kayipYari([[2, 4], [1, 5], [3, 4], [0, 2], [4, 5], [1, 3]])])] },
    'hafta-06': { unite: 1, hafta: 6, baslik: 'Rakamlar 6, 7 · Zar Yolu', konu: 'Nesne sayısını belirleme', sayfalar: () => [
      rakamSayfasi('6', ['1', '2', '3', '4', '5', '6', '7'], 'cilek', 16), rakamSayfasi('7', ['1', '2', '3', '4', '5', '6', '7'], 'kus', 17),
      numarala([zarYoluPano()]), numarala([kesKatla(), zarKaydi(20)])] },
    'hafta-07': { unite: 1, hafta: 7, baslik: 'Rakamlar 8, 9, 0 · Çiftlik Kamyonu', konu: 'Nesne sayısını belirleme · Sıra bildiren sayılar', sayfalar: () => [
      rakamSayfasi('8', ['3', '5', '6', '8', '9', '0'], 'armut', 18), rakamSayfasi('9', ['3', '5', '6', '8', '9', '0'], 'ari', 19), rakamSayfasi('0', ['3', '5', '6', '8', '9', '0'], 'top', 20),
      numarala([kamyonSay([13, 7, 16, 11, 19])]), numarala([kamyonYukle([12, 15, 18, 20]), kamyonSay([14])])] },
    'hafta-08': { unite: 1, hafta: 8, baslik: 'Hayvan Treni', konu: 'Sıra bildiren sayılar', sayfalar: () => [
      numarala([hayvanTreni2([[3, ['kedi', 'ordek', 'fil', 'kus', 'balik']], [5, ['inek', 'tavuk', 'kopek', 'fare', 'zurafa']], [2, ['kaplumbaga', 'sincap', 'deve', 'kanguru', 'zebra']], [4, ['ari', 'kurbaga', 'kuzu', 'horoz', 'leylek']], [1, ['deve', 'kus', 'balik', 'kedi', 'inek']]]), siraYaz(['kaplumbaga', 'kanguru', 'kedi', 'fil', 'fare'])]),
      numarala([kuyruk(['kedi', 'kopek', 'kuzu', 'tavuk', 'fil', 'kurbaga']), merdiven(), siraYaz(['zebra', 'ordek', 'sincap', 'kopek', 'kuzu'])])] },
    'hafta-09': { unite: 1, hafta: 9, baslik: 'Sıra Bizde · Küp Kuleleri', konu: 'Sıra bildiren sayılar · Çok mu? Az mı? Eşit mi?', sayfalar: () => [
      numarala([hayvanTreni2([[6, ['fare', 'kedi', 'kopek', 'kuzu', 'inek', 'fil']], [1, ['tavuk', 'ordek', 'kus', 'horoz', 'leylek', 'ari']], [4, ['zebra', 'zurafa', 'deve', 'kanguru', 'sincap', 'kaplumbaga']], [2, ['balik', 'kurbaga', 'ordek', 'kopek', 'kedi', 'kus']]]), kuyruk(['inek', 'kuzu', 'fare', 'zebra', 'tavuk', 'ari'])]),
      numarala([kuleKars([[5, 3], [4, 4], [2, 7], [6, 6], [8, 5], [3, 9]]), dominoKars([[[3, 2], [1, 1]], [[4, 0], [2, 2]], [[6, 1], [5, 3]], [[2, 1], [3, 3]], [[5, 5], [6, 3]], [[1, 0], [0, 2]]]), kuleEsitle([[5, 2], [6, 4], [7, 3], [4, 1], [8, 6], [6, 6]])])] },
    'hafta-11': { unite: 1, hafta: 11, baslik: 'Kanguru Zıplıyor', konu: 'Ritmik saymalar', sayfalar: () => [
      numarala([zipla([[0, 20, 2], [0, 20, 2], [0, 50, 5]]), zarCifti([4, 6]), beserSay(6)]),
      numarala([onarSay([2, 4, 3]), seritEksik([[2, 4, null, 8, null, 12, null], [10, 20, null, 40, null, 60, null], [5, 10, null, 20, null, null, 35]]), ritmikResim([['eldiven', 2, 5], ['corap', 2, 6]], 31), beserSay(4)]),
    ] },
    'hafta-12': { unite: 1, hafta: 12, baslik: 'Geri Sayım · Boncuklar', konu: 'Ritmik saymalar · Sayı ve şekil örüntüleri', sayfalar: () => [
      numarala([geriSay([[10, 9, null, 7, null, 5, null, 3], [20, 18, null, 14, null, 10, null], [50, 45, null, 35, null, 25, null]]), zipla([[0, 100, 10], [1, 21, 2]]), beserSay(5)]),
      numarala([boncuk([[['k', 's', 'k', 's', 'k', 's'], 3], [['y', 'y', 'm', 'y', 'y', 'm'], 3], [['k', 's', 'm', 'k', 's', 'm'], 3]]), oruntuResim([[['elma', 'armut', 'elma', 'armut', 'elma'], ['elma', 'armut', 'cilek']], [['kus', 'kus', 'balik', 'kus', 'kus'], ['kedi', 'balik', 'kus']], [['lale', 'gul', 'gul', 'lale', 'gul'], ['gul', 'lale', 'cicek']]]), oruntuOlustur()]),
    ] },
    'hafta-13': { unite: 1, hafta: 13, baslik: 'Örüntü Ormanı', konu: 'Sayı ve şekil örüntüleri', sayfalar: () => [
      numarala([oruntuSekil([[['d', 'k', 'd', 'k', 'd', 'k'], 2], [['u', 'u', 'y', 'u', 'u', 'y'], 3], [['k', 'd', 'u', 'k', 'd', 'u'], 3]]), sekilOruntu2([['d', 'u', null, 'd', 'u', 'k'], ['y', 'y', 'k', null, 'y', 'k'], ['u', null, 'u', 'd', 'u', 'd']]),
        oruntuResim([[['top', 'balon', 'yildiz', 'top', 'balon'], ['yildiz', 'top', 'balon']], [['kedi', 'kedi', 'kopek', 'kedi', 'kedi'], ['kedi', 'kopek', 'fare']], [['muz', 'elma', 'elma', 'muz', 'elma'], ['muz', 'elma', 'armut']], [['ari', 'ugur', 'ari', 'ugur', 'ari'], ['ari', 'ugur', 'kus']]])]),
      numarala([dominoOruntu([[[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [3, null]], [[0, 1], [0, 2], [0, 3], [0, 4], [0, null]], [[6, 6], [5, 5], [4, 4], [3, 3], [2, null]]]),
        seritEksik([[1, 2, 1, 2, null, null], [3, 3, 4, 3, 3, null], [1, 2, 3, 1, 2, null], [2, 4, 6, null, 10, null]]), oruntuOlustur()]),
    ] },
    'hafta-14': { unite: 1, hafta: 14, baslik: 'Kavanoz Tahmini', konu: 'Sayı ve şekil örüntüleri · Tahmin', sayfalar: () => [
      numarala([kavanozTahmin([7, 12, 16, 9, 19, 14], 7), zarCifti([3, 5])]),
      numarala([tahmin([['yildiz', 9], ['balon', 14], ['ari', 6], ['cicek', 17]], 8), boncuk([[['m', 'b', 'm', 'b', 'm', 'b'], 3], [['s', 's', 'k', 's', 's', 'k'], 3]])]),
    ] },
    'hafta-15': { unite: 2, hafta: 15, baslik: 'Tırtıl Yarışı', konu: 'Tahmin · Uzunluk ölçme', sayfalar: () => [
      numarala([tahmin([['kus', 11], ['ugur', 8], ['mantar', 15], ['limon', 12]], 9), kavanozTahmin([13, 18, 10], 11)]),
      numarala([tirtilYaris([[[5, '#a9d39b'], [8, '#f2b94b'], [6, '#f3c6c0']], [[9, '#bcd7f0'], [4, '#a9d39b'], [7, '#f2b94b']]]), uzunKisa([[['kalem', 5], ['kalem', 8]], [['serit', 9], ['serit', 6]], [['dal', 4], ['dal', 7], ['dal', 5]]])]),
    ] },
    'hafta-16': { unite: 2, hafta: 16, baslik: 'Uzun mu Kısa mı?', konu: 'Uzunluk ölçme', sayfalar: () => [
      numarala([enKisa([[['kalem', 6], ['kalem', 3], ['kalem', 8]], [['serit', 7], ['serit', 9], ['serit', 5]], [['dal', 8], ['dal', 4], ['dal', 6]]]), uzSirala([[['kalem', 7], ['kalem', 4], ['kalem', 9]], [['dal', 5], ['dal', 9], ['dal', 3]]])]),
      numarala([olc([['kalem', 4], ['serit', 7], ['dal', 6], ['kalem', 9]], 'atac'), olc([['serit', 5], ['kalem', 8]], 'kup'), tirtilYaris([[[6, '#f3c6c0'], [3, '#bcd7f0'], [8, '#a9d39b']]])]),
    ] },
    'hafta-17': { unite: 2, hafta: 17, baslik: 'Dominoyla Ölç', konu: 'Uzunluk ölçme', sayfalar: () => [
      numarala([dominoOlc([['kalem', 4], ['serit', 7], ['dal', 6], ['kalem', 9]]), tahminOlc([['kalem', 6], ['dal', 8], ['serit', 5]]), uzSirala([[['serit', 8], ['serit', 3], ['serit', 6]]])]),
      numarala([olcumTablosu(['kalem', 'kitap', 'masa', 'canta', 'kasik', 'makas'], 'silgi')]),
    ] },
    'hafta-18': { unite: 2, hafta: 18, baslik: 'Çiftlik Terazisi', konu: 'Tartma', sayfalar: () => [
      numarala([teraziOku2([['tavuk', 'inek', 1], ['fil', 'kedi', -1], ['kuzu', 'kuzu', 0], ['fare', 'kopek', 1]]), agirHafif([['fil', 'fare'], ['yaprak', 'kalem'], ['kitap', 'balon'], ['inek', 'kedi'], ['tencere', 'kasik'], ['kus', 'kopek'], ['domates', 'ceviz'], ['kova', 'kasik'], ['tilki', 'ari']])]),
      numarala([balyaDenge([['kuzu', 3], ['kopek', 5], ['tavuk', 2], ['inek', 9]]), agirHafif([['deve', 'kedi'], ['kitap', 'yaprak'], ['valiz', 'kalem']])]),
    ] },
    'hafta-19': { unite: 3, hafta: 19, baslik: 'Ne Oldu?', konu: 'Tartma · Toplama ve çıkarma', sayfalar: () => [
      numarala([kupDenge([['elma', 3], ['top', 5], ['kitap', 7], ['armut', 2], ['ayakkabi', 6], ['cilek', 1]]), teraziOku([['elma', 'kedi', 1], ['fil', 'top', -1], ['balon', 'kitap', 1], ['fare', 'inek', 1], ['kuzu', 'yaprak', -1], ['kalem', 'kalem', 0]])]),
      numarala([hikayeGel([['civciv', 3, 2], ['balik', 4, 3], ['kus', 2, 5], ['elma', 5, 4]]), hikayeGit([['balon', 6, 2], ['ordek', 7, 3], ['kurbaga', 5, 4], ['cilek', 8, 5]])]),
    ] },
    'hafta-10': { unite: 1, hafta: 10, baslik: 'Çok mu Az mı?', konu: 'Çok mu? Az mı? Eşit mi?', sayfalar: () => [
      numarala([birebir2([['kedi', 4, 'balik', 6], ['kopek', 5, 'top', 3], ['tavuk', 3, 'yumurta', 3]]), dominoKars([[[2, 2], [4, 1]], [[3, 3], [5, 1]], [[6, 0], [2, 3]], [[1, 4], [4, 1]], [[5, 2], [3, 3]], [[0, 6], [6, 1]]])]),
      numarala([kuleEsitle([[6, 3], [7, 5], [5, 1], [8, 4], [4, 2], [9, 6]]), kuleKars([[3, 5], [7, 7], [9, 4], [2, 6], [5, 5], [8, 3]]), birebir2([['ari', 5, 'cicek', 3]])])] },
  };
  const CSS = `
.onluk{display:block}.onluk2{display:flex;gap:1.5mm}
.rakamlar{display:flex;flex-direction:column;gap:3mm}
.rs{display:flex;align-items:center;gap:6mm}
.yazkutu{display:inline-block;width:16mm;height:16mm;border:.6mm solid #4a5a50;border-radius:2.5mm;background:#fff;flex:none}
.grup{display:flex;flex-wrap:wrap;gap:1mm;align-content:center;justify-content:center;border:.4mm solid #cfd8d1;border-radius:3mm;padding:2mm;min-height:24mm}
.grup span{width:var(--rb,12mm);height:var(--rb,12mm);display:block}
.sayyaz{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}
.sayyaz>div{display:flex;flex-direction:column;align-items:center;gap:2mm}
.sayyaz .grup{width:100%;min-height:40mm}
.onlukyaz{display:grid;grid-template-columns:repeat(4,1fr);gap:5mm 4mm}
.onlukyaz.genis{grid-template-columns:repeat(3,1fr)}
.onlukyaz>div{display:flex;flex-direction:column;align-items:center;gap:2mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:2.5mm}
.onlukyaz b{font-size:11mm;font-weight:400;line-height:1}
.sayboya{display:flex;flex-direction:column;gap:2.5mm}
.sayboya>div{display:flex;align-items:center;gap:5mm;border-bottom:.3mm dashed #cfd8d1;padding-bottom:1.5mm}
.sayboya b{font-size:13mm;font-weight:400;width:14mm;text-align:center}
.sayboya .dizi{display:flex;gap:1.6mm}.sayboya img{width:14mm;height:14mm}
.esles.m b{font-size:13mm;font-weight:400}
.sira{display:flex;flex-direction:column;gap:2.5mm}
.sira>div{display:flex;align-items:center;gap:2mm;border-bottom:.3mm dashed #cfd8d1;padding-bottom:1.5mm}
.sira b{font-size:10mm;font-weight:400;width:13mm;color:#c0392b}
.sira .bayrak{font-size:8mm;color:#2e6b4a}.sira span:not(.bayrak){width:17mm;height:17mm;display:block}
.yaris{display:flex;align-items:flex-end;gap:4mm;padding-left:4mm}
.yaris>div:not(.bitis){display:flex;flex-direction:column;align-items:center;gap:2mm}
.yaris img{width:24mm;height:24mm}
.bitis{width:3mm;align-self:stretch;background:repeating-linear-gradient(#1f2a24 0 3mm,#fff 3mm 6mm);border:.3mm solid #1f2a24}
.kars{display:flex;flex-direction:column;gap:4mm}
.kars>div{display:grid;grid-template-columns:1fr 1fr;gap:10mm}
.kars .grup{min-height:33mm}
.kars .grup.bos{justify-content:flex-start}
.birebir{display:flex;flex-direction:column;gap:5mm}
.birebir>div{display:flex;flex-direction:column;gap:12mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:3mm}
.birebir>div>div{display:flex;gap:6mm;justify-content:center}.birebir img{width:17mm;height:17mm}
.serit{display:flex;flex-direction:column;gap:3mm}
.serit>div{display:flex;align-items:center;gap:2.5mm}
.serit b{width:16mm;height:16mm;border:.6mm solid #2e6b4a;border-radius:2.5mm;display:grid;place-items:center;font-size:10mm;font-weight:400;background:#f6faf3}
.serit i{font-style:normal;font-size:8mm;color:#9fb8a6}
.ritmik{display:flex;flex-direction:column;gap:3mm}
.ritmik>div{display:flex;align-items:center;gap:5mm}
.gruplar{display:flex;gap:3mm;flex:1}.gruplar .grup{min-height:20mm;padding:1.5mm}.gruplar .grup span{width:8.5mm;height:8.5mm}
.oruntu{display:flex;flex-direction:column;gap:3.5mm}
.oruntu>div{display:flex;align-items:center;gap:3mm}
.sekil{width:15mm;height:15mm}
.bosk{width:16mm;height:16mm;border:.6mm dashed #4a5a50;border-radius:2.5mm;display:grid;place-items:center;font:700 8mm Andika,sans-serif;color:#9aa59d}
.oruntu.r span:not(.bosk){width:15mm;height:15mm;display:block}
.oruntu.r em{width:8mm}
.oruntu.r .sec{border:.4mm solid #cfd8d1;border-radius:50%;padding:1.5mm;width:17mm!important;height:17mm!important}
.tahmin{display:grid;grid-template-columns:1fr 1fr;gap:5mm}
.tahmin>div{display:flex;flex-direction:column;gap:2mm;align-items:center}
.dagin{position:relative;width:100%;height:88mm;border:.5mm solid #cfd8d1;border-radius:4mm;background:#fbfdf9}
.dagin span{position:absolute;width:13mm;height:13mm}
.tk{display:flex;align-items:center;gap:3mm}
.trenler{display:flex;flex-direction:column;gap:2.5mm}
.tren{border:.4mm solid #cfd8d1;border-radius:3mm;padding:2mm 3mm;overflow:hidden}
.tren-kutu{display:flex;margin-top:1mm}
.tren-kutu .yazkutu{width:16mm;height:14mm}
.kayip{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}
.kayip>div{border:.4mm solid #cfd8d1;border-radius:3mm;padding:2mm;display:flex;justify-content:center}
.zaryolu{display:flex;justify-content:center;border:.6mm solid #2e6b4a;border-radius:4mm;padding:3mm;background:#f6faf3}
.zarkayit{display:grid;grid-template-columns:repeat(10,1fr);gap:2mm}
.zarkayit>div{display:flex;flex-direction:column;align-items:center;gap:1.5mm}
.zarkayit .zar{width:14mm;height:14mm}
.zarkayit .yazkutu{width:12mm;height:12mm}
.kamyonlar{display:flex;flex-direction:column;gap:5mm}
.kamyonlar>div{display:flex;align-items:center;gap:6mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:3mm 4mm}
.siparis{font-size:13mm;font-weight:400;color:#c0392b;min-width:16mm;text-align:center;border:.6mm solid #c0392b;border-radius:3mm}
.hsira{display:flex;align-items:center;gap:4mm}
.bayrak-sira{font-size:12mm;font-weight:400;color:#c0392b;min-width:14mm}
.kuleler{display:grid;grid-template-columns:repeat(6,1fr);gap:2mm}
.kuleler svg{max-width:100%;height:auto!important}
.kuleler>*{border:.4mm solid #cfd8d1;border-radius:3mm;padding:1.5mm;display:flex;flex-direction:column;align-items:center;gap:1.5mm}
.kuleler .yazkutu{width:12mm;height:12mm}
.dkars{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}
.dkars>div{display:flex;justify-content:space-around;border:.4mm solid #cfd8d1;border-radius:3mm;padding:3mm}
.dogrular{display:flex;flex-direction:column;gap:3mm}
.dogrular>div{border:.4mm solid #cfd8d1;border-radius:3mm;padding:1.5mm 2mm}
.zarcift{display:flex;flex-direction:column;gap:2.5mm}
.zarcift>div{display:flex;align-items:center;justify-content:space-between;border-bottom:.3mm dashed #cfd8d1;padding-bottom:2mm}
.zarlar{display:flex;gap:2mm}.zarlar .zar{width:11mm;height:11mm}
.boncuklar{display:flex;flex-direction:column;gap:3mm}
.kavanozlar{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm}
.kavanozlar .yazkutu{width:13mm;height:13mm}
.kavanozlar svg{width:40mm!important;height:auto!important}
.kavanozlar>div{display:flex;flex-direction:column;align-items:center;gap:2mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:3mm}
.teraziler2{display:grid;grid-template-columns:repeat(2,1fr);gap:4mm}
.teraziler2>div{display:flex;flex-direction:column;align-items:center;gap:2mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:2mm}
.terazi2{width:76mm;height:53mm}
.rzar .zar{width:16mm;height:16mm;display:block}
.gorev{margin:0 0 2.5mm;padding:0;list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:1.5mm 6mm}
.gorev li{display:flex;gap:2.5mm;align-items:center;font-family:TTKB,sans-serif;font-size:5mm;line-height:1.25}
.gik{flex:none;min-width:9mm;height:9mm;padding:0 1.5mm;border-radius:999px;background:var(--ec,#2e6b4a);color:#fff;display:grid;place-items:center;font-family:TTKB,sans-serif;font-size:4.8mm}
.ortala{display:flex;justify-content:center}
.sahneler3{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;justify-items:center}
.sahneler3>svg{border:.4mm solid #cfd8d1;border-radius:3mm;padding:1mm}
.yonler{display:flex;flex-direction:column;gap:4mm}
.oklar{display:grid;grid-template-columns:repeat(9,1fr);gap:3mm}
.oklar svg{width:100%;height:auto}
.esbul{display:flex;flex-direction:column;gap:2.5mm}
.esbul>div{display:grid;grid-template-columns:30mm repeat(4,1fr);gap:4mm;align-items:center;border-bottom:.3mm dashed #cfd8d1;padding-bottom:2mm}
.esbul .model{height:26mm;border:.8mm solid #2e6b4a;border-radius:3mm;padding:2mm;display:block}
.esbul .sec{height:26mm;display:flex;align-items:center;justify-content:center}
.esbul .sec img{object-fit:contain}
.kopyalar{display:flex;flex-wrap:wrap;gap:4mm;justify-content:space-around;align-items:flex-end}
.tanis{display:grid;grid-template-columns:52mm 1fr;gap:5mm;align-items:center;border:.6mm solid #2e6b4a;border-radius:4mm;padding:3mm 5mm;background:#f6faf3}
.temsil{display:flex;flex-direction:column;gap:3mm;align-items:flex-start}
.t-zar .zar{width:20mm;height:20mm;display:block}
.t-res{display:flex;flex-wrap:wrap;gap:1.5mm}.t-res img{width:12mm;height:12mm}.t-res em{font-family:TTKB,sans-serif;font-size:5mm;color:#6b7a70}
.boyadizi{display:grid;grid-template-columns:repeat(10,1fr);gap:2mm}
.boyadizi span{aspect-ratio:1;border:.4mm solid #cfd8d1;border-radius:2mm;padding:1mm;display:block}
.balonlar.r{grid-template-columns:repeat(12,1fr)}
.gruplar4{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.gruplar4 .grup{min-height:30mm}
.hsira svg{flex:1}
.birebir2{display:flex;flex-direction:column;gap:4mm}
.birebir2>div{display:flex;flex-direction:column;gap:10mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:3mm 4mm}
.birebir2 .s{display:flex;gap:4mm;align-items:center}
.birebir2 .s span{width:18mm;height:18mm;display:block}
.birebir2 .s .yazkutu{margin-left:auto;width:12mm;height:12mm}
.kurallar{display:grid;grid-template-columns:repeat(3,1fr);gap:2mm 4mm;margin-top:2mm}
.kurallar span{display:flex;align-items:center;gap:2mm;font-family:TTKB,sans-serif;font-size:4.8mm}.kurallar img{width:12mm;height:12mm}
.keskatla{display:flex;flex-direction:column;gap:5mm;align-items:center}
.eller{display:grid;grid-template-columns:repeat(6,1fr);gap:3mm}
.eller>div{display:flex;flex-direction:column;align-items:center;gap:1.5mm;background:#fff;border-radius:3mm;padding:2mm}
.eller img{width:20mm;height:20mm}
.onarlar{display:flex;flex-direction:column;gap:3mm}
.onarlar>div{display:flex;align-items:center;justify-content:space-between;gap:3mm}
.kasalar{display:flex;gap:2mm}
.kasa{display:grid;grid-template-columns:repeat(5,1fr);gap:.5mm;background:#c48a4f;border:.6mm solid #8e5b2b;border-radius:2mm;padding:1mm;width:30mm}
.kasa img{width:5mm;height:5mm}
.geri{display:flex;flex-direction:column;gap:3mm}
.geri>div{display:flex;align-items:center;gap:2.2mm}
.geri>div>img{width:14mm;height:14mm}
.geri b{width:15mm;height:15mm;border:.6mm solid #2e6b4a;border-radius:2.5mm;display:grid;place-items:center;font-size:9mm;font-weight:400;background:#fff}
.geri i{font-style:normal;font-size:7mm;color:#9fb8a6}
.olctab{width:100%;border-collapse:separate;border-spacing:0 2.5mm;font-family:TTKB,sans-serif;font-size:6mm}
.olctab th{color:#2e6b4a;font-weight:400;text-align:center}
.olctab td{background:#fff;text-align:center;padding:2mm;border-radius:2mm}
.olctab td img{width:24mm;height:24mm}
.olctab .yazkutu{width:22mm;height:16mm}
.hikayeler{display:flex;flex-direction:column;gap:3mm}
.hikayeler>div{display:flex;align-items:center;gap:3mm;background:#fff;border-radius:3mm;padding:2.5mm 3mm}
.h-grup{display:flex;gap:1.5mm;flex-wrap:wrap}
.h-grup img{width:13mm;height:13mm}
.h-grup.gelen{padding:1mm 2mm;border:.5mm dashed #2e8b57;border-radius:3mm}
.hikayeler .yazkutu{margin-left:auto}
.giden{position:relative;display:block;opacity:.55}
.giden::after{content:"";position:absolute;inset:0;background:linear-gradient(45deg,transparent 46%,#c0392b 46%,#c0392b 54%,transparent 54%)}
.olcum{display:flex;flex-direction:column;gap:3mm}
.kars-uz{display:flex;flex-direction:column;gap:2mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:2.5mm 4mm}
.olc-satir{display:flex;align-items:center;justify-content:space-between;gap:4mm;border-bottom:.3mm dashed #cfd8d1;padding-bottom:2mm}
.sirala-uz{display:flex;flex-direction:column;gap:2mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:2.5mm 4mm}
.sirala-uz>div{display:flex;align-items:center;gap:4mm}
.sirala-uz .yazkutu{width:12mm;height:12mm}
.teraziler{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.teraziler>div{display:flex;flex-direction:column;align-items:center;gap:2mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:2mm}
.terazi{width:56mm;height:35mm}
.agir{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.agir>div{display:flex;justify-content:space-around;border:.4mm solid #cfd8d1;border-radius:3mm;padding:3mm}
.agir span{width:22mm;height:22mm;display:block}
.ik{width:9mm;height:9mm;border-radius:50%;background:#2e6b4a;color:#fff;display:grid;place-items:center;font:700 6mm Andika,sans-serif}
`;
  return { MAT, CSS };
};
