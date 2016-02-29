
import _ from 'lodash';
import {createSelector} from 'reselect';

// const clustersState = (state) => state.clusters;
const sessionsState = (state) => state.sessions;

function clusterFromRouteSelector(state) {
  const clusterIp = state.router.params.clusterIp;
  return _.find(state.clusters, (cluster) => cluster.ip == clusterIp) || {};
}

function sessionsForCluster(cluster, allSessions) {
  return sessionsForClusterWithIp(cluster.ip, allSessions);
}

function sessionsForClusterWithIp(clusterIp, allSessions) {
  return allSessions[clusterIp];
}

export const sessionSelectionPageSelector = createSelector(
  clusterFromRouteSelector,
  sessionsState,
  (cluster, allSessions) => {
    const sessions = sessionsForCluster(cluster, allSessions);
    return {cluster, sessions};
  }
);

function sessionFromRouteSelector(state) {
  const {clusterIp, sessionPort} = state.router.params;
  const clusterSessions = sessionsForClusterWithIp(clusterIp, state.sessions);
  return _.find(clusterSessions, (session) => session.port == sessionPort);
}

export const vncSessionPageSelector = createSelector(
  clusterFromRouteSelector,
  sessionFromRouteSelector,
  (cluster, session) => {
    return {cluster, session}
  }
);

const notificationsSelector = createSelector(
  (state) => state.notifications,

  (notifications) => {
    return {
      showingModal: notifications.showingCurrentModal,
      currentModal: notifications.currentModal,
      exitingModal: notifications.exitingModal,
    };
  }
);

export const appSelector = createSelector(
  notificationsSelector,

  (notifications) => {
    return {
      notifications,
    }
  }
);
