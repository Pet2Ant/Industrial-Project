import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import SeminarCharts from "../Charts/SeminarsChart";
import { ResponsiveContainer } from 'recharts';
const Paragraph = ({ text }) => {
  return (
    <p className="text-center text-2xl text-[#143727] font-medium md:leading-loose leading-relaxed">
      {text}
    </p>
  );
};
const MainPageContainer = ({ title, rows }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (title === "EDUCATION LEVEL / SEMINAR") {
      axios.get('api/education/educationcount')
        .then(response => {
          console.log('response:', response.data);
          // Transform the response to match the format required by Recharts
          const transformedData = Object.entries(response.data).map(([seminar, counts]) => ({
            name: seminar,
            ...counts,

          }));

          setData(transformedData);
        })
        .catch(error => {
        });
    }
  }, [title]);

  const CustomizedTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      let labelColor;
      switch (label) {
        case 'Seminar1':
          labelColor = '#d94e6e';
          break;
        case 'Seminar2':
          labelColor = '#de4b40';
          break;
        case 'Seminar3':
          labelColor = '#4ed9a6';
          break;
        case 'Seminar4':
          labelColor = '#d62728';
          break;
        case 'Seminar5':
          labelColor = '#9467bd';
          break;
        case 'Seminar6':
          labelColor = '#8c564b';
          break;
        default:
          labelColor = '#000000';
      }
      return (
        <div className="custom-tooltip rounded-lg shadow-lg shadow-emerald-600 p-2 border-12 border-gray-800 bg-white font-semibold"
          style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc', fontSize: '12px' }}>
          <p className="label" style={{ color: labelColor }}>{`${label} : ${payload[0].value}`}</p>
          {payload.map((entry, index) => {
            let color;
            switch (entry.dataKey) {
              case 'High School':
                color = '#8884d8';
                break;
              case "Bachelor's Degree":
                color = '#82ca9d';
                break;
              case "Master's Degree":                
                color = '#ffc658';
                break;
              case 'PhD':
                color = '#ff7300';
                break;
            }
            return <p key={`payload-${index}`} style={{ color: color }}>{`${entry.dataKey} : ${entry.value}`}</p>
          })}
        </div>
      );
    }
  
    return null;
  };
  const CustomizedAxisTick = ({ x, y, payload }) => {
    let color;
    switch (payload.value) {
      case 'Seminar1':
        color = '#d94e6e';
        break;
      case 'Seminar2':
        color = '#de4b40';
        break;
      case 'Seminar3':
        color = '#4ed9a6';
        break;
      case 'Seminar4':
        color = '#d62728';
        break;
      case 'Seminar5':
        color = '#9467bd';
        break;
      case 'Seminar6':
        color = '#8c564b';
        break;
      default:
        color = '#000000';
    }
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill={color} transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  };


  return (
    <div className="bg-[#e5e5e5] h-2/3 w-3/4 scrollbar-hide overflow-y-auto container flex flex-col justify-start mt-12 sm:mx-8 md:mx-12 lg:mx-24 px-8 rounded-2xl ">
      <div className="flex-1">
        <div className="text-2xl text-center font-bold mx-auto text-[#143727] mt-4 w-full ">
          {title}
          {title === "EDUCATION LEVEL / SEMINAR" ? (
            <ResponsiveContainer height={500} maxHeight={850}>
              <BarChart data={data} fontSize={14} margin={{ top: 50, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />#
                <XAxis   dataKey="name" interval={0} angle={-45} textAnchor="end" height={50} tick={<CustomizedAxisTick />}/>
                <YAxis />
                <Tooltip content={<CustomizedTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar  dataKey="High School" stackId="a" fill="#8884d8" barSize={30} />
                <Bar dataKey="Bachelor's Degree" stackId="a" fill="#82ca9d" barSize={30} />
                <Bar dataKey="Master's Degree" stackId="a" fill="#ffc658" barSize={30} />
                <Bar dataKey="PhD" stackId="a" fill="#ff7300" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <></>
          )}
        </div>
        {title === "News" ? (
          <div className="my-4 ">
            {rows.map((text, i) => (
              <Paragraph key={i} text={text} />
            ))}
          </div>
        ) : title === "SEMINARS BY POPULARITY" ? (
          <SeminarCharts />
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default MainPageContainer;
