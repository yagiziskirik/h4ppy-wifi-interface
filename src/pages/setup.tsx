// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import clsx from 'clsx';
import { useState } from 'react';
import { HiClipboardCheck } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Input from '@/components/Input';
import Sidebar from '@/components/Sidebar';
import Toggle from '@/components/Toggle';

export default function TerminalPage() {
  const [selTab, setSelTab] = useState(0);
  const [wifiName, setWifiName] = useState('');
  const [wifiPwd, setWifiPwd] = useState('');
  const [wifiVisible, setWifiVisible] = useState(false);

  return (
    <Sidebar active='setup'>
      <h3 className='glitch' data-text='Setup'>
        Setup
      </h3>
      <div className='card custom-bg mt-7 p-5'>
        <div className='border-b border-neutral-700'>
          <nav className='flex space-x-4'>
            <button
              className={clsx(
                selTab == 0
                  ? 'border-primary-300 text-primary-300 font-medium'
                  : 'border-transparent text-neutral-500',
                'hover:text-primary-300 inline-flex items-center gap-2 whitespace-nowrap border-b-[3px] px-1 py-2 text-xl'
              )}
              onClick={() => setSelTab(0)}
            >
              Wi-Fi
            </button>
            <button
              className={clsx(
                selTab == 1
                  ? 'border-primary-300 text-primary-300 font-medium'
                  : 'border-transparent text-neutral-500',
                'hover:text-primary-300 inline-flex items-center gap-2 whitespace-nowrap border-b-[3px] px-1 py-2 text-xl'
              )}
              onClick={() => setSelTab(1)}
            >
              Card
            </button>
            <button
              className={clsx(
                selTab == 2
                  ? 'border-primary-300 text-primary-300 font-medium'
                  : 'border-transparent text-neutral-500',
                'hover:text-primary-300 inline-flex items-center gap-2 whitespace-nowrap border-b-[3px] px-1 py-2 text-xl'
              )}
              onClick={() => setSelTab(2)}
            >
              Security
            </button>
          </nav>
        </div>

        {selTab == 0 && (
          <>
            <div className='mt-5'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full pr-4 md:w-2/5'>
                  <h2 className='text-base'>Wi-Fi Connection</h2>
                  <p className='text-sm opacity-80'>
                    General Wi-Fi settings related to all-users visible content
                  </p>
                </div>
                <div className='mt-3 w-full md:mt-0 md:w-3/5'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Input
                      label='Wi-Fi Name'
                      value={wifiName}
                      placeholder='h4ppy Wi-Fi station'
                      changeEvent={setWifiName}
                    />
                    <Input
                      label='Wi-Fi Password'
                      value={wifiPwd}
                      placeholder='12345678'
                      changeEvent={setWifiPwd}
                      hidable={true}
                    />
                  </div>
                  <div className='mt-4 flex items-center justify-between'>
                    <p>Wi-Fi Visible</p>
                    <Toggle toggle={wifiVisible} toggleSet={setWifiVisible} />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-5 md:mt-7'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full pr-4 md:w-2/5'>
                  <h2 className='text-base'>Hotspot</h2>
                  <p className='text-sm opacity-80'>
                    Your internal hotspot settings for the wireless access point
                  </p>
                </div>
                <div className='mt-3 w-full md:mt-0 md:w-3/5'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Input
                      label='Internal IP'
                      value={wifiName}
                      placeholder='192.168.7.1'
                      changeEvent={setWifiName}
                    />
                    <Input
                      label='Channel'
                      value={wifiPwd}
                      placeholder='7'
                      changeEvent={setWifiPwd}
                    />
                  </div>
                  <div className='mt-3 flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Input
                      label='WPA'
                      value={wifiName}
                      placeholder='3'
                      changeEvent={setWifiName}
                    />
                    <Input
                      label='WPA Key Management'
                      value={wifiPwd}
                      placeholder='WPA-PSK'
                      changeEvent={setWifiPwd}
                    />
                  </div>
                  <div className='mt-3 flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Input
                      label='WPA Pairwise'
                      value={wifiName}
                      placeholder='TKIP'
                      changeEvent={setWifiName}
                    />
                    <Input
                      label='RSN Pairwise'
                      value={wifiPwd}
                      placeholder='CCMP'
                      changeEvent={setWifiPwd}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-5 flex justify-end'>
              <Button leftIcon={HiClipboardCheck}>Save Changes</Button>
            </div>
          </>
        )}
      </div>
      <div className='mt-4 w-full opacity-0 md:mt-7'>You are careful!</div>
    </Sidebar>
  );
}
