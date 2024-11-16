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

const data = [
  { name: "Week 1", productivity: 85, tasks: 12, points: 750 },
  { name: "Week 2", productivity: 88, tasks: 15, points: 820 },
  { name: "Week 3", productivity: 92, tasks: 18, points: 890 },
  { name: "Week 4", productivity: 90, tasks: 16, points: 850 },
];

export function EmployeePerformanceChart() {
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
          dataKey="productivity"
          stroke="hsl(var(--chart-1))"
          name="Productivity %"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="tasks"
          stroke="hsl(var(--chart-2))"
          name="Tasks Completed"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="points"
          stroke="hsl(var(--chart-3))"
          name="Points"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}