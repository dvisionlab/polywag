/**
 * AXIS classes
 */

// TODO unused for the moment because classes does non work with axis in plotly...
// ...except for Color Axis...
// we need to implement a workaround (see line 81 for an example)

/**
 * Base axis
 */
export class BaseAxis {
  /**
   * Create an axis with basic properties.
   * @param {Array} range - Axis range [min, max]
   * @param {Array} domain - Axis position in the div [min, max]
   * @param {String} anchor - Anchor axis (eg. 'x1', 'y1', ...)
   * @param {String} side - Axis side ('left', 'right')
   */
  constructor(range, domain, anchor, side) {
    this.title = "";
    this.autorange = range ? false : true;
    this.range = range;
    this.domain = domain ? domain : [0, 1];
    this.anchor = anchor;
    this.side = side;
    this.zeroline = true;
    this.visible = true;
    this.showline = true;
    this.tickmode = "auto";
    this.nticks = 10;
    this.gridcolor = "#1e1e1e";
    this.gridwidth = 1;
  }
}

/**
 * Percentage axis
 */
export class PercentageAxis {
  constructor(range, domain, anchor, side) {
    this.title = "";
    this.autorange = range ? false : true;
    this.range = range;
    this.domain = domain ? domain : [0, 1];
    this.anchor = anchor;
    this.side = side;
    this.zeroline = true;
    this.visible = true;
    this.showline = true;
    this.gridcolor = "#1e1e1e";
    this.gridwidth = 1;
    this.tickmode = "linear";
    this.tickformat = ",.0%";
    this.tick0 = 0;
    this.dtick = 0.5;
    console.log(this);
  }
}

/**
 * Time axis
 */
export class TimeAxis {
  constructor(range, domain, anchor, side) {
    this.title = "";
    this.autorange = range ? false : true;
    this.range = range;
    this.domain = domain ? domain : [0, 1];
    this.anchor = anchor;
    this.side = side;
    this.zeroline = true;
    this.visible = true;
    this.type = "date";
    this.tickformat = "%H:%M";
    this.tickmode = "auto";
    this.nticks = 10;
    console.log(this, side);
  }

  static object(range, domain, anchor, side) {
    return {
      title: "",
      autorange: range ? false : true,
      range: range,
      domain: domain ? domain : [0, 1],
      anchor: anchor,
      side: side,
      zeroline: true,
      visible: true,
      type: "date",
      tickformat: "%H:%M",
      tickmode: "auto",
      nticks: 10
    };
  }
}

/**
 * Date axis
 */
export class DateAxis {
  constructor(range, domain, anchor, side) {
    this.autorange = range ? false : true;
    this.range = range;
    this.domain = domain ? domain : [0, 0.95];
    this.anchor = anchor;
    this.side = side;
    this.zeroline = true;
    this.showgrid = true;
    this.showline = true;
    this.visible = true;
    this.type = "date";
    this.tickformat = "%d/%m";
    this.gridcolor = "#545454";
    this.gridwidth = 1;
  }
}

/**
 * Color axis
 */
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
    this.colorscale =
      colorscale && colorscale.includes("rgba")
        ? this.generateColorScale(colorscale)
        : colorscale;
  }

  generateColorScale(color) {
    let colorscale = [
      ["0.0", "rgba(0, 0, 0, 1)"],
      ["0.5", color],
      ["1.0", "rgba(255, 255, 255, 1)"]
    ];
    console.log(colorscale);
    return colorscale;
  }
}
