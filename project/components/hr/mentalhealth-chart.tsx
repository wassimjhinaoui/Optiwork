"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
/*
The data will be imported and calculated later from the database , this is just testing data due to deadline limit
*/
const data = [
  { name: "Week 1", mental_health: 85 },
  { name: "Week 2", mental_health: 88 },
  { name: "Week 3", mental_health: 92 },
  { name: "Week 4", mental_health: 90 },
];

export function MentalHealthChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="mental_health"
          stroke="hsl(var(--chart-1))"
          name="Mental health %"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}