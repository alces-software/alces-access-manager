/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import {replaceState} from 'redux-router'

import {clusterFromRouteSelector, sessionFromRouteSelector} from 'selectors';

export function authenticatedWithCurrentCluster(store) {
  const cluster = clusterFromRouteSelector(store);
  return !!cluster.authenticated_username;
}

export function currentSessionExists(store) {
  const session = sessionFromRouteSelector(store);
  return !!session;
}

export function redirectToClustersPage() {
  this.props.dispatch(replaceState(null, '/'));
}

export function redirectToSessionsPage() {
  const clusterIp = this.props.router.params.clusterIp;
  const route = `/cluster/${clusterIp}`;
  this.props.dispatch(replaceState(null, route));
}
