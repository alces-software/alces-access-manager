
import {initialOrDemoState} from 'utils/reducer';

const demoState = [
  {name: "Terminal session", port: 41361, clusterIp: '127.0.0.1'},
  {name: "Gnome session", port: 9000, clusterIp: '127.0.0.1'},
  {name: "XFCE session", port: 9001, clusterIp: '127.0.0.1'},
  {name: "KDE session", port: 9002, clusterIp: '10.10.10.10'},
];
const initialState = initialOrDemoState({}, demoState);

export default function reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
