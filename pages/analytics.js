import PageTitle from "@/components/PageTitle"

import ViewsToday from "@/components/homeBrewAnalytics/viewsToday"
import DailyUsers from "@/components/homeBrewAnalytics/dailyUsersChartData"
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
