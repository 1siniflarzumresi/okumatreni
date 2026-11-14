# 3. sınıf denetim raporu (14 Kasım 2026)

Kaynak: `kontrol.js paket t3:* m3:* h3:* f3:*` + denetleyici. Yalnız rapor; hiçbir içerik düzeltilmedi.

## Kontrol betiği
- Taşma, kesilen öğe, binme, bozuk görsel: YOK.
- Türkçe 111 sorunlu sayfa (soluk yazma çizgisi 140, boş alan 52, yazma yeri yok 1); Matematik 59 (boş alan 55, belirsiz 37, yok 6); Hayat Bilgisi 56 (boş alan 52, belirsiz 42, yok 3); Fen 62 (boş alan 57, belirsiz 50).

## Hayat Bilgisi (`hayat3.js`)
- 1-12. hafta: 24 sayfadan 14'ü kaldı.
  - 01-1: ağın alt dairesi kesik; "alttaki kutular" aslında sağda. 02-1: matematik yardımı durumuna oyun parkı resmi.
  - 03-2: yalnız 2 hak-sorumluluk çifti, davranış ölçülmüyor. 04-1: görevler ev işi (konu okul).
  - 05-1, 11-2: "altına yaz" ama çizgi yok. 06-2: mektup gövdesine tek çizgi. 07-2: "her teneffüs" → "her teneffüste".
  - 08-1: "arabasına çağırıyor" resminde araba yok; gaz kokusu durumuna yanan tava resmi (yangına müdahaleye yönlendirebilir); "Okul çıkışı" → "Okul çıkışında". 08-2: yönerge kişi karışık; 112'den sonra boş çizgi.
  - 09-1: "Büyüğüme sorarım" sütununa giden öğe yok. 09-2: 112 sıralaması tek doğrulu değil. 10-1: sır durumuna ilgisiz resim; "hayır deme" etkinliği yok.
  - Ortak: D/Y maddeleri bağlamsız; afiş şablonu 4, 5, 12. haftalarda aynı.

## Türkçe (`turkce3.js`)
- 25-30. hafta: 24 sayfadan 5'i kaldı.
  - 26-1: gözlemevi resminde teleskop var, metin "teleskop yoktu" diyor (2. sayfadaki D/Y ile çelişiyor); "binlerce yıldız" → "bin kadar".
  - 28-4: dört kare öykü sayfası bozuk — `.t3-dortkare i` seçicisi yazma çizgilerini de kutuya çeviriyor (turkce3.js:675), numaralar kenara biniyor.
  - 29-1: usta metinde kadın (Nesrin Hanım), resimde erkek; 1 Mayıs tatil günü gezi → "öncesinde".
  - 30-2: "Bütün köy" satırının metinde karşılığı yok. 30-4: mektupta "Başlık:".
  - Küçük: 29-3 atasözü anlamı iki eşe uyuyor; 30-1 mayısta "kış için yufka"; 25-3, 30-3 sözcük dedektifi çeldiricileri zayıf; 27-2 yönerge eksik.
