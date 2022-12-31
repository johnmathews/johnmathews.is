export default function reducer(state, action) {
  switch (action.type) {
    case "ALL":
      return {
        technical: true,
        nonTechnical: true,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
      }
    case "TECHNICAL":
      return {
        technical: true,
        nonTechnical: false,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
      }
    case "NONTECHNICAL":
      return {
        technical: false,
        nonTechnical: true,
        blogPostMeta: state.blogPostMeta,
        showModal: state.showModal,
      }
    case "BLOG_POST":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: action.frontMatter,
        showModal: state.showModal,
      }
    case "MODAL":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: !state.showModal,
      }
    case "HIDE_MODAL":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: state.blogPostMeta,
        showModal: false,
      }
    default:
      throw new Error()
  }
}
