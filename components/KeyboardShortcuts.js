import useMousetrap from "mousetrap-react"
// import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/router"

const mouseClickEvents = ["click"]
function simulateMouseClick(element) {
  mouseClickEvents.forEach((mouseEventType) =>
    element.dispatchEvent(
      new MouseEvent(mouseEventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    )
  )
}

// https://www.google.com/search?client=firefox-b-d&q=react+map+key+to+arrow+up
// https://stackoverflow.com/questions/42036865/react-how-to-navigate-through-list-by-arrow-keys

function downArrow() {
  const event = new KeyboardEvent("keypress", {
    key: "ArrowDown",
  })

  new KeyboardEvent("keydown", { key: "ArrowDown", charCode: 0, keyCode: 40, bubbles: true })
  return new KeyboardEvent("keydown", { key: "ArrowDown", charCode: 0, keyCode: 40, bubbles: true })
}

const KeyboardShortcuts = () => {
  const router = useRouter()

  // https://www.anycodings.com/1questions/5494275/focusing-input-field-with-mousetrapjs-but-input-field-also-pastes-the-hotkey-as-value
  useMousetrap("command+k", (e) => {
    e.preventDefault()

    let searchBox = document.querySelector(".aa-DetachedSearchButtonPlaceholder")
    let overlay = document.querySelector(".aa-DetachedCancelButton")

    if (overlay) {
      simulateMouseClick(overlay)
      e.preventDefault()
    } else {
      simulateMouseClick(searchBox)
      searchBox.focus()
      e.preventDefault()
    }
  })

  useMousetrap("v a", () => {
    let allPostsButton = document.querySelector("#selectAllPosts")
    simulateMouseClick(allPostsButton)
  })
  useMousetrap("v n", () => {
    let nonTechnicalButton = document.querySelector("#selectNonTechnical")
    simulateMouseClick(nonTechnicalButton)
  })
  useMousetrap("v t", () => {
    let technicalButton = document.querySelector("#selectTechnical")
    simulateMouseClick(technicalButton)
  })

  useMousetrap("t t", () => {
    let themeButton = document.querySelector("#themeSwitcher")
    simulateMouseClick(themeButton)
  })

  useMousetrap("j", () => {
    window.scrollBy({ top: 200, left: 0, behavior: "smooth" })
  })

  useMousetrap("k", () => {
    window.scrollBy({ top: -200, left: 0, behavior: "smooth" })
  })

  useMousetrap("g g", () => {
    window.scrollTo(0, 0)
  })

  useMousetrap("G", () => {
    window.scrollTo(0, 999999)
  })

  // var keyboardEvent = document.createEvent("KeyboardEvent")
  // var initMethod =
  //   typeof keyboardEvent.initKeyboardEvent !== "undefined" ? "initKeyboardEvent" : "initKeyEvent"

  // keyboardEvent[initMethod](
  //   "keydown", // event type: keydown, keyup, keypress
  //   true, // bubbles
  //   true, // cancelable
  //   window, // view: should be window
  //   false, // ctrlKey
  //   false, // altKey
  //   false, // shiftKey
  //   false, // metaKey
  //   40, // keyCode: unsigned long - the virtual key code, else 0
  //   0 // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
  // )
  // document.dispatchEvent(keyboardEvent)

  useMousetrap("ctrl+j", () => {
    downArrow()
  })

  useMousetrap("g f", () => {
    window.history.forward()
  })
  useMousetrap("g b", () => {
    window.history.back()
  })

  useMousetrap("g c", () => {
    router.push("/categories")
  })

  useMousetrap("g s", () => {
    router.push("/snippets")
  })

  useMousetrap("g l", () => {
    router.push("/")
  })

  useMousetrap("g i", () => {
    router.push("/posts")
  })

  useMousetrap("g p", () => {
    router.push("/projects")
  })

  useMousetrap("g a", () => {
    router.push("/about")
  })

  return <></>
}

export default KeyboardShortcuts
