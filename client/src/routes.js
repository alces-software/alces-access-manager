/*=============================================================================
 * Copyright (C) 2015-2016 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import {authorize} from 'components/AuthorizedComponent';
import App from 'containers/App';
import ClusterSelectionPage from 'containers/ClusterSelectionPageContainer';
import SessionSelectionPage from 'containers/SessionSelectionPageContainer';
import VncSessionPage from 'containers/VncSessionPageContainer';
import * as authorization from 'utils/authorization';

const checkAuthenticatedForCluster = authorize(
  authorization.authenticatedWithCurrentCluster,
  authorization.redirectToClustersPage
);

const checkSessionExists = authorize(
  authorization.currentSessionExists,
  authorization.redirectToSessionsPage
);

const routes = <Route path="/" component={App}>
  <IndexRoute component={ClusterSelectionPage} />

  <Route component={checkAuthenticatedForCluster}>
    <Route path="cluster/:clusterIp" component={SessionSelectionPage} />
  </Route>

  <Route component={checkAuthenticatedForCluster}>
    <Route component={checkSessionExists}>
      <Route path="cluster/:clusterIp/session/:sessionUuid" component={VncSessionPage} />
    </Route>
  </Route>

  <Redirect from="*" to="/" />
</Route>

export default routes;
