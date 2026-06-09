import { NextResponse } from 'next/server';
import {
  deleteRepo,
  listExpiredRepos,
} from '@/lib/sales/ephemeralRepo';

const DEFAULT_MAX_AGE_HOURS = 72;

export async function GET(req: Request): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const deploysOrg = process.env.GITHUB_DEPLOYS_ORG;
  const pat = process.env.GITHUB_DEPLOYS_PAT;
  if (!deploysOrg || !pat) {
    return NextResponse.json({ error: 'config missing' }, { status: 500 });
  }

  const maxAgeHours = Number(process.env.MAX_FORK_AGE_HOURS) || DEFAULT_MAX_AGE_HOURS;

  const expired = await listExpiredRepos(deploysOrg, maxAgeHours, pat);
  const deleted: string[] = [];
  const failed: { repo: string; error: string }[] = [];
  for (const repo of expired) {
    try {
      await deleteRepo(repo, pat);
      deleted.push(repo);
    } catch (err) {
      failed.push({ repo, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return NextResponse.json({ scanned: expired.length, deleted, failed });
}
