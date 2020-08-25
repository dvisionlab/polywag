/**
 * INDICATORS TRACES
 */

/**
 * Gauge Trace
 */
export class GaugeTrace {
  constructor() {
    this.title = "";
    this.type = "indicator";
    this.mode = "gauge+number";
    this.value = 0;
    this.delta = { reference: null };
    this.gauge = {
      bar: { color: "green" },
      axis: { visible: true, range: [0, 0] },
      steps: [
        { range: [0, 0], color: "lightgrey" },
        { range: [0, 0], color: "darkgrey" },
        { range: [0, 0], color: "grey" }
      ]
    };
    this.domain = { x: [0.55, 0.8], y: [0.55, 1] };

    // Internal variables
    this._trafficLight = null;
  }

  set range(borders) {
    this.gauge.axis.range = borders;
  }

  set valuesArray(data) {
    let last = data.slice(-1).pop();
    this.value = last;

    if (this._trafficLight) {
      if (last <= this._trafficLight.yellowTreshold) {
        this.gauge.bar.color = "green";
      } else if (last > this._trafficLight.redTreshold) {
        this.gauge.bar.color = "red";
      } else {
        this.gauge.bar.color = "yellow";
      }
    }
  }

  bindTo(xaxis, yaxis) {
    let _x1 = xaxis.domain[0];
    let _x2 = xaxis.domain[1];
    let _y1 = yaxis.domain[0];
    let _y2 = yaxis.domain[1];

    let dx = _x2 - _x1;
    let dy = _y2 - _y1;

    let reduction = 10;

    this.domain.x = [_x1 + dx / reduction, _x2 - dx / reduction];
    this.domain.y = [_y1 + dy / reduction, _y2 - dy / reduction];
  }

  set trafficLight(tresholds) {
    this._trafficLight = {};
    this._trafficLight.yellowTreshold = tresholds[0];
    this._trafficLight.redTreshold = tresholds[1];
  }

  set barSteps(steps) {
    let min = this.gauge.axis.range[0];
    let max = this.gauge.axis.range[1];
    this.gauge.steps[0].range = [min, steps[0]];
    this.gauge.steps[1].range = [steps[0], steps[1]];
    this.gauge.steps[2].range = [steps[1], max];
  }
}

/**
 * Card Trace
 */
export class CardTrace {
  constructor() {
    this.title = "";
    this.type = "indicator";
    this.mode = "number+delta";
    this.value = 0;
    this.number = { suffix: null };
    this.delta = {
      position: null,
      reference: null,
      increasing: null,
      decreasing: null
    };
    this.domain = { x: [0, 1], y: [0, 1] };
  }

  set valuesArray(data) {
    let last = data.slice(-1).pop();
    let previous = data.slice(-2, -1).pop();
    this.value = last;
    this.delta.reference = previous;
  }

  set colorScale(type) {
    if (type == "reverse") {
      this.delta = {
        position: "bottom",
        reference: 0,
        increasing: { color: "#FF4136" },
        decreasing: { color: "#3D9970" }
      };
    } else {
      // let default
    }
  }

  bindTo(xaxis, yaxis) {
    let _x1 = xaxis.domain[0];
    let _x2 = xaxis.domain[1];
    let _y1 = 0.8 * yaxis.domain[0];
    let _y2 = 0.8 * yaxis.domain[1];

    let dx = _x2 - _x1;
    let dy = _y2 - _y1;

    let reduction = 10;

    this.domain.x = [_x1 + dx / reduction, _x2 - dx / reduction];
    this.domain.y = [_y1 + dy / reduction, _y2 - dy / reduction];
  }
}
