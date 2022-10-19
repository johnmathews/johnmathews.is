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

const KeyboardShortcuts = () => {
  const router = useRouter()

  // https://www.anycodings.com/1questions/5494275/focusing-input-field-with-mousetrapjs-but-input-field-also-pastes-the-hotkey-as-value
  useMousetrap("command+k", (e) => {
    let searchBox = document.querySelector(".aa-DetachedSearchButtonPlaceholder")
    simulateMouseClick(searchBox)
    searchBox.focus()
    e.preventDefault()
  })

  useMousetrap("j", () => {
    window.scrollBy({ top: 200, left: 0, behavior: "smooth" })
  })

  useMousetrap("k", () => {
    window.scrollBy({ top: -200, left: 0, behavior: "smooth" })
  })

  useMousetrap("g f", () => {
    window.history.forward()
  })
  useMousetrap("g b", () => {
    window.history.back()
  })

  // useMousetrap('g g', () => {
  //   $('html, body').animate({ scrollTop: 0 }, 500)
  // })
  // useMousetrap('G', () => {
  //   $('html, body').animate({ scrollBottom: 0 }, 500)
  // })

  useMousetrap("g s", () => {
    router.push("/snippets")
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
