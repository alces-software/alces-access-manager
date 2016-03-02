
import _ from 'lodash';
import {createSelector} from 'reselect';

// const clustersState = (state) => state.clusters;
const novncState = (state) => state.novnc;
const sessionsState = (state) => state.sessions;
const uiState = (state) => state.ui;

export function clusterFromRouteSelector(state) {
  const clusterIp = state.router.params.clusterIp;
  return _.find(state.clusters, (cluster) => cluster.ip == clusterIp) || {};
}

function sessionsForCluster(cluster, allSessions) {
  return sessionsForClusterWithIp(cluster.ip, allSessions);
}

function sessionsForClusterWithIp(clusterIp, allSessions) {
  const clusterSessions = allSessions[clusterIp];
  return clusterSessions ? clusterSessions : [];
}

export const sessionSelectionPageSelector = createSelector(
  clusterFromRouteSelector,
  sessionsState,
  uiState,
  (cluster, allSessions, ui) => {
    const sessions = sessionsForCluster(cluster, allSessions);
    return {
      cluster,
      sessions,
      ui,
    };
  }
);

export function sessionFromRouteSelector(state) {
  const {clusterIp, sessionPort} = state.router.params;
  const clusterSessions = sessionsForClusterWithIp(clusterIp, state.sessions);
  return _.find(clusterSessions, (session) => session.port == sessionPort);
}

export const vncSessionPageSelector = createSelector(
  clusterFromRouteSelector,
  sessionFromRouteSelector,
  novncState,
  (cluster, session, novnc) => {
    return {cluster, session, novnc};
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
  uiState,

  (notifications, ui) => {
    return {
      notifications,
      ui,
    }
  }
);
