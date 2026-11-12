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
  const harfler = dizi.flatMap(([c, k]) => k === 'kelime' ? [...c] : [c]);
  const kuyruk = harfler.some(c => 'gjpyçşğÇŞ'.includes(c));     // aşağı uzanan harf: 4. çizgi
  const W = genislikMm / birim, ustPay = 200, altPay = kuyruk ? ORTA + 60 : 70;
  const H = ustPay + UST + altPay, B = ustPay + UST;
  let x = dizi[0] && dizi[0][1] === 'model' ? 170 : 60, ic = '';
  for (const [ch, kip] of dizi) {
    if (kip === 'kelime') { for (const h of ch) { ic += harfIz(h, x, B, 'iz', true); x += genislik(h) + 90; } x += 420; continue; }
    ic += harfIz(ch, x, B, kip); x += genislik(ch) + BOSLUK;
  }
  return `<svg class="satir" viewBox="0 0 ${W} ${H}" style="width:${genislikMm}mm;height:${H * birim}mm">
    <line x1="0" x2="${W}" y1="${B - UST}" y2="${B - UST}" class="c-ust"/>
    <line x1="0" x2="${W}" y1="${B - ORTA}" y2="${B - ORTA}" class="c-orta"/>
    <line x1="0" x2="${W}" y1="${B}" y2="${B}" class="c-alt"/>${kuyruk ? `<line x1="0" x2="${W}" y1="${B + ORTA}" y2="${B + ORTA}" class="c-kuyruk"/>` : ''}${ic}</svg>`;
}

// ---------- sayfa parçaları ----------
// Renkli sürümü varsa renkli resim; "boya" etkinliklerinde resimCizgi (çocuk boyar).
const RY = ad => ['resimler-renkli', 'resimler-hayat', 'resimler-turkce2', 'resimler-hayat2', 'resimler-mat2', 'resimler-turkce3', 'resimler-hayat3', 'resimler-mat3', 'resimler-fen3', 'resimler'].map(k => `/deneme/materyaller/${k}/${ad}.png`).find(u => fs.existsSync(path.join(KOK, u))) || `/deneme/materyaller/resimler/${ad}.png`;
const resim = ad => `<img src="${RY(ad)}" alt="">`;
const resimCizgi = ad => `<img src="/deneme/materyaller/resimler/${ad}.png" alt="">`;
const LADIN = `<svg viewBox="0 0 40 48" class="ladin"><path d="M20 2 L30 16 H25 L33 27 H27 L36 39 H4 L13 27 H7 L15 16 H10 Z" fill="#2e6b4a"/><rect x="17.5" y="39" width="5" height="7" rx="1" fill="#8e5b2b"/></svg>`;
function sayfa({ harf, govde, no, toplam, mat }) {
  if (mat) return `<section class="sayfa">
  <header><div class="baslik">${LADIN}<div class="harf ttkb mat" style="font-size:${Math.min(10.5, 160 / mat.baslik.length).toFixed(1)}mm">${mat.baslik}</div></div>
    <div class="ad ttkb"><span>Adım:</span><i></i><span>Tarih:</span><i class="kisa"></i></div></header>
  ${govde}
  <footer><span>Ladin Ormanı · ${mat.sinif || 1}. Sınıf ${mat.ders || 'Matematik'} · ${mat.konu}</span><span>${toplam > 1 ? no + ' / ' + toplam : ''}</span></footer>
  </section>`;
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
const SIRA = ['a', 'n', 'e', 't', 'i', 'l', 'o', 'k', 'u', 'r', 'ı', 'm', 'ü', 's', 'ö', 'y', 'd', 'z', 'ç', 'b', 'g', 'c', 'ş', 'p', 'h', 'v', 'ğ', 'f', 'j'];
const GRUPLAR = [['a', 'n', 'e', 't', 'i', 'l'], ['o', 'k', 'u', 'r', 'ı', 'm'], ['ü', 's', 'ö', 'y', 'd', 'z'], ['ç', 'b', 'g', 'c', 'ş', 'p'], ['h', 'v', 'ğ', 'f', 'j']];   // Maarif ses grupları
const B = h => h.toLocaleUpperCase('tr');
function rastgele(tohum) { let x = tohum; return () => (x = (x * 16807) % 2147483647) / 2147483647; }
const ses = h => `<span class="ses">${h}</span>`;
const S = dizi => satir(dizi, 186, 16);
const kucukS = (dizi, mm) => satir(dizi, mm, 9);

// Denetleyici: çocuğun okuyacağı her hece/kelime/cümle/soru, o harfe kadar öğretilmiş harflerden olmalı.
// Yönergeler (öğretmen okur) denetlenmez. Hata varsa üretim durur.
let AKTIF = null; const HATALAR = [];
function oku(s) {
  if (!AKTIF) return s;
  const izin = new Set(SIRA.slice(0, SIRA.indexOf(AKTIF) + 1));
  const kotu = [...new Set([...String(s).toLocaleLowerCase('tr')].filter(c => /\p{L}/u.test(c) && !izin.has(c)))];
  if (kotu.length) HATALAR.push(`${B(AKTIF)}: "${s}" → öğretilmemiş: ${kotu.join(' ')}`);
  return s;
}
function sesiBul(h, liste, yonerge) {
  return etk(0, yonerge || `Resimlerin adını söyle. Adı ${ses(h)} sesiyle başlayanları daire içine al.`,
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
    ${'gjpyçşğ'.includes(h) ? '' : S([[H, 'iz'], [h, 'iz'], [H, 'iz'], [h, 'iz']])}</div>`);
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
    `<div class="heceler">${satirlar.map(s => `<div style="--n:${Math.max(4, s.length)}">${s.map(x => `<span><b class="ttkb">${oku(x)}</b><i>☆</i></span>`).join('')}</div>`).join('')}</div>`);
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
    `<div class="esles"><div class="sol">${liste.map(([k]) => `<div><b class="ttkb">${oku(k)}</b><i></i></div>`).join('')}</div>
     <div class="sag">${res.map(x => `<div><i></i>${resim(x)}</div>`).join('')}</div></div>`);
}
function cumleOku(liste, baslik) {
  return etk(0, baslik || 'Cümleleri oku. Okuduğun her cümlenin yıldızını boya.',
    `<div class="cumleler">${liste.map(c => `<div><span class="ttkb">${oku(c)}</span><i>☆</i></div>`).join('')}</div>`);
}
function metin(baslik, satirlar, boy) {
  return etk(0, 'Metni oku. Sonra bir büyüğüne sesli oku.',
    `<div class="metin"${boy ? ` style="--mb:${boy}mm"` : ''}><h3 class="ttkb">${oku(baslik)}</h3>${satirlar.map(c => `<p class="ttkb">${oku(c)}</p>`).join('')}</div>`);
}
function yazKelime(kelimeler) {
  return etk(0, 'Kelimeleri noktaların üstünden yaz. Sonra kendin yaz.', `<div class="satirlar">
    ${kelimeler.map(k => S(k.map(x => [oku(x), 'kelime']))).join('')}</div>`);
}
// --- 3. gruptan itibaren: okuduğunu anlama ve okuma etkinlikleri
const resimCiz = y => `<div class="etk cizim-etk"><h2 class="ttkb"><b>0</b>${y || 'Metnin resmini çiz.'}</h2><div class="cizim"></div></div>`;
function dogruYanlis(liste) {         // [['cümle', true], ...]  ✓ / ✗ kutusu
  return etk(0, 'Metne göre doğru olan cümlenin yanındaki ✓ kutusunu, yanlış olanın ✗ kutusunu boya.',
    `<div class="dy">${liste.map(([c]) => `<div><span class="ttkb">${oku(c)}</span><i>✓</i><i>✗</i></div>`).join('')}</div>`);
}
function secmeli(liste) {             // [['soru', ['a','b','c']], ...]
  return etk(0, 'Soruyu oku. Doğru cevabın yanındaki daireyi boya.',
    `<div class="secmeli">${liste.map(([s, sec], i) => `<div><p class="ttkb"><b>${i + 1}.</b> ${oku(s)}</p><div>${sec.map(x => `<span><i></i><span class="ttkb">${oku(x)}</span></span>`).join('')}</div></div>`).join('')}</div>`);
}
function acikUclu(liste, baslik) {    // ['soru', ...] -> altında yazma satırı
  return etk(0, baslik || 'Soruları oku. Cevabını satıra yaz.',
    `<div class="acik">${liste.map((s, i) => `<div><p class="ttkb"><b>${i + 1}.</b> ${oku(s)}</p>${satir([], 186, 8)}</div>`).join('')}</div>`);
}
function sirala(liste) {              // olayları karışık sırayla ver; çocuk 1-2-3 yazar
  return etk(0, 'Olaylar karışmış. Metne göre sırala: kutulara 1, 2, 3 yaz.',
    `<div class="sirala">${liste.map(c => `<div><i></i><span class="ttkb">${oku(c)}</span></div>`).join('')}</div>`);
}
function kelimeResim(liste, tohum) {  // [['kelime','dogru','yanlis1','yanlis2'], ...]
  const r = rastgele(tohum);
  return etk(0, 'Kelimeyi oku. Kelimenin resmini daire içine al.',
    `<div class="kr">${liste.map(([k, ...res]) => { const s = res.slice(); for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; }
      return `<div><b class="ttkb">${oku(k)}</b>${s.map(x => `<span>${resim(x)}</span>`).join('')}</div>`; }).join('')}</div>`);
}
function cumleTamamla(liste) {        // [['Horoz sabah erken ___.', ['öter','uçar']], ...]
  return etk(0, 'Cümleyi oku. Boşluğa uygun kelimeyi seç, daire içine al ve boşluğa yaz.',
    `<div class="tamamla">${liste.map(([c, sec]) => `<div><p class="ttkb">${oku(c).replace('___', '<u></u>')}</p><div>${sec.map(x => `<span class="ttkb">${oku(x)}</span>`).join('')}</div></div>`).join('')}</div>`);
}
// Akıcı okuma: oyundaki merdivenler (akici.json, `node kaynak/calisma-kagitlari/akici-al.js` ile alınır).
// Satırlar oyundaki gibi kısa → uzun → kısa sıralanır; harfin kendisi kırmızı.
const AKICI = JSON.parse(fs.readFileSync(path.join(__dirname, 'akici.json'), 'utf8'));
function akici(h) {
  const H = B(h), d = AKICI[H];
  const isaretle = s => [...s].map(c => c === h || c === H ? `<b>${c}</b>` : c).join('');
  const enUzun = Math.max(...d.merdivenler.flat().map(s => s.length));
  const satirSay = Math.max(...d.merdivenler.map(m => m.length * 2 - 1));
  const boy = Math.min(10.5, 112 / (enUzun * 0.37), 90 / (satirSay * 1.32)).toFixed(1);   // mm
  const merdiven = (satirlar, svg, no) => {
    const tum = [...satirlar, ...satirlar.slice(0, -1).reverse()];
    return `<div class="merdiven"><div class="m-sol"><svg viewBox="0 0 240 150">${svg}</svg>
      <div class="m-yildiz"><span>1</span><span>2</span><span>3</span></div><small>Her okumada bir yıldız boya.</small></div>
      <ol class="ttkb" style="font-size:${boy}mm">${tum.map(s => `<li>${isaretle(s)}</li>`).join('')}</ol></div>`;
  };
  return etk(0, 'Merdiveni yukarıdan aşağı satır satır oku. Her satırı bir öncekinden biraz daha akıcı okumaya çalış.',
    d.merdivenler.map((m, i) => merdiven(m, d.resimler[i], i + 1)).join(''));
}
// Hikâye (yalnız oyunda hikâyesi olan harfler: R, I, M) + hikâyenin resmini çizme kutusu
function hikaye(h) {
  const H = B(h), d = AKICI[H];
  const isaretle = s => [...s].map(c => c === h || c === H ? `<b>${c}</b>` : c).join('');
  return etk(0, 'Hikâyeyi oku. Sonra bir büyüğüne sesli oku.',
    `<div class="hikaye"><svg viewBox="0 0 240 150">${d.hikayeResim}</svg>
      <div class="ttkb">${d.hikaye.map(s => `<p>${isaretle(s)}</p>`).join('')}</div></div>`) +
    `<div class="etk cizim-etk"><h2 class="ttkb"><b>0</b>Hikâyenin resmini çiz.</h2><div class="cizim"></div></div>`;
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
  o: () => [numarala([
    sesiBul('o', ['otobus', 'kedi', 'olta', 'oklava', 'balik', 'ocak']),
    sesYeri('o', [['olta', 0], ['ocak', 0], ['top', 1], ['limon', 1], ['piyano', 2], ['radyo', 2]]),
    harfYazma('o')]),
  numarala([
    heceOku([['ol', 'lo', 'ot', 'to', 'on', 'no'], ['ot', 'olta', 'nota', 'otel', 'oto', 'ona']]),
    eslestir([['ot', 'ot'], ['olta', 'olta'], ['nota', 'nota'], ['tel', 'tel']], 31),
    cumleOku(['Ali, olta al.', 'Anne, nota al.', 'Lale, ot al.']),
    yazKelime([['ot', 'ol', 'on'], ['olta', 'nota']])]),
  numarala([akici('o')])],
  k: () => [numarala([
    sesiBul('k', ['kitap', 'top', 'kaplumbaga', 'kurbaga', 'ordek', 'kus']),
    sesYeri('k', [['kova', 0], ['kale', 0], ['tilki', 1], ['lokum', 1], ['inek', 2], ['tavuk', 2]]),
    harfYazma('k')]),
  numarala([
    heceOku([['ak', 'ka', 'ek', 'ke', 'ik', 'ki'], ['ok', 'ko', 'kal', 'kol', 'kek', 'kin']]),
    eslestir([['kale', 'kale'], ['kol', 'kol'], ['olta', 'olta'], ['nota', 'nota']], 37),
    cumleOku(['Kaan, kek al.', 'Nil, kalk.', 'Ela ile Ali kol kola.']),
    yazKelime([['kek', 'kol', 'ok'], ['kale', 'kalkan']])]),
  numarala([akici('k')])],
  u: () => [numarala([
    sesiBul('u', ['ucak', 'kedi', 'ucurtma', 'un', 'top', 'ugur']),
    sesYeri('u', [['un', 0], ['ucak', 0], ['kus', 1], ['tavuk', 1], ['lokum', 1], ['boru', 2]]),
    harfYazma('u')]),
  numarala([
    heceOku([['un', 'nu', 'ut', 'tu', 'uk', 'ku'], ['ul', 'lu', 'kut', 'kul', 'tut', 'kutu']]),
    eslestir([['un', 'un'], ['kutu', 'kutu'], ['kulak', 'kulak'], ['kol', 'kol']], 41),
    cumleOku(['Anne, unu al.', 'Tuna, kutu al.', 'Ali, onu tut.']),
    yazKelime([['un', 'kutu'], ['kulak', 'tut']])]),
  numarala([akici('u')])],
  r: () => [numarala([
    sesiBul('r', ['radyo', 'kedi', 'roket', 'robot', 'top', 'recel']),
    sesYeri('r', [['radyo', 0], ['roket', 0], ['armut', 1], ['ordek', 1], ['nar', 2], ['anahtar', 2]]),
    harfYazma('r')]),
  numarala([
    heceOku([['ar', 'ra', 'er', 're', 'ir', 'ri'], ['or', 'ro', 'ur', 'ru', 'nar', 'kar']]),
    eslestir([['nar', 'nar'], ['tarak', 'tarak'], ['kar', 'kar'], ['olta', 'olta']], 43),
    cumleOku(['Rana, nar al.', 'Onur, olta at.', 'Eren, tarak al.']),
    yazKelime([['nar', 'kar'], ['tarak', 'Onur']])]),
  numarala([akici('r')]),
  numarala([hikaye('r')])],
  'ı': () => [numarala([
    sesiBul('ı', ['istakoz', 'inek', 'ispanak', 'irmak', 'top', 'izgara']),
    sesYeri('ı', [['istakoz', 0], ['ispanak', 0], ['balik', 1], ['kasik', 1], ['ari', 2], ['ayi', 2]]),
    harfYazma('ı')]),
  numarala([
    heceOku([['ın', 'nı', 'ıl', 'lı', 'ık', 'kı'], ['ır', 'rı', 'ıt', 'tı', 'arı', 'kırk']]),
    eslestir([['arı', 'ari'], ['nar', 'nar'], ['tarak', 'tarak'], ['kulak', 'kulak']], 47),
    cumleOku(['Kırk arı.', 'Tarık, kırk nar al.', 'Kırık kutu.']),
    yazKelime([['arı', 'kırk'], ['kırık', 'Tarık']])]),
  numarala([akici('ı')]),
  numarala([hikaye('ı')])],
  m: () => [numarala([
    sesiBul('m', ['mum', 'kedi', 'muz', 'makas', 'balik', 'maymun']),
    sesYeri('m', [['muz', 0], ['makas', 0], ['limon', 1], ['elma', 1], ['kalem', 2], ['lokum', 2]]),
    harfYazma('m')]),
  numarala([
    heceOku([['am', 'ma', 'em', 'me', 'im', 'mi'], ['om', 'mo', 'um', 'mu', 'mum', 'mama']]),
    eslestir([['mum', 'mum'], ['limon', 'limon'], ['elma', 'elma'], ['armut', 'armut']], 53),
    cumleOku(['Mert, mum al.', 'Emel, limon al.', 'Anne, elma ile armut al.']),
    yazKelime([['mum', 'elma'], ['limon', 'kalem']])]),
  numarala([akici('m')]),
  numarala([hikaye('m')])],
  // ---------- 3. grup: Ü S Ö Y D Z — 3. sayfa okuma metni + doğru/yanlış ----------
  'ü': () => [numarala([
    sesiBul('ü', ['uzum', 'ucak', 'utu', 'un', 'ucgen', 'kedi']),
    sesYeri('ü', [['ucgen', 0], ['gunes', 1], ['orumcek', 1], ['sut', 1], ['kurek', 1], ['kopru', 2]]),
    harfYazma('ü')]),
  numarala([
    heceOku([['ün', 'nü', 'üt', 'tü', 'ük', 'kü'], ['ür', 'rü', 'üm', 'mü', 'ütü', 'kürek']]),
    eslestir([['ütü', 'utu'], ['kürek', 'kurek'], ['kulak', 'kulak'], ['mum', 'mum']], 61),
    cumleOku(['Annem ütü alır.', 'Ümit, kürek al.', 'Tülin, tülü ütüle.']),
    yazKelime([['ütü', 'kürek'], ['ünlü', 'tüm']])]),
  numarala([
    metin('Ütü', ['Annem ütü alır.', 'Ütü mor renkli.', 'Annem tülü ütüler.', 'Tül ütülenir.', 'Ümit ile Ümran mutlu olur.']),
    dogruYanlis([['Annem ütü alır.', true], ['Ümit tülü ütüler.', false], ['Ütü mor renkli.', true]]), resimCiz()])],
  s: () => [numarala([
    sesiBul('s', ['saat', 'top', 'simit', 'sincap', 'kedi', 'salyangoz']),
    sesYeri('s', [['sincap', 0], ['saat', 0], ['masa', 1], ['istakoz', 1], ['ispanak', 1], ['otobus', 2]]),
    harfYazma('s')]),
  numarala([
    heceOku([['as', 'sa', 'es', 'se', 'is', 'si'], ['os', 'so', 'us', 'su', 'ses', 'masa']]),
    eslestir([['masa', 'masa'], ['simit', 'simit'], ['saat', 'saat'], ['süt', 'sut']], 67),
    cumleOku(['Selin, simit al.', 'Mert, masa kur.', 'Sinan, süt al.']),
    yazKelime([['ses', 'süt'], ['simit', 'masa']])]),
  numarala([
    metin('Simit', ['Selin simit alır.', 'Simit susamlı.', 'Selin süt ister.', 'Annesi Selin\'e süt alır.', 'Selin mutlu olur.']),
    dogruYanlis([['Selin simit alır.', true], ['Simit susamlı.', true], ['Selin limon ister.', false]]), resimCiz()])],
  'ö': () => [numarala([
    sesiBul('ö', ['ordek', 'otobus', 'orumcek', 'top', 'ok', 'ogretmen']),
    sesYeri('ö', [['ordek', 0], ['ogretmen', 0], ['kopru', 1], ['goz', 1], ['borek', 1], ['kopek', 1]]),
    harfYazma('ö')]),
  numarala([
    heceOku([['ön', 'nö', 'öt', 'tö', 'ök', 'kö'], ['ör', 'rö', 'öm', 'mö', 'kök', 'ömür']]),
    eslestir([['kömür', 'komur'], ['önlük', 'onluk'], ['ütü', 'utu'], ['simit', 'simit']], 71),
    cumleOku(['Ömer, önlük al.', 'Ömer, öne otur.', 'Ömer ile Selin önlük alır.']),
    yazKelime([['kök', 'ön'], ['önlük', 'kömür']])]),
  numarala([
    metin('Önlük', ['Ömer önlük alır.', 'Önlük mor renkli.', 'Selin: Önlük mor mu?', 'Ömer: Mor, mor!', 'Ömer önlük ile mutlu olur.']),
    dogruYanlis([['Ömer önlük alır.', true], ['Önlük sarı.', false], ['Ömer mutlu olur.', true]]), resimCiz()])],
  y: () => [numarala([
    sesiBul('y', ['yumurta', 'kedi', 'yaprak', 'yildiz', 'top', 'yilan']),
    sesYeri('y', [['yaprak', 0], ['yildiz', 0], ['ayi', 1], ['maymun', 1], ['leylek', 1], ['ay', 2]]),
    harfYazma('y')]),
  numarala([
    heceOku([['ay', 'ya', 'ey', 'ye', 'iy', 'yi'], ['oy', 'yo', 'uy', 'yu', 'kaya', 'ayna']]),
    eslestir([['yumurta', 'yumurta'], ['yılan', 'yilan'], ['ay', 'ay'], ['ayna', 'ayna']], 73),
    cumleOku(['Yunus, ayna al.', 'Ayla, yumurta ye.', 'Yunus ile Ayla oyun oynar.']),
    yazKelime([['ay', 'yay'], ['ayna', 'yumurta']])]),
  numarala([
    metin('Yumurta', ['Ayla yumurta alır.', 'Ayla yumurtayı kırar.', 'Annesi omlet ister.', 'Ayla ile annesi omlet yer.', 'Ayla: Omlet ne iyi!']),
    dogruYanlis([['Ayla yumurta alır.', true], ['Ayla yumurtayı kırar.', true], ['Ayla ile annesi simit yer.', false]]), resimCiz()])],
  d: () => [numarala([
    sesiBul('d', ['davul', 'top', 'deve', 'domates', 'tavuk', 'dondurma']),
    sesYeri('d', [['deve', 0], ['davul', 0], ['ordek', 1], ['kedi', 1], ['yildiz', 1], ['cadir', 1]]),
    harfYazma('d')]),
  numarala([
    heceOku([['ad', 'da', 'ed', 'de', 'id', 'di'], ['od', 'do', 'ud', 'du', 'dede', 'oda']]),
    eslestir([['kedi', 'kedi'], ['ördek', 'ordek'], ['domates', 'domates'], ['dondurma', 'dondurma']], 79),
    cumleOku(['Doruk, dondurma al.', 'Dede, domates al.', 'Kedi ördek ile oynar.']),
    yazKelime([['dede', 'oda'], ['kedi', 'ördek']])]),
  numarala([
    metin('Doruk ile Dedesi', ['Doruk ile dedesi markette.', 'Dedesi domates alır.', 'Doruk dondurma ister.', 'Dedesi dondurma da alır.', 'Doruk ile dedesi mutlu olur.']),
    dogruYanlis([['Doruk ile dedesi markette.', true], ['Dedesi limon alır.', false], ['Doruk dondurma ister.', true]]), resimCiz()])],
  z: () => [numarala([
    sesiBul('z', ['zebra', 'saat', 'zil', 'zeytin', 'simit', 'zurafa']),
    sesYeri('z', [['zebra', 0], ['zil', 0], ['kuzu', 1], ['kazak', 1], ['muz', 2], ['istakoz', 2]]),
    harfYazma('z')]),
  numarala([
    heceOku([['az', 'za', 'ez', 'ze', 'iz', 'zi'], ['oz', 'zo', 'uz', 'zu', 'kuzu', 'üzüm']]),
    eslestir([['üzüm', 'uzum'], ['kuzu', 'kuzu'], ['yıldız', 'yildiz'], ['zeytin', 'zeytin']], 83),
    cumleOku(['Zerrin, üzüm ye.', 'Kuzu, otu yer.', 'Zil, zır zır öter.']),
    yazKelime([['az', 'kuzu'], ['üzüm', 'yıldız']])]),
  numarala([
    metin('Kuzu', ['Kuzu otlakta.', 'Kuzu otları yer.', 'Zerrin kuzuya Duman adını takar.', 'Duman, Zerrin\'i izler.', 'Zerrin ile Duman mutlu.']),
    dogruYanlis([['Kuzu otlakta.', true], ['Kuzunun adı Duman.', true], ['Kuzu kaya üstünde uyur.', false]]), resimCiz()])],
  // ---------- 4. grup: Ç B G C Ş P — kelime-resim, okuma metni + çoktan seçmeli ----------
  'ç': () => [numarala([
    sesiBul('ç', ['cicek', 'ceket', 'canta', 'catal', 'top', 'cilek']),
    harfYazma('ç'), harfAvi('ç', 36)]),
  numarala([
    kelimeResim([['çiçek', 'cicek', 'kedi', 'top'], ['çanta', 'canta', 'kova', 'sepet'], ['çatal', 'catal', 'kasik', 'makas'], ['çilek', 'cilek', 'domates', 'visne']], 89),
    cumleOku(['Çiçek, çay iç.', 'Nur, çatal ile domates yer.', 'Arda, çanta al.']),
    yazKelime([['çay', 'çiçek'], ['çanta', 'çatal']])]),
  numarala([
    metin('Çiçekler', ['Çiçek ile annesi çimenlikte.', 'Çimenlikte çiçekler açar.', 'Çiçek, mor çiçekleri koklar.', 'Annesi çay ister.', 'Çiçek ile annesi çay içer.', 'Çiçek: Çiçekler ne çok!']),
    secmeli([['Çiçek kim ile çimenlikte?', ['annesi', 'dedesi', 'kedisi']], ['Çiçek ne koklar?', ['çiçek', 'çay', 'çilek']], ['Çiçek ile annesi ne içer?', ['süt', 'çay', 'ayran']]]), resimCiz()])],
  b: () => [numarala([
    sesiBul('b', ['balon', 'palyaco', 'bebek', 'bulut', 'top', 'bardak']),
    harfYazma('b'), harfAvi('b', 36)]),
  numarala([
    kelimeResim([['balık', 'balik', 'kedi', 'ordek'], ['balon', 'balon', 'yumurta', 'zil'], ['bebek', 'bebek', 'ogretmen', 'anne'], ['robot', 'robot', 'davul', 'kutu']], 97),
    cumleOku(['Bora, balon al.', 'Bebek, mama ister.', 'Bulut bembeyaz.']),
    yazKelime([['bal', 'balık'], ['bebek', 'bulut']])]),
  numarala([
    metin('Balon', ['Bora bir balon alır.', 'Balon kırmızı.', 'Bora balonu uçurur.', 'Balon bulutlara kadar uçar.', 'Bora: Balonum, dön!', 'Balon, Bora\'yı duymaz.']),
    secmeli([['Bora ne alır?', ['balon', 'balık', 'bebek']], ['Balon ne renk?', ['mor', 'kırmızı', 'sarı']], ['Balon nereye uçar?', ['bulutlara', 'denize', 'okula']]]), resimCiz()])],
  g: () => [numarala([
    sesiBul('g', ['gemi', 'kedi', 'gozluk', 'gitar', 'kale', 'gunes']),
    harfYazma('g'), harfAvi('g', 36)]),
  numarala([
    kelimeResim([['gemi', 'gemi', 'otobus', 'ucak'], ['gözlük', 'gozluk', 'ayna', 'saat'], ['gül', 'gul', 'lale', 'yaprak'], ['gitar', 'gitar', 'davul', 'zil']], 101),
    cumleOku(['Gül, gemi ile gider.', 'Gökay gözlük takar.', 'Ege, gitar çal.']),
    yazKelime([['göz', 'gül'], ['gemi', 'gitar']])]),
  numarala([
    metin('Gemi', ['Ege ile dedesi gemiye biner.', 'Gemi denizde ilerler.', 'Gökyüzünde martılar uçar.', 'Ege gözlük takar.', 'Dedesi Ege\'ye gemiyi gösterir.', 'Ege: Gemi ne büyük!']),
    secmeli([['Ege kim ile gemiye biner?', ['annesi', 'dedesi', 'ablası']], ['Gökyüzünde ne uçar?', ['martılar', 'balonlar', 'arılar']], ['Ege ne takar?', ['kolye', 'gözlük', 'önlük']]]), resimCiz()])],
  c: () => [numarala([
    sesiBul('c', ['ceket', 'canta', 'civciv', 'cuzdan', 'cilek', 'cami']),
    harfYazma('c'), harfAvi('c', 36)]),
  numarala([
    kelimeResim([['incir', 'incir', 'muz', 'limon'], ['cami', 'cami', 'kale', 'ev'], ['ceket', 'ceket', 'kazak', 'etek'], ['cüzdan', 'cuzdan', 'canta', 'kutu']], 103),
    cumleOku(['Cem, ceket giy.', 'Ceren, incir ye.', 'Cüzdan, çantada.']),
    yazKelime([['cam', 'gece'], ['ceket', 'incir']])]),
  numarala([
    metin('Cem\'in Ceketi', ['Cem ceketini giyer.', 'Ceket mor renkli.', 'Cem cebine cüzdanını koyar.', 'Cem ile Ceren okula giderler.', 'Yolda rüzgar eser.', 'Cem: Ceketim beni ısıtır.']),
    secmeli([['Cem ne giyer?', ['ceket', 'kazak', 'önlük']], ['Ceket ne renk?', ['sarı', 'mor', 'kırmızı']], ['Cem cebine ne koyar?', ['cüzdan', 'incir', 'kalem']]]), resimCiz()])],
  'ş': () => [numarala([
    sesiBul('ş', ['semsiye', 'saat', 'seker', 'sise', 'simit', 'sapka']),
    harfYazma('ş'), harfAvi('ş', 36)]),
  numarala([
    kelimeResim([['şemsiye', 'semsiye', 'balon', 'mantar'], ['şeker', 'seker', 'cilek', 'kek'], ['şişe', 'sise', 'bardak', 'vazo'], ['güneş', 'gunes', 'ay', 'yildiz']], 107),
    cumleOku(['Şule, şemsiye al.', 'Şişe, masada.', 'Güneş ışıl ışıl.']),
    yazKelime([['şeker', 'şişe'], ['kuş', 'güneş']])]),
  numarala([
    metin('Şemsiye', ['Şule okula gider.', 'Birden şimşek çakar.', 'Gökyüzü kararır.', 'Şule şemsiyesini açar.', 'Şemsiye, Şule\'yi ıslanmaktan korur.', 'Şule: İyi ki şemsiye almışım!']),
    secmeli([['Şule nereye gider?', ['okula', 'markete', 'çarşıya']], ['Gökyüzünde ne çakar?', ['şimşek', 'güneş', 'ay']], ['Şule ne açar?', ['çanta', 'şemsiye', 'kutu']]]), resimCiz()])],
  p: () => [numarala([
    sesiBul('p', ['papagan', 'balon', 'palyaco', 'patates', 'bebek', 'pencere']),
    harfYazma('p'), harfAvi('p', 36)]),
  numarala([
    kelimeResim([['top', 'top', 'balon', 'davul'], ['kitap', 'kitap', 'gazete', 'kalem'], ['piyano', 'piyano', 'gitar', 'davul'], ['sepet', 'sepet', 'kova', 'canta']], 109),
    cumleOku(['Pelin, top oyna.', 'Pınar, pasta ye.', 'Pınar, patates soy.']),
    yazKelime([['top', 'ip'], ['kitap', 'sepet']])]),
  numarala([
    metin('Palyaço', ['Pazar günü sirke gideriz.', 'Sirkte bir palyaço çıkar.', 'Palyaçonun burnu kırmızı.', 'Palyaço top ile oynar.', 'Palyaço, Pelin\'e bir top atar.', 'Pelin ile ben çok gülürüz.']),
    secmeli([['Pazar günü nereye gideriz?', ['sirke', 'okula', 'markete']], ['Palyaçonun burnu ne renk?', ['mor', 'kırmızı', 'sarı']], ['Palyaço Pelin\'e ne atar?', ['top', 'balon', 'şapka']]]), resimCiz()])],
  // ---------- 5. grup: H V Ğ F J — cümle tamamlama, uzun metin, açık uçlu soru + sıralama ----------
  h: () => [numarala([
    sesiBul('h', ['horoz', 'kedi', 'havuc', 'hediye', 'top', 'helikopter']),
    harfYazma('h'), harfAvi('h', 36)]),
  numarala([
    kelimeResim([['horoz', 'horoz', 'tavuk', 'civciv'], ['hediye', 'hediye', 'kutu', 'canta'], ['helikopter', 'helikopter', 'ucak', 'roket']], 113),
    cumleTamamla([['Horoz sabah erken ___.', ['öter', 'uçar']], ['Hediye bir ___ içinde.', ['kutu', 'şişe']], ['Helikopter gökyüzünde ___.', ['uçar', 'yüzer']]]),
    yazKelime([['hediye', 'horoz'], ['Hakan', 'hemen']])]),
  numarala([
    metin('Hediye', ['Bugün Hakan\'ın yaş günü.', 'Hakan sekiz yaşında.', 'Annesi Hakan\'a bir hediye alır.', 'Hediye büyük bir kutu içinde.', 'Hakan kutuyu heyecanla açar.', 'Kutudan bir helikopter çıkar.', 'Hakan helikopteri hemen uçurur.', 'Hakan: Teşekkür ederim anne!'], 6.6),
    acikUclu(['Bugün kimin yaş günü?', 'Annesi Hakan\'a ne alır?', 'Kutudan ne çıkar?']),
    sirala(['Hakan kutuyu açar.', 'Annesi hediye alır.', 'Hakan helikopteri uçurur.'])])],
  v: () => [numarala([
    sesiBul('v', ['vazo', 'balon', 'valiz', 'vapur', 'fil', 'visne']),
    harfYazma('v'), harfAvi('v', 36)]),
  numarala([
    kelimeResim([['vazo', 'vazo', 'sise', 'fincan'], ['kova', 'kova', 'sepet', 'canta'], ['tavuk', 'tavuk', 'horoz', 'ordek']], 127),
    cumleTamamla([['Vazoda ___ var.', ['çiçek', 'balık']], ['Vapur denizde ___.', ['ilerler', 'uçar']], ['Tavuk ___ yumurtlar.', ['kümeste', 'denizde']]]),
    yazKelime([['ev', 'kova'], ['vazo', 'valiz']])]),
  numarala([
    metin('Vapur', ['Veli ile ailesi tatile gider.', 'Valizlerini hazırlarlar.', 'İskeleye gelirler.', 'Büyük bir vapura binerler.', 'Vapur, denizde yavaş yavaş ilerler.', 'Veli, martılara simit atar.', 'Martılar havada simidi yakalar.', 'Veli: Vapur ne güzel!'], 6.6),
    acikUclu(['Veli kimle tatile gider?', 'Veli martılara ne atar?', 'Vapur nerede ilerler?']),
    sirala(['Vapura binerler.', 'Valizlerini hazırlarlar.', 'Veli martılara simit atar.'])])],
  'ğ': () => [numarala([
    sesiBul('ğ', ['dag', 'kedi', 'agac', 'yagmur', 'top', 'yogurt'], `Resimlerin adını söyle. Adında ${ses('ğ')} olan resimleri daire içine al. (${ses('ğ')} hiçbir kelimenin başında olmaz.)`),
    harfYazma('ğ'), harfAvi('ğ', 36)]),
  numarala([
    kelimeResim([['dağ', 'dag', 'kale', 'cami'], ['ağaç', 'agac', 'cicek', 'yaprak'], ['kurbağa', 'kurbaga', 'kaplumbaga', 'balik']], 131),
    cumleTamamla([['Dağın üstünde ___ var.', ['kar', 'deniz']], ['Yağmur ___ yağar.', ['buluttan', 'topraktan']], ['Ağaçta ___ var.', ['yaprak', 'balık']]]),
    yazKelime([['dağ', 'ağaç'], ['yağmur', 'doğa']])]),
  numarala([
    metin('Yağmur', ['Sabah gökyüzü bulutlu.', 'Birden yağmur yağar.', 'Ağaçların yaprakları ıslanır.', 'Dağların üstü bembeyaz olur.', 'Kuşlar ağaca saklanır.', 'Doğa yıkanır, temizlenir.', 'Yağmur dinince gökkuşağı çıkar.'], 6.8),
    acikUclu(['Sabah gökyüzü nasıl?', 'Kuşlar nereye saklanır?', 'Yağmur dinince ne çıkar?']),
    sirala(['Gökkuşağı çıkar.', 'Gökyüzü bulutlu.', 'Yağmur yağar.'])])],
  f: () => [numarala([
    sesiBul('f', ['fil', 'vazo', 'fare', 'fener', 'valiz', 'fincan']),
    harfYazma('f'), harfAvi('f', 36)]),
  numarala([
    kelimeResim([['fil', 'fil', 'zurafa', 'deve'], ['fare', 'fare', 'kedi', 'sincap'], ['fener', 'fener', 'mum', 'lamba'], ['fincan', 'fincan', 'bardak', 'cay']], 137),
    cumleTamamla([['Fil ___ bir hayvan.', ['büyük', 'minik']], ['Fare ___ sever.', ['peynir', 'taş']], ['Feneri ___ yakarız.', ['gece', 'öğlen']]]),
    yazKelime([['fil', 'fare'], ['fener', 'fincan']])]),
  numarala([
    metin('Fil ile Fare', ['Ormanda büyük bir fil yaşar.', 'Filin adı Fındık.', 'Bir gün Fındık, minik bir fareyle tanışır.', 'Farenin adı Fıstık.', 'Fıstık, Fındık\'ın hortumuna tırmanır.', 'Fındık, Fıstık\'ı ağaçtaki elmalara ulaştırır.', 'İki arkadaş elmaları paylaşır.', 'O günden sonra hiç ayrılmazlar.'], 6.4),
    acikUclu(['Filin adı ne?', 'Farenin adı ne?', 'İki arkadaş neyi paylaşır?']),
    sirala(['Fıstık hortuma tırmanır.', 'Fındık ile Fıstık tanışır.', 'İki arkadaş elmaları paylaşır.'])])],
  j: () => [numarala([
    sesiBul('j', ['jole', 'kedi', 'garaj', 'plaj', 'top', 'jeton'], `Resimlerin adını söyle. Adında ${ses('j')} olan resimleri daire içine al.`),
    harfYazma('j'), harfAvi('j', 36)]),
  numarala([
    kelimeResim([['jöle', 'jole', 'dondurma', 'yogurt'], ['garaj', 'garaj', 'ev', 'cami'], ['plaj', 'plaj', 'dag', 'agac']], 139),
    cumleTamamla([['Arabayı ___ park ederiz.', ['garaja', 'denize']], ['Yazın ___ gideriz.', ['plaja', 'kayağa']], ['Annem bana bir ___ yolladı.', ['mesaj', 'plaj']]]),
    yazKelime([['jöle', 'jeton'], ['garaj', 'plaj']])]),
  numarala([
    metin('Plajda Bir Gün', ['Yaz tatilinde ailecek plaja gittik.', 'Babam arabayı garaja park etti.', 'Ben kumdan bir kale yaptım.', 'Kardeşim Jale denizde yüzdü.', 'Annem bize soğuk jöle getirdi.', 'Jöle çok lezzetliydi.', 'Akşam güneş batarken eve döndük.', 'Bu güzel günü hiç unutmayacağım.'], 6.4),
    acikUclu(['Aile nereye gitti?', 'Jale ne yaptı?', 'Annem ne getirdi?']),
    sirala(['Eve döndük.', 'Plaja gittik.', 'Kumdan kale yaptım.'])])],
};


if (process.env.YON_ONIZLE) HARF._yon = () => {
  const L = [...process.env.YON_ONIZLE], S2 = d => satir(d, 186, 13);
  const sayfalar = [];
  for (let i = 0; i < L.length; i += 6) sayfalar.push(L.slice(i, i + 6).map(h => { const H = B(h);
    return S2([[H, 'model'], [H, 'iz'], [h, 'model'], [h, 'iz'], [h, 'iz']]); }).join(''));
  return sayfalar;
};

const MATMODUL = require('./matematik.js')({ etk, satir, resim, resimCizgi, RY, rastgele, numarala });
const { CSS: MAT_CSS } = MATMODUL;
// Ders modülleri: 'mat' Matematik, 'hb' Hayat Bilgisi. Hayat Bilgisi, Matematik'in çizim araçlarını da kullanır.
const HBMODUL = require('./hayat.js')({ etk, satir, resim, resimCizgi, RY, rastgele, numarala, M: MATMODUL.ARAC });
const T2MODUL = require('./turkce2.js')({ etk, resim, numarala, M: MATMODUL.ARAC });
const M2MODUL = require('./matematik2.js')({ etk, resim, RY, rastgele, numarala });
const H2MODUL = require('./hayat2.js')({ etk, resim, numarala, rastgele });
const resimVar = ad => ['resimler-renkli', 'resimler-hayat', 'resimler-turkce2', 'resimler-hayat2', 'resimler-mat2', 'resimler-turkce3', 'resimler-hayat3', 'resimler-mat3', 'resimler-fen3', 'resimler'].some(k => fs.existsSync(path.join(KOK, `deneme/materyaller/${k}/${ad}.png`)));
const M3MODUL = require('./matematik3.js')({ etk, resim, RY, numarala, A: M2MODUL.A });
const H3MODUL = require('./hayat3.js')({ etk, resim, numarala, resimVar, A: H2MODUL.A });
const F3MODUL = require('./fen3.js')({ etk, resim, numarala, resimVar, A: H2MODUL.A });
const S4MODUL = require('./sosyal4.js')({ etk, numarala, A: H2MODUL.A });
const T4 = require('./test4.js')({ S: H2MODUL.A.S });
const S4O = require('./sosyal4-ornek.js')({ T: T4 });
const T3MODUL = require('./turkce3.js')({ etk, resim, numarala, resimVar, A: T2MODUL.A, M: MATMODUL.ARAC });
const DERS = { mat: { K: MATMODUL.MAT, ad: 'Matematik', klasor: 'matematik', paket: 'matematik' },
               hb: { K: HBMODUL.HB, ad: 'Hayat Bilgisi', klasor: 'hayat-bilgisi', paket: 'hayat-bilgisi' },
               t2: { K: T2MODUL.T2, ad: 'Türkçe', klasor: 'turkce', paket: 'turkce', sinif: 2 },
               m2: { K: M2MODUL.M2, ad: 'Matematik', klasor: 'matematik', paket: 'matematik', sinif: 2 },
               h2: { K: H2MODUL.H2, ad: 'Hayat Bilgisi', klasor: 'hayat-bilgisi', paket: 'hayat-bilgisi', sinif: 2 },
               t3: { K: T3MODUL.T3, ad: 'Türkçe', klasor: 'turkce', paket: 'turkce', sinif: 3 },
               m3: { K: M3MODUL.M3, ad: 'Matematik', klasor: 'matematik', paket: 'matematik', sinif: 3 },
               h3: { K: H3MODUL.H3, ad: 'Hayat Bilgisi', klasor: 'hayat-bilgisi', paket: 'hayat-bilgisi', sinif: 3 },
               f3: { K: F3MODUL.F3, ad: 'Fen Bilimleri', klasor: 'fen-bilimleri', paket: 'fen-bilimleri', sinif: 3 },
               s4o: { K: S4O.S4, ad: 'Sosyal Bilgiler', klasor: 'ornek-sb', paket: 'ornek-sb', sinif: 4 },
               s4: { K: S4MODUL.S4, ad: 'Sosyal Bilgiler', klasor: 'sosyal-bilgiler', paket: 'sosyal-bilgiler', sinif: 4 } };
const MAT = DERS.mat.K;
// Çıktı dosya adları yalnız ASCII: sıra numarası + harf (ı → 11-i, İ → 05-i), paketler grup-1-anetil…
const ASCII = { 'ı': 'i', 'ü': 'u', 'ö': 'o', 'ç': 'c', 'ş': 's', 'ğ': 'g' };
const dosyaAdi = h => SIRA.includes(h) ? String(SIRA.indexOf(h) + 1).padStart(2, '0') + '-' + (ASCII[h] || h) : h;
const CIKTI_MAT = path.join(KOK, 'deneme/materyaller/1-sinif/matematik');

const CSS = `
@font-face{font-family:TTKB;src:url(/kaynak/fontlar/ttkb.ttf) format("truetype")}
@font-face{font-family:Andika;font-weight:700;src:url(/deneme/fontlar/andika-latin-ext-700-normal.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1E00-1E9F}
@font-face{font-family:Andika;font-weight:700;src:url(/deneme/fontlar/andika-latin-700-normal.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+2000-206F,U+2190-21FF}
@page{size:A4;margin:0}
*{box-sizing:border-box}
body{margin:0;color:#1f2a24;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.ttkb{font-family:TTKB,sans-serif}
.sayfa{width:210mm;height:297mm;padding:10mm 12mm 8mm;display:flex;flex-direction:column;gap:3.5mm;page-break-after:always;overflow:hidden}
header{display:flex;justify-content:space-between;align-items:center;padding:2.5mm 5mm;border-radius:5mm;background:linear-gradient(105deg,#d9f0ff 0%,#eaf7ff 45%,#fff3c4 100%);border:.5mm solid #9fd3f5;position:relative;overflow:hidden}
header::after{content:"";position:absolute;right:4mm;top:-5mm;width:14mm;height:14mm;border-radius:50%;background:#ffd23f;box-shadow:0 0 0 2.5mm rgba(255,210,63,.35);pointer-events:none}
.baslik{display:flex;align-items:center;gap:3mm}
.ladin{width:9mm}
.harf{font-size:15mm;line-height:1;color:#1d4e89;letter-spacing:1mm}
.ad{display:flex;align-items:flex-end;gap:2mm;font-size:5.2mm;color:#3d4a42}
.ad{position:relative;z-index:1}
.ad i{display:inline-block;width:52mm;height:8mm;background:#fff;border-radius:2mm;border:.35mm solid #9fd3f5}
.ad i.kisa{width:28mm}
.etk h2{font-size:5.4mm;font-weight:700;margin:0 0 2.5mm;display:flex;gap:2.5mm;align-items:flex-start;line-height:1.3}
.etk h2 b{flex:none;width:7.5mm;height:7.5mm;border-radius:50%;background:var(--ec,#3a86ff);color:#fff;display:grid;place-items:center;font-size:4.6mm;margin-top:-.3mm;box-shadow:0 0 0 1mm #fff}
.etk{background:var(--eb,#eef5ff);border-radius:4.5mm;padding:3mm 4mm 3.5mm;border:.5mm solid var(--el,#cfe0ff)}
.etk:nth-of-type(5n+1){--eb:#eaf4ff;--el:#bcdcff;--ec:#3a86ff}
.etk:nth-of-type(5n+2){--eb:#fff6dc;--el:#ffe08a;--ec:#f4a100}
.etk:nth-of-type(5n+3){--eb:#e7faf2;--el:#a8ecd0;--ec:#12b886}
.etk:nth-of-type(5n+4){--eb:#ffeef0;--el:#ffc2cb;--ec:#f2546b}
.etk:nth-of-type(5n+5){--eb:#f4edff;--el:#d6c4ff;--ec:#8b5cf6}
.etk .r,.etk .y,.etk .grup,.etk .kart-k,.etk .resimler .r,.etk .boyadizi span,.etk .esbul .sec,.etk .kuleler>*,.etk .dkars>div,.etk .kavanozlar>div,.etk .teraziler2>div,.etk .tren,.etk .kayip>div,.etk .sahneler3>svg,.etk .gruplar4 .grup,.etk .kamyonlar>div,.etk .heceler span,.etk .y{background:#fff}
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
.c-kuyruk{stroke:#b9cbbf;stroke-width:14;stroke-dasharray:20 30}
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
.hikaye{border:.5mm solid #2e6b4a;border-radius:4mm;padding:5mm 7mm;background:#f6faf3;display:grid;grid-template-columns:62mm 1fr;gap:7mm;align-items:center}
.hikaye svg{width:62mm;height:39mm;border-radius:3mm}
.hikaye p{margin:0;font-size:8mm;line-height:1.45}
.hikaye b,.merdiven li b{color:#c0392b;font-weight:400}
.cizim-etk{flex:1;display:flex;flex-direction:column}
.cizim{flex:1;border:.5mm dashed #9fc6ef;border-radius:4mm;background:#fff}
.metin p{font-size:var(--mb,7.8mm)!important}
.dy{display:flex;flex-direction:column;gap:2mm}
.dy div{display:flex;align-items:center;gap:4mm;border-bottom:.3mm dashed #cfd8d1;padding-bottom:1mm}
.dy span{flex:1;font-size:7.2mm}
.dy i{font-style:normal;width:10mm;height:10mm;border:.5mm solid #4a5a50;border-radius:2mm;display:grid;place-items:center;font:700 6mm Andika,sans-serif;color:#9aa59d}
.secmeli{display:flex;flex-direction:column;gap:3mm}
.secmeli p,.acik p,.tamamla p{margin:0 0 1.5mm;font-size:6.6mm}
.secmeli p b,.acik p b{color:#2e6b4a;font-weight:400}
.secmeli>div>div{display:flex;gap:8mm;padding-left:6mm}
.secmeli>div>div>span{display:flex;align-items:center;gap:2mm;font-size:6.6mm}
.secmeli i{width:5.5mm;height:5.5mm;border:.5mm solid #4a5a50;border-radius:50%}
.acik{display:flex;flex-direction:column;gap:2mm}
.sirala{display:flex;flex-direction:column;gap:2mm}
.sirala div{display:flex;align-items:center;gap:4mm}
.sirala i{width:10mm;height:10mm;border:.5mm solid #4a5a50;border-radius:2mm;flex:none}
.sirala span{font-size:6.8mm}
.kr{display:flex;flex-direction:column;gap:2mm}
.kr>div{display:grid;grid-template-columns:44mm repeat(3,1fr);gap:4mm;align-items:center;border-bottom:.3mm dashed #cfd8d1;padding-bottom:1.5mm}
.kr b{font-size:9mm;font-weight:400}
.kr span{height:21mm;border:.4mm solid #cfd8d1;border-radius:3mm;padding:1.5mm;display:flex;align-items:center;justify-content:center;overflow:hidden}
.kr span img{width:auto;height:100%;max-width:100%;object-fit:contain}
.tamamla{display:flex;flex-direction:column;gap:3mm}
.tamamla u{display:inline-block;width:42mm;border-bottom:.5mm solid #4a5a50;margin:0 2mm}
.tamamla>div>div{display:flex;gap:4mm;padding-left:6mm}
.tamamla>div>div span{border:.4mm solid #4a5a50;border-radius:999px;padding:.5mm 4mm;font-size:6mm}
${MAT_CSS}
${HBMODUL.CSS}
${T2MODUL.CSS}
${M2MODUL.CSS}
${H2MODUL.CSS}
${T3MODUL.CSS}
${M3MODUL.CSS}
${H3MODUL.CSS}
${F3MODUL.CSS}
${S4MODUL.CSS}
${T4.CSS}
/* Kullanıcı kararı: kâğıtlardaki bütün yazılar TTKB; TTKB'de olmayan işaretler (× → ↔ ✓) Andika'ya düşer */
*,svg text{font-family:TTKB,Andika,sans-serif !important}
.harf.mat{font-size:10.5mm;letter-spacing:.2mm}
.sayfa:has(.harf.mat) .harf.mat{white-space:nowrap}
.sayfa:has(.harf.mat) .baslik{flex:1 1 auto}
.sayfa:has(.harf.mat) .ad{margin-left:auto}
.sayfa:has(.harf.mat) .ad i{width:34mm}
.sayfa:has(.harf.mat) .ad i.kisa{width:22mm}
.govde{display:flex;flex-direction:column;gap:3.5mm;flex:1;min-height:0}
.govde>.etk:last-child{flex:1;display:flex;flex-direction:column}
.govde>.etk:last-child>div:last-child:not(.cizim):not(.satirlar){flex:1;justify-content:space-evenly;align-content:space-evenly}
footer{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font:3.2mm Andika,sans-serif;color:#1d4e89;padding:1.6mm 4mm;border-radius:999px;background:linear-gradient(90deg,#eaf4ff,#fff6dc)}
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
  // Argümansız: bütün Türkçe harfler. 'mat': bütün Matematik kağıtları + ünite paketi. 'mat:rakamlar' gibi tek kağıt da olur.
  const arg = process.argv.slice(2);
  const dk = arg.length && Object.keys(DERS).find(d => arg.every(a => a === d || a.startsWith(d + ':')));
  const MATMOD = !!dk, D = dk ? DERS[dk] : null, KAG = D ? D.K : null;
  const istenen = !arg.length ? Object.keys(HARF) : MATMOD ? (arg.includes(dk) ? Object.keys(KAG) : arg.map(a => a.slice(dk.length + 1))) : arg;
  const bilinmeyen = istenen.filter(h => !(MATMOD ? KAG[h] : HARF[h]));
  if (bilinmeyen.length) {
    console.error('Bilinmeyen kağıt: ' + bilinmeyen.join(', ') + '\nTürkçe harfler: ' + Object.keys(HARF).join(' ') + '\nMatematik: ' + Object.keys(MAT).map(k => 'mat:' + k).join(' '));
    process.exit(2);
  }
  const CIKTI_D = D ? path.join(KOK, `deneme/materyaller/${D.sinif || 1}-sinif`, D.klasor) : CIKTI_MAT;
  fs.mkdirSync(CIKTI_D, { recursive: true });
  fs.mkdirSync(CIKTI, { recursive: true });
  if (process.env.SADECE_KONTROL) { for (const h of istenen) { AKTIF = h; HARF[h](); AKTIF = null; }
    console.log(HATALAR.length ? HATALAR.join('\n') : 'denetim temiz: ' + istenen.join(' ')); process.exit(HATALAR.length ? 1 : 0); }
  const srv = await sunucu(), port = srv.address().port;
  const b = await chromium.launch();
  try {
  for (const h of istenen) {
    AKTIF = h === '_yon' || MATMOD ? null : h; const govdeler = MATMOD ? KAG[h].sayfalar() : HARF[h](); AKTIF = null;
    const HEDEF = MATMOD ? CIKTI_D : CIKTI;
    if (HATALAR.length) break;
    const html = `<!doctype html><html lang="tr"><meta charset="utf-8"><style>${CSS}</style><body>${OKLAR}<script>addEventListener('load',()=>document.querySelectorAll('.sayfa').forEach(s=>{const f=s.querySelector('footer'),h=s.querySelector('header');if(!f||!h)return;const g=document.createElement('div');g.className='govde';[...s.children].filter(c=>c!==f&&c!==h).forEach(c=>g.appendChild(c));s.insertBefore(g,f);const tm=g.querySelector('.t2-metin');if(tm){let fs=5.9;while(g.scrollHeight>g.clientHeight+2&&fs>4.6){fs=Math.round((fs-.1)*10)/10;tm.style.setProperty('--fs',fs+'mm');}}const bos=g.clientHeight,ihtiyac=g.scrollHeight;if(ihtiyac>bos+2){g.style.zoom=Math.max(.72,bos/ihtiyac);if(g.scrollHeight>g.clientHeight+2)g.style.zoom=Math.max(.72,parseFloat(g.style.zoom)*g.clientHeight/g.scrollHeight);}}));</script><script>addEventListener('DOMContentLoaded',()=>document.querySelectorAll('path.iz').forEach(p=>{const n=Math.max(3,Math.round(p.getTotalLength()/80));p.setAttribute('pathLength',n);p.setAttribute('stroke-dasharray','0 1');const L=p.getTotalLength(),e=p.getPointAtLength(L),c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',e.x);c.setAttribute('cy',e.y);c.setAttribute('r',22);c.setAttribute('fill','#8a8f8b');p.after(c);}));</script>${govdeler.map((g, i) => sayfa({ harf: h, govde: g, no: i + 1, toplam: govdeler.length, mat: MATMOD ? Object.assign({ ders: D.ad, sinif: D.sinif }, KAG[h]) : null })).join('')}</body></html>`;
    SAYFALAR[h] = html;
    const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
    await p.goto(`http://127.0.0.1:${port}/__sayfa/${encodeURIComponent(h)}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const fontlar = await p.evaluate(() => [...document.fonts].map(f => f.family + ':' + f.status));
    await p.waitForTimeout(150);
    const tasan = await p.evaluate(() => [...document.querySelectorAll('.sayfa')].map((s, i) => s.scrollHeight > s.clientHeight + 1 ? (i + 1) + '. sayfa ' + Math.round((s.scrollHeight - s.clientHeight) / 3.78) + ' mm' : '').filter(Boolean).join(', ') || 'yok');
    // Boşluk ölçümü: son etkinliğin altı ile altbilgi arasında 22 mm'den fazla boşluk kalan sayfalar
    const bosluk = await p.evaluate(() => [...document.querySelectorAll('.sayfa')].map((s, i) => { const f = s.querySelector('footer'), e = (s.querySelector('.govde') && s.querySelector('.govde').lastElementChild) || [...s.children].filter(c => c.tagName !== 'FOOTER' && c.tagName !== 'HEADER').pop();
      if (!f || !e) return ''; const mm = (f.getBoundingClientRect().top - e.getBoundingClientRect().bottom) / 3.78; return mm > 22 ? (i + 1) + '. sayfa ' + Math.round(mm) + ' mm' : ''; }).filter(Boolean).join(', '));
    const kirik = await p.evaluate(() => [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')));
    if (kirik.length) throw new Error(`${h}: yüklenemeyen resim: ${[...new Set(kirik)].join(', ')}`);
    if (!fontlar.some(f => f === 'TTKB:loaded')) throw new Error(`${h}: TTKB yazı tipi yüklenemedi (kaynak/fontlar/ttkb.ttf)`);
    await p.pdf({ path: path.join(HEDEF, `${MATMOD ? h : dosyaAdi(h)}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
    await p.locator('.sayfa').first().screenshot({ path: path.join(HEDEF, `${MATMOD ? h : dosyaAdi(h)}-onizleme.png`) });
    if (process.env.HER_SAYFA) for (let i = 0; i < govdeler.length; i++) await p.locator('.sayfa').nth(i).screenshot({ path: path.join(process.env.HER_SAYFA, `${h}-${i + 1}.png`) });
    console.log(h, 'sayfa:', govdeler.length, 'fontlar:', fontlar.join(' '), 'taşan:', tasan, bosluk ? 'BOŞ: ' + bosluk : '');
    await p.close();
  }
  if (MATMOD && arg.includes(dk)) for (const no of [...new Set(Object.values(KAG).map(m => m.unite))]) {   // ünite paketleri
    const ks = Object.keys(KAG).filter(k => KAG[k].unite === no), hs = ks.map(k => KAG[k].hafta), ad = `${D.paket}-hafta-${String(Math.min(...hs)).padStart(2, '0')}-${String(Math.max(...hs)).padStart(2, '0')}`;
    if (ks.length < 2) continue;
    SAYFALAR[ad] = SAYFALAR[ks[0]].replace(/<\/body><\/html>$/, '') + ks.slice(1).map(h => SAYFALAR[h].split('</script>').slice(1).join('</script>').replace(/<\/body><\/html>$/, '')).join('') + '</body></html>';
    const p = await b.newPage();
    await p.goto(`http://127.0.0.1:${port}/__sayfa/${ad}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: path.join(CIKTI_D, ad + '.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log('toplu', ad + '.pdf', 'sayfa:', await p.evaluate(() => document.querySelectorAll('.sayfa').length));
    await p.close();
  }
  if (!process.argv.slice(2).length) for (const grup of GRUPLAR) {   // her ses grubu tek dosyada
    const harfler = grup.filter(h => HARF[h]); if (harfler.length < 2) continue;
    const ad = harfler.join('-');
    SAYFALAR[ad] = SAYFALAR[harfler[0]].replace(/<\/body><\/html>$/, '') + harfler.slice(1).map(h => SAYFALAR[h].split('</script>').slice(1).join('</script>').replace(/<\/body><\/html>$/, '')).join('') + '</body></html>';
    const p = await b.newPage();
    await p.goto(`http://127.0.0.1:${port}/__sayfa/${ad}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const paket = 'grup-' + (GRUPLAR.indexOf(grup) + 1) + '-' + harfler.map(x => ASCII[x] || x).join('');
    await p.pdf({ path: path.join(CIKTI, paket + '.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log('toplu', paket + '.pdf', 'sayfa:', await p.evaluate(() => document.querySelectorAll('.sayfa').length));
    await p.close();
  }
  } finally { await b.close(); srv.close(); }
  if (HATALAR.length) { console.log('ÖĞRETİLMEMİŞ HARF:\n' + HATALAR.join('\n')); process.exit(1); }
})().catch(e => { console.error('ÜRETİM DURDU: ' + e.message); process.exit(1); });
