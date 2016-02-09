/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import {default as ReactTimeAgo} from 'react-timeago';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

export default class TimeAgo extends React.Component {
  render() {
    const {date} = this.props;
    const tooltip = <Tooltip
      className="flight-livestamp-tooltip"
      id="timestamp"
      >
      {this.formatTooltip()}
    </Tooltip>

    return (
      <span className="flight-livestamp">
        <OverlayTrigger
          overlay={tooltip}
          placement={this.props.tooltipPlacement || "bottom"}
          >
          <ReactTimeAgo {...this.props} date={date} formatter={this.formatTimestamp}/>
        </OverlayTrigger>
      </span>
    );
  }

  formatTimestamp(value, unit, suffix, date) {
    return moment(date).fromNow();
  }

  formatTooltip() {
    const {date, tooltipFormat} = this.props;
    const defaultTooltipFormat = "YYYY-MM-DD HH:mm:ss Z";

    if (tooltipFormat === "calendar") {
      return moment(date).calendar();
    } else {
      return moment(date).format(tooltipFormat || defaultTooltipFormat);
    }
  }
}
