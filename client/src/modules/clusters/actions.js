
import axios from 'axios';

import {LOAD_CLUSTERS} from './actionTypes';

export function loadClusters() {
  return {
    type: LOAD_CLUSTERS,
    payload: {
      promise: axios.get('/api/v1/clusters'),
    },
  }
}
