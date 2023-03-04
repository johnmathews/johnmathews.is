export default function reducer(state, action) {
  switch (action.type) {
    case "ALL":
      return {
        technical: true,
        nonTechnical: true,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
        keyboardMode: state.keyboardMode,
        keyboardHints: state.keyboardHints,
        searchVisible: state.searchVisible,
      }
    case "TECHNICAL":
      return {
        technical: true,
        nonTechnical: false,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
        keyboardMode: state.keyboardMode,
        keyboardHints: state.keyboardHints,
        searchVisible: state.searchVisible,
      }
    case "NONTECHNICAL":
      return {
        technical: false,
        nonTechnical: true,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
        keyboardHints: state.keyboardHints,
        keyboardMode: state.keyboardMode,
        searchVisible: state.searchVisible,
      }
    case "BLOG_POST":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: action.frontMatter,
        showModal: state.showModal,
        listPosition: state.listPosition,
        keyboardMode: state.keyboardMode,
        keyboardHints: state.keyboardHints,
        searchVisible: state.searchVisible,
      }
    case "MODAL":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: !state.showModal,
        listPosition: state.listPosition,
        keyboardMode: state.keyboardMode,
        keyboardHints: state.keyboardHints,
        searchVisible: state.searchVisible,
      }
    case "HIDE_MODAL":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: false,
        listPosition: state.listPosition,
        keyboardMode: state.keyboardMode,
        keyboardHints: state.keyboardHints,
        searchVisible: state.searchVisible,
      }
    case "LIST_POSITION_RESET":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: false,
        listPosition: -1,
        keyboardMode: state.keyboardMode,
        keyboardHints: state.keyboardHints,
        searchVisible: state.searchVisible,
      }
    case "LIST_POSITION_INCREASE":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: false,
        listPosition: state.listPosition + 1,
        keyboardMode: state.keyboardMode,
        keyboardHints: state.keyboardHints,
        searchVisible: state.searchVisible,
      }
    case "LIST_POSITION_DECREASE":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: false,
        listPosition: Math.max(state.listPosition - 1, 0),
        keyboardMode: state.keyboardMode,
        keyboardHints: state.keyboardHints,
        searchVisible: state.searchVisible,
      }
    case "TOGGLE_KEYBOARD_HINTS":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
        keyboardHints: !state.keyboardHints,
        keyboardMode: state.keyboardMode,
        searchVisible: state.searchVisible,
      }
    case "KEYBOARD_MODE_ON":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
        keyboardHints: state.keyboardHints,
        keyboardMode: true,
        searchVisible: state.searchVisible,
      }
    case "KEYBOARD_MODE_OFF":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
        keyboardHints: state.keyboardHints,
        keyboardMode: false,
        searchVisible: state.searchVisible,
      }
    default:
      throw new Error()
  }
}
