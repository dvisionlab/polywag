import {
  initDashboard,
  refreshDashboard
} from "./dashboards/dashboard_quadrows";
import { initMaps, refreshMaps } from "./dashboards/dashboard_maps";
import { initStats, refreshStats } from "./dashboards/dashboard_hm";
import { TimeserieComponent } from "./components/timeserie";
import { HeatmapComponent } from "./components/heatmap";

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
