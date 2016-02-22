
import _ from 'lodash';
import {createSelector} from 'reselect';

// const clustersState = (state) => state.clusters;
const sessionsState = (state) => state.sessions;

function clusterFromRouteSelector(state, props) {
  const clusterIp = props.routeParams.clusterIp;
  return _.find(state.clusters, (cluster) => cluster.ip == clusterIp) || {};
}

function sessionsForCluster(cluster, sessions) {
  // TODO: may get sessions in different way later as won't have loaded to
  // begin with.
  return _.filter(sessions, (session) => session.clusterIp == cluster.ip);
}

export const sessionSelectionPageSelector = createSelector(
  clusterFromRouteSelector,
  sessionsState,
  (cluster, allSessions) => {
    const sessions = sessionsForCluster(cluster, allSessions);
    return {cluster, sessions};
  }
);

function sessionFromRouteSelector(state, props) {
  const sessionPort = props.routeParams.sessionPort;
  return _.find(state.sessions, (session) => session.port == sessionPort);
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
