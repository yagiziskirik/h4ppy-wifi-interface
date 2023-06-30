// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { HiRefresh } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Input from '@/components/Input';
import Progress from '@/components/Progress';
import Select from '@/components/Select';
import Sidebar from '@/components/Sidebar';

import SettingsType from '@/types/settingsType';

const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
});

export default function GetHandshakePage(data: SettingsType) {
  const [selectedStation, setSelectedStation] = useState('');
  const [stationList, setStationList] = useState<string[]>([]);
  const [isStart, setIsStart] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('Starting...');
  const [method, setMethod] = useState('Aireplay');
  const [tOut, setTOut] = useState('20');
  return (
    <Sidebar data={data} active='gethandshake'>
      <div className='flex items-center justify-between'>
        <h3 className='glitch' data-text='Handshake'>
          Handshake
        </h3>
        {!isStart && (
          <Button
            leftIcon={HiRefresh}
            variant='outline'
            onClick={() => setStationList(['H4ckd1s', 'H4ppy'])}
          >
            Find Target
          </Button>
        )}
      </div>
      <div className='card custom-bg mt-7 p-5'>
        <div className='text-primary-300 flex items-center gap-3'>
          <FontAwesomeIcon icon={faWifi} width={20} />
          <h3 className='text-xl font-normal md:text-2xl'>
            {selectedStation !== '' && isStart
              ? 'Current Job'
              : 'Start New Job'}
          </h3>
        </div>
        {selectedStation !== '' && isStart ? (
          <div className='mt-5 flex flex-col md:flex-row md:items-start md:justify-between'>
            <div className='w-full md:w-1/2'>
              <p>Selected Wi-Fi: {selectedStation} (13:1C:82:D4:FB:AC)</p>
              <p>Client Count: 3</p>
              <p>Signal Strength: 45%</p>
              <div className='divider my-2'></div>
              <p>Method: {method}</p>
              <p>Timeout: {tOut}</p>
              <div className='divider my-2'></div>
              <Progress percentage={0} className='mt-4' />
              <p
                className='mt-1 !opacity-100'
                onClick={() => setCurrentStatus('Started')}
              >
                {currentStatus}
              </p>
              <p className='border-l-primary-300 mt-3 border-l-2 pl-2 text-sm font-light !opacity-70'>
                Changing to monitor mode...
              </p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <GaugeComponent
                className='md:-mt-9'
                value={45}
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
                  colorArray: ['#EC676E', '#F5C277'],
                  subArcs: Array.from(Array(20).keys()).map((i) => ({
                    limit: ((i + 1) * 100) / 20,
                  })),
                  padding: 0.05,
                  width: 0.25,
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0,
                }}
              />
              <h4 className='opacity-75'>Wi-Fi Strength</h4>
            </div>
          </div>
        ) : (
          <div className='mt-5 flex flex-col gap-3'>
            <Select
              label='Station'
              changeEvt={setSelectedStation}
              selected={selectedStation}
              options={stationList}
              placeholder='Select a station'
            />

            <Select
              label='Deauth Method'
              changeEvt={setMethod}
              selected={method}
              placeholder='Set Deauth Method'
              options={['Amok MD4', 'Aireplay', 'WIDS / WIPS / WDS Confussion']}
            />
            <Input
              label='Timeout'
              placeholder='Set Timeout'
              value={tOut}
              changeEvent={setTOut}
            />
            <div className='flex w-full justify-end'>
              <Button onClick={() => setIsStart(true)}>Start</Button>
            </div>
          </div>
        )}
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
