"""2. ve 3. sınıf haftalık kâğıt kartlarını materyaller.json'a yazar. Çalıştır: python3 kaynak/kart-2.py  (sonra kart-konu.py)
Modüllerdeki haftaları okur; ünite adları takvim-<sınıf>.json'dan."""
import json, re, os
p = 'deneme/veri/materyaller.json'
L = json.load(open(p))
def bas(s):
    return ' '.join(w.lower() if w.lower() in ('ve', 'ile') else w[:1] + w[1:].replace('I', 'ı').replace('İ', 'i').lower() for w in s.replace('(', '( ').split()).replace('( ', '(')
SINIF = {2: [('turkce', 'turkce2.js', 'tema', 't2'), ('matematik', 'matematik2.js', 'unite', 'm2'), ('hayat_bilgisi', 'hayat2.js', 'unite', 'h2')],
         3: [('turkce', 'turkce3.js', 'tema', 't3'), ('matematik', 'matematik3.js', 'unite', 'm3'), ('hayat_bilgisi', 'hayat3.js', 'unite', 'h3'), ('fen_bilimleri', 'fen3.js', 'unite', 'f3')],
         4: [('sosyal_bilgiler', 'sosyal4.js', 'unite', 's4'), ('matematik', 'matematik4.js', 'konu', 'm4'), ('fen_bilimleri', 'fen4.js', 'konu', 'f4'), ('turkce', 'turkce4.js', 'tema', 't4')]}
for sinif, dersler in SINIF.items():
    T = json.load(open(f'deneme/veri/takvim-{sinif}.json'))
    for ders, dosya, alan, onek in dersler:
        yol = 'kaynak/calisma-kagitlari/' + dosya
        if not os.path.exists(yol): continue
        unite = {w['hafta']: next((bas(re.sub(r'^\d+\.\s*TEMA:\s*', '', x)) for x in w['dersler'].get(ders, {}).get(alan, []) if 'HAFTASI' not in x and 'PLANLAMA' not in x), 'Hatırlatma ve Pekiştirme')
                 for w in T['haftalar'] if isinstance(w['hafta'], int)}
        t = open(yol).read()
        haf = sorted((int(a or b), c.replace("\\'", "'")) for a, b, c in re.findall(r"'hafta-\d\d': (?:\{ unite: \d+, hafta: (\d+), baslik: |[HW]\((\d+), \d+, )'((?:[^'\\]|\\.)+)'", t))
        kl = ders.replace('_', '-')
        L = [m for m in L if not (m.get('sinif') == sinif and m.get('ders') == ders)]
        L += [{"id": f"{onek}-hafta-{h:02d}", "sinif": sinif, "tur": "calisma", "ders": ders, "unite": unite.get(h, ''), "hafta": h,
               "baslik": f"{h}. Hafta · {b}", "dosya": f"materyaller/{sinif}-sinif/{kl}/hafta-{h:02d}.pdf",
               "resim": f"materyaller/{sinif}-sinif/{kl}/hafta-{h:02d}-onizleme.png"} for h, b in haf]
        print(sinif, ders, len(haf), 'kart')
json.dump(L, open(p, 'w'), ensure_ascii=False, indent=2); open(p, 'a').write('\n')
