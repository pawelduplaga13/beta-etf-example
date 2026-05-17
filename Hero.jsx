// Hero.jsx — full-viewport hero with glass stripes + 3-column micro features
function GlassStripes() {
  return (
    <div className="glass" aria-hidden="true">
      <div className="glass-stripe s1" />
      <div className="glass-stripe s2" />
      <div className="glass-stripe s3" />
      <div className="glass-stripe s4" />
    </div>);

}

function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <BackgroundWebGL />
      <div className="container hero-main">
        <div className="hero-text">
          <span className="badge"><span className="dot" />BETA ETF · od 2019 r. na GPW</span>
          <h1>
            <span className="line">Pierwszy polski dostawca</span>
            <span className="line">funduszy ETF.</span>
            <span className="line gradient">Na warszawskiej giełdzie.</span>
          </h1>
          <p className="hero-sub">
            2,4 mld zł aktywów. 15 funduszy. Akcje, obligacje, indeksy globalne i krypto — wszystko notowane na GPW i kupowane na zwykłym rachunku maklerskim.
          </p>
          <div className="hero-cta">
            <button className="btn btn--primary">
              Zobacz nasze fundusze <span className="btn-arrow" aria-hidden="true">↗</span>
            </button>
            <button className="btn btn--secondary">
              Jak zacząć inwestować
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero-micro">
          <div className="hero-micro__item">
            <span className="hero-micro__icon"><Ic.Coin /></span>
            <span className="hero-micro__text">
              <span className="lbl">Niski koszt</span>
              <span className="sub">TER od 0,19%</span>
            </span>
          </div>
          <div className="hero-micro__item">
            <span className="hero-micro__icon"><Ic.Eye /></span>
            <span className="hero-micro__text">
              <span className="lbl">Pełna transparentność</span>
              <span className="sub">Wszystkie aktywa na GPW</span>
            </span>
          </div>
          <div className="hero-micro__item">
            <span className="hero-micro__icon"><Ic.Liquid /></span>
            <span className="hero-micro__text">
              <span className="lbl">Płynność</span>
              <span className="sub">Kupisz jak akcję</span>
            </span>
          </div>
        </div>
      </div>
    </section>);

}
window.Hero = Hero;
window.GlassStripes = GlassStripes;