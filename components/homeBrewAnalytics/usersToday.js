import useSWR from "swr"

export default function UsersToday({ fetcher, pageViewsIPAddresses }) {
  const { data, error } = useSWR(pageViewsIPAddresses, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>Users Today: loading...</div>

  const dailyIpAddresses = JSON.parse(data.daily_ip_addresses)

  var dailyIpAddressesCleaned = {}
  for (var i in Object.keys(dailyIpAddresses.ip_address)) {
    var epoch = parseInt(Object.keys(dailyIpAddresses.ip_address)[i])
    var xDate = new Date(epoch)
    var IPCount = dailyIpAddresses.ip_address[Object.keys(dailyIpAddresses.ip_address)[i]]
    dailyIpAddressesCleaned[xDate] = IPCount
  }

  const date = Object.keys(dailyIpAddressesCleaned)[0]
  const usersToday = dailyIpAddressesCleaned[date]

  return (
    <div id="usersToday" className="min-h-32 border-2 border-slate-800 p-3  ">
      Users Today: {[usersToday]}
    </div>
  )
}
