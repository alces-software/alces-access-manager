/*=============================================================================
 * Copyright (C) 2015-2016 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'containers/App';
import ClusterSelectionPage from 'containers/ClusterSelectionPageContainer';
import SessionSelectionPage from 'containers/SessionSelectionPageContainer';
import VncSessionPage from 'components/pages/VncSessionPage';

const routes = <Route path="/" component={App}>
  <IndexRoute component={ClusterSelectionPage} />
  <Route path="cluster/:clusterIp" component={SessionSelectionPage} />
  <Route path="cluster/:clusterIp/session/:sessionPort" component={VncSessionPage} />

  <Redirect from="*" to="/" />
</Route>

export default routes;
