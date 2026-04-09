export default function SiteFooter() {
  return (
    <footer className="section section-border">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold text-white">Driftpulse</div>
            <div className="mt-2 text-sm text-white/50">
              Catch repo drift before it compounds.
            </div>
          </div>
         <div className="flex flex-col gap-2 text-sm text-white/40 text-right">
  <div>Built for solo devs, indie hackers, and fast-moving teams.</div>
  <div>Your code never leaves your machine. We don't sell your data.</div>
</div>
        </div>
      </div>
    </footer>
  );
}