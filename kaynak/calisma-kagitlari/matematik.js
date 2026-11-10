// Ladin Ormanı — 1. sınıf Matematik çalışma kağıtları (Sayılar ve Nicelikler 1).
// uret.js içinden yüklenir: require('./matematik.js')(araclar) → { anahtar: { baslik, konu, hafta, sayfalar() } }
// Kural: çocuğun okuyacağı kelime yok; yalnız rakam, resim ve şekil. Yönergeleri öğretmen okur.
// İşlem işareti (+ − =) bu ünitede kullanılmaz.
module.exports = ({ etk, satir, resim, rastgele, numarala }) => {
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
  const grup = (ad, n, r) => `<div class="grup">${Array.from({ length: n }, () => `<span style="transform:rotate(${Math.round((r() - .5) * 16)}deg)">${resim(ad)}</span>`).join('')}</div>`;

  // --- bileşenler ---
  const rakamYaz = (rakamlar) => etk(0, 'Çerçevedeki noktaları say. Yeşil noktadan başla, okları izle. Sonra rakamı kendin yaz.',
    `<div class="rakamlar">${rakamlar.map(d => `<div class="rs">${onluk(+d, 28)}<div>${satir([[d, 'model'], [d, 'iz'], [d, 'iz'], [d, 'iz'], [d, 'iz'], [d, 'iz']], 150, 15)}${satir([], 150, 15)}</div></div>`).join('')}</div>`);
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
      const ic = typeof icerik === 'string' ? `<image href="/deneme/materyaller/resimler/${icerik}.png" x="${x - 26}" y="${ty - 52}" width="52" height="52"/>`
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
    `<div class="kayip">${liste.map(([a, hedef], i) => `<div>${satirSvg2(110, 96, `<line x1="18" x2="18" y1="2" y2="34" stroke="#1f2a24" stroke-width="2"/><path d="M18 2 h30 l-7 8 l7 8 h-30 Z" fill="#c0392b"/><text x="31" y="15" font-size="13" text-anchor="middle" fill="#fff" font-family="TTKB" font-weight="700">${hedef}</text>` + ray(110, 80) + vagon(10, 22, dominoG(a, null, 8, 16, 30), RENK[i % RENK.length]))}</div>`).join('')}</div>`);
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
      if (o) s += `<image href="/deneme/materyaller/resimler/${o[0]}.png" x="${x - 22}" y="${y - 26}" width="44" height="44"/><rect x="${x - 22}" y="${y + 14}" width="44" height="20" rx="10" fill="#c0392b"/>` +
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

  const MAT = {
    'rakamlar': { unite: 1, baslik: '0 1 2 3', konu: 'Rakamları yazalım', hafta: 5, sayfalar: () => [
      numarala([rakamYaz(['0', '1', '2', '3', '4'])]),
      numarala([rakamYaz(['5', '6', '7', '8', '9'])]),
    ] },
    'sayma-10': { unite: 1, baslik: '1 – 10', konu: 'Nesne sayısını belirleme', hafta: 5, sayfalar: () => [
      numarala([sayYaz([['elma', 3], ['top', 5], ['balik', 2], ['yildiz', 7], ['cicek', 4], ['kus', 6]], 1), onlukYaz([4, 8, 6, 10])]),
      numarala([sayBoya([['armut', 3, 8], ['cilek', 6, 10], ['ordek', 2, 7], ['mantar', 9, 10]]), eslesRakam([5, 2, 8, 6], 2)]),
    ] },
    'sayma-20': { unite: 1, baslik: '11 – 20', konu: 'Nesne sayısını belirleme', hafta: 6, sayfalar: () => [
      numarala([onlukYaz([12, 15, 11, 18, 20, 14]), onlukCiz([13, 17, 16, 19, 11, 15])]),
      numarala([sayYaz([['yildiz', 12], ['balon', 15], ['ari', 11], ['top', 14]], 3), seritEksik([[10, 11, null, 13, null, 15], [15, null, 17, 18, null, 20]])]),
    ] },
    'sira': { unite: 1, baslik: '1. 2. 3.', konu: 'Sıra bildiren sayılar', hafta: 8, sayfalar: () => [
      numarala([siraBul([['ordek', 3, 7], ['kus', 5, 8], ['balik', 2, 6], ['kedi', 6, 8], ['ari', 4, 7]]), siraYaz(['kaplumbaga', 'kanguru', 'kedi', 'fil', 'fare'])]),
    ] },
    'karsilastirma': { unite: 1, baslik: 'çok az eşit', konu: 'Çok mu? Az mı? Eşit mi?', hafta: 10, sayfalar: () => [
      numarala([karsilastir([['elma', 5, 'armut', 3], ['top', 4, 'balon', 4], ['kus', 2, 'ordek', 6], ['yildiz', 7, 'cicek', 7], ['balik', 8, 'kedi', 5], ['ari', 3, 'cicek', 3]], 4)]),
      numarala([birebir([['kanguru', 5, 'havuc', 4], ['kedi', 3, 'balik', 5]]), esitle([['cilek', 6, 3], ['mantar', 4, 2]], 5)]),
    ] },
    'ritmik': { unite: 1, baslik: '2 · 5 · 10', konu: 'Ritmik saymalar', hafta: 11, sayfalar: () => [
      numarala([ritmikResim([['elma', 2, 5], ['top', 2, 4], ['yildiz', 5, 3], ['cilek', 10, 2]], 6),
        seritEksik([[2, 4, null, 8, null, 12], [5, 10, null, 20, null, 30], [10, 20, null, 40, null, 60], [20, 18, null, 14, null, 10], [null, 6, 8, null, 12, 14]])]),
    ] },
    'oruntu': { unite: 1, baslik: 'örüntü', konu: 'Sayı ve şekil örüntüleri', hafta: 12, sayfalar: () => [
      numarala([oruntuSekil([[['d', 'k', 'd', 'k', 'd', 'k'], 2], [['u', 'u', 'y', 'u', 'u', 'y'], 3], [['k', 'd', 'u', 'k', 'd', 'u'], 3]]),
        oruntuResim([[['elma', 'armut', 'elma', 'armut', 'elma'], ['elma', 'armut', 'cilek']], [['kus', 'kus', 'balik', 'kus', 'kus'], ['kedi', 'balik', 'kus']], [['top', 'balon', 'yildiz', 'top', 'balon'], ['yildiz', 'top', 'balon']]]),
        seritEksik([[1, 2, 1, 2, null, null], [3, 3, 4, 3, 3, null], [1, 2, 3, 1, 2, null]])]),
    ] },
    'tahmin': { unite: 1, baslik: 'tahmin', konu: 'Tahmin', hafta: 14, sayfalar: () => [
      numarala([tahmin([['yildiz', 9], ['balon', 14], ['ari', 6], ['cicek', 17]], 7)]),
    ] },
    'domino-tren': { unite: 0, baslik: 'domino treni', konu: 'Nesne sayısını belirleme', hafta: 5, sayfalar: () => [
      numarala([dominoTren([[[2, 1], [3, 3], [5, 0], [4, 2]], [[1, 1], [6, 1], [2, 2], [3, 4]]]),
        kayipYari([[2, 5], [4, 6], [1, 3], [3, 7], [5, 8], [0, 4]])]),
      numarala([zarYolu(), zarKaydi(20)]),
    ] },
    'uzunluk': { unite: 2, baslik: 'uzun kısa', konu: 'Uzunluk ölçme', hafta: 16, sayfalar: () => [
      numarala([uzunKisa([[['kalem', 5], ['kalem', 8]], [['serit', 9], ['serit', 6]], [['dal', 4], ['dal', 7], ['dal', 5]]]),
        enKisa([[['kalem', 6], ['kalem', 3], ['kalem', 8]], [['serit', 7], ['serit', 9], ['serit', 5]]]),
        uzSirala([[['kalem', 7], ['kalem', 4], ['kalem', 9]]])]),
      numarala([olc([['kalem', 4], ['serit', 7], ['dal', 6], ['kalem', 9]], 'atac'), olc([['serit', 5], ['kalem', 8]], 'kup')]),
      numarala([tahminOlc([['kalem', 6], ['dal', 8], ['serit', 4], ['kalem', 7], ['serit', 9]]),
        uzSirala([[['serit', 8], ['serit', 3], ['serit', 6]], [['dal', 5], ['dal', 9], ['dal', 3]]])]),
    ] },
    'tartma': { unite: 2, baslik: 'ağır hafif', konu: 'Tartma', hafta: 18, sayfalar: () => [
      numarala([teraziOku([['elma', 'kedi', 1], ['fil', 'top', -1], ['balon', 'kitap', 1], ['armut', 'elma', 0], ['kaplumbaga', 'yaprak', -1], ['kalem', 'kova', 1]]),
        agirHafif([['fil', 'fare'], ['yaprak', 'kalem'], ['kitap', 'balon'], ['inek', 'kedi'], ['tencere', 'kasik'], ['kus', 'kopek']])]),
      numarala([kupDenge([['elma', 3], ['top', 5], ['kitap', 7], ['armut', 2], ['ayakkabi', 6], ['cilek', 1]])]),
    ] },
  };
  const CSS = `
.onluk{display:block}.onluk2{display:flex;gap:1.5mm}
.rakamlar{display:flex;flex-direction:column;gap:3mm}
.rs{display:flex;align-items:center;gap:6mm}
.yazkutu{display:inline-block;width:16mm;height:16mm;border:.6mm solid #4a5a50;border-radius:2.5mm;background:#fff;flex:none}
.grup{display:flex;flex-wrap:wrap;gap:1mm;align-content:center;justify-content:center;border:.4mm solid #cfd8d1;border-radius:3mm;padding:2mm;min-height:24mm}
.grup span{width:12mm;height:12mm;display:block}
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
.kars .grup{min-height:33mm}.kars .grup span{width:13mm;height:13mm}
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
.gruplar{display:flex;gap:3mm;flex:1}.gruplar .grup{min-height:20mm;padding:1.5mm}.gruplar .grup span{width:8mm;height:8mm}
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
.dagin span{position:absolute;width:12mm;height:12mm}
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
