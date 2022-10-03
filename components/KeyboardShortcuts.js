import useMousetrap from "mousetrap-react"
// import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/router"

const KeyboardShortcuts = () => {
  const router = useRouter()
  // const navigate = useNavigate();
  // const goToSnippets = useCallback(() => navigate('/snippets', { replace: true }), [navigate]);
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
