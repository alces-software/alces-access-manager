
import {reject} from 'redux-simple-promise';

import * as actionTypes from './actionTypes';
import * as sessionActionTypes from 'sessions/actionTypes';

const initialState = {
  // Whether the initial app data (currently just the clusters) has loaded.
  loaded: false,
};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case actionTypes.LOAD_SESSION_DATA_COMPLETE:
      return {...state, loaded: true};

    case sessionActionTypes.RELOAD_SESSIONS:
      return {...state, reloadingSessions: true}

    // Stop session loading animation either after timeout, if sessions loaded
    // successfully, or if load request fails.
    case actionTypes.STOP_SESSION_RELOAD_ANIMATION:
    case reject(sessionActionTypes.LOAD_SESSIONS):
      return {...state, reloadingSessions: false}

    default:
      return state;
  }
}
