import { useState, useEffect } from "react"
import useFetch from "react-fetch-hook"

import PageTitle from "@/components/PageTitle"

export async function getStaticProps() {
  return { props: {} }
}

// https://blog.logrocket.com/modern-api-data-fetching-methods-react/
// https://recharts.org/en-US/

export default function Analytics() {
  const ASSETS_LOCATION = "assets.johnmathews.is"

  const daily_costs = `https://${ASSETS_LOCATION}/website-analytics/daily_costs.JSON`
  const client_events = `https://${ASSETS_LOCATION}/website-analytics/aggregate-client-js-events.JSON`
  const page_views_ip_addresses = `https://${ASSETS_LOCATION}/website-analytics/aggregate-website-analyics.JSON`

  const { costsIsLoading, costsData, costsError } = useFetch(daily_costs)
  const { clientEventsIsLoading, clientEventsData, clientEventsError } = useFetch(client_events)
  const { pageViewsIsLoading, pageViewsData, pageViewsError } = useFetch(page_views_ip_addresses)

  return (
    <>
      <PageTitle>{"Analytics"}</PageTitle>

      {costsIsLoading && <div>A moment please...</div>}
      {costsError && (
        <div>{`There is a problem fetching the daily costs data - ${costsError}`}</div>
      )}
      {costsData}

      {clientEventsIsLoading && <div>A moment please...</div>}
      {clientEventsError && (
        <div>{`There is a problem fetching the client eventsdata - ${clientEventsError}`}</div>
      )}
      {clientEventsData}

      {pageViewsIsLoading && <div>A moment please...</div>}
      {pageViewsError && (
        <div>{`There is a problem fetching the page views data - ${pageViewsError}`}</div>
      )}
      {pageViewsData}
    </>
  )
}
