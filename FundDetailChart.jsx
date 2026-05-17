// FundDetailChart.jsx — Notowania (line chart + period selector + performance summary)
const { useState: useStateChart, useMemo: useMemoChart } = React;

// Synthetic data — daily % return for fund vs index over ~22 months
function generateSeries() {
  const days = 480;
  const start = new Date(2026, 4, 14); // 2026-05-14
  const data = [];
  let f = 0, idx = 0;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(start); d.setDate(d.getDate() - i);
    const t = (days - 1 - i) / (days - 1);
    // base upward trajectory with sin wobble + small noise
    const macro = t * 22 + Math.sin(t * Math.PI * 3) * 3.5 + Math.sin(t * Math.PI * 7) * 1.2;
    const noiseF = (Math.sin(i * 1.3) + Math.cos(i * 0.7)) * 0.4;
    const noiseI = (Math.sin(i * 1.1) + Math.cos(i * 0.9)) * 0.35;
    f = macro + noiseF;
    idx = macro + 0.6 + noiseI;
    data.push({ date: d, f: +f.toFixed(2), idx: +idx.toFixed(2) });
  }
  return data;
}

const PERIODS = [
  { id: "1M",  label: "1M",  days: 22 },
  { id: "3M",  label: "3M",  days: 66 },
  { id: "6M",  label: "6M",  days: 130 },
  { id: "YTD", label: "YTD", days: 133 },
  { id: "1Y",  label: "1Y",  days: 260 },
  { id: "3Y",  label: "3Y",  days: 480 },
  { id: "ALL", label: "ALL", days: 480 },
];

const fmtDate = (d) => d.toLocaleDateString("pl-PL", { day: "2-digit", month: "short", year: "numeric" }).replace(".", "");
const fmtPct  = (v) => (v >= 0 ? "+" : "") + v.toFixed(2).replace(".", ",") + "%";

function NotowaniaChart({ fund }) {
  const [period, setPeriod] = useStateChart("1Y");
  const [mode, setMode]     = useStateChart("rate"); // rate | value
  const [hoverIdx, setHover] = useStateChart(null);

  const allData = useMemoChart(generateSeries, []);
  const days = PERIODS.find((p) => p.id === period).days;
  const data = useMemoChart(() => allData.slice(-days), [allData, days]);

  const W = 1120, H = 360, padL = 56, padR = 24, padT = 24, padB = 36;
  const xs = data.map((_, i) => padL + (i / (data.length - 1)) * (W - padL - padR));

  // Y scale based on min/max of both series over window
  const vals = data.flatMap((d) => [d.f, d.idx]);
  let yMin = Math.min(...vals), yMax = Math.max(...vals);
  const pad = (yMax - yMin) * 0.12 || 1;
  yMin -= pad; yMax += pad;
  const ys = (v) => padT + ((yMax - v) / (yMax - yMin)) * (H - padT - padB);

  const pathFund  = data.map((d, i) => `${i ? "L" : "M"}${xs[i].toFixed(1)},${ys(d.f).toFixed(1)}`).join(" ");
  const pathIndex = data.map((d, i) => `${i ? "L" : "M"}${xs[i].toFixed(1)},${ys(d.idx).toFixed(1)}`).join(" ");

  // grid lines (5 horizontal)
  const yTicks = [];
  const step = (yMax - yMin) / 4;
  for (let i = 0; i < 5; i++) yTicks.push(yMin + i * step);

  // x labels (first, mid, last)
  const xLabels = [0, Math.floor(data.length / 2), data.length - 1].map((i) => ({ x: xs[i], date: data[i].date }));

  const last = data[data.length - 1];
  const first = data[0];
  const fundReturn = last.f - first.f;
  const idxReturn  = last.idx - first.idx;

  const hover = hoverIdx != null ? data[hoverIdx] : null;

  const onMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    if (x < padL || x > W - padR) { setHover(null); return; }
    const idx = Math.round(((x - padL) / (W - padL - padR)) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, idx)));
  };
  const onLeave = () => setHover(null);

  return (
    <section className="section section--grid fd-chart" id="notowania" data-screen-label="09 Notowania">
      <div className="container">
        <SectionHead eyebrow="NOTOWANIA" h2="Wynik funduszu na tle indeksu." />

        <div className="fd-chart-toolbar">
          <div className="fd-chart-legend">
            <span className="fd-legend">
              <span className="fd-legend__sw fd-legend__sw--fund" />
              <span className="fd-legend__lbl">BETA ETF {fund.shortName}</span>
            </span>
            <span className="fd-legend">
              <span className="fd-legend__sw fd-legend__sw--idx" />
              <span className="fd-legend__lbl">Indeks {fund.benchmark}</span>
            </span>
          </div>
          <div className="fd-chart-modes">
            <button className={"fd-chart-mode " + (mode === "rate" ? "is-active" : "")} onClick={() => setMode("rate")}>Stopa zwrotu</button>
            <button className={"fd-chart-mode " + (mode === "value" ? "is-active" : "")} onClick={() => setMode("value")}>Wartość jednostki</button>
          </div>
        </div>

        <div className="fd-chart-canvas">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="none" onMouseMove={onMove} onMouseLeave={onLeave}>
            {/* horizontal grid */}
            {yTicks.map((v, i) => (
              <g key={i}>
                <line x1={padL} x2={W - padR} y1={ys(v)} y2={ys(v)} stroke="rgba(17,24,39,0.06)" strokeWidth="1" />
                <text x={padL - 12} y={ys(v) + 4} fontSize="11" textAnchor="end" fill="rgba(75,85,99,0.9)" fontFamily="Geist">{fmtPct(v)}</text>
              </g>
            ))}
            {/* x axis */}
            {xLabels.map((l, i) => (
              <text key={i} x={l.x} y={H - 12} fontSize="11" textAnchor="middle" fill="rgba(75,85,99,0.9)" fontFamily="Geist">{fmtDate(l.date)}</text>
            ))}
            {/* index (cyan/indigo dashed-thin) */}
            <path d={pathIndex} fill="none" stroke="#4F46E5" strokeWidth="1.6" strokeOpacity="0.85" />
            {/* fund (indigo strong) */}
            <path d={pathFund} fill="none" stroke="#06B6D4" strokeWidth="2" />

            {/* hover crosshair */}
            {hover && (
              <g>
                <line x1={xs[hoverIdx]} x2={xs[hoverIdx]} y1={padT} y2={H - padB} stroke="rgba(17,24,39,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={xs[hoverIdx]} cy={ys(hover.f)}   r="4" fill="#06B6D4" />
                <circle cx={xs[hoverIdx]} cy={ys(hover.idx)} r="4" fill="#4F46E5" />
              </g>
            )}
          </svg>

          {hover && (
            <div className="fd-chart-tip" style={{ left: `${(xs[hoverIdx] / W) * 100}%` }}>
              <div className="fd-chart-tip__date">{fmtDate(hover.date)}</div>
              <div className="fd-chart-tip__row"><span className="fd-chart-tip__sw fd-chart-tip__sw--fund" /><span>Fundusz</span><span className={"fd-chart-tip__v " + (hover.f >= 0 ? "positive" : "negative")}>{fmtPct(hover.f)}</span></div>
              <div className="fd-chart-tip__row"><span className="fd-chart-tip__sw fd-chart-tip__sw--idx" /><span>Indeks</span><span className={"fd-chart-tip__v " + (hover.idx >= 0 ? "positive" : "negative")}>{fmtPct(hover.idx)}</span></div>
            </div>
          )}
        </div>

        <div className="fd-chart-periods">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              className={"fd-period " + (period === p.id ? "is-active" : "")}
              onClick={() => setPeriod(p.id)}
            >{p.label}</button>
          ))}
        </div>

        <div className="fd-chart-summary">
          <div className="fd-summary-row">
            <span className="fd-summary-lbl">Okres</span>
            <span className="fd-summary-val">{fmtDate(first.date)}</span>
            <span className="fd-summary-arrow" aria-hidden="true">→</span>
            <span className="fd-summary-val">{fmtDate(last.date)}</span>
          </div>
          <div className="fd-summary-row">
            <span className="fd-summary-lbl">Stopa zwrotu funduszu</span>
            <span className={"fd-summary-big " + (fundReturn >= 0 ? "positive" : "negative")}>{fmtPct(fundReturn)}</span>
          </div>
          <div className="fd-summary-row">
            <span className="fd-summary-lbl">Stopa zwrotu indeksu</span>
            <span className={"fd-summary-big " + (idxReturn >= 0 ? "positive" : "negative")}>{fmtPct(idxReturn)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

window.NotowaniaChart = NotowaniaChart;
