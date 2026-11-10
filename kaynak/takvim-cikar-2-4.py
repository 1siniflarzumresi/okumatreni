"""MEB 2026-2027 taslak yıllık planlarından (xlsx) 2-4. sınıf takvim verisi üretir.
Çalıştır (depo kökünden): python3 kaynak/takvim-cikar-2-4.py
Girdi: kaynak/meb/*.xlsx · Tarihler/tatiller: deneme/veri/takvim.json (1. sınıf, aynı takvim)
Çıktı: deneme/veri/takvim-2.json, takvim-3.json, takvim-4.json"""
import json, re, openpyxl
M = 'kaynak/meb/'
PLAN = {
    2: {'turkce': ('turkce-1-4', 'Türkçe2_TYMM'), 'matematik': ('matematik-1-4', '2.Sınıf'), 'hayat_bilgisi': ('hayat-bilgisi-1-3', '2. sınıf')},
    3: {'turkce': ('turkce-1-4', 'Türkçe3_TYMM'), 'matematik': ('matematik-1-4', '3.Sınıf'), 'hayat_bilgisi': ('hayat-bilgisi-1-3', '3. sınıf'), 'fen_bilimleri': ('fen-bilimleri-3-8', 'FEN BİLİMLERİ 3 (TYMM)')},
    4: {'turkce': ('turkce-1-4', 'Türkçe4_2019 (MEB Yayınları)'), 'matematik': ('matematik-1-4', '4.Sınıf'), 'fen_bilimleri': ('fen-bilimleri-3-8', 'FEN BİLİMLERİ 4')},
}
KITAP = {}
def sayfa(dosya, ad):
    if dosya not in KITAP: KITAP[dosya] = openpyxl.load_workbook(M + dosya + '-yillik-plan.xlsx', read_only=True, data_only=True)
    return [[('' if c is None else str(c)) for c in r] for r in KITAP[dosya][ad].iter_rows(values_only=True)]
bosluk = lambda s: re.sub(r'\s+', ' ', s).strip()
KOD = re.compile(r'\b((?:MAT|HB|FB|M|F|T)(?:\.[A-Z])?(?:\.\d+)+)\.?\s*')
def uniteler_bol(s):
    out = []
    for p in re.split(r'\n\s*\n', s.strip()):
        p = bosluk(p).rstrip('*. ').strip()
        p = re.sub(r'^\d+\.\s*(ÜNİTE|TEMA)\s*:\s*', '', p, flags=re.I)
        p = re.sub(r'^[MF]\.\d+\.\d+\.\s*', '', p)
        if p: out.append(p)
    return out
def konu_bol(s):
    s = s.replace('\r', '')
    parca = re.split(r'\n|\s{3,}', s)
    out = []
    for p in parca:
        p = re.sub(r'^[MF]\.\d+\.\d+\.\d+\.\s*', '', bosluk(p))
        if p and p not in out: out.append(p)
    return out
def ciktilar(metin):
    out = []
    bul = list(KOD.finditer(metin))
    for i, m in enumerate(bul):
        son = bul[i + 1].start() if i + 1 < len(bul) else len(metin)
        ad = bosluk(metin[m.end():son])
        ad = re.split(r'(?<=bilme)\b|(?<=[.!])\s', ad)[0].strip(' .') if ad else ad
        out.append({'kod': m.group(1), 'ad': ad[:200]})
    return out
def oku(dosya, ad):
    R = sayfa(dosya, ad)
    bas = next(i for i, r in enumerate(R) if len(r) > 1 and r[1].strip().upper() == 'HAFTA')
    eski = 'KAZANIM' in ' '.join(R[bas]).upper()
    kaz = range(5, 9) if ad.startswith('Türkçe4') else range(5, 6)
    H = {}; cur = None
    for r in R[bas + 1:]:
        r = r + [''] * (14 - len(r))
        m = re.match(r'\s*(\d+)\.\s*Hafta', r[1])
        if m:
            cur = int(m.group(1)); h = H.setdefault(cur, {'unite': [], 'konu': [], 'ciktilar': [], 'gunler': []})
            for u in uniteler_bol(r[3]):
                if u not in h['unite']: h['unite'].append(u)
            for k in ([] if ad.startswith('Türkçe') and not eski else konu_bol(r[4])):
                if k not in h['konu']: h['konu'].append(k)
            bg = r[11] if not eski else ''
            for g in re.split(r'\n+', bg):
                g = bosluk(re.sub(r'\(.*?\)', '', g))
                if g and g not in h['gunler']: h['gunler'].append(g)
        if cur is None: continue
        h = H[cur]
        for c in kaz:
            for ck in ciktilar(r[c]):
                if ck['kod'] not in [x['kod'] for x in h['ciktilar']]: h['ciktilar'].append(ck)
    return H
T1 = json.load(open('deneme/veri/takvim.json'))
AD = {'turkce': 'Türkçe', 'matematik': 'Matematik', 'hayat_bilgisi': 'Hayat Bilgisi', 'fen_bilimleri': 'Fen Bilimleri'}
for sinif, dersler in PLAN.items():
    veri = {d: oku(*p) for d, p in dersler.items()}
    haftalar = []
    for w in T1['haftalar']:
        n = dict((k, w[k]) for k in ('hafta', 'etiket', 'tarih', 'baslangic', 'bitis', 'tatil'))
        n['dersler'] = {}; gun = []
        if isinstance(w['hafta'], int):
            for d, H in veri.items():
                h = H.get(w['hafta'])
                if not h: continue
                anahtar = 'tema' if d == 'turkce' else 'unite'
                n['dersler'][d] = {anahtar: h['unite'], 'konu': h['konu'], 'ciktilar': h['ciktilar']}
                gun += [g for g in h['gunler'] if g not in gun]
        n['belirli_gunler'] = gun
        haftalar.append(n)
    uniteler = {}
    for d in veri:
        L = []
        for w in haftalar:
            dd = w['dersler'].get(d)
            if not dd: continue
            for u in dd['tema' if d == 'turkce' else 'unite']:
                if 'HAFTASI' in u or 'PLANLAMA' in u: continue
                if L and L[-1]['ad'] == u: L[-1]['bitis'] = w['bitis']
                elif u not in [x['ad'] for x in L]: L.append({'ad': u, 'baslangic': w['baslangic'], 'bitis': w['bitis']})
        uniteler[d] = L
    cikti = {'egitim_yili': T1['egitim_yili'], 'sinif': sinif,
             'kaynak': f'MEB {sinif}. sınıf ' + ', '.join(AD[d] for d in dersler) + ' taslak yıllık planları (2026-2027)',
             'uniteler': uniteler, 'haftalar': haftalar}
    json.dump(cikti, open(f'deneme/veri/takvim-{sinif}.json', 'w'), ensure_ascii=False, indent=1)
    print(sinif, {d: (len(H), min(H), max(H), len(uniteler[d])) for d, H in veri.items()})
