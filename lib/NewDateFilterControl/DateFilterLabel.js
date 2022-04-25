import _extends from "@babel/runtime-corejs3/helpers/extends";import _pt from "prop-types";(function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;}; /**
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
import React, { useState, useEffect, useMemo } from 'react';
import rison from 'rison';
import {
SupersetClient,
styled,
t,

useTheme } from
'@superset-ui/core';
import { buildTimeRangeString, formatTimeRange } from './utils';
import { getClientErrorObject } from 'src/utils/getClientErrorObject';
import Button from 'src/components/Button';
import ControlHeader from 'src/explore/components/ControlHeader';
import Label from 'src/components/Label';
import Popover from 'src/components/Popover';
import { Divider } from 'src/common/components';
import Icons from 'src/components/Icons';
import { Tooltip } from 'src/components/Tooltip';
import { DEFAULT_TIME_RANGE, NO_TIME_RANGE } from 'src/explore/constants';
import { useDebouncedEffect } from 'src/explore/exploreUtils';
import { SLOW_DEBOUNCE } from 'src/constants';
import { testWithId } from 'src/utils/testUtils';


import { CustomFrame } from './components';
import moment from 'moment';import { jsx as ___EmotionJSX } from "@emotion/react";

const guessFrame = (timeRange) => {
  if (timeRange === 'No filter') {
    return 'No filter';
  }
  return 'Custom';
};

const fetchTimeRange = async (
timeRange,
endpoints) =>
{
  const query = rison.encode(timeRange);
  const endpoint = `/api/v1/time_range/?q=${query}`;
  try {var _response$json, _response$json$result, _response$json2, _response$json2$resul;
    const response = await SupersetClient.get({ endpoint });
    const timeRangeString = buildTimeRangeString(
    (response == null ? void 0 : (_response$json = response.json) == null ? void 0 : (_response$json$result = _response$json.result) == null ? void 0 : _response$json$result.since) || '',
    (response == null ? void 0 : (_response$json2 = response.json) == null ? void 0 : (_response$json2$resul = _response$json2.result) == null ? void 0 : _response$json2$resul.until) || '');

    return {
      value: formatTimeRange(timeRangeString, endpoints) };

  } catch (response) {
    const clientError = await getClientErrorObject(response);
    return {
      error: clientError.message || clientError.error };

  }
};

const StyledPopover = styled(Popover)``;

const ContentStyleWrapper = styled.div`
  .ant-row {
    margin-top: 8px;
  }

  .ant-input-number {
    width: 100%;
  }

  .ant-picker {
    padding: 4px 17px 4px;
    border-radius: 4px;
    width: 100%;
  }

  .ant-divider-horizontal {
    margin: 16px 0;
  }

  .control-label {
    font-size: 11px;
    font-weight: 500;
    color: #b2b2b2;
    line-height: 16px;
    text-transform: uppercase;
    margin: 8px 0;
  }

  .vertical-radio {
    display: block;
    height: 40px;
    line-height: 40px;
  }

  .section-title {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    margin-bottom: 8px;
  }

  .control-anchor-to {
    margin-top: 16px;
  }

  .control-anchor-to-datetime {
    width: 217px;
  }

  .footer {
    text-align: right;
  }
`;

const IconWrapper = styled.span`
  span {
    margin-right: ${({ theme }) => 2 * theme.gridUnit}px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
  .error {
    color: ${({ theme }) => theme.colors.error.base};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;









export const DATE_FILTER_CONTROL_TEST_ID = 'date-filter-control';
export const getDateFilterControlTestId = testWithId(
DATE_FILTER_CONTROL_TEST_ID);


function changeDateFormat(range) {
  if (!range || range === NO_TIME_RANGE) return range;
  if (range.indexOf(' ≤ ') === -1) {
    const [start, end] = range.split(' : ');
    return `${moment(start).format('YYYY-MM-DD')} : ${moment(end).format(
    'YYYY-MM-DD')
    }`;
  }
  const [start, mid, end] = range.split(' ≤ ');
  return `${moment(start).format('YYYY-MM-DD')} ≤ ${mid} ≤ ${moment(end).format(
  'YYYY-MM-DD')
  }`;
}

export default function DateFilterLabel(props) {
  const { value = DEFAULT_TIME_RANGE, endpoints, onChange, type } = props;
  const [actualTimeRange, setActualTimeRange] = useState(value);

  const [show, setShow] = useState(false);
  const guessedFrame = useMemo(() => guessFrame(value), [value]);
  const [lastFetchedTimeRange, setLastFetchedTimeRange] = useState(value);
  const [timeRangeValue, setTimeRangeValue] = useState(value);
  const [validTimeRange, setValidTimeRange] = useState(false);
  const [evalResponse, setEvalResponse] = useState(value);
  const [tooltipTitle, setTooltipTitle] = useState(value);

  useEffect(() => {
    fetchTimeRange(value, endpoints).then(({ value: actualRange, error }) => {
      if (error) {
        setEvalResponse(error || '');
        setValidTimeRange(false);
        setTooltipTitle(value || '');
      } else {
        /*
           HRT == human readable text
           ADR == actual datetime range
           +--------------+------+----------+--------+----------+-----------+
           |              | Last | Previous | Custom | Advanced | No Filter |
           +--------------+------+----------+--------+----------+-----------+
           | control pill | HRT  | HRT      | ADR    | ADR      |   HRT     |
           +--------------+------+----------+--------+----------+-----------+
           | tooltip      | ADR  | ADR      | HRT    | HRT      |   ADR     |
           +--------------+------+----------+--------+----------+-----------+
         */
        if (guessedFrame === 'No filter') {
          setActualTimeRange(value);
          setTooltipTitle(
          type === 'error' ?
          t('Default value is required') :
          actualRange || '');

        } else {
          setActualTimeRange(actualRange || '');
          setTooltipTitle(value || '');
        }
        setValidTimeRange(true);
      }
      setLastFetchedTimeRange(value);
    });
  }, [value]);

  useEffect(() => {
    setTimeRangeValue(actualTimeRange);
  }, [actualTimeRange]);

  useDebouncedEffect(
  () => {
    if (lastFetchedTimeRange !== timeRangeValue) {
      fetchTimeRange(timeRangeValue, endpoints).then(
      ({ value: actualRange, error }) => {
        if (error) {
          setEvalResponse(error || '');
          setValidTimeRange(false);
        } else {
          setEvalResponse(actualRange || '');
          setValidTimeRange(true);
        }
        setLastFetchedTimeRange(timeRangeValue);
      });

    }
  },
  SLOW_DEBOUNCE,
  [timeRangeValue]);


  function onSave() {
    onChange(timeRangeValue);
    setShow(false);
  }

  function onOpen() {
    setTimeRangeValue(value);
    setShow(true);
  }

  function onHide() {
    setTimeRangeValue(value);
    setShow(false);
  }

  const togglePopover = () => {
    if (show) {
      onHide();
    } else {
      setShow(true);
    }
  };

  const theme = useTheme();

  const overlayContent =
  ___EmotionJSX(ContentStyleWrapper, null,
  ___EmotionJSX(CustomFrame, { value: timeRangeValue, onChange: setTimeRangeValue }),
  ___EmotionJSX(Divider, null),
  ___EmotionJSX("div", null,
  ___EmotionJSX("div", { className: "section-title" }, t('Actual time range')),
  validTimeRange && ___EmotionJSX("div", null, changeDateFormat(evalResponse)),
  !validTimeRange &&
  ___EmotionJSX(IconWrapper, { className: "warning" },
  ___EmotionJSX(Icons.ErrorSolidSmall, { iconColor: theme.colors.error.base }),
  ___EmotionJSX("span", { className: "text error" }, evalResponse))),



  ___EmotionJSX(Divider, null),
  ___EmotionJSX(Footer, null,
  ___EmotionJSX(Button, {
    buttonStyle: "danger",
    cta: true,
    key: "No filter",
    onClick: () => {
      setTimeRangeValue(NO_TIME_RANGE);
      onChange(NO_TIME_RANGE);
      setShow(false);
    },
    "data-test": "no-filter-button" }, "No Filter"),




  ___EmotionJSX("div", null,
  ___EmotionJSX(Button, {
    buttonStyle: "secondary",
    cta: true,
    key: "cancel",
    onClick: onHide,
    "data-test": "cancel-button" },

  t('CANCEL')),

  ___EmotionJSX(Button, _extends({
    buttonStyle: "primary",
    cta: true,
    disabled: !validTimeRange,
    key: "apply",
    onClick: onSave },
  getDateFilterControlTestId('apply-button')),

  t('APPLY')))));






  const title =
  ___EmotionJSX(IconWrapper, null,
  ___EmotionJSX(Icons.EditAlt, { iconColor: theme.colors.grayscale.base }),
  ___EmotionJSX("span", { className: "text" }, t('Edit time range')));



  const overlayStyle = {
    width: '600px' };


  return (
    ___EmotionJSX(React.Fragment, null,
    ___EmotionJSX(ControlHeader, props),
    ___EmotionJSX(StyledPopover, {
      placement: "right",
      trigger: "click",
      content: overlayContent,
      title: title,
      defaultVisible: show,
      visible: show,
      onVisibleChange: togglePopover,
      overlayStyle: overlayStyle },

    ___EmotionJSX(Tooltip, { placement: "top", title: tooltipTitle },
    ___EmotionJSX(Label, {
      className: "pointer",
      "data-test": "time-range-trigger",
      onClick: onOpen },

    changeDateFormat(actualTimeRange))))));





}__signature__(DateFilterLabel, "useState{[actualTimeRange, setActualTimeRange](value)}\nuseState{[show, setShow](false)}\nuseMemo{guessedFrame}\nuseState{[lastFetchedTimeRange, setLastFetchedTimeRange](value)}\nuseState{[timeRangeValue, setTimeRangeValue](value)}\nuseState{[validTimeRange, setValidTimeRange](false)}\nuseState{[evalResponse, setEvalResponse](value)}\nuseState{[tooltipTitle, setTooltipTitle](value)}\nuseEffect{}\nuseEffect{}\nuseDebouncedEffect{}\nuseTheme{theme}", () => [useDebouncedEffect, useTheme]);DateFilterLabel.propTypes = { name: _pt.string.isRequired, onChange: _pt.func.isRequired, value: _pt.string };;(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(guessFrame, "guessFrame", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(fetchTimeRange, "fetchTimeRange", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(StyledPopover, "StyledPopover", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(ContentStyleWrapper, "ContentStyleWrapper", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(IconWrapper, "IconWrapper", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(Footer, "Footer", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(DATE_FILTER_CONTROL_TEST_ID, "DATE_FILTER_CONTROL_TEST_ID", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(getDateFilterControlTestId, "getDateFilterControlTestId", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(changeDateFormat, "changeDateFormat", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");reactHotLoader.register(DateFilterLabel, "DateFilterLabel", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/DateFilterLabel.tsx");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();