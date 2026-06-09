import { NextResponse } from 'next/server';
import { buildEphemeralRepoName, buildVercelDeployUrl, repoExists } from '@/lib/sales/ephemeralRepo';
import {
  findOrderByCheckout,
  getCheckout,
  POLAR_PROD_API_BASE,
  POLAR_SANDBOX_API_BASE,
} from '@/lib/sales/polarApi';
import { getProductMap, type SalesEnv } from '@/lib/sales/productMap';

type RepoAccessState = 'invited' | 'already_collaborator';

type OrderStatus = {
  state: 'pending' | 'paid' | 'ready' | 'failed';
  deployUrl?: string;
  repoUrl?: string;
  repoAccessState?: RepoAccessState;
  productName?: string;
};

function pickEnv(req: Request): { env: SalesEnv; token?: string; apiBase: string } {
  const url = new URL(req.url);
  const isSandbox = url.searchParams.get('env') === 'sandbox';
  return isSandbox
    ? {
        env: 'sandbox',
        token: process.env.POLAR_ACCESS_TOKEN_SANDBOX,
        apiBase: POLAR_SANDBOX_API_BASE,
      }
    : {
        env: 'production',
        token: process.env.POLAR_ACCESS_TOKEN,
        apiBase: POLAR_PROD_API_BASE,
      };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ checkoutId: string }> },
): Promise<NextResponse> {
  const { env, token, apiBase } = pickEnv(req);
  const deploysOrg = process.env.GITHUB_DEPLOYS_ORG ?? 'mzanan-deploys';
  const githubOwner = process.env.GITHUB_OWNER ?? 'mzanan';
  const deploysPat = process.env.GITHUB_DEPLOYS_PAT;
  if (!token) {
    console.error('[order] missing polar token for env=', env);
    return NextResponse.json({ state: 'failed' } satisfies OrderStatus, { status: 500 });
  }
  if (!deploysPat) {
    console.error('[order] missing GITHUB_DEPLOYS_PAT');
    return NextResponse.json({ state: 'failed' } satisfies OrderStatus, { status: 500 });
  }
  const { checkoutId } = await params;

  let checkout;
  try {
    checkout = await getCheckout(checkoutId, token, apiBase);
  } catch {
    return NextResponse.json({ state: 'failed' } satisfies OrderStatus, { status: 404 });
  }

  if (checkout.status === 'failed' || checkout.status === 'expired') {
    return NextResponse.json({ state: 'failed' } satisfies OrderStatus);
  }
  if (checkout.status !== 'succeeded') {
    return NextResponse.json({ state: 'pending' } satisfies OrderStatus);
  }

  let order;
  try {
    order = await findOrderByCheckout(checkoutId, token, apiBase);
  } catch {
    return NextResponse.json({ state: 'paid' } satisfies OrderStatus);
  }
  if (!order) {
    return NextResponse.json({ state: 'paid' } satisfies OrderStatus);
  }

  const productMap = getProductMap(env);
  const product = order.product_id ? productMap[order.product_id] : undefined;
  const githubUsername = order.custom_field_data?.github_username;
  if (!product || typeof githubUsername !== 'string') {
    return NextResponse.json({ state: 'paid' } satisfies OrderStatus);
  }

  const repoFullName = `${deploysOrg}/${buildEphemeralRepoName(order.id, product.repo)}`;
  let repoReady = false;
  try {
    repoReady = await repoExists(repoFullName, deploysPat);
  } catch {
    return NextResponse.json({ state: 'paid' } satisfies OrderStatus);
  }
  if (!repoReady) {
    return NextResponse.json({ state: 'paid' } satisfies OrderStatus);
  }

  const isOwner = githubUsername.toLowerCase() === githubOwner.toLowerCase();
  const deployUrl = buildVercelDeployUrl(repoFullName, product.repo, product.vercelDeploy);
  const repoUrl = isOwner
    ? `https://github.com/${githubOwner}/${product.repo}`
    : `https://github.com/${githubOwner}/${product.repo}/invitations`;
  const repoAccessState: RepoAccessState = isOwner ? 'already_collaborator' : 'invited';

  return NextResponse.json({
    state: 'ready',
    deployUrl,
    repoUrl,
    repoAccessState,
    productName: product.displayName,
  } satisfies OrderStatus);
}
