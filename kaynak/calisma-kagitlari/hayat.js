// Ladin Ormanı — 1. sınıf Hayat Bilgisi çalışma kâğıtları (haftalık, MEB yıllık planı sırasıyla).
// uret.js yükler: require('./hayat.js')({ ... , M: matematik ARAC }) → { HB, CSS }
// Vizyon: ders kitabı sorusu değil; sahne, oyun, keşif. Yönergeleri öğretmen okur.
// Üretim: node kaynak/calisma-kagitlari/uret.js hb   (tek hafta: hb:hafta-09)
module.exports = ({ etk, resim, resimCizgi, numarala, M }) => {
  const { R, karistir, sahne, IMGm, gorev, kutuK } = M;

  // ---------------- çizimler ----------------
  const YUZ = {
    mutlu: '<path d="M-14 8 q14 14 28 0" fill="none" stroke="#1f2a24" stroke-width="3.5" stroke-linecap="round"/>',
    uzgun: '<path d="M-14 16 q14 -12 28 0" fill="none" stroke="#1f2a24" stroke-width="3.5" stroke-linecap="round"/><path d="M-13 -4 q3 6 0 10" fill="#7cc4ff"/>',
    kizgin: '<path d="M-14 14 h28" stroke="#1f2a24" stroke-width="3.5" stroke-linecap="round"/><path d="M-20 -16 l12 6 M20 -16 l-12 6" stroke="#1f2a24" stroke-width="3.5" stroke-linecap="round"/>',
    saskin: '<ellipse cx="0" cy="12" rx="6" ry="8" fill="#1f2a24"/>',
    korkmus: '<path d="M-14 14 q3.5 -5 7 0 q3.5 5 7 0 q3.5 -5 7 0 q3.5 5 7 0" fill="none" stroke="#1f2a24" stroke-width="3"/><path d="M-20 -18 l10 -4 M20 -18 l-10 -4" stroke="#1f2a24" stroke-width="3" stroke-linecap="round"/>',
  };
  const RENKY = { mutlu: '#ffd23f', uzgun: '#9fd3f5', kizgin: '#ff8a80', saskin: '#c7b8ff', korkmus: '#b8e6c9' };
  const duygu = (tip, s = 60, bos) => `<svg viewBox="-40 -40 80 80" width="${s}" height="${s}"><circle r="34" fill="${bos ? '#fff' : RENKY[tip]}" stroke="#1f2a24" stroke-width="3"/>${bos ? '' : `<circle cx="-11" cy="-8" r="4" fill="#1f2a24"/><circle cx="11" cy="-8" r="4" fill="#1f2a24"/>${YUZ[tip]}`}</svg>`;
  const lamba = (renkler, s = 70) => `<svg viewBox="0 0 60 150" width="${s * .4}" height="${s}"><rect x="6" y="4" width="48" height="128" rx="12" fill="#2b3a48"/><rect x="26" y="132" width="8" height="16" fill="#2b3a48"/>${[0, 1, 2].map(i => `<circle cx="30" cy="${26 + i * 40}" r="15" fill="${renkler[i] || '#fff'}" stroke="#fff" stroke-width="2"/>`).join('')}</svg>`;
  // Türk bayrağı (TS 2289 oranları, sadeleştirilmiş). bos=true → boyamalık; ters=true → hilal/yıldız ters (yanlış seçenek)
  const bayrak = (w, { bos, ters, renk } = {}) => { const h = w * 2 / 3, G = h, kirmizi = bos ? '#fff' : (renk || '#e30a17');
    const ax = G / 2, ar = G / 4, bx = ax + G / 16, br = G * .2, yx = bx + G / 3 * .9;
    const yild = (cx, cy, r) => Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5 + Math.PI / 2, rr = i % 2 ? r * .38 : r; return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`; }).join(' ');
    // hilal: dış daire ile iç dairenin kesişiminden tek parça yol
    const cy = h / 2, ix = (ar * ar - br * br + bx * bx - ax * ax) / (2 * (bx - ax)), iy = Math.sqrt(ar * ar - (ix - ax) ** 2);
    const hilal = `M${ix} ${cy - iy} A${ar} ${ar} 0 1 0 ${ix} ${cy + iy} A${br} ${br} 0 1 1 ${ix} ${cy - iy} Z`;
    const ic = `<path d="${hilal}" fill="#fff" stroke="${bos ? '#1f2a24' : 'none'}" stroke-width="2.5" stroke-linejoin="round"/><polygon points="${yild(yx, h / 2, G / 8)}" fill="#fff" stroke="${bos ? '#1f2a24' : 'none'}" stroke-width="2"/>`;
    return `<svg viewBox="0 0 ${w} ${h}" width="100%"><rect width="${w}" height="${h}" fill="${kirmizi}" stroke="#1f2a24" stroke-width="2"/>${ters ? `<g transform="translate(${w} 0) scale(-1 1)">${ic}</g>` : ic}</svg>`; };
  const dunya = (s) => `<svg viewBox="-50 -50 100 100" width="${s}" height="${s}"><circle r="46" fill="#5aa9e6" stroke="#1f2a24" stroke-width="3"/><path d="M-30 -20 q10 -14 24 -6 q4 10 -6 14 q-6 10 -16 4 q-8 -2 -2 -12z M8 6 q14 -8 22 4 q2 14 -12 18 q-12 0 -10 -22z M-20 22 q8 -4 12 4 q-4 8 -12 -4z" fill="#7bd3a8" stroke="#1f2a24" stroke-width="2"/></svg>`;
  const gunesC = (s) => `<svg viewBox="-50 -50 100 100" width="${s}" height="${s}">${Array.from({ length: 12 }, (_, i) => `<path transform="rotate(${i * 30})" d="M0 -46 L5 -34 H-5 Z" fill="#ffb703"/>`).join('')}<circle r="30" fill="#ffd23f" stroke="#1f2a24" stroke-width="3"/></svg>`;
  const ayC = (s) => `<svg viewBox="-50 -50 100 100" width="${s}" height="${s}"><circle r="40" fill="#e9ecef" stroke="#1f2a24" stroke-width="3"/><circle cx="-12" cy="-10" r="8" fill="#ced4da"/><circle cx="14" cy="12" r="11" fill="#ced4da"/><circle cx="10" cy="-18" r="5" fill="#ced4da"/></svg>`;

  // ---------------- etkinlikler ----------------
  const benKarti = () => etk(0, 'Ben kimim? Çerçeveye kendi resmini çiz. Öğretmeninin okuduğu soruları cevapla: göz ve saç rengini boya, en sevdiğin meyveyi daire içine al.',
    `<div class="benkart"><div class="ayna"><div class="ayna-ic"></div></div><div class="ben-sag">
      <div class="ben-s"><b>Gözlerimin rengi</b><span class="goz">${[0, 1].map(() => '<i></i>').join('')}</span></div>
      <div class="ben-s"><b>Saçımın rengi</b><span class="sac"></span></div>
      <div class="ben-s"><b>En sevdiğim meyve</b><span class="meyveler">${['elma', 'muz', 'cilek', 'uzum', 'mandalina'].map(a => resim(a)).join('')}</span></div>
      <div class="ben-s"><b>Kaç yaşındayım?</b><span>${kutuK}</span></div></div></div>`);
  const duyguTanit = () => etk(0, 'Duygular! Her yüze bak, o duyguyu yüzünle sen de yap. Sonra her yüzü kendi rengine boya.',
    `<div class="duygular">${['mutlu', 'uzgun', 'kizgin', 'saskin', 'korkmus'].map(t => `<div>${duygu(t, 92)}<b class="ttkb">${{ mutlu: 'mutlu', uzgun: 'üzgün', kizgin: 'kızgın', saskin: 'şaşkın', korkmus: 'korkmuş' }[t]}</b></div>`).join('')}</div>`);
  const duyguCiz = (liste) => etk(0, 'Resme bak. Böyle bir anda ne hissedersin? Boş yüze o duyguyu çiz.',
    `<div class="duyguciz">${liste.map(a => `<div><span>${resim(a)}</span>${duygu('', 88, true)}</div>`).join('')}</div>`);
  const benzerFarkli = () => etk(0, 'Bir arkadaşınla yan yana dur. Benzer olan özelliklerinizi yeşile, farklı olanları turuncuya boya.',
    `<div class="bf">${[['Boyumuz', 'boy'], ['Saç rengimiz', 'sac'], ['Göz rengimiz', 'goz'], ['Sevdiğimiz renk', 'renk'], ['Sevdiğimiz oyun', 'oyun']].map(([m]) => `<div><b class="ttkb">${m}</b><span class="bf-k yesil">benzer</span><span class="bf-k turuncu">farklı</span></div>`).join('')}</div>`);
  // sağlıklı beslenme
  const SAGLIKLI = ['elma', 'havuc', 'sut', 'yogurt', 'balik', 'domates', 'ekmek', 'muz', 'yumurta', 'armut'], SAGLIKSIZ = ['seker', 'dondurma', 'lokum', 'kek', 'jole'];
  const yiyecekSec = (t) => etk(0, 'Sağlıklı büyümek için hangilerini daha sık yemeliyiz? Onları yeşile boyanmış daireyle işaretle. Az yememiz gerekenlerin altına kırmızı çizgi çiz.',
    `<div class="yiyecek">${karistir([...SAGLIKLI.slice(0, 8), ...SAGLIKSIZ.slice(0, 4)], R(t)).map(a => `<span>${resim(a)}</span>`).join('')}</div>`);
  const tabakCiz = () => etk(0, 'Sağlıklı bir öğün hazırla! Tabağa sevdiğin sağlıklı yiyecekleri çiz. Bardağa ne koyardın? Onu da çiz.',
    `<div class="ortala">${sahne(560, 260, '<ellipse cx="230" cy="140" rx="200" ry="110" fill="#fff" stroke="#1f2a24" stroke-width="4"/><ellipse cx="230" cy="140" rx="160" ry="84" fill="none" stroke="#cfd8d1" stroke-width="3"/><path d="M450 70 h70 l-10 170 h-50 z" fill="#eaf4ff" stroke="#1f2a24" stroke-width="4"/><path d="M20 60 v160 M10 60 v40 q10 10 20 0 v-40" fill="none" stroke="#9aa59d" stroke-width="6" stroke-linecap="round"/>', 160)}</div>`);
  const gunumSaat = () => etk(0, 'Sağlıklı bir gün! Her kutuda yaptığın şeyi çiz: sabah kahvaltı, okul, oyun, akşam yemeği, uyku.',
    `<div class="gunum">${['Sabah', 'Okulda', 'Oyun', 'Akşam', 'Gece'].map((g, i) => `<div><b class="ttkb">${g}</b>${[gunesC(40), resim('canta'), resim('top'), resim('tencere'), ayC(40)][i]}<div class="kutu-ciz"></div></div>`).join('')}</div>`);
  // trafik
  const lambaBoya = () => etk(0, 'Trafik ışığını doğru renklere boya: en üst kırmızı, ortası sarı, en alt yeşil. Sonra her ışığın yanındaki anlamı söyle.',
    `<div class="lambalar"><div>${lamba([], 230)}</div><div class="anlam">${[['#e63946', 'Kırmızı: DUR'], ['#ffb703', 'Sarı: HAZIRLAN'], ['#2a9d8f', 'Yeşil: GEÇ']].map(([r, m]) => `<p class="ttkb"><i style="background:${r}"></i>${m}</p>`).join('')}</div></div>`);
  const lambaEsle = () => etk(0, 'Yayalar için ışık hangisi? Işık yanınca ne yapmalısın? Çizgiyle eşleştir.',
    `<div class="esles"><div class="sol">${[['#e63946'], ['#2a9d8f']].map(([r], i) => `<div>${lamba(i ? ['#fff', '#fff', r] : [r, '#fff', '#fff'], 120)}<i></i></div>`).join('')}</div><div class="sag">${[['bekle', 'Kaldırımda bekle'], ['gec', 'Bak, sonra karşıya geç']].map(([k, m]) => `<div><i></i><b class="ttkb">${m}</b></div>`).join('')}</div></div>`);
  const yolSahne = () => { let s = `<rect width="640" height="300" fill="#e7faf2"/><rect y="110" width="640" height="110" fill="#6c757d"/><rect y="98" width="640" height="12" fill="#ced4da"/><rect y="220" width="640" height="12" fill="#ced4da"/>`;
    for (let i = 0; i < 8; i++) s += `<rect x="${270 + 0}" y="${116 + i * 13}" width="100" height="8" fill="#fff"/>`;
    for (let i = 0; i < 10; i++) s += `<rect x="${20 + i * 64}" y="162" width="34" height="6" fill="#ffd23f"/>`;
    s += `<g transform="translate(400 30)">${'<rect x="0" y="0" width="22" height="60" rx="5" fill="#2b3a48"/><circle cx="11" cy="14" r="7" fill="#fff" stroke="#adb5bd"/><circle cx="11" cy="32" r="7" fill="#fff" stroke="#adb5bd"/><circle cx="11" cy="50" r="7" fill="#fff" stroke="#adb5bd"/><rect x="8" y="60" width="6" height="40" fill="#2b3a48"/>'}</g>`;
    s += IMGm('araba', 60, 112, 90) + IMGm('otobus', 470, 150, 110) + IMGm('top', 160, 190, 34) + IMGm('kedi', 560, 40, 60) + IMGm('agac', 20, 0, 90) + IMGm('agac', 520, 228, 70);
    return sahne(640, 300, s, 178); };
  const yolGorev = () => etk(0, 'Okul yolundayız! Öğretmeninin söylediklerini yap.',
    gorev([['1', 'Yaya geçidini bul, çizgilerini maviye boya.'], ['2', 'Trafik ışığını doğru renklere boya.'], ['3', 'Yolda tehlikeli olan şeyi daire içine al.'], ['4', 'Kendini kaldırımda, güvenli bir yere çiz.']]) + `<div class="ortala">${yolSahne()}</div>`);
  const dogruYanlisResim = (liste) => etk(0, 'Doğru davranışın yanındaki gülen yüzü, yanlış davranışın yanındaki üzgün yüzü boya.',
    `<div class="dyr">${liste.map(([a, m]) => `<div><span>${resim(a)}</span><p class="ttkb">${m}</p>${duygu('mutlu', 54)}${duygu('uzgun', 54)}</div>`).join('')}</div>`);
  // bayrak ve marş
  const bayrakBoya = () => etk(0, 'Şanlı bayrağımızı boya. Ay ve yıldız beyaz kalsın, zemini kırmızıya boya.',
    `<div class="bayrak-boya">${bayrak(600, { bos: true })}</div>`);
  const dogruBayrak = () => etk(0, 'Hangisi bizim bayrağımız? Doğru olanı daire içine al. Yanlış olanlarda ne farklı? Söyle.',
    `<div class="bayraklar">${karistir([bayrak(300), bayrak(300, { ters: true }), bayrak(300, { renk: '#2a6fdb' })], R(19)).map(b => `<div>${b}</div>`).join('')}</div>`);
  const marsKurallari = () => etk(0, 'İstiklâl Marşı okunurken nasıl davranırız? Doğru davranışın yanındaki kutuya ✓ koy.',
    `<div class="mars ttkb">${['Hazır ol duruşunda dururum.', 'Arkadaşımla konuşurum.', 'Bayrağa bakarım.', 'Yerimde zıplarım.', 'Marşa eşlik ederim.'].map(m => `<div><span>${m}</span>${kutuK}</div>`).join('')}</div>`);
  const bayrakYap = () => etk(0, 'Kendi bayrağını yap! Kırmızı kâğıda kesik çizgilerden kestiğin beyaz ayı ve yıldızı yapıştır. Bayrağını bir çubuğa tak.',
    `<div class="kes">${sahne(520, 220, `<rect x="10" y="10" width="300" height="200" fill="#fff" stroke="#e30a17" stroke-width="4" stroke-dasharray="10 6"/><circle cx="410" cy="110" r="70" fill="none" stroke="#1f2a24" stroke-width="3" stroke-dasharray="8 6"/><circle cx="430" cy="110" r="56" fill="none" stroke="#9aa59d" stroke-width="2" stroke-dasharray="4 4"/><polygon points="${Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 14 : 36; return `${490 + r * Math.cos(a)},${60 + r * Math.sin(a)}`; }).join(' ')}" fill="none" stroke="#1f2a24" stroke-width="3" stroke-dasharray="6 5"/><text x="160" y="118" text-anchor="middle" font-size="22" font-family="TTKB" fill="#e30a17">kırmızı kâğıt</text>`, 170)}</div>`);
  // gök
  const gokBoyut = () => etk(0, 'Güneş, Dünya ve Ay. En büyüğü hangisi? Kutulara büyükten küçüğe 1, 2, 3 yaz.',
    `<div class="gok"><div>${dunya(120)}${kutuK}</div><div>${gunesC(190)}${kutuK}</div><div>${ayC(70)}${kutuK}</div></div>`);
  const gunduzGece = (liste) => etk(0, 'Gündüz mü, gece mi? Gündüz gördüklerini Güneş\'e, gece gördüklerini Ay\'a çizgiyle bağla.',
    `<div class="gg"><div class="gg-k">${gunesC(110)}</div><div class="gg-orta">${liste.map(a => `<span>${resim(a)}</span>`).join('')}</div><div class="gg-k gece">${ayC(90)}</div></div>`);
  const gokyuzu = () => etk(0, 'Gece gökyüzünü çiz! Ay\'ı, yıldızları çiz. Gündüz gökyüzünü de yanındaki kutuya çiz.',
    `<div class="gokciz"><div class="g-gun"><b class="ttkb">Gündüz</b></div><div class="g-gece"><b class="ttkb">Gece</b></div></div>`);

  const HB = {
    'hafta-06': { unite: 1, hafta: 6, baslik: 'Ben Kimim?', konu: 'Nasıl görünüyor, neler hissediyorum?', sayfalar: () => [
      numarala([benKarti(), duyguTanit(), duyguCiz(['hediye', 'orumcek', 'yagmur'])]),
      numarala([duyguCiz(['balon', 'dondurma', 'kopek', 'yilan', 'kek', 'kar']), benzerFarkli()]),
    ] },
    'hafta-07': { unite: 2, hafta: 7, baslik: 'Sağlıklı Hayat', konu: 'Sağlıklı hayat ne güzel', sayfalar: () => [
      numarala([yiyecekSec(7), tabakCiz()]),
      numarala([gunumSaat()]),
    ] },
    'hafta-09': { unite: 2, hafta: 9, baslik: 'Trafik Işığı', konu: 'Trafik kuralları iyi ki var', sayfalar: () => [
      numarala([lambaBoya(), lambaEsle()]),
      numarala([yolGorev(), dogruYanlisResim([['top', 'Yolda top oynamak'], ['araba', 'Arabada kemer takmak']])]),
    ] },
    'hafta-10': { unite: 2, hafta: 10, baslik: 'Okul Yolunda', konu: 'Trafik kuralları iyi ki var', sayfalar: () => [
      numarala([lambaEsle(), dogruYanlisResim([['otobus', 'Otobüse sırayla binmek'], ['kedi', 'Yola koşan kediyi kovalamak']])]),
      numarala([dogruYanlisResim([['top', 'Yolda top oynamak'], ['otobus', 'Otobüse sırayla binmek'], ['araba', 'Arabada kemer takmak'], ['kedi', 'Yola koşan kediyi kovalamak'], ['ucurtma', 'Elektrik tellerinin yanında uçurtma uçurmak']])]),
    ] },
    'hafta-19': { unite: 4, hafta: 19, baslik: 'Bayrağım', konu: 'Bayrağım ve marşımla gururluyum', sayfalar: () => [
      numarala([bayrakBoya(), dogruBayrak()]),
      numarala([marsKurallari(), bayrakYap()]),
    ] },
    'hafta-20': { unite: 4, hafta: 20, baslik: 'İstiklâl Marşı', konu: 'Bayrağım ve marşımla gururluyum', sayfalar: () => [
      numarala([marsKurallari(), dogruBayrak()]),
      numarala([bayrakYap(), etk(0, 'Bayrağımızı nerelerde görürsün? Okulda, evde, bayramda… Gördüğün bir yeri çiz.', '<div class="kutu-ciz" style="height:120mm"></div>')]),
    ] },
    'hafta-26': { unite: 5, hafta: 26, baslik: 'Güneş, Dünya, Ay', konu: 'Güneş, Dünya, Ay · Doğayla baş başa', sayfalar: () => [
      numarala([gokBoyut(), gunduzGece(['kus', 'gunes', 'yildiz', 'ari', 'mum', 'cicek', 'lamba', 'ucurtma'])]),
      numarala([gokyuzu()]),
    ] },
    'hafta-27': { unite: 5, hafta: 27, baslik: 'Gökyüzünde Neler Var?', konu: 'Güneş, Dünya, Ay · Gökyüzünde neler var?', sayfalar: () => [
      numarala([gunduzGece(['yildiz', 'bulut', 'kus', 'ucak', 'roket', 'ucurtma', 'balon', 'helikopter']), gokBoyut()]),
      numarala([gokyuzu()]),
    ] },
  };
  const CSS = `
.benkart{display:grid;grid-template-columns:70mm 1fr;gap:6mm;align-items:center}
.ayna{border:2.5mm solid #e9c46a;border-radius:50% 50% 45% 45%;padding:2mm;background:#fff}
.ayna-ic{height:82mm;border-radius:50% 50% 45% 45%;background:#f4f9fc}
.ben-sag{display:flex;flex-direction:column;gap:3mm}
.ben-s{background:#fff;border-radius:3mm;padding:2.5mm 3mm;display:flex;align-items:center;justify-content:space-between;gap:3mm;font-family:TTKB,sans-serif}
.ben-s b{font-weight:400;font-size:5.5mm}
.goz{display:flex;gap:3mm}.goz i{width:12mm;height:8mm;border:.5mm solid #1f2a24;border-radius:50%;display:block}
.sac{width:30mm;height:10mm;border:.5mm solid #1f2a24;border-radius:3mm}
.meyveler{display:flex;gap:1.5mm}.meyveler img{width:11mm;height:11mm}
.duygular{display:flex;justify-content:space-around;background:#fff;border-radius:3mm;padding:3mm}
.duygular>div{display:flex;flex-direction:column;align-items:center;gap:1mm}.duygular b{font-weight:400;font-size:6mm}
.duygular svg{width:24mm;height:24mm}
.duyguciz{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.duyguciz>div{display:flex;align-items:center;justify-content:space-around;background:#fff;border-radius:3mm;padding:3mm}
.duyguciz img{width:26mm;height:26mm}.duyguciz svg{width:24mm;height:24mm}
.bf{display:flex;flex-direction:column;gap:2.5mm}
.bf>div{display:grid;grid-template-columns:1fr 34mm 34mm;gap:3mm;align-items:center;background:#fff;border-radius:3mm;padding:2.5mm 4mm}
.bf b{font-weight:400;font-size:6mm}
.bf-k{border:.6mm solid;border-radius:999px;text-align:center;padding:1.5mm;font:5mm TTKB,sans-serif}
.bf-k.yesil{border-color:#12b886;color:#0b7a59}.bf-k.turuncu{border-color:#f4a100;color:#a86a00}
.yiyecek{display:grid;grid-template-columns:repeat(6,1fr);gap:3mm}
.yiyecek span{aspect-ratio:1;background:#fff;border-radius:50%;padding:3mm;border:.5mm solid #cfd8d1;display:block}
.gunum{display:grid;grid-template-columns:repeat(5,1fr);gap:3mm}
.gunum>div{display:flex;flex-direction:column;align-items:center;gap:2mm;background:#fff;border-radius:3mm;padding:2.5mm}
.gunum b{font-weight:400;font-size:6mm}.gunum img,.gunum svg{width:14mm;height:14mm}
.kutu-ciz{width:100%;height:120mm;border:.5mm dashed #9fc6ef;border-radius:3mm}
.lambalar{display:flex;align-items:center;justify-content:space-around;background:#fff;border-radius:3mm;padding:4mm}
.lambalar svg{height:70mm;width:auto}
.anlam p{display:flex;align-items:center;gap:3mm;font-size:8mm;margin:0 0 4mm}
.anlam i{width:9mm;height:9mm;border-radius:50%;display:block}
.esles .sag b{font-size:8mm;font-weight:400}
.esles .sol svg{height:48mm;width:auto}
.esles .sol div,.esles .sag div{height:52mm}
.dyr{display:flex;flex-direction:column;gap:3mm}
.dyr>div{display:grid;grid-template-columns:30mm 1fr 18mm 18mm;gap:4mm;align-items:center;background:#fff;border-radius:3mm;padding:3mm}
.dyr img{width:28mm;height:28mm}.dyr p{margin:0;font-size:7mm}.dyr svg{width:16mm;height:16mm}
.bayrak-boya{background:#fff;border-radius:3mm;padding:4mm}
.bayraklar{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm}
.bayraklar>div{background:#fff;border-radius:3mm;padding:3mm}
.mars{display:flex;flex-direction:column;gap:2.5mm;font-size:7mm}
.mars>div{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:3mm;padding:2mm 4mm}
.kes{background:#fff;border-radius:3mm;padding:3mm;display:flex;justify-content:center}
.gok{display:flex;align-items:center;justify-content:space-around;background:#0f2a4a;border-radius:3mm;padding:5mm}
.gok>div{display:flex;flex-direction:column;align-items:center;gap:3mm}
.gg{display:grid;grid-template-columns:40mm 1fr 40mm;gap:4mm;align-items:center}
.gg-k{display:flex;justify-content:center;align-items:center;background:#fff6dc;border-radius:3mm;height:100%;min-height:80mm}
.gg-k.gece{background:#0f2a4a}
.gg-orta{display:grid;grid-template-columns:1fr 1fr;gap:3mm}
.gg-orta span{background:#fff;border-radius:3mm;padding:2mm;display:flex;justify-content:center}.gg-orta img{width:22mm;height:22mm}
.gokciz{flex:1;display:grid;grid-template-rows:1fr 1fr;gap:4mm;min-height:200mm}
.g-gun{background:linear-gradient(#bfe4ff,#eaf6ff);border-radius:3mm;padding:3mm}
.g-gece{background:linear-gradient(#0f2a4a,#24476e);border-radius:3mm;padding:3mm;color:#fff}
.g-gun b,.g-gece b{font-weight:400;font-size:7mm}
`;
  return { HB, CSS };
};
