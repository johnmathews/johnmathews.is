export default function reducer(state, action) {
  switch (action.type) {
    case "ALL":
      return {
        technical: true,
        nonTechnical: true,
        blogPostMeta: state.blogPostMeta,
      }
    case "TECHNICAL":
      return {
        technical: true,
        nonTechnical: false,
        blogPostMeta: state.blogPostMeta,
      }
    case "NONTECHNICAL":
      return {
        technical: false,
        nonTechnical: true,
        blogPostMeta: state.blogPostMeta,
      }
    case "BLOG_POST":
      return {
        technical: state.technical,
        nonTechnical: state.nonTechnical,
        blogPostMeta: action.frontMatter,
      }
    default:
      throw new Error()
  }
}
