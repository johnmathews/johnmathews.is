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
// THIS SEEMS HALF DONE NOTE WORKING NOT FINISHED TODO
function downArrow() {
  const event = new KeyboardEvent("keypress", {
    key: "ArrowDown",
  })

  new KeyboardEvent("keydown", { key: "ArrowDown", charCode: 0, keyCode: 40, bubbles: true })
  return new KeyboardEvent("keydown", { key: "ArrowDown", charCode: 0, keyCode: 40, bubbles: true })
}

function clientEventLogger(pathname, data) {
  const url = `https://us-central1-johnmathews-website.cloudfunctions.net/client-event-logger?path=${pathname}`
  window.navigator.sendBeacon(url, data)
}

const KeyboardShortcuts = () => {
  const router = useRouter()

  // https://www.anycodings.com/1questions/5494275/focusing-input-field-with-mousetrapjs-but-input-field-also-pastes-the-hotkey-as-value
  useMousetrap("command+k", (e) => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "cmd+k" })
    clientEventLogger(router.asPath, data)
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
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "va" })
    clientEventLogger(router.asPath, data)
    let allPostsButton = document.querySelector("#selectAllPosts")
    simulateMouseClick(allPostsButton)
  })
  useMousetrap("v n", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "vn" })
    clientEventLogger(router.asPath, data)
    let nonTechnicalButton = document.querySelector("#selectNonTechnical")
    simulateMouseClick(nonTechnicalButton)
  })
  useMousetrap("v t", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "vt" })
    clientEventLogger(router.asPath, data)
    let technicalButton = document.querySelector("#selectTechnical")
    simulateMouseClick(technicalButton)
  })

  useMousetrap("t t", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "tt" })
    clientEventLogger(router.asPath, data)
    let themeButton = document.querySelector("#themeSwitcher")
    simulateMouseClick(themeButton)
  })

  useMousetrap("j", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "j" })
    clientEventLogger(router.asPath, data)
    window.scrollBy({ top: 200, left: 0, behavior: "smooth" })
  })

  useMousetrap("k", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "k" })
    clientEventLogger(router.asPath, data)
    window.scrollBy({ top: -200, left: 0, behavior: "smooth" })
  })

  useMousetrap("g g", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gg" })
    clientEventLogger(router.asPath, data)
    window.scrollTo(0, 0)
  })

  useMousetrap("G", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "G" })
    clientEventLogger(router.asPath, data)
    window.scrollTo(0, 999999)
  })

  useMousetrap("ctrl+j", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "ctrl+j" })
    clientEventLogger(router.asPath, data)
    downArrow()
  })
  useMousetrap("ctrl+k", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "ctrl+k" })
    clientEventLogger(router.asPath, data)
    // write an upArrow function but make downArrow work first
  })

  useMousetrap("g f", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gf" })
    clientEventLogger(router.asPath, data)
    window.history.forward()
  })
  useMousetrap("g b", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gb" })
    clientEventLogger(router.asPath, data)
    window.history.back()
  })

  useMousetrap("g c", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gc" })
    clientEventLogger(router.asPath, data)
    router.push("/categories")
  })

  useMousetrap("g s", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gs" })
    clientEventLogger(router.asPath, data)
    router.push("/snippets")
  })

  useMousetrap("g l", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gl" })
    clientEventLogger(router.asPath, data)
    router.push("/")
  })

  useMousetrap("g i", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gi" })
    clientEventLogger(router.asPath, data)
    router.push("/posts")
  })

  useMousetrap("g p", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gp" })
    clientEventLogger(router.asPath, data)
    router.push("/projects")
  })

  useMousetrap("g m", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gm" })
    clientEventLogger(router.asPath, data)
    router.push("/analytics")
  })

  useMousetrap("g a", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "ga" })
    clientEventLogger(router.asPath, data)
    router.push("/about")
  })

  return <></>
}

export default KeyboardShortcuts
