
import axios from 'axios';

import * as actionTypes from './actionTypes';
import {redirectTo} from 'actions/router';

export function loadClusters() {
  return {
    type: actionTypes.LOAD_CLUSTERS,
    payload: {
      promise: axios.get('/api/v1/clusters'),
    },
  }
}

export function authenticate(ip, {username, password}) {
  const authenticateRequest = {
    type: actionTypes.AUTHENTICATE,
    payload: {
      promise: axios.post(`/api/v1/cluster/${ip}/authenticate`, {username, password}),
    },
  };

  return (dispatch) => {
    return dispatch(authenticateRequest).
      then( () => {
        dispatch(redirectTo(`/cluster/${ip}`));
    });
  }
}
