// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  faBan,
  faBuildingWheat,
  faHandshake,
  faHouseChimneyCrack,
  faHouseSignal,
  faLocationCrosshairs,
  faPeopleArrows,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HiWifi } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Dropdown from '@/components/Dropdown';
import Sidebar from '@/components/Sidebar';

type DropdownLink = {
  name: string;
  icon?: IconDefinition;
  clickEvent: () => void;
};

export default function TerminalPage() {
  const ddLinkGenerator = (bssid: string) => {
    const ddItems: DropdownLink[] = [
      {
        name: 'Place To This',
        icon: faLocationCrosshairs,
        clickEvent: () => {
          alert(`Place: ${bssid}`);
        },
      },
      {
        name: 'Handshake',
        icon: faHandshake,
        clickEvent: () => {
          alert(`HS: ${bssid}`);
        },
      },
      {
        name: 'Block This',
        icon: faBan,
        clickEvent: () => {
          alert(`Block: ${bssid}`);
        },
      },
      {
        name: 'Evil Twin',
        icon: faPeopleArrows,
        clickEvent: () => {
          alert(`Twin: ${bssid}`);
        },
      },
      {
        name: "Plant 'n Leave",
        icon: faBuildingWheat,
        clickEvent: () => {
          alert(`Plant: ${bssid}`);
        },
      },
      {
        name: 'Get in this House',
        icon: faHouseChimneyCrack,
        clickEvent: () => {
          alert(`House: ${bssid}`);
        },
      },
    ];
    return ddItems;
  };
  const wifis = [
    {
      essid: 'Super-Wifi',
      bssid: '12:42:6A:5D:AC:90',
      pwr: 45,
      enc: 'WPA2',
      ch: 7,
    },
    {
      essid: 'H4kDis',
      bssid: '43:a2:76:fb:ac:1d',
      pwr: 73,
      enc: 'WPA2',
      ch: 9,
    },
  ];

  return (
    <Sidebar active='wifis-around'>
      <div className='flex items-center justify-between'>
        <h3 className='glitch' data-text='Stations'>
          Stations
        </h3>
        <Button leftIcon={HiWifi} variant='outline'>
          Search
        </Button>
      </div>
      <div className='card custom-bg mt-7 p-5'>
        <div className='text-primary-300 flex items-center gap-3'>
          <FontAwesomeIcon icon={faHouseSignal} width={20} />
          <h3 className='text-xl font-normal md:text-2xl'>Wi-Fi List</h3>
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
                        POWER
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium uppercase text-neutral-300'
                      >
                        ENCRYPTION
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium uppercase text-neutral-300'
                      >
                        CHANNEL
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
                    {wifis.map((wifi) => (
                      <tr key={wifi.bssid}>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-200'>
                          {wifi.essid}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-neutral-200'>
                          {wifi.bssid}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-neutral-200'>
                          {wifi.pwr}%
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-neutral-200'>
                          {wifi.enc}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-neutral-200'>
                          {wifi.ch}
                        </td>
                        <td className='flex items-center justify-end gap-1.5 whitespace-nowrap px-6 py-4 text-sm font-medium'>
                          <Dropdown links={ddLinkGenerator(wifi.bssid)} />
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
