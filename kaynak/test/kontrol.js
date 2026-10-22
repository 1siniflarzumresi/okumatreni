// Kontrol testi: node kaynak/test/kontrol.js   (Playwright gerekir: npm i -g playwright)
// 1) Her oyun açılıyor mu, hata var mı  2) Her harf durağında ekranda öğrenilmemiş harf var mı
// 3) Her oyun 5 ekran boyutunda sığıyor mu (akıllı tahta dahil)
const path = require('path');
const { chromium } = require('playwright');
const ONLY = process.argv[2]; // 'harf' = sadece harf taraması (hızlı)
const URL = 'file://' + path.resolve(__dirname, '..', '..', 'oyunlar.html');
(async () => {
  const b = await chromium.launch(); const errs = [];
  // --- 2) letter scan
  const p = await b.newPage({viewport:{width:400,height:860}});
  p.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
  await p.goto(URL); await p.waitForTimeout(400);
  const stations = await p.evaluate(() => W.map((w,i) => letters(w)).flat());
  const bad = [];
  for (const L of stations) {
    const res = await p.evaluate(async (L) => {
      SELL = L; drawLetterCards();
      const K = upTo(L).map(c => c.toLocaleLowerCase('tr-TR'));
      const ok = t => [...t.toLocaleLowerCase('tr-TR')].filter(c => 'abcçdefgğhıijklmnoöprsştuüvyz'.includes(c)).every(c => K.includes(c));
      const out = [];
      document.querySelectorAll('.game[data-game] .art .kb').forEach(e => { if (!ok(e.textContent)) out.push('kart:' + e.closest('.game').dataset.game + ':' + e.textContent); });
      for (const g of ['sepet','ilk','kelime','hece','hafiza','balon','iz']) {
        openGame(g, L);
        for (let r = 0; r < 3; r++) {
          await new Promise(res => setTimeout(res, 60));
          [...document.querySelectorAll('#sb .pick button, #sb .ncard, #sb .lw, #sb .mc span, #sb .bal .b')].forEach(e => { if (!ok(e.textContent)) out.push(g + ':' + e.textContent); });
          if (g === 'balon') await new Promise(res => setTimeout(res, 1800));
        }
        closeGame();
      }
      return [...new Set(out)];
    }, L);
    if (res.length) bad.push(L + ' -> ' + res.slice(0, 6).join(' | '));
  }
  console.log('HARF TARAMASI:', bad.length ? '\n' + bad.join('\n') : 'öğrenilmemiş harf yok');
  await p.close();
  if (ONLY === 'harf') { console.log('HATALAR:', errs.length ? errs : 'yok'); await b.close(); return; }
  // --- 1) + 3) every game, five screen sizes
  for (const [w,h] of [[1920,1080],[1280,720],[1024,768],[768,1024],[400,860]]) {
    const q = await b.newPage({viewport:{width:w,height:h}});
    q.on('pageerror', e => errs.push(`${w}x${h} PAGEERR: ` + e.message));
    await q.goto(URL); await q.waitForTimeout(400);
    const games = await q.$$eval('.game[data-game]', x => x.map(g => g.dataset.game));
    const over = [];
    for (const g of games) {
      await q.click(`.game[data-game="${g}"]`); await q.waitForTimeout(700);
      const r = await q.evaluate(() => { const els = [...document.querySelectorAll('#sb button, #sb .hit, #sb canvas')].filter(e => e.offsetParent !== null || e.tagName === 'rect');
        return {bottom: Math.round(Math.max(...els.map(e => e.getBoundingClientRect().bottom))), h: innerHeight}; });
      if (r.bottom > r.h + 1) over.push(`${g} (${r.bottom} > ${r.h})`);
      await q.click('#backBtn'); await q.waitForTimeout(100);
    }
    console.log(`${w}x${h}:`, over.length ? 'TAŞAN: ' + over.join(', ') : `${games.length} oyunun hepsi sığıyor`);
    await q.close();
  }
  console.log('HATALAR:', errs.length ? errs : 'yok');
  await b.close();
})();
