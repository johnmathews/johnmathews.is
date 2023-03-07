import PageViews from '@/components/homeBrewAnalytics/pageViewsChart'

import useSWR from 'swr'

// https://recharts.org/en-US/guide/getting-started
export default function PageViewsData({ fetcher, pageViewsIPAddresses }) {
  const { data, error } = useSWR(pageViewsIPAddresses, fetcher)
  if (error) return <div>failed to get data</div>
  if (!data) return <div>Page views data is loading...</div>

  const daily_views = JSON.parse(data.daily_views)

  const dailyViewsCleaned = {}
  for (var i in Object.keys(daily_views.page)) {
    var epoch = parseInt(Object.keys(daily_views.page)[i])
    var viewDate = new Date(epoch)
    var viewCount = daily_views.page[Object.keys(daily_views.page)[i]]
    dailyViewsCleaned[viewDate] = viewCount
  }

  // an array of objects. Each object is a datapoint containing an x, y pair
  const chartData = []
  Object.keys(dailyViewsCleaned).map((date) => {
    chartData.push({
      date: date,
      pageViews: dailyViewsCleaned[date],
    })
  })

  return <PageViews data={chartData} />
}
