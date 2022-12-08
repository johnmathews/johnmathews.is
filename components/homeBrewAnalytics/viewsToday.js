import useSWR from "swr"

export default function ViewsToday({ fetcher, pageViewsIPAddresses }) {
  const { data, error } = useSWR(pageViewsIPAddresses, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>Views Today: loading...</div>

  const daily_views = JSON.parse(data.daily_views)

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
