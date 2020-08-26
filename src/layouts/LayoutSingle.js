import { find } from "lodash";

import { default_font } from "../utils/defaults";
import { Coloraxis, TimeAxis } from "../common/axis";

export class LayoutSingle {
  constructor() {
    // general properties
    this.showlegend = false;
    this.legend = {
      x: 0.5,
      y: 0,
      xanchor: "left"
      // orientation: "h"
    };
    this.title = "";
    this.paper_bgcolor = "#1e1e1e"; // dark mode ON
    this.plot_bgcolor = "#3A495B"; // blue from dark mode
    this.margin = { t: 30, b: 30, l: 50, r: 30 };
    this.font = default_font;
    this.xaxis = TimeAxis.object();
    this.yaxis = {
      autorange: true,
      domain: [0, 0.95],
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
    // annotations: title
    this.annotations = [
      {
        _tag: "title",
        xref: "paper",
        yref: "paper",
        x: 0.5,
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
        opacity: 0.8,
        visible: false
      }
    ];

    this._title = "";
    this._color = "Viridis";

    // color axis
    this.coloraxis = new Coloraxis({ x: null, y: 0.475 }, 1, this._color);

    console.log(this);
  }

  set _title(title) {
    if (title !== "") {
      //   this.title = title;
      let titleAnnotation = find(this.annotations, ["_tag", "title"]);
      titleAnnotation.text = title;
      titleAnnotation.visible = true;
    } else {
      //   this.title = title;
      let titleAnnotation = find(this.annotations, ["_tag", "title"]);
      titleAnnotation.text = title;
      titleAnnotation.visible = false;
    }
  }

  set _color(color) {
    // color axis
    this.coloraxis = new Coloraxis({ x: null, y: 0.475 }, 1, color);
  }
}
