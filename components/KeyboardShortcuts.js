import { useContext } from 'react'
import { useRouter } from 'next/router'

import { useHotkeys } from 'reakeys'

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
    dispatch({ type: 'KEYBOARD_HINTS_OFF' })
    if (resetList) {
      dispatch({ type: 'LIST_POSITION_RESET' })
      dispatch({ type: 'KEYBOARD_MODE_OFF' })
    }
    if (resetScroll) {
      window.scrollTo(0, 0)
    }
  }

  // https://www.anycodings.com/1questions/5494275/focusing-input-field-with-mousetrapjs-but-input-field-also-pastes-the-hotkey-as-value
  useHotkeys([
    {
      name: 'Search',
      keys: ['/', 'command+k'],
      category: 'Search',
      callback: (e) => {
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
      },
    },
  ])

  useHotkeys([
    {
      name: 'tab',
      keys: ['tab'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'tab' })
        clientEventLogger(router.asPath, data)
        dispatch({ type: 'TOGGLE_KEYBOARD_HINTS' })
      },
    },
  ])

  useHotkeys([
    {
      name: 'j',
      keys: ['j'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'j' })
        clientEventLogger(router.asPath, data)
        window.scrollBy({ top: 200, left: 0, behavior: 'smooth' })
        HIDE_MODAL()
      },
    },
  ])

  useHotkeys([
    {
      name: 'k',
      keys: ['k'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'k' })
        clientEventLogger(router.asPath, data)
        window.scrollBy({ top: -200, left: 0, behavior: 'smooth' })
        HIDE_MODAL()
      },
    },
  ])

  useHotkeys([
    {
      name: 'ctrl+j',
      keys: ['ctrl+j'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ctrl+j' })
        clientEventLogger(router.asPath, data)
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
      },
    },
  ])

  useHotkeys([
    {
      name: 'ctrl+k',
      keys: ['ctrl+k'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ctrl+j' })
        clientEventLogger(router.asPath, data)
        dispatch({ type: 'KEYBOARD_MODE_ON' })
        const element = document.getElementsByClassName('selected')
        if (element[0] != undefined) {
          dispatch({ type: 'LIST_POSITION_DECREASE' })
          const y = element[0].getBoundingClientRect().top + window.pageYOffset - 400
          window.scrollTo({ top: y, behavior: 'smooth' })
        } else {
          // https://stackoverflow.com/questions/596481/is-it-possible-to-simulate-key-press-events-programmatically
        }
      },
    },
  ])

  useHotkeys([
    {
      name: 'return',
      keys: ['return'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'return' })
        clientEventLogger(router.asPath, data)
        let selectedPost = document.querySelector('.viewable .selected')
        dispatch({ type: 'LIST_POSITION_RESET' })
        simulateMouseClick(selectedPost)
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'escape',
      keys: ['?', 'esc', 'q'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: '?' })
        clientEventLogger(router.asPath, data)
        TOGGLE_MODAL()
      },
    },
  ])

  useHotkeys([
    {
      name: 'n p',
      keys: ['n', 'p'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'np' })
        clientEventLogger(router.asPath, data)
        let nextPostButton = document.querySelector('#nextPost')
        simulateMouseClick(nextPostButton)
        HIDE_MODAL()
        dispatch({ type: 'LIST_POSITION_RESET' })
      },
    },
  ])

  useHotkeys([
    {
      name: 'p p',
      keys: ['p p'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'pp' })
        clientEventLogger(router.asPath, data)
        let prevPostButton = document.querySelector('#previousPost')
        simulateMouseClick(prevPostButton)
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'v a',
      keys: ['v a'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'va' })
        clientEventLogger(router.asPath, data)
        setToStorage('postFilter', 'both')
        let allPostsButton = document.querySelector('#selectAllPosts')
        simulateMouseClick(allPostsButton)
        HOUSEKEEPING({ resetList: true, resetScroll: true })
      },
    },
  ])

  useHotkeys([
    {
      name: 'v n',
      keys: ['v n'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'vn' })
        clientEventLogger(router.asPath, data)
        setToStorage('postFilter', 'nontechnical')
        let nonTechnicalButton = document.querySelector('#selectNonTechnical')
        simulateMouseClick(nonTechnicalButton)
        HOUSEKEEPING({ resetList: true, resetScroll: true })
      },
    },
  ])

  useHotkeys([
    {
      name: 'v t',
      keys: ['v t'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'vt' })
        clientEventLogger(router.asPath, data)
        setToStorage('postFilter', 'technical')
        let technicalButton = document.querySelector('#selectTechnical')
        simulateMouseClick(technicalButton)
        HOUSEKEEPING({ resetList: true, resetScroll: true })
      },
    },
  ])

  useHotkeys([
    {
      name: 't t',
      keys: ['t t'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'tt' })
        clientEventLogger(router.asPath, data)
        let themeButton = document.querySelector('#themeSwitcher')
        simulateMouseClick(themeButton)
        HOUSEKEEPING({ resetList: false, resetScroll: false })
      },
    },
  ])

  useHotkeys([
    {
      name: 'g g',
      keys: ['g g'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gg' })
        clientEventLogger(router.asPath, data)
        window.scrollTo(0, 0)
        HOUSEKEEPING({ resetList: false, resetScroll: false })
      },
    },
  ])

  useHotkeys([
    {
      name: 'G',
      keys: ['G'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'G' })
        clientEventLogger(router.asPath, data)
        window.scrollTo(0, 999999)
        HOUSEKEEPING({ resetList: false, resetScroll: false })
      },
    },
  ])

  useHotkeys([
    {
      name: 'b f',
      keys: ['b f'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gf' })
        clientEventLogger(router.asPath, data)
        window.history.forward()
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'b b',
      keys: ['b b'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gb' })
        clientEventLogger(router.asPath, data)
        window.history.back()
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c a',
      keys: ['c a'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ca' })
        clientEventLogger(router.asPath, data)
        router.push('/categories')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c b',
      keys: ['c b'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cb' })
        clientEventLogger(router.asPath, data)
        router.push('/bible')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c e',
      keys: ['c e'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ce' })
        clientEventLogger(router.asPath, data)
        router.push('/engineering')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c f',
      keys: ['c f'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cf' })
        clientEventLogger(router.asPath, data)
        router.push('/finance')
        HIDE_MODAL()
        dispatch({ type: 'LIST_POSITION_RESET' })
      },
    },
  ])

  useHotkeys([
    {
      name: 'c m',
      keys: ['c m'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cm' })
        clientEventLogger(router.asPath, data)
        router.push('/micro-saas')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c n',
      keys: ['c n'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cn' })
        clientEventLogger(router.asPath, data)
        router.push('/math')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c k',
      keys: ['c k'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ck' })
        clientEventLogger(router.asPath, data)
        router.push('/books')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c l',
      keys: ['c l'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cl' })
        clientEventLogger(router.asPath, data)
        router.push('/longform')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c p',
      keys: ['c p'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cp' })
        clientEventLogger(router.asPath, data)
        router.push('/sport')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c s',
      keys: ['c s'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'cs' })
        clientEventLogger(router.asPath, data)
        router.push('/summaries')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'c t',
      keys: ['c t'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ct' })
        clientEventLogger(router.asPath, data)
        router.push('/meta')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g a',
      keys: ['g a'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ga' })
        clientEventLogger(router.asPath, data)
        router.push('/about')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g c',
      keys: ['g c'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gc' })
        clientEventLogger(router.asPath, data)
        router.push('/chat')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g o',
      keys: ['g o'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'go' })
        clientEventLogger(router.asPath, data)
        router.push('/collections')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g e',
      keys: ['g e'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'ge' })
        clientEventLogger(router.asPath, data)
        router.push('/experience')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g i',
      keys: ['g i'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gi' })
        clientEventLogger(router.asPath, data)
        router.push('/posts')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g p',
      keys: ['g p'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gp' })
        clientEventLogger(router.asPath, data)
        router.push('/projects')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g l',
      keys: ['g l'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gl' })
        clientEventLogger(router.asPath, data)
        router.push('/')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g m',
      keys: ['g m'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gm' })
        clientEventLogger(router.asPath, data)
        router.push('/metrics')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g f',
      keys: ['g f'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gf' })
        clientEventLogger(router.asPath, data)
        router.push('/photographs')
        HOUSEKEEPING()
      },
    },
  ])

  useHotkeys([
    {
      name: 'g s',
      keys: ['g s'],
      category: 'keys',
      callback: (e) => {
        let data = JSON.stringify({ category: 'keyboard-shortcut', event: 'gs' })
        clientEventLogger(router.asPath, data)
        router.push('/snippets')
        HOUSEKEEPING()
      },
    },
  ])
  return <></>
}

export default KeyboardShortcuts
