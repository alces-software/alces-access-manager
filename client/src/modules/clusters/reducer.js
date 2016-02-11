

function initialState() {
  // TODO factor demo-checking out so done in central location
  if (__DEMO__) {
    return [
      {id: 1, name: "A normal cluster"},
      {id: 2, name: "Better cluster"},
      {id: 3, name: "Test cluster"},
      {id: 4, name: "Best cluster"},
    ];
  }
  else {
    return [];
  }
}

export default function reducer(state=initialState(), action) {
  switch (action.type) {
    default:
      return state;
  }
}
