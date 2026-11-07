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
