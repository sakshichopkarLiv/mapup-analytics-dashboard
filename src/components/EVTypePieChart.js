import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './style/ChartStyles.css';

const EVTypePieChart = ({ data }) => {
  const evTypeCounts = data.reduce((acc, curr) => {
    if (curr['Electric Vehicle Type']) {
      acc[curr['Electric Vehicle Type']] = (acc[curr['Electric Vehicle Type']] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(evTypeCounts).map(key => ({
    name: key,
    value: evTypeCounts[key],
  }));

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="chart-card">
      <h3 className="chart-title">Vehicle Type Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ value }) => `${value}`}
            labelLine={true}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="chart-legend">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            <span className="legend-text">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EVTypePieChart;