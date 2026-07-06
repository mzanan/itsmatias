import type { Order } from '@polar-sh/sdk/models/components/order';
import {
  buildEphemeralRepoName,
  buildVercelDeployUrl,
  createEphemeralRepo,
  repoExists,
} from './ephemeralRepo';
import { sendDeployInstructions } from './deployEmail';
import { sendAttributionRemovedInstructions } from './attributionEmail';
import type { AttributionProduct, ProductConfig } from './productMap';

export type { ProductConfig };

export type OrderPaidConfig = {
  productMap: Record<string, ProductConfig>;
  attributionProductMap: Record<string, AttributionProduct>;
  githubOwner: string;
  deploysOrg: string;
  deploysPat: string;
  resendApiKey: string;
  resendFromEmail: string;
  maxForkAgeHours: number;
};

export function buildOrderPaidHandler(config: OrderPaidConfig) {
  return async function handleOrderPaid(payload: { data: Order }): Promise<void> {
    const order = payload.data;
    const productId = order.product?.id ?? order.productId;
    const email = order.customer?.email;

    if (!email) {
      console.error('[polar] order without email, skipping', order.id);
      return;
    }

    const attributionProduct = productId ? config.attributionProductMap[productId] : undefined;
    if (attributionProduct) {
      await sendAttributionRemovedInstructions(
        { to: email, productName: attributionProduct.displayName },
        { apiKey: config.resendApiKey, from: config.resendFromEmail },
      );
      return;
    }

    const product = productId ? config.productMap[productId] : undefined;
    if (!product) {
      console.error('[polar] no product mapped', productId);
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

    const deployUrl = buildVercelDeployUrl(targetFullName, product.repo, product.vercelDeploy);

    await sendDeployInstructions(
      {
        to: email,
        productName: product.displayName,
        deployUrl,
        expiresInHours: config.maxForkAgeHours,
      },
      { apiKey: config.resendApiKey, from: config.resendFromEmail },
    );

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `[polar] order ${order.id}: repo ${targetFullName}${alreadyProvisioned ? ' (existing)' : ''}, email to ${email}`,
      );
    }
  };
}
