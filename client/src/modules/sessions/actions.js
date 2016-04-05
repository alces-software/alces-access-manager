
import * as actionTypes from './actionTypes';
import * as uiActions from 'ui/actions';

const SESSIONS_POLL_PERIOD = 3000;

function sessionLoadAction(cluster, actionType) {
  return {
    type: actionType,
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

export function loadSessions(cluster) {
  return sessionLoadAction(cluster, actionTypes.LOAD_SESSIONS)
}

export function reloadSessions(cluster) {
  // After received response to request, dispatch action to stop animation
  // after a timeout; this stops the animation being jarring if the request and
  // response time is very short.
  return (dispatch) => {
    return dispatch(sessionLoadAction(cluster, actionTypes.RELOAD_SESSIONS)).
      then( () => {
      setTimeout(
        () => dispatch(uiActions.stopSessionReloadAnimation()),
        1000
      );
    });
  }
}

export function pollForSessions(cluster) {
  return (dispatch) => {
    return setInterval(
      () => dispatch(loadSessions(cluster)),
      SESSIONS_POLL_PERIOD
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
