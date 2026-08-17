const ALLOWED_HOSTS = new Set(['images.unsplash.com']);

export default async function handler(req, res) {
  try {
    const raw = req.query?.url;
    if (!raw) return res.status(400).json({ error: 'Missing image URL' });

    const target = new URL(raw);
    if (target.protocol !== 'https:' || !ALLOWED_HOSTS.has(target.hostname)) {
      return res.status(403).json({ error: 'Image host is not allowed' });
    }

    const upstream = await fetch(target, {
      headers: { Accept: 'image/avif,image/webp,image/jpeg,image/png,image/*;q=0.8' }
    });
    if (!upstream.ok) return res.status(upstream.status).json({ error: 'Image could not be loaded' });

    const type = upstream.headers.get('content-type') || '';
    if (!type.startsWith('image/')) return res.status(415).json({ error: 'Unsupported image type' });

    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', type.split(';')[0]);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(buffer);
  } catch {
    return res.status(400).json({ error: 'Invalid image request' });
  }
}
