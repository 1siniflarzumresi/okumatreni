/* Ladin Ormanı — ortak yardımcılar */
var LADIN = (function(){
  var AYLAR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  var GUNLER = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];

  function iso(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
  function gun(s){ var p=s.split("-"); return new Date(+p[0],+p[1]-1,+p[2]); }
  function tarihYaz(d){ return d.getDate()+" "+AYLAR[d.getMonth()]+" "+d.getFullYear()+", "+GUNLER[d.getDay()]; }

  // Bugünü içeren hafta: pazartesi..pazar. Hafta sonu da o haftaya sayılır.
  function buHafta(takvim, bugun){
    var t = iso(bugun || new Date());
    var hs = takvim.haftalar;
    for (var i=0;i<hs.length;i++){
      var bas = gun(hs[i].baslangic);
      var son = hs[i+1] ? gun(hs[i+1].baslangic) : new Date(bas.getTime()+7*864e5);
      if (t >= hs[i].baslangic && t < iso(son)) return hs[i];
    }
    return null;
  }

  var _takvim = null;
  function takvimYukle(){
    if (_takvim) return _takvim;
    _takvim = fetch("veri/takvim.json").then(function(r){ if(!r.ok) throw 0; return r.json(); });
    return _takvim;
  }
  function materyalYukle(){
    return fetch("veri/materyaller.json").then(function(r){ return r.ok ? r.json() : []; }).catch(function(){ return []; });
  }

  // Üst şerit: bugünün tarihi + bu hafta
  function seritDoldur(){
    var el = document.getElementById("serit-tarih"), hf = document.getElementById("serit-hafta");
    if (el) el.textContent = tarihYaz(new Date());
    if (!hf) return;
    takvimYukle().then(function(tk){
      var h = buHafta(tk);
      if (!h) hf.textContent = "Ders yılı dışında";
      else if (h.tatil) hf.innerHTML = "Bu hafta: <b>"+h.etiket+"</b>";
      else hf.innerHTML = "Bu hafta: <b>"+h.hafta+". hafta</b>";
    }).catch(function(){ hf.textContent = ""; });
  }

  function liste(x){ return Array.isArray(x) ? x : (x ? [x] : []); }
  // "SAYILAR VE NİCELİKLER (1)" → "Sayılar ve Nicelikler (1)"
  function baslik(s){
    return String(s).toLocaleLowerCase("tr").replace(/(^|\s|\()(\S)/g, function(m,a,b){ return a + b.toLocaleUpperCase("tr"); })
      .replace(/\s(Ve|İle)\s/g, function(m){ return m.toLocaleLowerCase("tr"); });
  }

  function sakla(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function oku(k,v0){ try{ var v=localStorage.getItem(k); return v==null ? v0 : JSON.parse(v); }catch(e){ return v0; } }

  document.addEventListener("DOMContentLoaded", seritDoldur);
  return { liste:liste, baslik:baslik, buHafta:buHafta, takvimYukle:takvimYukle, materyalYukle:materyalYukle, tarihYaz:tarihYaz, sakla:sakla, oku:oku };
})();
