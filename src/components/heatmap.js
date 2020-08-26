import Plotly from "plotly.js-dist";
import { find } from "lodash";

import { LayoutSingle } from "../layouts/LayoutSingle.js";
import { HeatmapTrace } from "../charts/heatmaps.js";
import { arraysToDateTimeMatrix } from "../utils/reshape.js";

/**
 * Heatmap component, composed by
 * a single chart with hours vs days values
 */
export class HeatmapComponent {
  /**
   * Create a heatmap component.
   * @param {String} divId - The id of the target div.
   * @param {Object} config - The config object.
   */
  constructor(divId, config) {
    this.divId = divId;
    this.data = [];
    this.layout = new LayoutSingle();
    this.heatmapchart = new HeatmapTrace("x", "y");
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
    // set title
    this.setupTitle();
    // spread colors
    this.layout._color = this.color;

    Plotly.newPlot(
      this.divId,
      [this.heatmapchart],
      this.layout,
      this.plotlyConfiguration
    );
  }

  /**
   * Setup the chart title as plotly annotation.
   * @private
   */
  setupTitle() {
    this.layout._title = this.title;
    let titleAnnotation = find(this.layout.annotations, ["_tag", "title"]);
    titleAnnotation.bgcolor = this.color.includes("rgba")
      ? this.color
      : "rgba(231, 244, 89, 0.7)";
    titleAnnotation.bordercolor = this.color.includes("rgba")
      ? this.color
      : "rgba(231, 244, 89, 0.7)";
    titleAnnotation.font.color = "#1e1e1e";
  }

  /**
   * Update component.
   * @param {Array} data - Input data
   */
  update(data) {
    // update values
    let matrix = arraysToDateTimeMatrix(data);
    this.heatmapchart.x = matrix.timeKeys;
    this.heatmapchart.y = matrix.dateKeys;
    this.heatmapchart.z = matrix.values;

    //update render
    Plotly.react(
      this.divId,
      [this.heatmapchart],
      this.layout,
      this.plotlyConfiguration
    );
  }
}
