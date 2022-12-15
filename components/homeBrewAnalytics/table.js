import { React, useEffect } from "react"
import { useTable, useFilters, useSortBy, usePagination } from "react-table"

import { useState } from "react"

export default function Table({ columns, data, isPaginated = true }) {
  const [filterInput, setFilterInput] = useState("")

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined
    setFilter("page", value)
    setFilterInput(value)
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "date",
            desc: false,
          },
          {
            id: "views",
            desc: true,
          },
        ],
        pageIndex: 0,
        pageSize: 12,
        manualPagination: true,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  )
  return (
    <>
      <div className="flex justify-between align-middle">
        <div> Page Views</div>
        <input
          className="mr-0 rounded-sm border border-gray-700 dark:border-gray-500 "
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Page (search)"}
        />
      </div>
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
          {page.map((row, i) => {
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
      {Boolean(isPaginated) && (
        <div id="pagination">
          <div id="pageNum">
            page {pageIndex + 1} of {pageOptions.length}
          </div>{" "}
          <div id="nextPrevButtons">
            {canPreviousPage ? (
              <div id="backButton" onClick={() => previousPage()}>
                Back
              </div>
            ) : null}
            {canNextPage ? (
              <div id="nextButton" onClick={() => nextPage()}>
                Next{" "}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}
