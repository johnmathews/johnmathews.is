const postDateTemplate = { year: "numeric", month: "short", day: "numeric" }

import Link from "@/components/Link"
import { useMemo } from "react"

import siteMetadata from "@/data/siteMetadata"

import Table from "@/components/homeBrewAnalytics/table"
import LocationCountItem from "@/components/homeBrewAnalytics/locationCountItem"

export default function ViewsPageDayTable({ data }) {
  // data should be an array of objects. each object is a row

  const parsedData = []
  for (var i = 0; i < data.length; i++) {
    const dataRow = {}
    for (var j in data[i]) {
      // which Date
      if (j === "date") {
        var date = new Date(data[i][j])
        dataRow["date"] = date.toLocaleDateString(siteMetadata.locale, postDateTemplate)
      } else if (j === "page") {
        // which page
        dataRow["page"] = data[i][j]
      } else if (j === "country_count") {
        var value = 0
        if (data[i][j] == null) {
          value = "unknown"
          dataRow["country_count"] = null
        } else {
          value = data[i][j]
          value = value.replaceAll("(", "[").replaceAll(")", "]").replaceAll("'", '"')
          value = JSON.parse(value)
          dataRow["country_count"] = value
        }
      } else if (j === "views") {
        // how many views
        dataRow["views"] = parseInt(data[i][j])
      }
    }
    parsedData.push(dataRow)
  }

  const PageCellProcessor = ({ value, row: { index }, column: { id } }) => {
    return (
      <Link href={value} className="hover:underline">
        {" "}
        {value}{" "}
      </Link>
    )
  }

  const LocationCellProcessor = ({ value }) => {
    if (value == null) return <div></div>
    const result = []
    for (var z = 0; z < value.length; z++) {
      result.push(<LocationCountItem value={value[z]} />)
    }
    return (
      <div key={value} className="flex flex-shrink">
        {result}{" "}
      </div>
    )
  }

  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: "date",
      id: "date",
      sortType: (a, b) => {
        return new Date(b) - new Date(a)
      },
    },
    {
      Header: "Page",
      id: "page",
      accessor: "page",
      Cell: PageCellProcessor,
      // Cell method will provide the cell value; we pass it to render a custom component
      // Cell: ({ cell: { value } }) => <Genres values={value} />,
    },
    {
      Header: "Views",
      id: "views",
      accessor: "views",
    },
    {
      Header: "Location",
      id: "locatoin",
      accessor: "country_count",
      Cell: LocationCellProcessor,
    },
  ])

  return (
    <div
      id="viewsPerPagePerDay"
      className="min-h-32 col-span-3 border-separate border-2 border-slate-800 p-3"
    >
      <Table columns={columns} data={parsedData} />
    </div>
  )
}
