# Okuma Treni — çalışma kuralları

Mirza Yağmur'un (Özel Antalya Nesibe Aydın İlkokulu, 1. sınıf) velilere ve sınıfa açtığı site.
Yayın: GitHub Pages, depo `1siniflarzumresi/okumatreni`. Velilerin linki depo köküdür; asla değişmemeli.

## Dosyalar
| Dosya | Ne | Nasıl değiştirilir |
|---|---|---|
| `index.html` | Giriş ekranı: logolar + "Okuma Treni" + iki düğme (Hızlı Okuma, Oyunlar) | Doğrudan düzenlenir |
| `hizli-okuma.html` | Hece/kelime/cümle hızlı okuma uygulaması (eski Okuma Treni). `?harfler=aneti` ile harf alır | Doğrudan düzenlenir; velilerin kayıtlı ayarları localStorage'da (`hece-hizli-okuma-v1`), anahtarı değiştirme |
| `akici-okuma.html` | Akıcı okuma merdivenleri (N'den M'ye, harf başına 2 merdiven, R/I/M'de hikâye). Robot okumaz; satırlar sırayla yanar (🐢🐇🐆), satıra dokununca durur, her okuma 1 yıldız (en çok 3, `ak_<harf>_<set>`). `?harfler=` ile yalnız öğretilmiş harflerin sekmeleri çıkar. Oyunlardaki "Akıcı Okuma" kartı harf yoluna göre bağlanır | Doğrudan düzenlenir; yeni metinde yalnız öğretilmiş harf, zengin kelimeler |
| `oyunlar.html` | ÜRETİLEN dosya, elle düzenleme | `kaynak/oyunlar-sablon.html` düzenlenir, sonra `python3 kaynak/derle.py` |
| `kaynak/oyunlar-sablon.html` | Oyunlar sitesinin kaynağı (tek dosya HTML+CSS+JS) | |
| `kaynak/veri/haftalar.json` | 2026-2027 PYP yıllık planından 1. sınıf haftaları: tarih, tema, harf, MAT kodları | Plan değişirse |
| `kaynak/veri/gorseller.json` | Okul/IB/PYP logoları ve TTKB Dik Temel Abece yazı tipi (base64) | |
| `kaynak/test/kontrol.js` | Test: `node kaynak/test/kontrol.js` (tam, birkaç dk) veya `... kontrol.js harf` (hızlı) | Her değişiklikten sonra çalıştır |

Değişiklikten sonra: `python3 kaynak/derle.py` → `node kaynak/test/kontrol.js harf` → büyük değişiklikte tam test.

## Pedagojik kurallar (pazarlıksız)
- **Sadece öğretilmiş harfler.** Çocuğun gördüğü her harf, kelime, seçenek, kart, balon seçili harfin durağına kadar öğretilmiş harflerden oluşur (`upTo(L)` / `KNOWN(L)`). Harf sırası `haftalar.json`'daki plandan gelir. Dikte yok (gösterip kapatıp yazdırma yok). Öğrenilmemiş harfli kelimede yalnızca ilk harf gösterilir (`revealW`).
- **Resimli Kelime Kur** her zaman kalacak: resim + alttaki harflere dokunarak yazma; sadece okunabilir resimli kelimeler.
- İpucu, formül, işlem işareti vermeden keşfettir. İşlem cümlesi (3 + 4 = 7) ancak doğru cevaptan SONRA gösterilir.
- Yazılar TTKB Dik Temel Abece. Çocuğa hitap eden yönergeler.
- Veli bölümünde tema, tarih, plan bilgisi YOK; sadece seçili harfe göre okuma kartları ve evde 10 dakikalık etkinlikler.
- Öğretmen bölümü kaldırıldı; geri ekleme.
- Görseller özenli olmalı (SVG çizim), baştan savma emoji yığını değil.

## Teknik kurallar
- Ses: `speak()` = çocuğun dokunuşuna cevap (öncekini keser). `sayAfter()` = otomatik ses, sıraya girer, yönergeyi asla kesmez. `setInstr()` sayAfter kullanır. Hız 0.72, cümleler ayrı okunur.
- Sahne geçişi: bir sonraki tura geçen her zamanlayıcı `afterSay(fn, ms)` kullanır; robot konuşmasını bitirmeden ekran değişmez.
- Çift dokunma: doğru cevapta `FB(metin, true)` çağrılır, bu `LOCK` koyar; yeni soru çizilince (`setInstr` veya `sb` yeniden yazılınca) açılır. Başarı yolunda FB kullanmayan yere `LOCK = true` ekle, yoksa turlar atlanır.
- Ekrana sığma: `fitStage()` her değişimde içeriği ölçüp `zoom` ile küçültür. Akıllı tahta (1920×1080, 1280×720) dahil hiçbir düğme ekran dışında kalmamalı. Koordinat hesaplayan kod zoom'u hesaba katmalı (bkz. Harf İzi `pos`).
- Harf yolu (tren) cihaz tarihine göre her pazartesi kendiliğinden ilerler (`CUR`). Durağa dokununca `SELL` değişir, tüm Türkçe oyunlar o haftaya ayarlanır.
- Türkçe ek hatası: sayı/kelime + ek üretme ("3'te", "kalemın"). Cümleyi eksiz kur ("3 sayısının üstünde", "5. katta").
- Her oyuna girişte içerik rastgele; aynı oyun iki kez aynı soruları sormaz.

## Yeni oyun eklemek
1. `GAMES.ad = function(arg){ ... return { stop(){...} }; }` — turlar `progBar`, `setInstr`, `FB`, `exitCard('ad')`.
2. Kart: `<button class="game gN" data-game="ad" data-mat="1.x.y">` doğru gruba (Türkçe / Sayılar / İşlemler / Geometri ve ölçme / Veri).
3. `GNAME` ve `EXIT` (çıkış kartı cümleleri) girdileri.
4. `data-mat` plandaki MAT kodu → o hafta "Bu haftanın konusu" etiketi otomatik.

## Mirza ile çalışma
- Kısa ve net yaz, övgü yok, pedagojik sorunları dürüstçe söyle.
- Önce konuşup listele, "güncelle" deyince toplu yap. Kota hassas.
- Teslim: sadece değişen dosyalar. Velilere duyuru "1. Sınıflar Zümresi" imzalı, "biz" diliyle.
- Velilere sitenin yapay zekâyla yapıldığı hissettirilmez (Claude linki kullanılmaz).

## Bekleyen
- Küp Kuleleri (`GAMES.kule`): 1-3. bölüm yapıldı (Tanış, Yuvaya kur, Dengele). Oyun sırasında rakam yok; doğru cevapta büyük cevap kartı (renkli noktalı onluk çerçeveler birleşir, sayılar ve 3 + 4 = 7 görünür), çocuk Devam'a basınca sonraki tura geçer. Sahne her bölümde değişir: şehir, liman, akşam, kış. Mirza beğenirse 4. Onluk yuvası (13 = 10 + 3) ve 5. Ne oldu? (rakamlar görünür, işlem cümlesi çözümden sonra) eklenecek.
- Çiftlik Kamyonu (`GAMES.ciftlik`, kendi kodu var, Küp Kuleleri ile kod paylaşmaz): saman balyası = 1, palette 10 balya ipe bağlanınca 1 palet. Kamyon ancak palet ve kalan balyaların hepsi yüklenince gider. Bölümler: Bağla ve yükle, Komşuyla aynı mı?, Paleti tamamla (10'a tamamlama), İpi çöz (sipariş). Sayılar 20'yi geçmez; oyunda "onluk/birlik" denmez. Amaç onluğun 10 birlik olduğunu hissettirmek.
- Kural: bir oyunu değiştirirken başka oyunun sahnesine de bak (ekran görüntüsü); sadece "oyun bitti mi" testi yetmez.
- Seviyeler (`LV`, `levelPick`, `celebrate`): Küp Kuleleri ve Çiftlik Kamyonu açılınca seviye seçici çıkar. Seviye bitince kutlama (havai fişek; çiftlikte inekler samanı yer), sonra Seviye 2. Açılan seviye cihazda `ky_lvl_<oyun>` ile tutulur; kilitli seviyeye 3 kez dokunmak öğretmen kilidini açar.
  - Küp Kuleleri Seviye 2 "Sayılarla Kur": bayrakta rakam, kulelerin altında sayı plakası; hedef, eksiği tamamla, fazlasını al (kartta 9 − 3 = 6), karışık.
  - Çiftlik Kamyonu Seviye 2 "Çiftlik Pazarı": paleti tamamla ve kalanı yanına koy (8 + 6 = 8 + 2 + 4 = 10 + 4), yarım paletleri eşleştir (10'un parçaları), kamyon geçiyor (hızlı bakış, rakam seçme), sipariş fişi (rakam → 1 palet + birlik, Gönder).
- Ses motoru tek başına "ip" kelimesini İngilizce "IP" okur; "bağ" kullan.
- Havuz (`GAMES.havuz`, ayrı kodu var): havuzda kırmızı kesik çizgi başlangıç su seviyesidir. Hortumdan yeşil kovalar su getirir, pompa kırmızı kovalarla su alır. Çocuk hesap yapmaz; suyun çizginin üstünde mi, altında mı, aynı yerde mi olduğunu, sonra da kaç kova fark olduğunu söyler. "🤝 Kovaları eşleştir" düğmesi bir yeşil ile bir kırmızıyı birbirini götürür diye eşler (net değişim). Cevap kartı: "a geldi, b gitti", eşli kovalar, tek kalanlar halkalı, "n kova fazla/eksik" veya "Aynı yerde!". Seviye 1: 2 olay (bazı turlarda gelen = giden). Seviye 2: 3 karışık olay. Seviye 3: havuzun üstü örtülü, başlangıç görünmez; yalnız kovalara bakarak karar verilir. Seviye sonunda başlangıç→son rakamı gösterilmez (L3). Su 1..20 kova arasında kalır. Her seviye 6 tur; her seviyenin fonu farklı (1: gündüz bahçe, 2: gün batımı sahil, 3: gece fenerleri). Cevap düğmeleri soru seslendirmesi bitince çıkar (`showAfter`); "kovalar gelip gidecek" yalnız seviyenin ilk turunda söylenir.
- Resfebe (`GAMES.resfebe`, Türkçe oyunları): Seviye 1 birleştir (resim + parça = kelime, ör. kol + tuk = koltuk; ot + el iki resim), Seviye 2 çıkar (resim − parça = kalan kelime, ör. kalemlik − lik = kalem; otel − ot = el). Cevap üç çizgili güzel yazı defteri satırına, altta öğrenme sırasıyla dizilmiş öğrenilen harflere dokunarak yazılır; bu haftanın harfi kırmızı çerçeveli. "Bitti"de doğru harf yeşil, yanlış kırmızı; harfe dokununca silinir. Robot resmin adını söylemez; yalnız iki yanlıştan sonra ipucu olarak söyler. Bilmeceler `RF` (ve yalnız Seviye 2 için `RF2`), resimler `RFIMG` (Gemini'de 4×2 ızgara olarak çizdirilip kesilmiş 240 px webp, base64 gömülü) — olmayan resim `RFPIC` SVG çizimine düşer (ör. 50). Yeni resim: aynı stil promptuyla ızgara çizdir, kes, `RFIMG`'e ekle. Kural: bir resim en çok 2–3 bilmecede; sıradan değil yaratıcı cevaplar (kalemlik, mumya, kolye, balkon…). Bir bilmece ancak resim adı, parça ve cevap öğretilmiş harflerle yazılabiliyorsa çıkar. Oo'da 6 bilmece, Mm'de 19. Resimde yazı olmaz.

## Ladin Ormanı
- Yeni sitenin adı Ladin Ormanı. Alan adı `ladinormani.com.tr` olacak (henüz alınmadı).
- 1-4. sınıf öğretmenleri, veliler ve çocuklar için genel bir site. Okul, IB ya da PYP logosu ve dili yok. İçerik MEB Maarif Modeli'ne ve MEB yıllık planlarına göre hazırlanır.
- Önce yalnızca 1. sınıf yayında. Diğer sınıflar içerikleri hazır oldukça eklenir.
- Harf yolu Maarif ses gruplarına göre ilerler (A N E T İ L / O K U R I M / …). Hangi harfte olunduğunu öğretmen seçer.
- Taslak `deneme/` klasöründe. Velilerin kullandığı kök klasör dosyalarına sorulmadan dokunulmaz.
- İleride ücretsiz örnekler ve ücretli öğretmen üyeliği olacak. Çocuklar için hesap yok; öğretmen sınıf linkini paylaşır. Üyelik Supabase ile ve ancak ilgi görülürse kurulur.
- Sayfada saat gösterilmez; tarih ve "Bu hafta" bilgisi gösterilir.
- Yazı tipi site genelinde Andika (SIL, OFL lisanslı; ücretli sitede ve PDF'lerde serbest). Dosyalar `deneme/fontlar/` içinde, `ortak.css`'te tanımlı; Google Fonts kullanılmaz. Yalnız normal (400) ve kalın (700) var; 800/900 yazılan yerler kalın görünür.
- 1. sınıfta yalnız Oyunlar ve Çalışma Kağıtları sekmesi var; yazılı ve ürün kağıdı yok. Harf yolunda bir harfe tıklanınca yalnız o harfin kağıdı görünür; toplu paketler yalnız harf seçili değilken listelenir; harf kağıtları hafta filtresine bağlı değil.
- Çalışma kağıtları: `node kaynak/calisma-kagitlari/uret.js [harf]` → `deneme/materyaller/1-sinif/turkce/<harf>.pdf` ve her ses grubu için toplu PDF (`a-n-e-t-i-l.pdf`, `o-k-u.pdf`…; `GRUPLAR`). Yazı TTKB (`kaynak/fontlar/ttkb.ttf`). Defter çizgileri eşit aralıklı; küçük harf kesikli çizgiye, büyük harf üst çizgiye oturur. Yazma yönü `yon.js` (öğretmen onaylı). Resimler Gemini siyah-beyaz boyama çizgisi, `deneme/materyaller/resimler/` (600 px). Akıcı okuma sayfası oyundan alınır: `node kaynak/calisma-kagitlari/akici-al.js`.
- Kağıtlar ses grubuna göre ilerler: A-L tanıma/yazma/hece; O-M + akıcı okuma merdiveni (R I M'de hikâye); Ü-Z okuma metni + doğru/yanlış; Ç-P kelime-resim, metin + çoktan seçmeli; H-J cümle tamamlama, uzun metin, açık uçlu soru, olay sıralama. Üretici her metni denetler: çocuğun okuyacağı yazıda öğretilmemiş harf varsa durur (`SADECE_KONTROL=1 node kaynak/calisma-kagitlari/uret.js`).
- Matematik kağıtları: `kaynak/calisma-kagitlari/matematik.js`, üretim `node kaynak/calisma-kagitlari/uret.js mat` (tek kağıt: `mat:sira`) → `deneme/materyaller/1-sinif/matematik/` ve ünite paketi. Çocuğun okuyacağı kelime yok (rakam, resim, şekil); bu ünitede + − = yok. Rakam yazma yönü `yon.js` (0-9, onay bekliyor). Sayma nesneleri Türkçe resim havuzundan.
- Üyelik (Faz 2): Firebase Authentication + Firestore, CDN'den modüler SDK, derleme yok. Dosyalar: `deneme/firebase-ayar.js` (config; `apiKey` boşken üyelik kapalı, site eskisi gibi çalışır), `deneme/uyelik.js`, `giris.html`, `hesap.html`, `kvkk.html`; kurallar `kaynak/firebase/firestore.rules`. Roller: `ogrenci` (varsayılan; belgede `rol` alanı yoksa) ve `ogretmen` (yalnız Firebase konsolundan yazılır; istemci `rol` yazamaz). Öğretmen talebi ayrı alan: `ogretmenTalebi`. Toplanan veri: ad, e-posta. Giriş duvarı yalnız arayüz düzeyinde; PDF'ler depoda açık. Önceki "Supabase" ve "çocuklar için hesap yok" kararlarının yerini bu aldı (öğrenci hesabını veli açar).
- Yazım: her yerde TDK yazımı ("kâğıt"). İlkokulda yazılı yok: sitede "yazılı" geçmez. Bülten kutusu kaldırıldı. `takvim-cikar.ps1` artık `kaynak/` içinde.

## Ladin Ormanı — sıradaki işler (devralan için)
Kullanıcı her şeye onay verdi; onay sormadan yap, kısa yaz, kota hassas.
1. Firebase kuruldu ve gerçek ortamda sınandı (Google girişi, e-posta kaydı, doğrulama, PDF). Eksik: `firebase-ayar.js` içinde `VERI_SORUMLUSU` ve `ILETISIM_EPOSTA` (kullanıcı ad/e-posta vermedi).
2. VİZYON (kullanıcı kararı, bütün dersler için geçerli): kâğıtlar standart ders sorusu gibi DEĞİL, Okuma Treni oyunları gibi olur: hikâye/sahne, tren, domino, zar, masa oyunu, Çiftlik Kamyonu (10 balya = 1 palet), Küp Kuleleri, kanguru ve sayı doğrusu, kavanoz, terazi. Keşfettir, işlem işaretini erken verme. Matematik HAFTALIK yapılır (`matematik.js` MAT: 'hafta-NN', MEB planındaki o haftanın konusu; her hafta en az 2 dolu sayfa; rakamlar tek tek, her rakama bir sayfa). 1-19. haftalar yapıldı. Sıradaki: 20-36. haftalar (toplama-çıkarma, eşit sayıların farkı, sıfırın etkisi, zihinden işlem, eşitlik, işlemleri yorumlama, paralar, geometrik şekiller, veri). 19. haftadaki 'Ne oldu?' (hikayeGel/hikayeGit) toplama-çıkarmaya giriş; işlem işareti ancak cevaptan sonra. Eski konu kâğıtlarının bileşenleri (kanguru/sayı doğrusu, boncuk, kavanoz, tırtıl, terazi2, kamyon) matematik.js'de duruyor, kullan. Üretici sayfa boşluğunu ölçer ('BOŞ: … mm'); 22 mm'den fazla boşluk bırakma, taşanı otomatik küçültür (en çok %78). Başlıklarda kelimelerin baş harfi büyük. Sonra: Matematik sonraki üniteler (`matematik.js`; sıradaki "Sayılar ve Nicelikler (2)": uzunluk ölçme, tartma, 15-19. haftalar) ve Hayat Bilgisi kâğıtları (henüz hiç yok).
3. 2-4. sınıflar için ders ders "ders notları" (yazılı yerine). Henüz başlanmadı; önce sınıf kartı ve sayfa yapısı gerekir.
4. Kök sayfalar (Okuma Treni): description, favicon, Open Graph eksik; `akici-okuma.html` 320 px'te 24 px taşıyor; birkaç düşük kontrast. Dokunma izni var ama veliler kullanıyor: küçük, güvenli değişiklik yap, `node kaynak/test/kontrol.js harf` çalıştır.
5. Kart önizleme resimleri (`*-onizleme.png`, materyaller.json `resim` alanı) hazır ama kartlarda gösterilmiyor; istenirse `1-sinif.html` `listeCiz` içine `<img loading="lazy">` eklenir.
6. Yazma yönleri (`yon.js`): A-L onaylı; O'dan J'ye harfler ve 0-9 rakamlar kullanıcı onayı bekliyor.
7. PDF'ler depoda açık; gerçek koruma için Firebase Storage kararı kullanıcıda (ücretli paket kararıyla birlikte).
8. TTKB yazı tipi lisansı belirsiz; ücretli içerikten önce netleşmeli.
- Renk: canlı ve ferah palet (kullanıcı: "cansız, hep yeşil olmasın"): gökyüzü→güneş başlık bandı, etkinlik kartları sırayla mavi, sarı, nane, mercan, mor. Resim boyutu kutudaki sayıya göre (`boyut(n)`). Resimler şimdilik siyah-beyaz çizgi; renkli sürümleri için promptlar `kaynak/resim-promptlari/renkli.md` (21 ızgara, sıra `renkli-sira.json`). İşleme: `python3 kaynak/resim-isle.py renkli <ızgara-no> <dosya> ...` → `deneme/materyaller/resimler-renkli/` (şeffaf arka plan). `resim()` renkli varsa onu kullanır; boya etkinlikleri `resimCizgi()`. Gelen: 6-21. ızgaralar (128 resim). Hepsi geldi (167 renkli). Yalnız "ay" çizgili kaldı (Gemini koyu arka planla çizdi; isterse arka plansız yeniden çizdirilir).
