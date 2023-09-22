import useSWR from 'swr'

const colorArray = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
]

export default function CostToday({ fetcher, url }) {
  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>Cost data is loading...</div>

  const dailyCosts = JSON.parse(data.daily_costs)
  const index = dailyCosts.index
  const tax = dailyCosts.tax

  // an array of dates in ascending order (most recent date last)
  let dateLabels = []
  for (const i in Object.keys(index)) {
    const value = index[i]
    dateLabels.push(new Date(value))
  }
  dateLabels = dateLabels.sort((a, b) => b.date - a.date)

  let datasets = []
  for (const i in Object.keys(dailyCosts)) {
    if ((Object.keys(dailyCosts)[i] === 'index') == false) {
      const set = {}
      set['label'] = Object.keys(dailyCosts)[i]
      set['backgroundColor'] = colorArray[parseInt(i) + 4]
      set['data'] = []
      for (var j in Object.keys(dailyCosts[Object.keys(dailyCosts)[i]])) {
        const value = Object.values(dailyCosts[Object.keys(dailyCosts)[i]])[j]
        set['data'].push(value)
      }
      datasets.push(set)
    }
  }

  var costYesterday = 0
  datasets.forEach(function (item) {
    costYesterday += item['data'][item['data'].length - 2]
  })

  // let dailyIpAddresses = JSON.parse(data.daily_ip_addresses)
  // let dailyIpAddresses = dailyIpAddresses.ip_address
  // const viewsPageDay = JSON.parse(data.views_per_page_per_day)

  // const dailyViewsCleaned = {}
  // for (var i in Object.keys(daily_views.page)) {
  //   var epoch = parseInt(Object.keys(daily_views.page)[i])
  //   var viewDate = new Date(epoch)
  //   var viewCount = daily_views.page[Object.keys(daily_views.page)[i]]
  //   dailyViewsCleaned[viewDate] = viewCount
  // }

  // const dates = Object.keys(dailyViewsCleaned)
  // const today = dates[0]
  // const viewsToday = dailyViewsCleaned[today]

  return (
    <div id="costToday" className="min-h-32 border-2 border-slate-800  p-3 dark:border-slate-500">
      Costs {(costYesterday * 100).toFixed(1).toString() + '¢'}
    </div>
  )
}
