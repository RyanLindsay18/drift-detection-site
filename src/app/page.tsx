import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AnimateIn from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Driftpulse — Catch Code Drift Before It Catches You",
  description:
    "Driftpulse detects architecture, config, and docs drift in your repo. Built for vibe coders and AI-heavy workflows. Free scan on install.",
};

const MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=driftpulse.driftpulse";

export default function Home() {
  return (
    <main>
      <div className="hero-bg" />
      <SiteHeader />

      {/* ── 1. HERO ── */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-wrap">
            <h1 className="hero-title">
              Your AI writes the code.{" "}
              Nobody&apos;s watching what it&apos;s doing to your architecture.
            </h1>

            <p className="hero-description">
              Driftpulse runs silently in VS Code and alerts you when your
              codebase starts contradicting itself — before it becomes a
              debugging nightmare.
            </p>

            <div className="hero-actions">
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                Install Free on VS Code
              </a>
              <a href="#sample-report" className="button-secondary">
                See a Sample Report
              </a>
            </div>

            <div className="hero-trust">
              Free scan on install.&nbsp;&nbsp;No API key needed.&nbsp;&nbsp;No
              credit card.
            </div>

            <div id="sample-report" className="hero-product-frame">
              <div className="hero-product-window">
                <div className="hero-window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hero-product-inner">
                  <div className="product-top">
                    <div>
                      <div className="product-kicker">Drift summary</div>
                      <div className="product-score-row">
                        <span className="product-label">Drift score</span>
                        <span className="product-score">4/10</span>
                      </div>
                    </div>
                    <div className="product-status">
                      <span className="status-dot" />
                      Analysis complete
                    </div>
                  </div>

                  <div className="product-grid">
                    <div className="product-main-card">
                      <div className="product-section-label">Summary</div>
                      <p className="product-summary">
                        Strong MVP foundation. Main drift risk sits in
                        background monitoring flow, duplicated contracts, and
                        documentation mismatches that can compound as features
                        grow.
                      </p>
                      <div className="product-section-label second">
                        Top issues
                      </div>
                      <div className="issue-list">
                        <div className="issue-card">
                          Background monitoring path needs stronger concurrency
                          protection
                        </div>
                        <div className="issue-card">
                          Prompt/schema contract duplicated across code and docs
                        </div>
                        <div className="issue-card">
                          Background monitoring flow needs deeper test coverage
                        </div>
                      </div>
                    </div>

                    <div className="product-side-card">
                      <div className="product-section-label">Next actions</div>
                      <div className="next-action">
                        Add tests for background monitoring debounce and ignore
                        rules
                      </div>
                      <div className="next-action">
                        Tighten background re-analysis behavior during active
                        runs
                      </div>
                      <div className="next-action">
                        Reduce duplicated contract definitions across repo docs
                        and code
                      </div>
                      <div className="product-mini-note">
                        Surface drift while you are still inside the repo, not
                        six weeks later when it is harder to unwind.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PAIN ── */}
      <AnimateIn id="pain" sectionClass="section section-border">
        <div className="container">
          <h2 className="section-headline">
            The bugs vibe coding doesn&apos;t warn you about
          </h2>
          <div className="three-col pain-grid">
            <div className="pain-card">
              <div className="pain-prefix">[WARN] auth_drift</div>
              <p>
                You added an API route last Tuesday. It quietly breaks the auth
                pattern you set up in month one. Neither you nor your AI
                noticed.
              </p>
            </div>
            <div className="pain-card">
              <div className="pain-prefix">[WARN] docs_mismatch</div>
              <p>
                Your README describes the architecture you planned. Your
                codebase is doing something different. Both are wrong in
                different ways.
              </p>
            </div>
            <div className="pain-card">
              <div className="pain-prefix">[WARN] config_conflict</div>
              <p>
                Two config files are contradicting each other. Everything works
                fine — until you deploy to prod.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* ── 3. OBJECTION ── */}
      <AnimateIn sectionClass="section section-border">
        <div className="container">
          <div className="objection-outer">
            <div className="objection-eyebrow">
              You&apos;re already using AI to write code. Why do you need this?
            </div>
            <div className="objection-block">
              <div className="objection-cursor">›</div>
              <p className="objection-text">
                Claude sees your code when you show it. Driftpulse watches your
                repo when you don&apos;t. It runs in the background, tracks
                every change, and surfaces the quiet inconsistencies that build
                up between sessions — the ones you never think to ask about.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* ── 4. HOW IT WORKS ── */}
      <AnimateIn id="how-it-works" sectionClass="section section-border">
        <div className="container">
          <h2 className="section-headline">
            Three steps. Runs itself after that.
          </h2>
          <div className="how-steps">
            <div className="how-step">
              <div className="how-step-number">01</div>
              <div className="how-step-content">
                <h3>Install the extension from the VS Code marketplace</h3>
                <p>
                  Takes 30 seconds. Search &ldquo;Driftpulse&rdquo; in
                  Extensions or click Install Free above.
                </p>
              </div>
            </div>
            <div className="how-step">
              <div className="how-step-number">02</div>
              <div className="how-step-content">
                <h3>Run your first free scan</h3>
                <p>
                  Get a drift score and your top issues immediately — no
                  account needed for your first analysis.
                </p>
              </div>
            </div>
            <div className="how-step">
              <div className="how-step-number">03</div>
              <div className="how-step-content">
                <h3>Upgrade to Pro and background monitoring takes over</h3>
                <p>You get alerted. You don&apos;t have to remember to check.</p>
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* ── 5. PRICING ── */}
      <AnimateIn id="pricing" sectionClass="section section-border">
        <div className="container">
          <h2 className="section-headline">
            Simple pricing. No analysis limits.
          </h2>
          <div className="pricing-cards">
            {/* Free */}
            <div className="pricing-card pricing-free">
              <div className="pricing-tier">Free</div>
              <div className="pricing-price">$0</div>
              <div className="pricing-tagline">
                One full scan free. No account needed.
              </div>
              <ul className="pricing-features">
                <li>Drift score for your full repo</li>
                <li>Top 3 issues with explanations</li>
                <li>Zero setup</li>
              </ul>
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-cta pricing-cta-free"
              >
                Install Extension
              </a>
            </div>

            {/* Pro */}
            <div className="pricing-card pricing-pro">
              <div className="pricing-badge-pill">Most Popular</div>
              <div className="pricing-tier pricing-tier-pro">Pro</div>
              <div className="pricing-price">
                $25<span className="pricing-period">/mo</span>
              </div>
              <div className="pricing-tagline">
                Everything you need to stay ahead of drift.
              </div>
              <ul className="pricing-features">
                <li>Unlimited scans</li>
                <li>Background monitoring</li>
                <li>Email alerts when drift spikes</li>
                <li>Full issue history</li>
                <li>One-click upgrade from VS Code</li>
              </ul>
              <a href="/pricing" className="pricing-cta pricing-cta-pro">
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* ── 6. SOCIAL PROOF ── */}
      <AnimateIn sectionClass="section section-border">
        <div className="container">
          <h2 className="section-headline">What developers say</h2>
          <div className="three-col testimonial-grid">
            <div className="testimonial-placeholder" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', fontFamily: 'inherit' }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', margin: '0 0 16px 0', fontStyle: 'italic' }}>&ldquo;This has found things I never would have thought of.&rdquo;</p>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>— Solo dev, vibe coding workflow</span>
            </div>
            <div className="testimonial-placeholder" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', fontFamily: 'inherit' }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', margin: '0 0 16px 0', fontStyle: 'italic' }}>&ldquo;I ran it on a side project I hadn&apos;t touched in months. Immediately flagged three things that would&apos;ve bit me when I came back to it.&rdquo;</p>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>— Indie dev, returning to a stale repo</span>
            </div>
            <div className="testimonial-placeholder" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', fontFamily: 'inherit' }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', margin: '0 0 16px 0', fontStyle: 'italic' }}>&ldquo;Caught a naming inconsistency between the API and the frontend that had been there for weeks. We just never noticed until it broke something.&rdquo;</p>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>— Full-stack dev, small team</span>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* ── 7. FINAL CTA ── */}
      <AnimateIn sectionClass="section section-border">
        <div className="container">
          <div className="final-cta-wrap">
            <h2 className="final-cta-headline">
              Your repo is drifting right now.{" "}
              <span className="final-cta-dim">
                You just can&apos;t see it yet.
              </span>
            </h2>
            <a
              href={MARKETPLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary final-cta-button"
            >
              Install Free on VS Code
            </a>
            <div className="final-cta-trust">
              Takes 30 seconds. Your first scan is free.
            </div>
          </div>
        </div>
      </AnimateIn>

      <SiteFooter />
    </main>
  );
}
