// Ladin Ormanı — üyelik (Firebase Authentication + Firestore). Düz ES modülü, derleme yok.
// Sayfalara <script type="module" src="uyelik.js"></script> ile eklenir.
//
// Ne yapar:
//  - Üst menüdeki #uye-alani kutusunu doldurur (Giriş yap / Kayıt ol  ya da  ad + Çıkış).
//  - PDF bağlantılarına tıklanınca girişsiz kullanıcıyı giriş sayfasına yollar; girişten sonra geldiği sayfaya döner.
//  - [data-uye-goster="giris|cikis|ogretmen"] öğelerini giriş durumuna ve role göre gösterir/gizler.
//  - giris.html ve hesap.html için işlevleri dışa verir.
//
// ÖNEMLİ: Bu koruma yalnız arayüz düzeyindedir. PDF dosyaları GitHub Pages'te herkese açıktır;
// adresini bilen girişsiz de indirebilir. Gerçek dosya koruması için dosyaların yetki soran bir depoya taşınması gerekir.
import * as AYAR from "./firebase-ayar.js";

const SURUM = "10.14.1";
const CDN = "https://www.gstatic.com/firebasejs/" + SURUM + "/";
const KOLEKSIYON = "kullanicilar";
export const ROLLER = { ogrenci: "Öğrenci", ogretmen: "Öğretmen" };

export const yapilandirildi = !!(AYAR.FIREBASE_AYAR && AYAR.FIREBASE_AYAR.apiKey);

// ---- durum ----
// asama: "kapali" (Firebase ayarı yok) | "yukleniyor" | "cikis" | "eksik" (oturum var, kayıt belgesi yok) | "giris"
const D = { asama: yapilandirildi ? "yukleniyor" : "kapali", kullanici: null, belge: null, rol: null, dogrulandi: false };
const dinleyenler = new Set();
let A = null, F = null, auth = null, db = null, kayitSuruyor = false;
let ilkCoz; const ilk = new Promise(r => (ilkCoz = r));

export function durum() { return D; }
export function durumDegisince(fn) { dinleyenler.add(fn); fn(D); return () => dinleyenler.delete(fn); }
/** İlk oturum bilgisi gelince çözülür (Firebase kapalıysa hemen). */
export function hazir() { return ilk; }

function yayinla() {
  arayuzGuncelle();
  dinleyenler.forEach(fn => { try { fn(D); } catch (e) { console.error(e); } });
  if (D.asama !== "yukleniyor") ilkCoz(D);
}

async function belgeOku(k) {
  const s = await F.getDoc(F.doc(db, KOLEKSIYON, k.uid));
  return s.exists() ? s.data() : null;
}
async function durumKur(k) {
  if (!k) { Object.assign(D, { asama: "cikis", kullanici: null, belge: null, rol: null, dogrulandi: false }); return yayinla(); }
  let belge = null;
  try { belge = await belgeOku(k); } catch (e) { console.error("Kayıt okunamadı:", e); }
  // "rol" alanını yalnız yönetici (Firebase konsolu) yazar. Alan yoksa ya da tanınmıyorsa rol öğrencidir.
  const rol = belge && belge.rol === "ogretmen" ? "ogretmen" : "ogrenci";
  Object.assign(D, { asama: belge ? "giris" : "eksik", kullanici: k, belge, rol: belge ? rol : null, dogrulandi: !!k.emailVerified });
  yayinla();
}

async function baslat() {
  if (!yapilandirildi) return yayinla();
  try {
    const [app, a, f] = await Promise.all([import(CDN + "firebase-app.js"), import(CDN + "firebase-auth.js"), import(CDN + "firebase-firestore.js")]);
    A = a; F = f;
    const uyg = app.initializeApp(AYAR.FIREBASE_AYAR);
    auth = a.getAuth(uyg); auth.languageCode = "tr";
    db = f.getFirestore(uyg);
    // Yalnız yerel denemede (127.0.0.1 / localhost) emülatöre bağlanır; yayındaki sitede etkisizdir.
    const yerel = ["127.0.0.1", "localhost"].includes(location.hostname);
    if (yerel && AYAR.EMULATOR) {
      a.connectAuthEmulator(auth, AYAR.EMULATOR.auth, { disableWarnings: true });
      f.connectFirestoreEmulator(db, AYAR.EMULATOR.firestore[0], AYAR.EMULATOR.firestore[1]);
    }
    a.onAuthStateChanged(auth, k => { if (!kayitSuruyor) durumKur(k); });
  } catch (e) {
    console.error("Üyelik başlatılamadı:", e);
    Object.assign(D, { asama: "cikis", hata: e }); yayinla();
  }
}

// ---- dönüş adresi (yalnız bu sitedeki bir sayfa adı kabul edilir; dış adrese yönlendirme olmaz) ----
const SAYFA_RE = /^[a-z0-9-]+\.html(?:[?#][^\s]*)?$/i;
export function buSayfa() { return (location.pathname.split("/").pop() || "index.html") + location.search + location.hash; }
export function donusAdresi() {
  const d = new URLSearchParams(location.search).get("donus") || "";
  return SAYFA_RE.test(d) && !/^(giris|hesap)\.html/i.test(d) ? d : "index.html";
}
export function girisAdresi(ek) {
  const s = buSayfa();
  const q = new URLSearchParams();
  if (ek) q.set("adim", ek);
  if (SAYFA_RE.test(s) && !/^giris\.html/i.test(s)) q.set("donus", s);
  const t = q.toString();
  return "giris.html" + (t ? "?" + t : "");
}

// ---- işlemler ----
function gerek() { if (!auth) throw Object.assign(new Error("kapali"), { code: "ladin/kapali" }); }
function yeniBelge(ad, eposta, ogretmenTalebi) {
  // "rol" bilerek YOK: istemci rol yazamaz, Firestore kuralları da reddeder.
  return { ad: String(ad).trim().slice(0, 60), eposta, ogretmenTalebi: !!ogretmenTalebi, kvkkOnay: F.serverTimestamp(), olusturma: F.serverTimestamp() };
}

export async function kayitOl({ ad, eposta, sifre, ogretmenTalebi }) {
  gerek(); kayitSuruyor = true;
  try {
    const { user } = await A.createUserWithEmailAndPassword(auth, eposta.trim(), sifre);
    await A.updateProfile(user, { displayName: String(ad).trim().slice(0, 60) });
    await F.setDoc(F.doc(db, KOLEKSIYON, user.uid), yeniBelge(ad, user.email, ogretmenTalebi));
    try { await A.sendEmailVerification(user); } catch (e) { console.warn("Doğrulama e-postası gönderilemedi:", e); }
    await durumKur(user);
    return user;
  } finally { kayitSuruyor = false; if (auth.currentUser && D.kullanici !== auth.currentUser) durumKur(auth.currentUser); }
}
export async function girisYap(eposta, sifre) { gerek(); return (await A.signInWithEmailAndPassword(auth, eposta.trim(), sifre)).user; }
export async function googleIle() {
  gerek();
  const s = new A.GoogleAuthProvider(); s.setCustomParameters({ prompt: "select_account" });
  const { user } = await A.signInWithPopup(auth, s);
  await durumKur(user);          // belge yoksa asama "eksik" olur; giriş sayfası onay adımını gösterir
  return user;
}
/** Google ile ilk girişte: onay kutuları işaretlendikten sonra kayıt belgesini oluşturur. */
export async function kaydiTamamla({ ad, ogretmenTalebi }) {
  gerek(); const k = auth.currentUser; if (!k) throw Object.assign(new Error("oturum yok"), { code: "ladin/oturum-yok" });
  await F.setDoc(F.doc(db, KOLEKSIYON, k.uid), yeniBelge(ad || k.displayName || "Üye", k.email, ogretmenTalebi));
  await durumKur(k);
}
export async function sifreSifirla(eposta) { gerek(); await A.sendPasswordResetEmail(auth, eposta.trim()); }
export async function dogrulamaGonder() { gerek(); await A.sendEmailVerification(auth.currentUser); }
/** Kullanıcı e-postadaki bağlantıya tıkladıktan sonra durumu tazeler. */
export async function yenile() { gerek(); if (auth.currentUser) { await auth.currentUser.reload(); await durumKur(auth.currentUser); } return D; }
export async function bilgiGuncelle({ ad, ogretmenTalebi }) {
  gerek(); const k = auth.currentUser, deg = {};
  if (ad != null) deg.ad = String(ad).trim().slice(0, 60);
  if (ogretmenTalebi != null) deg.ogretmenTalebi = !!ogretmenTalebi;
  await F.updateDoc(F.doc(db, KOLEKSIYON, k.uid), deg);
  if (deg.ad) await A.updateProfile(k, { displayName: deg.ad });
  await durumKur(k);
}
export async function cikis() { gerek(); await A.signOut(auth); }
export async function hesabiSil() {
  gerek(); const k = auth.currentUser;
  // Firebase hesap silmek için yakın zamanda (5 dk) giriş ister. Belgeyi silip hesabı silememek yarım kalmış
  // bir kayıt bırakacağından, önce oturumun tazeliğine bakılır; eskiyse hiçbir şey silinmeden yeniden giriş istenir.
  if (Date.now() - Date.parse(k.metadata.lastSignInTime) > 4 * 60 * 1000) throw Object.assign(new Error("yeniden giriş"), { code: "auth/requires-recent-login" });
  await F.deleteDoc(F.doc(db, KOLEKSIYON, k.uid));
  await A.deleteUser(k);
}

// ---- Türkçe hata mesajları ----
const HATA = {
  "auth/invalid-credential": "E-posta ya da şifre yanlış.",
  "auth/wrong-password": "Şifre yanlış.",
  "auth/user-not-found": "Bu e-posta ile kayıtlı bir hesap yok.",
  "auth/invalid-email": "E-posta adresi geçerli görünmüyor.",
  "auth/missing-password": "Şifrenizi yazın.",
  "auth/missing-email": "E-posta adresinizi yazın.",
  "auth/email-already-in-use": "Bu e-posta ile zaten bir hesap var. Giriş yapmayı ya da şifrenizi sıfırlamayı deneyin.",
  "auth/weak-password": "Şifre çok zayıf. En az 6 karakter kullanın.",
  "auth/too-many-requests": "Çok fazla deneme yapıldı. Biraz bekleyip yeniden deneyin.",
  "auth/network-request-failed": "Bağlantı kurulamadı. İnternetinizi kontrol edip yeniden deneyin.",
  "auth/popup-closed-by-user": "Google penceresi kapatıldı. Yeniden deneyebilirsiniz.",
  "auth/cancelled-popup-request": "Google penceresi kapatıldı. Yeniden deneyebilirsiniz.",
  "auth/popup-blocked": "Tarayıcı Google penceresini engelledi. Açılır pencerelere izin verip yeniden deneyin.",
  "auth/user-disabled": "Bu hesap kapatılmış.",
  "auth/requires-recent-login": "Güvenlik için yeniden giriş yapmanız gerekiyor. Çıkış yapıp tekrar girin, sonra yeniden deneyin.",
  "auth/account-exists-with-different-credential": "Bu e-posta başka bir giriş yöntemiyle kayıtlı. O yöntemle giriş yapın.",
  "auth/operation-not-allowed": "Bu giriş yöntemi henüz açılmamış.",
  "auth/unauthorized-domain": "Bu site adresi giriş için yetkilendirilmemiş.",
  "permission-denied": "Bu işlem için yetkiniz yok.",
  "unavailable": "Sunucuya ulaşılamadı. Biraz sonra yeniden deneyin.",
  "ladin/kapali": "Üyelik henüz açılmadı.",
  "ladin/oturum-yok": "Önce giriş yapın."
};
export function hataMesaji(e) {
  const kod = (e && e.code) || "";
  return HATA[kod] || "Bir sorun oluştu. Lütfen yeniden deneyin." + (kod ? " (" + kod + ")" : "");
}

// ---- arayüz: üst menü, görünürlük, indirme koruması ----
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function gorunenAd() { return (D.belge && D.belge.ad) || (D.kullanici && (D.kullanici.displayName || D.kullanici.email)) || "Hesabım"; }

function arayuzGuncelle() {
  document.documentElement.dataset.uye = D.asama;
  if (D.rol) document.documentElement.dataset.rol = D.rol; else delete document.documentElement.dataset.rol;
  const kutu = document.getElementById("uye-alani");
  if (kutu) {
    if (D.asama === "kapali" || D.asama === "yukleniyor") kutu.innerHTML = "";
    else if (D.asama === "cikis") kutu.innerHTML = '<a class="uye-giris" href="' + esc(girisAdresi()) + '">Giriş yap / Kayıt ol</a>';
    else if (D.asama === "eksik") kutu.innerHTML = '<a class="uye-giris" href="' + esc(girisAdresi("tamamla")) + '">Kaydı tamamla</a><button type="button" class="uye-cikis" data-uye-cikis>Çıkış</button>';
    else kutu.innerHTML = '<a class="uye-ad" href="hesap.html" title="Hesabım">' + esc(gorunenAd()) + (D.rol === "ogretmen" ? ' <span class="uye-rol">Öğretmen</span>' : "") + '</a><button type="button" class="uye-cikis" data-uye-cikis>Çıkış</button>';
  }
  // data-uye-goster="giris" | "cikis" | "ogretmen": ileride öğretmene özel bölümler için hazır.
  document.querySelectorAll("[data-uye-goster]").forEach(el => {
    const k = el.dataset.uyeGoster;
    el.hidden = !((k === "giris" && D.asama === "giris") || (k === "cikis" && (D.asama === "cikis" || D.asama === "eksik")) || (k === "ogretmen" && D.asama === "giris" && D.rol === "ogretmen"));
  });
}

/** İndirme izni: null = serbest; değilse gidilecek adres. */
export function indirmeEngeli() {
  if (D.asama === "kapali") return null;
  if (D.asama === "cikis") return girisAdresi();
  if (D.asama === "eksik") return girisAdresi("tamamla");
  if (AYAR.DOGRULAMA_ZORUNLU && !D.dogrulandi) return "hesap.html?dogrula=1&donus=" + encodeURIComponent(buSayfa());
  return null;
}

document.addEventListener("click", async ev => {
  const cikisDugme = ev.target.closest && ev.target.closest("[data-uye-cikis]");
  if (cikisDugme) { ev.preventDefault(); try { await cikis(); } catch (e) { console.error(e); } return; }
  const a = ev.target.closest && ev.target.closest("a[href]");
  if (!a || !/\.pdf(?:[?#]|$)/i.test(a.getAttribute("href")) || D.asama === "kapali") return;
  if (ev.defaultPrevented || ev.button > 0) return;
  if (D.asama !== "yukleniyor" && !indirmeEngeli()) return;     // girişli: bağlantı olağan biçimde açılır
  ev.preventDefault();
  await hazir();
  const engel = indirmeEngeli();
  location.href = engel || a.href;
});

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arayuzGuncelle); else arayuzGuncelle();
baslat();
