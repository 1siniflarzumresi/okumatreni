// Paket denetimi (çalışma kâğıtları). Çağrı: node kaynak/test/kontrol.js paket <kağıt> [<kağıt> ...]
//   <kağıt>: uret.js anahtarı, ör. t2:hafta-05  m2:hafta-05  h2:hafta-05  s4:hafta-12  ya da 1. sınıf harfi: a  k  ş
// Kontroller:
//   1) Öğretilmemiş harf (yalnız 1. sınıf okuma-yazma): PDF'ten değil kaynak metinden; harf sırası haftalar.json'dan.
//   2) HTML (PDF'e çevrilmeden önce, tarayıcıda): taşan metin, kesilen öğe, üst üste binen öğe, yüklenmeyen görsel/yazı tipi, aşırı küçültme.
//   3) PDF: 15 MB altı, boş sayfa yok, sayfa sayısı HTML ile aynı. Her sayfa PNG → kaynak/test/cikti/<ders>/ (git'e girmez).
// Çıktı: "dosya · sayfa N: hata" listesi. Hata varsa çıkış kodu 1. İçerik dosyalarına (PDF, kaynak modül) DOKUNMAZ.
const path = require('path'), fs = require('fs'), http = require('http'), { execFileSync, spawnSync } = require('child_process');
const KOK = path.resolve(__dirname, '..', '..'), CIKTI = path.join(__dirname, 'cikti'), URET = path.join(KOK, 'kaynak/calisma-kagitlari/uret.js');
const MB15 = 15 * 1024 * 1024;

function harfSirasi() {   // haftalar.json'daki "harf" alanından öğretim sırası (A, K-U, Ü-S-Ö …)
  const H = JSON.parse(fs.readFileSync(path.join(KOK, 'kaynak/veri/haftalar.json'), 'utf8')), s = [];
  for (const w of H) for (const p of String(w.harf || '').split('-')) { const h = p.trim().toLocaleLowerCase('tr'); if ([...h].length === 1 && /\p{L}/u.test(h) && !s.includes(h)) s.push(h); }
  return s;
}
function sunucu() {
  const TIP = { '.png': 'image/png', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
  return new Promise(res => { const s = http.createServer((q, r) => { const f = path.join(KOK, decodeURIComponent(q.url.split('?')[0]));
    if (!f.startsWith(KOK) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.statusCode = 404; return r.end(); }
    r.setHeader('content-type', TIP[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(r); }).listen(0, '127.0.0.1', () => res(s)); });
}
// Tarayıcıda her .sayfa için çalışan ölçüm (mm: 96 dpi'da 3.78 px)
function olc() {
  const mm = px => Math.round(px / 3.78 * 10) / 10, sonuc = [];
  const kes = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const ad = e => (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : e.tagName.toLowerCase()) + (e.textContent ? ' "' + e.textContent.trim().replace(/\s+/g, ' ').slice(0, 40) + '"' : '');
  document.querySelectorAll('.sayfa').forEach((s, i) => {
    const n = i + 1, S = s.getBoundingClientRect(), hata = [], uyari = [];
    const govde = s.querySelector('.govde'), foot = s.querySelector('footer'), head = s.querySelector('header');
    if (s.scrollHeight > s.clientHeight + 1) hata.push(`sayfa ${mm(s.scrollHeight - s.clientHeight)} mm taşıyor`);
    if (govde && govde.scrollHeight > govde.clientHeight + 2) hata.push(`gövde ${mm(govde.scrollHeight - govde.clientHeight)} mm taşıyor (altbilgiye biniyor)`);
    const z = govde ? parseFloat(govde.style.zoom || '1') : 1;
    if (z < 0.85) uyari.push(`içerik %${Math.round(z * 100)}'e küçültüldü (yazı küçük kalabilir)`);
    // Kesilen öğe: sayfa dışına ya da altbilgiye/başlığa taşan görünür yaprak öğeler (iki sütunlu düzende 3. sütuna kayan öğe de buradan yakalanır)
    const alt = foot ? foot.getBoundingClientRect().top : S.bottom, ust = head ? head.getBoundingClientRect().bottom : S.top;
    const yapraklar = [...(govde || s).querySelectorAll('*')].filter(e => !e.children.length || e.tagName === 'svg' || e.tagName === 'IMG').filter(e => { const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && getComputedStyle(e).visibility !== 'hidden'; });
    const kesik = new Set();
    for (const e of yapraklar) { if (e.closest('svg') && e.tagName !== 'svg') continue; const r = e.getBoundingClientRect();
      if (r.right > S.right + 1 || r.left < S.left - 1 || r.bottom > alt + 1 || r.top < ust - 1) kesik.add(ad(e)); }
    if (kesik.size) hata.push(`kesilen öğe (${kesik.size}): ` + [...kesik].slice(0, 4).join(' · '));
    // Taşan metin: kutusundan yatayda/dikeyde taşan ve gizlenen yazı
    const tasanMetin = [...(govde || s).querySelectorAll('p, li, td, th, span, b, div, h2, h3')].filter(e => { const cs = getComputedStyle(e); if (!e.textContent.trim() || e.closest('svg')) return false;
      return (e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 0 && cs.overflowX !== 'visible') || (e.scrollHeight > e.clientHeight + 2 && e.clientHeight > 0 && cs.overflowY !== 'visible'); });
    if (tasanMetin.length) hata.push(`taşan/kırpılan metin (${tasanMetin.length}): ` + tasanMetin.slice(0, 3).map(ad).join(' · '));
    // Bir kutunun içindeki metin kutunun sağına taşıyor mu (overflow görünür olsa da)
    const disari = [...(govde || s).querySelectorAll('.etk, .t4-s, .t4-ortak, td, .h2-kutular>div, .t4-sec li')].filter(k => { const K = k.getBoundingClientRect(); return [...k.querySelectorAll('p, span, b, li')].some(t => { const r = t.getBoundingClientRect(); return r.width > 0 && r.right > K.right + 2; }); });
    if (disari.length) hata.push(`kutusundan taşan yazı (${disari.length}): ` + disari.slice(0, 3).map(ad).join(' · '));
    // Üst üste binen öğe: aynı düzeydeki bloklar (etkinlik kartları, test soruları, optik form, başlık/altbilgi) birbirine binmemeli
    const bloklar = [head, foot, ...(govde || s).querySelectorAll('.etk, .t4-s, .t4-ortak, .t4-optik')].filter(Boolean).filter(e => !e.parentElement.closest('.etk, .t4-s'));
    const bin = [];
    for (let a = 0; a < bloklar.length; a++) for (let b = a + 1; b < bloklar.length; b++) { const A = bloklar[a], B = bloklar[b]; if (A.contains(B) || B.contains(A)) continue;
      const k = kes(A.getBoundingClientRect(), B.getBoundingClientRect()); if (k > 3.78 * 3.78 * 4) bin.push(`${ad(A).slice(0, 30)} ↔ ${ad(B).slice(0, 30)} (${mm(Math.sqrt(k))} mm)`); }
    if (bin.length) hata.push(`üst üste binen blok (${bin.length}): ` + bin.slice(0, 3).join(' · '));
    // Bir kartın içindeki doğrudan çocuklar birbirine biniyor mu
    const icBin = [];
    (govde || s).querySelectorAll('.etk, .t4-ic').forEach(k => { const c = [...k.children].filter(e => e.getBoundingClientRect().height > 2);
      for (let a = 0; a < c.length; a++) for (let b = a + 1; b < c.length; b++) if (kes(c[a].getBoundingClientRect(), c[b].getBoundingClientRect()) > 3.78 * 3.78 * 4) icBin.push(ad(c[a]).slice(0, 30) + ' ↔ ' + ad(c[b]).slice(0, 30)); });
    if (icBin.length) hata.push(`kart içinde binen öğe (${icBin.length}): ` + icBin.slice(0, 3).join(' · '));
    // Boş alan: sayfadaki "mürekkepli" öğelerin (yazı, resim, çizim, çizgi, çerçeveli boş kutu) dikey kapsamı dışında kalan 22 mm'den büyük boşluk
    const murekkep = [...(govde || s).querySelectorAll('*')].filter(e => { if (e.closest('svg') && e.tagName !== 'svg') return false; const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 0.5) return false;
      if (e.tagName === 'IMG' || e.tagName === 'svg') return true; if ([...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim())) return true;
      const cs = getComputedStyle(e); const kenar = ['Top', 'Bottom', 'Left', 'Right'].some(k => parseFloat(cs['border' + k + 'Width']) > 0 && cs['border' + k + 'Style'] !== 'none');
      return !e.children.length && kenar; }).map(e => { const r = e.getBoundingClientRect(); return [r.top, r.bottom]; }).sort((x, y) => x[0] - y[0]);
    const ustS = ust, altS = alt; let son = ustS; const bosluk = [];
    for (const [a, b] of murekkep) { if (a - son > 22 * 3.78) bosluk.push(`${mm(a - son)} mm (${mm(son - S.top)}–${mm(a - S.top)} mm arası)`); son = Math.max(son, b); }
    if (altS - son > 22 * 3.78) bosluk.push(`${mm(altS - son)} mm (sayfa altı)`);
    if (bosluk.length) hata.push(`boş alan (22 mm üstü, ${bosluk.length}): ` + bosluk.slice(0, 4).join(' · '));
    // Yazma yeri: "yaz/düzelt/cevapla/tamamla" diyen etkinlikte belirgin yazma yeri olmalı (en az 0,4 mm kalınlıkta, yeterince koyu çizgi ya da çerçeveli boş kutu)
    const lum = c => { const m = c.match(/[\d.]+/g); if (!m) return 1; const [r, g, b] = m.map(Number); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
    (govde || s).querySelectorAll('.etk, .t4-s').forEach(k => { const y = (k.querySelector('h2, .t4-kok') || {}).textContent || '';
      if (!/\b(yaz|yazın|yazalım|düzelt|cevapla|tamamla|doldur)/i.test(y)) return;
      const yerler = [...k.querySelectorAll('*')].filter(e => !e.children.length && !e.textContent.trim()).map(e => { const cs = getComputedStyle(e), r = e.getBoundingClientRect();
        const kalin = Math.max(...['Top', 'Bottom', 'Left', 'Right'].map(x => cs['border' + x + 'Style'] !== 'none' ? parseFloat(cs['border' + x + 'Width']) : 0));
        const renk = ['Bottom', 'Top', 'Left'].map(x => cs['border' + x + 'Color']).find((c, i) => parseFloat(cs['border' + ['Bottom', 'Top', 'Left'][i] + 'Width']) > 0) || 'rgb(255,255,255)';
        const ebeveyn = e.parentElement ? getComputedStyle(e.parentElement) : null, kutu = e.tagName === 'TD' || (r.height >= 3.78 * 5 && ebeveyn && parseFloat(ebeveyn.borderTopWidth) > 0);
        return { kalin: kutu ? Math.max(kalin, 2) : kalin, renk: kutu ? 0 : lum(renk), w: r.width, h: r.height }; }).filter(x => x.kalin > 0 && x.w > 3.78 * 8);
      const no = (k.querySelector('h2 b, .t4-no') || {}).textContent || '?';
      if (!yerler.length && !/A\)|B\)/.test(k.textContent)) hata.push(`${no}. etkinlik: "yaz" diyor ama yazma yeri yok`);
      else if (yerler.length && yerler.every(x => x.kalin < 1.5 || x.renk > 0.7)) hata.push(`${no}. etkinlik: yazma yeri belirsiz (çizgi ${Math.max(...yerler.map(x => x.kalin)).toFixed(1)} px, açık renkli) — çocuk nereye yazacağını görmüyor`); });
    // Görseller
    const kirik = [...s.querySelectorAll('img')].filter(im => !im.complete || !im.naturalWidth).map(im => im.getAttribute('src'));
    if (kirik.length) hata.push('yüklenmeyen görsel: ' + [...new Set(kirik)].join(', '));
    sonuc.push({ n, hata, uyari });
  });
  const fontlar = [...document.fonts].map(f => f.family + ':' + f.status);
  return { sayfalar: sonuc, ttkb: fontlar.some(f => f === 'TTKB:loaded'), fontHata: fontlar.filter(f => /error/.test(f)) };
}

module.exports = async function paket(kagitlar) {
  if (!kagitlar.length) { console.log('Kullanım: node kaynak/test/kontrol.js paket t2:hafta-05 m2:hafta-05 h2:hafta-05  (ya da 1. sınıf harfi: a)'); process.exit(2); }
  const { chromium } = require('playwright');
  const SIRA = harfSirasi(), HATA = [], UYARI = [], ok = [];
  const ekle = (dosya, sayfa, m, liste = HATA) => liste.push(`${dosya}${sayfa ? ' · sayfa ' + sayfa : ''}: ${m}`);
  // Anahtarları derse göre grupla (uret.js aynı derste birden çok kağıt alır)
  const gruplar = {};
  for (const k of kagitlar) { const d = k.includes(':') ? k.split(':')[0] : '_harf'; (gruplar[d] = gruplar[d] || []).push(k.endsWith(':*') ? d : k); }   // t2:* = dersin bütün haftaları
  const htmlDiz = path.join(CIKTI, 'html'); fs.rmSync(htmlDiz, { recursive: true, force: true });
  for (const [d, ks] of Object.entries(gruplar)) {
    // 1) Öğretilmemiş harf: yalnız 1. sınıf okuma-yazma (harf kâğıtları); kaynak metinden
    if (d === '_harf') {
      const r = spawnSync('node', [URET, ...ks], { env: { ...process.env, SADECE_KONTROL: '1', HARF_SIRASI: SIRA.join(',') }, encoding: 'utf8' });
      const cikti = (r.stdout + r.stderr).trim();
      if (r.status === 0) ok.push(`harf denetimi (${ks.join(' ')}): öğretilmemiş harf yok — sıra haftalar.json: ${SIRA.join('')}`);
      else cikti.split('\n').filter(Boolean).forEach(s => ekle(`1. sınıf ${s.split(':')[0]}`, 0, 'öğretilmemiş harf → ' + s));
    }
    // 2) HTML'i PDF'e çevirmeden üret
    const r = spawnSync('node', [URET, ...ks], { env: { ...process.env, SADECE_HTML: path.join(htmlDiz, d), HARF_SIRASI: SIRA.join(',') }, encoding: 'utf8' });
    if (r.status !== 0) ekle(ks.join(' '), 0, 'HTML üretilemedi: ' + (r.stdout + r.stderr).trim().split('\n').slice(-3).join(' '));
  }
  const srv = await sunucu(), port = srv.address().port, b = await chromium.launch();
  try {
    for (const d of fs.existsSync(htmlDiz) ? fs.readdirSync(htmlDiz) : []) for (const f of fs.readdirSync(path.join(htmlDiz, d)).filter(x => x.endsWith('.html'))) {
      const h = f.slice(0, -5), meta = JSON.parse(fs.readFileSync(path.join(htmlDiz, d, h + '.json'), 'utf8')), etiket = meta.pdf;
      const p = await b.newPage({ viewport: { width: 794, height: 1123 } });
      const hatalar = []; p.on('pageerror', e => hatalar.push(e.message)); p.on('requestfailed', q => hatalar.push('istek başarısız: ' + q.url()));
      p.on('response', q => { if (q.status() >= 400) hatalar.push(`${q.status()}: ${q.url().replace(/^http:\/\/127\.0\.0\.1:\d+/, '')}`); });
      await p.goto(`http://127.0.0.1:${port}/${path.relative(KOK, path.join(htmlDiz, d, f))}`, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
      const o = await p.evaluate(olc);
      if (!o.ttkb) ekle(etiket, 0, 'TTKB yazı tipi yüklenmedi');
      o.fontHata.forEach(x => ekle(etiket, 0, 'yazı tipi yüklenemedi: ' + x));
      hatalar.forEach(x => ekle(etiket, 0, 'tarayıcı: ' + x));
      o.sayfalar.forEach(s => { s.hata.forEach(m => ekle(etiket, s.n, m)); s.uyari.forEach(m => ekle(etiket, s.n, m, UYARI)); });
      await p.close();
      // 3) PDF denetimi (sitede yayımlanan dosya)
      const pdf = path.join(KOK, meta.pdf);
      if (!fs.existsSync(pdf)) { ekle(etiket, 0, 'PDF yok (uret.js ile üretilmemiş)'); continue; }
      const boy = fs.statSync(pdf).size;
      if (boy >= MB15) ekle(etiket, 0, `PDF 15 MB'ı aşıyor (${(boy / 1048576).toFixed(1)} MB)`);
      const sayfaSay = +(/Pages:\s+(\d+)/.exec(execFileSync('pdfinfo', [pdf], { encoding: 'utf8' })) || [])[1];
      if (sayfaSay !== o.sayfalar.length) ekle(etiket, 0, `PDF ${sayfaSay} sayfa, kaynak HTML ${o.sayfalar.length} sayfa (PDF güncel değil olabilir)`);
      const pngDiz = path.join(CIKTI, d); fs.mkdirSync(pngDiz, { recursive: true });
      fs.readdirSync(pngDiz).filter(x => x.startsWith(h + '-')).forEach(x => fs.rmSync(path.join(pngDiz, x)));
      execFileSync('pdftoppm', ['-r', '100', '-png', pdf, path.join(pngDiz, h)]);
      const pngler = fs.readdirSync(pngDiz).filter(x => x.startsWith(h + '-') && x.endsWith('.png')).sort();
      // Boş sayfa: mürekkep oranı %1'in altında (python + Pillow)
      const oran = JSON.parse(execFileSync('python3', ['-I', '-c', `import sys,json\nfrom PIL import Image\nout=[]\nfor f in sys.argv[1:]:\n  im=Image.open(f).convert('L'); h=im.histogram(); out.append(round(sum(h[:235])/sum(h)*100,2))\nprint(json.dumps(out))`, ...pngler.map(x => path.join(pngDiz, x))], { encoding: 'utf8' }));
      oran.forEach((v, i) => { if (v < 1) ekle(etiket, i + 1, `boş sayfa (mürekkep %${v})`); });
      ok.push(`${etiket}: ${o.sayfalar.length} sayfa, ${(boy / 1048576).toFixed(2)} MB, PNG → ${path.relative(KOK, pngDiz)}/${h}-*.png`);
    }
  } finally { await b.close(); srv.close(); }
  console.log('PAKET DENETİMİ\n' + ok.map(s => '  ✓ ' + s).join('\n'));
  console.log(UYARI.length ? 'UYARILAR (' + UYARI.length + '):\n' + UYARI.map(s => '  ! ' + s).join('\n') : 'UYARI: yok');
  console.log(HATA.length ? 'HATALAR (' + HATA.length + '):\n' + HATA.map(s => '  ✗ ' + s).join('\n') : 'HATA: yok');
  process.exit(HATA.length ? 1 : 0);
};
