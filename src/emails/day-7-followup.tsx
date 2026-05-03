import * as React from 'react'
import { Html, Head, Body, Container, Section, Text, Button, Hr, Preview } from '@react-email/components'

export interface Day7FollowupEmailProps {
  userEmail: string
  scanDate: string
}

export function Day7FollowupEmail({ scanDate }: Day7FollowupEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Last nudge (then I'll leave you alone)</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Brand */}
          <Text style={brand}>Driftpulse</Text>

          {/* Direct opener */}
          <Section style={terminalBlock}>
            <Text style={terminalLine}>
              <span style={dimLabel}>last_scan &nbsp;</span>
              <span style={valueText}>{scanDate}</span>
            </Text>
            <Text style={terminalLine}>
              <span style={dimLabel}>status &nbsp;&nbsp;&nbsp;</span>
              <span style={warnText}>unmonitored</span>
            </Text>
          </Section>

          {/* Body */}
          <Text style={bodyText}>
            You ran a free scan on {scanDate}. Your repo has been unmonitored since.
          </Text>
          <Text style={bodyText}>
            Pro is $25/month. If it catches one architectural inconsistency before it becomes a real problem, it&apos;s paid for itself.
          </Text>
          <Text style={bodyText}>
            If it&apos;s not right for you, no hard feelings — just reply and I&apos;ll note it down.
          </Text>

          {/* CTA */}
          <Section style={ctaWrap}>
            <Button href="https://driftpulse.dev/pricing#pro" style={ctaButton}>
              Start Free Trial
            </Button>
          </Section>

          <Hr style={divider} />

          <Text style={signoff}>— Ryan</Text>

          <Text style={footer}>
            This is the last email I&apos;ll send about this. Reply anytime — I read them.
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

const terminalBlock: React.CSSProperties = {
  backgroundColor: '#0f0f0f',
  border: '1px solid #1e1e1e',
  borderRadius: '10px',
  padding: '20px 24px',
  marginBottom: '28px',
}

const terminalLine: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '13px',
  margin: '0 0 8px 0',
  lineHeight: '1.4',
}

const dimLabel: React.CSSProperties = {
  color: '#444444',
}

const valueText: React.CSSProperties = {
  color: '#e5e5e5',
}

const warnText: React.CSSProperties = {
  color: '#f59e0b',
}

const bodyText: React.CSSProperties = {
  fontSize: '14px',
  color: '#888888',
  lineHeight: '1.8',
  marginBottom: '16px',
}

const ctaWrap: React.CSSProperties = {
  marginBottom: '32px',
  marginTop: '8px',
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
