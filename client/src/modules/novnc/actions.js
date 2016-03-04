
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

export function setCopyText(text) {
  return {
    type: actionTypes.SET_COPY_TEXT,
    payload: {
      text,
    },
  }
}
