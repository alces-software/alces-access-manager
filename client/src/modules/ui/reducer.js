
import {resolve, reject} from 'redux-simple-promise';

import * as clusterActionTypes from 'clusters/actionTypes';
import * as sessionActionTypes from 'sessions/actionTypes';

const initialState = {
  // Whether the initial app data (currently just the clusters) has loaded.
  loaded: false,
};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case resolve(clusterActionTypes.LOAD_CLUSTERS):
    case reject(clusterActionTypes.LOAD_CLUSTERS):
      return {...state, loaded: true};

    case sessionActionTypes.LOAD_SESSIONS:
      return {...state, loadingSessions: true}

    case resolve(sessionActionTypes.LOAD_SESSIONS):
    case reject(sessionActionTypes.LOAD_SESSIONS):
      return {...state, loadingSessions: false}

    default:
      return state;
  }
}
