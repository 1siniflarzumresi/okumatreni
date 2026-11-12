// Ladin Ormanı — 2. sınıf Hayat Bilgisi haftalık çalışma kâğıtları (MEB 2026-2027 taslak yıllık planı).
// Vizyon: ders kitabı sorusu değil; sahne, karar anı, plan, oyun. 2. sınıf çocuğu yönergeyi kendisi okur.
// Resimler: resimler-hayat2 (2. sınıf ızgaraları), resimler-hayat, resimler-renkli. Trafik levhaları SVG.
// Üretim: node kaynak/calisma-kagitlari/uret.js h2   (tek hafta: h2:hafta-05)
module.exports = ({ etk, resim, numarala, rastgele }) => {
  const R = t => rastgele(t);
  const karistir = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const S = (w, h, ic, mm) => `<svg viewBox="0 0 ${w} ${h}" style="width:${mm}mm;height:${(mm * h / w).toFixed(1)}mm;display:block;margin:auto">${ic}</svg>`;
  const cizgi = n => `<div class="h2-cizgi">${'<i></i>'.repeat(n)}</div>`;
  const kutu = (g = 12) => `<span class="h2k" style="width:${g}mm"></span>`;
  const yuz = (mutlu) => S(40, 40, `<circle cx="20" cy="20" r="17" fill="${mutlu ? '#ffd23f' : '#9fd3f5'}" stroke="#1f2a24" stroke-width="2"/><circle cx="14" cy="16" r="2" fill="#1f2a24"/><circle cx="26" cy="16" r="2" fill="#1f2a24"/>${mutlu ? '<path d="M12 24 q8 7 16 0" fill="none" stroke="#1f2a24" stroke-width="2.2" stroke-linecap="round"/>' : '<path d="M12 28 q8 -6 16 0" fill="none" stroke="#1f2a24" stroke-width="2.2" stroke-linecap="round"/>'}`, 9);

  // ---------- trafik levhaları (SVG) ----------
  const LEVHA = {
    dur: '<polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="#e63946" stroke="#fff" stroke-width="4"/><polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="none" stroke="#1f2a24" stroke-width="1.5"/><text x="50" y="62" text-anchor="middle" font-size="30" fill="#fff" font-weight="700">DUR</text>',
    yaya: '<rect x="6" y="6" width="88" height="88" rx="8" fill="#1d6fd8" stroke="#1f2a24" stroke-width="1.5"/><polygon points="50,16 86,82 14,82" fill="#fff"/><circle cx="52" cy="40" r="5" fill="#1f2a24"/><path d="M50 46 L46 62 M50 46 L58 58 M46 62 L40 74 M46 62 L54 74 M48 52 L40 58" stroke="#1f2a24" stroke-width="4" stroke-linecap="round"/><path d="M24 78 H76" stroke="#1f2a24" stroke-width="3" stroke-dasharray="6 4"/>',
    okul: '<polygon points="50,6 96,90 4,90" fill="#fff" stroke="#e63946" stroke-width="9" stroke-linejoin="round"/><circle cx="40" cy="44" r="5" fill="#1f2a24"/><circle cx="60" cy="50" r="4" fill="#1f2a24"/><path d="M40 50 L38 66 L32 78 M38 66 L44 78 M40 54 L50 58 M60 55 L59 68 L55 78 M59 68 L64 78" stroke="#1f2a24" stroke-width="4" stroke-linecap="round" fill="none"/>',
    bisiklet: '<circle cx="50" cy="50" r="44" fill="#1d6fd8" stroke="#1f2a24" stroke-width="1.5"/><circle cx="32" cy="60" r="12" fill="none" stroke="#fff" stroke-width="4"/><circle cx="68" cy="60" r="12" fill="none" stroke="#fff" stroke-width="4"/><path d="M32 60 L44 40 L60 40 L68 60 M44 40 L52 60 L60 40 M40 34 H50" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>',
    girilmez: '<circle cx="50" cy="50" r="44" fill="#e63946" stroke="#1f2a24" stroke-width="1.5"/><rect x="18" y="42" width="64" height="16" fill="#fff"/>',
    durak: '<rect x="6" y="6" width="88" height="88" rx="8" fill="#1d6fd8" stroke="#1f2a24" stroke-width="1.5"/><rect x="24" y="24" width="52" height="44" rx="6" fill="#fff"/><rect x="30" y="30" width="40" height="18" fill="#1d6fd8"/><circle cx="34" cy="72" r="6" fill="#fff"/><circle cx="66" cy="72" r="6" fill="#fff"/>',
    hastane: '<rect x="6" y="6" width="88" height="88" rx="8" fill="#1d6fd8" stroke="#1f2a24" stroke-width="1.5"/><rect x="22" y="22" width="56" height="56" fill="#fff"/><text x="50" y="68" text-anchor="middle" font-size="46" fill="#1d6fd8" font-weight="700">H</text>',
    dikkat: '<polygon points="50,6 96,90 4,90" fill="#fff" stroke="#e63946" stroke-width="9" stroke-linejoin="round"/><rect x="46" y="34" width="8" height="30" rx="3" fill="#1f2a24"/><circle cx="50" cy="74" r="5" fill="#1f2a24"/>',
  };
  const levha = (ad, mm = 24) => S(100, 100, LEVHA[ad], mm);
  const LAD = { dur: 'Dur', yaya: 'Yaya geçidi', okul: 'Okul geçidi', bisiklet: 'Bisiklet yolu', girilmez: 'Girilmez', durak: 'Otobüs durağı', hastane: 'Hastane', dikkat: 'Dikkat' };

  // ---------- etkinlikler ----------
  const resimSec = (yonerge, liste, t) => etk(0, yonerge, `<div class="h2-resimler">${karistir(liste, R(t)).map(a => `<span>${resim(a)}</span>`).join('')}</div>`);
  const davranis = (liste, yonerge) => etk(0, yonerge || 'Doğru davranışın yanındaki gülen yüzü, yanlış davranışın yanındaki üzgün yüzü boya.',
    `<div class="h2-dav">${liste.map(([a, s]) => `<div><span>${resim(a)}</span><p class="ttkb">${s}</p><em>${yuz(1)}${yuz(0)}</em></div>`).join('')}</div>`);
  const esle = (yonerge, ciftler, t) => { const sag = karistir(ciftler.map(c => c[1]), R(t));
    const hucre = x => x.startsWith('#') ? `<b class="ttkb">${x.slice(1)}</b>` : x.startsWith('@') ? levha(x.slice(1), 16) : resim(x);
    return etk(0, yonerge, `<div class="h2-esle"><div>${ciftler.map(c => `<span>${hucre(c[0])}<i></i></span>`).join('')}</div><div>${sag.map(s => `<span><i></i>${hucre(s)}</span>`).join('')}</div></div>`); };
  const ciz = (yonerge, mm = 90) => etk(0, yonerge, `<div class="h2-ciz" style="min-height:${mm}mm"></div>`);
  const yaz = (yonerge, sorular) => etk(0, yonerge, `<div class="h2-yaz">${sorular.map(s => `<div><p class="ttkb">${s}</p>${cizgi(1)}</div>`).join('')}</div>`);
  const durum = (liste) => etk(0, 'Ne yapardın? Durumu oku, sen olsan ne yapacağını yaz.',
    `<div class="h2-durum">${liste.map(([a, s]) => `<div><span>${resim(a)}</span><div><p class="ttkb">${s}</p>${cizgi(2)}</div></div>`).join('')}</div>`);
  const tablo = (yonerge, bas, satirlar) => etk(0, yonerge,
    `<table class="h2-tablo ttkb"><tr>${bas.map(b => `<th>${b}</th>`).join('')}</tr>${satirlar.map(r => `<tr>${r.map(c => `<td>${c && c.startsWith && c.startsWith('img:') ? resim(c.slice(4)) : c}</td>`).join('')}</tr>`).join('')}</table>`);
  const siniflandir = (yonerge, kutular, ogeler, t) => etk(0, yonerge,
    `<div class="h2-ogeler">${karistir(ogeler, R(t)).map(a => `<span>${resim(a)}</span>`).join('')}</div><div class="h2-kutular">${kutular.map(([ad, renk]) => `<div style="border-color:${renk}"><b class="ttkb" style="color:${renk}">${ad}</b></div>`).join('')}</div>`);
  const dy = (liste) => etk(0, 'Doğru olanların kutusuna D, yanlış olanların kutusuna Y yaz.',
    `<div class="h2-dy">${liste.map(s => `<div><p class="ttkb">${s}</p><i></i></div>`).join('')}</div>`);
  const haftaPlan = () => etk(0, 'Haftalık planım! Her güne ders, oyun ve dinlenme için birer iş yaz ya da çiz.',
    `<table class="h2-plan ttkb"><tr><th></th>${['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(g => `<th>${g}</th>`).join('')}</tr>${[['📚', 'Ders'], ['⚽', 'Oyun'], ['🛏️', 'Dinlenme']].map(([i, s]) => `<tr><th>${s}</th>${'<td></td>'.repeat(7)}</tr>`).join('')}</table>`);
  const gunSirala = (liste, t) => etk(0, 'Günün olaylarını sıraya koy. Kutulara 1, 2, 3… yaz.',
    `<div class="h2-resimler sira">${karistir(liste, R(t)).map(a => `<span>${resim(a)}${kutu(10)}</span>`).join('')}</div>`);
  const levhaTanit = (adlar) => etk(0, 'Trafik levhalarını tanıyalım. Her levhanın altına adını yaz. Kutudan seçebilirsin.',
    `<div class="h2-banka ttkb">${karistir(adlar.map(a => LAD[a]), R(adlar.length)).map(s => `<span>${s}</span>`).join('')}</div><div class="h2-levhalar">${adlar.map(a => `<div>${levha(a, 26)}${cizgi(1)}</div>`).join('')}</div>`);
  const levhaBoya = () => etk(0, 'Levhaları doğru renklere boya: Dur levhası kırmızı, yaya geçidi levhası mavi.',
    `<div class="h2-levhalar">${S(100, 100, '<polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="#fff" stroke="#1f2a24" stroke-width="2.5"/><text x="50" y="62" text-anchor="middle" font-size="30" fill="none" stroke="#1f2a24" stroke-width="1.2">DUR</text>', 40)}${S(100, 100, '<rect x="6" y="6" width="88" height="88" rx="8" fill="#fff" stroke="#1f2a24" stroke-width="2.5"/><polygon points="50,16 86,82 14,82" fill="#fff" stroke="#1f2a24" stroke-width="2"/><circle cx="52" cy="40" r="5" fill="#1f2a24"/><path d="M50 46 L46 62 M50 46 L58 58 M46 62 L40 74 M46 62 L54 74" stroke="#1f2a24" stroke-width="4" stroke-linecap="round"/>', 40)}</div>`);
  const levhaTasarla = () => ciz('Okulunun önüne konması gereken bir levha tasarla. Levhan ne anlatıyor? Altına yaz.', 80);
  const acilKart = () => etk(0, 'Acil durum kartımı doldururum. Kartı kesip çantanda taşıyabilirsin.',
    `<div class="h2-kart ttkb"><b>ACİL DURUM KARTIM</b>${['Adım soyadım:', 'Adresim:', 'Annemin / babamın telefonu:', 'Acil çağrı numarası: 112', 'Okulumun adı:'].map(s => `<div><span>${s}</span><i></i></div>`).join('')}</div>`);
  const aramaSirala = () => etk(0, '112\'yi aradığında neleri söylersin? Doğru sıraya koy.',
    `<div class="h2-dy">${['Sakin olur, adımı söylerim.', 'Ne olduğunu kısaca anlatırım.', 'Adresimi açıkça söylerim.', 'Görevli kapatana kadar telefonu kapatmam.'].map((s, i, a) => `<div><p class="ttkb">${a[[2, 0, 3, 1][i]]}</p><i></i></div>`).join('')}</div>`);
  const aileAgaci = () => etk(0, 'Aile ağacımı çiziyorum. Kutulara aile büyüklerinin adlarını yaz ya da resimlerini çiz.',
    `<div class="h2-agac">${S(300, 190, '<path d="M150 190 V110 M150 110 L80 70 M150 110 L220 70 M80 70 L40 30 M80 70 L120 30 M220 70 L180 30 M220 70 L260 30" stroke="#8e5b2b" stroke-width="7" fill="none" stroke-linecap="round"/>' + [[150, 150, 'Ben'], [80, 82, 'Annem'], [220, 82, 'Babam'], [40, 22, ''], [120, 22, ''], [180, 22, ''], [260, 22, '']].map(([x, y, s]) => `<rect x="${x - 34}" y="${y - 18}" width="68" height="36" rx="8" fill="#fff" stroke="#12b886" stroke-width="2.5"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="13" fill="#6b7a70">${s}</text>`).join(''), 150)}</div>`);
  const gorevTablo = () => tablo('Görev çizelgem! Bir hafta boyunca yaptığın görevlerin altına ✓ koy.', ['Görevim', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum'],
    [['Yatağımı toplarım', '', '', '', '', ''], ['Çantamı hazırlarım', '', '', '', '', ''], ['Sofraya yardım ederim', '', '', '', '', ''], ['Çiçekleri sularım', '', '', '', '', ''], ['Oyuncaklarımı toplarım', '', '', '', '', '']]);
  const mevsimTablo = () => tablo('Mevsimleri tanıyalım. Her mevsimde hava nasıldır, ne giyeriz? Yaz ya da çiz.', ['Mevsim', 'Hava nasıl?', 'Ne giyeriz?'],
    [['İlkbahar', '', ''], ['Yaz', '', ''], ['Sonbahar', '', ''], ['Kış', '', '']]);
  const havaGunlugu = () => tablo('Hava durumu günlüğü! Bir hafta boyunca havayı gözle, sembolünü çiz.', ['Gün', 'Hava', 'Sıcak mı, soğuk mu?'],
    ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'].map(g => [g, '', '']));
  const pusula = () => etk(0, 'Yön oyunu! Güneş doğuda doğar. Sabah güneşe doğru dur: önün doğu, arkan batı, sağın güney, solun kuzeydir. Boş yerlere yönleri yaz.',
    `<div class="h2-pusula">${S(220, 220, '<circle cx="110" cy="110" r="96" fill="#fff" stroke="#3a86ff" stroke-width="4"/><polygon points="110,22 122,110 110,198 98,110" fill="#e63946"/><polygon points="22,110 110,98 198,110 110,122" fill="#9db4c8"/><circle cx="110" cy="110" r="8" fill="#1f2a24"/>' + [[110, 8], [212, 110], [110, 212], [8, 110]].map(([x, y]) => `<rect x="${x - 26}" y="${y - 12}" width="52" height="24" rx="6" fill="#fff6dc" stroke="#f4a100" stroke-width="2"/>`).join('') + '<circle cx="196" cy="40" r="14" fill="#ffd23f"/>', 72)}</div>`);
  const tasarrufHesap = () => tablo('Tasarruf dedektifi! Evinde bir gün boyunca gözle ve yaz.', ['Ne gördüm?', 'Doğru mu?', 'Ne öneririm?'],
    [['Musluk açık kaldı mı?', '', ''], ['Boş odada ışık yandı mı?', '', ''], ['Yemek artığı atıldı mı?', '', ''], ['Kâğıdın iki yüzü kullanıldı mı?', '', '']]);
  const eskiYeni = (ciftler, t) => esle('Eskiden ve bugün! Eski aracı bugünkü hâliyle eşleştir.', ciftler, t);
  const muzeBilet = () => etk(0, 'Müze bileti tasarla! Yaşadığın yerdeki tarihî bir yer için bir bilet çiz ve üzerine yerin adını yaz.', '<div class="h2-bilet"></div>');

  const W = (hafta, unite, baslik, konu, sayfalar) => ({ unite, hafta, baslik, konu, sayfalar });
  const H2 = {
    'hafta-01': W(1, 1, 'Planlı Bir Gün', 'Zaman yönetimi', () => [
      numarala([gunSirala(['calar-saat', 'dis-fircala', 'saglikli-kahvalti', 'okul', 'futbol-park', 'yatak'], 11), davranis([['plan-yapan', 'Hafta sonu ne yapacağımı önceden planlarım.'], ['gece-ekran', 'Gece geç saate kadar tablette oyun oynarım.'], ['calar-saat', 'Sabah alarm çalınca hemen kalkarım.']])]),
      numarala([haftaPlan(), yaz('Plan yapmak sana nasıl yardım eder?', ['Plan yaptığım bir gün neler oldu?', 'Plan yapmadığım bir gün neler oldu?'])])]),
    'hafta-02': W(2, 1, 'Zamanım Bende', 'Zaman yönetimi', () => [
      numarala([tablo('Günümü saat saat yazıyorum.', ['Saat', 'Ne yapıyorum?'], [['07.00', ''], ['08.30', ''], ['12.30', ''], ['15.30', ''], ['19.00', ''], ['21.00', '']]), durum([['plan-yapan', 'Yarın sınav var ama arkadaşların seni oyuna çağırıyor.']])]),
      numarala([siniflandir('Hangi işi ne zaman yaparız? Resimleri sabah, öğle ve akşam kutularına çizgiyle götür.', [['Sabah', '#f4a100'], ['Öğle', '#3a86ff'], ['Akşam', '#8b5cf6']], ['calar-saat', 'saglikli-kahvalti', 'okul', 'futbol-park', 'aile-sofrasi', 'yatak'], 21), ciz('En sevdiğin gününün resmini çiz.', 50)])]),
    'hafta-03': W(3, 1, 'Seni Dinliyorum', 'İletişim kuralları', () => [
      numarala([davranis([['dinleme', 'Arkadaşım konuşurken gözlerine bakarak dinlerim.'], ['soz-kesme', 'Arkadaşım konuşurken sözünü keserim.'], ['el-kaldir', 'Söz almak için parmak kaldırırım.'], ['bagir', 'Derste yüksek sesle bağırırım.']])]),
      numarala([esle('Hangi durumda ne söyleriz? Eşleştir.', [['#Birinden bir şey isterken', '#Lütfen'], ['#Yardım alınca', '#Teşekkür ederim'], ['#Birini incitince', '#Özür dilerim'], ['#Söz almak isterken', '#Bir şey söyleyebilir miyim?']], 31), yaz('İyi bir dinleyici nasıl davranır? Üç kural yaz.', ['1.', '2.', '3.'])])]),
    'hafta-04': W(4, 1, 'Arkadaşlık Köprüsü', 'Arkadaşlık ilişkileri', () => [
      numarala([davranis([['oyuna-davet', 'Yalnız kalan arkadaşımı oyuna çağırırım.'], ['ozur', 'Hata yapınca özür dilerim.'], ['yalniz-cocuk', 'Bir arkadaşımı oyundan dışlarım.'], ['paylas', 'Oyuncaklarımı paylaşırım.']]), durum([['yalniz-cocuk', 'Yeni gelen arkadaşın teneffüste tek başına oturuyor.']])]),
      numarala([ciz('En iyi arkadaşınla birlikte yaptığın bir şeyi çiz.', 70), yaz('Arkadaşına bir teşekkür notu yaz.', ['Sevgili …', 'Sana teşekkür ederim çünkü'])])]),
    'hafta-05': W(5, 1, 'Sınıf Meclisi', 'Sınıf içi karar alma', () => [
      numarala([resimSec('Sınıfta birlikte karar alırken neler yaparız? Doğru olanları daire içine al.', ['el-kaldir-oy', 'dinleme', 'el-kaldir', 'sira-bekle', 'soz-kesme', 'bagir'], 51), tablo('Sınıf oylaması! Sınıf gezisi için seçenekleri yaz, oyları çetele ile say.', ['Seçenek', 'Çetele', 'Oy'], [['', '', ''], ['', '', ''], ['', '', '']])]),
      numarala([yaz('Sınıfımızın kurallarını birlikte belirleyelim. Önerdiğin kuralları yaz.', ['Kural 1:', 'Kural 2:', 'Kural 3:']), dy(['Kararlar herkesin fikri alınarak verilir.', 'Çoğunluğun kararına saygı duyarız.', 'Benim fikrim seçilmezse küserim.', 'Oylamada herkesin bir oyu vardır.'])])]),
    'hafta-06': W(6, 1, 'Herkesin Bir Fikri Var', 'Sınıf içi karar alma', () => [
      numarala([durum([['el-kaldir-oy', 'Sınıf başkanlığı seçiminde arkadaşın kaybetti ve üzüldü.'], ['dinleme', 'Arkadaşının fikri seninkinden farklı.']]), resimSec('Bir toplantıda nasıl davranırız? Doğru olanları daire içine al.', ['dinleme', 'el-kaldir', 'soz-kesme', 'el-kaldir-oy', 'bagir', 'sira-bekle'], 61)]),
      numarala([ciz('Sınıf meclisinizi çiz. Herkes ne yapıyor?', 80), yaz('Senin sınıfa önerin ne?', ['Önerim:', 'Neden?'])])]),
    'hafta-07': W(7, 2, 'Büyüyorum', 'Sağlıklı büyüme ve gelişme', () => [
      numarala([resimSec('Sağlıklı büyümemize yardım edenleri daire içine al.', ['saglikli-kahvalti', 'futbol-park', 'uyu', 'su-ic', 'gece-ekran', 'cips', 'dis-fircala', 'ip-atla'], 71), tablo('Boyumu ve kilomu ölçüyorum. Yılbaşında ve yaz başında tekrar ölç.', ['', 'Boyum', 'Kilom'], [['Bugün', '', ''], ['Yılbaşı', '', ''], ['Yaz başı', '', '']])]),
      numarala([davranis([['saglikli-kahvalti', 'Her sabah kahvaltı yaparım.'], ['gece-ekran', 'Gece geç yatarım.'], ['futbol-park', 'Her gün dışarıda oynarım.'], ['cips', 'Acıkınca cips yerim.']]), ciz('Sağlıklı bir öğün tabağı çiz.', 55)])]),
    'hafta-08': W(8, 2, 'Sağlıklı Alışkanlıklar', 'Sağlıklı büyüme ve gelişme', () => [
      numarala([tablo('Alışkanlık çizelgem! Bir hafta boyunca yaptıklarına ✓ koy.', ['Alışkanlık', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum'], [['Kahvaltı yaptım', '', '', '', '', ''], ['Bol su içtim', '', '', '', '', ''], ['Hareket ettim', '', '', '', '', ''], ['Erken yattım', '', '', '', '', ''], ['Dişlerimi fırçaladım', '', '', '', '', '']]), dy(['Uyurken vücudumuz büyür ve dinlenir.', 'Su içmek sağlığımız için önemsizdir.', 'Spor yapmak kaslarımızı güçlendirir.'])]),
      numarala([esle('Alışkanlığı faydasıyla eşleştir.', [['dis-fircala', '#Dişlerim sağlam kalır.'], ['uyu', '#Dinlenir, büyürüm.'], ['ip-atla', '#Kaslarım güçlenir.'], ['su-ic', '#Vücudum susuz kalmaz.']], 81), yaz('Bırakmak istediğin bir alışkanlık var mı? Nasıl bırakırsın?', ['Alışkanlığım:', 'Planım:'])])]),
    'hafta-09': W(9, 2, 'İnternette Güvendeyim', 'Çevrim içi ortamlarda kişisel güvenlik', () => [
      numarala([davranis([['tablet-aile', 'İnterneti ailemle birlikte kullanırım.'], ['sifre-gizli', 'Şifremi kimseyle paylaşmam.'], ['yabanci-mesaj', 'Tanımadığım birine adresimi yazarım.'], ['ekran-mola', 'Ekran süresi bitince oyunu kapatırım.']])]),
      numarala([durum([['yabanci-mesaj', 'Oyunda tanımadığın biri sana "Okulun nerede?" diye yazdı.'], ['sifre-gizli', 'Arkadaşın oyun şifreni istiyor.']]), siniflandir('Hangileri gizli kalmalı? Gizli bilgileri kilitli kutuya, paylaşılabilenleri açık kutuya götür.', [['Gizli', '#e63946'], ['Paylaşılabilir', '#12b886']], ['sifre-gizli', 'okul', 'futbol-park', 'gokkusagi'], 91)])]),
    'hafta-10': W(10, 2, 'Ekran Dengesi', 'Çevrim içi ortamlarda kişisel güvenlik', () => [
      numarala([tablo('Ekran süresi günlüğüm! Her gün ekran başında ne kadar kaldığını yaz.', ['Gün', 'Ne yaptım?', 'Ne kadar?'], ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'].map(g => [g, '', ''])), dy(['Gece yatmadan önce uzun süre tablete bakmak uykumu bozar.', 'Tanımadığım biri arkadaşlık isterse büyüğüme haber veririm.', 'İnternetteki her bilgi doğrudur.'])]),
      numarala([yaz('İnternet güvenliği kurallarımı yazıyorum.', ['1.', '2.', '3.']), ciz('Ekranı kapatıp yapabileceğin eğlenceli bir şeyi çiz.', 60)])]),
    'hafta-11': W(11, 2, 'Levhalar Konuşuyor', 'Trafik işaret levhaları', () => [
      numarala([levhaTanit(['dur', 'yaya', 'okul', 'bisiklet', 'girilmez', 'durak'])]),
      numarala([esle('Levhayı anlamıyla eşleştir.', [['@dur', '#Dur, bekle.'], ['@yaya', '#Buradan karşıya geç.'], ['@okul', '#Yavaşla, çocuklar var.'], ['@girilmez', '#Bu yola girme.']], 111), levhaBoya(), levhaTasarla()])]),
    'hafta-12': W(12, 2, 'Acil Durumda İletişim', 'Acil durumlarda iletişim', () => [
      numarala([acilKart(), aramaSirala()]),
      numarala([durum([['acil-arama', 'Annen düştü ve kalkamıyor. Evde senden başka kimse yok.'], ['duman', 'Mutfaktan duman geliyor.']]), esle('Kim yardım eder? Eşleştir.', [['itfaiyeci', 'orman-yangini'], ['ambulans', 'acil-arama'], ['polis', 'yabanci']], 121)])]),
    'hafta-13': W(13, 3, 'Ailem Benim', 'Acil durumlarda iletişim, ailenin önemi', () => [
      numarala([dy(['112 acil çağrı numarasıdır.', 'Şaka için 112\'yi ararız.', 'Acil durumda sakin kalır, adresimizi söyleriz.']), aileAgaci()]),
      numarala([resimSec('Ailemizle birlikte neler yaparız? Senin ailenin yaptıklarını daire içine al.', ['aile-piknik', 'aile-sofrasi', 'bayram-ziyaret', 'bulasik', 'kopek-besle', 'tablet-aile'], 131), ciz('Ailenle en mutlu olduğun anı çiz.', 60)])]),
    'hafta-14': W(14, 3, 'Ailemin Önemi', 'Ailenin önemi', () => [
      numarala([yaz('Ailem benim için neden önemli?', ['Ailem bana', 'Ben aileme', 'Ailemle en sevdiğim an']), esle('Kim ne yapar? Eşleştir.', [['bulasik', '#Bulaşıkta yardım ederim.'], ['cop-cikar', '#Çöpü çıkarırım.'], ['kopek-besle', '#Hayvanımızı beslerim.'], ['cicek-sula', '#Çiçekleri sularım.']], 141)]),
      numarala([ciz('Ailene teşekkür eden bir kart tasarla.', 90)])]),
    'hafta-15': W(15, 3, 'Nezaket Ustası', 'Nezaket ve görgü kuralları', () => [
      numarala([davranis([['yer-ver', 'Otobüste yaşlılara yer veririm.'], ['kasa-sira', 'Markette sıramı beklerim.'], ['kapi-cal', 'Kapıyı çalıp izin alırım.'], ['bagir', 'Toplu taşımada yüksek sesle konuşurum.']])]),
      numarala([esle('Nerede nasıl davranırız? Eşleştir.', [['yer-ver', '#Yaşlılara yer veririz.'], ['kasa-sira', '#Sıramızı bekleriz.'], ['aile-sofrasi', '#Ağzımız doluyken konuşmayız.'], ['kutuphane', '#Sessiz oluruz.']], 151), yaz('Bugün yaptığın nazik bir davranışı yaz.', ['', ''])])]),
    'hafta-16': W(16, 3, 'Görevim Var', 'Görev ve sorumluluklar', () => [
      numarala([gorevTablo(), resimSec('Evde yapabileceğin görevleri daire içine al.', ['cop-cikar', 'bulasik', 'kopek-besle', 'cicek-sula', 'yatak', 'gece-ekran'], 161)]),
      numarala([durum([['cop-cikar', 'Bugün çöpü çıkarma sırası sende ama oyun oynamak istiyorsun.']]), ciz('Evde en sevdiğin görevi yaparken kendini çiz.', 70)])]),
    'hafta-17': W(17, 3, 'Sorumluluk Sende', 'Görev ve sorumluluklar', () => [
      numarala([siniflandir('Görevler nerede yapılır? Resimleri doğru kutuya götür.', [['Evde', '#3a86ff'], ['Okulda', '#f4a100'], ['Çevrede', '#12b886']], ['bulasik', 'cop-cikar', 'el-kaldir', 'cop-at', 'cicek-sula', 'sira-bekle'], 171), dy(['Sorumluluklarımı zamanında yaparım.', 'Görevimi başkasına yaptırırım.', 'Okul çantamı kendim hazırlarım.'])]),
      numarala([yaz('Okulda hangi görevleri üstlenebilirsin?', ['1.', '2.']), ciz('Sınıf görev panosu için bir görev kartı çiz.', 60)])]),
    'hafta-18': W(18, 4, 'Yakınımdaki Güzellikler', 'Görev ve sorumluluklar, tarihî mekânlar ve doğal güzellikler', () => [
      numarala([siniflandir('Tarihî mekân mı, doğal güzellik mi? Resimleri doğru kutuya götür.', [['Tarihî mekân', '#8e5b2b'], ['Doğal güzellik', '#12b886']], ['kale', 'tas-kopru', 'selale', 'magara', 'muze-bina', 'gunes-dogus'], 181), tablo('Yaşadığın yerdeki güzellikleri araştır.', ['Yerin adı', 'Tarihî mi, doğal mı?', 'Neden güzel?'], [['', '', ''], ['', '', ''], ['', '', '']])]),
      numarala([muzeBilet(), ciz('Yaşadığın yerin en güzel köşesini çiz.', 70)])]),
    'hafta-19': W(19, 4, 'Mahallemi Kim Yönetir?', 'Yaşadığı yerin yönetim birimleri', () => [
      numarala([esle('Kim, ne iş yapar? Eşleştir.', [['muhtar', '#Mahallenin işlerini takip eder.'], ['belediye', '#Yollar, parklar ve çöp toplama.'], ['harita-okul', '#Yaşadığımız yeri tanırız.']], 191), tablo('Yaşadığın yeri tanı. Bir büyüğüne sorarak doldur.', ['', 'Adı'], [['Mahallem / köyüm', ''], ['İlçem', ''], ['İlim', ''], ['Muhtarımız', '']])]),
      numarala([durum([['belediye', 'Parkınızdaki salıncak kırık. Kime haber verirsiniz?'], ['muhtar', 'Sokağınızın lambası yanmıyor.']]), ciz('Mahallenin krokisini çiz: evin, okulun, parkın.', 60)])]),
    'hafta-20': W(20, 4, 'Belediyeye Mektup', 'Yaşadığı yerin yönetim birimleri', () => [
      numarala([resimSec('Belediye hangi işleri yapar? Daire içine al.', ['cop-at', 'futbol-park', 'kaldirim', 'trafik-isigi', 'saglikli-kahvalti', 'yatak'], 201), dy(['Muhtar mahallenin sorunlarıyla ilgilenir.', 'Belediye parkları yapar ve temizler.', 'Mahallemizin sorunları kimseyi ilgilendirmez.'])]),
      numarala([yaz('Belediye başkanına bir öneri mektubu yaz.', ['Sayın Belediye Başkanımız,', 'Önerim:', 'Neden?', 'Saygılarımla,'])])]),
    'hafta-21': W(21, 4, 'Öğrenci Mustafa', 'Atatürk\'ün öğrencilik hayatı', () => [
      numarala([tablo('Mustafa\'nın okul yolculuğu. Okulları sırayla tanı.', ['Okul', 'Şehir'], [['Mahalle Mektebi', 'Selanik'], ['Şemsi Efendi Okulu', 'Selanik'], ['Askerî Rüştiye', 'Selanik'], ['Askerî İdadi', 'Manastır'], ['Harp Okulu', 'İstanbul']]), dy(['Mustafa Kemal küçükken çok meraklı bir öğrenciydi.', 'Öğretmeni ona "Kemal" adını verdi.', 'Mustafa Kemal hiç kitap okumazdı.'])]),
      numarala([yaz('Mustafa Kemal\'in öğrenciliğinden ne öğrendin?', ['Onun hangi özelliğini örnek alırsın?', 'Neden?']), ciz('Mustafa Kemal\'e bir mektup yaz ya da resim çiz.', 60)])]),
    'hafta-22': W(22, 4, 'Bayramlarımız', 'Atatürk\'ün öğrenim hayatı, millî gün ve bayramlar', () => [
      numarala([esle('Bayramı tarihiyle eşleştir.', [['#23 Nisan', '#Ulusal Egemenlik ve Çocuk Bayramı'], ['#19 Mayıs', '#Atatürk\'ü Anma, Gençlik ve Spor Bayramı'], ['#30 Ağustos', '#Zafer Bayramı'], ['#29 Ekim', '#Cumhuriyet Bayramı']], 221), resimSec('Bayramlarda neler yaparız? Daire içine al.', ['cocuk-bayrami', 'anitkabir', 'bayram-ziyaret', 'gece-ekran', 'kasa-sira', 'iftar'], 222)]),
      numarala([ciz('En sevdiğin millî bayramı çiz.', 80), yaz('Bu bayram neden önemli?', [''])])]),
    'hafta-23': W(23, 4, 'Bayram Coşkusu', 'Millî gün ve bayramların önemi', () => [
      numarala([tablo('Millî günlerimizi araştır.', ['Gün', 'Tarih', 'Ne yaparız?'], [['Cumhuriyet Bayramı', '', ''], ['Atatürk\'ü Anma', '10 Kasım', ''], ['Ulusal Egemenlik ve Çocuk Bayramı', '', ''], ['Gençlik ve Spor Bayramı', '', '']]), dy(['Millî bayramlar birlik ve beraberliğimizi güçlendirir.', 'Bayramlarda okullar ve sokaklar süslenir.'])]),
      numarala([ciz('Sınıfını bir millî bayram için süsle: süsleri ve bayrakları çiz.', 90)])]),
    'hafta-24': W(24, 4, 'Ramazan Bayramı', 'Dinî gün ve bayramlar', () => [
      numarala([resimSec('Ramazan ayında ve Ramazan Bayramı\'nda neler yaparız? Daire içine al.', ['iftar', 'bayram-ziyaret', 'el-op', 'seker-tabagi', 'yemek-paylas', 'gece-ekran'], 241), davranis([['bayram-ziyaret', 'Bayramda büyüklerimi ziyaret ederim.'], ['el-op', 'Büyüklerimin elini öperim.'], ['yemek-paylas', 'Komşularımla yemek paylaşırım.']])]),
      numarala([yaz('Bayramda neler hissedersin? Neden?', ['', '']), ciz('Bayram sofranızı ya da bayram ziyaretinizi çiz.', 70)])]),
    'hafta-25': W(25, 4, 'Kurban Bayramı', 'Dinî gün ve bayramlar', () => [
      numarala([dy(['Kurban Bayramı\'nda paylaşmak ve yardımlaşmak önemlidir.', 'Bayramlarda küs olanlar barışır.', 'Bayramda büyüklerimizi ziyaret etmeyiz.']), durum([['yemek-paylas', 'Bayramda yalnız yaşayan yaşlı komşunuz kimseyi beklemiyor.']])]),
      numarala([tablo('Bayram ziyareti planı yap.', ['Kimi ziyaret edeceğim?', 'Ne götüreceğim?'], [['', ''], ['', ''], ['', '']]), ciz('Bayramda aile büyüklerinle bir anını çiz.', 60)])]),
    'hafta-26': W(26, 5, 'Hava Nasıl?', 'Hava olayları ve mevsimler', () => [
      numarala([esle('Hava olayını adıyla eşleştir.', [['sis', '#sis'], ['dolu', '#dolu'], ['simsek', '#şimşek'], ['ruzgar', '#rüzgâr'], ['yagmur', '#yağmur']], 261), mevsimTablo()]),
      numarala([havaGunlugu(), resimSec('Kış mevsiminde hangileri olur? Daire içine al.', ['kar', 'dolu', 'gunes-dogus', 'dort-mevsim', 'ruzgar', 'sis'], 262)])]),
    'hafta-27': W(27, 5, 'Yönümü Buluyorum', 'Doğadan yararlanarak yön bulma', () => [
      numarala([pusula(), esle('Doğada yönü nasıl buluruz? Eşleştir.', [['gunes-dogus', '#Güneş doğudan doğar.'], ['kutup-yildizi', '#Kutup Yıldızı kuzeyi gösterir.'], ['yosunlu-agac', '#Yosunlar genellikle ağacın kuzey yüzünde olur.']], 271)]),
      numarala([dy(['Güneş batıdan doğar.', 'Gece Kutup Yıldızı\'na bakarak kuzeyi bulabiliriz.', 'Kaybolursak sakin kalır, bir büyüğe haber veririz.']), ciz('Okulunun hangi tarafından güneş doğuyor? Gözle ve çiz.', 70)])]),
    'hafta-28': W(28, 5, 'Afetlere Hazırım', 'Afetlere karşı alınacak önlemler', () => [
      numarala([resimSec('Afet çantasına neler koyarız? Daire içine al.', ['afet-cantasi', 'su-ic', 'fener', 'ilac', 'tablet', 'top'], 281), esle('Afet ve önlem. Eşleştir.', [['deprem', '#Çök, kapan, tutun.'], ['sel', '#Yüksek bir yere çık.'], ['orman-yangini', '#Ormanda ateş yakma.']], 282)]),
      numarala([davranis([['toplanma-alani', 'Ailemle toplanma alanımızı öğrenirim.'], ['afet-cantasi', 'Evde afet çantası hazırlarız.'], ['deprem', 'Deprem anında merdivenlere koşarım.']]), ciz('Evinizden toplanma alanına giden yolu çiz.', 60)])]),
    'hafta-29': W(29, 5, 'Hazırlıklı Aile', 'Afetlere karşı alınacak önlemler', () => [
      numarala([tablo('Ailemle afet planımızı yapıyoruz.', ['Soru', 'Cevap'], [['Toplanma alanımız neresi?', ''], ['Afet çantası nerede?', ''], ['Kimi arayacağız?', ''], ['Evde güvenli yerimiz neresi?', '']]), dy(['Ağır eşyaları duvara sabitlemek güvenliğimizi artırır.', 'Afet çantasına oyuncak koymak en önemlisidir.'])]),
      numarala([durum([['deprem', 'Okuldasın ve deprem oldu.'], ['sel', 'Çok yağmur yağıyor, sokakta su birikti.']]), ciz('Afet çantanı tasarla. İçine koyacaklarını çiz.', 60)])]),
    'hafta-30': W(30, 5, 'Damla Damla', 'Doğal kaynakları tasarruflu kullanma', () => [
      numarala([davranis([['musluk-kapat', 'Dişlerimi fırçalarken musluğu kapatırım.'], ['isik-sondur', 'Odadan çıkarken ışığı söndürürüm.'], ['gece-ekran', 'Kullanmadığım cihazları açık bırakırım.'], ['geri-donusum', 'Atıkları ayırırım.']]), tasarrufHesap()]),
      numarala([resimSec('Doğal kaynaklarımız hangileri? Daire içine al.', ['su-ic', 'gunes-dogus', 'selale', 'orman-yangini', 'tarla', 'cips'], 301), ciz('Tasarruf için bir afiş tasarla.', 70)])]),
    'hafta-31': W(31, 5, 'Tasarruf Kahramanı', 'Doğal kaynakları tasarruflu kullanma', () => [
      numarala([tablo('Tasarruf sözleşmem! Bir hafta boyunca uyduğun kurallara ✓ koy.', ['Kural', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum'], [['Musluğu kapattım', '', '', '', '', ''], ['Işığı söndürdüm', '', '', '', '', ''], ['Kâğıdın iki yüzünü kullandım', '', '', '', '', ''], ['Yemeğimi bitirdim', '', '', '', '', '']]), dy(['Su sınırsızdır, istediğimiz kadar harcayabiliriz.', 'Geri dönüşüm doğal kaynakları korur.'])]),
      numarala([yaz('Ailenle bir tasarruf planı yap.', ['Suyu korumak için:', 'Elektriği korumak için:', 'Kâğıdı korumak için:']), ciz('Tasarruf kahramanı kostümünü çiz.', 60)])]),
    'hafta-32': W(32, 6, 'Bilim İnsanları', 'Bilim insanlarının bilime katkıları', () => [
      numarala([resimSec('Bilim insanları hangi araçları kullanır? Daire içine al.', ['mikroskop', 'buyutec', 'teleskop', 'bilim-insani', 'cips', 'gece-ekran'], 321), tablo('Bir bilim insanını araştır. Bir büyüğünden ya da kitaptan yardım al.', ['Soru', 'Cevap'], [['Adı:', ''], ['Ne üzerinde çalıştı?', ''], ['Bilime katkısı:', ''], ['Onun hangi özelliğini beğendim?', '']])]),
      numarala([yaz('Sen bir bilim insanı olsaydın neyi araştırırdın?', ['Merak ettiğim soru:', 'Nasıl araştırırdım?']), ciz('Laboratuvarında çalışan kendini çiz.', 60)])]),
    'hafta-33': W(33, 6, 'Dünden Bugüne', 'Bilim insanları, teknolojik ürünlerin değişimi', () => [
      numarala([eskiYeni([['cevirmeli-telefon', 'akilli-telefon'], ['at-arabasi', 'araba'], ['posta-kutusu', 'bilgisayar'], ['fener', 'lamba']], 331), dy(['Teknolojik ürünler zamanla değişir ve gelişir.', 'Eskiden telefonlar cebe sığardı.', 'Bilim insanlarının buluşları hayatımızı kolaylaştırır.'])]),
      numarala([tablo('Bir büyüğüne sor: Çocukken hangi araçları kullanırdı?', ['Eskiden', 'Bugün'], [['', ''], ['', ''], ['', '']]), ciz('Gelecekte telefon nasıl olacak? Tahmin et ve çiz.', 60)])]),
    'hafta-34': W(34, 6, 'Geleceğin Teknolojisi', 'Teknolojik ürünlerin değişim ve sürekliliği', () => [
      numarala([esle('Bu ürünlerin eski hâli neydi? Eşleştir.', [['akilli-telefon', 'cevirmeli-telefon'], ['araba', 'at-arabasi'], ['lamba', 'mum']], 341), yaz('Telefonun yıllar içindeki değişimini anlat.', ['Eskiden:', 'Bugün:', 'Gelecekte:'])]),
      numarala([ciz('Geleceğin bir icadını tasarla. Adını ve ne işe yaradığını yaz.', 100)])]),
    'hafta-35': W(35, 6, 'Sanat Her Yerde', 'Sanatın günlük yaşamdaki yeri', () => [
      numarala([resimSec('Hangileri sanat? Daire içine al.', ['ebru', 'cini', 'heykel', 'tiyatro', 'keman', 'palet', 'cop-cikar', 'kasa-sira'], 351), esle('Sanat dalını eşleştir.', [['ebru', '#geleneksel sanatımız'], ['tiyatro', '#sahne sanatı'], ['keman', '#müzik'], ['heykel', '#yontu']], 352)]),
      numarala([ciz('Evinde ya da sokakta gördüğün bir sanat eserini çiz (halı deseni, tabak, afiş…).', 80), yaz('Sanat günlük yaşamımızı nasıl güzelleştirir?', ['', ''])])]),
    'hafta-36': W(36, 6, 'Sanat Şenliği', 'Sanatın günlük yaşamdaki yeri', () => [
      numarala([tablo('Sınıf sanat şenliği planı! Kim ne sergileyecek?', ['Arkadaşım', 'Sanat dalı', 'Eseri'], [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']]), dy(['Sanat sadece müzede olur.', 'Bir tabağın deseni de sanattır.', 'Herkes sanat yapabilir.'])]),
      numarala([ciz('Çini deseni tasarla: Lale, karanfil ya da kendi deseninle bir kareyi süsle.', 110)])]),
  };
  const CSS = `
.h2k{display:inline-block;height:8mm;border:.5mm solid #4a5a50;border-radius:2mm;background:#fff;vertical-align:middle}
.h2-cizgi{display:flex;flex-direction:column}.h2-cizgi i{height:9mm;border-bottom:.45mm solid #9db4c8}
.h2-resimler{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}.h2-resimler span{background:#fff;border-radius:4mm;padding:2mm;display:flex;flex-direction:column;align-items:center;gap:1.5mm;border:.5mm solid #cfd8d1}
.h2-resimler img{width:100%;height:30mm;object-fit:contain}.h2-resimler:has(span:nth-child(5):last-child),.h2-resimler:has(span:nth-child(6):last-child){grid-template-columns:repeat(3,1fr)}
.h2-dav{display:flex;flex-direction:column;gap:2.5mm}.h2-dav>div{display:grid;grid-template-columns:24mm 1fr auto;gap:3mm;align-items:center;background:#fff;border-radius:3mm;padding:1.5mm 3mm}
.h2-dav img{width:22mm;height:22mm;object-fit:contain}.h2-dav p{margin:0;font-size:5mm}.h2-dav em{display:flex;gap:2mm}.h2-dav em svg{margin:0!important}
.h2-esle{display:grid;grid-template-columns:1fr 1fr;gap:20mm;padding:0 4mm}.h2-esle>div{display:flex;flex-direction:column;gap:3mm;justify-content:space-around}
.h2-esle span{display:flex;align-items:center;gap:3mm;background:#fff;border-radius:3mm;padding:1.5mm 3mm;min-height:20mm}.h2-esle>div:first-child span{justify-content:space-between}
.h2-esle img{width:20mm;height:20mm;object-fit:contain}.h2-esle i{flex:none;width:3.5mm;height:3.5mm;border-radius:50%;background:#1f2a24}.h2-esle b{font-weight:400;font-size:4.8mm}.h2-esle svg{margin:0!important}
.h2-ciz{background:#fff;border:.5mm dashed #9db4c8;border-radius:3mm;flex:1}
.h2-yaz{display:flex;flex-direction:column;gap:2.5mm}.h2-yaz>div{background:#fff;border-radius:3mm;padding:2mm 3mm}.h2-yaz p{margin:0;font-size:5mm}
.h2-durum{display:flex;flex-direction:column;gap:3mm}.h2-durum>div{display:grid;grid-template-columns:30mm 1fr;gap:3mm;align-items:center;background:#fff;border-radius:3mm;padding:2mm 3mm}.h2-durum img{width:28mm;height:28mm;object-fit:contain}.h2-durum p{margin:0;font-size:5mm}
.h2-tablo{width:100%;border-collapse:separate;border-spacing:0 1.5mm;font-size:4.8mm}.h2-tablo th{background:#12b886;color:#fff;font-weight:400;padding:1.5mm}.h2-tablo td{background:#fff;padding:1.5mm 2mm;height:9mm;text-align:center}.h2-tablo td:first-child{text-align:left}.h2-tablo img{width:12mm;height:12mm}
.h2-ogeler{display:grid;grid-template-columns:repeat(6,1fr);gap:2.5mm;margin-bottom:3mm}.h2-ogeler span{background:#fff;border-radius:3mm;padding:1.5mm;display:flex;justify-content:center;min-width:0}.h2-ogeler img{width:100%;height:20mm;object-fit:contain}
.h2-ogeler:has(span:nth-child(4):last-child){grid-template-columns:repeat(4,1fr)}
.h2-kutular{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:4mm}.h2-kutular>div{height:40mm;border:1mm solid;border-radius:4mm;background:#fff;display:flex;justify-content:center;padding-top:2mm}.h2-kutular b{font-weight:400;font-size:6mm}
.h2-dy{display:flex;flex-direction:column;gap:2.5mm}.h2-dy>div{display:flex;align-items:center;gap:3mm;background:#fff;border-radius:3mm;padding:2mm 3mm}.h2-dy p{margin:0;font-size:5mm;flex:1}.h2-dy i{flex:none;width:10mm;height:10mm;border:.5mm solid #4a5a50;border-radius:2mm}
.h2-plan{width:100%;border-collapse:collapse;font-size:4.8mm}.h2-plan th,.h2-plan td{border:.5mm solid #9db4c8;padding:1.5mm;font-weight:400;background:#fff}.h2-plan th{background:#fff6dc}.h2-plan td{height:22mm}
.h2-banka{display:flex;flex-wrap:wrap;gap:3mm;justify-content:center;margin-bottom:3mm}.h2-banka span{background:#fff;border:.5mm dashed #f4a100;border-radius:2mm;padding:1mm 3mm;font-size:5mm}
.h2-levhalar{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}.h2-levhalar>div{background:#fff;border-radius:3mm;padding:3mm;display:flex;flex-direction:column;gap:2mm}.h2-levhalar:not(:has(div)){display:flex;justify-content:space-around;background:#fff;border-radius:3mm;padding:3mm}
.h2-kart{background:#fff;border:1mm dashed #e63946;border-radius:4mm;padding:3mm 4mm;display:flex;flex-direction:column;gap:2mm;font-size:5mm}.h2-kart b{font-weight:400;color:#e63946;text-align:center;font-size:6mm}.h2-kart div{display:flex;gap:2mm;align-items:flex-end}.h2-kart i{flex:1;border-bottom:.45mm solid #9db4c8;height:7mm}
.h2-agac{background:#fff;border-radius:3mm;padding:2mm}
.h2-pusula{background:#fff;border-radius:3mm;padding:3mm}
.h2-bilet{min-height:55mm;background:#fff;border:1mm dashed #8b5cf6;border-radius:6mm}
.govde>.etk:last-child>:is(.h2-resimler,.h2-levhalar,.h2-kutular,.h2-esle){align-content:stretch!important}
`;
  return { H2, CSS, A: { S, cizgi, kutu, yuz, LEVHA, levha, resimSec, davranis, esle, ciz, yaz, durum, tablo, siniflandir, dy, haftaPlan, gunSirala, levhaTanit, levhaBoya, levhaTasarla, acilKart, aramaSirala, aileAgaci, gorevTablo, mevsimTablo, havaGunlugu, pusula, tasarrufHesap, eskiYeni, muzeBilet } };
};
