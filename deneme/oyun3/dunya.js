// Kâşif Adası (3. sınıf): motor.js'ten ÖNCE yüklenir. Harita arka planı, maskot ve yapım aşamasındaki yerler.
"use strict";
window.DUNYA = {
  ad: 'Kâşif Adası', kayit: 'ka3_ilerleme',
  giris: 'Kâşif Adası\'na hoş geldin. Adada keşfedilecek çok yer var. Bir yere dokun.',
  yakinda: [],
  arka: () => `<defs><linearGradient id="aGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0ff"/><stop offset="1" stop-color="#dff5ff"/></linearGradient>
      <linearGradient id="aDeniz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2ea3e6"/><stop offset="1" stop-color="#1769aa"/></linearGradient></defs>
    <rect x="-3000" y="-400" width="7200" height="1600" fill="url(#aGok)"/>${bulut(220, 60, .8)}${bulut(700, 40, .6)}${bulut(1080, 80, .7)}
    <rect x="-3000" y="150" width="7200" height="1100" fill="url(#aDeniz)"/>
    ${Array.from({ length: 14 }, (_, i) => `<path d="M${-60 + i * 95} ${190 + (i % 3) * 18} q12 -8 24 0 q12 8 24 0" fill="none" stroke="#bfe9ff" stroke-width="3" opacity=".7"/>`).join('')}
    <path d="M60 760 C40 560 110 320 330 250 C520 190 700 150 900 200 C1080 240 1180 380 1170 560 C1160 700 1100 760 1060 760 Z" fill="#f3d9a4"/>
    <path d="M110 760 C100 580 160 350 350 290 C530 235 700 200 880 240 C1040 275 1130 400 1120 560 C1115 690 1070 760 1040 760 Z" fill="#8cc97b"/>
    <path d="M250 300 L380 150 L470 250 L560 120 L700 270 Z" fill="#9aa9b8"/><path d="M380 150 L410 185 L350 185 Z M560 120 L600 165 L520 165 Z" fill="#fff"/>
    <path d="M600 760 L600 520 M600 520 C520 480 380 560 260 610 M600 520 C680 470 820 400 980 330 M600 520 C640 470 640 440 640 430" fill="none" stroke="#e7c98a" stroke-width="30" stroke-linecap="round"/>
    <path d="M600 760 L600 520 M600 520 C520 480 380 560 260 610 M600 520 C680 470 820 400 980 330 M600 520 C640 470 640 440 640 430" fill="none" stroke="#f6e3b5" stroke-width="18" stroke-linecap="round" stroke-dasharray="2 20"/>
    ${[[160, 560, .6], [1080, 470, .55], [300, 700, .5], [900, 640, .5], [760, 330, .45], [140, 680, .55]].map(([x, y, s]) => agac(x, y, s)).join('')}`,
  maskot: () => `<g transform="translate(1100 160)"><image href="oyun2/r/papagan.webp" x="-70" y="-120" width="140" height="140"/><g transform="translate(-220 -100)"><rect x="-150" y="-40" width="300" height="74" rx="18" fill="#fff" stroke="#3a86ff" stroke-width="3"/><path d="M110 30 L170 70 L130 30 Z" fill="#fff" stroke="#3a86ff" stroke-width="3"/><path d="M108 31 L134 31" stroke="#fff" stroke-width="5"/><text y="-6" text-anchor="middle" class="ttkb" font-size="22">Hoş geldin kâşif!</text><text y="24" text-anchor="middle" class="ttkb" font-size="22">Bir yere dokun.</text></g></g>`,
};
