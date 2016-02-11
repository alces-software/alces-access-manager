
import {initialOrDemoState} from 'utils/reducer';

const demoState = {name: "Mock Alces OpenStack"};
const initialState = initialOrDemoState({}, demoState);

export default function reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
