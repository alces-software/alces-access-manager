
import {resolve} from 'redux-simple-promise';

import * as actionTypes from './actionTypes';
import {initialOrDemoState} from 'utils/reducer';

const demoState = [
  {name: "Normal cluster", ip: '10.10.10.10'},
  {name: "Better cluster", ip: '10.10.10.11'},
  {name: "Test cluster", ip: '10.10.10.12'},
  {name: "Best cluster", ip: '10.10.10.13'},
];
const initialState = initialOrDemoState({}, demoState);

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case resolve(actionTypes.LOAD_CLUSTERS):
      return action.payload.clusters
    default:
      return state;
  }
}
