
import {resolve} from 'redux-simple-promise';

import * as actionTypes from './actionTypes';

const initialState = {};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case resolve(actionTypes.LOAD_SESSIONS):
    case resolve(actionTypes.RELOAD_SESSIONS):
      const clusterIp = action.meta.payload.clusterIp;
      const sessions = action.payload
      return {
        ...state,
        [clusterIp]: sessions,
      }

    default:
      return state;
  }
}
