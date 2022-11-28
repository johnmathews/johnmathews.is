import React, { useMemo, useState, useEffect } from "react"

import Table from "./Table"

// https://blog.logrocket.com/complete-guide-building-smart-data-table-react/

const Genres = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="bg-red-300">
            {genre}
          </span>
        )
      })}
    </>
  )
}

function ViewsPerPagePerDay() {
  const data = [
    {
      score: 17.592657,
      show: {
        id: 44813,
        url: "http://www.tvmaze.com/shows/44813/the-snow-spider",
        name: "The Snow Spider",
        type: "Scripted",
        language: "English",
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
        language: "Deutsch",
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
  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "show.name",
          },
          {
            Header: "Type",
            accessor: "show.type",
          },
        ],
      },
      {
        // Second group - Details
        Header: "Details",
        // Second group columns
        columns: [
          {
            Header: "Language",
            accessor: "show.language",
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres",
            // Cell method will provide the cell value; we pass it to render a custom component
            Cell: ({ cell: { value } }) => <Genres values={value} />,
          },
          {
            Header: "Runtime",
            accessor: "show.runtime",
          },
          {
            Header: "Status",
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
