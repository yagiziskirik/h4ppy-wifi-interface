// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from 'victory';

interface Props {
  incData: number[];
}

export default function ChartElement({ incData }: Props) {
  const dataConverter = (data: number[]) => {
    return data.map((d, i) => ({ x: i, y: d }));
  };

  const data = dataConverter(incData);

  return (
    <VictoryChart height={300}>
      <VictoryAxis
        tickValues={Array.from(Array(data.length).keys())}
        tickFormat={Array(data.length).fill('')}
        style={{
          tickLabels: { fill: 'rgb(200, 200, 200)' },
          axis: { stroke: 'rgb(200, 200, 200)', strokeWidth: '2px' },
          grid: {
            stroke: 'rgba(200, 200, 200, 0.3)',
            strokeDasharray: 5,
          },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => `${x}%`}
        style={{
          tickLabels: { fill: 'rgb(200, 200, 200)' },
          axis: { stroke: 'rgb(200, 200, 200)', strokeWidth: '2px' },
          grid: {
            stroke: 'rgba(200, 200, 200, 0.3)',
            strokeDasharray: 5,
          },
        }}
        domain={[0, 100]}
      />
      <VictoryLine
        interpolation='catmullRom'
        data={data}
        style={{
          data: {
            stroke: 'rgb(var(--tw-color-primary-300)',
          },
        }}
      />
      <VictoryScatter
        data={data}
        size={3}
        style={{
          data: {
            fill: 'white',
            stroke: 'rgb(var(--tw-color-primary-300)',
            strokeWidth: '1px',
          },
        }}
      />
    </VictoryChart>
  );
}
