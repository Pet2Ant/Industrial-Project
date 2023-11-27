import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import dataJSON from "../Applications/ApplicationTable/mockData.json";
const UserDataChart = () => {
    // Get the user data
    const userData = dataJSON;
  // Count the occurrences of each pronoun
  const pronounCounts = userData.reduce((counts, user) => {
    const { pronouns } = user;
    counts[pronouns] = (counts[pronouns] || 0) + 1;
    return counts;
  }, {});

  const idCounts = userData.reduce((counts, user) => {
    const { id } = user;
    counts[id] = (counts[id] || 0) + 1;
    return counts;
  }, {});

    const interestsCounts = userData.reduce((counts, user) => {
    const { interests } = user;
    counts[interests] = (counts[interests] || 0) + 1;
    return counts;
    }, {});

  // Find the majority pronoun
  const pronounEntries = Object.entries(pronounCounts);
  const sortedPronounEntries = pronounEntries.sort((a, b) => b[1] - a[1]);
  const majorityPronoun = sortedPronounEntries[0][0];
  

  // Prepare data for the chart
  const chartData = pronounEntries.map(([pronoun, count]) => ({
    pronoun,
    count,
    isMajority: pronoun === majorityPronoun,
  }));

  return (
    <VictoryChart>
      <VictoryAxis
        dependentAxis
        tickFormat={(tick) => `${tick}`}
        style={{
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryAxis style={{ tickLabels: { fontSize: 10 } }} />
      <VictoryBar
        data={chartData}
        x="pronoun"
        y="count"
        style={{
          data: {
            fill: ({ datum }) => (datum.isMajority ? 'green' : 'gray'),
          },
        }}
      />
    </VictoryChart>
  );
};

export default UserDataChart;