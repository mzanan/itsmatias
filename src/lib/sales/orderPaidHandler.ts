import type { Order } from '@polar-sh/sdk/models/components/order';
import {
  buildEphemeralRepoName,
  buildVercelDeployUrl,
  createEphemeralRepo,
  repoExists,
} from './ephemeralRepo';
import { sendDeployInstructions } from './deployEmail';
import type { ProductConfig } from './productMap';

export type { ProductConfig };

export type OrderPaidConfig = {
  productMap: Record<string, ProductConfig>;
  githubOwner: string;
  githubPat: string;
  deploysOrg: string;
  deploysPat: string;
  resendApiKey: string;
  resendFromEmail: string;
  maxForkAgeHours: number;
};

type RepoAccessState = 'invited' | 'already_collaborator';

const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

async function addCollaborator(
  owner: string,
  repo: string,
  username: string,
  pat: string,
): Promise<{ inviteUrl: string | null; alreadyCollaborator: boolean }> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${pat}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ permission: 'pull' }),
    },
  );
  if (res.status === 204) return { inviteUrl: null, alreadyCollaborator: true };
  if (!res.ok) {
    const errorBody = await res.text();
    if (res.status === 422 && errorBody.includes('Repository owner cannot be a collaborator')) {
      return { inviteUrl: null, alreadyCollaborator: true };
    }
    throw new Error(`Collaborator add failed (${res.status}): ${errorBody}`);
  }
  const body = (await res.json()) as { html_url?: string };
  return { inviteUrl: body.html_url ?? null, alreadyCollaborator: false };
}

function pickGithubUsername(order: Order): string | null {
  const value = order.customFieldData?.github_username;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!GITHUB_USERNAME_REGEX.test(trimmed)) return null;
  return trimmed;
}

export function buildOrderPaidHandler(config: OrderPaidConfig) {
  return async function handleOrderPaid(payload: { data: Order }): Promise<void> {
    const order = payload.data;
    const productId = order.product?.id ?? order.productId;
    const product = productId ? config.productMap[productId] : undefined;
    const username = pickGithubUsername(order);
    const email = order.customer?.email;

    if (!product) {
      console.error('[polar] no product mapped', productId);
      return;
    }
    if (!username) {
      console.error('[polar] order without valid github_username', order.id, email);
      return;
    }

    const { inviteUrl, alreadyCollaborator } = await addCollaborator(
      config.githubOwner,
      product.repo,
      username,
      config.githubPat,
    );

    if (!email) {
      console.error('[polar] order without email, skipping fork+email');
      return;
    }

    const targetName = buildEphemeralRepoName(order.id, product.repo);
    const targetFullName = `${config.deploysOrg}/${targetName}`;
    const alreadyProvisioned = await repoExists(targetFullName, config.deploysPat);
    if (!alreadyProvisioned) {
      await createEphemeralRepo(
        {
          templateOwner: config.githubOwner,
          templateRepo: product.repo,
          targetName,
        },
        { deploysOrg: config.deploysOrg, pat: config.deploysPat },
      );
    }

    const deployUrl = buildVercelDeployUrl(targetFullName, product.repo);
    const repoUrl = alreadyCollaborator
      ? `https://github.com/${config.githubOwner}/${product.repo}`
      : (inviteUrl ?? `https://github.com/${config.githubOwner}/${product.repo}/invitations`);
    const repoAccessState: RepoAccessState = alreadyCollaborator
      ? 'already_collaborator'
      : 'invited';

    await sendDeployInstructions(
      {
        to: email,
        productName: product.displayName,
        deployUrl,
        repoUrl,
        repoAccessState,
        expiresInHours: config.maxForkAgeHours,
      },
      { apiKey: config.resendApiKey, from: config.resendFromEmail },
    );

    console.log(
      `[polar] order ${order.id}: repo ${targetFullName}${alreadyProvisioned ? ' (existing)' : ''}, email to ${email}`,
    );
  };
}
