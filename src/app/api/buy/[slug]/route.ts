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

const PRODUCT_ID_ENV_KEY: Record<Slug, { prod: string; sandbox: string }> = {
  ecommerce: { prod: 'POLAR_PRODUCT_ID_ECOMMERCE', sandbox: 'POLAR_PRODUCT_ID_ECOMMERCE_SANDBOX' },
  landing: { prod: 'POLAR_PRODUCT_ID_LANDING', sandbox: 'POLAR_PRODUCT_ID_LANDING_SANDBOX' },
  'remove-attribution-ecommerce': {
    prod: 'POLAR_PRODUCT_ID_REMOVE_ATTRIBUTION_ECOMMERCE',
    sandbox: 'POLAR_PRODUCT_ID_REMOVE_ATTRIBUTION_ECOMMERCE_SANDBOX',
  },
  'remove-attribution-landing': {
    prod: 'POLAR_PRODUCT_ID_REMOVE_ATTRIBUTION_LANDING',
    sandbox: 'POLAR_PRODUCT_ID_REMOVE_ATTRIBUTION_LANDING_SANDBOX',
  },
};

function pickConfig(env: Env, slug: Slug): { token?: string; apiBase: string; productId?: string } {
  const envKey = env === 'sandbox' ? 'sandbox' : 'prod';
  const productId = process.env[PRODUCT_ID_ENV_KEY[slug][envKey]];
  return env === 'sandbox'
    ? { token: process.env.POLAR_ACCESS_TOKEN_SANDBOX, apiBase: POLAR_SANDBOX_API_BASE, productId }
    : { token: process.env.POLAR_ACCESS_TOKEN, apiBase: POLAR_PROD_API_BASE, productId };
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
    const product = slug.replace('remove-attribution-', '');
    return `${origin}/attribution-removed/${product}`;
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
    console.error('[buy] checkout create failed', res.status, body.slice(0, 200));
    return new Response('Checkout create failed', { status: 502 });
  }

  const checkout = (await res.json()) as { url?: string };
  if (!checkout.url) {
    console.error('[buy] checkout response missing url');
    return new Response('Checkout missing URL', { status: 502 });
  }

  return NextResponse.redirect(checkout.url, { status: 307 });
}
