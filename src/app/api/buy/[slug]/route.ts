import { NextResponse } from 'next/server';
import { POLAR_PROD_API_BASE, POLAR_SANDBOX_API_BASE } from '@/lib/sales/polarApi';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Slug =
  | 'ecommerce'
  | 'landing'
  | 'remove-attribution-ecommerce'
  | 'remove-attribution-landing';
type Env = 'prod' | 'sandbox';

const SLUGS: ReadonlySet<string> = new Set<Slug>([
  'ecommerce',
  'landing',
  'remove-attribution-ecommerce',
  'remove-attribution-landing',
]);

function pickEnv(req: Request): Env {
  const host = (req.headers.get('host') ?? '').toLowerCase();
  const isLocalhost =
    host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.endsWith('.local');
  const isPreview = host.endsWith('.vercel.app');
  return isLocalhost || isPreview ? 'sandbox' : 'prod';
}

function pickConfig(env: Env, slug: Slug): { token?: string; apiBase: string; productId?: string } {
  if (env === 'sandbox') {
    return {
      token: process.env.POLAR_ACCESS_TOKEN_SANDBOX,
      apiBase: POLAR_SANDBOX_API_BASE,
      productId:
        slug === 'ecommerce'
          ? process.env.POLAR_PRODUCT_ID_ECOMMERCE_SANDBOX
          : slug === 'landing'
            ? process.env.POLAR_PRODUCT_ID_LANDING_SANDBOX
            : undefined,
    };
  }
  return {
    token: process.env.POLAR_ACCESS_TOKEN,
    apiBase: POLAR_PROD_API_BASE,
    productId:
      slug === 'ecommerce'
        ? process.env.POLAR_PRODUCT_ID_ECOMMERCE
        : slug === 'landing'
          ? process.env.POLAR_PRODUCT_ID_LANDING
          : slug === 'remove-attribution-ecommerce'
            ? process.env.POLAR_PRODUCT_ID_REMOVE_ATTRIBUTION_ECOMMERCE
            : process.env.POLAR_PRODUCT_ID_REMOVE_ATTRIBUTION_LANDING,
  };
}

function originFrom(req: Request): string {
  const host = req.headers.get('host') ?? 'localhost:3000';
  const forwardedProto = req.headers.get('x-forwarded-proto');
  const proto =
    forwardedProto ??
    (host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');
  return `${proto}://${host}`;
}

function buildSuccessUrl(req: Request, env: Env, slug: Slug): string {
  const origin = originFrom(req);
  if (slug.startsWith('remove-attribution-')) {
    return `${origin}/?thanks=${slug}`;
  }
  const path = `/order/{CHECKOUT_ID}`;
  return env === 'sandbox' ? `${origin}${path}?env=sandbox` : `${origin}${path}`;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  if (!SLUGS.has(slug)) {
    return new Response('Not found', { status: 404 });
  }
  const typedSlug = slug as Slug;
  const env = pickEnv(req);
  if (env === 'sandbox' && typedSlug.startsWith('remove-attribution-')) {
    return new Response('Add-on not available in sandbox', { status: 404 });
  }
  const { token, apiBase, productId } = pickConfig(env, typedSlug);
  if (!token || !productId) {
    console.error('[buy] missing config', { env, slug, hasToken: !!token, hasProductId: !!productId });
    return new Response('Checkout not configured', { status: 500 });
  }

  const successUrl = buildSuccessUrl(req, env, typedSlug);

  let res: Response;
  try {
    res = await fetch(`${apiBase}/checkouts/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products: [productId], success_url: successUrl }),
    });
  } catch (err) {
    console.error('[buy] checkout fetch failed', err);
    return new Response('Checkout unavailable', { status: 502 });
  }

  if (!res.ok) {
    const body = await res.text();
    console.error('[buy] checkout create failed', res.status, body);
    return new Response('Checkout create failed', { status: 502 });
  }

  const checkout = (await res.json()) as { url?: string };
  if (!checkout.url) {
    console.error('[buy] checkout response missing url', checkout);
    return new Response('Checkout missing URL', { status: 502 });
  }

  return NextResponse.redirect(checkout.url, { status: 307 });
}
