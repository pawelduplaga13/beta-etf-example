// Closing.jsx — HowToStart, Quote+Email, Footer
function HowToStart() {
  const steps = [
    {
      n: "01",
      title: "Otwórz rachunek maklerski",
      body: "Rachunek maklerski to drzwi do giełdy. Założysz go w aplikacji banku albo w domu maklerskim — często w kilka minut, w pełni online.",
    },
    {
      n: "02",
      title: "Wybierz fundusz BETA ETF",
      body: "W wyszukiwarce maklera wpisz ticker zaczynający się od ETFB… lub nazwę funduszu. Złóż zlecenie z limitem ceny, żeby kontrolować po jakiej cenie kupisz.",
    },
    {
      n: "03",
      title: "Inwestuj długoterminowo",
      body: "Najwięcej zyskują inwestorzy, którzy dokupują regularnie i nie panikują na wahaniach. ETF to narzędzie na lata, nie na tydzień.",
    },
  ];
  return (
    <section className="section" id="jak-zaczac" data-screen-label="07 Jak zacząć">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">JAK ZACZĄĆ</span>
          <h2>Inwestujesz w trzy kroki.</h2>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <div className="step-body">
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="step-cta">
          <div className="step-cta__text">
            <h3>Gotowy, żeby zacząć?</h3>
            <p>Przeczytaj pełny przewodnik krok po kroku.</p>
          </div>
          <button className="btn btn--invert">
            Otwórz przewodnik <span className="btn-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="closing" id="zapis" data-screen-label="08 Cytat + zapis">
      <GlassStripes />
      <div className="container">
        <div className="closing-inner">
          <blockquote className="closing-quote">
            „ETF‑y stają się realnym wyborem dla coraz większej grupy inwestorów. To już nie jest produkt niszowy."
          </blockquote>
          <div className="closing-attr">
            <span className="name">Kazimierz Szpak</span>
            <span className="role">Prezes Zarządu BETA TFI S.A.</span>
          </div>

          <div className="closing-divider" aria-hidden="true" />

          <div className="closing-email">
            <span className="eyebrow">BĄDŹ NA BIEŻĄCO</span>
            <h3>Otrzymuj raz w miesiącu materiały edukacyjne o inwestowaniu w ETF.</h3>
            <form className="closing-email-form" onSubmit={(e) => e.preventDefault()}>
              <input className="closing-email-input" type="email" placeholder="Twój adres e‑mail" aria-label="Adres e-mail" />
              <button className="closing-email-submit" type="submit">Zapisz się</button>
            </form>
            <p className="closing-email-note">Bez spamu. Możesz wypisać się jednym kliknięciem.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" data-screen-label="09 Footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo">BETA ETF<span className="dot" /></span>
            <p>Pierwszy polski dostawca funduszy ETF notowanych na GPW.</p>
            <div className="footer-social">
              <a href="#twitter" aria-label="Twitter"><Ic.Twitter /></a>
              <a href="#linkedin" aria-label="LinkedIn"><Ic.Linkedin /></a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Produkty</h5>
            <ul>
              <li><a href="#">Wszystkie fundusze</a></li>
              <li><a href="#">Akcje polskie</a></li>
              <li><a href="#">Akcje globalne</a></li>
              <li><a href="#">Obligacje</a></li>
              <li><a href="#">Trading</a></li>
              <li><a href="#">Bitcoin</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Wiedza</h5>
            <ul>
              <li><a href="#">Jak działa ETF</a></li>
              <li><a href="#">Jak kupić ETF</a></li>
              <li><a href="#">Szkolenia</a></li>
              <li><a href="#">Aktualności</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Spółka</h5>
            <ul>
              <li><a href="#">O nas</a></li>
              <li><a href="#">Zespół</a></li>
              <li><a href="#">Kontakt</a></li>
              <li><a href="#">Dokumenty i prospekty</a></li>
              <li><a href="#">Polityka prywatności</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <div>© 2026 BETA TFI S.A., ul. Krucza 16/22, 00‑526 Warszawa. Spółka nadzorowana przez Komisję Nadzoru Finansowego.</div>
          <div>Inwestowanie w fundusze inwestycyjne wiąże się z ryzykiem utraty części lub całości zainwestowanego kapitału. Wartość certyfikatów może podlegać wahaniom. Przed inwestycją zapoznaj się z dokumentami funduszu.</div>
        </div>
      </div>
    </footer>
  );
}

window.HowToStart = HowToStart;
window.Closing = Closing;
window.Footer = Footer;
