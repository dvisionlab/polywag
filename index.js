import {
  initDashboard,
  refreshDashboard
} from "./src/dashboards/dashboard_quadrows";
import { initMaps, refreshMaps } from "./src/dashboards/dashboard_maps";
import { initStats, refreshStats } from "./src/dashboards/dashboard_hm";
import { TimeserieComponent } from "./src/components/timeserie";
import { HeatmapComponent } from "./src/components/heatmap";

const bindingFunctions = {
  dashboard: {
    init: initDashboard,
    refresh: refreshDashboard
  },
  maps: {
    init: initMaps,
    refresh: refreshMaps
  },
  stats: {
    init: initStats,
    refresh: refreshStats
  }
};

function initCharts(divId, type, data) {
  return bindingFunctions[type]["init"](divId, data);
}

function refreshCharts(divId, type, data) {
  return bindingFunctions[type]["refresh"](divId, data);
}

export {
  initCharts,
  refreshCharts,
  initMaps,
  refreshMaps,
  TimeserieComponent,
  HeatmapComponent
};
