// Header.jsx — sticky nav, 80px, transparent over hero
const { useState, useEffect } = React;

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Fundusze", "Jak działa ETF", "Jak kupić", "O nas", "Aktualności", "Szkolenia"];

  return (
    <header className={"hdr " + (scrolled ? "hdr--scrolled" : "")}>
      <div className="container hdr-inner">
        <a className="hdr-logo" href="#top" aria-label="BETA ETF — strona główna">
          <span>BETA ETF</span>
          <span className="dot" aria-hidden="true" />
        </a>
        <nav className="hdr-nav" aria-label="Główna nawigacja">
          {links.map((l) => <a key={l} href={"#" + l.replace(/\s/g, "-").toLowerCase()}>{l}</a>)}
        </nav>
        <div className="hdr-cta">
          <button className="btn btn--primary btn--sm">Kontakt</button>
        </div>
      </div>
    </header>
  );
}
window.Header = Header;
