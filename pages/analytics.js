import PageTitle from "@/components/PageTitle"

import ViewsToday from "@/components/homeBrewAnalytics/viewsToday"
import CostToday from "@/components/homeBrewAnalytics/costToday"
import UsersToday from "@/components/homeBrewAnalytics/usersToday"
import ViewsPerPagePerDay from "@/components/homeBrewAnalytics/viewsPerPagePerDay"

import siteMetadata from "@/data/siteMetadata"

export async function getStaticProps() {
  return { props: {} }
}

// https://blog.logrocket.com/modern-api-data-fetching-methods-react/
// https://recharts.org/en-US/guide/getting-started

export default function Analytics() {
  // const daily_costs = `https://${ASSETS_LOCATION}/website-analytics/daily_costs.JSON`
  // const {
  //   isLoading: dailyCostsIsLoading,
  //   data: dailyCostsData,
  //   error: dailyCostsError,
  // } = useFetch(daily_costs)
  // console.log("--- debug dailyCostsData: ", dailyCostsData)

  // const page_views_ip_addresses = `https://${ASSETS_LOCATION}/website-analytics/aggregate-website-analyics.JSON`
  // const {
  //   isLoading: pageViewsIsLoading,
  //   data: pageViewsData,
  //   error: pageViewsError,
  // } = useFetch(page_views_ip_addresses)
  // console.log("--- debug pageViewsData: ", pageViewsData)

  // const client_events = `https://${ASSETS_LOCATION}/website-analytics/aggregate-client-js-events.JSON`
  // const {
  //   isLoading: clientEventsIsLoading,
  //   data: clientEventsData,
  //   error: clientEventsError,
  // } = useFetch(client_events)
  // console.log("--- debug clientEventsData: ", clientEventsData)

  // const values = Promise.all([pageViewsData]).then((values) => {
  //   console.log("--- debug values: ", values)
  //   return values
  // })

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const page_views_ip_addresses = `https://${siteMetadata.dataBucket}/website-analytics/aggregate-website-analyics.JSON`
  const dailyCosts = `https://${siteMetadata.dataBucket}/website-analytics/daily_costs.JSON`

  return (
    <>
      <PageTitle>{"Analytics"}</PageTitle>

      <div id="gridContainer" className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ViewsToday fetcher={fetcher} pageViewsIPAddresses={page_views_ip_addresses} />
        <UsersToday fetcher={fetcher} pageViewsIPAddresses={page_views_ip_addresses} />
        <CostToday fetcher={fetcher} url={dailyCosts} />
        <ViewsPerPagePerDay fetcher={fetcher} url={page_views_ip_addresses} />
        <div id="pageViews" className="min-h-32 col-span-3 border-2 border-slate-800 p-3">
          page views
        </div>
        <div id="uniqueIPAddresses" className="min-h-32 col-span-3 border-2 border-slate-800 p-3">
          unique ip addresses
        </div>
        <div id="userInteractions" className="min-h-32  col-span-3 border-2 border-slate-800 p-3">
          user interactions
        </div>
        <div id="dailyCosts" className="min-h-32  col-span-3 border-2 border-slate-800 p-3">
          daily costs
        </div>
      </div>
    </>
  )
}
