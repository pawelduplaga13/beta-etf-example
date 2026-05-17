// FundGrid.jsx — 6 fund cards with tab filter
const { useState: useState_FG } = React;

const FUNDS = [
{ name: "BETA ETF WIG20TR", ticker: "ETFBW20TR", cat: "Akcje PL", ret: "+18,4%", positive: true, ter: "0,56%" },
{ name: "BETA ETF mWIG40TR", ticker: "ETFBM40TR", cat: "Akcje PL", ret: "+24,1%", positive: true, ter: "0,92%" },
{ name: "BETA ETF sWIG80TR", ticker: "ETFBS80TR", cat: "Akcje PL", ret: "+11,7%", positive: true, ter: "1,04%" },
{ name: "BETA ETF S&P 500 PLN-Hedged", ticker: "ETFBSPXPL", cat: "Akcje globalne", ret: "+14,2%", positive: true, ter: "0,75%" },
{ name: "BETA ETF Nasdaq‑100 PLN-Hedged", ticker: "ETFBNDXPL", cat: "Akcje globalne", ret: "−3,8%", positive: false, ter: "0,80%" },
{ name: "BETA ETF Dywidenda Plus", ticker: "ETFBDIVPL", cat: "Dywidendowy", ret: "+7,9%", positive: true, ter: "0,19%" }];


const TABS = ["Wszystkie", "Akcje PL", "Akcje globalne", "Obligacje", "Trading", "Krypto"];

function FundGrid() {
  const [active, setActive] = useState_FG("Wszystkie");

  const shown = FUNDS.filter((f) => {
    if (active === "Wszystkie") return true;
    return f.cat === active;
  });

  return (
    <section className="section" id="fundusze" data-screen-label="05 Fundusze">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">OFERTA</span>
          <h2>15 funduszy ETF, jedna giełda.</h2>
          <p>Zbuduj portfel z polskich i globalnych indeksów, obligacji skarbowych lub instrumentów tradingowych. Wszystkie nasze fundusze są notowane na GPW i kupisz je tak samo jak akcje.</p>
        </div>

        <div className="fund-tabs">
          {TABS.map((t) =>
          <button
            key={t}
            className={"tab " + (t === active ? "tab--active" : "")}
            onClick={() => setActive(t)}>
            {t}</button>
          )}
        </div>

        <div className="fund-grid">
          {shown.map((f) =>
          <div className="fund" key={f.ticker}>
              <span className="fund-arrow" aria-hidden="true">↗</span>
              <div className="fund-name">{f.name}</div>
              <div className="fund-ticker">{f.ticker}</div>
              <div className={"fund-return " + (f.positive ? "positive" : "negative")}>{f.ret}</div>
              <div className="fund-cap">1Y stopa zwrotu</div>
              <div className="fund-rule" />
              <div className="fund-meta">
                <div className="row">
                  <span className="k">Kategoria</span>
                  <span className="v">{f.cat}</span>
                </div>
                <div className="row" style={{ textAlign: "right" }}>
                  <span className="k">TER</span>
                  <span className="v">{f.ter}</span>
                </div>
              </div>
            </div>
          )}
          {shown.length === 0 &&
          <div style={{ padding: "40px", color: "var(--color-text-secondary)", gridColumn: "1 / -1", border: "1px solid var(--color-border-subtle)", background: "var(--color-neutral)" }}>
              Wkrótce w tej kategorii.
            </div>
          }
        </div>

        <div className="fund-closing">
          <p className="fund-disclaimer">
            Historyczne wyniki nie stanowią gwarancji przyszłych zysków. Inwestowanie w fundusze wiąże się z ryzykiem utraty części lub całości zainwestowanego kapitału.
          </p>
          <a href="#wszystkie-fundusze" className="link-arrow">Zobacz pełną listę 15 funduszy <span className="arrow">→</span></a>
        </div>
      </div>
    </section>);

}
window.FundGrid = FundGrid;