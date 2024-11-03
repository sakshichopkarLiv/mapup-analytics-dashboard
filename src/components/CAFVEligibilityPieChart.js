import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './style/ChartStyles.css';

const CAFVEligibilityPieChart = ({ data }) => {
  const cafvCounts = data.reduce((acc, curr) => {
    const eligibility = curr['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
    if (eligibility) { 
      acc[eligibility] = (acc[eligibility] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(cafvCounts).map(key => ({
    name: key,
    value: cafvCounts[key],
  }));

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

  return (
    <div className="chart-card">
      <h3 className="chart-title">CAFV Eligibility Status</h3>
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

export default CAFVEligibilityPieChart;