
import _ from 'lodash';
import {createSelector} from 'reselect';

// const clustersState = (state) => state.clusters;
const sessionsState = (state) => state.sessions;

function clusterFromRouteSelector(state, props) {
  const clusterIp = props.routeParams.clusterIp;
  return _.find(state.clusters, (cluster) => cluster.ip == clusterIp);
}

export const sessionSelectionPageSelector = createSelector(
  clusterFromRouteSelector,
  sessionsState,
  (cluster, sessions) => {
    return {cluster, sessions};
  }
);

function sessionFromRouteSelector(state, props) {
  const sessionPort = props.routeParams.sessionPort;
  return _.find(state.sessions, (session) => session.port == sessionPort);
}

export const vncSessionPageSelector = createSelector(
  sessionFromRouteSelector,
  (session) => {
    return {session}
  }
);
