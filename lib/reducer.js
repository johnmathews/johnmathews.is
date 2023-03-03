export default function reducer(state, action) {
  switch (action.type) {
    case "ALL":
      return {
        technical: true,
        nonTechnical: true,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
      }
    case "TECHNICAL":
      return {
        technical: true,
        nonTechnical: false,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
      }
    case "NONTECHNICAL":
      return {
        technical: false,
        nonTechnical: true,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
        listPosition: state.listPosition,
      }
    case "BLOG_POST":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: action.frontMatter,
        showModal: state.showModal,
        listPosition: state.listPosition,
      }
    case "MODAL":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: !state.showModal,
        listPosition: state.listPosition,
      }
    case "HIDE_MODAL":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: false,
        listPosition: state.listPosition,
      }
    case "LIST_POSITION_INCREASE":
      console.log("--- debug state.listPosition: ", state.listPosition)
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: false,
        listPosition: state.listPosition + 1,
      }
    case "LIST_POSITION_DECREASE":
      console.log("--- debug state.listPosition: ", state.listPosition)
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: false,
        listPosition: Math.max(state.listPosition - 1, 0),
      }
    default:
      throw new Error()
  }
}
