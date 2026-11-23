// Ladin Ormanı — 4. sınıf Matematik: HAFTAYA ÖZGÜ soru üreteçleri (o haftanın MEB kazanımı).
// Aynı konuyu işleyen haftalar konu havuzundan aynı kalıpları alıyordu; her hafta önce buradaki üreteçlerden soru gelir.
// Her üreteç sayıları ve doğru cevabı HESAPLAR; her soru kurguludur (adı olan kişi, durum, amaç).
module.exports = H => {
  const { grafik, coktan, p, tablo, f, tam, sec1, kar, yanN, ad, oku, yuvarla } = H;
  const O = {};
  // Adlara ek: ünlü uyumu ve kaynaştırma (Kaan'ın, Defne'nin, Elif'ten, Ada'dan)
  const sonU = s => { for (let i = s.length - 1; i >= 0; i--) { const c = s[i].toLocaleLowerCase('tr'); if ('aıoueiöü'.includes(c)) return c; } return 'e'; };
  const ilgi = s => { const v = 'aıoueiöü'.includes(s.slice(-1).toLocaleLowerCase('tr')); return s + "'" + (v ? 'n' : '') + { a: 'ı', ı: 'ı', o: 'u', u: 'u', e: 'i', i: 'i', ö: 'ü', ü: 'ü' }[sonU(s)] + 'n'; };
  const den = s => s + "'" + ('fstkçşhp'.includes(s.slice(-1).toLocaleLowerCase('tr')) ? 't' : 'd') + ('aıou'.includes(sonU(s)) ? 'an' : 'en');
  const ikiAd = r => { const a = ad(r); let b = ad(r); for (let i = 0; i < 9 && b === a; i++) b = ad(r); return [a, b]; };

  O[1] = [
    r => { const n = tam(r, 21, 89) * 1000 + tam(r, 100, 899), k = tam(r, 3, 6), s = n + k * 1000;
      return coktan(p(`Bir su fabrikasında sayaç ${f(n)} şişeyi gösteriyor. Her saat 1.000 şişe daha dolduruluyor. ${ad(r)}, sayacı biner biner ileri sayarak izliyor.`), `${k} saat sonra sayaç kaçı gösterir?`, f(s), yanN(s, [n + k * 100, n + k * 10000, n + k, n + (k + 1) * 1000])); },
    r => { const n = tam(r, 30, 90) * 100 + tam(r, 10, 99) * 100 * 0 + tam(r, 0, 0), k = tam(r, 4, 8), s = n - k * 100;
      return coktan(p(`Bir kütüphanede ${f(n)} kitap var. Her gün 100 kitap ödünç veriliyor ve henüz geri gelmiyor. ${ad(r)}, kalan kitapları yüzer yüzer geri sayıyor.`), `${k} gün sonra kütüphanede kaç kitap kalır?`, f(s), yanN(s, [n - k * 10, n - k * 1000, n + k * 100, n - (k - 1) * 100])); },
    r => { const a = tam(r, 2, 9), b = tam(r, 1, 9), c = tam(r, 1, 9), n = a * 100000 + b * 10000 + c * 100 + tam(r, 1, 9);
      const yanlis = [a * 100000 + b * 1000 + c * 100 + n % 10, a * 10000 + b * 1000 + c * 100 + n % 10, a * 100000 + b * 10000 + c * 10 + n % 10];
      return coktan(p(`${ad(r)} bir yarışmada kazandığı puanı arkadaşına söyledi: "${oku(n)} puan aldım."`), 'Bu puanın rakamla yazılışı hangisidir?', f(n), yanN(n, yanlis)); }];

  O[2] = [
    r => { const n = tam(r, 1100, 9899); const d = n % 10 === 5 ? n + 1 : n;
      return coktan(p(`${ad(r)} ailesiyle tatile gitmek için ${f(d)} km yol yapacak. Babası yolu haber verirken sayıyı en yakın onluğa yuvarladı.`), 'Babasının söylediği sayı hangisidir?', f(yuvarla(d, 10)), yanN(yuvarla(d, 10), [yuvarla(d, 100), Math.floor(d / 10) * 10 === yuvarla(d, 10) ? Math.floor(d / 10) * 10 + 10 : Math.floor(d / 10) * 10, yuvarla(d, 1000), d + 10])); },
    r => { const a = tam(r, 2, 9), b = tam(r, 1, 9), c = tam(r, 1, 9), e = tam(r, 1, 9), n = a * 100000 + b * 10000 + c * 1000 + e * 10;
      return coktan(p(`${ad(r)}, bir sayıyı basamak değerlerine ayırarak tahtaya yazdı: ${f(a * 100000)} + ${f(b * 10000)} + ${f(c * 1000)} + ${e * 10}`), 'Yazdığı sayı hangisidir?', f(n), yanN(n, [a * 100000 + b * 10000 + c * 1000 + e, a * 10000 + b * 1000 + c * 100 + e * 10, a * 100000 + b * 10000 + c * 100 + e * 10])); },
    r => { const n = tam(r, 100, 999) * 1000 + tam(r, 100, 999), bk = Math.floor(n / 1000), [a1, a2] = ikiAd(r);
      return coktan(p(`${a1} ile ${a2} bir şehrin nüfusunu (${f(n)}) inceliyor. ${a2} "Binler bölüğündeki sayıyı bulalım." dedi.`), 'Binler bölüğündeki sayı kaçtır?', String(bk), yanN(bk, [n % 1000, Math.floor(n / 100000), Math.floor(n / 10000)], String)); }];

  O[3] = [
    r => { const s = new Set(); while (s.size < 3) s.add(tam(r, 40, 99) * 1000 + tam(r, 100, 999)); const [x, y, z] = [...s].sort((a, b) => a - b), [a1] = ikiAd(r);
      return coktan(p(`${a1}, üç stadyumun seyirci sayılarını karşılaştırıyor: A Stadı ${f(y)}, B Stadı ${f(z)}, C Stadı ${f(x)}.`), 'Hangi sıralama doğrudur?', `C < A < B`, ['A < B < C', 'B < A < C', 'C < B < A']); },
    r => { const n = tam(r, 1200, 4900) + tam(r, 1, 4); const d = n % 10 === 5 ? n + 2 : n;
      return coktan(p(`Bir dağın yüksekliği ${f(d)} metredir. ${ad(r)} bu yüksekliği gezi broşürüne en yakın onluğa yuvarlayarak yazacak.`), 'Broşüre yazılacak sayı hangisidir?', f(yuvarla(d, 10)), yanN(yuvarla(d, 10), [yuvarla(d, 100), yuvarla(d, 10) + 10, yuvarla(d, 10) - 10, d])); },
    r => { const a = tam(r, 2, 9) * 1000, d = sec1(r, [250, 500, 1500, 2500]), l = [a, a + d, a + 2 * d, null, a + 4 * d];
      return coktan(p(`${ad(r)} bir sayı örüntüsü yazdı ama bir sayıyı silgiyle sildi: ${l.map(x => x === null ? '?' : f(x)).join(', ')}`), 'Silinen sayı kaçtır?', f(a + 3 * d), yanN(a + 3 * d, [a + 3 * d + 100, a + 2 * d + 100, a + 5 * d, a + 3 * d - d / 2])); }];

  O[4] = [
    r => { const b = tam(r, 12, 40), d = tam(r, 6, 15), l = [b, b + d, b + 2 * d, b + 3 * d];
      return coktan(p(`Bir otoparka saat 08.00'de ${b} araç vardı. Her saat başı aynı sayıda araç girdi ve hiç çıkmadı.`) + tablo(['Saat', '08.00', '09.00', '10.00', '11.00'], [['Araç', ...l.map(String)]]), 'Bu kural sürerse saat 13.00\'te otoparkta kaç araç olur?', String(b + 5 * d), yanN(b + 5 * d, [b + 4 * d, b + 6 * d, b + 5 * d + 1, b + 3 * d], String)); },
    r => { const a = tam(r, 1200, 4800), b = tam(r, 1500, 4900), [a1] = ikiAd(r);
      return coktan(p(`${a1} ve ailesi iki yılda kitap okuma kampanyasına katıldı. Birinci yıl ${f(a)}, ikinci yıl ${f(b)} sayfa okudular.`), 'İki yılda toplam kaç sayfa okumuşlardır?', f(a + b), yanN(a + b, [a + b + 1000, a + b - 100, Math.abs(a - b), a + b + 10])); },
    r => { const t = tam(r, 6, 9) * 1000, a = tam(r, 1500, t - 1500);
      return coktan(p(`Bir okulda ${f(t)} fidan dikilecek. ${ilgi(ad(r))} sınıfı ${f(a)} fidan dikti, kalanını diğer sınıflar dikecek.`), 'Diğer sınıfların dikeceği fidan sayısını bulmak için hangi toplama işleminin sonucunu düşünmek gerekir?', `${f(a)} + ? = ${f(t)}`, [`${f(a)} + ${f(t)} = ?`, `? + ${f(t)} = ${f(a)}`, `${f(t)} + ${f(t)} = ?`]); }];

  O[5] = [
    r => { const c = tam(r, 6, 9) * 1000, a = tam(r, 1100, 2400), b = tam(r, 1100, 2400), k = c - a - b, [a1] = ikiAd(r);
      return coktan(p(`${ilgi(a1)} kumbarasında ${f(c)} TL vardı. Önce ${f(a)} TL\'ye bir bisiklet, sonra ${f(b)} TL\'ye bir kask aldı.`), 'Kumbarada kaç TL kaldı?', f(k), yanN(k, [c - a, c - b, k + 100, a + b])); },
    r => { const a = tam(r, 3000, 6000), d = tam(r, 400, 1500), b = a - d;
      return coktan(p(`İki ilçede kütüphane üyeleri sayıldı. Birinci ilçede ${f(a)} üye var, ikinci ilçede ${f(d)} üye daha az var.`), 'İki ilçede toplam kaç üye vardır?', f(a + b), yanN(a + b, [a + d, b, a + b + d, 2 * a + d])); },
    r => { const a = tam(r, 2000, 5000), b = tam(r, 1000, 3000), s = a + b, x = r() < .5 ? a : a + sec1(r, [10, 100]), t2 = x + b, dg = t2 === s, k = (v, d) => `Toplam ${f(v)} çıkar; sonuç ${d ? 'doğrudur' : 'yanlıştır'}.`;
      return coktan(p(`${ad(r)} ${f(s)} − ${f(b)} işleminin sonucunu ${f(x)} buldu. Sağlama yapmak için bulduğu sonucu ${f(b)} ile topladı.`), 'Sağlama için hangisi doğrudur?', k(t2, dg), [k(t2, !dg), k(dg ? s + 100 : s, dg), k(x, true)]); }];

  O[6] = [
    r => { const a = tam(r, 5, 9) * 100, b = tam(r, 1, 4) * 100 + tam(r, 1, 9) * 10, s = a - b;
      return coktan(p(`${ad(r)} pazardan ${a} TL ile alışverişe çıktı ve ${b} TL harcadı. Kalan parayı kâğıt kalem kullanmadan zihinden hesapladı.`), 'Kalan para kaç TL\'dir?', String(s), yanN(s, [s + 100, s - 10, a + b, s + 10], String)); },
    r => { const a = tam(r, 21, 69) * 100 + tam(r, 1, 30) - 15, b = tam(r, 21, 39) * 100 + tam(r, 1, 30) - 15, t = yuvarla(a, 100) + yuvarla(b, 100);
      return coktan(p(`${ad(r)}, okulun iki şenliğine gelen ${f(a)} ve ${f(b)} ziyaretçiyi en yakın yüzlüğe yuvarlayarak toplamı tahmin etti.`), 'Tahmin ettiği toplam kaçtır?', f(t), yanN(t, [a + b, yuvarla(a + b, 1000), t + 100, t - 100])); },
    r => { const a = tam(r, 51, 89) * 100 + tam(r, 10, 40), b = tam(r, 21, 39) * 100 + tam(r, 10, 40), t = yuvarla(a, 100) - yuvarla(b, 100), g = a - b;
      return coktan(p(`${ad(r)}, ${f(a)} − ${f(b)} işlemini önce sayıları en yakın yüzlüğe yuvarlayarak tahmin etti, sonra gerçek sonucu buldu.`), 'Tahmini sonuç ile gerçek sonuç arasındaki fark kaçtır?', String(Math.abs(t - g)), yanN(Math.abs(t - g), [t, g, Math.abs(t - g) + 10, Math.abs(t - g) + 100], String)); }];

  O[7] = [
    r => { const a = tam(r, 1, 7) * 50 + 100, b = tam(r, 2, 6) * 50, [a1] = ikiAd(r);
      return coktan(p(`${a1} hafta sonu ${a} sayfa, hafta içi ${b} sayfa kitap okudu. Toplamı zihinden, onlukları ve yüzlükleri birleştirerek buldu.`), 'Toplam kaç sayfa okumuştur?', String(a + b), yanN(a + b, [a + b + 50, a + b - 50, a + b + 100, Math.abs(a - b)], String)); },
    r => { const a = tam(r, 1210, 4790), b = tam(r, 1210, 4790), t = yuvarla(a, 1000) + yuvarla(b, 1000);
      return coktan(p(`${ad(r)} iki şehir arasındaki uçuşlarda bir ayda ${f(a)} ve ${f(b)} yolcu taşındığını okudu. Toplam yolcu sayısını en yakın bine yuvarlayarak tahmin etti.`), 'Tahmini kaçtır?', f(t), yanN(t, [a + b, t + 1000, yuvarla(a + b, 100), t - 1000])); },
    r => { const a = tam(r, 1500, 3500), b = tam(r, 1500, 3500), g = a + b, t = yuvarla(a, 100) + yuvarla(b, 100);
      return coktan(p(`Bir tiyatroya cumartesi ${f(a)}, pazar ${f(b)} kişi geldi. ${ad(r)} önce en yakın yüzlüğe yuvarlayarak tahmin yaptı, sonra gerçek toplamı hesapladı.`), 'Gerçek toplam ile tahmin arasındaki fark kaçtır?', String(Math.abs(g - t)), yanN(Math.abs(g - t), [g, t, Math.abs(g - t) + 100, Math.abs(g - t) + 10], String)); }];

  O[8] = [
    r => { const a = tam(r, 1200, 2500), d = tam(r, 150, 600), b = a + d, c = tam(r, 800, 1500);
      return coktan(p(`Bir kermeste cuma ${f(a)} TL, cumartesi cumadan ${f(d)} TL fazla, pazar ${f(c)} TL toplandı.`), 'Kermeste üç günde toplam kaç TL toplanmıştır?', f(a + b + c), yanN(a + b + c, [a + d + c, a + b, a + b + c + d, 2 * a + c])); },
    r => { const k = tam(r, 3, 5), x = tam(r, 245, 480), e = tam(r, 120, 300);
      return coktan(p(`${ilgi(ad(r))} okulunda ${k} tane 4. sınıf şubesi var. Her şube kâğıt toplama yarışında ${x} kg kâğıt topladı. Öğretmenler de ${e} kg ekledi.`), 'Toplam kaç kg kâğıt toplanmıştır?', f(k * x + e), yanN(k * x + e, [k * x, x + e, k * (x + e), (k - 1) * x + e])); },
    r => { const a = tam(r, 1000, 3000), b = tam(r, 500, 1500);
      return coktan(p(`Bir çiftlikte ${f(a)} tavuk ve tavuklardan ${f(b)} fazla ördek var.`), 'Çiftlikte toplam kaç kanatlı hayvan vardır?', f(2 * a + b), yanN(2 * a + b, [a + b, 2 * a, 2 * (a + b), a + 2 * b])); }];

  O[9] = [
    r => { const a = tam(r, 6, 9) * 100, b = tam(r, 2, 5) * 100 + 50;
      return coktan(p(`${ilgi(ad(r))} okulunun ${a} öğrencisinden ${b} tanesi geziye gitti. Okulda kalan öğrenci sayısını zihinden buldu.`), 'Okulda kaç öğrenci kalmıştır?', String(a - b), yanN(a - b, [a - b + 100, a - b - 50, a + b, a - b + 50], String)); },
    r => { const a = tam(r, 71, 95) * 100 + tam(r, 10, 40), b = tam(r, 21, 49) * 100 + tam(r, 10, 40), t = yuvarla(a, 1000) - yuvarla(b, 1000);
      return coktan(p(`Bir kitap fuarına ilk gün ${f(a)}, ikinci gün ${f(b)} kişi geldi. ${ad(r)} aradaki farkı en yakın bine yuvarlayarak tahmin etti.`), 'Tahmin ettiği fark kaçtır?', f(t), yanN(t, [a - b, t + 1000, yuvarla(a - b, 100), t - 1000])); },
    r => { const a = tam(r, 3000, 5000), b = tam(r, 900, 1900), c = a - b;
      return coktan(p(`${ad(r)} bir çıkarma işleminde eksileni ${f(a)}, farkı ${f(c)} olarak buldu ama çıkanı silgiyle sildi.`), 'Silinen çıkan kaçtır?', f(b), yanN(b, [a + c, b + 100, c, b - 10])); }];

  O[10] = [
    r => { const a = tam(r, 2500, 4500), b = tam(r, 800, 1500), c = tam(r, 600, 1200);
      return coktan(p(`Bir depoda ${f(a)} koli vardı. Sabah ${f(b)} koli gönderildi, öğleden sonra ${f(c)} koli geldi.`), 'Akşam depoda kaç koli vardır?', f(a - b + c), yanN(a - b + c, [a + b + c, a - b - c, a - b, a + c])); },
    r => { const a = tam(r, 1500, 3000), b = tam(r, 200, 600), [a1, a2] = ikiAd(r);
      return coktan(p(`${a1} ile ${a2} kâğıt topluyor. ${a1} ${f(a)} gram topladı. ${a2}, ${den(a1)} ${f(b)} gram az topladı.`), 'İkisi toplam kaç gram kâğıt toplamıştır?', f(2 * a - b), yanN(2 * a - b, [2 * a + b, a - b, a + b, 2 * a])); },
    r => { const t = tam(r, 6, 9) * 1000, a = tam(r, 1200, 2500), b = tam(r, 1200, 2500);
      return coktan(p(`Bir yardım kampanyasında hedef ${f(t)} kitap toplamaktı. Birinci hafta ${f(a)}, ikinci hafta ${f(b)} kitap toplandı.`), 'Hedefe ulaşmak için daha kaç kitap toplanmalıdır?', f(t - a - b), yanN(t - a - b, [t - a, t - b, a + b, t - a - b + 100])); }];

  O[11] = [
    r => { const a = tam(r, 105, 245), b = tam(r, 12, 28);
      return coktan(p(`Bir otobüs firması günde ${a} sefer yapıyor. ${ad(r)}, firmanın ${b} günde kaç sefer yaptığını hesaplıyor.`), `${b} günde kaç sefer yapılır?`, f(a * b), yanN(a * b, [a * b + a, a * b - b, a * (b - 1), a + b])); },
    r => { const a = tam(r, 13, 48), b = tam(r, 21, 39), [a1, a2] = ikiAd(r);
      return coktan(p(`${a1} ${a} × ${b} işlemini, ${a2} ise ${b} × ${a} işlemini yaptı.`), 'İkisinin bulduğu sonuçlar için hangisi doğrudur?', 'Sonuçlar eşittir; çarpanların yeri değişince çarpım değişmez.', [`${ilgi(a1)} sonucu daha büyüktür.`, `${ilgi(a2)} sonucu daha büyüktür.`, 'Sonuçlar eşit olamaz.']); },
    r => { const a = tam(r, 2, 9) * 4;
      return coktan(p(`${ad(r)}, 25 × ${a} işlemini kısa yoldan yaptı: 25 × 4 = 100 olduğunu kullandı.`), 'İşlemin sonucu kaçtır?', String(25 * a), yanN(25 * a, [25 * a + 25, 100 * a, 25 + a, 25 * a - 100], String)); }];

  O[12] = [
    r => { const a = tam(r, 3, 48);
      return coktan(p(`Bir fabrika her gün ${a} kutu kalem üretiyor. Her kutuda 1.000 kalem var.`), 'Bir günde kaç kalem üretilir?', f(a * 1000), yanN(a * 1000, [a * 100, a * 10000, a + 1000, a * 1000 + 1000])); },
    r => { const a = tam(r, 6, 24) * 2;
      return coktan(p(`${ad(r)}, 50 × ${a} işlemini zihinden yapmak için ${a} sayısının yarısını alıp 100 ile çarptı.`), 'İşlemin sonucu kaçtır?', String(50 * a), yanN(50 * a, [100 * a, 50 * a + 50, 25 * a, a / 2 * 10], String)); },
    r => { const a = tam(r, 21, 89), b = tam(r, 3, 9), t = yuvarla(a, 10) * b;
      return coktan(p(`Bir sinema salonunda ${a} sıra koltuk var. ${ad(r)} ${b} seansta kaç kişinin film izleyebileceğini tahmin etmek için ${a} sayısını en yakın onluğa yuvarladı. (Her sırada 1 kişi oturuyor sayın.)`), 'Tahmini sonuç kaçtır?', String(t), yanN(t, [a * b, t + 10, yuvarla(a * b, 100), t - b * 10], String)); }];

  O[13] = [
    r => { const a = tam(r, 21, 79), b = tam(r, 11, 49), t = yuvarla(a, 10) * yuvarla(b, 10);
      return coktan(p(`${ad(r)}, okul bahçesine ${a} sıra, her sıraya ${b} fide dikileceğini öğrendi. Toplam fide sayısını iki sayıyı da en yakın onluğa yuvarlayarak tahmin etti.`), 'Tahmini kaçtır?', f(t), yanN(t, [a * b, t + 100, yuvarla(a * b, 100), t - 100])); },
    r => { const b = tam(r, 12, 25), q = tam(r, 4, 12), a = b * q;
      return coktan(p(`Bir kırtasiyede ${a} kalem, paketlere konuluyor. Her pakette ${b} kalem olacak.`), 'Kaç paket hazırlanır?', String(q), yanN(q, [q + 1, q - 1, a - b, q * 10], String)); },
    r => { const b = tam(r, 12, 18), q = tam(r, 6, 15), k = tam(r, 1, b - 1), a = b * q + k;
      return coktan(p(`${ilgi(ad(r))} sınıfı ${a} kitabı ${b} rafa eşit sayıda dizecek. Artan kitaplar masada kalacak.`), 'Masada kaç kitap kalır?', String(k), yanN(k, [q, b - k, k + 1, q + k], String)); }];

  O[14] = [
    r => { const b = tam(r, 3, 9), q = tam(r, 205, 999), a = b * q;
      return coktan(p(`Bir fırın ${f(a)} simidi ${b} okula eşit olarak dağıtacak.`), 'Her okula kaç simit düşer?', f(q), yanN(q, [q + 10, q - 1, q * 10, a - b])); },
    r => { const b = tam(r, 12, 32), q = tam(r, 8, 25), a = b * q;
      return coktan(p(`${a} öğrenci müze gezisine çıkacak. Her grupta ${b} öğrenci olacak şekilde gruplara ayrılacaklar.`), 'Kaç grup oluşur?', String(q), yanN(q, [q + 2, q - 1, b, q * 2], String)); },
    r => { const b = tam(r, 4, 9), q = tam(r, 150, 900), k = tam(r, 1, b - 1), a = b * q + k;
      return coktan(p(`${ad(r)}, ${f(a)} ÷ ${b} işlemini yaptı ve sağlamasını bölen × bölüm + kalan ile kontrol etti.`), 'İşlemin kalanı kaçtır?', String(k), yanN(k, [k + 1, b - k, 0, q % 10], String)); }];

  O[15] = [
    r => { const a = tam(r, 12, 98);
      return coktan(p(`Bir fabrikada üretilen ${f(a * 1000)} vida kutulara konuluyor. Her kutuya 1.000 vida giriyor.`), 'Kaç kutu vida hazırlanır?', String(a), yanN(a, [a * 10, a * 100, a + 1000, Math.floor(a / 10) || a + 1], String)); },
    r => { const a = tam(r, 2, 9), [b, be] = sec1(r, [[10, '10 ile'], [100, '100 ile']]);
      return coktan(p(`${ad(r)}, ${f(a * 1000)} sayısını ${be} bölmek için sondaki sıfırları kullanarak kısa yol buldu.`), 'Sonuç kaçtır?', f(a * 1000 / b), yanN(a * 1000 / b, [a * 1000 / b / 10, a * 1000 / b * 10, a * 1000 - b, a * 100])); },
    r => { const b = tam(r, 3, 9), a = tam(r, 410, 980) * 10, t = Math.round(yuvarla(a, 100) / b), g = Math.floor(a / b);
      return coktan(p(`Bir okul ${f(a)} TL\'lik bağışı ${b} kütüphaneye eşit bölecek. ${ad(r)}, önce bölüneni en yakın yüzlüğe yuvarlayıp yaklaşık sonucu buldu.`), `Gerçek sonuca en yakın tahmin hangisidir?`, f(yuvarla(g, 10)), yanN(yuvarla(g, 10), [yuvarla(g, 10) * 10, yuvarla(g, 10) + 100, a - b, t * b])); }];

  O[16] = [
    r => { const b = tam(r, 4, 9), q = tam(r, 25, 95), a = b * q;
      return coktan(p(`${ad(r)} bir bölme işleminin bölümünü ${q}, bölenini ${b} olarak buldu ama bölüneni yazmayı unuttu. İşlemde kalan yoktu.`), 'Bölünen kaçtır?', String(a), yanN(a, [a + b, q + b, a - q, a + 1], String)); },
    r => { const b = tam(r, 6, 9), q = tam(r, 12, 40), a = b * q;
      return coktan(p(`Bir kafede her masada ${b} sandalye var. Toplam ${a} sandalye kullanılıyor.`), `Kafede kaç masa olduğunu gösteren işlem ve sonucu hangisidir?`, `${a} ÷ ${b} = ${q}`, [`${a} × ${b} = ${a * b}`, `${a} − ${b} = ${a - b}`, `${a} + ${b} = ${a + b}`]); },
    r => { const k = tam(r, 3, 6), x = tam(r, 15, 40), b = tam(r, 3, 6);
      return coktan(p(`${ilgi(ad(r))} sınıfında ${k} kutu boya kalemi var; her kutuda ${x} kalem bulunuyor. Kalemler ${b} gruba eşit dağıtılacak.`), 'Her gruba kaç kalem düşer? (Kalanı düşünmeyiniz.)', String(Math.floor(k * x / b)), yanN(Math.floor(k * x / b), [k * x, Math.floor(x / b), k * x * b, Math.floor(k * x / b) + 1], String)); }];

  O[17] = [
    r => { const a = tam(r, 2, 9), b = tam(r, 2, 9) * 2, c = sec1(r, [2, 4].filter(x => (a * b) % x === 0)) || 2, d = a * b / c;
      return coktan(p(`${ad(r)} eşit kollu teraziyle oynuyor. Sol kefede "${a} × ${b}" yazan kart var. Sağ kefeye "${c} × ?" kartını koyacak; terazi dengeye gelmeli.`), 'Soru işaretinin yerine hangi sayı gelmelidir?', String(d), yanN(d, [d + 1, a * b, d - 1, c * a], String)); },
    r => { const a = tam(r, 12, 40), b = tam(r, 5, 15), c = tam(r, 15, 45), d = a + b - c;
      if (d <= 0) return O[17][1](r);
      return coktan(p(`${ad(r)} tahtaya bir eşitlik yazdı: ${a} + ${b} = ${c} + ?`), 'Eşitliğin korunması için soru işaretinin yerine hangi sayı yazılmalıdır?', String(d), yanN(d, [a + b, a + b + c, d + 1, c - b], String)); },
    r => { const [x, y] = sec1(r, [[7, 4], [9, 4], [5, 3], [11, 6], [13, 8]]);
      return coktan(p(`${ad(r)}, her biri ${y} eş parçaya bölünmüş pizzalardan ${x} parça yedi.`), `Yenen pizza miktarını gösteren ${x}/${y} kesri için hangisi doğrudur?`, 'Bileşik kesirdir; bir bütünden fazladır.', ['Basit kesirdir; bir bütünden azdır.', 'Bir bütüne eşittir.', 'Birim kesirdir.']); }];

  O[18] = [
    r => { const y = sec1(r, [3, 4, 5, 6]), t = tam(r, 1, 3), k = tam(r, 1, y - 1), x = t * y + k;
      return coktan(p(`${ad(r)}, her biri ${y} dilime bölünmüş keklerden ${x} dilim hazırladı.`), `${x}/${y} kesrinin tam sayılı kesir olarak yazılışı hangisidir?`, `${t} tam ${k}/${y}`, [`${k} tam ${t}/${y}`, `${t + 1} tam ${k}/${y}`, `${x} tam 1/${y}`]); },
    r => { const [a1, a2] = ikiAd(r), u = kar(r, [3, 4, 5, 6, 8]).slice(0, 2).sort((a, b) => a - b);
      return coktan(p(`Aynı büyüklükteki iki çikolatadan ${ilgi(a1)}ki ${u[0]}, ${ilgi(a2)}ki ${u[1]} eş parçaya bölündü. İkisi de birer parça yedi.`), 'Hangisi daha çok çikolata yemiştir?', `${a1}, çünkü 1/${u[0]} daha büyüktür.`, [`${a2}, çünkü 1/${u[1]} daha büyüktür.`, 'İkisi eşit yemiştir.', `${a2}, çünkü paydası daha büyüktür.`]); },
    r => { const y = sec1(r, [4, 5, 6, 8]), l = kar(r, [[y - 1, 'basit'], [y + tam(r, 1, 3), 'bileşik'], [y, 'bütüne eşit']]);
      return coktan(p(`${ad(r)} paydası ${y} olan üç kesir kartı çekti: ${l.map(([x]) => `${x}/${y}`).join(', ')}.`), `Hangi kart bir bütünden büyüktür?`, `${l.find(x => x[1] === 'bileşik')[0]}/${y}`, l.filter(x => x[1] !== 'bileşik').map(([x]) => `${x}/${y}`).concat([`1/${y}`])); }];

  O[19] = [
    r => { const y = sec1(r, [7, 9, 10, 12]), s = kar(r, [1, 2, 3, 4, 5, 6].filter(x => x < y)).slice(0, 3).sort((a, b) => a - b), [A, B, C] = kar(r, ['Elif', 'Kaan', 'Ada']);
      return coktan(p(`Üç arkadaş aynı uzunluktaki kurdelenin ${y} eş parçasından ${A} ${s[2]}, ${B} ${s[0]}, ${C} ${s[1]} parça aldı.`), 'Kurdeleleri en kısadan en uzuna doğru sıralayan seçenek hangisidir?', `${B}, ${C}, ${A}`, [`${A}, ${C}, ${B}`, `${C}, ${B}, ${A}`, `${B}, ${A}, ${C}`]); },
    r => { const x = tam(r, 1, 3), ys = kar(r, [4, 5, 6, 8, 9]).slice(0, 3).filter(y => y > x).sort((a, b) => b - a);
      if (ys.length < 3) return O[19][0](r);
      return coktan(p(`${ad(r)} üç kesri karşılaştırıyor: ${x}/${ys[1]}, ${x}/${ys[0]}, ${x}/${ys[2]}. Kesirlerin payları eşit.`), 'Kesirlerin küçükten büyüğe sıralanışı hangisidir?', `${x}/${ys[0]} < ${x}/${ys[1]} < ${x}/${ys[2]}`, [`${x}/${ys[2]} < ${x}/${ys[1]} < ${x}/${ys[0]}`, `${x}/${ys[1]} < ${x}/${ys[0]} < ${x}/${ys[2]}`, `${x}/${ys[0]} < ${x}/${ys[2]} < ${x}/${ys[1]}`]); },
    r => { const y = sec1(r, [4, 5, 6, 8]), x = tam(r, 1, y - 1), n = y * tam(r, 4, 9);
      return coktan(p(`${ilgi(ad(r))} ${n} cevizinden ${x}/${y} kesri kadarı kırık çıktı.`), 'Kaç ceviz kırıktır?', String(n / y * x), yanN(n / y * x, [n / y, n - n / y * x, n / x, n / y * x + 1], String)); }];

  O[20] = [
    r => { const y = sec1(r, [8, 9, 10, 12]), a = tam(r, 1, 3), b = tam(r, 1, y - a - 1), k = y - a - b;
      return coktan(p(`${ad(r)} bir pastayı ${y} eş parçaya böldü. Annesi ${a}, babası ${b} parça yedi.`), 'Pastanın ne kadarı kalmıştır?', `${k}/${y}`, [`${a + b}/${y}`, `${k}/${a + b}`, `${y - a}/${y}`]); },
    r => { const y = sec1(r, [6, 7, 9, 10]), a = tam(r, 3, y - 1), b = tam(r, 1, a - 1);
      return coktan(p(`Bir bahçenin ${a}/${y} kesri kadarına domates, ${b}/${y} kesri kadarına biber ekildi.`), 'Domates ekilen kısım biber ekilen kısımdan ne kadar fazladır?', `${a - b}/${y}`, [`${a + b}/${y}`, `${a - b}/${y + y}`, `${b}/${y}`]); },
    r => { const y = sec1(r, [5, 8, 10]), a = tam(r, 1, y - 2), b = tam(r, 1, y - a - 1), [a1, a2] = ikiAd(r);
      return coktan(p(`${a1} bir yolun ${a}/${y} kesri kadarını sabah, ${b}/${y} kesri kadarını öğlen yürüdü. ${a2} ise yolun ${a + b}/${y} kesri kadarını bir seferde yürüdü.`), 'İkisinin yürüdüğü yollar için hangisi doğrudur?', 'İkisi eşit yol yürümüştür.', [`${a1} daha çok yürümüştür.`, `${a2} daha çok yürümüştür.`, 'Karşılaştırılamaz.']); }];

  O[21] = [
    r => { const g = tam(r, 2, 5), s = tam(r, 2, 9);
      return coktan(p(`${ad(r)} yaz tatilinde dedesinin köyünde ${g} hafta ${s} gün kaldı.`), 'Köyde toplam kaç gün kalmıştır?', String(g * 7 + s), yanN(g * 7 + s, [g * 10 + s, g * 7, g + s, (g + 1) * 7], String)); },
    r => { const d = tam(r, 2, 4), s = tam(r, 10, 50);
      return coktan(p(`Bir koşucu bir turu ${d} dakika ${s} saniyede tamamladı.`), 'Koşucu turu kaç saniyede tamamlamıştır?', String(d * 60 + s), yanN(d * 60 + s, [d * 100 + s, d + s, d * 60, (d + 1) * 60 + s], String)); },
    r => { const y = tam(r, 2, 4), a = tam(r, 1, 11);
      return coktan(p(`${ilgi(ad(r))} kardeşi ${y} yaş ${a} aylık.`), 'Kardeşi kaç aylıktır?', String(y * 12 + a), yanN(y * 12 + a, [y * 10 + a, y + a, y * 12, (y + 1) * 12], String)); }];

  O[22] = [
    r => { const v = tam(r, 3, 9) * 5;
      return coktan(p(`${ad(r)} bir sütun grafiği çiziyor. Grafikte her kare 5 öğrenciyi gösteriyor. Futbol kulübüne ${v} öğrenci katıldı.`), 'Futbol sütunu kaç kare yüksekliğinde çizilmelidir?', String(v / 5), yanN(v / 5, [v, v / 5 + 1, v / 10, v - 5], String)); },
    r => { const b = tam(r, 8, 11), d = tam(r, 35, 50), m = tam(r, 5, 15), n = tam(r, 3, 4), bit = b * 60 + n * d + (n - 1) * m;
      return coktan(p(`${ilgi(ad(r))} okulunda ilk dersin başlama saati ${b}.00. Her ders ${d} dakika, her teneffüs ${m} dakika sürüyor.`), `${n}. ders kaçta biter?`, `${Math.floor(bit / 60)}.${String(bit % 60).padStart(2, '0')}`, [Math.floor((bit + m) / 60) + '.' + String((bit + m) % 60).padStart(2, '0'), Math.floor((bit - m) / 60) + '.' + String((bit - m) % 60).padStart(2, '0'), Math.floor((bit + d) / 60) + '.' + String((bit + d) % 60).padStart(2, '0')]); },
    r => { const et = ['Elma', 'Muz', 'Çilek', 'Üzüm'], de = []; const s = new Set(); while (s.size < 4) s.add(tam(r, 3, 12)); de.push(...s); const i = de.indexOf(Math.max(...de));
      return coktan(p(`${ad(r)} sınıf arkadaşlarına en sevdikleri meyveyi sordu ve çetele tablosu yaptı.`) + tablo(['Meyve', ...et], [['Kişi', ...de.map(String)]]), 'Bu verilerle sütun grafiği çizilirse en uzun sütun hangi meyvenin olur?', et[i], et.filter((_, j) => j !== i)); }];

  O[23] = [
    r => { const [x, y, z, w] = sec1(r, [['A', 'B', 'C', 'D'], ['K', 'L', 'M', 'N'], ['P', 'R', 'S', 'T']]);
      return coktan(p(`${ad(r)} defterine bir kare çizdi ve köşelerini sırasıyla ${x}, ${y}, ${z}, ${w} harfleriyle adlandırdı.`), `${x} köşesinin komşu olduğu köşeler hangileridir?`, `${y} ve ${w}`, [`${y} ve ${z}`, `${z} ve ${w}`, `Yalnız ${z}`]); },
    r => { const [x, y, z] = sec1(r, [['K', 'L', 'M'], ['D', 'E', 'F'], ['R', 'S', 'T']]);
      return coktan(p(`${ad(r)} bir üçgen çizip köşelerine ${x}, ${y}, ${z} harflerini yazdı.`), 'Üçgenin kenarları hangi seçenekte doğru adlandırılmıştır?', `[${x}${y}], [${y}${z}], [${z}${x}]`, [`[${x}${x}], [${y}${y}], [${z}${z}]`, `${x}, ${y}, ${z}`, `[${x}${y}], [${y}${z}]`]); },
    r => { const et = ['Kedi', 'Köpek', 'Kuş', 'Balık'], de = kar(r, [3, 5, 7, 9, 11, 13]).slice(0, 4), mx = Math.max(...de), mn = Math.min(...de);
      return coktan(p(`${ad(r)}, sınıf arkadaşlarına en sevdikleri evcil hayvanı sordu ve sonuçları sütun grafiğine çizdi.`) + grafik('En sevilen evcil hayvan', et, de, 'Öğrenci'), 'En çok seçilen hayvanı seçenler, en az seçilen hayvanı seçenlerden kaç kişi fazladır?', String(mx - mn), yanN(mx - mn, [mx, mn, mx + mn, mx - mn + 2], String)); },
    r => { const et = ['Pzt', 'Salı', 'Çrş', 'Prş'], de = kar(r, [12, 16, 20, 24, 28, 32]).slice(0, 4), t = de.reduce((x, y) => x + y, 0);
      return coktan(p(`${ad(r)}, okul bahçesindeki geri dönüşüm kutusuna dört günde atılan şişe sayısını sütun grafiğiyle gösterdi.`) + grafik('Atılan şişe', et, de, 'Şişe', '#12b886'), 'Dört günde toplam kaç şişe atılmıştır?', String(t), yanN(t, [t + 4, t - 8, Math.max(...de) * 4, t + 10], String)); }];

  O[24] = [
    r => { const t = sec1(r, [[5, 5, 5, 'Eşkenar'], [6, 6, 4, 'İkizkenar'], [7, 7, 3, 'İkizkenar'], [3, 4, 5, 'Çeşitkenar'], [5, 6, 8, 'Çeşitkenar'], [8, 8, 8, 'Eşkenar']]);
      return coktan(p(`${ad(r)} çubuklardan bir üçgen yaptı. Kenar uzunlukları ${t[0]} cm, ${t[1]} cm ve ${t[2]} cm.`), 'Bu üçgen kenar uzunluklarına göre hangi üçgendir?', `${t[3]} üçgen`, ['Eşkenar üçgen', 'İkizkenar üçgen', 'Çeşitkenar üçgen', 'Dik açılı kare'].filter(x => x !== `${t[3]} üçgen`)); },
    r => { const k = tam(r, 3, 6);
      return coktan(p(`${ad(r)} her kenarı ${k} cm olan bir eşkenar üçgen ile her kenarı ${k} cm olan bir kare çizdi.`), 'İki şeklin kenar sayıları toplamı kaçtır?', '7', ['6', '8', String(k * 7)]); },
    r => { const a = tam(r, 2, 5), b = tam(r, 2, 4);
      return coktan(p(`${ad(r)} ${a} tane üçgen ve ${b} tane dörtgen kartondan bir kolaj yaptı.`), 'Kolajdaki şekillerin toplam köşe sayısı kaçtır?', String(3 * a + 4 * b), yanN(3 * a + 4 * b, [a + b, 3 * a + 3 * b, 4 * a + 3 * b, 7 * (a + b)], String)); }];

  O[25] = [
    r => { const e = tam(r, 2, 3), b = tam(r, 2, 3), k = tam(r, 2, 4);
      return coktan(p(`${ad(r)}, eş küplerle tabanı ${e} sıra ve her sırada ${b} küp olan ${k} katlı bir yapı oluşturdu.`), 'Yapıda kaç küp kullanılmıştır?', String(e * b * k), yanN(e * b * k, [e * b + k, e * b * (k - 1), e + b + k, e * b * k + e], String)); },
    r => coktan(p(`${ad(r)}, bir küp şeklindeki hediye kutusunu kesip açınca düz bir karton elde etti.`), 'Bu kartonda (küp açınımında) kaç tane eş kare vardır?', '6', ['4', '8', '12']),
    r => coktan(p(`${ad(r)}, sınıfta "düzlem" kavramına örnek verilecek nesneleri sıralıyor.`), 'Aşağıdakilerden hangisi düzleme en iyi örnektir?', 'Masanın düz yüzeyi', ['Bir kalemin ucu', 'Bir ipin uzunluğu', 'Futbol topu'])];

  O[26] = [
    r => { const [k, x, y] = sec1(r, [['O', 'A', 'B'], ['M', 'K', 'L'], ['E', 'D', 'F']]);
      return coktan(p(`${ad(r)} kâğıda bir açı çizdi. Açının köşesine ${k}, kollarının üzerine ${x} ve ${y} harflerini yazdı.`), 'Bu açı nasıl adlandırılır?', `∠${x}${k}${y}`, [`∠${k}${x}${y}`, `∠${x}${y}${k}`, `∠${k}${y}${x}`]); },
    r => { const [a1, a2] = ikiAd(r), m = tam(r, 5, 8), n = tam(r, 3, m - 1);
      return coktan(p(`${a1} ve ${a2} kâğıttan kestikleri dilimlerle açı ölçüyor. ${ilgi(a2)} kullandığı dilim, ${ilgi(a1)} diliminin iki katı büyüklüğünde. ${ilgi(a1)} açısına ${m} küçük dilim, ${ilgi(a2)} açısına ${n} büyük dilim sığdı.`), 'Hangi açı daha büyüktür?', 2 * n > m ? `${ilgi(a2)} açısı` : 2 * n < m ? `${ilgi(a1)} açısı` : 'İki açı eşittir', [`${ilgi(a2)} açısı`, `${ilgi(a1)} açısı`, 'İki açı eşittir', 'Karşılaştırılamaz'].filter(x => x !== (2 * n > m ? `${ilgi(a2)} açısı` : 2 * n < m ? `${ilgi(a1)} açısı` : 'İki açı eşittir'))); },
    r => coktan(p(`${ad(r)} duvar saatine bakıyor. Akrep ile yelkovan arasında bir açı oluştuğunu fark etti.`), 'Bu açının köşesi neresidir?', 'Akrep ile yelkovanın birleştiği nokta', ['Yelkovanın ucu', 'Saatteki 12 rakamı', 'Akrebin ucu'])];

  O[27] = [
    r => { const a = sec1(r, [10, 20, 30, 40]), b = a + sec1(r, [45, 60, 70, 90, 110]);
      return coktan(p(`${ad(r)} açıölçeri yanlış yerleştirdi: açının bir kolu ${a}, öbür kolu ${b} çizgisini gösteriyor.`), 'Açının gerçek ölçüsü kaç derecedir?', String(b - a), yanN(b - a, [b, a + b, b - a + 10, 180 - b], String)); },
    r => { const s = sec1(r, [[3, 'Dik açı'], [2, 'Dar açı'], [5, 'Geniş açı'], [1, 'Dar açı'], [4, 'Geniş açı']]);
      return coktan(p(`${ad(r)} saatin tam ${s[0]} olduğu anda akrep ile yelkovanın arasındaki açıya baktı.`), 'Bu açı hangi açı türündendir?', s[1], ['Dar açı', 'Dik açı', 'Geniş açı', 'Doğru açı'].filter(x => x !== s[1])); },
    r => coktan(p(`${ad(r)}, bir kâğıdı ikiye katlayıp makasla kesti ve kâğıdı açtığında bir kelebek şekli elde etti.`), 'Kâğıttaki katlama izi şekil için neyi gösterir?', 'Simetri doğrusunu', ['Çevre uzunluğunu', 'Açının köşesini', 'Şeklin alanını'])];

  O[28] = [
    r => { const c = tam(r, 3, 9), m = tam(r, 1, 9);
      return coktan(p(`${ad(r)} cetvelle bir uğur böceğinin yolunu ölçtü: ${c} cm ${m} mm.`), 'Bu uzunluk kaç milimetredir?', String(c * 10 + m), yanN(c * 10 + m, [c * 100 + m, c + m, c * 10, (c + 1) * 10 + m], String)); },
    r => { const k = tam(r, 2, 5);
      return coktan(p(`${ad(r)} kareli kâğıda dikey bir simetri doğrusu çizdi. Simetri doğrusunun ${k} kare solunda bir nokta işaretledi.`), 'Bu noktanın simetriği nerede olmalıdır?', `Simetri doğrusunun ${k} kare sağında`, [`Simetri doğrusunun ${k} kare solunda`, `Simetri doğrusunun ${k + 1} kare sağında`, 'Simetri doğrusunun üzerinde']); },
    r => coktan(p(`${ad(r)} ölçmek istediği şeyleri ve kullanacağı birimleri düşünüyor.`), 'Hangisinin uzunluğunu ölçerken milimetre kullanmak en uygundur?', 'Bir karıncanın boyu', ['Okul koridorunun uzunluğu', 'İki şehir arasındaki uzaklık', 'Futbol sahasının uzunluğu'])];

  O[29] = [
    r => { const k = tam(r, 2, 9), m = tam(r, 1, 9) * 100 + tam(r, 0, 9) * 10;
      return coktan(p(`${ad(r)} ailesiyle ${k} km ${m} m uzunluğundaki bir doğa yürüyüşü parkurunu tamamladı.`), 'Parkur kaç metredir?', f(k * 1000 + m), yanN(k * 1000 + m, [k * 100 + m, k + m, k * 1000, (k + 1) * 1000 + m])); },
    r => coktan(p(`${ad(r)} sınıfın kapısının yüksekliğini ölçmeden önce tahmin etti.`), 'Kapının yüksekliği için en uygun tahmin hangisidir?', 'Yaklaşık 2 m', ['Yaklaşık 20 cm', 'Yaklaşık 20 m', 'Yaklaşık 2 km']),
    r => { const a = tam(r, 3, 8) * 100 + 50;
      return coktan(p(`Okul bahçesinin çevresindeki koşu yolunun bir turu ${a} metredir. ${ad(r)} her gün bu yolda 4 tur koşuyor.`), 'Bir günde kaç metre koşar?', f(4 * a), yanN(4 * a, [a + 4, 2 * a, 4 * a + 100, 3 * a])); }];

  O[30] = [
    r => { const a = tam(r, 120, 250), b = tam(r, 80, 150), c = tam(r, 2, 4);
      return coktan(p(`${ad(r)} bir kurdele makarasından ${a} cm kurdeleyi ikiye, ${b} cm kurdeleyi de ${c} eş parçaya ayırdı.`), 'Kurdelelerden elde edilen toplam parça sayısı kaçtır?', String(2 + c), yanN(2 + c, [c, 2 * c, a + b, 3 + c], String)); },
    r => { const a = tam(r, 6, 15), b = tam(r, 3, a - 1);
      return coktan(p(`${ilgi(ad(r))} odasının duvarına süslemek için uzun kenarı ${a} m, kısa kenarı ${b} m olan dikdörtgen bir pano asıldı. Kenarlarına şerit çekilecek.`), 'Kaç metre şerit gerekir?', String(2 * (a + b)), yanN(2 * (a + b), [a + b, a * b, 2 * a + b, 4 * a], String)); },
    r => { const t = tam(r, 3, 5) * 1000, a = tam(r, 800, 1400), b = tam(r, 500, 900), c = tam(r, 400, 700);
      return coktan(p(`Bir bisiklet yolu ${f(t)} m. ${ad(r)} sabah ${f(a)} m, öğlen ${f(b)} m, akşam ${f(c)} m sürdü.`), 'Yolu bitirmek için daha kaç metre sürmelidir?', f(t - a - b - c), yanN(t - a - b - c, [a + b + c, t - a - b, t - a, t - a - b - c + 100])); }];

  O[31] = [
    r => { const a = tam(r, 5, 9), b = tam(r, 2, a - 1), c = tam(r, b + 1, a + b - 1);
      if (c === a || a + b - c <= 0) return O[31][1](r);
      return coktan(p(`${ad(r)} kenarları ${a} cm ve ${b} cm olan bir dikdörtgen çizdi. Aynı çevre uzunluğunda, bir kenarı ${c} cm olan başka bir dikdörtgen çizecek.`), 'Yeni dikdörtgenin diğer kenarı kaç cm olmalıdır?', String(a + b - c), yanN(a + b - c, [c, a + b, 2 * (a + b) - c, a + b - c + 1], String)); },
    r => { const k = tam(r, 3, 12);
      return coktan(p(`${ad(r)} çevresi ${4 * k} cm olan bir kare çizecek.`), 'Karenin bir kenarı kaç cm olmalıdır?', String(k), yanN(k, [4 * k, 2 * k, k + 4, k - 1], String)); },
    r => { const k = tam(r, 3, 8);
      return coktan(p(`${ad(r)} kenarı ${k} cm olan bir eşkenar üçgen ile çevresi bu üçgene eşit bir kare çizmek istiyor.`), `Karenin çevresi kaç cm olmalıdır?`, String(3 * k), yanN(3 * k, [4 * k, k, 3 * k + 1, 7 * k], String)); }];

  O[32] = [
    r => { const e = tam(r, 4, 9), b = tam(r, 3, 7);
      return coktan(p(`${ad(r)} odasının zeminine birim kare şeklindeki halıfleksleri ${e} sıra, her sıraya ${b} tane olacak şekilde döşedi.`), 'Zeminin alanı kaç birim karedir?', String(e * b), yanN(e * b, [2 * (e + b), e + b, e * b + e, e * b - b], String)); },
    r => { const [a1, a2] = ikiAd(r), a = tam(r, 3, 6), b = tam(r, 4, 7), c = tam(r, 2, 5), d = tam(r, 5, 9);
      if (a * b === c * d) return O[32][0](r);
      return coktan(p(`${a1} ${a} × ${b}, ${a2} ${c} × ${d} birim karelik bir bahçe tasarladı.`), 'Hangi bahçenin alanı daha büyüktür?', a * b > c * d ? `${ilgi(a1)} bahçesi` : `${ilgi(a2)} bahçesi`, [a * b > c * d ? `${ilgi(a2)} bahçesi` : `${ilgi(a1)} bahçesi`, 'İkisi eşittir', 'Karşılaştırılamaz']); }];

  O[33] = [
    r => coktan(p(`${ad(r)} eczanede bir ilaç kutusunun üzerinde "Her tablette 250 ... etken madde vardır." yazısını okudu.`), 'Boş bırakılan yere en uygun ölçü birimi hangisidir?', 'mg', ['kg', 'ton', 'L']),
    r => { const k = tam(r, 2, 6), g = tam(r, 1, 9) * 100 + tam(r, 0, 9) * 10;
      return coktan(p(`${ad(r)} manavdan aldığı elmaları tarttı: ${k} kg ${g} g.`), 'Elmalar kaç gramdır?', f(k * 1000 + g), yanN(k * 1000 + g, [k * 100 + g, k + g, k * 1000, (k + 1) * 1000 + g])); },
    r => coktan(p(`${ad(r)} ölçülecek nesneler için birim seçiyor.`), 'Hangisini ölçerken miligram kullanmak en uygundur?', 'Bir tuz tanesinin kütlesi', ['Bir kamyonun kütlesi', 'Bir karpuzun kütlesi', 'Bir sınıfın genişliği'])];

  O[34] = [
    r => { const g = tam(r, 2, 9);
      return coktan(p(`${ad(r)} pasta tarifindeki ${g} g kabartma tozunu mutfak terazisinde miligram olarak ölçmek istiyor.`), `${g} g kaç miligramdır?`, f(g * 1000), yanN(g * 1000, [g * 100, g * 10, g * 10000, g + 1000])); },
    r => { const n = tam(r, 3, 9), m = sec1(r, [250, 500]);
      return coktan(p(`Bir çocuğa günde ${n} kez ${m} mg şurup içmesi önerildi.`), 'Bir günde toplam kaç mg şurup içer?', f(n * m), yanN(n * m, [n + m, n * m + m, n * 100, (n - 1) * m])); },
    r => { const t = tam(r, 2, 5), k = tam(r, 2, 9) * 100;
      return coktan(p(`Bir kamyon ${t} ton kum taşıyordu. İnşaatta ${f(k)} kg kumu boşalttı.`), 'Kamyonda kaç kg kum kalmıştır?', f(t * 1000 - k), yanN(t * 1000 - k, [t * 1000 + k, t * 100 - k, t * 1000, t * 1000 - k + 100])); }];

  O[35] = [
    r => coktan(p(`${ilgi(ad(r))} doktoru öksürük şurubundan her sabah "5 ..." içmesini söyledi.`), 'Boş bırakılan yere en uygun ölçü birimi hangisidir?', 'mL', ['L', 'kg', 'km']),
    r => { const l = tam(r, 2, 9), m = sec1(r, [250, 500, 750]);
      return coktan(p(`${ad(r)} akvaryumuna ${l} L ${m} mL su koydu.`), 'Akvaryumdaki su kaç mililitredir?', f(l * 1000 + m), yanN(l * 1000 + m, [l * 100 + m, l + m, l * 1000, (l + 1) * 1000 + m])); },
    r => { const s = sec1(r, [200, 250]), n = tam(r, 4, 8);
      return coktan(p(`${ad(r)} doğum günü için ${n} bardak limonata hazırlayacak. Her bardak ${s} mL alıyor.`), 'Kaç mL limonata gerekir?', f(n * s), yanN(n * s, [n + s, n * s + s, n * 100, (n - 1) * s])); }];

  O[36] = [
    r => coktan(p(`${ad(r)} mutfaktaki kapların alabileceği su miktarını ölçmeden önce tahmin ediyor.`), 'Bir su bardağı için en uygun tahmin hangisidir?', 'Yaklaşık 200 mL', ['Yaklaşık 2 L', 'Yaklaşık 20 L', 'Yaklaşık 2 mL']),
    r => { const a = tam(r, 3, 6), m = sec1(r, [500, 750]), c = tam(r, 3, 6), s = 250;
      return coktan(p(`Bir sürahide ${a} L su vardı. ${ad(r)} önce ${m} mL su içti, sonra ${c} bardak doldurdu; her bardak ${s} mL alıyor.`), 'Sürahide kaç mL su kalmıştır?', f(a * 1000 - m - c * s), yanN(a * 1000 - m - c * s, [a * 1000 - m, a * 1000 - c * s, m + c * s, a * 1000 - m - c * s + 250])); },
    r => { const [a1, a2] = ikiAd(r), x = tam(r, 2, 4), y = tam(r, 1, 3) * 500 + x * 1000 - tam(r, 1, 3) * 250;
      if (x * 1000 === y) return O[36][1](r);
      return coktan(p(`${ilgi(a1)} matarasında ${x} L, ${ilgi(a2)} matarasında ${f(y)} mL su var.`), 'Kimin matarasında daha çok su vardır?', x * 1000 > y ? a1 : a2, [x * 1000 > y ? a2 : a1, 'İkisi eşittir', 'Karşılaştırılamaz']); }];

  O[17].push(
    r => { const a = tam(r, 3, 8), b = tam(r, 3, 8), c = tam(r, 2, 9), d = a * b - c;
      if (d <= 0) return O[17][0](r);
      return coktan(p(`${ad(r)} terazinin sol kefesine "${a} × ${b}", sağ kefesine "${c}" yazan kartı koydu. Terazi dengede değil.`), 'Teraziyi dengelemek için sağ kefeye hangi kart eklenmelidir?', `+ ${d}`, [`+ ${a * b}`, `+ ${d + 2}`, `+ ${a + b}`]); },
    r => { const y = sec1(r, [3, 4, 6]), t = tam(r, 1, 3), k = tam(r, 1, y - 1);
      return coktan(p(`${ad(r)}, her biri ${y} dilime bölünmüş börekten ${t} tanesini bütün olarak, bir tanesinden de ${k} dilim aldı.`), 'Aldığı börek miktarını gösteren kesir hangisidir?', `${t} tam ${k}/${y}`, [`${k} tam ${t}/${y}`, `${t + k}/${y}`, `${t} tam ${y}/${k}`]); });
  O[20].yalniz = true;
  O[20].push(
    r => { const y = sec1(r, [7, 9, 11]), a = tam(r, 1, 3), b = tam(r, 1, 3), c = tam(r, 2, y - 1), [a1, a2] = ikiAd(r), t = a + b;
      if (t === c) return O[20][0](r);
      return coktan(p(`${a1} bir pizzanın ${a}/${y} kesri kadarını öğlen, ${b}/${y} kesri kadarını akşam yedi. ${a2} aynı büyüklükteki pizzanın ${c}/${y} kesri kadarını yedi.`), 'Hangisi doğrudur?', t > c ? `${a1} daha çok yemiştir.` : `${a2} daha çok yemiştir.`, [t > c ? `${a2} daha çok yemiştir.` : `${a1} daha çok yemiştir.`, 'İkisi eşit yemiştir.', 'Karşılaştırılamaz.']); },
    r => { const y = sec1(r, [8, 10, 12]), a = tam(r, 1, 4), b = tam(r, 2, y - a - 1), t = a + b;
      return coktan(p(`${ad(r)} bir yapbozun ${a}/${y} kesri kadarını tamamlamıştı. Bugün biraz daha yaptı ve yapbozun ${t}/${y} kesri kadarı tamamlandı.`), 'Bugün yapbozun ne kadarını yapmıştır?', `${b}/${y}`, [`${t}/${y}`, `${a + t}/${y}`, `${b}/${2 * y}`]); });
  O[20].push(
    r => { const y = sec1(r, [6, 8, 10]), a0 = tam(r, 1, y - 2), a = a0 * 2 === y ? a0 - 1 : a0;
      return coktan(p(`${ad(r)} bir şişe suyun ${a}/${y} kesri kadarını içti.`), 'Şişede suyun ne kadarı kalmıştır?', `${y - a}/${y}`, [`${a}/${y}`, `${y}/${y - a}`, `${y - a}/${a}`]); },
    r => { const y = sec1(r, [5, 7, 9]), a = tam(r, 1, 2), b = tam(r, 1, 2), c = tam(r, 1, 2);
      return coktan(p(`${ad(r)} bir kitabın ${a}/${y} kesri kadarını pazartesi, ${b}/${y} kesri kadarını salı, ${c}/${y} kesri kadarını çarşamba okudu.`), 'Üç günde kitabın ne kadarını okumuştur?', `${a + b + c}/${y}`, [`${a + b + c}/${3 * y}`, `${a * b * c}/${y}`, `${a + b + c + 1}/${y}`]); },
    r => { const y = sec1(r, [8, 10, 12]), a = tam(r, 4, y - 2), b = tam(r, 1, a - 2);
      return coktan(p(`Bir bidonun ${a}/${y} kesri kadarı süt ile doluydu. ${ad(r)} kahvaltıda bidondaki sütün ${b}/${y} kesri kadarını kullandı.`), 'Bidonda ne kadar süt kalmıştır?', `${a - b}/${y}`, [`${a + b}/${y}`, `${a - b}/${2 * y}`, `${y - a}/${y}`]); });
  return O;
};
