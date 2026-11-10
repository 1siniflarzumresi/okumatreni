#!/usr/bin/env python3
"""Gemini ızgaralarını keser, dış beyaz arka planı şeffaf yapar, 600 px PNG kaydeder.
Kullanım: python3 kaynak/resim-isle.py renkli <izgara-no> <dosya> [<izgara-no> <dosya> ...]
  renkli: kaynak/resim-promptlari/renkli-sira.json sırasına göre deneme/materyaller/resimler-renkli/<ad>.png
"""
import sys, json, os
from PIL import Image, ImageDraw, ImageOps
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def cizgiler(im, eksen):
    W, H = im.size; px = im.load(); out = []
    n, m = (W, H) if eksen == 'x' else (H, W)
    for i in range(8, n - 8):
        say = sum(1 for j in range(0, m, 2) if 150 < (px[i, j] if eksen == 'x' else px[j, i]) < 238)
        if say > m / 2 * .55: out.append(i)
    g = []
    for v in out:
        if g and v - g[-1][-1] <= 3: g[-1].append(v)
        else: g.append([v])
    return [sum(x) // len(x) for x in g]

def seffaf(rgb):
    gri = rgb.convert('L'); W, H = gri.size
    isaret = gri.point(lambda v: 255 if v > 236 else 0)
    for x, y in [(x, 0) for x in range(0, W, 9)] + [(x, H - 1) for x in range(0, W, 9)] + [(0, y) for y in range(0, H, 9)] + [(W - 1, y) for y in range(0, H, 9)]:
        if isaret.getpixel((x, y)) == 255: ImageDraw.floodfill(isaret, (x, y), 128)
    alfa = isaret.point(lambda v: 0 if v == 128 else 255)
    out = rgb.convert('RGBA'); out.putalpha(alfa); return out

def kes(dosya, adlar, hedef):
    im = Image.open(dosya).convert('RGB'); gri = im.convert('L'); W, H = im.size
    cx, cy = cizgiler(gri, 'x'), cizgiler(gri, 'y')
    # 4×2 beklenir: fazla/eksik çizgi bulunursa eşit bölmeye düş (ör. kürek sapı sütun çizgisi sanılmasın)
    if len(cx) != 3: cx = [round(W * k / 4) for k in (1, 2, 3)]
    if len(cy) != 1: cy = [round(H / 2)]
    xs = [0] + cx + [W]; ys = [0] + cy + [H]
    for k, ad in enumerate(adlar):
        c, r = k % 4, k // 4
        h = im.crop((xs[c] + 6, ys[r] + 6, xs[c + 1] - 6, ys[r + 1] - 6))
        s = seffaf(h); bb = s.getbbox(); s = s.crop(bb)
        w, hh = s.size; kenar = max(w, hh) + 16
        kare = Image.new('RGBA', (kenar, kenar), (255, 255, 255, 0)); kare.paste(s, ((kenar - w) // 2, (kenar - hh) // 2), s)
        kare.resize((600, 600), Image.LANCZOS).save(os.path.join(hedef, ad + '.png'), optimize=True)
    return xs, ys

if __name__ == '__main__':
    tur, args = sys.argv[1], sys.argv[2:]
    sira = json.load(open(os.path.join(KOK, 'kaynak/resim-promptlari', tur + '-sira.json')))
    hedef = os.path.join(KOK, 'deneme/materyaller/resimler-' + tur); os.makedirs(hedef, exist_ok=True)
    for no, dosya in zip(args[::2], args[1::2]):
        print(no, kes(dosya, sira[int(no) - 1], hedef), sira[int(no) - 1])
