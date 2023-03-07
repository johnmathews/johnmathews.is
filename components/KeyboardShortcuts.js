import { useContext } from 'react'
import { useRouter } from 'next/router'
import useMousetrap from 'mousetrap-react'

import { AppContext } from '@/components/ContextProvider'
import { setToStorage } from '@/lib/localStorage'

const mouseClickEvents = ['click']

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

function clientEventLogger(pathname, data) {
  const url = `https://us-central1-johnmathews-website.cloudfunctions.net/client-event-logger?path=${pathname}`
  window.navigator.sendBeacon(url, data)
}

const KeyboardShortcuts = () => {
  const router = useRouter()
  const [state, dispatch] = useContext(AppContext)

  function TOGGLE_MODAL() {
    dispatch({
      type: 'MODAL',
    })
  }
  function HIDE_MODAL() {
    if (state.showModal) {
      dispatch({
        type: 'HIDE_MODAL',
      })
    }
  }

  function HOUSEKEEPING(resetList = true, resetScroll = false) {
    HIDE_MODAL()
    if (resetList) {
      dispatch({ type: 'LIST_POSITION_RESET' })
      dispatch({ type: 'KEYBOARD_MODE_OFF' })
    }
    if (resetScroll) {
      window.scrollTo(0, 0)
    }
  }

  // https://www.anycodings.com/1questions/5494275/focusing-input-field-with-mousetrapjs-but-input-field-also-pastes-the-hotkey-as-value
  useMousetrap(['/', 'command+k'], (e) => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cmd+k' })
    clientEventLogger(router.asPath, data)
    e.preventDefault()

    let searchBox = document.querySelector('.aa-DetachedSearchButtonPlaceholder')
    let overlay = document.querySelector('.aa-DetachedCancelButton')

    if (overlay) {
      simulateMouseClick(overlay)
      e.preventDefault()
    } else {
      simulateMouseClick(searchBox)
      searchBox.focus()
      e.preventDefault()
    }
  })

  useMousetrap(['tab'], () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'tab' })
    clientEventLogger(router.asPath, data)
    dispatch({ type: 'TOGGLE_KEYBOARD_HINTS' })
  })

  useMousetrap(['j'], () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'j' })
    clientEventLogger(router.asPath, data)
    window.scrollBy({ top: 200, left: 0, behavior: 'smooth' })
    HIDE_MODAL()
  })

  useMousetrap(['k'], () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'k' })
    clientEventLogger(router.asPath, data)
    window.scrollBy({ top: -200, left: 0, behavior: 'smooth' })
    HIDE_MODAL()
  })

  useMousetrap('ctrl+j', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ctrl+j' })
    clientEventLogger(router.asPath, data)
    // this keyboard_mode_on needs to exist, and be before the "selected"
    // element is getted, because if keyboard mode is off (normal mode) then
    // selection boxes arent visible because the page looks normal
    dispatch({ type: 'KEYBOARD_MODE_ON' })
    const element = document.getElementsByClassName('selected')
    if (element[0] != undefined) {
      dispatch({ type: 'LIST_POSITION_INCREASE' }) // this changes the index and therefore changes what element has "selected" status
      try {
        element[0].scrollIntoView({ behavior: 'smooth', block: 'end' })
        const y = element[0].getBoundingClientRect().top + window.pageYOffset - 400
        window.scrollTo({ top: y, behavior: 'smooth' })
      } catch {
        dispatch({ type: 'LIST_POSITION_RESET' })
      }
    } else {
      // https://stackoverflow.com/questions/596481/is-it-possible-to-simulate-key-press-events-programmatically
    }
  })

  useMousetrap('ctrl+k', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ctrl+j' })
    clientEventLogger(router.asPath, data)
    // this keyboard_mode_on needs to exist, and be before the "selected"
    // element is getted, because if keyboard mode is off (normal mode) then
    // selection boxes arent visible because the page looks normal
    dispatch({ type: 'KEYBOARD_MODE_ON' })
    const element = document.getElementsByClassName('selected')
    if (element.length > 0) {
      dispatch({ type: 'LIST_POSITION_DECREASE' })
      const y = element[0].getBoundingClientRect().top + window.pageYOffset - 400
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      // https://stackoverflow.com/questions/596481/is-it-possible-to-simulate-key-press-events-programmatically
    }
  })

  useMousetrap('return', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'return' })
    clientEventLogger(router.asPath, data)
    let selectedPost = document.querySelector('.viewable .selected')
    dispatch({ type: 'LIST_POSITION_RESET' })
    simulateMouseClick(selectedPost)
    HOUSEKEEPING()
  })

  useMousetrap(['?', 'esc', 'q'], () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: '?' })
    clientEventLogger(router.asPath, data)
    TOGGLE_MODAL()
  })

  useMousetrap('n p', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'np' })
    clientEventLogger(router.asPath, data)
    let nextPostButton = document.querySelector('#nextPost')
    simulateMouseClick(nextPostButton)
    HIDE_MODAL()
    dispatch({ type: 'LIST_POSITION_RESET' })
  })
  useMousetrap('p p', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'pp' })
    clientEventLogger(router.asPath, data)
    let prevPostButton = document.querySelector('#previousPost')
    simulateMouseClick(prevPostButton)
    HOUSEKEEPING()
  })

  useMousetrap('v a', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'va' })
    clientEventLogger(router.asPath, data)
    setToStorage('postFilter', 'both')
    let allPostsButton = document.querySelector('#selectAllPosts')
    simulateMouseClick(allPostsButton)
    HOUSEKEEPING({ resetList: false, resetScroll: true })
  })
  useMousetrap('v n', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'vn' })
    clientEventLogger(router.asPath, data)
    setToStorage('postFilter', 'nontechnical')
    let nonTechnicalButton = document.querySelector('#selectNonTechnical')
    simulateMouseClick(nonTechnicalButton)
    HOUSEKEEPING({ resetList: true, resetScroll: true })
  })
  useMousetrap('v t', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'vt' })
    clientEventLogger(router.asPath, data)
    setToStorage('postFilter', 'technical')
    let technicalButton = document.querySelector('#selectTechnical')
    simulateMouseClick(technicalButton)
    HOUSEKEEPING({ resetList: true, resetScroll: true })
  })

  useMousetrap('t t', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'tt' })
    clientEventLogger(router.asPath, data)
    let themeButton = document.querySelector('#themeSwitcher')
    simulateMouseClick(themeButton)
    HOUSEKEEPING({ resetList: false, resetScroll: false })
  })

  useMousetrap('g g', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gg' })
    clientEventLogger(router.asPath, data)
    window.scrollTo(0, 0)
    HOUSEKEEPING({ resetList: false, resetScroll: false })
  })

  useMousetrap('G', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'G' })
    clientEventLogger(router.asPath, data)
    window.scrollTo(0, 999999)
    HOUSEKEEPING({ resetList: false, resetScroll: false })
  })

  useMousetrap('b f', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gf' })
    clientEventLogger(router.asPath, data)
    window.history.forward()
    HOUSEKEEPING()
  })
  useMousetrap('b b', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gb' })
    clientEventLogger(router.asPath, data)
    window.history.back()
    HOUSEKEEPING()
  })

  useMousetrap('c a', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ca' })
    clientEventLogger(router.asPath, data)
    router.push('/categories')
    HOUSEKEEPING()
  })
  useMousetrap('c b', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cb' })
    clientEventLogger(router.asPath, data)
    router.push('/bible')
    HOUSEKEEPING()
  })
  useMousetrap('c e', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ce' })
    clientEventLogger(router.asPath, data)
    router.push('/engineering')
    HOUSEKEEPING()
  })
  useMousetrap('c f', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cf' })
    clientEventLogger(router.asPath, data)
    router.push('/finance')
    HIDE_MODAL()
    dispatch({ type: 'LIST_POSITION_RESET' })
  })
  useMousetrap('c m', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cm' })
    clientEventLogger(router.asPath, data)
    router.push('/micro-saas')
    HOUSEKEEPING()
  })
  useMousetrap('c n', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cn' })
    clientEventLogger(router.asPath, data)
    router.push('/math')
    HOUSEKEEPING()
  })
  useMousetrap('c k', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ck' })
    clientEventLogger(router.asPath, data)
    router.push('/books')
    HOUSEKEEPING()
  })
  useMousetrap('c l', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cl' })
    clientEventLogger(router.asPath, data)
    router.push('/longform')
    HOUSEKEEPING()
  })
  useMousetrap('c p', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cp' })
    clientEventLogger(router.asPath, data)
    router.push('/sport')
    HOUSEKEEPING()
  })
  useMousetrap('c s', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cs' })
    clientEventLogger(router.asPath, data)
    router.push('/summaries')
    HOUSEKEEPING()
  })
  useMousetrap('c t', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ct' })
    clientEventLogger(router.asPath, data)
    router.push('/meta')
    HOUSEKEEPING()
  })

  useMousetrap('g a', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ga' })
    clientEventLogger(router.asPath, data)
    router.push('/about')
    HOUSEKEEPING()
  })
  useMousetrap('g c', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gc' })
    clientEventLogger(router.asPath, data)
    router.push('/collections')
    HOUSEKEEPING()
  })
  useMousetrap('g e', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ge' })
    clientEventLogger(router.asPath, data)
    router.push('/experience')
    HOUSEKEEPING()
  })
  useMousetrap('g i', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gi' })
    clientEventLogger(router.asPath, data)
    router.push('/posts')
    HOUSEKEEPING()
  })
  useMousetrap('g j', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gp' })
    clientEventLogger(router.asPath, data)
    router.push('/projects')
    HOUSEKEEPING()
  })
  useMousetrap('g l', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gl' })
    clientEventLogger(router.asPath, data)
    router.push('/')
    HOUSEKEEPING()
  })
  useMousetrap('g m', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gm' })
    clientEventLogger(router.asPath, data)
    router.push('/metrics')
    HOUSEKEEPING()
  })
  useMousetrap('g p', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gp' })
    clientEventLogger(router.asPath, data)
    router.push('/photographs')
    HOUSEKEEPING()
  })
  useMousetrap('g s', () => {
    let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gs' })
    clientEventLogger(router.asPath, data)
    router.push('/snippets')
    HOUSEKEEPING()
  })
  return <></>
}

export default KeyboardShortcuts
