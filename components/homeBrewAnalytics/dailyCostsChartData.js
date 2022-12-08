import DailyCosts from "@/components/homeBrewAnalytics/dailyCostsChart"

import useSWR from "swr"

export default function DailyCostsData({ fetcher, pageViewsIPAddresses }) {
  const { data, error } = useSWR(pageViewsIPAddresses, fetcher)
  if (error) return <div>failed to get data</div>
  if (!data) return <div>Unique Users per Day: loading...</div>

  const dailyIpAddresses = JSON.parse(data.daily_ip_addresses)

  var dailyIpAddressesCleaned = {}
  for (var i in Object.keys(dailyIpAddresses.ip_address)) {
    var epoch = parseInt(Object.keys(dailyIpAddresses.ip_address)[i])
    var xDate = new Date(epoch)
    var IPCount = dailyIpAddresses.ip_address[Object.keys(dailyIpAddresses.ip_address)[i]]
    dailyIpAddressesCleaned[xDate] = IPCount
  }

  // an array of objects. Each object is a datapoint containing an x, y pair
  const chartData = []
  Object.keys(dailyIpAddressesCleaned).map((date) => {
    chartData.push({
      date: date,
      users: dailyIpAddressesCleaned[date],
    })
  })

  return <DailyCosts data={chartData} />
}
