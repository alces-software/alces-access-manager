
import _ from 'lodash';
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

    case resolve(actionTypes.AUTHENTICATE):
      // Form new state with the authenticated username set for the cluster
      // authenticated against. TODO: seems convoluted way to do this, possibly
      // a better way - maybe have clusters state keyed by IP?
      const {ip, username} = action.meta.payload;
      let newState = _.clone(state)
      const clusterIndex = _.findIndex(newState, ['ip', ip]);
      const newCluster = _.clone(newState[clusterIndex]);
      newCluster.authenticated_username = username; // eslint-disable-line camelcase
      newState[clusterIndex] = newCluster;
      return newState;

    default:
      return state;
  }
}
