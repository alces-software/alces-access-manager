
import * as actionTypes from './actionTypes';

// Adapted from Portal VNC event creating; maps noVNC state names to Portal's
// own event names. TODO: do we really need the mapping aspect of this, could
// just store the last state to occur that we care about.
function updatedEventState(novncState) {
  const statesMap = {
    loaded: 'load',
    connect: 'start',
    failed: 'failure',
    fatal: 'fatal',
    normal: 'connect',
    disconnected: 'disconnect',
  };
  return statesMap[novncState];
}

const initialState = {};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case actionTypes.STATE_CHANGE:
      const novncState = action.payload.state;
      const eventState = updatedEventState(novncState) || state.eventState;
      const {msg} = action.payload;
      return {
      ...state,
      state: novncState,
      eventState,
      msg,
    };

    case actionTypes.SET_COPY_TEXT:
      return {
      ...state,
      copyText: action.payload.text,
    }

    case actionTypes.SHOW_PASTE_MODAL:
      return {
      ...state,
      showingPasteModal: true,
    }

    case actionTypes.HIDE_PASTE_MODAL:
      return {
      ...state,
      showingPasteModal: false,
    }

    case actionTypes.PASTE_TEXT:
      return {
      ...state,
      showingPasteModal: false,
      pastedText: action.payload.text,
    }

    case actionTypes.PASTE_COMPLETE:
      return {
      ...state,
      pastedText: undefined,
    }

    case actionTypes.SHOW_SESSION_FAILED_MODAL:
      return {
      ...state,
      showingSessionFailedModal: true,
      sessionFailedOnInitialConnect: action.payload.sessionFailedOnInitialConnect,
    }

    case actionTypes.HIDE_SESSION_FAILED_MODAL:
      return {
      ...state,
      showingSessionFailedModal: false,
      sessionFailedOnInitialConnect: undefined,
    }

    case actionTypes.SET_INTERACTIVE_MODE:
      return {
      ...state,
      viewportDrag: false,
    }

    case actionTypes.SET_DRAG_VIEWPORT_MODE:
      return {
      ...state,
      viewportDrag: true,
    }

    case actionTypes.SET_DIMENSIONS:
      const {width, height} = action.payload;
      return {
      ...state,
      width,
      height,
    }

    default:
      return state;
  }
}
