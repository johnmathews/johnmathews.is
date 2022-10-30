import "@/css/tailwind.css"
import "@/css/prism.css"
import "katex/dist/katex.css"
import { createContext, useContext } from "react"

import "@fontsource/inter/variable-full.css"

import { ThemeProvider } from "next-themes"
import Head from "next/head"

import siteMetadata from "@/data/siteMetadata"
import Analytics from "@/components/analytics"
import LayoutWrapper from "@/components/LayoutWrapper"
import KeyboardShortcusts from "@/components/KeyboardShortcuts"
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
        <Component {...pageProps} />
        <KeyboardShortcuts />
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
        <KeyboardShortcuts />
      </ThemeProvider>
    )
  }
}
