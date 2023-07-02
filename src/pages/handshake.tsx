// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  faDownload,
  faFile,
  faTrash,
  faWifi,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { HiRefresh } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import DateTimePicker from '@/components/DateTimePicker';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import Progress from '@/components/Progress';
import Select from '@/components/Select';
import Sidebar from '@/components/Sidebar';
import Toggle from '@/components/Toggle';

import SettingsType from '@/types/settingsType';

const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
});

const handshakeList = [
  {
    essid: 'H4ckd1s',
    bssid: '14:FC:1A:BF:42:7B',
    when: new Date(),
    encryption: 'WPA2',
  },
];

type DropdownLink = {
  name: string;
  icon?: IconDefinition;
  clickEvent: () => void;
};

export default function GetHandshakePage(data: SettingsType) {
  const [selectedStation, setSelectedStation] = useState('');
  const [stationList, setStationList] = useState<string[]>([]);
  const [isStart, setIsStart] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('Starting...');
  const [isDate, setIsDate] = useState(false);
  const [selDate, setSelDate] = useState(new Date());
  const [isEndDate, setIsEndDate] = useState(false);
  const [selEndDate, setSelEndDate] = useState(new Date());
  const [checkInLimits, setCheckInLimits] = useState(false);

  const [method, setMethod] = useState(
    data.cardDefaultHandshake ? data.cardDefaultHandshake : 'Aireplay'
  );
  const [tOut, setTOut] = useState(
    data.cardHandshakeTimeout ? data.cardHandshakeTimeout : '20'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCheckInLimits(checkDate());
    }, 1000);

    return () => clearInterval(interval);
  }, [isEndDate, selDate, isDate, selEndDate]); //eslint-disable-line

  const checkDate = () => {
    const currDate = new Date();
    if (isEndDate && currDate > selEndDate) setIsStart(false);
    if (isDate) {
      if (isEndDate) {
        return currDate > selDate && currDate < selEndDate;
      } else {
        return currDate > selDate;
      }
    }
    return true;
  };

  const ddLinkGenerator = (bssid: string) => {
    const ddItems: DropdownLink[] = [
      {
        name: 'Download',
        icon: faDownload,
        clickEvent: () => {
          alert(`Download: ${bssid}`);
        },
      },
      {
        name: 'Delete',
        icon: faTrash,
        clickEvent: () => {
          alert(`Delete: ${bssid}`);
        },
      },
    ];
    return ddItems;
  };

  return (
    <Sidebar data={data} active='gethandshake'>
      <div className='flex items-center justify-between'>
        <h3 className='glitch' data-text='Handshake'>
          Handshake
        </h3>
        {isStart ? (
          <Button variant='outline' onClick={() => setIsStart(false)}>
            Stop
          </Button>
        ) : (
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
              {isDate && <p>Start Date: {moment(selDate).format('lll')}</p>}
              {isEndDate && <p>End Date: {moment(selEndDate).format('lll')}</p>}
              <div className='divider my-2'></div>
              <Progress percentage={0} className='mt-4' />
              <p
                className='mt-1 !opacity-100'
                onClick={() => setCurrentStatus('Started')}
              >
                {currentStatus}
              </p>
              <p className='border-l-primary-300 mt-3 border-l-2 pl-2 text-sm font-light !opacity-70'>
                {checkInLimits ? 'Changing to monitor mode...' : 'Waiting...'}
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
            <div className='flex gap-2'>
              <p>Custom start time</p>
              <Toggle toggle={isDate} toggleSet={setIsDate} />
            </div>
            {isDate && (
              <div className='flex flex-col gap-3 md:flex-row md:items-center'>
                <DateTimePicker
                  label='Select a time for attack: '
                  selectedDate={selDate}
                  setSelectedDate={setSelDate}
                />
                <p className='ml-4 md:ml-0'>{moment(selDate).fromNow()}</p>
              </div>
            )}
            <div className='flex gap-2'>
              <p>Custom end time</p>
              <Toggle toggle={isEndDate} toggleSet={setIsEndDate} />
            </div>
            {isEndDate && (
              <div className='flex flex-col gap-3 md:flex-row md:items-center'>
                <DateTimePicker
                  label='Select a time for attack: '
                  selectedDate={selEndDate}
                  setSelectedDate={setSelEndDate}
                />
                <p className='ml-4 md:ml-0'>{moment(selEndDate).fromNow()}</p>
              </div>
            )}
            <div className='flex w-full justify-end'>
              <Button onClick={() => setIsStart(true)}>Start</Button>
            </div>
          </div>
        )}
      </div>
      <div className='card custom-bg mt-7 p-5'>
        <div className='text-primary-300 flex items-center gap-3'>
          <FontAwesomeIcon icon={faFile} width={20} />
          <h3 className='text-xl font-normal md:text-2xl'>
            Collected Handshakes
          </h3>
        </div>
        <div className='mt-5 flex flex-col'>
          <div className='-m-1.5'>
            <div className='inline-block min-w-full p-1.5 align-middle'>
              <div className='rounded-lg border border-neutral-700 shadow shadow-neutral-900'>
                <table className='min-w-full divide-y divide-neutral-700'>
                  <thead className='bg-neutral-700'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium uppercase text-neutral-300'
                      >
                        ESSID
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium uppercase text-neutral-300'
                      >
                        BSSID
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium uppercase text-neutral-300'
                      >
                        TIME
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium uppercase text-neutral-300'
                      >
                        ENCRYPTION
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-right text-xs font-medium uppercase text-neutral-300'
                      >
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-neutral-700'>
                    {handshakeList.map((hs) => (
                      <tr key={hs.bssid}>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-neutral-200'>
                          {hs.essid}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm uppercase text-neutral-200'>
                          {hs.bssid}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-neutral-200'>
                          {moment(hs.when).fromNow()}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-neutral-200'>
                          {hs.encryption}
                        </td>
                        <td className='flex items-center justify-end gap-1.5 whitespace-nowrap px-6 py-4 text-sm font-medium'>
                          <Dropdown links={ddLinkGenerator(hs.bssid)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
