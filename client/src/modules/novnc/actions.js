
import * as actionTypes from './actionTypes';

export function stateChange(state, msg) {
  return {
    type: actionTypes.STATE_CHANGE,
    payload: {
      state, // State string passed to noVNC RFB's onUpdateState function.
      msg,
    },
  }
}

export function startCopyMode() {
  return {
    type: actionTypes.START_COPY_MODE,
  }
}

export function stopCopyMode() {
  return {
    type: actionTypes.STOP_COPY_MODE,
  }
}
