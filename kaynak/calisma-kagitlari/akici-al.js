// Akıcı okuma merdivenlerini oyundan (akici-okuma.html, yalnız okunur) alır:
// kaynak/calisma-kagitlari/akici.json  = { harf: { merdivenler: [[satırlar],[satırlar]], resimler: [svg, svg] } }
// Kullanım: node kaynak/calisma-kagitlari/akici-al.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const KOK = path.resolve(__dirname, '../..');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
  await p.goto('file://' + path.join(KOK, 'akici-okuma.html'));
  const veri = await p.evaluate(() => {
    const out = {};
    for (const L of ['N', 'E', 'T', 'İ', 'L']) {
      show(L, 0);
      out[L] = { merdivenler: DATA[L].sets[0], resimler: [document.getElementById('P1').innerHTML, document.getElementById('P2').innerHTML] };
    }
    return out;
  });
  fs.writeFileSync(path.join(__dirname, 'akici.json'), JSON.stringify(veri, null, 1));
  console.log(Object.entries(veri).map(([k, v]) => k + ':' + v.merdivenler.map(m => m.length).join('+') + ' resim ' + v.resimler.map(r => r.length).join('/')).join('  '));
  await b.close();
})();
