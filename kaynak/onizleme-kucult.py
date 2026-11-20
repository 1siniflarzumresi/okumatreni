"""Kart önizleme resimlerini küçültür (GitHub Pages 1 GB sınırı ve sayfa hızı için).
Kullanım: python3 kaynak/onizleme-kucult.py [klasör ...]  (varsayılan deneme/materyaller)
640 px genişlik, 128 renk PNG; zaten küçük olanlara dokunmaz."""
import sys, pathlib
from PIL import Image
GEN = 640
kok = [pathlib.Path(a) for a in sys.argv[1:]] or [pathlib.Path(__file__).resolve().parent.parent / 'deneme' / 'materyaller']
n = once = sonra = 0
for k in kok:
    for p in k.rglob('*-onizleme.png'):
        im = Image.open(p)
        if im.width <= GEN + 10: continue
        once += p.stat().st_size
        im = im.convert('RGB').resize((GEN, round(im.height * GEN / im.width)), Image.LANCZOS)
        im.quantize(colors=128, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(p, optimize=True)
        sonra += p.stat().st_size; n += 1
if n: print(f'önizleme: {n} resim küçültüldü, {once / 1e6:.1f} MB → {sonra / 1e6:.1f} MB')
