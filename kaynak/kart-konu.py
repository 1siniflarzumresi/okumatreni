"""Haftalık kâğıt kartlarına konu adı (konu) ve konu anlatımı bağlantısı (konu_id) ekler.
Çalıştır: python3 kaynak/kart-konu.py   (kart-2.py'den sonra)"""
import json, re
p = 'deneme/veri/materyaller.json'
L = json.load(open(p))
def oku(dosya):
    t = open('kaynak/calisma-kagitlari/' + dosya).read()
    d = {}
    for h, k in re.findall(r"'hafta-\d\d': \{ unite: \d+, hafta: (\d+), baslik: '(?:[^'\\]|\\.)+', konu: '((?:[^'\\]|\\.)+)'", t): d[int(h)] = k
    for h, k in re.findall(r"'hafta-\d\d': [HW]\((\d+), \d+, '(?:[^'\\]|\\.)+', '((?:[^'\\]|\\.)+)'", t): d[int(h)] = k
    return {h: k.replace("\\'", "'") for h, k in d.items()}
ilk = lambda s: s[:1].upper() + s[1:]
KAYNAK = {(1, 'matematik'): 'matematik.js', (1, 'hayat_bilgisi'): 'hayat.js', (2, 'turkce'): 'turkce2.js', (2, 'matematik'): 'matematik2.js', (2, 'hayat_bilgisi'): 'hayat2.js'}
# 2. sınıf hafta → konu anlatımı (konu-dil.js / konu-mat.js kimlikleri)
KM = {1: ['cisimler'], 2: ['cisimler', 'modeller'], 3: ['modeller'], 4: ['yon-buyukluk'], 5: ['sivi'], 6: ['sayilar100'], 7: ['sayilar100', 'cozumleme'], 8: ['cozumleme'],
      9: ['siralama'], 10: ['siralama', 'ritmik'], 11: ['ritmik'], 12: ['oruntu'], 13: ['oruntu', 'tahmin'], 14: ['problem'], 15: ['toplama', 'cikarma'], 16: ['problem'],
      17: ['zihinden'], 18: ['zihinden'], 19: ['iliski'], 20: ['iliski', 'carpma'], 21: ['carpma', 'bolme'], 22: ['carpma', 'bolme'], 23: ['bolme'], 24: ['esitlik'], 25: ['esitlik'],
      26: ['esitlik', 'kesir'], 27: ['kesir', 'para'], 28: ['para', 'zaman'], 29: ['zaman'], 30: ['uzunluk', 'kutle'], 31: ['uzunluk', 'kutle'], 32: ['yon'], 33: ['yon', 'simetri'],
      34: ['simetri'], 35: ['veri'], 36: ['veri']}
KD = {1: ['soru-eki', 'hece'], 2: ['nokta', 'soru'], 3: ['unlem', 'virgul'], 4: ['kesme'], 5: ['zit', 'buyuk-harf'], 6: ['buyuk-harf'], 7: ['nokta'], 8: ['buyuk-harf'], 9: ['zit'],
      10: ['benzetme'], 11: ['soru-eki'], 12: ['benzetme'], 13: ['kisaltma'], 14: ['kisaltma'], 15: ['kisaltma'], 16: ['kisaltma'], 17: ['sozcuk-cumle'], 18: ['nokta', 'soru', 'unlem'],
      19: ['nokta', 'soru-eki'], 20: ['iki-nokta'], 21: ['mektup'], 22: ['mektup'], 24: ['zit'], 25: ['zit'], 26: ['benzetme'], 28: ['iki-nokta'], 31: ['mektup'], 32: ['buyuk-harf'],
      34: ['iki-nokta'], 35: ['mektup', 'zit'], 36: ['nokta', 'buyuk-harf', 'kesme']}
konular = {k: oku(v) for k, v in KAYNAK.items()}
for m in L:
    s, d, h = m.get('sinif', 1), m.get('ders'), m.get('hafta')
    if not h or (s, d) not in konular: continue
    k = konular[(s, d)].get(h, '')
    m['konu'] = ilk(k.split(' · ')[-1]) if (s, d) == (2, 'turkce') else ilk(k)
    if (s, d) == (2, 'matematik'): m['konu_id'] = ['mat:' + x for x in KM.get(h, [])]
    if (s, d) == (2, 'turkce'): m['konu_id'] = ['dil:' + x for x in KD.get(h, [])]
json.dump(L, open(p, 'w'), ensure_ascii=False, indent=2); open(p, 'a').write('\n')
print(sum(1 for m in L if m.get('konu')), 'karta konu eklendi')
