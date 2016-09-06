
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

    const pollIfNotPolling = () => {
      const {pollingSessions} = getState().ui

      // We want to poll every pollIntervalInMs, but only if we are not already
      // waiting for a load sessions action, to avoid sending numerous requests
      // to the server; the UI can also break if we receive the results of
      // multiple load sessions actions in quick succession (I think due to the
      // ReactCSSTransitionReplace component getting confused by the quick
      // update).
      if (!pollingSessions) {
        dispatch(loadSessions(cluster))
      }
    }

    return setInterval(
      pollIfNotPolling,
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
