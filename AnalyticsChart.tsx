import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", likes: 120, shares: 40 },
  { name: "Tue", likes: 200, shares: 80 },
  { name: "Wed", likes: 150, shares: 70 },
  { name: "Thu", likes: 180, shares: 90 },
  { name: "Fri", likes: 220, shares: 100 },
];

const AnalyticsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="likes" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="shares" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsChart;
