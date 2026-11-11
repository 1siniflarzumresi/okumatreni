"""2. sınıf Türkçe kartlarını (turkce2.js → materyaller.json) yeniler. Çalıştır: python3 kaynak/kart-t2.py"""
import json, re
p = 'deneme/veri/materyaller.json'
L = json.load(open(p))
T = json.load(open('deneme/veri/takvim-2.json'))
def bas(s):
    return ' '.join(w.lower() if w.lower() in ('ve', 'ile') else w[:1] + w[1:].replace('I', 'ı').replace('İ', 'i').lower() for w in s.split())
tema = {w['hafta']: next((bas(x) for x in w['dersler'].get('turkce', {}).get('tema', []) if 'HAFTASI' not in x), 'Hatırlatma Haftası')
        for w in T['haftalar'] if isinstance(w['hafta'], int)}
t = open('kaynak/calisma-kagitlari/turkce2.js').read()
haf = sorted((int(h), b.replace("\\'", "'")) for h, b in re.findall(r"'hafta-\d\d': \{ unite: \d+, hafta: (\d+), baslik: '((?:[^'\\]|\\.)+)'", t))
L = [m for m in L if not (m.get('sinif') == 2 and m.get('ders') == 'turkce')]
L += [{"id": f"t2-hafta-{h:02d}", "sinif": 2, "tur": "calisma", "ders": "turkce", "unite": tema.get(h, ''), "hafta": h,
       "baslik": f"{h}. Hafta · {b}", "dosya": f"materyaller/2-sinif/turkce/hafta-{h:02d}.pdf",
       "resim": f"materyaller/2-sinif/turkce/hafta-{h:02d}-onizleme.png"} for h, b in haf]
json.dump(L, open(p, 'w'), ensure_ascii=False, indent=2); open(p, 'a').write('\n')
print(len(haf), 'kart', [tema.get(h) for h, _ in haf][:6])
