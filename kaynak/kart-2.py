"""2. sınıf kartlarını materyaller.json'a yazar. Çalıştır: python3 kaynak/kart-2.py
turkce2.js (Türkçe) ve matematik2.js (Matematik) haftalarını okur; ünite adları takvim-2.json'dan."""
import json, re
p = 'deneme/veri/materyaller.json'
L = json.load(open(p))
T = json.load(open('deneme/veri/takvim-2.json'))
def bas(s):
    return ' '.join(w.lower() if w.lower() in ('ve', 'ile') else w[:1] + w[1:].replace('I', 'ı').replace('İ', 'i').lower() for w in s.replace('(', '( ').split()).replace('( ', '(')
DERS = [('turkce', 'turkce2.js', 'tema', 't2'), ('matematik', 'matematik2.js', 'unite', 'm2'), ('hayat_bilgisi', 'hayat2.js', 'unite', 'h2')]
for ders, dosya, alan, onek in DERS:
    unite = {w['hafta']: next((bas(x) for x in w['dersler'].get(ders, {}).get(alan, []) if 'HAFTASI' not in x), 'Hatırlatma Haftası')
             for w in T['haftalar'] if isinstance(w['hafta'], int)}
    t = open('kaynak/calisma-kagitlari/' + dosya).read()
    haf = sorted((int(h), b.replace("\\'", "'")) for h, b in re.findall(r"(?:'hafta-\d\d': \{ unite: \d+, hafta: (\d+), baslik: |'hafta-\d\d': [HW]\((\d+), \d+, )'((?:[^'\\]|\\.)+)'", t) and
                 [(a or b, c) for a, b, c in re.findall(r"'hafta-\d\d': (?:\{ unite: \d+, hafta: (\d+), baslik: |[HW]\((\d+), \d+, )'((?:[^'\\]|\\.)+)'", t)])
    L = [m for m in L if not (m.get('sinif') == 2 and m.get('ders') == ders)]
    L += [{"id": f"{onek}-hafta-{h:02d}", "sinif": 2, "tur": "calisma", "ders": ders, "unite": unite.get(h, ''), "hafta": h,
           "baslik": f"{h}. Hafta · {b}", "dosya": f"materyaller/2-sinif/{ders.replace('_', '-')}/hafta-{h:02d}.pdf",
           "resim": f"materyaller/2-sinif/{ders.replace('_', '-')}/hafta-{h:02d}-onizleme.png"} for h, b in haf]
    print(ders, len(haf), 'kart', [unite.get(h) for h, _ in haf][:3])
json.dump(L, open(p, 'w'), ensure_ascii=False, indent=2); open(p, 'a').write('\n')
