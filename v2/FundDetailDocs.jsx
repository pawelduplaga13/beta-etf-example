// FundDetailDocs.jsx — documents section with category sidebar + downloadable list
const { useState: useStateDocs } = React;

const DOC_CATEGORIES = [
  { id: "fund",     label: "Fundusze inwestycyjne BETA ETF" },
  { id: "reports",  label: "Raporty bieżące" },
  { id: "filings",  label: "Sprawozdania" },
];

const DOCS_BY_CATEGORY = {
  fund: [
    { name: "Karta Funduszu BETA ETF mWIG40TR",          date: "13.04.2026", type: "PDF · 220 KB" },
    { name: "KID Beta ETF mWIG40TR PFIZ",                date: "07.04.2026", type: "PDF · 320 KB" },
    { name: "Statut Beta ETF mWIG40TR PFIZ",             date: "13.03.2026", type: "PDF · 580 KB" },
    { name: "Beta ETF mWIG40TR PFIZ — Cena emisyjna serii A", date: "30.01.2026", type: "PDF · 180 KB" },
    { name: "Prospekt Informacyjny Beta ETF mWIG40TR PFIZ",   date: "05.01.2026", type: "PDF · 1,4 MB" },
  ],
  reports: [
    { name: "Raport zbiorczy EMT 2025",                  date: "12.02.2026", type: "PDF · 1,1 MB" },
    { name: "Raport bieżący 04/2026",                    date: "08.02.2026", type: "PDF · 140 KB" },
    { name: "Raport bieżący 03/2026",                    date: "21.01.2026", type: "PDF · 130 KB" },
  ],
  filings: [
    { name: "Sprawozdanie roczne 2025",                  date: "31.12.2025", type: "PDF · 2,8 MB" },
    { name: "Sprawozdanie półroczne H1 2025",            date: "30.06.2025", type: "PDF · 1,6 MB" },
  ],
};

function DokumentyList() {
  const [cat, setCat] = useStateDocs("fund");
  const docs = DOCS_BY_CATEGORY[cat];
  return (
    <section className="section section--grid fd-docs" id="dokumenty" data-screen-label="10 Dokumenty">
      <div className="container">
        <SectionHead eyebrow="DOKUMENTY" h2="Dokumenty funduszu i sprawozdania." />
        <div className="fd-docs-grid">
          <aside className="fd-docs-side">
            <span className="fd-docs-side__hd">Wybierz kategorię</span>
            <ul>
              {DOC_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    className={"fd-docs-cat " + (cat === c.id ? "is-active" : "")}
                    onClick={() => setCat(c.id)}
                  >{c.label}</button>
                </li>
              ))}
            </ul>
          </aside>
          <ul className="fd-docs-list">
            {docs.map((d, i) => (
              <li className="fd-doc" key={i}>
                <div className="fd-doc__main">
                  <span className="fd-doc__name">{d.name}</span>
                  <span className="fd-doc__meta">{d.date} · {d.type}</span>
                </div>
                <a className="fd-doc__btn" href={"#download-" + i}>
                  Pobierz <span className="fd-doc__icon" aria-hidden="true"><Ic.Download /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

window.DokumentyList = DokumentyList;
