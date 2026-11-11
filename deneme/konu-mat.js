// Konu Anlatımı · Matematik verisi (konu-anlatimi.html okur). 2. sınıf MEB 2026-2027 planı sırasıyla.
(function(){
  var GRUP = {
    geo:   {ad:"Nesnelerin Geometrisi", g:"#8b5cf6", ga:"#f3edff"},
    sayi:  {ad:"Sayılar ve Nicelikler", g:"#3a86ff", ga:"#eaf3ff"},
    islem: {ad:"İşlemlerden Cebirsel Düşünmeye", g:"#f2546b", ga:"#ffeef0"},
    olcme: {ad:"Ölçme: Para, Zaman, Uzunluk, Kütle", g:"#12b886", ga:"#e6faf2"},
    veri:  {ad:"Veriye Dayalı Araştırma", g:"#e08a00", ga:"#fff6dc"}
  };

  // ---------- çizim yardımcıları (SVG) ----------
  function svg(w, h, ic, gen){ return '<svg viewBox="0 0 '+w+' '+h+'" style="width:'+(gen||w)+'px;max-width:100%;height:auto;vertical-align:middle">'+ic+'</svg>'; }
  // onluk çubukları ve birlik küpleri
  function onluk(n, olcek){
    var o = Math.floor(n/10), b = n%10, s = "", x = 4;
    for (var i=0;i<o;i++){ for (var j=0;j<10;j++) s += '<rect x="'+x+'" y="'+(4+j*12)+'" width="12" height="12" fill="#9fd3ff" stroke="#1d4e89" stroke-width="1.2"/>'; x += 18; }
    x += 6;
    for (var k=0;k<b;k++) s += '<rect x="'+(x+(k%2)*16)+'" y="'+(4+Math.floor(k/2)*16)+'" width="12" height="12" fill="#ffd166" stroke="#a0640a" stroke-width="1.2"/>';
    if (b) x += 34;
    return svg(x, 128, s, (olcek||1)*x);
  }
  function sayiDogrusu(bas, son, adim, yaylar){
    var n = (son-bas)/adim, w = 40 + n*44, s = '<line x1="10" y1="40" x2="'+(w-10)+'" y2="40" stroke="#1c2b3a" stroke-width="2"/>';
    for (var i=0;i<=n;i++){ var x = 20+i*44; s += '<line x1="'+x+'" y1="33" x2="'+x+'" y2="47" stroke="#1c2b3a" stroke-width="2"/><text x="'+x+'" y="66" text-anchor="middle" font-size="15" fill="#1c2b3a">'+(bas+i*adim)+'</text>'; }
    (yaylar||[]).forEach(function(a){ var x1 = 20+(a[0]-bas)/adim*44, x2 = 20+(a[1]-bas)/adim*44; s += '<path d="M'+x1+' 32 Q'+((x1+x2)/2)+' 4 '+x2+' 32" fill="none" stroke="#f2546b" stroke-width="2.5"/><text x="'+((x1+x2)/2)+'" y="14" text-anchor="middle" font-size="13" fill="#f2546b">'+(a[2]||'')+'</text>'; });
    return svg(w, 74, s);
  }
  function saat(h, m, gen){
    var s = '<circle cx="60" cy="60" r="54" fill="#fff" stroke="#1c2b3a" stroke-width="4"/>';
    for (var i=1;i<=12;i++){ var a = i*Math.PI/6; s += '<text x="'+(60+42*Math.sin(a))+'" y="'+(66-42*Math.cos(a))+'" text-anchor="middle" font-size="15" fill="#1c2b3a">'+i+'</text>'; }
    var ay = (h%12 + m/60)*Math.PI/6, ym = m*Math.PI/30;
    s += '<line x1="60" y1="60" x2="'+(60+26*Math.sin(ay))+'" y2="'+(60-26*Math.cos(ay))+'" stroke="#f2546b" stroke-width="6" stroke-linecap="round"/>';
    s += '<line x1="60" y1="60" x2="'+(60+40*Math.sin(ym))+'" y2="'+(60-40*Math.cos(ym))+'" stroke="#3a86ff" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="60" r="4" fill="#1c2b3a"/>';
    return svg(120, 120, s, gen||110);
  }
  function kesir(parca, boyali, renk){
    var s = '<circle cx="50" cy="50" r="44" fill="#fff" stroke="#1c2b3a" stroke-width="3"/>';
    for (var i=0;i<parca;i++){ if (i < boyali) { var a1 = i*2*Math.PI/parca - Math.PI/2, a2 = (i+1)*2*Math.PI/parca - Math.PI/2;
      s += parca === 1 ? '<circle cx="50" cy="50" r="44" fill="'+renk+'"/>' : '<path d="M50 50 L'+(50+44*Math.cos(a1))+' '+(50+44*Math.sin(a1))+' A44 44 0 '+(a2-a1>Math.PI?1:0)+' 1 '+(50+44*Math.cos(a2))+' '+(50+44*Math.sin(a2))+' Z" fill="'+renk+'"/>'; } }
    for (var j=0;j<parca && parca>1;j++){ var a = j*2*Math.PI/parca - Math.PI/2; s += '<line x1="50" y1="50" x2="'+(50+44*Math.cos(a))+'" y2="'+(50+44*Math.sin(a))+'" stroke="#1c2b3a" stroke-width="2.5"/>'; }
    s += '<circle cx="50" cy="50" r="44" fill="none" stroke="#1c2b3a" stroke-width="3"/>';
    return svg(100, 100, s, 90);
  }
  var CISIM = {
    kup: '<path d="M10 22 L30 12 L52 22 L52 48 L30 58 L10 48 Z M10 22 L30 32 L52 22 M30 32 V58" fill="#d9f0ff" stroke="#1c2b3a" stroke-width="2.5" stroke-linejoin="round"/>',
    prizma: '<path d="M4 24 L18 14 L58 14 L44 24 Z" fill="#fff3c4" stroke="#1c2b3a" stroke-width="2.5" stroke-linejoin="round"/><path d="M4 24 H44 V52 H4 Z" fill="#ffe08a" stroke="#1c2b3a" stroke-width="2.5"/><path d="M44 24 L58 14 V42 L44 52 Z" fill="#ffd166" stroke="#1c2b3a" stroke-width="2.5" stroke-linejoin="round"/>',
    kure: '<circle cx="30" cy="32" r="24" fill="#ffd6dc" stroke="#1c2b3a" stroke-width="2.5"/><ellipse cx="30" cy="32" rx="24" ry="7" fill="none" stroke="#1c2b3a" stroke-width="1.5" stroke-dasharray="3 3"/>',
    silindir: '<path d="M12 14 V48 A18 7 0 0 0 48 48 V14" fill="#d8f5e9" stroke="#1c2b3a" stroke-width="2.5"/><ellipse cx="30" cy="14" rx="18" ry="7" fill="#d8f5e9" stroke="#1c2b3a" stroke-width="2.5"/>',
    koni: '<path d="M30 6 L50 50 A20 7 0 0 1 10 50 Z" fill="#efe6ff" stroke="#1c2b3a" stroke-width="2.5" stroke-linejoin="round"/>'
  };
  function cisim(ad, etiket){ return '<span class="mk-kart">'+svg(62, 62, CISIM[ad], 70)+'<b>'+etiket+'</b></span>'; }
  var SEKIL = {
    ucgen: '<polygon points="30,6 56,52 4,52" fill="#ffd6dc" stroke="#1c2b3a" stroke-width="2.5"/>',
    kare: '<rect x="8" y="8" width="44" height="44" fill="#d9f0ff" stroke="#1c2b3a" stroke-width="2.5"/>',
    dikdortgen: '<rect x="2" y="16" width="56" height="30" fill="#fff3c4" stroke="#1c2b3a" stroke-width="2.5"/>',
    daire: '<circle cx="30" cy="30" r="24" fill="#d8f5e9" stroke="#1c2b3a" stroke-width="2.5"/>',
    kareDon: '<rect x="8" y="8" width="44" height="44" transform="rotate(45 30 30)" fill="#d9f0ff" stroke="#1c2b3a" stroke-width="2.5"/>'
  };
  function sekil(ad, etiket){ return '<span class="mk-kart">'+svg(60, 60, SEKIL[ad], 66)+'<b>'+etiket+'</b></span>'; }
  function cetvel(cm){ var s = '<rect x="2" y="10" width="'+(cm*30+16)+'" height="34" rx="4" fill="#fff3c4" stroke="#a0640a" stroke-width="2"/>';
    for (var i=0;i<=cm;i++){ var x = 10+i*30; s += '<line x1="'+x+'" y1="10" x2="'+x+'" y2="26" stroke="#a0640a" stroke-width="2"/><text x="'+x+'" y="40" text-anchor="middle" font-size="12" fill="#a0640a">'+i+'</text>'; }
    return svg(cm*30+20, 50, s); }
  function M(s){ return '<span class="mm">'+s+'</span>'; }

  var K = [
    {id:"cisimler", grup:"geo", sinif:"2. sınıf", baslik:"Geometrik Cisimler",
     ornek:'<div class="mk-dizi">'+cisim("kup","küp")+cisim("prizma","dikdörtgen prizma")+cisim("silindir","silindir")+cisim("koni","koni")+cisim("kure","küre")+'</div><p>Zar → küp · Ayakkabı kutusu → dikdörtgen prizma · Bardak → silindir · Külah → koni · Top → küre</p>',
     kural:["Çevremizdeki nesnelerin çoğu bir <b>geometrik cisme</b> benzer.","<b>Küpün</b> 6 yüzü vardır ve hepsi aynı büyüklükte karedir.","<b>Küre</b>nin hiç düz yüzü yoktur; her yöne yuvarlanır.","<b>Silindir</b> ve <b>koni</b> hem kayar hem yuvarlanır; çünkü hem düz hem eğri yüzeyleri vardır."],
     dikkat:"<b>İpucu:</b> Bir cismi tanımak için kendine sor: Düz yüzü var mı? Kaç tane? Yuvarlanır mı, kayar mı?",
     dene:{s:"Futbol topu hangi cisme benzer?", c:["küp","küre","koni"], d:1, a:"Top, düz yüzü olmayan bir küredir."}},
    {id:"modeller", grup:"geo", sinif:"2. sınıf", baslik:"Cisim ve Şekillerle Model Yapma",
     ornek:'<div class="mk-dizi">'+sekil("kare","kare")+sekil("ucgen","üçgen")+sekil("dikdortgen","dikdörtgen")+sekil("daire","daire")+'</div><p>Bir kare ile bir üçgeni üst üste koyarsak bir <b>ev</b> resmi olur. İki silindir ve bir küp ile bir <b>kule</b> yapabiliriz.</p>',
     kural:["<b>Üçgenin</b> 3 kenarı, 3 köşesi vardır.","<b>Karenin</b> 4 kenarı vardır ve hepsi eşit uzunluktadır.","<b>Dikdörtgenin</b> 4 kenarı vardır; karşılıklı kenarları eşittir.","<b>Dairenin</b> kenarı ve köşesi yoktur.","Şekilleri ve cisimleri birleştirerek yeni yapılar (ev, robot, kule) oluşturabiliriz."],
     dikkat:"<b>İpucu:</b> Bir modeli incelerken hangi şekillerden oluştuğunu tek tek say: “2 kare, 1 üçgen…”",
     dene:{s:"Dört kenarı da birbirine eşit olan şekil hangisidir?", c:["dikdörtgen","kare","üçgen"], d:1, a:"Karenin dört kenarı da eşittir."}},
    {id:"yon-buyukluk", grup:"geo", sinif:"2. sınıf", baslik:"Şekil Döndürülünce Değişir mi?",
     ornek:'<div class="mk-dizi">'+sekil("kare","kare")+'<span class="mk-ok">→ döndür →</span>'+sekil("kareDon","yine kare")+'</div>',
     kural:["Bir şekli <b>döndürdüğümüzde</b>, yerini ya da büyüklüğünü <b>değiştirdiğimizde</b> adı değişmez.","Yan yatırılan kare yine karedir; büyütülen üçgen yine üçgendir.","Şeklin adını kenar ve köşe sayısı belirler; duruşu belirlemez."],
     dikkat:"<b>Dikkat!</b> Ucunun üstünde duran kareye bazen “baklava” denir ama o yine bir karedir.",
     dene:{s:"Bir üçgeni ters çevirirsek ne olur?", c:["kare olur","yine üçgendir","daire olur"], d:1, a:"Kenar ve köşe sayısı değişmediği için yine üçgendir."}},
    {id:"sivi", grup:"geo", sinif:"2. sınıf", baslik:"Sıvı Miktarını Tahmin Etme",
     ornek:'<p>Sürahi = <b>4</b> su bardağı</p><p>Sürahi = <b>8</b> çay bardağı</p><p style="color:var(--soluk);font-size:.85em">Aynı sürahi; ölçme aracı küçülünce sayı büyüdü.</p>',
     kural:["Sıvıları bardak, kaşık, kova gibi araçlarla <b>ölçebiliriz</b>.","Ölçme aracı <b>küçüldükçe</b> sayı <b>büyür</b>; ölçme aracı büyüdükçe sayı küçülür.","Ölçmeden önce “Sence kaç bardak eder?” diye <b>tahmin</b> etmek, sonra ölçüp karşılaştırmak iyi bir alışkanlıktır."],
     dikkat:"<b>Dikkat!</b> Karşılaştırma yaparken herkes aynı ölçme aracını kullanmalıdır. Biri bardakla, biri kovayla ölçerse sonuçlar karışır.",
     dene:{s:"Bir kovadaki suyu hangisiyle ölçersek daha büyük bir sayı buluruz?", c:["su bardağı","çay kaşığı","sürahi"], d:1, a:"Çay kaşığı en küçük araçtır; daha çok kez doldururuz."}},
    {id:"sayilar100", grup:"sayi", sinif:"2. sınıf", baslik:"100'e Kadar Sayılar: Onluk ve Birlik",
     ornek:'<div>'+onluk(34, .9)+'</div><p>'+M("3 onluk")+' + '+M("4 birlik")+' = <b>34</b> (otuz dört)</p>',
     kural:["<b>10 birlik</b> bir araya gelince <b>1 onluk</b> olur.","İki basamaklı bir sayıda soldaki rakam <b>onlukları</b>, sağdaki rakam <b>birlikleri</b> gösterir.","<b>10 onluk = 100</b> (yüz)."],
     dikkat:"<b>Dikkat!</b> 40 ile 4 farklıdır: 40'ta 4 onluk vardır, 4'te 4 birlik.",
     dene:{s:"6 onluk ve 2 birlik hangi sayıdır?", c:["26","62","8"], d:1, a:"6 onluk = 60, 2 birlik = 2 → 62."}},
    {id:"cozumleme", grup:"sayi", sinif:"2. sınıf", baslik:"Sayıları Çözümleme (Basamak Değeri)",
     ornek:'<p><b>58</b> = '+M("50")+' + '+M("8")+'</p><p><b>5</b>’in basamak değeri <b>50</b>, <b>8</b>’in basamak değeri <b>8</b>.</p><div class="mk-basamak"><span><small>onlar</small>5</span><span><small>birler</small>8</span></div>',
     kural:["Bir rakamın <b>sayı değeri</b> kendisidir: 58'deki 5'in sayı değeri 5.","Bir rakamın <b>basamak değeri</b> bulunduğu yere göre değişir: 58'deki 5 onlar basamağında olduğu için değeri 50'dir.","Bir sayıyı basamak değerlerinin toplamı olarak yazmaya <b>çözümleme</b> denir: 73 = 70 + 3."],
     dikkat:"<b>İpucu:</b> Onlar basamağındaki rakamın sağına bir 0 koy; basamak değerini bulmuş olursun.",
     dene:{s:"47 sayısındaki 4'ün basamak değeri kaçtır?", c:["4","40","7"], d:1, a:"4 onlar basamağında: 40."}},
    {id:"siralama", grup:"sayi", sinif:"2. sınıf", baslik:"Sayıları Karşılaştırma ve Sıralama",
     ornek:'<p>46 '+M("&lt;")+' 64 · 75 '+M("&gt;")+' 57 · 30 '+M("=")+' 30</p><p style="font-size:.85em;color:var(--soluk)">Önce onlara bak: 4 onluk, 6 onluktan azdır.</p>',
     kural:["Sayıları karşılaştırırken <b>önce onlar</b> basamağına bakarız. Onluğu çok olan büyüktür.","Onlar eşitse <b>birler</b> basamağına bakarız: 52 &lt; 57.","<b>&gt;</b> “büyüktür”, <b>&lt;</b> “küçüktür”, <b>=</b> “eşittir” demektir.","Sayıları küçükten büyüğe ya da büyükten küçüğe sıralayabiliriz."],
     dikkat:"<b>İpucu:</b> &lt; ve &gt; işaretinin açık (geniş) tarafı her zaman büyük sayıya bakar.",
     dene:{s:"Hangisi doğrudur?", c:["39 > 93","39 < 93","39 = 93"], d:1, a:"3 onluk, 9 onluktan azdır."}},
    {id:"ritmik", grup:"sayi", sinif:"2. sınıf", baslik:"Ritmik Sayma",
     ornek:'<div>'+sayiDogrusu(0, 30, 5, [[0,5,"+5"],[5,10,"+5"],[10,15,"+5"],[15,20,"+5"]])+'</div><p>5, 10, 15, 20, 25, 30 · 2, 4, 6, 8 · 10, 20, 30, 40</p>',
     kural:["Belli bir sayıyı sürekli ekleyerek ya da çıkararak saymaya <b>ritmik sayma</b> denir.","İkişer, üçer, dörder, beşer ve onar <b>ileriye</b> ya da <b>geriye</b> sayabiliriz: 50, 45, 40, 35…","Beşer sayarken sayılar hep <b>0 ya da 5</b> ile biter; onar sayarken hep <b>0</b> ile biter."],
     dikkat:"<b>İpucu:</b> Ellerindeki parmaklarla beşer saymak çok kolaydır: bir el 5, iki el 10…",
     dene:{s:"40, 35, 30, __ boşluğa hangisi gelir?", c:["35","25","20"], d:1, a:"Beşer geriye sayıyoruz: 30 − 5 = 25."}},
    {id:"oruntu", grup:"sayi", sinif:"2. sınıf", baslik:"Sayı ve Şekil Örüntüleri",
     ornek:'<p>▲ ● ● ▲ ● ● ▲ ● ● …</p><p>3, 6, 9, 12, … (kural: 3 ekle)</p>',
     kural:["Belli bir <b>kurala</b> göre tekrar eden ya da artan dizilere <b>örüntü</b> denir.","Örüntüyü devam ettirmek için önce kuralı bulmalıyız: “Neler tekrar ediyor?” ya da “Her adımda kaç artıyor?”","Şekil örüntüleri sayılara dönüşebilir: 1 kare, 3 kare, 5 kare… (her adımda 2 kare eklenir)."],
     dikkat:"<b>İpucu:</b> Ardışık iki sayı arasındaki farkı yaz; fark hep aynıysa kuralı bulmuşsun demektir.",
     dene:{s:"7, 10, 13, 16, __ örüntüsü nasıl devam eder?", c:["17","19","20"], d:1, a:"Kural: her adımda 3 ekle. 16 + 3 = 19."}},
    {id:"tahmin", grup:"sayi", sinif:"2. sınıf", baslik:"Nesne Sayısını Tahmin Etme",
     ornek:'<p>Kavanozda bir avuç bilye 10 tane. Kavanozda yaklaşık 4 avuç var. Tahminim: <b>yaklaşık 40</b>.</p>',
     kural:["<b>Tahmin</b>, saymadan yaklaşık bir sayı söylemektir.","İyi bir tahmin için önce küçük bir grubu sayarız (10 tane), sonra bütünde bu gruptan kaç tane olduğunu düşünürüz.","Tahminden sonra sayarak kontrol ederiz. Tahminin gerçeğe yakın olması yeterlidir."],
     dikkat:"<b>Dikkat!</b> Tahmin yanlış değildir; sadece yakın ya da uzak olur. “Yaklaşık” sözcüğünü kullan.",
     dene:{s:"Bir sırada 10 öğrenci, sınıfta böyle 3 sıra var. Sınıfta yaklaşık kaç öğrenci vardır?", c:["13","30","100"], d:1, a:"3 tane 10 → yaklaşık 30."}},
    {id:"toplama", grup:"islem", sinif:"2. sınıf", baslik:"Toplama (Eldeli)",
     ornek:'<pre class="mk-islem">  ¹\n  3 8\n+ 2 5\n─────\n  6 3</pre><p>Birler: 8 + 5 = 13 → 3’ü yaz, 1 onluğu eldeye ver. Onlar: 3 + 2 + 1 = 6.</p>',
     kural:["Toplamaya her zaman <b>birler basamağından</b> başlarız.","Birlerin toplamı 10 ya da daha fazlaysa <b>1 onluğu</b> onlar basamağına taşırız. Buna <b>elde</b> denir.","Toplanan sayıların yeri değişirse sonuç değişmez: 25 + 38 = 38 + 25."],
     dikkat:"<b>Dikkat!</b> Eldeyi onlar basamağının üstüne küçük yaz ve toplarken unutma.",
     dene:{s:"27 + 15 kaçtır?", c:["32","42","312"], d:1, a:"7 + 5 = 12 → 2 yaz, 1 elde. 2 + 1 + 1 = 4 → 42."}},
    {id:"cikarma", grup:"islem", sinif:"2. sınıf", baslik:"Çıkarma (Onluk Bozarak)",
     ornek:'<pre class="mk-islem">  ⁴ ¹²\n  5  2\n− 2  7\n──────\n  2  5</pre><p>2'+"'"+'den 7 çıkmaz → 1 onluk boz: 12 − 7 = 5. Kalan 4 onluk: 4 − 2 = 2.</p>',
     kural:["Çıkarmaya da <b>birler basamağından</b> başlarız.","Üstteki birlik alttakinden küçükse onlar basamağından <b>1 onluk bozarız</b>; o onluk 10 birlik olarak birlere eklenir.","Bozduğumuz için onlar basamağındaki rakam 1 azalır."],
     dikkat:"<b>Dikkat!</b> Büyükten küçüğü çıkarmak gerekir diye 7 − 2 yapma! Üstteki sayıdan alttakini çıkarırız.",
     dene:{s:"43 − 18 kaçtır?", c:["35","25","31"], d:1, a:"13 − 8 = 5, 3 − 1 = 2 → 25."}},
    {id:"problem", grup:"islem", sinif:"2. sınıf", baslik:"Problem Çözme Adımları",
     ornek:'<p>Sepette 34 elma vardı. Annem 18 elma daha koydu. Sepette kaç elma oldu?</p><p>1. '+M("Anla")+' 34 vardı, 18 eklendi, hepsi soruluyor. 2. '+M("Planla")+' Toplama. 3. '+M("Çöz")+' 34 + 18 = 52. 4. '+M("Kontrol et")+' 52 − 18 = 34 ✓</p>',
     kural:["<b>Anla:</b> Problemi dikkatle oku. Ne biliyoruz, ne soruluyor?","<b>Planla:</b> Hangi işlemi yapacağına karar ver. “Eklendi, geldi, toplam” → genellikle toplama; “gitti, yedi, kaldı, fark” → genellikle çıkarma.","<b>Çöz:</b> İşlemi yap.","<b>Kontrol et:</b> Cevabın mantıklı mı? Ters işlemle sağlamasını yap."],
     dikkat:"<b>Dikkat!</b> Sadece sözcüklere bakarak işlem seçme; olayı kafanda canlandır ya da resmini çiz.",
     dene:{s:"Otobüste 45 yolcu vardı, durakta 12 yolcu indi. Hangi işlemi yaparız?", c:["45 + 12","45 − 12","12 − 45"], d:1, a:"Yolcu azaldı: 45 − 12 = 33."}},
    {id:"zihinden", grup:"islem", sinif:"2. sınıf", baslik:"Zihinden İşlem ve Sonucu Tahmin Etme",
     ornek:'<p>29 + 31 ≈ '+M("30 + 30")+' = <b>60</b> (tahmin)</p><p>40 + 25: önce onlar 40 + 20 = 60, sonra 60 + 5 = <b>65</b></p>',
     kural:["Sonucu tahmin etmek için sayıları en yakın onluğa <b>yuvarlarız</b>: 29 → 30, 42 → 40.","Zihinden toplarken önce <b>onlukları</b>, sonra <b>birlikleri</b> toplamak kolaydır.","10'un katlarıyla işlem yapmak çok hızlıdır: 50 + 30 = 80, 70 − 20 = 50."],
     dikkat:"<b>İpucu:</b> Birler basamağı 5 ya da daha büyükse bir üst onluğa, küçükse alt onluğa yuvarla: 47 → 50, 43 → 40.",
     dene:{s:"38 + 21 sonucunu tahmin et. En yakın hangisi?", c:["40","60","80"], d:1, a:"38 ≈ 40, 21 ≈ 20 → 60 (gerçek sonuç 59)."}},
    {id:"iliski", grup:"islem", sinif:"2. sınıf", baslik:"Toplama ve Çıkarmanın İlişkisi",
     ornek:'<p>8 + 5 = 13 · 5 + 8 = 13</p><p>13 − 5 = 8 · 13 − 8 = 5</p><p style="font-size:.85em;color:var(--soluk)">Aynı üç sayı, dört işlem: bir “işlem ailesi”.</p>',
     kural:["Toplama ve çıkarma <b>ters işlemlerdir</b>: biri yaptığını öbürü geri alır.","Bir toplamanın sağlamasını çıkarmayla, bir çıkarmanın sağlamasını toplamayla yaparız.","Eksik sayıyı ters işlemle buluruz: __ + 6 = 15 → 15 − 6 = 9."],
     dikkat:"<b>İpucu:</b> Bir “işlem ailesi”nde en büyük sayı her zaman toplamdır.",
     dene:{s:"__ + 7 = 16 eşitliğinde boşluğa hangi sayı gelir?", c:["23","9","8"], d:1, a:"16 − 7 = 9."}},
    {id:"carpma", grup:"islem", sinif:"2. sınıf", baslik:"Çarpma: Tekrarlı Toplama",
     ornek:'<p>🍎🍎🍎🍎 | 🍎🍎🍎🍎 | 🍎🍎🍎🍎</p><p>4 + 4 + 4 = 12 → '+M("3 × 4 = 12")+' (3 kere 4)</p>',
     kural:["Aynı sayıyı tekrar tekrar toplamanın kısa yoluna <b>çarpma</b> denir.","<b>×</b> işareti “kere” diye okunur: 3 × 4 “üç kere dört”.","3 × 4 ile 4 × 3 aynı sonucu verir; ama anlamları farklıdır: 3 tane 4'lü grup / 4 tane 3'lü grup."],
     dikkat:"<b>İpucu:</b> Çarpmayı ritmik sayma ile yapabilirsin: 3 × 5 → 5, 10, 15.",
     dene:{s:"5 + 5 + 5 + 5 toplamını çarpma ile nasıl yazarız?", c:["5 × 5","4 × 5","4 + 5"], d:1, a:"4 tane 5 var: 4 × 5 = 20."}},
    {id:"bolme", grup:"islem", sinif:"2. sınıf", baslik:"Bölme: Paylaştırma ve Gruplama",
     ornek:'<p>12 kurabiyeyi 3 arkadaşa eşit paylaştıralım:</p><p>🍪🍪🍪🍪 | 🍪🍪🍪🍪 | 🍪🍪🍪🍪 → '+M("12 ÷ 3 = 4")+'</p>',
     kural:["Bir çokluğu <b>eşit</b> parçalara ayırmaya <b>bölme</b> denir.","<b>Paylaştırma:</b> 12 kurabiye 3 kişiye → her birine kaç tane düşer? (4)","<b>Gruplama:</b> 12 kurabiyeyi 4'erli paketlere koyarsak kaç paket olur? (3)","<b>÷</b> işareti “bölü” diye okunur. Bölme, tekrarlı çıkarmadır: 12 − 4 − 4 − 4 = 0 → 3 kez."],
     dikkat:"<b>Dikkat!</b> Bölmede paylar <b>eşit</b> olmalıdır. Birine 5, birine 3 vermek bölme değildir.",
     dene:{s:"10 balonu 2 çocuğa eşit paylaştırırsak her birine kaç balon düşer?", c:["2","5","8"], d:1, a:"10 ÷ 2 = 5."}},
    {id:"esitlik", grup:"islem", sinif:"2. sınıf", baslik:"Eşitlik: Terazi Dengede",
     ornek:'<p>'+M("7 + 3")+' = '+M("5 + 5")+' → iki taraf da 10, terazi dengede ⚖️</p><p>4 + 6 = __ + 2 → sol taraf 10, sağ taraf da 10 olmalı: <b>8</b></p>',
     kural:["<b>=</b> işareti “sonuç” demek değildir; “iki taraf <b>aynı değerde</b>” demektir.","Eşitliğin iki tarafında da işlem olabilir: 5 + 4 = 10 − 1.","Bir tarafa ekleme yaparsak denge bozulur; dengeyi korumak için öbür tarafa da aynı miktarda eklemeliyiz."],
     dikkat:"<b>Dikkat!</b> 4 + 6 = __ + 2 sorusuna 10 yazmak yanlıştır. İki tarafın toplamı eşit olmalı.",
     dene:{s:"9 + 3 = __ + 5 eşitliğinde boşluğa ne gelir?", c:["12","7","17"], d:1, a:"Sol taraf 12. 7 + 5 = 12."}},
    {id:"kesir", grup:"sayi", sinif:"2. sınıf", baslik:"Bütün, Yarım ve Çeyrek",
     ornek:'<div class="mk-dizi"><span class="mk-kart">'+kesir(1,1,"#ffd166")+'<b>bütün</b></span><span class="mk-kart">'+kesir(2,1,"#9fd3ff")+'<b>yarım</b></span><span class="mk-kart">'+kesir(4,1,"#ffb3c1")+'<b>çeyrek</b></span></div>',
     kural:["Bir bütünü <b>2 eşit</b> parçaya böldüğümüzde her parça <b>yarım</b>dır. 2 yarım = 1 bütün.","Bir bütünü <b>4 eşit</b> parçaya böldüğümüzde her parça <b>çeyrek</b>tir. 4 çeyrek = 1 bütün.","2 çeyrek = 1 yarım."],
     dikkat:"<b>Dikkat!</b> Parçalar <b>eşit</b> değilse yarım ya da çeyrek diyemeyiz. Elmayı biri büyük, biri küçük iki parçaya bölmek “yarım” değildir.",
     dene:{s:"Kaç çeyrek bir yarım eder?", c:["1","2","4"], d:1, a:"2 çeyrek = 1 yarım."}},
    {id:"para", grup:"olcme", sinif:"2. sınıf", baslik:"Paralarımız",
     ornek:'<div class="mk-dizi"><span class="mk-para">1 kr</span><span class="mk-para">5 kr</span><span class="mk-para">10 kr</span><span class="mk-para">25 kr</span><span class="mk-para">50 kr</span><span class="mk-para b">1 TL</span></div><div class="mk-dizi"><span class="mk-kagit">5 TL</span><span class="mk-kagit">10 TL</span><span class="mk-kagit">20 TL</span><span class="mk-kagit">50 TL</span><span class="mk-kagit">100 TL</span><span class="mk-kagit">200 TL</span></div>',
     kural:["Paramızın birimi <b>Türk lirası (TL)</b>dır. Liradan küçük birim <b>kuruş (kr)</b>tur.","<b>100 kuruş = 1 lira</b>. 2 tane 50 kuruş = 1 lira; 4 tane 25 kuruş = 1 lira.","Madenî paralar ve kâğıt paralar vardır. Alışverişte para üstünü toplama ve çıkarmayla hesaplarız."],
     dikkat:"<b>İpucu:</b> Paraları sayarken büyük değerliden başla: 10 + 5 + 1 + 1 = 17 lira.",
     dene:{s:"2 tane 50 kuruş kaç eder?", c:["50 kuruş","1 lira","2 lira"], d:1, a:"50 + 50 = 100 kuruş = 1 lira."}},
    {id:"zaman", grup:"olcme", sinif:"2. sınıf", baslik:"Zaman Ölçme: Saat",
     ornek:'<div class="mk-dizi"><span class="mk-kart">'+saat(3,0)+'<b>saat 3</b></span><span class="mk-kart">'+saat(7,30)+'<b>yedi buçuk</b></span><span class="mk-kart">'+saat(10,15)+'<b>onu çeyrek geçiyor</b></span></div>',
     kural:["Saatte iki ibre vardır: kısa olan <b>akrep</b> saati, uzun olan <b>yelkovan</b> dakikayı gösterir.","Yelkovan 12'deyse saat <b>tam</b>, 6'daysa <b>buçuk</b>, 3'teyse <b>çeyrek geçiyor</b>, 9'daysa <b>çeyrek var</b>.","1 saat = 60 dakika · 1 gün = 24 saat · 1 hafta = 7 gün · 1 yıl = 12 ay · 1 yıl = 4 mevsim."],
     dikkat:"<b>Dikkat!</b> Buçukta akrep iki sayının tam ortasındadır. 7 buçukta akrep 7 ile 8 arasındadır.",
     dene:{s:"Yelkovan 12'de, akrep 5'te. Saat kaç?", c:["12","5","5 buçuk"], d:1, a:"Yelkovan 12'deyse saat tamdır: saat 5."}},
    {id:"uzunluk", grup:"olcme", sinif:"2. sınıf", baslik:"Uzunluk Ölçme: Metre ve Santimetre",
     ornek:'<div>'+cetvel(8)+'</div><p>Kalem 8 cm · Sıra 1 m · Kapı 2 m</p>',
     kural:["Herkes aynı sonucu bulsun diye <b>standart birimler</b> kullanırız. Karışla, adımla ölçünce herkes farklı bulur.","Kısa uzunlukları <b>santimetre (cm)</b>, uzun olanları <b>metre (m)</b> ile ölçeriz.","<b>1 metre = 100 santimetre</b>.","Cetvelle ölçerken nesnenin ucunu <b>0</b> çizgisine koyarız."],
     dikkat:"<b>Dikkat!</b> Cetvelin ucundan değil, 0 çizgisinden başla.",
     dene:{s:"Okul bahçesinin uzunluğunu hangi birimle ölçeriz?", c:["santimetre","metre","kilogram"], d:1, a:"Uzun mesafeler metreyle ölçülür."}},
    {id:"kutle", grup:"olcme", sinif:"2. sınıf", baslik:"Kütle Ölçme: Kilogram",
     ornek:'<p>⚖️ 1 paket şeker ≈ <b>1 kg</b> · Karpuz ≈ 5 kg · Kardeşim ≈ 20 kg</p>',
     kural:["Nesnelerin ne kadar ağır olduğunu <b>terazi</b> ile ölçeriz.","Kütle birimi <b>kilogram (kg)</b>dır.","Tahmin yaparken bildiğimiz bir nesneyi örnek alırız: “1 paket şeker 1 kg; bu karpuz yaklaşık 5 paket şeker kadar.”"],
     dikkat:"<b>Dikkat!</b> Büyük nesne her zaman ağır değildir: bir balon büyüktür ama hafiftir.",
     dene:{s:"Hangisinin kütlesi yaklaşık 1 kg'dır?", c:["bir silgi","bir paket şeker","bir buzdolabı"], d:1, a:"1 paket şeker yaklaşık 1 kg'dır."}},
    {id:"yon", grup:"geo", sinif:"2. sınıf", baslik:"Yer ve Yön Bulma",
     ornek:'<p>🏠 → 3 adım ileri → sağa dön → 2 adım ileri → 🏫</p>',
     kural:["Yer tarif ederken <b>sağ, sol, ileri, geri, yukarı, aşağı</b> sözcüklerini kullanırız.","Mesafeyi <b>adım</b>, kare ya da metre ile söyleriz: “4 adım ileri git.”","Bir hedefe birden fazla yoldan gidilebilir; en kısa yolu bulmak için adımları sayarız.","Bir yerin yukarıdan bakılarak çizilmiş basit resmine <b>kroki</b> denir."],
     dikkat:"<b>Dikkat!</b> Sağ ve sol, yüzünün döndüğü yöne göre değişir. Arkasını dönen birinin sağı, senin solun olur.",
     dene:{s:"Yüzün tahtaya dönük, pencere sağında. Arkanı dönersen pencere nerede kalır?", c:["sağında","solunda","önünde"], d:1, a:"Arkanı dönünce sağ ve sol yer değiştirir: pencere solunda kalır."}},
    {id:"simetri", grup:"geo", sinif:"2. sınıf", baslik:"Simetri",
     ornek:'<div class="mk-dizi"><span class="mk-kart">'+svg(80,70,'<path d="M40 12 C20 -6 0 18 12 34 C20 46 40 60 40 60 C40 60 60 46 68 34 C80 18 60 -6 40 12 Z" fill="#ffb3c1" stroke="#1c2b3a" stroke-width="2.5"/><line x1="40" y1="2" x2="40" y2="68" stroke="#3a86ff" stroke-width="2.5" stroke-dasharray="5 4"/>',80)+'<b>simetrik</b></span><span class="mk-kart">'+svg(80,70,'<path d="M10 60 L20 10 L70 22 L56 60 Z" fill="#d9f0ff" stroke="#1c2b3a" stroke-width="2.5"/>',80)+'<b>simetrik değil</b></span></div>',
     kural:["Bir şekli bir çizgi boyunca katladığımızda iki yarısı tam olarak <b>üst üste geliyorsa</b> şekil <b>simetriktir</b>.","Katladığımız çizgiye <b>simetri doğrusu</b> denir.","Kelebek, kalp, yaprak, A harfi simetriktir."],
     dikkat:"<b>İpucu:</b> Şeklin ortasına bir ayna koyduğunu düşün. Aynadaki görüntü öbür yarıyla aynıysa şekil simetriktir.",
     dene:{s:"Hangi harf simetriktir?", c:["F","A","G"], d:1, a:"A harfini ortadan katlarsan iki yarısı üst üste gelir."}},
    {id:"veri", grup:"veri", sinif:"2. sınıf", baslik:"Veri Toplama: Çetele, Tablo ve Grafik",
     ornek:'<table class="mk-tablo"><tr><th>Meyve</th><th>Çetele</th><th>Sayı</th></tr><tr><td>Elma</td><td><s>||||</s> ||</td><td>7</td></tr><tr><td>Muz</td><td>||||</td><td>4</td></tr></table>',
     kural:["Bir soruya cevap bulmak için bilgi toplarız. Topladığımız bilgilere <b>veri</b> denir.","Verileri sayarken <b>çetele</b> tutarız: her biri için bir çizgi, beşincisini dördünün üstüne çapraz çizeriz.","Çeteleyi sayıya çevirip <b>sıklık tablosu</b> yaparız; tabloyu resim ya da sütunlarla <b>grafiğe</b> dönüştürürüz.","Grafiğe bakarak “En çok hangisi? Kaç fazla?” gibi sorulara cevap verir, <b>karar</b> alırız."],
     dikkat:"<b>İpucu:</b> Çeteleyi beşerli gruplarla tutarsan saymak çok kolaylaşır.",
     dene:{s:"Tabloya göre elmayı seçenler muzu seçenlerden kaç fazladır?", c:["2","3","11"], d:1, a:"7 − 4 = 3."}}
  ];
  window.KONU = window.KONU || {};
  window.KONU.mat = {ad:"Matematik", aciklama:"2. sınıf matematik konuları, MEB yıllık planı sırasıyla. Her konuda önce örneğe bakıyoruz, kuralı örnekten çıkarıyoruz, sonra kendimiz deniyoruz.", GRUP:GRUP, K:K};
})();
