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
import {

sharedControls } from
'@superset-ui/chart-controls';
import { t } from '@superset-ui/core';

const config = {
  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
  {
    label: t('Query'),
    expanded: true,
    controlSetRows: [
    [
    {
      name: 'groupby',
      config: {
        ...sharedControls.groupby,
        label: 'Column',
        required: true } }]] },





  {
    label: t('UI Configuration'),
    expanded: true,
    controlSetRows: [
    [
    {
      name: 'enableEmptyFilter',
      config: {
        type: 'CheckboxControl',
        label: t('Required'),
        default: false,
        renderTrigger: true,
        description: t('User must select a value for this filter.') } }]] }] };const _default =








config;export default _default;;(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(config, "config", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/controlPanel.ts");reactHotLoader.register(_default, "default", "/Users/bharat.nischal/Desktop/Swiggy/Data Platform/superset/superset-frontend/plugins/plugin-custom-time/src/controlPanel.ts");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();