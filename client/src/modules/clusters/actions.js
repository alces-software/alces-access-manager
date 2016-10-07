
import _ from 'lodash';
import {push} from 'redux-router';

import * as actionTypes from './actionTypes';
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
      cluster,
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
        dispatch(push(`/cluster/${cluster.ip}`));
    });
  };
}

export function logout(cluster) {
  const logoutRequest = {
    type: actionTypes.LOGOUT,
    payload: {
      cluster,
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

  return (dispatch) => {
    return dispatch(logoutRequest).
      then( () => dispatch(push(`/`)) );
  }
}

function ping(cluster) {
  return {
    type: actionTypes.PING,
    payload: {
      cluster,
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
