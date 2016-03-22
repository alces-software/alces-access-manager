
import {resolve} from 'redux-simple-promise';

import * as actionTypes from './actionTypes';

const initialState = {};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case resolve(actionTypes.LOAD_SESSIONS):
    case resolve(actionTypes.RELOAD_SESSIONS):
    case resolve(actionTypes.LAUNCH):
      const clusterIp = action.meta.payload.cluster.ip;
      const sessions = action.payload.sessions;
      return {
        ...state,
        [clusterIp]: sessions,
      }

    default:
      return state;
  }
}
