// Ladin Ormanı — 3. sınıf Fen Bilimleri haftalık çalışma kâğıtları (MEB 2026-2027 taslak yıllık planı, TYMM).
// Tema: "Bilim Kâşifi Defteri". Deney föyü (tahmin → gözlem → sonuç), yaşam döngüsü çarkı, maddenin hâlleri modeli,
// hareket izleri, toprak katmanları, atık kutuları, bilmece-şifre. hayat2.js bileşenleri (A) de kullanılır.
// Resimler: var olanlar kullanılır (resimVar); fen3 ızgaraları gelince kendiliğinden eklenir. Üretim: node kaynak/calisma-kagitlari/uret.js f3
module.exports = ({ etk, resim, numarala, resimVar, A }) => {
  const { S, cizgi, esle, ciz, yaz, dy, siniflandir, resimSec } = A;
  const tablo = (...a) => A.tablo(...a).replace('class="h2-tablo', 'class="h2-tablo f3-tab');
  const var_ = l => l.filter(x => Array.isArray(x) ? resimVar(x[0]) : resimVar(x));
  // Resimli sınıflandırma; yeterli resim yoksa sözcük bankalı sürüme düşer.
  const ayir = (yonerge, kutular, resimler, sozcukler, t) => var_(resimler).length >= 6 ? siniflandir(yonerge, kutular, var_(resimler), t) : banka(yonerge, kutular, sozcukler);
  const banka = (yonerge, kutular, ogeler, n = 3) => etk(0, yonerge,
    `<div class="h2-banka ttkb">${ogeler.map(s => `<span>${s}</span>`).join('')}</div><div class="f3-kutu ttkb" style="grid-template-columns:repeat(${kutular.length},1fr)">${kutular.map(([b, r]) => `<div style="border-color:${r}"><b style="color:${r}">${b}</b>${cizgi(n)}</div>`).join('')}</div>`);

  // Deney föyü: malzeme, adımlar, tahmin, gözlem, sonuç.
  const deney = (baslik, malzeme, adimlar, soru) => etk(0, `Deney zamanı: ${baslik} Bir büyüğünle birlikte yap.`,
    `<div class="f3-deney ttkb"><div class="f3-malz"><b>🧪 Malzemeler</b>${malzeme.map(m => `<span>${m}</span>`).join('')}</div><ol>${adimlar.map(a => `<li>${a}</li>`).join('')}</ol>
    <div class="f3-ug"><div style="--r:#3a86ff"><b>Tahminim</b><small>${soru}</small>${cizgi(2)}</div><div style="--r:#f4a100"><b>Gözlemim</b><small>Ne oldu?</small>${cizgi(2)}</div><div style="--r:#12b886"><b>Sonucum</b><small>Ne öğrendim?</small>${cizgi(2)}</div></div></div>`);
  // Yaşam döngüsü çarkı: numaralı daireler, oklar; yanda sözcük bankası ve çizgiler.
  const dongu = (yonerge, asamalar) => { const n = asamalar.length, r = 70, c = 95; let s = '';
    for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n, b = a + 2 * Math.PI / n;
      const [x, y] = [c + r * Math.cos(a), c + r * Math.sin(a)], m = (a + b) / 2;
      s += `<path d="M${(c + r * Math.cos(a + .42)).toFixed(1)} ${(c + r * Math.sin(a + .42)).toFixed(1)} A${r} ${r} 0 0 1 ${(c + r * Math.cos(b - .42)).toFixed(1)} ${(c + r * Math.sin(b - .42)).toFixed(1)}" fill="none" stroke="#9db4c8" stroke-width="3" marker-end="url(#ok)"/>`;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="24" fill="#fff" stroke="#12b886" stroke-width="3"/><text x="${x.toFixed(1)}" y="${(y + 7).toFixed(1)}" text-anchor="middle" font-size="20" fill="#12b886">${i + 1}</text>`; void m; }
    s = '<defs><marker id="ok" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9db4c8"/></marker></defs>' + s;
    const kar = [...asamalar].sort();
    return etk(0, yonerge, `<div class="f3-dongu"><div>${S(190, 190, s, 70)}</div><div class="ttkb"><div class="h2-banka">${kar.map(x => `<span>${x}</span>`).join('')}</div>${asamalar.map((_, i) => `<p><b>${i + 1}.</b><i></i></p>`).join('')}</div></div>`); };
  // Maddenin hâlleri: tanecik modeli.
  const halModel = () => { const kut = (x, top) => `<rect x="${x}" y="10" width="90" height="90" rx="6" fill="#fff" stroke="#1d4e89" stroke-width="2.5"/>` + top.map(([a, b]) => `<circle cx="${x + a}" cy="${10 + b}" r="7" fill="#7ab8ff" stroke="#1d4e89"/>`).join('');
    const kati = [], sivi = [[14, 80], [30, 82], [46, 78], [62, 82], [78, 80], [20, 64], [38, 66], [56, 62], [72, 66], [30, 50]], gaz = [[16, 20], [70, 18], [44, 46], [20, 76], [76, 70], [56, 84]];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) kati.push([21 + i * 16, 21 + j * 16]);
    return etk(0, 'Tanecik dedektifi! Maddeler çok küçük taneciklerden oluşur. Kutuların altına katı, sıvı ya da gaz yaz. Sonra her birine bir örnek ver.',
      `<div class="f3-hal">${S(320, 110, kut(10, kati) + kut(115, sivi) + kut(220, gaz), 150)}<div class="f3-kutu ttkb" style="grid-template-columns:repeat(3,1fr)">${['A', 'B', 'C'].map(h => `<div style="border-color:#3a86ff"><b style="color:#3a86ff">${h} kutusu</b><small>Hâli:</small>${cizgi(1)}<small>Örnek:</small>${cizgi(1)}</div>`).join('')}</div></div>`); };
  // Hareket izleri: dönme, sallanma, yuvarlanma, kayma.
  const hareketIz = () => { const iz = [
    '<circle cx="45" cy="45" r="26" fill="none" stroke="#3a86ff" stroke-width="4" stroke-dasharray="120 60" marker-end="url(#ok2)"/><circle cx="45" cy="45" r="4" fill="#1d4e89"/>',
    '<line x1="45" y1="10" x2="45" y2="20" stroke="#1d4e89" stroke-width="3"/><line x1="45" y1="12" x2="28" y2="62" stroke="#5b6b7b" stroke-width="2"/><circle cx="28" cy="66" r="8" fill="#f4a100"/><path d="M18 68 Q45 88 72 68" fill="none" stroke="#3a86ff" stroke-width="4" marker-end="url(#ok2)"/>',
    '<line x1="5" y1="78" x2="85" y2="78" stroke="#5b6b7b" stroke-width="2"/><circle cx="30" cy="58" r="18" fill="#ffd6dc" stroke="#1f2a24" stroke-width="2"/><line x1="30" y1="40" x2="30" y2="76" stroke="#1f2a24"/><path d="M52 44 A22 22 0 0 1 60 70" fill="none" stroke="#3a86ff" stroke-width="4" marker-end="url(#ok2)"/>',
    '<line x1="5" y1="70" x2="85" y2="70" stroke="#5b6b7b" stroke-width="2"/><rect x="12" y="46" width="30" height="24" fill="#d8f5e9" stroke="#1f2a24" stroke-width="2"/><line x1="48" y1="58" x2="80" y2="58" stroke="#3a86ff" stroke-width="4" marker-end="url(#ok2)"/>'];
    const d = '<defs><marker id="ok2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#3a86ff"/></marker></defs>';
    return etk(0, 'Hareket izleri! Her çizim bir hareketi gösteriyor. Altına hareketin adını yaz: dönme, sallanma, yuvarlanma, kayma. Sonra bu hareketi yapan bir varlık yaz.',
      `<div class="f3-iz ttkb">${iz.map(z => `<div>${S(90, 90, d + z, 34)}<small>Hareket:</small>${cizgi(1)}<small>Örnek:</small>${cizgi(1)}</div>`).join('')}</div>`); };
  // Toprak katmanları.
  const toprakKatman = () => { const k = [['#6b8e23', 0, 14], ['#5a3b1e', 14, 34], ['#a0703c', 48, 40], ['#c9a46a', 88, 34], ['#8d8d8d', 122, 40]];
    let s = k.map(([r, y, h]) => `<rect x="10" y="${y + 6}" width="140" height="${h}" fill="${r}"/>`).join('');
    s += [[30, 6], [60, 4], [100, 7], [130, 5]].map(([x, h]) => `<path d="M${x} 6 l-4 -${h} M${x} 6 l4 -${h}" stroke="#2f7d32" stroke-width="2"/>`).join('');
    s += [[40, 140], [90, 150], [120, 136], [60, 156]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#6f6f6f"/>`).join('');
    s += [26, 64, 108, 145].map((y, i) => `<line x1="150" y1="${y}" x2="172" y2="${y}" stroke="#1f2a24" stroke-width="1.5"/><text x="176" y="${y + 4}" font-size="12">${i + 1}</text>`).join('');
    return etk(0, 'Toprağın katmanlarını keşfet! Numaraların karşısına doğru katmanı yaz: üst toprak (humuslu), alt toprak, toprağa dönüşen kaya parçaları, ana kaya.',
      `<div class="f3-dongu"><div>${S(190, 170, s, 75)}</div><div class="ttkb">${[1, 2, 3, 4].map(i => `<p><b>${i}.</b><i></i></p>`).join('')}<small class="f3-not">İpucu: En üstteki ince yeşil kısım bitki örtüsüdür.</small></div></div>`); };
  // Atık kutuları.
  const atik = (ogeler) => banka('Atık dedektifi! Her atığı doğru geri dönüşüm kutusuna yaz.', [['Kâğıt', '#3a86ff'], ['Plastik', '#f4a100'], ['Cam', '#12b886'], ['Metal', '#7d8597']], ogeler, 3);
  // Bilmece: ipucu + harf kutuları; işaretli kutulardan şifre sözcük çıkar.
  const bilmece = (yonerge, liste, sifre) => etk(0, yonerge,
    `<div class="f3-bil ttkb">${liste.map(([ip, cevap, k]) => `<div><p>${ip}</p><span>${[...cevap].map((_, i) => `<i${sifre && i === k ? ' class="y"' : ''}></i>`).join('')}</span></div>`).join('')}</div>${sifre ? `<p class="ttkb f3-sifre">🔑 Renkli kutulardaki harfleri sırayla yaz: <span>${[...sifre].map(() => '<i></i>').join('')}</span></p>` : ''}`);
  // Kâşif rozeti: hafta sonu öz değerlendirme.
  const rozet = (maddeler) => etk(0, 'Kâşif rozetim! Bu hafta öğrendiklerini düşün. Yapabildiklerinin yanındaki yıldızı boya.',
    `<div class="f3-rozet ttkb">${maddeler.map(m => `<div><span>⭐</span><p>${m}</p></div>`).join('')}</div>`);
  const tahmin = (yonerge, satirlar, bas = ['Durum', 'Tahminim', 'Gözlemim']) => tablo(yonerge, bas, satirlar.map(s => [s, '', '']));

  const W = (hafta, unite, baslik, konu, sayfalar) => ({ unite, hafta, baslik, konu, sayfalar });
  const F3 = {
    'hafta-01': W(1, 1, 'Bilim Kâşifi Oluyorum', 'Bilimsel bilgiye ulaşma yolları', () => [numarala([
      banka('Bilgiye nasıl ulaşırız? Kutudaki örnekleri doğru yola yaz.', [['Gözlem yaparak', '#3a86ff'], ['Deney yaparak', '#f2546b'], ['Araştırarak', '#12b886']], ['Kuşların yuvasını dürbünle izlemek', 'Buzun sıcakta erimesini denemek', 'Ansiklopediden balinaları okumak', 'Ayın şeklini her gece çizmek', 'Tohumu farklı ışıkta yetiştirmek', 'Bir bilim insanıyla söyleşi yapmak']),
      dy(['Bilim insanları merak ettikleri bir soruyla işe başlar.', 'Bir bilgi internette yazıyorsa kesinlikle doğrudur.', 'Gözlem yaparken duyu organlarımızı kullanırız.', 'Deney yaparken sonucu tahmin edebiliriz.'])]),
    numarala([deney('Hangi nesne suda batar?', ['Bir kap su', 'Taş', 'Mantar tıpa', 'Kurşun kalem', 'Silgi', 'Yaprak'], ['Nesneleri incele ve her biri için tahminini yaz.', 'Nesneleri sırayla suya bırak.', 'Hangilerinin battığını, hangilerinin yüzdüğünü gözlemle.'], 'Hangileri batar?'),
      yaz('Merak ettiğin bir soruyu yaz. Bu soruya nasıl cevap bulabilirsin?', ['Merak ettiğim soru:', 'Cevabı bulmak için ne yapabilirim?'])])]),
    'hafta-02': W(2, 1, 'Bilgi Peşinde', 'Bilimsel bilgiye ulaşma yolları, bilim insanlarının özellikleri', () => [numarala([
      tablo('Güvenilir kaynak mı? Her kaynağın yanına ✓ ya da ✗ koy, nedenini yaz.', ['Kaynak', '✓ / ✗', 'Neden?'], [['Bilim ansiklopedisi', '', ''], ['Arkadaşımın duyduğu söylenti', '', ''], ['Müzedeki bilgi panosu', '', ''], ['Kimin yazdığı belli olmayan bir paylaşım', '', ''], ['Öğretmenimin önerdiği kitap', '', '']]),
      bilmece('Bilim bilmecesi! İpuçlarını oku, cevabı kutulara yaz.', [['Bir şeyi dikkatle izleyip incelemek', 'GÖZLEM', 0], ['Bir fikri sınamak için yapılan çalışma', 'DENEY', 4], ['Bilgi topladığımız yer', 'KAYNAK', 2], ['Küçük şeyleri büyük gösteren araç', 'BÜYÜTEÇ', 3]])]),
    numarala([yaz('Bir gün boyunca çevreni gözlemle. Üç gözlem yaz ve her biri için bir soru sor.', ['Gözlemim 1 ve sorum:', 'Gözlemim 2 ve sorum:', 'Gözlemim 3 ve sorum:']),
      ciz('Gözlem yaptığın bir anı çiz. Hangi duyu organlarını kullandığını resmin yanına yaz.', 70)])]),
    'hafta-03': W(3, 1, 'Bilim İnsanı Gibi', 'Bilim insanlarının özellikleri', () => [numarala([
      esle('Bilim insanının hangi davranışı hangi özelliğini gösterir? Eşleştir.', [['#Aynı deneyi birçok kez tekrarlar.', '#Sabırlı'], ['#Her şeyin nedenini sorar.', '#Meraklı'], ['#Hatalarından ders çıkarır.', '#Açık fikirli'], ['#Farklı düşüncelere kulak verir.', '#Kararlı'], ['#Sonuçları doğru ve eksiksiz yazar.', '#Dürüst']], 31),
      dy(['Bilim insanları yalnızca laboratuvarda çalışır.', 'Bilim insanları çalışmalarını başkalarıyla paylaşır.', 'Kadın ve erkek herkes bilim insanı olabilir.'])]),
    numarala([tablo('Bilim insanı kartı! Bir bilim insanını araştır. Bir büyüğünden, kitaptan ya da güvenilir bir siteden yararlan.', ['Soru', 'Cevap'], [['Adı:', ''], ['Hangi alanda çalıştı?', ''], ['Neyi merak etti?', ''], ['Bize ne kazandırdı?', ''], ['Hangi özelliğini örnek alıyorum?', ''], ['Kaynağım:', '']]),
      rozet(['Bilgiye ulaşma yollarını sayabilirim.', 'Güvenilir kaynağı ayırt edebilirim.', 'Bilim insanlarının özelliklerini söyleyebilirim.'])])]),
    'hafta-04': W(4, 2, 'Canlılar Dünyası', 'Canlıların sınıflandırılması', () => [numarala([
      banka('Canlılar dört gruba ayrılır! Her canlıyı doğru gruba yaz.', [['Mikroskopla görülen', '#8b5cf6'], ['Mantarlar', '#f4a100'], ['Bitkiler', '#12b886'], ['Hayvanlar', '#f2546b']], ['Bakteri', 'Şapkalı mantar', 'Papatya', 'Kedi', 'Ekmek küfü', 'Çam ağacı', 'Arı', 'Maya', 'Yosun', 'Balık', 'Çilek', 'Kurbağa'], 2),
      dy(['Bazı canlılar o kadar küçüktür ki ancak mikroskopla görülür.', 'Mantarlar da bitkiler gibi kendi besinini üretir.', 'Hayvanlar besinlerini dışarıdan alır.'])]),
    numarala([tablo('Canlı mı, cansız mı? Her varlık için ✓ koy.', ['Varlık', 'Beslenir', 'Büyür', 'Ürer', 'Canlı mı?'], ['Ağaç', 'Taş', 'Kedi', 'Bulut', 'Mantar', 'Oyuncak robot'].map(v => [v, '', '', '', ''])),
      bilmece('Canlı bilmecesi!', [['Topraktan beslenir, güneşi sever, yaprakları vardır.', 'BİTKİ', 0], ['Nemli yerde, çürümüş ağaçta biter.', 'MANTAR', 1], ['Gözle görülmez, büyüteçle bile seçilmez.', 'BAKTERİ', 2]], 'BAK')])]),
    'hafta-05': W(5, 2, 'Mikroskobun Gözüyle', 'Canlıların sınıflandırılması', () => [numarala([
      deney('Ekmekte küf oluşur mu?', ['İki dilim ekmek', 'İki kilitli poşet', 'Biraz su', 'Büyüteç'], ['Bir dilimi az suyla nemlendir, diğerini kuru bırak.', 'İkisini de poşete koyup kapat, karanlık bir yere bırak.', 'Bir hafta her gün büyüteçle incele. Poşetleri açma!'], 'Hangisinde küf olur?'),
      tahmin('Küf günlüğü! Her gün gözlemini yaz.', ['1. gün', '3. gün', '5. gün', '7. gün'], ['Gün', 'Nemli ekmek', 'Kuru ekmek'])]),
    numarala([esle('Canlıyı yaşadığı ya da bulunduğu yerle eşleştir.', [['#Maya', '#Hamur'], ['#Küf mantarı', '#Bayat ekmek'], ['#Yosun', '#Nemli taş'], ['#Bakteri', '#Yoğurt']], 51),
      yaz('Mikroskobik canlıların yararları ve zararları nelerdir? Araştırıp yaz.', ['Yararı:', 'Zararı:', 'Kendimi nasıl korurum?'])])]),
    'hafta-06': W(6, 2, 'Beş Duyum', 'Duyu organlarının işlevleri', () => [numarala([
      tablo('Duyu haritam! Tabloyu tamamla.', ['Duyu', 'Organ', 'Ne algılarız?', 'Bir örnek'], [['Görme', 'Göz', '', ''], ['İşitme', '', 'Sesleri', ''], ['Koklama', '', '', 'Çiçek kokusu'], ['Tatma', 'Dil', '', ''], ['Dokunma', '', 'Sıcak, soğuk, sert, yumuşak', '']]),
      dy(['Gözlerimizi korumak için güneşe doğrudan bakmayız.', 'Kulaklarımızı sivri cisimlerle temizleriz.', 'Yemeğin tadını alırken kokusu da yardımcı olur.'])]),
    numarala([deney('Gizemli kutu!', ['Ağzı kapalı bir kutu', 'Kutuya konacak 3 nesne (ör. silgi, kaşık, pamuk)', 'Göz bandı'], ['Bir büyüğün kutuya sen görmeden nesneleri koysun.', 'Gözlerin bağlıyken elinle dokun, kutuyu salla, kokla.', 'Hangi duyunla neyi bulduğunu yaz.'], 'Kutuda neler var?'),
      yaz('Hangi duyu organın sana en çok yardım etti? Neden?', ['Organ ve nedeni:'])])]),
    'hafta-07': W(7, 2, 'Canlılar Nasıl Algılar?', 'Duyu organlarının işlevleri', () => [numarala([
      esle('Hayvanlar çevrelerini nasıl algılar? Eşleştir.', [['#Yarasa', '#Ses yankısıyla yolunu bulur.'], ['#Köpek', '#Çok güçlü koku alır.'], ['#Kedi', '#Bıyıklarıyla dar yerleri ölçer.'], ['#Kartal', '#Çok uzağı keskin görür.'], ['#Yılan', '#Diliyle koku toplar.']], 71),
      dy(['Bütün canlılar çevrelerini aynı yolla algılar.', 'Bitkiler de ışığa doğru yönelir.'])]),
    numarala([tahmin('Ses dedektifi! Gözlerini kapat, sesi dinle ve neyin sesi olduğunu tahmin et. Bir büyüğün sesleri çıkarsın.', ['Kâğıt buruşturma', 'Kaşığı bardağa vurma', 'Su dökme', 'Anahtar şıngırdatma'], ['Ses', 'Tahminim', 'Doğru mu?']),
      ciz('Bir hayvanın dünyayı nasıl algıladığını hayal et ve çiz: Örneğin bir yarasa gece nasıl uçar?', 80)])]),
    'hafta-08': W(8, 2, 'Büyüyen Canlılar', 'Duyu organları, canlıların yaşam döngüleri', () => [numarala([
      dongu('Kelebeğin yaşam döngüsü! Çarktaki numaralara aşamaları sırasıyla yaz.', ['Yumurta', 'Tırtıl', 'Koza (pupa)', 'Kelebek']),
      dy(['Tırtıl kelebeğin yavrusudur.', 'Kelebek yumurtadan kanatlı olarak çıkar.', 'Yaşam döngüsü bir çember gibi tekrar eder.'])]),
    numarala([dongu('Fasulyenin yaşam döngüsü! Aşamaları sırasıyla yaz.', ['Tohum', 'Filiz', 'Genç bitki', 'Çiçekli bitki', 'Meyve ve yeni tohum']),
      rozet(['Beş duyumu ve organlarını söyleyebilirim.', 'Duyu organlarımı nasıl koruyacağımı bilirim.', 'Bir yaşam döngüsünü sırasıyla anlatabilirim.'])])]),
    'hafta-09': W(9, 2, 'Döngüler ve Taşlar', 'Canlıların yaşam döngüleri, kayaçlar', () => [numarala([
      dongu('Kurbağanın yaşam döngüsü! Aşamaları sırasıyla yaz.', ['Yumurta', 'İribaş', 'Bacaklı iribaş', 'Yavru kurbağa', 'Ergin kurbağa']),
      tablo('Döngüleri karşılaştır! Tümevarım yap: Bütün döngülerde ortak olan ne?', ['Canlı', 'İlk aşama', 'Son aşama'], [['Kelebek', '', ''], ['Kurbağa', '', ''], ['Tavuk', '', ''], ['Fasulye', '', '']])]),
    numarala([yaz('Döngülerden ne sonuç çıkarıyorsun? Bütün canlılar için geçerli bir kural yaz.', ['Bütün canlılar…']),
      banka('Yer bilimcisi gibi! Kayaç, maden ve mineral örneklerini doğru gruba yaz.', [['Kayaç', '#8e5b2b'], ['Maden', '#7d8597'], ['Mineral', '#8b5cf6']], ['Granit', 'Mermer', 'Demir', 'Bakır', 'Kuvars', 'Tuz', 'Altın', 'Kireç taşı'], 3)])]),
    'hafta-10': W(10, 3, 'Taşların Sırrı', 'Kayaçlar, madenler ve mineraller', () => [numarala([
      deney('Taşları incele!', ['Farklı 4 taş', 'Büyüteç', 'Bir çivi', 'Bir kap su'], ['Taşları büyüteçle incele: renk, desen, parlaklık.', 'Çiviyle hafifçe çiz: İz kalıyor mu?', 'Taşları suya bırak, gözlemle.'], 'En sert taş hangisi?'),
      tablo('Taş kimlik kartı!', ['Taş', 'Rengi', 'Sert mi?', 'Pürüzlü mü?'], [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', '']])]),
    numarala([esle('Kayaç ve madenler nerede kullanılır? Eşleştir.', [['#Mermer', '#Heykel, merdiven'], ['#Demir', '#Köprü, çivi'], ['#Bakır', '#Elektrik kablosu'], ['#Kum', '#Cam yapımı'], ['#Kömür', '#Isınma']], 101),
      dy(['Kayaçlar bir ya da birden fazla mineralden oluşur.', 'Madenler doğada sonsuz miktarda bulunur.', 'Tuz da bir mineraldir.'])])]),
    'hafta-11': W(11, 3, 'Fosil Avcısı', 'Kayaçlar, madenler ve mineraller; fosil oluşumu', () => [numarala([
      tablo('Tümdengelim yap! Kural: "Madenler yer kabuğundan çıkarılır ve işlenerek kullanılır." Bu kurala göre örnekleri tamamla.', ['Maden', 'Nereden çıkarılır?', 'Neye dönüşür?'], [['Demir', '', ''], ['Altın', '', ''], ['Bakır', '', '']]),
      bilmece('Yer bilim bilmecesi!', [['Taşlaşmış canlı kalıntısı', 'FOSİL', 0], ['Fosilleri inceleyen bilim insanı', 'PALEONTOLOG', 0], ['Heykel yapılan beyaz taş', 'MERMER', 0]])]),
    numarala([etk(0, 'Fosil nasıl oluşur? Aşamaları sırala, kutulara 1\'den 4\'e kadar numara ver.', `<div class="h2-dy">${['Üzerini yıllar içinde kum ve çamur katmanları örter.', 'Bir canlı ölür ve çamurun içine gömülür.', 'Milyonlarca yıl sonra kalıntı taşlaşır, fosil olur.', 'Canlının yumuşak kısımları çürür, sert kısımları kalır.'].map(s => `<div><p class="ttkb">${s}</p><i></i></div>`).join('')}</div>`),
      ciz('Sen bir paleontologsun! Kazıda bulduğun bir fosili çiz ve hangi canlıya ait olabileceğini yaz.', 70)])]),
    'hafta-12': W(12, 3, 'Fosil Yapıyorum', 'Fosil oluşumu', () => [numarala([
      deney('Kendi fosilimi yapıyorum!', ['Oyun hamuru ya da kil', 'Deniz kabuğu, yaprak', 'Biraz alçı ve su (bir büyüğünle)'], ['Hamuru düzle, kabuğu bastır ve çıkar.', 'İzin içine sulandırılmış alçı dök.', 'Bir gün bekle, alçıyı çıkar ve incele.'], 'Fosilim neye benzer?'),
      dy(['Fosiller bize geçmişte yaşamış canlılar hakkında bilgi verir.', 'Bütün canlılar ölünce fosil olur.', 'Dinozorları fosilleri sayesinde tanıyoruz.'])]),
    numarala([yaz('Fosillerden öğrendiklerini birleştir: Bir fosil bize neler anlatabilir?', ['Canlı ne zaman yaşamış olabilir?', 'Nerede yaşamış olabilir?', 'Ne ile beslenmiş olabilir?']),
      tablo('Fosil müzesi! Araştır ve tamamla.', ['Fosil', 'Hangi canlı?', 'Nerede bulundu?'], [['', '', ''], ['', '', ''], ['', '', '']])])]),
    'hafta-13': W(13, 4, 'Madde Dedektifi', 'Fosil oluşumu; maddenin katı, sıvı ve gaz hâli', () => [numarala([
      halModel(),
      rozet(['Kayaç, maden ve minerale örnek verebilirim.', 'Fosilin nasıl oluştuğunu anlatabilirim.', 'Maddenin üç hâlini söyleyebilirim.'])]),
    numarala([banka('Evdeki maddeleri hâllerine göre sınıflandır.', [['Katı', '#3a86ff'], ['Sıvı', '#12b886'], ['Gaz', '#f4a100']], ['Kaşık', 'Süt', 'Balondaki hava', 'Taş', 'Zeytinyağı', 'Su buharı', 'Kitap', 'Meyve suyu', 'Buz']),
      dy(['Katıların belirli bir şekli vardır.', 'Sıvılar konuldukları kabın şeklini alır.', 'Gazlar bulundukları yeri tamamen doldurur.'])])]),
    'hafta-14': W(14, 4, 'Katı, Sıvı, Gaz', 'Maddenin katı, sıvı ve gaz hâli', () => [numarala([
      deney('Şekil değiştiren su!', ['Farklı şekilli 3 kap (bardak, tabak, şişe)', 'Bir ölçü kabı su'], ['Ölçü kabındaki suyu sırayla her kaba dök.', 'Suyun şeklini gözlemle.', 'Sonra suyu yine ölçü kabına dök: Miktar değişti mi?'], 'Suyun şekli değişir mi?'),
      tablo('Özellik avı! Tabloyu ✓ ile doldur.', ['Özellik', 'Katı', 'Sıvı', 'Gaz'], [['Belirli bir şekli var', '', '', ''], ['Akabilir', '', '', ''], ['Kabın şeklini alır', '', '', ''], ['Elle tutulabilir', '', '', '']])]),
    numarala([bilmece('Madde bilmecesi!', [['Dökünce akar, kabın şeklini alır.', 'SIVI', 0], ['Görünmez ama balonu şişirir.', 'GAZ', 0], ['Şekli değişmez, elle tutulur.', 'KATI', 0], ['Suyun katı hâli', 'BUZ', 0]]),
      ciz('Mutfakta katı, sıvı ve gaz hâlinde maddelerin bir arada olduğu bir sahne çiz. Her birini etiketle.', 60)])]),
    'hafta-15': W(15, 4, 'Maddeler Her Yerde', 'Maddenin katı, sıvı ve gaz hâli', () => [numarala([
      deney('Hava yer kaplar mı?', ['Derin bir kap su', 'Boş bir bardak', 'Kâğıt mendil'], ['Mendili buruşturup bardağın dibine sıkıştır.', 'Bardağı ters çevir ve dik olarak suya batır.', 'Bardağı dik çıkar, mendile dokun.'], 'Mendil ıslanır mı?'),
      dy(['Hava gözle görülmez ama yer kaplar.', 'Sıvılar elle tutulup şekil verilebilir.', 'Tahta, hem katı hem sıvıdır.'])]),
    numarala([tablo('Evinde madde avına çık! Her odadan bir örnek bul.', ['Oda', 'Katı', 'Sıvı', 'Gaz'], [['Mutfak', '', '', ''], ['Banyo', '', '', ''], ['Oturma odası', '', '', '']]),
      yaz('Hamur, diş macunu ve kum gibi maddeler hangi hâlde? Düşün ve gerekçeni yaz.', ['Kum:', 'Diş macunu:'])])]),
    'hafta-16': W(16, 4, 'Karışımlar', 'Maddenin hâlleri; karışımlar ve karışımların ayrılması', () => [numarala([
      dy(['Birden fazla maddenin bir araya gelmesiyle karışım oluşur.', 'Meyve salatası bir karışımdır.', 'Karışımdaki maddeler asla ayrılamaz.', 'Çorbada birçok madde karışmıştır.']),
      banka('Karışım avı! Kutudaki örneklerin karışım olup olmadığına karar ver.', [['Karışım', '#12b886'], ['Karışım değil', '#f2546b']], ['Ayranlı makarna salatası', 'Kum ve çakıl', 'Tek bir demir çivi', 'Pirinç ve mercimek', 'Bir parça buz', 'Limonata'], 3)]),
    numarala([esle('Karışımı ayırmak için hangi yöntemi kullanırsın? Eşleştir.', [['#Demir tozu ve kum', '#Mıknatısla'], ['#Un ve iri taneler', '#Elekle'], ['#Kumlu su', '#Süzgeç kâğıdıyla'], ['#Fasulye ve nohut', '#Elle seçerek'], ['#Tuzlu su', '#Buharlaştırarak']], 161),
      ciz('Kendi karışımını tasarla: İçinde hangi maddeler olsun? Çiz ve etiketle.', 50)])]),
    'hafta-17': W(17, 4, 'Ayırma Ustası', 'Karışımların ayrılması, atıkların ayrıştırılması', () => [numarala([
      deney('Karışımı ayır!', ['Bir avuç kum', 'Birkaç ataş', 'Bir mıknatıs', 'Bir elek', 'Biraz pirinç'], ['Kum, ataş ve pirinci bir kâsede karıştır.', 'Önce mıknatısı karışımın üzerinde gezdir.', 'Sonra kalanı elekten geçir.'], 'Hangi yöntem neyi ayırır?'),
      tablo('Ayırma raporu!', ['Ayrılan madde', 'Yöntem', 'Neden işe yaradı?'], [['Ataş', '', ''], ['Pirinç', '', ''], ['Kum', '', '']])]),
    numarala([atik(['Gazete', 'Pet şişe', 'Reçel kavanozu', 'Konserve kutusu', 'Karton kutu', 'Yoğurt kabı', 'Kırık cam şişe', 'Gazoz kapağı']),
      yaz('Atıkları neden ayrı kutulara atarız? İki neden yaz.', ['1.', '2.'])])]),
    'hafta-18': W(18, 4, 'Atık Dedektifi', 'Atıkların ayrıştırılması', () => [numarala([
      tablo('Evimizin atık raporu! Bir gün boyunca evdeki atıkları say, çetele tut.', ['Atık türü', 'Çetele', 'Toplam'], [['Kâğıt', '', ''], ['Plastik', '', ''], ['Cam', '', ''], ['Metal', '', ''], ['Organik (yemek artığı)', '', '']]),
      yaz('Raporuna bak: En çok hangi atık çıkıyor? Bunu azaltmak için ne önerirsin?', ['En çok çıkan atık:', 'Önerim:'])]),
    numarala([banka('Atık sorununa çözüm bul! Her durumu uygun çözümle yaz.', [['Azalt', '#3a86ff'], ['Yeniden kullan', '#12b886'], ['Geri dönüştür', '#f4a100']], ['Bez çanta kullanmak', 'Kavanozu kalemlik yapmak', 'Gazeteyi mavi kutuya atmak', 'Suyu matarayla taşımak', 'Kutudan oyuncak yapmak', 'Pil kutusuna eski pil atmak']),
      ciz('Okulun için eğlenceli bir atık kutusu tasarla. Hangi atık için olduğunu yaz.', 60)])]),
    'hafta-19': W(19, 5, 'Her Şey Hareket Eder', 'Atıkların ayrıştırılması; varlıkların hareketleri', () => [numarala([
      dy(['Atık piller çöpe değil, atık pil kutusuna atılır.', 'Organik atıklardan gübre (kompost) yapılabilir.', 'Cam şişeler geri dönüştürülemez.']),
      hareketIz()]),
    numarala([tahmin('Hareket tahmini! Önce tahmin et, sonra dene.', ['Masadaki bilye itilirse', 'Topaç çevrilirse', 'İpe bağlı silgi bırakılırsa', 'Eğik tahtaya kutu konursa'], ['Durum', 'Nasıl hareket eder? (tahmin)', 'Gözlemim']),
      rozet(['Atıkları türüne göre ayırabilirim.', 'Karışımları ayırma yöntemlerini bilirim.', 'Hareket türlerine örnek verebilirim.'])])]),
    'hafta-20': W(20, 5, 'Hızlı mı, Yavaş mı?', 'Varlıkların hareketleri', () => [numarala([
      banka('Hareket şeklini bul! Her varlığı doğru sütuna yaz.', [['Dönme', '#3a86ff'], ['Sallanma', '#f4a100'], ['Yuvarlanma', '#12b886'], ['Kayma', '#8b5cf6']], ['Vantilatör pervanesi', 'Salıncak', 'Futbol topu', 'Kızak', 'Saat sarkacı', 'Dönme dolap', 'Bilye', 'Kaydıraktaki çocuk']),
      tablo('Hızlı ya da yavaş? Varlıkları en hızlıdan en yavaşa sırala.', ['Sıra', 'Varlık'], [['1. (en hızlı)', ''], ['2.', ''], ['3.', ''], ['4. (en yavaş)', '']])]),
    numarala([deney('Yarış rampası!', ['Bir tahta ya da kalın karton', 'Birkaç kitap', 'Top, bilye, oyuncak araba'], ['Tahtanın bir ucunu kitaplarla yükselt.', 'Varlıkları aynı yerden bırak.', 'Hangisinin en hızlı indiğini gözlemle. Sonra rampayı yükselt ve tekrarla.'], 'Hangisi en hızlı iner?'),
      yaz('Rampa yükselince ne değişti? Bir sonuç yaz.', ['Sonucum:'])])]),
    'hafta-21': W(21, 5, 'İt ve Çek', 'Kuvvet ve etkileri', () => [numarala([
      banka('İtme mi, çekme mi? Her hareketi doğru sütuna yaz.', [['İtme', '#f2546b'], ['Çekme', '#3a86ff']], ['Kapıyı kapatmak', 'Çekmeceyi açmak', 'Alışveriş arabasını sürmek', 'Kova ipini yukarı almak', 'Topa tekme atmak', 'Halat çekme oyunu', 'Zile basmak', 'Bitkiyi kökünden sökmek'], 4),
      dy(['Duran bir varlığı hareket ettirmek için kuvvet uygularız.', 'Kuvvet gözle görülür.', 'İtme ve çekme birer kuvvettir.'])]),
    numarala([tahmin('Kuvvet tahmini! Önce tahmin et, sonra dene: Hangisini hareket ettirmek daha çok kuvvet ister?', ['Boş kutu – Kitap dolu kutu', 'Tüy – Silgi', 'Boş çanta – Dolu çanta'], ['Karşılaştırma', 'Tahminim', 'Gözlemim']),
      ciz('Günlük yaşamda itme ve çekme kuvveti kullandığın iki anı çiz. Okla kuvvetin yönünü göster.', 70)])]),
    'hafta-22': W(22, 5, 'Kuvvetin Etkileri', 'Kuvvet ve etkileri', () => [numarala([
      banka('Kuvvet ne yaptı? Her örneği uygun etkiye yaz.', [['Harekete geçirdi', '#12b886'], ['Durdurdu', '#f2546b'], ['Yönünü değiştirdi', '#3a86ff'], ['Şeklini değiştirdi', '#f4a100']], ['Kaleci topu tuttu.', 'Hamura şekil verdim.', 'Duran arabayı ittim.', 'Tenis topuna raketle vurdum.', 'Süngeri sıktım.', 'Kaydıraktaki kardeşimi tuttum.', 'Topa vurup gol attım.', 'Bisikletin direksiyonunu çevirdim.'], 2),
      dy(['Kuvvet, varlıkların şeklini değiştirebilir.', 'Hareket eden bir top kendiliğinden yön değiştirir.'])]),
    numarala([deney('Oyun hamuru laboratuvarı!', ['Oyun hamuru', 'Bir kitap', 'Bir kalem'], ['Hamurdan bir top yap.', 'Topu avucunla bastır, sonra kalemle bastır, sonra kitabı üzerine koy.', 'Her seferinde şeklin nasıl değiştiğini çiz.'], 'Hangisi şekli en çok değiştirir?'),
      yaz('Kuvvet uygulayınca şekli değişen ama sonra eski hâline dönen bir varlık bul.', ['Varlık:', 'Neden eski hâline döner?'])])]),
    'hafta-23': W(23, 6, 'Elektrik Nereden Gelir?', 'Kuvvet ve etkileri; elektrikli araç gereç', () => [numarala([
      bilmece('Kuvvet ve elektrik bilmecesi!', [['Bir varlığı kendimize doğru getirmek', 'ÇEKME', 0], ['Bir varlığı kendimizden uzaklaştırmak', 'İTME', 0], ['Oyuncak arabaya enerji veren küçük kutu', 'PİL', 0], ['Prize takılan uç', 'FİŞ', 0]]),
      banka('Elektrikli mi, değil mi? Araç gereçleri doğru sütuna yaz.', [['Prizle çalışır', '#f4a100'], ['Pille çalışır', '#3a86ff'], ['Elektrik kullanmaz', '#7d8597']], ['Buzdolabı', 'El feneri', 'Makas', 'Uzaktan kumanda', 'Çamaşır makinesi', 'Cetvel', 'Duvar saati', 'Ütü', 'Tahta kaşık'])]),
    numarala([tablo('Evimdeki elektrikli araçlar! Bul ve tamamla.', ['Araç', 'Ne işe yarar?', 'Pil mi, priz mi?'], [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']]),
      yaz('Elektrik olmasaydı bir günün nasıl geçerdi? Hayal et ve yaz.', ['Sabah:', 'Akşam:'])])]),
    'hafta-24': W(24, 6, 'Güvenli Elektrik', 'Elektrikli araç gereç; güvenli kullanım', () => [numarala([
      tablo('Bilimsel çıkarım yap! Bir aracın elektrikli olduğunu nasıl anlarsın? İpucunu yaz.', ['Araç', 'İpucum (kablo, fiş, pil yuvası, düğme…)'], [['Saç kurutma makinesi', ''], ['Oyuncak robot', ''], ['Hesap makinesi', ''], ['Mikser', '']]),
      dy(['Islak elle prize dokunmayız.', 'Fişi kablosundan çekerek çıkarırız.', 'Prizlere çocuk koruyucu takılmalıdır.', 'Elektrik direğine uçurtma takılırsa tırmanırız.'])]),
    numarala([durum2([['Kardeşin prizin deliğine bir toka sokmaya çalışıyor.'], ['Banyoda ıslak elle saç kurutma makinesini prize takmak üzeresin.'], ['Ütünün kablosunun soyulduğunu fark ettin.']]),
      rozet(['Elektrikli araçları tanıyabilirim.', 'Pille ve prizle çalışan araçları ayırabilirim.', 'Elektriği güvenli kullanırım.'])])]),
    'hafta-25': W(25, 6, 'Elektrik Güvenliği Afişi', 'Elektrikli araç gerecin güvenli kullanımı', () => [numarala([
      davranisYaz(['Fişi prizden tutarak çıkarırım.', 'Islak ellerle elektrikli araçlara dokunurum.', 'Kablosu hasarlı aracı kullanmam.', 'Bir prize çok sayıda fiş takarım.', 'Fırtınada elektrik tellerinden uzak dururum.', 'Elektrikli aracı kullandıktan sonra fişini çekerim.']),
      yaz('Eleştirel düşün! "Uzatma kablosuyla her şeyi tek prize takmak pratiktir." Bu düşünceye katılıyor musun? Neden?', ['Düşüncem ve nedeni:'])]),
    numarala([etk(0, 'Elektrik güvenliği afişi tasarla! Başlık, resim ve slogan olsun.', '<div class="h3-afis"><div class="ttkb"><span>Başlık:</span><i></i></div><div class="h3-afis-alan"></div><div class="ttkb"><span>Slogan:</span><i></i></div></div>')])]),
    'hafta-26': W(26, 6, 'Elektriği Tasarruflu Kullan', 'Elektriğin tasarruflu kullanımı', () => [numarala([
      tablo('Tasarruf tahmini! Hangisi daha çok elektrik harcar? Önce tahmin et, sonra bir büyüğünle araştır.', ['Karşılaştırma', 'Tahminim', 'Araştırma sonucu'], [['Akkor ampul – LED ampul', '', ''], ['Bulaşığı elde yıkamak – Makineyi dolu çalıştırmak', '', ''], ['Buzdolabı kapısı açık – kapalı', '', ''], ['Bilgisayar bekleme modunda – kapalı', '', '']]),
      banka('Tasarruflu mu, savurgan mı?', [['Tasarruflu', '#12b886'], ['Savurgan', '#f2546b']], ['Odadan çıkarken ışığı söndürmek', 'Gündüz perdeyi açmak', 'Televizyonu izlemeden açık bırakmak', 'Şarj olan telefonu fişten çekmek', 'Çamaşır makinesini yarım çalıştırmak', 'LED ampul kullanmak'], 3)]),
    numarala([tablo('Elektrik sayacı dedektifi! Bir büyüğünle bir hafta boyunca sayaçtaki sayıyı her gün aynı saatte yaz.', ['Gün', 'Sayaç', 'O gün ne kullandık?'], ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map(g => [g, '', ''])),
      yaz('Evde elektriğin boşa harcandığı yerleri bul. Her biri için bir çözüm yaz.', ['Nerede boşa harcanıyor?', 'Çözümüm:'])])]),
    'hafta-27': W(27, 7, 'Toprak Nasıl Oluşur?', 'Elektriğin tasarruflu kullanımı; toprak oluşumu ve yapısı', () => [numarala([
      yaz('Sayaç verilerine bak: Hangi gün daha çok elektrik harcandı? Gelecek hafta için bir tasarruf hedefi koy.', ['En çok harcanan gün ve nedeni:', 'Tasarruf hedefim:']),
      etk(0, 'Toprak nasıl oluşur? Aşamaları sırala, kutulara 1\'den 4\'e kadar numara ver.', `<div class="h2-dy">${['Küçük parçalar bitki ve hayvan kalıntılarıyla karışır.', 'Kayalar güneş, su, rüzgâr ve bitki kökleriyle çatlar.', 'Yüzlerce yıl içinde verimli toprak oluşur.', 'Çatlayan kayalar küçük parçalara ayrılır.'].map(s => `<div><p class="ttkb">${s}</p><i></i></div>`).join('')}</div>`)]),
    numarala([toprakKatman(),
      dy(['Toprağın oluşması çok uzun yıllar sürer.', 'Humus, bitki ve hayvan kalıntılarından oluşur.', 'Toprak yalnızca kumdan oluşur.'])])]),
    'hafta-28': W(28, 7, 'Toprak Laboratuvarı', 'Toprak oluşumu ve yapısı', () => [numarala([
      deney('Toprağın içinde ne var?', ['Şeffaf bir kavanoz', 'Bir avuç bahçe toprağı', 'Su', 'Büyüteç'], ['Toprağı büyüteçle incele, gördüklerini yaz.', 'Toprağı kavanoza koy, üstüne su ekle, kapağı kapatıp salla.', 'Bir gün bekle ve oluşan katmanları çiz.'], 'Kavanozda kaç katman oluşur?'),
      ciz('Kavanozdaki katmanları çiz ve etiketle: çakıl, kum, kil, humus.', 50)]),
    numarala([tablo('Toprak örneklerini karşılaştır! Farklı yerlerden toprak topla.', ['Nereden?', 'Rengi', 'Elle dokununca', 'İçinde neler var?'], [['Bahçe', '', '', ''], ['Saksı', '', '', ''], ['Yol kenarı', '', '', '']]),
      bilmece('Toprak bilmecesi!', [['Toprağı verimli yapan çürümüş kalıntı', 'HUMUS', 0], ['Islanınca yapışan ince toprak', 'KİL', 0], ['Toprağı havalandıran canlı', 'SOLUCAN', 0]])])]),
    'hafta-29': W(29, 7, 'Tohumdan Fidana', 'Toprak yapısı; bitki yetiştirme', () => [numarala([
      dy(['Solucanlar toprağı havalandırır.', 'Toprak kirliliği bitkilerin büyümesini etkilemez.', 'Bitki kökleri toprağın kaymasını önler.']),
      deney('Bitkiler neye ihtiyaç duyar?', ['4 küçük saksı', 'Fasulye tohumları', 'Toprak', 'Su', 'Bir karton kutu'], ['Dört saksıya tohum ek.', '1. saksı: Işık + su. 2. saksı: Karanlık + su. 3. saksı: Işık, su yok. 4. saksı: Toprak yerine pamuk + ışık + su.', 'İki hafta boyunca gözlemle.'], 'En iyi hangisi büyür?')]),
    numarala([tablo('Fide günlüğüm! Her saksıyı 3 günde bir gözlemle, boyunu cetvelle ölç.', ['Gün', '1. saksı', '2. saksı', '3. saksı', '4. saksı'], [['3. gün', '', '', '', ''], ['6. gün', '', '', '', ''], ['9. gün', '', '', '', ''], ['12. gün', '', '', '', '']]),
      ciz('12. günde dört saksının görünümünü yan yana çiz. Altlarına numaralarını yaz.', 70)])]),
    'hafta-30': W(30, 7, 'Bitkinin İhtiyaçları', 'Bitki yetiştirme', () => [numarala([
      yaz('Fide günlüğüne bak ve genelleme yap: Bir bitkinin yetişmesi için neler gerekir?', ['Hangi saksı en iyi büyüdü? Neden?', 'Işık almayan bitkiye ne oldu?', 'Genellemem: Bitkilerin büyümesi için … gerekir.']),
      banka('Bitki bakım rehberi! Her ihtiyacı doğru açıklamayla yaz.', [['Su', '#3a86ff'], ['Işık', '#f4a100'], ['Hava', '#8b5cf6'], ['Toprak', '#8e5b2b']], ['Besin üretmek için güneşe yönelir.', 'Kökler bunu topraktan emer.', 'Yapraklar bunu alıp verir.', 'Köklere tutunacak yer sağlar.'], 2)]),
    numarala([esle('Bitkinin bölümlerini görevleriyle eşleştir.', [['#Kök', '#Su ve besin alır.'], ['#Gövde', '#Suyu yapraklara taşır.'], ['#Yaprak', '#Güneş ışığıyla besin üretir.'], ['#Çiçek', '#Meyve ve tohum oluşturur.']], 301),
      ciz('Bir bitki çiz. Kök, gövde, yaprak ve çiçeğini etiketle.', 70)])]),
    'hafta-31': W(31, 8, 'Yaşam Alanları', 'Bitki yetiştirme; yaşam alanları', () => [numarala([
      rozet(['Toprağın nasıl oluştuğunu anlatabilirim.', 'Toprağın katmanlarını sayabilirim.', 'Bir bitkinin ihtiyaçlarını söyleyebilirim.']),
      esle('Canlıyı yaşam alanıyla eşleştir.', [['#Penguen', '#Kutuplar'], ['#Deve', '#Çöl'], ['#Yunus', '#Deniz'], ['#Sincap', '#Orman'], ['#Kurbağa', '#Göl kenarı']], 311)]),
    numarala([tablo('Yaşam alanı kimlik kartı!', ['Yaşam alanı', 'Hava nasıl?', 'Su durumu', 'Orada yaşayan bir canlı'], [['Orman', '', '', ''], ['Çöl', '', '', ''], ['Kutup', '', '', ''], ['Deniz', '', '', '']]),
      dy(['Çölde gündüzler çok sıcak, geceler soğuktur.', 'Kutuplarda bitki çeşitliliği çok fazladır.', 'Denizde yaşayan canlıların çoğu solungaçla solunum yapar.']),
      ciz('Kendi hayalî yaşam alanını tasarla: Nasıl bir yer? Orada hangi canlılar yaşar?', 60)])]),
    'hafta-32': W(32, 8, 'Kanıt Topluyorum', 'Yaşam alanları', () => [numarala([
      tablo('Kanıt dedektifi! Hayvanın özelliği, yaşam alanına nasıl uyum sağladığının kanıtıdır. Tamamla.', ['Canlı', 'Özelliği', 'Hangi yaşam alanına uygun? Neden?'], [['Kutup ayısı', 'Kalın kürk, beyaz renk', ''], ['Deve', 'Hörgüç, geniş ayak', ''], ['Balık', 'Solungaç, yüzgeç', ''], ['Kaktüs', 'Kalın gövde, diken', '']]),
      dy(['Her canlı her yaşam alanında rahatça yaşayabilir.', 'Canlıların vücut özellikleri yaşam alanlarına uygundur.'])]),
    numarala([yaz('Okul bahçen bir yaşam alanıdır! Bahçeyi gözlemle ve kanıt topla.', ['Hangi canlılar var?', 'Toprak, su ve ışık durumu nasıl?', 'Canlılar burada nasıl barınıyor ve besleniyor?']),
      ciz('Gözlemlediğin yaşam alanının krokisini çiz, canlıları işaretle.', 70)])]),
    'hafta-33': W(33, 8, 'Canlı Çeşitliliği', 'Yaşam alanları; canlı çeşitliliği', () => [numarala([
      etk(0, 'Canlı çeşitliliğini ölç! Okul bahçesinde 1 metrekarelik bir alanı iple çevir. İçindeki farklı canlıları say.', `<table class="h2-tablo f3-tab ttkb"><tr><th>Canlı</th><th>Çetele</th><th>Sayı</th></tr>${['Çimen ve otlar', 'Çiçekler', 'Karıncalar', 'Böcekler', 'Solucanlar', 'Diğer'].map(c => `<tr><td>${c}</td><td></td><td></td></tr>`).join('')}</table><p class="ttkb f3-not">Kaç farklı canlı türü buldun? <span class="h3-cizgi"></span> Bu sayı alanın <b>canlı çeşitliliğini</b> gösterir.</p>`),
      dy(['Bir yaşam alanında ne kadar çok farklı canlı varsa çeşitlilik o kadar fazladır.', 'Canlı çeşitliliğini saymak için yalnızca büyük hayvanlara bakarız.'])]),
    numarala([tablo('İki alanı karşılaştır! Bahçenin güneşli ve gölgeli köşelerindeki canlıları say.', ['Canlı türü', 'Güneşli köşe', 'Gölgeli köşe'], [['', '', ''], ['', '', ''], ['', '', ''], ['Toplam tür sayısı', '', '']]),
      yaz('Hangi alanda çeşitlilik daha fazla? Bunun nedeni ne olabilir?', ['Sonucum:', 'Nedeni:'])])]),
    'hafta-34': W(34, 8, 'Besin Ağı', 'Canlı çeşitliliği', () => [numarala([
      etk(0, 'Kim kimi yer? Okları takip et ve boşlukları doldur.', `<div class="f3-zincir ttkb">${['Güneş', 'Ot', '', 'Tilki'].map((s, i) => `${i ? '<em>➜</em>' : ''}<span>${s || '<i></i>'}</span>`).join('')}</div><div class="f3-zincir ttkb">${['Yaprak', '', 'Serçe', ''].map((s, i) => `${i ? '<em>➜</em>' : ''}<span>${s || '<i></i>'}</span>`).join('')}</div><p class="ttkb f3-not">Kutudan seç: tavşan, tırtıl, şahin</p>`),
      yaz('Besin zincirinden bir canlı yok olursa ne olur? Örneğin tavşanlar yok olursa tilkiler ne yapar?', ['Düşüncem:'])]),
    numarala([dy(['Canlılar besin için birbirine bağlıdır.', 'Arılar olmasa çiçekler tozlaşamaz.', 'Bir canlının yok olması diğerlerini etkilemez.']),
      ciz('Bir orman besin ağı çiz: En az 5 canlıyı oklarla birbirine bağla.', 90)])]),
    'hafta-35': W(35, 8, 'Çeşitliliği Keşfet', 'Canlı çeşitliliği', () => [numarala([
      tablo('Türkiye\'nin canlı zenginliği! Araştır ve tamamla.', ['Canlı', 'Nerede yaşar?', 'Neden önemli?'], [['Caretta caretta', '', ''], ['Anadolu parsı', '', ''], ['Kelaynak', '', ''], ['Sığla ağacı', '', '']]),
      bilmece('Yaşam alanı bilmecesi!', [['Kumlu, sıcak ve kurak yer', 'ÇÖL', 0], ['Ağaçlarla kaplı geniş alan', 'ORMAN', 0], ['Tuzlu sularla kaplı büyük alan', 'DENİZ', 0]])]),
    numarala([yaz('Bir yaşam alanında canlı çeşitliliğinin azaldığını nasıl anlarız? Ölçülebilir iki işaret yaz.', ['1.', '2.']),
      ciz('Yaşam alanı kartı tasarla: Bir yaşam alanını ve orada yaşayan canlıları çiz.', 80)])]),
    'hafta-36': W(36, 8, 'Yaşam Alanlarını Koru', 'Yaşam alanlarının korunması', () => [numarala([
      tablo('Sorgula! Yaşam alanlarına zarar veren durumlar ve çözüm önerilerin.', ['Zarar veren durum', 'Canlılara etkisi', 'Çözüm önerim'], [['Orman yangını', '', ''], ['Denize atılan plastik', '', ''], ['Sulak alanların kurutulması', '', ''], ['Aşırı avlanma', '', '']]),
      dy(['Ağaç dikmek yaşam alanlarını korur.', 'Piknikten sonra çöplerimizi doğada bırakabiliriz.', 'Milli parklar canlıları korumak için kurulur.'])]),
    numarala([yaz('Koruma projesi! Yakın çevrendeki bir yaşam alanı için proje hazırla.', ['Yaşam alanı:', 'Sorun:', 'Ne yapacağız?', 'Kimlerle birlikte?']),
      rozet(['Yaşam alanlarının özelliklerini söyleyebilirim.', 'Canlı çeşitliliğini ölçebilirim.', 'Yaşam alanlarını korumak için önerim var.'])])]),
  };
  function durum2(liste) { return etk(0, 'Ne yapardın? Durumu oku, ne yapman gerektiğini yaz.', `<div class="h2-yaz">${liste.map(([s]) => `<div><p class="ttkb">⚠️ ${s}</p>${cizgi(2)}</div>`).join('')}</div>`); }
  function davranisYaz(liste) { return etk(0, 'Doğru davranışın yanına 😊, yanlış davranışın yanına 😟 çiz.', `<div class="h2-dy">${liste.map(s => `<div><p class="ttkb">${s}</p><i></i></div>`).join('')}</div>`); }
  void ayir; void resimSec;
  const CSS = `
.f3-kutu{display:grid;gap:3mm}.f3-kutu>div{background:#fff;border:.8mm solid;border-radius:4mm;padding:2mm 3mm}.f3-kutu b{font-weight:400;font-size:5mm;display:block;text-align:center}.f3-kutu small{font-size:4mm;color:#5b6b7b}
.f3-deney{display:flex;flex-direction:column;gap:2mm}.f3-malz{display:flex;flex-wrap:wrap;gap:1.5mm;align-items:center;background:#fff;border-radius:3mm;padding:2mm 3mm}.f3-malz b{font-weight:400;font-size:5mm;color:#8b5cf6;margin-right:2mm}.f3-malz span{background:#f3edff;border-radius:3mm;padding:.5mm 2.5mm;font-size:4.6mm}
.f3-deney ol{margin:0;background:#fff;border-radius:3mm;padding:2mm 3mm 2mm 10mm;font-size:5mm;line-height:1.45}
.f3-ug{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5mm}.f3-ug>div{background:#fff;border-top:2mm solid var(--r);border-radius:3mm;padding:2mm 3mm}.f3-ug b{font-weight:400;font-size:5.2mm;color:var(--r);display:block}.f3-ug small{font-size:4.2mm;color:#5b6b7b}
.f3-dongu{display:grid;grid-template-columns:80mm 1fr;gap:3mm;align-items:center;background:#fff;border-radius:3mm;padding:2mm}.f3-dongu p{display:flex;align-items:flex-end;gap:2mm;margin:2mm 0;font-size:5.2mm}.f3-dongu p i{flex:1;border-bottom:.45mm solid #9db4c8;height:8mm}.f3-dongu .h2-banka{margin-bottom:2mm}
.f3-hal{display:flex;flex-direction:column;gap:3mm;background:#fff;border-radius:3mm;padding:2mm}
.f3-iz{display:grid;grid-template-columns:repeat(4,1fr);gap:2.5mm}.f3-iz>div{background:#fff;border-radius:3mm;padding:2mm}.f3-iz small{font-size:4.2mm;color:#5b6b7b}
.f3-bil{display:flex;flex-direction:column;gap:2mm}.f3-bil>div{display:flex;justify-content:space-between;align-items:center;gap:3mm;background:#fff;border-radius:3mm;padding:2mm 3mm}.f3-bil p{margin:0;font-size:5mm;flex:1}
.f3-bil span,.f3-sifre span{display:flex;gap:1mm}.f3-bil i,.f3-sifre i{width:8.5mm;height:9.5mm;border:.5mm solid #1d4e89;border-radius:1.5mm;background:#fff}.f3-bil i.y{background:#fff3c4;border-color:#e08a00}
.f3-sifre{display:flex;align-items:center;gap:3mm;font-size:5mm;background:#fff3c4;border-radius:3mm;padding:2mm 3mm;margin:2mm 0 0}
.f3-rozet{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}.f3-rozet>div{background:#fff;border:.8mm dashed #f4a100;border-radius:5mm;padding:3mm;text-align:center}.f3-rozet span{font-size:11mm;filter:grayscale(1);opacity:.45}.f3-rozet p{margin:1mm 0 0;font-size:4.8mm}
.f3-zincir{display:flex;align-items:center;justify-content:center;gap:2mm;background:#fff;border-radius:3mm;padding:3mm;margin-bottom:2mm}.f3-zincir span{min-width:30mm;text-align:center;font-size:5.4mm;border:.6mm solid #12b886;border-radius:4mm;padding:2mm}.f3-zincir span i{display:block;height:7mm}.f3-zincir em{font-style:normal;font-size:7mm;color:#12b886}
.govde>.etk:has(>.f3-tab,>.f3-kutu,>.f3-bil){display:flex;flex-direction:column}.f3-tab td{height:11mm}.govde>.etk>.f3-kutu{flex:1;align-content:stretch!important;justify-content:stretch!important}.govde>.etk>.f3-bil{flex:1;justify-content:space-evenly}
.f3-not{font-size:4.6mm;margin:2mm 0 0;color:#1f2a24}
`;
  return { F3, CSS };
};
