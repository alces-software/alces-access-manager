
import {replaceState} from 'redux-router'

import {clusterFromRouteSelector, sessionFromRouteSelector} from 'selectors';

// Functions for use with AuthorizedComponent.


// Authorization functions.

export function authenticatedWithCurrentCluster(store) {
  const cluster = clusterFromRouteSelector(store);
  return !!cluster.authenticated_username;
}

export function currentSessionExists(store) {
  const session = sessionFromRouteSelector(store);
  return !!session;
}


// Authorization failure handlers.

export function redirectToClustersPage() {
  this.props.dispatch(replaceState(null, '/'));
}

export function redirectToSessionsPage() {
  const clusterIp = this.props.router.params.clusterIp;
  const route = `/cluster/${clusterIp}`;
  this.props.dispatch(replaceState(null, route));
}
