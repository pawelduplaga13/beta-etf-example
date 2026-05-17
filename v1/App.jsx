// App.jsx — composition
function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <FundGrid />
        <WhyETF />
        <HowToStart />
        <Closing />
      </main>
      <Footer />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
