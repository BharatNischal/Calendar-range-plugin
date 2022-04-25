import _extends from "@babel/runtime-corejs3/helpers/extends";(function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;}; /**
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
import { useTheme, t } from '@superset-ui/core';

import { Tooltip } from 'src/components/Tooltip';
import { ClassNames } from '@emotion/react';import { jsx as ___EmotionJSX } from "@emotion/react";

const TIME_PICKER_HELPER =
___EmotionJSX(React.Fragment, null,
___EmotionJSX("div", null,
___EmotionJSX("h3", null, "DATETIME"),
___EmotionJSX("p", null, t('Return to specific datetime.')),
___EmotionJSX("h4", null, t('Syntax')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, "datetime([string])")),

___EmotionJSX("h4", null, t('Example')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, `datetime("2020-03-01 12:00:00")
datetime("now")
datetime("last year")`))),


___EmotionJSX("div", null,
___EmotionJSX("h3", null, "DATEADD"),
___EmotionJSX("p", null, t('Moves the given set of dates by a specified interval.')),
___EmotionJSX("h4", null, t('Syntax')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, `dateadd([datetime], [integer], [dateunit])
dateunit = (year | quarter | month | week | day | hour | minute | second)`)),

___EmotionJSX("h4", null, t('Example')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, `dateadd(datetime("today"), -13, day)
dateadd(datetime("2020-03-01"), 2, day)`))),


___EmotionJSX("div", null,
___EmotionJSX("h3", null, "DATETRUNC"),
___EmotionJSX("p", null,
t(
'Truncates the specified date to the accuracy specified by the date unit.')),


___EmotionJSX("h4", null, t('Syntax')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, `datetrunc([datetime], [dateunit])
dateunit = (year | quarter | month | week)`)),

___EmotionJSX("h4", null, t('Example')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, `datetrunc(datetime("2020-03-01"), week)
datetrunc(datetime("2020-03-01"), month)`))),


___EmotionJSX("div", null,
___EmotionJSX("h3", null, "LASTDAY"),
___EmotionJSX("p", null, t('Get the last date by the date unit.')),
___EmotionJSX("h4", null, t('Syntax')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, `lastday([datetime], [dateunit])
dateunit = (year | month | week)`)),

___EmotionJSX("h4", null, t('Example')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, "lastday(datetime(\"today\"), month)"))),


___EmotionJSX("div", null,
___EmotionJSX("h3", null, "HOLIDAY"),
___EmotionJSX("p", null, t('Get the specify date for the holiday')),
___EmotionJSX("h4", null, t('Syntax')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, `holiday([string])
holiday([holiday string], [datetime])
holiday([holiday string], [datetime], [country name])`)),

___EmotionJSX("h4", null, t('Example')),
___EmotionJSX("pre", null,
___EmotionJSX("code", null, `holiday("new year")
holiday("christmas", datetime("2019"))
holiday("christmas", dateadd(datetime("2019"), 1, year))
holiday("christmas", datetime("2 years ago"))
holiday("Easter Monday", datetime("2019"), "UK")`))));





const StyledTooltip = (props) => {
  const theme = useTheme();
  return (
    ___EmotionJSX(ClassNames, null,
    ({ css }) =>
    ___EmotionJSX(Tooltip, _extends({
      overlayClassName: css`
            .ant-tooltip-content {
              min-width: ${theme.gridUnit * 125}px;
              max-height: 410px;
              overflow-y: scroll;

              .ant-tooltip-inner {
                max-width: ${theme.gridUnit * 125}px;
                h3 {
                  font-size: ${theme.typography.sizes.m}px;
                  font-weight: ${theme.typography.weights.bold};
                }
                h4 {
                  font-size: ${theme.typography.sizes.m}px;
                  font-weight: ${theme.typography.weights.bold};
                }
                pre {
                  border: none;
                  text-align: left;
                  word-break: break-word;
                  font-size: ${theme.typography.sizes.s}px;
                }
              }
            }
          ` },
    props))));




};__signature__(StyledTooltip, "useTheme{theme}", () => [useTheme]);

export default function DateFunctionTooltip(props) {
  return ___EmotionJSX(StyledTooltip, _extends({ title: TIME_PICKER_HELPER }, props));
};(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(TIME_PICKER_HELPER, "TIME_PICKER_HELPER", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/components/DateFunctionTooltip.tsx");reactHotLoader.register(StyledTooltip, "StyledTooltip", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/components/DateFunctionTooltip.tsx");reactHotLoader.register(DateFunctionTooltip, "DateFunctionTooltip", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/NewDateFilterControl/components/DateFunctionTooltip.tsx");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();