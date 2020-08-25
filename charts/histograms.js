/**
 * Histogram Trace
 */
export class HistogramTrace {
  constructor(xaxisTag, yaxisTag, orientation = "v") {
    this.title = "";
    this.x = [];
    this.type = "histogram";
    this.orientation = orientation;
    this.histnorm = "probability";
    this.xaxis = xaxisTag;
    this.yaxis = yaxisTag;
    this.legendgroup = "scatter";
    this.marker = {
      color: "rgba(62, 108, 193, 0.7)",
      line: {
        color: "rgba(62, 108, 193, 1.0)",
        width: 2
      }
    };
    this.name = "";

    this._color = "rgba(62, 108, 193, 0.7)";
  }

  set _color(c) {
    this.marker.color = c;
    // if rgba set border to full opacity
    if (c.includes("rgba")) {
      this.marker.line.color = c.slice(0, -4) + "1.0)";
    } else {
      this.marker.line.color = c;
    }
  }
}
