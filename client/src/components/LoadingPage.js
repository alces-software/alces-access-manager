/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import {ProgressBar} from 'react-bootstrap';

export default class LoadingPage extends React.Component {
  render() {
    return (
      <div className="loading-indicator">
        <p>
          One moment please &mdash; <em>Alces&nbsp;Flight</em>&nbsp;is&nbsp;starting&nbsp;up.
        </p>
        <ProgressBar
          active
          bsStyle="info"
          className="loading-indicator-progress-bar"
          now={100}
          striped
        />
      </div>
    )
  }
}
