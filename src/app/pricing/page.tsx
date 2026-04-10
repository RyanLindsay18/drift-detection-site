import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "Pricing — Driftpulse",
  description: "Simple pricing for solo devs and small teams.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For solo devs getting started.",
    features: [
      "10 analyses/month",
      "BYO OpenAI API key",
      "Code, config & docs drift detection",
      "VS Code extension",
    ],
    coming: [],
    cta: "Install Extension",
    ctaHref: "https://marketplace.visualstudio.com/items?itemName=driftpulse.driftpulse",
    plan: null,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For indie hackers shipping fast.",
    features: [
      "100 analyses/month",
      "Hosted API — no OpenAI key needed",
      "Full analysis history",
      "Priority support",
    ],
    coming: ["Email drift alerts"],
    cta: "Upgrade to Pro",
    ctaHref: null,
    plan: "pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    description: "For small teams moving fast.",
    features: [
      "500 analyses/month",
      "Hosted API — no OpenAI key needed",
      "Full analysis history",
      "Priority support",
    ],
    coming: ["Slack drift alerts", "Team dashboard", "Multi-repo tracking"],
    cta: "Upgrade to Team",
    ctaHref: null,
    plan: "team",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Simple, honest pricing</h1>
            <p className="text-lg text-muted-foreground">
              No seats. No surprises. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-8 flex flex-col gap-6 ${
                  plan.highlight
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Most Popular
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground mb-1">/{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                  {plan.coming.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5">○</span>
                      <span>
                        {feature}{" "}
                        <span className="text-xs border border-border rounded px-1 py-0.5 ml-1">
                          coming soon
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.plan ? (
                  <CheckoutButton
                    plan={plan.plan}
                    label={plan.cta}
                    highlight={plan.highlight}
                  />
                ) : (
                  <Link
                    href={plan.ctaHref!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center py-2.5 px-4 rounded-lg font-medium text-sm transition-colors border border-border hover:bg-accent"
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p>All plans include the VS Code extension. Payments secured by Stripe.</p>
            <p className="mt-2">
              Questions?{" "}
              <a href="mailto:ryan@driftpulse.dev" className="underline hover:text-foreground">
                ryan@driftpulse.dev
              </a>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function CheckoutButton({
  plan,
  label,
  highlight,
}: {
  plan: string;
  label: string;
  highlight: boolean;
}) {
  return (
    <form action="/api/stripe/checkout-redirect" method="GET">
      <input type="hidden" name="plan" value={plan} />
      <button
        type="submit"
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${
          highlight
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-border hover:bg-accent"
        }`}
      >
        {label}
      </button>
    </form>
  );
}