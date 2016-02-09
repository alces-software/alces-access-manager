/*=============================================================================
 * Copyright (C) 2015-2016 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
// import DiffMonitor from 'redux-devtools-diff-monitor';
// import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    changePositionKey='ctrl-q'
    defaultIsVisible={false}
    defaultPosition="left"
    toggleVisibilityKey='ctrl-h'
    >
    <LogMonitor />
  </DockMonitor>
);
