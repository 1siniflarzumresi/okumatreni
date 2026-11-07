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

// ---------- yazma satırı (font birimi: 1000 = font boyu) ----------
const UST = 728, ORTA = 446;            // TTKB büyük harf ve küçük harf yüksekliği
const BOSLUK = 300;                      // harfler arası
function harfIz(ch, x, B, kip) {
  const yollar = YON[ch]; let s = '';
  const g = `translate(${x} ${B}) scale(1,-1)`;
  if (kip === 'model') {
    s += `<text x="${x}" y="${B}" class="ttkb" font-size="1000" fill="#d3e4d6">${ch}</text>`;
    yollar.forEach(([d, n, o], i) => {
      if (d.startsWith('dot')) { const [, dx, dy] = d.split(' ');
        s += `<g transform="${g}"><circle cx="${dx}" cy="${dy}" r="38" fill="#c0392b"/></g>`; return; }
      const m = d.match(/M(-?\d+) (-?\d+)/);
      s += `<g transform="${g}"><path d="${d}" fill="none" stroke="${i ? '#c0392b' : '#1f6b45'}" stroke-width="34" stroke-linecap="round" marker-end="url(#ok${i ? 2 : 1})"/>
        <circle cx="${m[1]}" cy="${m[2]}" r="44" fill="${i ? '#c0392b' : '#1f6b45'}"/>
        <g transform="translate(${+m[1] + (o ? o[0] : -62)} ${+m[2] + (o ? o[1] : 58)}) scale(1,-1)"><circle r="72" fill="#fff" stroke="${i ? '#c0392b' : '#1f6b45'}" stroke-width="12"/><text y="26" text-anchor="middle" font-size="98" font-family="Andika,sans-serif" font-weight="700" fill="${i ? '#c0392b' : '#1f6b45'}">${n}</text></g></g>`;
    });
  } else if (kip === 'iz') {
    yollar.forEach(([d]) => {
      if (d.startsWith('dot')) { const [, dx, dy] = d.split(' ');
        s += `<g transform="${g}"><circle cx="${dx}" cy="${dy}" r="30" fill="#8a8f8b"/></g>`; return; }
      s += `<g transform="${g}"><path d="${d}" fill="none" stroke="#8a8f8b" stroke-width="44" stroke-linecap="round" stroke-dasharray="0 92"/></g>`;
    });
    const m = yollar[0][0].match(/M(-?\d+) (-?\d+)/);
    s += `<g transform="${g}"><circle cx="${m[1]}" cy="${m[2]}" r="40" fill="#1f6b45"/></g>`;
  }
  return s;
}
// dizi: [['A','model'],['A','iz'],...]; kalan yer boş kalır
function satir(dizi, genislikMm, capMm) {
  const birim = capMm / UST;                       // mm / font birimi
  const W = genislikMm / birim, ustPay = 210, altPay = 70;
  const H = ustPay + UST + altPay, B = ustPay + UST;
  let x = 40, ic = '';
  for (const [ch, kip] of dizi) { ic += harfIz(ch, x, B, kip); x += GEN[ch].w + BOSLUK; }
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
const HARF = {
  a: () => {
    const bul = ['araba', 'kedi', 'ari', 'armut', 'top', 'at'];
    const yer = [['at', 0, true], ['nar', 1], ['elma', 2], ['ayi', 0], ['balik', 1], ['nota', 2]];
    const g1 = etk(1, 'Resimlerin adını söyle. Adı <span class="ses">a</span> sesiyle başlayanları daire içine al.',
      `<div class="resimler">${bul.map(r => `<div class="r">${resim(r)}</div>`).join('')}</div>`);
    const g2 = etk(2, '<span class="ses">a</span> sesini nerede duyuyorsun? Başta, ortada ya da sonda. Doğru kutuyu boya.',
      `<div class="yerler">${yer.map(([r, k, ornek]) => `<div class="y${ornek ? ' ornek' : ''}">${resim(r)}<div class="kutular">${[0, 1, 2].map(i => `<span${ornek && i === k ? ' class="dolu"' : ''}></span>`).join('')}</div>${ornek ? '<em class="ttkb">örnek</em>' : ''}</div>`).join('')}</div>`);
    const S = (dizi) => satir(dizi, 186, 16);
    const n = (ch, k) => Array(k).fill([ch, 'iz']);
    const g3 = etk(3, 'Yeşil noktadan başla, okları izle. Sonra kendin yaz.',
      `<div class="satirlar">
        ${S([['A', 'model'], ...n('A', 6)])}
        ${S(n('A', 3))}
        ${S([['a', 'model'], ...n('a', 7)])}
        ${S(n('a', 3))}
        ${S([['A', 'iz'], ['a', 'iz'], ['A', 'iz'], ['a', 'iz']])}
      </div>`);
    return [g1 + g2 + g3];
  },
};

const CSS = `
@font-face{font-family:TTKB;src:url(/kaynak/fontlar/ttkb.ttf) format("truetype")}
@font-face{font-family:Andika;font-weight:700;src:url(/deneme/fontlar/andika-latin-700-normal.woff2) format("woff2")}
@page{size:A4;margin:0}
*{box-sizing:border-box}
body{margin:0;color:#1f2a24;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.ttkb{font-family:TTKB,sans-serif}
.sayfa{width:210mm;height:297mm;padding:10mm 12mm 8mm;display:flex;flex-direction:column;gap:4.5mm;page-break-after:always;overflow:hidden}
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
.c-ust,.c-alt{stroke:#7fa58d;stroke-width:16}
.c-alt{stroke:#c0392b;stroke-width:18}
.c-orta{stroke:#9fb8a6;stroke-width:12;stroke-dasharray:45 35}
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
    const html = `<!doctype html><html lang="tr"><meta charset="utf-8"><style>${CSS}</style><body>${OKLAR}${govdeler.map((g, i) => sayfa({ harf: h, govde: g, no: i + 1, toplam: govdeler.length })).join('')}</body></html>`;
    SAYFALAR[h] = html;
    const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
    await p.goto(`http://127.0.0.1:${port}/__sayfa/${encodeURIComponent(h)}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const fontlar = await p.evaluate(() => [...document.fonts].map(f => f.family + ':' + f.status));
    const tasan = await p.evaluate(() => [...document.querySelectorAll('.sayfa')].filter(s => s.scrollHeight > s.clientHeight + 1).length);
    await p.pdf({ path: path.join(CIKTI, `${h}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
    await p.locator('.sayfa').first().screenshot({ path: path.join(CIKTI, `${h}-onizleme.png`) });
    console.log(h, 'sayfa:', govdeler.length, 'fontlar:', fontlar.join(' '), 'tasan sayfa:', tasan);
    await p.close();
  }
  await b.close(); srv.close();
})();
