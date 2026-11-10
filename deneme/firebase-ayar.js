// Ladin Ormanı — Firebase ayarları
// Firebase konsolu → Proje ayarları → Genel → "Uygulamalarınız" → Web uygulaması → "firebaseConfig"
// içindeki değerleri aşağıya yapıştırın. Bu değerler gizli değildir; tarayıcıya gönderilmek için vardır.
// Güvenliği sağlayan Firestore kuralları ve yetkili alan adları listesidir.
//
// apiKey boş kaldığı sürece üyelik kapalıdır: site eskisi gibi çalışır, indirmeler girişsiz açılır.
export const FIREBASE_AYAR = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// true: e-posta/şifre ile kayıt olanlar e-postasını doğrulamadan indirme yapamaz. (Google ile girenler doğrulanmış sayılır.)
export const DOGRULAMA_ZORUNLU = true;

// KVKK aydınlatma metninde görünen veri sorumlusu adı ve başvuru e-postası. Boşsa ilgili cümleler gösterilmez.
export const VERI_SORUMLUSU = "";
export const ILETISIM_EPOSTA = "";
