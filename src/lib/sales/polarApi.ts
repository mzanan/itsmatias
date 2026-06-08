const DEFAULT_API_BASE = 'https://api.polar.sh/v1';
const POLAR_API_BASE = process.env.POLAR_API_BASE ?? DEFAULT_API_BASE;

export const POLAR_SANDBOX_API_BASE = 'https://sandbox-api.polar.sh/v1';
export const POLAR_PROD_API_BASE = DEFAULT_API_BASE;

type CheckoutResponse = {
  id: string;
  status: 'open' | 'confirmed' | 'succeeded' | 'failed' | 'expired';
  customer_email?: string | null;
  product_id?: string | null;
  metadata?: Record<string, string | number | boolean> | null;
};

function authHeaders(token: string): HeadersInit {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function getCheckout(
  checkoutId: string,
  token: string,
  apiBase: string = POLAR_API_BASE,
): Promise<CheckoutResponse> {
  const res = await fetch(`${apiBase}/checkouts/${checkoutId}`, {
    headers: authHeaders(token),
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Polar getCheckout failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as CheckoutResponse;
}

export type OrderResponse = {
  id: string;
  product_id?: string | null;
  custom_field_data?: Record<string, string | number | boolean> | null;
};

type OrdersListResponse = {
  items: OrderResponse[];
};

export async function findOrderByCheckout(
  checkoutId: string,
  token: string,
  apiBase: string = POLAR_API_BASE,
): Promise<OrderResponse | null> {
  const res = await fetch(
    `${apiBase}/orders/?checkout_id=${encodeURIComponent(checkoutId)}&limit=1`,
    {
      headers: authHeaders(token),
      cache: 'no-store',
    },
  );
  if (!res.ok) {
    throw new Error(`Polar findOrderByCheckout failed (${res.status}): ${await res.text()}`);
  }
  const body = (await res.json()) as OrdersListResponse;
  return body.items?.[0] ?? null;
}
