import "@/css/tailwind.css"
import "@/css/prism.css"
import "@/css/notebook.css"
import "@/css/snippets.css"
import "@/css/algolia.css"
import "katex/dist/katex.css"

// state management in React and Next.js
// https://www.smashingmagazine.com/2021/08/state-management-nextjs/

import "@fontsource/inter/variable-full.css"

import { ThemeProvider } from "next-themes"
import Head from "next/head"

import siteMetadata from "@/data/siteMetadata"
// import Analytics from "@/components/analytics"
import { Analytics } from "@vercel/analytics/react"
import LayoutWrapper from "@/components/LayoutWrapper"
import ContextProvider from "@/components/ContextProvider"
import { ClientReload } from "@/components/ClientReload"

import { useRouter } from "next/router"
import KeyboardShortcuts from "@/components/KeyboardShortcuts"

const isDevelopment = process.env.NODE_ENV === "development"
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  const router = useRouter()
  if (router.asPath == "/") {
    // landing page only
    return (
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        <Component {...pageProps} />
        <KeyboardShortcuts />
      </ThemeProvider>
    )
  } else if (router.query.slug !== undefined) {
    // blog posts only
    return (
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
        <KeyboardShortcuts />
      </ThemeProvider>
    )
  } else {
    // everything else (e.g. /about, list of blog posts, categories, tags)
    return (
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        <ContextProvider>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </ContextProvider>
        <KeyboardShortcuts />
      </ThemeProvider>
    )
  }
}
