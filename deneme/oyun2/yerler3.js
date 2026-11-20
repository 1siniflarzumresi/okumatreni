// Ladin Kasabası — üçüncü yerler: Terzi (uzunluk), Tabelacı (büyük harf, yazım), Ayna Gölü (eş ve zıt anlam)
"use strict";
// x ekseninde sürükleme (cetvel, makas): f(x) yeni konumu döndürür
function yatayCek(g, f, bitti){ g.classList.add('tutulur');
  g.addEventListener('pointerdown', e => { if (KILIT) return; e.preventDefault(); const p0 = nokta(e), x0 = +g.dataset.x; try { g.setPointerCapture(e.pointerId); } catch(_){} g.classList.add('tutuldu');
    const mv = ev => { const q = nokta(ev); f(x0 + q.x - p0.x); };
    const up = () => { g.removeEventListener('pointermove', mv); g.removeEventListener('pointerup', up); g.removeEventListener('pointercancel', up); g.classList.remove('tutuldu'); if (bitti) bitti(); };
    g.addEventListener('pointermove', mv); g.addEventListener('pointerup', up); g.addEventListener('pointercancel', up); }); }
const secButon = (dizi, dogru, iyi, kotu) => { eylem(shuffle(dizi).map(v => `<button class="cta sec" data-v="${v}">${v}</button>`).join(''));
  $('eylem').querySelectorAll('.sec').forEach(b => b.onclick = () => { if (KILIT) return; if (b.dataset.v === String(dogru)) iyi(); else { b.disabled = true; kotu(b.dataset.v); } }); };
const uc = (d, ...ek) => { const s = [...new Set([d, ...ek].filter(v => v > 0))]; while (s.length < 3) s.push(d + s.length + 1); return s.slice(0, 3); };

/* ===================== 9) TERZİ: uzunluk ölçme ===================== */
const CM = 44, C0 = 150; // 1 santimetre = 44 birim, cetvelin sıfırı x = 150
const cetvel = (y, n) => `<g transform="translate(0 ${y})"><rect x="${C0 - 24}" y="0" width="${n * CM + 48}" height="78" rx="8" fill="#ffe08a" stroke="#b8860b" stroke-width="3"/>${Array.from({ length: n * 2 + 1 }, (_, i) => `<line x1="${C0 + i * CM / 2}" y1="0" x2="${C0 + i * CM / 2}" y2="${i % 2 ? 16 : 30}" stroke="#5a4a10" stroke-width="${i % 2 ? 2 : 3}"/>${i % 2 ? '' : `<text x="${C0 + i * CM / 2}" y="56" text-anchor="middle" font-family="Andika" font-weight="700" font-size="22" fill="#5a4a10">${i / 2}</text>`}`).join('')}<text x="${C0 + n * CM + 4}" y="72" font-family="Andika" font-size="14" fill="#5a4a10">cm</text></g>`;
const kurdele = (w, renk) => `<rect x="0" y="-16" width="${w}" height="32" fill="${renk}" stroke="#000" stroke-opacity=".25" stroke-width="2"/><path d="M0 -16 l-14 16 l14 16 Z M${w} -16 l14 16 l-14 16 Z" fill="${renk}"/><line x1="0" y1="-8" x2="${w}" y2="-8" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="8 8"/>`;
const atas = (w) => `<path d="M6 -9 H${w - 10} a9 9 0 0 1 0 18 H10 a6 6 0 0 1 0 -12 H${w - 14} a3 3 0 0 1 0 6 H14" fill="none" stroke="#6b7c93" stroke-width="3.5"/>`;
const silgi = (w) => `<rect x="2" y="-12" width="${w - 4}" height="24" rx="5" fill="#ff8fa3" stroke="#c2577a" stroke-width="2"/><rect x="${w * .55}" y="-12" width="${w * .45 - 2}" height="24" rx="5" fill="#74c0fc" stroke="#1971c2" stroke-width="2"/>`;
YER.terzi = {
  id: 'terzi', ad: 'Terzi', ders: 'Matematik', beceri: 'Uzunluk ölçme: birim ve santimetre', ikon: '📏', renk: '#c2255c', harita: { x: 860, y: 455 },
  hikaye: 'Terzi Zürafa kurdele ve kumaş ölçüyor. Önce ataşla, sonra cetvelle ölç. Cetvelde ölçmeye her zaman sıfırdan başlanır.',
  seviyeler: [['Ataşla ölç', 'Birimleri boşluk bırakmadan uç uca diz.'], ['Cetvelle ölç', 'Kurdeleyi sıfıra getir, ucunu oku.'], ['Doğru yerden kes', 'Siparişteki uzunlukta kes.']],
  bina(){ return `${golge(0, 4, 80)}<rect x="-72" y="-108" width="144" height="108" fill="#fde2ea" stroke="#c2255c" stroke-width="3"/><path d="M-84 -104 L0 -146 L84 -104 Z" fill="#c2255c"/><rect x="-54" y="-86" width="56" height="46" rx="6" fill="#bfe6ff" stroke="#c2255c" stroke-width="3"/><path d="M-36 -78 q10 -6 20 0 l-4 30 h-12 Z" fill="#c2255c"/><rect x="18" y="-70" width="36" height="70" fill="#8a5a2b"/><g transform="translate(0 -126)"><rect x="-26" y="-9" width="52" height="18" rx="3" fill="#ffe08a" stroke="#b8860b" stroke-width="2"/>${[-18, -9, 0, 9, 18].map(x => `<line x1="${x}" y1="-9" x2="${x}" y2="-2" stroke="#5a4a10" stroke-width="2"/>`).join('')}</g>`; },
  gorev(lvl, k, ctx){
    const renk = pick(['#e03131', '#3a86ff', '#12b886', '#8b5cf6', '#f4a100']);
    const arka = () => `<rect x="-3000" y="-400" width="7200" height="1600" fill="#fde2ea"/>${Array.from({ length: 30 }, (_, i) => `<line x1="${-200 + i * 60}" y1="0" x2="${-200 + i * 60}" y2="330" stroke="#f9c6d4" stroke-width="18"/>`).join('')}
      <g>${['#e03131', '#3a86ff', '#12b886', '#f4a100', '#8b5cf6', '#f2546b'].map((c, i) => `<g transform="translate(${80 + i * 70} 90)"><rect x="-26" y="0" width="52" height="170" rx="10" fill="${c}"/><rect x="-26" y="0" width="52" height="170" rx="10" fill="url(#tKum)" opacity=".25"/><ellipse cy="0" rx="26" ry="8" fill="#fff" opacity=".5"/></g>`).join('')}</g>
      <defs><pattern id="tKum" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8 L8 0" stroke="#fff" stroke-width="2"/></pattern></defs><rect x="40" y="262" width="460" height="14" fill="#8a5a2b"/>
      <g transform="translate(720 70)"><path d="M-40 0 Q0 -20 40 0 L50 120 Q0 150 -50 120 Z" fill="#fff" stroke="#c9b48c" stroke-width="3"/><rect x="-4" y="140" width="8" height="120" fill="#8a5a2b"/><path d="M-50 40 Q0 60 50 40" stroke="${renk}" stroke-width="10" fill="none"/></g>
      <rect x="-3000" y="330" width="7200" height="20" fill="#7a4a26"/><rect x="-3000" y="350" width="7200" height="900" fill="#c98d55"/>${Array.from({ length: 12 }, (_, i) => `<line x1="-3000" y1="${380 + i * 34}" x2="4200" y2="${380 + i * 34}" stroke="#b07a3c" stroke-width="2"/>`).join('')}
      <g transform="translate(1090 330)">${resimK('zurafa', 240)}</g>`;
    if (lvl === 0) {
      const silgiMi = k >= 3, bw = silgiMi ? 60 : 84, n = silgiMi ? rint(5, 11) : rint(3, 8), x0 = 160, L = n * bw; let kon = 0, soruAcik = false;
      function ciz(){ let s = arka() + `<g transform="translate(${x0} 470)">${kurdele(L, renk)}</g><line x1="${x0}" y1="430" x2="${x0}" y2="560" stroke="#1d4e89" stroke-width="3" stroke-dasharray="6 5"/><line x1="${x0 + L}" y1="430" x2="${x0 + L}" y2="560" stroke="#1d4e89" stroke-width="3" stroke-dasharray="6 5"/>`;
        s += Array.from({ length: kon }, (_, i) => `<g transform="translate(${x0 + i * bw} 530)">${silgiMi ? silgi(bw) : atas(bw)}</g>`).join('');
        s += `<g class="kutu" transform="translate(1000 600)"><rect x="-90" y="-50" width="180" height="100" rx="12" fill="#fff" stroke="#1d4e89" stroke-width="4"/>${[0, 1, 2].map(i => `<g transform="translate(${-60} ${-26 + i * 22})">${silgiMi ? silgi(bw) : atas(bw)}</g>`).join('')}<text y="76" text-anchor="middle" class="ttkb" font-size="22">${silgiMi ? 'Silgiler' : 'Ataşlar'}</text></g>`;
        sv.innerHTML = s;
        sv.querySelector('.kutu').addEventListener('click', () => { if (KILIT || soruAcik) return; if (kon >= n + 2) { FB('Kurdelenin ucunu geçtin.', false); return; } kon++; sPop(); ciz(); }); }
      ciz();
      setInstr(k === 0 ? `Kurdele kaç ataş uzunluğunda? Ataş kutusuna dokun. Her dokunuşta bir ataş, öncekinin ucuna boşluk bırakmadan dizilir. Kurdelenin sonuna gelince Ölçtüm düğmesine bas.` : silgiMi ? 'Bu kez silgiyle ölç. Silgi kutusuna dokunarak silgileri uç uca diz.' : 'Kurdeleyi ataşla ölç.');
      eylem('<button class="cta alt" id="tGeri">Bir tane geri al</button><button class="cta" id="tGo">Ölçtüm</button>');
      $('tGeri').onclick = () => { if (KILIT || soruAcik || !kon) return; kon--; sTik(); ciz(); };
      $('tGo').onclick = () => { if (KILIT || soruAcik) return; const b = silgiMi ? 'silgi' : 'ataş', bl = silgiMi ? 'Silgiler' : 'Ataşlar';
        if (kon !== n) { ctx.yanlis(kon < n ? `${bl} kurdelenin sonuna ulaşmadı. ${BUYUK(b)} eklemeye devam et.` : `${bl} kurdelenin sonunu geçti. Fazla olanı geri al.`); return; }
        soruAcik = true; sOk(); setInstr(`Kurdele kaç ${b} uzunluğunda?`);
        secButon(uc(n, n + 1, n - 1), n, () => ctx.dogru(`Evet! ${sayiSoz(n)} ${b}.`, `Kurdele <b>${n} ${b}</b> uzunluğunda<small>${silgiMi ? 'Birim değişince ölçü sayısı da değişir.' : 'Birimleri boşluk bırakmadan uç uca dizdik.'}</small>`), () => ctx.yanlis(`${bl} tek tek say.`)); };
      if (window.__TEST) window.__coz = () => { kon = n; ciz(); $('tGo').click(); zaman(() => $('eylem').querySelector(`[data-v="${n}"]`).click(), 50); };
    } else if (lvl === 1) {
      const L = k < 3 ? rint(3, 10) : rint(8, 16), bas = rint(2, 4); let x = C0 + bas * CM;
      function ciz(){ sv.innerHTML = arka() + cetvel(520, 20) + `<g id="kurd" transform="translate(${x} 480)">${kurdele(L * CM, renk)}<rect x="-20" y="-30" width="${L * CM + 40}" height="60" fill="transparent"/></g><g transform="translate(1000 410)"><text text-anchor="middle" class="ttkb" font-size="22" fill="#5b6b7b">Kurdeleyi sağa sola çek</text></g>`;
        const g = $('kurd'); g.dataset.x = x;
        yatayCek(g, nx => { x = Math.max(C0 - 120, Math.min(C0 + (20 - L) * CM + 80, nx)); const cm = (x - C0) / CM; if (Math.abs(cm) < .3) x = C0; g.setAttribute('transform', `translate(${x} 480)`); }, () => { x = C0 + Math.round((x - C0) / (CM / 2)) * CM / 2; g.dataset.x = x; g.setAttribute('transform', `translate(${x} 480)`); if (x === C0) sPop(); }); }
      ciz();
      setInstr(k === 0 ? 'Kurdele kaç santimetre? Önce kurdeleyi çekip ucunu cetvelin sıfırına getir. Sonra öbür ucunun hangi sayıda olduğunu oku.' : 'Kurdeleyi cetvelle ölç. Sıfırdan başlamayı unutma.');
      const son = L + bas;
      secButon(uc(L, son, L + 1), L, () => { x = C0; ciz(); ctx.dogru(`Evet! Kurdele ${sayiSoz(L)} santimetre.`, `<b>${L} cm</b><small>Sıfırdan başlayıp ucu okuduk.</small>`); },
        v => ctx.yanlis(+v === son && x !== C0 ? 'Kurdelenin başı sıfırda değil. Önce kurdeleyi sıfıra getir.' : 'Kurdelenin başı sıfırda mı? Öbür ucuna dikkatle bak.'));
      if (window.__TEST) window.__coz = () => $('eylem').querySelector(`[data-v="${L}"]`).click();
    } else {
      const a = rint(3, 9), b = rint(2, 6), ek = k >= 3, N = ek ? a + b : rint(4, 17); let x = C0 + 19 * CM;
      function ciz(){ sv.innerHTML = arka() + cetvel(520, 20) + `<g transform="translate(${C0} 480)">${kurdele(19.5 * CM, renk)}</g><line id="kesC" x1="${x}" y1="430" x2="${x}" y2="530" stroke="#1f2a24" stroke-width="3" stroke-dasharray="7 6"/>
        <g id="makas" transform="translate(${x} 410)"><circle r="40" fill="transparent"/><path d="M0 -6 L-14 -40 M0 -6 L14 -40" stroke="#5b6b7b" stroke-width="7" stroke-linecap="round"/><circle cx="-18" cy="-52" r="13" fill="none" stroke="#e03131" stroke-width="6"/><circle cx="18" cy="-52" r="13" fill="none" stroke="#e03131" stroke-width="6"/><path d="M0 -6 L0 14" stroke="#1f2a24" stroke-width="3"/></g>
        <g transform="translate(1010 640)"><rect x="-150" y="-50" width="300" height="100" rx="12" fill="#fffdf6" stroke="#c2255c" stroke-width="4"/><text y="-12" text-anchor="middle" class="ttkb" font-size="22">Sipariş</text><text y="30" text-anchor="middle" class="ttkb" font-size="32" fill="#c2255c">${ek ? `${a} cm + ${b} cm` : `${N} cm kurdele`}</text></g>`;
        const g = $('makas'); g.dataset.x = x;
        yatayCek(g, nx => { x = Math.max(C0 + CM, Math.min(C0 + 19 * CM, nx)); g.setAttribute('transform', `translate(${x} 410)`); $('kesC').setAttribute('x1', x); $('kesC').setAttribute('x2', x); },
          () => { x = C0 + Math.round((x - C0) / CM) * CM; g.dataset.x = x; g.setAttribute('transform', `translate(${x} 410)`); $('kesC').setAttribute('x1', x); $('kesC').setAttribute('x2', x); sTik(); }); }
      ciz();
      setInstr(ek ? `Müşteri önce ${a} santimetre istedi, sonra ${b} santimetre daha uzun olsun dedi. Makası çek, doğru yerden kes.` : (k === 0 ? `Müşteri ${N} santimetre kurdele istiyor. Kurdele cetvelin sıfırından başlıyor. Makası ${N} sayısına çek, sonra Kes düğmesine bas.` : `${N} santimetre kurdele kes.`));
      eylem('<button class="cta" id="tKes">Kes ✂️</button>');
      $('tKes').onclick = () => { if (KILIT) return; const cm = Math.round((x - C0) / CM);
        if (cm === N) { sv.innerHTML += `<g transform="translate(${C0} 600)">${kurdele(N * CM, renk)}</g>`; ctx.dogru(`Tam ${sayiSoz(N)} santimetre!`, ek ? `${a} + ${b} = <b>${N} cm</b><small>Önce toplayıp sonra kestik.</small>` : `<b>${N} cm</b><small>Sıfırdan ${N} sayısına kadar.</small>`); }
        else ctx.yanlis(`Makas ${cm} sayısında. ${ek ? `Önce ${a} ile ${b} sayısını topla.` : `Sipariş ${N} santimetre.`}`); };
      if (window.__TEST) window.__coz = () => { x = C0 + N * CM; $('tKes').click(); };
    }
  },
};

/* ===================== 10) TABELACI: büyük harf ve yazım ===================== */
// Her tabela: sözcükler; '^' büyük harfle başlamalı (özel ad ya da cümle başı), '+' soru eki bitişik yazılmış (ayrılacak: 'açık|mı')
const TABELA = [
  ['^kedimiz ^pamuk kayboldu.', '^bu bahçede ^karabaş yaşar.', '^ali ile ^zeynep kitap okuyor.', '^tavşanımın adı ^boncuk.', '^mert ve ^ece parkta oynuyor.', '^bugün ^elif okula gelmedi.', '^papağanımız ^limon konuşur.', '^can ile ^deniz kardeştir.'],
  ['^ankara ve ^izmir büyük şehirlerdir.', '^türkiye güzel bir ülkedir.', '^ağrı ^dağı çok yüksektir.', '^van ^gölü çok büyüktür.', '^bu otobüs ^antalya yolunda.', '^kızılırmak uzun bir ırmaktır.', '^tatilde ^bursa ve ^muğla gezildi.', '^karadeniz yeşil bir bölgedir.'],
  ['^pazar +açık|mı?', '^simit +sıcak|mı?', '^bugün ders +var|mı?', '^ankara +uzak|mı?', '^elif +burada|mı?', '^sinema +açık|mı?', '^kapı +kapalı|mı?', '^çay +hazır|mı?']];
YER.tabelaci = {
  id: 'tabelaci', ad: 'Tabelacı', ders: 'Türkçe', beceri: 'Büyük harf ve yazım kuralları', ikon: '🖌️', renk: '#f4a100', harita: { x: 760, y: 240 },
  hikaye: 'Tabelacı Maymun kasabanın tabelalarını boyuyor ama acele edince yazım yanlışları yapmış. Yanlış sözcüğe dokun, fırçayla düzelt.',
  seviyeler: [['Kişi ve hayvan adları', 'Cümle başı ve özel adlar büyük harfle başlar.'], ['Yer adları', 'Şehir, ülke, dağ, göl adları büyük harfle başlar.'], ['Soru eki', 'Soru eki ayrı yazılır.']],
  bina(){ return `${golge(0, 4, 80)}<rect x="-70" y="-100" width="140" height="100" fill="#fff6dc" stroke="#b45309" stroke-width="3"/><path d="M-82 -96 L0 -136 L82 -96 Z" fill="#f4a100"/><rect x="-60" y="-160" width="120" height="44" rx="6" fill="#fff" stroke="#b45309" stroke-width="3"/><path d="M-44 -138 h30 M-6 -138 h24 M26 -138 h20" stroke="${['#e03131', '#3a86ff', '#12b886'][1]}" stroke-width="6" stroke-linecap="round"/><rect x="-16" y="-62" width="32" height="62" fill="#8a5a2b"/><g transform="translate(46 -16)"><rect x="-12" y="-14" width="24" height="28" rx="3" fill="#3a86ff"/><rect x="-12" y="-14" width="24" height="6" fill="#1d4e89"/></g>`; },
  gorev(lvl, k, ctx){
    const P = YER.tabelaci; if (k === 0 || P._lvl !== lvl) { P._l = shuffle(TABELA[lvl]); P._lvl = lvl; }
    const ham = P._l[k % P._l.length], son = ham.match(/[.?!]$/)[0];
    const W = ham.replace(/[.?!]$/, '').split(' ').map(t => ({ b: t.startsWith('^'), a: t.startsWith('+'), w: t.replace(/^[\^+]/, ''), ok: false }));
    const yaz = o => { let w = o.w; if (o.a) w = o.ok ? w.replace('|', ' ') : w.replace('|', ''); if (o.b && o.ok) w = BUYUK(w); return w; };
    let mood = 0;
    function ciz(){ const yazilar = W.map(yaz), px = 44;
      const satir = [[]]; let gen = 0; yazilar.forEach((w, i) => { const e = olc(w, px) + 26 + (i === yazilar.length - 1 ? olc(son, px) : 0); if (gen + e > 640 && satir[satir.length - 1].length) { satir.push([]); gen = 0; } satir[satir.length - 1].push(i); gen += e; });
      const tek = satir.length === 1;
      let s = `<defs><linearGradient id="taGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd7a8"/><stop offset="1" stop-color="#fff3e0"/></linearGradient></defs><rect x="-3000" y="-400" width="7200" height="1600" fill="url(#taGok)"/><circle cx="1080" cy="100" r="46" fill="#ffd23f"/>${bulut(160, 90, .8)}${bulut(560, 60, .6)}<path d="M-20 170 Q300 230 600 190 Q900 150 1220 200" fill="none" stroke="#8a6a4a" stroke-width="2"/>${Array.from({ length: 14 }, (_, i) => { const x = i * 88, y = 170 + Math.sin(i * .9) * 22 + 12; return `<path d="M${x} ${y} l18 34 l18 -34 Z" fill="${['#e03131', '#3a86ff', '#12b886', '#f4a100'][i % 4]}"/>`; }).join('')}
        ${[[0, 300, 180, '#a8d8ea'], [180, 340, 180, '#f6a6a6'], [900, 320, 160, '#c3b1e1'], [1060, 290, 200, '#b5e3b5']].map(([x, y, w, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${760 - y}" fill="${c}" stroke="#8a6a4a" stroke-width="3"/>${[0, 1].map(i => `<rect x="${x + 30 + i * (w - 90)}" y="${y + 60}" width="40" height="60" rx="6" fill="#fffdf6" stroke="#8a6a4a" stroke-width="3"/>`).join('')}`).join('')}
        <rect x="-3000" y="640" width="7200" height="600" fill="#cfc6b8"/><g transform="translate(120 760)">${resimK('maymun', 190)}</g>
        <rect x="240" y="${tek ? 240 : 200}" width="720" height="${tek ? 190 : 270}" rx="18" fill="#5b3c1e"/><rect x="256" y="${tek ? 256 : 216}" width="688" height="${tek ? 158 : 238}" rx="12" fill="#fffdf6"/><rect x="300" y="${tek ? 430 : 470}" width="18" height="${tek ? 210 : 170}" fill="#5b3c1e"/><rect x="882" y="${tek ? 430 : 470}" width="18" height="${tek ? 210 : 170}" fill="#5b3c1e"/>
        <g transform="translate(1020 600)"><path d="M-30 -40 h60 l-6 70 h-48 Z" fill="#3a86ff" stroke="#1d4e89" stroke-width="3"/><ellipse cy="-40" rx="30" ry="8" fill="#e03131"/><rect x="-6" y="-110" width="12" height="70" rx="4" fill="#8a5a2b" transform="rotate(20)"/></g>`;
      satir.forEach((sat, si) => { const gw = sat.reduce((t, i) => t + olc(yazilar[i], px) + 26, 0) - 26 + (si === satir.length - 1 ? olc(son, px) + 4 : 0); let x = 600 - gw / 2; const y = 351 + (si - (satir.length - 1) / 2) * 72;
        sat.forEach(i => { const w = yazilar[i], e = olc(w, px); s += `<g class="soz" data-i="${i}"><rect x="${x - 8}" y="${y - 46}" width="${e + 16}" height="62" rx="10" fill="${W[i].ok ? '#e6faf2' : 'transparent'}"/><text x="${x}" y="${y}" class="ttkb" font-size="${px}" fill="${W[i].ok ? '#0b6b4c' : '#1f2a24'}">${esc(w)}</text></g>`; x += e + 26; });
        if (si === satir.length - 1) s += `<text x="${x - 22}" y="${y}" class="ttkb" font-size="${px}">${son}</text>`; });
      sv.innerHTML = s;
      sv.querySelectorAll('.soz').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const o = W[+g.dataset.i];
        if (o.ok) return;
        if (o.b || o.a) { o.ok = true; tone(700, .08); tone(900, .1, 'sine', .1, .08); ciz(); speak(yaz(o)); if (W.every(z => !(z.b || z.a) || z.ok)) zaman(bitir, 500); return; }
        ctx.yanlis(lvl === 2 ? 'Bu sözcük doğru yazılmış. Soru eki bitişik yazılmış sözcüğü bul.' : `Bu sözcük doğru yazılmış. ${lvl === 0 ? 'Cümlenin ilk sözcüğüne ve kişi, hayvan adlarına bak.' : 'Cümlenin ilk sözcüğüne ve yer adlarına bak.'}`); })); }
    function bitir(){ const t = W.map(yaz).join(' ') + son;
      ctx.dogru('Tabela düzeldi!', `${esc(t)}<small>${lvl === 0 ? 'Cümlenin ilk harfi ve kişi, hayvan adları büyük harfle başlar.' : lvl === 1 ? 'Şehir, ülke, dağ, göl, ırmak adları büyük harfle başlar.' : 'Soru eki mı, mi, mu, mü ayrı yazılır.'}</small>`, 2600); }
    ciz(); void mood;
    setInstr(k === 0 ? (lvl === 2 ? 'Tabelada yazım yanlışları var. Büyük harfle başlaması gereken sözcüğe ve soru eki bitişik yazılmış sözcüğe dokun.' : 'Tabelada büyük harf yanlışları var. Büyük harfle başlaması gereken her sözcüğe dokun.') : 'Tabeladaki yanlışları bul ve dokunarak düzelt.');
    eylem('<button class="cta alt" id="taDinle">Tabelayı oku 🔊</button>');
    $('taDinle').onclick = () => speak(W.map(yaz).join(' ') + son);
    if (window.__TEST) window.__coz = () => { W.forEach(o => { if (o.b || o.a) o.ok = true; }); ciz(); bitir(); };
  },
};

/* ===================== 11) AYNA GÖLÜ: eş ve zıt anlam ===================== */
const ZIT = [['büyük', 'küçük'], ['uzun', 'kısa'], ['sıcak', 'soğuk'], ['açık', 'kapalı'], ['gece', 'gündüz'], ['hızlı', 'yavaş'], ['dolu', 'boş'], ['yaşlı', 'genç'], ['ağır', 'hafif'], ['ıslak', 'kuru'], ['kalın', 'ince'], ['temiz', 'kirli'], ['eski', 'yeni'], ['siyah', 'beyaz'], ['erken', 'geç'], ['güldü', 'ağladı'], ['geldi', 'gitti'], ['tatlı', 'acı'], ['zor', 'kolay'], ['aşağı', 'yukarı']];
const ES = [['siyah', 'kara'], ['kırmızı', 'al'], ['beyaz', 'ak'], ['cevap', 'yanıt'], ['okul', 'mektep'], ['hediye', 'armağan'], ['yaşlı', 'ihtiyar'], ['sınav', 'imtihan'], ['kelime', 'sözcük'], ['misafir', 'konuk'], ['ırmak', 'nehir'], ['doğa', 'tabiat'], ['yıl', 'sene'], ['ad', 'isim'], ['doktor', 'hekim'], ['hızlı', 'çabuk']];
const CUMLE = [['Kaplumbağa yavaş yürür.', 'yavaş', 'hızlı', 'z'], ['Bardak su dolu.', 'dolu', 'boş', 'z'], ['Bugün hava sıcak.', 'sıcak', 'soğuk', 'z'], ['Dedemin evi eski.', 'eski', 'yeni', 'z'], ['Bu çanta çok ağır.', 'ağır', 'hafif', 'z'], ['Zürafanın boynu uzun.', 'uzun', 'kısa', 'z'], ['Kara bulutlar geldi.', 'Kara', 'Siyah', 'e'], ['Ak bir güvercin uçtu.', 'Ak', 'Beyaz', 'e'], ['Bu sene okula başladım.', 'sene', 'yıl', 'e'], ['Annem bana armağan aldı.', 'armağan', 'hediye', 'e'], ['Dedem artık ihtiyar.', 'ihtiyar', 'yaşlı', 'e'], ['Yarın sınav var.', 'sınav', 'imtihan', 'e']];
const nilufer = (w, px) => { const e = Math.max(150, olc(w, px) + 50); return `<ellipse rx="${e / 2}" ry="40" fill="#3f9f5f" stroke="#2b7a46" stroke-width="3"/><path d="M0 0 L${e / 2 - 8} -16 L${e / 2 - 4} 8 Z" fill="#7cc4e8"/><ellipse rx="${e / 2 - 12}" ry="28" fill="#5cb87a"/><text y="${px * .36}" text-anchor="middle" class="ttkb" font-size="${px}" fill="#fff" stroke="#1f5a34" stroke-width="5" paint-order="stroke">${esc(w)}</text>`; };
YER.ayna = {
  id: 'ayna', ad: 'Ayna Gölü', ders: 'Türkçe', beceri: 'Eş anlamlı ve zıt anlamlı sözcükler', ikon: '🦆', renk: '#0ea5e9', harita: { x: 470, y: 215 },
  hikaye: 'Ayna Gölü sihirlidir: kıyıdaki sözcüğün zıttını, bazen de ikizini gösterir. Ördek Pıtırcık nilüferlerdeki sözcükleri aynaya taşımanı bekliyor.',
  seviyeler: [['Zıt anlam', 'Sözcüğün zıt anlamlısını aynaya taşı.'], ['Eş anlam', 'Aynı anlama gelen ikiz sözcüğü bul.'], ['Cümlede anlam', 'Altı çizili sözcüğün yerine eş ya da zıt anlamlısını koy.']],
  bina(){ return `${golge(0, 6, 100)}<ellipse cy="-26" rx="96" ry="34" fill="#7cc4e8" stroke="#3a86ff" stroke-width="3"/><ellipse cx="-20" cy="-30" rx="40" ry="10" fill="#fff" opacity=".5"/><ellipse cx="44" cy="-20" rx="18" ry="7" fill="#3f9f5f"/>${[-90, -80, 80, 88].map((x, i) => `<path d="M${x} -20 q${i % 2 ? 4 : -4} -40 ${i % 2 ? 2 : -2} -60" stroke="#2e8b57" stroke-width="4" fill="none"/><ellipse cx="${x + (i % 2 ? 2 : -2)}" cy="-80" rx="5" ry="12" fill="#8a5a2b"/>`).join('')}<g transform="translate(-30 -34) scale(.28)"><image href="${R('ordek')}" x="-60" y="-110" width="120" height="120"/></g>`; },
  gorev(lvl, k, ctx){
    let soz, dogru, celdirici, cumle = null;
    if (lvl === 0) { const p = pick(ZIT), ters = Math.random() < .5; soz = ters ? p[1] : p[0]; dogru = ters ? p[0] : p[1]; celdirici = shuffle(ZIT.filter(q => q !== p).map(q => q[Math.random() < .5 ? 0 : 1])).slice(0, k < 3 ? 2 : 3); }
    else if (lvl === 1) { const p = pick(ES), ters = Math.random() < .5; soz = ters ? p[1] : p[0]; dogru = ters ? p[0] : p[1]; const z = ZIT.find(q => q.includes(soz)); celdirici = shuffle(ES.filter(q => q !== p).map(q => q[rint(0, 1)])).slice(0, k < 3 ? 2 : 3); if (z && k >= 2) celdirici[0] = z[0] === soz ? z[1] : z[0]; }
    else { const c = CUMLE.filter(x => x[3] === (k % 2 ? 'e' : 'z')); cumle = pick(c); soz = cumle[1]; dogru = cumle[2]; const kok = dogru.toLocaleLowerCase('tr'), bas = dogru !== kok;
      const es = ES.find(q => q.includes(soz.toLocaleLowerCase('tr'))), zt = ZIT.find(q => q.includes(soz.toLocaleLowerCase('tr')));
      const esD = (ES.find(q => q.includes(kok)) || []); celdirici = shuffle((cumle[3] === 'z' ? ES : ZIT).flat().filter(w => w !== kok && w !== soz.toLocaleLowerCase('tr') && !esD.includes(w))).slice(0, 2).map(w => bas ? BUYUK(w) : w);
      if (cumle[3] === 'z' && es) celdirici[0] = bas ? BUYUK(es.find(w => w !== soz)) : es.find(w => w !== soz);
      if (cumle[3] === 'e' && zt) celdirici[0] = bas ? BUYUK(zt.find(w => w !== soz.toLocaleLowerCase('tr'))) : zt.find(w => w !== soz.toLocaleLowerCase('tr')); }
    const ne = lvl === 0 || (cumle && cumle[3] === 'z') ? 'zıt' : 'eş';
    const secenek = shuffle([dogru, ...celdirici.filter(w => w !== dogru && w !== soz)]).slice(0, Math.min(4, 1 + celdirici.length));
    if (!secenek.includes(dogru)) secenek[0] = dogru;
    const yerler = secenek.map((_, i) => [180 + i * (840 / Math.max(1, secenek.length - 1)) * (secenek.length > 1 ? 1 : 0), 650 - (i % 2) * 30]);
    let bitti = false;
    function ciz(){
      let s = `<defs><linearGradient id="aGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3b3"/><stop offset="1" stop-color="#fff7e6"/></linearGradient><linearGradient id="aSu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ab4e5"/><stop offset="1" stop-color="#1c6fa8"/></linearGradient></defs>
        <rect x="-3000" y="-400" width="7200" height="1600" fill="url(#aGok)"/><circle cx="1000" cy="90" r="50" fill="#ffd23f"/>
        <path d="M-3000 330 Q-200 180 200 240 Q600 140 1000 230 Q1300 180 4200 300 L4200 400 L-3000 400 Z" fill="#7cc46a"/>${[[90, 300, .7], [220, 290, .6], [980, 300, .65], [1120, 300, .7]].map(([x, y, sc]) => agac(x, y, sc)).join('')}
        <rect x="-3000" y="330" width="7200" height="1000" fill="url(#aSu)"/>${[[90, 330, .7], [220, 330, .6], [980, 330, .65], [1120, 330, .7]].map(([x, y, sc]) => `<g opacity=".25" transform="translate(${x} ${y}) scale(1 -1) translate(${-x} ${-y})">${agac(x, y, sc)}</g>`).join('')}
        ${Array.from({ length: 14 }, (_, i) => `<path d="M${(i * 173) % 1300 - 60} ${380 + (i * 61) % 360} q20 -8 40 0 t40 0" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none">${RM ? '' : `<animateTransform attributeName="transform" type="translate" values="0 0;14 0;0 0" dur="${4 + i % 4}s" repeatCount="indefinite"/>`}</path>`).join('')}
        <g transform="translate(1110 330)">${resimK('ordek', 150)}</g>`;
      if (cumle) { const [c, w] = cumle, i = c.indexOf(w), on = c.slice(0, i), ar = c.slice(i + w.length), ww = bitti ? dogru : w, px = 40, x0 = 600 - (olc(on, px) + olc(ww, px) + olc(ar, px)) / 2;
        s += `<g><rect x="${x0 - 30}" y="120" width="${olc(on, px) + olc(ww, px) + olc(ar, px) + 60}" height="90" rx="16" fill="#fffdf6" stroke="#8a5a2b" stroke-width="4"/><text x="${x0}" y="180" class="ttkb" font-size="${px}" xml:space="preserve">${esc(on)}<tspan fill="${bitti ? '#0b6b4c' : '#c0392b'}" text-decoration="underline">${esc(ww)}</tspan>${esc(ar)}</text></g>`;
        s += `<g transform="translate(600 300)"><text text-anchor="middle" class="ttkb" font-size="26" fill="#1f2a24">${esc(soz)} sözcüğünün ${ne} anlamlısı</text></g>`; }
      else s += `<g transform="translate(600 240)"><rect x="${-olc(soz, 50) / 2 - 40}" y="-50" width="${olc(soz, 50) + 80}" height="90" rx="18" fill="#fffdf6" stroke="#8a5a2b" stroke-width="5"/><text y="18" text-anchor="middle" class="ttkb" font-size="50">${esc(soz)}</text></g>`;
      // ayna: hedef yer
      s += `<g transform="translate(600 440)"><ellipse rx="190" ry="64" fill="#fff" opacity="${bitti ? .55 : .18}" stroke="#fff" stroke-width="4" stroke-dasharray="${bitti ? '0' : '12 10'}"/>${bitti ? `<text y="16" text-anchor="middle" class="ttkb" font-size="48" fill="#1d4e89">${esc(dogru)}</text>` : `<text y="10" text-anchor="middle" class="ttkb" font-size="24" fill="#fff">${ne === 'zıt' ? 'zıt anlamlısı' : 'eş anlamlısı'}</text>`}</g>`;
      if (!bitti) s += secenek.map((w, i) => `<g class="nil" data-w="${esc(w)}" transform="translate(${yerler[i][0]} ${yerler[i][1]})">${nilufer(w, 34)}</g>`).join('');
      sv.innerHTML = s;
      sv.querySelectorAll('.nil').forEach((g, i) => { konum(g, yerler[i][0], yerler[i][1]);
        surukle(g, { dokun: () => dene(g), birak: (x, y) => { if (icinde(x, y, [380, 350, 820, 530])) { dene(g); return g.dataset.w === dogru; } return false; } }); });
    }
    function dene(g){ if (KILIT) return; const w = g.dataset.w;
      if (w === dogru) { bitti = true; ciz(); yildizPatla(600, 440); ctx.dogru(cumle ? `Evet! ${esc(soz)} yerine ${dogru}.` : `Evet! ${soz} ile ${dogru} ${ne} anlamlı.`, `${esc(soz)} ↔ <b>${esc(dogru)}</b><small>${ne === 'zıt' ? 'Zıt anlamlı sözcükler karşıt anlam taşır.' : 'Eş anlamlı sözcükler aynı anlamı taşır.'}</small>`); }
      else { salla(g); ctx.yanlis(ne === 'zıt' ? `${w} sözcüğü ${soz} sözcüğünün zıttı değil. Karşıt anlamlı olanı bul.` : `${w} sözcüğü ${soz} ile aynı anlamda değil. Aynı anlama geleni bul.`); } }
    ciz();
    setInstr(cumle ? `Altı çizili sözcüğün ${ne} anlamlısını bul. Nilüferi aynaya taşı ya da ona dokun.` : lvl === 0 ? (k === 0 ? `Ayna Gölü kıyıdaki sözcüğün zıttını gösterir. ${soz} sözcüğünün zıt anlamlısı hangi nilüferde? Nilüferi aynaya taşı.` : `${soz} sözcüğünün zıt anlamlısını bul.`) : (k === 0 ? `Bu kez göl ikiz sözcük arıyor. ${soz} sözcüğüyle aynı anlama gelen sözcük hangisi?` : `${soz} sözcüğünün eş anlamlısını bul.`));
    if (window.__TEST) window.__coz = () => dene(sv.querySelector(`.nil[data-w="${dogru}"]`));
  },
};
