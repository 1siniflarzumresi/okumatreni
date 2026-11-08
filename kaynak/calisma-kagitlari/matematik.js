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

  const MAT = {
    'rakamlar': { baslik: '0 1 2 3', konu: 'Rakamları yazalım', hafta: 5, sayfalar: () => [
      numarala([rakamYaz(['0', '1', '2', '3', '4'])]),
      numarala([rakamYaz(['5', '6', '7', '8', '9'])]),
    ] },
    'sayma-10': { baslik: '1 – 10', konu: 'Nesne sayısını belirleme', hafta: 5, sayfalar: () => [
      numarala([sayYaz([['elma', 3], ['top', 5], ['balik', 2], ['yildiz', 7], ['cicek', 4], ['kus', 6]], 1), onlukYaz([4, 8, 6, 10])]),
      numarala([sayBoya([['armut', 3, 8], ['cilek', 6, 10], ['ordek', 2, 7], ['mantar', 9, 10]]), eslesRakam([5, 2, 8, 6], 2)]),
    ] },
    'sayma-20': { baslik: '11 – 20', konu: 'Nesne sayısını belirleme', hafta: 6, sayfalar: () => [
      numarala([onlukYaz([12, 15, 11, 18, 20, 14]), onlukCiz([13, 17, 16, 19, 11, 15])]),
      numarala([sayYaz([['yildiz', 12], ['balon', 15], ['ari', 11], ['top', 14]], 3), seritEksik([[10, 11, null, 13, null, 15], [15, null, 17, 18, null, 20]])]),
    ] },
    'sira': { baslik: '1. 2. 3.', konu: 'Sıra bildiren sayılar', hafta: 8, sayfalar: () => [
      numarala([siraBul([['ordek', 3, 7], ['kus', 5, 8], ['balik', 2, 6], ['kedi', 6, 8], ['ari', 4, 7]]), siraYaz(['kaplumbaga', 'kanguru', 'kedi', 'fil', 'fare'])]),
    ] },
    'karsilastirma': { baslik: 'çok az eşit', konu: 'Çok mu? Az mı? Eşit mi?', hafta: 10, sayfalar: () => [
      numarala([karsilastir([['elma', 5, 'armut', 3], ['top', 4, 'balon', 4], ['kus', 2, 'ordek', 6], ['yildiz', 7, 'cicek', 7], ['balik', 8, 'kedi', 5], ['ari', 3, 'cicek', 3]], 4)]),
      numarala([birebir([['kanguru', 5, 'havuc', 4], ['kedi', 3, 'balik', 5]]), esitle([['cilek', 6, 3], ['mantar', 4, 2]], 5)]),
    ] },
    'ritmik': { baslik: '2 · 5 · 10', konu: 'Ritmik saymalar', hafta: 11, sayfalar: () => [
      numarala([ritmikResim([['elma', 2, 5], ['top', 2, 4], ['yildiz', 5, 3], ['cilek', 10, 2]], 6),
        seritEksik([[2, 4, null, 8, null, 12], [5, 10, null, 20, null, 30], [10, 20, null, 40, null, 60], [20, 18, null, 14, null, 10], [null, 6, 8, null, 12, 14]])]),
    ] },
    'oruntu': { baslik: 'örüntü', konu: 'Sayı ve şekil örüntüleri', hafta: 12, sayfalar: () => [
      numarala([oruntuSekil([[['d', 'k', 'd', 'k', 'd', 'k'], 2], [['u', 'u', 'y', 'u', 'u', 'y'], 3], [['k', 'd', 'u', 'k', 'd', 'u'], 3]]),
        oruntuResim([[['elma', 'armut', 'elma', 'armut', 'elma'], ['elma', 'armut', 'cilek']], [['kus', 'kus', 'balik', 'kus', 'kus'], ['kedi', 'balik', 'kus']], [['top', 'balon', 'yildiz', 'top', 'balon'], ['yildiz', 'top', 'balon']]]),
        seritEksik([[1, 2, 1, 2, null, null], [3, 3, 4, 3, 3, null], [1, 2, 3, 1, 2, null]])]),
    ] },
    'tahmin': { baslik: 'tahmin', konu: 'Tahmin', hafta: 14, sayfalar: () => [
      numarala([tahmin([['yildiz', 9], ['balon', 14], ['ari', 6], ['cicek', 17]], 7)]),
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
.ik{width:9mm;height:9mm;border-radius:50%;background:#2e6b4a;color:#fff;display:grid;place-items:center;font:700 6mm Andika,sans-serif}
`;
  return { MAT, CSS };
};
