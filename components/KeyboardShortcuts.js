import { useState } from "react"
import { useContext } from "react"
import { AppContext } from "@/components/ContextProvider"

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
// THIS SEEMS HALF DONE NOT WORKING NOT FINISHED TODO
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
  const [_, dispatch] = useContext(AppContext)

  function TOGGLE_MODAL() {
    dispatch({
      type: "MODAL",
    })
  }
  function HIDE_MODAL() {
    dispatch({
      type: "HIDE_MODAL",
    })
  }

  useMousetrap(["?", "esc", "q"], () => {
    TOGGLE_MODAL()
  })

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
    HIDE_MODAL()
  })
  useMousetrap("v n", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "vn" })
    clientEventLogger(router.asPath, data)
    let nonTechnicalButton = document.querySelector("#selectNonTechnical")
    simulateMouseClick(nonTechnicalButton)
    HIDE_MODAL()
  })
  useMousetrap("v t", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "vt" })
    clientEventLogger(router.asPath, data)
    let technicalButton = document.querySelector("#selectTechnical")
    simulateMouseClick(technicalButton)
    HIDE_MODAL()
  })

  useMousetrap("t t", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "tt" })
    clientEventLogger(router.asPath, data)
    let themeButton = document.querySelector("#themeSwitcher")
    simulateMouseClick(themeButton)
    HIDE_MODAL()
  })

  useMousetrap("j", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "j" })
    clientEventLogger(router.asPath, data)
    window.scrollBy({ top: 200, left: 0, behavior: "smooth" })
    HIDE_MODAL()
  })

  useMousetrap("k", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "k" })
    clientEventLogger(router.asPath, data)
    window.scrollBy({ top: -200, left: 0, behavior: "smooth" })
    HIDE_MODAL()
  })

  useMousetrap("g g", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gg" })
    clientEventLogger(router.asPath, data)
    window.scrollTo(0, 0)
    HIDE_MODAL()
  })

  useMousetrap("G", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "G" })
    clientEventLogger(router.asPath, data)
    window.scrollTo(0, 999999)
    HIDE_MODAL()
  })

  useMousetrap("ctrl+j", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "ctrl+j" })
    clientEventLogger(router.asPath, data)
    downArrow()
    HIDE_MODAL()
  })
  useMousetrap("ctrl+k", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "ctrl+k" })
    clientEventLogger(router.asPath, data)
    HIDE_MODAL()
    // write an upArrow function but make downArrow work first
  })

  useMousetrap("g f", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gf" })
    clientEventLogger(router.asPath, data)
    window.history.forward()
    HIDE_MODAL()
  })
  useMousetrap("g b", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gb" })
    clientEventLogger(router.asPath, data)
    window.history.back()
    HIDE_MODAL()
  })

  useMousetrap("g c", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gc" })
    clientEventLogger(router.asPath, data)
    router.push("/categories")
    HIDE_MODAL()
  })

  useMousetrap("g s", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gs" })
    clientEventLogger(router.asPath, data)
    router.push("/snippets")
    HIDE_MODAL()
  })

  useMousetrap("g l", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gl" })
    clientEventLogger(router.asPath, data)
    router.push("/")
    HIDE_MODAL()
  })

  useMousetrap("g i", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gi" })
    clientEventLogger(router.asPath, data)
    router.push("/posts")
    HIDE_MODAL()
  })

  useMousetrap("g p", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gp" })
    clientEventLogger(router.asPath, data)
    router.push("/projects")
    HIDE_MODAL()
  })

  useMousetrap("g m", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gm" })
    clientEventLogger(router.asPath, data)
    router.push("/metrics")
    HIDE_MODAL()
  })
  useMousetrap("g p", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gp" })
    clientEventLogger(router.asPath, data)
    router.push("/photographs")
    HIDE_MODAL()
  })
  useMousetrap("g k", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "gk" })
    clientEventLogger(router.asPath, data)
    router.push("/books")
    HIDE_MODAL()
  })

  useMousetrap("g a", () => {
    let data = JSON.stringify({ category: "keyboard-shortcut", event: "ga" })
    clientEventLogger(router.asPath, data)
    router.push("/about")
    HIDE_MODAL()
  })

  return <></>
}

export default KeyboardShortcuts
