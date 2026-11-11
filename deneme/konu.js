// Konu anlatımı motoru: konu-dil.js / konu-mat.js verisinden kart çizer. konu-anlatimi.html ve index.html kullanır.
(function(){
  function bul(ders, id){ var D = (window.KONU || {})[ders]; if (!D) return null; for (var i = 0; i < D.K.length; i++) if (D.K[i].id === id) return {D: D, k: D.K[i], i: i}; return null; }
  window.KONU_SAHIP = function(id){ return Object.keys(window.KONU || {}).filter(function(d){ return !!bul(d, id); })[0] || null; };
  window.KONU_BASLIK = function(ders, id){ var b = bul(ders, id); return b ? b.k.baslik : id; };
  window.KONU_PDF = function(ders, id){ return "materyaller/konu/" + ders + "/" + id + ".pdf"; };
  window.KONU_CIZ = function(ders, id, no){
    var b = bul(ders, id); if (!b) return "";
    var k = b.k, G = b.D.GRUP[k.grup];
    return '<article class="konu" id="'+k.id+'" data-ders="'+ders+'" style="--g:'+G.g+';--ga:'+G.ga+'">'+
      '<div class="konu-ust"><span class="no">'+(no || b.i + 1)+'</span><h3>'+k.baslik+'</h3><span class="sinif">'+k.sinif+'</span></div>'+
      '<div class="konu-ic"><div><p class="etiket">Örnekle başlayalım</p><div class="ornek">'+k.ornek+'</div></div>'+
      '<div class="kural"><p class="etiket">Kural</p><ul>'+k.kural.map(function(x){ return "<li>"+x+"</li>"; }).join("")+'</ul><div class="dikkat">'+k.dikkat+'</div></div>'+
      '<div class="dene"><p>Kendin dene: '+k.dene.s+'</p><div class="secenek">'+k.dene.c.map(function(c, j){ return '<button type="button" data-j="'+j+'">'+c+'</button>'; }).join("")+'</div><div class="geri" aria-live="polite"></div></div>'+
      '</div></article>';
  };
  document.addEventListener("click", function(e){
    var btn = e.target.closest(".konu .secenek button"); if (!btn) return;
    var art = btn.closest(".konu"), b = bul(art.dataset.ders, art.id); if (!b) return;
    var dogru = +btn.dataset.j === b.k.dene.d;
    btn.classList.add(dogru ? "dogru" : "yanlis");
    art.querySelector(".geri").innerHTML = dogru ? "✔ Aferin! " + b.k.dene.a : "Bir daha dene. Örneğe tekrar bak.";
  });
})();
