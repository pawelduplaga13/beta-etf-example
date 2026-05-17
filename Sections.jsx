// Sections.jsx — TrustStrip, About, WhyETF
function TrustStrip() {
  const stats = [
  { num: "2,4", unit: "mld zł", cap: "Aktywów pod zarządzaniem" },
  { num: "15", unit: "", cap: "Funduszy ETF na GPW" },
  { num: "7", unit: "lat", cap: "Doświadczenia na rynku" },
  { num: "2019", unit: "", cap: "Pierwszy polski ETF" }];

  return (
    <section className="trust" data-screen-label="03 Trust strip">
      <div className="container">
        <div className="trust-grid">
          {stats.map((s) =>
          <div className="trust-stat" key={s.cap}>
              <div className="trust-num">{s.num}{s.unit && <span className="unit">{s.unit}</span>}</div>
              <div className="trust-cap">{s.cap}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* Abstract index-chart composition: overlapping indigo/cyan rectangles */
function AboutArt() {
  return (
    <svg className="about-art-svg" viewBox="0 0 460 460" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="ag1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="ag2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="ag3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* index-bar composition, ascending */}
      <rect x="20" y="320" width="60" height="120" fill="url(#ag2)" />
      <rect x="90" y="260" width="60" height="180" fill="url(#ag1)" />
      <rect x="160" y="200" width="60" height="240" fill="url(#ag3)" />
      <rect x="230" y="140" width="60" height="300" fill="url(#ag2)" />
      <rect x="300" y="80" width="60" height="360" fill="url(#ag1)" />
      <rect x="370" y="40" width="60" height="400" fill="url(#ag3)" />
      {/* overlay translucent index line */}
      <polyline points="50,360 120,300 190,260 260,200 330,150 400,100" stroke="#111827" strokeWidth="1.5" fill="none" opacity="0.45" />
      {/* tick dots */}
      {[50, 120, 190, 260, 330, 400].map((x, i) =>
      <rect key={i} x={x - 2.5} y={[360, 300, 260, 200, 150, 100][i] - 2.5} width="5" height="5" fill="#111827" />
      )}
    </svg>);

}

function About() {
  return (
    <section className="section" id="o-nas" data-screen-label="04 O nas">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <span className="eyebrow">O BETA ETF</span>
            <h2>Inwestowanie indeksowe to nasza specjalność.</h2>
            <p>
              Od 2019 roku jako pierwsi w Polsce udostępniamy inwestorom fundusze ETF notowane na warszawskiej giełdzie. Dzisiaj zarządzamy aktywami o wartości 2,4 mld zł i prowadzimy największą polską ofertę funduszy indeksowych.
            </p>
            <p>
              Nasze fundusze pozwalają budować portfel oparty o WIG20, mWIG40, sWIG80, S&amp;P 500, Nasdaq‑100, obligacje skarbowe oraz Bitcoin — wszystko z jednego rachunku maklerskiego w Polsce.
            </p>
            <a href="#zespol" className="link-arrow">Poznaj historię i zespół <span className="arrow">→</span></a>
          </div>
          <div className="about-art"><AboutArt /></div>
        </div>
      </div>
    </section>);

}

function WhyETF() {
  const items = [
  {
    icon: <Ic.Coin />,
    title: "Niski koszt",
    body: "Wybierając ETF zostawiasz więcej w swoim portfelu. Nasze opłaty zarządzania (TER) zaczynają się od 0,19% rocznie — wielokrotnie mniej niż w klasycznych funduszach inwestycyjnych."
  },
  {
    icon: <Ic.Eye />,
    title: "Pełna transparentność",
    body: "Wiesz, co masz. ETF replikuje konkretny indeks giełdowy, a skład portfela widzisz w czasie rzeczywistym. Bez czarnej skrzynki, bez niespodzianek."
  },
  {
    icon: <Ic.Liquid />,
    title: "Płynność i prostota",
    body: "Kupujesz i sprzedajesz jak akcję — na rachunku maklerskim w Polsce. Bez dystrybutorów, bez pośredników. Animator funduszu pilnuje ciągłej dostępności kwotowań."
  }];

  return (
    <section className="section section--soft" id="dlaczego-etf" data-screen-label="06 Dlaczego ETF">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">DLACZEGO ETF</span>
          <h2>Najprostszy sposób, żeby mieć kawałek rynku.</h2>
        </div>
        <div className="why-grid">
          {items.map((it) =>
          <div className="why-item" key={it.title}>
              <div className="why-icon">{it.icon}</div>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </div>
          )}
        </div>
        <div className="why-closing">
          <a href="#jak-dziala" className="link-arrow">Dowiedz się więcej o ETF <span className="arrow">→</span></a>
        </div>
      </div>
    </section>);

}

window.TrustStrip = TrustStrip;
window.About = About;
window.WhyETF = WhyETF;