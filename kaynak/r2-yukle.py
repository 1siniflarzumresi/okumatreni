"""Sitenin PDF ve önizleme dosyalarını Cloudflare R2 kovasına (ladinormani-pdf) yükler.
Yalnız değişen dosyaları gönderir (MD5 listesi: kaynak/cloudflare/yuklenen.json).
Kullanım: python3 kaynak/r2-yukle.py [--hepsi] [--dene]
Belirteç ortamın ağ vekilince api.cloudflare.com isteklerine eklenir; betikte anahtar yok.
Toplu paketler (grup-*.pdf, *-hafta-NN-NN.pdf) sitede gösterilmediği için yüklenmez."""
import hashlib, json, pathlib, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
HESAP = '06dec44780ac077dea62823d91a5162f'; KOVA = 'ladinormani-pdf'
KOK = pathlib.Path(__file__).resolve().parent.parent
MAT = KOK / 'deneme' / 'materyaller'
LISTE = KOK / 'kaynak' / 'cloudflare' / 'yuklenen.json'
TUR = {'.pdf': 'application/pdf', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg'}
paket = re.compile(r'(^grup-|-hafta-\d\d-\d\d\.pdf$)')
def dosyalar():
    for p in sorted(MAT.rglob('*')):
        if not p.is_file() or p.suffix not in TUR or paket.search(p.name): continue
        if p.suffix != '.pdf' and not p.name.endswith('-onizleme.png'): continue   # kaynak resimler siteye gerekmez
        yield p
def md5(p): return hashlib.md5(p.read_bytes()).hexdigest()
def yukle(p):
    key = 'materyaller/' + p.relative_to(MAT).as_posix()
    url = f'https://api.cloudflare.com/client/v4/accounts/{HESAP}/r2/buckets/{KOVA}/objects/{key}'
    for deneme in range(4):
        r = subprocess.run(['curl', '-s', '-X', 'PUT', url, '-H', f'Content-Type: {TUR[p.suffix]}', '--data-binary', f'@{p}'], capture_output=True, text=True)
        try:
            if json.loads(r.stdout).get('success'): return key, None
        except Exception: pass
    return key, r.stdout[:200] or r.stderr[:200]
def main():
    hepsi, dene = '--hepsi' in sys.argv, '--dene' in sys.argv
    eski = json.loads(LISTE.read_text()) if LISTE.exists() and not hepsi else {}
    yeni, is_ = {}, []
    for p in dosyalar():
        k = p.relative_to(MAT).as_posix(); h = md5(p); yeni[k] = h
        if eski.get(k) != h: is_.append(p)
    print(f'{len(yeni)} dosya, {len(is_)} tanesi yüklenecek ({sum(p.stat().st_size for p in is_) / 1e6:.0f} MB)')
    if dene: return
    hata = []
    with ThreadPoolExecutor(8) as ex:
        for i, (key, h) in enumerate(ex.map(yukle, is_), 1):
            if h: hata.append((key, h)); yeni.pop(key.split('/', 1)[1], None)
            if i % 100 == 0: print(i, 'yüklendi', flush=True)
    LISTE.parent.mkdir(exist_ok=True); LISTE.write_text(json.dumps(yeni, ensure_ascii=False, indent=0, sort_keys=True))
    print('HATA:', len(hata), *[f'\n  {k}: {h}' for k, h in hata[:10]]) if hata else print('tamam')
if __name__ == '__main__': main()
