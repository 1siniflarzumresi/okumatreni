# Okuma Treni — çalışma kuralları

Mirza Yağmur'un (Özel Antalya Nesibe Aydın İlkokulu, 1. sınıf) velilere ve sınıfa açtığı site.
Yayın: GitHub Pages, depo `1siniflarzumresi/okumatreni`. Velilerin linki depo köküdür; asla değişmemeli.

## Dosyalar
| Dosya | Ne | Nasıl değiştirilir |
|---|---|---|
| `index.html` | Giriş ekranı: logolar + "Okuma Treni" + iki düğme (Hızlı Okuma, Oyunlar) | Doğrudan düzenlenir |
| `hizli-okuma.html` | Hece/kelime/cümle hızlı okuma uygulaması (eski Okuma Treni). `?harfler=aneti` ile harf alır | Doğrudan düzenlenir; velilerin kayıtlı ayarları localStorage'da (`hece-hizli-okuma-v1`), anahtarı değiştirme |
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
