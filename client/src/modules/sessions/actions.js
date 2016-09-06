
import * as actionTypes from './actionTypes';

export function loadSessions(cluster) {
  return {
    type: actionTypes.LOAD_SESSIONS,
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${cluster.ip}/sessions`,
          method: 'get',
        },
      },
    },
    payload: {
      cluster,
    },
  };
}

export function pollForSessions(cluster) {
  return (dispatch, getState) => {
    const {sessionRefreshPeriod} = getState().ui;
    const pollIntervalInMs = sessionRefreshPeriod * 1000;
    return setInterval(
      () => dispatch(loadSessions(cluster)),
      pollIntervalInMs
    );
  }
}

export function launchSession(cluster, {sessionType, node}) {
  return {
    type: actionTypes.LAUNCH,
    payload: {
      cluster,
    },
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${cluster.ip}/launch/${sessionType}/on/${node}`,
          method: 'post',
        },
      },
    },
  };
}
