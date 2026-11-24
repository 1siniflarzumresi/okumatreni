// Balon Yolculuğu (4. sınıf): motor.js'ten ÖNCE yüklenir. Türkiye haritası (stilize), balon rotası, maskot Leylek.
"use strict";
window.DUNYA = {
  ad: 'Balon Yolculuğu', kayit: 'by4_ilerleme',
  giris: 'Balonumuz Türkiye\'nin üstünde uçuyor. Bir durağa dokun, orada seni bir görev bekliyor.',
  yakinda: [],
  arka: () => `<defs><linearGradient id="bDeniz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#74c0fc"/><stop offset="1" stop-color="#339af0"/></linearGradient></defs>
    <rect x="-3000" y="-400" width="7200" height="1600" fill="url(#bDeniz)"/>
    ${Array.from({ length: 18 }, (_, i) => `<path d="M${-40 + i * 72} ${110 + (i % 4) * 160} q12 -8 24 0 q12 8 24 0" fill="none" stroke="#d0ebff" stroke-width="3" opacity=".7"/>`).join('')}
    <path d="M70 205 L165 180 L205 222 L248 205 L380 192 L520 160 L680 172 L820 182 L940 192 L1060 212 L1150 248 L1162 330 L1130 420 L1066 470 L985 505 L900 545 L800 566 L700 545 L640 585 L560 606 L470 588 L400 606 L320 576 L250 566 L180 526 L136 476 L104 422 L126 372 L94 332 L126 290 L168 278 L150 252 L104 252 Z" fill="#c3e6a5" stroke="#7a9e5a" stroke-width="4" stroke-linejoin="round"/>
    <path d="M520 160 Q640 300 700 545" fill="none" stroke="#a9d18e" stroke-width="3" opacity=".7"/><path d="M300 240 Q500 380 800 330 Q1000 300 1150 330" fill="none" stroke="#a9d18e" stroke-width="3" opacity=".7"/>
    <text x="600" y="110" text-anchor="middle" class="ttkb" font-size="34" fill="#fff" opacity=".9">Karadeniz</text><text x="470" y="690" text-anchor="middle" class="ttkb" font-size="34" fill="#fff" opacity=".9">Akdeniz</text><text x="30" y="470" class="ttkb" font-size="30" fill="#fff" opacity=".9" transform="rotate(-80 30 470)">Ege</text>
    <path d="M180 250 C300 300 420 260 520 300 S640 420 640 430 S760 300 880 240 S1000 340 1000 340" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="4 14" stroke-linecap="round"/>`,
  maskot: () => `<g transform="translate(1110 640)"><image href="oyun2/r/leylek.webp" x="-75" y="-140" width="150" height="150"/><g transform="translate(-230 -110)"><rect x="-160" y="-40" width="320" height="74" rx="18" fill="#fff" stroke="#e8590c" stroke-width="3"/><path d="M120 30 L170 64 L140 30 Z" fill="#fff" stroke="#e8590c" stroke-width="3"/><path d="M118 31 L144 31" stroke="#fff" stroke-width="5"/><text y="-6" text-anchor="middle" class="ttkb" font-size="22">Balona hoş geldin!</text><text y="24" text-anchor="middle" class="ttkb" font-size="22">Bir durağa dokun.</text></g></g>`,
};
