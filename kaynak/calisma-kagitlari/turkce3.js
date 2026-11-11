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
  };
  const CSS = `
.t3-sec{display:flex;flex-direction:column;gap:2mm}.t3-sec span{background:#fff;border:.5mm solid #9db4c8;border-radius:3mm;padding:2mm 3mm;font-size:5mm}
.t3-not{margin:3mm 0 0;font-size:5mm}
.t3-gm{display:flex;flex-direction:column;gap:2.5mm}.t3-gm>div{display:flex;align-items:center;gap:4mm;background:#fff;border-radius:3mm;padding:2mm 3mm}.t3-gm p{margin:0;flex:1;font-size:5mm}
.t3-gm span{display:flex;align-items:center;gap:1.5mm;font-size:4.6mm}.t3-gm i{width:6mm;height:6mm;border:.5mm solid #4a5a50;border-radius:1.5mm}
.t3-gm u{text-decoration-thickness:.5mm;text-underline-offset:1mm;color:#c2410c}
.t3-dilekce{background:#fff;border-radius:3mm;padding:4mm 6mm;font-size:5mm}.t3-dilekce p{margin:0 0 2mm}.t3-sag{text-align:right}.t3-orta{text-align:center;text-transform:uppercase}.t3-konu{font-size:4.6mm;color:#5b6b7b}
`;
  return { T3, CSS };
};
