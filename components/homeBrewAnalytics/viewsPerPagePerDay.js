import useSWR from "swr"

import ViewsPageDayTable from "@/components/homeBrewAnalytics/viewsPageDayTable"

// https://blog.logrocket.com/complete-guide-building-smart-data-table-react/

export default function ViewsPerPagePerDay({ fetcher, url }) {
  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>Views Today: loading...</div>

  return <ViewsPageDayTable data={JSON.parse(data.views_per_page_per_day)} />
}
