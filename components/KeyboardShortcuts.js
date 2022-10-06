import useMousetrap from "mousetrap-react"
// import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/router"

const KeyboardShortcuts = () => {
  const router = useRouter()
  // const navigate = useNavigate();
  // const goToSnippets = useCallback(() => navigate('/snippets', { replace: true }), [navigate]);

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
