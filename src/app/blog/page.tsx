
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const posts = [
  {
    slug: "why-vibe-coding-breaks-your-repo",
    title: "Why vibe coding quietly breaks your repo",
    date: "April 2026",
    readTime: "6 min read",
    description: "The repo compiles. The tests pass. The product ships. And somewhere underneath, something is quietly becoming a different codebase than the one you intended to build.",
  },
];

export default function BlogIndex() {
  return (
    <>
      <SiteHeader />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, color: "white", letterSpacing: "-0.03em", marginBottom: "8px" }}>Blog</h1>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", marginBottom: "48px" }}>Thoughts on vibe coding, repo drift, and shipping fast without breaking structure.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {posts.map((post) => (
            <a key={post.slug} href={"/blog/" + post.slug} style={{ display: "block", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", textDecoration: "none" }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>{post.date} · {post.readTime}</div>
              <div style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "8px" }}>{post.title}</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>{post.description}</div>
            </a>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}