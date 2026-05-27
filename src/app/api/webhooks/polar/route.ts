import { Webhooks } from '@polar-sh/nextjs';
import type { Order } from '@polar-sh/sdk/models/components/order';

const POLAR_WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET;
const GITHUB_PAT = process.env.GITHUB_PAT;
const GITHUB_OWNER = process.env.GITHUB_OWNER ?? 'mzanan';
const POLAR_PRODUCT_ID_ECOMMERCE = process.env.POLAR_PRODUCT_ID_ECOMMERCE;
const POLAR_PRODUCT_ID_LANDING = process.env.POLAR_PRODUCT_ID_LANDING;

if (!POLAR_WEBHOOK_SECRET) {
  throw new Error('POLAR_WEBHOOK_SECRET env var is required for /api/webhooks/polar');
}

const REPO_MAP: Record<string, string> = {
  ...(POLAR_PRODUCT_ID_ECOMMERCE ? { [POLAR_PRODUCT_ID_ECOMMERCE]: 'full-ecommerce' } : {}),
  ...(POLAR_PRODUCT_ID_LANDING ? { [POLAR_PRODUCT_ID_LANDING]: 'full-landing' } : {}),
};

function pickGithubUsername(order: Order): string | null {
  const fromCustom = order.customFieldData?.github_username;
  return typeof fromCustom === 'string' && fromCustom.length > 0 ? fromCustom : null;
}

function pickRepoFromProduct(order: Order): string | null {
  const productId = order.product?.id ?? order.productId;
  if (!productId) return null;
  return REPO_MAP[productId] ?? null;
}

async function addCollaborator(repo: string, username: string): Promise<void> {
  if (!GITHUB_PAT) {
    throw new Error('GITHUB_PAT env var missing');
  }
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repo}/collaborators/${username}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GITHUB_PAT}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ permission: 'pull' }),
  });
  if (!res.ok && res.status !== 204) {
    const body = await res.text();
    throw new Error(`GitHub collaborator add failed (${res.status}): ${body}`);
  }
}

export const POST = Webhooks({
  webhookSecret: POLAR_WEBHOOK_SECRET,
  onOrderPaid: async (payload) => {
    const order = payload.data;
    const repo = pickRepoFromProduct(order);
    const username = pickGithubUsername(order);
    if (!repo) {
      console.error('[polar webhook] no repo mapped for product', order.product?.id ?? order.productId);
      return;
    }
    if (!username) {
      console.error('[polar webhook] order paid without github_username custom field', order.customer?.email);
      return;
    }
    await addCollaborator(repo, username);
    console.log(`[polar webhook] added ${username} to ${GITHUB_OWNER}/${repo} (pull)`);
  },
});
