import React from "react"
import { useTable, useFilters, useSortBy } from "react-table"

import { useState } from "react"

export default function Table({ columns, data }) {
  const [filterInput, setFilterInput] = useState("")

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined
    setFilter("show.date", value) // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value)
  }

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter, // The useFilter Hook provides a way to set the filter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // use the useFilters Hook
    useSortBy
  )
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
      <input value={filterInput} onChange={handleFilterChange} placeholder={"Search name"} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps(column.getSortByToggleProps())
                  )}
                  className={
                    column.isSorted ? (column.isSortedDesc ? "sort-desc" : "sort-asc") : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
