import { useState, useEffect } from "react"
import useFetch from "react-fetch-hook"

import PageTitle from "@/components/PageTitle"

export async function getStaticProps() {
  return { props: {} }
}

// https://blog.logrocket.com/modern-api-data-fetching-methods-react/
// https://recharts.org/en-US/guide/getting-started

export default function Analytics() {
  const ASSETS_LOCATION = "assets.johnmathews.is"

  const daily_costs = `https://${ASSETS_LOCATION}/website-analytics/daily_costs.JSON`
  const client_events = `https://${ASSETS_LOCATION}/website-analytics/aggregate-client-js-events.JSON`
  const page_views_ip_addresses = `https://${ASSETS_LOCATION}/website-analytics/aggregate-website-analyics.JSON`

  const {
    isLoading: dailyCostsIsLoading,
    data: dailyCostsData,
    error: dailyCostsError,
  } = useFetch(daily_costs)
  console.log("--- debug dailyCostsData: ", dailyCostsData)
  // const { isLoading, data, error } = useFetch(client_events)
  // const { isLoading, data, error } = useFetch(page_views_ip_addresses)

  return (
    <>
      <PageTitle>{"Analytics"}</PageTitle>
      {dailyCostsIsLoading && <div>A moment please...</div>}
      {dailyCostsError && (
        <div>{`There is a problem fetching the daily costs data - ${dailyCostsError}`}</div>
      )}
      {dailyCostsData && <div>{dailyCostsData["daily_costs"]} </div>}
    </>
  )
}
