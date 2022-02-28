import { default_font } from "../utils/defaults";

export class LayoutTimeserie {
  constructor(timeSpan) {
    console.log("timeSpan", timeSpan);
    // general properties
    this.showlegend = false;
    this.legend = {
      x: 0.5,
      y: 0,
      xanchor: "left"
      // orientation: "h"
    };
    this.bargap = 0.05;
    this.bargroupgap = 0.2;
    this.title = "";
    this.paper_bgcolor = "#1e1e1e"; // dark mode ON
    this.plot_bgcolor = "#3A495B"; // blue from dark mode
    this.margin = { t: 30, b: 30, l: 30, r: 30 };
    this.font = default_font;
    // this.xaxis = new TimeAxis(
    //   [Date.now() - 3600000 / 12, Date.now()],
    //   [0, 0.8],
    //   "y",
    // );
    // this.yaxis = new BaseAxis([0, 1.1], [0.0, 1.0], "x1", "left"); // a small amount added to range fixes the show-last-line bug
    // this.xaxis2 = new PercentageAxis([0, 1.1], [0.82, 1], "y2");
    // this.yaxis2 = new BaseAxis([0, 1.1], [0.0, 1.0], "x2", "right");
    this.xaxis = {
      title: "",
      range: [Date.now() - timeSpan, Date.now()],
      domain: [0, 0.8],
      anchor: "y1",
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M",
      tickmode: "auto",
      nticks: 10
    };
    this.yaxis = {
      title: "",
      range: [0, 1.1], // a small amount added fixes the show-last-line bug
      domain: [0.0, 1.0],
      anchor: "x1",
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      tickmode: "auto",
      nticks: 10
    };
    this.xaxis2 = {
      title: "",
      range: [0, 1.1],
      domain: [0.82, 1],
      anchor: "y2",
      tickmode: "linear",
      tickformat: ",.0%",
      tick0: 0,
      dtick: 0.5,
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true
    };
    this.yaxis2 = {
      range: [0, 1.1],
      domain: [0, 1.0],
      anchor: "x2",
      gridcolor: "#1e1e1e",
      gridwidth: 1,
      zeroline: true,
      showgrid: true,
      showline: true,
      visible: true,
      side: "right",
      tickmode: "auto",
      nticks: 10
    };
    // annotations: title
    this.annotations = [
      {
        _tag: "title",
        xref: "paper",
        yref: "paper",
        x: 0.4,
        xanchor: "center",
        y: 1.06,
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
    ];
  }
}
