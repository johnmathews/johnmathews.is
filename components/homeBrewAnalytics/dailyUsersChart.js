import React, { PureComponent } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import siteMetadata from "@/data/siteMetadata"
const dateTemplate = { year: "numeric", month: "short", day: "numeric" }
const dateTemplateXAxis = { year: "numeric", month: "short", day: "numeric" }

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = new Date(label)
    const formattedDate = date.toLocaleDateString(siteMetadata.locale, dateTemplate)
    return (
      <div className="custom-tooltip border-2 bg-blue-400 p-3">
        <p className="date">{`${formattedDate} : ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}

// https://recharts.org/en-US/guide/getting-started
export default function UsersPerDay({ data }) {
  data.map((d) => {
    const date = new Date(d.date)
    d.date = date.toLocaleDateString(siteMetadata.locale, dateTemplateXAxis)
  })
  return (
    <div id="viewsPerPagePerDay" className="min-h-32  col-span-3 border-2 border-slate-800 p-3">
      <div className="mb-2">Daily Users</div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" reversed="true" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            strokeWidth={4}
            fillOpactity={1}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
