import DailyCosts from "@/components/homeBrewAnalytics/dailyCostsChart"

import useSWR from "swr"

export default function DailyCostsData({ fetcher, dailyCostsEndpoint }) {
  const { data, error } = useSWR(dailyCostsEndpoint, fetcher)
  if (error) return <div>failed to get data</div>
  if (!data) return <div>Unique Users per Day: loading...</div>

  const dailyCosts = JSON.parse(data.daily_costs)

  const index = dailyCosts.index
  const dailyCostsCleaned = []
  for (var i in Object.keys(index)) {
    const item = {}
    item.index = parseInt(i)
    item.date = new Date(index[i])
    for (var type in dailyCosts) {
      if (type === "index") continue
      item[type] = dailyCosts[type][i]
    }
    dailyCostsCleaned.push(item)
  }

  return <DailyCosts data={dailyCostsCleaned.reverse().slice(0, 50).reverse()} />
}
