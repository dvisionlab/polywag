import { groupBy, zipWith, toArray, map } from "lodash";

// const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function arraysToDateTimeMatrix(data) {
  let zip = zipWith(data.timestamp, data.value, (t, v) => {
    return { ts: Date.parse(t), value: v };
  });
  let grouped = groupBy(zip, p => {
    // return weekDays[new Date(p.ts).getDay()];
    // return new Date(p.ts).getDate();
    return new Date(p.ts).toDateString();
  });

  let flat = toArray(grouped);

  let lengths = flat.map(e => e.length);
  let longest = lengths.indexOf(Math.max.apply(Math, lengths));

  // TODO insert empty arrays in missing days

  let matrixData = {
    timeKeys: map(flat[longest], "ts"),
    dateKeys: Object.keys(grouped).map(d => Date.parse(d)),
    values: flat.map(f => map(f, "value"))
  };

  return matrixData;
}
