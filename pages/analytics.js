import { useState, useEffect } from "react"

import PageTitle from "@/components/PageTitle"

export async function getStaticProps() {
  return { props: {} }
}

// https://blog.logrocket.com/modern-api-data-fetching-methods-react/
// https://recharts.org/en-US/

export default function Analytics() {
  const ASSETS_LOCATION = "assets.johnmathews.is"
  const daily_costs = `https://${ASSETS_LOCATION}/website-analytics/daily_costs.JSON`
  console.log("--- debug daily_costs: ", daily_costs)
  // const client_events = `https://${ASSETS_LOCATION}/website-analytics/aggregate-client-js-events.JSON`
  // const page_views_ip_addresses = `https://${ASSETS_LOCATION}/website-analytics/aggregate-website-analyics.JSON`

  const [costData, setCostData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(daily_costs)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setCostData(data["daily_costs"])
        setError(null)
      })
      .catch((err) => {
        console.log(err.message)
        setError(err.message)
        setCostData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [daily_costs])
  return (
    <>
      <PageTitle>{"Analytics"}</PageTitle>

      {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}

      {costData}
    </>
  )
}
