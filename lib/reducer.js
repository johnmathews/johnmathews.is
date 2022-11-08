export default function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.payload,
      }
    case "DECREMENT":
      return {
        count: state.count - action.payload,
      }
    default:
      throw new Error()
  }
}
