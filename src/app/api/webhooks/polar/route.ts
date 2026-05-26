import { Webhooks } from '@polar-sh/nextjs';

type PolarOrderCustomFieldData = Record<string, string | number | boolean | null>;

interface PolarOrderLike {
  product?: { id?: string };
  product_id?: string;
  customer?: { email?: string };
  custom_field_data?: PolarOrderCustomFieldData;
  customer_metadata?: PolarOrderCustomFieldData;
}

const REPO_MAP: Record<string, string> = {
  [process.env.POLAR_PRODUCT_ID_ECOMMERCE ?? '']: 'full-ecommerce',
  [process.env.POLAR_PRODUCT_ID_LANDING ?? '']: 'full-landing',
};

const GITHUB_OWNER = process.env.GITHUB_OWNER ?? 'mzanan';
const GITHUB_PAT = process.env.GITHUB_PAT;

function pickGithubUsername(payload: PolarOrderLike): string | null {
  const fromCustom = payload.custom_field_data?.github_username;
  if (typeof fromCustom === 'string' && fromCustom.length > 0) return fromCustom;
  const fromMetadata = payload.customer_metadata?.github_username;
  if (typeof fromMetadata === 'string' && fromMetadata.length > 0) return fromMetadata;
  return null;
}

function pickRepoFromProduct(payload: PolarOrderLike): string | null {
  const productId = payload.product?.id ?? payload.product_id;
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
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET ?? '',
  onOrderPaid: async (payload) => {
    const order = (payload.data ?? {}) as PolarOrderLike;
    const repo = pickRepoFromProduct(order);
    const username = pickGithubUsername(order);
    if (!repo) {
      console.error('[polar webhook] no repo mapped for product', order.product?.id ?? order.product_id);
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
