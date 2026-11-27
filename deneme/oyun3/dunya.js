// Kâşif Adası (3. sınıf): motor.js'ten ÖNCE yüklenir. Harita arka planı, maskot ve yapım aşamasındaki yerler.
"use strict";
window.DUNYA = {
  ad: 'Kâşif Adası', kayit: 'ka3_ilerleme',
  giris: 'Kâşif Adası\'na hoş geldin. Adada keşfedilecek çok yer var. Bir yere dokun.',
  yakinda: [],
  // Harita: el boyaması ada görseli (oyun3/s/harita.webp, 1376x768). Yer konumları görseldeki boş alanlara göre.
  arka: () => `<rect x="-3000" y="-400" width="7200" height="1600" fill="#5fb3b5"/><image href="oyun3/s/harita.webp" x="-80" y="0" width="1360" height="760" preserveAspectRatio="xMidYMid slice"/>`,
  maskot: () => `<image href="oyun3/r/kaptan-papagan.webp" x="-10" y="560" width="190" height="190"/>`,
};
