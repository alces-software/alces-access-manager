
import _ from 'lodash';

import * as actionTypes from './actionTypes';
import {loadClusters} from 'clusters/actions';
import {loadSessions} from 'sessions/actions';

export function stopSessionReloadAnimation() {
  return {
    type: actionTypes.STOP_SESSION_RELOAD_ANIMATION,
  }
}

export function loadSessionData() {
  return (dispatch) => {
    dispatch(loadClusters()).
      then( (result) => {
        const clusters = result.clusters;
        _.map(clusters, (cluster) => {
          if (cluster.authenticated_username) {
            dispatch(loadSessions(cluster.ip));
          }
        });
    });
  }
}
