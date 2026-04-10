import SectionHeader from "@/components/section-header";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

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
      "Search 'Driftpulse' in the VS Code Extensions marketplace and click Install. Or click the Install button above.",
  },
  {
    number: "02",
    title: "Set your OpenAI API key",
    description:
      "Press Cmd+Shift+P, type 'Driftpulse: Set OpenAI API Key', and paste your key. Get one free at platform.openai.com.",
  },
  {
    number: "03",
    title: "Analyze your repo",
    description:
      "Open any project folder, press Cmd+Shift+P, and run 'Driftpulse: Analyze Current Repo'. Results appear in 30-60 seconds.",
  },
  {
    number: "04",
    title: "Review and monitor",
    description:
      "See your drift score, top issues, and next actions. Background monitoring re-runs automatically when files change.",
  },
];

const faqs = [
  {
    question: "Do I need an account to use it?",
    answer: "No. Install the extension, add your OpenAI API key, and start analyzing immediately. Sign up only if you want hosted analyses, history, and Pro features.",
  },
  {
    question: "Who is it for?",
    answer: "Solo devs, indie hackers, and small fast-moving teams using AI heavily and shipping quickly.",
  },
  {
    question: "What kind of drift does it detect?",
    answer: "Code drift, architecture drift, config drift, and docs drift — especially the quiet mismatches that compound over time.",
  },
  {
    question: "What does Pro give me?",
    answer: "100 analyses/month using our hosted API (no OpenAI key needed), full analysis history, and priority support for $12/month.",
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
 <a href="/pricing" className="button-secondary">
    View pricing
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

      <section className="section section-border">
  <div className="container">
    <SectionHeader
      eyebrow="Setup"
      title="Running in under 2 minutes."
      description="No config files. No account required to start. Just install, add your API key, and run."
    />

    <div className="setup-steps">
      <div className="setup-step">
        <div className="setup-number">1</div>
        <div className="setup-content">
          <div className="setup-title">Install Driftpulse from the VS Code marketplace</div>
          <div className="setup-desc">Search "Driftpulse" in Extensions or click the install button at the top of this page.</div>
        </div>
      </div>
      <div className="setup-step">
        <div className="setup-number">2</div>
        <div className="setup-content">
          <div className="setup-title">Press Cmd+Shift+P and run "Driftpulse: Set OpenAI API Key"</div>
          <div className="setup-desc">Get a free API key at platform.openai.com. It's stored securely and never shared.</div>
        </div>
      </div>
      <div className="setup-step">
        <div className="setup-number">3</div>
        <div className="setup-content">
          <div className="setup-title">Open a project folder and run "Driftpulse: Analyze Current Repo"</div>
          <div className="setup-desc">Results appear in 30-60 seconds. Drift score, issues, and next actions.</div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="section section-border">
        <div className="container">
          <div className="beta-layout">
            <div>
              <div className="eyebrow">Pricing</div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Free to start. Upgrade when you need more.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/65 md:text-lg">
                Install the extension free and analyze with your own OpenAI key. Upgrade to Pro for hosted analyses, full history, and no key required.
              </p>
              <div className="beta-points">
                <div>• Free — 10 analyses/month, BYO API key</div>
                <div>• Pro — $12/month, 100 analyses, hosted API, full history</div>
                <div>• Team — $49/month, 500 analyses, priority support</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center" }}>
              <a href="https://marketplace.visualstudio.com/items?itemName=driftpulse.driftpulse" target="_blank" rel="noopener noreferrer" className="button-primary">
                Install free on VS Code
              </a>
              <a href="/pricing" className="button-secondary">
                View pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <SectionHeader
  eyebrow="FAQ"
  title="A few quick answers."
  description="Everything you need to know before installing."
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