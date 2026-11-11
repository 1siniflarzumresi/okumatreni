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

  const mesaj = (yonerge, gelen) => etk(0, yonerge,
    `<div class="t2-mesaj"><div class="t2-tel"><div class="t2-balon-g ttkb">${gelen}</div><div class="t2-balon-y">${cizgi(4)}</div></div></div>`);

  const kiyas = (yonerge, sol, sag) => etk(0, yonerge,
    `<div class="t2-venn"><div class="ttkb"><b>${sol}</b>${cizgi(3)}</div><div class="ttkb"><b>İkisinde de</b>${cizgi(3)}</div><div class="ttkb"><b>${sag}</b>${cizgi(3)}</div></div>`);
  const yonergeYaz = (yonerge, adimSayisi) => etk(0, yonerge,
    `<div class="t2-adimlar">${Array.from({ length: adimSayisi }, (_, i) => `<div><b>${i + 1}</b><span class="ttkb">${['Önce', 'Sonra', 'Ardından', 'Daha sonra', 'En son'][i] || ''}</span>${cizgi(1)}</div>`).join('')}</div>`);

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
    'hafta-16': { unite: 5, hafta: 16, baslik: 'Damla Dedektifleri', konu: 'Okuma serüvenimiz · Kısaltmalar (L, dk., sa.)', sayfalar: () => [
      metin({ baslik: 'Damla Dedektifleri', resimler: ['kova', 'lamba'], tahmin: 'Damlaların peşine düşen dedektifler neyi araştırıyor olabilir?', paragraflar: [
        'Enerji Tasarrufu Haftası\'nda öğretmenimiz bize bir görev verdi:',
        '– Bu hafta hepiniz birer dedektifsiniz. Evinizde boşa giden suyu ve elektriği bulacaksınız.',
        'Eve gelir gelmez işe koyuldum. Önce mutfaktaki musluğu inceledim. Musluk tıp tıp damlıyordu. Altına bir kova koydum. Bir saat sonra kovada yarım litre su birikmişti! Defterime yazdım: “1 sa. → 0,5 L su”.',
        'Sonra kardeşim dişlerini fırçalarken saati tuttum. Musluk tam 2 dk. açık kaldı. Annem bu sürede yaklaşık 12 L suyun aktığını söyledi. Kardeşim bunu duyunca hemen musluğu kapattı.',
        'Akşam da salonu dolaştım. Kimsenin olmadığı odada lamba yanıyor, televizyon kendi kendine konuşuyordu.',
        'Hafta sonunda ailecek bir toplantı yaptık. Babam damlayan musluğu tamir etti. Dişlerimizi fırçalarken musluğu kapatmaya, odadan çıkarken ışığı söndürmeye karar verdik. Kapının yanına bir not astım: “Son çıkan ışığı söndürsün!”',
        'Pazartesi raporumu sınıfa okudum. Öğretmenim gülümsedi:',
        '– Tebrikler dedektif. Damlaları yakaladın, dünyayı biraz daha korudun.',
      ] }),
      numarala([tablo('Dedektif raporunu metne göre doldur.', ['Ne buldu?', 'Ne kadar?'], [['Musluk bir saatte ne kadar su damlattı?', ''], ['Diş fırçalarken musluk kaç dakika açık kaldı?', ''], ['Bu sürede ne kadar su aktı?', '']]),
        soru(['Aile toplantısında hangi kararlar alındı?', 'Sen evde neyi boşa harcanmaktan koruyabilirsin?']),
        sozcuk([['Hemen işe <u>koyuldum</u>.', ['işe başladım', 'işi bıraktım', 'uyudum']], ['Raporumu sınıfa okudum, öğretmenim beni <u>tebrik</u> etti.', ['kutladı', 'uyardı', 'cezalandırdı']]])]),
      numarala([eslestir('Kısaltmaları eşleştir.', [['litre', 'dk.'], ['dakika', 'L'], ['saat', 'sa.'], ['kilogram', 'kg']], 161),
        bosluk('Cümleleri kısaltma kullanarak yeniden yaz. Dakika ve saat kısaltmalarının sonuna nokta konur.', ['5 dakika → ___', '2 litre → ___', '1 saat → ___']),
        dogruYanlis(['Musluk yarım saatte bir kova doldurdu.', 'Kardeşi su gerçeğini duyunca musluğu kapattı.', 'Babası lambayı tamir etti.', 'Kapıya "Son çıkan ışığı söndürsün!" yazılı bir not asıldı.'])]),
      numarala([yazma('Sen de evinde bir gün "enerji dedektifi" ol. Bulduklarını anlatan bir rapor yaz.', ['Nerede boşa harcanan su ya da elektrik buldun?', 'Ne kadar? (kısaltma kullan)', 'Ne öneriyorsun?'], 12)]),
    ] },
    'hafta-17': { unite: 5, hafta: 17, baslik: 'Kitap Kulübü', konu: 'Okuma serüvenimiz · Konu ve ana fikir, kitap tanıtma', sayfalar: () => [
      metin({ baslik: 'Kitap Kulübü', resimler: ['kitap', 'kalem'], tahmin: 'Bir kitap kulübünde neler yapılır?', paragraflar: [
        'Sınıfımızda her cuma kitap kulübü toplanır. Sıralarımızı yuvarlak yapar, ortaya bir minder koyarız. Mindere oturan kişi o hafta okuduğu kitabı anlatır.',
        'Bu cuma sıra Efe\'deydi. Efe çok heyecanlıydı çünkü kitabını kendisi seçmişti. Kitabın adı “Fırtınadaki Martı”ydı.',
        '– Bu kitap, fırtınada yolunu kaybeden bir martıyı anlatıyor, dedi Efe. Martı önce çok korkuyor. Sonra deniz fenerinin ışığını görüp onu takip ediyor ve yuvasını buluyor.',
        'Öğretmenimiz sordu:',
        '– Peki yazar bize ne söylemek istiyor olabilir?',
        'Efe bir süre düşündü.',
        '– Bence şunu söylüyor: Zor zamanlarda bize yol gösteren bir ışık mutlaka vardır. Bazen o ışık bir arkadaştır, bazen annemizdir.',
        'Sınıfta bir sessizlik oldu. Sonra Zehra elini kaldırdı:',
        '– Benim ışığım ablam. Matematikte zorlandığımda bana o yardım ediyor.',
        'O gün herkes kendi “deniz fenerini” anlattı. Zil çaldığında kimse kalkmak istemedi. Efe kitabı kulüp rafına koydu. Rafın önünde şimdiden üç kişi sıraya girmişti.',
      ] }),
      numarala([harita(), eslestir('Hangisi metnin konusu, hangisi ana fikri? Eşleştir.', [['Konu (metin neyi anlatıyor?)', 'Zor zamanlarda bize yol gösteren biri mutlaka vardır.'], ['Ana fikir (yazar ne demek istiyor?)', 'Fırtınada yolunu kaybeden bir martı.']], 171),
        soru(['Senin "deniz fenerin" kim? Neden?'])]),
      numarala([kimlik('Bir kitap künyesi hazırla. En son okuduğun kitabın bilgilerini yaz.', ['Kitabın adı:', 'Yazarı:', 'Yayınevi:', 'Sayfa sayısı:', 'Ana kahramanı:', 'Puanım (1-5):'], 'kitap'),
        sozcuk([['Kitap kulübü her cuma <u>toplanır</u>.', ['bir araya gelir', 'dağılır', 'uyur']], ['Martı fenerin ışığını <u>takip</u> ediyor.', ['izliyor, peşinden gidiyor', 'söndürüyor', 'çiziyor']]]),
        tren('Son vagona uygun noktalama işaretini koy.', ['Kitabın adı ne', 'Martı yuvasını buldu', 'Yaşasın, sıra bende', 'Sen de okudun mu'], ['.', '?', '!'])]),
      numarala([yazma('Okuduğun bir kitabı kitap kulübünde anlatacaksın. Konuşmanı önceden yaz.', ['Kitap neyi anlatıyor? (konu)', 'Yazar ne demek istiyor? (ana fikir)', 'Neden okumalılar?'], 12)]),
    ] },
    'hafta-18': { unite: 5, hafta: 18, baslik: 'Kardaki Ayak İzleri', konu: 'Pekiştirme haftası · Noktalama, büyük harf, zıt anlam, kısaltma', sayfalar: () => [
      metin({ baslik: 'Kardaki Ayak İzleri', resimler: ['kar', 'kus'], tahmin: 'Karda kimin ayak izleri olabilir?', paragraflar: [
        'Sabah perdeyi açınca gözlerime inanamadım. Bütün bahçe bembeyazdı! Gece boyunca 20 cm kar yağmıştı.',
        '– Anne, kar yağmış! diye bağırdım.',
        'Hemen kalın montumu, atkımı ve eldivenlerimi giydim. Bahçeye çıktığımda kar ayaklarımın altında gıcır gıcır ötüyordu. Birden kapının önünde küçük izler gördüm. İzler çatal gibiydi ve çitin altına doğru gidiyordu.',
        'İzleri takip ettim. Çitin dibinde, karın içinde küçük bir serçe titriyordu. Kanatlarını açamıyordu. Onu yavaşça avucuma aldım. Kuş buz gibiydi ama kalbi hızlı hızlı atıyordu.',
        'İçeri koştum. Annem bir kutunun içine yumuşak bir bez serdi. Serçeyi kaloriferden biraz uzağa koyduk. Çok sıcak da olmamalıydı. Bir kapak su, biraz da ekmek kırıntısı bıraktık.',
        'Öğleden sonra kutudan bir pıtırtı geldi. Serçe ısınmış, kanatlarını çırpıyordu! Pencereyi açtık. Serçe önce pencerenin kenarına kondu, bana baktı, sonra karlı ağaca uçtu.',
        'Akşam pencerenin önüne bir kuş yemliği astık. Ertesi sabah karda yine küçük çatal izleri vardı. Ama bu kez bir değil, tam on tane!',
      ] }),
      numarala([harita(), sirala(['Çocuk karda küçük izler gördü.', 'Çitin dibinde titreyen bir serçe buldu.', 'Serçe kutuda ısındı.', 'Pencerenin önüne yemlik astılar.'], 181),
        soru(['Serçenin izleri neye benziyordu?', 'Son paragraftaki on iz ne anlatıyor?'])]),
      numarala([tren('Noktalama trenleri! Son vagona . ? ! işaretlerinden uygun olanı koy.', ['Kar yağmış', 'Bu izler kimin', 'Eyvah, kuş üşüyor', 'Annem kutu getirdi'], ['.', '?', '!']),
        yeniden('Büyük harf hatalarını düzelterek yeniden yaz.', ['serçeye minik adını verdik.', 'kar en çok erzurum\'a yağdı.']),
        domino('Zıt anlam dominosu!', ['sıcak', 'içeri', 'sabah', 'yumuşak'], ['akşam', 'sert', 'soğuk', 'dışarı']),
        bosluk('Kısaltmayla yaz.', ['20 santimetre kar: ___', '1 litre su: ___'])]),
      numarala([yazma('Karlı bir günde yaşadığın ya da hayal ettiğin bir olayı anlat. En az bir soru ve bir ünlem cümlesi kullan.', ['Ne oldu?', 'Kimler vardı?', 'Nasıl bitti?'], 12)]),
    ] },
    'hafta-19': { unite: 5, hafta: 19, baslik: 'Cebimdeki Biletler', konu: 'Hatırlatma haftası · Tarih ve saat yazımı, soru eki', sayfalar: () => [
      metin({ baslik: 'Cebimdeki Biletler', resimler: ['otobus', 'valiz'], tahmin: 'Biletler bize neyi hatırlatabilir?', paragraflar: [
        'Yarıyıl tatilinden sonra okula döndüğüm ilk gün montumun cebinden üç bilet çıktı. Her biri tatilimden küçük bir anıydı.',
        'İlk bilet bir otobüs biletiydi. Üstünde “27.01.2027 – Saat: 09.30” yazıyordu. O sabah annem, babam ve ben Bursa\'daki dedemlere gitmiştik. Yol boyunca karlı dağları saymıştım.',
        'İkinci bilet bir müze biletiydi. Bursa\'da Oyuncak Müzesi\'ne gitmiştik. Müzede yüz yıl önceki çocukların tahta arabalarını, bez bebeklerini gördüm. Dedem bir topacı gösterdi:',
        '– Benim de tıpatıp bundan vardı! dedi. Gözleri parladı.',
        'Üçüncü bilet ise teleferik biletiydi. Teleferiğe binince Uludağ\'ın tepesine çıktık. Aşağıda şehir, oyuncak bir şehir gibi küçücük görünüyordu.',
        'Öğretmenimiz “Tatilinizi bir eşyayla anlatın.” dedi. Ben de biletlerimi sırayla sıraya dizdim. Her birini gösterip neler yaşadığımı anlattım. Arkadaşlarım sorular sordu: Teleferik korkutucu mu? Müzede oyuncaklara dokunabildin mi?',
        'O gün biletlerimi atmadım. Hepsini defterimin arka kapağına yapıştırdım. Artık defterimin içinde küçük bir tatil var.',
      ] }),
      numarala([harita(), tablo('Biletlerdeki bilgileri tabloya yaz.', ['Bilet', 'Nereye?'], [['1. bilet', ''], ['2. bilet', ''], ['3. bilet', '']]),
        soru(['Dede topacı görünce neden gözleri parladı?']),
        sozcuk([['Dedemin de <u>tıpatıp</u> bundan vardı.', ['tamamen aynısı', 'biraz farklısı', 'hiç']], ['Şehir aşağıda <u>küçücük</u> görünüyordu.', ['çok küçük', 'kocaman', 'renkli']]])]),
      numarala([yeniden('Tarihleri noktayla, saatleri de noktayla yaz. Örnek: dokuz buçuk → 09.30', ['27 Ocak 2027 →', 'öğlen on iki →', 'akşam yedi →']),
        yeniden('Arkadaşların biletler hakkında sorular sordu. Soru ekini ayırarak cümleleri soruya çevir.', ['Teleferik korkutucuydu.', 'Oyuncaklara dokundun.']),
        dogruYazim('Doğru yazılmış balonu boya.', [['Uludağ\'ın', 'Uludağın'], ['müzesi', 'müzesi\''], ['Bursa\'daki', 'bursadaki']], 193)]),
      numarala([yazma('Tatilini bir eşyayla anlatan bir yazı yaz. (bilet, fotoğraf, taş, oyuncak…)', ['Eşyan ne?', 'Sana neyi hatırlatıyor?', 'O gün neler oldu?'], 12)]),
    ] },
    'hafta-20': { unite: 6, hafta: 20, baslik: 'Herkesin Bir Yıldızı Var', konu: 'Yeteneklerimizi tanıyoruz · İki nokta ve tırnak işareti', sayfalar: () => [
      metin({ baslik: 'Herkesin Bir Yıldızı Var', resimler: ['yildiz', 'gitar'], tahmin: 'Sence her insanın bir yeteneği var mıdır?', paragraflar: [
        'Öğretmenimiz panoya kocaman bir afiş astı: “Yetenek Günü – Cuma”.',
        'Sınıf bir anda karıştı. Elif keman çalacaktı, Kaan sihirbazlık yapacaktı, Ada da baş aşağı durabiliyordu. Ben ise sessizce sırama gömüldüm. Benim hiçbir yeteneğim yoktu.',
        'Teneffüste öğretmenimin yanına gittim. Ona şöyle dedim: “Ben hiçbir şeyde iyi değilim.”',
        'Öğretmenim gülümsedi: “Dün Mert ağlarken onu ilk kim fark etti?”',
        '– Ben, dedim. Kalemi kırılmıştı, ona kalemimi verdim.',
        '– Geçen hafta kimse bulamazken kayıp tavşan resmini kim buldu? Sınıfımızın çiçeklerini kim hiç unutmadan suluyor?',
        'Düşündüm. Hepsi bendim.',
        '– Bazı yetenekler sahnede parlar, dedi öğretmenim. Bazıları da her gün, sessizce. İkisi de yıldızdır.',
        'Cuma günü sıra bana geldiğinde sahneye bir saksı çiçekle çıktım. Çiçeğimi nasıl büyüttüğümü, her gün ona nasıl baktığımı anlattım. Sınıf beni alkışladı. O gün anladım: Herkesin gökyüzünde bir yıldızı vardı. Benimki de oradaydı.',
      ] }),
      numarala([harita(), dogruYanlis(['Elif yetenek gününde keman çaldı.', 'Anlatıcı başta kendini yeteneksiz sanıyordu.', 'Öğretmen ona şarkı söylemesini önerdi.', 'Anlatıcı sahneye bir çiçekle çıktı.']),
        soru(['Öğretmen "Bazı yetenekler her gün, sessizce parlar." derken ne demek istedi?', 'Senin sessiz yeteneğin ne?'])]),
      numarala([yeniden('Konuşmaları iki nokta ve tırnak işaretiyle yaz. Örnek: Annem dedi ki elini yıka. → Annem dedi ki: “Elini yıka.”', ['Öğretmenim dedi ki sen de bir yıldızsın.', 'Kaan sordu sihir nasıl yapılır', 'Elif dedi ki keman çalmayı seviyorum.']),
        dogruYazim('Hangisi doğru yazılmış? Balonu boya.', [['Ada dedi ki: “Bak!”', 'Ada dedi ki “bak!”'], ['Mert: “Teşekkürler.” dedi.', 'Mert “teşekkürler” dedi.']], 203),
        soru(['Öğretmenin sana söylediği güzel bir sözü tırnak içinde yaz.'])]),
      numarala([yazma('Sınıfındaki bir arkadaşının yeteneğini anlatan bir yazı yaz. Onun söylediği bir sözü tırnak içinde aktar.', ['Arkadaşının adı ve yeteneği:', 'Bu yeteneği nasıl fark ettin?', 'Onun bir sözü: “…”'], 12)]),
    ] },
    'hafta-21': { unite: 6, hafta: 21, baslik: 'Elif\'in Mektubu', konu: 'Yeteneklerimizi tanıyoruz · Mektup yazma (hitap, selamlama, kapanış)', sayfalar: () => [
      metin({ baslik: 'Elif\'in Mektubu', resimler: ['piyano', 'nota'], tahmin: 'Elif kime ve neden mektup yazmış olabilir?', paragraflar: [
        '15.02.2027',
        'Sevgili Babaanneciğim,',
        'Nasılsın? Kedin Tarçın iyi mi? Ben seni ve senin bahçendeki dut ağacını çok özledim.',
        'Sana bir haberim var. Okulda yetenek günü yaptık. Ben keman çaldım! Hatırlıyor musun, yazın sana ilk kez çaldığımda kemandan cırlak sesler çıkıyordu. Sen yine de alkışlamıştın. “Her gün biraz çalışırsan kemanın şarkı söyler.” demiştin. Ben de her gün yarım saat çalıştım.',
        'Sahneye çıkınca dizlerim titredi. Yayı tellere koydum, gözlerimi kapattım ve senin bana öğrettiğin “Dandini Dandini Dastana” ninnisini çaldım. Bitirince bütün sınıf ayağa kalktı. Öğretmenim gözlerinin dolduğunu söyledi.',
        'Babaanne, sen olmasaydın belki de kemanı bırakırdım. Bana inandığın için teşekkür ederim. Yaz tatilinde gelince sana yeni şarkılar çalacağım. O zamana kadar Tarçın\'ı benim için sev.',
        'Seni çok seven torunun,',
        'Elif',
      ] }),
      numarala([soru(['Elif mektubu kime yazdı?', 'Yetenek gününde ne çaldı?', 'Elif babaannesine neden teşekkür ediyor?']), sirala(['Tarih', 'Hitap', 'Selamlama ve hal hatır sorma', 'Asıl konu', 'Kapanış ve ad'], 211).replace('Olayları oluş sırasına göre numaralandır.', 'Mektubun bölümlerini mektuptaki sırasına göre numaralandır.'),
        sozcuk([['Kemandan <u>cırlak</u> sesler çıkıyordu.', ['ince ve kulak tırmalayan', 'tatlı ve yumuşak', 'hiç']]])]),
      numarala([eslestir('Mektuptan alınan satırları bölüm adlarıyla eşleştir.', [['Sevgili Babaanneciğim,', 'kapanış'], ['Nasılsın? Kedin Tarçın iyi mi?', 'tarih'], ['15.02.2027', 'hitap'], ['Seni çok seven torunun,', 'selamlama']], 212),
        bosluk('Hitap ve kapanışları tamamla.', ['Sevgili ___,', 'Değerli ___,', 'Sevgilerimle, ___', 'Görüşmek üzere, ___'])]),
      numarala([yazma('Sana bir şey öğreten birine teşekkür mektubu yaz. Tarih, hitap, selamlama, asıl konu ve kapanışı unutma.', ['Kime yazacaksın? (hitap)', 'Sana ne öğretti?', 'Nasıl bir kapanış yapacaksın?'], 12)]),
    ] },
    'hafta-22': { unite: 6, hafta: 22, baslik: 'Robot Pırıl', konu: 'Yeteneklerimizi tanıyoruz · Anlık ileti yazma', sayfalar: () => [
      metin({ baslik: 'Robot Pırıl', resimler: ['robot', 'telefon'], tahmin: 'Bir robot ne işe yarayabilir?', paragraflar: [
        'Bilim ve Teknoloji Haftası\'nda sınıfça bir proje yarışmasına katıldık. Bizim grubun fikri Defne\'den geldi:',
        '– Dedem ilaçlarını içmeyi hep unutuyor. Ona hatırlatan bir robot yapalım!',
        'Hemen işe koyulduk. Eski bir ayakkabı kutusu robotun gövdesi oldu. Gözleri için iki şişe kapağı, kolları için de pipet kullandık. Öğretmenimiz robotun içine küçük bir saat ve zil yerleştirmemize yardım etti. Saat dokuzu gösterince zil çalıyor, robotun kapağı açılıyor ve içinden bir not çıkıyordu: “İlaç zamanı!”',
        'Robotumuza Pırıl adını verdik. İlk denemede zil çalmadı. İkincisinde kapak açılmadı. Üçüncüsünde not sıkıştı. Kaan sinirlendi:',
        '– Bu iş olmayacak!',
        'Defne ise sakindi:',
        '– Mucitler de ilk seferde başaramaz. Bir daha deneyelim.',
        'Dördüncü denemede zil çaldı, kapak açıldı, not süzülerek çıktı. Hep birlikte zıpladık!',
        'Yarışmada birinci olamadık ama jüri bize “En Yararlı Fikir” ödülünü verdi. Akşam Defne\'nin dedesinden sınıfımızın mesaj grubuna bir ileti geldi: “Merhaba çocuklar! Pırıl bu sabah beni uyardı. Hepinize teşekkür ederim. Sevgiler, Rıza Dede”',
      ] }),
      numarala([harita(), sirala(['Defne dedesi için robot fikrini söyledi.', 'Çocuklar robotu kutudan yaptı.', 'Robot üç denemede çalışmadı.', 'Dördüncü denemede robot çalıştı.', 'Rıza Dede teşekkür iletisi gönderdi.'], 221),
        soru(['Kaan ile Defne başarısızlık karşısında nasıl farklı davrandı?']),
        sozcuk([['Jüri bize <u>En Yararlı Fikir</u> ödülünü verdi.', ['en çok işe yarayan fikir', 'en komik fikir', 'en kısa fikir']], ['Not kapaktan <u>süzülerek</u> çıktı.', ['yavaşça kayarak', 'yırtılarak', 'yanarak']]])]),
      numarala([fikir('Defne\'nin düşüncesine katılıyor musun?', 'Mucitler de ilk seferde başaramaz. Bir daha deneyelim.'),
        mesaj('Rıza Dede\'nin iletisine bir cevap yaz. Selamla başla, uygun bir sözle bitir.', 'Merhaba çocuklar! Pırıl bu sabah beni uyardı. Hepinize teşekkür ederim. Sevgiler, Rıza Dede')]),
      numarala([yazma('Sen bir robot icat etseydin ne işe yarardı? Robotunu anlatan bir yazı yaz.', ['Robotunun adı:', 'Neye yardım eder?', 'Nasıl çalışır?'], 12)]),
    ] },
    'hafta-23': { unite: 6, hafta: 23, baslik: 'Bir Şiirin Hikâyesi', konu: 'Yeteneklerimizi tanıyoruz · Karşılaştırma (benzerlik ve farklılık)', sayfalar: () => [
      metin({ baslik: 'Bir Şiirin Hikâyesi', resimler: ['kalem', 'kitap'], tahmin: 'Her sabah okulda hangi şiiri hep birlikte okuruz?', paragraflar: [
        'Her pazartesi sabahı okul bahçesinde hep bir ağızdan İstiklal Marşı\'nı okuruz. Peki bu şiirin nasıl yazıldığını biliyor musunuz?',
        'Yıl 1921\'di. Ülkemiz zor bir savaşın içindeydi. Ankara\'daki Meclis, milletimize güç verecek bir marş yazılması için bir yarışma açtı. Yüzlerce şiir geldi ama hiçbiri yeterince güzel bulunmadı.',
        'O sırada Ankara\'da Mehmet Akif adında bir şair vardı. Yarışmaya katılmak istemiyordu çünkü kazanana para ödülü verilecekti. Akif, vatanı için yazacağı bir şiirden para almayı doğru bulmuyordu. Arkadaşları onu çok ikna etmeye çalıştı. Sonunda kabul etti.',
        'Akif şiirini gece gündüz düşünerek yazdı. Söylenenlere göre bazı dizeleri aklına gece gelmiş, kâğıt bulamayınca odasının duvarına yazmıştı.',
        '12 Mart 1921\'de şiir Mecliste okundu. Herkes ayağa kalkıp alkışladı. İstiklal Marşı böylece millî marşımız oldu.',
        'Peki ya ödül parası? Mehmet Akif onu da almadı. Parayı, yoksul kadın ve çocuklara iş öğreten bir kuruma bağışladı.',
        'Şimdi her sabah marşımızı okurken onu da hatırlayalım: Vatanı için yazan, karşılığında hiçbir şey istemeyen bir şairi.',
      ] }),
      numarala([kimlik('Şiirin kimlik kartını doldur.', ['Şiirin adı:', 'Şairi:', 'Kabul edildiği tarih:', 'Nerede okundu?', 'Ödül parası ne oldu?', 'Ne zaman okuyoruz?'], 'kitap'),
        eslestir('Neden ne oldu? Eşleştir.', [['Ülke zor bir savaştaydı,', 'Akif önce yarışmaya katılmak istemedi.'], ['Ödül olarak para verilecekti,', 'güç verecek bir marş arandı.'], ['Şiir çok güzeldi,', 'herkes ayağa kalkıp alkışladı.']], 231),
        dogruYanlis(['İstiklal Marşı 1921\'de kabul edildi.', 'Mehmet Akif yarışmaya hemen katıldı.', 'Şiir Mecliste okunduğunda herkes alkışladı.', 'Akif ödül parasıyla kendine ev aldı.']),
        soru(['Sence Mehmet Akif neden para almak istemedi?'])]),
      numarala([kiyas('İstiklal Marşı ile okulda öğrendiğin bir şarkıyı karşılaştır. Benzer ve farklı yönlerini yaz.', 'İstiklal Marşı', 'Okul şarkım'),
        sozcuk([['Arkadaşları onu <u>ikna</u> etmeye çalıştı.', ['bir şeyi kabul ettirmek', 'kızdırmak', 'uyutmak']], ['Parayı bir kuruma <u>bağışladı</u>.', ['karşılıksız verdi', 'sakladı', 'kaybetti']]]),
        soru(['Mehmet Akif\'in hangi davranışını örnek alırsın? Neden?'])]),
      numarala([yazma('Vatanımızı ya da bayrağımızı anlatan dört dizelik kısa bir şiir yaz. Şiirine bir de ad koy.', ['Şiirinin konusu:', 'Kullanacağın güzel sözcükler:', 'Şiirinin adı:'], 10)]),
    ] },
    'hafta-24': { unite: 7, hafta: 24, baslik: 'Ters Şemsiye', konu: 'Mucit çocuk · Zıt anlam, çıkarım yapma', sayfalar: () => [
      metin({ baslik: 'Ters Şemsiye', resimler: ['semsiye', 'yagmur'], tahmin: 'Bir şemsiye ters tutulursa ne olur?', paragraflar: [
        'Okulumuzun arka bahçesinde küçük bir sebze bahçemiz var. Ama bu bahar çok kurak geçti. Domates fideleri boyunlarını bükmüş, maydanozlar sararmıştı. Hortumla sulamak için de su faturası çok yüksek geliyordu.',
        'Bir öğleden sonra ani bir yağmur başladı. Herkes şemsiyesinin altına sığındı. Ben de koşarken rüzgâr şemsiyemi ters çevirdi. Şemsiye bir anda kocaman bir kâseye döndü ve içi suyla dolmaya başladı!',
        'Durup baktım. Kafamda bir ampul yandı.',
        'Ertesi gün öğretmenime fikrimi anlattım. Hep birlikte çalıştık. Eski bir şemsiyeyi ters çevirip ucuna bir delik açtık. Deliğe bir hortum taktık, hortumun ucunu da bahçedeki büyük bir bidona yerleştirdik.',
        'Bir hafta sonra yağmur yine yağdı. Ters şemsiye yağmuru topladı, su hortumdan bidona aktı. Bidon ağzına kadar doldu! O suyla bütün bahçeyi suladık.',
        'Bir ay sonra domateslerimiz kıpkırmızı olmuştu. Okul müdürümüz icadımızı görünce bahçeye üç ters şemsiye daha kurdurdu.',
        'Şimdi yağmur yağınca herkes kaçışıyor, ben ise sevinçle pencereden şemsiyelerimizi izliyorum. Belki de yağmur, bir şemsiyenin ters dönmesini bekliyordu.',
      ] }),
      numarala([harita(), sirala(['Bahçe kurak geçti, fideler sarardı.', 'Rüzgâr şemsiyeyi ters çevirdi.', 'Çocuklar şemsiyeye hortum taktı.', 'Bidon yağmur suyuyla doldu.', 'Domatesler kızardı.'], 241),
        soru(['"Kafamda bir ampul yandı." ne demek?'])]),
      numarala([yeniden('Altı çizili sözcüğün zıt anlamlısını kullanarak cümleyi yeniden yaz.', ['Bu bahar çok <u>kurak</u> geçti.', 'Bidon <u>doldu</u>.', 'Herkes yağmurdan <u>kaçışıyor</u>.']),
        eslestir('Metinden çıkarım yap: Hangi ipucu neyi gösteriyor? Eşleştir.', [['Fideler boyun bükmüştü.', 'İcat çok işe yaramıştı.'], ['Müdür üç şemsiye daha kurdurdu.', 'Bitkiler susuz kalmıştı.'], ['Su faturası yüksek geliyordu.', 'Hortumla sulamak pahalıydı.']], 242),
        sozcuk([['Bu bahar çok <u>kurak</u> geçti.', ['yağmursuz', 'soğuk', 'kısa']], ['Domates fideleri <u>boyunlarını bükmüştü</u>.', ['susuzluktan solmuştu', 'çok büyümüştü', 'meyve vermişti']]])]),
      numarala([yazma('Evde ya da okulda çözülmesi gereken bir sorun düşün. Onu çözen bir icat tasarla ve anlat.', ['Sorun ne?', 'İcadın nasıl çalışır?', 'Kimin işine yarar?'], 12)]),
    ] },
    'hafta-25': { unite: 7, hafta: 25, baslik: 'Gezici Kütüphane', konu: 'Mucit çocuk · Karşılaştırma, zıt anlam', sayfalar: () => [
      metin({ baslik: 'Gezici Kütüphane', resimler: ['otobus', 'kitap'], tahmin: 'Bir otobüs kütüphane olabilir mi?', paragraflar: [
        'Kuzenim Yusuf dağların arasında, küçük bir köyde yaşıyor. Köyünde bir kütüphane yok. En yakın kütüphane, otobüsle bir saat uzaklıktaki ilçede.',
        'Kütüphaneler Haftası\'nda Yusuf\'tan bir mesaj geldi: “Bugün köyümüze bir kütüphane geldi! Hem de tekerlekli!”',
        'Gezici kütüphane, içi raflarla dolu kocaman bir otobüstü. Her ay bir köye uğruyordu. Çocuklar sırayla içeri giriyor, istedikleri kitabı seçiyor, bir ay sonra getirip yenisini alıyordu.',
        'Hafta sonu ben de Yusuf\'un köyüne gittim. Otobüs-kütüphaneyi görünce şaşırdım. Bizim şehirdeki kütüphane kocaman, sessiz ve serindir. Kitaplar sayılamayacak kadar çoktur. Gezici kütüphane ise küçük, neşeli ve kalabalıktı. Kitap sayısı azdı ama herkes birbirine en sevdiği kitabı öneriyordu.',
        'Kütüphaneci Gül Abla bana döndü:',
        '– Kitaplar okunmak için yazılır. Okuyucu kitaba gelemiyorsa kitap okuyucuya gider.',
        'Akşam Yusuf seçtiği kitabı yastığının altına koydu. Ben de kendi kitabımı ona hediye ettim. Bir ay sonra otobüs yeniden geldiğinde Yusuf\'un kütüphaneye vereceği bir kitap daha olacaktı.',
      ] }),
      numarala([harita(), dogruYanlis(['Yusuf\'un köyünde büyük bir kütüphane var.', 'Gezici kütüphane her ay bir köye uğruyor.', 'Şehirdeki kütüphane kalabalık ve gürültülüdür.', 'Anlatıcı Yusuf\'a bir kitap hediye etti.']),
        soru(['Gül Abla "Kitap okuyucuya gider." derken ne demek istiyor?'])]),
      numarala([kiyas('Şehirdeki kütüphane ile gezici kütüphaneyi karşılaştır.', 'Şehir kütüphanesi', 'Gezici kütüphane'),
        domino('Zıt anlam dominosu! Sözcükleri metinde bul, zıttını yaz.', ['kocaman', 'sessiz', 'çok', 'uzak', 'serin', 'kalabalık'], ['yakın', 'tenha', 'küçük', 'gürültülü', 'sıcak', 'az'])]),
      numarala([yazma('Gezici kütüphaneyi kullanan çocuklara bir kitap öner. Onlara kısa bir mektup yaz.', ['Hitap:', 'Önerdiğin kitap ve nedeni:', 'Kapanış:'], 12)]),
    ] },
    'hafta-26': { unite: 7, hafta: 26, baslik: 'Hezarfen\'in Kanatları', konu: 'Mucit çocuk · Gerçek ve hayal, benzetme', sayfalar: () => [
      metin({ baslik: 'Hezarfen\'in Kanatları', resimler: ['kus', 'kopru'], tahmin: 'İnsanlar uçmayı ilk kez nasıl denemiş olabilir?', paragraflar: [
        'Çok eskiden, uçakların henüz icat edilmediği zamanlarda İstanbul\'da Ahmet Çelebi adında meraklı bir adam yaşardı. Halk ona “Hezarfen” derdi. Hezarfen, “bin bilgili” demekti.',
        'Hezarfen saatlerce kuşları izlerdi. Kanatlarını nasıl açtıklarını, rüzgârı nasıl yakaladıklarını defterine çizerdi. Bir gün kendi kendine sordu: “Kuşlar uçabiliyorsa insan neden uçamasın?”',
        'Tahtadan ve kumaştan kocaman kanatlar yaptı. Önce küçük tepelerden atlayarak denedi. Kimi zaman düştü, kimi zaman dizlerini yaraladı ama vazgeçmedi.',
        'Eski bir gezginin anlattığına göre sonunda büyük gün geldi. Hezarfen, İstanbul\'daki yüksek Galata Kulesi\'nin tepesine çıktı. Kanatlarını açtı ve kendini rüzgâra bıraktı. Denizin üstünden bir martı gibi süzüldü ve karşı kıyıya, Üsküdar\'a indi!',
        'Aşağıda toplanan halk şaşkınlıktan donup kalmıştı.',
        'Bugün bu hikâyenin her ayrıntısının gerçek olup olmadığını tam bilmiyoruz. Ama Hezarfen\'in merakı ve cesareti hâlâ bize ilham veriyor. Yüzlerce yıl sonra insanlar gerçekten uçtu. Belki de her uçağın içinde biraz Hezarfen\'in hayali vardır.',
      ] }),
      numarala([harita(), soru(['Halk Ahmet Çelebi\'ye neden "Hezarfen" diyordu?', 'Hezarfen kanatlarını yapmadan önce neyi inceledi?', 'Hezarfen\'in hangi özelliğini örnek alırsın?']),
        sozcuk([['Hezarfen\'in merakı bize <u>ilham</u> veriyor.', ['bir şey yapma isteği ve fikri', 'korku', 'uyku']]])]),
      numarala([siniflandir('Gerçek mi, hayal mi? Sözcükleri ve cümleleri doğru kutuya yaz.', [['Gerçek', '#12b886'], ['Hayal', '#8b5cf6'], ['Bilmiyoruz', '#f4a100']], ['Kuşlar kanatlarıyla uçar.', 'Kedi bulutla konuştu.', 'Uçaklar insanları taşır.', 'Hezarfen\'in uçuşunun her ayrıntısı', 'Ağaç şarkı söyledi.']),
        bosluk('Benzetmeleri tamamla.', ['Hezarfen denizin üstünden ___ gibi süzüldü.', 'Kanatları ___ gibi genişti.', 'Halk ___ gibi donup kaldı.'])]),
      numarala([yazma('Sen de uçabilseydin nereye uçardın? Yukarıdan neler görürdün? Hayal gücünü kullanarak yaz.', ['Nereye uçardın?', 'Yukarıdan neler görürdün?', 'Nasıl hissederdin?'], 12)]),
    ] },
    'hafta-27': { unite: 7, hafta: 27, baslik: 'Kâğıt Uçak Yarışması', konu: 'Mucit çocuk · Yönerge yazma, zıt anlam', sayfalar: () => [
      metin({ baslik: 'Kâğıt Uçak Yarışması', resimler: ['ucak', 'kagit'], tahmin: 'Bir kâğıt uçağı en uzağa ne uçurur?', paragraflar: [
        'Beden eğitimi dersinde öğretmenimiz bir yarışma düzenledi: En uzağa uçan kâğıt uçak kazanacaktı!',
        'Herkes hemen bir kâğıt kaptı. Arda uçağını çok hızlı katladı. Kanatları eğri büğrü oldu. Fırlattı ama uçak iki adım ötede burnunun üstüne düştü.',
        'Selin ise acele etmedi. Önce kâğıdı tam ortasından ikiye katladı ve açtı. Sonra üst köşeleri ortadaki çizgiye doğru katladı. Ardından kenarları bir kez daha içe katlayıp uçağın burnunu sivriltti. En son da kanatları iki yana açtı ve hepsini sıkıca bastırdı.',
        '– Neden bu kadar yavaş yapıyorsun? diye sordu Arda.',
        '– Çünkü katlar düzgün olursa uçak dengeli uçar, dedi Selin.',
        'Selin uçağını fırlattı. Uçak salonun bir ucundan öbür ucuna süzülerek gitti ve duvarın dibine yumuşakça kondu. Hepimiz alkışladık.',
        'Arda üzülmedi. Selin\'in yanına oturdu:',
        '– Bana da adım adım gösterir misin?',
        'Bu kez Arda yavaş ve dikkatli katladı. İkinci uçağı neredeyse Selin\'inki kadar uzağa uçtu. Öğretmenimiz gülümsedi:',
        '– Bugün iki şey öğrendik: Acele işe şeytan karışır ve iyi bir yönerge herkesi kazanan yapar.',
      ] }),
      numarala([harita(), sirala(['Kâğıdı ortadan ikiye katla ve aç.', 'Üst köşeleri ortadaki çizgiye katla.', 'Kenarları bir kez daha içe katla.', 'Kanatları iki yana aç ve bastır.'], 271).replace('Olayları oluş sırasına göre numaralandır.', 'Selin\'in uçak yapma adımlarını sıraya koy.'),
        soru(['Arda\'nın uçağı neden kısa uçtu?', '"Acele işe şeytan karışır." sözü ne anlatır?'])]),
      numarala([yonergeYaz('Bildiğin bir şeyin nasıl yapıldığını adım adım yaz. (dişini fırçalamak, sandviç hazırlamak, çiçek dikmek…)', 5),
        domino('Zıt anlam dominosu!', ['hızlı', 'eğri', 'uzak', 'yumuşak', 'üzgün', 'önce'], ['sonra', 'yakın', 'mutlu', 'yavaş', 'sert', 'düz'])]),
      numarala([yazma('Bir yarışmaya katıldığın günü anlat. Kazanmak mı daha önemli, öğrenmek mi? Düşünceni de yaz.', ['Hangi yarışma?', 'Neler oldu?', 'Ne öğrendin?'], 12)]),
    ] },
    'hafta-28': { unite: 8, hafta: 28, baslik: 'Dünya Çocukları Bizde', konu: 'Kültür hazinemiz · Görüş bildirme, iki nokta ve tırnak', sayfalar: () => [
      metin({ baslik: 'Dünya Çocukları Bizde', resimler: ['ucak', 'hediye'], tahmin: '23 Nisan\'da evine başka ülkeden bir çocuk gelse ne yapardın?', paragraflar: [
        'Bu yıl 23 Nisan\'da evimizde bir misafirimiz vardı: Japonya\'dan gelen Hana. Hana, şehrimizdeki çocuk şenliğine katılmak için gelmişti ve bir hafta bizde kalacaktı.',
        'İlk akşam biraz çekingendik. Hana Türkçe bilmiyordu, ben de Japonca. Ama annem sofraya mercimek çorbası koyunca Hana kaşığını aldı, tadına baktı ve parmağını kaldırdı. Hepimiz güldük. Bazen anlaşmak için ortak bir dil gerekmiyordu.',
        'Ertesi gün Hana bana kâğıttan turna yapmayı öğretti. Kâğıdı katladıkça katladı, sonunda avucunda kanatlı bir kuş belirdi. Ben de ona hamur açıp gözleme yapmayı gösterdim. Unlu ellerimizle birbirimize baktık ve kahkahalarla güldük.',
        '23 Nisan sabahı stadyumda farklı ülkelerden gelen yüzlerce çocuk vardı. Herkes kendi ülkesinin dansını yaptı. Hana kimonosuyla dans etti, ben de halk oyunu oynadım. Sonunda bütün çocuklar el ele tutuşup kocaman bir halka oluşturduk.',
        'Hana dönerken bana bir turna verdi. Babamın telefonundan çevirdiği bir not da yazmıştı: “Arkadaşlığımız bu kuş gibi uzaklara uçsun.”',
        'O turna şimdi masamın üstünde duruyor. Her baktığımda düşünüyorum: Dünyanın öbür ucunda bir arkadaşım var.',
      ] }),
      numarala([harita(), dogruYanlis(['Hana Japonya\'dan geldi.', 'Hana ilk akşam çorbayı beğenmedi.', 'Anlatıcı Hana\'ya gözleme yapmayı gösterdi.', 'Çocuklar sonunda el ele halka oldu.']),
        soru(['"Bazen anlaşmak için ortak bir dil gerekmiyordu." cümlesini metinden bir örnekle açıkla.'])]),
      numarala([fikir('Bu düşünceye katılıyor musun? Nedenini yaz.', 'Farklı ülkelerden çocuklar birbirleriyle arkadaş olabilir.'),
        yeniden('Konuşmaları iki nokta ve tırnak işaretiyle yeniden yaz.', ['Hana dedi ki arkadaşlığımız uçsun.', 'Annem sordu çorba güzel mi']),
        soru(['Hana\'ya ülkemizi tanıtmak için ne gösterirdin?'])]),
      numarala([yazma('Başka bir ülkeden gelen bir çocuğu evinde ağırlasan ona neler gösterir, neler öğretirdin?', ['Ona hangi yemeği tattırırdın?', 'Hangi oyunu öğretirdin?', 'Nereyi gezdirirdin?'], 12)]),
    ] },
    'hafta-29': { unite: 8, hafta: 29, baslik: 'Ninemin Sandığı', konu: 'Kültür hazinemiz · Atasözü, sınıflandırma', sayfalar: () => [
      metin({ baslik: 'Ninemin Sandığı', resimler: ['nine', 'kutu'], tahmin: 'Eski bir sandıkta neler saklanır?', paragraflar: [
        'Ninemin yatak odasında, köşede ceviz ağacından yapılmış eski bir sandık durur. Sandığın kapağında oymalı çiçekler vardır. Ninem onu açtığında içeriden lavanta kokusu yayılır.',
        'Bir gün ninem beni yanına çağırdı. Sandığı açtı ve içindekileri tek tek çıkardı. Önce renkli bir kilim çıktı. Ninem onu kendi annesiyle birlikte dokumuştu. Kilimin üstündeki her şeklin bir anlamı vardı. Koç boynuzu güç, el ele tutuşan şekiller birlik demekti.',
        'Sonra kenarları oyalı bir yazma çıktı. Oyalar o kadar inceydi ki minik çiçeklerin yaprakları bile görünüyordu.',
        '– Bunu yapmak ne kadar sürdü nine? diye sordum.',
        '– Bütün bir kış, dedi ninem. Her akşam sobanın başında birkaç çiçek işledim.',
        'En dipten yün çoraplar, işlemeli bir masa örtüsü ve bir de bakır kaşık çıktı. Ninem hepsine tek tek dokundu. Sanki her birinde bir anısı saklıydı.',
        '– Bunlar bizim kültür hazinemiz, dedi. Atalarımız “Emek olmadan yemek olmaz.” der. Bu sandıktaki her şey, sabırla verilen emeğin ürünüdür.',
        'O akşam ninemden oya yapmayı öğrenmeye başladım. Daha ilk çiçeğimi bile bitiremedim ama ninem gülümsedi:',
        '– Damlaya damlaya göl olur, yavrum.',
      ] }),
      numarala([harita(), tablo('Sandıktan çıkanları ve özelliklerini yaz.', ['Sandıktan çıkan', 'Özelliği'], [['kilim', ''], ['yazma', ''], ['', ''], ['', '']]),
        soru(['Kilimdeki şekiller ne anlatıyordu?'])]),
      numarala([eslestir('Atasözlerini anlamlarıyla eşleştir.', [['Emek olmadan yemek olmaz.', 'Küçük çabalar birikince büyük sonuç verir.'], ['Damlaya damlaya göl olur.', 'Çalışmadan bir şey kazanılmaz.'], ['Acele işe şeytan karışır.', 'Aceleyle yapılan iş bozuk olur.']], 291),
        siniflandir('Sandıktaki eşyaları sınıflandır.', [['Giyecek', '#3a86ff'], ['Evde kullanılan', '#12b886'], ['Süs', '#f2546b']], ['yün çorap', 'kilim', 'oyalı yazma', 'bakır kaşık', 'masa örtüsü', 'işlemeli yastık']),
        bosluk('Atasözlerini tamamla.', ['Emek olmadan ___ olmaz.', 'Damlaya damlaya ___ olur.', 'Acele işe ___ karışır.'])]),
      numarala([yazma('Ailende saklanan eski bir eşyayı anlat. Bilmiyorsan bir büyüğüne sor.', ['Eşya ne?', 'Kime aitti, nereden geldi?', 'Senin için anlamı ne?'], 12)]),
    ] },
    'hafta-30': { unite: 8, hafta: 30, baslik: 'Anneannemin Tarif Defteri', konu: 'Kültür hazinemiz · Yönerge (tarif) yazma, sıralama', sayfalar: () => [
      metin({ baslik: 'Anneannemin Tarif Defteri', resimler: ['tencere', 'un'], tahmin: 'Bir tarif defterinde neler yazar?', paragraflar: [
        'Anneler Günü\'ne bir hafta kala babamla gizli bir plan yaptık: Anneme, onun çocukluğundan bir tat hazırlayacaktık.',
        'Babam dolaptan sararmış sayfalı, eski bir defter çıkardı. Anneannemin tarif defteriydi bu. Sayfaların arasında kurumuş bir defne yaprağı, kenarlarında da un lekeleri vardı. En çok kullanılan sayfa hemen açıldı: “İrmik Helvası”.',
        'Tarifi birlikte okuduk:',
        '“Önce tereyağını tencerede erit. Sonra irmiği ekle ve kısık ateşte, rengi kızarana kadar karıştır. Ardından ayrı bir tencerede sütü ve şekeri ısıt. Sıcak sütü yavaş yavaş irmiğe dök. En son kapağını kapat ve on dakika demlenmeye bırak.”',
        'Tarifin altında anneannemin el yazısıyla küçük bir not vardı: “Karıştırırken acele etme, sevgiyle karıştır.”',
        'Babam ocağı yaktı, ben de tahta kaşıkla irmiği karıştırdım. Kolum yoruldu ama vazgeçmedim. Mutfağı mis gibi bir koku sardı.',
        'Pazar sabahı annemin önüne bir kâse helva koyduk. Annem bir kaşık aldı, gözlerini kapattı. Sonra gözleri doldu.',
        '– Bu tam annemin helvası, dedi. Bunu nasıl yaptınız?',
        'Babamla göz göze geldik ve güldük. Sırrımız, anneannemin defterindeki o küçük nottaydı.',
      ] }),
      numarala([harita(), sirala(['Tereyağını erit.', 'İrmiği ekle ve kızart.', 'Sütü ve şekeri ısıt.', 'Sütü irmiğe dök.', 'Kapağı kapat, demlendir.'], 301).replace('Olayları oluş sırasına göre numaralandır.', 'Tarifin adımlarını sıraya koy.'),
        soru(['Anneannenin notu ne anlatmak istiyor?', 'Annenin gözleri neden doldu?'])]),
      numarala([yonergeYaz('Kolay bir yiyeceğin tarifini adım adım yaz. (limonata, meyve salatası, sandviç…)', 5),
        sozcuk([['Helvayı <u>demlenmeye</u> bıraktık.', ['kapalı bekleyip pişmeye', 'soğuyup donmaya', 'yanmaya']], ['Mutfağı mis gibi bir koku <u>sardı</u>.', ['her yeri kapladı', 'kayboldu', 'söndü']]])]),
      numarala([yazma('Annene ya da sana bakan bir büyüğüne Anneler Günü için bir tebrik kartı yaz.', ['Hitap:', 'Ona neden teşekkür ediyorsun?', 'Dileğin ve kapanış:'], 12)]),
    ] },
    'hafta-31': { unite: 9, hafta: 31, baslik: 'Belediye Başkanına Mektup', konu: 'Haklarımızı biliyoruz · İstek ve öneri mektubu', sayfalar: () => [
      metin({ baslik: 'Belediye Başkanına Mektup', resimler: ['top', 'agac'], tahmin: 'Çocuklar belediye başkanından ne isteyebilir?', paragraflar: [
        'Mahallemizdeki boş arsa yıllardır çöp ve dikenle doluydu. Biz top oynayacak bir yer bulamıyor, sokakta oynarken arabalardan korkuyorduk.',
        'Bir gün sınıfta öğretmenimiz çocuk haklarını anlattı. “Her çocuğun oyun oynama ve güvende olma hakkı vardır.” dedi. Elimi kaldırdım:',
        '– Ama bizim mahallede oynayacak güvenli bir yer yok.',
        '– O zaman bunu söyleyecek doğru kişiye yazalım, dedi öğretmenim.',
        'Hep birlikte belediye başkanına bir mektup yazdık:',
        '“Sayın Belediye Başkanımız, Biz Lale İlkokulu 2-A sınıfı öğrencileriyiz. Mahallemizde çocukların oynayabileceği bir park yok. Boş arsa çöple dolu ve tehlikeli. Burası temizlenip park yapılırsa hem biz güvenle oynarız hem de büyükler oturup dinlenir. Ağaçları biz dikmek isteriz. Yardımınız için şimdiden teşekkür ederiz. Saygılarımızla, 2-A Sınıfı”',
        'Mektubu postaya verdik. Üç hafta sonra okula bir zarf geldi. Belediye başkanı bize cevap yazmıştı! Arsa temizlenecek ve park yapılacaktı.',
        'Haziranda parkın açılışına davet edildik. Herkes birer fidan dikti. Benim fidanımın yanına küçük bir tabela koydular: “Bu ağaç, sesini duyuran çocuklar için.”',
      ] }),
      numarala([harita(), dogruYanlis(['Boş arsa önceden bir parktı.', 'Mektubu tek bir öğrenci yazdı.', 'Belediye başkanı mektuba cevap verdi.', 'Çocuklar açılışta fidan dikti.']),
        soru(['Çocuklar mektupta hangi isteklerini ve önerilerini yazdı?'])]),
      numarala([eslestir('Mektubun bölümlerini eşleştir.', [['Sayın Belediye Başkanımız,', 'istek'], ['Mahallemizde bir park yok, yapılmasını istiyoruz.', 'hitap'], ['Ağaçları biz dikmek isteriz.', 'kapanış'], ['Saygılarımızla, 2-A Sınıfı', 'öneri']], 311),
        fikir('Bu düşünceye katılıyor musun?', 'Çocuklar da fikirlerini büyüklere yazarak anlatabilir.'),
        soru(['Okulunda ya da mahallende neyin değişmesini isterdin?'])]),
      numarala([yazma('Okul müdürüne ya da belediye başkanına bir istek ve öneri mektubu yaz. Saygılı bir hitap ve kapanış kullan.', ['Hitap:', 'İsteğin ve nedeni:', 'Önerin ve kapanış:'], 12)]),
    ] },
    'hafta-32': { unite: 9, hafta: 32, baslik: 'Gemi Müzesinde Bir Gün', konu: 'Haklarımızı biliyoruz · Büyük harf (yer ve gemi adları), tarih', sayfalar: () => [
      metin({ baslik: 'Gemi Müzesinde Bir Gün', resimler: ['gemi', 'kopru'], tahmin: 'Bir gemi neden müze olur?', paragraflar: [
        'Müzeler Haftası\'nda ailemle Samsun\'a gittik. Limanın yanında kocaman bir gemi duruyordu. Babam gemiyi gösterdi:',
        '– İşte Bandırma Vapuru! Atatürk, 19 Mayıs 1919\'da bu gemiyle Samsun\'a çıkmıştı.',
        'Gemi aslında bir müzeydi. İlk eski geminin aynısı yapılmış, içine o günleri anlatan eşyalar konmuştu. Güverteye çıkınca rüzgâr yüzüme vurdu. Dar merdivenlerden aşağı indik. Bir kamarada küçük bir masa, bir harita ve bir pusula vardı.',
        'Rehber anlattı:',
        '– Yolculuk İstanbul\'dan başladı ve dört gün sürdü. Deniz çok dalgalıydı. Gemi eskiydi, pusulası bile tam doğru göstermiyordu. Ama Atatürk ve arkadaşları kararlıydı. Samsun\'a vardıklarında Kurtuluş Savaşı\'nın ilk adımı atılmış oldu.',
        'Haritada gemi rotasını parmağımla takip ettim. İstanbul\'dan Karadeniz\'e, oradan Samsun\'a uzanan mavi bir çizgi.',
        'Müzeden çıkarken rehber bana sordu:',
        '– Atatürk 19 Mayıs\'ı kime armağan etti, biliyor musun?',
        '– Gençlere! dedim.',
        'Rehber gülümsedi. Akşam otelde defterime büyük harflerle yazdım: “19 MAYIS 1919: Bir gemi, bir umut, bir başlangıç.”',
      ] }),
      numarala([kimlik('Yolculuğun kimlik kartını doldur.', ['Geminin adı:', 'Yola çıktığı şehir:', 'Vardığı şehir:', 'Tarih:', 'Yolculuk süresi:', 'Bayramın armağan edildiği kişiler:'], 'gemi'),
        sirala(['Gemi İstanbul\'dan yola çıktı.', 'Dalgalı denizde dört gün yol aldı.', 'Atatürk Samsun\'a çıktı.', 'Kurtuluş Savaşı\'nın ilk adımı atıldı.'], 321),
        soru(['Gemi neden müzeye dönüştürülmüş olabilir?'])]),
      numarala([yeniden('Yer ve gemi adlarını büyük harfle başlatarak cümleleri düzelt.', ['atatürk bandırma vapuru ile samsun\'a çıktı.', 'gemi istanbul\'dan karadeniz\'e açıldı.']),
        eslestir('Tarihleri olaylarla eşleştir.', [['19.05.1919', 'Cumhuriyet ilan edildi.'], ['23.04.1920', 'Atatürk Samsun\'a çıktı.'], ['29.10.1923', 'Meclis açıldı.']], 322),
        sozcuk([['Rehber gemi <u>rotasını</u> gösterdi.', ['geminin izlediği yol', 'geminin rengi', 'geminin kaptanı']]])]),
      numarala([yazma('Gezdiğin ya da gezmek istediğin bir müzeyi anlatan bir yazı yaz.', ['Hangi müze, nerede?', 'Orada neler gördün / görmek istersin?', 'Seni en çok ne etkiledi?'], 12)]),
    ] },
    'hafta-33': { unite: 9, hafta: 33, baslik: 'Sınıf Meclisi', konu: 'Haklarımızı biliyoruz · Hak ve sorumluluk, yazma planı', sayfalar: () => [
      metin({ baslik: 'Sınıf Meclisi', resimler: ['zil', 'kalem'], tahmin: 'Bir sınıfta meclis olur mu? Ne işe yarar?', paragraflar: [
        'Bir sabah sınıfımızda bir tartışma çıktı. Teneffüste top hep aynı çocuklardaydı. Bazıları sıra beklemiyor, kitaplık her gün dağınık kalıyordu. Herkes birbirini suçluyordu.',
        'Öğretmenimiz bir öneri getirdi:',
        '– Haydi bir sınıf meclisi kuralım. Sorunlarımızı birlikte konuşup kurallarımızı birlikte koyalım.',
        'Önce bir başkan seçtik. Aday olanlar kısa konuşmalar yaptı. Oylamayı Nehir kazandı. Sonra herkes bir kâğıda bir sorun ve bir çözüm önerisi yazdı.',
        'Meclis toplandığında Nehir kâğıtları tek tek okudu. Mert şunu önermişti: “Top için bir sıra listesi yapalım. Her gün başka bir grup oynasın.” Elif ise şunu yazmıştı: “Her hafta iki kişi kitaplık sorumlusu olsun.”',
        'Her öneri oylandı. Çoğunluğun kabul ettiği kurallar büyük bir kartona yazıldı. Kartonun başlığı şuydu: “Haklarımız ve Sorumluluklarımız”. Sol tarafta “Oyun oynamak, konuşulurken dinlenmek, fikrini söylemek” gibi haklar; sağ tarafta “Sırayı beklemek, eşyaları toplamak, başkasını dinlemek” gibi sorumluluklar vardı.',
        'Bir ay sonra sınıfımız değişti. Kimse topu kapmıyor, kitaplık hep düzenli. Nehir başkanlığı bıraktığında hepimizi şöyle uyardı: “Haklarımızı isterken sorumluluklarımızı unutmayalım!”',
      ] }),
      numarala([harita(), soru(['Sınıf meclisi neden kuruldu?', 'Kurallar nasıl seçildi?', 'Nehir\'in son sözünü kendi cümlelerinle açıkla.']),
        sozcuk([['<u>Aday</u> olanlar kısa konuşmalar yaptı.', ['seçilmek isteyen kişi', 'oy sayan kişi', 'izleyici']], ['<u>Çoğunluğun</u> kabul ettiği kurallar yazıldı.', ['sınıfın büyük bölümünün', 'yalnız öğretmenin', 'hiç kimsenin']]])]),
      numarala([siniflandir('Hak mı, sorumluluk mu? Sözcükleri doğru kutuya yaz.', [['Hak', '#3a86ff'], ['Sorumluluk', '#f2546b'], ['İkisi de', '#8b5cf6']], ['oyun oynamak', 'sırayı beklemek', 'eğitim almak', 'eşyaları toplamak', 'fikrini söylemek', 'başkasını dinlemek', 'sağlıklı beslenmek']),
        fikir('Bu düşünceye katılıyor musun?', 'Sınıf kurallarını öğrenciler birlikte koymalıdır.'),
        soru(['Sınıfınızda hangi kural olsun isterdin? Neden?'])]),
      numarala([yazma('Sınıf meclisine bir öneri yazısı hazırla. Önce yazma planını doldur, sonra yaz.', ['Sorun ne?', 'Önerin ne?', 'Önerin neden işe yarar?'], 12)]),
    ] },
    'hafta-34': { unite: 9, hafta: 34, baslik: 'Salıncak Sırası', konu: 'Haklarımızı biliyoruz · Görüş bildirme, iki nokta ve tırnak', sayfalar: () => [
      metin({ baslik: 'Salıncak Sırası', resimler: ['saat', 'top'], tahmin: 'Parkta herkes aynı salıncağa binmek isterse ne olur?', paragraflar: [
        'Parkta tek bir salıncak vardı ve önünde uzun bir kuyruk oluşmuştu. Salıncakta ise Berk sallanıyordu. Hem de çok uzun zamandır.',
        'Kuyruktaki küçük Duru sıkılıp ağlamaya başladı. Ece, Berk\'e seslendi:',
        '– Berk, biraz da biz binelim mi?',
        '– Ben önce geldim, dedi Berk. Önce gelen istediği kadar biner!',
        'Kuyrukta homurdanmalar yükseldi. Tam o sırada Duru\'nun dedesi yanlarına geldi. Bir süre düşündü, sonra cebinden kum saatine benzeyen küçük bir oyun saati çıkardı.',
        '– Size bir önerim var, dedi. Herkes bu saatin kumu bitene kadar sallansın. Kum bitince sıra bir sonrakine geçsin. Böylece herkes eşit süre biner.',
        'Berk önce itiraz etti: “Ama ben daha sallanmak istiyorum!”',
        'Dede gülümsedi: “Sen de istersin elbette. Kuyruktaki arkadaşların da istiyor. Parkı hepimiz paylaşıyoruz.”',
        'Berk biraz düşündü, sonra salıncaktan indi ve Duru\'yu bindirdi. Kum saati döndükçe herkes sırayla bindi. Kuyruk eriyip gitti. En sonunda Berk\'e yine sıra geldi. Bu kez sallanırken kahkahalarla gülüyordu. Çünkü artık kimse ona kızmıyordu.',
      ] }),
      numarala([harita(), sirala(['Berk uzun süre salıncakta sallandı.', 'Duru ağlamaya başladı.', 'Dede kum saatini önerdi.', 'Berk Duru\'yu salıncağa bindirdi.'], 341),
        soru(['Berk\'in "Önce gelen istediği kadar biner!" düşüncesi neden adil değil?'])]),
      numarala([fikir('Dedenin önerisine katılıyor musun?', 'Herkes eşit süre binsin. Parkı hepimiz paylaşıyoruz.'),
        yeniden('Konuşmaları iki nokta ve tırnak işaretiyle yeniden yaz.', ['Ece dedi ki biraz da biz binelim.', 'Dede dedi ki parkı hepimiz paylaşıyoruz.']),
        soru(['Sen hiç sıranı beklerken zorlandın mı? Ne yaptın?'])]),
      numarala([yazma('Paylaşmak zorunda kaldığın bir şeyi (oyuncak, bilgisayar, top…) anlat. Sorunu nasıl çözdünüz?', ['Ne paylaşılacaktı?', 'Sorun neydi?', 'Nasıl çözdünüz?'], 12)]),
    ] },
    'hafta-35': { unite: 10, hafta: 35, baslik: 'Buzuldan Gelen Mektup', konu: 'Okul temelli planlama · Mektup, zıt anlam', sayfalar: () => [
      metin({ baslik: 'Buzuldan Gelen Mektup', resimler: ['kar', 'gunes'], tahmin: 'Bir buzul mektup yazsaydı ne yazardı?', paragraflar: [
        'Çevre ve İklim Değişikliği Haftası\'nda öğretmenimiz sınıfa bir zarf getirdi. Zarfın üstünde şöyle yazıyordu: “Kuzey Kutbu\'ndan, Buzul Bey\'den”. Öğretmenimiz mektubu okudu:',
        '“Sevgili çocuklar, ben dünyanın en kuzeyinde yaşayan yaşlı bir buzulum. Binlerce yıldır buradayım. Eskiden çok büyüktüm. Kutup ayıları sırtımda gezer, foklar kenarlarımda dinlenirdi.',
        'Ama son yıllarda dünya ısınıyor. Fabrikaların bacalarından, arabaların egzozlarından çıkan dumanlar havayı bir battaniye gibi sarıyor. Güneşin sıcaklığı dışarı çıkamıyor. Ben de her yaz biraz daha eriyorum. Kutup ayısı dostlarım avlanacak buz bulamıyor.',
        'Sizden ricam şu: Kısa yollarda araba yerine yürüyün ya da bisiklete binin. Işıkları söndürün. Suyu boşa harcamayın. Ağaç dikin. Atıklarınızı ayırın. Siz küçüksünüz ama sayınız çok. Hepiniz birazcık yaparsanız büyük bir fark olur.',
        'Sizi soğuk ama sevgi dolu bir kalple selamlıyorum. Buzul Bey”',
        'Mektup bitince sınıf sessizleşti. Sonra Ali kalktı:',
        '– Biz de ona cevap yazalım!',
        'O gün hepimiz Buzul Bey\'e birer söz verdik. Benimki şuydu: “Okula yürüyerek geleceğim.”',
      ] }),
      numarala([soru(['Mektubu kim, nereden yazdı?', 'Buzul Bey neden eriyor?']), dogruYanlis(['Buzul Bey dünyanın en güneyinde yaşıyor.', 'Dünya ısındıkça buzul eriyor.', 'Buzul Bey çocuklardan ağaç dikmelerini istiyor.', 'Çocuklar mektuba cevap yazmaya karar verdi.']),
        soru(['Buzul Bey "Küçüksünüz ama sayınız çok." derken ne demek istiyor?'])]),
      numarala([domino('Zıt anlam dominosu! Sözcükleri mektupta bul.', ['büyük', 'kuzey', 'sıcak', 'eski', 'kısa', 'az'], ['soğuk', 'güney', 'çok', 'küçük', 'uzun', 'yeni']),
        siniflandir('Dünyayı koruyan davranışları ve zarar veren davranışları ayır.', [['Korur', '#12b886'], ['Zarar verir', '#f2546b']], ['ağaç dikmek', 'ışığı açık bırakmak', 'bisiklete binmek', 'çöpü yere atmak', 'atıkları ayırmak', 'suyu boşa akıtmak'])]),
      numarala([yazma('Buzul Bey\'e bir cevap mektubu yaz. Ona bir söz ver.', ['Hitap:', 'Ona ne söz veriyorsun?', 'Kapanış:'], 12)]),
    ] },
    'hafta-36': { unite: 10, hafta: 36, baslik: 'Yıl Sonu Kutusu', konu: 'Pekiştirme haftası · Yılın tekrarı', sayfalar: () => [
      metin({ baslik: 'Yıl Sonu Kutusu', resimler: ['kutu', 'kalem'], tahmin: 'Bir yılı bir kutuya sığdırabilir misin?', paragraflar: [
        'Okulun son haftasında öğretmenimiz her birimize boş bir ayakkabı kutusu verdi.',
        '– Bu yılı bu kutuya sığdırın, dedi. İçine size bu yılı hatırlatan beş şey koyun.',
        'Eve gidip odamı dolaştım. Önce eylülde okula başladığım günkü kırmızı kalemi buldum. Ucu iyice kısalmıştı. Kutuya koydum.',
        'Sonra yardım kolisi için yazdığımız mektubun bir kopyasını, Cumhuriyet Bayramı\'nda yaptığım kâğıt feneri, kardaki serçeyi çizdiğim resmi ve kitap kulübünde anlattığım kitabın ayracını ekledim.',
        'Kutu doldu. Kapağını kapatıp üstüne yazdım: “2. Sınıf – Benim Yılım”.',
        'Cuma günü herkes kutusunu sınıfa getirdi. Sırayla kutularımızı açıp anlattık. Elif\'in kutusundan keman teli, Defne\'ninkinden minik bir robot kolu, Yusuf\'unkinden gezici kütüphanenin kartı çıktı. Her kutuda bir hikâye vardı.',
        'Son olarak öğretmenimiz kendi kutusunu açtı. İçinde hepimizin yılın ilk günü yazdığı kâğıtlar vardı. O zamanki yazılarımız ne kadar da kısa ve eğri büğrüydü! Şimdi ise sayfalar dolusu yazabiliyorduk.',
        'Öğretmenimiz gülümsedi:',
        '– Gördünüz mü? Bir yılda ne kadar büyüdünüz. Üçüncü sınıfta yeni kutular sizi bekliyor.',
      ] }),
      numarala([harita(), tablo('Anlatıcının kutusuna koyduğu eşyaları ve ona neyi hatırlattığını yaz.', ['Eşya', 'Neyi hatırlatıyor?'], [['kırmızı kalem', ''], ['kâğıt fener', ''], ['serçe resmi', ''], ['', '']]),
        soru(['Öğretmen "Bir yılda ne kadar büyüdünüz." derken neyi kastediyor?', 'Bu yıl okuduğun metinlerden en çok hangisini sevdin? Neden?'])]),
      numarala([tren('Noktalama trenleri! Son vagonlara uygun işareti koy.', ['Kutu doldu', 'Sen kutuna ne koydun', 'Yaşasın, yaz tatili geldi', 'Üçüncü sınıf bizi bekliyor'], ['.', '?', '!']),
        yeniden('Yazım hatalarını düzelterek yeniden yaz. (büyük harf, kesme, soru eki)', ['elifin kutusunda keman teli varmı?', 'yusuf ankarada yaşıyor.']),
        domino('Zıt anlam dominosu!', ['ilk', 'kısa', 'boş', 'eğri'], ['dolu', 'son', 'düz', 'uzun'])]),
      numarala([yazma('Senin "Yıl Sonu Kutun"a neler koyardın? Bu yılı anlatan bir yazı yaz.', ['Kutuna koyacağın üç şey:', 'Bu yıl öğrendiğin en güzel şey:', 'Üçüncü sınıftan beklentin:'], 12)]),
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
.t2-mesaj{display:flex;justify-content:center}.t2-tel{width:120mm;border:1.2mm solid #1f2a24;border-radius:8mm;padding:6mm 5mm;background:#f4f7fb;display:flex;flex-direction:column;gap:4mm}
.t2-balon-g{align-self:flex-start;max-width:85%;background:#fff;border:.5mm solid #cfd8d1;border-radius:4mm 4mm 4mm 0;padding:2.5mm 3.5mm;font-size:4.8mm;line-height:1.5}
.t2-balon-y{align-self:flex-end;width:85%;background:#dcf8c6;border-radius:4mm 4mm 0 4mm;padding:1mm 3.5mm 3mm}
.t2-venn{display:grid;grid-template-columns:1fr 1fr 1fr;gap:3mm}.t2-venn>div{background:#fff;border:.7mm solid #3a86ff;border-radius:6mm;padding:3mm}.t2-venn>div:nth-child(2){border-color:#8b5cf6;background:#f9f6ff}.t2-venn>div:nth-child(3){border-color:#f2546b}.t2-venn b{font-weight:400;font-size:5mm;display:block;text-align:center}
.t2-adimlar{display:flex;flex-direction:column;gap:2.5mm}.t2-adimlar>div{display:grid;grid-template-columns:8mm 26mm 1fr;align-items:end;gap:2mm;background:#fff;border-radius:3mm;padding:1mm 3mm 2mm}
.t2-adimlar b{width:7mm;height:7mm;border-radius:50%;background:#f4a100;color:#fff;display:grid;place-items:center;font-size:4mm;align-self:center}.t2-adimlar span{font-size:5mm;align-self:center}
.govde>.etk:last-child>:is(.t2-sinif,.t2-venn,.t2-harita,.t2-domino){align-content:stretch!important}
.govde>.etk:last-child>.t2-esle{flex:0 0 auto!important;align-content:start!important}
.t2-sinif>div,.t2-venn>div,.t2-harita>div{display:flex;flex-direction:column}.t2-sinif .t2-cizgi,.t2-venn .t2-cizgi,.t2-harita .t2-cizgi{flex:1;justify-content:space-evenly}
.govde>.etk:last-child>.t2-domino{align-content:space-evenly!important}
.t2-yaz{background:#fff;border-radius:3mm;padding:3mm 5mm 4mm;margin-top:3mm;flex:1;display:flex;flex-direction:column}.t2-yaz .t2-cizgi{flex:1;justify-content:space-evenly}
.t2-bas{display:flex;align-items:flex-end;gap:3mm;font-size:5.2mm;color:#1d4e89}.t2-bas i{flex:1;max-width:110mm;border-bottom:.5mm solid #1d4e89;height:8mm}
`;
  return { T2, CSS };
};
