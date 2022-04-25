(function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();import "core-js/modules/es.string.replace.js";var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;};



















export const SEPARATOR = ' : ';

export const buildTimeRangeString = (since, until) =>
`${since}${SEPARATOR}${until}`;

const formatDateEndpoint = (dttm, isStart) =>
dttm.replace('T00:00:00', '') || (isStart ? '-∞' : '∞');

export const formatTimeRange = (
timeRange,
endpoints) =>
{
  const splitDateRange = timeRange.split(SEPARATOR);
  if (splitDateRange.length === 1) return timeRange;
  const formattedEndpoints = (endpoints || ['unknown', 'unknown']).map(
  (endpoint) => endpoint === 'inclusive' ? '≤' : '<');


  return `${formatDateEndpoint(splitDateRange[0], true)} ${
  formattedEndpoints[0]
  } col ${formattedEndpoints[1]} ${formatDateEndpoint(splitDateRange[1])}`;
};;(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(SEPARATOR, "SEPARATOR", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateFilterUtils.ts");reactHotLoader.register(buildTimeRangeString, "buildTimeRangeString", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateFilterUtils.ts");reactHotLoader.register(formatDateEndpoint, "formatDateEndpoint", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateFilterUtils.ts");reactHotLoader.register(formatTimeRange, "formatTimeRange", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateFilterUtils.ts");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();