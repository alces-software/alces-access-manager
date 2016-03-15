
import _ from 'lodash';

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

export function logout(ip) {
  return {
    type: actionTypes.LOGOUT,
    payload: {
      ip,
    },
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${ip}/logout`,
          method: 'post',
        },
      },
    },
  };
}

function ping(ip) {
  return {
    type: actionTypes.PING,
    payload: {
      ip,
    },
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${ip}/ping`,
          method: 'get',
        },
      },
    },
  };
}

export function pingClusters() {
  return (dispatch, getState) => {
    const clusterIps = _.map(getState().clusters, (cluster) => cluster.ip);
    _.map(clusterIps, (ip) => {
      dispatch(ping(ip));
    })
  }
}
