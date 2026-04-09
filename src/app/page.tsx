import SectionHeader from "@/components/section-header";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import WaitlistForm from "@/components/waitlist-form";

const driftSignals = [
  {
    title: "Architecture drift",
    description:
      "New flows get added, original boundaries get blurred, and the repo quietly stops matching the intended structure.",
  },
  {
    title: "Config drift",
    description:
      "Scripts, ignore rules, env setup, CI behavior, and repo conventions shift across files until reliability starts slipping.",
  },
  {
    title: "Docs drift",
    description:
      "README, prompts, setup notes, and actual code behavior stop matching — even though the repo still looks fine on the surface.",
  },
];

const audience = [
  "Solo developers shipping quickly",
  "Indie hackers building AI-heavy products",
  "Small teams moving faster than process can keep up",
  "Repos where AI accelerates entropy as much as output",
];

const steps = [
  {
    number: "01",
    title: "Install the extension",
    description:
      "Add Driftpulse to VS Code and set your API key once. No config files, no setup overhead.",
  },
  {
    number: "02",
    title: "Analyze the repo",
    description:
      "Driftpulse scans the codebase, prioritizes important files, and runs structured drift analysis.",
  },
  {
    number: "03",
    title: "Review useful issues",
    description:
      "See drift summaries, top issues, and next actions in a clean results panel inside the editor.",
  },
  {
    number: "04",
    title: "Keep it monitored",
    description:
      "Background monitoring re-runs analysis after meaningful file changes so drift surfaces early — not six weeks later.",
  },
];

const faqs = [
  {
    question: "Is this already a full SaaS product?",
    answer:
      "Not yet. The current MVP is extension-first inside VS Code. The longer-term direction includes history, team workflows, alerts, dashboards, and billing.",
  },
  {
    question: "Who is it for right now?",
    answer:
      "Solo devs, indie hackers, and small fast-moving teams using AI heavily and shipping quickly.",
  },
  {
    question: "What kind of drift does it detect?",
    answer:
      "Code drift, architecture drift, config drift, and docs drift — especially the quiet mismatches that compound over time.",
  },
  {
    question: "Why join early?",
    answer:
      "Early users will directly shape the workflows, reports, and future SaaS direction around this product.",
  },
];

export default function Home() {
  return (
    <main>
      <div className="hero-bg" />
      <SiteHeader />

      <section className="hero-section">
        <div className="container">
          <div className="hero-wrap">
            <div className="hero-badge">VS Code extension for repo drift</div>

            <h1 className="hero-title">
              Catch <span className="gradient-text">repo drift</span> before
              fast shipping turns into quiet chaos.
            </h1>

            <p className="hero-description">
              Driftpulse scans your repo for code drift, architecture drift,
              config drift, and docs drift — so AI-assisted shipping does not
              quietly break structure over time.
            </p>

            <div className="hero-actions">
  
<a    href="https://marketplace.visualstudio.com/items?itemName=driftpulse.driftpulse"
    target="_blank"
    rel="noopener noreferrer"
    className="button-primary"
  >
    Install free on VS Code
  </a>
  <a href="#beta" className="button-secondary">
    Join the waitlist
  </a>
</div>

            <div className="hero-tags">
              <span>VS Code</span>
              <span>Structured analysis</span>
              <span>Background monitoring</span>
              <span>Built for fast-moving repos</span>
            </div>

            <div id="product" className="hero-product-frame">
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
                        Strong MVP foundation. Main drift risk sits in background
                        monitoring flow, duplicated contracts, and documentation
                        mismatches that can compound as features grow.
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

      <section id="problem" className="section section-border">
        <div className="container">
          <SectionHeader
            eyebrow="The problem"
            title="Fast repos drift long before they visibly break."
            description="AI speeds up shipping. It also speeds up inconsistency. The repo can still compile while the structure, assumptions, config, and docs quietly stop matching each other."
          />

          <div className="three-col">
            {driftSignals.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <SectionHeader
            eyebrow="Who it is for"
            title="Built for people moving faster than process can keep up."
            description="This is for developers and small teams that need a practical signal when the repo starts slipping away from its intended shape."
          />

          <div className="two-col">
            {audience.map((item) => (
              <div key={item} className="audience-item">
                <div className="audience-dot" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section-border">
        <div className="container">
          <SectionHeader
            eyebrow="How it works"
            title="A simple workflow inside the editor."
            description="Install it, analyze the repo, review structured issues, and let background monitoring keep an eye on important changes."
          />

          <div className="four-col">
            {steps.map((step) => (
              <div key={step.number} className="card p-6">
                <div className="step-number">{step.number}</div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beta" className="section section-border">
        <div className="container">
          <div className="beta-layout">
            <div>
              <div className="eyebrow">Beta access</div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Get early access and help shape where this goes next.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/65 md:text-lg">
                The extension MVP is already working. The next step is getting
                it into real repos, learning where the signal is strongest, and
                then building the SaaS layer around history, workflows, and
                alerts.
              </p>

              <div className="beta-points">
                <div>• Extension-first MVP, works today</div>
                <div>• Background monitoring built in</div>
                <div>• Future SaaS layer: history, teams, alerts, billing</div>
              </div>
            </div>

            <WaitlistForm />
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <SectionHeader
            eyebrow="FAQ"
            title="A few quick answers."
            description="Clear enough to build trust now without overloading the page."
          />

          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.question} className="card p-6">
                <h3 className="text-lg font-semibold text-white">
                  {item.question}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}