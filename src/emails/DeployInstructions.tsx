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
  expiresInHours: number;
};

export default function DeployInstructions({
  productName,
  deployUrl,
  expiresInHours,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your {productName} is ready to deploy</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>Thanks for buying {productName}.</Heading>
          <Text style={p}>One click and you are live.</Text>

          <Section style={{ marginTop: 24 }}>
            <Button href={deployUrl} style={primaryBtn}>
              Deploy with Vercel
            </Button>
            <Text style={small}>
              This link clones a temporary public source into your own GitHub account and deploys it to your Vercel. The source link expires in {expiresInHours}h: click it before then. After the deploy completes the site is fully yours.
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
const small = { fontSize: 13, color: '#94a3b8', marginTop: 12, lineHeight: 1.5 };
const primaryBtn = { backgroundColor: '#ffffff', color: '#0a0a0a', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 500 };
const footer = { fontSize: 13, color: '#64748b', marginTop: 40 };
