
import * as actionTypes from './actionTypes';
import {redirectTo} from 'actions/router';

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
        dispatch(redirectTo(`/cluster/${ip}`));
    });
  };
}
