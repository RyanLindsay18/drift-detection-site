export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#02050a", color: "white", padding: "80px 24px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <a href="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Back to Driftpulse</a>
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginTop: "32px", marginBottom: "8px" }}>Terms of service</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "40px" }}>Last updated April 2026</p>
        <div style={{ lineHeight: "1.8", color: "rgba(255,255,255,0.7)", fontSize: "15px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p>By using Driftpulse you agree to these terms. Driftpulse is provided as-is without warranty of any kind.</p>
          <p><strong>Use:</strong> You may use Driftpulse for any lawful purpose. You may not abuse the service, attempt to circumvent usage limits, or reverse engineer the hosted API.</p>
          <p><strong>Payments:</strong> Subscriptions are billed monthly via Stripe. You may cancel at any time. No refunds for partial months.</p>
          <p><strong>Liability:</strong> Driftpulse is a developer tool. We are not liable for any decisions made based on analysis results.</p>
          <p><strong>Changes:</strong> We may update these terms at any time. Continued use constitutes acceptance.</p>
          <p><strong>Contact:</strong> ryan@driftpulse.dev</p>
        </div>
      </div>
    </main>
  );
}