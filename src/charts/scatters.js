/**
 * SCATTERS TRACES
 */

/**
 * Scatter trace
 */
export class ScatterTrace {
  constructor(xaxisTag, yaxisTag) {
    this.x = [0];
    this.y = [0];
    this.mode = "markers";
    this.type = "scatter";
    this.xaxis = xaxisTag;
    this.yaxis = yaxisTag;
    this.legendgroup = "scatter";
    this.name = "";
    this.markers = {
      color: "rgba(193, 147, 62, 1.0)",
      size: 3
    };
  }
}

/**
 * Line trace
 */
export class LineTrace {
  constructor(xaxisTag, yaxisTag) {
    this.x = [0];
    this.y = [0];
    this.mode = "lines";
    this.type = "scatter";
    this.xaxis = xaxisTag;
    this.yaxis = yaxisTag;
    this.legendgroup = "scatter";
    this.name = "";
    this.line = {
      color: "rgba(193, 147, 62, 1.0)",
      width: 2
    };

    this._color = "rgba(193, 147, 62, 1.0)";
  }

  set _color(color) {
    // this._color = color;
    this.line.color = color;
  }
}
