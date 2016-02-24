
import {resolve} from 'redux-simple-promise';

import * as actionTypes from './actionTypes';
import {initialOrDemoState} from 'utils/reducer';

const demoState = {
  '127.0.0.1': [
    {name: "Terminal session", port: 41361},
    {name: "Gnome session", port: 9000},
    {name: "XFCE session", port: 9001},
  ],
  '10.10.10.10': [
    {name: "KDE session", port: 9002},
  ],
};
const initialState = initialOrDemoState({}, demoState);

export default function reducer(state=initialState, action) {
  switch (action.type) {

    case resolve(actionTypes.LOAD_SESSIONS):
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
