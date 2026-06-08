export type ProductConfig = {
  repo: string;
  displayName: string;
};

export type SalesEnv = 'sandbox' | 'production';

const BASE_PRODUCTS = {
  ecommerce: { repo: 'full-ecommerce', baseDisplayName: 'Full Ecommerce' },
  landing: { repo: 'full-landing', baseDisplayName: 'Full Landing' },
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
    };
  }
  if (landingId) {
    map[landingId] = {
      repo: BASE_PRODUCTS.landing.repo,
      displayName: `${BASE_PRODUCTS.landing.baseDisplayName}${suffix}`,
    };
  }
  return map;
}
