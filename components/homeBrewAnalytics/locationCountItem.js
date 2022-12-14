import Image from "@/components/Image"

export default function LocationCountItem({ value }) {
  const srcUrl = `https://flagcdn.com/20x15/${value[0].toLowerCase()}.png`
  const key = `${value[0]}-${value[1]}`
  return (
    <div className="mx-1 h-8 rounded-md bg-green-300 px-2 dark:bg-green-700">
      <Image key={key} width={25} height={18} alt={value[0]} src={srcUrl} />
      {value[1]}
    </div>
  )
}
