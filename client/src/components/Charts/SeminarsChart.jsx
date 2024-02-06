import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import axios from 'axios';

const UserDataChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('api/personalDetails/seminarcount')
      .then(response => {
        const seminarCounts = response.data;
        const newChartData = Object.entries(seminarCounts).map(([seminarId, count]) => {
          const seminarName = `Seminar${seminarId}`;
          return {
            seminarName,
            count,
          };
        });
        
        console.log('newChartData:', newChartData);
        setChartData(newChartData);
      })
      .catch(error => {
        console.error('Error fetching seminar counts:', error);
      });
  }, []);

  return (
    <ResponsiveContainer  height={500}>
    <BarChart  data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="seminarName" interval={0} angle={-45} textAnchor="end" height={50}/>
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#82ca9d" barSize={45}/>
    </BarChart>
    </ResponsiveContainer>
  );
};


export default UserDataChart;
