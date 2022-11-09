import dynamic from "next/dynamic"

// https://www.npmjs.com/package/react-jupyter-notebook-viewer
// https://codesandbox.io/s/nextjs-example-react-jupyter-notebook-viewer-lzjcb5?file=/pages/index.js:0-36

const Notebook = dynamic(() => import("../components/Notebook"), {
  ssr: false,
})

export default function IndexPage() {
  return (
    <Notebook
      filePath="/path/to/notebook" // Or a raw JSON notebook file location online
      notebookInputLanguage="python"
      // Rest of the properties if required.
    />
  )
}
