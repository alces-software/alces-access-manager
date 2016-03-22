
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

export function authenticate(cluster, {username, password}) {
  const authenticateRequest = {
    type: actionTypes.AUTHENTICATE,
    payload: {
      ip: cluster.ip,
      username,
    },
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${cluster.ip}/authenticate`,
          method: 'post',
          data: {username, password},
        },
      },
    },
  };

  return (dispatch) => {
    return dispatch(authenticateRequest).
      then( () => {
        dispatch(loadSessions(cluster));
        dispatch(redirectTo(`/cluster/${cluster.ip}`));
    });
  };
}

export function logout(cluster) {
  return {
    type: actionTypes.LOGOUT,
    payload: {
      ip: cluster.ip,
    },
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${cluster.ip}/logout`,
          method: 'post',
        },
      },
    },
  };
}

function ping(cluster) {
  return {
    type: actionTypes.PING,
    payload: {
      ip: cluster.ip,
    },
    meta: {
      apiRequest: {
        config: {
          url: `/api/v1/cluster/${cluster.ip}/ping`,
          method: 'get',
        },
      },
    },
  };
}

export function pingClusters() {
  return (dispatch, getState) => {
    const clusters = getState().clusters;
    _.map(clusters, cluster => {
      dispatch(ping(cluster));
    });
  }
}
