// Kâşif Adası — ilk yerler: Liman (sayıları çözümleme), Laboratuvar (maddenin hâlleri, karışımlar), Fener (sözcükte anlam)
"use strict";
const resA = (ad, w, x = 0, y = 0) => `<image href="${R(ad)}" x="${x - w / 2}" y="${y - w / 2}" width="${w}" height="${w}"/>`;
// Metin seçenek düğmeleri (eylem çubuğunda): l = [{t, ok}], iyi() / kotu(secilen)
const secT = (l, iyi, kotu) => { eylem(shuffle(l).map((o, i) => `<button class="cta sec3" data-i="${l.indexOf(o)}">${o.h || kes(o.t)}</button>`).join(''));
  $('eylem').querySelectorAll('.sec3').forEach(b => b.onclick = () => { if (KILIT) return; const o = l[+b.dataset.i]; if (o.ok) iyi(o); else { b.disabled = true; kotu(o); } }); };
const sigdir = (t, px, w) => Math.min(px, Math.floor(px * w / Math.max(1, olc(t, px))));
// Cümle şeridi: vurgulanan sözcük kırmızı ve kalın
const serit = (cumle, vurgu, y = 150) => { const px = sigdir(cumle, 44, 1040); let i = vurgu ? cumle.toLocaleLowerCase('tr').indexOf(vurgu.toLocaleLowerCase('tr')) : -1;
  const ic = i < 0 ? esc(cumle) : `${esc(cumle.slice(0, i))}<tspan fill="#c0392b" font-weight="700" text-decoration="underline">${esc(cumle.slice(i, i + vurgu.length))}</tspan>${esc(cumle.slice(i + vurgu.length))}`;
  return `<g transform="translate(600 ${y})"><rect x="-560" y="-56" width="1120" height="104" rx="22" fill="#fffdf2" stroke="#c9a227" stroke-width="4"/><text y="${px * .35}" text-anchor="middle" class="ttkb" font-size="${px}" fill="#1f2a24">${ic}</text></g>`; };

/* ===================== 1) LİMAN: sayıları çözümleme ===================== */
// 1 çuval = 1, 1 sandık = 10 çuval, 1 konteyner = 100 çuval
const konteyner = () => `<rect x="-34" y="-22" width="68" height="44" rx="4" fill="#e03131" stroke="#8a1c1c" stroke-width="3"/>${[-22, -11, 0, 11, 22].map(x => `<line x1="${x}" y1="-18" x2="${x}" y2="18" stroke="#b02525" stroke-width="3"/>`).join('')}<text y="7" text-anchor="middle" font-size="18" font-weight="700" fill="#fff" class="ttkb">100</text>`;
const sandik = () => `<rect x="-16" y="-15" width="32" height="30" rx="3" fill="#c98d55" stroke="#7a4a26" stroke-width="2.5"/><path d="M-16 -15 L16 15 M16 -15 L-16 15" stroke="#9a6532" stroke-width="2"/><text y="6" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" stroke="#7a4a26" stroke-width=".6" class="ttkb">10</text>`;
const cuval = () => `<path d="M-10 -10 Q0 -16 10 -10 L12 10 Q0 15 -12 10 Z" fill="#f3e1b6" stroke="#a8864a" stroke-width="2"/><path d="M-6 -12 L6 -12" stroke="#a8864a" stroke-width="3"/><text y="7" text-anchor="middle" font-size="12" font-weight="700" fill="#7a5a2a" class="ttkb">1</text>`;
const limanArka = () => `<rect x="-3000" y="-400" width="7200" height="780" fill="#cfe1ee"/><rect x="-3000" y="380" width="7200" height="900" fill="#5f8fbf"/><image href="oyun3/s/liman.webp" x="-80" y="0" width="1360" height="760" preserveAspectRatio="xMidYMid slice"/>`;
const gemi = (a, b, c) => { const satir = (n, w, f, y) => Array.from({ length: n }, (_, i) => `<g transform="translate(${170 + i * w} ${y})">${f()}</g>`).join('');
  return `<g><path d="M80 420 L900 420 L840 520 L140 520 Z" fill="#1d4e89"/><rect x="80" y="404" width="820" height="20" fill="#f4f7fb"/><text x="200" y="490" class="ttkb" font-size="34" fill="#fff">KÂŞİF</text>
    ${satir(a, 76, konteyner, 378)}${satir(b, b > 9 ? 36 : 40, sandik, 330)}${satir(c, c > 9 ? 26 : 30, cuval, 294)}</g>`; };
YER.liman = {
  id: 'liman', ad: 'Liman', ders: 'Matematik', beceri: 'Sayıları çözümleme: yüzler, onlar, birler', ikon: '⚓', renk: '#1d4e89', harita: { x: 565, y: 565 },
  hikaye: 'Kaptan Ördek, adaya un taşıyan gemiyi yüklüyor. Her sandıkta 10 çuval, her konteynerde 100 çuval un var. Gemiyi siparişe göre yükle.',
  seviyeler: [['Gemiyi yükle', 'Siparişteki sayı kadar unu yükle.'], ['Yükü oku', 'Gemideki unun sayısını bul.'], ['Paketle', '10 çuvalı bir sandığa, 10 sandığı bir konteynere koy.']],
  bina(){ return `${golge(0, 4, 90)}<path d="M-80 -20 L80 -20 L60 10 L-60 10 Z" fill="#1d4e89"/><rect x="-60" y="-44" width="40" height="24" fill="#e03131"/><rect x="-14" y="-40" width="22" height="20" fill="#c98d55"/><rect x="14" y="-40" width="22" height="20" fill="#c98d55"/><rect x="-4" y="-120" width="8" height="76" fill="#7a4a26"/><path d="M4 -116 L60 -64 L4 -64 Z" fill="#fff" stroke="#ccc"/><path d="M-4 -110 L-50 -64 L-4 -64 Z" fill="#fff" stroke="#ccc"/>`; },
  gorev(lvl, k, ctx){
    const kaptan = `<g transform="translate(110 330)">${resA('ordek', 130)}</g>`;
    const siparis = (t1, t2) => `<g transform="translate(520 150)"><rect x="-130" y="-70" width="260" height="140" rx="14" fill="#fff" stroke="#1d4e89" stroke-width="4"/><text y="-28" text-anchor="middle" class="ttkb" font-size="26" fill="#1d4e89">${t1}</text><text y="40" text-anchor="middle" class="ttkb" font-size="58" fill="#c0392b">${t2}</text></g>`;
    const kart3 = (n) => { const a = Math.floor(n / 100), b = Math.floor(n / 10) % 10, c = n % 10; return `<b>${n}</b> = ${a * 100} + ${b * 10} + ${c}<small>${a} yüzlük, ${b} onluk, ${c} birlik</small>`; };
    if (lvl === 0) {
      const n = rint(1, 9) * 100 + (k % 3 === 2 ? 0 : rint(1, 9)) * 10 + rint(0, 9), A = Math.floor(n / 100), B = Math.floor(n / 10) % 10, C = n % 10; let a = 0, b = 0, c = 0;
      const ciz = () => { sv.innerHTML = limanArka() + gemi(a, b, c) + siparis('Sipariş: çuval', n) + kaptan +
        [['k', konteyner, 'Konteyner', 620], ['s', sandik, 'Sandık', 690], ['c', cuval, 'Çuval', 750]].map(([id, f, ad, y], i) => `<g class="kaynak" data-k="${id}" transform="translate(${1000 + i * 0} ${y - 80})" style="cursor:pointer"><rect x="-80" y="-34" width="250" height="64" rx="14" fill="#fff" stroke="#1d4e89" stroke-width="3"/><g transform="translate(-40 -2) scale(${id === 'k' ? .8 : 1.1})">${f()}</g><text x="10" y="10" class="ttkb" font-size="28">${ad}</text></g>`).join('');
        sv.querySelectorAll('.kaynak').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const t = g.dataset.k;
          if ((t === 'k' && a >= 9) || (t === 's' && b >= 9) || (t === 'c' && c >= 9)) { FB('Gemide bu yükten en çok 9 tane olabilir.', false); return; }
          if (t === 'k') a++; else if (t === 's') b++; else c++; sPop(); ciz(); })); };
      ciz();
      setInstr(k === 0 ? `Siparişte ${n} çuval un var. Yüklere dokunarak gemiye konteyner, sandık ve çuval koy. Bitince Gemi hazır düğmesine bas.` : `Sipariş ${n} çuval. Gemiyi yükle.`);
      eylem('<button class="cta alt" id="lSil">Hepsini boşalt</button><button class="cta" id="lGo">Gemi hazır</button>');
      $('lSil').onclick = () => { if (KILIT) return; a = b = c = 0; sTik(); ciz(); };
      $('lGo').onclick = () => { if (KILIT) return;
        if (a === A && b === B && c === C) { ctx.dogru(`Evet! Gemide ${n} çuval un var.`, kart3(n)); return; }
        ctx.yanlis(a !== A ? `Konteynerlere bak. ${n} sayısında ${A} yüzlük var.` : b !== B ? `Sandıklara bak. ${n} sayısında ${B} onluk var.` : `Çuvallara bak. ${n} sayısında ${C} birlik var.`);
      };
      if (window.__TEST) window.__coz = () => { a = A; b = B; c = C; ciz(); $('lGo').click(); };
    } else if (lvl === 1) {
      const a = rint(1, 9), b = k % 3 === 1 ? 0 : rint(0, 9), c = k % 3 === 2 ? 0 : rint(1, 9), n = a * 100 + b * 10 + c;
      sv.innerHTML = limanArka() + gemi(a, b, c) + kaptan;
      setInstr(k === 0 ? 'Gemi yüklendi. Gemide kaç çuval un var? Konteynerleri, sandıkları ve çuvalları say.' : 'Gemide kaç çuval un var?');
      const ad = [...new Set([n, c * 100 + b * 10 + a, b === 0 ? a * 10 + c : a * 100 + c * 10 + b, a * 100 + b + c * 10, a + b + c].filter(v => v !== n && v > 0))].slice(0, 3);
      secT([{ t: String(n), ok: true }, ...ad.map(v => ({ t: String(v) }))], () => ctx.dogru(`Evet! ${n} çuval.`, kart3(n)),
        o => ctx.yanlis(+o.t === a + b + c ? 'Yükleri tek tek sayma. Bir konteyner 100, bir sandık 10 çuvaldır.' : b === 0 && +o.t === a * 10 + c ? 'Hiç sandık yok. Onlar basamağına sıfır yazılır.' : 'Önce konteynerlere, sonra sandıklara, en son çuvallara bak.'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === String(n)).click();
    } else {
      let a = rint(1, 6), b = k < 2 ? rint(2, 8) : rint(10, 16), c = rint(10, 19); const n = a * 100 + b * 10 + c;
      const ciz = () => { sv.innerHTML = limanArka() + gemi(a, b, c) + kaptan; eylem(`<button class="cta alt" id="pC" ${c < 10 ? 'disabled' : ''}>10 çuval → 1 sandık</button><button class="cta alt" id="pS" ${b < 10 ? 'disabled' : ''}>10 sandık → 1 konteyner</button>`);
        $('pC').onclick = () => { if (KILIT || c < 10) return; c -= 10; b++; sPop(); son(); };
        $('pS').onclick = () => { if (KILIT || b < 10) return; b -= 10; a++; sPop(); son(); }; };
      const son = () => { ciz(); if (b < 10 && c < 10) { setInstr('Paketleme bitti. Gemide toplam kaç çuval un var?');
        secT([{ t: String(n), ok: true }, ...[...new Set([n + 10, n - 10, a + b + c].filter(v => v !== n && v > 0))].slice(0, 2).map(v => ({ t: String(v) }))],
          () => ctx.dogru(`Evet! Paketleyince sayı değişmedi: ${n} çuval.`, kart3(n)), () => ctx.yanlis('Paketlemek un miktarını değiştirmez. Konteynerleri, sandıkları ve çuvalları say.')); } };
      ciz();
      setInstr(k === 0 ? 'Gemide her yükten en çok 9 tane olmalı. 10 çuvalı bir sandığa, 10 sandığı bir konteynere koy. Düğmelerle paketle.' : 'Fazla yükleri paketle.');
      if (window.__TEST) window.__coz = () => { a = Math.floor(n / 100); b = Math.floor(n / 10) % 10; c = n % 10; son(); zaman(() => [...$('eylem').querySelectorAll('.sec3')].find(x => x.textContent === String(n)).click(), 30); };
    }
  },
};

/* ===================== 2) LABORATUVAR: katı, sıvı, gaz; karışımları ayırma ===================== */
const kavanozA = (ad, renk, ic) => `<path d="M-70 -110 L70 -110 L70 60 Q70 80 50 80 L-50 80 Q-70 80 -70 60 Z" fill="#eef8ff" stroke="#6b8aa8" stroke-width="5"/><rect x="-78" y="-126" width="156" height="20" rx="6" fill="${renk}"/>${ic}<text y="128" text-anchor="middle" class="ttkb" font-size="36" fill="${renk}">${ad}</text>`;
const HALIC = { katı: `<rect x="-40" y="0" width="38" height="38" fill="#e8a33d" stroke="#8a5a1a" stroke-width="3"/><rect x="4" y="22" width="34" height="34" fill="#74c0fc" stroke="#1971c2" stroke-width="3"/><rect x="-22" y="40" width="30" height="30" fill="#b2f2bb" stroke="#2f9e44" stroke-width="3"/>`,
  sıvı: `<path d="M-66 10 Q-33 -4 0 10 T66 10 L66 60 Q66 76 50 76 L-50 76 Q-66 76 -66 60 Z" fill="#4dabf7" opacity=".8"/>`,
  gaz: [[-40, -70], [20, -40], [-10, 0], [40, 30], [-45, 40], [10, 60], [45, -80], [-20, -30], [30, -10]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#b197fc" opacity=".8"/>`).join('') };
const HALRENK = { katı: '#c06b00', sıvı: '#1971c2', gaz: '#7048e8' };
const MADDE = [['elma', 'katı', 'elma'], ['anahtar', 'katı', 'anahtar'], ['makas', 'katı', 'makas'], ['kitap', 'katı', 'kitap'], ['kaşık', 'katı', 'kasik'], ['top', 'katı', 'top'],
  ['süt', 'sıvı', 'sut'], ['çay', 'sıvı', 'cay'], ['şişedeki su', 'sıvı', 'sise'], ['yoğurt', null, null],
  ['balonun içindeki hava', 'gaz', 'balon'], ['tencereden yükselen su buharı', 'gaz', 'tencere'], ['bisiklet lastiğindeki hava', 'gaz', null]].filter(x => x[1]);
const NEDEN = { katı: 'Katıların belirli bir şekli vardır; kaptan kaba konunca şekli değişmez.', sıvı: 'Sıvılar akar ve konduğu kabın şeklini alır.', gaz: 'Gazlar her yere yayılır; kapalı kabın tamamını doldurur.' };
const KARISIM = [['demir tozu ile kum', 'mıknatıs', 'Mıknatıs demir tozunu çeker, kum geride kalır.', ['#555', '#e9c46a'], [4, 6]],
  ['toplu iğne ile boncuk', 'mıknatıs', 'Mıknatıs toplu iğneleri çeker, boncuklar kalır.', ['#868e96', '#f06595'], [3, 9]],
  ['çakıl taşı ile kum', 'elek', 'Elekten ince kum geçer, iri çakıllar üstte kalır.', ['#868e96', '#e9c46a'], [12, 4]],
  ['un ile ceviz içi', 'elek', 'Elekten ince un geçer, iri ceviz parçaları üstte kalır.', ['#a0522d', '#fff8e7'], [11, 3]],
  ['toprak ile su', 'süzgeç kâğıdı', 'Su süzgeç kâğıdından geçer, toprak kâğıtta kalır.', ['#8b5a2b', '#4dabf7'], [5, 0]],
  ['kum ile su', 'süzgeç kâğıdı', 'Su süzgeç kâğıdından geçer, kum kâğıtta kalır.', ['#e9c46a', '#4dabf7'], [5, 0]],
  ['pirinç ile küçük taşlar', 'elle ayıklama', 'Taşlar az ve göze görünür; elle tek tek ayıklanır.', ['#fff', '#868e96'], [4, 7]],
  ['mercimek ile fasulye', 'elle ayıklama', 'Taneler iri ve farklı; elle ayrılabilir.', ['#e8590c', '#fff'], [6, 10]]];
const ARAC = ['mıknatıs', 'elek', 'süzgeç kâğıdı', 'elle ayıklama'];
const labArka = () => `<rect x="-3000" y="-400" width="7200" height="1600" fill="#e7f5ff"/>${Array.from({ length: 14 }, (_, i) => `<rect x="${-200 + i * 120}" y="0" width="100" height="70" rx="6" fill="#d0ebff"/>`).join('')}
  <rect x="-3000" y="560" width="7200" height="40" fill="#adb5bd"/><rect x="-3000" y="600" width="7200" height="700" fill="#dee2e6"/>
  <g transform="translate(1150 520) scale(.8)">${baykus()}</g>`;
YER.lab = {
  id: 'lab', ad: 'Laboratuvar', ders: 'Fen Bilimleri', beceri: 'Katı, sıvı, gaz; karışımları ayırma', ikon: '⚗️', renk: '#7048e8', harita: { x: 596, y: 395 },
  hikaye: 'Bilge Baykuş adanın laboratuvarında maddeleri inceliyor. Maddeleri katı, sıvı ve gaz kavanozlarına ayır; sonra karışımları ayırmanın yolunu bul.',
  seviyeler: [['Kavanozlara ayır', 'Madde katı mı, sıvı mı, gaz mı?'], ['Kap değiştir', 'Başka kaba aktarınca ne olur?'], ['Karışımı ayır', 'Doğru aracı seç.']],
  bina(){ return `${golge(0, 4, 80)}<rect x="-70" y="-100" width="140" height="100" fill="#f3f0ff" stroke="#7048e8" stroke-width="3"/><path d="M-82 -96 L0 -140 L82 -96 Z" fill="#7048e8"/><path d="M-20 -80 L-20 -56 L-38 -20 L2 -20 L-16 -56 L-16 -80 Z" fill="#b197fc" stroke="#5f3dc4" stroke-width="2"/><circle cx="34" cy="-50" r="18" fill="#99e9f2" stroke="#1098ad" stroke-width="3"/><rect x="28" y="-86" width="12" height="20" fill="#1098ad"/>`; },
  gorev(lvl, k, ctx){
    if (lvl === 0) {
      const sec = AKTIF.sec || (AKTIF.sec = shuffle([...shuffle(MADDE.filter(m => m[1] === 'katı')).slice(0, 2), ...shuffle(MADDE.filter(m => m[1] === 'sıvı')).slice(0, 2), ...shuffle(MADDE.filter(m => m[1] === 'gaz')).slice(0, 2)]));
      const [ad, hal, res] = sec[k];
      const gorsel = res ? resA(res, 190, 0, -20) + (res === 'tencere' ? `<path d="M-30 -110 q-14 -24 0 -48 q14 -24 0 -48 M10 -110 q-14 -24 0 -48 q14 -24 0 -48" fill="none" stroke="#adb5bd" stroke-width="8" stroke-linecap="round"/>` : '') : `<circle r="90" fill="#343a40"/><circle r="52" fill="#dee2e6"/><circle r="12" fill="#495057"/>`;
      sv.innerHTML = labArka() + `<g transform="translate(600 240)"><ellipse cx="0" cy="100" rx="130" ry="20" fill="#000" opacity=".12"/>${gorsel}<g transform="translate(0 130)"><rect x="${-olc(ad, 32) / 2 - 20}" y="-30" width="${olc(ad, 32) + 40}" height="48" rx="12" fill="#fff" stroke="#7048e8" stroke-width="3"/><text y="5" text-anchor="middle" class="ttkb" font-size="32">${esc(ad)}</text></g></g>` +
        ['katı', 'sıvı', 'gaz'].map((h, i) => `<g class="kav" data-h="${h}" transform="translate(${260 + i * 340} 560)" style="cursor:pointer">${kavanozA(h.toLocaleUpperCase('tr'), HALRENK[h], HALIC[h])}</g>`).join('');
      setInstr(k === 0 ? `Bu madde katı mı, sıvı mı, gaz mı? Doğru kavanoza dokun. ${BUYUK(ad)}.` : `${BUYUK(ad)}. Hangi kavanoza koyalım?`);
      sv.querySelectorAll('.kav').forEach(g => g.addEventListener('click', () => { if (KILIT) return;
        if (g.dataset.h === hal) ctx.dogru(`Evet! ${BUYUK(ad)} ${hal}.`, `<b>${esc(ad)}</b>: ${hal}<small>${NEDEN[hal]}</small>`, 2600, 'sag');
        else { salla(g); ctx.yanlis(hal === 'gaz' ? 'Bu madde gözle zor görülür ve her yere yayılır. Düşün.' : hal === 'sıvı' ? 'Bu madde akar mı? Kabın şeklini alır mı?' : 'Bu maddenin kendi şekli var mı? Akar mı?'); } }));
      if (window.__TEST) window.__coz = () => sv.querySelector(`.kav[data-h="${hal}"]`).dispatchEvent(new Event('click'));
    } else if (lvl === 1) {
      const T = [['tahta küp', 'katı', '#e8a33d'], ['taş', 'katı', '#868e96'], ['buz küpü', 'katı', '#a5d8ff'], ['su', 'sıvı', '#4dabf7'], ['süt', 'sıvı', '#f8f9fa'], ['meyve suyu', 'sıvı', '#ff922b'], ['renkli duman', 'gaz', '#b197fc'], ['renkli duman', 'gaz', '#e599f7']];
      const [ad, hal, renk] = (AKTIF.t2 || (AKTIF.t2 = shuffle([...shuffle(T.filter(x => x[1] === 'katı')).slice(0, 2), ...shuffle(T.filter(x => x[1] === 'sıvı')).slice(0, 2), ...T.filter(x => x[1] === 'gaz')])))[k];
      const kutu = (ic, kapak) => `<rect x="-120" y="-80" width="240" height="160" rx="10" fill="#f8f9fa" stroke="#495057" stroke-width="5"/>${kapak ? '<rect x="-128" y="-96" width="256" height="18" rx="5" fill="#495057"/>' : ''}${ic}`;
      const ilk = hal === 'katı' ? `<rect x="-24" y="20" width="48" height="48" fill="${renk}" stroke="#333" stroke-width="3"/>` : hal === 'sıvı' ? `<rect x="-36" y="-30" width="72" height="100" fill="${renk}" stroke="#adb5bd" stroke-width="2"/>` : Array.from({ length: 14 }, (_, i) => `<circle cx="${-26 + (i % 4) * 17}" cy="${-50 + Math.floor(i / 4) * 30}" r="8" fill="${renk}"/>`).join('');
      const S1 = hal === 'katı' ? `<rect x="-24" y="32" width="48" height="48" fill="${renk}" stroke="#333" stroke-width="3"/>` : `<rect x="-24" y="32" width="48" height="48" fill="${renk}" stroke="#333" stroke-width="3"/>`;
      const S2 = `<rect x="-116" y="40" width="232" height="36" fill="${renk === '#f8f9fa' ? '#e9ecef' : renk}" opacity=".9"/>`;
      const S3 = Array.from({ length: 24 }, (_, i) => `<circle cx="${-100 + (i % 8) * 29}" cy="${-56 + Math.floor(i / 8) * 54}" r="8" fill="${renk}"/>`).join('');
      const sec = shuffle([['s1', 'Şekli ve miktarı değişmez.', S1, 'katı'], ['s2', 'Kabın şeklini alır, miktarı değişmez.', S2, 'sıvı'], ['s3', 'Kapalı kabın her yerine yayılır.', S3, 'gaz']]);
      sv.innerHTML = labArka() + `<g transform="translate(160 260)"><path d="M-50 -90 L50 -90 L50 80 L-50 80 Z" fill="#eef8ff" stroke="#6b8aa8" stroke-width="5"/>${hal === 'gaz' ? '<rect x="-56" y="-104" width="112" height="16" rx="5" fill="#495057"/>' : ''}<g transform="translate(0 0)">${ilk}</g><text y="130" text-anchor="middle" class="ttkb" font-size="30">${esc(ad)}</text></g><text x="300" y="250" class="ttkb" font-size="60" fill="#7048e8">→</text>` +
        sec.map(([id, t, ic], i) => `<g class="sonucS" data-id="${id}" transform="translate(${500 + i * 300} 250)" style="cursor:pointer"><g transform="scale(.95)">${kutu(ic, hal === 'gaz')}</g><text y="${130}" text-anchor="middle" class="ttkb" font-size="22">${['A', 'B', 'C'][i]}</text></g>`).join('');
      setInstr(k === 0 ? `${BUYUK(ad)} ${hal === 'gaz' ? 'kapalı kavanozdan daha büyük kapalı bir kutuya' : 'dar kavanozdan geniş bir kutuya'} aktarılıyor. Kutuda nasıl görünür? Doğru kutuya dokun.` : `${BUYUK(ad)} kutuya aktarılınca nasıl görünür?`);
      const dog = { katı: 's1', sıvı: 's2', gaz: 's3' }[hal];
      sv.querySelectorAll('.sonucS').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const s = sec.find(x => x[0] === g.dataset.id);
        if (g.dataset.id === dog) ctx.dogru(`Evet! ${s[1]}`, `<b>${esc(ad)}</b>: ${hal}<small>${NEDEN[hal]}</small>`, 2600, 'sag');
        else { salla(g); ctx.yanlis(`${s[1]} Bu özellik ${s[3]} maddelere aittir. ${BUYUK(ad)} ${hal === 'katı' ? 'akar mı' : hal === 'sıvı' ? 'kendi şeklini korur mu' : 'kabın dibinde mi kalır'}?`); } }));
      if (window.__TEST) window.__coz = () => sv.querySelector(`.sonucS[data-id="${dog}"]`).dispatchEvent(new Event('click'));
    } else {
      const [ad, arac, neden, [r1, r2], [b1, b2]] = (AKTIF.k3 || (AKTIF.k3 = shuffle(KARISIM)))[k];
      const tane = (n, r, renk, sv0) => Array.from({ length: n }, (_, i) => { const x = -58 + ((i * 37 + sv0 * 13) % 116), y = -60 + ((i * 53 + sv0 * 29) % 120); return r ? `<circle cx="${x}" cy="${y}" r="${r}" fill="${renk}" stroke="#495057" stroke-width="1.5"/>` : ''; }).join('');
      const ic = b2 === 0 ? `<rect x="-66" y="-70" width="132" height="146" fill="#4dabf7" opacity=".55"/>${tane(26, b1, r1, 1)}` : `${tane(22, b1, r1, 1)}${tane(22, b2, r2, 7)}`;
      sv.innerHTML = labArka() + `<g transform="translate(360 300)"><path d="M-80 -100 L80 -100 L80 80 Q80 96 64 96 L-64 96 Q-80 96 -80 80 Z" fill="#eef8ff" stroke="#6b8aa8" stroke-width="5"/>${ic}<g transform="translate(0 150)"><rect x="${-olc(ad, 30) / 2 - 20}" y="-30" width="${olc(ad, 30) + 40}" height="46" rx="12" fill="#fff" stroke="#7048e8" stroke-width="3"/><text y="4" text-anchor="middle" class="ttkb" font-size="30">${esc(ad)}</text></g></g>` +
        `<g transform="translate(760 300)"><text text-anchor="middle" class="ttkb" font-size="34" fill="#5f3dc4">Hangi araçla ayırırsın?</text></g>`;
      setInstr(k === 0 ? `Bilge Baykuş karışımları ayırmak istiyor: ${ad}. Hangi araçla ayırırsın?` : `${BUYUK(ad)} karışımını nasıl ayırırız?`);
      secT(ARAC.map(a => ({ t: a, ok: a === arac })), () => ctx.dogru(`Evet! ${BUYUK(arac)}.`, `<b>${esc(arac)}</b><small>${esc(neden)}</small>`, 2800, 'sag'),
        o => ctx.yanlis(o.t === 'mıknatıs' ? 'Mıknatıs yalnız demir gibi bazı metalleri çeker. Bu karışımda var mı?' : o.t === 'elek' ? 'Elek iri ve ince taneleri ayırır. Bu karışımdaki tanelerin boyu farklı mı?' : o.t === 'süzgeç kâğıdı' ? 'Süzgeç kâğıdı bir sıvının içindeki katıyı ayırır. Bu karışımda sıvı var mı?' : 'Elle ayıklama az sayıda, iri ve göze görünen taneler için uygundur.'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === arac).click();
    }
  },
};

/* ===================== 3) FENER: eş sesli sözcükler, gerçek ve mecaz anlam, deyimler ===================== */
const ESSESLI = [['gül', 'Bahçede kırmızı bir gül açtı.', 'çiçek', 'gülmek', 'gul', null], ['gül', 'Bu fıkraya sen de gül.', 'gülmek', 'çiçek', null, 'gul'],
  ['çay', 'Annem demlikte çay demledi.', 'içecek', 'küçük akarsu', 'cay', 'irmak'], ['çay', 'Köyün yanından küçük bir çay akıyor.', 'küçük akarsu', 'içecek', 'irmak', 'cay'],
  ['at', 'Dedemin çiftliğinde beyaz bir at var.', 'hayvan', 'fırlatmak', 'at', 'top'], ['at', 'Topu bana at!', 'fırlatmak', 'hayvan', 'top', 'at'],
  ['yaz', 'Bu yaz denize gideceğiz.', 'mevsim', 'yazı yazmak', 'gunes', 'kalem'], ['yaz', 'Adını defterin kapağına yaz.', 'yazı yazmak', 'mevsim', 'kalem', 'gunes'],
  ['ocak', 'Yeni yıl ocak ayında başlar.', 'yılın ilk ayı', 'yemek pişirilen yer', null, 'ocak'], ['ocak', 'Çorba ocakta kaynıyor.', 'yemek pişirilen yer', 'yılın ilk ayı', 'ocak', null],
  ['dolu', 'Gökten iri iri dolu yağdı.', 'gökten yağan buz taneleri', 'boş olmayan', 'bulut', 'bardak'], ['dolu', 'Bardağım su dolu.', 'boş olmayan', 'gökten yağan buz taneleri', 'bardak', 'bulut'],
  ['yüz', 'Kumbaramda yüz lira var.', 'sayı (100)', 'surat', null, null], ['yüz', 'Sabah kalkınca yüzümü yıkadım.', 'surat', 'sayı (100)', null, null]];
const MECAZ = [['Ağır çantayı taşırken yoruldum.', 'ağır', 'gerçek', 'Çantanın kütlesi fazla.'], ['Arkadaşına ağır sözler söyledi.', 'ağır', 'mecaz', 'Sözlerin kütlesi olmaz; "kırıcı" demek.'],
  ['Çorba çok sıcaktı, biraz bekledim.', 'sıcak', 'gerçek', 'Çorbanın ısısı yüksek.'], ['Komşumuz bizi sıcak bir gülümsemeyle karşıladı.', 'sıcak', 'mecaz', '"İçten, samimi" demek.'],
  ['Kardeşim tatlı bir kurabiye yedi.', 'tatlı', 'gerçek', 'Kurabiyenin tadı şekerli.'], ['Bebeğin tatlı gülüşü herkesi mutlu etti.', 'tatlı', 'mecaz', '"Sevimli" demek.'],
  ['Bıçağın ucu çok keskin.', 'keskin', 'gerçek', 'Bıçak iyi keser.'], ['Elif\'in keskin bir zekâsı var.', 'keskin', 'mecaz', '"Çok hızlı ve güçlü" demek.'],
  ['Kışın göl buz tuttu.', 'buz', 'gerçek', 'Su donup katı hâle geldi.'], ['Yabancının bakışları buz gibiydi.', 'buz', 'mecaz', '"Soğuk, sevgisiz" demek.'],
  ['Kalın bir yorgan aldık.', 'kalın', 'gerçek', 'Yorganın eni geniş.'], ['Dedemin kalın bir sesi var.', 'kalın', 'mecaz', '"Pes, tok" demek.']];
const DEYIM = [['Elif, öğretmeninin anlattıklarını dikkatle dinledi.', 'kulak vermek', 'dikkatle dinlemek'], ['Kaan karnesini görünce çok sevindi.', 'ağzı kulaklarına varmak', 'çok sevinmek'],
  ['Defne gazeteyi baştan sona okumadı, yalnız kısaca baktı.', 'göz atmak', 'kısaca bakmak'], ['Mert küçük bir sorunu çok büyütüp herkese anlattı.', 'pireyi deve yapmak', 'küçük bir şeyi çok büyütmek'],
  ['Zeynep bayram sabahı sevinçten yerinde duramıyordu.', 'etekleri zil çalmak', 'çok sevinçli olmak'], ['Emir sahneye çıkınca heyecandan hiçbir şey söyleyemedi.', 'dili tutulmak', 'heyecandan konuşamamak'],
  ['Ada zor bulmacanın çözümünü uzun uzun düşündü.', 'kafa yormak', 'bir konu üzerinde çok düşünmek'], ['Yusuf arkadaşına verdiği sözü tuttu.', 'sözünde durmak', 'verdiği sözü yerine getirmek'],
  ['Ecrin\'in dedesi herkese yardım eder, cömerttir.', 'eli açık', 'cömert'], ['Ömer bütün gün koşturunca çok yoruldu.', 'canı çıkmak', 'çok yorulmak']];
const fenerArka = () => `<rect x="-3000" y="-400" width="7200" height="1600" fill="#ffe8cc"/><circle cx="160" cy="120" r="60" fill="#ffd43b" opacity=".8"/>
  <rect x="-3000" y="470" width="7200" height="900" fill="#1f8fd6"/><path d="M820 470 Q960 360 1250 380 L4200 380 L4200 470 Z" fill="#8cc97b"/>
  <g transform="translate(1040 400)"><path d="M-40 0 L-26 -260 L26 -260 L40 0 Z" fill="#fff" stroke="#c92a2a" stroke-width="4"/><path d="M-37 -60 L37 -60 L34 -110 L-34 -110 Z M-31 -160 L31 -160 L29 -210 L-29 -210 Z" fill="#e03131"/><rect x="-34" y="-300" width="68" height="40" rx="6" fill="#ffe066" stroke="#c92a2a" stroke-width="4"/><path d="M-40 -300 L0 -340 L40 -300 Z" fill="#c92a2a"/></g>
  <g transform="translate(1130 610)">${resA('papagan', 150)}</g>`;
YER.fener = {
  id: 'fener', ad: 'Deniz Feneri', ders: 'Türkçe', beceri: 'Eş sesli sözcükler, gerçek ve mecaz anlam, deyimler', ikon: '🗼', renk: '#c92a2a', harita: { x: 1093, y: 455 },
  hikaye: 'Kaptan Papağan fenerde gemilere sözcüklerle mesaj gönderiyor. Bazı sözcüklerin birden çok anlamı var. Cümleye bak, doğru anlamı bul.',
  seviyeler: [['Eş sesli sözcükler', 'Yazılışı aynı, anlamı farklı sözcükler.'], ['Gerçek mi, mecaz mı?', 'Sözcük kendi anlamında mı?'], ['Deyim avı', 'Durumu anlatan deyimi bul.']],
  bina(){ return `${golge(0, 4, 50)}<path d="M-26 0 L-16 -130 L16 -130 L26 0 Z" fill="#fff" stroke="#c92a2a" stroke-width="3"/><path d="M-24 -30 L24 -30 L22 -60 L-22 -60 Z M-20 -90 L20 -90 L18 -115 L-18 -115 Z" fill="#e03131"/><rect x="-22" y="-152" width="44" height="24" rx="4" fill="#ffe066" stroke="#c92a2a" stroke-width="3"/><path d="M-26 -152 L0 -176 L26 -152 Z" fill="#c92a2a"/><path d="M22 -140 L110 -170 L110 -110 Z" fill="#ffe066" opacity=".5"/>`; },
  gorev(lvl, k, ctx){
    if (lvl === 0) {
      const l = AKTIF.e1 || (AKTIF.e1 = shuffle(ESSESLI).slice(0, N_GOREV)); const [s, cumle, dog, yan, r1, r2] = l[k];
      const kartS = (t, r, id, x) => `<g class="anlam" data-id="${id}" transform="translate(${x} 470)" style="cursor:pointer"><rect x="-200" y="-150" width="400" height="270" rx="24" fill="#fff" stroke="#c92a2a" stroke-width="4"/>${r ? resA(r, 150, 0, -50) : t.includes('100') ? '<text y="-20" text-anchor="middle" font-size="90" class="ttkb" fill="#c92a2a">100</text>' : t === 'surat' ? '<g transform="translate(0 -50)"><circle r="62" fill="#ffd8a8" stroke="#c2763a" stroke-width="4"/><circle cx="-22" cy="-12" r="7"/><circle cx="22" cy="-12" r="7"/><path d="M-26 18 Q0 40 26 18" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/></g>' : '<g transform="translate(0 -50)"><rect x="-60" y="-56" width="120" height="112" rx="10" fill="#fff" stroke="#c92a2a" stroke-width="4"/><rect x="-60" y="-56" width="120" height="34" rx="10" fill="#c92a2a"/><text y="-30" text-anchor="middle" fill="#fff" font-size="22" class="ttkb">OCAK</text><text y="38" text-anchor="middle" font-size="54" class="ttkb">1</text></g>'}<text y="80" text-anchor="middle" class="ttkb" font-size="${sigdir(t, 34, 370)}">${esc(t)}</text></g>`;
      const sol = Math.random() < .5; sv.innerHTML = fenerArka() + serit(cumle, s) + kartS(sol ? dog : yan, sol ? r1 : r2, sol ? 'd' : 'y', 320) + kartS(sol ? yan : dog, sol ? r2 : r1, sol ? 'y' : 'd', 830);
      setInstr(k === 0 ? `Cümleyi oku: ${cumle} Bu cümlede “${s}” hangi anlamda? Doğru karta dokun.` : `${cumle} Bu cümlede “${s}” hangi anlamda?`);
      sv.querySelectorAll('.anlam').forEach(g => g.addEventListener('click', () => { if (KILIT) return;
        if (g.dataset.id === 'd') ctx.dogru(`Evet! Bu cümlede “${s}”, ${dog} anlamında.`, `<b>${esc(s)}</b>: ${esc(dog)}<small>Yazılışı aynı, anlamı farklı: eş sesli sözcük.</small>`, 2600, 'sag');
        else { salla(g); ctx.yanlis(`“${s}” sözcüğünün öbür anlamı da var. Cümledeki öbür sözcüklere bak.`); } }));
      if (window.__TEST) window.__coz = () => sv.querySelector('.anlam[data-id="d"]').dispatchEvent(new Event('click'));
    } else if (lvl === 1) {
      const l = AKTIF.e2 || (AKTIF.e2 = shuffle(MECAZ).slice(0, N_GOREV)); const [cumle, s, tur, ac] = l[k];
      sv.innerHTML = fenerArka() + serit(cumle, s, 200);
      setInstr(k === 0 ? `${cumle} Bu cümlede “${s}” sözcüğü kendi anlamında mı kullanılmış, yoksa başka bir anlam mı kazanmış? Gerçek anlam ya da mecaz anlam düğmesine bas.` : `${cumle} “${s}” gerçek anlamda mı, mecaz anlamda mı?`);
      secT([{ t: 'Gerçek anlam', ok: tur === 'gerçek' }, { t: 'Mecaz anlam', ok: tur === 'mecaz' }], () => ctx.dogru(`Evet! ${BUYUK(tur)} anlam.`, `<b>${esc(s)}</b>: ${tur} anlam<small>${esc(ac)}</small>`, 2800, 'sag'),
        () => ctx.yanlis(tur === 'mecaz' ? `“${s}” burada kendi anlamında değil. Gerçekten dokunulabilir ya da ölçülebilir mi?` : `“${s}” burada kendi anlamında kullanılmış. Gerçekten öyle mi?`));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent.startsWith(tur === 'gerçek' ? 'Gerçek' : 'Mecaz')).click();
    } else {
      const l = AKTIF.e3 || (AKTIF.e3 = shuffle(DEYIM).slice(0, N_GOREV)); const [durum, dy, an] = l[k];
      const yan = shuffle(DEYIM.filter(x => x[1] !== dy)).slice(0, 2).map(x => x[1]);
      sv.innerHTML = fenerArka() + serit(durum, null, 200);
      setInstr(k === 0 ? `${durum} Bu durumu hangi deyim anlatır? Doğru deyimi seç.` : `${durum} Bu durumu hangi deyim anlatır?`);
      secT([{ t: dy, ok: true }, ...yan.map(t => ({ t }))], () => ctx.dogru(`Evet! ${BUYUK(dy)}.`, `<b>${esc(dy)}</b><small>${esc(an)}</small>`, 2800, 'sag'),
        o => { const x = DEYIM.find(z => z[1] === o.t); ctx.yanlis(`“${o.t}”, ${x ? x[2] : ''} demektir. Durumla uyuyor mu?`); });
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === dy).click();
    }
  },
};
