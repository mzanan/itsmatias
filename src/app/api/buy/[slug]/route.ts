import { NextResponse } from 'next/server';
import { POLAR_PROD_API_BASE, POLAR_SANDBOX_API_BASE } from '@/lib/sales/polarApi';

type Slug = 'ecommerce' | 'landing';
type Env = 'prod' | 'sandbox';

function pickEnv(req: Request): Env {
  const url = new URL(req.url);
  if (url.searchParams.get('env') === 'sandbox') return 'sandbox';
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
          : process.env.POLAR_PRODUCT_ID_LANDING_SANDBOX,
    };
  }
  return {
    token: process.env.POLAR_ACCESS_TOKEN,
    apiBase: POLAR_PROD_API_BASE,
    productId:
      slug === 'ecommerce'
        ? process.env.POLAR_PRODUCT_ID_ECOMMERCE
        : process.env.POLAR_PRODUCT_ID_LANDING,
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

function buildSuccessUrl(req: Request, env: Env): string {
  const origin = originFrom(req);
  const path = `/order/{CHECKOUT_ID}`;
  return env === 'sandbox' ? `${origin}${path}?env=sandbox` : `${origin}${path}`;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  if (slug !== 'ecommerce' && slug !== 'landing') {
    return new Response('Not found', { status: 404 });
  }
  const env = pickEnv(req);
  const { token, apiBase, productId } = pickConfig(env, slug);
  if (!token || !productId) {
    console.error('[buy] missing config', { env, slug, hasToken: !!token, hasProductId: !!productId });
    return new Response('Checkout not configured', { status: 500 });
  }

  const successUrl = buildSuccessUrl(req, env);
  const embedOrigin = originFrom(req);

  let res: Response;
  try {
    res = await fetch(`${apiBase}/checkouts/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: [productId],
        success_url: successUrl,
        embed_origin: embedOrigin,
      }),
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

  const checkout = (await res.json()) as { id?: string; url?: string };
  if (!checkout.url || !checkout.id) {
    console.error('[buy] checkout response missing fields', checkout);
    return new Response('Checkout missing fields', { status: 502 });
  }

  return NextResponse.json({
    checkoutUrl: checkout.url,
    checkoutId: checkout.id,
    env,
  });
}
