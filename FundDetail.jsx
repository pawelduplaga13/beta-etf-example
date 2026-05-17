// FundDetailHero.jsx — page hero for ETF details: breadcrumb + name + ticker + headline return
function FundDetailHero({ fund }) {
  return (
    <section className="fd-hero" data-screen-label="01 Fund detail hero">
      <BackgroundWebGLDetail />
      <div className="container">
        <nav className="fd-breadcrumb" aria-label="Ścieżka nawigacji">
          <a href="BETA ETF Homepage.html">Strona główna</a>
          <span className="fd-breadcrumb__sep" aria-hidden="true">/</span>
          <a href="BETA ETF Homepage.html#fundusze">Fundusze</a>
          <span className="fd-breadcrumb__sep" aria-hidden="true">/</span>
          <span className="fd-breadcrumb__current">{fund.name}</span>
        </nav>

        <div className="fd-hero-grid">
          <div className="fd-hero-text">
            <span className="eyebrow">{fund.category.toUpperCase()}</span>
            <h1 className="fd-hero-title">
              <span className="fd-hero-prefix">BETA ETF</span>
              <span className="fd-hero-name">{fund.shortName}</span>
            </h1>
            <div className="fd-hero-meta">
              <span className="fd-hero-ticker">{fund.ticker}</span>
              <span className="fd-hero-dot" aria-hidden="true">·</span>
              <span className="fd-hero-isin">ISIN {fund.isin}</span>
              <span className="fd-hero-dot" aria-hidden="true">·</span>
              <span className="fd-hero-benchmark">Benchmark: {fund.benchmark}</span>
            </div>
            <p className="fd-hero-sub">
              Fundusz indeksowy odzwierciedlający stopy zwrotu indeksu {fund.benchmark}. Notowany na GPW. Kupisz go na zwykłym rachunku maklerskim.
            </p>
            <div className="fd-hero-cta">
              <a className="btn btn--primary" href="#dokumenty">
                Pobierz folder inwestycyjny <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="btn btn--secondary" href="#charakterystyka">
                Charakterystyka funduszu
              </a>
            </div>
          </div>

          <aside className="fd-hero-card" aria-label="Aktualna wycena">
            <div className="fd-hero-card__row">
              <span className="fd-hero-card__lbl">Bieżąca wartość</span>
              <span className="fd-hero-card__date">14.05.2026</span>
            </div>
            <div className="fd-hero-card__value">
              {fund.nav}<span className="unit"> PLN</span>
            </div>
            <div className="fd-hero-card__delta">
              <span className="positive">+{fund.daily}</span>
              <span className="fd-hero-card__delta-lbl">dziś</span>
            </div>
            <div className="fd-hero-card__rule" />
            <div className="fd-hero-card__row fd-hero-card__row--mini">
              <span className="fd-hero-card__lbl-sm">Stopa zwrotu 1Y</span>
              <span className={"fd-hero-card__val-sm " + (fund.return1Y.startsWith("−") ? "negative" : "positive")}>{fund.return1Y}</span>
            </div>
            <div className="fd-hero-card__row fd-hero-card__row--mini">
              <span className="fd-hero-card__lbl-sm">TER</span>
              <span className="fd-hero-card__val-sm">{fund.ter}</span>
            </div>
            <div className="fd-hero-card__row fd-hero-card__row--mini">
              <span className="fd-hero-card__lbl-sm">Liczba certyfikatów</span>
              <span className="fd-hero-card__val-sm">{fund.certificates}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// QuickStats — 4 icon stats (Poziom ryzyka, Okres inwestycji, Min. wpłata, Typ funduszu)
function QuickStats({ fund }) {
  const items = [
    { icon: <Ic.Shield />,  lbl: "Poziom ryzyka",                  val: fund.risk, sub: "skala SRI" },
    { icon: <Ic.Clock />,   lbl: "Rekomendowany okres inwestycji", val: fund.horizon, sub: "minimum" },
    { icon: <Ic.Coin />,    lbl: "Min. pierwsza wpłata",           val: fund.minInvest, sub: "na rynku wtórnym" },
    { icon: <Ic.PieSeg />,  lbl: "Typ funduszu",                   val: fund.fundType, sub: "indeksowy" },
  ];
  return (
    <section className="fd-quick" data-screen-label="02 Quick stats">
      <div className="container">
        <div className="fd-quick-grid">
          {items.map((it) => (
            <div className="fd-quick__item" key={it.lbl}>
              <span className="fd-quick__icon">{it.icon}</span>
              <span className="fd-quick__lbl">{it.lbl}</span>
              <span className="fd-quick__val">{it.val}</span>
              <span className="fd-quick__sub">{it.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// KeyMetrics — 3x2 grid (Wynik inwestycyjny, AUM, Polityka dywidendowa, Ekspozycja, Replikacja, Wycena)
function KeyMetrics({ fund }) {
  const cells = [
    { lbl: "Wynik inwestycyjny",    val: fund.return1Y, sub: "1Y stopa zwrotu", positive: !fund.return1Y.startsWith("−") },
    { lbl: "Aktywa pod zarządzaniem", val: fund.aum,    sub: "30.04.2026" },
    { lbl: "Polityka dywidendowa",  val: "Akumulacja", sub: "dywidendy reinwestowane" },
    { lbl: "Łączna ekspozycja",     val: "100%",       sub: "% SWAN" },
    { lbl: "Metoda replikacji",     val: "Fizyczna",   sub: "zasadniczo pełna" },
    { lbl: "Wycena",                val: "Codzienna",  sub: "każdy dzień sesyjny" },
  ];
  return (
    <section className="fd-metrics" id="charakterystyka" data-screen-label="03 Key metrics">
      <div className="container">
        <SectionHead eyebrow="DANE FUNDUSZU" h2="Najważniejsze parametry." />
        <div className="fd-metrics-grid">
          {cells.map((c) => (
            <div className="fd-metric" key={c.lbl}>
              <span className="fd-metric__lbl">{c.lbl}</span>
              <span className={"fd-metric__val " + (c.positive === true ? "positive" : c.positive === false ? "negative" : "")}>{c.val}</span>
              <span className="fd-metric__sub">{c.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, h2, p }) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{h2}</h2>
      {p && <p>{p}</p>}
    </div>
  );
}

// FundDescription — 2 paragraphs about the fund + index info
function FundDescription({ fund }) {
  return (
    <section className="section section--grid fd-desc" data-screen-label="04 Description">
      <div className="container">
        <div className="fd-desc-grid">
          <div className="fd-desc-text">
            <SectionHead eyebrow="O FUNDUSZU" h2={"Cel funduszu " + fund.shortName + "."} />
            <p>
              Celem inwestycyjnym Funduszu jest osiąganie stóp zwrotu odzwierciedlających procentowe zmiany wartości Indeksu Odniesienia — {fund.benchmark} — dla takich samych okresów, niezależnie od tego, czy w okresach tych Indeks Odniesienia znajduje się w trendzie wzrostowym, czy spadkowym.
            </p>
            <p>
              Cel inwestycyjny realizowany jest poprzez zastosowanie strategii polegającej na ciągłej, zasadniczo fizycznej replikacji aktualnej struktury Indeksu Bazowego. Fundusz nie gwarantuje osiągnięcia celu inwestycyjnego.
            </p>

            <h3 className="fd-desc-h3">Dlaczego warto rozważyć ten fundusz</h3>
            <p>
              Produkty ETF mogą zastąpić inwestycje w pojedyncze akcje, kontrakty terminowe oraz tradycyjne fundusze inwestycyjne. Rosnąca grupa inwestorów decyduje się na włączenie ETF do swojego portfela ze względu na ich niskie koszty, transparentność i płynność.
            </p>
            <a className="link-arrow" href="#dokumenty">Pobierz folder inwestycyjny <span className="arrow">↗</span></a>
          </div>

          <aside className="fd-index">
            <span className="eyebrow eyebrow--muted">INDEKS ODNIESIENIA</span>
            <div className="fd-index__name">{fund.benchmark}</div>
            <p className="fd-index__body">
              {fund.indexBody}
            </p>
            <div className="fd-index__rule" />
            <dl className="fd-index__meta">
              <div><dt>Data bazowa</dt><dd>2 stycznia 2019 r.</dd></div>
              <div><dt>Wartość bazowa</dt><dd>1 000,00 pkt</dd></div>
              <div><dt>Źródło</dt><dd>Giełda Papierów Wartościowych w Warszawie</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

window.FundDetailHero = FundDetailHero;
window.QuickStats = QuickStats;
window.KeyMetrics = KeyMetrics;
window.SectionHead = SectionHead;
window.FundDescription = FundDescription;
