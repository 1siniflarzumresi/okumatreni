// Ladin Ormanı — 1. sınıf ilk okuma yazma çalışma kağıtları üreticisi.
// Kullanım: depo kökünde `node kaynak/calisma-kagitlari/uret.js a` (harf verilmezse hepsi).
// Çıktı: deneme/materyaller/1-sinif/turkce/<harf>.pdf ve önizleme PNG'si.
// Yazılar TTKB Dik Temel Abece (kaynak/fontlar/ttkb.ttf), resimler deneme/materyaller/resimler/.
const fs = require('fs'), path = require('path'), http = require('http');
const { chromium } = require('playwright');

const KOK = path.resolve(__dirname, '../..');
const GEN = JSON.parse(fs.readFileSync(path.join(__dirname, 'genislik.json'), 'utf8'));
const YON = require('./yon.js');
const CIKTI = path.join(KOK, 'deneme/materyaller/1-sinif/turkce');

// ---------- yazma satırı: gerçek defter gibi eşit aralıklı üç çizgi ----------
// Font birimi: büyük harf boyu UST = 728. Kesikli çizgi tam ortada (364).
// Büyük harf alt çizgiden üst çizgiye, küçük harf alt çizgiden kesikli çizgiye oturur.
// TTKB'de küçük harf boyu 410 (büyüğün %56'sı); defterde yarısı olsun diye küçük harfler
// 364/410 oranında küçültülür, kesikli çizginin üstü (l, t, i noktası) üst yarıya yayılır.
const UST = 728, ORTA = 364, KX = 410, KO = ORTA / KX;
const BOSLUK = 300;                      // harfler arası
const kucuk = ch => ch === ch.toLocaleLowerCase('tr') && ch !== ch.toLocaleUpperCase('tr');
function nokta(ch, x, y) {
  x = +x; y = +y;
  if (!kucuk(ch)) {                       // büyük harf: uçları çizgiye oturt
    if (Math.abs(y - UST) <= 24) y = UST; if (Math.abs(y) <= 10) y = 0;
    return [x, y];
  }
  if (Math.abs(y - KX) <= 8) y = KX; if (Math.abs(y) <= 10) y = 0; 
  const yy = y <= KX ? y * KO : (y <= 712 ? ORTA + (y - KX) * (UST - ORTA) / (712 - KX) : UST + (y - 712));
  return [Math.round(x * KO), Math.round(yy)];
}
const yolCevir = (ch, d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => nokta(ch, x, y).join(' '));
const genislik = ch => Math.round(GEN[ch].w * (kucuk(ch) ? KO : 1));
function harfIz(ch, x, B, kip, tekNokta) {
  const yollar = YON[ch].map(([d, n, o]) => d.startsWith('dot')
    ? ['dot', n, o, nokta(ch, ...d.split(' ').slice(1))] : [yolCevir(ch, d), n, o]);
  const g = `translate(${x} ${B}) scale(1,-1)`;
  const bas = d => d.match(/M(-?\d+) (-?\d+)/).slice(1).map(Number);
  let s = '';
  if (kip === 'model') {
    yollar.forEach(([d, , , p]) => {      // açık yeşil kalın harf gövdesi
      s += d === 'dot' ? `<g transform="${g}"><circle cx="${p[0]}" cy="${p[1]}" r="50" fill="#d3e4d6"/></g>`
        : `<g transform="${g}"><path d="${d}" fill="none" stroke="#d3e4d6" stroke-width="96" stroke-linecap="round" stroke-linejoin="round"/></g>`; });
    yollar.forEach(([d, n, o, p], i) => {
      const r = i ? '#c0392b' : '#1f6b45';
      const [sx, sy] = d === 'dot' ? p : bas(d);
      if (d !== 'dot') s += `<g transform="${g}"><path d="${d}" fill="none" stroke="${r}" stroke-width="34" stroke-linecap="round" marker-end="url(#ok${i ? 2 : 1})"/></g>`;
      s += `<g transform="${g}"><circle cx="${sx}" cy="${sy}" r="${d === 'dot' ? 40 : 44}" fill="${r}"/>
        <g transform="translate(${sx + (o ? o[0] : -62)} ${sy + (o ? o[1] : 58)}) scale(1,-1)"><circle r="72" fill="#fff" stroke="${r}" stroke-width="12"/><text y="26" text-anchor="middle" font-size="98" font-family="Andika,sans-serif" font-weight="700" fill="${r}">${n}</text></g></g>`;
    });
  } else if (kip === 'iz') {
    yollar.forEach(([d, , , p]) => {
      s += d === 'dot' ? `<g transform="${g}"><circle cx="${p[0]}" cy="${p[1]}" r="30" fill="#8a8f8b"/></g>`
        : `<g transform="${g}"><path class="iz" d="${d}" fill="none" stroke="#8a8f8b" stroke-width="44" stroke-linecap="round"/></g>`; });
    yollar.forEach(([d], i) => { if (d === 'dot' || (tekNokta && i)) return; const [sx, sy] = bas(d);
      s += `<g transform="${g}"><circle cx="${sx}" cy="${sy}" r="${i ? 30 : 40}" fill="${i ? '#5fa476' : '#1f6b45'}"/></g>`; });
  }
  return s;
}
// dizi: [['A','model'],['A','iz'],...]; kalan yer boş kalır
function satir(dizi, genislikMm, capMm) {
  const birim = capMm / UST;                       // mm / font birimi
  const W = genislikMm / birim, ustPay = 190, altPay = 70;
  const H = ustPay + UST + altPay, B = ustPay + UST;
  let x = dizi[0] && dizi[0][1] === 'model' ? 170 : 60, ic = '';
  for (const [ch, kip] of dizi) {
    if (kip === 'kelime') { for (const h of ch) { ic += harfIz(h, x, B, 'iz', true); x += genislik(h) + 90; } x += 420; continue; }
    ic += harfIz(ch, x, B, kip); x += genislik(ch) + BOSLUK;
  }
  return `<svg class="satir" viewBox="0 0 ${W} ${H}" style="width:${genislikMm}mm;height:${H * birim}mm">
    <line x1="0" x2="${W}" y1="${B - UST}" y2="${B - UST}" class="c-ust"/>
    <line x1="0" x2="${W}" y1="${B - ORTA}" y2="${B - ORTA}" class="c-orta"/>
    <line x1="0" x2="${W}" y1="${B}" y2="${B}" class="c-alt"/>${ic}</svg>`;
}

// ---------- sayfa parçaları ----------
const resim = ad => `<img src="/deneme/materyaller/resimler/${ad}.png" alt="">`;
const LADIN = `<svg viewBox="0 0 40 48" class="ladin"><path d="M20 2 L30 16 H25 L33 27 H27 L36 39 H4 L13 27 H7 L15 16 H10 Z" fill="#2e6b4a"/><rect x="17.5" y="39" width="5" height="7" rx="1" fill="#8e5b2b"/></svg>`;
function sayfa({ harf, govde, no, toplam }) {
  return `<section class="sayfa">
  <header><div class="baslik">${LADIN}<div class="harf ttkb">${harf.toLocaleUpperCase('tr')}${harf}</div></div>
    <div class="ad ttkb"><span>Adım:</span><i></i><span>Tarih:</span><i class="kisa"></i></div></header>
  ${govde}
  <footer><span>Ladin Ormanı · 1. Sınıf Türkçe · ${harf.toLocaleUpperCase('tr')} sesi</span><span>${toplam > 1 ? no + ' / ' + toplam : ''}</span></footer>
  </section>`;
}
const etk = (no, yonerge, ic) => `<div class="etk"><h2 class="ttkb"><b>${no}</b>${yonerge}</h2>${ic}</div>`;

// ---------- harflere özel içerik ----------
// Kural: çocuğun okuyacağı her harf/hece/kelime o ana kadar öğretilmiş harflerden (A N E T İ L sırası).
// Yönergeleri öğretmen ya da bir büyüğü okur. Resim adları yazılmaz.
const SIRA = ['a', 'n', 'e', 't', 'i', 'l'];
const B = h => h.toLocaleUpperCase('tr');
function rastgele(tohum) { let x = tohum; return () => (x = (x * 16807) % 2147483647) / 2147483647; }
const ses = h => `<span class="ses">${h}</span>`;
const S = dizi => satir(dizi, 186, 16);
const kucukS = (dizi, mm) => satir(dizi, mm, 9);

function sesiBul(h, liste) {
  return etk(0, `Resimlerin adını söyle. Adı ${ses(h)} sesiyle başlayanları daire içine al.`,
    `<div class="resimler">${liste.map(r => `<div class="r">${resim(r)}</div>`).join('')}</div>`);
}
function sesYeri(h, liste) {        // liste[0] örnek: [resim, 0 baş | 1 orta | 2 son]
  return etk(0, `${ses(h)} sesini nerede duyuyorsun? Başta, ortada ya da sonda. Doğru kutuyu boya.`,
    `<div class="yerler">${liste.map(([r, k], j) => `<div class="y${j ? '' : ' ornek'}">${resim(r)}<div class="kutular">${[0, 1, 2].map(i => `<span${!j && i === k ? ' class="dolu"' : ''}></span>`).join('')}</div>${j ? '' : '<em class="ttkb">örnek</em>'}</div>`).join('')}</div>`);
}
function sigan(ch, pay) {            // satırın ~%60'ını dolduracak kadar noktalı harf
  const W = 186 / (16 / 728) * 0.6;
  return Math.max(2, Math.floor((W - pay) / (genislik(ch) + BOSLUK)));
}
function harfYazma(h) {
  const H = B(h), iz = (c, k) => Array(k).fill([c, 'iz']);
  return etk(0, 'Yeşil noktadan başla, okları izle. Sonra kendin yaz.', `<div class="satirlar">
    ${S([[H, 'model'], ...iz(H, sigan(H, genislik(H) + BOSLUK))])}
    ${S(iz(H, 3))}
    ${S([[h, 'model'], ...iz(h, sigan(h, genislik(h) + BOSLUK))])}
    ${S(iz(h, 3))}
    ${S([[H, 'iz'], [h, 'iz'], [H, 'iz'], [h, 'iz']])}</div>`);
}
function harfAvi(h, n = 32) {
  const bilinen = SIRA.slice(0, SIRA.indexOf(h) + 1), r = rastgele(h.charCodeAt(0) * 97 + 11);
  const diger = bilinen.filter(x => x !== h).flatMap(x => [x, B(x)]);
  const hucre = Array.from({ length: n }, (_, i) => i % 3 === 0 || r() < .12 ? (r() < .5 ? h : B(h)) : diger[Math.floor(r() * diger.length)]);
  for (let i = hucre.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [hucre[i], hucre[j]] = [hucre[j], hucre[i]]; }
  return etk(0, `Balonlarda ${ses(B(h))} ve ${ses(h)} harflerini bul, boya.`,
    `<div class="balonlar">${hucre.map(c => `<span class="ttkb">${c}</span>`).join('')}</div>`);
}
function heceOku(satirlar, baslik) {  // [['an','na',...], ...]
  return etk(0, baslik || 'Heceleri oku. Okuduğun her hecenin yıldızını boya.',
    `<div class="heceler">${satirlar.map(s => `<div style="--n:${Math.max(4, s.length)}">${s.map(x => `<span><b class="ttkb">${x}</b><i>☆</i></span>`).join('')}</div>`).join('')}</div>`);
}
function birlestir(liste) {           // [['a','n','an'], ...] -> a + n = noktalı an
  return etk(0, 'Sesleri birleştir, oku. Sonra noktaların üstünden yaz.',
    `<div class="birles">${liste.map(([x, y, z]) => `<div><span class="ttkb">${x}</span><em>+</em><span class="ttkb">${y}</span><em>=</em>${kucukS([[z, 'kelime']], 38)}</div>`).join('')}</div>`);
}
function eslestir(liste, tohum) {     // [['at','at'], ...] kelime -> resim
  const r = rastgele(tohum), res = liste.map(x => x[1]);
  for (let i = res.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [res[i], res[j]] = [res[j], res[i]]; }
  if (res.every((x, i) => x === liste[i][1])) res.push(res.shift());
  return etk(0, 'Kelimeyi oku. Noktadan noktaya çizgi çekerek resmiyle birleştir.',
    `<div class="esles"><div class="sol">${liste.map(([k]) => `<div><b class="ttkb">${k}</b><i></i></div>`).join('')}</div>
     <div class="sag">${res.map(x => `<div><i></i>${resim(x)}</div>`).join('')}</div></div>`);
}
function cumleOku(liste, baslik) {
  return etk(0, baslik || 'Cümleleri oku. Okuduğun her cümlenin yıldızını boya.',
    `<div class="cumleler">${liste.map(c => `<div><span class="ttkb">${c}</span><i>☆</i></div>`).join('')}</div>`);
}
function metin(baslik, satirlar) {
  return etk(0, 'Metni oku. Sonra bir büyüğüne sesli oku.',
    `<div class="metin"><h3 class="ttkb">${baslik}</h3>${satirlar.map(c => `<p class="ttkb">${c}</p>`).join('')}</div>`);
}
function yazKelime(kelimeler) {
  return etk(0, 'Kelimeleri noktaların üstünden yaz. Sonra kendin yaz.', `<div class="satirlar">
    ${kelimeler.map(k => S(k.map(x => [x, 'kelime']))).join('')}</div>`);
}
// Akıcı okuma: oyundaki merdivenler (akici.json, `node kaynak/calisma-kagitlari/akici-al.js` ile alınır).
// Satırlar oyundaki gibi kısa → uzun → kısa sıralanır; harfin kendisi kırmızı.
const AKICI = JSON.parse(fs.readFileSync(path.join(__dirname, 'akici.json'), 'utf8'));
function akici(h) {
  const H = B(h), d = AKICI[H];
  const isaretle = s => [...s].map(c => c === h || c === H ? `<b>${c}</b>` : c).join('');
  const enUzun = Math.max(...d.merdivenler.flat().map(s => s.length));
  const satirSay = Math.max(...d.merdivenler.map(m => m.length * 2 - 1));
  const boy = Math.min(10.5, 112 / (enUzun * 0.37), 96 / (satirSay * 1.32)).toFixed(1);   // mm
  const merdiven = (satirlar, svg, no) => {
    const tum = [...satirlar, ...satirlar.slice(0, -1).reverse()];
    return `<div class="merdiven"><div class="m-sol"><svg viewBox="0 0 240 150">${svg}</svg>
      <div class="m-yildiz"><span>1</span><span>2</span><span>3</span></div><small>Her okumada bir yıldız boya.</small></div>
      <ol class="ttkb" style="font-size:${boy}mm">${tum.map(s => `<li>${isaretle(s)}</li>`).join('')}</ol></div>`;
  };
  return etk(0, 'Merdiveni yukarıdan aşağı satır satır oku. Her satırı bir öncekinden biraz daha akıcı okumaya çalış.',
    d.merdivenler.map((m, i) => merdiven(m, d.resimler[i], i + 1)).join(''));
}
const numarala = parcalar => { let i = 0; return parcalar.join('').replace(/<h2 class="ttkb"><b>0<\/b>/g, () => `<h2 class="ttkb"><b>${++i}</b>`); };

const HARF = {
  a: () => [numarala([
    sesiBul('a', ['araba', 'kedi', 'ari', 'armut', 'top', 'at']),
    sesYeri('a', [['at', 0], ['nar', 1], ['elma', 2], ['ayi', 0], ['balik', 1], ['nota', 2]]),
    harfYazma('a')])],
  n: () => [numarala([
    sesiBul('n', ['nar', 'top', 'nal', 'nane', 'kedi', 'nine']),
    sesYeri('n', [['nota', 0], ['nar', 0], ['inek', 1], ['gunes', 1], ['limon', 2], ['eldiven', 2]]),
    harfYazma('n')]),
  numarala([
    harfAvi('n'),
    heceOku([['an', 'na', 'an', 'na'], ['na', 'an', 'ana', 'ana']]),
    birlestir([['a', 'n', 'an'], ['n', 'a', 'na'], ['a', 'na', 'ana']]),
    yazKelime([['an', 'na', 'an'], ['ana', 'ana']])]),
  numarala([akici('n')])],
  e: () => [numarala([
    sesiBul('e', ['elma', 'at', 'ev', 'eldiven', 'balik', 'etek']),
    sesYeri('e', [['ev', 0], ['elma', 0], ['kedi', 1], ['ordek', 1], ['nane', 2], ['lale', 2]]),
    harfYazma('e')]),
  numarala([
    harfAvi('e'),
    heceOku([['en', 'ne', 'an', 'na'], ['ne', 'en', 'na', 'an']]),
    birlestir([['a', 'ne', 'ane'], ['an', 'ne', 'anne'], ['na', 'ne', 'nane']].slice(1).concat([['e', 'n', 'en']])),
    heceOku([['ne', 'en', 'ana', 'anne', 'nane']], 'Kelimeleri oku. Okuduğun her kelimenin yıldızını boya.'),
    yazKelime([['anne', 'nane'], ['ne', 'en', 'ana']])]),
  numarala([akici('e')])],
  t: () => [numarala([
    sesiBul('t', ['top', 'tavuk', 'kedi', 'tencere', 'ordek', 'tilki']),
    sesYeri('t', [['top', 0], ['tavuk', 0], ['etek', 1], ['anahtar', 1], ['at', 2], ['armut', 2]]),
    harfYazma('t')]),
  numarala([
    heceOku([['at', 'ta', 'et', 'te'], ['an', 'na', 'en', 'ne'], ['tat', 'tan', 'ten', 'net']]),
    eslestir([['at', 'at'], ['anne', 'anne'], ['et', 'et'], ['nane', 'nane']], 7),
    cumleOku(['Anne, nane at.', 'Ana, tane tane at.', 'Ata, nane at.']),
    yazKelime([['at', 'et', 'ata'], ['tane', 'tat']])]),
  numarala([akici('t')])],
  i: () => [numarala([
    sesiBul('i', ['inek', 'limon', 'igne', 'incir', 'gunes', 'ilac']),
    sesYeri('i', [['inek', 0], ['ilac', 0], ['limon', 1], ['eldiven', 1], ['kedi', 2], ['ip', 0]]),
    harfYazma('i')]),
  numarala([
    heceOku([['in', 'ni', 'it', 'ti'], ['nin', 'tin', 'ini', 'iti']]),
    eslestir([['nine', 'nine'], ['at', 'at'], ['nane', 'nane'], ['et', 'et']], 13),
    cumleOku(['Nine, ninni.', 'Nine ninni etti.', 'Anne inat etti.', 'Nine, nane at.']),
    yazKelime([['nine', 'ninni'], ['it', 'tin', 'inat']])]),
  numarala([akici('i')])],
  l: () => [numarala([
    sesiBul('l', ['limon', 'inek', 'lale', 'leylek', 'top', 'lamba']),
    sesYeri('l', [['limon', 0], ['lokum', 0], ['elma', 1], ['kalem', 1], ['tel', 2], ['el', 2]]),
    harfYazma('l')]),
  numarala([
    heceOku([['al', 'la', 'el', 'le', 'il', 'li'], ['lan', 'len', 'lal', 'ela', 'lale', 'elle']]),
    eslestir([['lale', 'lale'], ['el', 'el'], ['tel', 'tel']], 21),
    metin('Lale ile Nil', ['Lale ile Nil.', 'Nil, eline lale al.', 'Ali, nane al.', 'Anne ile nine el ele.']),
    yazKelime([['lale', 'el', 'al'], ['Ali', 'ile', 'Nil']])]),
  numarala([akici('l')])],
};

const CSS = `
@font-face{font-family:TTKB;src:url(/kaynak/fontlar/ttkb.ttf) format("truetype")}
@font-face{font-family:Andika;font-weight:700;src:url(/deneme/fontlar/andika-latin-700-normal.woff2) format("woff2")}
@page{size:A4;margin:0}
*{box-sizing:border-box}
body{margin:0;color:#1f2a24;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.ttkb{font-family:TTKB,sans-serif}
.sayfa{width:210mm;height:297mm;padding:10mm 12mm 8mm;display:flex;flex-direction:column;gap:4mm;page-break-after:always;overflow:hidden}
header{display:flex;justify-content:space-between;align-items:center;border-bottom:.6mm solid #2e6b4a;padding-bottom:3mm}
.baslik{display:flex;align-items:center;gap:3mm}
.ladin{width:9mm}
.harf{font-size:15mm;line-height:1;color:#1f4d36;letter-spacing:1mm}
.ad{display:flex;align-items:flex-end;gap:2mm;font-size:5.2mm;color:#3d4a42}
.ad i{display:inline-block;width:52mm;border-bottom:.35mm solid #7d877f;height:6mm}
.ad i.kisa{width:28mm}
.etk h2{font-size:5.4mm;font-weight:700;margin:0 0 2.5mm;display:flex;gap:2.5mm;align-items:flex-start;line-height:1.3}
.etk h2 b{flex:none;width:7mm;height:7mm;border-radius:50%;background:#2e6b4a;color:#fff;display:grid;place-items:center;font-size:4.6mm;margin-top:-.3mm}
.ses{color:#c0392b;font-size:6.6mm}
.resimler{display:grid;grid-template-columns:repeat(6,1fr);gap:3mm}
.resimler .r{aspect-ratio:1;border:.4mm solid #cfd8d1;border-radius:4mm;padding:2.5mm;display:grid;place-items:center}
img{width:100%;height:100%;object-fit:contain}
.yerler{display:grid;grid-template-columns:repeat(6,1fr);gap:3mm}
.y{border:.4mm solid #cfd8d1;border-radius:4mm;padding:2mm 2mm 2.5mm;display:flex;flex-direction:column;align-items:center;gap:2mm;position:relative}
.y img{height:20mm}
.kutular{display:flex;gap:1mm}
.kutular span{width:6.6mm;height:6.6mm;border:.45mm solid #4a5a50;border-radius:1mm}
.kutular span.dolu{background:#c0392b;border-color:#c0392b}
.y em{position:absolute;top:-2.6mm;left:2mm;background:#fff;padding:0 1.2mm;font-style:normal;font-size:3.4mm;color:#c0392b}
.y.ornek{border-color:#c0392b;border-style:dashed}
.satirlar{display:flex;flex-direction:column;gap:3mm}
.satir{display:block}
.c-ust{stroke:#6f9a7f;stroke-width:22}
.c-alt{stroke:#c0392b;stroke-width:24}
.c-orta{stroke:#86a891;stroke-width:16;stroke-dasharray:50 34}
.balonlar{display:grid;grid-template-columns:repeat(12,1fr);gap:2mm 2.4mm}
.balonlar span{aspect-ratio:1;border:.5mm solid #4a5a50;border-radius:50%;display:grid;place-items:center;font-size:7.5mm;line-height:1;padding-top:.6mm}
.heceler{display:flex;flex-direction:column;gap:2mm}
.heceler div{display:grid;grid-template-columns:repeat(var(--n,4),1fr);gap:3mm}
.heceler span{border:.4mm solid #cfd8d1;border-radius:3mm;display:flex;justify-content:space-between;align-items:center;padding:.6mm 3mm}
.heceler b{font-size:8.5mm;font-weight:400;line-height:1.15}
.heceler i,.cumleler i{font-style:normal;font-size:6mm;color:#8a8f8b}
.birles{display:grid;grid-template-columns:1fr 1fr;gap:1mm 6mm}
.birles div{display:flex;align-items:center;gap:3mm}
.birles span{font-size:8.5mm;min-width:11mm;text-align:center}
.birles em{font-style:normal;font-size:7mm;color:#2e6b4a}
.birles .satir{margin-left:2mm}
.esles{display:grid;grid-template-columns:1fr 1fr;gap:0 45mm;padding:0 12mm}
.esles>div{display:flex;flex-direction:column;gap:1.6mm}
.esles .sol div,.esles .sag div{display:flex;align-items:center;gap:3mm;height:17mm}
.esles .sol div{justify-content:flex-end}
.esles b{font-size:9mm;font-weight:400}
.esles i{width:3.2mm;height:3.2mm;border-radius:50%;background:#1f2a24;flex:none}
.esles img{width:17mm;height:17mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:1.5mm}
.cumleler{display:flex;flex-direction:column;gap:1.8mm}
.cumleler div{display:flex;justify-content:space-between;align-items:center;border-bottom:.3mm dashed #cfd8d1;padding:0 2mm 1mm}
.cumleler span{font-size:7.6mm;line-height:1.25}
.metin{border:.5mm solid #2e6b4a;border-radius:4mm;padding:4mm 7mm;background:#f6faf3}
.metin h3{margin:0 0 2mm;text-align:center;font-size:9mm;font-weight:400;color:#1f4d36}
.metin p{margin:0;font-size:7.8mm;line-height:1.4}
.merdiven{display:grid;grid-template-columns:50mm 1fr;gap:6mm;align-items:center;border:.5mm solid #cfd8d1;border-radius:4mm;padding:4mm 5mm;margin-bottom:4mm}
.m-sol{display:flex;flex-direction:column;align-items:center;gap:2mm}
.m-sol svg{width:50mm;height:31mm;border-radius:3mm}
.m-sol small{font:3.2mm Andika,sans-serif;color:#6b7a70;text-align:center}
.m-yildiz{display:flex;gap:2.5mm}
.m-yildiz span{width:9mm;height:9mm;display:grid;place-items:center;font:700 3.6mm Andika,sans-serif;color:#6b7a70;
  clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);background:#cfd8d1;padding-top:1mm}
.merdiven ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;align-items:flex-start;gap:.6mm}
.merdiven li{line-height:1.28;padding:0 2mm;border-bottom:.3mm dashed #dbe6d4}
.merdiven li b{color:#c0392b;font-weight:400}
footer{margin-top:auto;display:flex;justify-content:space-between;font:3.2mm Andika,sans-serif;color:#6b7a70;border-top:.3mm solid #dbe6d4;padding-top:2mm}
`;
const OKLAR = `<svg width="0" height="0" style="position:absolute"><defs>
<marker id="ok1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.6" markerHeight="3.6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#1f6b45"/></marker>
<marker id="ok2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.6" markerHeight="3.6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#c0392b"/></marker></defs></svg>`;

function sunucu() {
  const TIP = { '.png': 'image/png', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.html': 'text/html; charset=utf-8' };
  return new Promise(res => {
    const s = http.createServer((q, r) => {
      if (q.url.startsWith('/__sayfa/')) { r.setHeader('content-type', TIP['.html']); return r.end(SAYFALAR[decodeURIComponent(q.url.slice(9))]); }
      const f = path.join(KOK, decodeURIComponent(q.url.split('?')[0]));
      if (!f.startsWith(KOK) || !fs.existsSync(f)) { r.statusCode = 404; return r.end(); }
      r.setHeader('content-type', TIP[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(r);
    }).listen(0, '127.0.0.1', () => res(s));
  });
}
const SAYFALAR = {};
(async () => {
  const istenen = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(HARF);
  fs.mkdirSync(CIKTI, { recursive: true });
  const srv = await sunucu(), port = srv.address().port;
  const b = await chromium.launch();
  for (const h of istenen) {
    const govdeler = HARF[h]();
    const html = `<!doctype html><html lang="tr"><meta charset="utf-8"><style>${CSS}</style><body>${OKLAR}<script>addEventListener('DOMContentLoaded',()=>document.querySelectorAll('path.iz').forEach(p=>{const n=Math.max(3,Math.round(p.getTotalLength()/80));p.setAttribute('pathLength',n);p.setAttribute('stroke-dasharray','0 1');const L=p.getTotalLength(),e=p.getPointAtLength(L),c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',e.x);c.setAttribute('cy',e.y);c.setAttribute('r',22);c.setAttribute('fill','#8a8f8b');p.after(c);}));</script>${govdeler.map((g, i) => sayfa({ harf: h, govde: g, no: i + 1, toplam: govdeler.length })).join('')}</body></html>`;
    SAYFALAR[h] = html;
    const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
    await p.goto(`http://127.0.0.1:${port}/__sayfa/${encodeURIComponent(h)}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const fontlar = await p.evaluate(() => [...document.fonts].map(f => f.family + ':' + f.status));
    const tasan = await p.evaluate(() => [...document.querySelectorAll('.sayfa')].map((s, i) => s.scrollHeight > s.clientHeight + 1 ? (i + 1) + '. sayfa ' + Math.round((s.scrollHeight - s.clientHeight) / 3.78) + ' mm' : '').filter(Boolean).join(', ') || 'yok');
    await p.pdf({ path: path.join(CIKTI, `${h}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
    await p.locator('.sayfa').first().screenshot({ path: path.join(CIKTI, `${h}-onizleme.png`) });
    if (process.env.HER_SAYFA) for (let i = 0; i < govdeler.length; i++) await p.locator('.sayfa').nth(i).screenshot({ path: path.join(process.env.HER_SAYFA, `${h}-${i + 1}.png`) });
    console.log(h, 'sayfa:', govdeler.length, 'fontlar:', fontlar.join(' '), 'taşan:', tasan);
    await p.close();
  }
  if (!process.argv.slice(2).length) {          // altı harf tek dosyada
    SAYFALAR.hepsi = SAYFALAR[istenen[0]].replace(/<\/body><\/html>$/, '') + istenen.slice(1).map(h => SAYFALAR[h].split('</script>').slice(1).join('</script>').replace(/<\/body><\/html>$/, '')).join('') + '</body></html>';
    const p = await b.newPage();
    await p.goto(`http://127.0.0.1:${port}/__sayfa/hepsi`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: path.join(CIKTI, 'a-n-e-t-i-l.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log('toplu PDF sayfa:', await p.evaluate(() => document.querySelectorAll('.sayfa').length));
  }
  await b.close(); srv.close();
})();
