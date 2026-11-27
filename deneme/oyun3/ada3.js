// Kâşif Adası — Fen ve Türkçe yerleri: Maden Ocağı (maden, fosil), Rüzgâr Değirmeni (hareket, kuvvet), Kitap Koyu (noktalama, yazım)
"use strict";
const kartSec = (secenekler, iyi, kotu) => sv.querySelectorAll('.kartS').forEach(g => g.addEventListener('click', () => { if (KILIT) return; const o = secenekler[+g.dataset.i]; if (o.ok) iyi(o); else { salla(g); kotu(o); } }));
const kartCiz = (l, y = 470, w = 460, h = 200, px = 30) => l.map((o, i) => { const x = l.length === 2 ? 330 + i * 500 : 220 + i * 380;
  return `<g class="kartS" data-i="${i}" transform="translate(${x} ${y})" style="cursor:pointer"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="22" fill="#fff" stroke="${o.renk || '#1d4e89'}" stroke-width="4"/>${o.svg || ''}<text y="${o.svg ? h / 2 - 22 : px * .35}" text-anchor="middle" class="ttkb" font-size="${sigdir(o.t, px, w - 30)}">${esc(o.t)}</text></g>`; }).join('');

/* ===================== 7) MADEN OCAĞI: madenler ve fosiller ===================== */
const MADEN_U = [['tel', 'elektrik kablosu', 'Bakır', 'Bakır elektriği iyi iletir; kablolarda kullanılır.'], ['nal', 'at nalı', 'Demir', 'Demir sağlam ve dayanıklıdır.'], ['kalem', 'kurşun kalemin ucu', 'Grafit', 'Grafit kâğıtta iz bırakır.'],
  ['kopru', 'çelik köprü', 'Demir', 'Çelik demirden elde edilir; köprülerde kullanılır.'], ['komur', 'sobada yakılan yakıt', 'Kömür', 'Kömür yakıt olarak kullanılır.'], ['ucak', 'uçağın hafif gövdesi', 'Alüminyum', 'Alüminyum hafif ve sağlamdır.'], ['kasik', 'paslanmaz çelik kaşık', 'Demir', 'Çelik demirden elde edilir.']];
const MADENLER = ['Bakır', 'Demir', 'Grafit', 'Kömür', 'Alüminyum'];
const tas = (ic) => `<path d="M-150 30 Q-160 -70 -60 -90 Q40 -120 120 -70 Q170 -30 150 40 Q120 100 0 100 Q-130 105 -150 30 Z" fill="#adb5bd" stroke="#495057" stroke-width="5"/>${ic}`;
const FOSIL = [['Taşın içinde bir yaprağın izi var.', true, '<path d="M-60 30 Q0 -70 60 30 Q0 50 -60 30 Z M-60 30 L60 30" fill="#868e96" stroke="#343a40" stroke-width="4"/>', 'Yaprak çamura gömülüp milyonlarca yılda taşlaşmış.'],
  ['Kayanın içinde taşlaşmış bir deniz kabuğu var.', true, '<path d="M-50 40 Q0 -60 50 40 Z" fill="#868e96" stroke="#343a40" stroke-width="4"/>' + [-30, -10, 10, 30].map(x => `<line x1="0" y1="-30" x2="${x}" y2="40" stroke="#343a40" stroke-width="3"/>`).join(''), 'Deniz kabuğu kayaya gömülüp taşlaşmış.'],
  ['Taşta dinozor ayak izi var.', true, '<path d="M0 40 L-40 -30 M0 40 L0 -50 M0 40 L40 -30" stroke="#495057" stroke-width="14" stroke-linecap="round"/>', 'İz çamurdayken kurumuş, üstü örtülmüş ve taşlaşmış.'],
  ['Kumsalda bugün bulunan bir deniz kabuğu.', false, '', 'Kabuk yeni; gömülüp taşlaşmamış.'], ['Taşın üstüne sonradan çizilmiş bir balık resmi.', false, '<path d="M-50 10 Q0 -40 50 10 Q0 60 -50 10 Z M50 10 L80 -15 L80 35 Z" fill="none" stroke="#c92a2a" stroke-width="5"/>', 'Bu bir canlının kalıntısı değil, sonradan yapılmış bir çizim.'],
  ['Dün çamura basan kedinin pati izi.', false, '<circle r="18" fill="#6b4423"/>' + [[-26, -30], [0, -40], [26, -30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#6b4423"/>`).join(''), 'İz yeni; taşlaşması için çok uzun yıllar gerekir.']];
const madenArka = () => `<rect x="-3000" y="-400" width="7200" height="780" fill="#6b4a2c"/><rect x="-3000" y="380" width="7200" height="900" fill="#8a6a45"/><image href="oyun3/s/maden.webp" x="-240" y="0" width="1680" height="760" preserveAspectRatio="xMidYMid slice"/><g transform="translate(1120 540)">${resO('madenci-kopek', 190)}</g>`;
YER.maden = {
  id: 'maden', ad: 'Maden Ocağı', ders: 'Fen Bilimleri', beceri: 'Madenler, kayaçlar ve fosiller', ikon: '⛏️', renk: '#7a5a2a', harita: { x: 400, y: 284 },
  hikaye: 'Madenci Karabaş dağın içinde madenleri ve fosilleri arıyor. Ürünlerin hangi madenden yapıldığını bul, fosilleri tanı, katmanları oku.',
  seviyeler: [['Hangi maden?', 'Ürünü yapıldığı madenle eşleştir.'], ['Fosil mi?', 'Fosil olanı ayırt et.'], ['Katmanları oku', 'Hangi fosil daha eski?']],
  bina(){ return `${golge(0, 4, 70)}<path d="M-70 0 Q-70 -110 0 -110 Q70 -110 70 0 Z" fill="#495057"/><path d="M-40 0 Q-40 -66 0 -66 Q40 -66 40 0 Z" fill="#1f1a17"/><path d="M-46 0 L-46 -70 L46 -70 L46 0" fill="none" stroke="#a0522d" stroke-width="8"/><rect x="40" y="-24" width="44" height="22" rx="4" fill="#868e96"/><circle cx="50" cy="0" r="6" fill="#343a40"/><circle cx="76" cy="0" r="6" fill="#343a40"/>`; },
  gorev(lvl, k, ctx){
    if (lvl === 0) {
      const [res, urun, mad, ac] = (AKTIF.m1 || (AKTIF.m1 = shuffle(MADEN_U).slice(0, N_GOREV)))[k];
      sv.innerHTML = madenArka() + `<g transform="translate(560 300)"><circle r="150" fill="#fff8e1" stroke="#f4a100" stroke-width="6"/>${resA(res, 200, 0, -16)}<g transform="translate(0 190)"><rect x="${-olc(urun, 34) / 2 - 20}" y="-32" width="${olc(urun, 34) + 40}" height="52" rx="12" fill="#fff" stroke="#7a5a2a" stroke-width="3"/><text y="5" text-anchor="middle" class="ttkb" font-size="34">${esc(urun)}</text></g></g>`;
      setInstr(k === 0 ? `Bu ürün hangi madenden yapılır? ${BUYUK(urun)}.` : `${BUYUK(urun)} hangi madenden yapılır?`);
      secT([{ t: mad, ok: true }, ...shuffle(MADENLER.filter(m => m !== mad)).slice(0, 2).map(t => ({ t }))], () => ctx.dogru(`Evet! ${mad}.`, `<b>${esc(mad)}</b><small>${esc(ac)}</small>`, 2600, 'sag'), () => ctx.yanlis('Ürünün özelliğini düşün: elektrik mi iletiyor, sağlam mı, iz mi bırakıyor, yanıyor mu?'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === mad).click();
    } else if (lvl === 1) {
      const [ad, fos, ic, ac] = (AKTIF.m2 || (AKTIF.m2 = shuffle([...shuffle(FOSIL.filter(f => f[1])).slice(0, 3), ...shuffle(FOSIL.filter(f => !f[1])).slice(0, 3)])))[k];
      const gor = ad.startsWith('Kumsalda') ? `<path d="M-120 60 L120 60" stroke="#e9c46a" stroke-width="40"/><g transform="translate(0 -10)"><path d="M-60 40 Q0 -70 60 40 Z" fill="#ffd8a8" stroke="#c2763a" stroke-width="4"/></g>` : tas(ic);
      sv.innerHTML = madenArka() + `<g transform="translate(560 300) scale(1.4)">${gor}</g>` + serit(ad, null, 560);
      setInstr(k === 0 ? `${ad} Bu bir fosil mi? Fosil, çok uzun zaman önce yaşamış canlıların taşlaşmış kalıntısı ya da izidir.` : `${ad} Fosil mi?`);
      secT([{ t: 'Fosil', ok: fos }, { t: 'Fosil değil', ok: !fos }], () => ctx.dogru(fos ? 'Evet, bu bir fosil.' : 'Evet, bu bir fosil değil.', `<b>${fos ? 'Fosil' : 'Fosil değil'}</b><small>${esc(ac)}</small>`, 2800, 'sag'),
        () => ctx.yanlis(fos ? 'Bu iz çok eski bir canlıdan kalmış ve taşlaşmış.' : 'Fosil olması için canlı kalıntısının çok uzun yıllar içinde taşlaşması gerekir.'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === (fos ? 'Fosil' : 'Fosil değil')).click();
    } else {
      const F = [['balık', '<path d="M-40 0 Q0 -26 40 0 Q0 26 -40 0 Z M40 0 L62 -18 L62 18 Z" fill="#ced4da" stroke="#343a40" stroke-width="3"/>'], ['yaprak', '<path d="M-40 10 Q0 -50 40 10 Q0 30 -40 10 Z M-40 10 L40 10" fill="#ced4da" stroke="#343a40" stroke-width="3"/>'], ['deniz kabuğu', '<path d="M-30 20 Q0 -40 30 20 Z" fill="#ced4da" stroke="#343a40" stroke-width="3"/>'], ['ayak izi', '<path d="M0 20 L-24 -20 M0 20 L0 -28 M0 20 L24 -20" stroke="#343a40" stroke-width="8" stroke-linecap="round"/>']];
      const sira = shuffle(F).slice(0, 3), eski = k % 2 === 0, renk = ['#d9a066', '#b5835a', '#8d6748'];
      sv.innerHTML = madenArka() + sira.map(([ad, ic], i) => `<g class="kat" data-i="${i}" transform="translate(520 ${210 + i * 140})" style="cursor:pointer"><rect x="-360" y="-66" width="720" height="132" fill="${renk[i]}" stroke="#3b2f2a" stroke-width="3"/><g transform="translate(${-200 + i * 160} 0) scale(1.3)">${ic}</g><text x="330" y="12" text-anchor="end" class="ttkb" font-size="28" fill="#fff">${esc(ad)}</text></g>`).join('');
      setInstr(k === 0 ? `Toprak katmanları üst üste birikir; alttaki katman önce oluşur. Hangi fosil ${eski ? 'en eskidir' : 'en yenidir'}? O katmana dokun.` : `Hangi fosil ${eski ? 'en eskidir' : 'en yenidir'}?`);
      const dog = eski ? 2 : 0;
      sv.querySelectorAll('.kat').forEach(g => g.addEventListener('click', () => { if (KILIT) return; if (+g.dataset.i === dog) ctx.dogru(`Evet! ${BUYUK(sira[dog][0])} fosili ${eski ? 'en eski' : 'en yeni'}.`, `<b>${esc(sira[dog][0])}</b><small>${eski ? 'En alttaki katman en önce oluşmuştur.' : 'En üstteki katman en son oluşmuştur.'}</small>`, 2600, 'sag'); else { salla(g); ctx.yanlis('Katmanlar alttan üste doğru birikir. Hangisi önce oluştu?'); } }));
      if (window.__TEST) window.__coz = () => sv.querySelector(`.kat[data-i="${dog}"]`).dispatchEvent(new Event('click'));
    }
  },
};

/* ===================== 8) RÜZGÂR DEĞİRMENİ: hareket türleri, itme-çekme, kuvvetin etkileri ===================== */
const CIZIM = {
  salincak: '<path d="M-80 70 L-60 -80 L60 -80 L80 70" fill="none" stroke="#7a4a26" stroke-width="10"/><g transform="rotate(14 0 -80)"><line x1="-24" y1="-80" x2="-24" y2="40" stroke="#495057" stroke-width="4"/><line x1="24" y1="-80" x2="24" y2="40" stroke="#495057" stroke-width="4"/><rect x="-36" y="36" width="72" height="12" rx="4" fill="#e03131"/></g><path d="M-70 60 Q0 90 70 60" fill="none" stroke="#1d4e89" stroke-width="4" stroke-dasharray="8 6"/>',
  sarkac: '<rect x="-50" y="-100" width="100" height="190" rx="14" fill="#a0522d"/><circle cy="-50" r="34" fill="#fff"/><g transform="rotate(16 0 -10)"><line x1="0" y1="-10" x2="0" y2="60" stroke="#ffd43b" stroke-width="4"/><circle cy="64" r="12" fill="#ffd43b"/></g><path d="M-30 70 Q0 86 30 70" fill="none" stroke="#1d4e89" stroke-width="4" stroke-dasharray="6 5"/>',
  pervane: '<rect x="-10" y="0" width="20" height="90" fill="#adb5bd"/>' + [0, 90, 180, 270].map(a => `<path transform="rotate(${a})" d="M0 0 L-14 -86 L14 -86 Z" fill="#fff" stroke="#495057" stroke-width="3"/>`).join('') + '<circle r="10" fill="#495057"/><path d="M60 -60 A84 84 0 0 1 60 60" fill="none" stroke="#1d4e89" stroke-width="5"/><path d="M60 60 l-16 2 l8 -14 Z" fill="#1d4e89"/>',
  dolap: '<circle r="90" fill="none" stroke="#7048e8" stroke-width="6"/>' + Array.from({ length: 8 }, (_, i) => { const a = i * 45 * Math.PI / 180; return `<line x1="0" y1="0" x2="${(Math.cos(a) * 90).toFixed(0)}" y2="${(Math.sin(a) * 90).toFixed(0)}" stroke="#7048e8" stroke-width="3"/><rect x="${(Math.cos(a) * 90 - 12).toFixed(0)}" y="${(Math.sin(a) * 90 - 6).toFixed(0)}" width="24" height="20" rx="4" fill="${['#e03131', '#f4a100', '#12b886', '#3a86ff'][i % 4]}"/>`; }).join('') + '<path d="M-60 110 L0 0 L60 110" fill="none" stroke="#495057" stroke-width="6"/>',
  testere: '<rect x="-90" y="10" width="180" height="40" fill="#c98d55"/><path d="M-70 -10 L50 -10 L50 6 L-70 6 Z" fill="#adb5bd"/><path d="M-70 6 ' + Array.from({ length: 12 }, (_, i) => `l5 8 l5 -8`).join(' ') + '" fill="#adb5bd" stroke="#495057"/><rect x="50" y="-22" width="40" height="32" rx="8" fill="#e03131"/><path d="M-100 -40 L100 -40 M-100 -40 l14 -8 M-100 -40 l14 8 M100 -40 l-14 -8 M100 -40 l-14 8" stroke="#1d4e89" stroke-width="4"/>',
  araba: `${resA('araba', 170, 0, -10)}<path d="M-110 70 L110 70 M110 70 l-16 -9 M110 70 l-16 9" stroke="#1d4e89" stroke-width="5"/>`,
};
// Görseli olanlar el boyaması nesne + hareket oku ile çizilir (oyun3/r)
const OK_YAY = '<path d="M-60 72 Q0 98 60 72" fill="none" stroke="#1d4e89" stroke-width="5" stroke-dasharray="8 6"/><path d="M60 72 l-14 -2 l7 12 Z" fill="#1d4e89"/>';
const CIZIM_R = { salincak: () => resO('salincak', 160, 0, -10) + OK_YAY, sarkac: () => resO('sarkacli-saat', 160, 0, -10) + '<path d="M-28 50 Q0 64 28 50" fill="none" stroke="#1d4e89" stroke-width="5" stroke-dasharray="6 5"/>',
  dolap: () => resO('donme-dolap', 170, 0, -10) + '<path d="M78 -60 A96 96 0 0 1 78 40" fill="none" stroke="#1d4e89" stroke-width="5"/><path d="M78 40 l-14 2 l8 -13 Z" fill="#1d4e89"/>',
  testere: () => resO('testere', 170, 0, 0) + '<path d="M-90 -70 L90 -70 M-90 -70 l14 -8 M-90 -70 l14 8 M90 -70 l-14 -8 M90 -70 l-14 8" stroke="#1d4e89" stroke-width="5"/>' };
const HAREKET = [['salıncak', 'Sallanma', 'salincak'], ['duvar saatinin sarkacı', 'Sallanma', 'sarkac'], ['değirmenin kanatları', 'Dönme', 'pervane'], ['dönme dolap', 'Dönme', 'dolap'], ['testereyle tahta kesmek', 'İleri-geri', 'testere'], ['düz yolda giden araba', 'Düz (doğrusal)', 'araba']];
const ITCEK = [['El arabasını önümüzde sürmek', 'İtme'], ['Kovayı kuyudan ip ile yukarı almak', 'Çekme'], ['Çekmeceyi açmak', 'Çekme'], ['Topa ayakla vurmak', 'İtme'], ['İp çekme oyununda ipi kendine doğru almak', 'Çekme'], ['Zile parmakla basmak', 'İtme'], ['Kapıyı kendimize doğru açmak', 'Çekme'], ['Bebek arabasını önümüzde götürmek', 'İtme']];
const ETKI = [['Elif hamuru avucunda sıktı; hamurun biçimi değişti.', 'Şekil değiştirme'], ['Kaleci kaleye gelen topu tuttu.', 'Durdurma'], ['Kaan kendisine gelen topa vurup başka yöne gönderdi.', 'Yön değiştirme'], ['Mert duran oyuncak arabayı itti; araba gitmeye başladı.', 'Hareket ettirme'],
  ['Ece balonu iki eliyle sıkınca balon yassılaştı.', 'Şekil değiştirme'], ['Ömer yuvarlanan topu ayağıyla durdurdu.', 'Durdurma'], ['Ada yerde duran topa vurdu; top yuvarlanmaya başladı.', 'Hareket ettirme'], ['Duru bisikletin gidonunu çevirdi; bisiklet sola döndü.', 'Yön değiştirme']];
const degArka = () => `<rect x="-3000" y="-400" width="7200" height="780" fill="#cfe4f2"/><rect x="-3000" y="380" width="7200" height="900" fill="#7fb24f"/><image href="oyun3/s/degirmen.webp" x="-240" y="0" width="1680" height="760" preserveAspectRatio="xMidYMid slice"/>`;
YER.degirmen = {
  id: 'degirmen', ad: 'Rüzgâr Değirmeni', ders: 'Fen Bilimleri', beceri: 'Hareket türleri, itme-çekme, kuvvetin etkileri', ikon: '🌬️', renk: '#1098ad', harita: { x: 228, y: 392 },
  hikaye: 'Değirmenci Zürafa çevresindeki hareketleri inceliyor. Varlıkların nasıl hareket ettiğini, itme mi çekme mi olduğunu ve kuvvetin neyi değiştirdiğini bul.',
  seviyeler: [['Nasıl hareket ediyor?', 'Dönme, sallanma, ileri-geri, düz.'], ['İt mi, çek mi?', 'Kuvvet itme mi, çekme mi?'], ['Kuvvet ne yaptı?', 'Kuvvetin etkisini bul.']],
  bina(){ return `${golge(0, 4, 50)}<path d="M-34 0 L-24 -110 L24 -110 L34 0 Z" fill="#f8f9fa" stroke="#1098ad" stroke-width="3"/><rect x="-10" y="-30" width="20" height="30" fill="#1098ad"/><g transform="translate(0 -110)">${[0, 90, 180, 270].map(a => `<path transform="rotate(${a + 20})" d="M0 0 L-10 -62 L10 -62 Z" fill="#fff" stroke="#1098ad" stroke-width="2.5"/>`).join('')}<circle r="7" fill="#1098ad"/></g>`; },
  gorev(lvl, k, ctx){
    const zur = `<g transform="translate(110 600)">${resO('degirmenci-zurafa', 240, 0, -110)}</g>`;
    if (lvl === 0) {
      const [ad, tur, c] = (AKTIF.d1 || (AKTIF.d1 = shuffle(HAREKET)))[k];
      sv.innerHTML = degArka() + zur + `<g transform="translate(580 300) scale(1.4)">${CIZIM_R[c] ? CIZIM_R[c]() : CIZIM[c]}</g>` + `<g transform="translate(580 530)"><rect x="${-olc(ad, 34) / 2 - 20}" y="-32" width="${olc(ad, 34) + 40}" height="52" rx="12" fill="#fff" stroke="#1098ad" stroke-width="3"/><text y="5" text-anchor="middle" class="ttkb" font-size="34">${esc(ad)}</text></g>`;
      setInstr(k === 0 ? `Mavi oklar hareketi gösteriyor. ${BUYUK(ad)} nasıl hareket ediyor?` : `${BUYUK(ad)} nasıl hareket ediyor?`);
      secT(['Dönme', 'Sallanma', 'İleri-geri', 'Düz (doğrusal)'].map(t => ({ t, ok: t === tur })), () => ctx.dogru(`Evet! ${tur}.`, `<b>${esc(tur)}</b><small>${{ Dönme: 'Bir merkezin çevresinde döner.', Sallanma: 'Bir noktaya asılıdır, bir o yana bir bu yana gider.', 'İleri-geri': 'Aynı yol üzerinde bir ileri bir geri gider.', 'Düz (doğrusal)': 'Düz bir yol boyunca ilerler.' }[tur]}</small>`, 2600, 'sag'),
        () => ctx.yanlis('Oklara bak. Bir merkezin çevresinde mi dönüyor, iki yana mı sallanıyor, ileri geri mi gidiyor, yoksa düz mü ilerliyor?'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === tur).click();
    } else if (lvl === 1) {
      const [ad, tur] = (AKTIF.d2 || (AKTIF.d2 = shuffle(ITCEK)))[k];
      sv.innerHTML = degArka() + zur + serit(ad, null, 260) + `<g transform="translate(600 470)"><path d="M-200 0 L-40 0" stroke="#e03131" stroke-width="16"/><path d="M-40 -30 L10 0 L-40 30 Z" fill="#e03131"/><text x="-120" y="70" text-anchor="middle" class="ttkb" font-size="30">itme</text><path d="M200 0 L60 0" stroke="#1971c2" stroke-width="16"/><path d="M60 -30 L10 0 L60 30 Z" fill="#1971c2" transform="translate(0 0)"/><text x="130" y="70" text-anchor="middle" class="ttkb" font-size="30">çekme</text></g>`;
      setInstr(k === 0 ? `${ad}. Bu bir itme mi, çekme mi? Kuvvet cismi bizden uzaklaştırıyorsa itme, bize doğru getiriyorsa çekmedir.` : `${ad}. İtme mi, çekme mi?`);
      secT([{ t: 'İtme', ok: tur === 'İtme' }, { t: 'Çekme', ok: tur === 'Çekme' }], () => ctx.dogru(`Evet! ${tur}.`, `<b>${tur}</b><small>${tur === 'İtme' ? 'Cismi bizden uzaklaştırdık.' : 'Cismi kendimize doğru getirdik.'}</small>`, 2400, 'sag'), () => ctx.yanlis('Cisim senden uzaklaşıyor mu, sana doğru mu geliyor?'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === tur).click();
    } else {
      const [ad, tur] = (AKTIF.d3 || (AKTIF.d3 = shuffle(ETKI)))[k];
      sv.innerHTML = degArka() + zur + serit(ad, null, 300);
      setInstr(k === 0 ? `${ad} Kuvvet bu olayda ne yaptı?` : `${ad} Kuvvetin etkisi ne?`);
      secT(['Hareket ettirme', 'Durdurma', 'Yön değiştirme', 'Şekil değiştirme'].map(t => ({ t, ok: t === tur })), () => ctx.dogru(`Evet! ${tur}.`, `<b>${esc(tur)}</b><small>Kuvvet cisimleri hareket ettirir, durdurur, yönünü ya da şeklini değiştirir.</small>`, 2600, 'sag'),
        () => ctx.yanlis('Olaydan önce ve sonra cisme bak. Ne değişti: hareketi mi, yönü mü, şekli mi?'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent === tur).click();
    }
  },
};

/* ===================== 9) KİTAP KOYU: noktalama ve yazım ===================== */
const SON = [['Kitabını getirdin mi', '?'], ['Bugün hava çok güzel', '.'], ['Eyvah, süt taştı', '!'], ['Okul saat kaçta başlıyor', '?'], ['Annem bize kek yaptı', '.'], ['Ne güzel bir gün', '!'], ['Hangi kitabı okudun', '?'], ['Kütüphaneye gidiyoruz', '.'], ['Dikkat et, yer kaygan', '!']];
const ISARET = { '.': 'Nokta', '?': 'Soru işareti', '!': 'Ünlem işareti' };
const ARA = [['Elma', ' armut ve muz aldık.', 'v'], ['Ankara', 'ya gittik.', 'k'], ['Ali', 'nin kalemi kırıldı.', 'k'], ['Defter', ' kalem ve silgi getirdim.', 'v'], ['Evet', ' bu benim çantam.', 'v'], ['Türkiye', 'de yaşıyoruz.', 'k'], ['Kırmızı', ' sarı ve mavi boyaları seçtim.', 'v'], ['Ayşe', 'yle parka gittik.', 'k'], ['Hayır', ' bugün gelemem.', 'v'], ['İzmir', 'den bir mektup geldi.', 'k']];
const YAZIM = [['Ben de seninle geleceğim.', 'Bende seninle geleceğim.', '“de” bağlacı ayrı yazılır.'], ['Kitap masada duruyor.', 'Kitap masa da duruyor.', 'Yer bildiren “-da” eki bitişik yazılır.'],
  ['Bu oyunu sever misin?', 'Bu oyunu severmisin?', 'Soru eki “mi” ayrı yazılır.'], ['Duydum ki yarın tatilmiş.', 'Duydumki yarın tatilmiş.', '“ki” bağlacı ayrı yazılır.'],
  ['Evdeki kedi uyuyor.', 'Evde ki kedi uyuyor.', '“-ki” eki bitişik yazılır.'], ['Kardeşim de okula başladı.', 'Kardeşimde okula başladı.', '“de” bağlacı ayrı yazılır.'],
  ['Sınıfta kimse yok.', 'Sınıf ta kimse yok.', 'Yer bildiren “-ta” eki bitişik yazılır.'], ['Yarın bize gelecek misin?', 'Yarın bize gelecekmisin?', 'Soru eki “mi” ayrı yazılır.']];
const koyArka = () => `<rect x="-3000" y="-400" width="7200" height="780" fill="#d6e8f2"/><rect x="-3000" y="380" width="7200" height="900" fill="#e3c58f"/><image href="oyun3/s/koy.webp" x="-240" y="0" width="1680" height="760" preserveAspectRatio="xMidYMid slice"/><g transform="translate(1110 640)">${resO('saatci-kaplumbaga', 170)}</g>`;
YER.koy = {
  id: 'koy', ad: 'Kitap Koyu', ders: 'Türkçe', beceri: 'Noktalama işaretleri ve yazım kuralları', ikon: '📚', renk: '#e8590c', harita: { x: 773, y: 287 },
  hikaye: 'Kitapçı Kaplumbağa koydaki şişelerden çıkan mektupları düzeltiyor. Cümlelerdeki eksik işaretleri koy, doğru yazılmış cümleyi bul.',
  seviyeler: [['Son işaret', 'Nokta, soru, ünlem.'], ['Virgül mü, kesme mi?', 'Boşluğa doğru işareti koy.'], ['Doğru yazım', 'de, da, ki, mi nasıl yazılır?']],
  bina(){ return `${golge(0, 4, 70)}<rect x="-60" y="-80" width="120" height="80" fill="#fff4e6" stroke="#e8590c" stroke-width="3"/><path d="M-72 -76 L0 -116 L72 -76 Z" fill="#e8590c"/>${Array.from({ length: 5 }, (_, i) => `<rect x="${-44 + i * 18}" y="-60" width="14" height="44" fill="${['#e03131', '#3a86ff', '#12b886', '#f4a100', '#7048e8'][i]}"/>`).join('')}`; },
  gorev(lvl, k, ctx){
    if (lvl === 0) {
      const [c, i] = (AKTIF.y1 || (AKTIF.y1 = shuffle(SON).slice(0, N_GOREV)))[k];
      sv.innerHTML = koyArka() + serit(c + ' ▢', null, 260);
      setInstr(k === 0 ? `Mektuptaki cümlenin sonundaki işaret silinmiş: ${c}. Sonuna hangi işaret gelmeli?` : `${c}. Sonuna hangi işaret gelmeli?`);
      secT(['.', '?', '!'].map(x => ({ t: `${x}  ${ISARET[x]}`, ok: x === i })), () => ctx.dogru(`Evet! ${ISARET[i]}.`, `${esc(c)}<b>${i}</b><small>${{ '.': 'Bildiren cümlenin sonuna nokta konur.', '?': 'Soru soran cümlenin sonuna soru işareti konur.', '!': 'Sevinç, korku, şaşkınlık bildiren cümlenin sonuna ünlem konur.' }[i]}</small>`, 2600, 'sag'),
        () => ctx.yanlis(i === '?' ? 'Bu cümle bir şey soruyor mu?' : i === '!' ? 'Bu cümlede güçlü bir duygu ya da uyarı var mı?' : 'Bu cümle bir bilgi veriyor.'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(b => b.textContent.startsWith(i)).click();
    } else if (lvl === 1) {
      const [a, b, tur] = (AKTIF.y2 || (AKTIF.y2 = shuffle(ARA).slice(0, N_GOREV)))[k], tam = a + (tur === 'v' ? ',' : "'") + b;
      sv.innerHTML = koyArka() + serit(a + '▢' + b, null, 260);
      setInstr(k === 0 ? 'Kutunun yerine hangi işaret gelmeli? Virgül sıralanan sözcükleri ayırır. Kesme işareti özel adlara gelen ekleri ayırır.' : 'Kutunun yerine hangi işaret gelmeli?');
      secT([{ t: 'Virgül', ok: tur === 'v' }, { t: 'Kesme işareti', ok: tur === 'k' }, { t: 'Nokta', ok: false }], () => ctx.dogru(`Evet! ${tur === 'v' ? 'Virgül' : 'Kesme işareti'}.`, `${esc(tam)}<small>${tur === 'v' ? (/^(Evet|Hayır)$/.test(a) ? 'Evet ve hayır sözcüklerinden sonra virgül konur.' : 'Sıralanan sözcükler virgülle ayrılır.') : 'Özel adlara gelen ekler kesme işaretiyle ayrılır.'}</small>`, 2800, 'sag'),
        () => ctx.yanlis(tur === 'k' ? `“${a}” bir özel ad mı? Arkasından ek mi geliyor?` : 'Burada sözcükler sıralanıyor mu? Ya da cümle evet, hayır ile mi başlıyor?'));
      if (window.__TEST) window.__coz = () => [...$('eylem').querySelectorAll('.sec3')].find(x => x.textContent === (tur === 'v' ? 'Virgül' : 'Kesme işareti')).click();
    } else {
      const [d, y, ac] = (AKTIF.y3 || (AKTIF.y3 = shuffle(YAZIM).slice(0, N_GOREV)))[k], l = shuffle([{ t: d, ok: true }, { t: y }]);
      sv.innerHTML = koyArka() + `<text x="600" y="150" text-anchor="middle" class="ttkb" font-size="34" fill="#7a3e00">Hangi cümle doğru yazılmış?</text>` + kartCiz(l, 380, 460, 180, 34);
      setInstr(k === 0 ? 'İki mektuptan biri doğru yazılmış. Doğru yazılmış cümleye dokun.' : 'Doğru yazılmış cümleye dokun.');
      kartSec(l, () => ctx.dogru('Evet! Doğru yazım.', `${esc(d)}<small>${esc(ac)}</small>`, 2800, 'sag'), () => ctx.yanlis('Bitişik mi, ayrı mı yazılmalı? Sözcüğü çıkarınca cümle anlamlı kalıyor mu, düşün.'));
      if (window.__TEST) window.__coz = () => sv.querySelector(`.kartS[data-i="${l.findIndex(o => o.ok)}"]`).dispatchEvent(new Event('click'));
    }
  },
};
