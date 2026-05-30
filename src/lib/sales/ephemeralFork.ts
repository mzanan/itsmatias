const GITHUB_API = 'https://api.github.com';

type ForkOptions = {
  sourceOwner: string;
  sourceRepo: string;
  targetName: string;
};

type ForkResult = {
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

async function waitForRepoReady(
  fullName: string,
  pat: string,
  { attempts = 20, intervalMs = 1500 }: { attempts?: number; intervalMs?: number } = {},
): Promise<void> {
  for (let i = 0; i < attempts; i += 1) {
    const res = await fetch(`${GITHUB_API}/repos/${fullName}`, { headers: authHeaders(pat) });
    if (res.status === 200) return;
    if (res.status !== 404) {
      throw new Error(`Fork polling failed (${res.status}): ${await res.text()}`);
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error(`Fork ${fullName} did not become available within ${attempts * intervalMs}ms`);
}

export async function createPublicFork(
  options: ForkOptions,
  { deploysOrg, pat }: { deploysOrg: string; pat: string },
): Promise<ForkResult> {
  const { sourceOwner, sourceRepo, targetName } = options;
  const res = await fetch(
    `${GITHUB_API}/repos/${sourceOwner}/${sourceRepo}/forks`,
    {
      method: 'POST',
      headers: { ...authHeaders(pat), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        organization: deploysOrg,
        name: targetName,
        default_branch_only: true,
      }),
    },
  );
  if (!res.ok && res.status !== 202) {
    throw new Error(`Fork failed (${res.status}): ${await res.text()}`);
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

type RepoListItem = { full_name: string; created_at: string };

export async function listExpiredForks(
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
      if (new Date(repo.created_at).getTime() < cutoff) {
        expired.push(repo.full_name);
      }
    }
    if (batch.length < 100) break;
    page += 1;
  }
  return expired;
}

export function buildVercelDeployUrl(
  forkFullName: string,
  productName: string,
): string {
  const params = new URLSearchParams({
    'repository-url': `https://github.com/${forkFullName}`,
    'project-name': productName,
    'repository-name': productName,
  });
  return `https://vercel.com/new/clone?${params.toString()}`;
}
