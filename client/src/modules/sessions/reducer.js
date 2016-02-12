
import {initialOrDemoState} from 'utils/reducer';

const demoState = [
  {id: 1, name: "Terminal session"},
  {id: 2, name: "Gnome session"},
  {id: 3, name: "XFCE session"},
  {id: 4, name: "KDE session"},
];
const initialState = initialOrDemoState({}, demoState);

export default function reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
