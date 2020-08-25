import { Layout } from "../layouts/layouts.js";
import { lineTrace } from "../charts/scatters.js";
import { gaugeTrace, cardTrace } from "../charts/indicators.js";
import { histogramTrace } from "../charts/histograms.js";

// ===========================
// Setup dashboard layout ====
// ===========================

let layout = new Layout("simple");

// =============================
// Setup dashboard components ==
// =============================

// Init line traces
let line_top = new lineTrace("x", "y");
let line_low = new lineTrace("x", "y");
line_low.line.color = "rgba(62, 108, 193 1.0)";

// Init card indicator
var card = new cardTrace();

// Init gauge indicator with traffic light colors
var gauge = new gaugeTrace();
gauge.trafficLight = [3, 4];

// Init upper hist
let bar_sx = new histogramTrace("x2", "y2");
bar_sx.color = "rgba(62, 108, 193, 0.7)";
bar_sx.xbins = {
  size: 3
};

// Init lower hist
let bar_dx = new histogramTrace("x3", "y3");
bar_dx.color = "rgba(193, 147, 62, 0.7)";
bar_dx.xbins = {
  size: 1
};

// Set data, config and first render
var data = [pibTrace, piqTrace, bar_top, bar_dx, gauge, card];

var config = {
  responsive: true,
  displayModeBar: false,
  hovermode: "closest",
  scrollZoom: false
};

export function initDashboard() {
  Plotly.newPlot("chart-div", data, layout, config);
}

export function refreshDashboard(data) {
  line_top.x = data.pib.ts;
  line_top.y = data.pib.value;

  line_low.x = data.piq.ts;
  line_low.y = data.piq.value;

  bar_sx.x = data.piq.value;
  bar_dx.x = data.pib.value;

  gauge.valuesArray = data.pib.value;

  card.valuesArray = data.piq.value;

  layout.title = `Last update: ${Date().toLocaleString()}`;

  // Make x axis scrolling
  let datalength = data.pib.value.length;
  let dataSpan = Math.max(...data.pib.ts) - Math.min(...data.pib.ts);
  let axisSpan = 3600000 / 4; // 15 min
  if (dataSpan > axisSpan) {
    let end = new Date(data.pib.ts[datalength - 1]);
    let start = end - axisSpan;
    layout.xaxis.range = [start, end];
  }

  // Make y axis adapt to range (or fixed max value)
  let maxAxisValue = 8.1;
  let subseries = [data.pib, data.piq].map(arr =>
    arr.value.slice(datalength - axisSpan + 1)
  );
  let subseriesMaxValue = Math.max(...subseries.map(arr => Math.max(...arr)));
  layout.yaxis.range =
    subseriesMaxValue > maxAxisValue
      ? [0, subseriesMaxValue]
      : [0, maxAxisValue];

  Plotly.react(
    "chart-div",
    [line_top, line_low, bar_sx, bar_dx, gauge, card],
    layout,
    config
  );
}
