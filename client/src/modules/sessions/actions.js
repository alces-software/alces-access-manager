
import * as actionTypes from './actionTypes';
import * as uiActions from 'ui/actions';

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

export function launchSession(cluster, {sessionType}) {
  return {
    type: actionTypes.LAUNCH,
    payload: {
      cluster,
    },
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${cluster.ip}/launch/${sessionType}`,
          method: 'post',
        },
      },
    },
  };
}
