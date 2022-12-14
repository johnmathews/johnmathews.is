import Image from "@/components/Image"

function getRandomInt() {
  return Math.floor(Math.random() * 999999)
}

export default function LocationCountItem({ value }) {
  const key = `${value[0]}_${getRandomInt()}`
  const srcUrl = `https://flagcdn.com/20x15/${value[0].toLowerCase()}.png`
  return (
    <div
      key={key}
      title={value[0]}
      className="mx-1 my-1 flex h-10 rounded-lg border-2 border-gray-300 px-2"
    >
      <Image className="mr-1" width={25} height={12} alt={value[0]} src={srcUrl} />
      <div>{value[1]}</div>
    </div>
  )
}
