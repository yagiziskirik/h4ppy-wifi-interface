// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { faHouseSignal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { GetStaticProps } from 'next';
import wifiAnimation from 'public/lottie/114586-wifi-connecting.json';
import { useState } from 'react';
import { HiWifi } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/Checkbox';
import Select from '@/components/Select';
import Sidebar from '@/components/Sidebar';
import Toggle from '@/components/Toggle';

import SettingsType from '@/types/settingsType';

type ClientList = {
  bssid: string;
  isToggle: boolean;
};

export default function WifiBlockerPage(data: SettingsType) {
  const [isStarted, setIsStarted] = useState(false);
  const [wifiList, setWifiList] = useState<string[]>([]);
  const [selectedWifi, setSelectedWifi] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [clientsList, setClientsList] = useState<ClientList[]>([]);

  const changeClientsList = (bssid: string, val: boolean) => {
    const tempList = [...clientsList];
    const tempVal = tempList.find((client) => client.bssid == bssid);
    if (tempVal) tempVal.isToggle = val;
    setClientsList(tempList);
  };

  const newLists = () => {
    setWifiList(['H4ckd1s', 'H4ppy']);
    setClientsList([
      { bssid: '12:FC:44:24:AC:F2', isToggle: false },
      { bssid: '4C:44:12:DD:AC:4F', isToggle: false },
    ]);
  };
  return (
    <Sidebar data={data} active='wifiblocker'>
      <div className='flex items-center justify-between'>
        <h3 className='glitch' data-text='Blocker'>
          Blocker
        </h3>
        {isStarted ? (
          <Button variant='outline' onClick={() => setIsStarted(false)}>
            Stop
          </Button>
        ) : (
          <Button variant='outline' leftIcon={HiWifi} onClick={newLists}>
            Search Wifi
          </Button>
        )}
      </div>
      <div
        className={clsx(isStarted && 'full-screen', 'card custom-bg mt-7 p-7')}
      >
        <div className='text-primary-300 flex items-center gap-3'>
          <FontAwesomeIcon icon={faHouseSignal} width={20} />
          <h3 className='text-xl font-normal md:text-2xl'>
            {isStarted
              ? `Blocking ${selectedWifi}${
                  isClient
                    ? '; Clients: ' +
                      clientsList
                        .filter((t) => t.isToggle)
                        .map((t) => t.bssid)
                        .join(', ')
                    : ''
                }`
              : 'Block Wi-Fi'}
          </h3>
        </div>
        {isStarted ? (
          <Lottie animationData={wifiAnimation} className='h-full' />
        ) : (
          <div className='mt-4 flex flex-col items-start gap-3'>
            <Select
              label='Selected Wi-Fi'
              placeholder='Select a Wi-Fi...'
              options={wifiList}
              changeEvt={setSelectedWifi}
              selected={selectedWifi}
            />
            <div className='flex gap-2'>
              <p>Target specific clients</p>
              <Toggle toggle={isClient} toggleSet={setIsClient} />
            </div>
            {isClient && (
              <>
                <h4 className='-mb-2'>Clients</h4>
                {clientsList.map((client) => (
                  <Checkbox
                    label={client.bssid}
                    isChecked={client.isToggle}
                    key={client.bssid}
                    checkAction={(val: boolean) =>
                      changeClientsList(client.bssid, val)
                    }
                  />
                ))}
              </>
            )}
            <div className='mt-2 flex w-full justify-end'>
              <Button onClick={() => setIsStarted(true)}>Start</Button>
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
