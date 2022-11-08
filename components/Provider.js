import { createContext, useReducer } from "react"
import reducer from "@/lib/reducer"

export const MyContext = createContext()
// https://remarkablemark.org/blog/2021/03/21/managing-react-state-with-context/
// https://www.smashingmagazine.com/2021/08/state-management-nextjs/
// https://www.smashingmagazine.com/2022/08/react-context-propagation-javascript/
// https://reactjs.org/docs/context.html

const initialState = {
  count: 0,
}

export default function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <MyContext.Provider value={[state, dispatch]}>{props.children}</MyContext.Provider>
}
