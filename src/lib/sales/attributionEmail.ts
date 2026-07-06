import { Resend } from 'resend';
import AttributionRemoved from '@/emails/AttributionRemoved';

type SendOptions = {
  to: string;
  productName: string;
};

export async function sendAttributionRemovedInstructions(
  options: SendOptions,
  { apiKey, from }: { apiKey: string; from: string },
): Promise<void> {
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: options.to,
    subject: `Attribution removed for your ${options.productName}`,
    react: AttributionRemoved({ productName: options.productName }),
  });
}
