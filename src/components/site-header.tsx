export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-container">
        <div className="nav-shell">
          <a href="#" className="brand">
            <div className="brand-mark">DD</div>

            <div className="brand-copy">
              <div className="brand-title">Drift Detection</div>
              <div className="brand-subtitle">VS Code extension</div>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#how-it-works">How it works</a>
            <a href="#beta">Beta</a>
          </nav>

          <a href="#beta" className="nav-cta">
            Get beta access
          </a>
        </div>
      </div>
    </header>
  );
}