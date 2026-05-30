import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Webhooks } from '@polar-sh/nextjs';
import { buildOrderPaidHandler, type ProductConfig } from '@/lib/sales/orderPaidHandler';
import { POLAR_SANDBOX_API_BASE } from '@/lib/sales/polarApi';

function missing(name: string): never {
  throw new Error(`${name} env var is required for /api/webhooks/polar/sandbox`);
}

function buildHandler() {
  const POLAR_WEBHOOK_SECRET_SANDBOX =
    process.env.POLAR_WEBHOOK_SECRET_SANDBOX ?? missing('POLAR_WEBHOOK_SECRET_SANDBOX');
  const POLAR_ACCESS_TOKEN_SANDBOX = process.env.POLAR_ACCESS_TOKEN_SANDBOX;
  const GITHUB_PAT = process.env.GITHUB_PAT ?? missing('GITHUB_PAT');
  const GITHUB_OWNER = process.env.GITHUB_OWNER ?? 'mzanan';
  const GITHUB_DEPLOYS_ORG = process.env.GITHUB_DEPLOYS_ORG ?? 'mzanan-deploys';
  const GITHUB_DEPLOYS_PAT = process.env.GITHUB_DEPLOYS_PAT ?? missing('GITHUB_DEPLOYS_PAT');
  const RESEND_API_KEY = process.env.RESEND_API_KEY ?? missing('RESEND_API_KEY');
  const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? missing('RESEND_FROM_EMAIL');
  const MAX_FORK_AGE_HOURS = Number(process.env.MAX_FORK_AGE_HOURS) || 72;
  const POLAR_PRODUCT_ID_ECOMMERCE_SANDBOX = process.env.POLAR_PRODUCT_ID_ECOMMERCE_SANDBOX;
  const POLAR_PRODUCT_ID_LANDING_SANDBOX = process.env.POLAR_PRODUCT_ID_LANDING_SANDBOX;

  const productMap: Record<string, ProductConfig> = {
    ...(POLAR_PRODUCT_ID_ECOMMERCE_SANDBOX
      ? {
          [POLAR_PRODUCT_ID_ECOMMERCE_SANDBOX]: {
            repo: 'full-ecommerce',
            displayName: 'Full Ecommerce (sandbox)',
          },
        }
      : {}),
    ...(POLAR_PRODUCT_ID_LANDING_SANDBOX
      ? {
          [POLAR_PRODUCT_ID_LANDING_SANDBOX]: {
            repo: 'full-landing',
            displayName: 'Full Landing (sandbox)',
          },
        }
      : {}),
  };

  return Webhooks({
    webhookSecret: POLAR_WEBHOOK_SECRET_SANDBOX,
    onOrderPaid: buildOrderPaidHandler({
      productMap,
      githubOwner: GITHUB_OWNER,
      githubPat: GITHUB_PAT,
      deploysOrg: GITHUB_DEPLOYS_ORG,
      deploysPat: GITHUB_DEPLOYS_PAT,
      resendApiKey: RESEND_API_KEY,
      resendFromEmail: RESEND_FROM_EMAIL,
      polarAccessToken: POLAR_ACCESS_TOKEN_SANDBOX,
      polarApiBase: POLAR_SANDBOX_API_BASE,
      maxForkAgeHours: MAX_FORK_AGE_HOURS,
    }),
  });
}

let cached: ReturnType<typeof buildHandler> | undefined;

export async function POST(req: NextRequest) {
  try {
    cached ??= buildHandler();
  } catch (err) {
    console.error('[polar sandbox webhook] config error', err);
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }
  return cached(req);
}
