/**
 * HEATMAPS traces
 */

/**
 * 2D Histogram Trace
 */
export class Hist2dTrace {
  constructor(xaxisTag, yaxisTag) {
    this.title = "";
    this.x = [];
    this.y = [];
    this.name = "density";
    this.ncontours = 100;
    this.colorscale = "Viridis";
    this.reversescale = true;
    this.showscale = false;
    this.type = "histogram2dcontour";
    this.opacity = 0.3;
    this.legendgroup = "heatmap";
    this.xaxis = xaxisTag;
    this.yaxis = yaxisTag;
    this.xbins = {
      start: -5,
      end: 105,
      size: 10
    };
    this.ybins = {
      start: -5,
      end: 105,
      size: 10
    };
    this.contours = {
      showlines: false
    };
  }
}

/**
 * Heatmap Trace
 */
export class HeatmapTrace {
  constructor(xaxisTag, yaxisTag) {
    this.title = "";
    this.x = [];
    this.y = [];
    this.z = [];
    this.colorscale = "Heat";
    this.reversescale = false;
    this.showscale = true;
    this.coloraxis = "coloraxis";
    this.type = "heatmap";
    this.opacity = 0.8;
    this.legendgroup = "heatmap";
    this.xaxis = xaxisTag;
    this.yaxis = yaxisTag;
    this.ygap = 1;
  }
}
