(function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;}; /* eslint-disable no-param-reassign */
/**
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
import { styled } from '@superset-ui/core';
import React, { useCallback, useEffect } from 'react';
import DateFilterControl from './NewDateFilterControl';
import { NO_TIME_RANGE } from 'src/explore/constants';

import { FilterPluginStyle } from 'src/filters/components/common';import { jsx as ___EmotionJSX } from "@emotion/react";

const TimeFilterStyles = styled(FilterPluginStyle)`
  overflow-x: auto;
`;

const ControlContainer = styled.div

`
  padding: 2px;
  & > span,
  & > span:hover {
    border: 2px solid transparent;
    display: inline-block;
    border: ${({ theme, validateStatus }) => {var _theme$colors$validat;return (
    validateStatus && `2px solid ${(_theme$colors$validat = theme.colors[validateStatus]) == null ? void 0 : _theme$colors$validat.base}`);}};
  }
  &:focus {
    & > span {
      border: 2px solid
        ${({ theme, validateStatus }) => {var _theme$colors$validat2;return (
    validateStatus ? (_theme$colors$validat2 =
    theme.colors[validateStatus]) == null ? void 0 : _theme$colors$validat2.base :
    theme.colors.primary.base);}};
      outline: 0;
      box-shadow: 0 0 0 2px
        ${({ validateStatus }) =>
validateStatus ?
'rgba(224, 67, 85, 12%)' :
'rgba(32, 167, 201, 0.2)'};
    }
  }
`;

const endpoints = ['inclusive', 'inclusive'];




export default function TimeFilterPlugin(props) {var _props$formData;
  const {
    setDataMask,
    setFocusedFilter,
    unsetFocusedFilter,
    width,
    height,
    filterState,
    formData: { inputRef } } =
  props;

  const handleTimeRangeChange = useCallback(
  (timeRange) => {
    const isSet = timeRange && timeRange !== NO_TIME_RANGE;
    setDataMask({
      extraFormData: isSet ?
      {
        time_range: timeRange,
        time_range_endpoints: endpoints } :

      {},
      filterState: {
        value: isSet ? timeRange : undefined } });


  },
  [setDataMask]);


  useEffect(() => {
    handleTimeRangeChange(filterState.value);
  }, [filterState.value]);

  return (_props$formData = props.formData) != null && _props$formData.inView ?
  // @ts-ignore
  ___EmotionJSX(TimeFilterStyles, { width: width, height: height },
  ___EmotionJSX(ControlContainer, {
    tabIndex: -1,
    ref: inputRef,
    validateStatus: filterState.validateStatus,
    onFocus: setFocusedFilter,
    onBlur: unsetFocusedFilter,
    onMouseEnter: setFocusedFilter,
    onMouseLeave: unsetFocusedFilter },

  ___EmotionJSX(DateFilterControl, {
    endpoints: endpoints,
    value: filterState.value || NO_TIME_RANGE,
    name: "time_range",
    onChange: handleTimeRangeChange,
    type: filterState.validateStatus }))) :



  null;
}__signature__(TimeFilterPlugin, "useCallback{handleTimeRangeChange}\nuseEffect{}");;(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(TimeFilterStyles, "TimeFilterStyles", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/TimeFilterPlugin.tsx");reactHotLoader.register(ControlContainer, "ControlContainer", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/TimeFilterPlugin.tsx");reactHotLoader.register(endpoints, "endpoints", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/TimeFilterPlugin.tsx");reactHotLoader.register(TimeFilterPlugin, "TimeFilterPlugin", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/TimeFilterPlugin.tsx");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();