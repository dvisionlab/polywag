/**
 * OBSOLETE
 */

import { find } from "lodash";

const default_font = {
  family: "raleway",
  size: 14,
  color: "white"
};

export class Layout {
  constructor(type, props) {
    switch (type) {
      case "single":
        this.createSingle();
        break;
      case "simple":
        this.createSimple();
        break;
      case "advanced":
        this.createAdvanced();
        break;
      case "quad+rows":
        this.createQuadRows();
        break;
      case "areasMap":
        this.createAreasMaps(props);
        break;
      default:
        console.error("No type selected");
    }
  }

  createSingle() {
    this.title = "Dashboard";
    this.paper_bgcolor = "#2f343f";
    this.plot_bgcolor = "#2f343f";
    this.font = default_font;
    this.xaxis = {
      autorange: true,
      domain: [0, 1],
      anchor: "y1",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M"
      // tickmode: "linear",
      // tick0: 0,
      // dtick: 300000
      // tickmode: "auto",
      // nticks: 10
    };
    this.yaxis = {
      autorange: true,
      domain: [0, 1.0],
      anchor: "x1",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      gridcolor: "#545454",
      gridwidth: 1
    };
  }

  createSimple() {
    this.title = "Dashboard";
    this.paper_bgcolor = "#2f343f";
    this.plot_bgcolor = "#2f343f";
    this.font = default_font;
    this.xaxis = {
      autorange: true,
      domain: [0, 0.46],
      anchor: "y1",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M"
    };
    this.yaxis = {
      autorange: true,
      domain: [0.55, 1.0],
      anchor: "x1",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      type: "date",
      tickformat: "%d/%m",
      gridcolor: "#545454",
      gridwidth: 1
    };
    this.xaxis2 = {
      autorange: true,
      domain: [0, 0.46],
      anchor: "y2",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M"
    };
    this.yaxis2 = {
      autorange: true,
      domain: [0.0, 0.45],
      anchor: "x1",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      type: "date",
      tickformat: "%d/%m",
      gridcolor: "#545454",
      gridwidth: 1
    };
    this.xaxis3 = {
      autorange: true,
      domain: [0.54, 1.0],
      anchor: "y3",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M"
    };
    this.yaxis3 = {
      autorange: true,
      domain: [0.55, 1.0],
      anchor: "x3",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      type: "date",
      tickformat: "%d/%m",
      gridcolor: "#545454",
      gridwidth: 1
    };
    this.xaxis4 = {
      autorange: true,
      domain: [0.54, 1.0],
      anchor: "y4",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M"
    };
    this.yaxis4 = {
      autorange: true,
      domain: [0.0, 0.45],
      anchor: "x4",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      type: "date",
      tickformat: "%d/%m",
      gridcolor: "#545454",
      gridwidth: 1
    };
    this.coloraxis = null;
    this.coloraxis2 = null;
    this.coloraxis3 = null;
    this.coloraxis4 = null;
  }

  createAdvanced() {
    this.title = "Dashboard";
    this.paper_bgcolor = "#1e1e1e"; // dark mode ON
    this.plot_bgcolor = "#3A495B"; // blue from dark mode
    // this.margin = { t: 0, b: 0, l: 0, r: 0 }; // TODO
    this.font = default_font;
    this.xaxis = {
      range: [Date.now() - 3600000 / 12, Date.now()], // timespan now - 2 h
      domain: [0.2, 0.8],
      anchor: "y1",
      zeroline: true,
      visible: false,
      type: "date",
      tickformat: "%H:%M",
      tickmode: "auto",
      nticks: 10,
      match: "x2"
    };
    this.yaxis = {
      range: [0, 40.1], // a small amount added fixes the show-last-line bug
      domain: [0.55, 1.0], // same for image
      anchor: "x1",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      gridcolor: "#1e1e1e",
      gridwidth: 1
    };
    this.xaxis2 = {
      range: [Date.now() - 3600000 / 12, Date.now()], // timespan now - 2 h
      domain: [0.2, 0.8],
      anchor: "y2",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M",
      tickmode: "auto",
      nticks: 10
    };
    this.yaxis2 = {
      title: "",
      range: [0, 5.1],
      domain: [0.0, 0.48],
      anchor: "x2",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      gridcolor: "#1e1e1e",
      gridwidth: 1
    };
    this.xaxis3 = {
      title: "",
      range: [0, 1.1],
      domain: [0.84, 1],
      anchor: "y3",
      tickmode: "linear",
      tickformat: ",.0%",
      tick0: 0,
      dtick: 0.5,
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: false
    };
    this.yaxis3 = {
      range: [0, 40.1],
      domain: [0.55, 1.0],
      anchor: "x3",
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      side: "right"
    };
    this.xaxis4 = {
      title: "",
      range: [0, 1.02],
      domain: [0.84, 1],
      anchor: "y4",
      tickmode: "linear",
      tickformat: ",.0%",
      tick0: 0,
      dtick: 0.5,
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: false,
      showline: true,
      visible: true
    };
    this.yaxis4 = {
      range: [0, 5.1],
      domain: [0, 0.48],
      anchor: "x4",
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      side: "right"
      // tickmode: "array",
      // tickvals: new Array(15).fill(0).map((e, i) => i * 3 + 1),
      // ticktext: new Array(15).fill(0).map((e, i) => `${i * 3} - ${i * 3 + 2}`)
    };
    this.showlegend = false;
    this.legend = {
      x: 0.5,
      y: 0,
      xanchor: "left"
      // orientation: "h"
    };
    this.bargap = 0.05;
    this.bargroupgap = 0.2;
    // this.updatemenus = menus;
    this.annotations = [
      {
        xref: "paper",
        yref: "paper",
        x: 0.075,
        xanchor: "center",
        y: 0.8,
        yanchor: "center",
        text: "",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "#c7c7c7",
        borderwidth: 2,
        borderpad: 4,
        bgcolor: "#ff7f0e",
        opacity: 0.8
      },
      {
        xref: "paper",
        yref: "paper",
        x: 0.075,
        xanchor: "center",
        y: 0.2,
        yanchor: "center",
        text: "",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "#c7c7c7",
        borderwidth: 2,
        borderpad: 4,
        bgcolor: "#ff7f0e",
        opacity: 0.8
      },
      {
        xref: "x2",
        yref: "y",
        x: 0.0,
        xanchor: "right",
        y: 1.0,
        yanchor: "center",
        text: "",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "rgba(231, 244, 89, 1.0)",
        borderwidth: 2,
        borderpad: 10,
        bgcolor: "#3A495B",
        opacity: 0.8
      },
      {
        xref: "x2",
        yref: "y2",
        x: 0.0,
        xanchor: "right",
        y: 1.0,
        yanchor: "center",
        text: "",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "rgba(54, 180, 210, 1.0)",
        borderwidth: 2,
        borderpad: 10,
        bgcolor: "#3A495B",
        opacity: 0.8
      }
    ];
    this.shapes = [
      // average lines
      {
        type: "line",
        xref: "x",
        yref: "y",
        x0: 0,
        y0: 1,
        x1: 1,
        y1: 1,
        line: {
          color: "rgba(231, 244, 89, 1.0)",
          width: 2,
          dash: "dashdot"
        }
      },
      {
        type: "line",
        xref: "x2",
        yref: "y2",
        x0: 0,
        y0: 1,
        x1: 1,
        y1: 1,
        line: {
          color: "rgba(54, 180, 210, 1.0)",
          width: 2,
          dash: "dashdot"
        }
      }
    ];
  }

  createQuadRows() {
    this.title = "Dashboard";
    this.paper_bgcolor = "#1e1e1e"; // dark mode ON
    this.plot_bgcolor = "#3A495B"; // blue from dark mode
    // this.margin = { t: 0, b: 0, l: 0, r: 0 }; // TODO
    this.font = default_font;
    this.xaxis = {
      title: "XAXIS ",
      range: [Date.now() - 3600000 / 12, Date.now()], // timespan now - 2 h
      domain: [0.01, 0.38],
      anchor: "y1",
      zeroline: true,
      visible: false,
      type: "date",
      tickformat: "%H:%M",
      tickmode: "auto",
      nticks: 10,
      match: "x2"
    };
    this.yaxis = {
      range: [0, 40.1], // a small amount added fixes the show-last-line bug
      domain: [0.55, 1.0], // same for image
      anchor: "x1",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      gridcolor: "#1e1e1e",
      gridwidth: 1
    };
    this.xaxis2 = {
      range: [Date.now() - 3600000 / 12, Date.now()], // timespan now - 2 h
      domain: [0.01, 0.38],
      anchor: "y2",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M",
      tickmode: "auto",
      nticks: 10
    };
    this.yaxis2 = {
      title: "",
      range: [0, 5.1],
      domain: [0.0, 0.48],
      anchor: "x2",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      gridcolor: "#1e1e1e",
      gridwidth: 1
    };
    this.xaxis3 = {
      title: "",
      range: [0, 1.1],
      domain: [0.39, 0.47],
      anchor: "y3",
      tickmode: "linear",
      tickformat: ",.0%",
      tick0: 0,
      dtick: 0.5,
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: false
    };
    this.yaxis3 = {
      range: [0, 40.1],
      domain: [0.55, 1.0],
      anchor: "x3",
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      side: "right"
    };
    this.xaxis4 = {
      title: "",
      range: [0, 1.02],
      domain: [0.39, 0.47],
      anchor: "y4",
      tickmode: "linear",
      tickformat: ",.0%",
      tick0: 0,
      dtick: 0.5,
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: false,
      showline: true,
      visible: true
    };
    this.yaxis4 = {
      // title: "XAXIS 4",
      range: [0, 5.1],
      domain: [0, 0.48],
      anchor: "x4",
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      side: "right"
      // tickmode: "array",
      // tickvals: new Array(15).fill(0).map((e, i) => i * 3 + 1),
      // ticktext: new Array(15).fill(0).map((e, i) => `${i * 3} - ${i * 3 + 2}`)
    };
    this.xaxis5 = {
      // title: "XAXIS 5",
      range: [Date.now() - 3600000 / 12, Date.now()], // timespan now - 2 h
      domain: [0.53, 0.9],
      anchor: "y5",
      zeroline: true,
      visible: false,
      type: "date",
      tickformat: "%H:%M",
      tickmode: "auto",
      nticks: 10,
      match: "x6"
    };
    this.yaxis5 = {
      // title: "YAXIS 5",
      range: [0, 40.1], // a small amount added fixes the show-last-line bug
      domain: [0.55, 1.0], // same for image
      anchor: "x5",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      gridcolor: "#1e1e1e",
      gridwidth: 1
    };
    this.xaxis6 = {
      // title: "XAXIS 6",
      range: [Date.now() - 3600000 / 12, Date.now()], // timespan now - 2 h
      domain: [0.53, 0.9],
      anchor: "y6",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M",
      tickmode: "auto",
      nticks: 10
    };
    this.yaxis6 = {
      // title: "YAXIS 6",
      range: [0, 5.1],
      domain: [0.0, 0.48],
      anchor: "x6",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      gridcolor: "#1e1e1e",
      gridwidth: 1
    };
    this.xaxis7 = {
      title: "",
      range: [0, 1.1],
      domain: [0.91, 0.99],
      anchor: "y7",
      tickmode: "linear",
      tickformat: ",.0%",
      tick0: 0,
      dtick: 0.5,
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: false
    };
    this.yaxis7 = {
      range: [0, 40.1],
      domain: [0.55, 1.0],
      anchor: "x7",
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      side: "right"
    };
    this.xaxis8 = {
      title: "",
      range: [0, 1.02],
      domain: [0.91, 0.99],
      anchor: "y8",
      tickmode: "linear",
      tickformat: ",.0%",
      tick0: 0,
      dtick: 0.5,
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: false,
      showline: true,
      visible: true
    };
    this.yaxis8 = {
      range: [0, 5.1],
      domain: [0, 0.48],
      anchor: "x8",
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      side: "right"
    };
    this.showlegend = false;
    this.legend = {
      x: 0.5,
      y: 0,
      xanchor: "left"
      // orientation: "h"
    };
    this.bargap = 0.05;
    this.bargroupgap = 0.2;
    // this.updatemenus = menus;
    this.annotations = [
      {
        xref: "paper",
        yref: "paper",
        x: -0.03,
        xanchor: "center",
        y: 0.8,
        yanchor: "center",
        text: "",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "#c7c7c7",
        borderwidth: 2,
        borderpad: 4,
        bgcolor: "#ff7f0e",
        opacity: 0.8
      },
      {
        xref: "paper",
        yref: "paper",
        x: -0.03,
        xanchor: "center",
        y: 0.2,
        yanchor: "center",
        text: "",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "#c7c7c7",
        borderwidth: 2,
        borderpad: 4,
        bgcolor: "#ff7f0e",
        opacity: 0.8
      },
      {
        xref: "paper",
        yref: "paper",
        x: 1.03,
        xanchor: "center",
        y: 0.8,
        yanchor: "center",
        text: "",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "#c7c7c7",
        borderwidth: 2,
        borderpad: 4,
        bgcolor: "#ff7f0e",
        opacity: 0.8
      },
      {
        xref: "paper",
        yref: "paper",
        x: 1.03,
        xanchor: "center",
        y: 0.2,
        yanchor: "center",
        text: "",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "#c7c7c7",
        borderwidth: 2,
        borderpad: 4,
        bgcolor: "#ff7f0e",
        opacity: 0.8
      }
      // average lines labels
      // {
      //   xref: "x2",
      //   yref: "y",
      //   x: 0.0,
      //   xanchor: "right",
      //   y: 1.0,
      //   yanchor: "center",
      //   text: "",
      //   font: {
      //     family: "raleway",
      //     size: 20,
      //     color: "#ffffff"
      //   },
      //   showarrow: false,
      //   bordercolor: "rgba(231, 244, 89, 1.0)",
      //   borderwidth: 2,
      //   borderpad: 10,
      //   bgcolor: "#3A495B",
      //   opacity: 0.8
      // },
      // {
      //   xref: "x2",
      //   yref: "y2",
      //   x: 0.0,
      //   xanchor: "right",
      //   y: 1.0,
      //   yanchor: "center",
      //   text: "",
      //   font: {
      //     family: "raleway",
      //     size: 20,
      //     color: "#ffffff"
      //   },
      //   showarrow: false,
      //   bordercolor: "rgba(54, 180, 210, 1.0)",
      //   borderwidth: 2,
      //   borderpad: 10,
      //   bgcolor: "#3A495B",
      //   opacity: 0.8
      // }
    ];
    this.shapes = [
      // average lines
      {
        type: "line",
        xref: "x",
        yref: "y",
        x0: 0,
        y0: 1,
        x1: 1,
        y1: 1,
        line: {
          color: "rgba(231, 244, 89, 1.0)",
          width: 2,
          dash: "dashdot"
        }
      },
      {
        type: "line",
        xref: "x2",
        yref: "y2",
        x0: 0,
        y0: 1,
        x1: 1,
        y1: 1,
        line: {
          color: "rgba(54, 180, 210, 1.0)",
          width: 2,
          dash: "dashdot"
        }
      }
    ];
  }

  createAreasMaps(props) {
    this.title = "";
    this.paper_bgcolor = "#405269";
    this.plot_bgcolor = "#405269";
    this.font = default_font;
    this.xaxis = {
      domain: [0, 0.49],
      range: [0, 1],
      showgrid: true,
      zeroline: false,
      visible: false
      // autotick: false,
      // ticks: "outside",
      // tick0: 0,
      // dtick: 0.1
    };
    this.yaxis = {
      domain: [0, 1],
      range: [0, 1],
      showgrid: true,
      zeroline: false,
      visible: false
      // autotick: false,
      // ticks: "outside",
      // tick0: 0,
      // dtick: 0.1
    };
    this.xaxis2 = {
      domain: [0.51, 1],
      range: [0, 1],
      showgrid: true,
      zeroline: false,
      visible: false
      // autotick: false,
      // ticks: "outside",
      // tick0: 0,
      // dtick: 0.1
    };
    this.yaxis2 = {
      domain: [0, 1],
      range: [0, 1],
      showgrid: true,
      zeroline: false,
      visible: false
      // autotick: false,
      // ticks: "outside",
      // tick0: 0,
      // dtick: 0.1
    };
    // this.dragmode = "drawrect";
    // background map
    this.showlegend = false;
    this.images = [
      {
        source: props.mapPaths[0],
        xref: "x",
        yref: "y",
        x: 0,
        y: 0,
        sizex: 1,
        sizey: 1,
        xanchor: "left",
        yanchor: "bottom",
        sizing: "stretch",
        layer: "below"
      },
      {
        source: props.mapPaths[1],
        xref: "x2",
        yref: "y2",
        x: 0,
        y: 0,
        sizex: 1,
        sizey: 1,
        xanchor: "left",
        yanchor: "bottom",
        sizing: "stretch",
        layer: "below"
      }
    ];
    this.shapes = [];
    this.annotations = [
      {
        xref: "paper",
        yref: "paper",
        x: 0.25,
        xanchor: "center",
        y: 1.1,
        yanchor: "center",
        text: "Ground Floor",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "#c7c7c7",
        borderwidth: 2,
        borderpad: 4,
        bgcolor: "#405269",
        opacity: 0.8
      },
      {
        xref: "paper",
        yref: "paper",
        x: 0.75,
        xanchor: "center",
        y: 1.1,
        yanchor: "center",
        text: "First Floor",
        font: {
          family: "raleway",
          size: 20,
          color: "#ffffff"
        },
        showarrow: false,
        bordercolor: "#c7c7c7",
        borderwidth: 2,
        borderpad: 4,
        bgcolor: "#405269",
        opacity: 0.8
      }
    ];

    this.buildShapes(props.areas);
  }

  buildShapes(areas) {
    this.shapes = areas.map(a => {
      return {
        camId: a.id,
        type: "path",
        path: a.path,
        fillcolor: a.color,
        line: {
          color: a.color.slice(0, -4) + "1.0)"
        },
        xref: `x${a.ref}`,
        yref: `x${a.ref}`
      };
    });
  }

  set shapeColor([id, color]) {
    let shape = find(this.shapes, ["camId", id]);

    if (!shape) {
      console.warn("camera ID not found", id);
      return;
    }

    shape.fillcolor = color;
    shape.line.color = color.slice(0, -4) + "1.0)";
  }
}

export class Coloraxis {
  constructor(position, length, colorscale) {
    this.colorbar = {
      x: position.x,
      y: position.y,
      xanchor: "middle",
      yanchor: "middle",
      lenmode: "fraction",
      len: length
    };
    this.colorscale = colorscale;
  }
}
