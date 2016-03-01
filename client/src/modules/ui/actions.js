
import _ from 'lodash';

import * as actionTypes from './actionTypes';
import {loadClusters} from 'clusters/actions';
import {loadSessions} from 'sessions/actions';

export function stopSessionReloadAnimation() {
  return {
    type: actionTypes.STOP_SESSION_RELOAD_ANIMATION,
  }
}

function startLoadSessionData() {
  return {
    type: actionTypes.LOAD_SESSION_DATA,
  }
}

function finishLoadSessionData() {
  return {
    type: actionTypes.LOAD_SESSION_DATA_COMPLETE,
  }
}

export function loadSessionData() {
  return (dispatch) => {
    dispatch(startLoadSessionData());

    return dispatch(
      loadClusters()

    ).then( (result) => {
      const clusters = result.clusters;
      const authenticatedClusters = _.filter(clusters, (cluster) => cluster.authenticated_username);
      return Promise.all(
        _.map(authenticatedClusters,
              (cluster) => dispatch(loadSessions(cluster.ip))
             )
      );

    }).then( () => dispatch(finishLoadSessionData()));
    // TODO: error handling?
  }
}
