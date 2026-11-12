// Ladin Ormanı — 4. sınıf test motoru (kullanıcının örnek aldığı yayın tarzı): iki sütunlu sayfa, numaralı sorular,
// her soru kendi senaryosu + görseli + kalın soru kökü (olumsuz sözcüklerin altı çizili) + A-D seçenekleri.
// Çok adımlı soru tipleri seçenekleri KENDİSİ üretir (doğru cevap hesaplanır): kodDY, yolDY, kapDY, konusma, roma, sirala, esle, bulmaca.
// Kullanım: const T = require('./test4.js')({ S }); sayfa = T.sayfa([soru, soru, …]); son sayfaya T.optik() eklenir.
module.exports = ({ S }) => {
  let NO = 0, ANAH = [], TIP = [];
  const H = 'ABCD';
  const R = s => { let x = 0; for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) >>> 0; return () => ((x = (x * 1103515245 + 12345) >>> 0) / 4294967296); };
  const karistir = (l, t) => { const r = R(t), a = [...l]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const altCiz = s => s.replace(/(?<!\p{L})(değildir|yanlıştır|söylenemez|olamaz|ulaşamaz|yoktur|almaz|yapılamaz|bulunmaz|kullanılmaz|edemez|ulaşılamaz|gerekmez|çıkarılamaz|ulaşılamaz|uygun değildir|hatalıdır|yanlış|değil)(?!\p{L})/gu, '<u>$1</u>');
  // Seçenek dizisi + doğru seçenek değeri → karıştırılmış seçenekler ve doğru indeks
  const sec = (dogru, yanlislar, t, sirali) => { const l = sirali ? [dogru, ...yanlislar].sort((a, b) => String(a).localeCompare(String(b), 'tr', { numeric: true })) : karistir([dogru, ...yanlislar.slice(0, 3)], t); return { l, d: l.indexOf(dogru) }; };
  // Ana soru kalıbı: ic = senaryo + görsel (HTML), kok = soru kökü, secenek = {l, d}
  const soru = (ic, kok, s, o = {}) => {
    const n = ++NO; ANAH.push(`${n}-${H[s.d]}`); TIP.push(o.tip || 'coktan');
    const duz = s.l.map(x => String(x).replace(/<[^>]+>/g, ''));
    const resimli = s.l.some(x => String(x).includes('<svg') || String(x).includes('<img') || String(x).includes('class="t4-av'));
    const kolon = o.kolon || (resimli ? 2 : duz.every(x => x.length <= 9) ? 4 : duz.every(x => x.length <= 22) ? 2 : 1);
    return `<div class="t4-s"><span class="t4-no">${n}</span><div class="t4-ic">${ic}<p class="t4-kok">${altCiz(kok)}</p><ol class="t4-sec k${kolon}">${s.l.map((x, i) => `<li><b>${H[i]})</b> ${x}</li>`).join('')}</ol></div></div>`;
  };
  // Senaryo parçaları
  const p = (...l) => l.map(x => `<p class="t4-p">${x}</p>`).join('');
  const madde = l => `<ul class="t4-madde">${l.map(x => `<li>${x}</li>`).join('')}</ul>`;
  const tablo = (bas, sat, renk = '#8b5cf6') => `<table class="t4-t" style="--tr:${renk}"><tr>${bas.map(b => `<th>${b}</th>`).join('')}</tr>${sat.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
  const kartlar = (l, renk = '#fff3a8') => `<div class="t4-kartlar">${l.map((x, i) => `<div style="background:${renk}"><i>${i + 1}</i>${x}</div>`).join('')}</div>`;
  // Çocuk avatarı (başörtüsüz; saç tipi: 0 kısa, 1 at kuyruğu, 2 kıvırcık, 3 örgülü)
  const AVR = [['#f6c39a', '#5b3a1e', 0, '#3a86ff'], ['#e9b48a', '#2b1b10', 1, '#f2546b'], ['#c98a5e', '#1f140c', 2, '#12b886'], ['#f3d0b0', '#a0522d', 3, '#f4a100'], ['#d9a06f', '#3b2a1a', 0, '#8b5cf6'], ['#f1c7a3', '#6b3e1f', 1, '#1d6fd8']];
  const avatar = (k, mm = 13) => { const [ten, sac, tip, zemin] = AVR[k % AVR.length];
    const saclar = ['<path d="M14 22 Q14 8 30 8 Q46 8 46 22 Q40 14 30 15 Q20 14 14 22Z"/>', '<path d="M14 24 Q13 8 30 8 Q47 8 46 24 Q40 14 30 15 Q20 14 14 24Z"/><circle cx="48" cy="20" r="6"/>', '<g>' + [16, 22, 30, 38, 44].map(x => `<circle cx="${x}" cy="13" r="6"/>`).join('') + '</g>', '<path d="M14 26 Q13 8 30 8 Q47 8 46 26 Q40 14 30 15 Q20 14 14 26Z"/><path d="M14 26 Q11 38 15 44" stroke-width="5" fill="none"/><path d="M46 26 Q49 38 45 44" stroke-width="5" fill="none"/>'];
    return `<span class="t4-av">${S(60, 60, `<circle cx="30" cy="30" r="29" fill="${zemin}"/><circle cx="30" cy="31" r="15" fill="${ten}"/><g fill="${sac}" stroke="${sac}">${saclar[tip]}</g><circle cx="24.5" cy="31" r="1.8" fill="#1f2a24"/><circle cx="35.5" cy="31" r="1.8" fill="#1f2a24"/><path d="M25 37 Q30 41 35 37" stroke="#1f2a24" stroke-width="1.6" fill="none"/><path d="M15 60 Q15 46 30 46 Q45 46 45 60Z" fill="#fff" opacity=".9"/>`, mm)}</span>`; };
  const balonlar = (l) => `<div class="t4-balon">${l.map(([ad, s, k]) => `<div>${avatar(k)}<p><b>${ad}:</b> ${s}</p></div>`).join('')}</div>`;

  // ——— Kendi seçeneğini üreten çok adımlı soru tipleri ———
  // 1) Doğru/yanlış kodu: her ifadenin yanında D ve Y için rakam; doğru boyanınca oluşan şifre
  const kodDY = (giris, ifadeler, t, kok = 'Buna göre doğru bölümleri boyayan öğrencinin boyadığı rakamlarla oluşan şifre hangisidir?') => {
    const rk = ifadeler.map((_, i) => [2 * i + 1, 2 * i + 2]);
    const kod = l => l.map((d, i) => rk[i][d ? 0 : 1]).join('');
    const dogru = kod(ifadeler.map(x => x[1]));
    const y = new Set(); const r = R(t); while (y.size < 3) { const f = ifadeler.map(x => x[1]); const a = Math.floor(r() * f.length); f[a] = !f[a]; if (r() < .4) { const b = (a + 1 + Math.floor(r() * (f.length - 1))) % f.length; f[b] = !f[b]; } const k = kod(f); if (k !== dogru) y.add(k); }
    const ic = p(giris) + `<div class="t4-dy">${ifadeler.map(([s], i) => `<div><span class="d"><b>${rk[i][0]}</b>Doğru</span><p>${s}</p><span class="y"><b>${rk[i][1]}</b>Yanlış</span></div>`).join('')}</div>`;
    return soru(ic, kok, sec(dogru, [...y], t, true), { tip: 'kodDY' });
  };
  // 2) Doğru/yanlış yol: başlangıç ifadesi doğruysa D, yanlışsa Y okunu izle; 3 ifade, 4 çıkış
  const yolDY = (giris, [a, b, c], t, kok = 'Buna göre ifadeleri doğru değerlendiren öğrenci hangi çıkışa ulaşır?') => {
    const cikis = a[1] ? (b[1] ? 1 : 2) : (c[1] ? 3 : 4);
    const kutu = (x, y, s, w = 150) => `<foreignObject x="${x - w / 2}" y="${y - 22}" width="${w}" height="44"><div xmlns="http://www.w3.org/1999/xhtml" class="t4-yk">${s}</div></foreignObject>`;
    const ok = (x1, y1, x2, y2, et, r) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${r}" stroke-width="2.5" marker-end="url(#t4ok)"/><text x="${(x1 + x2) / 2 + (x2 > x1 ? 6 : -6)}" y="${(y1 + y2) / 2}" font-size="11" font-weight="700" fill="${r}" text-anchor="middle">${et}</text>`;
    let s = '<defs><marker id="t4ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1f2a24"/></marker></defs>';
    s += kutu(160, 26, a[0], 200) + ok(110, 50, 80, 78, 'D', '#12b886') + ok(210, 50, 240, 78, 'Y', '#f2546b') + kutu(80, 102, b[0]) + kutu(240, 102, c[0]);
    s += ok(50, 126, 34, 152, 'D', '#12b886') + ok(110, 126, 126, 152, 'Y', '#f2546b') + ok(210, 126, 194, 152, 'D', '#12b886') + ok(270, 126, 286, 152, 'Y', '#f2546b');
    [34, 126, 194, 286].forEach((x, i) => { s += `<rect x="${x - 22}" y="154" width="44" height="22" rx="11" fill="#fff3c4" stroke="#e08a00"/><text x="${x}" y="169" font-size="10" text-anchor="middle">${i + 1}. çıkış</text>`; });
    return soru(p(giris) + S(320, 180, s, 86), kok, { l: ['1. çıkış', '2. çıkış', '3. çıkış', '4. çıkış'], d: cikis - 1 }, { tip: 'yolDY' });
  };
  // 3) Kaplar: numaralı kartlar doğruysa "Doğru Bilgi", yanlışsa "Yanlış Bilgi" kabına; kaplarla ilgili hangisi yanlış/doğru?
  const kapDY = (giris, ifadeler, t, istenen = 'yanlış') => {
    const v = ifadeler.map(x => x[1]), n = v.length, r = R(t), iddia = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) iddia.push([`${i + 1} ve ${j + 1} numaralı kartlar aynı kaba atılır.`, v[i] === v[j]]);
    for (let i = 0; i < n; i++) iddia.push([`${i + 1} numaralı kart doğru bilgi kabına atılır.`, v[i]], [`${i + 1} numaralı kart yanlış bilgi kabına atılır.`, !v[i]]);
    const dk = v.filter(Boolean).length; iddia.push(['Doğru bilgi kabında daha çok kart vardır.', dk > n - dk], ['Yanlış bilgi kabında daha çok kart vardır.', n - dk > dk], [`Doğru bilgi kabına ${dk} kart atılır.`, true], [`Yanlış bilgi kabına ${dk} kart atılır.`, n - dk === dk]);
    const ist = istenen === 'doğru', hedef = karistir(iddia.filter(x => x[1] === ist), t)[0], diger = karistir(iddia.filter(x => x[1] !== ist), t + 'x').slice(0, 3);
    const kap = (ad, renk) => `<div class="t4-kap"><svg viewBox="0 0 60 34"><path d="M4 10 H56 L52 32 H8Z" fill="${renk}" opacity=".25" stroke="${renk}" stroke-width="2"/><rect x="2" y="4" width="56" height="7" rx="3" fill="${renk}"/></svg><b style="background:${renk}">${ad}</b></div>`;
    void r;
    return soru(p(giris) + kartlar(ifadeler.map(x => x[0])) + `<div class="t4-kaplar">${kap('Doğru Bilgi', '#12b886')}${kap('Yanlış Bilgi', '#f2546b')}</div>`, `Buna göre kaplara atılan kartlarla ilgili aşağıdakilerden hangisi ${ist ? 'doğrudur' : 'yanlıştır'}?`, sec(hedef[0], diger.map(x => x[0]), t), { tip: 'kapDY' });
  };
  // 4) Konuşma balonları: kimlerin verdiği bilgi doğru/yanlış? (seçenekler ikili isimler)
  const konusma = (giris, kisiler, t, istenen = 'yanlış') => {
    const hedef = kisiler.filter(x => x[2] === (istenen === 'doğru')).map(x => x[0]);
    const ikili = []; for (let i = 0; i < kisiler.length; i++) for (let j = i + 1; j < kisiler.length; j++) ikili.push(`${kisiler[i][0]} ve ${kisiler[j][0]}`);
    const dogru = hedef.length === 1 ? `Yalnız ${hedef[0]}` : hedef.join(' ve ');
    const y = karistir([...ikili, ...kisiler.map(k => `Yalnız ${k[0]}`)].filter(x => x !== dogru), t).slice(0, 3);
    return soru(p(giris) + balonlar(kisiler.map(([a, s], i) => [a, s, i + (t.length % 3)])), `Buna göre hangi öğrencilerin verdiği bilgi ${istenen === 'doğru' ? 'doğrudur' : 'yanlıştır'}?`, sec(dogru, y, t), { tip: 'konusma' });
  };
  // 5) I-II-III öncülleri
  const roma = (ic, kok, ifadeler) => {
    const d = ifadeler.map((x, i) => x[1] ? ['I', 'II', 'III'][i] : null).filter(Boolean);
    const ad = l => l.length === 1 ? `Yalnız ${l[0]}` : l.length === 3 ? 'I, II ve III' : l.join(' ve ');
    const tum = [['I'], ['II'], ['III'], ['I', 'II'], ['I', 'III'], ['II', 'III'], ['I', 'II', 'III']].map(ad), dogru = ad(d);
    const y = karistir(tum.filter(x => x !== dogru), kok).slice(0, 3);
    return soru(ic + `<div class="t4-roma">${ifadeler.map(([s], i) => `<p><b>${['I', 'II', 'III'][i]}.</b> ${s}</p>`).join('')}</div>`, kok, sec(dogru, y, kok, true), { kolon: 2, tip: 'roma' });
  };
  // 6) Sıralama: doğru sıra harflerle
  const sirala = (giris, adimlar, kok, t) => {
    const et = 'KLMNPR'.slice(0, adimlar.length).split(''), kar = karistir(adimlar.map((a, i) => [et[i], a]), t);
    const dogru = adimlar.map(a => kar.find(k => k[1] === a)[0]).join(' - ');
    const y = new Set(); const r = R(t + 's'); while (y.size < 3) { const d = dogru.split(' - '); const i = Math.floor(r() * (d.length - 1)); [d[i], d[i + 1]] = [d[i + 1], d[i]]; if (r() < .5) { const j = Math.floor(r() * (d.length - 1)); [d[j], d[j + 1]] = [d[j + 1], d[j]]; } const k = d.join(' - '); if (k !== dogru) y.add(k); }
    return soru(p(giris) + `<div class="t4-sira">${kar.map(([e, a]) => `<div><b>${e}</b>${a}</div>`).join('')}</div>`, kok, sec(dogru, [...y], t), { tip: 'sirala' });
  };
  // 7) Eşleştirme: numaralı sol + harfli sağ
  const esle = (giris, ciftler, kok, t) => {
    const et = 'abcde'.slice(0, ciftler.length).split(''), sag = karistir(ciftler.map(c => c[1]), t);
    const dogru = ciftler.map((c, i) => `${i + 1}-${et[sag.indexOf(c[1])]}`).join(', ');
    const y = new Set(); const r = R(t + 'e'); while (y.size < 3) { const m = ciftler.map((c, i) => et[sag.indexOf(c[1])]); const a = Math.floor(r() * m.length), b = (a + 1 + Math.floor(r() * (m.length - 1))) % m.length; [m[a], m[b]] = [m[b], m[a]]; const k = m.map((x, i) => `${i + 1}-${x}`).join(', '); if (k !== dogru) y.add(k); }
    return soru(p(giris) + `<div class="t4-esle"><div>${ciftler.map((c, i) => `<p><b>${i + 1}.</b> ${c[0]}</p>`).join('')}</div><div>${sag.map((c, i) => `<p><b>${et[i]})</b> ${c}</p>`).join('')}</div></div>`, kok, sec(dogru, [...y], t), { kolon: 2, tip: 'esle' });
  };
  // 8) Bulmaca: ipuçlarının cevapları satırlara yazılır; işaretli sütundaki harflerle oluşan sözcük ya da "hangisi bulmacada yer almaz"
  const bulmaca = (giris, ipuclari, t, sutun = 0) => {
    const dogru = ipuclari.map(([, c]) => c[sutun] || '').join('');
    const r = R(t), harf = 'ABCÇDEFGHIİKLMNOÖPRSŞTUÜVYZ'; const y = new Set();
    while (y.size < 3) { const d = dogru.split(''); const i = Math.floor(r() * d.length); d[i] = harf[Math.floor(r() * harf.length)]; const k = d.join(''); if (k !== dogru) y.add(k); }
    const en = Math.max(...ipuclari.map(x => x[1].length));
    const izgara = `<div class="t4-bul">${ipuclari.map(([, c], i) => `<div><b>${i + 1}</b>${[...Array(en)].map((_, j) => j < c.length ? `<i${j === sutun ? ' class="y"' : ''}></i>` : '<i class="bos"></i>').join('')}</div>`).join('')}</div>`;
    return soru(p(giris) + `<ol class="t4-ipucu">${ipuclari.map(([s]) => `<li>${s}</li>`).join('')}</ol>` + izgara, 'Buna göre renkli kutulara yazılan harfler yukarıdan aşağıya doğru okunduğunda hangi sözcük oluşur?', sec(dogru, [...y], t), { tip: 'bulmaca' });
  };
  // Tek seçenekli klasik soru (senaryo + soru + seçenekler)
  const coktan = (ic, kok, dogru, yanlislar, t) => soru(ic, kok, sec(dogru, yanlislar, t || kok));
  // Sütun grafiği
  const grafik = (baslik, et, de, birim, renk = '#3a86ff') => { const m = Math.max(...de), bw = 200 / et.length; const adim = m <= 10 ? 2 : m <= 20 ? 5 : m <= 50 ? 10 : m <= 100 ? 20 : m <= 500 ? 100 : 1000, ust = Math.ceil(m / adim) * adim; let s = '';
    for (let v = 0; v <= ust; v += adim) { const y = 110 - v / ust * 95; s += `<line x1="34" y1="${y}" x2="240" y2="${y}" stroke="#e3ecf5"/><text x="30" y="${y + 3}" text-anchor="end" font-size="8">${v}</text>`; }
    et.forEach((e, i) => { const x = 38 + i * bw, bh = de[i] / ust * 95; s += `<rect x="${x + bw * .18}" y="${110 - bh}" width="${bw * .64}" height="${bh}" rx="2" fill="${renk}"/><text x="${x + bw / 2}" y="122" text-anchor="middle" font-size="8">${e}</text>`; });
    return `<div class="t4-g"><b>${baslik}</b>${S(245, 128, s + `<line x1="34" y1="15" x2="34" y2="110" stroke="#1f2a24"/><line x1="34" y1="110" x2="240" y2="110" stroke="#1f2a24"/><text x="4" y="10" font-size="8" fill="#5b6b7b">${birim}</text>`, 80)}</div>`; };


  // ——— Örnek yayından eklenen tipler ———
  const bilgi = (s, renk = '#f4a100') => `<div class="t4-bilgi" style="--bk:${renk}">${s}</div>`;
  // Kaç tanesi doğru?
  const kacTane = (ic, ifadeler, kok = 'Buna göre verilen ifadelerden kaç tanesi doğrudur?') => { const n = ifadeler.filter(x => x[1]).length; const l = [1, 2, 3, 4].includes(n) ? [1, 2, 3, 4] : [0, 1, 2, 3, 4].filter(x => x !== (n === 0 ? 4 : 0)).slice(0, 4); return soru(ic + `<ul class="t4-madde">${ifadeler.map(([s]) => `<li>${s}</li>`).join('')}</ul>`, kok, { l: l.map(String), d: l.indexOf(n) }, { kolon: 4, tip: 'kacTane' }); };
  // Kare yürüyüşü: doğruysa sağa a, yanlışsa sola b kare
  const kareYol = (giris, ifadeler, t, sag = 2, sol = 1) => { let x = 0; ifadeler.forEach(([, d]) => x += d ? sag : -sol);
    const sl = ['E', 'D', 'C', 'B', 'A'], sg = ['1', '2', '3', '4', '5', '6'], ad = v => v === 0 ? 'Başlangıç' : v < 0 ? sl[5 + v] : sg[v - 1];
    const kare = (s, r) => `<span class="t4-kare" style="--kr:${r}">${s}</span>`;
    const ic = p(giris) + `<div class="t4-kareler">${sl.map(s => kare(s, '#8b5cf6')).join('')}<span class="t4-kisi">${avatar(t.length % 6, 10)}</span>${sg.map(s => kare(s, '#1d6fd8')).join('')}</div>` + p(`Bilgi doğruysa sağa ${sag} kare, yanlışsa sola ${sol} kare ilerliyor.`) + `<ul class="t4-madde">${ifadeler.map(([s]) => `<li>${s}</li>`).join('')}</ul>`;
    const dogru = ad(x); const aday = [...sl, ...sg].filter(v => v !== dogru); const y = karistir(aday.filter(v => Math.abs((sg.includes(v) ? +v : -(5 - sl.indexOf(v))) - x) <= 3), t).slice(0, 3);
    return soru(ic, 'Buna göre son bilgiden sonra hangi karede bulunur?', sec(kare(dogru, sg.includes(dogru) ? '#1d6fd8' : '#8b5cf6'), y.map(v => kare(v, sg.includes(v) ? '#1d6fd8' : '#8b5cf6')), t), { kolon: 4, tip: 'kareYol' });
  };
  // Seçenekleri tablo satırı olan soru (I, II, III… etiketleri)
  const tabloSec = (ic, kok, bas, dogru, yanlislar, t) => { const s = sec(dogru.join('|'), yanlislar.map(r => r.join('|')), t);
    const n = ++NO; ANAH.push(`${n}-${H[s.d]}`); TIP.push('tabloSec');
    return `<div class="t4-s"><span class="t4-no">${n}</span><div class="t4-ic">${ic}<p class="t4-kok">${altCiz(kok)}</p><table class="t4-ts"><tr><th></th>${bas.map(b => `<th>${b}</th>`).join('')}</tr>${s.l.map((r, i) => `<tr><td><b>${H[i]})</b></td>${r.split('|').map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div></div>`; };
  // Seçenekleri çocuk + konuşma balonu olan soru
  const cocukSec = (ic, kok, sozler, t) => { const dogru = sozler[0]; const s = sec(dogru, sozler.slice(1), t); const n = ++NO; ANAH.push(`${n}-${H[s.d]}`); TIP.push('cocukSec');
    return `<div class="t4-s"><span class="t4-no">${n}</span><div class="t4-ic">${ic}<p class="t4-kok">${altCiz(kok)}</p><div class="t4-csec">${s.l.map((x, i) => `<div><b>${H[i]})</b>${avatar(i + t.length, 10)}<p>${x}</p></div>`).join('')}</div></div></div>`; };
  // Seçenekleri küçük sütun grafiği olan soru
  const grafikSec = (ic, kok, et, dogru, yanlislar, t, birim = '') => { const mini = de => { const m = Math.max(...de, 1), bw = 100 / et.length; let s = ''; de.forEach((v, i) => { const h = v / m * 46; s += `<rect x="${12 + i * bw + bw * .2}" y="${52 - h}" width="${bw * .6}" height="${h}" fill="#f4a100" stroke="#b45309" stroke-width=".6"/><text x="${12 + i * bw + bw / 2}" y="61" font-size="6" text-anchor="middle">${et[i]}</text>`; }); return S(116, 64, `<line x1="10" y1="4" x2="10" y2="52" stroke="#1f2a24"/><line x1="10" y1="52" x2="114" y2="52" stroke="#1f2a24"/><text x="11" y="5" font-size="5.5" fill="#5b6b7b">${birim}</text>` + s, 40); };
    const s = sec(dogru.join(','), yanlislar.map(x => x.join(',')), t); const n = ++NO; ANAH.push(`${n}-${H[s.d]}`); TIP.push('grafikSec');
    return `<div class="t4-s"><span class="t4-no">${n}</span><div class="t4-ic">${ic}<p class="t4-kok">${altCiz(kok)}</p><ol class="t4-sec k2">${s.l.map((x, i) => `<li><b>${H[i]})</b>${mini(x.split(',').map(Number))}</li>`).join('')}</ol></div></div>`; };
  // Ortak bağlamlı soru grubu
  const ortak = (ic, sorular) => { const a = NO + 1, b = NO + sorular.length; return `<div class="t4-ortak"><p class="t4-ob">${a}${sorular.length > 2 ? ', ' + (a + 1) : ''} ve ${b}. soruları aşağıdaki bilgilere göre cevaplayınız.</p>${ic}</div>` + sorular.map(f => f()).join(''); };

  const sayfa = (sorular) => `<div class="t4">${sorular.join('')}</div>`;
  const optik = () => { const n = NO; return `<div class="t4-optik"><b>Cevap kâğıdı</b><div>${[...Array(n)].map((_, i) => `<span><em>${i + 1}</em>${'ABCD'.split('').map(h => `<i>${h}</i>`).join('')}</span>`).join('')}</div></div>`; };
  const yeniHafta = () => { NO = 0; ANAH = []; TIP = []; };
  const cevapSayfasi = (baslik) => `<div class="t4-cevap"><h3>Cevap Anahtarı</h3><p>${baslik} · öğretmen için</p><table><tr>${ANAH.map(a => `<th>${a.split('-')[0]}</th>`).join('')}</tr><tr>${ANAH.map(a => `<td>${a.split('-')[1]}</td>`).join('')}</tr></table><p class="t4-tip">Soru tipleri: ${[...new Set(TIP)].length} farklı tip</p></div>`;
  const tipler = () => [...TIP];
  const CSS = `
.t4{flex:1;column-count:2;column-gap:7mm;column-rule:.4mm solid #dfe7ef;column-fill:balance}
.t4-s{break-inside:avoid;display:flex;gap:2mm;margin:0 0 5mm}
.t4-no{flex:none;width:8mm;height:8mm;border-radius:50%;border:.8mm solid #f4a100;background:#fff8e1;display:grid;place-items:center;font-size:4.6mm;color:#1f2a24;margin-top:-.5mm}
.t4-ic{flex:1;min-width:0;display:flex;flex-direction:column;gap:1.6mm}
.t4-p{margin:0;font-size:4.15mm;line-height:1.42}
.t4-kok{margin:.5mm 0 0;font-size:4.2mm;line-height:1.38;font-weight:700}.t4-kok u{text-decoration-thickness:.35mm}
.t4-sec{list-style:none;margin:0;padding:0;display:grid;gap:1mm 3mm;font-size:4.1mm}.t4-sec.k4{grid-template-columns:repeat(4,1fr)}.t4-sec.k2{grid-template-columns:1fr 1fr}.t4-sec.k1{grid-template-columns:1fr}
.t4-sec li{display:flex;gap:1.2mm;align-items:flex-start;line-height:1.3}.t4-sec li>b{flex:none}
.t4-madde{margin:0;padding-left:5mm;font-size:4.05mm;line-height:1.4}
.t4-t{border-collapse:collapse;width:100%;font-size:3.75mm}.t4-t th{background:var(--tr);color:#fff;font-weight:400;padding:1mm 1.5mm}.t4-t td{border:.3mm solid #d6cdea;padding:.9mm 1.5mm;background:#fbf9ff}
.t4-kartlar{display:flex;flex-direction:column;gap:1.2mm}.t4-kartlar>div{display:flex;gap:2mm;align-items:center;border-radius:5mm;padding:1.2mm 3mm;font-size:3.9mm;line-height:1.3}.t4-kartlar i{font-style:normal;flex:none;width:5.5mm;height:5.5mm;border-radius:50%;background:#fff;border:.4mm solid #c9b200;display:grid;place-items:center;font-size:3.4mm}
.t4-kaplar{display:flex;justify-content:space-around}.t4-kap{display:flex;flex-direction:column;align-items:center;gap:.5mm}.t4-kap svg{width:20mm}.t4-kap b{font-weight:400;color:#fff;font-size:3.6mm;border-radius:1.5mm;padding:.3mm 2mm}
.t4-dy{display:flex;flex-direction:column;gap:1.2mm}.t4-dy>div{display:grid;grid-template-columns:13mm 1fr 13mm;align-items:center;border-radius:5mm;overflow:hidden;background:#8e44ad;color:#fff}.t4-dy>div:nth-child(even){background:#3a6fd8}
.t4-dy p{margin:0;font-size:3.75mm;line-height:1.25;text-align:center;padding:1.2mm 1mm}.t4-dy span{background:#fff;color:#1d4e89;font-size:3.1mm;text-align:center;height:100%;display:flex;flex-direction:column;justify-content:center;line-height:1.1}.t4-dy span b{font-size:3.7mm}.t4-dy .d{border-radius:0 5mm 5mm 0}.t4-dy .y{border-radius:5mm 0 0 5mm}
.t4-yk{font-size:10.5px;line-height:1.15;background:#eef5ff;border:1px solid #3a86ff;border-radius:6px;padding:2px 4px;height:40px;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box}
.t4-av svg{display:block}
.t4-balon{display:grid;grid-template-columns:1fr;gap:1.4mm}.t4-balon>div{display:flex;gap:1.5mm;align-items:center}.t4-balon p{margin:0;flex:1;border:.35mm solid #1f2a24;border-radius:2.5mm;padding:1mm 1.8mm;font-size:3.6mm;line-height:1.28;background:#fff}.t4-balon p b{font-weight:700}
.t4-roma p{margin:.6mm 0;font-size:4mm;line-height:1.35}.t4-roma b{margin-right:1mm}
.t4-sira{display:flex;flex-direction:column;gap:1mm}.t4-sira>div{display:flex;gap:2mm;align-items:center;font-size:3.9mm;line-height:1.3;background:#f1f7ff;border-radius:2mm;padding:1mm 2mm}.t4-sira b{flex:none;width:5.5mm;height:5.5mm;border-radius:1.2mm;background:#1d6fd8;color:#fff;display:grid;place-items:center;font-size:3.5mm;font-weight:400}
.t4-esle{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.t4-esle p{margin:.6mm 0;font-size:3.9mm;line-height:1.3}
.t4-ipucu{margin:0;padding-left:5mm;font-size:3.85mm;line-height:1.35}
.t4-bul{display:flex;flex-direction:column;gap:.8mm;align-self:center}.t4-bul>div{display:flex;gap:.6mm;align-items:center}.t4-bul b{width:4mm;font-size:3.4mm;color:#d6336c}.t4-bul i{width:6mm;height:6mm;border:.35mm solid #d6336c;border-radius:1mm;background:#fff}.t4-bul i.y{background:#ffe066}.t4-bul i.bos{border-color:transparent;background:transparent}
.t4-g{text-align:center}.t4-g>b{font-size:3.8mm;font-weight:400;display:block}
.t4 .b4-kimlik{width:100%}
.t4-ry{display:grid;grid-template-columns:1fr auto;gap:2mm;align-items:center}
.t4-optik{column-span:all;break-inside:avoid;border:.4mm solid #1f2a24;border-radius:2mm;padding:1.5mm 3mm;margin-top:2mm}.t4-optik>b{font-size:3.6mm;font-weight:400}.t4-optik>div{display:flex;flex-wrap:wrap;gap:1mm 4mm}.t4-optik span{display:flex;gap:.8mm;align-items:center;font-size:3.2mm}.t4-optik em{font-style:normal;width:4mm;text-align:right}.t4-optik i{font-style:normal;width:4.2mm;height:4.2mm;border:.3mm solid #1f2a24;border-radius:50%;display:grid;place-items:center;font-size:2.6mm}
.t4-bilgi{border:.8mm solid var(--bk);border-radius:2mm;padding:1.5mm 2.5mm;font-size:3.95mm;line-height:1.4;background:#fffdf5}
.t4-kareler{display:flex;align-items:flex-end;justify-content:center;gap:.7mm}.t4-kare{width:6.5mm;height:7.5mm;border:.4mm solid var(--kr);border-radius:1.2mm;display:inline-grid;place-items:center;font-size:4.2mm;color:var(--kr);background:#fff}.t4-kisi{margin:0 1mm}
.t4-ts{border-collapse:collapse;font-size:3.9mm;width:100%}.t4-ts th{background:#eef5ff;font-weight:400;padding:.6mm 1mm;font-size:3.6mm}.t4-ts td{padding:.6mm 1mm;text-align:center;border-bottom:.25mm solid #e3ecf5}.t4-ts td:first-child{text-align:left;width:7mm}
.t4-csec{display:flex;flex-direction:column;gap:1.2mm}.t4-csec>div{display:flex;align-items:center;gap:1.5mm}.t4-csec b{flex:none;font-size:4mm}.t4-csec p{margin:0;flex:1;border:.35mm solid #1f2a24;border-radius:2.5mm;padding:1mm 2mm;font-size:3.7mm;line-height:1.28}
.t4-ortak{break-inside:avoid;border:.5mm dashed #8b5cf6;border-radius:2.5mm;padding:1.5mm 2.5mm;margin:0 0 3mm;display:flex;flex-direction:column;gap:1.5mm}.t4-ob{margin:0;font-size:3.9mm;color:#6d28d9;background:#f3edff;border-radius:1.5mm;padding:.8mm 2mm}
.t4-cevap{flex:1;display:flex;flex-direction:column;align-items:center;gap:4mm;padding-top:10mm}.t4-cevap h3{font-size:9mm;font-weight:400;margin:0;color:#1d4e89}.t4-cevap p{margin:0;font-size:4.4mm;color:#5b6b7b}.t4-cevap table{border-collapse:collapse;font-size:6mm}.t4-cevap th,.t4-cevap td{border:.4mm solid #9db4c8;padding:2mm 4mm;text-align:center}.t4-cevap th{background:#eaf3ff;font-weight:400}
.t4-anahtar{column-span:all;transform:rotate(180deg);font-size:2.8mm;color:#8a98a6;margin:1mm 0 0;text-align:center}
`;
  return { bilgi, kacTane, kareYol, tabloSec, cocukSec, grafikSec, ortak, cevapSayfasi, tipler, soru, coktan, p, madde, tablo, kartlar, avatar, balonlar, kodDY, yolDY, kapDY, konusma, roma, sirala, esle, bulmaca, grafik, sec, sayfa, optik, yeniHafta, CSS };
};
