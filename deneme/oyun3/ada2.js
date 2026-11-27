// Kâşif Adası — Matematik yerleri: Meyve Bahçesi (kesirler), Kervan Yolu (çarpma, bölme), Gözlem Kulesi (zaman)
"use strict";
const kzH = (a, b) => `<span class="kz"><span>${a}</span><span>${b}</span></span>`;
const kzS = (a, b, x, y, px = 40) => `<g transform="translate(${x} ${y})" class="ttkb"><text y="-6" text-anchor="middle" font-size="${px}">${a}</text><line x1="${-px * .45}" y1="4" x2="${px * .45}" y2="4" stroke="#1f2a24" stroke-width="4"/><text y="${px * .95}" text-anchor="middle" font-size="${px}">${b}</text></g>`;

/* ===================== 4) MEYVE BAHÇESİ: bütün, eş parçalar, kesir ===================== */
const dilimYol = (r, a0, a1) => { const p = a => [Math.cos((a - 90) * Math.PI / 180) * r, Math.sin((a - 90) * Math.PI / 180) * r]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M0 0 L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`; };
// Turta: parçalar açılarla (daire) ya da genişliklerle (dikdörtgen) verilir; boyalı parçalar kümesi
const turta = (bicim, oran, boyali, renk = '#e8590c', tik) => {
  const top = oran.reduce((a, b) => a + b, 0); let s = '', acc = 0;
  if (bicim === 'daire') { s += `<circle r="176" fill="#c98d55"/>`; oran.forEach((o, i) => { const a0 = acc / top * 360, a1 = (acc + o) / top * 360; acc += o;
      s += `<path class="${tik ? 'parca' : ''}" data-i="${i}" d="${dilimYol(160, a0, a1)}" fill="${boyali.has(i) ? renk : '#ffe8cc'}" stroke="#7a4a26" stroke-width="5" style="${tik ? 'cursor:pointer' : ''}"/>`; }); }
  else { const W = 520, H = 230; s += `<rect x="${-W / 2 - 14}" y="${-H / 2 - 14}" width="${W + 28}" height="${H + 28}" rx="16" fill="#c98d55"/>`; oran.forEach((o, i) => { const x = -W / 2 + acc / top * W, w = o / top * W; acc += o;
      s += `<rect class="${tik ? 'parca' : ''}" data-i="${i}" x="${x.toFixed(1)}" y="${-H / 2}" width="${w.toFixed(1)}" height="${H}" fill="${boyali.has(i) ? renk : '#ffe8cc'}" stroke="#7a4a26" stroke-width="5" style="${tik ? 'cursor:pointer' : ''}"/>`; }); }
  return s; };
const bahceArka = () => `<rect x="-3000" y="-400" width="7200" height="780" fill="#cfeaf2"/><rect x="-3000" y="380" width="7200" height="900" fill="#8cc063"/><image href="oyun3/s/bahce.webp" x="-240" y="0" width="1680" height="760" preserveAspectRatio="xMidYMid slice"/>`;
const ADLAR_K = { 2: 'yarım', 4: 'çeyrek' };
YER.bahce = {
  id: 'bahce', ad: 'Meyve Bahçesi', ders: 'Matematik', beceri: 'Bütün, eş parçalar ve kesirler', ikon: '🥧', renk: '#e8590c', harita: { x: 352, y: 545 },
  hikaye: 'Bahçıvan Ayı meyvelerden turtalar yaptı. Turtalar eş parçalara bölünürse herkes aynı payı alır. Parçalara bak, kesirleri bul.',
  seviyeler: [['Eş parçalar mı?', 'Parçalar aynı büyüklükte mi?'], ['Kesri bul', 'Boyalı parçaları gösteren kesir.'], ['Payı boya', 'Kesir kadar parçayı boya.']],
  bina(){ return `${golge(0, 4, 70)}<rect x="-6" y="-70" width="12" height="70" fill="#7a4a26"/><circle cy="-100" r="56" fill="#40c057"/><circle cx="-24" cy="-104" r="9" fill="#e03131"/><circle cx="18" cy="-86" r="9" fill="#e03131"/><circle cx="10" cy="-124" r="9" fill="#e03131"/><g transform="translate(46 -12) scale(.18)"><circle r="176" fill="#c98d55"/><path d="${dilimYol(160, 0, 90)}" fill="#e8590c"/></g>`; },
  gorev(lvl, k, ctx){
    const bicim = k % 2 ? 'dikd' : 'daire', ayi = `<g transform="translate(1080 560) scale(.9)">${resO('bahcivan-ayi', 260, 0, -110)}</g>`;
    const ciz = (oran, boy, tik) => { sv.innerHTML = bahceArka() + `<g transform="translate(600 ${bicim === 'daire' ? 330 : 360})">${turta(bicim, oran, boy, '#e8590c', tik)}</g>` + ayi; };
    if (lvl === 0) {
      const n = pick([2, 3, 4]), es = (k + (AKTIF.p0 || (AKTIF.p0 = rint(0, 1)))) % 2 === 0;
      const oran = es ? Array(n).fill(1) : (() => { let o; do { o = Array.from({ length: n }, () => rint(1, 4)); } while (new Set(o).size === 1); return o; })();
      ciz(oran, new Set(oran.map((_, i) => i)));
      setInstr(k === 0 ? `Bahçıvan Ayı turtayı ${n} parçaya böldü. Parçalar eş mi, yani hepsi aynı büyüklükte mi?` : `Bu turta eş parçalara bölünmüş mü?`);
      secT([{ t: 'Evet, eş parçalar', ok: es }, { t: 'Hayır, eş değil', ok: !es }], () => ctx.dogru(es ? `Evet! ${n} eş parça.` : 'Evet! Parçaların büyüklüğü farklı.', es ? `${n} eş parça<small>Her parça bütünün ${kzH(1, n)}${ADLAR_K[n] ? ' (' + ADLAR_K[n] + ')' : ''} kadarı.</small>` : `Eş değil<small>Parçalar aynı büyüklükte olmalıydı.</small>`, 2600, 'sag'),
        () => ctx.yanlis(es ? 'Parçaları dikkatle karşılaştır. Hepsi aynı büyüklükte.' : 'Bazı parçalar daha büyük. Karşılaştır.'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent.startsWith(es ? 'Evet' : 'Hayır')).click();
    } else if (lvl === 1) {
      const n = pick([2, 3, 4, 5, 6, 8]), kk = rint(1, n - 1), boy = new Set(shuffle([...Array(n).keys()]).slice(0, kk));
      ciz(Array(n).fill(1), boy);
      setInstr(k === 0 ? 'Turtanın boyalı parçalarını hangi kesir gösterir? Pay boyalı parça sayısı, payda bütün parça sayısıdır.' : 'Boyalı parçaları gösteren kesir hangisi?');
      const ad = [[n, kk], [n - kk, n], [kk, n + 1], [kk + 1, n]].filter(([a, b]) => !(a === kk && b === n) && a > 0 && a !== b).map(String);
      const l = [{ h: kzH(kk, n), t: `${kk}/${n}`, ok: true }, ...[...new Set(ad)].slice(0, 2).map(x => { const [a, b] = x.split(','); return { h: kzH(a, b), t: `${a}/${b}` }; })];
      secT(l, () => ctx.dogru(`Evet! ${n} eş parçanın ${kk} tanesi boyalı.`, `${kzH(kk, n)}<small>Pay: boyalı parça (${kk}) · Payda: bütün parça (${n})</small>`, 2600, 'sag'),
        o => { const [a, b] = o.t.split('/').map(Number); ctx.yanlis(a === n && b === kk ? 'Pay ile paydayı ters yazdın. Payda, bütün parça sayısıdır.' : a === n - kk ? 'Bu, boyanmayan parçaları gösterir.' : 'Bütün kaç parçaya bölünmüş, kaçı boyalı? Say.'); });
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === `${kk}${n}`).click();
    } else {
      const n = pick([3, 4, 5, 6, 8]), kk = rint(1, n - 1), boy = new Set();
      const yenile = () => { ciz(Array(n).fill(1), boy, true); sv.innerHTML += kzS(kk, n, 140, 260, 64);
        sv.querySelectorAll('.parca').forEach(p => p.addEventListener('click', () => { if (KILIT) return; const i = +p.dataset.i; if (boy.has(i)) boy.delete(i); else boy.add(i); sPop(); yenile(); })); };
      yenile();
      setInstr(k === 0 ? `Turtanın ${n} eş parçasından ${kk} tanesini boya. Parçaya dokununca boyanır, bir daha dokununca silinir. Bitince Tamam düğmesine bas.` : 'Kesir kadar parçayı boya.');
      eylem('<button class="cta" id="bGo">Tamam</button>');
      $('bGo').onclick = () => { if (KILIT) return; if (boy.size === kk) ctx.dogru(`Evet! ${n} parçanın ${kk} tanesi.`, `${kzH(kk, n)}<small>${kk} boyalı parça, ${n} eş parça</small>`, 2400, 'sag'); else ctx.yanlis(boy.size < kk ? `Kesrin payı ${kk}. ${kk - boy.size} parça daha boya.` : `Fazla boyadın. ${kk} parça boyamalısın.`); };
      if (window.__TEST) window.__coz = () => { boy.clear(); for (let i = 0; i < kk; i++) boy.add(i); $('bGo').click(); };
    }
  },
};

/* ===================== 5) KERVAN YOLU: eşit gruplar, çarpma ve bölme ===================== */
const deve = (k, x, y) => `<g transform="translate(${x} ${y})">${golge(0, 86, 70)}${resO('deve-semerli', 200)}${Array.from({ length: k }, (_, i) => `<g transform="translate(${-40 + (i % 3) * 30} ${-62 - Math.floor(i / 3) * 27})">${sandik(32)}</g>`).join('')}</g>`;
const colArka = () => `<rect x="-3000" y="-400" width="7200" height="780" fill="#f3e6cf"/><rect x="-3000" y="380" width="7200" height="900" fill="#e3b56f"/><image href="oyun3/s/kervan.webp" x="-240" y="0" width="1680" height="760" preserveAspectRatio="xMidYMid slice"/>`;
YER.kervan = {
  id: 'kervan', ad: 'Kervan Yolu', ders: 'Matematik', beceri: 'Eşit gruplar: çarpma ve bölme', ikon: '🐫', renk: '#b07a3a', harita: { x: 835, y: 532 },
  hikaye: 'Kervancı Fil, develerle pazara mal taşıyor. Her deveye eşit yük verilmeli. Sandıkları say, eşit paylaştır, yolculuğun hesabını yap.',
  seviyeler: [['Yükü say', 'Eşit gruplardaki sandıklar.'], ['Eşit paylaştır', 'Sandıkları develere eşit dağıt.'], ['Pazar yolu', 'Dört işlemle problem çöz.']],
  bina(){ return `${golge(0, 4, 70)}<g transform="scale(.42)">${resO('deve-semerli', 220, 0, -100)}</g><g transform="translate(-14 -88) scale(.7)">${sandik()}</g><g transform="translate(14 -88) scale(.7)">${sandik()}</g>`; },
  gorev(lvl, k, ctx){
    const fil = `<g transform="translate(1100 520)">${resO('kervanci-fil', 220, 50, 0)}</g>`, xs = n => Array.from({ length: n }, (_, i) => 130 + i * (820 / Math.max(1, n - 1 || 1)) * (n > 1 ? 1 : 0) + (n === 1 ? 300 : 0));
    if (lvl === 0) {
      const n = rint(2, 5), kk = rint(2, 6), t = n * kk;
      sv.innerHTML = colArka() + Array.from({ length: n }, (_, i) => deve(kk, 150 + i * (820 / (n - 1 || 1)) * (n > 1 ? 1 : 0), 470)).join('') + fil;
      setInstr(k === 0 ? `Kervanda ${n} deve var. Her devenin üstünde eşit sayıda sandık var. Kervanda toplam kaç sandık var?` : 'Kervanda toplam kaç sandık var?');
      secT([t, t + kk, t - kk, n + kk].filter((v, i, a) => v > 0 && a.indexOf(v) === i).slice(0, 3).map((v, i) => ({ t: String(v), ok: i === 0 })),
        () => ctx.dogru(`Evet! ${t} sandık.`, `${n} deve × ${kk} sandık = <b>${t}</b><small>${Array(n).fill(kk).join(' + ')} = ${t}</small>`, 2600, 'sag'),
        o => ctx.yanlis(+o.t === n + kk ? 'Deve sayısıyla sandık sayısını topladın. Her devedeki sandıkları ekle.' : `Her devede ${kk} sandık var. Deve deve say.`));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === String(t)).click();
    } else if (lvl === 1) {
      const n = rint(2, 4), kk = rint(2, 5), t = n * kk; let yuk = Array(n).fill(0), kalan = t;
      const ciz = () => { sv.innerHTML = colArka() + Array.from({ length: n }, (_, i) => deve(yuk[i], 150 + i * (700 / (n - 1)), 500)).join('') +
        `<g transform="translate(1040 260)"><rect x="-120" y="-100" width="240" height="190" rx="14" fill="#fff8e1" stroke="#b07a3a" stroke-width="4"/>${Array.from({ length: kalan }, (_, i) => `<g transform="translate(${-90 + (i % 6) * 36} ${-70 + Math.floor(i / 6) * 32}) scale(.85)">${sandik()}</g>`).join('')}<text y="122" text-anchor="middle" class="ttkb" font-size="26">Kalan: ${kalan}</text></g>`; };
      ciz();
      setInstr(k === 0 ? `${t} sandık ${n} deveye eşit yüklenecek. Herkese birer ver düğmesine bas; her deveye birer sandık gider. Sandıklar bitene kadar devam et.` : `${t} sandığı ${n} deveye eşit paylaştır.`);
      const sor = () => { setInstr('Sandıklar bitti. Her deve kaç sandık taşıyor?');
        secT([kk, kk + 1, kk - 1, t - n].filter((v, i, a) => v > 0 && a.indexOf(v) === i).slice(0, 3).map((v, i) => ({ t: String(v), ok: i === 0 })),
          () => ctx.dogru(`Evet! Her deve ${kk} sandık taşıyor.`, `${t} ÷ ${n} = <b>${kk}</b><small>${t} sandık ${n} deveye eşit paylaştırıldı.</small>`, 2600, 'sag'), () => ctx.yanlis('Bir devenin üstündeki sandıkları say.')); };
      eylem('<button class="cta" id="kVer">Herkese birer ver</button>');
      $('kVer').onclick = () => { if (KILIT || kalan < n) return; yuk = yuk.map(v => v + 1); kalan -= n; sPop(); ciz(); if (!kalan) sor(); };
      if (window.__TEST) window.__coz = () => { while (kalan >= n) $('kVer').click(); zaman(() => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === String(kk)).click(), 30); };
    } else {
      const tip = (AKTIF.k3 || (AKTIF.k3 = shuffle([0, 1, 2, 3, 0, 1])))[k], [a1] = [pick(['Kervancı Fil', 'Deve sürücüsü Elif', 'Tüccar Kaan'])];
      let soru, d;
      if (tip === 0) { const n = rint(3, 6), kk = rint(4, 8), s = rint(5, n * kk - 5); soru = `${a1} ${n} devenin her birine ${kk} sandık yükledi. Pazarda ${s} sandık satıldı. Kaç sandık kaldı?`; d = n * kk - s; }
      else if (tip === 1) { const n = rint(2, 5), kk = rint(3, 7), e = rint(1, 4); soru = `${n * kk} sandık ${n} deveye eşit yüklendi. Sonra her deveye ${e} sandık daha eklendi. Bir devede kaç sandık var?`; d = kk + e; }
      else if (tip === 2) { const g = rint(3, 6), km = rint(6, 12); soru = `Kervan her gün ${km} kilometre yol alıyor. ${g} günde kaç kilometre yol alır?`; d = g * km; }
      else { const n = rint(3, 6), kk = rint(3, 8), f = rint(2, 5); soru = `${a1} pazarda her biri ${f} lira olan ${n * kk} kavun sattı. Kaç lira kazandı?`; d = n * kk * f; }
      sv.innerHTML = colArka() + deve(3, 260, 500) + deve(2, 560, 520) + fil + serit(soru, null, 170);
      setInstr(soru);
      secT([d, d + 10, d - 2, d + 5].filter((v, i, a) => v > 0 && a.indexOf(v) === i).slice(0, 3).map((v, i) => ({ t: String(v), ok: i === 0 })), () => ctx.dogru(`Evet! ${d}.`, `<b>${d}</b><small>Önce ne verildiğine, sonra ne sorulduğuna baktık.</small>`, 2400, 'sag'), () => ctx.yanlis('Problemi yeniden oku. Hangi işlemleri yapmalısın?'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === String(d)).click();
      void xs;
    }
  },
};

/* ===================== 6) GÖZLEM KULESİ: saat ve zaman ===================== */
const iki = n => String(n).padStart(2, '0');
const dijital = T => { const h = Math.floor(T / 60) % 12 || 12, m = T % 60; return `${iki(h)}:${iki(m)}`; };
const sureSoz = d => { const h = Math.floor(d / 60), m = d % 60; return [h ? `${h} saat` : '', m ? `${m} dakika` : ''].filter(Boolean).join(' '); };
const saatC = (T, r = 150) => { const h = (T / 60) % 12, m = T % 60; const el = (a, L, w, c) => `<line x1="0" y1="0" x2="${(Math.sin(a * Math.PI / 180) * L).toFixed(1)}" y2="${(-Math.cos(a * Math.PI / 180) * L).toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  return `<circle r="${r + 14}" fill="#1d4e89"/><circle r="${r}" fill="#fff"/>${Array.from({ length: 60 }, (_, i) => { const a = i * 6 * Math.PI / 180, L = i % 5 ? 8 : 16; return `<line x1="${(Math.sin(a) * (r - L)).toFixed(1)}" y1="${(-Math.cos(a) * (r - L)).toFixed(1)}" x2="${(Math.sin(a) * (r - 2)).toFixed(1)}" y2="${(-Math.cos(a) * (r - 2)).toFixed(1)}" stroke="#495057" stroke-width="${i % 5 ? 2 : 4}"/>`; }).join('')}
    ${Array.from({ length: 12 }, (_, i) => { const a = (i + 1) * 30 * Math.PI / 180; return `<text x="${(Math.sin(a) * (r - 38)).toFixed(1)}" y="${(-Math.cos(a) * (r - 38) + r * .09).toFixed(1)}" text-anchor="middle" font-size="${r * .2}" class="ttkb">${i + 1}</text>`; }).join('')}
    ${el(h * 30, r * .5, r * .07, '#c0392b')}${el(m * 6, r * .78, r * .045, '#1d4e89')}<circle r="${r * .06}" fill="#1f2a24"/>`; };
const kuleArka = () => `<rect x="-3000" y="-400" width="7200" height="780" fill="#2b2a6e"/><rect x="-3000" y="380" width="7200" height="900" fill="#2f5a2e"/><image href="oyun3/s/kule.webp" x="-240" y="0" width="1680" height="760" preserveAspectRatio="xMidYMid slice"/><g transform="translate(1100 560)">${resO('saatci-kaplumbaga', 200, 0, -60)}</g>`;
YER.kule = {
  id: 'kule', ad: 'Gözlem Kulesi', ders: 'Matematik', beceri: 'Saati okuma, kurma ve süre', ikon: '🔭', renk: '#4c6ef5', harita: { x: 935, y: 392 },
  hikaye: 'Saatçi Tıkır gözlem kulesinde yıldızları izliyor. Gözlemler belli saatlerde başlıyor. Saati oku, kur ve ne kadar sürdüğünü bul.',
  seviyeler: [['Saati oku', 'Akrep ve yelkovana bak.'], ['Saati kur', 'Yelkovanı ve akrebi doğru yere getir.'], ['Ne kadar sürdü?', 'Başlangıç ve bitiş arasındaki süre.']],
  bina(){ return `${golge(0, 4, 50)}<path d="M-30 0 L-22 -120 L22 -120 L30 0 Z" fill="#dbe4ff" stroke="#4c6ef5" stroke-width="3"/><path d="M-36 -120 Q0 -170 36 -120 Z" fill="#4c6ef5"/><rect x="10" y="-150" width="40" height="14" rx="5" fill="#495057" transform="rotate(-25 10 -150)"/><circle cy="-70" r="18" fill="#fff" stroke="#4c6ef5" stroke-width="3"/><line x1="0" y1="-70" x2="0" y2="-82" stroke="#1d4e89" stroke-width="3"/><line x1="0" y1="-70" x2="8" y2="-70" stroke="#c0392b" stroke-width="3"/>`; },
  gorev(lvl, k, ctx){
    if (lvl === 0) {
      const T = rint(1, 12) * 60 + rint(0, 11) * 5, h = Math.floor(T / 60) % 12 || 12, m = T % 60, d = dijital(T);
      sv.innerHTML = kuleArka() + `<g transform="translate(560 380)">${saatC(T, 220)}</g>`;
      setInstr(k === 0 ? 'Gözlem hangi saatte başlıyor? Kısa ve kırmızı olan akrep saati, uzun ve mavi olan yelkovan dakikayı gösterir. Yelkovanın gösterdiği her rakam 5 dakikadır.' : 'Saat kaç?');
      const ad = [`${iki(m / 5 || 12)}:${iki(h * 5 % 60)}`, dijital(T - 60), dijital(T + 60), `${iki(h)}:${iki(m / 5)}`].filter((x, i, a) => x !== d && a.indexOf(x) === i).slice(0, 2);
      secT([{ t: d, ok: true }, ...ad.map(t => ({ t }))], () => ctx.dogru(`Evet! Saat ${d}.`, `<b>${d}</b><small>${m === 0 ? `Akrep ${h} üzerinde, yelkovan 12 üzerinde: tam saat.` : `Akrep ${h} ile ${h % 12 + 1} arasında, yelkovan ${m / 5} üzerinde: ${m} dakika.`}</small>`, 2600, 'sag'),
        o => ctx.yanlis(o.t === ad[0] ? 'Akrep ile yelkovanı karıştırdın. Kısa olan akrep saati gösterir.' : o.t.endsWith(iki(m / 5)) ? 'Yelkovanın gösterdiği rakamı 5 ile say: 5, 10, 15…' : 'Akrebe dikkat et. Hangi iki rakamın arasında?'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === d).click();
    } else if (lvl === 1) {
      const H = rint(1, 12) * 60 + rint(0, 11) * 5; let T = ((H + rint(2, 9) * 60 + rint(1, 11) * 5) % 720) || 720;
      const ciz = () => { sv.innerHTML = kuleArka() + `<g transform="translate(470 380)">${saatC(T, 210)}</g><g transform="translate(960 220)"><rect x="-130" y="-60" width="260" height="110" rx="16" fill="#1f2a24"/><text y="22" text-anchor="middle" font-size="64" fill="#69db7c" font-family="monospace">${dijital(H)}</text><text y="-72" text-anchor="middle" class="ttkb" font-size="26" fill="#fff">Gözlem saati</text></g>`; };
      ciz();
      setInstr(k === 0 ? `Gözlem başlama saati ekranda yazıyor: ${dijital(H)}. Duvar saatini bu saate kur. Düğmelerle yelkovanı beşer dakika, akrebi birer saat ilerlet ya da geri al. Bitince Tamam düğmesine bas.` : `Saati ${dijital(H)} olarak kur.`);
      eylem('<button class="cta alt" id="sGeri1">− 1 saat</button><button class="cta alt" id="sGeri5">− 5 dk</button><button class="cta alt" id="sIleri5">+ 5 dk</button><button class="cta alt" id="sIleri1">+ 1 saat</button><button class="cta" id="sGo">Tamam</button>');
      const oy = dk => () => { if (KILIT) return; T = ((T + dk) % 720 + 720) % 720 || 720; sTik(); ciz(); };
      $('sGeri1').onclick = oy(-60); $('sGeri5').onclick = oy(-5); $('sIleri5').onclick = oy(5); $('sIleri1').onclick = oy(60);
      $('sGo').onclick = () => { if (KILIT) return; if (T % 720 === H % 720) ctx.dogru(`Evet! Saat ${dijital(H)}.`, `<b>${dijital(H)}</b><small>Yelkovan ilerledikçe akrep de yavaşça ilerler.</small>`, 2400, 'sag');
        else ctx.yanlis(T % 60 !== H % 60 ? 'Önce yelkovanı doğru dakikaya getir.' : 'Dakika doğru. Şimdi akrebi doğru saate getir.'); };
      if (window.__TEST) window.__coz = () => { T = H; ciz(); $('sGo').click(); };
    } else {
      const B = rint(1, 9) * 60 + rint(0, 11) * 5, d = (k < 3 ? rint(1, 6) * 15 : rint(5, 16) * 5 + 60), E = B + d;
      sv.innerHTML = kuleArka() + `<g transform="translate(300 360)">${saatC(B, 170)}<text y="225" text-anchor="middle" class="ttkb" font-size="32" fill="#fff">Başladı</text></g><text x="560" y="370" font-size="80" fill="#ffd43b" class="ttkb">→</text><g transform="translate(820 360)">${saatC(E, 170)}<text y="225" text-anchor="middle" class="ttkb" font-size="32" fill="#fff">Bitti</text></g>`;
      setInstr(k === 0 ? 'Yıldız gözlemi soldaki saatte başladı, sağdaki saatte bitti. Gözlem ne kadar sürdü? Bir saat 60 dakikadır.' : 'Gözlem ne kadar sürdü?');
      const ad = [d + 15, d - 15, d + 60, d - 5].filter((x, i, a) => x > 0 && x !== d && a.indexOf(x) === i).slice(0, 2);
      secT([{ t: sureSoz(d), ok: true }, ...ad.map(x => ({ t: sureSoz(x) }))], () => ctx.dogru(`Evet! ${sureSoz(d)}.`, `${dijital(B)} → ${dijital(E)}<small>Gözlem <b>${sureSoz(d)}</b> sürdü.</small>`, 2600, 'sag'), () => ctx.yanlis('Önce saatleri, sonra dakikaları say. Yelkovanın her tam turu 1 saattir.'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === sureSoz(d)).click();
    }
  },
};
