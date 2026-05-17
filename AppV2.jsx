// AppV2.jsx — alternative homepage composition (offer section redesigned)
function AppV2() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <FundListV2 />
        <HowToStart />
        <Closing />
      </main>
      <Footer />
    </React.Fragment>
  );
}

const rootV2 = ReactDOM.createRoot(document.getElementById("root"));
rootV2.render(<AppV2 />);
