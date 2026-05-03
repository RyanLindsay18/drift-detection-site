import * as React from 'react'
import { Html, Head, Body, Container, Section, Text, Button, Hr, Preview } from '@react-email/components'

export interface Day3FollowupEmailProps {
  userEmail: string
  issueCount: number
}

export function Day3FollowupEmail({ issueCount }: Day3FollowupEmailProps) {
  const issueText =
    issueCount === 1
      ? '1 issue'
      : issueCount > 0
      ? `${issueCount} issues`
      : 'issues'

  return (
    <Html lang="en">
      <Head />
      <Preview>The drift you can't see yet — it starts around week 3</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Brand */}
          <Text style={brand}>Driftpulse</Text>

          {/* Callout */}
          <Section style={callout}>
            <Text style={calloutText}>
              The quiet kind of drift doesn&apos;t show up in your linter. It builds up between sessions.
            </Text>
          </Section>

          {/* Story */}
          <Text style={bodyText}>
            Here&apos;s what happens in vibe-coded repos around week 3–4:
          </Text>
          <Text style={bodyText}>
            Individual files look fine. Tests pass. The app runs. But the <em>relationships</em> between files start to break down. An API route added last week assumes an auth pattern that&apos;s already been quietly superseded. A config from two sprints ago still shapes how the app boots, but nobody remembers why. A README written at the start describes an architecture that no longer exists.
          </Text>
          <Text style={bodyText}>
            No linter catches it. Claude only knows what you show it.
          </Text>

          {/* Issue reference */}
          {issueCount > 0 && (
            <Section style={issueCallout}>
              <Text style={issueCalloutText}>
                Your scan found <span style={amber}>{issueText}</span>. Background monitoring would have surfaced each of them as they were introduced — not after they had days to compound.
              </Text>
            </Section>
          )}

          {/* CTA */}
          <Section style={ctaWrap}>
            <Button href="https://driftpulse.dev/pricing#pro" style={ctaButton}>
              Start Free Trial — $25/month
            </Button>
          </Section>

          <Hr style={divider} />

          <Text style={signoff}>— Ryan</Text>

          <Text style={footer}>
            You&apos;re receiving this because you ran a scan with Driftpulse. Reply anytime — I read them.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

/* ── Styles ── */
const body: React.CSSProperties = {
  backgroundColor: '#0a0a0a',
  margin: '0',
  padding: '0',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 28px',
}

const brand: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '16px',
  fontWeight: '700',
  color: '#ffffff',
  marginBottom: '32px',
  letterSpacing: '-0.02em',
}

const callout: React.CSSProperties = {
  backgroundColor: '#111111',
  border: '1px solid #1e1e1e',
  borderRadius: '12px',
  padding: '20px 24px',
  marginBottom: '24px',
}

const calloutText: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '15px',
  color: '#e5e5e5',
  lineHeight: '1.7',
  margin: '0',
}

const bodyText: React.CSSProperties = {
  fontSize: '14px',
  color: '#888888',
  lineHeight: '1.8',
  marginBottom: '16px',
}

const issueCallout: React.CSSProperties = {
  backgroundColor: '#111111',
  border: '1px solid rgba(245,158,11,0.2)',
  borderRadius: '10px',
  padding: '18px 22px',
  marginBottom: '28px',
}

const issueCalloutText: React.CSSProperties = {
  fontSize: '14px',
  color: '#aaaaaa',
  lineHeight: '1.7',
  margin: '0',
}

const amber: React.CSSProperties = {
  color: '#f59e0b',
  fontWeight: '600',
}

const ctaWrap: React.CSSProperties = {
  marginBottom: '32px',
}

const ctaButton: React.CSSProperties = {
  backgroundColor: '#f59e0b',
  color: '#09090b',
  padding: '14px 28px',
  borderRadius: '10px',
  fontSize: '15px',
  fontWeight: '700',
  textDecoration: 'none',
  display: 'inline-block',
}

const divider: React.CSSProperties = {
  borderColor: '#1e1e1e',
  margin: '24px 0',
}

const signoff: React.CSSProperties = {
  fontSize: '14px',
  color: '#e5e5e5',
  margin: '0 0 24px 0',
}

const footer: React.CSSProperties = {
  fontSize: '12px',
  color: '#444444',
  lineHeight: '1.5',
}
