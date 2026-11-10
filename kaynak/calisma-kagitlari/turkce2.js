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
  };

  const CSS = `
.t2-cizgi{display:flex;flex-direction:column}.t2-cizgi i{display:block;height:9mm;border-bottom:.45mm solid #9db4c8}
.t2-cizgi.genis i{height:11mm}
.t2-metin{background:#fff;border:.6mm solid #bcdcff;border-radius:5mm;padding:4mm 6mm 3mm;flex:1;margin-top:3mm}
.t2-metin h3{text-align:center;font-size:8.5mm;font-weight:400;margin:0 0 3mm;color:#1d4e89}
.t2-metin p{font-size:5.9mm;line-height:1.72;margin:0 0 1.6mm;text-indent:6mm;text-align:justify;hyphens:none}
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
.t2-yaz{background:#fff;border-radius:3mm;padding:3mm 5mm 4mm;margin-top:3mm;flex:1;display:flex;flex-direction:column}.t2-yaz .t2-cizgi{flex:1;justify-content:space-evenly}
.t2-bas{display:flex;align-items:flex-end;gap:3mm;font-size:5.2mm;color:#1d4e89}.t2-bas i{flex:1;max-width:110mm;border-bottom:.5mm solid #1d4e89;height:8mm}
`;
  return { T2, CSS };
};
