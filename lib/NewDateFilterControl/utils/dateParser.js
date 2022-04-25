(function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;}; /**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import moment from 'moment';






import { SEPARATOR } from './dateFilterUtils';
import { MOMENT_FORMAT } from './constants';

/**
 * RegExp to test a string for a full ISO 8601 Date
 * Does not do any sort of date validation, only checks if the string is according to the ISO 8601 spec.
 *  YYYY-MM-DDThh:mm:ss
 *  YYYY-MM-DDThh:mm:ssTZD
 *  YYYY-MM-DDThh:mm:ss.sTZD
 * @see: https://www.w3.org/TR/NOTE-datetime
 */
const iso8601 = String.raw`\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:(?:[+-]\d\d:\d\d)|Z)?`;
const datetimeConstant = String.raw`TODAY|NOW`;
const grainValue = String.raw`[+-]?[1-9][0-9]*`;
const grain = String.raw`YEAR|QUARTER|MONTH|WEEK|DAY|HOUR|MINUTE|SECOND`;
const CUSTOM_RANGE_EXPRESSION = RegExp(
String.raw`^DATEADD\(DATETIME\("(${iso8601}|${datetimeConstant})"\),\s(${grainValue}),\s(${grain})\)$`,
'i');

export const ISO8601_AND_CONSTANT = RegExp(
String.raw`^${iso8601}$|^${datetimeConstant}$`,
'i');

const DATETIME_CONSTANT = ['now', 'today'];
const defaultCustomRange = {
  sinceDatetime: moment().subtract(7, 'd').format('YYYY-MM-DD[T]00:00:00'),
  sinceMode: 'specific',
  sinceGrain: 'day',
  sinceGrainValue: -7,
  untilDatetime: moment().format('YYYY-MM-DD[T]23:59:59'),
  untilMode: 'specific',
  untilGrain: 'day',
  untilGrainValue: 7,
  anchorMode: 'now',
  anchorValue: 'now' };

const SPECIFIC_MODE = ['specific', 'today', 'now'];

export const dttmToMoment = (dttm) => {
  if (dttm === 'now') {
    return moment().utc().startOf('second');
  }
  if (dttm === 'today') {
    return moment().utc().startOf('day');
  }
  return moment(dttm);
};

export const dttmToString = (dttm) =>
dttmToMoment(dttm).format(MOMENT_FORMAT);

export const customTimeRangeDecode = (
timeRange) =>
{
  const splitDateRange = timeRange.split(SEPARATOR);

  if (splitDateRange.length === 2) {
    const [since, until] = splitDateRange;

    // specific : specific
    if (ISO8601_AND_CONSTANT.test(since) && ISO8601_AND_CONSTANT.test(until)) {
      const sinceMode =
      DATETIME_CONSTANT.includes(since) ? since : 'specific';

      const untilMode =
      DATETIME_CONSTANT.includes(until) ? until : 'specific';

      return {
        customRange: {
          ...defaultCustomRange,
          sinceDatetime: since,
          untilDatetime: until,
          sinceMode,
          untilMode },

        matchedFlag: true };

    }

    // relative : specific
    const sinceCapturedGroup = since.match(CUSTOM_RANGE_EXPRESSION);
    if (
    sinceCapturedGroup &&
    ISO8601_AND_CONSTANT.test(until) &&
    since.includes(until))
    {
      const [dttm, grainValue, grain] = sinceCapturedGroup.slice(1);
      const untilMode =
      DATETIME_CONSTANT.includes(until) ? until : 'specific';

      return {
        customRange: {
          ...defaultCustomRange,
          sinceGrain: grain,
          sinceGrainValue: parseInt(grainValue, 10),
          sinceDatetime: dttm,
          untilDatetime: dttm,
          sinceMode: 'relative',
          untilMode },

        matchedFlag: true };

    }

    // specific : relative
    const untilCapturedGroup = until.match(CUSTOM_RANGE_EXPRESSION);
    if (
    ISO8601_AND_CONSTANT.test(since) &&
    untilCapturedGroup &&
    until.includes(since))
    {
      const [dttm, grainValue, grain] = [...untilCapturedGroup.slice(1)];
      const sinceMode =
      DATETIME_CONSTANT.includes(since) ? since : 'specific';

      return {
        customRange: {
          ...defaultCustomRange,
          untilGrain: grain,
          untilGrainValue: parseInt(grainValue, 10),
          sinceDatetime: dttm,
          untilDatetime: dttm,
          untilMode: 'relative',
          sinceMode },

        matchedFlag: true };

    }

    // relative : relative
    if (sinceCapturedGroup && untilCapturedGroup) {
      const [sinceDttm, sinceGrainValue, sinceGrain] = [
      ...sinceCapturedGroup.slice(1)];

      const [untileDttm, untilGrainValue, untilGrain] = [
      ...untilCapturedGroup.slice(1)];

      if (sinceDttm === untileDttm) {
        return {
          customRange: {
            ...defaultCustomRange,
            sinceGrain: sinceGrain,
            sinceGrainValue: parseInt(sinceGrainValue, 10),
            sinceDatetime: sinceDttm,
            untilGrain: untilGrain,
            untilGrainValue: parseInt(untilGrainValue, 10),
            untilDatetime: untileDttm,
            anchorValue: sinceDttm,
            sinceMode: 'relative',
            untilMode: 'relative',
            anchorMode: sinceDttm === 'now' ? 'now' : 'specific' },

          matchedFlag: true };

      }
    }
  }

  return {
    customRange: defaultCustomRange,
    matchedFlag: false };

};

export const customTimeRangeEncode = (customRange) => {
  const {
    sinceDatetime,
    sinceMode,
    sinceGrain,
    sinceGrainValue,
    untilDatetime,
    untilMode,
    untilGrain,
    untilGrainValue,
    anchorValue } =
  { ...customRange };
  // specific : specific
  if (SPECIFIC_MODE.includes(sinceMode) && SPECIFIC_MODE.includes(untilMode)) {
    const since =
    sinceMode === 'specific' ? dttmToString(sinceDatetime) : sinceMode;
    const until =
    untilMode === 'specific' ? dttmToString(untilDatetime) : untilMode;
    return `${since} : ${until}`;
  }

  // specific : relative
  if (SPECIFIC_MODE.includes(sinceMode) && untilMode === 'relative') {
    const since =
    sinceMode === 'specific' ? dttmToString(sinceDatetime) : sinceMode;
    const until = `DATEADD(DATETIME("${since}"), ${untilGrainValue}, ${untilGrain})`;
    return `${since} : ${until}`;
  }

  // relative : specific
  if (sinceMode === 'relative' && SPECIFIC_MODE.includes(untilMode)) {
    const until =
    untilMode === 'specific' ? dttmToString(untilDatetime) : untilMode;
    const since = `DATEADD(DATETIME("${until}"), ${-Math.abs(
    sinceGrainValue)
    }, ${sinceGrain})`;
    return `${since} : ${until}`;
  }

  // relative : relative
  const since = `DATEADD(DATETIME("${anchorValue}"), ${-Math.abs(
  sinceGrainValue)
  }, ${sinceGrain})`;
  const until = `DATEADD(DATETIME("${anchorValue}"), ${untilGrainValue}, ${untilGrain})`;
  return `${since} : ${until}`;
};;(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(iso8601, "iso8601", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(datetimeConstant, "datetimeConstant", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(grainValue, "grainValue", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(grain, "grain", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(CUSTOM_RANGE_EXPRESSION, "CUSTOM_RANGE_EXPRESSION", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(ISO8601_AND_CONSTANT, "ISO8601_AND_CONSTANT", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(DATETIME_CONSTANT, "DATETIME_CONSTANT", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(defaultCustomRange, "defaultCustomRange", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(SPECIFIC_MODE, "SPECIFIC_MODE", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(dttmToMoment, "dttmToMoment", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(dttmToString, "dttmToString", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(customTimeRangeDecode, "customTimeRangeDecode", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");reactHotLoader.register(customTimeRangeEncode, "customTimeRangeEncode", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/utils/dateParser.ts");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();