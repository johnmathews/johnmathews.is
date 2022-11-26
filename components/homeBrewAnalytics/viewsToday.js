import useSWR from "swr"

import siteMetadata from "@/data/siteMetadata"

export default function ViewsToday() {
  const page_views_ip_addresses = `https://${siteMetadata.dataBucket}/website-analytics/aggregate-website-analyics.JSON`

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR(page_views_ip_addresses, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>Views Today: loading...</div>

  const daily_views = JSON.parse(data.daily_views)
  // let dailyIpAddresses = JSON.parse(data.daily_ip_addresses)
  // let dailyIpAddresses = dailyIpAddresses.ip_address
  // const viewsPageDay = JSON.parse(data.views_per_page_per_day)

  const dailyViewsCleaned = {}
  for (var i in Object.keys(daily_views.page)) {
    var epoch = parseInt(Object.keys(daily_views.page)[i])
    var viewDate = new Date(epoch)
    var viewCount = daily_views.page[Object.keys(daily_views.page)[i]]
    dailyViewsCleaned[viewDate] = viewCount
  }

  const dates = Object.keys(dailyViewsCleaned)
  const today = dates[0]
  const viewsToday = dailyViewsCleaned[today]

  return (
    <div id="viewsToday" className="min-h-32 border-2 border-slate-800 p-3  ">
      Views Today: {viewsToday}
    </div>
  )
}