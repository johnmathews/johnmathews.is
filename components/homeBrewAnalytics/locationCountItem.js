import Image from "@/components/Image"

function getRandomInt() {
  return Math.floor(Math.random() * 999999)
}

export default function LocationCountItem({ value }) {
  const key = `${value[0]}_${getRandomInt()}`
  const srcUrl = `https://flagcdn.com/20x15/${value[0].toLowerCase()}.png`
  // const srcUrl = "/static/images/landing/test-image.jpeg"

  return (
    <div
      key={key}
      title={value[0]}
      className="mx-1 flex h-8 rounded-lg border-2 border-gray-300 py-1 px-1"
    >
      <div className="mr-1 h-7">
        <Image className="leading-none" width="20" height="15" alt={value[0]} src={srcUrl} />
      </div>
      <div className="pt-1 leading-none">{value[1]}</div>
    </div>
  )
}
