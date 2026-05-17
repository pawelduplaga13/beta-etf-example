# BETA ETF Website — Project Rules

## Layout container rule (NON-NEGOTIABLE)

**Every section on the page is wrapped in a single `.container` div.** No exceptions.
This includes: nav, hero (both the text block and the micro-feature row), trust strip, about, fund grid, why ETF, how to start, closing/quote/email, footer.

The container is defined ONCE in `styles.css` and must not be re-declared or per-section-overridden:

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 80px;   /* desktop */
  padding-right: 80px;
}
@media (max-width: 1024px) { .container { padding-left: 32px; padding-right: 32px; } }
@media (max-width: 768px)  { .container { padding-left: 24px; padding-right: 24px; } }
```

### Forbidden — these break the rule and have caused regressions

- ❌ `padding: 32px 0` (or any shorthand) on a child of `.container` — the shorthand resets horizontal padding to 0 and pushes content full-bleed.
  ✅ Use `padding-top` / `padding-bottom` explicitly when adding vertical padding to a `.container` descendant.
- ❌ Adding `max-width: 820px` (or anything narrower than `.container`) to a hero text block.
  ✅ Let the container set the width. If a single text block needs a narrower measure (e.g. a paragraph), set max-width on **that paragraph**, not on the wrapping flex/grid parent.
- ❌ Full-bleed sections that skip `.container` (trust strip was doing this — numbers butted against the viewport edge).
  ✅ A section can have a full-bleed *background* (color, border-top/bottom) on the `<section>` element, but its inner content must still be wrapped in `.container`.
- ❌ Inline `style={{ margin: "0px" }}` or similar one-off overrides on a `.container`.

### Pattern for a full-bleed background with contained content

```jsx
<section className="trust"> {/* background + borders on section, full bleed */}
  <div className="container"> {/* content inside is contained */}
    <div className="trust-grid">…</div>
  </div>
</section>
```

```css
.trust { background: white; border-top: 1px solid …; border-bottom: 1px solid …; }
/* DO NOT add horizontal padding here — .container handles it */
```

## Other invariants from the design system

- **0px border-radius across the entire page.** No exceptions.
- **No shadows on any UI element.** Hairline borders only.
- **Brand gradient `#4F46E5 → #06B6D4`** appears exactly in: one hero word, glass-stripe ornament, and the 1px email-form divider. Nowhere else.
- **Green (`#059669`) / red (`#DC2626`)** are ONLY for fund return numbers. Never on buttons or chrome.
- **No emoji. No exclamation marks. Decimal comma in Polish numbers (`2,4 mld zł`).**
