import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from '@react-email/components';
import { CONTACT_EMAIL } from '@/lib/urls';
import { body, container, h1, p, small, footer } from './emailStyles';

type Props = {
  productName: string;
};

export default function AttributionRemoved({ productName }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Attribution removed for your {productName}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>Thanks for buying attribution removal.</Heading>
          <Text style={p}>
            Set <code>NEXT_PUBLIC_HIDE_ATTRIBUTION=true</code> in your {productName} Vercel project&apos;s environment variables and redeploy. The footer credit disappears immediately.
          </Text>
          <Section style={{ marginTop: 24 }}>
            <Text style={small}>
              Vercel &gt; your project &gt; Settings &gt; Environment Variables, add the variable, then redeploy from the Deployments tab.
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
