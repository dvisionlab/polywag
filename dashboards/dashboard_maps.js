import Plotly from "plotly.js-dist";
import { findKey, each } from "lodash";

import { Layout } from "../layouts/layouts.js";

// ============================
// Areas definition ===========
// ============================

const areas = [
  {
    id: 327,
    path: "M 0.92,0.4 L0.94,0.4 L0.9,0.56 L0.88,0.56 Z",
    // color: "rgba(255, 140, 184, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 323,
    path: "M 0.86,0.4 L0.89,0.4 L0.85,0.56 L0.82,0.56 Z",
    // color: "rgba(35, 140, 184, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 325,
    path: "M 0.77,0.4 L0.83,0.4 L0.80,0.56 L0.74,0.56 Z",
    // color: "rgba(35, 18, 184, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 95,
    path: "M 0.86,0.37 L0.93,0.37 L0.92,0.4 L0.85,0.4 Z",
    // color: "rgba(140, 18, 184, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 246,
    path: "M 0.76,0.34 L0.855,0.34 L0.85,0.36 L0.755,0.36 Z",
    // color: "rgba(140, 18, 33, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 245,
    path: "M 0.86,0.34 L0.945,0.34 L0.94,0.36 L0.855,0.36 Z",
    // color: "rgba(255, 18, 55, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 227,
    path: "M 0.70,0.355 L0.75,0.355 L0.745,0.38 L0.695,0.38 Z",
    // color: "rgba(55, 150, 110, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 243,
    path: "M 0.46,0.355 L0.57,0.355 L0.57,0.38 L0.46,0.38 Z",
    // color: "rgba(80, 120, 190, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 244,
    path: "M 0.57,0.355 L0.67,0.355 L0.67,0.38 L0.57,0.38 Z",
    // color: "rgba(120, 160, 10, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 104,
    path: "M 0.55,0.43 L0.715,0.43 L0.71,0.475 L0.55,0.475 Z",
    // color: "rgba(120, 20, 100, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 139,
    path: "M 0.55,0.48 L0.655,0.48 L0.65,0.52 L0.55,0.52 Z",
    // color: "rgba(120, 10, 10, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 14,
    path: "M 0.082,0.67 L0.104,0.67 L0.12,0.72 L0.098,0.72 Z",
    // color: "rgba(120, 10, 10, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 15,
    path: "M 0.104,0.67 L0.125,0.67 L0.141,0.72 L0.12,0.72 Z",
    // color: "rgba(10, 120, 10, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 344,
    path: "M 0.07,0.63 L0.09,0.63 L0.102,0.67 L0.082,0.67 Z",
    // color: "rgba(10, 10, 120, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 1
  },
  {
    id: 539,
    path: "M 0.655,0.64 L0.705,0.64 L0.70,0.70 L0.65,0.70 Z",
    // color: "rgba(10, 10, 120, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 2
  },
  {
    id: 540,
    path: "M 0.705,0.64 L0.755,0.64 L0.75,0.70 L0.70,0.70 Z",
    // color: "rgba(10, 110, 120, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 2
  },
  {
    id: 541,
    path: "M 0.755,0.64 L0.805,0.64 L0.80,0.70 L0.75,0.70 Z",
    // color: "rgba(110, 120, 10, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
    ref: 2
  }
];

// ============================
// Colorscale definition=======
// ============================

const colorMap = {
  "rgba(194,20,50,0.7)": 0,
  "rgba(194,73,20,0.7)": 0.2,
  "rgba(194,160,20,0.7)": 0.4,
  "rgba(141,194,20,0.7)": 0.6,
  "rgba(54,194,20,0.7)": 0.8,
  "rgba(20,194,73,0.7)": 1
};

function getColor(value) {
  let colorString = findKey(colorMap, range => value <= range);

  return colorString ? colorString : "rgba(0, 0, 0, 0.5)";
}

// ============================
// Config =====================
// ============================

// disable panning: dragMode=False in the layout property
// disable scrolling: scrollZoom=False in the config property
// disable map controls: displayModeBar=False in the config property

let config = { staticPlot: true, responsive: true };
// let config = { staticPlot: false, responsive: true };

let layout = new Layout("areasMap", {
  mapPaths: [
    "/media/images/PianoTerraHR.jpg",
    "/media/images/PrimoPianoHR.jpg"
  ],
  areas: areas
});

// =====================
// Exported functions ==
// =====================

export function initMaps(divId) {
  Plotly.newPlot(divId, [], layout, config);
}

export function refreshMaps(divId, data) {
  if (data.ts) {
    delete data.ts;
  }

  each(layout.shapes, area => {
    let newValue = data[area.camId];
    layout.shapeColor = [area.camId, getColor(newValue)];
  });

  Plotly.react(divId, [], layout, config);
}
