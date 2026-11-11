// Konu anlatımı PDF'leri: deneme/konu-anlatimi.html?yazdir=<ders>:<id> sayfasını A4 PDF yapar.
// Çıktı: deneme/materyaller/konu/<ders>/<id>.pdf   Çalıştır: node kaynak/konu-pdf.js [dil|mat]
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const KOK = path.resolve(__dirname, '..');
const TUR = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(KOK, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(KOK) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': TUR[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
const EK = `@font-face{font-family:TTKB;src:url(/kaynak/fontlar/ttkb.ttf)}
*{font-family:TTKB,Andika,sans-serif!important}.mk-islem{font-family:ui-monospace,Menlo,Consolas,monospace!important}
body{background:#fff!important}main.kap{padding:0!important;max-width:none!important}
.pdf-bas{display:flex;justify-content:space-between;align-items:center;color:#1d4e89;font-size:15px;margin:0 0 10px;padding:6px 14px;border-radius:999px;background:linear-gradient(90deg,#eaf4ff,#fff6dc)}
.konu{border:2px solid #e3ecf5!important}.konu-ic{grid-template-columns:1.15fr 1fr!important}.secenek button{min-width:70px}
.dene::after{content:"Cevabını daire içine al.";display:block;font-size:14px;color:#5b6b7b;margin-top:6px}`;
(async () => {
  await new Promise(ok => srv.listen(0, ok)); const port = srv.address().port;
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 794, height: 1123 } });
  await p.goto(`http://127.0.0.1:${port}/deneme/konu-anlatimi.html`);
  const dersler = process.argv[2] ? [process.argv[2]] : await p.evaluate(() => Object.keys(window.KONU));
  for (const d of dersler) {
    const ids = await p.evaluate(d => window.KONU[d].K.map(k => k.id), d), hedef = path.join(KOK, 'deneme/materyaller/konu', d);
    fs.mkdirSync(hedef, { recursive: true });
    for (const id of ids) {
      await p.goto(`http://127.0.0.1:${port}/deneme/konu-anlatimi.html?yazdir=${d}:${id}`, { waitUntil: 'networkidle' });
      await p.addStyleTag({ content: EK });
      await p.evaluate(ad => { const m = document.querySelector('#konular'); m.insertAdjacentHTML('afterbegin', `<div class="pdf-bas"><span>Ladin Ormanı · Konu Anlatımı</span><span>${ad}</span></div>`); }, await p.evaluate(d => window.KONU[d].ad, d));
      await p.evaluate(() => document.fonts.ready);
      // tek sayfaya sığan en büyük ölçek
      let buf; for (const sc of [1.25, 1.15, 1.05, .95, .85, .75]) {
        buf = await p.pdf({ format: 'A4', printBackground: true, scale: sc, margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' } });
        if ((buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length === 1) break; }
      fs.writeFileSync(path.join(hedef, id + '.pdf'), buf);
    }
    console.log(d, ids.length, 'PDF');
  }
  await b.close(); srv.close();
})();
