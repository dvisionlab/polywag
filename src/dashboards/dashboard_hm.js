import Plotly from "plotly.js-dist";

import { Layout, Coloraxis } from "../layouts/layouts.js";
import { HeatmapTrace } from "../charts/heatmaps.js";
import { arraysToDateTimeMatrix } from "../utils/reshape.js";

// ===========================
// Setup dashboard layout ====
// ===========================

let layout = new Layout("simple");

// Add titles
// layout.annotations[0].bgcolor = "#1e1e1e";
// layout.annotations[0].bordercolor = "rgba(231, 244, 89, 1.0)";
// layout.annotations[0].text = "Timeserie A";
// layout.annotations[1].bgcolor = "1e1e1e";
// layout.annotations[1].bordercolor = "rgba(54, 180, 210, 1.0)";
// layout.annotations[1].text = "Timeserie B";
// layout.annotations[2].bgcolor = "1e1e1e";
// layout.annotations[2].bordercolor = "rgba(138, 210, 70, 1.0)";
// layout.annotations[2].text = "Timeserie C";

// =============================
// Setup dashboard components ==
// =============================

// Init heatmap traces
let hm_upleft = new HeatmapTrace("x", "y");
let hm_downleft = new HeatmapTrace("x2", "y2");
let hm_upright = new HeatmapTrace("x3", "y3");
let hm_downright = new HeatmapTrace("x4", "y4");

layout.coloraxis = new Coloraxis({ x: -0.13, y: 0.76 }, 0.5, "Viridis");
layout.coloraxis2 = new Coloraxis({ x: -0.13, y: 0.22 }, 0.5, "Viridis");
layout.coloraxis3 = new Coloraxis({ x: 1.05, y: 0.76 }, 0.5, "Viridis");
layout.coloraxis4 = new Coloraxis({ x: 1.05, y: 0.22 }, 0.5, "Viridis");

hm_upleft.coloraxis = "coloraxis";
hm_downleft.coloraxis = "coloraxis2";
hm_upright.coloraxis = "coloraxis3";
hm_downright.coloraxis = "coloraxis4";

// ===============================
// Set data and configuration ====
// ===============================

var data = [hm_upleft, hm_upright, hm_downleft, hm_downright];

const config = {
  responsive: true,
  displayModeBar: false,
  hovermode: "closest",
  scrollZoom: false
};

// =====================
// Exported functions ==
// =====================

export function initStats(divId) {
  Plotly.newPlot(divId, data, layout, config);
}

export function refreshStats(divId, data) {
  let keyUpLeft = "temperature";
  let keyUpRight = "humidity";
  let keyDownLeft = "voc";
  let keyDownRight = "dust";

  let matrix_a = arraysToDateTimeMatrix(data[keyUpLeft]);
  hm_upleft.x = matrix_a.timeKeys;
  hm_upleft.y = matrix_a.dateKeys;
  hm_upleft.z = matrix_a.values;

  let matrix_b = arraysToDateTimeMatrix(data[keyUpRight]);
  hm_upright.x = matrix_b.timeKeys;
  hm_upright.y = matrix_b.dateKeys;
  hm_upright.z = matrix_b.values;

  let matrix_c = arraysToDateTimeMatrix(data[keyDownLeft]);
  hm_downleft.x = matrix_c.timeKeys;
  hm_downleft.y = matrix_c.dateKeys;
  hm_downleft.z = matrix_c.values;

  let matrix_d = arraysToDateTimeMatrix(data[keyDownRight]);
  hm_downright.x = matrix_d.timeKeys;
  hm_downright.y = matrix_d.dateKeys;
  hm_downright.z = matrix_d.values;

  // update title
  let start = new Date(matrix_a.dateKeys[0]).toLocaleDateString();
  let end = new Date(
    matrix_a.dateKeys[matrix_a.dateKeys.length - 1]
  ).toLocaleDateString();
  layout.title = `Selected period: ${start} - ${end}`;

  // Apply changes
  Plotly.react(
    divId,
    [hm_upleft, hm_upright, hm_downleft, hm_downright],
    layout,
    config
  );
}
