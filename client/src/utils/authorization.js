/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import {replaceState} from 'redux-router'

import {clusterFromRouteSelector} from 'selectors';

export function authenticatedWithCurrentCluster(store) {
  const cluster = clusterFromRouteSelector(store);
  return !!cluster.authenticated_username;
}

export function redirectToClustersPage() {
  this.props.dispatch(replaceState(null, '/'));
}
