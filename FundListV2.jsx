// FundListV2.jsx — Alternative "Oferta" section.
// Beginner-friendly: rows grouped by category, each leading with a plain-Polish
// one-liner ("20 największych polskich spółek z GPW") instead of leading with
// the ticker. Technical data (ticker, TER) sits below as supporting metadata.

const { useState: useStateFLV2 } = React;

const FUNDS_V2 = [
// Polskie akcje
{ cat: "Akcje polskie", headline: "20 największych polskich spółek z GPW",
  name: "WIG20 Total Return", ticker: "ETFBW20TR", ter: "0,56%", ret: "+18,4%", positive: true },
{ cat: "Akcje polskie", headline: "40 średnich polskich spółek z GPW",
  name: "mWIG40 Total Return", ticker: "ETFBM40TR", ter: "0,92%", ret: "+24,1%", positive: true,
  href: "BETA ETF Fund Details.html" },
{ cat: "Akcje polskie", headline: "80 mniejszych polskich spółek z GPW",
  name: "sWIG80 Total Return", ticker: "ETFBS80TR", ter: "1,04%", ret: "+11,7%", positive: true },

// Akcje globalne
{ cat: "Akcje globalne", headline: "500 największych spółek z giełdy w USA, z hedgingiem do PLN",
  name: "S&P 500 PLN-Hedged", ticker: "ETFBSPXPL", ter: "0,75%", ret: "+14,2%", positive: true },
{ cat: "Akcje globalne", headline: "100 największych spółek technologicznych z Nasdaq, z hedgingiem do PLN",
  name: "Nasdaq-100 PLN-Hedged", ticker: "ETFBNDXPL", ter: "0,80%", ret: "−3,8%", positive: false },

// Dywidendowy
{ cat: "Dywidendowe", headline: "Polskie spółki, które regularnie wypłacają dywidendy",
  name: "Dywidenda Plus", ticker: "ETFBDIVPL", ter: "0,19%", ret: "+7,9%", positive: true }];


const TABS_V2 = ["Wszystkie", "Akcje polskie", "Akcje globalne", "Obligacje", "Dywidendowe", "Trading", "Krypto"];

function FundListV2() {
  const [active, setActive] = useStateFLV2("Wszystkie");

  const shown = FUNDS_V2.filter((f) => active === "Wszystkie" ? true : f.cat === active);

  // Group by category for display
  const grouped = shown.reduce((acc, f) => {
    (acc[f.cat] = acc[f.cat] || []).push(f);
    return acc;
  }, {});
  const categories = Object.keys(grouped);

  return (
    <section className="section section--white flv2" id="fundusze" data-screen-label="05 Fundusze (v2)">
      <div className="container">
        <div className="section-head flv2-head">
          <span className="eyebrow">OFERTA</span>
          <h2>15 funduszy ETF, jedna giełda.</h2>
          <p>Każdy fundusz BETA ETF odzwierciedla konkretny indeks giełdowy — kupujesz od razu cały koszyk spółek, a nie pojedyncze akcje. Wszystkie nasze fundusze są notowane na GPW i kupisz je tak samo jak akcje.</p>
        </div>

        {/* Beginner-friendly mini-explainer card */}
        <div className="flv2-explainer">
          <span className="flv2-explainer__lbl">Czym jest ETF?</span>
          <p>Fundusz ETF (Exchange-Traded Fund) to gotowy koszyk inwestycyjny notowany na giełdzie. Jednym zleceniem kupujesz udział we wszystkich spółkach z indeksu — np. w 20 największych firmach z GPW — zamiast kupować każdą akcję osobno.</p>
        </div>

        <div className="fund-tabs flv2-tabs">
          {TABS_V2.map((t) =>
          <button
            key={t}
            className={"tab " + (t === active ? "tab--active" : "")}
            onClick={() => setActive(t)}>
            {t}</button>
          )}
        </div>

        <div className="flv2-groups">
          {categories.length === 0 &&
          <div className="flv2-empty">Wkrótce w tej kategorii.</div>
          }
          {categories.map((cat) =>
          <div className="flv2-group" key={cat}>
              <div className="flv2-group__head">
                <span className="flv2-group__lbl">{cat}</span>
                <span className="flv2-group__count">{grouped[cat].length} {grouped[cat].length === 1 ? "fundusz" : "fundusze"}</span>
              </div>
              <ul className="flv2-list">
                {grouped[cat].map((f) =>
              <li className="flv2-row" key={f.ticker}>
                    <a className="flv2-row__link" href={f.href || "#" + f.ticker}>
                      <div className="flv2-row__main">
                        <div className="flv2-row__primary">
                          <span className="flv2-row__name">BETA ETF {f.name}</span>
                          <span className="flv2-row__dot" aria-hidden="true">·</span>
                          <span className="flv2-row__ticker">{f.ticker}</span>
                          <span className="flv2-row__dot" aria-hidden="true">·</span>
                          <span className="flv2-row__ter">TER {f.ter}</span>
                        </div>
                        <p className="flv2-row__headline">{f.headline}</p>
                      </div>
                      <div className="flv2-row__perf">
                        <span className={"flv2-row__ret " + (f.positive ? "positive" : "negative")}>{f.ret}</span>
                        <span className="flv2-row__cap">1Y stopa zwrotu</span>
                      </div>
                      <span className="flv2-row__arrow" aria-hidden="true">→</span>
                    </a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div className="fund-closing flv2-closing">
          <p className="fund-disclaimer">
            Historyczne wyniki nie stanowią gwarancji przyszłych zysków. Inwestowanie w fundusze wiąże się z ryzykiem utraty części lub całości zainwestowanego kapitału.
          </p>
          <a href="#wszystkie-fundusze" className="link-arrow">Zobacz pełną listę 15 funduszy <span className="arrow">→</span></a>
        </div>
      </div>
    </section>);

}
window.FundListV2 = FundListV2;