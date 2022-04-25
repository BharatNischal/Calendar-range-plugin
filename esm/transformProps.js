(function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;};


















import { DEFAULT_FORM_DATA } from './types';

export default function transformProps(chartProps) {
  const {
    formData,
    height,
    hooks,
    queriesData,
    width,
    behaviors,
    filterState } =
  chartProps;
  const {
    setDataMask = () => {},
    setFocusedFilter = () => {},
    unsetFocusedFilter = () => {} } =
  hooks;
  const { data } = queriesData[0];

  return {
    data,
    filterState,
    formData: {
      ...DEFAULT_FORM_DATA,
      ...formData },

    height,
    behaviors,
    setDataMask,
    setFocusedFilter,
    unsetFocusedFilter,
    width };

};(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(transformProps, "transformProps", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/transformProps.ts");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();