// Kâşif Adası (3. sınıf): motor.js'ten ÖNCE yüklenir. Harita arka planı, maskot ve yapım aşamasındaki yerler.
"use strict";
window.DUNYA = {
  ad: 'Kâşif Adası', kayit: 'ka3_ilerleme',
  giris: 'Kâşif Adası\'na hoş geldin. Adada keşfedilecek çok yer var. Bir yere dokun.',
  yakinda: [],
  // Harita: el boyaması ada görseli (oyun3/s/harita.webp, 1376x768). Yer konumları görseldeki boş alanlara göre.
  arka: () => `<rect x="-3000" y="-400" width="7200" height="1600" fill="#5fb3b5"/><image href="oyun3/s/harita.webp" x="-80" y="0" width="1360" height="760" preserveAspectRatio="xMidYMid slice"/>`,
  maskot: () => `<g transform="translate(1110 700)"><image href="oyun2/r/papagan.webp" x="-70" y="-120" width="140" height="140"/><g transform="translate(-220 -100)"><rect x="-150" y="-40" width="300" height="74" rx="18" fill="#fff" stroke="#3a86ff" stroke-width="3"/><path d="M110 30 L170 70 L130 30 Z" fill="#fff" stroke="#3a86ff" stroke-width="3"/><path d="M108 31 L134 31" stroke="#fff" stroke-width="5"/><text y="-6" text-anchor="middle" class="ttkb" font-size="22">Hoş geldin kâşif!</text><text y="24" text-anchor="middle" class="ttkb" font-size="22">Bir yere dokun.</text></g></g>`,
};
