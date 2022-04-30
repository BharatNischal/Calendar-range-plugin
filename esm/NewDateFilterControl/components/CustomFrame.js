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
import React from 'react';
import { t } from '@superset-ui/core';

import { Col, Row } from 'src/components';
import { DatePicker } from 'src/components/DatePicker';
import { InfoTooltipWithTrigger } from '@superset-ui/chart-controls';
import {
MOMENT_FORMAT,
customTimeRangeDecode,
customTimeRangeEncode,
dttmToMoment } from
'../utils';import { jsx as ___EmotionJSX } from "@emotion/react";


export function CustomFrame(props) {
  const { customRange, matchedFlag } = customTimeRangeDecode(props.value);
  if (!matchedFlag) {
    props.onChange(customTimeRangeEncode(customRange));
  }
  const { sinceDatetime, untilDatetime } = { ...customRange };

  function onChange(control, value) {
    props.onChange(
    customTimeRangeEncode({
      ...customRange,
      [control]: value }));


  }

  return (
    ___EmotionJSX("div", { "data-test": "custom-frame" },
    ___EmotionJSX("div", { className: "section-title" }, t('Configure custom time range')),
    ___EmotionJSX(Row, { gutter: 24 },
    ___EmotionJSX(Col, { span: 12 },
    ___EmotionJSX("div", { className: "control-label" },
    t('START (INCLUSIVE)'), ' ',
    ___EmotionJSX(InfoTooltipWithTrigger, {
      tooltip: t('Start date included in time range'),
      placement: "right" })),


    ___EmotionJSX(Row, null,
    ___EmotionJSX(DatePicker, {
      value: dttmToMoment(sinceDatetime),
      onChange: (datetime) =>
      onChange('sinceDatetime', datetime.format(MOMENT_FORMAT)),

      allowClear: false,
      inputReadOnly: true }))),



    ___EmotionJSX(Col, { span: 12 },
    ___EmotionJSX("div", { className: "control-label" },
    t('END (INCLUSIVE)'), ' ',
    ___EmotionJSX(InfoTooltipWithTrigger, {
      tooltip: t('End date included in time range'),
      placement: "right" })),


    ___EmotionJSX(Row, null,
    ___EmotionJSX(DatePicker, {
      value: dttmToMoment(untilDatetime),
      onChange: (datetime) =>
      onChange(
      'untilDatetime',
      datetime.format('YYYY-MM-DD[T]23:59:59')),


      allowClear: false,
      inputReadOnly: true }))))));






};(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(CustomFrame, "CustomFrame", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/components/CustomFrame.tsx");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();