const GITHUB_API = 'https://api.github.com';

type EphemeralRepoOptions = {
  templateOwner: string;
  templateRepo: string;
  targetName: string;
};

type EphemeralRepoResult = {
  fullName: string;
  htmlUrl: string;
};

function authHeaders(token: string): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'itsmatias-deploys',
  };
}

export async function repoExists(fullName: string, pat: string): Promise<boolean> {
  const res = await fetch(`${GITHUB_API}/repos/${fullName}`, { headers: authHeaders(pat) });
  if (res.status === 200) return true;
  if (res.status === 404) return false;
  throw new Error(`Repo check failed (${res.status}): ${await res.text()}`);
}

async function waitForRepoReady(
  fullName: string,
  pat: string,
  { attempts = 20, intervalMs = 1500 }: { attempts?: number; intervalMs?: number } = {},
): Promise<void> {
  for (let i = 0; i < attempts; i += 1) {
    if (await repoExists(fullName, pat)) return;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error(`Repo ${fullName} did not become available within ${attempts * intervalMs}ms`);
}

export async function createEphemeralRepo(
  options: EphemeralRepoOptions,
  { deploysOrg, pat }: { deploysOrg: string; pat: string },
): Promise<EphemeralRepoResult> {
  const { templateOwner, templateRepo, targetName } = options;
  const res = await fetch(
    `${GITHUB_API}/repos/${templateOwner}/${templateRepo}/generate`,
    {
      method: 'POST',
      headers: { ...authHeaders(pat), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        owner: deploysOrg,
        name: targetName,
        private: false,
        include_all_branches: false,
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Repo generate failed (${res.status}): ${await res.text()}`);
  }
  const body = (await res.json()) as { full_name: string; html_url: string };
  await waitForRepoReady(body.full_name, pat);
  return { fullName: body.full_name, htmlUrl: body.html_url };
}

export async function deleteRepo(
  fullName: string,
  pat: string,
): Promise<void> {
  const res = await fetch(`${GITHUB_API}/repos/${fullName}`, {
    method: 'DELETE',
    headers: authHeaders(pat),
  });
  if (!res.ok && res.status !== 404) {
    throw new Error(`Delete repo failed (${res.status}): ${await res.text()}`);
  }
}

const EPHEMERAL_REPO_NAME = /^[0-9a-f]{8}-/;

type RepoListItem = {
  name: string;
  full_name: string;
  created_at: string;
  is_template: boolean;
};

export async function listExpiredRepos(
  deploysOrg: string,
  maxAgeHours: number,
  pat: string,
): Promise<string[]> {
  const expired: string[] = [];
  const cutoff = Date.now() - maxAgeHours * 60 * 60 * 1000;
  let page = 1;
  while (true) {
    const res = await fetch(
      `${GITHUB_API}/orgs/${deploysOrg}/repos?per_page=100&page=${page}&sort=created&direction=asc`,
      { headers: authHeaders(pat) },
    );
    if (!res.ok) {
      throw new Error(`List repos failed (${res.status}): ${await res.text()}`);
    }
    const batch = (await res.json()) as RepoListItem[];
    if (batch.length === 0) break;
    for (const repo of batch) {
      if (repo.is_template) continue;
      if (!EPHEMERAL_REPO_NAME.test(repo.name)) continue;
      if (new Date(repo.created_at).getTime() < cutoff) {
        expired.push(repo.full_name);
      }
    }
    if (batch.length < 100) break;
    page += 1;
  }
  return expired;
}

export function buildEphemeralRepoName(orderId: string, productRepo: string): string {
  return `${orderId.slice(0, 8)}-${productRepo}`;
}

import type { VercelDeployConfig } from './productMap';

export function buildVercelDeployUrl(
  repoFullName: string,
  productRepo: string,
  deploy: VercelDeployConfig = {},
): string {
  const uniqueName = repoFullName.split('/')[1] ?? productRepo;
  const params = new URLSearchParams({
    'repository-url': `https://github.com/${repoFullName}`,
    'project-name': uniqueName,
    'repository-name': uniqueName,
  });
  if (deploy.stores && deploy.stores.length > 0) {
    params.set('stores', JSON.stringify(deploy.stores));
  }
  if (deploy.env && deploy.env.length > 0) {
    params.set('env', deploy.env.join(','));
    if (deploy.envDescription) params.set('envDescription', deploy.envDescription);
    if (deploy.envLink) params.set('envLink', deploy.envLink);
  }
  return `https://vercel.com/new/clone?${params.toString()}`;
}
