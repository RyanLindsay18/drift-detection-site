
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function BlogPost() {
  return (
    <>
      <SiteHeader />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px", color: "white" }}>
        <div style={{ marginBottom: "40px" }}>
          <a href="/blog" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← All posts</a>
        </div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>April 2026 · 6 min read</div>
        <h1 style={{ fontSize: "42px", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "24px" }}>Why vibe coding quietly breaks your repo</h1>
        <p style={{ fontSize: "20px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "48px" }}>The repo compiles. The tests pass. The product ships. And somewhere underneath, something is quietly becoming a different codebase than the one you intended to build.</p>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "48px", fontSize: "17px", lineHeight: 1.8, color: "rgba(255,255,255,0.75)" }}>
          <p>Vibe coding is genuinely useful. You describe what you want, an AI writes it, you ship it. Iteration speed goes up by an order of magnitude. Features that used to take days take hours.</p>
          <p style={{ marginTop: "24px" }}>But there is a side effect nobody talks about enough: AI-assisted development accelerates entropy just as much as it accelerates output.</p>
          <p style={{ marginTop: "24px" }}>Every session adds code. Not all of it fits cleanly. The AI does not know what decisions were made three weeks ago. It does not know why a particular file is structured the way it is. It does not know that the pattern it just introduced contradicts the pattern already established in four other files. It just generates what makes sense locally, in this context, right now.</p>
          <p style={{ marginTop: "24px" }}>Over time, this compounds.</p>

          <h2 style={{ fontSize: "26px", fontWeight: 600, color: "white", marginTop: "48px", marginBottom: "16px" }}>What actually breaks</h2>
          <p>The breaks are not dramatic. The repo does not suddenly stop working. What happens instead is quieter and harder to catch.</p>
          <p style={{ marginTop: "24px" }}><strong style={{ color: "white" }}>Security gaps appear.</strong> A new endpoint gets added. It works. But it does not have the auth check that every other endpoint has, because the AI generated it fresh without looking at the pattern elsewhere. Nobody notices because the feature works and the tests pass.</p>
          <p style={{ marginTop: "24px" }}><strong style={{ color: "white" }}>Structure drifts.</strong> The original architecture had a clear separation between data access and business logic. Over six weeks of vibe coding, that boundary blurs. API calls start appearing in components. Database queries move into places they were never supposed to be. The repo still runs. The structure is gone.</p>
          <p style={{ marginTop: "24px" }}><strong style={{ color: "white" }}>Docs stop matching code.</strong> The README describes the app as it was in week two. The actual app is in week eight. New flows exist that are not documented anywhere. Old flows are documented but no longer work the way they are described.</p>
          <p style={{ marginTop: "24px" }}><strong style={{ color: "white" }}>Config becomes inconsistent.</strong> Environment variables get added for new features and never make it into the example file. Different files reference the same config key with different expected formats. It works in development. It will fail in production in a way that takes hours to debug.</p>
          <p style={{ marginTop: "24px" }}><strong style={{ color: "white" }}>Duplicate logic appears.</strong> The AI regenerates similar implementations in different parts of the codebase. Two functions that do the same thing. Two validation patterns that almost match. When one gets fixed, the other does not.</p>

          <h2 style={{ fontSize: "26px", fontWeight: 600, color: "white", marginTop: "48px", marginBottom: "16px" }}>Why it is hard to catch</h2>
          <p>The reason this compounds is that none of these individual changes are obviously wrong. Each one looks fine in isolation. The auth gap is in a file that works correctly. The structure problem is in code that produces correct output. The doc mismatch is in a README that nobody reads during code review.</p>
          <p style={{ marginTop: "24px" }}>The problems only become visible when you zoom out and look at the whole repo — at the relationships between files, at the distance between what the code claims to be and what it actually does.</p>
          <p style={{ marginTop: "24px" }}>That kind of review takes time and attention that vibe coding workflows do not naturally create space for. You are in flow. Things are shipping. The next feature is already in the prompt window.</p>

          <h2 style={{ fontSize: "26px", fontWeight: 600, color: "white", marginTop: "48px", marginBottom: "16px" }}>What catching it early looks like</h2>
          <p>The fix is not to slow down. The fix is to have a signal that tells you when the repo is drifting — specific, evidence-backed, actionable — so you can correct course before the debt compounds.</p>
          <p style={{ marginTop: "24px" }}>That signal needs to look at the whole repo, not just the last file you touched. It needs to understand the relationship between what the repo claims to be and what it actually does. And it needs to give you output that you can act on immediately — something you can paste into Cursor or Claude and get a real fix.</p>
          <p style={{ marginTop: "24px" }}>That is what we built Driftpulse to do. It scans your entire repo, gives you a drift score, and surfaces specific issues with the file names, the evidence, and the exact fix — formatted so you can copy it straight into your AI assistant and ship the correction in the same session.</p>
          <p style={{ marginTop: "24px" }}>Free to install. Takes thirty seconds. Works inside VS Code.</p>

          <div style={{ marginTop: "48px", padding: "24px", borderRadius: "16px", border: "1px solid rgba(125,211,252,0.2)", background: "rgba(125,211,252,0.05)" }}>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "white", marginBottom: "8px" }}>Try Driftpulse free</div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: "0 0 16px 0" }}>Install the VS Code extension, run your first analysis in under two minutes, and see exactly where your repo is drifting.</p>
            <a href="https://marketplace.visualstudio.com/items?itemName=driftpulse.driftpulse" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "10px 20px", borderRadius: "10px", background: "white", color: "#02050a", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>Install free on VS Code</a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}