import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PropTypes from 'prop-types';
import './style/ChartStyles.css';

const BarChartByCounty = React.memo(({ filteredData }) => {
  const aggregatedCountyData = filteredData.reduce((accumulator, currentEntry) => {
    const countyName = currentEntry.County;
    if (countyName) { 
      const existingEntry = accumulator.find(item => item.county === countyName);
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        accumulator.push({ county: countyName, count: 1 });
      }
    }
    return accumulator;
  }, []);

  const topCountyData = aggregatedCountyData
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD0', '#FF69B4'];

  if (topCountyData.length === 0) {
    return <p>No data available for the selected criteria.</p>;
  }

  return (
    <div className="chart-card">
      <h3 className="chart-title">Top 6 Counties by Electric Vehicle Count</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topCountyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="county" />
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="count">
            {topCountyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="chart-legend">
        {topCountyData.map((entry, index) => (
          <div key={`legend-${index}`} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            <span className="legend-text">{entry.county}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

BarChartByCounty.propTypes = {
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      County: PropTypes.string,
    })
  ).isRequired,
};

export default BarChartByCounty;