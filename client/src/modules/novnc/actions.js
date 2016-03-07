
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

export function showPasteModal() {
  return {
    type: actionTypes.SHOW_PASTE_MODAL,
  }
}

export function hidePasteModal() {
  return {
    type: actionTypes.HIDE_PASTE_MODAL,
  }
}

export function pasteText() {
  return (dispatch, getState) => {
    const text = getState().form['vnc-paste-modal'].pastedText.value;

    dispatch({
      type: actionTypes.PASTE_TEXT,
      payload: {
        text,
      },
    });
  }
}

export function pasteComplete() {
  return {
    type: actionTypes.PASTE_COMPLETE,
  }
}
