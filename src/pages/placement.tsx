// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  faHouseSignal,
  faSatelliteDish,
  faVialCircleCheck,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { HiAdjustments, HiWifi } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Sidebar from '@/components/Sidebar';

import SettingsType from '@/types/settingsType';

const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
});

export default function WifisAroundPage(data: SettingsType) {
  const [wifiSignal, setWifiSignal] = useState(0);
  const [clientSignal, setClientSignal] = useState(0);
  const [successRate, setSuccesRate] = useState(0);
  const [compWifiSignal, setCompWifiSignal] = useState(0);
  const [compClientSignal, setCompClientSignal] = useState(0);
  const [compSuccessRate, setCompSuccesRate] = useState(0);
  const [selectedWifi, setSelectedWifi] = useState('');
  const [isCompare, setIsCompare] = useState(false);

  // Seeds for chart refresh
  const [seed1, setSeed1] = useState(1);
  const [seed2, setSeed2] = useState(2);
  const [seed3, setSeed3] = useState(3);
  const [seed4, setSeed4] = useState(4);
  const [seed5, setSeed5] = useState(5);
  const [seed6, setSeed6] = useState(6);

  useEffect(() => {
    const calculateSuccessRate = (wifi: number, client: number) => {
      if (wifi < 1 || wifi > 99) {
        return 0;
      }
      const wifiRate = (1 / wifi) * 100;
      return Math.round((wifiRate + client * 3) / 4);
    };

    const interval = setInterval(() => {
      if (selectedWifi !== '') {
        const newWifiSignal = Math.round(Math.random() * 100);
        const newClientSignal = Math.round(Math.random() * 100);
        setWifiSignal(newWifiSignal);
        setClientSignal(newClientSignal);
        setSuccesRate(calculateSuccessRate(newWifiSignal, newClientSignal));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedWifi]);

  const toggleIsCompare = () => {
    setCompWifiSignal(wifiSignal);
    setCompClientSignal(clientSignal);
    setCompSuccesRate(successRate);
    setIsCompare(!isCompare);
    setSeed1(Math.random());
    setSeed2(Math.random());
    setSeed3(Math.random());
    setSeed4(Math.random());
    setSeed5(Math.random());
    setSeed6(Math.random());
  };
  return (
    <Sidebar data={data} active='placementhelper'>
      <div className='flex items-center justify-between'>
        <h3 className='glitch' data-text='Placer'>
          Placer
        </h3>
        <div className='flex items-center gap-2'>
          <Button
            leftIcon={HiAdjustments}
            variant={isCompare ? 'primary' : 'outline'}
            onClick={toggleIsCompare}
          >
            Compare
          </Button>
          <Button
            leftIcon={HiWifi}
            variant='outline'
            onClick={() => setSelectedWifi('H4ckDis')}
          >
            {selectedWifi === '' ? 'Search' : selectedWifi}
          </Button>
        </div>
      </div>
      <div className='card custom-bg mt-7 p-5'>
        <div className='mb-5 flex flex-col md:mb-10 md:flex-row'>
          <div
            className={clsx(isCompare ? 'md:w-3/12' : 'md:w-4/12', 'w-full')}
          >
            <div className='text-primary-300 flex items-center gap-3'>
              <FontAwesomeIcon icon={faVialCircleCheck} width={20} />
              <h3 className='text-xl font-normal md:text-2xl'>Success Rate</h3>
            </div>
            <GaugeComponent
              type='semicircle'
              key={seed5}
              arc={{
                colorArray: ['#FF2121', '#00FF15'],
                padding: 0.02,
                subArcs: [
                  { limit: 25 },
                  { limit: 35 },
                  { limit: 45 },
                  { limit: 60 },
                  { limit: 70 },
                  {},
                  {},
                ],
              }}
              pointer={{ type: 'blob', elastic: true, animationDelay: 0 }}
              value={successRate}
            />
          </div>
          {isCompare && (
            <div className='mt-5 w-full md:mt-0 md:w-3/12'>
              <div className='flex items-center gap-3 text-neutral-400'>
                <FontAwesomeIcon icon={faVialCircleCheck} width={20} />
                <h3 className='text-xl font-normal md:text-2xl'>
                  Success Rate (Ref)
                </h3>
              </div>
              <GaugeComponent
                type='semicircle'
                key={seed6}
                className='opacity-60'
                arc={{
                  colorArray: ['#FF2121', '#00FF15'],
                  padding: 0.02,
                  subArcs: [
                    { limit: 25 },
                    { limit: 35 },
                    { limit: 45 },
                    { limit: 60 },
                    { limit: 70 },
                    {},
                    {},
                  ],
                }}
                pointer={{ type: 'blob', elastic: true, animationDelay: 0 }}
                value={compSuccessRate}
              />
            </div>
          )}
          <div
            className={clsx(
              isCompare ? 'md:w-1/2' : 'md:w-8/12',
              'mt-5 w-full px-3 md:mt-0'
            )}
          >
            <h3
              className={clsx(
                selectedWifi !== '' ? 'text-primary-300' : 'text-neutral-400',
                'mb-2 flex items-center gap-2'
              )}
            >
              <FontAwesomeIcon icon={faWifi} height={20} width={20} />
              {selectedWifi !== '' ? selectedWifi : 'No wifi selected'}
            </h3>
            <p>
              <b>Channel:</b> 7
            </p>
            <p>
              <b>Encryption:</b> WPA2
            </p>
            <p>
              <b>Wi-Fi Signal:</b> {wifiSignal}% (-{100 - wifiSignal}dBm){' '}
              {isCompare &&
                `/ ${compWifiSignal}% (-${100 - compWifiSignal}dBm)`}
            </p>
            <p>
              <b>Client Signal:</b> {clientSignal}% (-{100 - clientSignal}dBm){' '}
              {isCompare &&
                `/ ${compClientSignal}% (-${100 - compClientSignal}dBm)`}
            </p>
            <p>
              <b>Success Rate:</b>{' '}
              <span
                className={clsx(
                  isCompare &&
                    (successRate > compSuccessRate
                      ? 'text-green-400'
                      : 'text-red-400')
                )}
              >
                {successRate}%
              </span>{' '}
              {isCompare && `/ ${compSuccessRate}%`}
            </p>
            <p className='border-l-primary-300 text-primary-300 mt-3 border-l-2 pl-2 text-sm font-light !opacity-70'>
              Place your device to a position to measure the strength of
              signals. You should be a little bit far away from to Wi-Fi itself,
              but as close as possible to the targetted client.
            </p>
          </div>
        </div>
        <div
          className={clsx(
            isCompare
              ? 'grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-1'
              : 'grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1',
            'grid'
          )}
        >
          <div>
            <div className='text-primary-300 flex items-center gap-3'>
              <FontAwesomeIcon icon={faHouseSignal} width={20} />
              <h3 className='text-xl font-normal md:text-2xl'>Wi-Fi Signal</h3>
            </div>
            <div className='mt-5 flex flex-col'>
              <GaugeComponent
                id='wifi-signal'
                key={seed1}
                value={wifiSignal}
                type='radial'
                labels={{
                  markLabel: {
                    type: 'inner',
                    marks: [
                      { value: 20 },
                      { value: 40 },
                      { value: 60 },
                      { value: 80 },
                      { value: 100 },
                    ],
                  },
                }}
                arc={{
                  colorArray: ['#EA4228', '#5BE12C'],
                  subArcs: [
                    { limit: 15 },
                    { limit: 30 },
                    { limit: 50 },
                    { limit: 70 },
                    {},
                  ],
                  padding: 0.02,
                  width: 0.3,
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0,
                }}
              />
            </div>
          </div>
          {isCompare && (
            <div className='mt-5 md:mt-0'>
              <div className='flex items-center gap-3 text-neutral-400'>
                <FontAwesomeIcon icon={faHouseSignal} width={20} />
                <h3 className='text-xl font-normal md:text-2xl'>
                  Wi-Fi Signal (Ref)
                </h3>
              </div>
              <div className='mt-5 flex flex-col'>
                <GaugeComponent
                  id='wifi-signal'
                  key={seed2}
                  className='opacity-60'
                  value={compWifiSignal}
                  type='radial'
                  labels={{
                    markLabel: {
                      type: 'inner',
                      marks: [
                        { value: 20 },
                        { value: 40 },
                        { value: 60 },
                        { value: 80 },
                        { value: 100 },
                      ],
                    },
                  }}
                  arc={{
                    colorArray: ['#EA4228', '#5BE12C'],
                    subArcs: [
                      { limit: 15 },
                      { limit: 30 },
                      { limit: 50 },
                      { limit: 70 },
                      {},
                    ],
                    padding: 0.02,
                    width: 0.3,
                  }}
                  pointer={{
                    elastic: true,
                    animationDelay: 0,
                  }}
                />
              </div>
            </div>
          )}
          <div className='mt-5 md:mt-0'>
            <div className='text-primary-300 flex items-center gap-3'>
              <FontAwesomeIcon icon={faSatelliteDish} width={20} />
              <h3 className='text-xl font-normal md:text-2xl'>Client Signal</h3>
            </div>
            <div className='mt-5 flex flex-col'>
              <GaugeComponent
                id='client-signal'
                value={clientSignal}
                key={seed3}
                type='radial'
                labels={{
                  markLabel: {
                    type: 'inner',
                    marks: [
                      { value: 20 },
                      { value: 40 },
                      { value: 60 },
                      { value: 80 },
                      { value: 100 },
                    ],
                  },
                }}
                arc={{
                  colorArray: ['#EA4228', '#5BE12C'],
                  subArcs: [
                    { limit: 15 },
                    { limit: 30 },
                    { limit: 50 },
                    { limit: 70 },
                    {},
                  ],
                  padding: 0.02,
                  width: 0.3,
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0,
                }}
              />
            </div>
          </div>
          {isCompare && (
            <div className='mt-5 md:mt-0'>
              <div className='flex items-center gap-3 text-neutral-400'>
                <FontAwesomeIcon icon={faSatelliteDish} width={20} />
                <h3 className='text-xl font-normal md:text-2xl'>
                  Client Signal (Ref)
                </h3>
              </div>
              <div className='mt-5 flex flex-col'>
                <GaugeComponent
                  id='wifi-signal'
                  key={seed4}
                  className='opacity-60'
                  value={compClientSignal}
                  type='radial'
                  labels={{
                    markLabel: {
                      type: 'inner',
                      marks: [
                        { value: 20 },
                        { value: 40 },
                        { value: 60 },
                        { value: 80 },
                        { value: 100 },
                      ],
                    },
                  }}
                  arc={{
                    colorArray: ['#EA4228', '#5BE12C'],
                    subArcs: [
                      { limit: 15 },
                      { limit: 30 },
                      { limit: 50 },
                      { limit: 70 },
                      {},
                    ],
                    padding: 0.02,
                    width: 0.3,
                  }}
                  pointer={{
                    elastic: true,
                    animationDelay: 0,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetch('http://localhost:3001/settings', {
    method: 'POST',
  });
  const objectData = await result.json();

  return {
    props: objectData,
  };
};
