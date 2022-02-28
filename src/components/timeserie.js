import Plotly from "plotly.js-dist";
import { find } from "lodash";

import { LayoutTimeserie } from "../layouts/LayoutTimeserie.js";
import { LineTrace } from "../charts/scatters.js";
import { CardTrace } from "../charts/indicators.js";
import { HistogramTrace } from "../charts/histograms.js";

/**
 * Timeserie component, composed by
 * a linechart, an histogram, a numeric label with
 * last datapoint and a trend arrow
 */
export class TimeserieComponent {
  /**
   * Create a timeserie component.
   * @param {String} divId - The id of the target div.
   * @param {Object} config - The config object.
   */
  constructor(divId, config) {
    this.divId = divId;
    this.data = [];
    this.layout = new LayoutTimeserie(config.axisSpan);
    this.labelchart = new CardTrace();
    this.linechart = new LineTrace("x1", "y1");
    this.histchart = new HistogramTrace("x2", "y2", "h");

    this.axisSpan = config.axisSpan ? config.axisSpan : null; // axis span in ms
    this.color =
      config && config.color ? config.color : "rgba(231, 244, 89, 0.7)";
    this.title = config && config.title ? config.title : "";
    this.reverseIndicator = config && config.reverse ? config.reverse : false;

    this.plotlyConfiguration = {
      responsive: true,
      displayModeBar: false,
      hovermode: "closest",
      scrollZoom: false
    };

    this.initialize();
  }

  /**
   * Initialize the component.
   * @private
   */
  initialize() {
    // bind label to line chart axis
    this.labelchart.bindTo(this.layout.xaxis, this.layout.yaxis);
    // specify histogram number of bins
    this.histchart.ybins = {
      size: null
    };
    // specify reverse colorscale for indicator
    if (this.reverseIndicator) {
      this.labelchart.colorScale = "reverse";
    }
    // spread colors
    this.linechart._color = this.color;
    this.histchart._color = this.color;
    // set title
    this.setupTitle();

    Plotly.newPlot(
      this.divId,
      [this.linechart, this.histchart, this.labelchart],
      this.layout,
      this.plotlyConfiguration
    );
  }

  /**
   * Setup the chart title as plotly annotation.
   * @private
   */
  setupTitle() {
    let titleAnnotation = find(this.layout.annotations, ["_tag", "title"]);
    titleAnnotation.bgcolor = this.color;
    titleAnnotation.bordercolor = this.color;
    titleAnnotation.text = this.title;
    titleAnnotation.font.color = "#1e1e1e";
  }

  /**
   * Utility function to compute the number of bins that best fit the input data.
   * @private
   */
  computeBestNumberOfBins() {
    let min = Math.min(...this.data.value);
    let max = Math.max(...this.data.value);
    let size = Math.ceil((max - min) / 10);
    let final = size > 1 ? size : size / 5;
    return final;
  }

  /**
   * Update component.
   * @param {Array} data - Input data
   */
  update(data) {
    // store
    this.data = data;
    // if not set, compute bins
    this.histchart.ybins.size = this.histchart.ybins.size
      ? this.histchart.ybins.size
      : this.computeBestNumberOfBins();
    // update line chart (parse data if not a timestamp)
    this.linechart.x =
      typeof data.timestamp[0] === "number"
        ? data.timestamp
        : data.timestamp.map(t => Date.parse(t));

    // FIXME why 2 equal ts at the end ?
    console.log(
      this.linechart.x[this.linechart.x.length - 1] -
        this.linechart.x[this.linechart.x.length - 2]
    );

    this.linechart.y = data.value;
    // update hist chart
    this.histchart.x = data.value;
    this.histchart.y = data.value;
    //update indicators
    this.labelchart.valuesArray = data.value;
    // update axis
    this.scrollXaxis();
    this.resizeYaxis();
    //update render
    Plotly.react(
      this.divId,
      [this.linechart, this.histchart, this.labelchart],
      this.layout,
      this.plotlyConfiguration
    );
  }

  /**
   * Resize Y axis based on input data.
   * @private
   */
  resizeYaxis() {
    let seriesData = this.data;
    let datalength = seriesData.value.length;

    let subseries = [seriesData].map(arr =>
      arr.value.slice(datalength - this.axisSpan + 1)
    );
    let subseriesMaxValue = Math.max(...subseries.map(arr => Math.max(...arr)));
    let subseriesMinValue = Math.max(...subseries.map(arr => Math.min(...arr)));
    let delta = subseriesMaxValue - subseriesMinValue;

    let newRange = [
      Math.floor(subseriesMinValue - delta / 10),
      Math.ceil(subseriesMaxValue + delta / 10)
    ];

    // apply
    ["yaxis", "yaxis2"].map(tag => {
      this.layout[tag].range = newRange;
    });
  }

  /**
   * Scroll X axis to show only last data, based on dataSpan value.
   * @private
   */
  scrollXaxis() {
    // Make x axis scrolling
    let datalength = this.data.value.length;
    let dataSpan =
      new Date(this.data.timestamp[datalength - 1]) -
      new Date(this.data.timestamp[0]);
    if (Math.abs(dataSpan) > this.axisSpan) {
      let end = this.data.timestamp[datalength - 1];
      let start = end - this.axisSpan;
      this.layout.xaxis.range = [start, end];
    }
  }
}
