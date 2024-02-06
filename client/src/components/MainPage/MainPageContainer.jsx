import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import SeminarCharts from "../Charts/SeminarsChart";
import { ResponsiveContainer } from 'recharts';
const MainPageContainer = ({ title, rows }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (title === "Education/seminar") {
      console.log('Fetching data for education levels per seminar');
      axios.get('api/education/educationcount')
        .then(response => {
          // Transform the response to match the format required by Recharts
          const transformedData = Object.entries(response.data).map(([seminar, counts]) => ({
            name: seminar,
            ...counts
          }));
          
          setData(transformedData);
          console.log('transformedData:', transformedData);
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    }
  }, [title]);
 
  const CustomizedTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc', fontSize: '12px' }}>
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  
  return (
    <div className="bg-[#e5e5e5] h-2/3 w-3/4 scrollbar-hide overflow-y-auto container flex flex-col justify-start mt-12 sm:mx-8 md:mx-12 lg:mx-24 px-8 rounded-2xl ">
      <div className="flex-1">
        <div className="text-2xl text-center font-bold mx-auto text-[#143727] mt-4 w-full ">
        {title}
          {title === "EDUCATION LEVEL / SEMINAR" ? (
            <ResponsiveContainer  height={500} maxHeight={850}>
            <BarChart  data={data}  fontSize={14}margin={{ top: 50, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={50}/>
              <YAxis />
              <Tooltip content={<CustomizedTooltip />} />
              <Legend  wrapperStyle={{fontSize: "12px"}}/>
              <Bar dataKey="High School" stackId="a" fill="#8884d8" barSize={30}  />
              <Bar dataKey="Bachelor's Degree" stackId="a" fill="#82ca9d" barSize={30} />
              <Bar dataKey="Master's Degree" stackId="a" fill="#ffc658" barSize={30}/>
              <Bar dataKey="PhD" stackId="a" fill="#ff7300"  barSize={30}/>
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
