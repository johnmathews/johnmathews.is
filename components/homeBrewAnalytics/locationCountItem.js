export default function LocationCountItem({ value }) {
  return (
    <div key={value[0]} className="mx-1 rounded-md bg-green-300 px-2 dark:bg-green-700">
      {value[0]}: {value[1]}
    </div>
  )
}
