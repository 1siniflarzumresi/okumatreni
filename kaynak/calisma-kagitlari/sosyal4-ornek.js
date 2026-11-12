// Örnek: 4. sınıf Sosyal Bilgiler 1-2. hafta, yeni test tarzı (onay için).
module.exports = ({ T }) => {
  const { p, madde, tablo, kodDY, yolDY, kapDY, konusma, roma, sirala, esle, bulmaca, coktan, grafik, sayfa, optik, yeniHafta } = T;
  const kimlik = o => `<div class="b4-kimlik"><div class="b4-k-ust">TÜRKİYE CUMHURİYETİ KİMLİK KARTI</div><div class="b4-k-ic"><div class="b4-k-foto">👤</div><dl>${o.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl></div></div>`;
  const W = (hafta, unite, baslik, konu, f) => ({ unite, hafta, baslik, konu, sayfalar: () => { yeniHafta(); const s = f(); s[s.length - 1] = s[s.length - 1].replace(/<\/div>$/, optik() + '</div>'); return s; } });
  const S4 = {
    'hafta-01': W(1, 1, 'Kimliğimi Tanıyorum', 'Resmî kimlik belgesi', () => [sayfa([
      kodDY('Öğretmen, tahtaya kimlik kartıyla ilgili bilgiler yazdı. Öğrencilerden bilgi doğruysa "Doğru", yanlışsa "Yanlış" bölümünü boyamalarını istedi.', [
        ['Kimlik kartında kişinin doğum tarihi yazar.', true], ['T.C. kimlik numarası kardeşlerde aynıdır.', false], ['Kimlik kartının bir son geçerlilik tarihi vardır.', true], ['Kimlik kartından kişinin boyu öğrenilir.', false]], 'k1'),
      coktan(p('Defne, 2026 yılının eylül ayında kimlik kartını inceliyor.') + kimlik([['Soyadı', 'YILMAZ'], ['Adı', 'DEFNE'], ['Doğum Tarihi', '14.03.2017'], ['Cinsiyeti', 'K'], ['Uyruğu', 'T.C.'], ['Son Geçerlilik', '14.03.2027']]),
        'Buna göre Defne\'nin kimlik kartıyla ilgili aşağıdakilerden hangisi söylenebilir?', 'Defne bu tarihte 9 yaşındadır.', ['Kartın geçerlilik süresi dolmuştur.', 'Defne\'nin doğum günü sonbahardadır.', 'Kart 2028 yılına kadar kullanılabilir.']),
      konusma('Dört arkadaş, kimlik kartlarıyla ilgili bildiklerini paylaşıyor.', [
        ['Ali', 'Kimlik numaramız bize özeldir, başka kimsede yoktur.', true], ['Ece', 'Kimlik kartımızda anne ve baba adımız da bulunur.', true],
        ['Can', 'Kimlik kartının süresi dolsa da hep kullanılabilir.', false], ['Su', 'Kimlik kartında okulumuzun adı yazar.', false]], 'k3'),
      yolDY('Mert, kişisel bilgilerin korunmasıyla ilgili bir oyun oynuyor. İfade doğruysa "D", yanlışsa "Y" okunu izliyor.', [
        ['Tanımadığımız kişilerle ev adresimizi paylaşmamalıyız.', true], ['İnternette kimlik numaramızı herkese yazabiliriz.', false], ['Şifremizi en yakın arkadaşımıza da söylemeliyiz.', false]], 'k4'),
      coktan(p('Defne\'nin doğum tarihi 14.03.2017, sınıf arkadaşı Ayşe\'nin doğum tarihi ise 14.11.2016\'dır. İkisi de kimlik kartlarına bakarak kimin daha büyük olduğunu bulmaya çalışıyor.'),
        'Buna göre aşağıdakilerden hangisi doğrudur?', 'Ayşe, Defne\'den 4 ay büyüktür.', ['Defne, Ayşe\'den 4 ay büyüktür.', 'Ayşe, Defne\'den 1 yıl büyüktür.', 'İkisi aynı yıl doğmuştur.'])]),
    sayfa([
      roma(p('Kerem sınıfta kendini şöyle tanıttı:') + p('<i>"Benim adım Kerem Aydın. 2016 yılında doğdum. Satranç oynamayı ve ağaç dikmeyi çok seviyorum. Büyüyünce ormancı olmak istiyorum."</i>'),
        'Kerem\'in verdiği bilgilerden hangileri kimlik kartına bakılarak öğrenilebilir?', [['Adı ve soyadı', true], ['Doğduğu yıl', true], ['Sevdiği etkinlikler', false]]),
      kapDY('Bilge Öğretmen, öğrencilerin hazırladığı bilgi kartlarını inceliyor. Bilgi doğruysa "Doğru Bilgi", yanlışsa "Yanlış Bilgi" kabına atıyor.', [
        ['Kimlik kartı resmî bir belgedir.', true], ['Bebeklerin kimlik kartı olmaz.', false], ['Kimlik kartında uyruk bilgisi bulunur.', true], ['Kimlik kartı yenilenmez.', false], ['Kişisel bilgilerimizi korumalıyız.', true]], 'k6'),
      bulmaca('Zeynep, aşağıdaki soruların cevaplarını her harfi bir kareye gelecek biçimde bulmacaya yazıyor.', [
        ['Kişiyi tanıtan resmî kart.', 'KİMLİK'], ['Belgelerin altına atılan, kişiye özel işaret.', 'İMZA'], ['İnternette hesabımızı koruyan gizli sözcük.', 'ŞİFRE'], ['"Ad" sözcüğüyle eş anlamlı sözcük.', 'İSİM']], 'k7'),
      coktan(p('Mert, bir oyun sitesine üye olurken site ondan aşağıdaki bilgileri istiyor.') + tablo(['İstenen bilgi'], [['Kullanıcı adı'], ['T.C. kimlik numarası'], ['Ev adresi'], ['Okulunun adı']]),
        'Buna göre Mert\'in ailesine danışmadan paylaşabileceği tek bilgi aşağıdakilerden hangisidir?', 'Gerçek adını içermeyen bir kullanıcı adı', ['T.C. kimlik numarası', 'Ev adresi', 'Okulunun adı ve sınıfı']),
      esle('Kimlik kartı dışında da bizimle ilgili bilgiler taşıyan resmî belgeler vardır.', [['Doğduğumuzu kanıtlar.', 'Doğum belgesi'], ['Okuldaki başarımızı gösterir.', 'Karne'], ['Yurt dışına çıkarken kullanılır.', 'Pasaport'], ['Araç kullanma iznini gösterir.', 'Sürücü belgesi']],
        'Buna göre belgelerle görevlerinin doğru eşleştirilmesi hangisidir?', 'k9')])]),
    'hafta-02': W(2, 1, 'Farklılıklarımız Zenginliğimiz', 'Farklı özelliklere saygı', () => [sayfa([
      coktan(p('4-A sınıfındaki her öğrenci en sevdiği tek etkinliği seçti. Sonuçlar grafikte gösterilmiştir.') + grafik('En sevilen etkinlikler', ['Spor', 'Resim', 'Müzik', 'Kitap', 'Bilim'], [8, 5, 4, 6, 3], 'Öğrenci'),
        'Grafiğe göre aşağıdakilerden hangisi söylenemez?', 'Müziği seçen öğrenci sayısı resmi seçenlerden fazladır.', ['Sınıfta 26 öğrenci vardır.', 'Spor ve kitabı seçenler, resim ve müziği seçenlerden fazladır.', 'En az seçilen etkinlik bilimdir.']),
      konusma('Öğrenciler "farklılıklar" konusunda düşüncelerini söylüyor.', [
        ['Ada', 'Herkesin yeteneği ve ilgi alanı farklı olabilir.', true], ['Efe', 'Bizden farklı olanlarla arkadaşlık kurmamalıyız.', false],
        ['Defne', 'Farklı düşünceleri dinlemek yeni şeyler öğrenmemizi sağlar.', true], ['Arda', 'Sınıfta herkes aynı oyunu sevmek zorundadır.', false]], 'f2'),
      roma(p('Teneffüste takım kuran Deniz, "Selin yavaş koşuyor, onu almayalım." dedi. Selin "Koşmakta iyi değilim ama kaleci olabilirim." diye cevap verdi. Can da "Herkesin iyi olduğu bir şey vardır, Selin kaleci olsun." dedi.'),
        'Bu olayla ilgili aşağıdaki yargılardan hangileri doğrudur?', [['Deniz, arkadaşının farklı özelliklerine saygı göstermemiştir.', true], ['Selin, güçlü olduğu yanı fark etmiştir.', true], ['Can, takımın yalnız hızlı oyunculardan oluşmasını istemiştir.', false]]),
      yolDY('Ece, "farklılıklar" etkinliğinde ifadeleri değerlendirerek yol alıyor.', [
        ['Farklılıklara saygı, birlikte yaşamanın temelidir.', true], ['Grup çalışmasında herkes aynı görevi yapmalıdır.', false], ['Engelli bireyler de sanat ve sporda başarılı olabilir.', true]], 'f4'),
      bulmaca('Sınıf panosuna "Birlikte yaşamanın değerleri" bulmacası asıldı.', [['Başkalarının düşüncelerine değer vermek.', 'SAYGI'], ['Kendini başkasının yerine koymak.', 'EMPATİ'], ['İyiliği unutmamak.', 'VEFA'], ['Birine inanıp dayanmak.', 'GÜVEN'], ['Köyde birlikte iş yapma geleneği.', 'İMECE']], 'f9')]),
    sayfa([
      sirala('4-B sınıfı, herkesin katılacağı bir "Etkinlik Günü" planlıyor. Planın adımları karışık verilmiştir.', [
        'Herkesin etkinlik önerisini almak', 'Önerileri oylamak', 'Görevleri yeteneklere göre paylaştırmak', 'Etkinlik gününü gerçekleştirmek', 'Etkinliği birlikte değerlendirmek'],
        'Bu planın adımları doğru sırayla hangi seçenekte verilmiştir?', 'f5'),
      esle('"Farklılıklar Şenliği" için öğrencilere ilgi alanlarına uygun görevler verilecek.', [
        ['Piyano çalmayı seven Ayşe', 'Müzik dinletisi'], ['Resim yapmayı seven Can', 'Pano tasarımı'], ['Yemek yapmayı seven Elif', 'Yöresel tatlar köşesi'], ['Konuşmayı seven Bora', 'Sunuculuk']],
        'Buna göre öğrencilerle görevlerin doğru eşleştirilmesi hangi seçenekte verilmiştir?', 'f6'),
      kapDY('Öğrenciler "farklılıklar" konusunda bilgi kartları hazırladı. Öğretmen kartları doğruluğuna göre kaplara atıyor.', [
        ['İnsanların fiziksel özellikleri farklı olabilir.', true], ['Ailelerin gelenekleri hep aynıdır.', false], ['Farklı yetenekler bir takımı güçlendirir.', true], ['Bizim gibi düşünmeyenlerle konuşmamalıyız.', false]], 'f7', 'doğru'),
      coktan(p('Okulumuzda "Farklılıklar Şenliği" yapıldı. Öğrenciler ailelerinin geldiği şehirlerin yemeklerini, türkülerini ve oyunlarını tanıttı. Görme engelli öğrencimiz Ayşe de piyanoda bir eser çaldı. Şenliğin sonunda herkes en çok neyi sevdiğini bir panoya yazdı.'),
        'Bu şenlikle ilgili aşağıdakilerden hangisi söylenemez?', 'Öğrenciler yalnızca kendi şehirlerinin kültürünü tanımıştır.', ['Farklı kültürler bir arada tanıtılmıştır.', 'Engelli bir öğrenci de etkinliğe katkı sunmuştur.', 'Öğrencilerin görüşlerine yer verilmiştir.']),
      coktan(p('Sınıfa başka bir ülkeden gelen Lina katıldı. Lina Türkçeyi yeni öğreniyor ve teneffüste genellikle yalnız oturuyor.'), 'Lina\'nın sınıfa uyum sağlaması için yapılabilecek en uygun davranış hangisidir?', 'Ona oyunlarımızı öğretip kendi ülkesinin oyunlarını sormak', ['Türkçeyi öğrenene kadar onunla konuşmamak', 'Onu yalnızca öğretmene bırakmak', 'Farklı konuştuğu için ona gülmek'])])]),
  };
  return { S4 };
};
