// dev
import { TimeserieComponent } from "../index";

// testing the build
// import * as plw from "../dist/polywag";
// console.log(plw.TimeserieComponent);

let data = {
  value: [1, 2, 3, 4, 5],
  timestamp: [
    1598368228264, 1598368240796, 1598368248441, 1598368256295, 1598368263938
  ]
};

let hm = new plw.TimeserieComponent("chart-container", {
  title: "A chart",
  color: "Viridis"
});

hm.update(data);
