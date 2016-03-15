
import * as actionTypes from './actionTypes';
import * as uiActions from 'ui/actions';

function sessionLoadAction(clusterIp, actionType) {
  return {
    type: actionType,
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${clusterIp}/sessions`,
          method: 'get',
        },
      },
    },
    payload: {
      clusterIp,
    },
  };
}

export function loadSessions(clusterIp) {
  return sessionLoadAction(clusterIp, actionTypes.LOAD_SESSIONS)
}

export function reloadSessions(clusterIp) {
  // After received response to request, dispatch action to stop animation
  // after a timeout; this stops the animation being jarring if the request and
  // response time is very short.
  return (dispatch) => {
    return dispatch(sessionLoadAction(clusterIp, actionTypes.RELOAD_SESSIONS)).
      then( () => {
      setTimeout(
        () => dispatch(uiActions.stopSessionReloadAnimation()),
        1000
      );
    });
  }
}
