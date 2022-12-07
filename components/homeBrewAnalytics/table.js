import { React, useEffect } from "react"
import { useTable, useFilters, useSortBy, usePagination } from "react-table"

import {
  Pagination,
  PagincationButtonContainer,
  PaginationButton,
  PaginationIndex,
  RightIconSpan,
  LeftIconSpan,
  NextButtonIcon,
  BackButtonIcon,
} from "@/components/homeBrewAnalytics/table.style"

import { useState } from "react"

export default function Table({ columns, data, isPaginated = true }) {
  const [filterInput, setFilterInput] = useState("")

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined
    setFilter("page", value)
    setFilterInput(value)
  }

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    page,
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter, // The useFilter Hook provides a way to set the filter
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
        initialState: {
          pageIndex: 0,
          pageSize: 25,
          hiddenColumns: columns.filter((column) => !column.show).map((column) => column.id),
        },
        manualPagination: true,
        manualSortBy: true,
        autoResetPage: false,
      },
    },
    useFilters, // use the useFilters Hook
    useSortBy,
    usePagination
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
        <Pagination>
          <PaginationIndex>
            page {pageIndex + 1} of {pageOptions.length}
          </PaginationIndex>{" "}
          <PagincationButtonContainer>
            {canPreviousPage ? (
              <PaginationButton onClick={() => previousPage()}>
                <LeftIconSpan>
                  <BackButtonIcon />
                </LeftIconSpan>
                Back
              </PaginationButton>
            ) : null}
            {canNextPage ? (
              <PaginationButton onClick={() => nextPage()}>
                Next{" "}
                <RightIconSpan>
                  <NextButtonIcon />
                </RightIconSpan>
              </PaginationButton>
            ) : null}
          </PagincationButtonContainer>
        </Pagination>
      )}
    </>
  )
}
