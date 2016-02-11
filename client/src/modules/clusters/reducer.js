
import {initialOrDemoState} from 'utils/reducer';

const demoState = [
  {id: 1, name: "Normal cluster"},
  {id: 2, name: "Better cluster"},
  {id: 3, name: "Test cluster"},
  {id: 4, name: "Best cluster"},
];
const initialState = initialOrDemoState({}, demoState);

export default function reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
