import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { CONTACT_EMAIL } from '@/lib/urls';

type Props = {
  productName: string;
  deployUrl: string;
  repoUrl: string;
  repoAccessState: 'invited' | 'already_collaborator';
  expiresInHours: number;
};

export default function DeployInstructions({
  productName,
  deployUrl,
  repoUrl,
  repoAccessState,
  expiresInHours,
}: Props) {
  const alreadyCollab = repoAccessState === 'already_collaborator';
  const repoLabel = alreadyCollab ? 'Open repository' : 'Accept GitHub invite';
  const repoHelper = alreadyCollab
    ? 'You already have access to the private source repository. Open it to pull future updates.'
    : 'You get read access to the private source repository to pull future updates.';
  return (
    <Html>
      <Head />
      <Preview>Your {productName} is ready to deploy</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>Thanks for buying {productName}.</Heading>
          <Text style={p}>Two steps and you are live.</Text>

          <Section style={{ marginTop: 24 }}>
            <Text style={label}>1. Deploy to your Vercel (one click).</Text>
            <Button href={deployUrl} style={primaryBtn}>
              Deploy with Vercel
            </Button>
            <Text style={small}>
              This deploy link uses a temporary public fork that expires in {expiresInHours}h.
              Click it before then. After your deploy completes the site is fully yours.
            </Text>
          </Section>

          <Section style={{ marginTop: 32 }}>
            <Text style={label}>2. {alreadyCollab ? 'Access the source.' : 'Accept your permanent source access.'}</Text>
            <Button href={repoUrl} style={secondaryBtn}>
              {repoLabel}
            </Button>
            <Text style={small}>
              {repoHelper} Run <code>git remote add upstream</code> in your deployed repo to receive them.
            </Text>
          </Section>

          <Text style={footer}>
            Questions? Reply to this email or write to{' '}
            <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#0a0a0a', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' };
const container = { margin: '0 auto', padding: '40px 24px', maxWidth: 560 };
const h1 = { fontSize: 28, fontWeight: 400, color: '#ffffff', marginBottom: 8 };
const p = { fontSize: 16, color: '#cbd5e1' };
const label = { fontSize: 14, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: 1 };
const small = { fontSize: 13, color: '#94a3b8', marginTop: 12, lineHeight: 1.5 };
const primaryBtn = { backgroundColor: '#ffffff', color: '#0a0a0a', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 500 };
const secondaryBtn = { backgroundColor: 'transparent', color: '#ffffff', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 500, border: '1px solid #475569' };
const footer = { fontSize: 13, color: '#64748b', marginTop: 40 };
