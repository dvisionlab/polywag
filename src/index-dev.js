// dev
import { TimeserieComponent } from "../index";

// testing the build
// import * as plw from "../dist/polywag";
// console.log(plw.TimeserieComponent);

const ELEMENTS = 10;
const msPerMin = 60000;
const minPerHours = 60;

let data = {
  value: new Array(ELEMENTS).fill(0).map((e, i) => i * Math.random()),
  timestamp: new Array(ELEMENTS)
    .fill(0)
    .map((e, i) => Date.now() - 1 * minPerHours * msPerMin * i)
    .reverse()
};

console.log(
  "initial data ts",
  data.timestamp.map(t => new Date(t))
);

let hm = new TimeserieComponent("chart-container", {
  title: "A chart",
  color: "Viridis",
  axisSpan: 5 * minPerHours * msPerMin
});

hm.update(data);

let id = setInterval(() => {
  let newValue = Math.random() * 10;
  let newTime = data.timestamp[data.timestamp.length - 1] + 20 * msPerMin;

  data.value.push(newValue);
  data.timestamp.push(newTime);

  hm.update(data);
}, 2000);

// stop after some iterations
// setTimeout(clearInterval, 50000, id);
