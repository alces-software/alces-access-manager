
export function initialOrDemoState(initialState, demoState) {
  if (__DEMO__) {
    return demoState;
  }
  else {
    return initialState;
  }

}
