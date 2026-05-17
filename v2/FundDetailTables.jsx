// FundDetailTables.jsx — Charakterystyka, Certyfikaty, Opłaty, Ekspozycja
function CharakterystykaTable({ fund }) {
  const rows = [
    ["Zarządzający",         "Kazimierz Szpak · Dawid Bąbol · Mateusz Mucha"],
    ["Metoda replikacji",    "Fizyczna, zasadniczo pełna"],
    ["Depozytariusz",        "Bank Pekao S.A."],
    ["Market maker",         "Dom Maklerski Banku Ochrony Środowiska S.A."],
    ["Wycena",               "Każdy dzień sesyjny"],
    ["Ticker",               <span className="mono">{fund.ticker}</span>],
    ["ISIN",                 <span className="mono">{fund.isin}</span>],
    ["Data rejestracji",     "4 marca 2019 r."],
    ["Pierwszy dzień notowań", "8 kwietnia 2019 r."],
  ];
  return (
    <section className="section section--grid fd-char" data-screen-label="05 Charakterystyka">
      <div className="container">
        <SectionHead eyebrow="CHARAKTERYSTYKA" h2="Najważniejsze fakty operacyjne." />
        <dl className="fd-dl">
          {rows.map(([k, v], i) => (
            <div className="fd-dl__row" key={i}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CertyfikatyTable() {
  const rows = [
    ["14.05.2026", "275,89", "18 500,00"],
    ["13.05.2026", "268,78", "18 500,00"],
    ["12.05.2026", "264,40", "18 500,00"],
    ["11.05.2026", "271,54", "18 500,00"],
    ["08.05.2026", "267,79", "18 500,00"],
  ];
  return (
    <section className="section fd-cert" data-screen-label="06 Certyfikaty">
      <div className="container">
        <div className="fd-cert-head">
          <SectionHead eyebrow="EMISJA" h2="Wyemitowane certyfikaty." />
          <a className="link-arrow" href="#download-cert">Pobierz historię (XLSX) <span className="arrow">↓</span></a>
        </div>
        <table className="fd-table">
          <thead>
            <tr>
              <th>Dane na dzień</th>
              <th>Wycena certyfikatu</th>
              <th>Liczba certyfikatów</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r[0]}</td>
                <td className="mono">{r[1]} PLN</td>
                <td className="mono">{r[2]} szt.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OplatyTable() {
  const rows = [
    ["Opłata za zarządzanie",  "0,92%",          "rocznie"],
    ["Całkowity wskaźnik kosztów (TER)", "0,92%", "rocznie"],
    ["Opłata subskrypcyjna",   "Rynek wtórny: brak (prowizja brokerska)", "Rynek pierwotny: 2,00%"],
    ["Opłata za wykup",        "Rynek wtórny: brak (prowizja brokerska)", "Rynek pierwotny: 1,00%"],
  ];
  return (
    <section className="section section--grid fd-fees" data-screen-label="07 Opłaty">
      <div className="container">
        <SectionHead eyebrow="OPŁATY" h2="Co kosztuje udział w funduszu." />
        <dl className="fd-dl">
          {rows.map(([k, v, extra], i) => (
            <div className="fd-dl__row" key={i}>
              <dt>{k}</dt>
              <dd>
                <span className="fd-dl__primary">{v}</span>
                {extra && <span className="fd-dl__secondary">{extra}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function EkspozycjaTable() {
  const rows = [
    ["Skorygowana Wartość Aktywów Netto (SWAN)",                          "224 880 000 PLN"],
    ["Łączna ekspozycja Funduszu na Portfel Bazowy (% SWAN)",             "99,8%"],
    ["Łączna ekspozycja Funduszu na aktywa denominowane w walucie obcej (% SWAN)", "0,0%"],
  ];
  return (
    <section className="section fd-expo" data-screen-label="08 Ekspozycja">
      <div className="container">
        <SectionHead eyebrow="EKSPOZYCJA" h2="Profil ekspozycji funduszu." />
        <dl className="fd-dl">
          {rows.map(([k, v], i) => (
            <div className="fd-dl__row" key={i}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="fd-expo-note">
          Dane na dzień 30 kwietnia 2026 r. Pełne informacje o ekspozycji dostępne w prospekcie informacyjnym.
        </p>
      </div>
    </section>
  );
}

window.CharakterystykaTable = CharakterystykaTable;
window.CertyfikatyTable = CertyfikatyTable;
window.OplatyTable = OplatyTable;
window.EkspozycjaTable = EkspozycjaTable;
