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
  const {
    isLoading: dailyCostsIsLoading,
    data: dailyCostsData,
    error: dailyCostsError,
  } = useFetch(daily_costs)
  console.log("--- debug dailyCostsData: ", dailyCostsData)

  const page_views_ip_addresses = `https://${ASSETS_LOCATION}/website-analytics/aggregate-website-analyics.JSON`
  const {
    isLoading: pageViewsIsLoading,
    data: pageViewsData,
    error: pageViewsError,
  } = useFetch(page_views_ip_addresses)
  console.log("--- debug pageViewsData: ", pageViewsData)

  const client_events = `https://${ASSETS_LOCATION}/website-analytics/aggregate-client-js-events.JSON`
  const {
    isLoading: clientEventsIsLoading,
    data: clientEventsData,
    error: clientEventsError,
  } = useFetch(client_events)
  console.log("--- debug clientEventsData: ", clientEventsData)

  return (
    <>
      <PageTitle>{"Analytics"}</PageTitle>

      <div className="my-3">
        <div className="text-2xl font-semibold">Daily Costs</div>
        {dailyCostsIsLoading && <div>A moment please...</div>}
        {dailyCostsError && (
          <div>{`There is a problem fetching the daily costs data - ${dailyCostsError}`}</div>
        )}
        {dailyCostsData && <div>{dailyCostsData["daily_costs"]} </div>}
      </div>
      <div className="my-3">
        <div className="text-2xl font-semibold">Page Views</div>
        {pageViewsIsLoading && <div>A moment please...</div>}
        {pageViewsError && (
          <div>{`There is a problem fetching the page views data - ${pageViewsError}`}</div>
        )}
        {pageViewsData && <div>{pageViewsData["daily_views"]} </div>}
      </div>
      <div className="my-3">
        <div className="text-2xl font-semibold">Client Events</div>
        {clientEventsIsLoading && <div>A moment please...</div>}
        {clientEventsError && (
          <div>{`There is a problem fetching the client events data - ${clientEventsError}`}</div>
        )}
        {clientEventsData && <div>{clientEventsData.daily_events_by_type} </div>}
      </div>
    </>
  )
}
