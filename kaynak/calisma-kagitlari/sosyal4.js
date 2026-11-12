// Ladin Ormanı — 4. sınıf Sosyal Bilgiler: test tarzı (kullanıcının örnek aldığı yayın). İki sütun, haftada 8 soru,
// 2 sayfa + ayrı cevap anahtarı sayfası. Soru kalıpları 3 haftalık döngüyle döner (aynı kalıp art arda iki haftada gelmez):
//   1., 4., 7. … hafta: kodDY, yolDY, kapDY, konusma · 2., 5., 8. …: roma, sirala, esle, bulmaca · 3., 6., 9. …: kacTane, kareYol, tabloSec, cocukSec
//   her hafta ayrıca belge/grafik/metin soruları + 1 ortak bağlamlı ikili grup. Motor: test4.js. Üretim: node kaynak/calisma-kagitlari/uret.js s4
module.exports = ({ T }) => {
  const { p, madde, tablo, bilgi, kodDY, yolDY, kapDY, konusma, roma, sirala, esle, bulmaca, kacTane, kareYol, tabloSec, cocukSec, grafikSec, ortak, coktan, grafik, sayfa, optik, yeniHafta, cevapSayfasi } = T;
  const kimlik = o => `<div class="b4-kimlik"><div class="b4-k-ust">TÜRKİYE CUMHURİYETİ KİMLİK KARTI</div><div class="b4-k-ic"><div class="b4-k-foto">👤</div><dl>${o.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl></div></div>`;
  const serit = l => `<div class="b4-serit">${l.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>`;
  const etiket = o => `<div class="b4-etiket">${o.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`;
  const W = (hafta, unite, baslik, konu, f) => ({ unite, hafta, baslik, konu, sayfalar: () => { yeniHafta(); const [a, b] = f(); return [sayfa(a), sayfa(b).replace(/<\/div>$/, optik() + '</div>'), cevapSayfasi(`${hafta}. hafta · ${baslik}`)]; } });
  void madde; void bilgi; void grafikSec; void etiket;

  const S4 = {
    'hafta-01': W(1, 1, 'Kimliğimi Tanıyorum', 'Resmî kimlik belgesi', () => [[
      kodDY('Öğretmen tahtaya kimlik kartıyla ilgili bilgiler yazdı. Öğrencilerden bilgi doğruysa "Doğru", yanlışsa "Yanlış" bölümünü boyamalarını istedi.', [
        ['Kimlik kartında kişinin doğum tarihi yazar.', true], ['T.C. kimlik numarası kardeşlerde aynıdır.', false], ['Kimlik kartının bir son geçerlilik tarihi vardır.', true], ['Kimlik kartından kişinin boyu öğrenilir.', false]], 'a1'),
      coktan(p('Defne, 2026 yılının eylül ayında kimlik kartını inceliyor.') + kimlik([['Soyadı', 'YILMAZ'], ['Adı', 'DEFNE'], ['Doğum Tarihi', '14.03.2017'], ['Cinsiyeti', 'K'], ['Uyruğu', 'T.C.'], ['Son Geçerlilik', '14.03.2027']]),
        'Buna göre Defne\'nin kimlik kartıyla ilgili aşağıdakilerden hangisi söylenebilir?', 'Defne bu tarihte 9 yaşındadır.', ['Kartın geçerlilik süresi dolmuştur.', 'Defne\'nin doğum günü sonbahardadır.', 'Kart 2028 yılına kadar kullanılabilir.']),
      konusma('Dört arkadaş kimlik kartlarıyla ilgili bildiklerini paylaşıyor.', [
        ['Ali', 'Kimlik numaramız bize özeldir, başka kimsede yoktur.', true], ['Ece', 'Kimlik kartının arka yüzünde anne ve baba adı bulunur.', true],
        ['Can', 'Kimlik kartının süresi dolsa da hep kullanılabilir.', false], ['Su', 'Kimlik kartında okulumuzun adı yazar.', false]], 'a3'),
      yolDY('Mert, kişisel bilgilerin korunmasıyla ilgili bir oyun oynuyor. İfade doğruysa "D", yanlışsa "Y" okunu izliyor.', [
        ['Tanımadığımız kişilerle ev adresimizi paylaşmamalıyız.', true], ['İnternette kimlik numaramızı herkese yazabiliriz.', false], ['Şifremizi en yakın arkadaşımıza da söylemeliyiz.', false]], 'a4')], [
      ortak(p('Sınıf arkadaşları kimlik kartlarındaki doğum tarihlerini karşılaştırıyor.') + tablo(['Öğrenci', 'Doğum tarihi'], [['Defne', '14.03.2017'], ['Ayşe', '14.11.2016'], ['Kaan', '02.03.2017']]), [
        () => coktan('', 'Buna göre en büyük öğrenci kimdir?', 'Ayşe', ['Defne', 'Kaan', 'Üçü aynı yaştadır.']),
        () => coktan('', 'Kaan\'ın doğum gününden kaç gün sonra Defne\'nin doğum günü gelir?', '12', ['10', '11', '14'])]),
      kapDY('Bilge Öğretmen, öğrencilerin hazırladığı bilgi kartlarını inceliyor. Bilgi doğruysa "Doğru Bilgi", yanlışsa "Yanlış Bilgi" kabına atıyor.', [
        ['Kimlik kartı resmî bir belgedir.', true], ['Bebeklerin kimlik kartı olmaz.', false], ['Kimlik kartında uyruk bilgisi bulunur.', true], ['Kimlik kartı hiç yenilenmez.', false], ['Kişisel bilgilerimizi korumalıyız.', true]], 'a6'),
      coktan(p('Mert, bir oyun sitesine üye olurken site ondan aşağıdaki bilgileri istiyor.') + tablo(['İstenen bilgi'], [['Kullanıcı adı'], ['T.C. kimlik numarası'], ['Ev adresi'], ['Okulunun adı']]),
        'Buna göre Mert\'in ailesine danışmadan paylaşabileceği tek bilgi aşağıdakilerden hangisidir?', 'Gerçek adını içermeyen bir kullanıcı adı', ['T.C. kimlik numarası', 'Ev adresi', 'Okulunun adı ve sınıfı'])]]),

    'hafta-02': W(2, 1, 'Farklılıklarımız Zenginliğimiz', 'Farklı özelliklere saygı', () => [[
      coktan(p('4-A sınıfındaki her öğrenci en sevdiği tek etkinliği seçti.') + grafik('En sevilen etkinlikler', ['Spor', 'Resim', 'Müzik', 'Kitap', 'Bilim'], [8, 5, 4, 6, 3], 'Öğrenci'),
        'Grafiğe göre aşağıdakilerden hangisi söylenemez?', 'Müziği seçen öğrenci sayısı resmi seçenlerden fazladır.', ['Sınıfta 26 öğrenci vardır.', 'Spor ve kitabı seçenler, resim ve müziği seçenlerden fazladır.', 'En az seçilen etkinlik bilimdir.']),
      roma(p('Teneffüste takım kuran Deniz, "Selin yavaş koşuyor, onu almayalım." dedi. Selin "Koşmakta iyi değilim ama kaleci olabilirim." diye cevap verdi. Can da "Herkesin iyi olduğu bir şey vardır, Selin kaleci olsun." dedi.'),
        'Bu olayla ilgili aşağıdaki yargılardan hangileri doğrudur?', [['Deniz, arkadaşının farklı özelliklerine saygı göstermemiştir.', true], ['Selin, güçlü olduğu yanı fark etmiştir.', true], ['Can, takımın yalnız hızlı oyunculardan oluşmasını istemiştir.', false]]),
      sirala('4-B sınıfı, herkesin katılacağı bir "Etkinlik Günü" planlıyor. Planın adımları karışık verilmiştir.', [
        'Herkesin etkinlik önerisini almak', 'Önerileri oylamak', 'Görevleri yeteneklere göre paylaştırmak', 'Etkinlik gününü gerçekleştirmek', 'Etkinliği birlikte değerlendirmek'], 'Bu planın adımları doğru sırayla hangi seçenekte verilmiştir?', 'b3'),
      bulmaca('Sınıf panosuna "Birlikte yaşamanın değerleri" bulmacası asıldı.', [['Başkalarının düşüncelerine değer vermek.', 'SAYGI'], ['Kendini başkasının yerine koymak.', 'EMPATİ'], ['İyiliği unutmamak.', 'VEFA'], ['Birine inanıp dayanmak.', 'GÜVEN'], ['Köyde birlikte iş yapma geleneği.', 'İMECE']], 'b4')], [
      esle('"Farklılıklar Şenliği" için öğrencilere ilgi alanlarına uygun görevler verilecek.', [
        ['Piyano çalmayı seven Ayşe', 'Müzik dinletisi'], ['Resim yapmayı seven Can', 'Pano tasarımı'], ['Yemek yapmayı seven Elif', 'Yöresel tatlar köşesi'], ['Konuşmayı seven Bora', 'Sunuculuk']],
        'Buna göre öğrencilerle görevlerin doğru eşleştirilmesi hangisidir?', 'b5'),
      ortak(p('Okulumuzda "Farklılıklar Şenliği" yapıldı. Öğrenciler ailelerinin geldiği şehirlerin yemeklerini, türkülerini ve oyunlarını tanıttı. Görme engelli öğrencimiz Ayşe de piyanoda bir eser çaldı. Şenliğin sonunda herkes en çok neyi sevdiğini bir panoya yazdı.'), [
        () => coktan('', 'Bu şenlikle ilgili aşağıdakilerden hangisi söylenemez?', 'Öğrenciler yalnızca kendi şehirlerinin kültürünü tanımıştır.', ['Farklı kültürler bir arada tanıtılmıştır.', 'Engelli bir öğrenci de etkinliğe katkı sunmuştur.', 'Öğrencilerin görüşlerine yer verilmiştir.']),
        () => coktan('', 'Şenliğin düzenlenme amacı en çok hangisi olabilir?', 'Farklılıkların bir zenginlik olduğunu fark ettirmek', ['Öğrencileri yarıştırıp birinciyi seçmek', 'Ders saatlerini azaltmak', 'Yalnızca yemek tanıtmak'])]),
      coktan(p('Sınıfa başka bir ülkeden gelen Lina katıldı. Lina Türkçeyi yeni öğreniyor ve teneffüste genellikle yalnız oturuyor.'), 'Lina\'nın sınıfa uyum sağlaması için yapılabilecek en uygun davranış hangisidir?', 'Ona oyunlarımızı öğretip kendi ülkesinin oyunlarını sormak', ['Türkçeyi öğrenene kadar onunla konuşmamak', 'Onu yalnızca öğretmene bırakmak', 'Farklı konuştuğu için ona gülmek'])]]),

    'hafta-03': W(3, 1, 'Yaşam Çizgim', 'Önemli olayları kronolojik sıralama', () => [[
      kacTane(p('Elif yaşamındaki önemli olayları bir zaman şeridinde gösterdi.') + serit([['2016', 'Doğdu'], ['2018', 'Yürüdü'], ['2020', 'Kardeşi doğdu'], ['2022', 'Okula başladı'], ['2024', 'Bisiklet sürdü'], ['2026', '4. sınıf']]) + p('Öğretmen, zaman şeridine bakan öğrencilerin yorumlarını tahtaya yazdı:'), [
        ['Elif okula başladığında 6 yaşındaydı.', true], ['Elif\'in kardeşi Elif\'ten 4 yaş küçüktür.', true], ['Elif bisiklet sürmeyi kardeşi doğmadan önce öğrenmiştir.', false], ['Olaylar eskiden yeniye doğru sıralanmıştır.', true]]),
      tabloSec(p('Elif, zaman şeridindeki olayları belgelerle kanıtlamak istiyor. Elinde aile fotoğraf albümü, 1. sınıf karnesi ve bisiklet yarışı katılım belgesi var.'), 'Elif\'in olayları kanıtlamak için kullanabileceği belgeler hangi seçenekte doğru verilmiştir?',
        ['Yürümesi', 'Okula başlaması', 'Bisiklet sürmesi'], ['Fotoğraf albümü', 'Karne', 'Katılım belgesi'], [['Karne', 'Fotoğraf albümü', 'Katılım belgesi'], ['Fotoğraf albümü', 'Katılım belgesi', 'Karne'], ['Katılım belgesi', 'Karne', 'Fotoğraf albümü']], 'c2'),
      kareYol('Kaan, zaman ve kronoloji bilgileriyle bir oyun oynuyor.', [['Kronoloji, olayları oluş sırasına göre dizmektir.', true], ['Zaman şeridinde en yeni olay en başa yazılır.', false], ['Aile büyüklerinin anlattıkları geçmişi öğrenmede kaynak olabilir.', true], ['Karne, doğduğumuz yılı kanıtlayan belgedir.', false]], 'c3'),
      coktan(p('Kerem 2016, kardeşi Zehra 2019, kuzeni Ali 2014 yılında doğmuştur. Üçü de 2026 yılında doğum günlerini kutlamıştır.'), 'Buna göre aşağıdakilerden hangisi doğrudur?', 'Ali, Zehra\'dan 5 yaş büyüktür.', ['Kerem en küçük çocuktur.', 'Zehra 2026\'da 8 yaşındadır.', 'Ali ile Kerem aynı yaştadır.'])], [
      cocukSec(p('Elif annesiyle yaptığı söyleşide şunları öğrendi: "İlk sözcüğünü 1 yaşında söyledin. 3 yaşında anaokuluna başladın. 5 yaşında ilk kitabını okudun."') + p('Elif\'in arkadaşları bu bilgiler hakkında konuşuyor.'), 'Buna göre hangi çocuğun söylediği yanlıştır?',
        ['Elif kitap okumayı anaokuluna başlamadan önce öğrenmiştir.', 'Bu olayların en eskisi ilk sözcüğüdür.', 'Elif anaokuluna 3 yaşında başlamıştır.', 'Elif bu bilgileri sözlü tarih yoluyla öğrenmiştir.'], 'c5'),
      ortak(p('Ali, dedesinin hayatını bir zaman şeridinde gösterdi.') + serit([['1950', 'Dedem doğdu'], ['1957', 'Okula başladı'], ['1975', 'Evlendi'], ['1978', 'Babam doğdu'], ['2016', 'Ben doğdum']]), [
        () => coktan('', 'Ali doğduğunda dedesi kaç yaşındaydı?', '66', ['56', '62', '68']),
        () => coktan('', 'Zaman şeridine göre aşağıdakilerden hangisi söylenemez?', 'Dedesi evlendiğinde Ali\'nin babası 3 yaşındaydı.', ['Dedesi okula 7 yaşında başlamıştır.', 'Babası doğduğunda dedesi 28 yaşındaydı.', 'Ali, babasından 38 yaş küçüktür.'])]),
      coktan(p('Zeynep geçmişini öğrenmek için farklı kaynaklar topluyor.'), 'Aşağıdakilerden hangisi Zeynep\'in kendi geçmişini öğrenmek için kullanabileceği bir kaynak değildir?', 'Bir gazetenin hava durumu sayfası', ['Bebeklik fotoğrafları', 'Aşı kartı', 'Annesinin anıları'])]]),

    'hafta-04': W(4, 1, 'Ailemde Rollerim', 'Aile içi roller ve sorumluluklar', () => [[
      ortak(p('Zeynep\'in ailesi evdeki görevleri aşağıdaki çizelgeyle paylaştı.') + tablo(['Görev', 'Anne', 'Baba', 'Zeynep (10)', 'Emre (6)'], [['Yemek yapmak', '✓', '✓', '', ''], ['Sofrayı kurmak', '', '', '✓', '✓'], ['Çöpü atmak', '', '✓', '✓', ''], ['Bitkileri sulamak', '', '', '', '✓'], ['Alışveriş', '✓', '✓', '', '']]), [
        () => coktan('', 'Çizelgeye göre hangi görevi tek bir kişi yapmaktadır?', 'Bitkileri sulamak', ['Yemek yapmak', 'Sofrayı kurmak', 'Alışveriş']),
        () => coktan('', 'Zeynep bir hafta okul gezisine gidecektir. Zeynep yokken görevleri çizelgedeki öteki kişiler sürdürecektir. Buna göre bu hafta hangisi doğru olur?', 'Sofrayı Emre, çöpü baba tek başına yapar.', ['Yemeği yalnız Emre yapar.', 'Alışverişi Emre yapar.', 'Bitkileri anne sular.'])]),
      kodDY('Öğretmen aile içi roller ve sorumluluklarla ilgili ifadeler hazırladı. Öğrenciler doğru bilgilerin "Doğru", yanlış bilgilerin "Yanlış" bölümünü boyayacak.', [
        ['Ailede her bireyin yaşına uygun sorumlulukları vardır.', true], ['Ev işleri yalnızca annelerin görevidir.', false], ['Bir kişi görevini yapmazsa ailenin düzeni etkilenebilir.', true], ['Çocuklar aile kararlarında hiç fikir belirtemez.', false]], 'd2'),
      yolDY('Emre, ailedeki roller hakkında bir yol oyunu oynuyor.', [['Bir kişi ailede hem çocuk hem kardeş rolüne sahip olabilir.', true], ['Ailedeki roller hiçbir zaman değişmez.', false], ['Görev paylaşımı işleri kolaylaştırır.', true]], 'd3')], [
      konusma('Kerem, ailesinin hafta sonu planını herkesin fikrini alarak yaptığını anlattı. Arkadaşları da yorum yaptı.', [
        ['Ada', 'Kararı herkesin fikrini alarak vermek doğru bir davranıştır.', true], ['Bora', 'Ailede kararları yalnız en büyük kişi vermelidir.', false],
        ['Ece', 'Çocuklar da aile toplantısında görüşünü söyleyebilir.', true], ['Mert', 'Farklı fikirler olursa toplantı hemen bitirilmelidir.', false]], 'd4'),
      kapDY('Öğrenciler "evde sorumluluk" konusunda bilgi kartları hazırladı. Öğretmen kartları kaplara atıyor.', [
        ['Odamı toplamak benim sorumluluğumdur.', true], ['Kardeşime yardım etmek yalnız annemin işidir.', false], ['Sorumluluklarımızı zamanında yapmak güven oluşturur.', true], ['Evde görev almak çocuklar için gereksizdir.', false]], 'd5', 'doğru'),
      coktan(p('Zeynep sofrayı kurmayı unuttu çünkü oyun oynuyordu. Annesi işten yorgun geldi ve sofrayı kendisi kurdu. Yemek yarım saat geç yendi. Ertesi gün Zeynep görevini unutmamak için bir hatırlatma notu yazdı.'),
        'Bu olayla ilgili aşağıdakilerden hangisi söylenemez?', 'Zeynep\'in görevini yapmaması aileyi hiç etkilememiştir.', ['Bir kişinin görevini yapmaması ailenin düzenini aksatır.', 'Zeynep hatasından ders çıkarmıştır.', 'Zeynep\'in görevi annesine ek yük olmuştur.'])]]),

    'hafta-05': W(5, 1, 'Grupta Karar Alıyorum', 'Grup içinde sorumluluk ve ortak karar', () => [[
      ortak(p('4-A sınıfında 28 öğrenci var. Herkes gezi yeri için bir oy kullandı.') + tablo(['Gezi yeri', 'Oy sayısı'], [['Bilim merkezi', '12'], ['Hayvanat bahçesi', '9'], ['Müze', '?']]), [
        () => coktan('', 'Müzeye kaç oy verilmiştir?', '7', ['5', '6', '9']),
        () => coktan('', 'Müzeyi seçen öğrencilerin yapması gereken en doğru davranış hangisidir?', 'Çoğunluğun kararına saygı gösterip geziye katılmak', ['Oylamanın yeniden yapılmasında ısrar etmek', 'Geziye katılmamak', 'Kendi aralarında ayrı bir geziye gitmek'])]),
      roma(p('Proje grubunda Bora poster çizecek, Ela bilgileri yazacak, Arda sunumu yapacak. Sunum günü Arda hazırlıksız geldi. Bora ve Ela sunumu birlikte yaptılar, sonra grup toplanıp sorunun nedenini konuştu.'),
        'Bu durumla ilgili aşağıdaki yargılardan hangileri doğrudur?', [['Bir üyenin görevini yapmaması bütün grubu etkilemiştir.', true], ['Grup sorunu çözmek için iş birliği yapmıştır.', true], ['Grup çalışmasında görev dağılımı gereksizdir.', false]]),
      sirala('Sınıf temsilcisi Ece, sınıftaki bir sorunu çözmek için yapılacakları listeledi.', ['Sorunu herkesle birlikte belirlemek', 'Çözüm önerilerini toplamak', 'Önerileri oylamak', 'Seçilen çözümü uygulamak'], 'Ece\'nin adımları doğru sırayla hangisidir?', 'e3'),
      bulmaca('Grup çalışmasıyla ilgili bulmacayı çözen öğrenciler renkli kutulardaki harflerden bir sözcük buluyor.', [['Seçimde tercihimizi belirttiğimiz hak.', 'OY'], ['Bir kişinin grupta üstlendiği görev.', 'ROL'], ['Kararların konuşulduğu buluşma.', 'TOPLANTI'], ['Tartışmanın uzlaşmayla bitmesi.', 'ANLAŞMA'], ['Herkesin uyması gereken düzen.', 'KURAL']], 'e4')], [
      esle('Sınıf, okul bahçesini güzelleştirme projesinde görev dağılımı yapıyor.', [['Çizim yapmayı seven Can', 'Afiş hazırlamak'], ['Bitkilerden anlayan Ece', 'Fide dikmek'], ['Hesap yapmayı seven Kaan', 'Malzeme bütçesini çıkarmak'], ['İyi konuşan Ada', 'Müdüre projeyi sunmak']], 'Buna göre öğrencilerle görevlerin doğru eşleştirilmesi hangisidir?', 'e5'),
      coktan(p('4-A sınıfı ilk hafta herkesin önerisini alarak sınıf kurallarını belirledi ve sözleşmeyi herkes imzaladı. Bir ay sonra öğretmen, kurallara uyma oranının geçen yıla göre çok arttığını gördü.'),
        'Kurallara uyma oranının artmasının en önemli nedeni hangisi olabilir?', 'Kuralların herkesin katılımıyla belirlenmiş olması', ['Kuralların sayısının çok olması', 'Sınıfın daha kalabalık olması', 'Kuralların yalnızca öğretmen tarafından konması']),
      coktan(p('Bir grup çalışmasında Defne ile Kerem aynı konuda farklı fikirler savunuyor ve tartışma büyüyor.'), 'Bu anlaşmazlığı çözmek için yapılabilecek en uygun davranış hangisidir?', 'İki fikri de dinleyip ortak bir çözüm aramak', ['Sesi en yüksek olanın fikrini kabul etmek', 'Grubu dağıtmak', 'Tartışmayı kimseye söylemeden bırakmak'])]]),

    'hafta-06': W(6, 2, 'Aile Tarihim', 'Aile tarihi ve soy ağacı', () => [[
      kacTane(p('Kaan\'ın soy ağacındaki bilgiler aşağıda verilmiştir.') + tablo(['Kuşak', 'Babasının ailesi', 'Annesinin ailesi'], [['1. kuşak', 'Dede Ali, Nine Hatice', 'Dede Veli, Nine Zehra'], ['2. kuşak', 'Baba Murat', 'Anne Sevgi'], ['3. kuşak', 'Kaan ve kardeşi Ece', '']]) + p('Kaan\'ın arkadaşları soy ağacına bakarak şu yorumları yaptı:'), [
        ['Dede Veli, Kaan\'ın annesinin babasıdır.', true], ['Ece, Nine Hatice\'nin torunudur.', true], ['Murat, Zehra\'nın oğludur.', false], ['Soy ağacında üç kuşak gösterilmiştir.', true]]),
      kareYol('Defne, aile tarihi bilgileriyle kare oyunu oynuyor.', [['Soy ağacı aile bireylerini kuşaklar hâlinde gösterir.', true], ['Annemin annesi benim halamdır.', false], ['Aile büyükleriyle söyleşi yapmak aile tarihini öğrenme yoludur.', true], ['Eski fotoğraflar aile tarihi için kaynak olamaz.', false], ['Gelenekler kuşaktan kuşağa aktarılabilir.', true]], 'g2'),
      tabloSec(p('Kaan, aile tarihi araştırmasında kimden hangi bilgiyi alacağını planlıyor. Dedesi köyde öğretmenlik yapmış, ninesi düğün geleneklerini çok iyi biliyor, babası ise ailenin eski fotoğraflarını saklıyor.'), 'Kaan\'ın sorularını kime sorması en uygundur?',
        ['Eski okullar', 'Düğün gelenekleri', 'Eski fotoğraflar'], ['Dedesi', 'Ninesi', 'Babası'], [['Babası', 'Ninesi', 'Dedesi'], ['Ninesi', 'Dedesi', 'Babası'], ['Dedesi', 'Babası', 'Ninesi']], 'g3'),
      coktan(p('Kaan dedesiyle söyleşi yaptı. Dedesi: "Köyümüzde okul yoktu. Her sabah 5 kilometre yürüyerek komşu köydeki okula giderdik. Kışın karda yol açardık. Akşamları gaz lambasının ışığında ders çalışırdık." dedi.'),
        'Dedesinin anlattıklarına göre aşağıdakilerden hangisi geçmişle bugün arasındaki bir fark değildir?', 'Çocukların okula gitmesi', ['Okula ulaşmanın kolaylığı', 'Evlerin aydınlatılma biçimi', 'Okulların köylere uzaklığı'])], [
      cocukSec(p('Öğretmen "Aile tarihinizi nasıl öğrenebilirsiniz?" diye sordu. Dört öğrenci cevap verdi.'), 'Hangi öğrencinin önerdiği yol aile tarihini öğrenmek için uygun değildir?',
        ['Ünlü bir oyuncunun hayatını anlatan filmi izlemek', 'Dedemle ninemle söyleşi yapmak', 'Ailemizin eski fotoğraflarını incelemek', 'Evdeki eski belgelere bakmak'], 'g5'),
      ortak(p('Elif\'in ailesi her bayramda büyüklerini ziyaret ediyor. Bu gelenek Elif\'in büyük dedesinden beri sürüyor. Ziyaretlerde nine çocuklara eski bayramları anlatıyor; Elif de bu anıları bir deftere yazıyor.'), [
        () => coktan('', 'Bu gelenekle ilgili aşağıdakilerden hangisi söylenebilir?', 'Ailede dört kuşaktır sürmektedir.', ['Yalnızca Elif\'in başlattığı yeni bir alışkanlıktır.', 'Bayramlarda yapılmamaktadır.', 'Çocuklar bu gelenekte yer almaz.']),
        () => coktan('', 'Elif\'in anıları deftere yazmasının en önemli yararı nedir?', 'Aile tarihinin gelecek kuşaklara aktarılması', ['Ninesinin daha az konuşması', 'Bayramların kısalması', 'Ziyaretlerin azalması'])]),
      coktan(p('Ece\'nin soy ağacında annesinin kız kardeşi Leyla, babasının erkek kardeşi Can yer alıyor.'), 'Buna göre Leyla ve Can, Ece\'nin nesi olur?', 'Leyla teyzesi, Can amcası', ['Leyla halası, Can dayısı', 'Leyla teyzesi, Can dayısı', 'Leyla halası, Can amcası'])]]),

    'hafta-07': W(7, 2, 'Cumhuriyet Bayramı', 'Millî bayramlar ve kültürel ögeler', () => [[
      kodDY('Öğrenciler millî bayramlarla ilgili kartları değerlendiriyor.', [
        ['Cumhuriyet 29 Ekim 1923\'te ilan edilmiştir.', true], ['23 Nisan, Zafer Bayramı olarak kutlanır.', false], ['19 Mayıs 1919\'da Atatürk Samsun\'a çıkmıştır.', true], ['Millî bayramlarda bayrak asılmaz.', false]], 'h1'),
      ortak(p('Millî bayramlarımız aşağıdaki tabloda verilmiştir.') + tablo(['Bayram', 'Tarih', 'Kutladığımız olay'], [['Ulusal Egemenlik ve Çocuk Bayramı', '23 Nisan', 'TBMM\'nin açılışı (1920)'], ['Atatürk\'ü Anma, Gençlik ve Spor Bayramı', '19 Mayıs', 'Samsun\'a çıkış (1919)'], ['Zafer Bayramı', '30 Ağustos', 'Büyük Zafer (1922)'], ['Cumhuriyet Bayramı', '29 Ekim', 'Cumhuriyet\'in ilanı (1923)']]), [
        () => coktan('', 'Bu olaylar eskiden yeniye doğru sıralandığında üçüncü sırada hangisi yer alır?', 'Büyük Zafer', ['TBMM\'nin açılışı', 'Samsun\'a çıkış', 'Cumhuriyet\'in ilanı']),
        () => coktan('', '2026 yılında Cumhuriyet\'in kaçıncı yılı kutlanır?', '103.', ['100.', '101.', '106.'])]),
      konusma('Okul, 29 Ekim için hazırlık yapıyor. Öğrenciler bayramla ilgili düşüncelerini söylüyor.', [
        ['Ali', 'Cumhuriyetle birlikte yöneticileri millet seçmeye başladı.', true], ['Su', 'Cumhuriyet Bayramı yalnız Ankara\'da kutlanır.', false],
        ['Efe', 'Bayramda fener alayı yapmak bir gelenektir.', true], ['Ada', 'Cumhuriyet, Kurtuluş Savaşı\'ndan önce ilan edildi.', false]], 'h3')], [
      yolDY('Kerem, millî bayramlar hakkında bir yol bulmaca çözüyor.', [['Millî bayramlar tarihimizdeki önemli olayları hatırlatır.', true], ['23 Nisan\'ı Atatürk dünya çocuklarına armağan etmiştir.', true], ['Zafer Bayramı, Cumhuriyet\'in ilanından sonraki bir olayı kutlar.', false]], 'h4'),
      kapDY('Dedesiyle konuşan Defne, eski bayramlarla ilgili öğrendiklerini kartlara yazdı. Öğretmen kartları doğruluğuna göre kaplara atıyor.', [
        ['Eskiden de bayramlarda evlere bayrak asılırdı.', true], ['Fener alayı bayram geleneklerimizden biridir.', true], ['Eskiden bayramlarda tören yapılmazdı.', false], ['Bayram gelenekleri kuşaktan kuşağa aktarılır.', true]], 'h5'),
      coktan(p('Okul, 29 Ekim için gösteri hazırlıyor: 4-A şiir okuyacak, 4-B halk oyunu oynayacak, 4-C sergi panosu hazırlayacak. Gösteri saatinde 4-B\'nin müziği çalışmadı; 4-A öğrencileri hemen bir marş söyleyerek boşluğu doldurdu.'),
        'Bu olayda 4-A öğrencilerinin davranışı en çok hangi değeri gösterir?', 'Dayanışma', ['Kıskançlık', 'Bencillik', 'Sabırsızlık'])]]),

    'hafta-08': W(8, 2, 'Geçmişten Bugüne Oyunlar', 'Geçmiş ve bugün: oyunlar ve oyuncaklar', () => [[
      ortak(p('Okulda dedeler ve torunlar en sevdikleri oyunu işaretledi.') + grafik('En sevilen oyunlar', ['Saklambaç', 'Seksek', 'Futbol', 'Bilgisayar', 'Körebe'], [9, 7, 8, 6, 4], 'Kişi', '#12b886'), [
        () => coktan('', 'Saklambaç, seksek ve körebeyi seçenlerin toplamı kaçtır?', '20', ['16', '18', '22']),
        () => coktan('', 'Grafikteki oyunlardan hangisi dedelerin çocukluğunda oynanamazdı?', 'Bilgisayar oyunu', ['Saklambaç', 'Futbol', 'Körebe'])]),
      roma(p('Oyuncaklar zamanla değişmiştir: Dedemin çocukluğunda bez bebek ve tahta araba, annemin çocukluğunda plastik bebek ve misket, bugün ise uzaktan kumandalı arabalar ve tabletler yaygındır.'),
        'Bu bilgilere göre aşağıdaki yargılardan hangileri doğrudur?', [['Oyuncakların yapıldığı malzemeler değişmiştir.', true], ['Teknolojinin gelişmesi oyuncakları etkilemiştir.', true], ['Bugün hiç kimse misketle oynamaz.', false]]),
      sirala('Seksek oyununun kuralları karışık verilmiştir.', ['Yere numaralı kareler çizilir.', 'Taş ilk kareye atılır.', 'Taşın olduğu kareye basmadan tek ayakla zıplanır.', 'Dönüşte taş alınarak başlangıca gelinir.', 'Taş bir sonraki kareye atılır.'], 'Oyunun kuralları doğru sırayla hangisidir?', 'i3'),
      bulmaca('Öğrenciler "oyunlar ve oyuncaklar" bulmacasını çözüyor.', [['Eski oyuncakların çoğunun yapıldığı malzeme.', 'TAHTA'], ['Çocukların oynamak için kullandığı eşya.', 'OYUNCAK'], ['Bugünkü oyuncakların çoğunun malzemesi.', 'PLASTİK'], ['Birlikte oyun oynadığımız kişi.', 'ARKADAŞ'], ['Eskiden çubukla yuvarlanan halka oyuncak.', 'ÇEMBER']], 'i4')], [
      esle('Geleneksel oyunlar ve kuralları karışık verilmiştir.', [['Saklambaç', 'Ebe gözlerini kapatıp sayar, diğerleri saklanır.'], ['Körebe', 'Gözleri bağlı ebe arkadaşlarını yakalamaya çalışır.'], ['Seksek', 'Yere çizilen karelerde tek ayakla zıplanır.'], ['Mendil kapmaca', 'İki takım ortadaki mendili kapmaya çalışır.']], 'Buna göre oyunlarla kuralların doğru eşleştirilmesi hangisidir?', 'i5'),
      coktan(p('Okulda "Geleneksel Oyunlar Haftası" düzenlendi. Öğrenciler aile büyüklerinden öğrendikleri oyunları teneffüslerde oynadı. Hafta sonunda yapılan ankette öğrencilerin çoğu bu oyunları çok eğlenceli bulduğunu söyledi.'),
        'Bu etkinliğin en önemli sonucu hangisidir?', 'Geleneksel oyunların unutulmadan yaşatılmasına katkı sağlanması', ['Tablet kullanımının tamamen bitmesi', 'Teneffüslerin kısalması', 'Oyunların yalnız aile büyüklerince oynanması']),
      coktan(p('Ece, dedesinin çocukken yaptığı tahta arabayı ve kendi uzaktan kumandalı arabasını karşılaştırıyor.'), 'Bu iki oyuncağın ortak özelliği aşağıdakilerden hangisidir?', 'İkisinin de çocukların oynaması için yapılmış olması', ['İkisinin de pille çalışması', 'İkisinin de plastikten yapılması', 'İkisinin de fabrikada üretilmesi'])]]),

    'hafta-09': W(9, 2, 'Atatürk\'ü Tanıyorum', 'Atatürk\'ün hayatı ve kişilik özellikleri', () => [[
      ortak(p('Atatürk\'ün hayatından bazı olaylar zaman şeridinde gösterilmiştir.') + serit([['1881', 'Selanik\'te doğdu'], ['1893', 'Askerî okula girdi'], ['1919', 'Samsun\'a çıktı'], ['1920', 'TBMM açıldı'], ['1923', 'Cumhuriyet'], ['1938', 'Vefat etti']]), [
        () => coktan('', 'Atatürk Samsun\'a çıktığında kaç yaşındaydı?', '38', ['36', '37', '39']),
        () => coktan('', 'Cumhuriyet\'in ilanı ile Atatürk\'ün vefatı arasında kaç yıl vardır?', '15', ['13', '17', '19'])]),
      kacTane(p('Atatürk küçükken babası ölünce bir süre çiftlikte yaşadı. Tarladaki kargaları kovma işini kardeşiyle nöbetleşerek düzenledi. Okulda matematik dersinde o kadar başarılıydı ki öğretmeni ona "Kemal" adını verdi. Okuduğu kitapların kenarına notlar alırdı.') + p('Öğrenciler bu metinden Atatürk\'ün kişilik özellikleriyle ilgili çıkarımlar yaptı:'), [
        ['Sorumluluk sahibiydi.', true], ['Çalışkan ve başarılıydı.', true], ['Kitap okumayı sevmezdi.', false], ['Sorunlara planlı çözümler bulurdu.', true]]),
      kareYol('Ada, Atatürk\'le ilgili bilgilerin doğruluğuna göre karelerde ilerliyor.', [['Atatürk 1881\'de Selanik\'te doğdu.', true], ['TBMM, Cumhuriyet\'ten sonra açıldı.', false], ['10 Kasım\'da Atatürk\'ü anarız.', true], ['Atatürk 19 Mayıs\'ı çocuklara armağan etti.', false]], 'j3')], [
      tabloSec(p('Öğretmen, Atatürk\'ün kişilik özelliklerini gösteren davranışları tahtaya yazdı.'), 'Davranışlar hangi seçenekte kişilik özellikleriyle doğru eşleştirilmiştir?',
        ['Zor şartlarda vazgeçmedi.', 'Bilime önem verdi.', 'Ülkesi için çalıştı.'], ['Kararlılık', 'İleri görüşlülük', 'Vatanseverlik'], [['Vatanseverlik', 'Kararlılık', 'İleri görüşlülük'], ['İleri görüşlülük', 'Vatanseverlik', 'Kararlılık'], ['Kararlılık', 'Vatanseverlik', 'İleri görüşlülük']], 'j4'),
      cocukSec(p('"Hayatta en hakiki mürşit (yol gösterici) ilimdir (bilimdir)." — Atatürk') + p('Öğrenciler bu sözü yorumladı.'), 'Hangi öğrencinin yorumu bu söze uygun değildir?',
        ['Doğru yolu bulmak için şansımıza güvenmeliyiz.', 'Bir konuda karar verirken bilimsel bilgiye başvurmalıyız.', 'Söylentilere değil, araştırmaya güvenmeliyiz.', 'Bilim insanlarının çalışmaları bize yol gösterir.'], 'j5'),
      coktan(p('Atatürk, yeni harfler kabul edildikten sonra yurdun birçok yerine giderek kara tahta başında halka okuma yazma öğretti. Bu yüzden ona "Başöğretmen" denir.'), 'Bu bilgi Atatürk\'ün en çok hangi alana önem verdiğini gösterir?', 'Eğitim', ['Spor', 'Ticaret', 'Tarım'])]]),

    'hafta-10': W(10, 2, 'Millî Mücadele Kahramanları', 'Millî Mücadele\'de kahramanlar', () => [[
      ortak(p('Millî Mücadele\'de kahramanlık gösteren bazı kişiler aşağıda verilmiştir.') + tablo(['Kahraman', 'Şehir', 'Ne yaptı?'], [['Nene Hatun', 'Erzurum', 'Aziziye Tabyası\'nın savunmasına katıldı.'], ['Şerife Bacı', 'Kastamonu', 'Kar fırtınasında cepheye cephane taşıdı.'], ['Sütçü İmam', 'Kahramanmaraş', 'Halkın direnişini başlattı.'], ['Şahin Bey', 'Gaziantep', 'Şehrin savunmasında kahramanlık gösterdi.']]), [
        () => coktan('', 'Tabloya göre Millî Mücadele ile ilgili hangisi söylenebilir?', 'Kadın erkek bütün halk mücadeleye katılmıştır.', ['Yalnız askerler savaşmıştır.', 'Mücadele tek bir şehirde olmuştur.', 'Halk mücadeleye ilgisiz kalmıştır.']),
        () => coktan('', '"Kahraman" ve "Gazi" unvanları tablodaki hangi şehirlere verilmiştir?', 'Kahramanmaraş ve Gaziantep', ['Erzurum ve Kastamonu', 'Kastamonu ve Gaziantep', 'Erzurum ve Kahramanmaraş'])]),
      kodDY('Öğrenciler Millî Mücadele ile ilgili bilgileri değerlendiriyor.', [
        ['Millî Mücadele\'de kadınlar cepheye cephane taşıdı.', true], ['Çocuklar Millî Mücadele\'de hiçbir görev almadı.', false], ['Kağnılar cepheye malzeme taşımada kullanıldı.', true], ['Millî Mücadele 1923\'te başladı.', false]], 'k2'),
      yolDY('Arda, Millî Mücadele hakkındaki ifadeleri değerlendirerek ilerliyor.', [['Atatürk 1919\'da Samsun\'a çıkarak mücadeleyi başlattı.', true], ['Şerife Bacı Erzurum\'da savaştı.', false], ['Nene Hatun Erzurum\'un savunmasına katıldı.', true]], 'k3')], [
      konusma('Öğrenciler Millî Mücadele\'de birlik ve beraberlik üzerine konuşuyor.', [
        ['Defne', 'Mücadeleyi milletin birlik olması kazandırdı.', true], ['Can', 'Yalnızca büyük şehirlerdeki insanlar mücadeleye katıldı.', false],
        ['Elif', 'Cepheye malzeme taşıyanlar arasında çocuklar da vardı.', true], ['Bora', 'Millî Mücadele\'de herkes yalnız kendi şehrini düşündü.', false]], 'k4'),
      kapDY('Kerem, Millî Mücadele kahramanlarıyla ilgili kartlar hazırladı.', [
        ['Nene Hatun Erzurumludur.', true], ['Şahin Bey Gaziantep\'in savunmasında kahramanlık göstermiştir.', true], ['Sütçü İmam Kastamonu\'da direniş başlatmıştır.', false], ['Şerife Bacı cepheye cephane taşımıştır.', true]], 'k5'),
      coktan(p('Kağnılar gıcırdar karlı yollarda, / Analar mermi taşır kucaklarda. / Bir olur, iri olur bu millet, / Bayrağı dalgalanır doruklarda.'), 'Bu dizelerde en çok hangi duygu vurgulanmıştır?', 'Birlik ve kararlılık', ['Korku ve vazgeçme', 'Neşe ve eğlence', 'Kıskançlık'])]]),

    'hafta-11': W(11, 2, 'Kültürel Mirasımız', 'Yakın çevredeki tarihî ve kültürel mekânlar', () => [[
      ortak(p('Bir ailenin ziyaret etmek istediği müzenin bilgileri:') + etiket([['Müze', 'Arkeoloji Müzesi'], ['Açık', 'Salı - Pazar, 09.00-17.00'], ['Kapalı', 'Pazartesi'], ['Öğrenci', 'Ücretsiz'], ['Yetişkin', '60 TL'], ['65 yaş ve üstü', 'Ücretsiz']]), [
        () => coktan('', 'Anne, baba, 70 yaşındaki dede ve iki öğrenci çocuk müzeye toplam kaç TL öder?', '120', ['60', '180', '300']),
        () => coktan('', 'Aile müzeyi hangi gün ziyaret edemez?', 'Pazartesi', ['Salı', 'Cuma', 'Pazar'])]),
      roma(p('Kültürel miras yalnız yapılardan oluşmaz. Ebru sanatı, Karagöz, âşıklık geleneği ve kahve kültürü gibi gelenekler de korunması gereken mirasımızdır.'),
        'Buna göre aşağıdakilerden hangileri somut olmayan (elle tutulamayan) kültürel mirasa örnektir?', [['Âşıkların söylediği türküler', true], ['Selimiye Camii', false], ['Karagöz oyunu', true]]),
      sirala('Tarihî bir köprünün onarılması için yapılacaklar karışık verilmiştir.', ['Köprünün eski fotoğrafları ve belgeleri incelenir.', 'Uzmanlar hasarları belirler.', 'Eski yapıya uygun malzemeler seçilir.', 'Onarım yapılır ve köprü ziyarete açılır.'], 'Doğru sıralama hangisidir?', 'l3'),
      bulmaca('"Kültürel mirasımız" bulmacası:', [['Eski eserlerin sergilendiği yer.', 'MÜZE'], ['Galata Kulesi\'nin bulunduğu şehir.', 'İSTANBUL'], ['Eski yapıların aslına uygun onarılması.', 'RESTORASYON'], ['Kazı yaparak geçmişi araştıran bilim insanı.', 'ARKEOLOG'], ['Mimar Sinan\'ın Edirne\'deki camisi.', 'SELİMİYE']], 'l4')], [
      esle('Türkiye\'deki bazı kültürel miras ögeleri ve bulundukları şehirler karışık verilmiştir.', [['Efes Antik Kenti', 'İzmir'], ['Selimiye Camii', 'Edirne'], ['Sümela Manastırı', 'Trabzon'], ['Göbeklitepe', 'Şanlıurfa']], 'Doğru eşleştirme hangisidir?', 'l5'),
      coktan(p('Tarihî bir köprünün taşlarına isimler kazınmış, çevresine çöp atılmıştı. Belediye köprünün çevresine uyarı levhaları koydu, temizlik yaptı ve okullarla birlikte "Mirasımıza Sahip Çıkalım" kampanyası başlattı.'), 'Belediyenin kampanyayı okullarla birlikte yapmasının en önemli nedeni hangisidir?', 'Gelecek kuşakların da kültürel mirası koruma bilinci kazanması', ['Köprünün yeniden yapılması', 'Okulların tatil olması', 'Levhaların daha ucuza yapılması']),
      coktan(p('Ayşe, ninesinin ona öğrettiği yöresel bir türküyü okuldaki kültür gecesinde söyledi.'), 'Ayşe\'nin bu davranışı en çok hangisine katkı sağlar?', 'Somut olmayan kültürel mirasın yaşatılmasına', ['Tarihî yapıların onarılmasına', 'Müzelerin genişlemesine', 'Kazı çalışmalarına'])]]),

    'hafta-12': W(12, 3, 'Ana ve Ara Yönler', 'Ana ve ara yönler', () => [[
      ortak(p('Okul bahçesinin planı aşağıda verilmiştir. Kuzey yukarıdadır.') + tablo(['', 'Batı', 'Orta', 'Doğu'], [['Kuzey', 'Kantin', 'Bayrak direği', 'Kütüphane'], ['Orta', 'Bahçe', 'Okul binası', 'Spor salonu'], ['Güney', 'Otopark', 'Ana kapı', 'Oyun alanı']], '#12b886'), [
        () => coktan('', 'Kantin, okul binasının hangi yönündedir?', 'Kuzeybatı', ['Kuzeydoğu', 'Güneybatı', 'Güneydoğu']),
        () => coktan('', 'Oyun alanından kütüphaneye giden bir öğrenci hangi yöne yürür?', 'Kuzey', ['Güney', 'Doğu', 'Batı'])]),
      kacTane(p('Ahmet sabah okula giderken Güneş\'in tam karşısından doğduğunu fark etti.') + p('Ahmet\'in arkadaşları şu yorumları yaptı:'), [
        ['Ahmet sabah doğuya doğru yürümektedir.', true], ['Akşam eve dönerken Güneş Ahmet\'in önünde olur.', true], ['Sabah Ahmet\'in sağ tarafı güneydir.', true], ['Sabah Ahmet\'in sol tarafı batıdır.', false]]),
      kareYol('Su, yönlerle ilgili bilgileri değerlendiriyor.', [['Kuzey ile doğu arasındaki ara yön kuzeydoğudur.', true], ['Güneş batıdan doğar.', false], ['Dört ana yön vardır.', true], ['Güneybatı bir ana yöndür.', false], ['Pusulanın ibresi kuzeyi gösterir.', true]], 'm3')], [
      tabloSec(p('Bir öğrenci pusula gülünün ortasında duruyor ve yüzü kuzeye dönük.'), 'Öğrencinin sağı, solu ve arkası hangi yönlerdir?',
        ['Sağı', 'Solu', 'Arkası'], ['Doğu', 'Batı', 'Güney'], [['Batı', 'Doğu', 'Güney'], ['Doğu', 'Güney', 'Batı'], ['Güney', 'Batı', 'Doğu']], 'm4'),
      cocukSec(p('Öğrenciler sınıfta yön bulma yollarını konuşuyor.'), 'Hangi öğrencinin söylediği yanlıştır?',
        ['Ağaçların yosunlu tarafı her zaman güneydir.', 'Pusula ile yön bulabiliriz.', 'Güneş\'in doğduğu yön doğudur.', 'Gece Kutup Yıldızı kuzeyi gösterir.'], 'm5'),
      coktan(p('Ankara\'dan yola çıkan bir aile önce kuzeye, sonra batıya giderek bir şehre ulaştı.'), 'Bu ailenin ulaştığı şehir Ankara\'nın hangi yönünde olabilir?', 'Kuzeybatı', ['Güneydoğu', 'Güneybatı', 'Doğu'])]]),
  };
  const CSS = `
.b4-kimlik{width:100%;border-radius:3mm;overflow:hidden;border:.4mm solid #9fb3c8;background:linear-gradient(135deg,#e8f1fb,#fdeef0)}.b4-k-ust{background:#c8102e;color:#fff;font-size:3.3mm;text-align:center;padding:.6mm}.b4-k-ic{display:flex;gap:2.5mm;padding:1.8mm}.b4-k-foto{width:17mm;height:21mm;background:#dfe7ef;border-radius:1.5mm;display:grid;place-items:center;font-size:9mm}.b4-kimlik dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:.2mm 2mm;font-size:3.4mm}.b4-kimlik dt{color:#5b6b7b}.b4-kimlik dd{margin:0}
.b4-serit{display:flex;gap:1mm}.b4-serit>div{flex:1;background:#fff8e6;border-top:1.3mm solid #f4a100;border-radius:1.5mm;padding:1mm .6mm;text-align:center;display:flex;flex-direction:column;gap:.4mm}.b4-serit b{font-weight:400;font-size:3.7mm;color:#b45309}.b4-serit span{font-size:3.2mm;line-height:1.2}
.b4-etiket{display:grid;grid-template-columns:1fr 1fr;gap:.8mm 3mm;border:.6mm dashed #8b5cf6;border-radius:2.5mm;padding:1.5mm 2.5mm;background:#fbf9ff}.b4-etiket div{display:flex;flex-direction:column}.b4-etiket span{font-size:3.3mm;color:#6b5b95}.b4-etiket b{font-weight:400;font-size:3.9mm}
`;
  return { S4, CSS };
};
