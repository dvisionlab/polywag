import Plotly from "plotly.js-dist";

import { Layout } from "../layouts/layouts.js";
import { LineTrace } from "../charts/scatters.js";
import { CardTrace } from "../charts/indicators.js";
import { HistogramTrace } from "../charts/histograms.js";

const keyTL = "temperature";
const keyBL = "voc";
const keyTR = "humidity";
const keyBR = "dust";

const colorTL = "rgba(231, 244, 89, 0.7)";
const colorBL = "rgba(54, 180, 210, 0.7)";
const colorTR = "rgba(255, 156, 15, 0.7)";
const colorBR = "rgba(54, 180, 54, 0.7)";

// ===========================
// Setup dashboard layout ====
// ===========================

let layout = new Layout("quad+rows");

// Add titles
layout.annotations[0].bgcolor = "#1e1e1e";
layout.annotations[0].bordercolor = colorTL;
layout.annotations[0].text = keyTL;
layout.annotations[0].textangle = -90;
layout.annotations[1].bgcolor = "1e1e1e";
layout.annotations[1].bordercolor = colorBL;
layout.annotations[1].text = keyBL;
layout.annotations[1].textangle = -90;
layout.annotations[2].bgcolor = "1e1e1e";
layout.annotations[2].bordercolor = colorTR;
layout.annotations[2].text = keyTR;
layout.annotations[2].textangle = 90;
layout.annotations[3].bgcolor = "1e1e1e";
layout.annotations[3].bordercolor = colorBR;
layout.annotations[3].text = keyBR;
layout.annotations[3].textangle = 90;

// =============================
// Setup dashboard components ==
// =============================

// Init line traces

let line_tl = new LineTrace("x2", "y");
line_tl.line.color = colorTL;

let line_bl = new LineTrace("x2", "y2");
line_bl.line.color = colorBL;

let line_tr = new LineTrace("x5", "y5");
line_tr.line.color = colorTR;

let line_br = new LineTrace("x6", "y6");
line_br.line.color = colorBR;

// Init card indicators

let labelTL = new CardTrace();
labelTL.bindTo(layout.xaxis, layout.yaxis);

let labelBL = new CardTrace();
labelBL.bindTo(layout.xaxis2, layout.yaxis2);
labelTL.colorScale = "reverse";

let labelTR = new CardTrace();
labelTR.bindTo(layout.xaxis5, layout.yaxis5);

let labelBR = new CardTrace();
labelBR.bindTo(layout.xaxis6, layout.yaxis6);
labelTL.colorScale = "reverse";

// Init histograms

let bar_tl = new HistogramTrace("x3", "y3", "h");
bar_tl.color = colorTL;
bar_tl.ybins = {
  size: 0.1
};

let bar_bl = new HistogramTrace("x4", "y4", "h");
bar_bl.color = colorBL;
bar_bl.ybins = {
  size: 0.1
};

let bar_tr = new HistogramTrace("x7", "y7", "h");
bar_tr.color = colorTR;
bar_tr.ybins = {
  size: 0.5
};

let bar_br = new HistogramTrace("x8", "y8", "h");
bar_br.color = colorBR;
bar_br.ybins = {
  size: 1
};

// ===============================
// Set data and configuration ====
// ===============================

var data = [
  labelTL,
  labelBL,
  labelTR,
  labelBR,
  line_tl,
  line_bl,
  line_tr,
  line_br,
  bar_tl,
  bar_bl,
  bar_tr,
  bar_br
];

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
  // update line charts
  line_tl.x = data[keyTL].timestamp.map(t => Date.parse(t));
  line_tl.y = data[keyTL].value;
  line_bl.x = data[keyBL].timestamp.map(t => Date.parse(t));
  line_bl.y = data[keyBL].value;
  line_tr.x = data[keyTR].timestamp.map(t => Date.parse(t));
  line_tr.y = data[keyTR].value;
  line_br.x = data[keyBR].timestamp.map(t => Date.parse(t));
  line_br.y = data[keyBR].value;

  // update histograms
  bar_tl.x = data[keyTL].value;
  bar_tl.y = data[keyTL].value;
  bar_bl.x = data[keyBL].value;
  bar_bl.y = data[keyBL].value;
  bar_tr.x = data[keyTR].value;
  bar_tr.y = data[keyTR].value;
  bar_br.x = data[keyBR].value;
  bar_br.y = data[keyBR].value;

  // update indicators
  labelTL.valuesArray = data[keyTL].value;
  labelBL.valuesArray = data[keyBL].value;
  labelTR.valuesArray = data[keyTR].value;
  labelBR.valuesArray = data[keyBR].value;

  // update title
  layout.title = `Last update: ${Date().toLocaleString()}`;

  // Make x axis scrolling
  let datalength = data[keyBL].value.length;
  let dataSpan =
    new Date(data[keyBL].timestamp[datalength - 1]) -
    new Date(data[keyBL].timestamp[0]);
  let axisSpan = 3600000 / 12; // 5min
  if (dataSpan > axisSpan) {
    let end = new Date(data[keyBL].timestamp[datalength - 1]);
    let start = end - axisSpan;
    layout.xaxis.range = [start, end];
    layout.xaxis2.range = [start, end];
    layout.xaxis5.range = [start, end];
    layout.xaxis6.range = [start, end];
  }

  // Make y axis adapt to range

  function resizeYaxis(seriesData, axisSpan, layout, axisTags) {
    let datalength = seriesData.value.length;

    let subseries = [seriesData].map(arr =>
      arr.value.slice(datalength - axisSpan + 1)
    );
    let subseriesMaxValue = Math.max(...subseries.map(arr => Math.max(...arr)));
    let subseriesMinValue = Math.max(...subseries.map(arr => Math.min(...arr)));
    let delta = subseriesMaxValue - subseriesMinValue;

    let newRange = [
      subseriesMinValue - delta / 10,
      subseriesMaxValue + delta / 10
    ];

    // apply
    axisTags.map(tag => {
      layout[tag].range = newRange;
    });
  }

  resizeYaxis(data[keyTL], axisSpan, layout, ["yaxis", "yaxis3"]);
  resizeYaxis(data[keyBL], axisSpan, layout, ["yaxis2", "yaxis4"]);
  resizeYaxis(data[keyTR], axisSpan, layout, ["yaxis5", "yaxis7"]);
  resizeYaxis(data[keyBR], axisSpan, layout, ["yaxis6", "yaxis8"]);

  // update avg lines and labels
  //   let avgTL =
  //     data[keyTL].value.reduce((a, b) => a + b, 0) / data[keyTL].value.length;
  //   let avgBL =
  //     data[keyBL].value.reduce((a, b) => a + b, 0) / data[keyBL].value.length;
  //   layout.shapes[0].x0 = layout.shapes[1].x0 = layout.xaxis2.range[0];
  //   layout.shapes[0].x1 = layout.shapes[1].x1 = layout.annotations[2].x = layout.annotations[3].x =
  //     layout.xaxis2.range[1];
  //   layout.shapes[0].y0 = layout.shapes[0].y1 = layout.annotations[2].y = avgTL;
  //   layout.shapes[1].y0 = layout.shapes[1].y1 = layout.annotations[3].y = avgBL;
  //   layout.annotations[2].text = avgTL.toFixed(1);
  //   layout.annotations[3].text = avgBL.toFixed(1);

  // Apply changes
  Plotly.react(
    divId,
    [
      labelTL,
      labelBL,
      labelTR,
      labelBR,
      line_tl,
      line_bl,
      line_tr,
      line_br,
      bar_tl,
      bar_bl,
      bar_tr,
      bar_br
    ],
    layout,
    config
  );
}
