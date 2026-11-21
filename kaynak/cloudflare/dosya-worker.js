// Ladin Ormanı dosya kapısı: R2 kovasındaki PDF ve önizlemeleri verir.
// Kova herkese kapalı; dosyalar yalnız bu Worker üzerinden çıkar. Ücretsiz Workers planı günde 100.000 istekte
// durur (fatura çıkmaz), bu da kötü niyetli toplu indirmeye karşı doğal tavandır.
// İleride: üyelik kontrolü (Firebase kimliği) ve haftalık açılım burada yapılacak.
export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET, HEAD' } });
    if (req.method !== 'GET' && req.method !== 'HEAD') return new Response('İzin verilmeyen istek', { status: 405 });
    const url = new URL(req.url);
    const key = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
    if (!key || key.includes('..') || !/^(materyaller)\//.test(key)) return new Response('Bulunamadı', { status: 404 });
    const obj = await env.KOVA.get(key, { onlyIf: req.headers });
    if (!obj) return new Response('Bulunamadı', { status: 404 });
    const h = new Headers();
    obj.writeHttpMetadata(h);
    h.set('etag', obj.httpEtag);
    h.set('cache-control', key.endsWith('.png') ? 'public, max-age=86400' : 'public, max-age=3600');
    h.set('access-control-allow-origin', '*');
    if (key.endsWith('.pdf')) h.set('content-disposition', `inline; filename="${key.split('/').pop()}"`);
    if (!('body' in obj) || !obj.body) return new Response(null, { status: 304, headers: h });
    return new Response(req.method === 'HEAD' ? null : obj.body, { headers: h });
  },
};
