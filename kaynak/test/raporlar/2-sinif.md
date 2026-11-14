# 2. sınıf denetim raporu (14 Kasım 2026)

Kaynak: `kontrol.js paket t2:* m2:* h2:*` + denetleyici (18 ajan, her biri 6 hafta). Yalnız rapor; hiçbir içerik düzeltilmedi.

## Ortak sorunlar (kodda tek yerden düzelir)
1. **Yazma çizgisi belirsiz:** 1 px açık mavi çizgi; Türkçe 140, Matematik 43, Hayat Bilgisi 31 etkinlik. Her maddeye tek satır.
2. **Boş alan:** son etkinlik altbilgiye uzatılıp içi eşit aralıkla dağıtılıyor → 25-140 mm boşluk. Türkçe 42, Matematik 42, Hayat Bilgisi 49 sayfa.
3. **"Yaz" diyor, yazma yeri yok:** Türkçe 8, Matematik 12, Hayat Bilgisi 2 etkinlik.
4. **Cevap anahtarı yok** (2. sınıfın hiçbir kâğıdında).
5. **Türkçe `sozcuk` (sözcük dedektifi):** doğru anlam hep ilk seçenek (karıştırma yok). Altı çizili kısım eksik ("tebrik" etti, "takip" ediyor).
6. **Türkçe `eslestir`:** bazı satırlar kendi eşinin hizasında kalıyor (cevap hazır); 21, 23, 24. haftada kaynak çiftleri yanlış yazılmış.
7. **Türkçe `dogruYazim` balonları:** 3 çiftte ızgara kayıyor, ipler birbirine değiyor (11, 13, 14. hafta).
8. **Türkçe yönerge:** "Soruları metne göre cevapla" altında kişisel soru (10, 17, 20, 28, 31, 33, 34, 36. hafta). Mektup/tebrik kartı yazmada "Başlık:" satırı (8, 9, 21, 25, 30. hafta).
9. **Türkçe zıt anlam dominosu:** "metinde bul" ama sözcükler metinde yok (5, 25, 35. hafta); 27. haftada yönerge eksik.
10. **Kesme işareti** TTKB'de ters tırnak (‘) gibi görünüyor (kesme öğretilen haftalarda yanlış örnek).
11. **Matematik tekrarları:** kule (1-2), şekil sayfası (3→4 kopya), sayı evleri (7, 9), tahmin kavanozu (13-14), büyüyen örüntü (12-13), çarpım tablosu (22-23), kesir boyama (26-27), zaman eşleştirme (28-29), simetri (33→34 kopya), anket (35-36).
12. **Matematik geri sayma sayı doğrusu** ters yönde (10. ve 11. hafta).
13. **Hayat Bilgisi:** etkinlikler çoğunlukla ezber D/Y, resim seçme ve çizim; senaryo yok. Kazanımlar çoğu hafta "kısmen". Aynı resimler haftalar boyu tekrar (bulaşık, çöp, köpek, çiçek).

## Haftaya özgü bulgular

### Türkçe (`turkce2.js`)
- 01-2: "Kalem, defteri … özledim dedi." dolaylı/dolaysız karışık.
- 02-1: amca resmi metinle çelişiyor (bankta oturuyor); resim yanı satırlarda sözcük arası açılıyor.
- 03-2: D/Y 2 "Çocuklar elmaları tek başına topladı." belirsiz.
- 04-3: kesme kuralı "kedinin" örneğiyle çelişiyor; tek soruya "Soruları" denmiş.
- 05-3: domino sözcükleri metinde yok; büyük harf cümlelerinde tek satır.
- 06-1: "denize bakan" Selanik evi tarihî olarak yanlış. 06-2: "Gittiği okul" birden çok cevaplı; kimlik kartında ilgisiz kitap resmi. 06-3: "Zübeyde Hanım" unvan kuralı verilmemiş; dil bilgisi sayfasında anlama sorusu.
- 07-1: bayrak resminde 8. haftanın Kızılay kolisi var; "Resimlere bak" iki kez.
- 08-3: düzeltilecek cümlelerde gereksiz virgül ("kızılay, afetlerde").
- 09-2: "saygı duruşu" metinde geçmiyor ama soruluyor.
- 10-3: "hafıza – kartal gözü gibi" bozuk benzetme.
- 11-3: duyu kutuları "metinden" diyor, sözcükler metinde yok; bazıları iki kutuya giriyor.
- 12-3: benzetme eşleştirmesi: "köprü gibi" benzetme değil, "ırmak kadar" "gibi" değil, "tren gibi" metinle farklı.
- 13-2: "hasat tablosu" yönergesi ile fidan boyu satırı. 13-3: eşleştirmede hizalı cevap. 13-4: "gözle", hayvan tartmak gerçek dışı.
- 14-1: "Anlamı kurum belirler" yanlış bilgi. 14-3: hizalı eşleştirme.
- 15-2: "fikrini kim değiştirdi" iki cevaplı. 15-3: "." mi "!" mi belirsiz.
- 16-3: "su gerçeğini duyunca" bozuk; D/Y "kapıya / kapının yanına".
- 17-2: konu/ana fikir başka metne (Efe'nin kitabı) ait; metne dayalı soru yok.
- 18-3: "Kar yağmış" . / ! belirsiz.
- 19-1: "sırayla sıraya dizdim".
- 20-2: D/Y 1 belirsiz; tırnaklı cümle metinden aynen alınmamış. 20-3: "Mert: “Teşekkürler.” dedi." TDK'ye aykırı doğru seçenek.
- 21-2: "ne çaldı" iki cevaplı; "hal hatır" → "hâl hatır".
- 22-2: "En Yararlı Fikir" tahmin edilecek sözcük değil.
- 23-1: "her pazartesi" / "her sabah" çelişkisi; resimde ilgisiz fıçı. 23-4: "Şiirinin adı" ile "Başlık" aynı.
- 24-3: "kaçışıyor"un zıttı yok; çıkarım eşleştirmesinde çıkarım yok; "kurak" iki etkinlikte.
- 26-3: "Hezarfen'in uçuşunun her ayrıntısı" cümle değil.
- 27-1: okuma öncesi sorusu bozuk; resim metinle uyuşmuyor. 27-2: sıralama seçenekleri ters sırada.
- 28-1: "parmağını kaldırdı", "çevirdiği not" belirsiz. 28-3: tartışmasız görüş cümlesi.
- 29-2: 5 eşya / 4 satır. 29-3: atasözleri hemen üstte yazılı; sınıflandırma kutuları örtüşüyor.
- 31-1 ve 35-1: model mektup tek paragraf (hitap/kapanış/imza ayrı satırda değil). 31-3: "isteriz" iki cevaplı.
- 32-1: "dört gün" yanlış (üç gün), "İlk eski geminin aynısı" bozuk. 32-2: oyuncak yelkenli resmi; "Tarih" belirsiz. 32-3: tarih eşleştirmesi hizalı ve metin dışı.
- 33-1: "dinlenmek" yanlış sözcük. 33-3: Hak/Sorumluluk/İkisi de belirsiz; dil bilgisi etkinliği yok.
- 34-3: iki nokta-tırnak örneği yok; tırnaktaki söz metinde yok.
- 35-2: D/Y 4 belirsiz. 36-2: 5 eşya / 4 satır. 36-3: . / ! belirsiz.

### Matematik (`matematik2.js`)
- 02-1: kule 1. haftanın aynısı; sayımlar tekdüze; "külah en üste" sorusu belirsiz; kazanım (yapı sentezleme) ölçülmüyor. 02-2: yönerge kartla uyuşmuyor.
- 03-1: ev, robot, roket şekil resimleri hatalı (üst üste/kopuk) → sayım cevapları belirsiz.
- 04-1: dikdörtgen çerçeveden taşıp kesiliyor. 04-2: 3. haftanın kopyası; kazanım (biçim değişmezliği) yok.
- 05-1: sürahi/şişe; "1 şişe = 1 kova" fiziksel olarak yanlış; tahmin anlamsız (cevap resimde). 05-2: kaşıkla şişe ölçmek uzun.
- 06-3: bilmece "ondan 0 fazla"; "onar onar giden sütun" belirsiz.
- 07-2, 09-1: "önündeki/arkasındaki komşu" belirsiz.
- 10-1: kurbağa kutuları sıkışık; timsah ilk çifti 9. haftayla aynı. 10-2, 11-1: geri sayma sayı doğrusu ters.
- 12-2: noktalı kâğıt etkinliği kazanım dışı; 1-3-6-10 örüntüsü düzey üstü.
- 13-1: tahmin kavanozunda karşılaştırma grubu yok. 14-1: 13'ün kopyası; "33 + 23" iki kez; problem yok. 14-3, 16-3: problem yazarında veri yok.
- 15-1, 15-2: bağlamsız işlem (kazanım günlük yaşam problemi).
- 16-1: market cevapları 21, 21, 22, 21; 3 × 7 çarpma (konu dışı).
- 17-1: 80 + 30 = 110 (aralık dışı); 5'le biten yuvarlama kuralı yok. 18-1: "50 − 20" iki kez. 18-2: yazılı algoritma, kazanım zihinden işlem.
- 19-2: düz toplama, ilişki yok. 21-2: bölme haftasında çarpma. 22-1: "5 × 4" için kutu yok. 22-2: tahmin yok; "kolide 6 yumurta". 23-2: tablo 22'nin aynısı; problem yönergesi toplama-çıkarma diyor.
- 27-1: kesir boyama 26'nın aynısı; kumbara başlığı, para yok. 28-1: 100 + 50 + 20 = 170 (aralık dışı); ürünler 27'nin aynısı.
- 29-1: 8.45 saati 9.45 gibi okunuyor. 29-2: sofra resmi yemek yemiyor; zaman eşleştirmesi 28'in aynısı. Saat rakamları çizgilere değiyor.
- 30-1, 31-1: cetvel ölçekleri farklı; nesneler 0'dan başlamıyor → ölçüm cevapları yanlış. 30-2: "kasa elma" tek elma; standart birimin gerekliliği yok.
- 31-2: terazi yok, kıyas tahmin değil. 32-1: resim-yazı uyumsuz; kroki soruları belirsiz. 32-2: örnek cevabı veriyor; "okulun solunda" boş.
- 33-1, 33-2: simetri öğeleri ve harfler belirsiz. 34-1, 34-2: 33'ün kopyası.
- 35-1: çilek 9, eksen 0-8; üç veri grubu (kazanım en çok iki). 35-2: elma resmi, "kimden fazla" eksik. 36-1: hayvan verisine meyve sorusu. 36-2: 35'in kalıbı; 28 + 17 öğrenci gerçek dışı.

### Hayat Bilgisi (`hayat2.js`)
- 01-1: sıralama resimleri numara kutularının arkasında kesik; diş fırçalama iki yere gidebilir.
- 02-1: "sınav" sözcüğü; tek durum. 02-2: "Öğle" kutusunun kesin öğesi yok, yatak resmi sabah işi.
- 03-1: ezber davranış maddeleri; söz kesme resmi yanlış.
- 04-2: çatışma çözme yok.
- 05-1: oylama tablosunda veri yok; sıra bekle/söz kesme resimleri belirsiz. 06-1: 5. haftanın resim etkinliği birebir. 06-2: "Senin sınıfa önerin ne?" bozuk; kazanım ölçülmüyor.
- 08-1: 7. haftanın tekrarı, ezber D/Y. 09-2: kilitli kutu yok; resimler bilgi türünü göstermiyor; okul iki etkinlikte çelişiyor.
- 10-1, 10-2: çevrim içi güvenlik yerine ekran süresi ve çizim.
- 11-2: levha boyama belirsiz; DUR eşleşmesi cevaplı.
- 12-1: 112 sıralamasının tek doğrusu yok. 12-2: yabancı ↔ polis eşleşmesi yanlış mesaj.
- 13-1: aile ağacı kutuları üst üste; ihbar senaryosu yok. 13-2: bayram-ziyaret resminde kız çocuğunun başında başlık var (fes); yorum sorusu yok.
- 14-1: konu dışı ev görevi eşleştirmesi; köpek resmi beslemiyor. 15-1: bağır resmi sınıfta (toplu taşıma değil). 15-2: eşleşme 1. sayfada verilmiş.
- 16-1: köpek resmi; sonuç düşündüren durum yok. 17-1: mekânı belli olmayan resimler; "el kaldırmak" sorumluluk değil.
- 18-1: gün doğumu yer değil; masal şatosu kale değil; haftanın kazanımı ölçülmüyor.
- 19-1: harita-okul eşleşmeye uymuyor; kaymakam/vali yok. 19-2: resimler cevabı veriyor; "sen/siz" tutarsız.
- 20-1: resimler belediye hizmeti değil, çocuk davranışı; kaynak kullanımı yok.
- 21-1: tablo tümüyle dolu; metinsiz ezber D/Y. 22-1: millî bayram sorusunda iftar ve bayram ziyareti doğru sayılıyor; kazanım (öğrenim hayatı) yok.
- 23-1: 19 Mayıs adı bölünmüş, 30 Ağustos yok; yanlış madde yok. 23-2: yalnız çizim. 24-1: yanlış davranış örneği yok; resimler tekrar.
- 26-2: "kışta hangileri" hepsi doğru. 27-1, 27-2: başlık "Adım:" ile çakışıyor; pusula yönergesi cevabı veriyor, kutular kesik.
- 28-1: afet çantasına çanta seçeneği; su içen çocuk; gaz lambası el feneri değil. 28-2: "merdivene koşarım" yanında doğru davranış resmi.
- 29-1: cevap sütunu dar; iki apaçık D/Y. 29-2: resim cevabı veriyor; tekrar.
- 30-1: "gece-ekran" resmi uyuşmuyor; dedektif tablosu yönü tutarsız. 30-2: orman ve tarla doğal kaynak sayılabilir; su içen çocuk.
- 32-1: "bilim insanı" araç değil; cevap sütunu dar. 33-1: posta kutusu iki eşli. 34-1: 33'ün tekrarı, fener/mum çelişkisi; öngörü gerekçesiz. 34-2: yazma yeri yok.
- 35-1: palet/keman sanat eseri değil; "yontu" ağır. 36-2: kare yok.
