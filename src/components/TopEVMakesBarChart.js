import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import './style/ChartStyles.css';

const TopEVMakesBarChart = ({ data }) => {
  const makeCounts = data.reduce((acc, curr) => {
    if (curr['Make']) {
      acc[curr['Make']] = (acc[curr['Make']] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(makeCounts)
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD0'];

  return (
    <div className="chart-card">
      <h3 className="chart-title">Top 5 EV Manufacturers</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="make" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="chart-legend">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            <span className="legend-text">{entry.make}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEVMakesBarChart;