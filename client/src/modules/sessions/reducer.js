
import {initialOrDemoState} from 'utils/reducer';

const demoState = [
  {name: "Terminal session", port: 41361},
  {name: "Gnome session", port: 9000},
  {name: "XFCE session", port: 9001},
  {name: "KDE session", port: 9002},
];
const initialState = initialOrDemoState({}, demoState);

export default function reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
