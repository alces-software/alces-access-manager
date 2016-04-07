
import _ from 'lodash';
import {resolve} from 'redux-simple-promise';

import * as actionTypes from './actionTypes';

export function handleReceivedSessions(state, action) {
  const clusterIp = action.meta.payload.cluster.ip;

  const currentSessions = state[clusterIp];
  const receivedSessions = action.payload.sessions;
  const equivalentIds = _.chain().
    zip(
      _.map(currentSessions, 'uuid'), _.map(receivedSessions, 'uuid')
    ).
    every( ([currentUuid, newUuid]) => currentUuid === newUuid ).
    value();

    console.log(equivalentIds) // eslint-disable-line no-console
  if (!equivalentIds) {
    return {
      ...state,
      [clusterIp]: receivedSessions,
    }
  }
  else {
    return state;
  }
}

const initialState = {};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case resolve(actionTypes.LOAD_SESSIONS):
    case resolve(actionTypes.RELOAD_SESSIONS):
      return handleReceivedSessions(state, action);

    case resolve(actionTypes.LAUNCH):
      if (action.payload.success) {
        return handleReceivedSessions(state, action);
      }
      return state;

    default:
      return state;
  }
}
