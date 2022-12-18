import { useContext } from "react"
import { AppContext } from "@/components/ContextProvider"

import keyboardShortcutsMenuItems from "@/data/keyboardShortcutsMenuItems"

const Modal = () => {
  const [state, _] = useContext(AppContext)
  const bgOpacity = "rgba(128,128,128,0.25)"
  var show = state.showModal
  return (
    <>
      {show ? (
        <div
          id="keyboardShortcutsModalincludingBackground"
          style={{ backgroundColor: bgOpacity }}
          className="absolute top-0 left-0 flex h-screen w-full items-center bg-gray-100 "
        >
          <div
            id="centralBox"
            className="mx-auto grid grid-cols-2 gap-x-20 gap-y-2 rounded-lg border-2 border-slate-800 bg-slate-200 p-12"
          >
            <div className="col-span-2 mx-auto mb-8 text-2xl font-semibold text-gray-800">
              Keyboard Shortcuts
            </div>

            {keyboardShortcutsMenuItems.map((item) => (
              <div key={item.item} className="flex text-gray-800">
                <div className="mr-2  rounded-lg border-2 bg-gray-400 px-2 ">{item.item}</div>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal
