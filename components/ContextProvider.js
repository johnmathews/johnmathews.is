import { createContext, useReducer } from "react"
import reducer from "@/lib/reducer"

// Create a context for the ap. You could create many contexts, or put an
// object with many attributes in one context.
export const AppContext = createContext()

// https://remarkablemark.org/blog/2021/03/21/managing-react-state-with-context/
// https://www.smashingmagazine.com/2021/08/state-management-nextjs/
// https://www.smashingmagazine.com/2022/08/react-context-propagation-javascript/
// https://reactjs.org/docs/context.html

const placeHolderPostMetaData = {
  title: "PLACEHOLDER",
  date: "2021-08-01",
  category: ["PLACEHOLDER"],
  next: "PLACEHOLDER",
  prev: "PLACEHOLDER",
}

const initialState = {
  technical: true,
  nonTechnical: true,
  postMetaData: placeHolderPostMetaData,
}

export default function ContextProvider(props) {
  // a reducer is a function that takes the current (initial) state and an action as arguments, and returns a new state result.
  const [state, dispatch] = useReducer(reducer, initialState)
  return <AppContext.Provider value={[state, dispatch]}>{props.children}</AppContext.Provider>
}
