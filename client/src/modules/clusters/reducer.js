

function initialState() {
  return [
    {name: "A normal cluster"},
    {name: "Better cluster"},
    {name: "Test cluster"},
    {name: "Best cluster"},
  ]

}

export default function reducer(state=initialState(), action) {
  switch (action.type) {
    default:
      return state;
  }
}
