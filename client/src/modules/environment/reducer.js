
function initialState() {
  if (__DEMO__) {
    return {name: "Mock Alces OpenStack"}
  }
  else {
    return {};
  }
}

export default function reducer(state=initialState(), action) {
  switch (action.type) {
    default:
      return state;
  }
}
