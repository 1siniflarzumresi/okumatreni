// Ladin Ormanı — 3. sınıf Türkçe haftalık çalışma kâğıtları (MEB 2026-2027 taslak yıllık planı, TYMM).
// 2. sınıfla aynı düzen: özgün metin (250-330 sözcük) · anlama · o haftanın dil bilgisi · planlı yazma.
// Bileşenler turkce2.js'den gelir (A); 3. sınıfa özgü olanlar burada. Resim henüz yoksa metin resimsiz çıkar (resimVar).
// Üretim: node kaynak/calisma-kagitlari/uret.js t3   (tek hafta: t3:hafta-05)
module.exports = ({ etk, resim, numarala, resimVar, A, M }) => {
  const { harita, sirala, dogruYanlis, sozcuk, soru, tren, dogruYazim, yeniden, domino, yazma, eslestir, bosluk, kimlik, siniflandir, tablo, fikir, mesaj, kiyas, yonergeYaz, cizgi } = A;
  const metin = o => A.metin(Object.assign({}, o, { resimler: (o.resimler || []).filter(resimVar) }));
  // 3. sınıfa özgü
  const anaFikir = (secenekler, dogru) => etk(0, 'Metnin ana fikri hangisi? Doğru olanı daire içine al. Sonra nedenini yaz.',
    `<div class="t3-sec">${secenekler.map(s => `<span class="ttkb">${s}</span>`).join('')}</div><p class="ttkb t3-not">Çünkü</p>${cizgi(2)}`);
  const gercekMecaz = (liste) => etk(0, 'Altı çizili sözcük gerçek anlamında mı, mecaz anlamında mı kullanılmış? Doğru kutuyu işaretle.',
    `<div class="t3-gm">${liste.map(s => `<div><p class="ttkb">${s}</p><span class="ttkb"><i></i>gerçek</span><span class="ttkb"><i></i>mecaz</span></div>`).join('')}</div>`);
  const dilekce = (yonerge, kime, konu) => etk(0, yonerge,
    `<div class="t3-dilekce ttkb"><p class="t3-sag">Tarih: ……/……/20……</p><p class="t3-orta">${kime}</p>${cizgi(6)}<p class="t3-sag">Ad soyad: ………………………<br>İmza:</p><p class="t3-konu">Konu: ${konu}</p></div>`);

  const T3 = {
    'hafta-01': { unite: 1, hafta: 1, baslik: 'Yeni Sınıf, Eski Dostlar', konu: 'Hatırlatma haftası · Büyük harf, kısaltma, noktalama', sayfalar: () => [
      metin({ baslik: 'Yeni Sınıf, Eski Dostlar', resimler: ['yeni-sinif', 'eski-defter'], tahmin: 'Sence okulun ilk günü bu sınıfta neler oluyor?', paragraflar: [
        'Eylül sabahı okul bahçesi bir arı kovanı gibi vızıldıyordu. Ece, çantasının askısını sıkıca tutarak üçüncü sınıfların koridoruna yürüdü. Sınıfları bu yıl üst kata taşınmıştı. Kapıyı açınca pencereden giren güneş, sıraların üstünde altın rengi şeritler çizdi.',
        '– Ece! diye bağırdı Mert. Bütün yaz seni bekledik!',
        'Arkadaşları etrafını sardı. Zeynep yazın dedesinin köyüne gitmiş, ilk kez inek sağmıştı. Mert, Antalya\'dan Ankara\'ya 480 km yol gitmiş, TBMM\'yi gezmişti. Can ise yüzme kursunda iki uzunluk yüzmeyi öğrenmişti.',
        'Öğretmenimiz Nur Hanım içeri girdiğinde herkes yerine oturdu. Masasına renkli bir kutu koydu.',
        '– Bu yıl bir “Sınıf Hatıra Kutusu” tutacağız, dedi. Her ay içine bir anı yazıp atacağız. Haziranda açtığımızda bir yılı yeniden yaşayacağız.',
        'Ece defterini açtı. Geçen yılın defterleri evde, rafta duruyordu; sayfalarında ilk yazdığı eğri büğrü cümleler vardı. Şimdi kalemini tutuşu bile değişmişti. İlk anısını özenle yazdı: “Bugün yeni sınıfımıza geldik. Eski dostlarımı çok özlemişim.” Cümlesine büyük harfle başladı, sonuna nokta koydu.',
        'Teneffüs zili çaldığında Nur Hanım kutuyu rafa yerleştirdi. Kutunun içinde şimdiden yirmi altı kâğıt vardı. Her biri bir çocuğun yeni yıla dair umuduydu.',
      ] }),
      numarala([harita(), dogruYanlis(['Sınıf bu yıl üst kata taşınmıştı.', 'Mert yazın İzmir\'e gitmişti.', 'Hatıra kutusu haziranda açılacak.', 'Ece ilk anısını yazarken noktalama işaretine dikkat etmedi.']),
        sozcuk([['Okul bahçesi bir arı kovanı gibi <u>vızıldıyordu</u>.', ['çok kalabalık ve sesliydi', 'bomboştu', 'sessizdi']], ['Her biri bir çocuğun yeni yıla dair <u>umuduydu</u>.', ['gelecekten beklediği güzel şey', 'korkusu', 'ödevi']]])]),
      numarala([yeniden('Büyük harf hatalarını düzelterek cümleleri yeniden yaz.', ['ece ile mert antalya\'da oturuyor.', 'öğretmenimiz nur hanım bize bir kutu getirdi.', 'yazın karadeniz\'e gittik.']),
        eslestir('Kısaltmaları açılımlarıyla eşleştir.', [['TBMM', 'kilometre'], ['km', 'Türkiye Büyük Millet Meclisi'], ['TDK', 'Millî Eğitim Bakanlığı'], ['MEB', 'Türk Dil Kurumu']], 11),
        tren('Noktalama trenleri! Son vagona uygun işareti koy.', ['Bütün yaz seni bekledik', 'Sen yazın nereye gittin', 'Ece defterini açtı', 'Ne güzel bir kutu'], ['.', '?', '!'])]),
      numarala([yazma('Sınıfın hatıra kutusuna atacağın ilk anıyı yaz. Yazını giriş, gelişme ve sonuç bölümleriyle planla.', ['Giriş: Ne anlatacaksın?', 'Gelişme: Neler oldu?', 'Sonuç: Ne hissettin?'], 12)]),
    ] },
    'hafta-02': { unite: 2, hafta: 2, baslik: 'Sözünün Eri', konu: 'Değerlerimizle yaşıyoruz · Ana fikir, iki nokta ve tırnak', sayfalar: () => [
      metin({ baslik: 'Sözünün Eri', resimler: ['soz-veren', 'oyuncak-tamir'], tahmin: '“Sözünün eri” olmak ne demek olabilir?', paragraflar: [
        'Cuma akşamı Kerem, alt kattaki Hasan Dede\'nin kapısını çaldı. Hasan Dede bahçesine elli fide dikecekti ama sırtı ağrıyordu.',
        '– Yarın sabah dokuzda gelirim, dedi Kerem. Fideleri birlikte dikeriz.',
        'Hasan Dede\'nin gözleri parladı:',
        '– Sağ ol evladım. Sözüne güveniyorum.',
        'O gece telefon çaldı. Arayan takım kaptanı Emre\'ydi: “Yarın saat dokuzda final maçı var. Sensiz kazanamayız!” Kerem\'in yüreği hop etti. Bütün yaz bu maç için çalışmışlardı.',
        'Gece boyunca döndü durdu. Bir yanda maç, öbür yanda Hasan Dede. Sabah babası mutfakta kahvaltı hazırlarken ona danıştı. Babası ekmeğini bölüp gülümsedi:',
        '– Bir söz, ağızdan çıkınca bir köprü olur oğlum. Karşıdaki insan o köprüden geçer. Köprüyü yıkarsan o kişi suya düşer.',
        'Kerem bir süre sustu. Sonra Emre\'ye bir mesaj yazdı: “Bugün Hasan Dede\'ye söz verdim. Maçın ikinci yarısına yetişmeye çalışacağım.”',
        'Saat tam dokuzda Hasan Dede\'nin kapısındaydı. Toprağı kazdılar, fideleri yerleştirdiler, can suyunu verdiler. Son fideyi diktiklerinde saat on biri geçiyordu. Kerem koşa koşa sahaya vardığında maç bitmek üzereydi. Takımı bir gol geriydi.',
        'Hakem son dakikada Kerem\'i oyuna aldı. Kerem topu kaptı, Emre\'ye uzun bir pas verdi. Emre topu ağlarla buluşturdu! Maç berabere bitti.',
        'Akşam Hasan Dede\'nin balkonundan bir tabak kurabiye uzandı. Tabağın altında küçük bir not vardı: “Sözünün eri olan çocuğa.”',
      ] }),
      numarala([harita(), anaFikir(['Futbol çok eğlenceli bir oyundur.', 'Verilen söz, zor da olsa tutulmalıdır.', 'Fideleri sabah dikmek gerekir.']),
        soru(['Babasının “köprü” benzetmesini kendi cümlelerinle açıkla.', 'Sen Kerem\'in yerinde olsan ne yapardın? Neden?'])]),
      numarala([yeniden('Konuşmaları iki nokta ve tırnak işaretiyle yeniden yaz.', ['Hasan Dede sözüne güvendiğini söyledi.', 'Emre sensiz kazanamayız dedi.', 'Babası bir söz köprü olur dedi.']),
        dogruYazim('Hangisi doğru yazılmış? Balonu boya.', [['Emre: “Gel!” dedi.', 'Emre “gel” dedi.'], ['Hasan Dede\'nin', 'Hasan Dedenin'], ['saat dokuzda', 'saat 9\'da']], 21),
        sozcuk([['Kerem\'in <u>yüreği hop etti</u>.', ['çok heyecanlandı', 'uyudu', 'hastalandı']]])]),
      numarala([yazma('Sözünü tuttuğun ya da tutamadığın bir anını anlat. O gün ne öğrendin?', ['Kime ne söz verdin?', 'Ne oldu?', 'Ne öğrendin?'], 12)]),
    ] },
    'hafta-03': { unite: 2, hafta: 3, baslik: 'Çitin İki Yanı', konu: 'Değerlerimizle yaşıyoruz · Eş anlamlı sözcükler, ana duygu', sayfalar: () => [
      metin({ baslik: 'Çitin İki Yanı', resimler: ['komsu-bahce', 'cit-kapisi'], tahmin: 'Bir çitin iki yanında yaşayan komşular arasında neler olabilir?', paragraflar: [
        'Zeynep\'in ailesi yaz sonunda bahçeli küçük bir eve taşındı. Bahçeyi yandaki evden alçak, beyaz bir çit ayırıyordu. Çitin öbür yanında Saniye Teyze otururdu. Saniye Teyze yaşlı, biraz da sert bakışlı bir kadındı. Bahçesi rengârenk çiçeklerle doluydu.',
        'Taşındıkları ikinci gün Zeynep\'in topu çitin üstünden uçtu ve saksılardan birini devirdi. Saksı kırıldı, sardunyalar toprağa saçıldı. Saniye Teyze pencereden başını uzattı:',
        '– Bu bahçe benim yirmi yıllık emeğim! dedi öfkeyle.',
        'Zeynep o gece uyuyamadı. Sabah erkenden harçlığıyla bir saksı aldı. Annesiyle birlikte sardunyaları yeni saksıya dikti ve çitin kenarına bıraktı. Saksının yanına bir not iliştirdi: “Özür dilerim. Bahçeniz çok güzel. Bana çiçek yetiştirmeyi öğretir misiniz?”',
        'Ertesi sabah çitin üstünde bir kese duruyordu. İçinde domates tohumları ve titrek bir yazıyla yazılmış bir not vardı: “Önce domatesle başla. Sabırlı ol.”',
        'O günden sonra çit bir sınır olmaktan çıktı, bir köprüye dönüştü. Zeynep her akşam domateslerini sularken Saniye Teyze çitin öbür yanından ona öğütler verdi. Ağustos geldiğinde Zeynep\'in ilk kırmızı domatesi olgunlaştı. Onu kopardı ve çitin üstünden uzattı.',
        '– Bu sizin, dedi. Tohumu siz verdiniz.',
        'Saniye Teyze domatesi aldı. Sert bakışları yumuşadı, gözleri doldu.',
        'Sonbaharda Zeynep\'in babası çite küçük bir kapı yaptı. Artık iki bahçe arasında gidip gelmek için kimsenin çitin üstünden uzanmasına gerek yoktu.',
      ] }),
      numarala([harita(), sirala(['Zeynep\'in topu saksıyı kırdı.', 'Zeynep yeni bir saksı alıp özür notu bıraktı.', 'Saniye Teyze domates tohumu gönderdi.', 'Zeynep ilk domatesini Saniye Teyze\'ye verdi.', 'Babası çite bir kapı yaptı.'], 31),
        soru(['Metnin ana duygusu nedir? (öfke, pişmanlık, dostluk…) Neden?', '“Çit bir köprüye dönüştü.” cümlesi ne anlatıyor?'])]),
      numarala([domino('Eş anlam dominosu! Her taşın boş yarısına eş anlamlısını yaz.', ['yaşlı', 'öfke', 'armağan', 'sabır', 'cevap', 'kırmızı'], ['hediye', 'ihtiyar', 'kızgınlık', 'yanıt', 'al', 'dayanma gücü']),
        bosluk('Altı çizili sözcüğün eş anlamlısını kutudan seçip boşluğa yaz.', ['Saniye Teyze <u>yaşlı</u> bir kadındı. → ___ bir kadındı.', 'Zeynep\'in <u>yanıtı</u> onu sevindirdi. → Zeynep\'in ___ onu sevindirdi.', 'Bahçe <u>okul</u> gibi bir öğrenme yeriydi. → Bahçe ___ gibi bir öğrenme yeriydi.'], ['ihtiyar', 'cevabı', 'mektep'])]),
      numarala([yazma('Bir komşuna ya da arkadaşına özür notu yaz. Ne olduğunu, nasıl hissettiğini ve nasıl telafi edeceğini anlat.', ['Ne oldu?', 'Nasıl hissediyorsun?', 'Nasıl telafi edeceksin?'], 12)]),
    ] },
    'hafta-04': { unite: 2, hafta: 4, baslik: 'Sokağın Sessiz Sakinleri', konu: 'Değerlerimizle yaşıyoruz · Neden-sonuç, olayları kendi ifadeleriyle yazma', sayfalar: () => [
      metin({ baslik: 'Sokağın Sessiz Sakinleri', resimler: ['sokak-kedisi', 'barinak'], tahmin: 'Sokakta yaşayan hayvanlar için ne yapabiliriz?', paragraflar: [
        'Bizim sokağın sessiz sakinleri vardır: kediler, birkaç köpek, bir de çatıların kralı gibi gezen gri bir karga. Geçen yıla kadar onları pek fark etmezdim.',
        'Bir sabah okula giderken duvarın dibinde tir tir titreyen bir yavru kedi gördüm. Yağmur yağmıştı ve her yer çamurdu. Yavrunun gözleri yarı kapalıydı. Hemen annemi çağırdım. Annem kediyi bir havluya sardı ve veteriner olan komşumuz Aslı Abla\'ya götürdük. Aslı Abla yavruyu muayene etti:',
        '– Üşümüş ve aç kalmış, dedi. Sıcak bir yer ve mama ona iyi gelir.',
        'O gün bir karar verdim. Arkadaşlarım Deniz ve Bora ile sokağın köşesine bir “dostluk köşesi” kurmaya karar verdik. Apartman yöneticisinden izin aldık. Eski bir dolaptan yağmur geçirmeyen bir kulübe yaptık. Önüne bir su kabı ve bir mama kabı koyduk. Her sabah sırayla suyu tazeliyoruz.',
        'Bir hafta sonra köşeye topallayan bir köpek geldi. Arka ayağı yaralıydı. Ona yaklaşmadık çünkü korkmuş hayvanlar ürkebilir. Hemen belediyenin hayvan barınağını aradık. Ekip geldi, köpeği tedavi için götürdü.',
        'Ay sonunda barınağı ziyaret ettik. Bizim köpek iyileşmiş, kuyruğunu sallıyordu. Barınaktaki görevli bize sahiplenmenin bir sorumluluk olduğunu, hayvanların bakımının yıllar sürdüğünü anlattı.',
        'Şimdi sokağımızın sessiz sakinleri biraz daha mutlu. Biz de öyle. Çünkü bir hayvana yardım etmek, insanın kalbinde de bir köşe ısıtıyor.',
      ] }),
      numarala([harita(), dogruYanlis(['Yavru kedi soğuktan ve açlıktan titriyordu.', 'Çocuklar yaralı köpeği kucaklayıp eve götürdü.', 'Dostluk köşesi için yöneticiden izin aldılar.', 'Barınak görevlisi sahiplenmenin kolay olduğunu söyledi.']),
        soru(['Çocuklar yaralı köpeğe neden yaklaşmadı?', 'Son paragraftaki "kalbinde bir köşe ısıtmak" sözü ne anlatıyor?'])]),
      numarala([eslestir('Neden ve sonuç! Nedenleri sonuçlarıyla eşleştir.', [['Yavru kedi üşümüştü,', 'onu havluya sardılar.'], ['Köpek yaralıydı,', 'belediye barınağını aradılar.'], ['Kulübe yağmur geçirmiyordu,', 'kediler ıslanmadı.']], 41),
        bosluk('Cümleleri "çünkü" ya da "bu yüzden" ile tamamla.', ['Su kabını her sabah tazeliyoruz ___', 'Hayvanlara yardım etmek önemlidir ___', 'Köpek korkmuştu ___']),
        sirala(['Yavru kediyi buldum.', 'Veterinere götürdük.', 'Dostluk köşesini kurduk.', 'Barınağı ziyaret ettik.'], 42).replace('Olayları oluş sırasına göre numaralandır.', 'Olayları sıraya koy, sonra kendi cümlelerinle bir arkadaşına anlat.')]),
      numarala([yazma('Bir hayvana yardım ettiğin ya da yardım edilmesini gördüğün bir olayı kendi cümlelerinle anlat.', ['Hangi hayvan, nerede?', 'Ne oldu, ne yapıldı?', 'Sonunda ne oldu?'], 12)]),
    ] },
    'hafta-05': { unite: 2, hafta: 5, baslik: 'Ceviz Diken Dede', konu: 'Değerlerimizle yaşıyoruz · Zıt anlamlı sözcükler', sayfalar: () => [
      metin({ baslik: 'Ceviz Diken Dede', resimler: ['agac-diken', 'buyuk-ceviz'], tahmin: 'Yaşlı bir adam neden ağaç diker? Tahmin et.', paragraflar: [
        'Köyün girişinde, yol kenarında, beli bükük bir dede fidan dikiyordu. Elinde küçük bir kürek vardı; kürek her inişinde toprak yavaşça yarılıyordu. Yoldan geçen Ali durdu, merakla izledi.',
        '– Dede, ne dikiyorsunuz? diye sordu.',
        '– Ceviz, dedi dede, alnındaki teri silerek.',
        'Ali şaşırdı. Öğretmeni ceviz ağacının meyve vermesinin yıllar sürdüğünü anlatmıştı.',
        '– Ama dede, bu ağaç meyve verdiğinde siz… Belki göremezsiniz.',
        'Dede güldü. Yüzündeki kırışıklar güneşte derin derin göründü.',
        '– Haklısın evlat. Ben bu cevizden yemeyebilirim. Ama bak şuraya.',
        'Eliyle köyün meydanındaki kocaman ceviz ağacını gösterdi. Ağacın gövdesi o kadar kalındı ki üç çocuk el ele verse saramazdı. Gölgesinde köylüler çay içiyor, çocuklar oynuyordu.',
        '– O ağacı benim dedem dikmiş. Ben onun gölgesinde büyüdüm, cevizini yedim. Şimdi sıra bende. Ben dikeceğim, sen ve senin çocukların yiyecek.',
        'Ali bir süre sessiz kaldı. Sonra kovayı kaptı, çeşmeden su getirdi ve fidanın dibine döktü. Dede başını okşadı.',
        'Yıllar geçti. Ali büyüdü, köyden ayrıldı, şehirde öğretmen oldu. Bir yaz köye döndüğünde yol kenarındaki ceviz ağacı kocaman olmuştu. Gölgesinde küçük bir kız oturmuş, düşen cevizleri topluyordu.',
        '– Bu ağacı kim dikmiş? diye sordu kız.',
        'Ali gülümsedi. Cebinden bir ceviz fidanı çıkardı.',
        '– Gel, dedi. Önce birlikte bir tane dikelim, sonra anlatırım.',
      ] }),
      numarala([harita(), anaFikir(['Ceviz çok lezzetli bir meyvedir.', 'Bugün yaptığımız iyilikler gelecekteki insanlara ulaşır.', 'Ağaç dikmek çok yorucudur.']),
        soru(['Ali\'nin başta şaşırmasının nedeni neydi?', 'Metnin sonunda Ali ne yapmak istiyor? Neden?'])]),
      numarala([domino('Zıt anlam dominosu! Sözcükleri metinde bul, zıt anlamlısını yaz.', ['yaşlı', 'kalın', 'derin', 'geçmiş', 'sessiz', 'büyük'], ['ince', 'genç', 'sığ', 'küçük', 'gelecek', 'gürültülü']),
        yeniden('Altı çizili sözcüğün zıt anlamlısını kullanarak cümleyi yeniden yaz.', ['Dedenin beli <u>bükük</u>tü.', 'Ağacın gölgesi <u>serin</u>di.', 'Ali köyden <u>ayrıldı</u>.'])]),
      numarala([yazma('Senin gelecekteki insanlar için yapmak istediğin bir iyilik var mı? Bir yazı yaz.', ['Ne yapmak istiyorsun?', 'Kimlerin işine yarar?', 'Neden önemli?'], 12)]),
    ] },
    'hafta-06': { unite: 3, hafta: 6, baslik: 'Cepheden Bir Mektup', konu: 'Atatürk ve kahramanlarımız · Kısaltmalara gelen ekler, eş ve zıt anlam', sayfalar: () => [
      metin({ baslik: 'Cepheden Bir Mektup', resimler: ['eski-mektup', 'sehitlik'], tahmin: 'Bir asker cepheden annesine ne yazmış olabilir?', paragraflar: [
        'Geçen hafta dedemin evinde eski bir sandık açtık. Sandığın dibinde, sararmış bir zarfın içinde, dedemin dedesinin yazdığı bir mektup vardı. Mektubu 1915 yılında Çanakkale\'den, annesine yazmıştı. Babam onu yüksek sesle okudu:',
        '“Sevgili Anacığım, elini öperim. Bugün mavi denizin kıyısında, siperlerde bekliyoruz. Gece yıldızlar burada köydekinden daha parlak görünüyor. Arkadaşlarımla ekmeğimizi bölüşüyor, birbirimize köydeki türküleri söylüyoruz. Bazen çok üşüyoruz ama yüreğimiz sıcacık. Çünkü vatanımız için buradayız.',
        'Burada Seyit adında bir onbaşı tanıdım. Anlatılanlara göre o, top mermisini sırtına alıp topun namlusuna sürecek kadar güçlü ve cesur biriymiş. Herkes ondan güç alıyor.',
        'Anacığım, sen merak etme. Bahçedeki ceviz ağacını benim yerime sula. Kardeşime söyle, okulunu bırakmasın. Okumak, bu vatanı koruyacak en güçlü silahtır. Dualarını eksik etme. Oğlun Mehmet.”',
        'Babam mektubu bitirdiğinde odada derin bir sessizlik oldu. Ninem gözlerini sildi. Ben mektubun kenarındaki küçük lekeye baktım. Belki bir yağmur damlası, belki bir gözyaşıydı.',
        'O hafta okulda öğretmenimize mektubu anlattım. Öğretmenimiz bize Çanakkale Savaşı\'nı ve 18 Mart\'ı anlattı. Mehmet Dede ve arkadaşları gibi binlerce kişinin bu topraklar için canını verdiğini söyledi.',
        'Akşam ben de bir mektup yazdım. Kime mi? Mehmet Dede\'ye: “Sevgili dedem, mektubunu okudum. Ceviz ağacı hâlâ bahçede. Ben de okulumu hiç bırakmayacağım.”',
      ] }),
      numarala([harita(), dogruYanlis(['Mektup 1915 yılında yazılmıştı.', 'Mehmet mektubu kardeşine yazmıştı.', 'Mehmet okumayı en güçlü silah olarak görüyordu.', 'Anlatıcı da Mehmet Dede\'ye bir mektup yazdı.']),
        sozcuk([['Askerler <u>siperlerde</u> bekliyordu.', ['korunmak için kazılmış hendekler', 'gemiler', 'çadırlar']], ['<u>Yüreğimiz</u> sıcacık.', ['kalbimiz, içimiz', 'ellerimiz', 'evimiz']]])]),
      numarala([dogruYazim('Kısaltmalara gelen ekler kesme işaretiyle ayrılır ve kısaltmanın okunuşuna uyar. Doğrusunu boya.', [['TBMM\'ye', 'TBMM\'a'], ['TDK\'nin', 'TDK\'nın'], ['MEB\'e', 'MEB\'a'], ['km\'ye', 'km\'a']], 61),
        bosluk('Kısaltmalara uygun ekleri yaz. (Örnek: TBMM + de → TBMM\'de)', ['TBMM + de → ___', 'TDK + den → ___', 'MEB + in → ___', '5 km + lik → ___']),
        eslestir('Eş anlamlılarını eşleştir.', [['vatan', 'yürek'], ['kalp', 'yurt'], ['cesur', 'yanıt'], ['cevap', 'yiğit']], 62)]),
      numarala([yazma('Çanakkale\'de savaşan bir askere bir mektup yaz. Ona bugünkü Türkiye\'yi anlat.', ['Hitap:', 'Ona neler anlatacaksın?', 'Nasıl bir dilekle bitireceksin?'], 12)]),
    ] },
    'hafta-07': { unite: 3, hafta: 7, baslik: 'Herkes Okula!', konu: 'Atatürk ve kahramanlarımız · Karşılaştırma, zıt anlam, imza', sayfalar: () => [
      metin({ baslik: 'Herkes Okula!', resimler: ['millet-mektebi', 'harf-bloklari'], tahmin: 'Büyükler de okula gider mi? Ne öğrenmiş olabilirler?', paragraflar: [
        'Cumhuriyet Bayramı\'na bir hafta kala öğretmenimiz bir ödev verdi: “Ailenizdeki en yaşlı kişiye Cumhuriyet\'in ilk yıllarını sorun.”',
        'Ben de büyük ninem Hatice Nine\'ye sordum. Hatice Nine doksan yaşındaydı ama hafızası pırıl pırıldı. Gözlüğünü taktı, anlatmaya başladı:',
        '– Ben küçükken annem okuma yazma bilmezdi. Köyümüzde okuyabilen ancak birkaç kişi vardı. Hem eskiden kullanılan harfler öğrenmesi zor harflerdi.',
        '– Peki sonra ne oldu nine?',
        '– 1928 yılında Atatürk yeni harfleri getirdi. Bugün senin defterine yazdığın harfleri. Ardından her yerde “Millet Mektepleri” açıldı. Büyükler de akşamları okula gitmeye başladı. Annem kırk yaşındaydı. Gündüz tarlada çalışır, akşam elinde gaz lambasıyla okula giderdi.',
        'Hatice Nine durdu, gülümsedi:',
        '– Annemin ilk okuduğu kelime benim adımdı. Kara tahtaya “Hatice” yazmış, sonra sevinçten ağlamış. Eve gelince bana sarıldı, “Artık mektuplarını kendim okuyacağım.” dedi.',
        'Atatürk o yıllarda bir kara tahtanın başına geçip halka yeni harfleri kendisi öğretmiş. Bu yüzden ona “Başöğretmen” denirmiş.',
        'O akşam Hatice Nine benden bir şey istedi. Bir kâğıda adını ve soyadını yazdım, o da altına titrek eliyle imzasını attı. İmzasında küçük bir ay ile bir yıldız vardı.',
        '– Bunu bana annem öğretti, dedi. Her imzam ona bir teşekkürdür.',
      ] }),
      numarala([harita(), dogruYanlis(['Yeni harfler 1928 yılında kabul edildi.', 'Millet Mekteplerine yalnız çocuklar gidiyordu.', 'Hatice Nine\'nin annesi okumayı kırk yaşında öğrendi.', 'Atatürk\'e "Başöğretmen" denirdi.']),
        soru(['Hatice Nine\'nin annesi neden sevinçten ağladı?', 'İmzasındaki ay ve yıldız sence neyi anlatıyor?'])]),
      numarala([kiyas('Eskiden ve bugün okumayı öğrenmeyi karşılaştır.', 'Eskiden', 'Bugün'),
        domino('Zıt anlam dominosu! Metindeki sözcüklerin zıttını yaz.', ['yaşlı', 'zor', 'gündüz', 'ilk', 'sevinç', 'kara'], ['akşam', 'ak', 'genç', 'kolay', 'üzüntü', 'son']),
        etk(0, 'İmzanı tasarla! Adını ve soyadını yaz, altına sana özgü bir imza at.', `<div class="t3-imza"><div><span class="ttkb">Adım soyadım:</span>${cizgi(1)}</div><div><span class="ttkb">İmzam:</span><i></i></div></div>`)]),
      numarala([yazma('Ailendeki en yaşlı kişiyle bir söyleşi yap. Ona çocukluğunu sor ve öğrendiklerini yaz.', ['Kimle konuştun?', 'Çocukken okul nasıldı?', 'Seni en çok şaşırtan ne oldu?'], 12)]),
    ] },
    'hafta-08': { unite: 3, hafta: 8, baslik: 'Karda Bir Fener', konu: 'Atatürk ve kahramanlarımız · Yazışmayı sürdürme, iletileri karşılaştırma', sayfalar: () => [
      metin({ baslik: 'Karda Bir Fener', resimler: ['nene-hatun', 'kizilay-kamyon'], tahmin: 'Karlı bir gecede elinde fenerle yürüyen bu kadın kim olabilir?', paragraflar: [
        'Erzurum\'da kışlar çok sert geçer. 1877 yılının kasım ayında da kar dizleri aşıyordu. Şehir, uzun ve zorlu bir savaşın ortasındaydı.',
        'Bir gece düşman askerleri şehre yakın Aziziye Tabyası\'nı ele geçirdi. Tabya, şehri koruyan büyük bir kaleydi. Haber şehre yayılınca çan sesleri, davul sesleri birbirine karıştı. Uykudan uyanan halk, ellerinde ne varsa alıp sokağa döküldü.',
        'Kalabalığın arasında genç bir kadın vardı: Nene Hatun. Daha birkaç gün önce kardeşini savaşta kaybetmişti. Evde üç aylık bebeği uyuyordu. Bebeğini öptü, komşusuna emanet etti. Eline bir fener, beline kardeşinin kılıcını aldı ve karlı yokuşu tırmanan kalabalığa katıldı.',
        'Kadınlı erkekli, gençli yaşlı herkes tabyaya koştu. Kadınlar askerlere cephane ve su taşıdı, yaralıları sardı. Sabaha karşı tabya geri alındı. Erzurum kurtulmuştu.',
        'Nene Hatun o geceden sonra bir kahraman olarak anıldı. Uzun bir ömür yaşadı. Yaşlandığında çocuklar etrafına toplanır, ona o geceyi sorardı. O da hep aynı şeyi söylerdi:',
        '– Ben yalnız değildim. Herkes bir şey taşıdı: kimi fener, kimi su, kimi umut.',
        'Bugün Erzurum\'da Nene Hatun\'un adı bir caddede, bir okulda ve insanların kalbinde yaşıyor. Kızılay Haftası\'nda öğretmenimiz bize onu anlattığında anladım: Yardımlaşma bazen bir fener taşımak kadar küçük, bir şehri kurtarmak kadar büyüktür.',
      ] }),
      numarala([harita(), sirala(['Düşman Aziziye Tabyası\'nı ele geçirdi.', 'Nene Hatun bebeğini komşusuna emanet etti.', 'Halk tabyaya koştu.', 'Tabya geri alındı.', 'Nene Hatun yaşlanınca çocuklara anlattı.'], 81),
        soru(['Nene Hatun "Ben yalnız değildim." derken ne anlatmak istiyor?', 'Kızılay ile Nene Hatun\'un hikâyesi arasında nasıl bir bağ var?'])]),
      numarala([kiyas('Nene Hatun\'un o geceki yardımı ile bugün Kızılay\'ın yaptığı yardımları karşılaştır.', 'Nene Hatun', 'Kızılay'),
        mesaj('Bir arkadaşın Nene Hatun\'u merak edip sana yazdı. Yazışmayı sürdür: Cevap ver ve ona bir soru sor.', 'Merhaba! Öğretmen bugün Nene Hatun\'dan bahsetti ama ben kaçırdım. O kimdi, ne yapmıştı?')]),
      numarala([yazma('Zor bir durumda birlikte çalışarak başarılan bir işi anlat (ailede, sınıfta, mahallede).', ['Ne oldu?', 'Kim ne taşıdı, ne yaptı?', 'Sonunda ne oldu?'], 12)]),
    ] },
    'hafta-09': { unite: 3, hafta: 9, baslik: 'Çankaya\'da Bir Bahçe', konu: 'Atatürk ve kahramanlarımız · Sınıflandırma', sayfalar: () => [
      metin({ baslik: 'Çankaya\'da Bir Bahçe', resimler: ['cicek-buketi', 'eski-calisma-masasi'], tahmin: 'Atatürk çocuklarla nasıl vakit geçirirdi? Tahmin et.', paragraflar: [
        'Atatürk çocukları çok severdi. Onlarla konuşmak, sorularını dinlemek, onları güldürmek ona büyük mutluluk verirdi. Hayatında birkaç çocuğu evlat edindi. Bunlardan en küçüğü Ülkü\'ydü.',
        'Ülkü, Atatürk\'ün yanına geldiğinde çok küçüktü. Ankara\'da, Çankaya Köşkü\'nün bahçesinde koşup oynardı. Atatürk yorucu bir günün ardından bahçeye çıktığında Ülkü hemen yanına koşar, elinden tutar, ona topladığı çiçekleri verirdi. Atatürk o çiçekleri çalışma masasındaki bir bardağa koyardı.',
        'Çalışma odası kitaplarla doluydu. Atatürk çok kitap okurdu. Tarih, dil, matematik, coğrafya… Okuduğu kitapların kenarlarına notlar alır, önemli yerlerin altını çizerdi. Kitaplığında binlerce kitap vardı.',
        'Bir gün Ülkü masaya tırmanıp bir kitabı açmaya çalıştı. Kitap ağırdı, düştü. Ülkü korkuyla Atatürk\'e baktı. Atatürk kitabı yerden aldı, Ülkü\'yü kucağına oturttu ve kitaptaki resimleri birlikte incelediler.',
        '– Kitaplar düşerse kaldırırız, dedi Atatürk. Ama hiç açılmazsa içindekiler sonsuza kadar karanlıkta kalır.',
        'Atatürk, 23 Nisan\'ı dünya çocuklarına armağan etti. Bugün her 23 Nisan\'da farklı ülkelerden çocuklar Türkiye\'ye gelir, bayramı birlikte kutlar. Onun çocuklara verdiği değerin en güzel göstergesi, belki de budur.',
        'Atatürk 10 Kasım 1938\'de aramızdan ayrıldı. Biz onu her yıl saygıyla anıyoruz. Ama onu en iyi, onun gibi kitap okuyarak ve merak ederek anabiliriz.',
      ] }),
      numarala([harita(), dogruYanlis(['Ülkü, Atatürk\'ün evlat edindiği çocuklardandı.', 'Atatürk kitaplarına hiç not almazdı.', 'Atatürk 23 Nisan\'ı dünya çocuklarına armağan etti.', 'Ülkü kitabı düşürünce Atatürk ona kızdı.']),
        soru(['Atatürk\'ün "Hiç açılmazsa içindekiler karanlıkta kalır." sözü ne anlatıyor?'])]),
      numarala([siniflandir('Metindeki sözcükleri sınıflandır: kişi mi, yer mi, nesne mi?', [['Kişiler', '#3a86ff'], ['Yerler', '#12b886'], ['Nesneler', '#f2546b']], ['Ülkü', 'Ankara', 'kitap', 'Atatürk', 'Çankaya Köşkü', 'bardak', 'çiçek', 'bahçe', 'öğretmen']),
        tablo('Atatürk hakkında öğrendiklerini sınıflandırarak yaz.', ['Sevdiği şeyler', 'Yaptığı işler'], [['', ''], ['', ''], ['', '']])]),
      numarala([yazma('Atatürk\'e bir mektup yaz. Ona okuduğun en güzel kitabı anlat.', ['Hitap:', 'Hangi kitap, ne anlatıyor?', 'Kapanış:'], 12)]),
    ] },
    'hafta-10': { unite: 4, hafta: 10, baslik: 'Leyleklerin Uzun Yolu', konu: 'Doğayı tanıyoruz · Eş anlamlı sözcükleri kullanma, sınıflandırma', sayfalar: () => [
      metin({ baslik: 'Leyleklerin Uzun Yolu', resimler: ['leylekler', 'leylek-yuva'], tahmin: 'Leylekler kışın nereye gider? Tahmin et.', paragraflar: [
        'Dedemin köyünde, eski değirmenin bacasının tepesinde kocaman bir leylek yuvası vardır. Yuva, dallardan, otlardan ve çamurdan yapılmıştır. Dedem bu yuvanın, kendisi çocukken de orada olduğunu söyler.',
        'Her yıl mart ayının sonunda leylekler gökyüzünde belirir. Önce bir tane gelir, yuvayı onarır. Birkaç gün sonra eşi gelir. Gagalarını takırdatarak birbirlerini selamlarlar. Köyde herkes bilir: Leylekler geldiyse bahar da gelmiştir.',
        'Yazın yuvada iki üç yavru büyür. Anne ve baba leylek bütün gün tarlalarda, dere kenarlarında yiyecek arar. Kurbağa, böcek, küçük balık yakalar ve yavrularına getirir. Yavrular önce yuvanın kenarında kanat çırparak uçmayı dener. Sonra bir gün cesaretlerini toplar ve havalanırlar.',
        'Ağustos sona ererken köyün üstünde yüzlerce leylek toplanır. Gökyüzünde daireler çizer, sıcak hava akımlarına binerek yükselirler. Sonra hep birlikte güneye, Afrika\'ya doğru uzun bir yolculuğa çıkarlar. Bu yolculuk binlerce kilometre sürer.',
        'Leylekler yollarını nasıl bulur? Bilim insanları onların güneşi, dağları, nehirleri ve denizleri işaret olarak kullandığını düşünüyor. En şaşırtıcısı da şu: Leylekler baharda yine aynı yuvaya döner.',
        'Geçen bahar dedem bana bir dürbün verdi. Değirmenin yanında saatlerce bekledim. Sonunda gökyüzünde bir nokta belirdi. Nokta büyüdü, büyüdü… Bembeyaz kanatlarını açan bir leylek, bacadaki yuvaya süzülerek kondu. Dedem gülümsedi:',
        '– Hoş geldin, eski dost.',
      ] }),
      numarala([harita(), dogruYanlis(['Leylek yuvası dallardan, otlardan ve çamurdan yapılır.', 'Leylekler kışı köyde geçirir.', 'Leylekler baharda aynı yuvaya döner.', 'Leylekler yolculukta güneşi işaret olarak kullanabilir.']),
        sozcuk([['Leylekler <u>sıcak hava akımlarına</u> binerek yükselir.', ['yukarı doğru çıkan ılık hava', 'yağmur bulutları', 'deniz dalgaları']], ['Yavrular <u>cesaretlerini toplar</u> ve havalanır.', ['korkularını yener', 'tüylerini toplar', 'uyur']]])]),
      numarala([yeniden('Altı çizili sözcüğün yerine eş anlamlısını yazarak cümleyi yeniden yaz.', ['Leylekler <u>uzun</u> bir <u>yolculuğa</u> çıkar. (sefer)', 'Dedem bana bir <u>armağan</u> verdi.', 'Leylek <u>yanıt</u> verir gibi gagasını takırdattı.']),
        siniflandir('Leyleğin besinlerini ve yuvasının malzemelerini ayır.', [['Besin', '#f4a100'], ['Yuva malzemesi', '#8e5b2b']], ['kurbağa', 'dal', 'böcek', 'ot', 'balık', 'çamur'])]),
      numarala([yazma('Göç eden bir hayvanı araştır (kırlangıç, turna, somon…). Onun yolculuğunu anlatan bilgilendirici bir yazı yaz.', ['Hangi hayvan?', 'Nereden nereye göç eder?', 'Yolunu nasıl bulur?'], 12)]),
    ] },
    'hafta-11': { unite: 4, hafta: 11, baslik: 'Arıların Dansı', konu: 'Doğayı tanıyoruz · Ayrıntılı yönerge, yazma planı', sayfalar: () => [
      metin({ baslik: 'Arıların Dansı', resimler: ['ari-dans', 'ari-kovan'], tahmin: 'Arılar birbirleriyle nasıl anlaşır? Tahmin et.', paragraflar: [
        'Teyzem arıcıdır. Yazın onun yanına gittiğimde bana bir arıcı şapkası verdi. Şapkanın önünde ince bir tül vardı. Kovanların yanına yavaşça yaklaştık. Teyzem kapaklardan birini açtı ve altın renkli bir petek çıkardı.',
        '– Dikkatle bak, dedi. Şu arı dans ediyor.',
        'Gerçekten de bir arı peteğin üstünde garip bir şekilde dönüyordu. Önce düz bir çizgide kıpır kıpır ilerliyor, sonra sağa dönüp başlangıç noktasına geliyor, sonra yine düz çizgide ilerleyip bu kez sola dönüyordu. Sanki sekiz rakamı çiziyordu.',
        '– Bu, “sallanma dansı”, dedi teyzem. Bu arı çiçek dolu bir yer bulmuş. Dansıyla arkadaşlarına çiçeklerin yönünü ve uzaklığını anlatıyor. Çizgi ne kadar uzunsa çiçekler o kadar uzaktadır.',
        'Arkadaşları dans eden arının etrafına toplanmıştı. Antenleriyle ona dokunuyor, üzerindeki çiçek kokusunu alıyorlardı. Birkaç dakika sonra hepsi aynı yöne uçtu.',
        'Teyzem bana bir kovanda binlerce arı olduğunu anlattı. Kraliçe arı yumurta yumurtlar. İşçi arılar petek örer, bal yapar, yavrulara bakar, kovanı korur. Hepsinin bir görevi vardır.',
        '– Bir kaşık bal için yüzlerce arı bütün yaz çalışır, dedi teyzem.',
        'O akşam kahvaltılık balı kavanoza koyarken onu hiç olmadığı kadar değerli buldum. Kavanozun içinde sanki yüzlerce küçük dans vardı.',
      ] }),
      numarala([harita(), soru(['Sallanma dansında çizginin uzunluğu neyi gösterir?', 'İşçi arıların görevleri nelerdir?', 'Son cümle ne anlatıyor?']),
        sozcuk([['Arılar <u>petek örer</u>.', ['balmumundan altıgen gözler yapar', 'çiçek toplar', 'uyur']]])]),
      numarala([yonergeYaz('Ayrıntılı yönerge! Arıcıların kovanı nasıl açtığını teyzenin anlatımından yola çıkarak adım adım yaz. Her adımda neye dikkat edileceğini de ekle.', 5),
        etk(0, 'Metnin devamını sen yaz: Ertesi gün teyzenle birlikte bal hasadına çıktınız. Neler oldu?', cizgi(5))]),
      numarala([yazma('"Arılar neden önemlidir?" konulu bilgilendirici bir yazı yaz. Önce yazma planını doldur.', ['Giriş: Arılar kimdir?', 'Gelişme: Ne iş yaparlar? Bize ve doğaya faydaları?', 'Sonuç: Arıları nasıl koruyabiliriz?'], 12)]),
    ] },
    'hafta-12': { unite: 4, hafta: 12, baslik: 'Dere Neden Kurudu?', konu: 'Doğayı tanıyoruz · Ana fikir, okumayı değerlendirme', sayfalar: () => [
      metin({ baslik: 'Dere Neden Kurudu?', resimler: ['kuru-nehir', 'akan-dere'], tahmin: 'Bir dere neden kurur? Tahmin et.', paragraflar: [
        'Köyümüzün kenarından küçük bir dere akardı. Yazın ayaklarımızı serin suyuna sokar, taşların arasında küçük balıkları izlerdik. Bu yaz köye gittiğimizde dere yoktu. Yerinde çatlak çatlak bir toprak, birkaç kuru saz ve bir balık iskeleti vardı.',
        'Çok üzüldüm. Dedeme sordum:',
        '– Dere nereye gitti dede?',
        'Dedem derin bir nefes aldı:',
        '– Bu yıl çok az kar yağdı, yağmur da yağmadı. Bir de herkes tarlasını dereden çektiği suyla sulamaya başladı. Kimi suyu gereğinden fazla kullandı. Dere yorgun düştü.',
        'O gün kuzenim Elif ile bir karar verdik. Köyün muhtarına gidip derenin kurumasını anlattık. Muhtar köylüleri camide topladı. Bir su uzmanı davet edildi. Uzman, damla sulama denen bir yöntemi anlattı. Bu yöntemde su, bitkinin köküne damla damla verilir; böylece çok daha az su harcanır.',
        'Köylüler önce tereddüt etti ama sonra birkaç tarlada denediler. Sonbaharda bu tarlaların ürünü diğerlerinden azalmamıştı ama çok daha az su kullanılmıştı. Ertesi yıl neredeyse bütün köy damla sulamaya geçti.',
        'Kışın bol kar yağdı. Bahar geldiğinde dedem bir video gönderdi: Dere yeniden akıyordu! Suyun şırıltısını telefondan bile duyabiliyordum.',
        'Yazın köye gittiğimde ilk iş dereye koştum. Ayaklarımı suya soktum. Küçük bir balık parmaklarımın arasından süzülüp geçti. Sanki bana teşekkür ediyordu.',
      ] }),
      numarala([harita(), anaFikir(['Yazın köyde dereye girmek eğlencelidir.', 'Doğal kaynakları dikkatli kullanırsak onları koruyabiliriz.', 'Damla sulama zor bir yöntemdir.']),
        sirala(['Dere kurudu.', 'Çocuklar muhtara gitti.', 'Bir su uzmanı damla sulamayı anlattı.', 'Köylüler damla sulamaya geçti.', 'Dere yeniden aktı.'], 121)]),
      numarala([eslestir('Neden ve sonuç!', [['Az kar ve yağmur yağdı,', 'su tasarruf edildi.'], ['Damla sulama kullanıldı,', 'dere kurudu.'], ['Kışın bol kar yağdı,', 'dere yeniden aktı.']], 122),
        tablo('Okumamı değerlendiriyorum. Bu metni okurken neler yaptın?', ['Okurken', 'Evet / Hayır'], [['Başlığa ve resimlere bakıp tahmin yaptım.', ''], ['Bilmediğim sözcüğün anlamını cümleden çıkardım.', ''], ['Noktalama işaretlerine dikkat ettim.', ''], ['Takıldığım yeri yeniden okudum.', '']])]),
      numarala([yazma('Okulunda ya da evinde suyu korumak için bir kampanya başlatıyorsun. Kampanya afişinin metnini yaz.', ['Kampanyanın adı:', 'Neden gerekli?', 'Herkes ne yapmalı?'], 12)]),
    ] },
  };
  const CSS = `
.t3-sec{display:flex;flex-direction:column;gap:2mm}.t3-sec span{background:#fff;border:.5mm solid #9db4c8;border-radius:3mm;padding:2mm 3mm;font-size:5mm}
.t3-not{margin:3mm 0 0;font-size:5mm}
.t3-gm{display:flex;flex-direction:column;gap:2.5mm}.t3-gm>div{display:flex;align-items:center;gap:4mm;background:#fff;border-radius:3mm;padding:2mm 3mm}.t3-gm p{margin:0;flex:1;font-size:5mm}
.t3-gm span{display:flex;align-items:center;gap:1.5mm;font-size:4.6mm}.t3-gm i{width:6mm;height:6mm;border:.5mm solid #4a5a50;border-radius:1.5mm}
.t3-gm u{text-decoration-thickness:.5mm;text-underline-offset:1mm;color:#c2410c}
.t3-imza{display:flex;flex-direction:column;gap:3mm;background:#fff;border-radius:3mm;padding:3mm}.t3-imza>div{display:grid;grid-template-columns:40mm 1fr;align-items:end;gap:2mm}.t3-imza span{font-size:5mm}.t3-imza i{height:22mm;border-bottom:.45mm dashed #9db4c8}
.t3-dilekce{background:#fff;border-radius:3mm;padding:4mm 6mm;font-size:5mm}.t3-dilekce p{margin:0 0 2mm}.t3-sag{text-align:right}.t3-orta{text-align:center;text-transform:uppercase}.t3-konu{font-size:4.6mm;color:#5b6b7b}
`;
  return { T3, CSS };
};
