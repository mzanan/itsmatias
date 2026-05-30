import { Resend } from 'resend';
import DeployInstructions from '@/emails/DeployInstructions';

type SendOptions = {
  to: string;
  productName: string;
  deployUrl: string;
  repoUrl: string;
  repoAccessState: 'invited' | 'already_collaborator';
  expiresInHours: number;
};

export async function sendDeployInstructions(
  options: SendOptions,
  { apiKey, from }: { apiKey: string; from: string },
): Promise<void> {
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: options.to,
    subject: `Your ${options.productName} is ready to deploy`,
    react: DeployInstructions({
      productName: options.productName,
      deployUrl: options.deployUrl,
      repoUrl: options.repoUrl,
      repoAccessState: options.repoAccessState,
      expiresInHours: options.expiresInHours,
    }),
  });
}
