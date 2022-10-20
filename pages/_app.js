import "@/css/tailwind.css"
import "@/css/prism.css"
import "katex/dist/katex.css"

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

// https://stackoverflow.com/questions/40769551/how-to-use-google-fonts-in-react-js
//
export default function App({ Component, pageProps }) {
  const router = useRouter()
  if (router.asPath == "/") {
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

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            async
            href="https://fonts.googleapis.com/css2?family=Cardo&display=swap"
            rel="stylesheet"
          />
          <link
            async
            href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap"
            rel="stylesheet"
          />
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
