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
import { body, container, h1, p, small, primaryBtn, footer } from './emailStyles';

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
