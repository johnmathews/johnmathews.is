import React, { PureComponent } from "react"
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// https://recharts.org/en-US/guide/getting-started
export default function UserInteractions({ data }) {
  return (
    <div
      id="userInteractionsEachDay"
      className="min-h-32  col-span-3 border-2 border-slate-800 p-3"
    >
      <div className="mb-2">User Interactions</div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pageViews" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
