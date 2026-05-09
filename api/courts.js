export default async function handler(req, res) {
  const qs = req.url.split('?')[1] || '';
  const upstream = `https://www.victoria.ca/perfectmind/api/courts?${qs}`;

  try {
    const r = await fetch(upstream, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
