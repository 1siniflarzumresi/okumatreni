"""oyunlar.html'i üretir: python3 kaynak/derle.py  (deponun kök klasöründen ya da kaynak/ içinden çalışır)"""
import json, pathlib
K = pathlib.Path(__file__).resolve().parent
s = (K / 'oyunlar-sablon.html').read_text(encoding='utf-8')
A = json.loads((K / 'veri' / 'gorseller.json').read_text(encoding='utf-8'))
W = json.loads((K / 'veri' / 'haftalar.json').read_text(encoding='utf-8'))
s = s.replace('__WEEKS__', json.dumps(W, ensure_ascii=False))
for k, v in [('FONT', 'font'), ('IB', 'ib'), ('SCHOOL', 'school'), ('PYP', 'pyp')]:
    s = s.replace('__%s__' % k, A[v])
head, body = s.split('</style>', 1)
out = ('<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n'
       '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
       '<style>body{margin:0}</style>\n' + head + '</style>\n</head>\n<body>\n' + body + '\n</body>\n</html>')
(K.parent / 'oyunlar.html').write_text(out, encoding='utf-8')
print('oyunlar.html yazıldı:', round(len(out) / 1024), 'KB')
