
import * as actionTypes from './actionTypes';

const initialState = {};
export default function reducer(state=initialState, action) {
  switch (action.type) {

    case actionTypes.STATE_CHANGE:
      const novncState = action.payload.state;
      const {msg} = action.payload;
      return {
      ...state,
      state: novncState,
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

    case actionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}
