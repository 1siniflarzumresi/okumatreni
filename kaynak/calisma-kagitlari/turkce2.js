// Ladin Ormanı — 2. sınıf Türkçe haftalık çalışma kâğıtları (MEB 2026-2027 taslak yıllık planı, TYMM).
// Her hafta: 1 özgün okuma metni + okuduğunu anlama + o haftanın dil bilgisi konusu (oyunla) + planlı yazma.
// Metinler özgündür (ders kitabından alınmaz); dili özenli, 2. sınıf düzeyinde, 150-200 sözcük.
// Üretim: node kaynak/calisma-kagitlari/uret.js t2   (tek hafta: t2:hafta-03)
module.exports = ({ etk, resim, numarala, M }) => {
  const { R, karistir } = M;

  // ---------- parçalar ----------
  const cizgi = (n, cls = '') => `<div class="t2-cizgi ${cls}">${'<i></i>'.repeat(n)}</div>`;
  const metin = ({ baslik, resimler, paragraflar, tahmin }) =>
    etk(0, `Okumadan önce: Başlığa ve resimlere bak. ${tahmin}`, cizgi(1)).replace('<b>0</b>', '<b>?</b>') +
    `<article class="t2-metin"><h3 class="ttkb">${baslik}</h3>${resimler.map((r, i) => `<span class="t2-r t2-r${i}">${resim(r)}</span>`).join('')}${paragraflar.map(p => `<p class="ttkb">${p}</p>`).join('')}</article>`;
  const harita = (yonerge = 'Hikâye haritasını tamamla.') => etk(0, yonerge,
    `<div class="t2-harita">${[['Kimler var?', '#3a86ff'], ['Nerede geçiyor?', '#12b886'], ['Ne oldu?', '#f4a100'], ['Nasıl bitti?', '#f2546b']].map(([s, c]) => `<div style="border-color:${c}"><b class="ttkb" style="color:${c}">${s}</b>${cizgi(2)}</div>`).join('')}</div>`);
  const sirala = (cumleler, t) => etk(0, 'Olayları oluş sırasına göre numaralandır.',
    `<div class="t2-sira">${karistir(cumleler, R(t)).map(c => `<div><i></i><span class="ttkb">${c}</span></div>`).join('')}</div>`);
  const dogruYanlis = (liste) => etk(0, 'Metne göre doğru olanların kutusuna D, yanlış olanların kutusuna Y yaz.',
    `<div class="t2-dy">${liste.map(c => `<div><span class="ttkb">${c}</span><i></i></div>`).join('')}</div>`);
  const sozcuk = (liste) => etk(0, 'Sözcük dedektifi! Altı çizili sözcüğün anlamını cümleden tahmin et. Doğru anlamı daire içine al.',
    `<div class="t2-soz">${liste.map(([cumle, secenek]) => `<div><p class="ttkb">${cumle}</p><div>${secenek.map(s => `<span class="ttkb">${s}</span>`).join('')}</div></div>`).join('')}</div>`);
  const soru = (liste) => etk(0, 'Soruları metne göre cevapla.',
    `<div class="t2-soru">${liste.map(s => `<div><p class="ttkb">${s}</p>${cizgi(1)}</div>`).join('')}</div>`);
  // Noktalama treni: her vagonun sonuna uygun işareti koy
  const tren = (yonerge, cumleler, isaretler) => etk(0, yonerge,
    `<div class="t2-tren">${cumleler.map(c => `<div><span class="ttkb">${c}</span><i></i></div>`).join('')}</div><div class="t2-isaret ttkb">${isaretler.map(s => `<b>${s}</b>`).join('')}</div>`);
  // İki yazımdan doğrusunu seç (balonlar)
  const dogruYazim = (yonerge, ciftler, t) => etk(0, yonerge,
    `<div class="t2-balon">${ciftler.map(([d, y], i) => `<div>${(R(t + i)() < .5 ? [d, y] : [y, d]).map(s => `<span class="ttkb">${s}</span>`).join('')}</div>`).join('')}</div>`);
  const hece = (sozcukler) => etk(0, 'Hece treni! Sözcükleri hecelerine ayırıp vagonlara yaz.',
    `<div class="t2-hece">${sozcukler.map(([s, n]) => `<div><b class="ttkb">${s}</b><span>${'<i></i>'.repeat(n)}</span></div>`).join('')}</div>`);
  const yeniden = (yonerge, cumleler) => etk(0, yonerge,
    `<div class="t2-yeniden">${cumleler.map(c => `<div><p class="ttkb">${c}</p>${cizgi(1)}</div>`).join('')}</div>`);
  const domino = (yonerge, sozcukler, banka) => etk(0, yonerge,
    `<div class="t2-domino">${sozcukler.map(s => `<div><b class="ttkb">${s}</b><i></i></div>`).join('')}</div><div class="t2-banka ttkb">${banka.map(s => `<span>${s}</span>`).join('')}</div>`);
  const yazma = (yonerge, adimlar, satir) => etk(0, yonerge,
    `<div class="t2-plan">${adimlar.map((a, i) => `<div><b>${i + 1}</b><span class="ttkb">${a}</span>${cizgi(1)}</div>`).join('')}</div><div class="t2-yaz"><div class="t2-bas ttkb">Başlık:<i></i></div>${cizgi(satir, 'genis')}</div>`);

  const eslestir = (yonerge, ciftler, t) => { const sag = karistir(ciftler.map(c => c[1]), R(t));
    return etk(0, yonerge, `<div class="t2-esle"><div>${ciftler.map(c => `<span class="ttkb">${c[0]}<i></i></span>`).join('')}</div><div>${sag.map(s => `<span class="ttkb"><i></i>${s}</span>`).join('')}</div></div>`); };
  const bosluk = (yonerge, cumleler, banka) => etk(0, yonerge,
    (banka ? `<div class="t2-banka ttkb" style="margin:0 0 3mm">${banka.map(s => `<span>${s}</span>`).join('')}</div>` : '') +
    `<div class="t2-bosluk">${cumleler.map(c => `<p class="ttkb">${c.replace(/___/g, '<i></i>')}</p>`).join('')}</div>`);
  const kimlik = (yonerge, alanlar, gorsel) => etk(0, yonerge,
    `<div class="t2-kimlik">${gorsel ? `<span>${resim(gorsel)}</span>` : ''}<div>${alanlar.map(a => `<div><b class="ttkb">${a}</b><i></i></div>`).join('')}</div></div>`);

  const siniflandir = (yonerge, kutular, sozcukler) => etk(0, yonerge,
    `<div class="t2-banka ttkb" style="margin:0 0 3mm">${sozcukler.map(s => `<span>${s}</span>`).join('')}</div><div class="t2-sinif">${kutular.map(([ad, renk]) => `<div style="border-color:${renk}"><b class="ttkb" style="color:${renk}">${ad}</b>${cizgi(3)}</div>`).join('')}</div>`);
  const tablo = (yonerge, basliklar, satirlar) => etk(0, yonerge,
    `<table class="t2-tablo ttkb"><tr>${basliklar.map(b => `<th>${b}</th>`).join('')}</tr>${satirlar.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`);
  const fikir = (yonerge, ileti) => etk(0, yonerge,
    `<div class="t2-fikir"><p class="ttkb">“${ileti}”</p><div class="ttkb"><span>Katılıyorum.</span><span>Katılmıyorum.</span></div><p class="ttkb" style="margin:2mm 0 0">Çünkü</p>${cizgi(2)}</div>`);

  // ---------- haftalar ----------
  const T2 = {
    'hafta-01': { unite: 1, hafta: 1, baslik: 'Kalemin Yaz Tatili', konu: 'Hatırlatma haftası · Soru eki, hece', sayfalar: () => [
      metin({ baslik: 'Kalemin Yaz Tatili', resimler: ['kalem', 'canta'], tahmin: 'Sence bu metinde kim tatil yapmış olabilir?', paragraflar: [
        'Kırmızı kalem, bütün yaz boyunca çantanın en dibinde bekledi. Yanında bir silgi ile ucu kırık bir cetvel vardı.',
        '– Okullar ne zaman açılacak, biliyor musun? diye sordu silgi.',
        '– Bilmiyorum, dedi kalem. Ama çok özledim. Defterin bembeyaz sayfalarını, teneffüs zilini, Defne\'nin sıcak parmaklarını…',
        'Bir sabah çantanın fermuarı açıldı. İçeri ışık doldu. Defne, kalemi avucuna aldı ve gülümsedi.',
        '– Merhaba eski dostum! Bu yıl ikinci sınıftayız.',
        'Sınıfta öğretmen tahtaya kocaman harflerle bir soru yazdı: “Yazın neler yaptınız?” Defne biraz düşündü. Denize girmişti, dedesinin bahçesinde domates toplamıştı, bir de kalın bir kitap bitirmişti. Kalem defterin üstünde dans etmeye başladı. Harfler sözcüklere, sözcükler cümlelere dönüştü.',
        'Akşam kalem çantaya döndü. Ucu biraz kısalmıştı ama içi kıpır kıpırdı.',
        '– Nasıldı? diye sordu silgi.',
        '– Harikaydı, dedi kalem. Meğer yazmak, en güzel tatilden bile güzelmiş.',
      ] }),
      numarala([harita(), dogruYanlis(['Kalem yaz boyunca çantada bekledi.', 'Defne bu yıl üçüncü sınıfa geçti.', 'Defne yazın dedesinin bahçesinde domates topladı.', 'Akşam kalemin ucu uzamıştı.']),
        sozcuk([['Kalem, defteri ve teneffüs zilini çok <u>özledim</u> dedi.', ['görmeyi çok istedi', 'hiç sevmedi', 'unuttu']], ['Çantanın <u>fermuarı</u> açıldı, içeri ışık doldu.', ['çantanın kapağını kapatan dişli kayış', 'çantanın sapı', 'kalemin ucu']]])]),
      numarala([dogruYazim('Soru eki "mı, mi, mu, mü" her zaman ayrı yazılır. Doğru yazılmış balonu boya.', [['biliyor musun?', 'biliyormusun?'], ['açıldı mı?', 'açıldımı?'], ['güzel mi?', 'güzelmi?'], ['geldin mi?', 'geldinmi?']], 11),
        hece([['kalem', 2], ['silgi', 2], ['defter', 2], ['teneffüs', 3], ['domates', 3], ['öğretmen', 3]]),
        yeniden('Bu cümleleri soru cümlesine çevir. Soru ekini ayrı yazmayı unutma.', ['Defne okula gitti.', 'Kalem çok mutlu.', 'Silgi çantada bekliyor.'])]),
      numarala([yazma('Sen yazın neler yaptın? Önce aşağıdaki soruları kısaca cevapla, sonra yazını yaz. Başlık koymayı unutma.', ['Nereye gittin?', 'Kimlerle birlikteydin?', 'En çok neyi sevdin?'], 12)]),
    ] },
    'hafta-02': { unite: 2, hafta: 2, baslik: 'Kayıp Cüzdan', konu: 'Değerlerimizle varız · Nokta ve soru işareti', sayfalar: () => [
      metin({ baslik: 'Kayıp Cüzdan', resimler: ['cuzdan', 'agac'], tahmin: 'Bir cüzdan bulsan ne yapardın?', paragraflar: [
        'Cumartesi sabahı Emir, babaannesiyle parka gitti. Güneş parlıyor, kuşlar ağaçtan ağaca uçuyordu. Emir salıncağa koşarken bankın altında kahverengi bir şey gördü. Eğilip aldı. Bu, içi para dolu bir cüzdandı!',
        'Emir\'in kalbi hızlı hızlı çarpmaya başladı. Bu parayla en sevdiği oyuncak arabayı alabilirdi. Sonra cüzdanın sahibini düşündü. Belki o da şu anda telaşla her yeri arıyordu.',
        'Hemen babaannesinin yanına koştu.',
        '– Bunu bankın altında buldum. Sahibini nasıl buluruz?',
        'Babaannesi cüzdanı açtı. İçinde bir kimlik kartı vardı. Kartta beyaz bıyıklı, gözlüklü bir amcanın fotoğrafı duruyordu. Tam o sırada parkın girişinde, yere bakarak yürüyen birini gördüler. Fotoğraftaki amcaydı bu!',
        'Emir cüzdanı uzattı. Amcanın yüzü bir anda aydınlandı.',
        '– Ah evlat, sana ne kadar teşekkür etsem az. Bu parayı torunumun doğum günü hediyesi için biriktirmiştim.',
        'Eve dönerken Emir\'in elleri boştu ama içi kuş gibi hafifti.',
      ] }),
      numarala([harita(), sirala(['Emir bankın altında bir cüzdan buldu.', 'Babaannesi cüzdanın içinde kimlik kartını gördü.', 'Emir cüzdanı amcaya uzattı.', 'Emir eve mutlu döndü.'], 21),
        soru(['Emir cüzdanı bulunca önce ne düşündü?', 'Sonunda neden "içi kuş gibi hafifti"?'])]),
      numarala([tren('Cümle trenleri! Her trenin son vagonuna nokta (.) ya da soru işareti (?) koy.', ['Emir parka gitti', 'Cüzdan kimin', 'Bankın altında ne vardı', 'Amca çok sevindi', 'Sahibini nasıl buluruz', 'Babaanne cüzdanı açtı'], ['.', '?']),
        sozcuk([['Cüzdanın sahibi şu anda <u>telaşla</u> her yeri arıyordu.', ['acele ve endişeyle', 'gülerek', 'yavaşça']], ['Amcanın yüzü bir anda <u>aydınlandı</u>.', ['karardı', 'sevinçle parladı', 'kızardı']]]),
        yeniden('Amcaya sormak istediğin iki soru yaz. Soru işaretini unutma.', ['1.', '2.'])]),
      numarala([yazma('Dürüst davrandığın bir anını anlat. Önce plan yap, sonra yaz.', ['Ne oldu?', 'Ne yaptın?', 'Sonra nasıl hissettin?'], 12)]),
    ] },
    'hafta-03': { unite: 2, hafta: 3, baslik: 'Ninemin Elma Ağacı', konu: 'Değerlerimizle varız · Ünlem ve virgül', sayfalar: () => [
      metin({ baslik: 'Ninemin Elma Ağacı', resimler: ['elma', 'sepet'], tahmin: 'Sence elma ağacının başında neler olacak?', paragraflar: [
        'Ninemin bahçesinde yaşlı bir elma ağacı var. Her sonbahar dalları kıpkırmızı elmalarla dolar. Bu yıl elmalar o kadar çoktu ki dallar neredeyse yere değiyordu.',
        '– Bu kadar elmayı tek başıma nasıl toplarım? dedi ninem.',
        'Hemen sokaktaki arkadaşlarıma koştum. Zeynep, Can, Mert ve küçük Ela sepetlerini kapıp geldi. Kimimiz merdivene çıktı, kimimiz yere düşen elmaları topladı. Can\'ın sepeti öyle doldu ki kaldıramadı. Mert koşup sepetin öbür ucundan tuttu.',
        '– Birlikte taşırsak daha kolay olur! dedi.',
        'Öğleye kadar bütün elmalar toplandı. Ninem hepimize mis kokulu elmalı kurabiye pişirdi. Kalan elmaları sepetlere doldurduk. Komşulara, mahalledeki bakkala, okulun bekçisine birer sepet götürdük.',
        'Küçük Ela bütün gün bir sepetin başından ayrılmadı. Elmaları tek tek silip parlattı, sonra hepsini güzelce dizdi. Kimse ona bunu yapmasını söylememişti ama Ela, işin en küçük parçasının bile önemli olduğunu biliyordu.',
        'Akşam ninemin yanına oturdum.',
        '– Nine, elmaların çoğunu dağıttık. Sana çok az kaldı, dedim.',
        'Ninem gülümseyerek saçlarımı okşadı:',
        '– Paylaşılan elma azalmaz yavrum, çoğalır.',
      ] }),
      numarala([harita(), dogruYanlis(['Elma ağacı ninenin bahçesindeydi.', 'Çocuklar elmaları tek başına topladı.', 'Mert, Can\'ın sepetini taşımasına yardım etti.', 'Elmaların hepsi ninede kaldı.']),
        soru(['Ninenin son sözü ne anlatmak istiyor?', 'Sen bir şeyi en son kiminle paylaştın?'])]),
      numarala([tren('Duygu trenleri! Sevinç, şaşkınlık, korku ya da seslenme bildiren cümlelerin sonuna ünlem (!), diğerlerine nokta (.) koy.', ['Yaşasın, elmalar kızardı', 'Ninem kurabiye pişirdi', 'Aman, merdiven kayıyor', 'Elmalar sepette', 'Mert, buraya gel', 'Ne güzel kokuyor'], ['.', '!']),
        yeniden('Virgül sepeti! Sayılan sözcüklerin arasına virgül koyarak cümleyi yeniden yaz.', ['Zeynep Can Mert ve Ela geldi.', 'Sepete elma armut ve ayva koyduk.', 'Komşulara bakkala ve bekçiye elma verdik.'])]),
      numarala([yazma('Arkadaşlarınla birlikte yaptığın bir işi anlat. Önce plan yap, sonra yaz. En az bir ünlem cümlesi kullan.', ['Ne yaptınız?', 'Kim nasıl yardım etti?', 'İş bitince ne hissettiniz?'], 12)]),
    ] },
    'hafta-04': { unite: 2, hafta: 4, baslik: 'Pamuk\'un Su Kabı', konu: 'Değerlerimizle varız · Kesme işareti', sayfalar: () => [
      metin({ baslik: 'Pamuk\'un Su Kabı', resimler: ['kedi', 'sut'], tahmin: 'Sence Pamuk kim olabilir?', paragraflar: [
        'Ali\'nin doğum gününde kapı çaldı. Teyzesi elinde bir sepetle içeri girdi. Sepetin içinde bembeyaz bir kedi yavrusu vardı.',
        '– Adı Pamuk olsun! dedi Ali sevinçle.',
        'Annesi gülümsedi:',
        '– Pamuk artık senin sorumluluğunda. Her sabah mamasını ve suyunu vermeyi unutma.',
        'İlk günler Ali hiç unutmadı. Okula gitmeden önce Pamuk\'un kabını tazeledi, akşamları onunla ip oyunu oynadı. Bir sabah ise geç uyandı. Aceleyle giyindi, çantasını kaptı ve okula koştu.',
        'Öğle teneffüsünde aklına birden Pamuk geldi. “Suyunu verdim mi?” diye düşündü. Bütün gün için için üzüldü.',
        'Eve döner dönmez mutfağa koştu. Su kabı bomboştu. Pamuk, kabın yanında miyavlayarak bekliyordu. Ali kabı hemen doldurdu. Pamuk suyu içtikçe Ali\'nin gözleri doldu.',
        'O akşam Ali bir kâğıda büyük harflerle “PAMUK\'UN SUYU” yazdı ve buzdolabının kapağına yapıştırdı. Artık her sabah önce o kâğıda, sonra Pamuk\'a bakıyor.',
      ] }),
      numarala([harita(), sirala(['Teyzesi Ali\'ye bir kedi yavrusu getirdi.', 'Ali bir sabah geç uyandı.', 'Ali eve gelince boş su kabını gördü.', 'Ali buzdolabına bir not yapıştırdı.'], 41),
        sozcuk([['Pamuk artık senin <u>sorumluluğunda</u>.', ['bakımı sana ait', 'oyuncağın', 'komşunun']], ['Okula gitmeden önce Pamuk\'un kabını <u>tazeledi</u>.', ['kırdı', 'yeniden doldurdu', 'sakladı']]])]),
      numarala([dogruYazim('Kişi, hayvan ve yer adlarına gelen ekler kesme işaretiyle (\') ayrılır. Doğru yazılmış balonu boya.', [['Ali\'nin', 'Alinin'], ['Pamuk\'a', 'Pamuka'], ['İzmir\'den', 'İzmirden'], ['kedinin', 'kedi\'nin']], 43),
        yeniden('Cümleleri kesme işaretini doğru kullanarak yeniden yaz.', ['Zeynepin kedisi çok tatlı.', 'Yarın Ankaraya gideceğiz.', 'Bu top Mertin topu.']),
        soru(['Ali\'nin yaptığı not ona nasıl yardım etti?'])]),
      numarala([yazma('Senin de bir sorumluluğun var mı? (Çiçek sulamak, oyuncak toplamak, kardeşine yardım…) Onu anlatan bir yazı yaz.', ['Sorumluluğun ne?', 'Bunu ne zaman, nasıl yapıyorsun?', 'Unutursan ne olur?'], 12)]),
    ] },
    'hafta-05': { unite: 2, hafta: 5, baslik: 'Dedemin Eski Saati', konu: 'Değerlerimizle varız · Zıt anlam, büyük harf', sayfalar: () => [
      metin({ baslik: 'Dedemin Eski Saati', resimler: ['saat', 'gozluk'], tahmin: 'Eski bir saat sence neden değerli olabilir?', paragraflar: [
        'Dedemin cebinde eski, yuvarlak bir saat vardır. Kapağı altın sarısı, camı biraz çiziktir. Dedem onu her sabah özenle kurar.',
        'Bir gün dayanamayıp sordum:',
        '– Dede, bu saat çok eski. Neden yenisini almıyorsun?',
        'Dedem saati avucuma bıraktı. Saat küçüktü ama ağırdı. Tik takları yavaş ve sakindi.',
        '– Bu saati bana babam vermişti, dedi. Ben gençken o yaşlıydı. Şimdi ben yaşlıyım, sen gençsin. Saat hep aynı. Bazı şeyler eskidikçe değerlenir.',
        'Sonra kapağını açıp içini gösterdi. Büyük çarklar yavaş, küçük çarklar hızlı dönüyordu.',
        '– Bak, dedi. Biri hızlı, biri yavaş ama hepsi birlikte çalışıyor. Aile de böyledir. Büyükler küçüklere yol gösterir, küçükler büyüklere neşe getirir.',
        'O günden sonra dedemin saatine başka gözle baktım. Akşam sofrada dedem söze başlayınca hepimiz susup onu dinledik. Çünkü bilgi de o saat gibi büyüklerden küçüklere geçiyordu.',
      ] }),
      numarala([harita(), dogruYanlis(['Dedenin saati yepyeni.', 'Saat dedeye babasından kalmıştı.', 'Saatin içindeki küçük çarklar hızlı dönüyordu.', 'Akşam sofrada herkes aynı anda konuştu.']),
        soru(['Dede "Bazı şeyler eskidikçe değerlenir." derken ne anlatmak istedi?', 'Senin evinde büyüklerden kalan bir eşya var mı? Nedir?'])]),
      numarala([domino('Zıt anlam dominosu! Her taşın boş yarısına zıt anlamlısını yaz. Sözcükleri metinde bul.', ['eski', 'küçük', 'yavaş', 'genç', 'ağır', 'açık'], ['hafif', 'yeni', 'kapalı', 'hızlı', 'yaşlı', 'büyük']),
        yeniden('Cümle başları ve kişi, yer adları büyük harfle başlar. Yanlışları düzelterek yeniden yaz.', ['dedem saati kurdu.', 'ayşe ile emre parka gitti.', 'yazın antalya\'ya gideceğiz.'])]),
      numarala([yazma('Ailendeki bir büyüğünü (dede, nine, teyze…) anlatan bir yazı yaz. Ondan öğrendiğin bir şeyi de ekle.', ['Kimi anlatacaksın?', 'Nasıl biri? (iki özelliği)', 'Ondan ne öğrendin?'], 12)]),
    ] },
    'hafta-06': { unite: 3, hafta: 6, baslik: 'Selanikli Mustafa', konu: 'Atatürk ve çocuk · Büyük harf (kişi ve yer adları)', sayfalar: () => [
      metin({ baslik: 'Selanikli Mustafa', resimler: ['kitap', 'okul'], tahmin: 'Sence Mustafa kim olabilir? Nerede yaşamış olabilir?', paragraflar: [
        'Yıl 1881. Selanik\'te, denize bakan üç katlı pembe bir evde bir bebek dünyaya geldi. Annesi Zübeyde Hanım ile babası Ali Rıza Efendi ona Mustafa adını verdi.',
        'Mustafa büyüdükçe çok meraklı bir çocuk oldu. Kuşların nereye uçtuğunu, gemilerin neden batmadığını sorar dururdu. Okula başlama zamanı geldiğinde evde tatlı bir tartışma çıktı. Annesi onun mahalledeki eski okula gitmesini istiyordu. Babası ise yeni yöntemlerle ders veren Şemsi Efendi Okulu\'nu seçmişti.',
        '– Oğlumuz yeni bilgileri öğrensin, dünyayı tanısın, diyordu babası.',
        'Mustafa önce mahalle okuluna başladı. Birkaç gün sonra babası onu Şemsi Efendi Okulu\'na yazdırdı. Burada sıralarda oturuluyor, yazı tahtaya yazılıyordu. Mustafa her gün okula koşarak gitti.',
        'Yıllar geçti. Mustafa askerî okulda okurken matematik dersinde öyle başarılı oldu ki öğretmeni ona yeni bir ad verdi: Kemal. Kemal, “olgun, mükemmel” demekti.',
        'O meraklı çocuk büyüyünce ülkesini kurtaracak, Türkiye Cumhuriyeti\'ni kuracaktı. Biz onu bugün sevgiyle Atatürk diye anıyoruz.',
      ] }),
      numarala([kimlik('Mustafa\'nın kimlik kartını metinden bulduğun bilgilerle doldur.', ['Doğduğu yıl:', 'Doğduğu şehir:', 'Annesinin adı:', 'Babasının adı:', 'Gittiği okul:', 'Öğretmeninin verdiği ad:'], 'kitap'),
        eslestir('Neden ne oldu? Nedeni sonucuyla çizgiyle eşleştir.', [['Babası yeni bilgiler öğrensin istedi,', 'öğretmeni ona Kemal adını verdi.'], ['Mustafa matematikte çok başarılıydı,', 'onu Şemsi Efendi Okulu\'na yazdırdı.'], ['Mustafa çok meraklıydı,', 'her şeyi sorar dururdu.']], 61),
        sozcuk([['Evde <u>tatlı bir tartışma</u> çıktı.', ['kavga, dövüş', 'kırıcı olmayan fikir ayrılığı', 'şeker yemek']], ['Biz onu bugün sevgiyle <u>anıyoruz</u>.', ['hatırlıyoruz, düşünüyoruz', 'unutuyoruz', 'arıyoruz']]])]),
      numarala([yeniden('Kişi ve yer adları büyük harfle başlar. Yanlışları düzelterek cümleleri yeniden yaz.', ['mustafa selanik\'te doğdu.', 'annesi zübeyde hanım çok sevecendi.', 'atatürk, türkiye cumhuriyeti\'ni kurdu.']),
        dogruYanlis(['Mustafa, İzmir\'de doğdu.', 'Babası Şemsi Efendi Okulu\'nu seçti.', 'Kemal adını ona annesi verdi.', 'Mustafa okula koşarak giderdi.'])]),
      numarala([yazma('Mustafa çok meraklı bir çocuktu. Sen en çok neyi merak ediyorsun? Merakını anlatan bir yazı yaz.', ['Neyi merak ediyorsun?', 'Bunu nasıl öğrenebilirsin?', 'Öğrenince ne yapmak istersin?'], 12)]),
    ] },
    'hafta-07': { unite: 3, hafta: 7, baslik: 'Cumhuriyet Sabahı', konu: 'Atatürk ve çocuk · Nokta (tarih, sıra sayıları)', sayfalar: () => [
      metin({ baslik: 'Cumhuriyet Sabahı', resimler: ['fener', 'balon'], tahmin: 'Resimlere bak. Sence çocuklar neye hazırlanıyor?', paragraflar: [
        '28 Ekim akşamı bizim sokakta kimse erken uyumadı. Babam balkona kocaman bir bayrak astı. Karşı komşumuz Hatice Teyze pencerelerine kırmızı beyaz balonlar bağladı. Ben de kardeşim Arda ile kâğıttan fenerler yaptık.',
        '– Bunlar ne için? diye sordu Arda. Daha beş yaşında olduğu için her şeyi merak ediyordu.',
        '– Yarın Cumhuriyet Bayramı, dedim. Atatürk, 29 Ekim 1923\'te Cumhuriyet\'i ilan etti. O günden beri ülkemizi kendi seçtiğimiz kişiler yönetiyor.',
        'Sabah okula erkenden gittik. Bahçe bayraklarla süslenmişti. Önce İstiklal Marşı\'nı hep bir ağızdan okuduk. Sonra 4. sınıflar bir şiir okudu, 2. sınıflar da halk oyunu oynadı. Ben en öndeydim. Önce heyecandan dizlerim titredi ama müzik başlayınca her şeyi unuttum.',
        'Akşam ailece fener alayına katıldık. Sokaklar ışıl ışıldı. Arda fenerini havaya kaldırdı:',
        '– Cumhuriyet çok güzelmiş abla! dedi.',
        'Haklıydı. Cumhuriyet, o gece sokağımızı aydınlatan fenerler gibi hepimizin yolunu aydınlatıyordu.',
      ] }),
      numarala([harita(), sirala(['Babası balkona bayrak astı.', 'Çocuklar okulda İstiklal Marşı\'nı okudu.', '2. sınıflar halk oyunu oynadı.', 'Aile akşam fener alayına katıldı.'], 71),
        soru(['Cumhuriyet ne zaman ilan edildi?', 'Son cümlede Cumhuriyet neye benzetiliyor?'])]),
      numarala([yeniden('Tarihleri noktayla yaz. Örnek: 29 Ekim 1923 → 29.10.1923', ['23 Nisan 1920 →', '19 Mayıs 1919 →', 'Bugünün tarihi →']),
        bosluk('Sıra bildiren sayılardan sonra nokta konur. Boşluklara rakam ve nokta yazarak doldur. Örnek: ikinci sınıf → 2. sınıf', ['Ben ___ sınıftayım.', 'Evimiz ___ katta.', 'Yarışmada ___ oldum.', 'Ayın ___ günü bayram.']),
        domino('Zıt anlam dominosu! Boş yarıya zıt anlamlısını yaz.', ['erken', 'önce', 'akşam', 'büyük', 'aydınlık', 'çabuk'], ['sonra', 'karanlık', 'geç', 'sabah', 'yavaş', 'küçük'])]),
      numarala([yazma('Okulundaki ya da sokağındaki Cumhuriyet Bayramı kutlamasını anlat.', ['Nerede kutladınız?', 'Neler yaptınız?', 'En çok neyi sevdin?'], 12)]),
    ] },
    'hafta-08': { unite: 3, hafta: 8, baslik: 'Yardım Kolisi', konu: 'Atatürk ve çocuk · Neden-sonuç ("çünkü"), büyük harf', sayfalar: () => [
      metin({ baslik: 'Yardım Kolisi', resimler: ['kutu', 'kazak'], tahmin: 'Bir koliye neler koyulur? Bu koli kime gidiyor olabilir?', paragraflar: [
        'Kızılay Haftası\'nda öğretmenimiz sınıfa büyük bir karton koli getirdi. Kolinin üstünde kırmızı bir hilal vardı.',
        '– Uzaktaki bir köyde kış çok sert geçiyor, dedi öğretmenimiz. Oradaki okulun çocukları için bir yardım kolisi hazırlayalım mı?',
        'Hepimiz ellerimizi kaldırdık. Ertesi gün koli dolmaya başladı. Ayşe yün bir atkı getirdi. Kerem hiç kullanmadığı boya kalemlerini koydu. Ben de en sevdiğim masal kitabını getirdim. Önce vermek istemedim çünkü o kitabı çok seviyordum. Sonra düşündüm: Bir kitap, rafta beklerken değil okunurken mutlu olurdu.',
        'Cuma günü koli ağzına kadar doldu. Kolinin içine bir de mektup koyduk. Mektupta “Sevgili arkadaşlarımız, bu kış sıcak geçsin!” yazıyordu.',
        'İki hafta sonra sınıfımıza bir zarf geldi. İçinden bir fotoğraf çıktı. Fotoğrafta karlı bir okul bahçesinde, atkılar takmış çocuklar gülümsüyordu. Birinin elinde benim masal kitabım vardı!',
        'O gün anladım ki yardım etmek, iki kişiyi birden mutlu ediyor: alanı da vereni de.',
      ] }),
      numarala([harita(), dogruYanlis(['Koli bir köy okulu için hazırlandı.', 'Kerem koliye atkı koydu.', 'Anlatıcı kitabını ilk başta vermek istemedi.', 'Çocuklara cevap olarak bir fotoğraf geldi.']),
        sozcuk([['Koli <u>ağzına kadar</u> doldu.', ['yarısına kadar', 'tamamen, iyice', 'hiç']], ['Kış çok <u>sert</u> geçiyor.', ['zor ve soğuk', 'yumuşak', 'kısa']]])]),
      numarala([eslestir('Neden ve sonuç! Cümle başlarını uygun sonlarıyla eşleştir.', [['Kış soğuk geçiyordu,', 'bu yüzden atkı gönderdik.'], ['Kitabımı çok seviyordum,', 'bu yüzden önce vermek istemedim.'], ['Mektubu okuyunca sevindiler,', 'bu yüzden bize fotoğraf yolladılar.']], 81),
        bosluk('"çünkü" ile cümleleri tamamla.', ['Koliye kitap koydum çünkü ___', 'Atkı getirdik çünkü ___', 'Çok mutlu oldum çünkü ___']),
        yeniden('Kurum adları da büyük harfle başlar. Düzelterek yeniden yaz.', ['kızılay, afetlerde yardım eder.', 'yeşilay, sağlığımızı korur.'])]),
      numarala([yazma('Yardım kolisindeki çocuklara bir mektup yaz. Hitap ve kapanışı unutma.', ['Hitap: (Sevgili …)', 'Onlara ne anlatacaksın?', 'Nasıl bir dilekle bitireceksin?'], 12)]),
    ] },
    'hafta-09': { unite: 3, hafta: 9, baslik: 'Saat Dokuzu Beş Geçe', konu: 'Atatürk ve çocuk · Zıt anlam, saat yazımı', sayfalar: () => [
      metin({ baslik: 'Saat Dokuzu Beş Geçe', resimler: ['saat', 'cicek'], tahmin: 'Başlıktaki saat sence neden önemli?', paragraflar: [
        '10 Kasım sabahı okul bahçesi her zamankinden sessizdi. Kimse koşmuyor, kimse bağırmıyordu. Bayrağımız direğin yarısında dalgalanıyordu.',
        'Saat dokuzu beş geçe sirenler çaldı. Bütün okul bir anda durdu. Yoldan geçen arabalar bile durmuştu. Ben de gözlerimi kapattım, ellerimi iki yanıma koydum. Sessizlik o kadar derindi ki rüzgârın yaprakları hışırdattığını duyabiliyordum.',
        'Sirenler susunca öğretmenimize sordum:',
        '– Neden herkes aynı anda durdu?',
        'Öğretmenimiz yanıma eğildi:',
        '– Atatürk, 10 Kasım 1938\'de saat dokuzu beş geçe aramızdan ayrıldı. Biz her yıl o saatte onu saygıyla anıyoruz. Bu sessizlik, ona “Seni unutmadık.” deme şeklimiz.',
        'Sınıfa dönünce öğretmenimiz bize Atatürk\'ün çocuklarla çekilmiş fotoğraflarını gösterdi. Birinde Atatürk, küçük bir kızın elinden tutmuş, gülümsüyordu. Öğretmenimiz Atatürk\'ün 23 Nisan\'ı çocuklara armağan ettiğini anlattı.',
        'O gün defterime kocaman bir karanfil çizdim. Altına da şunu yazdım: “Sen bize bir ülke bıraktın, biz de onu çok seveceğiz.”',
      ] }),
      numarala([harita(), soru(['Okul bahçesi 10 Kasım sabahı neden sessizdi?', 'Saygı duruşu ne anlama geliyor?', 'Atatürk çocuklara hangi bayramı armağan etti?']),
        sozcuk([['Bayrak direğin yarısında <u>dalgalanıyordu</u>.', ['rüzgârda inip kalkıyordu', 'yere düşüyordu', 'katlanıyordu']], ['Atatürk 23 Nisan\'ı çocuklara <u>armağan</u> etti.', ['hediye', 'ödev', 'soru']]])]),
      numarala([yeniden('Altı çizili sözcüğün yerine zıt anlamlısını koyarak cümleyi yeniden yaz.', ['Bahçe <u>sessizdi</u>.', 'Sirenler <u>uzun</u> çaldı.', 'Öğretmen yanıma <u>eğildi</u>.']),
        eslestir('Saatleri eşleştir.', [['dokuzu beş geçe', '09.05'], ['on iki', '12.00'], ['öğleden sonra üç buçuk', '15.30']], 91),
        dogruYazim('Hangisi doğru yazılmış? Balonu boya.', [['10 Kasım', '10 kasım'], ['Atatürk\'ü', 'Atatürkü'], ['saygı duruşu', 'saygıduruşu']], 93)]),
      numarala([yazma('Atatürk\'e bir mektup yaz. Ona ülkemizde bugün neler yaptığımızı anlat.', ['Hitap:', 'Ona neler anlatacaksın?', 'Kapanış cümlen:'], 12)]),
    ] },
    'hafta-10': { unite: 4, hafta: 10, baslik: 'Unutkan Sincap', konu: 'Doğada neler oluyor? · Benzetme ("gibi")', sayfalar: () => [
      metin({ baslik: 'Unutkan Sincap', resimler: ['sincap', 'ceviz'], tahmin: 'Bir sincap neyi unutmuş olabilir?', paragraflar: [
        'Sonbahar gelmişti. Ormandaki ağaçların yaprakları altın gibi sararmış, birer birer yere dökülüyordu. Kızıl kuyruklu sincap Fındık, kış hazırlığına başlamıştı.',
        'Bütün gün koşturup duruyordu. Bir palamut buluyor, toprağı eşeliyor, palamudu gömüyordu. Sonra bir ceviz buluyor, onu da başka bir yere saklıyordu.',
        '– Bu kadar çok şeyi nereye sakladığını nasıl hatırlayacaksın? diye sordu yaşlı baykuş.',
        '– Merak etme, dedi Fındık. Benim hafızam kartal gözü gibi keskindir!',
        'Kış geldi. Orman pamuk gibi bembeyaz bir karla örtüldü. Fındık acıkınca yuvasından çıktı ama palamutları gömdüğü yerlerin hepsi birbirine benziyordu. Birkaçını buldu, gerisini bulamadı. Biraz üzüldü ama ertesi gün komşusu tavşanla buldukları yemeği paylaşınca karnı doydu.',
        'Bahar geldiğinde ormanda şaşırtıcı bir şey oldu. Fındık\'ın unuttuğu yerlerden minik fidanlar çıkmıştı. Yaşlı baykuş güldü:',
        '– Gördün mü? Senin unuttukların ormana yeni ağaçlar kazandırdı.',
        'Fındık kuyruğunu kabarttı. Belki de unutkanlık her zaman kötü değildi.',
      ] }),
      numarala([harita(), sirala(['Fındık palamutları toprağa gömdü.', 'Orman karla örtüldü.', 'Fındık saklananların bir kısmını bulamadı.', 'Unutulan palamutlardan fidanlar çıktı.'], 101),
        dogruYanlis(['Hikâye ilkbaharda başlıyor.', 'Fındık\'a soruyu yaşlı baykuş sordu.', 'Fındık bütün palamutlarını buldu.', 'Unutulan palamutlar ağaca dönüştü.'])]),
      numarala([eslestir('Metindeki benzetmeleri bul! Neyin neye benzetildiğini eşleştir.', [['Sararmış yapraklar', 'pamuk gibi'], ['Karla örtülen orman', 'altın gibi'], ['Fındık\'ın hafızası', 'kartal gözü gibi']], 102),
        bosluk('Benzetmeleri tamamla. Kutudan seçebilirsin.', ['Kar ___ gibi beyazdı.', 'Tavşan ___ gibi hızlı koştu.', 'Elma ___ gibi kırmızıydı.', 'Bebeğin elleri ___ gibi yumuşaktı.'], ['süt', 'rüzgâr', 'kiraz', 'ipek']),
        soru(['Sen kendini neye benzetirsin? "… gibi" ile bir cümle yaz.'])]),
      numarala([yazma('Kış için hazırlık yapan bir hayvanı anlatan kısa bir hikâye yaz. En az bir benzetme kullan.', ['Hangi hayvan?', 'Kışa nasıl hazırlanıyor?', 'Başına ne geliyor?'], 12)]),
    ] },
    'hafta-11': { unite: 4, hafta: 11, baslik: 'Kulakla Gören Komşum', konu: 'Doğada neler oluyor? · Sınıflandırma, soru eki', sayfalar: () => [
      metin({ baslik: 'Kulakla Gören Komşum', resimler: ['kus', 'yaprak'], tahmin: 'Bir insan kulağıyla nasıl görebilir? Tahmin et.', paragraflar: [
        'Alt katımızda Selim Amca oturur. Selim Amca\'nın gözleri görmez. Elinde beyaz bir bastonla yürür, bastonunun ucuyla yoldaki taşları, basamakları bulur.',
        'Bir cumartesi sabahı onunla parka gittik. Bankta otururken birden elini kaldırdı:',
        '– Dinle! Bu bir serçe. Şu ise saksağan. Bak, ötüşleri ne kadar farklı.',
        'Ben kuşlara baktım ama hangisinin hangisi olduğunu bilmiyordum. Selim Amca ise sesten tanıyordu. Sonra yere eğildi, bir yaprak aldı, parmaklarıyla yoklayıp kokladı.',
        '– Bu bir çınar yaprağı, dedi. Kenarları dişli, beş köşeli. Sonbaharda kuru ve kıtır kıtır olur.',
        '– Siz her şeyi nasıl biliyorsunuz? diye sordum.',
        'Selim Amca gülümsedi:',
        '– Gözlerim görmüyor ama kulaklarım, burnum ve parmaklarım çok iyi görür.',
        'Gözlerimi kapattım. Rüzgârın uğultusunu, hışırdayan yaprakları duydum, ıslak toprağı kokladım. Meğer her gün geçtiğim park bana neler anlatıyormuş!',
      ] }),
      numarala([harita(), dogruYanlis(['Selim Amca beyaz bir baston kullanır.', 'Selim Amca kuşları renklerinden tanıdı.', 'Çınar yaprağının kenarları dişlidir.', 'Anlatıcı gözlerini kapatınca hiçbir şey duymadı.']),
        sozcuk([['Parmaklarıyla <u>yoklayıp</u> kokladı.', ['dokunarak inceleyip', 'atıp', 'boyayıp']], ['Rüzgârın <u>uğultusunu</u> duydum.', ['sıcaklığını', 'çıkardığı sesi', 'rengini']]])]),
      numarala([siniflandir('Duyu kutuları! Metinden aldığımız sözcükleri hangi duyuyla anladığımıza göre kutulara yaz.', [['Duyarak', '#3a86ff'], ['Dokunarak', '#12b886'], ['Koklayarak', '#f2546b']], ['serçe ötüşü', 'kuru yaprak', 'ıslak toprak', 'köpek havlaması', 'dişli kenar', 'çiçek', 'rüzgâr uğultusu', 'pürüzlü ağaç kabuğu', 'taze ekmek']),
        dogruYazim('Soru ekini doğru yazan balonu boya.', [['duydun mu?', 'duydunmu?'], ['serçe mi?', 'serçemi?'], ['görüyor musun?', 'görüyormusun?']], 113),
        yeniden('Cümleleri soru cümlesine çevir.', ['Selim Amca kuşları tanır.', 'Yaprak kurudu.'])]),
      numarala([yazma('Gözlerini kapatıp bir dakika dinle. Duyduklarını, kokladıklarını, dokunduklarını anlatan bir yazı yaz.', ['Ne duydun?', 'Ne kokladın?', 'Neye dokundun, nasıldı?'], 12)]),
    ] },
    'hafta-12': { unite: 4, hafta: 12, baslik: 'Karıncaların Köprüsü', konu: 'Doğada neler oluyor? · Görüş bildirme, benzetme', sayfalar: () => [
      metin({ baslik: 'Karıncaların Köprüsü', resimler: ['yaprak', 'yagmur'], tahmin: 'Karıncalar bir köprüyü nasıl kurmuş olabilir?', paragraflar: [
        'Yağmurdan sonra bahçede küçük bir dere oluşmuştu. Dere, karınca yuvasıyla ekmek kırıntılarının arasından şırıl şırıl akıyordu.',
        'Karıncalar derenin kıyısında durdu. Su onlara bir ırmak kadar geniş görünüyordu. En önde duran küçük karınca Mini bağırdı:',
        '– Karşıya nasıl geçeceğiz? Yiyecekler orada kaldı!',
        'Yaşlı karınca bir süre düşündü. Sonra ağaçtan düşen uzun bir yaprağı gösterdi.',
        '– Tek başımıza bu yaprağı taşıyamayız. Ama hep birlikte taşırsak dereye bir köprü kurabiliriz.',
        'Karıncalar sıraya dizildi. Kimi yaprağın ucundan, kimi ortasından tuttu. Yaprak yavaş yavaş kımıldadı ve derenin üstüne uzandı. Karıncalar tek sıra hâlinde, bir tren gibi karşıya geçti. Kırıntıları topladılar, aynı köprüden geri döndüler.',
        'Akşam yuvada Mini düşündü. Bir karınca bir yaprağı kımıldatamazdı ama yüz karınca bir köprü kurabiliyordu.',
        '– Demek ki birlikte olunca biz de büyüyoruz, dedi.',
      ] }),
      numarala([harita(), sirala(['Yağmurdan sonra bir dere oluştu.', 'Yaşlı karınca bir yaprak gösterdi.', 'Karıncalar yaprağı dereye uzattı.', 'Karıncalar kırıntılarla geri döndü.'], 121),
        soru(['Karıncalar dereyi nasıl geçti?', 'Mini\'nin son sözü ne anlatıyor?'])]),
      numarala([fikir('Metindeki düşünceye katılıyor musun? Birini daire içine al, nedenini yaz.', 'Birlikte olunca biz de büyüyoruz.'),
        eslestir('Benzetmeleri eşleştir.', [['Karıncalar tek sıra hâlinde', 'bir ırmak kadar geniş görünüyordu.'], ['Küçük dere karıncalara', 'bir tren gibi yürüdü.'], ['Uzun yaprak', 'bir köprü gibi uzandı.']], 122),
        bosluk('Kendi benzetmeni yap.', ['Karınca ___ gibi çalışkan.', 'Yağmur damlaları ___ gibi parlıyordu.'])]),
      numarala([yazma('Arkadaşlarınla birlikte başardığın bir işi anlat. Tek başına yapsaydın ne olurdu?', ['Ne yaptınız?', 'Herkes ne yaptı?', 'Tek başına olsaydı ne olurdu?'], 12)]),
    ] },
    'hafta-13': { unite: 4, hafta: 13, baslik: 'Dedemin Bahçe Defteri', konu: 'Doğada neler oluyor? · Kısaltmalar (ölçü birimleri), tablo okuma', sayfalar: () => [
      metin({ baslik: 'Dedemin Bahçe Defteri', resimler: ['domates', 'havuc'], tahmin: 'Bir bahçe defterine neler yazılır?', paragraflar: [
        'Dedemin bahçe kapısının yanında, eski bir rafta yeşil kapaklı bir defter durur. Dedem buna “bahçe defteri” der. Bahçede ne olursa o deftere yazar.',
        'Bu sonbahar defteri bana verdi.',
        '– Artık bahçenin kâtibi sensin, dedi.',
        'İlk iş fidanları ölçtük. Elma fidanı 80 cm olmuştu. Ceviz fidanı ise 45 cm\'de kalmıştı. Sonra hasadı tarttık. Bahçeden 6 kg domates, 3 kg havuç, 2 kg da biber çıktı. Hepsini defterdeki tabloya yazdım.',
        '– Dede, neden “santimetre” yerine “cm” yazıyoruz?',
        '– Uzun sözcükleri kısa yazmak için kısaltma kullanırız, dedi dedem. Santimetre cm, kilogram kg, kilometre km olur. Küçük harfle yazarız, sonuna nokta koymayız.',
        'Akşam defteri karıştırırken eski sayfalarda dedemin yıllar önce yazdığı notları buldum: “1985. Elma ağacını diktim. Boyu 50 cm.” Şimdi o ağaç evimizin çatısına uzanıyordu.',
        'Defterin yeni sayfasına kocaman yazdım: “Bu yıl ceviz fidanı diktik. Boyu 45 cm.” Kim bilir, belki bir gün benim torunum da bu notu okuyacak.',
      ] }),
      numarala([tablo('Defterdeki hasat tablosunu metne göre doldur.', ['Ürün', 'Ne kadar?'], [['domates', ''], ['havuç', ''], ['biber', ''], ['Elma fidanının boyu', ''], ['Ceviz fidanının boyu', '']]),
        soru(['Bahçede en çok hangi üründen çıktı?', 'Dede neden torununa "bahçenin kâtibi" dedi?', 'Elma ağacı hangi yıl dikilmişti?'])]),
      numarala([eslestir('Kısaltmaları eşleştir.', [['santimetre', 'kg'], ['kilogram', 'km'], ['kilometre', 'cm'], ['metre', 'm']], 131),
        dogruYazim('Hangisi doğru yazılmış? Balonu boya.', [['5 kg', '5 Kg.'], ['80 cm', '80 cm.'], ['3 km', '3 KM']], 133),
        bosluk('Cümleleri kısaltma kullanarak tamamla.', ['Okulum evime 2 kilometre uzaklıkta: ___', 'Kardeşim 18 kilogram geliyor: ___', 'Kalemim 15 santimetre: ___'])]),
      numarala([yazma('Bir bitki ya da hayvanı bir hafta boyunca gözle ve bir "gözlem defteri" yaz. Ölçüleri kısaltmayla yaz.', ['Neyi gözleyeceksin?', 'Neyi ölçeceksin? (boy, ağırlık…)', 'Ne değişti?'], 12)]),
    ] },
    'hafta-14': { unite: 5, hafta: 14, baslik: 'Kütüphanedeki Harita', konu: 'Okuma serüvenimiz · Kısaltmalar (kurum adları)', sayfalar: () => [
      metin({ baslik: 'Kütüphanedeki Harita', resimler: ['kitap', 'anahtar'], tahmin: 'Bir kütüphanede harita bulsan nereye götürür sence?', paragraflar: [
        'Bir gün okul kütüphanesinde eski bir masal kitabını açtığımda içinden katlanmış sarı bir kâğıt düştü. Bir haritaydı bu! Üstünde kırmızı kalemle şöyle yazıyordu: “Hazineyi bulmak için 3. raftan başla.”',
        'Hemen arkadaşım Deniz\'i çağırdım. 3. rafta bir sözlük vardı. Sözlüğün kapağında “TDK” yazıyordu.',
        '– TDK ne demek? diye sordu Deniz.',
        'Kütüphaneci Nur Hanım gülümsedi:',
        '– Türk Dil Kurumu. Sözcüklerimizin anlamını ve yazımını bu kurum belirler.',
        'Sözlüğün arasında ikinci bir not vardı: “Şimdi masal rafına git.” Notları izleye izleye kütüphanenin köşesindeki eski bir sandığa ulaştık. Kalbimiz küt küt atıyordu.',
        'İçinde bir sürü yeni kitap ve bir kart vardı. Kartta şöyle yazıyordu: “Tebrikler, kitap kâşifleri! Asıl hazine, okuduğunuz her kitaptır. Sevgilerle, Nur Hanım.”',
        'Deniz ile birbirimize baktık ve güldük. Bütün bu oyunu Nur Hanım hazırlamıştı!',
      ] }),
      numarala([harita(), sirala(['Masal kitabından bir harita düştü.', 'Çocuklar 3. rafta bir sözlük buldu.', 'Notları izleyip bir sandığa ulaştılar.', 'Sandıktan kitaplar ve bir kart çıktı.'], 141),
        dogruYanlis(['Haritayı Deniz buldu.', 'TDK, Türk Dil Kurumu demektir.', 'Sandığın içinde altın vardı.', 'Oyunu kütüphaneci hazırlamıştı.'])]),
      numarala([eslestir('Kurum adlarını kısaltmalarıyla eşleştir.', [['Türk Dil Kurumu', 'MEB'], ['Millî Eğitim Bakanlığı', 'TBMM'], ['Türkiye Büyük Millet Meclisi', 'TDK']], 142),
        dogruYazim('Kurum kısaltmaları büyük harfle ve noktasız yazılır. Doğrusunu boya.', [['TDK', 'T.D.K.'], ['MEB', 'Meb'], ['TBMM', 'tbmm']], 143),
        sozcuk([['Biz artık kitap <u>kâşifleriyiz</u>.', ['yeni şeyler bulan, keşfeden kişiler', 'kitap satanlar', 'kitap yırtanlar']]]),
        yeniden('Altı çizili adların yerine kısaltmasını yazarak cümleyi yeniden yaz.', ['<u>Türk Dil Kurumu</u> sözlüğü rafta.', '<u>Türkiye Büyük Millet Meclisi</u> Ankara\'dadır.'])]),
      numarala([yazma('Okuduğun en sevdiğin kitabı bir arkadaşına tanıtan bir yazı yaz.', ['Kitabın adı ve yazarı:', 'Kitapta neler oluyor?', 'Neden okumalı?'], 12)]),
    ] },
    'hafta-15': { unite: 5, hafta: 15, baslik: 'Kitap Kurdu', konu: 'Okuma serüvenimiz · Kısaltmalar (Dr., vb.), noktalama', sayfalar: () => [
      metin({ baslik: 'Kitap Kurdu', resimler: ['kitap', 'gozluk'], tahmin: '"Kitap kurdu" ne demek olabilir? Gerçek bir kurt mu?', paragraflar: [
        'Şehir kütüphanesinin en alt rafında, kalın bir ansiklopedinin içinde Mürekkep adında küçük bir kurt yaşardı. Mürekkep kitapları çok severdi. Ama okumayı değil, yemeyi!',
        'Bir gece masal kitabının köşesini kemirirken bir ses duydu:',
        '– Hey, benim prensesimi yiyorsun!',
        'Ses, kitaptaki resimden geliyordu. Mürekkep şaşkınlıkla geri çekildi. Kemirdiği köşede bir prenses resmi vardı, artık yarım kalmıştı.',
        'Ertesi gece bir bilim kitabını kemirmeye başladı. Bu kez de kitaptaki Dr. Bilge seslendi:',
        '– Dur! Yıldızlar, gezegenler, volkanlar vb. her şey bu sayfalarda. Yersen bunları kimse öğrenemez!',
        'Mürekkep düşündü. Kitapların içinde koca bir dünya varmış. Ertesi sabah kütüphaneci gözlüğünü masada unutmuştu. Mürekkep gözlüğün camının arkasına geçti ve ilk kez bir sayfayı yemek yerine okudu. Sözcükler bir merdiven gibi onu yeni yerlere çıkardı.',
        'O günden sonra Mürekkep tek bir sayfa bile kemirmedi. Her gece başka bir kitap okudu. İşte gerçek bir “kitap kurdu” böyle olunur!',
      ] }),
      numarala([harita(), soru(['Mürekkep başta kitaplarla ne yapıyordu?', 'Mürekkep\'in fikrini kim değiştirdi?', 'Sence "kitap kurdu" ne demek?']),
        sozcuk([['Mürekkep kitabın köşesini <u>kemiriyordu</u>.', ['dişleriyle azar azar yiyordu', 'boyuyordu', 'okuyordu']], ['Mürekkep <u>şaşkınlıkla</u> geri çekildi.', ['sevinçle', 'ne olduğunu anlamayarak', 'öfkeyle']]])]),
      numarala([eslestir('Kısaltmaların açılımlarını eşleştir.', [['Dr.', 've benzeri'], ['vb.', 'doktor'], ['cm', 'santimetre']], 151),
        tren('Cümle trenleri! Son vagona nokta (.), soru işareti (?) ya da ünlem (!) koy.', ['Mürekkep kitapları severdi', 'Benim prensesimi yiyorsun', 'Kitapların içinde ne var', 'Mürekkep ilk kez okudu', 'Dur, yeme', 'Sen de kitap kurdu musun'], ['.', '?', '!']),
        bosluk('"vb." kullanarak tamamla. Örnek: Sepette elma, armut vb. vardı.', ['Kütüphanede masal, şiir ___ kitaplar var.', 'Çantama kalem, silgi ___ koydum.'])]),
      numarala([yazma('Bir kitabın kahramanı olsaydın hangi kitapta olmak isterdin? Orada neler yapardın?', ['Hangi kitap?', 'Kim olurdun?', 'Neler yapardın?'], 12)]),
    ] },
  };

  const CSS = `
.t2-cizgi{display:flex;flex-direction:column}.t2-cizgi i{display:block;height:9mm;border-bottom:.45mm solid #9db4c8}
.t2-cizgi.genis i{height:11mm}
.t2-metin{background:#fff;border:.6mm solid #bcdcff;border-radius:5mm;padding:4mm 6mm 3mm;flex:1;margin-top:3mm}
.t2-metin h3{text-align:center;font-size:8.5mm;font-weight:400;margin:0 0 3mm;color:#1d4e89}
.t2-metin p{font-size:var(--fs,5.9mm);line-height:1.72;margin:0 0 1.6mm;text-indent:6mm;text-align:justify;hyphens:none}
.t2-r{display:block;width:38mm;height:38mm}.t2-r img{width:100%;height:100%;object-fit:contain}
.t2-r0{float:right;margin:0 0 2mm 4mm}.t2-r1{float:left;margin:12mm 4mm 2mm 0}
.t2-harita{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.t2-harita>div{background:#fff;border:.7mm solid;border-radius:4mm;padding:2mm 3mm}.t2-harita b{font-weight:400;font-size:5.4mm}
.t2-sira,.t2-dy,.t2-soz,.t2-soru,.t2-yeniden{display:flex;flex-direction:column;gap:2.5mm}
.t2-sira>div,.t2-dy>div{display:flex;align-items:center;gap:3mm;background:#fff;border-radius:3mm;padding:2mm 3mm}
.t2-sira i{flex:none;width:9mm;height:9mm;border-radius:50%;border:.6mm solid #4a5a50}.t2-dy i{flex:none;margin-left:auto;width:10mm;height:10mm;border-radius:2mm;border:.6mm solid #4a5a50}
.t2-sira span,.t2-dy span{font-size:5mm}
.t2-soz>div,.t2-soru>div,.t2-yeniden>div{background:#fff;border-radius:3mm;padding:2mm 3mm}
.t2-soz p,.t2-soru p,.t2-yeniden p{margin:0 0 1mm;font-size:5mm}.t2-soz u{text-decoration-thickness:.5mm;text-underline-offset:1mm;color:#c2410c}
.t2-soz>div>div{display:flex;gap:3mm;flex-wrap:wrap}.t2-soz span{border:.5mm solid #9db4c8;border-radius:999px;padding:.8mm 3.5mm;font-size:4.6mm}
.t2-tren{display:grid;grid-template-columns:1fr 1fr;gap:3mm 4mm}
.t2-tren>div{display:flex;align-items:center;background:#fff;border:.6mm solid #4a5a50;border-radius:3mm 3mm 3mm 3mm;padding:2mm 2mm 2mm 4mm;gap:2mm;position:relative;margin-bottom:2mm}
.t2-tren>div:after{content:'';position:absolute;left:6mm;right:6mm;bottom:-3mm;height:3mm;background:radial-gradient(circle at 3mm 0,#4a5a50 2mm,transparent 2.2mm) 0 0/14mm 3mm repeat-x}
.t2-tren span{font-size:5mm;flex:1}.t2-tren i{flex:none;width:10mm;height:10mm;border-radius:2mm;border:.6mm dashed #f2546b;background:#fff7f8}
.t2-isaret{display:flex;justify-content:center;gap:6mm;margin-top:2mm}.t2-isaret b{font-weight:400;font-size:8mm;width:12mm;height:12mm;display:grid;place-items:center;border-radius:50%;background:#fff;border:.6mm solid #f2546b;color:#f2546b}
.t2-balon{display:grid;grid-template-columns:1fr 1fr;gap:3mm 6mm}.t2-balon>div{display:flex;gap:3mm;justify-content:center}
.t2-balon span{background:#fff;border:.6mm solid #8b5cf6;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;padding:3mm 4mm;font-size:5mm;position:relative;min-width:30mm;text-align:center}
.t2-balon span:after{content:'';position:absolute;left:50%;bottom:-5mm;width:.4mm;height:5mm;background:#8b5cf6}
.t2-balon{padding-bottom:4mm}
.t2-hece{display:grid;grid-template-columns:1fr 1fr;gap:3mm 5mm}.t2-hece>div{display:flex;align-items:center;gap:3mm;background:#fff;border-radius:3mm;padding:2mm 3mm}
.t2-hece b{font-weight:400;font-size:5.4mm;width:26mm}.t2-hece span{display:flex;gap:1.5mm}.t2-hece i{width:16mm;height:10mm;border:.6mm solid #12b886;border-radius:2mm}
.t2-domino{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}.t2-domino>div{display:grid;grid-template-columns:1fr 1fr;background:#fff;border:.7mm solid #1f2a24;border-radius:3mm;height:16mm}
.t2-domino b{font-weight:400;font-size:5.6mm;display:grid;place-items:center;border-right:.6mm solid #1f2a24}
.t2-banka{display:flex;flex-wrap:wrap;gap:3mm;justify-content:center;margin-top:3mm}.t2-banka span{background:#fff;border:.5mm dashed #f4a100;border-radius:2mm;padding:1mm 3mm;font-size:5mm}
.t2-plan{display:flex;flex-direction:column;gap:2mm}.t2-plan>div{display:grid;grid-template-columns:8mm 52mm 1fr;align-items:end;gap:2mm;background:#fff;border-radius:3mm;padding:1mm 3mm 2mm}
.t2-plan b{width:7mm;height:7mm;border-radius:50%;background:#12b886;color:#fff;display:grid;place-items:center;font:700 4mm Andika,sans-serif;align-self:center}.t2-plan span{font-size:4.8mm;align-self:center}
.t2-esle{display:grid;grid-template-columns:1fr 1fr;gap:16mm;flex:1}.t2-esle>div{display:flex;flex-direction:column;gap:3mm;justify-content:space-around}
.t2-esle span{display:flex;align-items:center;gap:2mm;background:#fff;border-radius:3mm;padding:2.5mm 3mm;font-size:4.8mm;min-height:12mm}
.t2-esle>div:first-child span{justify-content:space-between}.t2-esle i{flex:none;width:3.5mm;height:3.5mm;border-radius:50%;background:#1f2a24}
.t2-bosluk{display:flex;flex-direction:column;gap:3mm}.t2-bosluk p{margin:0;background:#fff;border-radius:3mm;padding:2.5mm 3mm;font-size:5mm;line-height:1.6}
.t2-bosluk i{display:inline-block;min-width:42mm;border-bottom:.5mm solid #4a5a50;height:6mm;vertical-align:bottom;margin:0 1mm}
.t2-kimlik{display:grid;grid-template-columns:34mm 1fr;gap:4mm;align-items:center}.t2-kimlik>span img{width:34mm;height:34mm;object-fit:contain}
.t2-kimlik>div{display:grid;grid-template-columns:1fr 1fr;gap:2mm 4mm}.t2-kimlik>div>div{display:flex;align-items:flex-end;gap:2mm;background:#fff;border-radius:3mm;padding:2mm 3mm}
.t2-kimlik b{font-weight:400;font-size:4.6mm;white-space:nowrap}.t2-kimlik i{flex:1;border-bottom:.45mm solid #9db4c8;height:6mm}
.t2-yeniden u{text-decoration-thickness:.5mm;text-underline-offset:1mm;color:#c2410c}
.t2-sinif{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}.t2-sinif>div{background:#fff;border:.7mm solid;border-radius:4mm;padding:2mm 3mm}.t2-sinif b{font-weight:400;font-size:5.4mm}
.t2-tablo{width:100%;border-collapse:separate;border-spacing:0;background:#fff;border-radius:3mm;overflow:hidden;font-size:5mm}.t2-tablo th{background:#3a86ff;color:#fff;font-weight:400;padding:2mm}.t2-tablo td{border-bottom:.4mm solid #cfe0ff;padding:2.5mm 3mm;height:9mm}.t2-tablo td:first-child{width:55%}
.t2-fikir{background:#fff;border-radius:3mm;padding:3mm}.t2-fikir p{margin:0;font-size:5.2mm}.t2-fikir>div{display:flex;gap:6mm;margin-top:2mm}.t2-fikir span{border:.5mm solid #4a5a50;border-radius:999px;padding:1mm 4mm;font-size:4.8mm}
.t2-yaz{background:#fff;border-radius:3mm;padding:3mm 5mm 4mm;margin-top:3mm;flex:1;display:flex;flex-direction:column}.t2-yaz .t2-cizgi{flex:1;justify-content:space-evenly}
.t2-bas{display:flex;align-items:flex-end;gap:3mm;font-size:5.2mm;color:#1d4e89}.t2-bas i{flex:1;max-width:110mm;border-bottom:.5mm solid #1d4e89;height:8mm}
`;
  return { T2, CSS };
};
