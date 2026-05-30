import { NextResponse } from 'next/server';
import {
  findOrderByCheckout,
  getCheckout,
  POLAR_PROD_API_BASE,
  POLAR_SANDBOX_API_BASE,
} from '@/lib/sales/polarApi';

type RepoAccessState = 'invited' | 'already_collaborator';

type OrderStatus = {
  state: 'pending' | 'paid' | 'ready' | 'failed';
  deployUrl?: string;
  repoUrl?: string;
  repoAccessState?: RepoAccessState;
  productName?: string;
};

function pickEnv(req: Request): { token?: string; apiBase: string } {
  const url = new URL(req.url);
  const isSandbox = url.searchParams.get('env') === 'sandbox';
  return isSandbox
    ? { token: process.env.POLAR_ACCESS_TOKEN_SANDBOX, apiBase: POLAR_SANDBOX_API_BASE }
    : { token: process.env.POLAR_ACCESS_TOKEN, apiBase: POLAR_PROD_API_BASE };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ checkoutId: string }> },
): Promise<NextResponse> {
  const { token, apiBase } = pickEnv(req);
  if (!token) {
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

  const deployUrl = order.metadata?.deploy_url as string | undefined;
  const repoUrl = order.metadata?.repo_url as string | undefined;
  const repoAccessState = order.metadata?.repo_access_state as RepoAccessState | undefined;
  const productName = order.metadata?.product_name as string | undefined;

  if (deployUrl && repoUrl && repoAccessState) {
    return NextResponse.json({
      state: 'ready',
      deployUrl,
      repoUrl,
      repoAccessState,
      productName,
    } satisfies OrderStatus);
  }
  return NextResponse.json({ state: 'paid' } satisfies OrderStatus);
}
