# 1. sınıf denetim raporu (14 Kasım 2026)

Kaynak: `kontrol.js paket` (harf kâğıtları, mat:*, hb:*) + denetleyici. Yalnız rapor; hiçbir içerik düzeltilmedi.

## Kontrol betiği
- Öğretilmemiş harf: YOK (harf sırası haftalar.json ile aynı).
- Türkçe (harf kâğıtları): 10 sorun (8 soluk yazma çizgisi: f, h, j, v harflerinin 2-3. sayfası; 2 boş alan: n-2, m-3).
- Matematik: 34 sorunlu sayfa (boş alan 9, yazma yeri belirsiz 16, yok 13); 7-1, 7-3, 10-2 altbilgiye 1-2 mm biniyor; 30-2 para resimleri kesik; 14-1 kutudan taşan yazı.
- Hayat Bilgisi: 31 sorunlu sayfa (çoğu boş alan); 2-1 altbilgiye 0,8 mm biniyor.
- Not: matematik.js hafta numaraları takvim.json ile uyumlu, haftalar.json bir hafta kayık.

## ACİL (güvenlik)
- **Hayat Bilgisi 9-1 ve 10-1:** üç lambalı ARAÇ ışığı yeşilken "Bak, sonra karşıya geç" öğretiliyor; yaya ışığı yok. Yanlış ve tehlikeli. → İki lambalı yaya ışığı (kırmızı duran insan, yeşil yürüyen insan).
- **Hayat Bilgisi 12-2:** yabancıdan şeker alma durumu polisle eşleşiyor (doğrusu uzaklaşıp büyüğe haber vermek).
- **Hayat Bilgisi 29-2:** orman yangını ↔ yangın tüpü (orman yangınına müdahale edilmez, 112 aranır).

## Matematik (`matematik.js`)
- 01-1: toplar "giriş yok" işaretine benziyor.
- 02-1: araba yönü ayırt edilmiyor. 02-2, 03-1, 03-2: `esiniBul` model ile "aynı boy" seçeneği farklı boyda (doğru seçenek yok), büyük seçenek hücreden taşıyor; kare/nokta çorap deseni aynı görünüyor.
- 06-3: Zar Yolu geri okları ileri gösteriyor; tahta 29'a kadar (sınır 20).
- 07-3 (rakam 0): "0 tane resim boya" görevsiz; 4 kutunun 3'ü boş; "0 tane şeyi say".
- 10-1: hayvan–yiyecek eşleşmesinde top, yumurta, çiçek yiyecek değil; eşit satırın cevabı yok.
- 11-1: ilk iki sayı doğrusu aynı. 11-2: eldiven/çorap çift resmi → 10 mu 20 mi belirsiz. 12-1: 50'den geri sayma (sınır 20).
- 14-1: kavanoz kartları panelden taşıyor; çizilen bilye sayısı istenenden az (16→15, 19→12, 14→11; 15. haftada da).
- 17-2: masayı silgiyle ölçmek 20'yi aşar. 18-2, 19-1, 24-2, 25-2, 26-2: terazi küpleri/balyaları SVG kenarında kesik.
- 20-1, 21-1, 24-1 (otobüs) ve 20-2, 21-2, 23-1 (kuş teli): inenler/uçanlar hem içeride hem dışarıda çiziliyor → iki cevap; "hepsi indi" (0) resimde görünmüyor.
- 25-1, 26-1: top boyu sayıya göre değişiyor, "kısa tarafa" yanıltıcı.
- 27-2, 30-1: kumbara yazıyor, resim cüzdan. 28-1: tavuk 6 yumurta. 28-2: bilye/plaj topu. 29-2: 6 yaş/bebek resmi. 28-3, 29-3: yazma satırı karttan taşıyor.
- 30-2: para eşleştirmesinde sağ sütun kesik, banknotlar üst üste.
- 31-2, 32-2, 33-1, 34-1: noktalı kâğıt şekillerinin köşeleri noktaya denk gelmiyor. 31-2, 33-2: robot/ev gövdesi kare mi dikdörtgen mi belirsiz.
- 32-1: top hem daire hem küre; "üçgen" resmi şeklin kendisi. 32-1, 33-1: cisim eşleştirmesi karıştırılmamış; 33-1 = 32-1. 33-2: küpe uyan eşya yok, saat küre değil.
- 35-1, 36-2: "tablodaki sayılar" ama tablo yok, hücreler kare değil, cevap yeri yok. 35-2: "meyveleri say" ama oyuncak.
- Kazanım: 1-2 (yön-uzaklık talimatı yok), 9-10 ("az" yok), 12 (büyüyen örüntü yok), 13 (artan/azalan kısmen), 14-15 (tahminde örnek çokluk yok), 15-19 (tahmin adımı az), 27-30 (toplama-çıkarma ilişkisi yok), 30-31 (100/200 TL yok), 34-36 (veriye dayalı karar zayıf) kısmen.

## Hayat Bilgisi (`hayat.js`)
- Ortak: `dy` doğru/yanlış yüzleri boyalı basılıyor, yönerge "yüzü boya" → çocuğun seçimi görünmüyor (3, 4, 5, 7, 8, 9, 10, 11, 12. haftalar).
- 02-1: okul eşleştirmesi çok cevaplı; çantaya çanta, su içen çocuk. 03-2: 4. haftanın konusu ve aynısı. 04-2: aynı 6 resim tekrar.
- 05-1: kütüphane ↔ parmak kaldır (doğrusu sessizlik). 05-2: "çöpü yere atmak" yanında kutuya atan çocuk.
- 06-1: ben kartı 01-1'in aynısı; duygu yüzleri boyalı; gülen örümcek/yılan "korku" çağırmıyor.
- 07-1: akvaryum balığı yiyecek değil; yönerge bozuk. 08-1: resim-yazı uyumsuz, yanlış madde yok. 08-2: polis arabası "kişi" değil; mutlu anı çizimi konu dışı.
- 09-2: otobüs kaldırıma biniyor. 10-1, 10-2: 9. haftanın tekrarı. 11-1: deprem ↔ ambulans tek değil; yabancı durumu acil değil. 11-2, 28-2: Çök-Kapan-Tutun üç adımda aynı resim.
- 12-1: "yardım edenler" belirsiz. 12-2: çanta çizimi yok.
- 15-1, 24-1: resim yazıyla çelişiyor. 15-2: 14-1'in aynısı. 17-1: görev resimlerinde çocuk var, eşleşme tek değil, bebek görevi "uyumak". 17-2, 18-2: görev çizelgesi 3. kez; 18. hafta konu dışı.
- 19-2, 20-2, 23-2: bayrak yapma 3 kez, yıldız şablonu kesik. 20-1: 19'un aynısı. 21-1, 21-2: Atatürk'ün hayatı yok. 22-1: anlamsız eşleşmeler, dinî bayram öğeleri millî bayramda. 22-2: "İstiklal" şapkasız. 23-1: şeker tabağı millî bayramda.
- 25-2: inek/tavuk iki cevaplı, akvaryum balığı deniz değil. 26-1, 27-1: gündüz/gece öğeleri iki zamanda da olur. 26-2, 27-2: dar sütun düzeni, aynı sayfa. 28-1: deprem yerine masa altı resmi. 29-1: gaz lambası, su içen çocuk.
- 31-1: gökkuşağı davranış değil. 32-1: mikroskop ↔ el yanlış. 33-1: yer mantarı (şişe mantarı değil), 32'nin tekrarı. 34-1: kitap ↔ bilgisayar, radyo iki eşli. 34-2: top teknoloji ürünü sayılabilir. 35-2, 36-1: duygu tahmini temelsiz; sanatçı yerine araç. 36-2: resim davranışla uyuşmuyor.
- 19-1 notu: mavi çeldirici bayrak Doğu Türkistan bayrağının aynısı; başka bir yanlış seçilmeli.
- Kazanım ölçülmüyor: 18 (yaşadığı yer), 21 (Atatürk'ün hayatı), 25 (dinî bayram duyguları), 26 (doğa gözlemi), 34-36 (merak ettiklerini sorma). Diğer haftaların çoğu kısmen.

## Türkçe (harf kâğıtları)
- Denetleyici sonuçları bekleniyor.
