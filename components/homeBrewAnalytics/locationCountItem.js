import useSWR from "swr"
import Image from "@/components/Image"

function getRandomInt() {
  return Math.floor(Math.random() * 999999)
}

export default function LocationCountItem({ value }) {
  const key = `${value[0]}_${getRandomInt()}`
  // const srcUrl = `https://flagcdn.com/20x15/${value[0].toLowerCase()}.png`
  const srcUrl = "/static/images/landing/test-image.jpeg"

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const countryInfoEndpoint = `https://restcountries.com/v3.1/alpha/${value[0]}`

  const { data, error } = useSWR(countryInfoEndpoint, fetcher)
  if (error) return <div>failed to get country data :(</div>
  if (!data) return <div>Country data is loading...</div>

  const countryName = data[0].name.common

  return (
    <div
      key={key}
      title={countryName}
      className="mx-1 grid grid-cols-2 place-content-center content-center gap-x-2 rounded-lg border-2 border-gray-300 py-1 px-2"
    >
      <Image className="h-7" width="20" height="15" alt={value[0]} src={srcUrl} />
      <div className="">{value[1]}</div>
    </div>
  )
}
