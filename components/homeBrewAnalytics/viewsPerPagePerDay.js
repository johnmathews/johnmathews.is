import React, { useMemo } from "react"

import Table from "./Table"

// https://blog.logrocket.com/complete-guide-building-smart-data-table-react/

const Genres = ({ values }) => {
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="mx-1 rounded-xl border border-slate-800 bg-red-300 px-1 ">
            {genre}
          </span>
        )
      })}
    </>
  )
}

function ViewsPerPagePerDay() {
  // data should be an array of objects. each object is a row
  const data = [
    {
      score: 17.592657,
      show: {
        id: 44813,
        url: "http://www.tvmaze.com/shows/44813/the-snow-spider",
        name: "The Snow Spider",
        type: "Scripted",
        date: "English",
        genres: ["Drama", "Fantasy"],
        status: "In Development",
        runtime: 30,
        premiered: null,
        officialSite: null,
        schedule: {
          time: "",
          days: [],
        },
      },
    },
    {
      score: 12.592657,
      show: {
        id: 44814,
        url: "http://www.tvmaze.com/shows/44813/the-snow-spider",
        name: "The Apple Spider",
        type: "Scripted",
        date: "Deutsch",
        genres: ["Drama", "Comedy"],
        status: "In Development",
        runtime: 30,
        premiered: null,
        officialSite: null,
        schedule: {
          time: "",
          days: [],
        },
      },
    },
  ]

  const columns = useMemo(
    () => [
      {
        Header: "Details",
        columns: [
          {
            Header: "Date",
            accessor: "show.date",
          },
          {
            Header: "Page",
            accessor: "show.genres",
            // Cell method will provide the cell value; we pass it to render a custom component
            Cell: ({ cell: { value } }) => <Genres values={value} />,
          },
          {
            Header: "Views",
            accessor: "show.runtime",
          },
          {
            Header: "Location",
            accessor: "show.status",
          },
        ],
      },
    ],
    []
  )

  return (
    <div className="ViewsPerPagePerDay">
      <Table columns={columns} data={data} />
    </div>
  )
}

export default ViewsPerPagePerDay
