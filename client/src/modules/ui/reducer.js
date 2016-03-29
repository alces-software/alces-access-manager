
import {resolve, reject} from 'redux-simple-promise';

import * as actionTypes from './actionTypes';
import * as sessionActionTypes from 'sessions/actionTypes';

function setLoaded(state, value) {
  return {...state, loaded: value};
}

function setReloadingSessions(state, value) {
  return {...state, reloadingSessions: value}
}

function setLaunchingSession(state, value) {
  return {...state, launchingSession: value}
}

const initialState = {
  // Whether the initial app data (currently just the clusters) has loaded.
  loaded: false,
};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case actionTypes.LOAD_SESSION_DATA_COMPLETE:
      return setLoaded(state, true);

    case sessionActionTypes.RELOAD_SESSIONS:
      return setReloadingSessions(state, true);

    // Stop session loading animation either after timeout, if sessions loaded
    // successfully, or if load/reload request fails.
    case actionTypes.STOP_SESSION_RELOAD_ANIMATION:
    case reject(sessionActionTypes.LOAD_SESSIONS):
    case reject(sessionActionTypes.RELOAD_SESSIONS):
      return setReloadingSessions(state, false);

    case sessionActionTypes.LAUNCH:
      return setLaunchingSession(state, true);

    case resolve(sessionActionTypes.LAUNCH):
    case reject(sessionActionTypes.LAUNCH):
      return setLaunchingSession(state, false);

    default:
      return state;
  }
}
