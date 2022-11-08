export default function reducer(state, action) {
  switch (action.type) {
    case "ALL":
      // The reducer function must be pure. It must not modify the existing state. It must return a new state object.
      // the object spread operator is used to create a new object with the same properties as the existing state object.
      // the object should have the same schema as the initial state object.
      return {
        technical: true,
        nonTechnical: true,
      }
    case "TECHNICAL":
      return {
        technical: true,
        nonTechnical: false,
      }
    case "NONTECHNICAL":
      return {
        technical: false,
        nonTechnical: true,
      }
    default:
      throw new Error()
  }
}

// return {
//   count: state.count - action.payload,
// }
