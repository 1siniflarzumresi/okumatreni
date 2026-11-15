// Ladin Ormanı — 4. sınıf Türkçe: test tarzı (sosyal4.js düzeni). Her hafta ÖZGÜN bir okuma metni + metne dayalı sorular
// + dil bilgisi bankalarından hesaplanan sorular (eş/zıt anlam, deyim, atasözü, noktalama). İki sayfa + ayrı cevap anahtarı.
// Metin soruları: [kök, doğru, [yanlış, yanlış, yanlış]]. Üretim: node kaynak/calisma-kagitlari/uret.js t4
module.exports = ({ T, S }) => {
  const { p, kodDY, yolDY, kapDY, roma, sirala, esle, kacTane, kareYol, cocukSec, ortak, sayfa, optik, yeniHafta, cevapSayfasi } = T;
  void S;
  const RNG = s => { let x = 0; for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) >>> 0; x = x || 1; return () => ((x = (x * 1103515245 + 12345) >>> 0) / 4294967296); };
  const kar = (r, l) => { const a = [...l]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const coktan = (ic, kok, d, y) => { const l = [d, ...y].map(x => String(x).replace(/<[^>]+>/g, '')); return T.soru(ic, kok, T.sec(d, y, kok), { kolon: l.every(x => x.length <= 6) ? 4 : l.every(x => x.length <= 20) ? 2 : 1 }); };
  const ADLAR = ['Elif', 'Kaan', 'Defne', 'Mert', 'Zeynep', 'Emir', 'Ada', 'Yusuf', 'Ecrin', 'Alp', 'Nehir', 'Ömer'];

  // ——— Dil bilgisi bankaları (doğruluk bankadan hesaplanır) ———
  const ES = [['cevap', 'yanıt'], ['öğrenci', 'talebe'], ['armağan', 'hediye'], ['yurt', 'vatan'], ['kırmızı', 'al'], ['siyah', 'kara'], ['ihtiyar', 'yaşlı'], ['misafir', 'konuk'], ['sınav', 'imtihan'], ['okul', 'mektep'], ['hekim', 'doktor'], ['kelime', 'sözcük'], ['istek', 'arzu'], ['yıl', 'sene']];
  const ZIT = [['uzun', 'kısa'], ['sıcak', 'soğuk'], ['geniş', 'dar'], ['erken', 'geç'], ['kolay', 'zor'], ['temiz', 'kirli'], ['cesur', 'korkak'], ['eski', 'yeni'], ['ağır', 'hafif'], ['derin', 'sığ'], ['çalışkan', 'tembel'], ['gece', 'gündüz'], ['iç', 'dış'], ['ileri', 'geri']];
  const DEYIM = [['kulak vermek', 'dikkatle dinlemek'], ['göz atmak', 'kısaca bakmak'], ['eli açık olmak', 'cömert olmak'], ['ağzı kulaklarına varmak', 'çok sevinmek'], ['kalbini kırmak', 'birini üzmek'], ['dili tutulmak', 'şaşırıp konuşamamak'], ['ayağını denk almak', 'dikkatli davranmak'], ['burnu havada olmak', 'kibirli olmak'], ['gözden düşmek', 'değerini yitirmek'], ['içi içine sığmamak', 'çok heyecanlanmak']];
  const ATA = [['Damlaya damlaya göl olur.', 'Küçük birikimler zamanla büyür.'], ['Bugünün işini yarına bırakma.', 'İşleri zamanında yapmalıyız.'], ['Bir elin nesi var, iki elin sesi var.', 'Birlikte çalışmak başarı getirir.'], ['Ağaç yaşken eğilir.', 'Eğitim küçük yaşta başlamalıdır.'], ['Sakla samanı, gelir zamanı.', 'Gereksiz görünen şey bir gün işe yarar.'], ['Komşu komşunun külüne muhtaçtır.', 'İnsanlar birbirine ihtiyaç duyar.']];
  const NOKTA = [['Ne güzel bir gün', '!'], ['Yarın okula gelecek misin', '?'], ['Kitabımı masaya koydum', '.'], ['Eyvah, süt taştı', '!'], ['Bu kitabı kim yazmış', '?'], ['Annem bahçede çiçek suluyor', '.']];
  const ISAD = { '!': 'ünlem', '?': 'soru işareti', '.': 'nokta' };
  const dilSt = r => { const e = kar(r, ES), z = kar(r, ZIT), d = kar(r, DEYIM), a = kar(r, ATA), n = kar(r, NOKTA); const f = (t, y) => r() < .5 ? [t, true] : [y, false];
    return [f(`“${e[0][0]}” ile “${e[0][1]}” eş anlamlı sözcüklerdir.`, `“${z[0][0]}” ile “${z[0][1]}” eş anlamlı sözcüklerdir.`),
      f(`“${z[1][0]}” ile “${z[1][1]}” zıt anlamlı sözcüklerdir.`, `“${e[1][0]}” ile “${e[1][1]}” zıt anlamlı sözcüklerdir.`),
      f(`“${d[0][0]}” deyimi “${d[0][1]}” anlamındadır.`, `“${d[0][0]}” deyimi “${d[1][1]}” anlamındadır.`),
      f(`“${a[0][0]}” atasözü “${a[0][1]}” anlamındadır.`, `“${a[0][0]}” atasözü “${a[1][1]}” anlamındadır.`),
      f(`“${n[0][0]}” cümlesinin sonuna ${ISAD[n[0][1]]} konur.`, `“${n[0][0]}” cümlesinin sonuna ${ISAD[n[0][1] === '.' ? '?' : '.']} konur.`),
      f(`“${e[2][0]}” sözcüğünün eş anlamlısı “${e[2][1]}” sözcüğüdür.`, `“${z[2][0]}” sözcüğünün eş anlamlısı “${z[2][1]}” sözcüğüdür.`)]; };
  const DIL = { gir: 'Öğretmen tahtaya sözcükler ve cümlelerle ilgili bilgiler yazdı.' };
  const dilCq = [
    r => { const e = kar(r, ES), z = kar(r, ZIT); return coktan(p(`${ADLAR[Math.floor(r() * 12)]} sözcük kartlarını eşleştiriyor.`), `“${e[0][0]}” sözcüğünün eş anlamlısı hangisidir?`, e[0][1], [z[0][1], e[1][1], z[1][0]]); },
    r => { const z = kar(r, ZIT), e = kar(r, ES); return coktan(p('Öğretmen tahtaya bir sözcük yazdı ve zıt anlamlısını sordu.'), `“${z[0][0]}” sözcüğünün zıt anlamlısı hangisidir?`, z[0][1], [e[0][1], z[1][1], e[1][0]]); },
    r => { const d = kar(r, DEYIM); return coktan(p('Öğretmen tahtaya bir deyim yazdı ve anlamını sordu.'), `“${d[0][0]}” deyiminin anlamı hangisidir?`, d[0][1], d.slice(1, 4).map(x => x[1])); },
    r => { const a = kar(r, ATA); return coktan(p(`${ADLAR[Math.floor(r() * 12)]} her gün kumbarasına biraz para atıyor. Bir yıl sonra bisiklet alacak kadar parası oldu.`), 'Bu durumu en iyi anlatan atasözü hangisidir?', ATA[0][0], a.filter(x => x[0] !== ATA[0][0]).slice(0, 3).map(x => x[0])); },
    r => { const n = kar(r, NOKTA); return coktan(p('Bir öğrenci noktalama işaretlerini unutmuş.'), `“${n[0][0]}” cümlesinin sonuna hangi işaret konmalıdır?`, n[0][1] + ' (' + ISAD[n[0][1]] + ')', ['.', '?', '!', ','].filter(x => x !== n[0][1]).slice(0, 3).map(x => x + ' (' + (ISAD[x] || 'virgül') + ')')); },
  ];
  const SP = [
    (r, t) => [() => kodDY(DIL.gir + ' Bilgi doğruysa "Doğru", yanlışsa "Yanlış" bölümündeki rakamı boyayacaksınız.', kar(r, dilSt(r)).slice(0, 4), t + 'k'),
      () => yolDY(DIL.gir + ' Öğrenciler ifade doğruysa "D", yanlışsa "Y" okunu izliyor.', kar(r, dilSt(r)).slice(0, 3), t + 'y'),
      () => kapDY(DIL.gir + ' Bilgi doğruysa "Doğru Bilgi", yanlışsa "Yanlış Bilgi" kabına atılıyor.', kar(r, dilSt(r)).slice(0, 5), t + 'p')],
    (r, t, M) => [() => { let l, n = 0; do { l = kar(r, dilSt(r)).slice(0, 3); } while (!l.some(x => x[1]) && ++n < 50); return roma(p(DIL.gir), 'Buna göre yukarıdaki ifadelerden hangileri doğrudur?', l); },
      () => sirala('Metindeki olaylar karışık verilmiştir.', M.sira, 'Olayların oluş sırası hangisidir?', t + 's'),
      () => { const e = kar(r, ES).slice(0, 4); return esle('Soldaki sözcükleri sağdaki eş anlamlılarıyla eşleştiriniz.', e, 'Buna göre eşleştirme hangi seçenekte doğru verilmiştir?', t + 'e'); }],
    (r, t) => [() => kacTane(p(DIL.gir), kar(r, dilSt(r)).slice(0, 4)),
      () => kareYol(DIL.gir + ' ' + ADLAR[Math.floor(r() * 12)] + ' bu bilgilerle bir kare oyunu oynuyor.', kar(r, dilSt(r)).slice(0, 4), t + 'q', 1, 1),
      () => { const s = dilSt(r).concat(dilSt(r)); const y = s.find(x => !x[1]) || s[0], d = kar(r, s.filter(x => x[1])).slice(0, 3); return cocukSec(p('Dört arkadaş sözcükler ve cümlelerle ilgili bildiklerini söylüyor.'), 'Buna göre hangi çocuğun söylediği yanlıştır?', [y[0], ...d.map(x => x[0])], t + 'c'); }],
  ];
  const metinKutu = M => `<div class="t4-metin"><b>${M.baslik}</b>${M.metin.map(x => `<p>${x}</p>`).join('')}</div>`;
  const W = (hafta, unite, baslik, konu, M) => ({ unite, hafta, baslik, konu, sayfalar: () => {
    yeniHafta(); const r = RNG('t4-' + hafta), t = 't4h' + hafta, c = (hafta - 1) % 3;
    const sp = SP[c](r, t, M), mq = M.sorular.map(([k, d, y]) => () => coktan('', k, d, y)), dq = kar(r, dilCq);
    const [s0, s1] = M.sozcuk;
    const A = [ortak(metinKutu(M), mq.slice(0, 3)), sp[0](), coktan(p(`Metinde geçen “${s0}” sözcüğünü düşününüz.`), `“${s0}” sözcüğünün metindeki anlamı hangisidir?`, s1[0], s1.slice(1))];
    const B = [mq[3](), sp[1](), sp[2](), dq[0](r), dq[1](r), mq[4] ? mq[4]() : dq[2](r)];
    return [sayfa(A), sayfa(B).replace(/<\/div>$/, optik() + '</div>'), cevapSayfasi(`${hafta}. hafta · ${baslik}`)];
  } });

  // ——— Haftalar: özgün metinler ———
  const T4 = {
    'hafta-01': W(1, 1, 'Türkçe Konuşalım', 'Okuma kültürü · Türkçe konuşma, eş ve zıt anlam', { baslik: 'Kafedeki Tabela',
      metin: ['Defne, babasıyla yeni açılan bir kafeye gitti. Kapının üstündeki büyük tabelada “Coffee Point” yazıyordu. Menüde de “cheesecake”, “brownie”, “smoothie” gibi sözcükler vardı.',
        'Defne garsona dönüp “Bu tatlıların Türkçe adları yok mu?” diye sordu. Garson gülümsedi: “Var tabii, peynirli pasta, çikolatalı kek, meyveli içecek…” Defne şaşırdı. “O zaman neden Türkçesini yazmıyorsunuz?” dedi.',
        'Eve dönünce Defne bir mektup yazdı. Mektubunda dilimizin çok zengin olduğunu, her şeyin güzel bir Türkçe karşılığı bulunduğunu anlattı. Birkaç hafta sonra kafenin önünden geçerken menünün değiştiğini gördü: “Peynirli pasta, çikolatalı kek, meyveli içecek.” Defne\'nin yüzü güldü.'],
      sorular: [['Defne\'nin garsona soru sormasının nedeni nedir?', 'Menüde yabancı sözcükler görmesi', ['Tatlıların pahalı olması', 'Kafenin kalabalık olması', 'Garsonun geç gelmesi']],
        ['Metnin ana fikri hangisidir?', 'Dilimizi korumalı, Türkçe karşılıkları kullanmalıyız.', ['Kafelerde tatlı yenmemelidir.', 'Mektup yazmak zordur.', 'Yabancı tatlılar daha lezzetlidir.']],
        ['Defne kafe için ne yapmıştır?', 'Kafeye bir mektup yazmıştır.', ['Kafeyi şikâyet etmiştir.', 'Kafede çalışmaya başlamıştır.', 'Kafeye bir tabela hediye etmiştir.']],
        ['Metindeki olaylardan hangisi en son olmuştur?', 'Menünün Türkçe yazıldığını görmesi', ['Kafeye gitmesi', 'Garsona soru sorması', 'Mektup yazması']],
        ['Metne en uygun başlık hangisidir?', 'Güzel Türkçemiz', ['Tatlı Tarifleri', 'Babamla Alışveriş', 'Kafenin Garsonu']]],
      sozcuk: ['zengin', ['çok çeşitli, bol', 'çok parası olan', 'yorgun', 'küçük']],
      sira: ['Defne kafeye gitti.', 'Menüde yabancı sözcükler gördü.', 'Garsona soru sordu.', 'Kafeye mektup yazdı.', 'Menünün değiştiğini gördü.'] }),
    'hafta-02': W(2, 1, 'Evimizdeki Kütüphane', 'Okuma kültürü · Kütüphane, metin türleri', { baslik: 'Raflardaki Dünya',
      metin: ['Kaan\'ın dedesinin evinde koca bir kitaplık vardı. Raflar tavana kadar uzanıyor, bazı kitapların kapakları yıllardan sararmış görünüyordu.',
        'Kaan bir gün dedesine sordu: “Bu kadar kitabı nasıl okudun?” Dedesi güldü: “Her gün biraz. Damlaya damlaya göl olur.” Sonra Kaan\'a bir öneride bulundu: Evlerinde küçük bir kütüphane kuracaklardı.',
        'Hafta sonu birlikte çalıştılar. Kitapları türlerine göre ayırdılar: masallar bir rafa, bilgi kitapları başka bir rafa, şiirler en alttaki rafa yerleşti. Kaan her kitabın sırtına küçük renkli etiketler yapıştırdı.',
        'Akşam annesi eve geldiğinde salonun köşesinde yepyeni bir kütüphane gördü. Kaan heyecanla “Artık her akşam yatmadan önce birlikte okuyabiliriz!” dedi.'],
      sorular: [['Dedenin “Damlaya damlaya göl olur.” sözüyle anlatmak istediği nedir?', 'Her gün biraz okuyarak çok kitap bitirilebilir.', ['Göl kenarında kitap okunmalıdır.', 'Yağmurlu günlerde okumak gerekir.', 'Kitaplar suya dayanıklıdır.']],
        ['Kaan ile dedesi kitapları neye göre ayırmıştır?', 'Türlerine göre', ['Renklerine göre', 'Fiyatlarına göre', 'Sayfa sayısına göre']],
        ['Metinde hangi soruya cevap bulunamaz?', 'Dede hangi yıl doğmuştur?', ['Kitaplar nasıl ayrılmıştır?', 'Kütüphane nereye kurulmuştur?', 'Kaan etiketleri nereye yapıştırmıştır?']],
        ['Kaan\'ın akşamki sözlerinden hangi duygusu anlaşılır?', 'Heyecan', ['Korku', 'Kıskançlık', 'Öfke']],
        ['Metinden hangi sonuca ulaşılır?', 'Okuma alışkanlığı aile içinde birlikte kazanılabilir.', ['Kitaplar yalnız kütüphanede okunur.', 'Eski kitaplar atılmalıdır.', 'Masallar en alt rafa konmalıdır.']]],
      sozcuk: ['sararmış', ['eskiyip rengi solmuş', 'yeni basılmış', 'yırtılmış', 'ıslanmış']],
      sira: ['Kaan dedesine kitapları sordu.', 'Dedesi ev kütüphanesi önerdi.', 'Kitapları türlerine göre ayırdılar.', 'Kitaplara etiket yapıştırdılar.', 'Annesi kütüphaneyi gördü.'] }),
    'hafta-03': W(3, 1, 'Yanlış Haber', 'Okuma kültürü · Doğru bilgiye ulaşma', { baslik: 'Herkes Paylaşıyordu',
      metin: ['Bir sabah sınıfın mesaj grubunda bir haber dolaşmaya başladı: “Yarın okullar tatil! Paylaşın!” Haberin altında ne bir kaynak ne de bir tarih vardı.',
        'Mert hemen haberi başka gruplara da göndermek istedi. Ama Zeynep onu durdurdu: “Bekle. Bu haber nereden çıktı? Önce okulun ve resmî kurumların sayfalarına bakalım.”',
        'İkisi birlikte okulun internet sitesini ve valiliğin duyurularını incelediler. Hiçbir yerde tatil kararı yoktu. Zeynep gruba bir mesaj yazdı: “Bu haber doğru değil. Resmî bir açıklama yok. Lütfen kaynağını bilmediğimiz haberleri paylaşmayalım.”',
        'Ertesi gün okul her zamanki gibi açıktı. Öğretmenleri Zeynep\'e teşekkür etti ve sınıfa “Bir haberi paylaşmadan önce kaynağını sorgulayın.” dedi.'],
      sorular: [['Zeynep haberin doğruluğunu nasıl araştırmıştır?', 'Resmî kurumların sayfalarına bakarak', ['Arkadaşlarına sorarak', 'Haberi daha çok paylaşarak', 'Televizyonu açarak']],
        ['Haberle ilgili hangisi söylenebilir?', 'Kaynağı belirsiz bir haberdir.', ['Valilik tarafından yayımlanmıştır.', 'Okul tarafından yazılmıştır.', 'Gerçekleşmiş bir olaydır.']],
        ['Metnin konusu hangisidir?', 'Yanlış haberleri doğrulamadan paylaşmamak', ['Okulların tatil olması', 'Mesaj gruplarının kurulması', 'Valiliğin görevleri']],
        ['Öğretmenin sözünden hangi öğüt çıkarılır?', 'Bilgiyi paylaşmadan önce kaynağını kontrol etmeliyiz.', ['Mesaj gruplarına hiç girmemeliyiz.', 'Her haberi hemen paylaşmalıyız.', 'Okula gitmeden önce haber okumalıyız.']],
        ['Metindeki kişilerden hangisi aceleci davranmıştır?', 'Mert', ['Zeynep', 'Öğretmen', 'Valilik görevlisi']]],
      sozcuk: ['resmî', ['devlet ya da kurum tarafından yapılan', 'çok eğlenceli', 'gizli', 'eski']],
      sira: ['Gruba tatil haberi geldi.', 'Mert haberi paylaşmak istedi.', 'Zeynep resmî sayfalara baktı.', 'Zeynep gruba açıklama yazdı.', 'Okul her zamanki gibi açıldı.'] }),
    'hafta-04': W(4, 1, 'Kitaplar Ne İşe Yarar?', 'Okuma kültürü · Okumanın yararları, hikâye unsurları', { baslik: 'Hikâyesi Olmayan Kitap',
      metin: ['Kütüphanenin en üst rafında bembeyaz sayfaları olan bir kitap yaşıyordu. Diğer kitaplar ondan ilginç hikâyeler bekliyordu ama onun içinde tek bir satır bile yoktu.',
        'Bir gün Ecrin kütüphaneye geldi ve beyaz kitabı eline aldı. Sayfaları boş görünce önce şaşırdı, sonra gülümsedi. Kalemini çıkardı ve ilk sayfaya yazmaya başladı: “Bir zamanlar, denizin dibinde konuşan bir deniz kaplumbağası varmış…”',
        'Ecrin her hafta kütüphaneye gelip birkaç sayfa yazdı. Kaplumbağanın maceraları büyüdükçe kitap da mutlu oluyordu. Yıl sonunda kitap baştan sona dolmuştu.',
        'Kütüphaneci kitabı rafın en önüne koydu. Artık çocuklar sırayla onu okumak istiyordu. Hikâyesi olmayan kitap, en çok okunan kitap olmuştu.'],
      sorular: [['Hikâyedeki olaylar nerede geçmektedir?', 'Kütüphanede', ['Denizin dibinde', 'Ecrin\'in evinde', 'Okul bahçesinde']],
        ['Kitabın üzgün olmasının nedeni nedir?', 'İçinde hiç yazı olmaması', ['Yırtılmış olması', 'Rafın en altında durması', 'Çok kalın olması']],
        ['Hikâyenin ana karakterleri kimlerdir?', 'Beyaz kitap ve Ecrin', ['Kütüphaneci ve deniz', 'Kaplumbağa ve balık', 'Diğer kitaplar ve öğretmen']],
        ['Hikâyenin sonunda kitapta nasıl bir değişiklik olmuştur?', 'En çok okunan kitap olmuştur.', ['Atılmıştır.', 'Satılmıştır.', 'Yeniden bembeyaz olmuştur.']],
        ['Bu hikâyeden hangi sonuç çıkarılır?', 'Yazmak ve okumak kitaplara hayat verir.', ['Boş kitaplar işe yaramaz.', 'Kütüphanelere gitmemeliyiz.', 'Deniz kaplumbağaları konuşur.']]],
      sozcuk: ['macera', ['heyecanlı, ilginç olaylar', 'kitap kapağı', 'sessiz bir yer', 'yemek tarifi']],
      sira: ['Beyaz kitap rafta bekliyordu.', 'Ecrin beyaz kitabı buldu.', 'Ecrin ilk sayfaya yazdı.', 'Kitap baştan sona doldu.', 'Kütüphaneci kitabı öne koydu.'] }),
    'hafta-05': W(5, 2, 'Gözüm Arkada Kalmayacak', 'Millî Mücadele ve Atatürk · Duygular, neden-sonuç', { baslik: 'Cepheye Giden Mektup',
      metin: ['1921 yılının soğuk bir kış gecesiydi. Kastamonu\'da küçük bir köyde yaşayan Ayşe Nine, oğlunun cepheden gönderdiği mektubu tekrar tekrar okuyordu.',
        'Mektupta oğlu, askerlerin kışlık giyecek ihtiyacından söz ediyordu. Ayşe Nine ertesi sabah köyün kadınlarını topladı. Herkes evindeki yünü getirdi. Günlerce çorap, eldiven ve yelek ördüler.',
        'Örülen giyecekler sandıklara yerleştirildi ve kağnılarla cepheye gönderildi. Kağnıları süren kadınlar karla kaplı yollarda günlerce yürüdü.',
        'Birkaç hafta sonra Ayşe Nine\'ye yeni bir mektup geldi. Oğlu, “Anneciğim, ördüğünüz çoraplar ayaklarımızı ısıtıyor. Gözünüz arkada kalmasın, vatanı koruyacağız.” diye yazmıştı. Ayşe Nine mektubu göğsüne bastırdı ve gözleri doldu.'],
      sorular: [['Köyün kadınlarının çorap ve eldiven örmesinin nedeni nedir?', 'Askerlerin kışlık giyeceğe ihtiyacı olması', ['Köyde pazar kurulacak olması', 'Kadınların yarışma yapması', 'Yünlerin satılamaması']],
        ['Giyecekler cepheye nasıl gönderilmiştir?', 'Kağnılarla', ['Trenle', 'Uçakla', 'Gemiyle']],
        ['Metinden Millî Mücadele ile ilgili hangi sonuca ulaşılır?', 'Halk ve ordu birlik içinde mücadele etmiştir.', ['Savaşı yalnız askerler kazanmıştır.', 'Köylüler savaşla ilgilenmemiştir.', 'Mektuplar cepheye ulaşmamıştır.']],
        ['Ayşe Nine\'nin son mektubu okurken gözlerinin dolmasının nedeni hangisidir?', 'Oğlunun sözlerinden duygulanması', ['Mektubun yanlış adrese gelmesi', 'Çorapların kaybolması', 'Hava çok soğuk olduğu için üşümesi']],
        ['“Gözünüz arkada kalmasın.” sözüyle anlatılmak istenen nedir?', 'Merak etmeyin, endişelenmeyin.', ['Arkanıza dikkatle bakın.', 'Gözlerinize iyi bakın.', 'Yola geriye dönerek gidin.']]],
      sozcuk: ['cephe', ['savaşın yapıldığı yer', 'bir evin önü', 'okul bahçesi', 'köy meydanı']],
      sira: ['Ayşe Nine oğlunun mektubunu okudu.', 'Köyün kadınlarını topladı.', 'Kadınlar çorap ve eldiven ördü.', 'Giyecekler kağnılarla gönderildi.', 'Oğlundan yeni mektup geldi.'] }),
    'hafta-06': W(6, 2, 'İstiklal Marşı\'nın Şairi', 'Millî Mücadele ve Atatürk · Mehmet Âkif Ersoy, bilgilendirici metin', { baslik: 'Mehmet Âkif Ersoy',
      metin: ['Mehmet Âkif Ersoy 1873 yılında İstanbul\'da doğdu. Küçük yaşlardan itibaren kitap okumayı ve şiir yazmayı çok sevdi. Veteriner hekim olarak çalıştı, aynı zamanda birçok şiir yazdı.',
        'Kurtuluş Savaşı yıllarında Anadolu\'yu dolaşarak halkı birlik olmaya çağıran konuşmalar yaptı. 1921 yılında Türkiye Büyük Millet Meclisi bir millî marş yarışması düzenledi.',
        'Mehmet Âkif, yarışma için para ödülü verileceği için önce katılmak istemedi. Ödülün kendisine verilmemesi şartıyla şiirini gönderdi. Şiiri Meclis\'te büyük bir coşkuyla kabul edildi. Bu şiir, İstiklal Marşı\'mızdır.',
        'Mehmet Âkif, İstiklal Marşı\'nı “Allah bu millete bir daha İstiklal Marşı yazdırmasın.” sözüyle anlatırdı. Onun bu sözü, marşın ne zor günlerde yazıldığını gösterir.'],
      sorular: [['Mehmet Âkif Ersoy\'un mesleği hangisidir?', 'Veteriner hekim', ['Öğretmen', 'Mühendis', 'Asker']],
        ['Mehmet Âkif yarışmaya önce neden katılmak istememiştir?', 'Yarışmada para ödülü verileceği için', ['Şiir yazmayı sevmediği için', 'Hasta olduğu için', 'İstanbul\'da olmadığı için']],
        ['İstiklal Marşı hangi yıl kabul edilmiştir?', '1921', ['1873', '1923', '1919']],
        ['Metnin türü hangisidir?', 'Bilgilendirici metin', ['Masal', 'Fıkra', 'Şiir']],
        ['Metne göre Mehmet Âkif\'in hangi özelliğinden söz edilemez?', 'Ressam olduğundan', ['Şiir yazdığından', 'Halkı birliğe çağırdığından', 'Kitap okumayı sevdiğinden']]],
      sozcuk: ['coşku', ['büyük sevinç ve heyecan', 'derin üzüntü', 'korku', 'yorgunluk']],
      sira: ['Mehmet Âkif İstanbul\'da doğdu.', 'Veteriner hekim olarak çalıştı.', 'Meclis marş yarışması düzenledi.', 'Mehmet Âkif şiirini gönderdi.', 'Şiir İstiklal Marşı olarak kabul edildi.'] }),
  };
  const CSS = `.t4-metin{font-size:3.95mm;line-height:1.45}.t4-metin>b{display:block;text-align:center;font-size:4.6mm;margin-bottom:1mm;color:#1d4e89;font-weight:400}.t4-metin p{margin:0 0 1.2mm;text-indent:4mm}`;
  return { T4, CSS };
};
