import UserInteractions from "@/components/homeBrewAnalytics/userInteractionsChart"

import useSWR from "swr"

// https://recharts.org/en-US/guide/getting-started
export default function PageViewsData({ fetcher, user_interactions_endpoint }) {
  const { data, error } = useSWR(user_interactions_endpoint, fetcher)
  if (error) return <div>failed to get user interactions data :(</div>
  if (!data) return <div>User Interactions: loading data...</div>

  const dailyEvents = JSON.parse(data["daily_events_by_type"])

  // need an array of objects. Each array item is a datapoint. A day.
  // dailyEvents is an object of objects. The key is an int.
  const index = dailyEvents.index
  const dailyEventsCleaned = []
  for (var i in Object.keys(index)) {
    const item = {}
    item.index = parseInt(i)
    item.date = new Date(index[i])
    for (var eventType in dailyEvents) {
      if (eventType !== "index") {
        item[eventType] = dailyEvents[eventType][i]
      }
    }
    dailyEventsCleaned.push(item)
  }

  return <UserInteractions data={dailyEventsCleaned.reverse().slice(0, 50).reverse()} />
}
