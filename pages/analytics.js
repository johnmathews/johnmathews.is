import PageTitle from "@/components/PageTitle"

import ViewsToday from "@/components/homeBrewAnalytics/viewsToday"
import DailyUsers from "@/components/homeBrewAnalytics/dailyUsersChartData"
import UserInteractionsData from "@/components/homeBrewAnalytics/userInteractionsChartData"
import DailyCostsData from "@/components/homeBrewAnalytics/dailyCostsChartData"
import PageViewsData from "@/components/homeBrewAnalytics/pageViewsChartData"
import CostToday from "@/components/homeBrewAnalytics/costToday"
import UsersToday from "@/components/homeBrewAnalytics/usersToday"
import ViewsPerPagePerDay from "@/components/homeBrewAnalytics/viewsPerPagePerDay"

import siteMetadata from "@/data/siteMetadata"

export async function getStaticProps() {
  return { props: {} }
}

export default function Analytics() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const page_views_ip_addresses = `https://${siteMetadata.dataBucket}/website-analytics/aggregate-website-analyics.JSON`
  const dailyCosts = `https://${siteMetadata.dataBucket}/website-analytics/daily_costs.JSON`
  const user_interactions_endpoint = `https://${siteMetadata.dataBucket}/website-analytics/aggregate-client-js-events.JSON`

  return (
    <>
      <PageTitle>{"Analytics"}</PageTitle>

      <div id="gridContainer" className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ViewsToday fetcher={fetcher} pageViewsIPAddresses={page_views_ip_addresses} />
        <UsersToday fetcher={fetcher} pageViewsIPAddresses={page_views_ip_addresses} />
        <CostToday fetcher={fetcher} url={dailyCosts} />
        <ViewsPerPagePerDay fetcher={fetcher} url={page_views_ip_addresses} />
        <DailyUsers fetcher={fetcher} pageViewsIPAddresses={page_views_ip_addresses} />
        <PageViewsData fetcher={fetcher} pageViewsIPAddresses={page_views_ip_addresses} />
        <UserInteractionsData
          fetcher={fetcher}
          user_interactions_endpoint={user_interactions_endpoint}
        />
        <DailyCostsData fetcher={fetcher} pageViewsIPAddresses={page_views_ip_addresses} />
      </div>
    </>
  )
}
