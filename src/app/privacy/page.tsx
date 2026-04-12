export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#02050a", color: "white", padding: "80px 24px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <a href="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Back to Driftpulse</a>
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginTop: "32px", marginBottom: "8px" }}>Privacy policy</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "40px" }}>Last updated April 2026</p>
        <div style={{ lineHeight: "1.8", color: "rgba(255,255,255,0.7)", fontSize: "15px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p>Driftpulse is a VS Code extension and web service that analyzes your code repository for drift. We take your privacy seriously.</p>
          <p><strong>Your code never leaves your machine</strong> unless you use hosted analysis (Pro/Team plans), in which case your code is sent to our servers solely to perform the analysis and is never stored or shared.</p>
          <p><strong>What we collect:</strong> Email address, analysis metadata (drift score, issue count, file count), and usage counts. We do not store your source code.</p>
          <p><strong>Third parties:</strong> We use Supabase for authentication and database, Stripe for payments, Resend for email, and OpenAI for analysis. Each has their own privacy policy.</p>
          <p><strong>Data deletion:</strong> Email us at ryan@driftpulse.dev to request deletion of your account and data.</p>
          <p><strong>Contact:</strong> ryan@driftpulse.dev</p>
        </div>
      </div>
    </main>
  );
}