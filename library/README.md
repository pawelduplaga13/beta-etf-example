# library/ — baza reużywalnych komponentów

Folder przechowuje **gotowe, wcześniej używane na stronie komponenty**, które
zostały zastąpione albo czasowo wyłączone, ale chcemy mieć je pod ręką, żeby
móc je w każdej chwili przywrócić lub wkleić na inną podstronę.

To **NIE** jest historia wersji całej strony — od tego są foldery `v1/`, `v2/`.
Tu trafiają **pojedyncze, samowystarczalne komponenty**.

## Konwencja

- Każdy plik to jeden komponent React (`*.jsx`) albo jeden moduł CSS (`*.css`).
- Komponent eksportuje się na `window.NazwaKomponentu` (jak reszta projektu —
  Babel scope per `<script>`).
- Jeśli komponent ma własne style, dodajemy obok plik `.css` o tej samej nazwie.
- Plik zaczyna się komentarzem-nagłówkiem z opisem:
  - co robi,
  - kiedy był na stronie,
  - dlaczego został wyciągnięty,
  - jak go z powrotem podpiąć (jeden konkretny `<script>` tag).

## Jak przywrócić komponent

1. Skopiuj plik z `library/` do roota projektu (`copy_files`).
2. W `BETA ETF Fund Details.html` (albo innym HTML-u) dodaj:
   ```html
   <script type="text/babel" src="NazwaKomponentu.jsx"></script>
   ```
3. Podmień użycie w odpowiednim komponencie (np. `<BackgroundWebGLDetail />`
   na `<BackgroundWebGLDetailAnimated />`).

## Spis treści

| Plik | Co to | Kiedy używane |
| --- | --- | --- |
| `BackgroundWebGLDetailAnimated.jsx` | Wariant hero-tła ETF details z **mocno animowaną** linią ceny (sinusowe drift + ruchome ticki, duża amplituda wahań). Zastąpiony spokojniejszą wersją w `BackgroundWebGLDetail.jsx` (też animowana, ale subtelniejszy "breathing" drift). | `BETA ETF Fund Details.html` — wcześniejsza wersja hero. |
