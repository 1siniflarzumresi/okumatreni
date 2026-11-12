// Ladin Ormanı — 4. sınıf Sosyal Bilgiler haftalık çalışma kâğıtları. BAĞLAM TEMELLİ: her soru gerçek bir durum, tablo,
// grafik, harita, belge ya da konuşma üzerinden sorulur. Çoktan seçmeli (A-D) + açık uçlu; son sayfada ters çevrilmiş cevap anahtarı.
// Ortak bağlam bileşenleri (baglam, B.*) 4. sınıfın öteki derslerinde de kullanılır: module.exports(...).B
// Üretim: node kaynak/calisma-kagitlari/uret.js s4
module.exports = ({ etk, numarala, A }) => {
  const { S, cizgi, tablo, yaz, ciz } = A;
  let NO = 0, ANAH = [];
  const HARF = 'ABCD';
  // Soru: ['?', metin, [seçenekler], doğruIndex] | ['_', metin, satır]
  const soru = q => {
    const n = ++NO;
    if (q[0] === '_') return `<div class="b4-s"><p><b>${n}.</b> ${q[1]}</p>${cizgi(q[2] || 2)}</div>`;
    ANAH.push(`${n}-${HARF[q[3]]}`);
    const uzun = q[2].some(x => x.replace(/<[^>]+>/g, '').length > 30);
    return `<div class="b4-s"><p><b>${n}.</b> ${q[1]}</p><ol class="b4-sec${uzun ? ' tek' : ''}">${q[2].map((x, i) => `<li><i>${HARF[i]}</i>${x}</li>`).join('')}</ol></div>`;
  };
  const baglam = (baslik, ic, sorular, yonerge) => etk(0, yonerge || 'Bağlamı dikkatle incele, soruları cevapla.',
    `<div class="b4"><div class="b4-bag"><b class="b4-bb">📌 ${baslik}</b>${ic}</div><div class="b4-sorular">${sorular.map(soru).join('')}</div></div>`);
  // Bağlam içerikleri
  const B = {
    metin: (...p) => p.map(x => `<p class="b4-p">${x}</p>`).join(''),
    tablo: (bas, sat) => `<table class="b4-t"><tr>${bas.map(b => `<th>${b}</th>`).join('')}</tr>${sat.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`,
    diyalog: l => `<div class="b4-d">${l.map(([k, s]) => `<p><b>${k}:</b> ${s}</p>`).join('')}</div>`,
    serit: l => `<div class="b4-serit">${l.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>`,
    grafik: (baslik, et, de, birim, renk = '#3a86ff') => { const m = Math.max(...de), w = 300, h = 150, bw = 220 / et.length; let s = `<line x1="40" y1="10" x2="40" y2="120" stroke="#1f2a24"/><line x1="40" y1="120" x2="290" y2="120" stroke="#1f2a24"/>`;
      const adim = m <= 10 ? 2 : m <= 20 ? 5 : m <= 50 ? 10 : m <= 100 ? 20 : m <= 500 ? 100 : 1000, ust = Math.ceil(m / adim) * adim;
      for (let v = 0; v <= ust; v += adim) { const y = 120 - v / ust * 105; s += `<line x1="36" y1="${y}" x2="290" y2="${y}" stroke="#e3ecf5"/><text x="33" y="${y + 3}" text-anchor="end" font-size="8">${v}</text>`; }
      et.forEach((e, i) => { const x = 50 + i * bw, bh = de[i] / ust * 105; s += `<rect x="${x + bw * .15}" y="${120 - bh}" width="${bw * .7}" height="${bh}" rx="2" fill="${renk}"/><text x="${x + bw / 2}" y="133" text-anchor="middle" font-size="8">${e}</text>`; });
      return `<div class="b4-g"><b>${baslik}</b>${S(w, h, s + `<text x="8" y="8" font-size="8" fill="#5b6b7b">${birim}</text>`, 92)}</div>`; },
    kimlik: (o) => `<div class="b4-kimlik"><div class="b4-k-ust">TÜRKİYE CUMHURİYETİ KİMLİK KARTI</div><div class="b4-k-ic"><div class="b4-k-foto">👤</div><dl>${o.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl></div></div>`,
    etiket: (o) => `<div class="b4-etiket">${o.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`,
    kroki: (ogeler, yollar = '') => { let s = '<rect x="0" y="0" width="300" height="190" fill="#f6fbf7" stroke="#cfd8d1"/>' + yollar;
      ogeler.forEach(([x, y, ad, r, w = 56, h = 30]) => { s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${r}" stroke="#1f2a24"/><text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="10">${ad}</text>`; });
      s += '<g transform="translate(272 26)"><circle r="16" fill="#fff" stroke="#1f2a24"/><text y="-5" text-anchor="middle" font-size="9" font-weight="700">K</text><text y="13" text-anchor="middle" font-size="8">G</text><text x="10" y="4" text-anchor="middle" font-size="8">D</text><text x="-10" y="4" text-anchor="middle" font-size="8">B</text></g>';
      return S(300, 190, s, 92); },
    resimli: (ic, yazi) => `<div class="b4-ry">${ic}<p class="b4-p">${yazi}</p></div>`,
  };
  const yol = (d) => `<path d="${d}" stroke="#cfd8d1" stroke-width="14" fill="none"/><path d="${d}" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 5" fill="none"/>`;
  const anahtar = () => ANAH.length ? `<p class="b4-anahtar">Cevap anahtarı: ${ANAH.join(' · ')}</p>` : '';
  const W = (hafta, unite, baslik, konu, f) => ({ unite, hafta, baslik, konu, sayfalar: () => { NO = 0; ANAH = []; const p = f(); p[p.length - 1] += anahtar(); return p; } });
  const sat = (s, n = 1) => ['_', s, n];

  const S4 = {
    'hafta-01': W(1, 1, 'Kimliğimi Tanıyorum', 'Resmî kimlik belgesi', () => [numarala([
      baglam('Defne\'nin kimlik kartı', B.kimlik([['T.C. Kimlik No', '1••••••••••'], ['Soyadı', 'YILMAZ'], ['Adı', 'DEFNE'], ['Doğum Tarihi', '14.03.2017'], ['Cinsiyeti', 'K'], ['Uyruğu', 'T.C.'], ['Son Geçerlilik', '14.03.2027']]) + B.metin('Defne, okulda kendini tanıtmak için kimlik kartından yararlandı.'), [
        ['?', 'Defne\'nin kimlik kartına bakarak aşağıdakilerden hangisi öğrenilemez?', ['Doğum tarihi', 'Soyadı', 'En sevdiği renk', 'Cinsiyeti'], 2],
        ['?', 'Defne 2027 yılında kimlik kartıyla ilgili ne yapmalıdır?', ['Kartı atmalıdır.', 'Kartının süresi dolacağı için yenilemelidir.', 'Kartını arkadaşına vermelidir.', 'Hiçbir şey yapmasına gerek yoktur.'], 1],
        ['?', 'Kimlik numarası neden her vatandaşa farklı verilir?', ['Kartın daha güzel görünmesi için', 'Her kişinin ayırt edilebilmesi için', 'Doğum gününü hatırlamak için', 'Okul numarası olarak kullanmak için'], 1]]),
      baglam('Kendini tanıtıyorsun', B.diyalog([['Öğretmen', 'Yeni dönemde herkes kendini üç cümleyle tanıtsın.'], ['Kerem', 'Benim adım Kerem. 10 yaşındayım. Ağaç dikmeyi ve satranç oynamayı seviyorum.'], ['Ada', 'Ben Ada. Kardeşimle birlikte kitap okumayı severim. Büyüyünce veteriner olmak istiyorum.']]), [
        ['?', 'Kerem ve Ada kendilerini tanıtırken hangi bilgiye ikisi de yer vermiştir?', ['Yaşlarına', 'Sevdikleri etkinliklere', 'Gelecekteki mesleklerine', 'Kardeşlerine'], 1],
        ['?', 'Ada\'nın tanıtımında hangi bilgi kimlik kartında YER ALMAZ?', ['Adı', 'Veteriner olmak istemesi', 'Soyadı', 'Doğum tarihi'], 1]])]),
    numarala([
      baglam('Kişisel bilgiler', B.metin('Mert, internette bir oyun sitesine üye olurken site ondan kimlik numarasını, ev adresini ve okulunun adını istedi.'), [
        ['?', 'Mert\'in yapması gereken en doğru davranış hangisidir?', ['Bilgileri hemen yazmak', 'Bilgileri arkadaşına sorup yazmak', 'Ailesine danışmadan hiçbir kişisel bilgi paylaşmamak', 'Yalnız kimlik numarasını yazmak'], 2],
        sat('Kişisel bilgilerimizi neden korumalıyız? Bir gerekçe yaz.')]),
      yaz('Kimliğini tanıt! Kimlik kartındaki bilgilerle kimlik kartında olmayan özelliklerini ayırarak kendini tanıt.', ['Kimlik kartımdaki bilgiler:', 'Kartta olmayan özelliklerim (ilgi alanı, yetenek):', 'Beni ben yapan bir özellik:'])])]),
    'hafta-02': W(2, 1, 'Farklılıklarımız Zenginliğimiz', 'Farklı özelliklere saygı', () => [numarala([
      baglam('Sınıf anketi', B.grafik('4-A sınıfının en sevdiği etkinlikler', ['Spor', 'Resim', 'Müzik', 'Kitap', 'Bilim'], [8, 5, 4, 6, 3], 'Öğrenci') , [
        ['?', 'Grafiğe göre aşağıdakilerden hangisi söylenebilir?', ['Bütün öğrenciler sporu sever.', 'Öğrencilerin ilgi alanları farklıdır.', 'Bilimi seven öğrenci yoktur.', 'Resim en sevilen etkinliktir.'], 1],
        ['?', 'Sınıf, herkesin katılacağı bir etkinlik günü planlıyor. En adil karar hangisidir?', ['Yalnız spor yapılmalı.', 'En az seçilen etkinlik yapılmalı.', 'Farklı ilgi alanlarına uygun birkaç etkinlik yapılmalı.', 'Etkinliği öğretmen tek başına seçmeli.'], 2],
        ['?', 'Kitap okumayı seven kaç öğrenci vardır?', ['4', '5', '6', '8'], 2]]),
      baglam('Teneffüste', B.diyalog([['Deniz', 'Selin, sen hep yavaş koşuyorsun, takımımıza alamayız.'], ['Selin', 'Koşmakta iyi değilim ama kaleci olabilirim. Topları çok iyi tutarım.'], ['Can', 'Herkesin iyi olduğu bir şey vardır. Selin kaleci olsun!']]), [
        ['?', 'Can\'ın sözleri hangi düşünceyi destekler?', ['Yavaş koşanlar oynamamalı.', 'Farklı yetenekler takımı güçlendirir.', 'Takımı en hızlı oyuncu seçmeli.', 'Kaleci olmak önemli değildir.'], 1],
        ['?', 'Deniz\'in davranışı için hangisi söylenebilir?', ['Arkadaşının farklı özelliklerine saygı göstermemiştir.', 'Takımı için en doğru kararı vermiştir.', 'Selin\'e yardım etmiştir.', 'Oyun kurallarını açıklamıştır.'], 0]])]),
    numarala([
      baglam('Bir haber', B.metin('Okulumuzda "Farklılıklar Şenliği" yapıldı. Öğrenciler ailelerinin geldiği şehirlerin yemeklerini, türkülerini ve oyunlarını tanıttı. Görme engelli öğrencimiz Ayşe de piyanoda bir eser çaldı.'), [
        ['?', 'Şenliğin amacı aşağıdakilerden hangisi olabilir?', ['Öğrencileri yarıştırmak', 'Farklılıkların bir zenginlik olduğunu göstermek', 'Ders saatlerini azaltmak', 'Yalnız yemek tanıtmak'], 1],
        sat('Sınıfındaki farklılıklardan biri sana neyi öğretti? Bir örnek ver.', 2)]),
      tablo('Benim ve arkadaşımın özellikleri! Bir arkadaşınla konuşarak tabloyu doldur.', ['Özellik', 'Ben', 'Arkadaşım'], [['Sevdiği yemek', '', ''], ['Yeteneği', '', ''], ['Hobisi', '', ''], ['Ortak yanımız', '', ''], ['Farklı yanımız', '', '']])])]),
    'hafta-03': W(3, 1, 'Yaşam Çizgim', 'Önemli olayları kronolojik sıralama', () => [numarala([
      baglam('Elif\'in zaman şeridi', B.serit([['2016', 'Doğdu'], ['2018', 'Yürümeye başladı'], ['2020', 'Kardeşi doğdu'], ['2022', 'Okula başladı'], ['2024', 'Bisiklet sürmeyi öğrendi'], ['2026', '4. sınıfa geçti']]), [
        ['?', 'Elif okula başladığında kaç yaşındaydı?', ['4', '5', '6', '7'], 2],
        ['?', 'Hangisi Elif\'in kardeşi doğmadan ÖNCE olmuştur?', ['Okula başlaması', 'Yürümeye başlaması', 'Bisiklet sürmeyi öğrenmesi', '4. sınıfa geçmesi'], 1],
        ['?', 'Zaman şeridinde olaylar nasıl sıralanmıştır?', ['Önemine göre', 'Eskiden yeniye doğru', 'Yeniden eskiye doğru', 'Rastgele'], 1]]),
      baglam('Belgelerle geçmiş', B.tablo(['Belge', 'Üzerindeki tarih'], [['Hastane doğum belgesi', '2016'], ['Anaokulu fotoğrafı', '2021'], ['1. sınıf karnesi', '2023'], ['Yüzme kursu sertifikası', '2025']]), [
        ['?', 'Bu belgelerden hangisi Elif\'in en eski belgesidir?', ['Anaokulu fotoğrafı', 'Doğum belgesi', 'Karne', 'Sertifika'], 1],
        ['?', 'Elif\'in yüzme öğrendiğini hangi belge kanıtlar?', ['Karne', 'Fotoğraf', 'Sertifika', 'Doğum belgesi'], 2]])]),
    numarala([
      baglam('Sözlü tarih', B.diyalog([['Elif', 'Anneciğim, ben bebekken nasıldım?'], ['Annesi', 'Çok uykucuydun! İlk sözcüğün "baba" oldu. Bir yaşındayken ilk dişin çıktı.']]), [
        ['?', 'Elif geçmişini öğrenmek için hangi yolu kullanmıştır?', ['Kitap okumak', 'Aile büyüğüyle konuşmak', 'İnternette aramak', 'Müzeye gitmek'], 1],
        sat('Senin geçmişini öğrenebileceğin iki kaynak yaz.')]),
      etk(0, 'Kendi zaman şeridini yap! Doğduğun yıldan bu yıla kadar en önemli 5 olayı sırasıyla yaz.', `<div class="b4-serit b4-bos">${[1, 2, 3, 4, 5].map(() => '<div><b>Yıl: ……</b><span></span></div>').join('')}</div>`)])]),
    'hafta-04': W(4, 1, 'Ailemde Rollerim', 'Aile içi roller ve sorumluluklar', () => [numarala([
      baglam('Görev çizelgesi', B.tablo(['Görev', 'Anne', 'Baba', 'Zeynep (10)', 'Emre (6)'], [['Yemek yapmak', '✓', '✓', '', ''], ['Sofrayı kurmak', '', '', '✓', '✓'], ['Çöpü atmak', '', '✓', '✓', ''], ['Bitkileri sulamak', '', '', '', '✓'], ['Alışveriş', '✓', '✓', '', '']]), [
        ['?', 'Çizelgeye göre Zeynep\'in görevleri hangileridir?', ['Yemek yapmak, alışveriş', 'Sofrayı kurmak, çöpü atmak', 'Bitkileri sulamak, yemek yapmak', 'Alışveriş, çöpü atmak'], 1],
        ['?', 'Emre\'ye verilen görevler için hangisi söylenebilir?', ['Yaşına uygun basit görevlerdir.', 'Ailenin en zor görevleridir.', 'Hiçbir işe yaramaz.', 'Babanın görevleridir.'], 0],
        ['?', 'Ailede görev paylaşımı yapılmasının en önemli yararı nedir?', ['İşlerin bir kişiye yüklenmemesi', 'Evin daha büyük olması', 'Daha çok alışveriş yapılması', 'Televizyonun daha az izlenmesi'], 0]]),
      baglam('Bir akşam', B.metin('Zeynep sofrayı kurmayı unuttu çünkü oyun oynuyordu. Annesi işten yorgun geldi ve sofrayı kendisi kurdu. Yemek yarım saat geç yendi.'), [
        ['?', 'Zeynep sorumluluğunu yerine getirmeyince ne oldu?', ['Ailenin düzeni aksadı.', 'Hiçbir şey değişmedi.', 'Emre görevi üstlendi.', 'Yemek erken yendi.'], 0]])]),
    numarala([
      baglam('Aile toplantısı', B.diyalog([['Baba', 'Hafta sonu nereye gidelim? Herkes fikrini söylesin.'], ['Zeynep', 'Müzeye gidelim!'], ['Emre', 'Ben parkta bisiklet sürmek istiyorum.'], ['Anne', 'Sabah müzeye, öğleden sonra parka gidebiliriz.']]), [
        ['?', 'Bu ailede kararlar nasıl alınmaktadır?', ['Yalnız baba karar verir.', 'Herkesin fikri alınarak ortak karar verilir.', 'Çocuklar tek başına karar verir.', 'Kura çekilir.'], 1],
        sat('Ailende üstlendiğin bir rolü ve bu rolün sorumluluklarını yaz.', 2)]),
      tablo('Benim görev çizelgem! Bir hafta boyunca evdeki görevlerini yaptığın günlere ✓ koy.', ['Görevim', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'], [['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '']])])]),
    'hafta-05': W(5, 1, 'Grupta Karar Alıyorum', 'Grup içinde sorumluluk ve ortak karar', () => [numarala([
      baglam('Sınıf gezisi oylaması', B.tablo(['Gezi yeri', 'Oy sayısı'], [['Bilim merkezi', '12'], ['Hayvanat bahçesi', '9'], ['Müze', '7']]) + B.metin('Sınıfta 28 öğrenci var. Herkes bir oy kullandı.'), [
        ['?', 'Sınıf hangi yere gidecektir?', ['Müze', 'Hayvanat bahçesi', 'Bilim merkezi', 'Karar verilemez'], 2],
        ['?', 'Müzeyi seçen öğrenciler ne yapmalıdır?', ['Geziye katılmamalıdır.', 'Çoğunluğun kararına saygı göstermelidir.', 'Oylamayı yeniden istemelidir.', 'Kendi başlarına müzeye gitmelidir.'], 1],
        ['?', 'Bilim merkezi, hayvanat bahçesinden kaç oy fazla almıştır?', ['2', '3', '5', '7'], 1]]),
      baglam('Proje grubu', B.metin('Ödev grubunda Bora poster çizecek, Ela bilgileri yazacak, Arda sunumu yapacak. Arda sunum günü hazırlıksız geldi.'), [
        ['?', 'Bu durumdan çıkarılabilecek en doğru sonuç hangisidir?', ['Grup çalışması gereksizdir.', 'Bir kişinin sorumluluğunu yapmaması bütün grubu etkiler.', 'Sunumu her zaman öğretmen yapmalıdır.', 'Poster en önemli bölümdür.'], 1]])]),
    numarala([
      baglam('Sınıf kuralları', B.metin('4-A sınıfı, ilk hafta herkesin önerisini alarak sınıf kurallarını belirledi ve sözleşmeyi herkes imzaladı.'), [
        ['?', 'Kuralların birlikte belirlenmesinin yararı nedir?', ['Kurallar daha çok olur.', 'Herkes kuralları benimser ve uyar.', 'Öğretmenin işi azalır.', 'Kurallar hiç değişmez.'], 1],
        sat('Grup çalışmasında anlaşmazlık olursa nasıl çözersin?', 2)]),
      etk(0, 'Sınıf sözleşmemiz! Grubunla 5 kural belirleyin. Her kuralın yanına nedenini yazın.', `<table class="h2-tablo ttkb"><tr><th>Kuralımız</th><th>Neden önemli?</th></tr>${[1, 2, 3, 4, 5].map(() => '<tr><td style="height:12mm"></td><td></td></tr>').join('')}</table>`)])]),
    'hafta-06': W(6, 2, 'Aile Tarihim', 'Aile tarihi ve soy ağacı', () => [numarala([
      baglam('Kaan\'ın soy ağacı', S(300, 150, '<rect x="20" y="10" width="60" height="28" rx="6" fill="#fff3c4" stroke="#e08a00"/><text x="50" y="28" text-anchor="middle" font-size="9">Dede Ali</text><rect x="90" y="10" width="60" height="28" rx="6" fill="#fff3c4" stroke="#e08a00"/><text x="120" y="28" text-anchor="middle" font-size="9">Nine Hatice</text><rect x="160" y="10" width="60" height="28" rx="6" fill="#fff3c4" stroke="#e08a00"/><text x="190" y="28" text-anchor="middle" font-size="9">Dede Veli</text><rect x="230" y="10" width="60" height="28" rx="6" fill="#fff3c4" stroke="#e08a00"/><text x="260" y="28" text-anchor="middle" font-size="9">Nine Zehra</text><line x1="85" y1="38" x2="85" y2="62" stroke="#1f2a24"/><line x1="225" y1="38" x2="225" y2="62" stroke="#1f2a24"/><rect x="55" y="62" width="60" height="28" rx="6" fill="#d9f0ff" stroke="#3a86ff"/><text x="85" y="80" text-anchor="middle" font-size="9">Baba Murat</text><rect x="195" y="62" width="60" height="28" rx="6" fill="#d9f0ff" stroke="#3a86ff"/><text x="225" y="80" text-anchor="middle" font-size="9">Anne Sevgi</text><line x1="115" y1="76" x2="195" y2="76" stroke="#1f2a24"/><line x1="155" y1="76" x2="155" y2="110" stroke="#1f2a24"/><rect x="95" y="110" width="55" height="28" rx="6" fill="#d8f5e9" stroke="#12b886"/><text x="122" y="128" text-anchor="middle" font-size="9">Kaan</text><rect x="160" y="110" width="55" height="28" rx="6" fill="#d8f5e9" stroke="#12b886"/><text x="187" y="128" text-anchor="middle" font-size="9">Ece</text><line x1="122" y1="104" x2="187" y2="104" stroke="#1f2a24"/><line x1="122" y1="104" x2="122" y2="110" stroke="#1f2a24"/><line x1="187" y1="104" x2="187" y2="110" stroke="#1f2a24"/>', 92), [
        ['?', 'Kaan\'ın annesinin babası kimdir?', ['Dede Ali', 'Dede Veli', 'Baba Murat', 'Nine Zehra'], 1],
        ['?', 'Ece, Nine Hatice\'nin nesi olur?', ['Kızı', 'Torunu', 'Kardeşi', 'Annesi'], 1],
        ['?', 'Soy ağacında kaç kuşak (nesil) gösterilmiştir?', ['1', '2', '3', '4'], 2]]),
      baglam('Dedeyle söyleşi', B.diyalog([['Kaan', 'Dede, sen çocukken okula nasıl giderdin?'], ['Dede Ali', 'Köyümüzde okul yoktu. Her sabah 5 kilometre yürüyerek komşu köydeki okula giderdik. Kışın karda yol açardık.']]), [
        ['?', 'Kaan\'ın kullandığı bilgi toplama yöntemi hangisidir?', ['Gözlem', 'Deney', 'Sözlü tarih (görüşme)', 'Anket'], 2],
        ['?', 'Dedenin anlattıklarına göre geçmişle bugün arasındaki farklardan biri hangisidir?', ['Bugün okullar daha uzaktır.', 'Bugün okullara ulaşmak daha kolaydır.', 'Eskiden kar yağmazdı.', 'Eskiden okul hiç yoktu.'], 1]])]),
    numarala([
      etk(0, 'Kendi soy ağacını yap! Kutulara aile büyüklerinin adlarını yaz. Bilmediklerini ailene sor.', S(300, 150, '<rect x="10" y="10" width="64" height="30" rx="6" fill="#fff" stroke="#e08a00" stroke-width="2"/><rect x="84" y="10" width="64" height="30" rx="6" fill="#fff" stroke="#e08a00" stroke-width="2"/><rect x="158" y="10" width="64" height="30" rx="6" fill="#fff" stroke="#e08a00" stroke-width="2"/><rect x="232" y="10" width="64" height="30" rx="6" fill="#fff" stroke="#e08a00" stroke-width="2"/><line x1="79" y1="40" x2="79" y2="64" stroke="#1f2a24"/><line x1="227" y1="40" x2="227" y2="64" stroke="#1f2a24"/><rect x="45" y="64" width="70" height="30" rx="6" fill="#fff" stroke="#3a86ff" stroke-width="2"/><rect x="190" y="64" width="70" height="30" rx="6" fill="#fff" stroke="#3a86ff" stroke-width="2"/><line x1="115" y1="79" x2="190" y2="79" stroke="#1f2a24"/><line x1="152" y1="79" x2="152" y2="110" stroke="#1f2a24"/><rect x="112" y="110" width="80" height="32" rx="6" fill="#fff" stroke="#12b886" stroke-width="2.5"/><text x="152" y="130" text-anchor="middle" font-size="10">Ben</text>', 150)),
      yaz('Bir aile büyüğünle söyleşi yap. Cevapları yaz.', ['Çocukken en sevdiğiniz oyun neydi?', 'Okulunuz nasıldı?', 'O zamanla bugün arasındaki en büyük fark nedir?'])])]),
    'hafta-07': W(7, 2, 'Cumhuriyet Bayramı', 'Millî bayramlar ve kültürel ögeler', () => [numarala([
      baglam('Millî bayramlarımız', B.tablo(['Bayram', 'Tarih', 'Neyi kutlarız?'], [['Ulusal Egemenlik ve Çocuk Bayramı', '23 Nisan', 'TBMM\'nin açılışı (1920)'], ['Atatürk\'ü Anma, Gençlik ve Spor Bayramı', '19 Mayıs', 'Atatürk\'ün Samsun\'a çıkışı (1919)'], ['Zafer Bayramı', '30 Ağustos', 'Büyük Zafer (1922)'], ['Cumhuriyet Bayramı', '29 Ekim', 'Cumhuriyet\'in ilanı (1923)']]), [
        ['?', 'Tabloya göre millî bayramlardan hangisi en eski olayı kutlar?', ['23 Nisan', '19 Mayıs', '30 Ağustos', '29 Ekim'], 1],
        ['?', '2026 yılında Cumhuriyet\'in kaçıncı yılı kutlanır?', ['100', '101', '103', '123'], 2],
        ['?', 'Millî bayramları kutlamamızın temel amacı nedir?', ['Tatil yapmak', 'Tarihimizi ve kazanımlarımızı hatırlamak', 'Alışveriş yapmak', 'Yalnız gösteri izlemek'], 1]]),
      baglam('Bayram hazırlığı', B.metin('Okul, 29 Ekim için bir gösteri hazırlıyor. 4-A şiir okuyacak, 4-B halk oyunu oynayacak, 4-C bir pano hazırlayacak.'), [
        ['?', 'Bu hazırlıkta sınıfların farklı görevler almasının nedeni ne olabilir?', ['Gösterinin kısa sürmesi', 'Herkesin katkı sunması ve iş bölümü', 'Sınıfların yarışması', 'Öğretmenlerin dinlenmesi'], 1]])]),
    numarala([
      baglam('Dedemin bayramları', B.diyalog([['Dede', 'Bizim zamanımızda bayram sabahı fener alayı yapardık, herkes bayrağını asardı.'], ['Torun', 'Biz de bu yıl okulda fener alayı yapacağız!']]), [
        ['?', 'Bu konuşmadan hangi sonuç çıkarılabilir?', ['Bayram gelenekleri kuşaktan kuşağa aktarılır.', 'Eskiden bayram kutlanmazdı.', 'Fener alayı yeni bir gelenektir.', 'Bayramda bayrak asılmaz.'], 0],
        sat('Ailende bayramlarda yapılan bir geleneği yaz.')]),
      ciz('Cumhuriyet Bayramı için bir tebrik kartı tasarla. Kartına Cumhuriyet\'in sana kazandırdığı bir hakkı yaz.', 95)])]),
    'hafta-08': W(8, 2, 'Geçmişten Bugüne Oyunlar', 'Geçmiş ve bugün: oyunlar ve oyuncaklar', () => [numarala([
      baglam('Oyun anketi', B.grafik('Dedeler ve torunların en sevdiği oyunlar', ['Saklambaç', 'Uzay oyunu', 'Seksek', 'Bilgisayar', 'Futbol'], [9, 1, 7, 6, 8], 'Kişi', '#12b886'), [
        ['?', 'Grafikteki oyunlardan hangisi dedelerin çocukluğunda OYNANAMAZDI?', ['Saklambaç', 'Seksek', 'Bilgisayar oyunu', 'Futbol'], 2],
        ['?', 'En çok sevilen oyun hangisidir?', ['Futbol', 'Saklambaç', 'Seksek', 'Bilgisayar oyunu'], 1],
        ['?', 'Saklambaç ile seksek oyununu sevenlerin toplamı kaçtır?', ['14', '15', '16', '17'], 2]]),
      baglam('Oyuncaklar değişiyor', B.tablo(['Dönem', 'Oyuncak', 'Neyden yapılmış?'], [['Dedemin çocukluğu', 'Bez bebek, tahta araba', 'Kumaş, tahta'], ['Annemin çocukluğu', 'Plastik bebek, misket', 'Plastik, cam'], ['Bugün', 'Uzaktan kumandalı araba, tablet', 'Plastik, metal, elektronik parça']]), [
        ['?', 'Tabloya göre oyuncaklardaki değişimin nedeni hangisidir?', ['Çocukların büyümesi', 'Teknolojinin ve malzemelerin gelişmesi', 'Oyunların unutulması', 'Kumaşın tükenmesi'], 1]])]),
    numarala([
      baglam('Seksek kuralları', B.metin('Seksek, yere çizilen kareler üzerinde tek ayakla zıplanarak oynanır. Taş hangi kareye atılırsa o kareye basılmaz. Çizgiye basan sırasını arkadaşına verir.'), [
        ['?', 'Oyunda çizgiye basan oyuncu ne yapar?', ['Oyunu kazanır.', 'Sırasını arkadaşına verir.', 'Taşı yeniden atar.', 'İki ayakla zıplar.'], 1],
        sat('Geleneksel oyunların unutulmaması için ne yapılabilir? Bir öneri yaz.', 2)]),
      yaz('Bir aile büyüğüne çocukken oynadığı bir oyunu sor ve oyunun kurallarını yaz. Sonra arkadaşlarınla oyna!', ['Oyunun adı:', 'Kaç kişiyle oynanır?', 'Kuralları:', 'Bizim oyunlarımızla benzer yanı:'])])]),
    'hafta-09': W(9, 2, 'Atatürk\'ü Tanıyorum', 'Atatürk\'ün hayatı ve kişilik özellikleri', () => [numarala([
      baglam('Atatürk\'ün hayatından', B.serit([['1881', 'Selanik\'te doğdu'], ['1893', 'Askerî ortaokula girdi'], ['1919', 'Samsun\'a çıktı'], ['1920', 'TBMM açıldı'], ['1923', 'Cumhuriyet ilan edildi'], ['1938', '10 Kasım\'da vefat etti']]), [
        ['?', 'Atatürk Samsun\'a çıktığında kaç yaşındaydı?', ['36', '37', '38', '39'], 2],
        ['?', 'Cumhuriyet ilan edildikten kaç yıl sonra Atatürk vefat etmiştir?', ['13', '15', '17', '19'], 1],
        ['?', 'Her yıl 10 Kasım\'da yaptığımız etkinliğin amacı nedir?', ['Atatürk\'ü saygıyla anmak', 'Cumhuriyet\'i kutlamak', 'Okulun açılışını kutlamak', 'Çocuk Bayramı\'nı kutlamak'], 0]]),
      baglam('Bir anı', B.metin('Atatürk küçükken babası ölünce bir süre çiftlikte yaşadı. Tarladaki kargaları kovma işini kendisi düzenledi: Kardeşiyle nöbetleşe çalıştılar. Okulda ise matematik dersinde o kadar başarılıydı ki öğretmeni ona "Kemal" adını verdi.'), [
        ['?', 'Bu anıda Atatürk\'ün hangi özelliği öne çıkar?', ['Sorumluluk sahibi ve çalışkan olması', 'Oyun oynamayı sevmesi', 'Çok uyuması', 'Yalnız kalmayı sevmesi'], 0]])]),
    numarala([
      baglam('Atatürk\'ün sözü', B.metin('"Hayatta en hakiki mürşit (yol gösterici) ilimdir (bilimdir)." — Atatürk'), [
        ['?', 'Bu söze göre doğru yolu bulmak için neye güvenmeliyiz?', ['Söylentilere', 'Bilime', 'Şansa', 'Tahmine'], 1],
        sat('Bu sözü günlük hayatından bir örnekle açıkla.', 2)]),
      yaz('Atatürk\'e bir mektup yaz. Ona bugünkü Türkiye\'den ve kendi hayallerinden söz et.', ['Sevgili Atatürk,', '', '', 'Saygılarımla,'])])]),
    'hafta-10': W(10, 2, 'Millî Mücadele Kahramanları', 'Millî Mücadele\'de kahramanlar', () => [numarala([
      baglam('Kahramanlar kartı', B.tablo(['Kahraman', 'Nerede?', 'Ne yaptı?'], [['Nene Hatun', 'Erzurum', 'Aziziye Tabyası\'nı savunmaya katıldı.'], ['Şerife Bacı', 'Kastamonu', 'Kar fırtınasında cepheye cephane taşıdı.'], ['Sütçü İmam', 'Kahramanmaraş', 'Halkın direnişini başlattı.'], ['Şahin Bey', 'Gaziantep', 'Şehrin savunmasında kahramanlık gösterdi.']]), [
        ['?', 'Tabloya göre Millî Mücadele hakkında hangisi söylenebilir?', ['Yalnız askerler savaşmıştır.', 'Kadın erkek bütün halk mücadeleye katılmıştır.', 'Mücadele tek bir şehirde olmuştur.', 'Halk mücadeleye ilgisiz kalmıştır.'], 1],
        ['?', 'Şerife Bacı\'nın davranışı hangi değeri en iyi gösterir?', ['Vatanseverlik ve fedakârlık', 'Cimrilik', 'Bencillik', 'Tembellik'], 0],
        ['?', 'Kahramanmaraş, Gaziantep ve Şanlıurfa\'ya verilen "Kahraman, Gazi, Şanlı" unvanları neyin göstergesidir?', ['Şehirlerin büyüklüğünün', 'Millî Mücadele\'deki direnişlerinin', 'Nüfuslarının', 'Ürünlerinin'], 1]]),
      baglam('Çocuk kahramanlar', B.metin('Millî Mücadele yıllarında çocuklar da cepheye yiyecek ve mektup taşıdı, yaralılara su verdi. Bazı çocuklar kağnılarla cephane taşıyan annelerine yardım etti.'), [
        ['?', 'Bu metne göre Millî Mücadele\'de çocukların rolü hangisidir?', ['Hiçbir görev almamışlardır.', 'Güçleri yettiğince yardım etmişlerdir.', 'Yalnız oyun oynamışlardır.', 'Cepheyi yönetmişlerdir.'], 1]])]),
    numarala([
      baglam('Bir şiirden', B.metin('Kağnılar gıcırdar karlı yollarda, / Analar mermi taşır kucaklarda. / Bir olur, iri olur bu millet, / Bayrağı dalgalanır doruklarda.'), [
        ['?', 'Şiirde hangi duygu ön plandadır?', ['Korku ve vazgeçme', 'Birlik ve kararlılık', 'Neşe ve eğlence', 'Kıskançlık'], 1],
        sat('Bugün vatanımız için yapabileceğin iki şey yaz.', 2)]),
      tablo('Kahraman araştırması! Yaşadığın şehirden ya da bölgeden bir Millî Mücadele kahramanını araştır.', ['Soru', 'Cevap'], [['Adı:', ''], ['Nerede yaşadı?', ''], ['Ne yaptı?', ''], ['Hangi değeri gösterir?', ''], ['Kaynağım:', '']])])]),
    'hafta-11': W(11, 2, 'Kültürel Mirasımız', 'Yakın çevredeki tarihî ve kültürel mekânlar', () => [numarala([
      baglam('Müze bileti', B.etiket([['Müze', 'Arkeoloji Müzesi'], ['Açık', 'Salı - Pazar, 09.00-17.00'], ['Kapalı', 'Pazartesi'], ['Öğrenci', 'Ücretsiz'], ['Yetişkin', '60 TL'], ['Kurallar', 'Flaşlı fotoğraf çekilmez, eserlere dokunulmaz']]), [
        ['?', 'Aile bu müzeyi hangi gün ziyaret EDEMEZ?', ['Salı', 'Cuma', 'Pazartesi', 'Pazar'], 2],
        ['?', 'Bir anne, baba ve iki öğrenci çocuk müzeye kaç TL öder?', ['60', '120', '180', '240'], 1],
        ['?', 'Müzede eserlere dokunulmamasının nedeni nedir?', ['Eserlerin zarar görmeden gelecek kuşaklara aktarılması', 'Ziyaretçilerin yorulmaması', 'Müzenin erken kapanması', 'Fotoğrafın güzel çıkması'], 0]]),
      baglam('Bir şikâyet', B.metin('Tarihî bir köprünün taşlarına isimler kazınmış, çevresine çöp atılmıştı. Belediye köprünün çevresine uyarı levhaları koydu ve temizlik yaptı.'), [
        ['?', 'Köprüye zarar verenlerin davranışı neden yanlıştır?', ['Köprü yeni yapılabilir.', 'Kültürel miras hepimizindir ve yeniden yapılamaz.', 'Belediye temizlik yapar.', 'Taşlar zaten eskidir.'], 1]])]),
    numarala([
      baglam('Somut olmayan miras', B.metin('Kültürel miras yalnızca yapılardan oluşmaz. Ebru sanatı, Karagöz, âşıklık geleneği ve kahve kültürü gibi gelenekler de korunması gereken mirasımızdır.'), [
        ['?', 'Aşağıdakilerden hangisi somut olmayan (elle tutulamayan) bir kültürel mirastır?', ['Selimiye Camii', 'Efes Antik Kenti', 'Âşıklık geleneği', 'Galata Kulesi'], 2],
        sat('Yaşadığın yerdeki bir kültürel mirası yaz ve onu korumak için bir öneri ver.', 2)]),
      ciz('Yakın çevrendeki bir tarihî mekânı ya da kültürel ögeyi tanıtan bir broşür tasarla.', 95)])]),
    'hafta-12': W(12, 3, 'Ana ve Ara Yönler', 'Ana ve ara yönler', () => [numarala([
      baglam('Okul bahçesi krokisi', B.kroki([[120, 80, 'Okul', '#ffd6dc', 64, 34], [30, 20, 'Kantin', '#fff3c4'], [215, 140, 'Spor alanı', '#d8f5e9', 70], [30, 140, 'Bahçe', '#d8f5e9'], [215, 70, 'Kütüphane', '#d9f0ff', 60]]), [
        ['?', 'Kantin, okulun hangi yönündedir?', ['Kuzeydoğu', 'Kuzeybatı', 'Güneydoğu', 'Güneybatı'], 1],
        ['?', 'Okuldan spor alanına gitmek için hangi yöne gidilmelidir?', ['Kuzeybatı', 'Güneybatı', 'Güneydoğu', 'Kuzey'], 2],
        ['?', 'Kütüphane okulun hangi yönündedir?', ['Doğu', 'Batı', 'Kuzey', 'Güney'], 0]]),
      baglam('Güneşle yön bulma', B.metin('Ahmet sabah okula giderken Güneş\'in tam karşısından doğduğunu fark etti.'), [
        ['?', 'Ahmet sabah hangi yöne doğru yürümektedir?', ['Batı', 'Doğu', 'Kuzey', 'Güney'], 1],
        ['?', 'Ahmet akşam eve dönerken Güneş hangi yönde olur?', ['Önünde, batıda', 'Arkasında, doğuda', 'Sağında, kuzeyde', 'Solunda, güneyde'], 0]])]),
    numarala([
      baglam('Pusula gülü', S(200, 200, '<circle cx="100" cy="100" r="80" fill="#fff" stroke="#1d4e89" stroke-width="2"/>' + [0, 45, 90, 135, 180, 225, 270, 315].map(a => { const r = a % 90 ? 55 : 75, x = 100 + r * Math.sin(a * Math.PI / 180), y = 100 - r * Math.cos(a * Math.PI / 180); return `<line x1="100" y1="100" x2="${x}" y2="${y}" stroke="${a % 90 ? '#9db4c8' : '#1d4e89'}" stroke-width="${a % 90 ? 2 : 3}"/><circle cx="${x}" cy="${y}" r="9" fill="#fff" stroke="#1d4e89"/>`; }).join('') + '<text x="100" y="24" text-anchor="middle" font-size="12" font-weight="700">K</text>', 60), [
        ['?', 'Kuzey ile doğunun arasındaki ara yön hangisidir?', ['Kuzeybatı', 'Kuzeydoğu', 'Güneydoğu', 'Güneybatı'], 1],
        sat('Boş daireleri doğru yönlerle doldur (G, D, B, KD, KB, GD, GB).', 1)]),
      yaz('Evinden okuluna giderken hangi yönlere döndüğünü anlatan bir yol tarifi yaz.', ['Evden çıkınca …', 'Sonra …', 'En son …'])])]),
    'hafta-13': W(13, 3, 'Kroki Çiziyorum', 'Kroki çizme ve okuma', () => [numarala([
      baglam('Mahalle krokisi', B.kroki([[20, 20, 'Ev', '#d9f0ff'], [20, 130, 'Okul', '#ffd6dc'], [200, 20, 'Park', '#d8f5e9'], [200, 130, 'Market', '#fff3c4'], [110, 75, 'Cami', '#efe6ff', 50]], yol('M95 0 V190') + yol('M0 105 H300')), [
        ['?', 'Krokiye göre ev, okulun hangi yönündedir?', ['Kuzey', 'Güney', 'Doğu', 'Batı'], 0],
        ['?', 'Parktan markete gitmek isteyen biri hangi yöne gitmelidir?', ['Kuzey', 'Güney', 'Doğu', 'Batı'], 1],
        ['?', 'Krokilerin haritalardan farkı nedir?', ['Krokide yön yoktur.', 'Kroki belirli bir ölçek kullanılmadan, kabaca çizilir.', 'Kroki yalnızca dünya için çizilir.', 'Krokide renk kullanılmaz.'], 1]]),
      baglam('İşaretler tablosu', B.tablo(['İşaret', 'Anlamı'], [['🟦', 'Okul'], ['🌳', 'Park'], ['🟥', 'Hastane'], ['➖', 'Yol']]), [
        ['?', 'Krokilerde işaretler tablosu (lejant) neden kullanılır?', ['Krokiyi süslemek için', 'Kullanılan işaretlerin ne anlama geldiğini göstermek için', 'Yönleri göstermek için', 'Krokiyi küçültmek için'], 1]])]),
    numarala([
      etk(0, 'Evinin ya da sınıfının krokisini çiz. Kuzey yönünü göster ve bir işaretler tablosu yap.', `<div class="h3-kroki"><div class="h2-ciz" style="min-height:95mm"></div><table class="h2-tablo ttkb"><tr><th>İşaret</th><th>Anlamı</th></tr>${[1, 2, 3, 4, 5].map(() => '<tr><td style="height:10mm"></td><td></td></tr>').join('')}</table></div>`),
      yaz('Krokini bir arkadaşınla değiştir. Onun krokisine bakarak 2 soru sor.', ['Sorum 1:', 'Sorum 2:'])])]),
    'hafta-14': W(14, 3, 'Yeryüzü Şekilleri', 'Yeryüzü şekilleri', () => [numarala([
      baglam('Bir gezi günlüğü', B.metin('Yolculuğumuz denize kadar uzanan geniş ve düz bir arazide başladı. Sonra yüksek, karlı zirveleri olan bir yere tırmandık. İki dağ arasında akarsuyun oyduğu derin bir yerden geçtik. En son dört yanı denizle çevrili küçük bir kara parçasına vapurla gittik.'), [
        ['?', 'Yolculuğun başladığı "geniş ve düz arazi" hangi yeryüzü şeklidir?', ['Ova', 'Dağ', 'Vadi', 'Ada'], 0],
        ['?', '"İki dağ arasında akarsuyun oyduğu derin yer" hangisidir?', ['Plato', 'Vadi', 'Ova', 'Körfez'], 1],
        ['?', 'Yolculuk hangi yeryüzü şekliyle bitmiştir?', ['Yarımada', 'Göl', 'Ada', 'Ova'], 2]]),
      baglam('Yerleşme ve yeryüzü şekli', B.tablo(['Yer', 'Yeryüzü şekli', 'Nüfus'], [['Köy A', 'Ova', 'Kalabalık'], ['Köy B', 'Yüksek dağ yamacı', 'Az'], ['Köy C', 'Akarsu kenarı ova', 'Çok kalabalık']]), [
        ['?', 'Tabloya göre insanlar yerleşmek için genellikle nereleri tercih eder?', ['Yüksek ve dik yerleri', 'Düz ve suya yakın yerleri', 'Kayalık yerleri', 'Karla kaplı yerleri'], 1]])]),
    numarala([
      etk(0, 'Yeryüzü şekilleri sözlüğü! Her şeklin tanımını oku, yanına bir örnek ya da küçük bir çizim yap.', `<table class="h2-tablo ttkb"><tr><th>Şekil</th><th>Tanımı</th><th>Örnek / Çizim</th></tr>${[['Dağ', 'Çevresine göre çok yüksek yer'], ['Ova', 'Geniş ve düz alan'], ['Plato', 'Yüksekte bulunan düzlük'], ['Vadi', 'Akarsuyun oyduğu uzun çukur'], ['Ada', 'Dört yanı suyla çevrili kara'], ['Yarımada', 'Üç yanı suyla çevrili kara']].map(([a, b]) => `<tr><td>${a}</td><td>${b}</td><td style="height:15mm"></td></tr>`).join('')}</table>`),
      yaz('Yaşadığın yerin yeryüzü şekillerini gözlemle.', ['Çevremde gördüğüm yeryüzü şekilleri:', 'Bu şekiller insanların yaşamını nasıl etkiliyor?'])])]),
    'hafta-15': W(15, 3, 'Hava Durumu ve Yaşam', 'Hava durumu ve insan yaşamı', () => [numarala([
      baglam('Haftalık hava tahmini', B.tablo(['Gün', 'Hava', 'Sıcaklık'], [['Pazartesi', '☀️ Güneşli', '22 °C'], ['Salı', '⛅ Parçalı bulutlu', '19 °C'], ['Çarşamba', '🌧️ Yağmurlu', '14 °C'], ['Perşembe', '🌧️ Sağanak', '12 °C'], ['Cuma', '☀️ Güneşli', '18 °C']]), [
        ['?', 'Sınıf açık havada piknik yapmak istiyor. En uygun gün hangisidir?', ['Pazartesi', 'Çarşamba', 'Perşembe', 'Salı'], 0],
        ['?', 'Perşembe günü okula giderken hangisini yanına almak en doğrudur?', ['Güneş gözlüğü', 'Şemsiye ve yağmurluk', 'Mayo', 'Şapka'], 1],
        ['?', 'Pazartesi ile Perşembe arasındaki sıcaklık farkı kaç derecedir?', ['8', '10', '12', '14'], 1]]),
      baglam('Çiftçi ve hava', B.metin('Çiftçi Hasan Amca, televizyonda yarın don olacağını duydu. Seradaki fidelerin üzerini örttü ve sobayı yaktı.'), [
        ['?', 'Hasan Amca\'nın davranışı neyi gösterir?', ['Hava durumunun ekonomik etkinlikleri etkilediğini', 'Hava tahminlerinin gereksiz olduğunu', 'Çiftçilerin kışın çalışmadığını', 'Seraların sıcak olduğunu'], 0]])]),
    numarala([
      baglam('Giysi seçimi', B.metin('İzmir\'de yaşayan Ece, kışın Erzurum\'daki dedesini ziyaret edecek. İzmir\'de hava 14 °C, Erzurum\'da -10 °C.'), [
        ['?', 'Ece\'nin yanına alması gereken en uygun giysiler hangileridir?', ['Şort ve tişört', 'Kalın mont, bere, eldiven', 'Yağmurluk ve sandalet', 'Mayo ve şapka'], 1],
        sat('Yaşadığın yerin iklimi insanların yaşamını nasıl etkiliyor? (giyim, ev, yiyecek)', 2)]),
      tablo('Hava günlüğüm! Bir hafta boyunca havayı gözlemle.', ['Gün', 'Hava nasıldı?', 'Sıcaklık (tahmin)', 'Ne giydim?'], ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'].map(g => [g, '', '', '']))])]),
    'hafta-16': W(16, 3, 'Doğal Afetler', 'Doğal afetler', () => [numarala([
      baglam('Afet haberleri', B.tablo(['Haber', 'Olay'], [['1', 'Yer kabuğundaki kırılmayla yer sarsıldı.'], ['2', 'Şiddetli yağmurdan sonra dere taştı, evleri su bastı.'], ['3', 'Eğimli bir yamaçta toprak kayarak yolu kapattı.'], ['4', 'Kuvvetli kar yağışı yolları kapattı.']]), [
        ['?', '2 numaralı haberde anlatılan afet hangisidir?', ['Deprem', 'Sel', 'Heyelan', 'Çığ'], 1],
        ['?', '3 numaralı haberde anlatılan afet hangisidir?', ['Heyelan', 'Deprem', 'Sel', 'Kuraklık'], 0],
        ['?', 'Hangi afetin ne zaman olacağı önceden bilinemez?', ['Deprem', 'Kar yağışı', 'Sel (yağış tahminiyle)', 'Fırtına'], 0]]),
      baglam('Ağaçlar ve sel', B.metin('Bir köyün yamaçlarındaki ağaçlar kesildi. Birkaç yıl sonra yağmurlarda sel ve heyelan olayları arttı.'), [
        ['?', 'Bu durumda sel ve heyelanın artmasının nedeni nedir?', ['Ağaçların toprağı tutamaması', 'Köyün büyümesi', 'Yağmurun azalması', 'Yolların genişlemesi'], 0]])]),
    numarala([
      baglam('Afet anında', B.metin('Elif okuldayken deprem oldu. Bazı arkadaşları koşarak merdivenlere yöneldi.'), [
        ['?', 'Elif\'in yapması gereken en doğru davranış hangisidir?', ['Merdivene koşmak', 'Pencereden bakmak', 'Sağlam bir sıranın yanında çök-kapan-tutun yapmak', 'Asansöre binmek'], 2],
        sat('Arkadaşlarının merdivene koşması neden tehlikelidir?', 2)]),
      ucSutun('Afet öncesi, anı, sonrası! Davranışları doğru sütuna yaz.', [['Öncesi', '#3a86ff'], ['Anı', '#f2546b'], ['Sonrası', '#12b886']], ['Afet çantası hazırlamak', 'Çök-kapan-tutun', 'Toplanma alanına gitmek', 'Dolapları sabitlemek', 'Asansöre binmemek', 'Yetkilileri dinlemek'])])]),
    'hafta-17': W(17, 3, 'Afetlere Hazırım', 'Afetlere hazırlık', () => [numarala([
      baglam('Afet çantası', B.tablo(['Malzeme', 'Neden?'], [['Su ve konserve', 'Beslenme'], ['El feneri ve pil', 'Aydınlanma'], ['Düdük', 'Yerini bildirme'], ['İlk yardım çantası', 'Yaralanmalar'], ['Kimlik fotokopisi', 'Kimlik belirleme']]), [
        ['?', 'Enkaz altında kalan biri sesini duyurmak için hangi malzemeyi kullanmalıdır?', ['El feneri', 'Düdük', 'Konserve', 'Kimlik'], 1],
        ['?', 'Afet çantasına hangisinin konması GEREKMEZ?', ['Su', 'İlk yardım çantası', 'Oyun konsolu', 'El feneri'], 2],
        ['?', 'Afet çantası nerede durmalıdır?', ['Kolayca ulaşılabilen bir yerde', 'Kilitli bir dolapta', 'Bodrumda', 'Komşunun evinde'], 0]]),
      baglam('Toplanma alanı', B.metin('Okulun yanında AFAD\'ın belirlediği bir toplanma alanı var. Levhada yeşil zemin üzerinde insanlar çizilidir.'), [
        ['?', 'Toplanma alanı ne için kullanılır?', ['Afetten sonra güvenle bir araya gelmek için', 'Futbol oynamak için', 'Araç park etmek için', 'Pazar kurmak için'], 0]])]),
    numarala([
      tablo('Ailemizin afet planı! Ailenle birlikte doldur.', ['Soru', 'Cevap'], [['Evimizdeki güvenli yerler:', ''], ['Toplanma alanımız:', ''], ['Afet çantamızın yeri:', ''], ['Arayacağımız yakınımız:', ''], ['Acil numara:', '112'], ['Okulumuzun toplanma alanı:', '']]),
      yaz('Afetlere hazırlık için evinde neleri değiştirdin? (dolap sabitleme, çanta…)', ['1.', '2.'])])]),
    'hafta-18': W(18, 4, 'Teknoloji Değişiyor', 'Teknolojik ürünlerin geçmişi ve bugünü', () => [numarala([
      baglam('İletişimin yolculuğu', B.serit([['Eskiden', 'Mektup, ulak, güvercin'], ['1800\'ler', 'Telgraf'], ['1900\'ler', 'Telefon, radyo'], ['1990\'lar', 'Cep telefonu, internet'], ['Bugün', 'Akıllı telefon, görüntülü görüşme']]), [
        ['?', 'Zaman şeridine göre iletişim araçlarındaki değişim için hangisi söylenebilir?', ['İletişim gittikçe yavaşlamıştır.', 'İletişim gittikçe hızlanmıştır.', 'Hiçbir değişiklik olmamıştır.', 'Mektup hiç kullanılmamıştır.'], 1],
        ['?', 'Hangisi telgraftan SONRA kullanılmaya başlanmıştır?', ['Ulak', 'Güvercin', 'Telefon', 'Mektup'], 2],
        ['?', 'Dedemin çocukken uzaktaki biriyle görüntülü konuşamamasının nedeni nedir?', ['O zaman bu teknoloji henüz yoktu.', 'Konuşmak yasaktı.', 'Kimse uzakta yaşamazdı.', 'Telefonlar çok pahalıydı.'], 0]]),
      baglam('Çamaşırın hikâyesi', B.tablo(['Dönem', 'Çamaşır nasıl yıkanırdı?', 'Süre'], [['Eskiden', 'Dere kenarında, tokaçla', 'Bütün gün'], ['Bugün', 'Çamaşır makinesiyle', '1-2 saat']]), [
        ['?', 'Tabloya göre teknolojinin günlük yaşama etkisi nedir?', ['İnsanlara zaman kazandırmıştır.', 'İşleri zorlaştırmıştır.', 'Çamaşırları kirletmiştir.', 'Suyu gereksiz yapmıştır.'], 0]])]),
    numarala([
      eskiYeniTablo(),
      yaz('Bir aile büyüğüne sor: Çocukken hangi teknolojik ürün yoktu, yerine ne kullanırdınız?', ['Ürün:', 'Yerine kullandıkları:', 'Bu değişim hayatı nasıl etkiledi?'])])]),
    'hafta-19': W(19, 4, 'Buluşlar ve Mucitler', 'Buluşların toplum yaşamına etkisi', () => [numarala([
      baglam('Mucitler tablosu', B.tablo(['Mucit', 'Buluş', 'Hangi sorunu çözdü?'], [['El-Cezerî', 'Otomatik su saati', 'Zamanı ölçmek'], ['Gutenberg', 'Matbaa', 'Kitapları hızlı çoğaltmak'], ['Edison', 'Ampul (geliştirdi)', 'Geceleri aydınlanmak'], ['Aziz Sancar', 'DNA onarımı araştırmaları', 'Hastalıkları anlamak']]), [
        ['?', 'Matbaanın bulunması toplumda en çok neyi değiştirmiştir?', ['Kitapların daha çok kişiye ulaşmasını', 'Gecelerin aydınlanmasını', 'Zamanın ölçülmesini', 'Yolculukların kısalmasını'], 0],
        ['?', 'Tabloya göre buluşların ortak özelliği nedir?', ['Hepsi aynı yüzyılda yapılmıştır.', 'Hepsi bir sorunu çözmek için ortaya çıkmıştır.', 'Hepsi elektrikle çalışır.', 'Hepsini aynı kişi bulmuştur.'], 1],
        ['?', 'Aziz Sancar hangi alanda çalışmıştır?', ['Mimarlık', 'Bilim (kimya, tıp)', 'Müzik', 'Spor'], 1]]),
      baglam('Bir mucidin günlüğü', B.metin('"İlk denemem başarısız oldu. İkinci denemede kanatlar kırıldı. Üçüncü denemede tasarımı değiştirdim ve sonunda çalıştı!"'), [
        ['?', 'Bu günlük bir mucidin hangi özelliğini gösterir?', ['Sabırlı ve kararlı olmasını', 'Çabuk vazgeçmesini', 'Kimseye danışmamasını', 'Şanslı olmasını'], 0]])]),
    numarala([
      etk(0, 'Mucit atölyesi! Günlük hayatta karşılaştığın bir sorunu çözecek bir buluş tasarla.', `<div class="h3-iki ttkb"><div><b>Sorun</b>${cizgi(3)}<b>Buluşumun adı</b>${cizgi(1)}<b>Nasıl çalışır?</b>${cizgi(3)}</div><div class="h2-ciz" style="min-height:85mm"></div></div>`),
      yaz('Buluşunun topluma yararları ve olası zararları neler olabilir?', ['Yararları:', 'Olası zararları:'])])]),
    'hafta-20': W(20, 4, 'Teknolojiyi Güvenli Kullan', 'Teknolojik ürünlerin bilinçli kullanımı', () => [numarala([
      baglam('Ekran süresi', B.grafik('Barış\'ın bir haftalık ekran süresi', ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'], [2, 1, 3, 2, 2, 5, 6], 'Saat', '#f2546b'), [
        ['?', 'Barış en çok hangi gün ekran başında kalmıştır?', ['Cumartesi', 'Pazar', 'Çarşamba', 'Cuma'], 1],
        ['?', 'Uzmanlar bu yaştaki çocuklar için günde en çok 2 saat ekran süresi öneriyor. Barış kaç gün bu sınırı aşmıştır?', ['1', '2', '3', '4'], 2],
        ['?', 'Barış\'a en uygun öneri hangisidir?', ['Hafta sonu ekran süresini azaltıp açık hava etkinlikleri yapmak', 'Hiç uyumamak', 'Daha çok oyun oynamak', 'Ekranı karanlıkta kullanmak'], 0]]),
      baglam('Elektrikli araçlar', B.metin('Ayşe ıslak elleriyle saç kurutma makinesinin fişini prize takmak istedi. Annesi hemen onu durdurdu.'), [
        ['?', 'Annesi Ayşe\'yi neden durdurmuştur?', ['Elektrik çarpma tehlikesi olduğu için', 'Makine bozuk olduğu için', 'Saçı zaten kuru olduğu için', 'Elektrik pahalı olduğu için'], 0]])]),
    numarala([
      davranisTablo([['Telefonu şarjda kullanarak uyurum.', 'Y'], ['Kulaklıkla sesi çok açmam.', 'D'], ['Ekrana göz seviyesinden ve uzaktan bakarım.', 'D'], ['Yemek yerken tablet izlerim.', 'Y'], ['Kullanmadığım cihazların fişini çekerim.', 'D']]),
      yaz('Ailenle birlikte "teknoloji kuralları" belirleyin.', ['Ekran süremiz:', 'Ekransız saatlerimiz:', 'Güvenlik kuralımız:'])])]),
    'hafta-21': W(21, 4, 'İnternette Güvendeyim', 'İnternette güvenlik', () => [numarala([
      baglam('Bir mesaj', B.diyalog([['Bilinmeyen kişi', 'Merhaba! Ben de 10 yaşındayım. Hangi okula gidiyorsun? Ev adresini verir misin, sana hediye göndereceğim.'], ['Duru', '…']]), [
        ['?', 'Duru\'nun vermesi gereken en doğru cevap hangisidir?', ['Adresini yazmak', 'Okulunun adını yazmak', 'Cevap vermeyip ailesine haber vermek', 'Fotoğrafını göndermek'], 2],
        ['?', 'Bu mesajın şüpheli olduğunu gösteren ipucu hangisidir?', ['Merhaba demesi', 'Kişisel bilgi ve adres istemesi', 'Türkçe yazması', 'Kısa olması'], 1],
        ['?', 'İnternette paylaşılan bir fotoğraf için hangisi doğrudur?', ['Silinince her yerden kaybolur.', 'Başkaları tarafından kaydedilip kullanılabilir.', 'Yalnız arkadaşlar görebilir.', 'Hiç kimse göremez.'], 1]]),
      baglam('Güçlü şifre', B.tablo(['Şifre', 'Güçlü mü?'], [['123456', '?'], ['ali2016', '?'], ['Kırmızı!Balon7Uçar', '?']]), [
        ['?', 'Hangi şifre en güçlüdür?', ['123456', 'ali2016', 'Kırmızı!Balon7Uçar', 'Hepsi aynıdır'], 2]])]),
    numarala([
      baglam('Doğru mu, yanlış mı?', B.metin('Sosyal medyada "Yarın okullar tatil!" diye bir paylaşım gördün. Paylaşımın kimden geldiği belli değil.'), [
        ['?', 'Bu bilginin doğruluğunu nasıl kontrol edersin?', ['Hemen herkese paylaşırım.', 'Resmî kurumların (valilik, okul) açıklamasına bakarım.', 'Arkadaşıma sorarım, o da paylaşmışsa doğrudur.', 'Hiç kontrol etmem.'], 1],
        sat('Dijital ayak izi ne demektir? Kendi cümlelerinle açıkla.', 2)]),
      afis4('İnternette güvenlik için bir afiş tasarla. 3 kural yaz.')])]),
    'hafta-22': W(22, 4, 'Emeğe Saygı', 'Fikrî ürünlere saygı (telif)', () => [numarala([
      baglam('Ödev hazırlığı', B.metin('Mert, bir internet sitesindeki yazıyı olduğu gibi kopyalayıp kendi ödevi gibi teslim etti. Ece ise aynı sitedeki bilgileri okudu, kendi cümleleriyle yazdı ve kaynağını belirtti.'), [
        ['?', 'Hangi öğrenci başkasının emeğine saygı göstermiştir?', ['Mert', 'Ece', 'İkisi de', 'Hiçbiri'], 1],
        ['?', 'Mert\'in davranışı neden yanlıştır?', ['Başkasının emeğini kendi emeği gibi göstermiştir.', 'Çok uzun yazmıştır.', 'İnternet kullanmıştır.', 'Ödevini erken teslim etmiştir.'], 0],
        ['?', 'Ece\'nin kaynak belirtmesinin yararı nedir?', ['Ödevin daha kısa olması', 'Bilginin nereden alındığının bilinmesi ve emeğe saygı', 'Ödevin renkli olması', 'Öğretmenin okumaması'], 1]]),
      baglam('Korsan ürün', B.metin('Bir pazarda sanatçıların izni olmadan çoğaltılmış CD\'ler çok ucuza satılıyor.'), [
        ['?', 'Bu ürünleri almamak için en güçlü gerekçe hangisidir?', ['Sanatçıların emeğine ve haklarına zarar verir.', 'Rengi güzel değildir.', 'Pazar uzaktır.', 'Ucuz olduğu için güzeldir.'], 0]])]),
    numarala([
      tablo('Kaynak gösterme alıştırması! Okuduğun bir kitabın bilgilerini yaz.', ['Bilgi', 'Yaz'], [['Kitabın adı:', ''], ['Yazarı:', ''], ['Yayınevi:', ''], ['Basım yılı:', ''], ['Kullandığım sayfa:', '']]),
      yaz('Bir şiir ya da resim yap ve altına adını yaz. Başkası eserini izinsiz kullansa ne hissederdin?', ['Eserimin adı:', 'Hissim:'])])]),
    'hafta-23': W(23, 5, 'İhtiyaç mı, İstek mi?', 'İhtiyaç ve istek', () => [numarala([
      baglam('Alışveriş listesi', B.tablo(['Ürün', 'Fiyat'], [['Ekmek', '15 TL'], ['Süt', '40 TL'], ['Oyuncak robot', '450 TL'], ['Okul defteri', '30 TL'], ['Çikolata', '25 TL'], ['Kışlık mont', '900 TL']]), [
        ['?', 'Listedeki ürünlerden hangisi bir istektir?', ['Ekmek', 'Süt', 'Oyuncak robot', 'Kışlık mont'], 2],
        ['?', 'Ekmek, süt ve defter almak için kaç TL gerekir?', ['75', '85', '95', '105'], 1],
        ['?', 'Parası sınırlı olan bir aile önce hangilerini almalıdır?', ['İstekleri', 'Temel ihtiyaçları', 'En pahalı ürünleri', 'Reklamı yapılan ürünleri'], 1]]),
      baglam('Reklam', B.metin('Televizyonda "Bu ayakkabıyı giyen herkes en hızlı koşucu olur!" diye bir reklam vardı. Kaan\'ın ayakkabısı yeni olmasına rağmen o da bu ayakkabıyı istedi.'), [
        ['?', 'Kaan\'ın isteği nereden kaynaklanmıştır?', ['Gerçek bir ihtiyaçtan', 'Reklamın etkisinden', 'Ayakkabısının eskimesinden', 'Doktor önerisinden'], 1]])]),
    numarala([
      baglam('Ne yapardın?', B.metin('Doğum gününde 500 TL harçlık aldın. Okul çantan yırtık, bir de çok istediğin bir oyun var.'), [
        ['?', 'Hangi karar en bilinçlidir?', ['Bütün parayı oyuna vermek', 'Önce çanta ihtiyacını karşılayıp kalanı biriktirmek', 'Parayı harcamadan kaybetmek', 'Arkadaşından borç almak'], 1],
        sat('Bu hafta senin için ihtiyaç olan ve istek olan birer şey yaz.')]),
      ucSutun('İhtiyaç mı, istek mi? Örnekleri doğru sütuna yaz.', [['İhtiyaç', '#12b886'], ['İstek', '#f4a100'], ['Duruma göre değişir', '#8b5cf6']], ['Su', 'Akıllı saat', 'Barınma', 'Bisiklet', 'Ders kitabı', 'Tatil', 'Ayakkabı', 'Pahalı marka tişört'])])]),
    'hafta-24': W(24, 5, 'Bütçemi Yapıyorum', 'Bütçe ve birikim', () => [numarala([
      baglam('Selin\'in harçlık defteri', B.tablo(['Hafta', 'Gelir (harçlık)', 'Gider', 'Kalan'], [['1. hafta', '200 TL', '150 TL', '50 TL'], ['2. hafta', '200 TL', '120 TL', '?'], ['3. hafta', '200 TL', '200 TL', '0 TL'], ['4. hafta', '200 TL', '90 TL', '110 TL']]), [
        ['?', '2. haftada Selin\'in elinde kaç TL kalmıştır?', ['60', '70', '80', '90'], 2],
        ['?', 'Selin bir ayda toplam kaç TL biriktirmiştir?', ['200', '230', '240', '250'], 2],
        ['?', 'Selin\'in en çok harcama yaptığı hafta hangisidir?', ['1. hafta', '2. hafta', '3. hafta', '4. hafta'], 2]]),
      baglam('Hedef', B.metin('Selin 600 TL\'lik bir kaykay almak istiyor. Her hafta 100 TL biriktirmeye karar verdi.'), [
        ['?', 'Selin kaykayı en az kaç haftada alabilir?', ['4', '5', '6', '7'], 2]])]),
    numarala([
      baglam('Aile bütçesi', B.grafik('Bir ailenin aylık giderleri', ['Kira', 'Mutfak', 'Fatura', 'Ulaşım', 'Birikim'], [12, 8, 4, 3, 3], 'Bin TL', '#8b5cf6'), [
        ['?', 'Ailenin en büyük gideri hangisidir?', ['Mutfak', 'Kira', 'Fatura', 'Ulaşım'], 1],
        sat('Ailene fatura giderlerini azaltmak için iki öneri yaz.', 2)]),
      tablo('Kendi haftalık bütçeni planla!', ['Gelirim', 'Harcama planım', 'Tutar', 'Biriktireceğim'], [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['Toplam', '', '', '']])])]),
    'hafta-25': W(25, 5, 'Bilinçli Tüketici', 'Bilinçli tüketicilik', () => [numarala([
      baglam('Ürün etiketi', B.etiket([['Ürün', 'Meyveli Yoğurt'], ['Üretim tarihi', '02.03.2027'], ['Son tüketim tarihi', '16.03.2027'], ['Saklama', '+4 °C\'de buzdolabında'], ['Belge', 'TSE ✓ · Helal ✓'], ['Fiyat', '35 TL']]), [
        ['?', 'Bu yoğurt hangi tarihten sonra yenmemelidir?', ['02.03.2027', '10.03.2027', '16.03.2027', '30.03.2027'], 2],
        ['?', 'Ürünün nasıl saklanması gerektiğini etiketin hangi bölümünden öğreniriz?', ['Fiyat', 'Saklama', 'Belge', 'Ürün adı'], 1],
        ['?', 'Ürün üretildikten kaç gün sonra son tüketim tarihi dolar?', ['10', '12', '14', '16'], 2]]),
      baglam('Bozuk ürün', B.metin('Ali yeni aldığı oyuncağın iki gün sonra bozulduğunu fark etti. Fişini saklamıştı.'), [
        ['?', 'Ali\'nin yapması gereken en doğru davranış hangisidir?', ['Oyuncağı atmak', 'Fişiyle mağazaya başvurup değişim istemek', 'Arkadaşına satmak', 'Kendisi tamir etmeye çalışmak'], 1]])]),
    numarala([
      baglam('Fiyat karşılaştırma', B.tablo(['Market', 'Ürün', 'Miktar', 'Fiyat'], [['A Market', 'Pirinç', '1 kg', '80 TL'], ['B Market', 'Pirinç', '2 kg', '150 TL'], ['C Market', 'Pirinç', '5 kg', '400 TL']]), [
        ['?', 'Pirincin kilogramı hangi markette en ucuzdur?', ['A', 'B', 'C', 'Hepsinde aynı'], 1],
        sat('Bilinçli bir tüketici alışverişte nelere dikkat eder? Üç madde yaz.', 2)]),
      yaz('Evdeki bir ürünün etiketini incele ve bilgilerini yaz.', ['Ürün:', 'Son kullanma tarihi:', 'Saklama koşulu:', 'Üretim yeri:'])])]),
    'hafta-26': W(26, 5, 'Yöremin Ürünleri', 'Yaşadığı yerin ekonomik faaliyetleri', () => [numarala([
      baglam('Türkiye\'nin ürünleri', B.tablo(['İl', 'Ürün', 'Ekonomik faaliyet'], [['Rize', 'Çay', 'Tarım'], ['Gaziantep', 'Fıstık, baklava', 'Tarım, sanayi'], ['Bursa', 'Otomobil, ipek', 'Sanayi'], ['Antalya', 'Turizm, narenciye', 'Turizm, tarım'], ['Zonguldak', 'Kömür', 'Madencilik']]), [
        ['?', 'Tabloya göre Zonguldak\'ta hangi ekonomik faaliyet öne çıkar?', ['Turizm', 'Madencilik', 'Balıkçılık', 'Çay tarımı'], 1],
        ['?', 'Rize\'de çay yetişmesinin en önemli nedeni ne olabilir?', ['Bol yağış ve uygun iklim', 'Kömür madenleri', 'Fabrikaların çok olması', 'Turistlerin gelmesi'], 0],
        ['?', 'Antalya\'da turizmin gelişmesinde hangisi etkili OLMAMIŞTIR?', ['Denizi', 'Güneşli havası', 'Tarihî yerleri', 'Kömür madenleri'], 3]]),
      baglam('Coğrafi işaret', B.metin('Malatya kayısısı, Aydın inciri ve Kayseri pastırması "coğrafi işaretli" ürünlerdir. Bu işaret, ürünün o yöreye özgü olduğunu gösterir.'), [
        ['?', 'Coğrafi işaretin üreticilere en önemli yararı nedir?', ['Ürünün tanınması ve değer kazanması', 'Ürünün ucuzlaması', 'Ürünün her yerde üretilmesi', 'Ürünün bozulmaması'], 0]])]),
    numarala([
      tablo('Yöremi tanıtıyorum! Yaşadığın yeri araştır.', ['Soru', 'Cevap'], [['İlim / ilçem:', ''], ['Öne çıkan ürünler:', ''], ['Ekonomik faaliyetler:', ''], ['Bunun nedeni (iklim, yeryüzü şekli…):', ''], ['Coğrafi işaretli bir ürün:', '']]),
      ciz('Yöreni tanıtan bir ürün etiketi ya da afiş tasarla.', 75)])]),
    'hafta-27': W(27, 5, 'Tarladan Sofraya', 'Üretim, dağıtım ve tüketim; meslekler', () => [numarala([
      baglam('Ekmeğin yolculuğu', B.serit([['1', 'Çiftçi buğdayı eker'], ['2', 'Biçerdöver hasat eder'], ['3', 'Değirmende un olur'], ['4', 'Kamyonla fırına taşınır'], ['5', 'Fırıncı ekmek yapar'], ['6', 'Markette satılır']]), [
        ['?', 'Ekmeğin yolculuğunda "dağıtım" aşaması hangisidir?', ['Buğday ekilmesi', 'Un yapılması', 'Kamyonla taşınması', 'Ekmeğin yenmesi'], 2],
        ['?', 'Bu süreçte hangi meslek YER ALMAZ?', ['Çiftçi', 'Değirmenci', 'Şoför', 'Pilot'], 3],
        ['?', 'Kamyon şoförleri bir hafta çalışmazsa ne olur?', ['Ekmek markete ulaşmaz.', 'Buğday yetişmez.', 'Fırınlar daha çok ekmek yapar.', 'Hiçbir şey değişmez.'], 0]]),
      baglam('İsraf', B.metin('Türkiye\'de her gün milyonlarca ekmek israf ediliyor. Bir ekmeğin sofraya gelmesi için birçok kişi emek veriyor.'), [
        ['?', 'Ekmek israfını önlemek için hangisi yapılmalıdır?', ['İhtiyaç kadar ekmek almak', 'Bayat ekmeği atmak', 'Her öğün yeni ekmek almak', 'Ekmeği hiç yememek'], 0]])]),
    numarala([
      etk(0, 'Bir ürünün yolculuğunu çiz! Sevdiğin bir ürünü seç (süt, kitap, tişört…). Üretimden sana ulaşana kadar aşamaları kutulara yaz.', `<div class="b4-serit b4-bos">${[1, 2, 3, 4, 5].map(i => `<div><b>${i}. aşama</b><span></span></div>`).join('')}</div><div class="h2-ciz" style="min-height:55mm;margin-top:3mm"></div>`),
      yaz('Bu üründe emeği geçen meslekleri yaz.', ['Meslekler:', 'Onlara nasıl teşekkür edebilirim?'])])]),
    'hafta-28': W(28, 6, '23 Nisan ve Haklarım', 'Ulusal egemenlik ve çocuk hakları', () => [numarala([
      baglam('Çocuk Hakları Sözleşmesi\'nden', B.tablo(['Madde', 'Hak'], [['28', 'Her çocuk eğitim hakkına sahiptir.'], ['31', 'Her çocuk dinlenme ve oyun hakkına sahiptir.'], ['24', 'Her çocuk sağlık hizmetlerinden yararlanır.'], ['12', 'Çocuk görüşünü özgürce ifade eder.']]), [
        ['?', 'Ders programına teneffüs konulması hangi hakla ilgilidir?', ['Eğitim', 'Dinlenme ve oyun', 'Sağlık', 'Görüş bildirme'], 1],
        ['?', 'Okul meclisinde öğrencilerin fikrinin alınması hangi maddeyle ilgilidir?', ['12', '24', '28', '31'], 0],
        ['?', 'Okula gidemeyen ve çalıştırılan bir çocuğun hangi hakkı ihlal edilmiştir?', ['Eğitim hakkı', 'Seçme hakkı', 'Ehliyet hakkı', 'Oy hakkı'], 0]]),
      baglam('23 Nisan', B.metin('Atatürk, 23 Nisan 1920\'de açılan TBMM\'nin kuruluş gününü çocuklara armağan etti. Bu bayram dünyada çocuklara armağan edilen ilk bayramdır.'), [
        ['?', '23 Nisan\'ın başka ülkelerden çocukların da katıldığı şenliklerle kutlanması neyi gösterir?', ['Bayramın yalnız bir şehre ait olduğunu', 'Dünya çocuklarının dostluk ve barış içinde buluşmasını', 'Bayramın unutulduğunu', 'Okulların tatil olmadığını'], 1]])]),
    numarala([
      baglam('Hak ve sorumluluk', B.metin('Eğitim hakkımız var. Bu hakkı iyi kullanmak için derslere hazırlıklı gelmek, okul eşyalarını korumak sorumluluğumuzdur.'), [
        ['?', 'Metne göre haklarla sorumluluklar arasındaki ilişki nedir?', ['Birbirinden bağımsızdır.', 'Her hakkın bir sorumluluğu vardır.', 'Sorumluluk haktan önemlidir.', 'Hak yalnız büyüklere aittir.'], 1],
        sat('Dünyanın bir yerindeki bir çocuğun hakkı korunmuyorsa biz ne yapabiliriz?', 2)]),
      ciz('23 Nisan için dünya çocuklarının dostluğunu anlatan bir poster tasarla.', 95)])]),
    'hafta-29': W(29, 6, 'Haklarım ve Sorumluluklarım', 'Haklar ve sorumluluklar', () => [numarala([
      baglam('Parkta', B.metin('Mahalle parkındaki salıncakların sırası çok uzundu. Ege 20 dakikadır salıncakta sallanıyor ve inmek istemiyor. Sırada küçük çocuklar bekliyor.'), [
        ['?', 'Ege\'nin davranışı için hangisi söylenebilir?', ['Hakkını kullanırken başkalarının hakkını engellemiştir.', 'Sorumluluğunu yerine getirmiştir.', 'Küçüklere yardım etmiştir.', 'Park kurallarına uymuştur.'], 0],
        ['?', 'Bu sorunu çözmek için en uygun öneri hangisidir?', ['Salıncakları sökmek', 'Herkese eşit süre veren bir sıra kuralı koymak', 'Yalnız büyüklerin binmesi', 'Parkı kapatmak'], 1],
        ['?', 'Parkın kamuya ait olması ne demektir?', ['Herkesin ortak kullanımına açık olması', 'Yalnız Ege\'nin kullanması', 'Parkın satılık olması', 'Kimsenin kullanamaması'], 0]]),
      baglam('Okul servisi', B.tablo(['Kural', 'Neden?'], [['Emniyet kemeri takılır.', '?'], ['Serviste ayağa kalkılmaz.', '?'], ['Yüksek sesle bağırılmaz.', '?']]), [
        ['?', 'Bu kurallara uymak hangi hakkımızı korur?', ['Güvenlik ve sağlık hakkını', 'Oyun hakkını', 'Seçme hakkını', 'Mülkiyet hakkını'], 0]])]),
    numarala([
      ucSutun('Hak mı, sorumluluk mu, ikisi de mi? Örnekleri doğru sütuna yaz.', [['Hak', '#3a86ff'], ['Sorumluluk', '#f2546b'], ['İkisi de', '#12b886']], ['Oyun oynamak', 'Ödev yapmak', 'Eğitim almak', 'Çevreyi temiz tutmak', 'Fikrimi söylemek', 'Oy kullanmak (yetişkinler)']),
      yaz('Evde, okulda ve mahallede birer sorumluluğunu yaz.', ['Evde:', 'Okulda:', 'Mahallede:'])])]),
    'hafta-30': W(30, 6, 'Katılıyorum, Seçiyorum', 'Demokratik katılım ve seçim', () => [numarala([
      baglam('Okul meclisi seçimi', B.grafik('4-B sınıf başkanlığı seçim sonuçları', ['Ayşe', 'Burak', 'Cemre', 'Doruk'], [9, 7, 11, 3], 'Oy', '#f4a100'), [
        ['?', 'Seçimi kim kazanmıştır?', ['Ayşe', 'Burak', 'Cemre', 'Doruk'], 2],
        ['?', 'Sınıfta toplam kaç öğrenci oy kullanmıştır?', ['28', '30', '31', '32'], 1],
        ['?', 'Seçimde gizli oy kullanılmasının nedeni nedir?', ['Herkesin baskı altında kalmadan oy vermesi', 'Oyların kaybolması', 'Seçimin uzaması', 'Kazananın bilinmemesi'], 0]]),
      baglam('Seçim vaatleri', B.diyalog([['Ayşe', 'Seçilirsem sınıf kütüphanesi kuracağız.'], ['Doruk', 'Seçilirsem hiç ödev verilmeyecek!']]), [
        ['?', 'Hangi aday gerçekleştirilebilir bir vaatte bulunmuştur?', ['Ayşe', 'Doruk', 'İkisi de', 'Hiçbiri'], 0]])]),
    numarala([
      baglam('Mahalle sorunu', B.metin('Mahalledeki parkın aydınlatması bozuk. Çocuklar akşam parkta oynayamıyor.'), [
        ['?', 'Bu sorunu çözmek için hangi kuruma başvurmak en uygundur?', ['Belediye veya muhtarlık', 'Hastane', 'Okul kantini', 'Market'], 0],
        sat('Muhtara yazacağın kısa bir dilekçede neleri belirtirsin?', 2)]),
      yaz('Sınıf başkanı adayı olsaydın seçim konuşman ne olurdu? Gerçekleştirilebilir üç vaat yaz.', ['1.', '2.', '3.'])])]),
    'hafta-31': W(31, 6, 'Kurumlar Bize Hizmet Eder', 'Kamu kurumları ve hizmetleri', () => [numarala([
      baglam('Hangi kurum?', B.tablo(['Durum', 'Kurum'], [['Evin önündeki çöpler toplanmadı.', '?'], ['Kardeşin hastalandı.', '?'], ['Nüfus cüzdanı yenilenecek.', '?'], ['Ormanda yangın çıktı.', '?']]), [
        ['?', 'Çöplerin toplanmaması için hangi kuruma başvurulur?', ['Hastane', 'Belediye', 'Nüfus müdürlüğü', 'Postane'], 1],
        ['?', 'Kimlik kartı yenilemek için hangi kuruma gidilir?', ['Nüfus ve Vatandaşlık Müdürlüğü', 'Belediye', 'Okul', 'Hastane'], 0],
        ['?', 'Orman yangınında hangi numara aranır?', ['112', '155 (yalnız polis)', '186', '444'], 0]]),
      baglam('Vergiler', B.metin('Okulların, yolların ve hastanelerin yapılmasında vatandaşların ödediği vergiler kullanılır.'), [
        ['?', 'Bu bilgiye göre okul eşyalarını korumak neden önemlidir?', ['Hepimizin vergisiyle yapıldığı, ortak malımız olduğu için', 'Öğretmen kızmasın diye', 'Okul kapanmasın diye', 'Eşyalar eski olduğu için'], 0]])]),
    numarala([
      esle4('Kurumu sunduğu hizmetle eşleştir.', [['Belediye', 'Park ve yol yapar.'], ['Muhtarlık', 'Mahallenin sorunlarını iletir.'], ['AFAD', 'Afetlerde yardım eder.'], ['Kızılay', 'Kan bağışı toplar, yardım ulaştırır.'], ['Hastane', 'Sağlık hizmeti verir.']]),
      yaz('Yakın çevrendeki bir kurumu ziyaret et ya da araştır.', ['Kurumun adı:', 'Hangi hizmetleri verir?', 'Orada çalışan meslekler:'])])]),
    'hafta-32': W(32, 6, 'Millî Sembollerimiz', 'Millî semboller ve 19 Mayıs', () => [numarala([
      baglam('Bayrağımız', B.metin('Türk bayrağı, kırmızı zemin üzerinde beyaz ay ve yıldızdan oluşur. Bayrağın ölçüleri 1936\'da çıkarılan Türk Bayrağı Kanunu ile belirlenmiştir. Bayrak yere atılmaz, yırtık ya da solmuş bayrak asılmaz.'), [
        ['?', 'Metne göre hangisi yanlış bir davranıştır?', ['Bayrağı millî bayramlarda asmak', 'Solmuş bir bayrağı asmak', 'Bayrağa saygı göstermek', 'İstiklal Marşı okunurken saygı duruşunda bulunmak'], 1],
        ['?', 'Bayrağın ölçülerinin kanunla belirlenmesinin nedeni nedir?', ['Her yerde aynı ve doğru şekilde kullanılması', 'Bayrağın pahalı olması', 'Bayrağın küçük olması', 'Renklerin değişmesi'], 0],
        ['?', 'İstiklal Marşı\'nın şairi kimdir?', ['Mehmet Âkif Ersoy', 'Yunus Emre', 'Ziya Gökalp', 'Âşık Veysel'], 0]]),
      baglam('19 Mayıs', B.metin('19 Mayıs 1919\'da Atatürk Samsun\'a çıkarak Millî Mücadele\'yi başlattı. Atatürk bu günü gençliğe armağan etti.'), [
        ['?', '19 Mayıs\'ta okullarda spor gösterileri yapılmasının nedeni nedir?', ['Bayramın Gençlik ve Spor Bayramı olması', 'Yaz tatilinin başlaması', 'Karne günü olması', 'Yeni yılın başlaması'], 0]])]),
    numarala([
      tablo('Millî sembollerimiz! Araştır ve tamamla.', ['Sembol', 'Ne anlatır?', 'Ona nasıl saygı gösteririm?'], [['Türk bayrağı', '', ''], ['İstiklal Marşı', '', ''], ['Türkçe', '', ''], ['TBMM', '', '']]),
      yaz('İstiklal Marşı\'nın ilk kıtasını ezbere yaz.', ['', '', '', ''])])]),
    'hafta-33': W(33, 7, 'Dünyada Farklı Kültürler', 'Farklı kültürler', () => [numarala([
      baglam('Selamlaşma yolları', B.tablo(['Ülke', 'Selamlaşma'], [['Türkiye', 'El sıkışma, büyüklerin elini öpme'], ['Japonya', 'Eğilerek selam verme'], ['Yeni Zelanda (Maori)', 'Burun ve alın değdirme'], ['Hindistan', 'Elleri göğüste birleştirip "Namaste" deme']]), [
        ['?', 'Tabloya göre hangisi söylenebilir?', ['Bütün ülkelerde aynı şekilde selamlaşılır.', 'Selamlaşma biçimleri kültürden kültüre değişir.', 'Yalnız Türkiye\'de selamlaşılır.', 'Japonlar el sıkışır.'], 1],
        ['?', 'Japonya\'dan gelen bir misafire saygı göstermenin yolu hangisidir?', ['Onun selamlaşma biçimini tanıyıp saygı duymak', 'Selamına karşılık vermemek', 'Gülmek', 'Kendi selamımızı zorla öğretmek'], 0],
        ['?', 'Farklı kültürleri tanımanın en önemli yararı nedir?', ['Ön yargıların azalması ve dostluğun artması', 'Daha çok alışveriş yapılması', 'Kendi kültürümüzü unutmamız', 'Tatile çıkmak'], 0]]),
      baglam('Ortak bir değer', B.metin('Dünyanın birçok yerinde misafire yiyecek ikram etmek bir gelenektir: Türkiye\'de çay, İngiltere\'de çay ve kurabiye, Fas\'ta naneli çay.'), [
        ['?', 'Metne göre farklı kültürlerin ortak değeri hangisidir?', ['Misafirperverlik', 'Rekabet', 'Bencillik', 'Savurganlık'], 0]])]),
    numarala([
      tablo('Bir ülkeyi tanıyorum! Bir ülke seç ve araştır.', ['Soru', 'Cevap'], [['Ülkenin adı ve başkenti:', ''], ['Dili:', ''], ['Bir yemeği:', ''], ['Bir bayramı ya da geleneği:', ''], ['Türkiye ile benzer yanı:', ''], ['Kaynağım:', '']]),
      ciz('Araştırdığın ülkenin bayrağını ve bir geleneğini çiz.', 60)])]),
    'hafta-34': W(34, 7, 'Ülkeler Arası Bağlar', 'Ülkemizin diğer ülkelerle ilişkileri', () => [numarala([
      baglam('Ticaret', B.grafik('Bir şirketin yıllık fındık satışı (ton)', ['Almanya', 'İtalya', 'Fransa', 'Rusya'], [40, 70, 20, 30], 'Ton', '#8e5b2b'), [
        ['?', 'Şirket en çok hangi ülkeye fındık satmıştır?', ['Almanya', 'İtalya', 'Fransa', 'Rusya'], 1],
        ['?', 'Başka ülkelere ürün satmaya ne ad verilir?', ['İthalat', 'İhracat', 'Tüketim', 'Üretim'], 1],
        ['?', 'Toplam kaç ton fındık satılmıştır?', ['140', '150', '160', '170'], 2]]),
      baglam('Turizm', B.metin('Her yıl milyonlarca turist Kapadokya, Efes ve Pamukkale\'yi ziyaret ediyor. Turistler otellerde kalıyor, yöresel ürünler satın alıyor.'), [
        ['?', 'Turizmin yöre halkına en önemli katkısı hangisidir?', ['Yeni iş alanları ve gelir sağlaması', 'Trafiği azaltması', 'Doğayı kirletmesi', 'Fiyatları düşürmesi'], 0]])]),
    numarala([
      baglam('Uluslararası yardım', B.metin('Başka bir ülkede deprem oldu. Türkiye arama-kurtarma ekipleri ve Kızılay yardım malzemeleri gönderdi. Daha önce Türkiye\'deki depremde de birçok ülke yardıma gelmişti.'), [
        ['?', 'Bu durum ülkeler arası ilişkiler için neyi gösterir?', ['Ülkelerin zor günlerde dayanışma içinde olduğunu', 'Ülkelerin birbirine düşman olduğunu', 'Yardımın gereksiz olduğunu', 'Depremin yalnız bir ülkede olduğunu'], 0],
        sat('Evindeki ürünlerden hangileri başka ülkelerde üretilmiş? Etiketlere bakarak iki örnek yaz.', 2)]),
      tablo('Evimdeki dünya! Ürün etiketlerine bak.', ['Ürün', 'Üretildiği ülke'], [['', ''], ['', ''], ['', ''], ['', '']])])]),
    'hafta-35': W(35, 7, 'Dünyaya Açılan Kapılar', 'Küresel bağlantılar ve iş birliği', () => [numarala([
      baglam('Ortak sorunlar', B.metin('Denizlerdeki plastik atıklar akıntılarla bir ülkeden ötekine taşınıyor. Bir ülkenin attığı çöp, başka bir ülkenin kıyısına vurabiliyor.'), [
        ['?', 'Bu bilgiden çıkarılabilecek en doğru sonuç hangisidir?', ['Çevre sorunları yalnız bir ülkeyi ilgilendirir.', 'Çevre sorunlarının çözümü için ülkeler iş birliği yapmalıdır.', 'Plastik denizde kaybolur.', 'Akıntılar çöpü temizler.'], 1],
        ['?', 'Bu soruna senin yapabileceğin katkı hangisidir?', ['Plastik kullanımını azaltmak ve atıkları ayırmak', 'Kıyıya çöp atmak', 'Hiçbir şey yapmamak', 'Daha çok pet şişe almak'], 0],
        ['?', 'Ülkelerin birlikte çözmesi gereken başka bir sorun hangisidir?', ['Küresel ısınma', 'Sınıf kuralları', 'Ev ödevi', 'Mahalle maçı'], 0]]),
      baglam('Kardeş okul', B.metin('Okulumuz, başka bir ülkedeki bir okulla "kardeş okul" oldu. Öğrenciler birbirine mektup yazıyor, çevrim içi derslerde buluşuyor.'), [
        ['?', 'Kardeş okul projesinin öğrencilere katkısı nedir?', ['Farklı kültürleri tanımak ve dostluk kurmak', 'Dersleri azaltmak', 'Tatili uzatmak', 'Sınav sayısını artırmak'], 0]])]),
    numarala([
      yaz('Kardeş okuldaki bir arkadaşına mektup yaz. Ona ülkeni, şehrini ve okulunu tanıt.', ['Sevgili arkadaşım,', '', '', '', 'Sevgilerimle,']),
      ciz('Mektubuna ekleyeceğin bir kartpostal tasarla: Ülkemizden bir güzellik çiz.', 70)])]),
    'hafta-36': W(36, 7, 'Dünya Vatandaşıyım', 'Yıl sonu değerlendirmesi', () => [numarala([
      baglam('Yılın özeti', B.tablo(['Ünite', 'En çok aklımda kalan'], [['Birey ve Toplum', 'Kimlik kartı, yaşam çizgisi'], ['Kültür ve Miras', 'Soy ağacı, millî bayramlar'], ['İnsanlar, Yerler ve Çevreler', 'Yönler, kroki, afetler'], ['Bilim, Teknoloji ve Toplum', 'Mucitler, internet güvenliği'], ['Üretim, Dağıtım ve Tüketim', 'Bütçe, etiket okuma'], ['Etkin Vatandaşlık', 'Haklar, seçim, kurumlar'], ['Küresel Bağlantılar', 'Farklı kültürler, ticaret']]), [
        ['?', 'Ürün etiketindeki son tüketim tarihine bakmak hangi ünitede öğrendiğimiz bir beceridir?', ['Kültür ve Miras', 'Üretim, Dağıtım ve Tüketim', 'Birey ve Toplum', 'Küresel Bağlantılar'], 1],
        ['?', 'Deprem anında çök-kapan-tutun yapmak hangi üniteyle ilgilidir?', ['İnsanlar, Yerler ve Çevreler', 'Etkin Vatandaşlık', 'Kültür ve Miras', 'Bilim, Teknoloji ve Toplum'], 0],
        ['?', 'Okul meclisinde oy kullanmak hangi üniteyle ilgilidir?', ['Küresel Bağlantılar', 'Etkin Vatandaşlık', 'Birey ve Toplum', 'Kültür ve Miras'], 1]]),
      baglam('Yaz planı', B.metin('Zeynep yaz tatilinde dedesinin köyüne gidecek, yerel ürünleri tanıyacak, bir müze gezecek ve harçlığıyla bütçe yapacak.'), [
        ['?', 'Zeynep\'in planı hangi ünitelerle ilişkilidir?', ['Yalnız Kültür ve Miras', 'Kültür ve Miras ile Üretim, Dağıtım ve Tüketim', 'Yalnız Etkin Vatandaşlık', 'Hiçbiri'], 1]])]),
    numarala([
      yaz('Bu yıl Sosyal Bilgiler dersinde öğrendiklerini değerlendir.', ['En çok sevdiğim konu ve nedeni:', 'Günlük hayatımda kullandığım bir bilgi:', 'Daha çok öğrenmek istediğim bir konu:']),
      ciz('Kendini bir "dünya vatandaşı" olarak çiz: Ülkene ve dünyaya katkın ne olurdu?', 85)])]),
  };
  function eskiYeniTablo() { return tablo('Eskiden ve bugün! Tabloyu tamamla.', ['İhtiyaç', 'Eskiden ne kullanılırdı?', 'Bugün ne kullanıyoruz?'], [['Aydınlanma', 'Gaz lambası', ''], ['Yemek pişirme', '', 'Elektrikli ocak'], ['Ulaşım', 'At arabası', ''], ['Bilgi edinme', '', 'İnternet'], ['Müzik dinleme', 'Gramofon', '']]); }
  function ucSutun(y, bas, og) { return etk(0, y, `<div class="h2-banka ttkb">${og.map(s => `<span>${s}</span>`).join('')}</div><div class="h3-uc ttkb">${bas.map(([b, r]) => `<div style="border-color:${r}"><b style="color:${r}">${b}</b>${cizgi(4)}</div>`).join('')}</div>`); }
  function davranisTablo(l) { void l; return etk(0, 'Teknolojiyi doğru kullanıyor musun? Doğru davranışların kutusuna D, yanlış olanlara Y yaz.', `<div class="h2-dy">${l.map(([s]) => `<div><p class="ttkb">${s}</p><i></i></div>`).join('')}</div>`); }
  function afis4(y) { return etk(0, y, '<div class="h3-afis"><div class="ttkb"><span>Başlık:</span><i></i></div><div class="h3-afis-alan" style="min-height:80mm"></div><div class="ttkb"><span>Kural 1:</span><i></i></div><div class="ttkb"><span>Kural 2:</span><i></i></div><div class="ttkb"><span>Kural 3:</span><i></i></div></div>'); }
  function esle4(y, l) { const sag = [...l.map(x => x[1])].sort(); return etk(0, y, `<div class="b4-esle ttkb"><div>${l.map(([a]) => `<span>${a}<i></i></span>`).join('')}</div><div>${sag.map(b => `<span><i></i>${b}</span>`).join('')}</div></div>`); }

  const CSS = `
.b4{display:flex;flex-direction:column;gap:2.5mm}
.b4-bag{background:#fff;border:.6mm solid #cfe0ff;border-left:2.2mm solid var(--ec,#3a86ff);border-radius:3mm;padding:2.5mm 3.5mm;display:flex;flex-direction:column;gap:1.5mm}
.b4-bb{font-size:5mm;font-weight:400;color:#1d4e89}
.b4-p{margin:0;font-size:4.6mm;line-height:1.45;text-align:justify}
.b4-t{border-collapse:collapse;width:100%;font-size:4.2mm}.b4-t th{background:#eaf3ff;font-weight:400;color:#1d4e89}.b4-t th,.b4-t td{border:.3mm solid #b8cbe0;padding:1mm 2mm;text-align:left}
.b4-d p{margin:.8mm 0;font-size:4.5mm;line-height:1.4}.b4-d b{font-weight:400;color:#c2410c}
.b4-serit{display:flex;gap:1.5mm}.b4-serit>div{flex:1;background:#fff8e6;border-top:1.5mm solid #f4a100;border-radius:2mm;padding:1.5mm;text-align:center;display:flex;flex-direction:column;gap:.8mm}.b4-serit b{font-weight:400;font-size:4.4mm;color:#b45309}.b4-serit span{font-size:3.9mm;line-height:1.25}
.b4-bos>div{min-height:30mm}
.b4-g{text-align:center}.b4-g>b{font-weight:400;font-size:4.3mm;display:block}
.b4-kimlik{width:96mm;margin:0 auto;border-radius:3mm;overflow:hidden;border:.4mm solid #9fb3c8;background:linear-gradient(135deg,#e8f1fb,#fdeef0)}.b4-k-ust{background:#c8102e;color:#fff;font-size:3.4mm;text-align:center;padding:.8mm}.b4-k-ic{display:flex;gap:2.5mm;padding:2mm}.b4-k-foto{width:20mm;height:25mm;background:#dfe7ef;border-radius:1.5mm;display:grid;place-items:center;font-size:10mm}.b4-kimlik dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:.3mm 2mm;font-size:3.4mm}.b4-kimlik dt{color:#5b6b7b}.b4-kimlik dd{margin:0}
.b4-etiket{display:grid;grid-template-columns:1fr 1fr;gap:1mm 3mm;border:.6mm dashed #8b5cf6;border-radius:3mm;padding:2mm 3mm;background:#fbf9ff}.b4-etiket div{display:flex;flex-direction:column}.b4-etiket span{font-size:3.6mm;color:#6b5b95}.b4-etiket b{font-weight:400;font-size:4.3mm}
.b4-sorular{display:flex;flex-direction:column;gap:2mm}
.b4-s{background:#fff;border-radius:3mm;padding:2mm 3mm}.b4-s p{margin:0 0 1.2mm;font-size:4.7mm;line-height:1.35}.b4-s p b{font-weight:400;color:var(--ec,#3a86ff);margin-right:1mm}
.b4-sec{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:1mm 4mm}.b4-sec.tek{grid-template-columns:1fr}
.b4-sec li{display:flex;align-items:center;gap:2mm;font-size:4.4mm}.b4-sec i{font-style:normal;flex:none;width:6mm;height:6mm;border:.4mm solid #9db4c8;border-radius:50%;display:grid;place-items:center;font-size:3.6mm;color:#1d4e89}
.b4-anahtar{transform:rotate(180deg);font-size:3mm;color:#8a98a6;margin:1.5mm 0 0;text-align:center}
.b4-esle{display:grid;grid-template-columns:1fr 1fr;gap:12mm}.b4-esle>div{display:flex;flex-direction:column;gap:3mm}.b4-esle span{display:flex;align-items:center;justify-content:space-between;gap:2mm;background:#fff;border-radius:3mm;padding:2.5mm 3mm;font-size:4.6mm}.b4-esle i{width:3mm;height:3mm;border-radius:50%;background:#1d4e89;flex:none}
.b4-ry{display:grid;grid-template-columns:auto 1fr;gap:3mm;align-items:center}
`;
  return { S4, CSS, B, baglam, sat, anahtar: () => anahtar(), sifirla: () => { NO = 0; ANAH = []; } };
};
