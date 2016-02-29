
import * as actionTypes from './actionTypes';
import * as uiActions from 'ui/actions';

export function loadSessions(clusterIp) {
  const loadSessionsRequest = {
    type: actionTypes.LOAD_SESSIONS,
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

  // After received response to request, dispatch action to stop animation
  // after a timeout; this stops the animation being jarring if the request and
  // response time is very short.
  return (dispatch) => {
    return dispatch(loadSessionsRequest).
      then( () => {
      setTimeout(
        () => dispatch(uiActions.stopSessionReloadAnimation()),
        1000
      );
    });
  }
}
