import * as React from 'react'
import { Html, Head, Body, Container, Section, Text, Button, Hr, Preview } from '@react-email/components'

export interface ScanCompleteEmailProps {
  userEmail: string
  driftScore: number
  topIssues: string[]
}

export function ScanCompleteEmail({ driftScore, topIssues }: ScanCompleteEmailProps) {
  const scoreColor =
    driftScore >= 7 ? '#6ee7b7' : driftScore >= 5 ? '#fde68a' : '#fca5a5'

  const interpretation =
    driftScore >= 7
      ? 'A score above 7 is healthy — your patterns are consistent and your repo is holding together.'
      : driftScore >= 5
      ? 'A score above 7 is healthy. Yours is in the moderate range — some patterns are starting to diverge. Worth watching.'
      : 'A score below 5 means patterns are actively contradicting each other and will compound. The longer it sits, the harder it is to unwind.'

  return (
    <Html lang="en">
      <Head />
      <Preview>{`Your drift score: ${driftScore}/10 — scan complete`}</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Brand */}
          <Text style={brand}>Driftpulse</Text>

          {/* Score block */}
          <Section style={scoreBlock}>
            <Text style={scoreLabel}>DRIFT SCORE</Text>
            <Text style={{ ...scoreValue, color: scoreColor }}>{driftScore}/10</Text>
            <Text style={scoreNote}>{interpretation}</Text>
          </Section>

          {/* Issues */}
          {topIssues.length > 0 && (
            <Section style={{ marginBottom: '24px' }}>
              <Text style={sectionLabel}>TOP ISSUES</Text>
              {topIssues.map((issue, i) => (
                <Section key={i} style={issueBlock}>
                  <Text style={issueText}>
                    <span style={issueNum}>{String(i + 1).padStart(2, '0')}&nbsp;&nbsp;</span>
                    {issue}
                  </Text>
                </Section>
              ))}
            </Section>
          )}

          <Hr style={divider} />

          {/* Body copy */}
          <Text style={bodyText}>
            Background monitoring catches these issues as they're introduced — not after they've had three weeks to compound. That's what Pro does.
          </Text>

          {/* CTA */}
          <Section style={ctaWrap}>
            <Button href="https://driftpulse.dev/pricing#pro" style={ctaButton}>
              Start Free Trial — $25/month
            </Button>
          </Section>

          <Hr style={divider} />

          <Text style={signoff}>— Ryan, Driftpulse</Text>

          <Text style={footer}>
            You're receiving this because you ran a scan with Driftpulse. Questions? Reply to this email.
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

const scoreBlock: React.CSSProperties = {
  backgroundColor: '#111111',
  borderRadius: '12px',
  padding: '28px',
  marginBottom: '24px',
  border: '1px solid #1e1e1e',
}

const scoreLabel: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '11px',
  fontWeight: '600',
  color: '#666666',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  margin: '0 0 8px 0',
}

const scoreValue: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '56px',
  fontWeight: '800',
  margin: '0 0 10px 0',
  lineHeight: '1',
  letterSpacing: '-0.04em',
}

const scoreNote: React.CSSProperties = {
  fontSize: '14px',
  color: '#888888',
  margin: '0',
  lineHeight: '1.6',
}

const sectionLabel: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '11px',
  fontWeight: '600',
  color: '#666666',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  marginBottom: '10px',
}

const issueBlock: React.CSSProperties = {
  backgroundColor: '#111111',
  border: '1px solid #1e1e1e',
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '8px',
}

const issueText: React.CSSProperties = {
  margin: '0',
  fontSize: '13px',
  color: '#e5e5e5',
  lineHeight: '1.5',
}

const issueNum: React.CSSProperties = {
  fontFamily: 'monospace',
  color: '#f59e0b',
  fontWeight: '600',
}

const divider: React.CSSProperties = {
  borderColor: '#1e1e1e',
  margin: '24px 0',
}

const bodyText: React.CSSProperties = {
  fontSize: '14px',
  color: '#888888',
  lineHeight: '1.75',
  marginBottom: '24px',
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
