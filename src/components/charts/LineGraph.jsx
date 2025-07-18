// src/components/charts/LineGraph.jsx
"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { Calendar } from "lucide-react";

const salesData = [
  { time: "10am", sales: 4500 },
  { time: "11am", sales: 6200 },
  { time: "12pm", sales: 12800 },
  { time: "1pm", sales: 11200 },
  { time: "2pm", sales: 15600 },
  { time: "3pm", sales: 8200 },
  { time: "4pm", sales: 49550 },
  { time: "5pm", sales: 6800 },
  { time: "6pm", sales: 14200 },
  { time: "7pm", sales: 12800 },
  { time: "8pm", sales: 16800 },
  { time: "9pm", sales: 22400 },
  { time: "10pm", sales: 4800 },
  { time: "11pm", sales: 6200 },
  { time: "12am", sales: 12400 },
  { time: "1am", sales: 9800 },
  { time: "2am", sales: 32200 },
  { time: "3am", sales: 21800 },
  { time: "4am", sales: 25200 },
  { time: "5am", sales: 18600 },
  { time: "6am", sales: 9200 },
  { time: "7am", sales: 16800 },
  { time: "8am", sales: 19200 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-500 text-white px-2 py-1 rounded text-sm shadow">
        ₹{(payload[0].value / 1000).toFixed(0)}k
      </div>
    );
  }
  return null;
};

export default function LineGraph() {
  return (
    <div className="flex items-start p-1  justify-between w-full"> {/* Changed from items-center to items-start */}
     

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              interval={1}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 60000]}
              ticks={[500, 10000, 25000, 50000]}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#salesGradient)"
              dot={{ r: 3, strokeWidth: 0, fill: "#3b82f6" }}
              activeDot={{ r: 4, fill: "#3b82f6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
