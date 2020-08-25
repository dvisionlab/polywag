import Plotly from "plotly.js-dist";

import { Layout } from "../layouts/layouts.js";
import { lineTrace } from "../charts/scatters.js";
import { cardTrace } from "../charts/indicators.js";
import { histogramTrace } from "../charts/histograms.js";

const keyUp = "temperature";
const keyDown = "voc";

// ===========================
// Setup dashboard layout ====
// ===========================

let layout = new Layout("advanced");

// Add titles
layout.annotations[0].bgcolor = "#1e1e1e";
layout.annotations[0].bordercolor = "rgba(231, 244, 89, 1.0)";
layout.annotations[0].text = keyUp;
layout.annotations[1].bgcolor = "1e1e1e";
layout.annotations[1].bordercolor = "rgba(54, 180, 210, 1.0)";
layout.annotations[1].text = keyDown;

// =============================
// Setup dashboard components ==
// =============================

// Init line traces
let line_top = new lineTrace("x2", "y");
line_top.line.color = "rgba(231, 244, 89, 1.0)";

let line_low = new lineTrace("x2", "y2");
line_low.line.color = "rgba(54, 180, 210, 1.0)";

// Init card indicators
let labelDown = new cardTrace();
labelDown.bindTo(layout.xaxis2, layout.yaxis2);
labelDown.colorScale = "reverse";

let labelUp = new cardTrace();
labelUp.range = [0, 10];
labelUp.barSteps = [6, 8];
labelUp.trafficLight = [6, 8];
labelUp.bindTo(layout.xaxis, layout.yaxis);

// Init upper hist
let bar_top = new histogramTrace("x3", "y3", "h");
bar_top.color = "rgba(231, 244, 89, 0.7)";
bar_top.ybins = {
  size: 0.1
};

// Init lower hist
let bar_low = new histogramTrace("x4", "y4", "h");
bar_low.color = "rgba(54, 180, 210, 0.7)";
bar_low.ybins = {
  size: 0.1
};

// ===============================
// Set data and configuration ====
// ===============================

var data = [labelUp, labelDown, line_top, line_low, bar_top, bar_low];

const config = {
  responsive: true,
  displayModeBar: false,
  hovermode: "closest",
  scrollZoom: false
};

// =====================
// Exported functions ==
// =====================

export function initDashboard(divId) {
  Plotly.newPlot(divId, data, layout, config);
}

export function refreshDashboard(divId, data) {
  console.log(
    "last ts",
    new Date(data[keyUp].timestamp.slice().pop()).toLocaleTimeString()
  );

  // update line charts
  line_top.x = data[keyUp].timestamp.map(t => Date.parse(t));
  line_top.y = data[keyUp].value;
  line_low.x = data[keyDown].timestamp.map(t => Date.parse(t));
  line_low.y = data[keyDown].value;

  // update histograms
  bar_top.x = data[keyUp].value;
  bar_top.y = data[keyUp].value;
  bar_low.x = data[keyDown].value;
  bar_low.y = data[keyDown].value;

  // update indicators
  labelUp.valuesArray = data[keyUp].value;
  labelDown.valuesArray = data[keyDown].value;

  // update title
  layout.title = `Last update: ${Date().toLocaleString()}`;

  // Make x axis scrolling
  let datalength = data[keyDown].value.length;
  let dataSpan =
    new Date(data[keyDown].timestamp[datalength - 1]) -
    new Date(data[keyDown].timestamp[0]);
  let axisSpan = 3600000 / 12; // 5min
  if (dataSpan > axisSpan) {
    let end = new Date(data[keyDown].timestamp[datalength - 1]);
    let start = end - axisSpan;
    layout.xaxis.range = [start, end];
    layout.xaxis2.range = [start, end];
  }

  // Make y axis adapt to range

  // keyUp
  let subseriesUp = [data[keyUp]].map(arr =>
    arr.value.slice(datalength - axisSpan + 1)
  );
  let subseriesMaxValueUp = Math.max(
    ...subseriesUp.map(arr => Math.max(...arr))
  );
  let subseriesMinValueUp = Math.max(
    ...subseriesUp.map(arr => Math.min(...arr))
  );
  let deltaUp = subseriesMaxValueUp - subseriesMinValueUp;

  layout.yaxis.range = [
    subseriesMinValueUp - deltaUp / 10,
    subseriesMaxValueUp + deltaUp / 10
  ];
  layout.yaxis3.range = layout.yaxis.range;

  // keyDown
  let subseries = [data[keyDown]].map(arr =>
    arr.value.slice(datalength - axisSpan + 1)
  );
  let subseriesMaxValueDown = Math.max(
    ...subseries.map(arr => Math.max(...arr))
  );
  let subseriesMinValueDown = Math.max(
    ...subseries.map(arr => Math.min(...arr))
  );
  let deltaDown = subseriesMaxValueDown - subseriesMinValueDown;

  layout.yaxis2.range = [
    subseriesMinValueDown - deltaDown / 10,
    subseriesMaxValueDown + deltaDown / 10
  ];
  layout.yaxis4.range = layout.yaxis2.range;

  // update avg lines and labels
  let avgUp =
    data[keyUp].value.reduce((a, b) => a + b, 0) / data[keyUp].value.length;
  let avgDown =
    data[keyDown].value.reduce((a, b) => a + b, 0) / data[keyDown].value.length;
  layout.shapes[0].x0 = layout.shapes[1].x0 = layout.xaxis2.range[0];
  layout.shapes[0].x1 = layout.shapes[1].x1 = layout.annotations[2].x = layout.annotations[3].x =
    layout.xaxis2.range[1];
  layout.shapes[0].y0 = layout.shapes[0].y1 = layout.annotations[2].y = avgUp;
  layout.shapes[1].y0 = layout.shapes[1].y1 = layout.annotations[3].y = avgDown;
  layout.annotations[2].text = avgUp.toFixed(1);
  layout.annotations[3].text = avgDown.toFixed(1);

  // Apply changes
  Plotly.react(
    divId,
    [labelUp, labelDown, line_top, line_low, bar_top, bar_low],
    layout,
    config
  );
}
