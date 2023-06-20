// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface Props {
  val: number;
  name: string;
}

export default function SystemChart({ val, name }: Props) {
  const [opts, setOpts] = useState<ApexOptions>({
    chart: { width: '0%' },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 0,
        track: { strokeWidth: '0' },
        dataLabels: { show: false },
      },
    },
    fill: {
      colors: ['transparent'],
    },
  });
  useEffect(() => {
    setOpts({
      chart: {
        width: '100%',
        toolbar: {
          show: false,
        },
        fontFamily: 'Roboto Condensed',
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          offsetY: 0,
          hollow: {
            margin: -20,
            size: '70%',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#ffffff12',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -14,
              show: true,
              color: '#888',
              fontSize: '0.9rem',
            },
            value: {
              formatter: function (val: number) {
                return val.toFixed(0) + '%';
              },
              offsetY: -2,
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              show: true,
            },
          },
        },
      },
      fill: {
        colors: ['#f5c265'],
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#e5a245'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      labels: [name],
    });
  }, [name]);

  return (
    <div className='card custom-bg'>
      <Chart type='radialBar' options={opts} series={[val]} />
    </div>
  );
}
