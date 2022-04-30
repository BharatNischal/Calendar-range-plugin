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
import React from 'react';
import { t } from '@superset-ui/core';
import { Moment } from 'moment';
import { Col, Row } from 'src/components';
import { DatePicker } from 'src/components/DatePicker';
import { InfoTooltipWithTrigger } from '@superset-ui/chart-controls';
import {
  MOMENT_FORMAT,
  customTimeRangeDecode,
  customTimeRangeEncode,
  dttmToMoment,
} from '../utils';
import { CustomRangeKey, FrameComponentProps } from '../types';

export function CustomFrame(props: FrameComponentProps) {
  const { customRange, matchedFlag } = customTimeRangeDecode(props.value);
  if (!matchedFlag) {
    props.onChange(customTimeRangeEncode(customRange));
  }
  const { sinceDatetime, untilDatetime } = { ...customRange };

  function onChange(control: CustomRangeKey, value: string) {
    props.onChange(
      customTimeRangeEncode({
        ...customRange,
        [control]: value,
      }),
    );
  }

  return (
    <div data-test="custom-frame">
      <div className="section-title">{t('Configure custom time range')}</div>
      <Row gutter={24}>
        <Col span={12}>
          <div className="control-label">
            {t('START (INCLUSIVE)')}{' '}
            <InfoTooltipWithTrigger
              tooltip={t('Start date included in time range')}
              placement="right"
            />
          </div>
          <Row>
            <DatePicker
              value={dttmToMoment(sinceDatetime)}
              onChange={(datetime: Moment) =>
                onChange('sinceDatetime', datetime.format(MOMENT_FORMAT))
              }
              allowClear={false}
              inputReadOnly
            />
          </Row>
        </Col>
        <Col span={12}>
          <div className="control-label">
            {t('END (INCLUSIVE)')}{' '}
            <InfoTooltipWithTrigger
              tooltip={t('End date included in time range')}
              placement="right"
            />
          </div>
          <Row>
            <DatePicker
              value={dttmToMoment(untilDatetime)}
              onChange={(datetime: Moment) =>
                onChange(
                  'untilDatetime',
                  datetime.format('YYYY-MM-DD[T]23:59:59'),
                )
              }
              allowClear={false}
              inputReadOnly
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
