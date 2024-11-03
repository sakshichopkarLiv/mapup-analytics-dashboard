import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './style/ChartStyles.css';

const ModelYearDistributionChart = ({ data }) => {
  const yearCounts = data.reduce((acc, curr) => {
    if (curr['Model Year']) {
      acc[curr['Model Year']] = (acc[curr['Model Year']] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(yearCounts).map(([year, count]) => ({
    year: parseInt(year),
    count,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD0', '#FF69B4', '#A52A2A', '#4682B4', '#DA70D6', '#32CD32'];

  return (
    <div className="chart-card">
      <h3 className="chart-title">Model Year Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelYearDistributionChart;
