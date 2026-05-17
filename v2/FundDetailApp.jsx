// FundDetailApp.jsx — composition for the BETA ETF Fund Details page.

const FUND_DATA = {
  name: "BETA ETF mWIG40TR PFIZ",
  shortName: "mWIG40TR",
  ticker: "ETFBM40TR",
  isin: "PLBTRTR00012",
  benchmark: "mWIG40TR",
  category: "Akcje polskie",
  nav: "275,89",
  daily: "0,84%",
  return1Y: "+24,1%",
  ter: "0,92%",
  certificates: "18 500",
  risk: "Wysoki 6/7",
  horizon: "3 lata",
  minInvest: "1 certyfikat",
  fundType: "Akcyjny",
  aum: "224,9 mln PLN",
  indexBody: "Indeks mWIG40TR obejmuje 40 średnich spółek notowanych na GPW. Jest indeksem dochodowym — uwzględnia ceny akcji oraz dochody z dywidend. Wartość bazowa indeksu na dzień 31 grudnia 2007 r. wynosi 1 000 pkt.",
};

function FundDetailApp() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <FundDetailHero fund={FUND_DATA} />
        <QuickStats fund={FUND_DATA} />
        <KeyMetrics fund={FUND_DATA} />
        <FundDescription fund={FUND_DATA} />
        <CharakterystykaTable fund={FUND_DATA} />
        <CertyfikatyTable />
        <OplatyTable />
        <EkspozycjaTable />
        <NotowaniaChart fund={FUND_DATA} />
        <DokumentyList />
      </main>
      <Footer />
    </React.Fragment>
  );
}

const detailRoot = ReactDOM.createRoot(document.getElementById("root"));
detailRoot.render(<FundDetailApp />);
