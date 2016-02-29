
import {resolve, reject} from 'redux-simple-promise';

import * as clusterActionTypes from 'clusters/actionTypes';

const initialState = {
  loaded: false,
};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case resolve(clusterActionTypes.LOAD_CLUSTERS):
    case reject(clusterActionTypes.LOAD_CLUSTERS):
      return {...state, loaded: true};

    default:
      return state;
  }
}
