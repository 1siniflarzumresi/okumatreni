// Ladin Ormanı — 4. sınıf Matematik: test tarzı (sosyal4.js ile aynı yayın düzeni). İki sütun, haftada 8 soru,
// 2 sayfa + ayrı cevap anahtarı sayfası. Bütün sayılar, doğru cevaplar ve çeldiriciler KODLA HESAPLANIR (elle cevap yok).
// Soru kalıpları 3 haftalık döngüyle döner: 1., 4., 7. … hafta kodDY/yolDY/kapDY · 2., 5., 8. … roma/sirala/esle · 3., 6., 9. … kacTane/kareYol/cocukSec.
// Her konu (KONU.x) şunları verir: st (doğru/yanlış ifadeler), es (eşleştirme), sr (sıralama), cq (çoktan seçmeli problemler), ort (ortak bağlam).
// Üretim: node kaynak/calisma-kagitlari/uret.js m4
module.exports = ({ T, S }) => {
  const { cerceve, p, tablo, bilgi, kodDY, yolDY, kapDY, roma, sirala, esle, kacTane, kareYol, cocukSec, ortak, grafik, sayfa, optik, yeniHafta, cevapSayfasi } = T;
  // Çoktan seçmeli: seçenekler 5 karakterden uzunsa iki sütun (4 sütunda taşıyor)
  const coktan = (ic, kok, d, y0) => { const dd = String(d); let y = [...new Set(y0.map(String))].filter(x => x !== dd);
    if (y.length < 3 && /^[\d.]+$/.test(dd)) { const v = +dd.replace(/\./g, ''); for (const k of [1, -1, 2, 10, -10, 100, 3]) { const c = Number(v + k).toLocaleString('tr-TR'); if (v + k >= 0 && c !== dd && !y.includes(c)) y.push(c); if (y.length >= 3) break; } }
    if (y.length < 3) throw new Error('Eksik çeldirici: ' + kok + ' ' + dd + ' ' + y);
    const l = [d, ...y].map(x => String(x).replace(/<[^>]+>/g, '')); return T.soru(ic, kok, T.sec(d, y, kok), l.every(x => x.length <= 3) ? { kolon: 4 } : { kolon: l.every(x => x.length <= 20) ? 2 : 1 }); };
  // ——— yardımcılar ———
  const RNG = s => { let x = 0; for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) >>> 0; x = x || 1; return () => ((x = (x * 1103515245 + 12345) >>> 0) / 4294967296); };
  const tam = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const sec1 = (r, l) => l[Math.floor(r() * l.length)];
  const kar = (r, l) => { const a = [...l]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const f = n => Number(n).toLocaleString('tr-TR');
  // Çeldirici: doğrudan farklı, birbirinden farklı 3 değer
  const yan = (d, aday) => { const o = []; for (const x of aday) { const s = typeof d === 'number' ? x : String(x); if (s !== d && !o.includes(s) && (typeof d !== 'number' || (Number.isFinite(x) && x >= 0))) o.push(s); if (o.length === 3) break; } return o; };
  const yanN = (d, aday, bicim = f) => yan(d, aday).map(bicim);
  const BIR = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'], ON = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
  const uc = n => { const y = Math.floor(n / 100), o = Math.floor(n / 10) % 10, b = n % 10; return [y ? (y > 1 ? BIR[y] + ' ' : '') + 'yüz' : '', ON[o], BIR[b]].filter(Boolean).join(' '); };
  const oku = n => { if (n === 0) return 'sıfır'; const b = Math.floor(n / 1000), k = n % 1000; return [b ? (b === 1 ? 'bin' : uc(b) + ' bin') : '', uc(k)].filter(Boolean).join(' '); };
  const BAS = ['birler', 'onlar', 'yüzler', 'binler', 'on binler', 'yüz binler'];
  const yuvarla = (n, b) => Math.round(n / b) * b;
  const ADLAR = ['Elif', 'Kaan', 'Defne', 'Mert', 'Zeynep', 'Emir', 'Ada', 'Yusuf', 'Ecrin', 'Alp', 'Nehir', 'Ömer', 'Duru', 'Kerem', 'Su', 'Aras'];
  const ad = r => sec1(r, ADLAR);
  // D/Y ifade çifti: aynı kalıptan doğru ya da (sayısı bozulmuş) yanlış ifade
  const ifade = (r, kalip, dogruDeger, bozuk) => { const d = r() < .5; return [kalip(d ? dogruDeger : bozuk), d]; };
  const boz = (r, v, adim = 1) => v + (r() < .5 ? -1 : 1) * adim * tam(r, 1, 3);

  // ——— KONULAR ———
  const fark = (r, n, a, b) => { const k = new Set(); while (k.size < n) k.add(tam(r, a, b)); return [...k]; };
  const KONU = {};
  let ODAK = {};
  // 1) Doğal sayılar (6 basamaklı): okuma-yazma, basamak/bölük, sıralama, yuvarlama, örüntü
  KONU.dogal = {
    st: r => { const n = tam(r, 120000, 989999), s = String(n), i = tam(r, 0, 5), rak = +s[5 - i];
      return [
        ifade(r, v => `${f(n)} sayısının ${BAS[i]} basamağında ${v} rakamı vardır.`, rak, (rak + tam(r, 1, 8)) % 10),
        ifade(r, v => `${f(n)} sayısının en yakın yüzlüğe yuvarlanmış hâli ${f(v)} olur.`, yuvarla(n, 100), yuvarla(n, 100) + 100 * (r() < .5 ? 1 : -1)),
        ifade(r, v => `“${oku(v)}” sayısı rakamla ${f(n)} şeklinde yazılır.`, n, n + sec1(r, [10, 100, 1000, 9000])),
        ifade(r, v => `${f(n)} sayısının binler bölüğünde ${v} sayısı vardır.`, Math.floor(n / 1000), n % 1000),
        ifade(r, v => `${f(n)} sayısından ${f(10000)} fazla olan sayı ${f(v)} olur.`, n + 10000, n + 1000),
        ifade(r, v => `Rakamları farklı altı basamaklı en büyük sayı ${f(v)} olur.`, 987654, 999999)];
    },
    es: r => { const l = new Set(); while (l.size < 4) l.add(tam(r, 101000, 999000)); return [...l].map(n => [oku(n), f(n)]); },
    sr: r => { const b = tam(r, 3, 9) * 100000 + tam(r, 0, 99) * 1000; const l = [b + tam(r, 100, 900), b + tam(r, 10, 99) * 10, b + 10000 + tam(r, 0, 999), b - tam(r, 1, 9) * 1000]; const u = [...new Set(l)].sort((a, c) => a - c);
      return { giris: 'Bir kitap fuarının dört gününde satılan kitap sayıları kartlara yazıldı.', adim: u.map(f), kok: 'Buna göre kartlar küçükten büyüğe doğru hangi sırayla dizilir?' }; },
    cq: [
      r => { const n = tam(r, 210000, 980000) + tam(r, 0, 9), s = String(n), i = tam(r, 2, 5), rak = +s[5 - i], dv = rak * 10 ** i; if (!rak) return KONU.dogal.cq[1](r); if (s.split(String(rak)).length > 2) return KONU.dogal.cq[0](r);
        return coktan(p(`Bir müzeyi bir yılda ${f(n)} kişi ziyaret etti. ${ad(r)}, bu sayıdaki rakamların basamak değerlerini inceliyor.`), `Buna göre ${rak} rakamının basamak değeri kaçtır?`, f(dv), yanN(dv, [rak, rak * 10 ** (i - 1), rak * 10 ** (i + 1), rak * 10 ** (i - 2)])); },
      r => { const n = tam(r, 100000, 999999), y = yuvarla(n, 1000);
        return coktan(p(`Bir şehirde ${f(n)} ağaç dikildi. Belediye bu sayıyı haberde en yakın yüze yuvarlayarak verdi.`), 'Haberde verilen sayı kaçtır?', f(yuvarla(n, 100)), yanN(yuvarla(n, 100), [yuvarla(n, 1000), Math.floor(n / 100) * 100 === yuvarla(n, 100) ? yuvarla(n, 100) + 100 : Math.floor(n / 100) * 100, yuvarla(n, 10), yuvarla(n, 100) - 100])); },
      r => { const rk = kar(r, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6); const b = [...rk].sort((a, c) => c - a), B = +b.join(''); const sw = (i, j) => { const x = [...b]; [x[i], x[j]] = [x[j], x[i]]; return +x.join(''); };
        return coktan(p(`${ad(r)} rakam kartlarını kullanarak sayılar oluşturuyor.`) + `<div class="m4-kart">${rk.map(x => `<span>${x}</span>`).join('')}</div>` + p('Her kartı yalnız bir kez kullanarak altı basamaklı en büyük sayıyı yazacak.'), 'Yazacağı sayı hangisidir?', f(B), [sw(4, 5), sw(0, 1), +[...b].reverse().join('')].map(f)); },
      r => { const a = tam(r, 12, 40) * 1000, d = sec1(r, [2500, 5000, 1500, 25000]), l = [a, a + d, a + 2 * d, a + 3 * d], s = a + 5 * d;
        return coktan(p(`Bir fabrikada her ay üretilen oyuncak sayısı belli bir kurala göre artıyor.`) + tablo(['Ay', '1.', '2.', '3.', '4.'], [['Üretim', ...l.map(f)]]), 'Bu kural sürerse 6. ayda kaç oyuncak üretilir?', f(s), yanN(s, [s - d, s + d, a + 4 * d + 1000, s - 1000])); },
      r => { const n = tam(r, 100, 999) * 1000 + tam(r, 100, 999);
        return coktan(p(`${ad(r)} gazetede “${oku(n)} kişi maratonu izledi.” cümlesini okudu.`), 'Bu sayının rakamla yazılışı hangisidir?', f(n), yanN(n, [Math.floor(n / 1000) * 10000 + n % 1000, n + 90, n - 9000, Math.floor(n / 1000) * 100 + n % 100])); },
      r => { const n = tam(r, 3, 9) * 100000 + tam(r, 1, 9) * 1000 + tam(r, 1, 9), y = n - Math.floor(n / 1000) % 10 * 1000;
        return coktan(p(`${ad(r)} ${f(n)} sayısının binler basamağındaki rakamı 0 yaptı.`), 'Oluşan yeni sayı kaçtır?', f(y), yanN(y, [n - 1000, n - Math.floor(n / 100) % 10 * 100, y + 10000, n - 100000])); },
    ],
    ort: r => { const s = ['Ada', 'Bora', 'Cem', 'Deniz'].map(x => [x, tam(r, 105, 989) * 1000 + tam(r, 100, 999)]); const b = [...s].sort((a, c) => c[1] - a[1]); const fark = b[0][1] - b[3][1];
      return { ic: p('Dört okulun yıl boyunca topladığı plastik kapak sayıları tabloda verilmiştir.') + tablo(['Okul', 'Kapak sayısı'], s.map(([a, n]) => [a + ' Okulu', f(n)])),
        q: [() => coktan('', 'En çok kapak toplayan okul hangisidir?', b[0][0] + ' Okulu', s.filter(x => x[0] !== b[0][0]).map(x => x[0] + ' Okulu')),
          () => coktan('', 'En az kapak toplayan okulun kapak sayısı en yakın yüze yuvarlanırsa kaç olur?', f(yuvarla(b[3][1], 100)), yanN(yuvarla(b[3][1], 100), [yuvarla(b[3][1], 1000), yuvarla(b[3][1], 100) + 100, yuvarla(b[3][1], 10), yuvarla(b[3][1], 100) - 100]))] }; },
    gir: 'Öğretmen tahtaya doğal sayılarla ilgili bilgiler yazdı.',
  };

  // 2) Toplama: en çok dört basamaklı, tahmin, zihinden, problem
  KONU.toplama = {
    gir: 'Öğretmen tahtaya toplama işlemiyle ilgili bilgiler yazdı.',
    st: r => { const a = tam(r, 1200, 5800), b = tam(r, 1100, 3900), c = tam(r, 21, 79) * 10;
      return [ifade(r, v => `${f(a)} + ${f(b)} işleminin sonucu ${f(v)} olur.`, a + b, a + b + sec1(r, [10, 100, 1000])),
        ifade(r, v => `${f(a)} ve ${f(b)} sayılarını en yakın yüze yuvarlayarak yapılan tahminin sonucu ${f(v)} olur.`, yuvarla(a, 100) + yuvarla(b, 100), yuvarla(a, 100) + yuvarla(b, 100) + 100),
        ifade(r, v => `${c} + 500 işlemi zihinden yapılırsa sonuç ${f(v)} olur.`, c + 500, c + 50),
        ifade(r, v => `Toplananların yerleri değişirse toplam ${v}.`, 'değişmez', 'değişir'),
        ifade(r, v => `Bir sayıya 0 eklenirse sonuç ${v}.`, 'o sayının kendisi olur', '0 olur'),
        ifade(r, v => `${f(a)} sayısına ${f(v)} eklenirse sonuç ${f(a + b)} olur.`, b, b + 100)]; },
    es: r => { const l = []; const k = new Set(); while (l.length < 4) { const a = tam(r, 105, 899) * 10, b = tam(r, 12, 79) * 10; if (k.has(a + b)) continue; k.add(a + b); l.push([`${f(a)} + ${f(b)}`, f(a + b)]); } return l; },
    sr: r => ({ giris: 'Bir toplama problemini çözen öğrencinin adımları karışık verilmiştir.', adim: ['Problemi okuyup verilenleri ve isteneni belirlemek', 'Sonucu yuvarlayarak tahmin etmek', 'Toplama işlemini yapmak', 'Sonucu tahminle karşılaştırıp kontrol etmek'], kok: 'Problem çözme adımları doğru sırayla hangi seçenekte verilmiştir?' }),
    cq: [
      r => { const a = tam(r, 1250, 3900), b = tam(r, 850, 2400), c = tam(r, 300, 900), t = a + b + c;
        return coktan(p(`Bir kütüphaneye ocakta ${f(a)}, şubatta ${f(b)} kitap bağışlandı. Martta bağışlanan kitap sayısı şubattakinden ${f(b - c)} eksikti.`), 'Üç ayda toplam kaç kitap bağışlanmıştır?', f(t), yanN(t, [a + b + (b - c), a + b, t + 1000, t - 100])); },
      r => { const a = tam(r, 2140, 4860), b = tam(r, 1230, 3970), tah = yuvarla(a, 100) + yuvarla(b, 100);
        return coktan(p(`${ad(r)}, ${f(a)} ve ${f(b)} sayılarını toplamadan önce her birini en yakın yüze yuvarlayarak sonucu tahmin ediyor.`), 'Tahmin ettiği sonuç kaçtır?', f(tah), yanN(tah, [yuvarla(a, 1000) + yuvarla(b, 1000), yuvarla(a + b, 10), tah + 100, tah - 100])); },
      r => { const a = tam(r, 1400, 3800), x = tam(r, 1200, 4100), t = a + x;
        return coktan(p(`Bir fırında sabah bir miktar ekmek çıktı. Öğleden sonra ${f(a)} ekmek daha çıktı. Gün sonunda toplam ${f(t)} ekmek çıkmış oldu.`), 'Sabah kaç ekmek çıkmıştır?', f(x), yanN(x, [t + a, x + 100, x - 1000, t])); },
      r => { const fiyat = { 'Bisiklet': tam(r, 32, 58) * 100, 'Kask': tam(r, 6, 14) * 100, 'Zil': tam(r, 15, 39) * 10, 'Işık': tam(r, 24, 69) * 10 }, l = Object.entries(fiyat), t = fiyat['Bisiklet'] + fiyat['Kask'] + fiyat['Işık'];
        return coktan(p(`${ad(r)} bir mağazada fiyat listesine bakıyor.`) + tablo(['Ürün', 'Fiyat (TL)'], l.map(([u, v]) => [u, f(v)])), 'Bisiklet, kask ve ışık alırsa kaç lira öder?', f(t), yanN(t, [t - fiyat['Işık'] + fiyat['Zil'], t + fiyat['Zil'], t - 100, fiyat['Bisiklet'] + fiyat['Kask']])); },
      r => { const a = tam(r, 1500, 4500), b = a + tam(r, 300, 900), t = a + b;
        return coktan(p(`Bir okul kermesinde cumartesi ${f(a)} TL toplandı. Pazar günü cumartesiden ${f(b - a)} TL fazla toplandı.`), 'İki günde toplam kaç lira toplanmıştır?', f(t), yanN(t, [a + (b - a), 2 * a, t + 100, b])); },
      r => { const a = tam(r, 23, 68) * 100, b = tam(r, 12, 29) * 100, t = a + b;
        return coktan(p(`${ad(r)}, ${f(a)} + ${f(b)} işlemini zihinden yapmak için önce binlikleri, sonra yüzlükleri topluyor.`), 'İşlemin sonucu kaçtır?', f(t), yanN(t, [t + 1000, t - 100, a + b * 10, t + 100])); },
    ],
    ort: r => { const g = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe'].map(x => [x, tam(r, 1150, 2980)]), t = g.reduce((a, b) => a + b[1], 0), ilk2 = g[0][1] + g[1][1];
      return { ic: p('Bir müzeyi dört günde ziyaret eden kişi sayıları tabloda verilmiştir.') + tablo(['Gün', 'Ziyaretçi'], g.map(([a, n]) => [a, f(n)])),
        q: [() => coktan('', 'Dört günde toplam kaç kişi müzeyi ziyaret etmiştir?', f(t), yanN(t, [t + 1000, t - 100, t + 10, ilk2 + g[2][1]])),
          () => coktan('', 'İlk iki gündeki ziyaretçi sayısı en yakın yüze yuvarlanırsa kaç olur?', f(yuvarla(ilk2, 100)), yanN(yuvarla(ilk2, 100), [yuvarla(ilk2, 100) + 100, yuvarla(ilk2, 1000), yuvarla(ilk2, 10), yuvarla(ilk2, 100) - 100]))] }; },
  };
  // 3) Çıkarma
  KONU.cikarma = {
    gir: 'Öğretmen tahtaya çıkarma işlemiyle ilgili bilgiler yazdı.',
    st: r => { const a = tam(r, 4200, 9800), b = tam(r, 1100, 3900);
      return [ifade(r, v => `${f(a)} − ${f(b)} işleminin sonucu ${f(v)} olur.`, a - b, a - b + sec1(r, [10, 100, 1000])),
        ifade(r, v => `Çıkarma işleminin sağlaması fark ile çıkanın ${v} yapılır.`, 'toplanmasıyla', 'çıkarılmasıyla'),
        ifade(r, v => `Bir sayıdan kendisi çıkarılırsa sonuç ${v} olur.`, '0', '1'),
        ifade(r, v => `${f(a)} − ${f(b)} işleminin en yakın yüze yuvarlanarak tahmini ${f(v)} olur.`, yuvarla(a, 100) - yuvarla(b, 100), yuvarla(a, 100) - yuvarla(b, 100) + 200),
        ifade(r, v => `${f(a)} sayısı ${f(b)} sayısından ${f(v)} fazladır.`, a - b, a + b),
        ifade(r, v => `1000 − 350 işleminin sonucu ${v} olur.`, 650, 750)]; },
    es: r => { const l = [], k = new Set(); while (l.length < 4) { const a = tam(r, 30, 95) * 100, b = tam(r, 3, 28) * 100; if (k.has(a - b) || b >= a) continue; k.add(a - b); l.push([`${f(a)} − ${f(b)}`, f(a - b)]); } return l; },
    sr: r => { const a = tam(r, 6000, 9000), l = [a - tam(r, 100, 900), a - tam(r, 1000, 1900), a - tam(r, 2000, 2900), a - tam(r, 3000, 3900)];
      return { giris: `Bir depoda ${f(a)} koli vardı. Dört farklı günde bir kısmı gönderildi ve depoda kalan koli sayıları kartlara yazıldı.`, adim: [...l].sort((x, y) => y - x).map(f), kok: 'Kalan koli sayıları büyükten küçüğe doğru hangi sırayla dizilir?' }; },
    cq: [
      r => { const a = tam(r, 5200, 9600), b = tam(r, 1300, 2900), c = tam(r, 800, 1900), k = a - b - c;
        return coktan(p(`Bir çiftlikte ${f(a)} fidan vardı. Birinci hafta ${f(b)}, ikinci hafta ${f(c)} fidan dikildi.`), 'Dikilmeyi bekleyen kaç fidan kalmıştır?', f(k), yanN(k, [a - b + c, a - b, k + 1000, k - 100])); },
      r => { const a = tam(r, 3200, 7800), b = tam(r, 1500, 2900), d = a - b;
        return coktan(p(`${ad(r)} bir bilgi yarışmasında ${f(a)}, arkadaşı ${f(b)} puan aldı.`), 'İki puan arasındaki fark kaçtır?', f(d), yanN(d, [a + b, d + 100, d - 1000, d + 10])); },
      r => { const k = tam(r, 1200, 4800), c = tam(r, 1100, 2900), a = k + c;
        return coktan(p(`Bir sinema salonunun biletlerinin ${f(c)} tanesi satıldı. Satılmayan ${f(k)} bilet kaldı.`), 'Salonda toplam kaç bilet vardı?', f(a), yanN(a, [k - c, a + 1000, a - 100, k])); },
      r => { const a = tam(r, 61, 98) * 100, b = tam(r, 21, 58) * 100, d = a - b;
        return coktan(p(`${ad(r)}, ${f(a)} − ${f(b)} işlemini zihinden yapmak için yüzlükleri kullanıyor.`), 'İşlemin sonucu kaçtır?', f(d), yanN(d, [d + 1000, d - 100, a + b, d + 10])); },
      r => { const a = tam(r, 2015, 2026), b = tam(r, 1923, 1990), d = a - b;
        return coktan(p(`Bir köprü ${b} yılında yapıldı. ${ad(r)} köprüyü ${a} yılında ziyaret etti.`), 'Ziyaret edildiğinde köprü kaç yıllıktı?', String(d), yanN(d, [d + 1, d - 10, a - 1900, d + 10])); },
      r => { const a = tam(r, 4100, 8900), b = tam(r, 1200, 3800), tah = yuvarla(a, 100) - yuvarla(b, 100);
        return coktan(p(`${ad(r)}, ${f(a)} − ${f(b)} işleminin sonucunu sayıları en yakın yüze yuvarlayarak tahmin ediyor.`), 'Tahmin ettiği sonuç kaçtır?', f(tah), yanN(tah, [a - b, tah + 100, yuvarla(a, 1000) - yuvarla(b, 1000), tah - 100])); },
    ],
    ort: r => { const p0 = tam(r, 8000, 9900), s1 = tam(r, 1200, 2800), s2 = tam(r, 1100, 2600), k = p0 - s1 - s2;
      return { ic: p(`Bir okulun ${f(p0)} TL bütçesi var. Kütüphane için ${f(s1)} TL, spor malzemesi için ${f(s2)} TL harcandı.`),
        q: [() => coktan('', 'Bütçeden kaç lira kalmıştır?', f(k), yanN(k, [p0 - s1 + s2, p0 - s1, k + 1000, k - 100])),
          () => coktan('', 'Kütüphaneye harcanan para, spora harcanandan kaç lira fazla ya da eksiktir?', `${f(Math.abs(s1 - s2))} TL ${s1 > s2 ? 'fazla' : 'eksik'}`, [`${f(Math.abs(s1 - s2))} TL ${s1 > s2 ? 'eksik' : 'fazla'}`, `${f(s1 + s2)} TL fazla`, `${f(Math.abs(s1 - s2) + 100)} TL ${s1 > s2 ? 'fazla' : 'eksik'}`])] }; },
  };
  // 4) Çarpma
  KONU.carpma = {
    gir: 'Öğretmen tahtaya çarpma işlemiyle ilgili bilgiler yazdı.',
    st: r => { const a = tam(r, 12, 48), b = tam(r, 11, 29), c = tam(r, 3, 9);
      return [ifade(r, v => `${a} × ${b} işleminin sonucu ${f(v)} olur.`, a * b, a * b + sec1(r, [a, b, 10])),
        ifade(r, v => `${c} × 100 işleminin sonucu ${f(v)} olur.`, c * 100, c * 10),
        ifade(r, v => `Çarpanların yerleri değişirse çarpım ${v}.`, 'değişmez', 'değişir'),
        ifade(r, v => `Bir sayının 1 ile çarpımı ${v} olur.`, 'o sayının kendisi', '1'),
        ifade(r, v => `Bir sayının 0 ile çarpımı ${v} olur.`, '0', 'o sayının kendisi'),
        ifade(r, v => `${a} × 20 işleminin sonucu ${f(v)} olur.`, a * 20, a * 2)]; },
    es: r => { const l = [], k = new Set(); while (l.length < 4) { const a = tam(r, 11, 39), b = tam(r, 3, 9); if (k.has(a * b)) continue; k.add(a * b); l.push([`${a} × ${b}`, f(a * b)]); } return l; },
    sr: r => { const l = [[tam(r, 21, 29), 4], [tam(r, 15, 19), 9], [tam(r, 31, 39), 3], [tam(r, 11, 14), 6]].map(([a, b]) => [`${a} × ${b}`, a * b]).sort((x, y) => x[1] - y[1]);
      return { giris: 'Öğrenciler kartlardaki çarpma işlemlerinin sonuçlarını bulacak.', adim: l.map(x => x[0]), kok: 'Kartlar sonuçları küçükten büyüğe doğru hangi sırayla dizilir?' }; },
    cq: [
      r => { const a = tam(r, 12, 28), b = tam(r, 14, 36), t = a * b;
        return coktan(p(`Bir sinema salonunda ${a} sıra var. Her sırada ${b} koltuk bulunuyor.`), 'Salonda toplam kaç koltuk vardır?', f(t), yanN(t, [a + b, t + a, t - b, t + 10])); },
      r => { const k = tam(r, 15, 45), a = tam(r, 6, 9), b = tam(r, 12, 24), t = k * a + k * b;
        return coktan(p(`Bir okul gezisinde öğrencilere ${a} TL'lik meyve suyu ve ${b} TL'lik sandviç alınacak. Gezide ${k} öğrenci var.`), 'Toplam kaç lira ödenir?', f(t), yanN(t, [k * a, k * b, t + k, (a + b) + k])); },
      r => { const a = tam(r, 24, 89), t = a * 100;
        return coktan(p(`Bir kolide ${a} paket var. Her pakette 100 sayfa bulunuyor.`), 'Kolideki paketlerde toplam kaç sayfa vardır?', f(t), yanN(t, [a * 10, a * 1000, a + 100, t + 100])); },
      r => { const a = tam(r, 21, 38), b = tam(r, 21, 32), t = a * b, tah = yuvarla(a, 10) * yuvarla(b, 10);
        return coktan(p(`${ad(r)}, ${a} × ${b} işleminin sonucunu çarpanları en yakın onluğa yuvarlayarak tahmin ediyor.`), 'Tahmin ettiği sonuç kaçtır?', f(tah), yanN(tah, [t, tah + 100, yuvarla(a, 10) + yuvarla(b, 10), tah - 100])); },
      r => { const a = tam(r, 13, 19), b = tam(r, 21, 28), t = a * b;
        return coktan(p(`${ad(r)}, ${a} × ${b} işlemini ${a} × 20 ve ${a} × ${b - 20} işlemlerine ayırarak yapıyor.`), 'İşlemin sonucu kaçtır?', f(t), yanN(t, [a * 20 + (b - 20), a * 20, t + a, t - 10])); },
      r => { const a = tam(r, 12, 25), b = tam(r, 3, 6), c = tam(r, 2, 4), t = a * b * c;
        return coktan(p(`Bir kolide ${b} kutu, her kutuda ${a} kalem var. Okula ${c} koli geldi.`), 'Okula toplam kaç kalem gelmiştir?', f(t), yanN(t, [a * b, a * b + c, a + b + c, t + a])); },
    ],
    ort: r => { const k = tam(r, 6, 9), g = tam(r, 12, 18), ky = tam(r, 3, 6), t = k * g * ky;
      return { ic: p(`Bir okulda ${k} sınıf var. Her sınıfta ${g} öğrenci bulunuyor. Her öğrenciye ${ky} kalem dağıtılacak.`),
        q: [() => coktan('', 'Okulda toplam kaç öğrenci vardır?', f(k * g), yanN(k * g, [k + g, k * g + k, k * g - g, k * g * ky])),
          () => coktan('', 'Toplam kaç kalem dağıtılır?', f(t), yanN(t, [k * g, t + ky, t - g, k * ky]))] }; },
  };
  // 5) Bölme
  KONU.bolme = {
    gir: 'Öğretmen tahtaya bölme işlemiyle ilgili bilgiler yazdı.',
    st: r => { const b = tam(r, 3, 9), q = tam(r, 21, 98), k = tam(r, 1, b - 1), a = b * q + k;
      return [ifade(r, v => `${a} ÷ ${b} işleminde bölüm ${v} olur.`, q, q + 1),
        ifade(r, v => `${a} ÷ ${b} işleminde kalan ${v} olur.`, k, (k + 1) % b === k ? k + 1 : (k + 1) % b),
        ifade(r, v => `Bölme işleminde kalan, bölenden ${v} olmalıdır.`, 'küçük', 'büyük'),
        ifade(r, v => `${f(q * 100)} ÷ 100 işleminin sonucu ${v} olur.`, q, q * 10),
        ifade(r, v => `Bölme işleminin sağlaması bölen ile bölümün çarpımına kalanın ${v} yapılır.`, 'eklenmesiyle', 'çıkarılmasıyla'),
        ifade(r, v => `0 ÷ ${b} işleminin sonucu ${v} olur.`, 0, b)]; },
    es: r => { const l = [], k = new Set(); while (l.length < 4) { const b = tam(r, 3, 9), q = tam(r, 12, 60); if (k.has(q)) continue; k.add(q); l.push([`${b * q} ÷ ${b}`, String(q)]); } return l; },
    sr: r => ({ giris: 'Kalanlı bir bölme işleminin sağlamasını yapan öğrencinin adımları karışık verilmiştir.', adim: ['Bölme işlemini yapıp bölümü ve kalanı bulmak', 'Bölen ile bölümü çarpmak', 'Çarpıma kalanı eklemek', 'Sonucun bölüneni verdiğini kontrol etmek'], kok: 'Adımların doğru sıralanışı hangisidir?' }),
    cq: [
      r => { const b = tam(r, 4, 8), q = tam(r, 23, 89), k = tam(r, 1, b - 1), a = b * q + k;
        return coktan(p(`${a} öğrenci ${b} kişilik araçlarla bir geziye gidecek. Hiçbir öğrenci dışarıda kalmayacak.`), 'En az kaç araç gerekir?', f(q + 1), yanN(q + 1, [q, q + 2, k, b])); },
      r => { const b = tam(r, 3, 9), q = tam(r, 32, 96), k = tam(r, 1, b - 1), a = b * q + k;
        return coktan(p(`${ad(r)}, ${a} cevizi ${b} arkadaşına eşit olarak paylaştırdı. Paylaştıramadığı cevizleri kendisi aldı.`), 'Kendisine kaç ceviz kalmıştır?', String(k), yanN(k, [q, b, (k + 1) % b || b - 1, k + b])); },
      r => { const b = tam(r, 4, 9), q = tam(r, 12, 45), a = b * q, t = q * tam(r, 3, 6), fi = t / q;
        return coktan(p(`Bir manav ${a} elmayı ${b} kasaya eşit olarak yerleştirdi. Bir kasadaki elmaların tamamını ${f(t)} TL'ye sattı.`), 'Bir elmayı kaç liradan satmıştır?', String(fi), yanN(fi, [q, fi + 1, b, fi * 2])); },
      r => { const q = tam(r, 15, 95) * 10, a = q * 10;
        return coktan(p(`Bir fabrikada üretilen ${f(a)} vida, onarlı paketlere konacak.`), 'Kaç paket vida hazırlanır?', f(q), yanN(q, [a / 100, a * 10, q + 10, q / 10 * 100 === a ? q * 10 : q + 1])); },
      r => { const b = sec1(r, [4, 5, 6]), q = tam(r, 21, 64), a = b * q, tah = Math.round(a / b / 10) * 10;
        return coktan(p(`${ad(r)}, ${a} ÷ ${b} işleminin sonucunu bölmeden önce tahmin etmek istiyor.`), 'Sonuç hangi sayıya en yakındır?', String(tah), yanN(tah, [tah + 10, tah - 10, tah * 10, b * 10])); },
      r => { const b = tam(r, 3, 8), q = tam(r, 15, 60), k = tam(r, 1, b - 1), a = b * q + k;
        return coktan(p(`${a} kitap, her rafa ${b} kitap gelecek şekilde rafa diziliyor. Rafı dolmayan kitaplar masaya konuyor.`), 'Kaç raf tamamen dolar?', String(q), yanN(q, [q + 1, k, q - 1, b])); },
    ],
    ort: r => { const b = tam(r, 4, 7), q = tam(r, 18, 45), t = b * q, fi = tam(r, 3, 9);
      return { ic: p(`Okul bahçesine ${t} çiçek dikilecek. Çiçekler ${b} sıraya eşit olarak dikilecek. Bir çiçeğin fiyatı ${fi} TL'dir.`),
        q: [() => coktan('', 'Her sırada kaç çiçek olur?', String(q), yanN(q, [q + 1, t - b, b * 10, q - 2])),
          () => coktan('', 'Bir sıradaki çiçekler için kaç lira ödenir?', f(q * fi), yanN(q * fi, [t * fi, q + fi, q * fi + fi, b * fi]))] }; },
  };
  // 6) Kesirler (basit, bileşik, tam sayılı; birim kesir sıralama; bir çokluğun kesri; payda eşit toplama-çıkarma)
  const kz = (a, b) => `<span class="m4-kz"><span>${a}</span><span>${b}</span></span>`;
  const kesirSvg = (pay, payda) => { let s = ''; for (let i = 0; i < payda; i++) s += `<rect x="${4 + i * (152 / payda)}" y="6" width="${152 / payda}" height="28" fill="${i < pay ? '#ffd23f' : '#fff'}" stroke="#1f2a24" stroke-width="1.5"/>`; return S(160, 40, s, 42); };
  KONU.kesir = {
    gir: 'Öğretmen tahtaya kesirlerle ilgili bilgiler yazdı.',
    st: r => { const b = tam(r, 5, 9), a = tam(r, 1, b - 1), c = tam(r, 1, b - 1), n = b * tam(r, 3, 8);
      return [ifade(r, v => `1/${b} ile 1/${b + 1} kesirlerinden ${v} kesri daha büyüktür.`, `1/${b}`, `1/${b + 1}`),
        ifade(r, v => `${b + 2}/${b} kesri ${v} kesirdir.`, 'bileşik', 'basit'),
        ifade(r, v => `${a}/${b} + ${c}/${b} işleminin sonucu ${v} olur.`, `${a + c}/${b}`, `${a + c}/${2 * b}`),
        ifade(r, v => `${n} sayısının 1/${b} kadarı ${v} olur.`, n / b, n / b + 1),
        ifade(r, v => `Paydası pay ile aynı olan kesir ${v} eşittir.`, 'bir bütüne', 'yarıma'),
        ifade(r, v => `${b + 3}/${b} kesri tam sayılı olarak ${v} şeklinde yazılır.`, `1 tam 3/${b}`, `3 tam 1/${b}`)]; },
    es: r => { const b = tam(r, 6, 9); return [[`${b * 4} sayısının 1/4 kadarı`, String(b)], [`${b * 3} sayısının 1/3 kadarı`, String(b + 0 === b ? b : b)].map((x, i) => i ? String(b) : x), [`${(b + 1) * 2} sayısının yarısı`, String(b + 1)], [`${(b + 2) * 5} sayısının 1/5 kadarı`, String(b + 2)], [`${(b + 3) * 6} sayısının 1/6 kadarı`, String(b + 3)]].filter((x, i) => i !== 1); },
    sr: r => { const l = kar(r, [3, 4, 5, 6, 8, 9, 10]).slice(0, 4).sort((a, b) => b - a); return { giris: 'Kartlarda birim kesirler yazılıdır.', adim: l.map(x => `1/${x}`), kok: 'Kesirler küçükten büyüğe doğru hangi sırayla dizilir?' }; },
    cq: [
      r => { const b = sec1(r, [4, 5, 6, 8]), a = tam(r, 1, b - 1), n = b * tam(r, 4, 9), x = n / b * a;
        return coktan(p(`${ad(r)} adlı öğrencinin ${n} çıkartması var. Çıkartmalarının ${a}/${b} kadarını kardeşine verdi.`), 'Kardeşine kaç çıkartma vermiştir?', String(x), yanN(x, [n / b, n - x, x + a, n / a])); },
      r => { const b = sec1(r, [5, 6, 7, 8, 9]), a = tam(r, 1, b - 2), c = tam(r, 1, b - a - 1), k = b - a - c;
        return coktan(p(`Bir pasta ${b} eş parçaya bölündü. Anne ${a}, baba ${c} parça yedi.`) + kesirSvg(a + c, b), 'Pastanın kaçta kaçı kalmıştır?', `${k}/${b}`, [`${a + c}/${b}`, `${k}/${2 * b}`, `${k + 1}/${b}`, `${b}/${k}`, `${a}/${b}`]); },
      r => { const b = sec1(r, [4, 5, 6, 8]), a = tam(r, b + 1, 2 * b - 1);
        return coktan(p(`${ad(r)}, şekilde boyalı kısımları gösteren kesri yazacak. Her bütün ${b} eş parçaya bölünmüştür.`) + kesirSvg(b, b) + kesirSvg(a - b, b), 'Boyalı kısımları gösteren kesir hangisidir?', `${a}/${b}`, [`${a - b}/${b}`, `${a}/${2 * b}`, `${b}/${a}`]); },
      r => { const b = sec1(r, [6, 8, 10]), a = tam(r, 4, b - 1), c = tam(r, 1, a - 1);
        return coktan(p(`Bir kavanozun ${a}/${b} kadarı ballıydı. Kahvaltıda kavanozun ${c}/${b} kadarı yendi.`), 'Kavanozun kaçta kaçı ballı kalmıştır?', `${a - c}/${b}`, [`${a + c}/${b}`, `${a - c}/${2 * b}`, `${a - c}/0`.replace('/0', `/${b - 1}`)]); },
      r => { const b = sec1(r, [3, 4, 5]), n = b * tam(r, 3, 6), x = n / b;
        return coktan(p(`Bir sınıftaki ${n} öğrencinin 1/${b} kadarı gözlük takıyor.`), 'Kaç öğrenci gözlük takmaktadır?', String(x), yanN(x, [n - x, b, x + b, n / 2])); },
      r => { const b = sec1(r, [5, 6, 8]), a = tam(r, 1, b - 1), c = tam(r, 1, b - 1), buy = a > c ? 'Ali' : a < c ? 'Can' : null; if (!buy) return KONU.kesir.cq[0](r);
        return coktan(p(`Ali bir pizzanın ${a}/${b} kadarını, Can aynı büyüklükteki başka bir pizzanın ${c}/${b} kadarını yedi.`), 'Kim daha çok pizza yemiştir?', buy, [buy === 'Ali' ? 'Can' : 'Ali', 'İkisi eşit yemiştir', 'Bilinemez']); },
    ],
    ort: r => { const n = sec1(r, [24, 30, 36]), y = n / 2, c = n / 3;
      return { ic: p(`Bir sınıfta ${n} öğrenci var. Öğrencilerin yarısı spor kulübüne, 1/3'ü müzik kulübüne katıldı. Kalanlar resim kulübüne katıldı.`),
        q: [() => coktan('', 'Müzik kulübüne kaç öğrenci katılmıştır?', String(c), yanN(c, [y, n - y - c, c + 3, n / 4])),
          () => coktan('', 'Resim kulübüne kaç öğrenci katılmıştır?', String(n - y - c), yanN(n - y - c, [c, y, n - y, n - c]))] }; },
  };
  // 7) Zaman ölçme
  KONU.zaman = {
    gir: 'Öğretmen tahtaya zaman ölçü birimleriyle ilgili bilgiler yazdı.',
    st: r => { const s = tam(r, 2, 5), h = tam(r, 2, 6), g = tam(r, 2, 4), y = tam(r, 2, 5);
      return [ifade(r, v => `${s} saat ${v} dakikadır.`, s * 60, s * 100), ifade(r, v => `${h} hafta ${v} gündür.`, h * 7, h * 5),
        ifade(r, v => `${g} gün ${v} saattir.`, g * 24, g * 12), ifade(r, v => `${y} yıl ${v} aydır.`, y * 12, y * 10),
        ifade(r, v => `1 dakika ${v} saniyedir.`, 60, 100), ifade(r, v => `Artık yıllarda şubat ayı ${v} gün çeker.`, 29, 28)]; },
    es: r => { const s = tam(r, 2, 4), h = tam(r, 2, 5), g = tam(r, 2, 3), y = tam(r, 2, 4); return [[`${s} saat`, `${s * 60} dakika`], [`${h} hafta`, `${h * 7} gün`], [`${g} gün`, `${g * 24} saat`], [`${y} yıl`, `${y * 12} ay`]]; },
    sr: r => ({ giris: 'Kartlarda farklı süreler yazılıdır.', adim: ['90 saniye', '45 dakika', '3 saat', '2 gün'], kok: 'Süreler kısadan uzuna doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const bs = tam(r, 8, 14), bd = sec1(r, [10, 15, 20, 25, 35, 40]), sd = tam(r, 75, 150), t = bs * 60 + bd + sd, ss = Math.floor(t / 60) % 24, sdk = t % 60, z = h => `${String(Math.floor(h / 60) % 24).padStart(2, '0')}.${String(h % 60).padStart(2, '0')}`;
        return coktan(p(`Bir tiyatro gösterisinin başlama saati ${z(bs * 60 + bd)} olarak duyuruldu. Gösteri ${sd} dakika sürdü.`), 'Gösteri saat kaçta bitmiştir?', `${String(ss).padStart(2, '0')}.${String(sdk).padStart(2, '0')}`, [z(t + 60), z(t - 30), z(t + 30), z(t - 60)]); },
      r => { const g = tam(r, 3, 6), h = tam(r, 2, 5), t = h * 7 + g;
        return coktan(p(`${ad(r)} yaz tatilinde ${h} hafta ${g} gün köyde kaldı.`), 'Köyde toplam kaç gün kalmıştır?', String(t), yanN(t, [h * 5 + g, h + g, t + 7, h * 7])); },
      r => { const d = tam(r, 125, 230), s = Math.floor(d / 60), k = d % 60;
        return coktan(p(`Bir film ${d} dakika sürüyor.`), 'Film kaç saat kaç dakika sürer?', `${s} saat ${k} dakika`, [`${s + 1} saat ${k} dakika`, `${Math.floor(d / 100)} saat ${d % 100} dakika`, `${s} saat ${(k + 20) % 60} dakika`]); },
      r => { const y = tam(r, 2, 4), a = tam(r, 2, 10), t = y * 12 + a;
        return coktan(p(`Bir ağaç fidanı dikildikten ${y} yıl ${a} ay sonra ilk meyvesini verdi.`), 'Fidan kaç ay sonra meyve vermiştir?', String(t), yanN(t, [y * 10 + a, y + a, t + 12, y * 12])); },
      r => { const d = tam(r, 2, 4), s = tam(r, 3, 12), t = d * 24 + s;
        return coktan(p(`Bir gemi yolculuğu ${d} gün ${s} saat sürdü.`), 'Yolculuk toplam kaç saat sürmüştür?', String(t), yanN(t, [d * 12 + s, d + s, t + 24, d * 60 + s])); },
      r => { const g = tam(r, 2, 4) * 7 + tam(r, 1, 6), h = Math.floor(g / 7), k = g % 7;
        return coktan(p(`Bir okul projesi ${g} gün sürdü.`), 'Proje kaç hafta kaç gün sürmüştür?', `${h} hafta ${k} gün`, [`${h + 1} hafta ${k} gün`, `${Math.floor(g / 10)} hafta ${g % 10} gün`, `${h} hafta ${(k + 2) % 7} gün`]); },
    ],
    ort: r => { const b = tam(r, 2, 4), d1 = sec1(r, [35, 40, 45]), m = tam(r, 10, 15);
      return { ic: p(`Bir okulda her ders ${d1} dakika, her teneffüs ${m} dakika sürüyor. Öğrenciler sabah art arda ${b} ders işliyor, dersler arasında teneffüs yapılıyor.`),
        q: [() => coktan('', `${b} dersin toplam süresi kaç dakikadır?`, String(b * d1), yanN(b * d1, [b * d1 + m, b * (d1 + m), d1 + b, b * 60])),
          () => coktan('', 'Birinci dersin başlangıcından son dersin bitişine kadar kaç dakika geçer?', String(b * d1 + (b - 1) * m), yanN(b * d1 + (b - 1) * m, [b * (d1 + m), b * d1, b * d1 + (b - 1) * m + 10, (b - 1) * d1 + b * m]))] }; },
  };
  // 8) Veri: sütun grafiği, tablo, şekil grafiği
  KONU.veri = {
    gir: 'Öğrenciler sınıfta yapılan anketin sonuçlarını inceliyor.',
    st: r => { const et = ['Kedi', 'Köpek', 'Kuş', 'Balık'], de = fark(r, et.length, 2, 12), t = de.reduce((a, b) => a + b, 0), mx = et[de.indexOf(Math.max(...de))];
      return [ifade(r, v => `Ankete toplam ${v} öğrenci katılmıştır (veriler: ${et.map((e, i) => e + ' ' + de[i]).join(', ')}).`, t, t + 2),
        ifade(r, v => `Bu ankette en çok ${v} seçilmiştir.`, mx, et.find(e => e !== mx)),
        ifade(r, v => `Sütun grafiğinde sütunun ${v}, o seçeneği seçen kişi sayısını gösterir.`, 'yüksekliği', 'rengi'),
        ifade(r, v => `Bir sınıftaki öğrencilerin boyları ${v} bir veridir.`, 'ölçülerek toplanan', 'yalnızca tahmin edilen'),
        ifade(r, v => `Çetele tablosunda her ${v} çizgi bir demet oluşturur.`, 5, 10)]; },
    es: r => [['Çetele tablosu', 'Verileri çizgilerle sayma'], ['Sıklık tablosu', 'Verileri sayılarla gösterme'], ['Sütun grafiği', 'Verileri sütun yükseklikleriyle gösterme'], ['Anket', 'Soru sorarak veri toplama']],
    sr: r => ({ giris: 'Bir sınıf "En sevdiğimiz meyve" araştırması yapıyor. Araştırmanın adımları karışık verilmiştir.', adim: ['Araştırma sorusunu belirlemek', 'Anketle veri toplamak', 'Verileri çetele ve sıklık tablosuna yazmak', 'Sütun grafiği çizmek', 'Grafiği yorumlayıp karar vermek'], kok: 'Adımların doğru sıralanışı hangisidir?' }),
    cq: [
      r => { const et = ['Futbol', 'Voleybol', 'Basketbol', 'Yüzme'], de = et.map(() => tam(r, 3, 12) * 2), mx = Math.max(...de), mn = Math.min(...de), fk = mx - mn;
        return coktan(p('Okulda öğrencilerin en sevdiği sporlar araştırıldı.') + grafik('En sevilen spor', et, de, 'Öğrenci'), 'En çok ve en az seçilen sporu seçen öğrenci sayıları farkı kaçtır?', String(fk), yanN(fk, [mx, mn, fk + 2, mx + mn])); },
      r => { const et = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum'], de = et.map(() => tam(r, 2, 9) * 5), t = de.reduce((a, b) => a + b, 0);
        return coktan(p('Bir kütüphaneden bir hafta boyunca ödünç alınan kitap sayıları grafikte gösterilmiştir.') + grafik('Ödünç alınan kitap', et, de, 'Kitap', '#12b886'), 'Hafta boyunca toplam kaç kitap ödünç alınmıştır?', String(t), yanN(t, [t + 5, t - 10, Math.max(...de) * 5, t + 10])); },
      r => { const et = ['Elma', 'Muz', 'Çilek'], de = fark(r, et.length, 4, 12), mx = et[de.indexOf(Math.max(...de))];
        if (new Set(de).size < 3) de[2] = de[0] + de[1];
        const mxx = et[de.indexOf(Math.max(...de))];
        return coktan(p('Sınıfta en sevilen meyve araştırması yapıldı ve sonuçlar sıklık tablosuna yazıldı.') + tablo(['Meyve', 'Öğrenci sayısı'], et.map((e, i) => [e, de[i]])), 'Sınıf gezisine tek çeşit meyve götürülecekse en çok öğrenciyi memnun etmek için hangisi seçilmelidir?', mxx, et.filter(e => e !== mxx).concat(['Hepsinden eşit miktarda'])); },
      r => { const s = tam(r, 3, 8) * 2, b = s / 2, et = ['Pazartesi', 'Salı', 'Çarşamba'], de = fark(r, et.length, 2, 6), t = de.reduce((a, c) => a + c, 0) * s;
        return coktan(p(`Bir şekil grafiğinde her ☀ sembolü ${s} öğrenciyi gösteriyor. Üç günde gelen sembol sayıları: ${et.map((e, i) => e + ' ' + de[i]).join(', ')}.`), 'Üç günde toplam kaç öğrenci gösterilmiştir?', String(t), yanN(t, [t / s, t + s, t - b, de.reduce((a, c) => a + c, 0) * b])); },
      r => { const l = ['||||| ||', '||||| ||||| |', '||||| ||||', '|||'], n = [7, 11, 9, 3], et = ['Mavi', 'Kırmızı', 'Yeşil', 'Sarı'], mx = et[1];
        return coktan(p('Sınıfın en sevdiği renkler çetele tablosuyla kaydedildi.') + tablo(['Renk', 'Çetele'], et.map((e, i) => [e, l[i]])), 'Kırmızıyı seçenler sarıyı seçenlerden kaç kişi fazladır?', String(n[1] - n[3]), yanN(n[1] - n[3], [n[1], n[3], n[1] - n[0], 7])); },
      r => { const de = [tam(r, 4, 9), tam(r, 4, 9), tam(r, 4, 9)], t = de.reduce((a, b) => a + b, 0);
        return coktan(p('Bir anket sonucunda sıklık tablosu oluşturuldu.') + tablo(['Ulaşım', 'Kişi'], [['Yürüyerek', de[0]], ['Servisle', de[1]], ['Bisikletle', de[2]]]), 'Ankete kaç kişi katılmıştır?', String(t), yanN(t, [t + 1, t - 2, Math.max(...de) * 3, t + 3])); },
    ],
    ort: r => { const et = ['Kitap', 'Spor', 'Müzik', 'Resim'], de = fark(r, et.length, 3, 10), t = de.reduce((a, b) => a + b, 0), i = de.indexOf(Math.min(...de));
      return { ic: p('4-B sınıfındaki her öğrenci bir kulübe katıldı. Kulüplere katılan öğrenci sayıları grafikte verilmiştir.') + grafik('Kulüpler', et, de, 'Öğrenci', '#8b5cf6'),
        q: [() => coktan('', 'Sınıfta kaç öğrenci vardır?', String(t), yanN(t, [t + 1, t - 2, Math.max(...de) * 4, t + 3])),
          () => coktan('', 'En az öğrencinin katıldığı kulüp hangisidir?', et[i], et.filter((_, j) => j !== i))] }; },
  };
  // 9) Geometrik şekiller ve cisimler
  const sekilSvg = (n, renk = '#d9f0ff') => { const pt = Array.from({ length: n }, (_, k) => { const a = k * 2 * Math.PI / n - Math.PI / 2; return `${(30 + 24 * Math.cos(a)).toFixed(1)},${(30 + 24 * Math.sin(a)).toFixed(1)}`; }).join(' '); return S(60, 60, `<polygon points="${pt}" fill="${renk}" stroke="#1f2a24" stroke-width="2"/>`, 14); };
  KONU.sekil = {
    gir: 'Öğretmen tahtaya geometrik şekil ve cisimlerle ilgili bilgiler yazdı.',
    st: r => [ifade(r, v => `Karenin ${v} kenarı vardır.`, 4, 3), ifade(r, v => `Üçgenin ${v} köşesi vardır.`, 3, 4), ifade(r, v => `Küpün ${v} yüzü vardır.`, 6, 8),
      ifade(r, v => `Dikdörtgenin karşılıklı kenarlarının uzunlukları ${v}.`, 'eşittir', 'farklıdır'), ifade(r, v => `Küpün ${v} köşesi vardır.`, 8, 6),
      ifade(r, v => `Kare ve dikdörtgenin bütün açıları ${v} açıdır.`, 'dik', 'dar'), ifade(r, v => `Beşgenin ${v} kenarı vardır.`, 5, 6)],
    es: r => [['Kare prizma', 'Yüzlerinin ikisi kare'], ['Küp', 'Bütün yüzleri eş kare'], ['Üçgen prizma', 'İki yüzü üçgen'], ['Silindir', 'İki yüzü daire']],
    sr: r => ({ giris: 'Kartlarda çokgen adları yazılıdır.', adim: ['Üçgen', 'Dörtgen', 'Beşgen', 'Altıgen'], kok: 'Kenar sayısı azdan çoğa doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const n = [3, 4, 5, 6], k = kar(r, n), t = k.reduce((a, b) => a + b, 0);
        return coktan(p(`${ad(r)} çubuklarla aşağıdaki şekilleri yaptı. Her kenar için bir çubuk kullandı.`) + `<div class="m4-sekil">${k.map(x => sekilSvg(x)).join('')}</div>`, 'Toplam kaç çubuk kullanmıştır?', String(t), yanN(t, [t + 1, t - 2, 16, t + 4])); },
      r => coktan(p(`${ad(r)} bir kutunun bütün yüzlerini kaplamak için eş kareler kesti. Kutu bir küptür.`), 'Kaç kare kesmesi gerekir?', '6', ['4', '8', '12']),
      r => coktan(p('Bir cismin 2 yüzü kare, 4 yüzü dikdörtgendir.'), 'Bu cisim aşağıdakilerden hangisidir?', 'Kare prizma', ['Küp', 'Üçgen prizma', 'Silindir']),
      r => coktan(p('Bir cismin 6 yüzü, 8 köşesi ve 12 ayrıtı vardır. Bütün yüzleri eş karedir.'), 'Bu cisim hangisidir?', 'Küp', ['Kare prizma', 'Üçgen prizma', 'Silindir']),
      r => { const n = sec1(r, [5, 6, 8]), adlar = { 5: 'Beşgen', 6: 'Altıgen', 8: 'Sekizgen' };
        return coktan(p(`${ad(r)} aşağıdaki şeklin köşelerini saydı.`) + `<div class="m4-sekil">${sekilSvg(n, '#fff3c4')}</div>`, 'Bu şeklin adı nedir?', adlar[n], Object.values(adlar).filter(x => x !== adlar[n]).concat(['Dörtgen'])); },
      r => coktan(p('Bir dörtgenin dört kenarı eşit uzunlukta ve dört açısı dik açıdır.'), 'Bu dörtgen hangisidir?', 'Kare', ['Dikdörtgen', 'Beşgen', 'Üçgen']),
    ],
    ort: r => ({ ic: p('Bir öğrenci kibrit çöpleriyle yan yana 3 eş kare yaptı. Ortak kenarlarda tek çöp kullandı.') + S(130, 40, [0, 1, 2].map(i => `<rect x="${5 + i * 40}" y="5" width="40" height="30" fill="#fff6dc" stroke="#8e5b2b" stroke-width="3"/>`).join(''), 40),
      q: [() => coktan('', 'Kaç kibrit çöpü kullanmıştır?', '10', ['12', '9', '11']), () => coktan('', 'Aynı kuralla 5 kare yaparsa kaç çöp kullanır?', '16', ['20', '15', '18'])] }),
  };
  // 10) Geometride temel kavramlar: doğru, ışın, doğru parçası, açı türleri
  const aciSvg = d => { const x = 30 + 26 * Math.cos(-d * Math.PI / 180), y = 40 + 26 * Math.sin(-d * Math.PI / 180); return S(60, 46, `<line x1="30" y1="40" x2="58" y2="40" stroke="#1f2a24" stroke-width="2"/><line x1="30" y1="40" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#1f2a24" stroke-width="2"/><path d="M38 40 A8 8 0 0 0 ${(30 + 8 * Math.cos(-d * Math.PI / 180)).toFixed(1)} ${(40 + 8 * Math.sin(-d * Math.PI / 180)).toFixed(1)}" fill="none" stroke="#e63946" stroke-width="1.5"/>`, 26); };
  const aciTur = d => d < 90 ? 'Dar açı' : d === 90 ? 'Dik açı' : 'Geniş açı';
  KONU.kavram = {
    gir: 'Öğretmen tahtaya geometrinin temel kavramlarıyla ilgili bilgiler yazdı.',
    st: r => [ifade(r, v => `Doğru ${v} uzar.`, 'iki yönde sınırsız', 'tek yönde sınırsız'), ifade(r, v => `Işının ${v} başlangıç noktası vardır.`, 'bir', 'iki'),
      ifade(r, v => `Doğru parçasının ${v} uç noktası vardır.`, 'iki', 'bir'), ifade(r, v => `Ölçüsü 90 dereceden küçük olan açıya ${v} denir.`, 'dar açı', 'geniş açı'),
      ifade(r, v => `Kare köşesi ${v} oluşturur.`, 'dik açı', 'dar açı'), ifade(r, v => `Ölçüsü 90 dereceden büyük olan açıya ${v} denir.`, 'geniş açı', 'dik açı')],
    es: r => [['Doğru', 'İki yönde sınırsız uzar'], ['Işın', 'Bir yönde sınırsız uzar'], ['Doğru parçası', 'İki ucu da bellidir'], ['Nokta', 'Boyutu yoktur, yer belirtir']],
    sr: r => ({ giris: 'Kartlarda açıların ölçüleri yazılıdır.', adim: ['35°', '70°', '90°', '120°', '150°'].slice(0, 4), kok: 'Açılar küçükten büyüğe doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const l = kar(r, [40, 90, 130, 60, 150, 90]).slice(0, 4); const dar = l.filter(d => d < 90).length;
        return coktan(p(`${ad(r)} defterine aşağıdaki açıları çizdi.`) + `<div class="m4-sekil">${l.map(aciSvg).join('')}</div>`, 'Bu açılardan kaç tanesi dar açıdır?', String(dar), yanN(dar, [0, 1, 2, 3, 4])); },
      r => { const d = sec1(r, [30, 60, 120, 145, 90]); return coktan(p('Saatteki akrep ve yelkovan arasında oluşan açı aşağıdaki gibidir.') + aciSvg(d), 'Bu açı hangi türdendir?', aciTur(d), ['Dar açı', 'Dik açı', 'Geniş açı'].filter(x => x !== aciTur(d)).concat(['Doğru açı'])); },
      r => coktan(p('Ali bir noktadan başlayıp bir yönde sonsuza kadar uzayan bir çizgi çizdi.'), 'Ali\'nin çizdiği hangisidir?', 'Işın', ['Doğru', 'Doğru parçası', 'Açı']),
      r => coktan(p('Bir öğrenci cetvelle iki noktayı birleştiren bir çizgi çizdi. Çizginin iki ucu da bellidir.'), 'Öğrencinin çizdiği hangisidir?', 'Doğru parçası', ['Doğru', 'Işın', 'Açı']),
      r => { const l = [30, 90, 120, 160, 75, 90], g = l.filter(d => d > 90).length;
        return coktan(p('Öğretmen tahtaya ölçüleri 30°, 90°, 120°, 160°, 75° ve 90° olan altı açı çizdi.'), 'Bu açılardan kaç tanesi geniş açıdır?', String(g), yanN(g, [1, 2, 3, 4])); },
      r => { const d = sec1(r, [3, 9]); return coktan(p(`Saat ${d}.00'da akrep ile yelkovan arasında bir açı oluşuyor.`.replace(`${d}.00'da`, `tam ${d}.00 olduğunda`)), 'Bu açı hangi türdendir?', 'Dik açı', ['Dar açı', 'Geniş açı', 'Açı oluşmaz']); },
    ],
    ort: r => ({ ic: p('Saat 3.00\'te akrep ile yelkovan arasında bir açı oluşur. Saat 1.00\'de ve 5.00\'te de açılar oluşur.'),
      q: [() => coktan('', 'Saat 3.00\'teki açı hangi türdendir?', 'Dik açı', ['Dar açı', 'Geniş açı', 'Açı oluşmaz']), () => coktan('', 'Saat 5.00\'teki açı hangi türdendir?', 'Geniş açı', ['Dar açı', 'Dik açı', 'Açı oluşmaz'])] }),
  };
  // 10b) Açının elemanları, adlandırma (∠), düzlem, standart olmayan birimle açı ölçme (M.4.2.3.1-3)
  const aciAdli = (d, [a, b, c]) => { const r1 = 58, x = 20 + r1 * Math.cos(-d * Math.PI / 180), y = 72 + r1 * Math.sin(-d * Math.PI / 180);
    return S(110, 88, `<line x1="20" y1="72" x2="100" y2="72" stroke="#1f2a24" stroke-width="2"/><line x1="20" y1="72" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#1f2a24" stroke-width="2"/>` + [[20, 72, b], [100, 72, c], [x, y, a]].map(([px, py, t]) => `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="2.5" fill="#e63946"/><text x="${(px - 3).toFixed(1)}" y="${(py + (py > 70 ? 12 : -4)).toFixed(1)}" font-size="10">${t}</text>`).join(''), 34); };
  KONU.aci = {
    gir: 'Öğretmen tahtaya açılarla ilgili bilgiler yazdı.',
    st: r => [ifade(r, v => `Açıyı oluşturan ışınlara açının ${v} denir.`, 'kolları', 'köşesi'), ifade(r, v => `İki kolun başladığı ortak noktaya açının ${v} denir.`, 'köşesi', 'kolu'),
      ifade(r, v => `ABC açısında açının köşesi ${v} noktasıdır.`, 'B', 'A'), ifade(r, v => `Açı ${v} sembolüyle gösterilir.`, '∠', '△'),
      ifade(r, v => `Düzlem, her yönde ${v} uzanan düz bir yüzeydir.`, 'sınırsız', 'sınırlı'), ifade(r, v => `Bir açının büyüklüğü kollarının ${v}.`, 'uzunluğuna bağlı değildir', 'uzunluğuna bağlıdır')],
    es: r => [['Açının kolları', 'Açıyı oluşturan iki ışın'], ['Açının köşesi', 'Kolların başladığı nokta'], ['∠ sembolü', 'Açıyı gösterir'], ['Düzlem', 'Her yönde uzanan düz yüzey']],
    sr: r => { const l = kar(r, [['K', 2], ['L', 3], ['M', 5], ['N', 6]]).map(([a]) => a); const n = { K: 2, L: 3, M: 5, N: 6 }; return { giris: `Dört açının içine aynı büyüklükteki birim açılar yerleştirildi: ∠${l[0]} içine ${n[l[0]]}, ∠${l[1]} içine ${n[l[1]]}, ∠${l[2]} içine ${n[l[2]]}, ∠${l[3]} içine ${n[l[3]]} birim açı sığdı.`, adim: ['K', 'L', 'M', 'N'].map(x => `∠${x}`), kok: 'Açılar küçükten büyüğe doğru hangi sırayla dizilir?' }; },
    cq: [
      r => { const [a, b, c] = sec1(r, [['A', 'B', 'C'], ['D', 'E', 'F'], ['K', 'L', 'M']]); return coktan(p(`${ad(r)} defterine bir açı çizip noktalarına harf verdi.`) + aciAdli(sec1(r, [40, 65, 110]), [a, b, c]), 'Bu açının köşesi hangi noktadır?', b, [a, c, 'Köşesi yoktur']); },
      r => { const [a, b, c] = sec1(r, [['A', 'B', 'C'], ['P', 'R', 'S'], ['K', 'L', 'M']]); return coktan(p('Öğretmen tahtaya bir açı çizdi.') + aciAdli(sec1(r, [50, 75, 125]), [a, b, c]), 'Bu açı nasıl adlandırılır?', `∠${a}${b}${c}`, [`∠${b}${a}${c}`, `∠${a}${c}${b}`, `∠${c}${a}${b}`]); },
      r => { const k = tam(r, 3, 5); return coktan(p(`Ece bir açıyı küçük kâğıt açılarla ölçtü: açının içine ${2 * k} tane sığdı. Can aynı açıyı iki katı büyüklüğündeki kâğıt açılarla ölçtü.`), 'Can\'ın ölçümünde açının içine kaç birim sığar?', String(k), yanN(k, [2 * k, 4 * k, k + 1, k - 1])); },
      r => { const a = tam(r, 3, 5), b = a + tam(r, 1, 3); return coktan(p(`Aynı birim açıyla ölçüldüğünde ∠A açısının içine ${a}, ∠B açısının içine ${b} birim açı sığıyor.`), 'Bu ölçümlere göre hangisi doğrudur?', '∠B, ∠A\'dan büyüktür.', ['∠A, ∠B\'den büyüktür.', 'İki açı eşittir.', 'Birim açı farklı olduğu için karşılaştırılamaz.']); },
      r => coktan(p('Ali çevresindeki yüzeylerden düzleme örnek arıyor.'), 'Aşağıdakilerden hangisi düzlemin bir parçasına örnektir?', 'Masanın üst yüzeyi', ['Futbol topu', 'Bir kalem', 'Su bardağının içi']),
      r => coktan(p('Bir öğrenci saat kadranında akrep ile yelkovanın oluşturduğu açıyı inceliyor.'), 'Akrep ve yelkovan bu açının hangi elemanlarıdır?', 'Kolları', ['Köşesi', 'Ölçüsü', 'Düzlemi']),
    ],
    ort: r => { const k = tam(r, 3, 5); return { ic: p(`Bir açının içine birim açılardan ${k * 2} tane sığıyor. Aynı açı, iki katı büyüklüğünde birim açılarla yeniden ölçülecek.`),
      q: [() => coktan('', 'Büyük birim açılarla ölçülünce kaç birim sığar?', String(k), yanN(k, [k * 4, k * 2, k + 1, k - 1])), () => coktan('', 'İki ölçümde de değişmeyen nedir?', 'Açının büyüklüğü', ['Birim açı sayısı', 'Birim açının büyüklüğü', 'Hiçbiri değişmez'])] }; },
  };
  // 11) Uzamsal ilişkiler: simetri, öteleme
  KONU.uzamsal = {
    gir: 'Öğretmen tahtaya simetri ve ötelemeyle ilgili bilgiler yazdı.',
    st: r => [ifade(r, v => `Bir şekil simetri doğrusuna göre katlandığında iki parça ${v}.`, 'üst üste gelir', 'farklı kalır'), ifade(r, v => `Karenin ${v} simetri doğrusu vardır.`, 4, 2),
      ifade(r, v => `Dikdörtgenin ${v} simetri doğrusu vardır.`, 2, 4), ifade(r, v => `Öteleme yapılan şeklin biçimi ve boyutu ${v}.`, 'değişmez', 'değişir'),
      ifade(r, v => `"A" harfinin ${v} simetri doğrusu vardır.`, 'bir', 'iki')],
    es: r => [['Kare', '4 simetri doğrusu'], ['Dikdörtgen', '2 simetri doğrusu'], ['Eşkenar üçgen', '3 simetri doğrusu'], ['İkizkenar üçgen', '1 simetri doğrusu']],
    sr: r => ({ giris: 'Kartlarda şekiller yazılıdır.', adim: ['İkizkenar üçgen', 'Dikdörtgen', 'Eşkenar üçgen', 'Kare'], kok: 'Şekiller simetri doğrusu sayısı azdan çoğa doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const x = tam(r, 1, 3), y = tam(r, 1, 3), sa = tam(r, 2, 4), yu = tam(r, 1, 3);
        let s = ''; for (let i = 0; i <= 8; i++) s += `<line x1="${i * 15}" y1="0" x2="${i * 15}" y2="90" stroke="#cfe0ff"/>`; for (let j = 0; j <= 6; j++) s += `<line x1="0" y1="${j * 15}" x2="120" y2="${j * 15}" stroke="#cfe0ff"/>`;
        s += `<rect x="${x * 15}" y="${(6 - y) * 15 - 15}" width="15" height="15" fill="#f4a100"/>`;
        return coktan(p(`Turuncu kare önce ${sa} birim sağa, sonra ${yu} birim yukarı ötelenecek.`) + S(120, 90, s, 40), 'Kare başlangıç yerine göre kaç birim yer değiştirmiştir (yatay + dikey)?', String(sa + yu), yanN(sa + yu, [sa, yu, sa * yu, sa + yu + 1])); },
      r => coktan(p('Bir öğrenci kâğıdı ortadan katlayıp kesti ve açtığında bir kalp şekli elde etti.'), 'Katlama çizgisi kalbin neyidir?', 'Simetri doğrusu', ['Köşegeni', 'Çevresi', 'Kenarı']),
      r => coktan(p('Harfler büyük harfle yazılıyor: A, B, C, F'), 'Bu harflerden hangisinin dikey simetri doğrusu vardır?', 'A', ['B', 'C', 'F']),
      r => coktan(p('Bir eşkenar üçgen ile bir ikizkenar üçgenin simetri doğruları çiziliyor.'), 'İki şekilde toplam kaç simetri doğrusu vardır?', '4', ['3', '6', '2']),
      r => coktan(p('Bir şekil önce 3 birim sola, sonra 3 birim sağa ötelendi.'), 'Şeklin son yeri için ne söylenebilir?', 'Başladığı yere döner', ['6 birim sağdadır', '3 birim soldadır', 'Şeklin boyutu küçülür']),
      r => coktan(p('Bir kâğıda çizilen kare, sağa doğru 4 birim ötelendi.'), 'Ötelenen karenin hangi özelliği değişmiştir?', 'Bulunduğu yer', ['Kenar uzunluğu', 'Açıları', 'Biçimi']),
    ],
    ort: r => ({ ic: p('Bir karenin bütün simetri doğruları çiziliyor. Sonra aynı işlem bir dikdörtgen için yapılıyor.'),
      q: [() => coktan('', 'Karede kaç simetri doğrusu çizilir?', '4', ['2', '1', '6']), () => coktan('', 'İki şekilde toplam kaç simetri doğrusu çizilir?', '6', ['8', '4', '5'])] }),
  };
  // 12) Uzunluk ölçme (km, m, cm, mm)
  KONU.uzunluk = {
    gir: 'Öğretmen tahtaya uzunluk ölçüleriyle ilgili bilgiler yazdı.',
    st: r => { const k = tam(r, 2, 9), m = tam(r, 2, 9), c = tam(r, 2, 9);
      return [ifade(r, v => `${k} km ${f(v)} metredir.`, k * 1000, k * 100), ifade(r, v => `${m} m ${v} santimetredir.`, m * 100, m * 10), ifade(r, v => `${c} cm ${v} milimetredir.`, c * 10, c * 100),
        ifade(r, v => `İki şehir arasındaki uzaklık en uygun ${v} ile ölçülür.`, 'kilometre', 'santimetre'), ifade(r, v => `Bir silginin boyu en uygun ${v} ile ölçülür.`, 'santimetre', 'kilometre')]; },
    es: r => { const a = tam(r, 2, 5), b = tam(r, 2, 6), c = tam(r, 3, 9), d = tam(r, 11, 19); return [[`${a} km`, `${f(a * 1000)} m`], [`${b} m`, `${b * 100} cm`], [`${c} cm`, `${c * 10} mm`], [`${d}0 mm`, `${d} cm`]]; },
    sr: r => ({ giris: 'Kartlarda uzunluklar yazılıdır.', adim: ['80 cm', '1 m 20 cm', '150 cm', '2 m'], kok: 'Uzunluklar kısadan uzuna doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const a = tam(r, 2, 4) * 1000 + tam(r, 1, 9) * 100, b = tam(r, 1, 2) * 1000 + tam(r, 1, 9) * 100, t = a + b;
        return coktan(p(`${ad(r)} sabah ${f(a)} metre, akşam ${f(b)} metre yürüdü.`), 'Toplam kaç kilometre kaç metre yürümüştür?', `${Math.floor(t / 1000)} km ${t % 1000} m`, [`${Math.floor(t / 1000) + 1} km ${t % 1000} m`, `${Math.floor(t / 100)} km ${t % 100} m`, `${Math.floor(t / 1000)} km ${(t % 1000 + 100) % 1000} m`]); },
      r => { const k = tam(r, 3, 8), p1 = tam(r, 25, 45), t = k * 100 - p1 * 2;
        return coktan(p(`${k} metre uzunluğundaki bir kurdeleden ${p1}'er santimetrelik iki parça kesildi.`.replace(`${p1}'er`, `${p1} santimetre uzunluğunda`).replace(' santimetrelik', '')), 'Kurdelenin kalan kısmı kaç santimetredir?', String(t), yanN(t, [k * 100 - p1, k * 10 - 2 * p1, t + 100, k * 100])); },
      r => { const c = tam(r, 3, 9), mm = c * 10 + tam(r, 1, 9);
        return coktan(p(`Bir böceğin boyu cetvelle ölçüldüğünde ${c} cm ${mm - c * 10} mm geldi.`), 'Böceğin boyu kaç milimetredir?', String(mm), yanN(mm, [c + mm - c * 10, c * 100 + mm - c * 10, mm + 10, c * 10])); },
      r => { const m = tam(r, 2, 6), c = tam(r, 10, 90), t = m * 100 + c;
        return coktan(p(`Bir masanın uzunluğu ${m} m ${c} cm olarak ölçüldü.`), 'Masanın uzunluğu kaç santimetredir?', String(t), yanN(t, [m * 10 + c, m + c, t + 100, m * 1000 + c])); },
      r => { const a = tam(r, 5, 9) * 100, n = tam(r, 3, 6), t = a * n;
        return coktan(p(`${ad(r)} her gün okula gidip gelirken toplam ${a} metre yürüyor.`), `${n} günde toplam kaç metre yürür?`, f(t), yanN(t, [a + n, t + a, t - 100, a * 10])); },
      r => { const k = tam(r, 2, 5), m = tam(r, 1, 9) * 100, t = k * 1000 + m;
        return coktan(p(`Okul ile stadyum arası ${k} km ${m} m'dir.`.replace(`${m} m'dir`, `${m} metredir`)), 'Bu uzaklık kaç metredir?', f(t), yanN(t, [k * 100 + m, k + m, t + 1000, k * 1000])); },
    ],
    ort: r => { const a = tam(r, 12, 25) * 100, b = tam(r, 8, 18) * 100, c = tam(r, 5, 12) * 100, t = a + b + c;
      return { ic: p(`Bir bisiklet yolu üç bölümden oluşuyor: Birinci bölüm ${f(a)} m, ikinci bölüm ${f(b)} m, üçüncü bölüm ${f(c)} m.`),
        q: [() => coktan('', 'Yolun tamamı kaç metredir?', f(t), yanN(t, [a + b, t + 100, t - 1000, b + c])), () => coktan('', 'Yolun tamamı yaklaşık kaç kilometredir? (En yakın kilometreye yuvarlayınız.)', String(Math.round(t / 1000)), yanN(Math.round(t / 1000), [Math.floor(t / 1000) === Math.round(t / 1000) ? Math.round(t / 1000) + 1 : Math.floor(t / 1000), t / 100, Math.round(t / 1000) + 2, 1]))] }; },
  };
  // 13) Çevre ölçme
  const dikSvg = (a, b, ea, eb) => S(120, 70, `<rect x="10" y="10" width="${Math.min(100, a * 8)}" height="${Math.min(45, b * 8)}" fill="#d8f5e9" stroke="#1f2a24" stroke-width="2"/><text x="${10 + Math.min(100, a * 8) / 2}" y="8" font-size="9" text-anchor="middle">${ea}</text><text x="${14 + Math.min(100, a * 8)}" y="${12 + Math.min(45, b * 8) / 2}" font-size="9">${eb}</text>`, 38);
  KONU.cevre = {
    gir: 'Öğretmen tahtaya çevre uzunluğuyla ilgili bilgiler yazdı.',
    st: r => { const a = tam(r, 3, 12), b = tam(r, 2, 9);
      return [ifade(r, v => `Bir kenarı ${a} cm olan karenin çevresi ${v} cm olur.`, 4 * a, a * a === 4 * a ? 4 * a + 2 : a * a), ifade(r, v => `Kenarları ${a} cm ve ${b} cm olan dikdörtgenin çevresi ${v} cm olur.`, 2 * (a + b), a + b),
        ifade(r, v => `Bir şeklin çevresi, bütün kenar uzunluklarının ${v} bulunur.`, 'toplanmasıyla', 'çarpılmasıyla'), ifade(r, v => `Kenarları ${a}, ${a} ve ${a} cm olan üçgenin çevresi ${v} cm olur.`, 3 * a, 2 * a)]; },
    es: r => [['Kenarı 3 cm olan kare', '12 cm'], ['Kenarı 5 cm olan kare', '20 cm'], ['Kenarları 6 cm ve 2 cm olan dikdörtgen', '16 cm'], ['Kenarları 7 cm ve 4 cm olan dikdörtgen', '22 cm']],
    sr: r => ({ giris: 'Kartlarda şekiller ve kenar uzunlukları yazılıdır.', adim: ['Kenarı 2 cm olan kare', 'Kenarları 3 cm ve 2 cm olan dikdörtgen', 'Kenarı 4 cm olan kare', 'Kenarları 6 cm ve 5 cm olan dikdörtgen'], kok: 'Şekiller çevre uzunluğu azdan çoğa doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const a = tam(r, 12, 30), b = tam(r, 8, 20), c = 2 * (a + b);
        return coktan(p(`Dikdörtgen şeklindeki bir bahçenin uzun kenarı ${a} m, kısa kenarı ${b} m'dir. Bahçenin çevresine tel çekilecek.`.replace(`${b} m'dir`, `${b} metredir`)) + dikSvg(a, b, a + ' m', b + ' m'), 'Kaç metre tel gerekir?', String(c), yanN(c, [a + b, a * b, c + a, 2 * a + b])); },
      r => { const k = tam(r, 6, 15), c = 4 * k;
        return coktan(p(`Çevresi ${c} cm olan bir kare çiziliyor.`), 'Karenin bir kenarı kaç santimetredir?', String(k), yanN(k, [c / 2, k + 4, c - 4, k * 2])); },
      r => { const a = tam(r, 8, 16), c = 2 * (a + tam(r, 4, a - 2)), b = c / 2 - a;
        return coktan(p(`Çevresi ${c} cm olan bir dikdörtgenin uzun kenarı ${a} cm'dir.`.replace(`${a} cm'dir`, `${a} santimetredir`)), 'Kısa kenarı kaç santimetredir?', String(b), yanN(b, [c - a, c / 2, b + 2, c - 2 * a])); },
      r => { const a = tam(r, 3, 9);
        return coktan(p(`Kenar uzunlukları ${a} cm, ${a + 2} cm ve ${a + 4} cm olan bir üçgen çizildi.`), 'Üçgenin çevresi kaç santimetredir?', String(3 * a + 6), yanN(3 * a + 6, [3 * a, a + 4, 3 * a + 4, 2 * a + 6])); },
      r => { const k = tam(r, 15, 30), n = tam(r, 2, 4), c = 4 * k * n;
        return coktan(p(`Kare şeklindeki bir parkın bir kenarı ${k} metredir. ${ad(r)} parkın çevresinde ${n} tur koştu.`), 'Kaç metre koşmuştur?', String(c), yanN(c, [4 * k, k * n, c + k, 2 * k * n])); },
      r => { const a = tam(r, 4, 9), b = tam(r, 2, a - 1); return coktan(p(`Kenarları ${a} cm ve ${b} cm olan dikdörtgenin her kenarı 1 cm uzatıldı.`), 'Yeni dikdörtgenin çevresi kaç santimetredir?', String(2 * (a + b) + 4), yanN(2 * (a + b) + 4, [2 * (a + b), 2 * (a + b) + 2, (a + 1) * (b + 1), 2 * (a + b) + 8])); },
    ],
    ort: r => { const k = tam(r, 5, 9);
      return { ic: p(`Bir kenarı ${k} cm olan iki eş kare yan yana birleştirilerek bir dikdörtgen oluşturuldu.`),
        q: [() => coktan('', 'Bir karenin çevresi kaç santimetredir?', String(4 * k), yanN(4 * k, [2 * k, 6 * k, 8 * k, k * k])), () => coktan('', 'Oluşan dikdörtgenin çevresi kaç santimetredir?', String(6 * k), yanN(6 * k, [8 * k, 4 * k, 5 * k, 3 * k]))] }; },
  };
  // 14) Alan ölçme (birim kare)
  const izgara = (en, boy, dolu) => { let s = ''; for (let j = 0; j < boy; j++) for (let i = 0; i < en; i++) s += `<rect x="${i * 12}" y="${j * 12}" width="12" height="12" fill="${dolu(i, j) ? '#ffd23f' : '#fff'}" stroke="#9db4c8"/>`; return S(en * 12, boy * 12, s, Math.min(60, en * 6)); };
  KONU.alan = {
    gir: 'Öğretmen tahtaya alan ölçmeyle ilgili bilgiler yazdı.',
    st: r => { const a = tam(r, 3, 8), b = tam(r, 2, 6);
      return [ifade(r, v => `${a} sıra ve her sırada ${b} birim kare olan şeklin alanı ${v} birim karedir.`, a * b, 2 * (a + b)), ifade(r, v => `Alan, bir yüzeyin ${v} ölçüsüdür.`, 'kapladığı yerin', 'kenarlarının toplamının'),
        ifade(r, v => `Alanları eşit olan iki şeklin biçimi ${v} farklı olabilir.`, 'birbirinden', 'hiçbir zaman'), ifade(r, v => `Kenarı 3 birim olan karenin alanı ${v} birim karedir.`, 9, 12)]; },
    es: r => [['3 × 4 birim kareden oluşan dikdörtgen', '12 birim kare'], ['2 × 5 birim kareden oluşan dikdörtgen', '10 birim kare'], ['4 × 4 birim kareden oluşan kare', '16 birim kare'], ['2 × 3 birim kareden oluşan dikdörtgen', '6 birim kare']],
    sr: r => ({ giris: 'Kartlarda dikdörtgenlerin birim kare sayıları yazılıdır.', adim: ['2 × 3', '2 × 4', '3 × 3', '4 × 3'], kok: 'Dikdörtgenler alanı küçükten büyüğe doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const en = tam(r, 4, 7), boy = tam(r, 3, 5), d = (i, j) => !(i >= en - 2 && j < 1); const al = en * boy - 2;
        return coktan(p(`${ad(r)} kareli kâğıda bir şekil boyadı. Her küçük kare 1 birim karedir.`) + izgara(en, boy, d), 'Boyalı şeklin alanı kaç birim karedir?', String(al), yanN(al, [en * boy, al + 2, 2 * (en + boy), al - 1])); },
      r => { const a = tam(r, 3, 6), b = tam(r, 2, 5), c = tam(r, 2, 4);
        return coktan(p(`Bir odanın tabanı ${a} sıra, her sırada ${b} karo olacak şekilde döşendi. Bir karonun fiyatı ${c * 10} TL'dir.`.replace(`${c * 10} TL'dir`, `${c * 10} liradır`)), 'Karolar için kaç lira ödenmiştir?', String(a * b * c * 10), yanN(a * b * c * 10, [a * b, (a + b) * c * 10, a * b * c * 10 + c * 10, a * b * c])); },
      r => { const a = tam(r, 3, 6); return coktan(p(`Kenarı ${a} birim olan kare şeklinde bir pano, birim karelerle kaplanacak.`) + izgara(a, a, () => false), 'Kaç birim kare gerekir?', String(a * a), yanN(a * a, [4 * a, 2 * a, a * a + a, a + a + 1])); },
      r => { const a = tam(r, 4, 6), b = tam(r, 2, 3), c = tam(r, 2, 3); const al1 = a * b, al2 = c * c;
        return coktan(p(`${a} × ${b} birim karelik bir dikdörtgen ile ${c} × ${c} birim karelik bir kare yan yana konuldu.`), 'İki şeklin alanları toplamı kaç birim karedir?', String(al1 + al2), yanN(al1 + al2, [al1, al2, 2 * (a + b) + 4 * c, al1 + al2 + 1])); },
      r => coktan(p('Ece ile Can aynı kareli kâğıda farklı biçimde iki şekil çizdi. İki şekil de 12 birim kareden oluşuyor.'), 'Bu şekillerle ilgili hangisi kesinlikle doğrudur?', 'Alanları eşittir', ['Çevreleri eşittir', 'İkisi de karedir', 'Biçimleri aynıdır']),
      r => { const a = tam(r, 3, 5), b = tam(r, 2, 4); return coktan(p(`${a} × ${b} birim karelik bir dikdörtgenin bütün birim karelerinin yarısı boyanacak.`), 'Kaç birim kare boyanır?', String(a * b / 2), [String(a * b), String(a + b), String(a * b / 2 + 1)].filter((x, i, A) => A.indexOf(x) === i && x !== String(a * b / 2)).concat([String(a * b / 2 - 1)]).slice(0, 3)); },
    ],
    ort: r => { const a = tam(r, 4, 6), b = tam(r, 2, 3);
      return { ic: p(`Bir öğrenci kareli kâğıda ${a} birim uzunluğunda, ${b} birim genişliğinde bir dikdörtgen çizdi.`) + izgara(a, b, () => true),
        q: [() => coktan('', 'Dikdörtgenin alanı kaç birim karedir?', String(a * b), yanN(a * b, [2 * (a + b), a + b, a * b + a, a * b - b])), () => coktan('', 'Dikdörtgenin çevresi kaç birimdir?', String(2 * (a + b)), yanN(2 * (a + b), [a * b, a + b, 2 * (a + b) + 2, 4 * a]))] }; },
  };
  // 15) Tartma (kg, g, ton)
  KONU.tartma = {
    gir: 'Öğretmen tahtaya kütle ölçüleriyle ilgili bilgiler yazdı.',
    st: r => { const k = tam(r, 2, 9), t = tam(r, 2, 5);
      return [ifade(r, v => `${k} kg ${f(v)} gramdır.`, k * 1000, k * 100), ifade(r, v => `${t} ton ${f(v)} kilogramdır.`, t * 1000, t * 100), ifade(r, v => `Yarım kilogram ${v} gramdır.`, 500, 50),
        ifade(r, v => `Bir kamyonun yükü en uygun ${v} ile ölçülür.`, 'ton', 'gram'), ifade(r, v => `Bir silginin kütlesi en uygun ${v} ile ölçülür.`, 'gram', 'ton'), ifade(r, v => `Çeyrek kilogram ${v} gramdır.`, 250, 400)]; },
    es: r => [['Yarım kilogram', '500 g'], ['Çeyrek kilogram', '250 g'], ['2 kilogram', '2000 g'], ['1 ton', '1000 kg']],
    sr: r => ({ giris: 'Kartlarda kütleler yazılıdır.', adim: ['750 g', '1 kg 200 g', '1500 g', '2 kg'], kok: 'Kütleler hafiften ağıra doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const a = tam(r, 2, 4), g = sec1(r, [250, 500, 750]), b = tam(r, 3, 6), t = (a * 1000 + g) * b;
        return coktan(p(`Bir paket un ${a} kg ${g} g geliyor. Bir fırın ${b} paket un aldı.`), 'Fırının aldığı unun kütlesi kaç gramdır?', f(t), yanN(t, [(a * 1000 + g) + b, a * 1000 * b, t + 1000, (a * 100 + g) * b])); },
      r => { const k = tam(r, 3, 8), g = sec1(r, [200, 250, 400, 500]), n = k * 1000 / g;
        return coktan(p(`${k} kg peynir ${g} gramlık paketlere bölünecek.`), 'Kaç paket peynir hazırlanır?', String(n), yanN(n, [k * g / 100, n + 2, k * 10, n / 2])); },
      r => { const ton = tam(r, 2, 4), kg = tam(r, 1, 9) * 100, k = tam(r, 3, 7) * 100, top = ton * 1000 + kg - k;
        return coktan(p(`Bir kamyonda ${ton} ton ${kg} kg kum vardı. İnşaatta ${k} kg kum boşaltıldı.`), 'Kamyonda kaç kilogram kum kalmıştır?', f(top), yanN(top, [ton * 1000 + kg + k, ton * 100 + kg - k, top + 1000, top - 100])); },
      r => { const a = tam(r, 2, 5), g = sec1(r, [200, 300, 400, 600]), t = a * 1000 + g;
        return coktan(p(`Bir karpuzun kütlesi ${a} kg ${g} g geliyor.`), 'Karpuzun kütlesi kaç gramdır?', f(t), yanN(t, [a * 100 + g, a + g, t + 1000, a * 1000])); },
      r => { const e = tam(r, 30, 45), c = tam(r, 6, 12), k = e - c;
        return coktan(p(`${ad(r)} çantasıyla tartıldığında ${e} kg geliyor. Çantasının kütlesi ${c} kg'dır.`.replace(`${c} kg'dır`, `${c} kilogramdır`)), 'Çantasız kütlesi kaç kilogramdır?', String(k), yanN(k, [e + c, k - 1, k + 2, e])); },
      r => { const g = sec1(r, [250, 500]), n = tam(r, 2, 6), t = g * n;
        return coktan(p(`Bir paket makarna ${g} gramdır. ${ad(r)} ${n} paket makarna aldı.`), 'Aldığı makarnalar kaç gramdır?', f(t), yanN(t, [g + n, t + g, n * 100, t - 50])); },
    ],
    ort: r => { const e = sec1(r, [150, 200, 250]), n = sec1(r, [3, 4, 7]), s = 1000;
      return { ic: p(`Bir terazinin bir kefesinde ${n} elma, diğer kefesinde ${s} gramlık bir ağırlık var. Terazi dengede değil; elmalı kefeye bir elma daha konunca terazi dengeye geliyor. Bütün elmalar eş kütlelidir.`),
        q: [() => coktan('', 'Terazi dengeye geldiğinde elmalı kefede kaç elma vardır?', String(n + 1), yanN(n + 1, [n, n + 2, n - 1, 2 * n])), () => coktan('', 'Bir elmanın kütlesi kaç gramdır?', String(s / (n + 1)), yanN(s / (n + 1), [Math.round(s / n), Math.round(s / (n + 2)), e, 100]))] }; },
  };
  // 16) Sıvı ölçme (L, mL)
  KONU.sivi = {
    gir: 'Öğretmen tahtaya sıvı ölçüleriyle ilgili bilgiler yazdı.',
    st: r => { const l = tam(r, 2, 9);
      return [ifade(r, v => `${l} L ${f(v)} mililitredir.`, l * 1000, l * 100), ifade(r, v => `Yarım litre ${v} mililitredir.`, 500, 50), ifade(r, v => `Çeyrek litre ${v} mililitredir.`, 250, 400),
        ifade(r, v => `Bir çay kaşığı ilaç en uygun ${v} ile ölçülür.`, 'mililitre', 'litre'), ifade(r, v => `Bir su deposu en uygun ${v} ile ölçülür.`, 'litre', 'mililitre'), ifade(r, v => `4 tane çeyrek litre ${v} litre eder.`, 1, 2)]; },
    es: r => [['Yarım litre', '500 mL'], ['Çeyrek litre', '250 mL'], ['3 litre', '3000 mL'], ['1 litre 500 mililitre', '1500 mL']],
    sr: r => ({ giris: 'Kartlarda sıvı miktarları yazılıdır.', adim: ['250 mL', 'yarım litre', '750 mL', '1 L 200 mL'], kok: 'Miktarlar azdan çoğa doğru hangi sırayla dizilir?' }),
    cq: [
      r => { const s = sec1(r, [200, 250, 500]), n = tam(r, 6, 12), t = s * n;
        return coktan(p(`Bir doğum günü partisinde ${n} bardak meyve suyu içildi. Her bardak ${s} mL'dir.`.replace(`${s} mL'dir`, `${s} mililitre alıyor`)), 'Toplam kaç mililitre meyve suyu içilmiştir?', f(t), yanN(t, [s + n, t + s, t - 100, s * 10])); },
      r => { const l = tam(r, 2, 5), s = sec1(r, [250, 500]), n = l * 1000 / s;
        return coktan(p(`${l} litrelik bir şişe ayran ${s} mililitrelik bardaklara dolduruluyor.`), 'Kaç bardak dolar?', String(n), yanN(n, [l * 2, n + 2, n / 2, l * 4 === n ? l * 2 : l * 4])); },
      r => { const d = tam(r, 6, 9) * 1000, h = tam(r, 2, 4), g = sec1(r, [250, 500, 750]), k = d - h * 1000 - g;
        return coktan(p(`Bir depoda ${d / 1000} litre su vardı. Bahçe sulamak için ${h} litre ${g} mililitre su kullanıldı.`), 'Depoda kaç mililitre su kalmıştır?', f(k), yanN(k, [d - h * 1000, d + h * 1000 + g, k + 1000, k - 250])); },
      r => { const l = tam(r, 3, 6), n = tam(r, 3, 5), t = l * n;
        return coktan(p(`Bir aile günde ${l} litre su içiyor.`), `${n} günde kaç litre su içerler?`, String(t), yanN(t, [l + n, t + l, t * 10, t - 1])); },
      r => { const a = sec1(r, [1500, 2500, 3500]), b = sec1(r, [750, 1250]), fark = a - b;
        return coktan(p(`Mavi sürahide ${f(a)} mL, yeşil sürahide ${f(b)} mL su var.`), 'Mavi sürahide kaç mililitre fazla su vardır?', f(fark), yanN(fark, [a + b, fark + 250, fark - 250, a])); },
      r => { const n = tam(r, 3, 6), s = sec1(r, [250, 500]), t = n * s;
        return coktan(p(`Bir sürahiden ${s} mililitrelik ${n} bardak su dolduruldu ve sürahi boşaldı.`), 'Sürahide kaç mililitre su vardı?', f(t), yanN(t, [n + s, t + s, t - 100, s * 10])); },
    ],
    ort: r => { const s = tam(r, 2, 3), m = sec1(r, [250, 500]);
      return { ic: p(`Bir tarifte ${s} litre süt ve ${m} mililitre krema kullanılıyor. Tarif iki katına çıkarılacak.`),
        q: [() => coktan('', 'İki kat tarifte kaç mililitre süt kullanılır?', f(s * 2000), yanN(s * 2000, [s * 1000, s * 200, s * 2000 + m, s * 4000])), () => coktan('', 'İki kat tarifte süt ve krema toplam kaç mililitredir?', f(2 * (s * 1000 + m)), yanN(2 * (s * 1000 + m), [s * 1000 + m, 2 * s * 1000 + m, 2 * (s * 100 + m), 2 * (s * 1000 + m) + 500]))] }; },
  };

  // ——— HAFTA KURUCU ———
  // Özel kalıplar: soru numarası çağrılma sırasıyla verildiği için hepsi sırayla çağrılan işlevler (thunk) döndürür
  const SP = [
    (K, r, t) => [() => kodDY(cerceve(K.gir, 'k', r), kar(r, K.st(r)).slice(0, 4), t + 'k'),
      () => yolDY(cerceve(K.gir, 'y', r), kar(r, K.st(r)).slice(0, 3), t + 'y'),
      () => kapDY(cerceve(K.gir, 'p', r), kar(r, K.st(r)).slice(0, 5), t + 'p')],
    (K, r, t) => [() => { let l, n = 0; do { l = kar(r, K.st(r)).slice(0, 3); } while (!l.some(x => x[1]) && ++n < 50); return roma(p(cerceve(K.gir, 'n', r)), 'Buna göre yukarıdaki ifadelerden hangileri doğrudur?', l); },
      () => { const s = K.sr(r); return sirala(s.giris, s.adim, s.kok, t + 's'); },
      () => esle('Soldaki ifadeleri sağdaki eşleriyle eşleştiriniz.', K.es(r), 'Buna göre eşleştirme hangi seçenekte doğru verilmiştir?', t + 'e')],
    (K, r, t) => [() => kacTane(p(cerceve(K.gir, 'n', r)), kar(r, K.st(r)).slice(0, 4)),
      () => kareYol(cerceve(K.gir, 'q', r), kar(r, K.st(r)).slice(0, 4), t + 'q', 1, 1),
      () => { const st = [...new Map(K.st(r).concat(K.st(r)).map(x => [x[0], x])).values()]; const y = st.find(x => !x[1]) || st[0], d = kar(r, st.filter(x => x[1])).slice(0, 3);
        return cocukSec(p('Dört arkadaş konuyla ilgili bildiklerini söylüyor.'), 'Buna göre hangi çocuğun söylediği yanlıştır?', [y[0], ...d.map(x => x[0])], t + 'c'); }],
  ];
  ODAK = require('./matematik4-odak.js')({ coktan, p, tablo, f, tam, sec1, kar, yanN, ad, oku, yuvarla });
  const W = (hafta, unite, baslik, konu, konular) => ({ unite, hafta, baslik, konu, sayfalar: () => {
    yeniHafta(); const r = RNG('m4-' + hafta), K = konular.map(k => KONU[k]), t = 'm4h' + hafta;
    const sp = SP[(hafta - 1) % 3](K[0], r, t);
    if (K.length > 1) sp[1] = SP[(hafta - 1) % 3](K[1], r, t + 'b')[1];
    const cq = []; const mx = Math.max(...K.map(k => k.cq.length)); for (let i = 0; i < mx; i++) K.forEach(k => { if (k.cq[i]) cq.push(k.cq[i]); });
    // aynı kalıp aynı kâğıtta iki kez çıkmasın: soru metninin rakamsız ilk 45 harfi imza; tekrar çıkarsa numara geri alınıp sıradaki üreteç denenir
    const imza = h => String(h).replace(/<[^>]+>/g, ' ').replace(/[\d.,]+/g, '#').replace(/\s+/g, ' ').trim().slice(0, 45);
    const odak = (ODAK[hafta] || []).map(g => r => g(r)), havuz = [...kar(r, odak), ...kar(r, cq)], gor = new Set(); let hi = 0;
    const sonraki = () => { let h; for (let n = 0; n < havuz.length * 2; n++) { const st = T.an(); h = havuz[hi++ % havuz.length](r); const im = imza(h); if (!gor.has(im) || n >= havuz.length) { gor.add(im); return h; } T.geriAl(st); } return h; };
    const o = K[K.length - 1].ort(r);
    const A = [sp[0](), sonraki(), sp[1](), sonraki(), sonraki(), sonraki()];
    const B = [ortak(o.ic, o.q), sp[2](), sonraki(), sonraki(), sonraki()];
    const ks = h => konular.includes('kesir') ? h.replace(/>([^<]*)</g, (m, t) => '>' + t.replace(/(^|[^\d.,\/])(\d{1,2})\/(\d{1,2})(?![\d\/])/g, (x, o, a, b) => o + kz(a, b)) + '<') : h;
    return [ks(sayfa(A)), ks(sayfa(B)).replace(/<\/div>$/, optik() + '</div>'), cevapSayfasi(`${hafta}. hafta · ${baslik}`)];
  } });

  const M4 = {
    'hafta-01': W(1, 1, 'Büyük Sayılar', 'Doğal sayılar: okuma ve yazma', ['dogal']),
    'hafta-02': W(2, 1, 'Basamak Avcısı', 'Basamak ve bölükler, sayıları karşılaştırma', ['dogal']),
    'hafta-03': W(3, 1, 'Sayı Örüntüleri', 'Sıralama, yuvarlama ve örüntüler', ['dogal']),
    'hafta-04': W(4, 1, 'Sayılardan Toplamaya', 'Doğal sayılar, toplama', ['dogal', 'toplama']),
    'hafta-05': W(5, 1, 'Topla ve Çıkar', 'Toplama ve çıkarma', ['toplama', 'cikarma']),
    'hafta-06': W(6, 1, 'Tahmin Ustası', 'Toplama ve çıkarmada tahmin', ['cikarma', 'toplama']),
    'hafta-07': W(7, 1, 'Zihinden Toplama', 'Zihinden toplama, problemler', ['toplama']),
    'hafta-08': W(8, 1, 'Toplama Problemleri', 'Toplama problemleri', ['toplama']),
    'hafta-09': W(9, 1, 'Zihinden Çıkarma', 'Çıkarmada tahmin ve zihinden işlem', ['cikarma']),
    'hafta-10': W(10, 1, 'Çıkarma Problemleri', 'Toplama ve çıkarma problemleri', ['cikarma', 'toplama']),
    'hafta-11': W(11, 2, 'Çarpma Yolculuğu', 'Çarpma işlemi', ['carpma']),
    'hafta-12': W(12, 2, 'Kısayol Çarpma', '10, 100, 1000 ile çarpma, tahmin', ['carpma']),
    'hafta-13': W(13, 2, 'Çarpmadan Bölmeye', 'Çarpma problemleri, bölme', ['carpma', 'bolme']),
    'hafta-14': W(14, 2, 'Eşit Paylaşım', 'Bölme işlemi', ['bolme']),
    'hafta-15': W(15, 2, 'Kalanlı Bölme', 'Kalanlı bölme, sağlama', ['bolme']),
    'hafta-16': W(16, 2, 'Bölme Problemleri', '10, 100 ile bölme, problemler', ['bolme']),
    'hafta-17': W(17, 2, 'Bölmeden Kesre', 'Bölme problemleri, kesirler', ['bolme', 'kesir']),
    'hafta-18': W(18, 3, 'Kesir Dünyası', 'Basit, bileşik ve tam sayılı kesirler', ['kesir']),
    'hafta-19': W(19, 3, 'Kesir Sırası', 'Kesirleri karşılaştırma, bir çokluğun kesri', ['kesir']),
    'hafta-20': W(20, 3, 'Kesirlerle İşlemler', 'Paydaları eşit kesirlerle toplama-çıkarma', ['kesir']),
    'hafta-21': W(21, 3, 'Zaman Yolcusu', 'Zaman ölçü birimleri', ['zaman']),
    'hafta-22': W(22, 3, 'Saat ve Veri', 'Zaman problemleri, veri toplama', ['zaman', 'veri']),
    'hafta-23': W(23, 4, 'Grafik Okuyalım', 'Veri ve grafik, geometrik cisimler', ['veri', 'sekil']),
    'hafta-24': W(24, 4, 'Şekil ve Cisim', 'Geometrik şekiller ve cisimler', ['sekil']),
    'hafta-25': W(25, 4, 'Nokta, Doğru, Işın', 'Şekiller, geometride temel kavramlar', ['sekil', 'kavram']),
    'hafta-26': W(26, 4, 'Açılar', 'Açının elemanları, adlandırılması ve ölçülmesi', ['aci']),
    'hafta-27': W(27, 4, 'Açı ve Simetri', 'Açı türleri, uzamsal ilişkiler', ['kavram', 'uzamsal']),
    'hafta-28': W(28, 4, 'Uzunluk Ölçme', 'Uzamsal ilişkiler, uzunluk ölçme', ['uzamsal', 'uzunluk']),
    'hafta-29': W(29, 4, 'Kilometre ve Metre', 'Uzunluk birimleri ve dönüşümler', ['uzunluk']),
    'hafta-30': W(30, 4, 'Çevre Ölçme', 'Uzunluk problemleri, çevre', ['uzunluk', 'cevre']),
    'hafta-31': W(31, 4, 'Çevre Problemleri', 'Çevre uzunluğu', ['cevre']),
    'hafta-32': W(32, 4, 'Alan Ölçme', 'Birim karelerle alan', ['alan']),
    'hafta-33': W(33, 4, 'Tartalım', 'Kütle ölçme', ['tartma']),
    'hafta-34': W(34, 4, 'Ton ve Kilogram', 'Kütle problemleri', ['tartma']),
    'hafta-35': W(35, 4, 'Sıvı Ölçme', 'Litre ve mililitre', ['sivi']),
    'hafta-36': W(36, 4, 'Sıvı Ölçme Ustası', 'Sıvı ölçmede tahmin ve problemler', ['sivi']),
  };
  const CSS = `
.m4-kz{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1}.m4-kz>span{display:block;padding:0 .4mm}.m4-kz>span:first-child{border-bottom:.3mm solid}.m4-sekil{display:flex;gap:2mm;justify-content:center;flex-wrap:wrap}.m4-kart{display:flex;gap:1.5mm;justify-content:center}.m4-kart span{width:7mm;height:9mm;border:.5mm solid #1d6fd8;border-radius:1.5mm;display:grid;place-items:center;font-size:5mm;background:#eef5ff}
`;
  return { M4, CSS };
};
