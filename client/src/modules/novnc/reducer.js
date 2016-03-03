
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

    case actionTypes.START_COPY_MODE:
      return {
      ...state,
      copyMode: true,
    };

    case actionTypes.STOP_COPY_MODE:
      return {
      ...state,
      copyMode: false,
    };

    default:
      return state;
  }
}
