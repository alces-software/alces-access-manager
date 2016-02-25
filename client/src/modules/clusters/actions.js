
import * as actionTypes from './actionTypes';
import {redirectTo} from 'actions/router';
import {loadSessions} from 'sessions/actions';

export function loadClusters() {
  return {
    type: actionTypes.LOAD_CLUSTERS,
    meta: {
      apiRequest: {
        config: {
          url: '/api/v1/clusters',
          method: 'get',
        },
      },
    },
  }
}

export function authenticate(ip, {username, password}) {
  const authenticateRequest = {
    type: actionTypes.AUTHENTICATE,
    payload: {
      ip,
      username,
    },
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${ip}/authenticate`,
          method: 'post',
          data: {username, password},
        },
      },
    },
  };

  return (dispatch) => {
    return dispatch(authenticateRequest).
      then( () => {
        dispatch(loadSessions(ip));
        dispatch(redirectTo(`/cluster/${ip}`));
    });
  };
}
