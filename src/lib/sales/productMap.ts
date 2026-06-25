export type VercelStore =
  | {
      type: 'integration';
      integrationSlug: string;
      productSlug: string;
      protocol: string;
    }
  | { type: 'blob'; access: 'public' | 'private' };

export type VercelDeployConfig = {
  stores?: VercelStore[];
  env?: string[];
  envDescription?: string;
  envLink?: string;
};

export type ProductConfig = {
  repo: string;
  displayName: string;
  vercelDeploy: VercelDeployConfig;
};

export type SalesEnv = 'sandbox' | 'production';

const GITHUB_OWNER = 'mzanan-deploys';

const ECOMMERCE_DEPLOY: VercelDeployConfig = {
  stores: [
    {
      type: 'integration',
      integrationSlug: 'neon',
      productSlug: 'neon',
      protocol: 'storage',
    },
    { type: 'blob', access: 'private' },
  ],
  env: ['BETTER_AUTH_SECRET'],
  envDescription:
    'Session secret for the self-hosted admin login: paste any long random string (e.g. run `openssl rand -base64 32`). Stripe, Resend and store branding are configured later from your Vercel project settings: see the repo README.',
  envLink: `https://github.com/${GITHUB_OWNER}/full-ecommerce#readme`,
};

const LANDING_DEPLOY: VercelDeployConfig = {};

const BASE_PRODUCTS = {
  ecommerce: {
    repo: 'full-ecommerce',
    baseDisplayName: 'Full Ecommerce',
    vercelDeploy: ECOMMERCE_DEPLOY,
  },
  landing: {
    repo: 'full-landing',
    baseDisplayName: 'Full Landing',
    vercelDeploy: LANDING_DEPLOY,
  },
} as const;

export function getProductMap(env: SalesEnv): Record<string, ProductConfig> {
  const suffix = env === 'sandbox' ? ' (sandbox)' : '';
  const ecommerceId =
    env === 'sandbox'
      ? process.env.POLAR_PRODUCT_ID_ECOMMERCE_SANDBOX
      : process.env.POLAR_PRODUCT_ID_ECOMMERCE;
  const landingId =
    env === 'sandbox'
      ? process.env.POLAR_PRODUCT_ID_LANDING_SANDBOX
      : process.env.POLAR_PRODUCT_ID_LANDING;

  const map: Record<string, ProductConfig> = {};
  if (ecommerceId) {
    map[ecommerceId] = {
      repo: BASE_PRODUCTS.ecommerce.repo,
      displayName: `${BASE_PRODUCTS.ecommerce.baseDisplayName}${suffix}`,
      vercelDeploy: BASE_PRODUCTS.ecommerce.vercelDeploy,
    };
  }
  if (landingId) {
    map[landingId] = {
      repo: BASE_PRODUCTS.landing.repo,
      displayName: `${BASE_PRODUCTS.landing.baseDisplayName}${suffix}`,
      vercelDeploy: BASE_PRODUCTS.landing.vercelDeploy,
    };
  }
  return map;
}
