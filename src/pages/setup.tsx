// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import clsx from 'clsx';
import { useState } from 'react';
import { HiClipboardCheck } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Sidebar from '@/components/Sidebar';
import Slider from '@/components/Slider';
import Toggle from '@/components/Toggle';

export default function TerminalPage() {
  const [selTab, setSelTab] = useState(0);
  const [wifiName, setWifiName] = useState('h4ppy');
  const [wifiPwd, setWifiPwd] = useState('toorOnSteroids');
  const [wifiVisible, setWifiVisible] = useState(false);
  const [wifiChannel, setWifiChannel] = useState('7');
  const [wifiIntIP, setWifiIntIP] = useState('192.168.7.1');
  const [wifiWPA, setWifiWPA] = useState('3');
  const [wifiWPAKeyMgmt, setWifiWPAKeyMgmt] = useState('WPA-PSK');
  const [wifiWPAPairwise, setWifiWPAPairwise] = useState('TKIP');
  const [wifiRSNPairwise, setWifiRSNPairwise] = useState('CCMP');
  const [cardDefault, setCardDefault] = useState('wlan0');
  const [cardDeauth, setCardDeauth] = useState('Virtual');
  const [cardMonitor, setCardMonitor] = useState('Activate When Needed');
  const [cardHotspot, setCardHotspot] = useState('Virtual');
  const [securityBehaviour, setSecurityBehaviour] = useState('Kick Device');
  const [overrideBehaviour, setOverrideBehaviour] = useState('Prevent');
  const [deviceLowBattery, setDeviceLowBattery] = useState('Shutdown');
  const [interfaceAnimatedBG, setInterfaceAnimatedBG] = useState('On');
  const [interfaceLoginBG, setInterfaceLoginBG] = useState('On');
  const [interfaceZoom, setInterfaceZoom] = useState(10);

  return (
    <Sidebar active='setup'>
      <div className='flex items-center justify-between'>
        <h3 className='glitch' data-text='Setup'>
          Setup
        </h3>
        <Button leftIcon={HiClipboardCheck} variant='outline'>
          Save Changes
        </Button>
      </div>
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
            <button
              className={clsx(
                selTab == 3
                  ? 'border-primary-300 text-primary-300 font-medium'
                  : 'border-transparent text-neutral-500',
                'hover:text-primary-300 inline-flex items-center gap-2 whitespace-nowrap border-b-[3px] px-1 py-2 text-xl'
              )}
              onClick={() => setSelTab(3)}
            >
              Device & Interface
            </button>
          </nav>
        </div>

        {selTab === 0 && (
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
                      value={wifiIntIP}
                      placeholder='192.168.7.1'
                      changeEvent={setWifiIntIP}
                    />
                    <Select
                      selected={wifiChannel}
                      changeEvt={setWifiChannel}
                      placeholder='Channel'
                      label='Select a channel'
                      options={Array.from({ length: 11 }, (_, i) =>
                        (i + 1).toString()
                      )}
                    />
                  </div>
                  <div className='mt-3 flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Select
                      selected={wifiWPA}
                      changeEvt={setWifiWPA}
                      placeholder='wpa'
                      label='WPA'
                      options={['1', '2', '3']}
                    />
                    <Select
                      selected={wifiWPAKeyMgmt}
                      changeEvt={setWifiWPAKeyMgmt}
                      placeholder='wpa_key_mgmt'
                      label='WPA Key Management'
                      options={['WPA-PSK', 'WPA-EAP', 'WPA-PSK WPA-EAP']}
                    />
                  </div>
                  <div className='mt-3 flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Select
                      selected={wifiWPAPairwise}
                      changeEvt={setWifiWPAPairwise}
                      placeholder='wpa_pairwise'
                      label='WPA Pairwise'
                      options={['TKIP', 'CCMP', 'TKIP CCMP']}
                    />
                    <Select
                      selected={wifiRSNPairwise}
                      changeEvt={setWifiRSNPairwise}
                      placeholder='rsn_pairwise'
                      label='RSN Pairwise'
                      options={['CCMP']}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {selTab === 1 && (
          <>
            <div className='mt-5'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full pr-4 md:w-2/5'>
                  <h2 className='text-base'>Card Selection</h2>
                  <p className='text-sm opacity-80'>
                    Select which Wi-Fi card to use on which occasion
                  </p>
                </div>
                <div className='mt-3 w-full md:mt-0 md:w-3/5'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Select
                      selected={cardDefault}
                      changeEvt={setCardDefault}
                      placeholder='Default Card'
                      label='Default Card'
                      options={['wlan0', 'wlan1']}
                    />
                    <Select
                      selected={cardDeauth}
                      changeEvt={setCardDeauth}
                      placeholder='Deauth Card'
                      label='Card for Deauth'
                      options={['Virtual', 'wlan1']}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-7'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full pr-4 md:w-2/5'>
                  <h2 className='text-base'>Monitor Mode</h2>
                  <p className='text-sm opacity-80'>
                    Settings for monitor mode and Wi-Fi hotspot card
                  </p>
                </div>
                <div className='mt-3 w-full md:mt-0 md:w-3/5'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Select
                      selected={cardMonitor}
                      changeEvt={setCardMonitor}
                      placeholder='Monitor Mode'
                      label='Monitor Mode'
                      options={['Activate On Start', 'Activate When Needed']}
                    />
                    <Select
                      selected={cardHotspot}
                      changeEvt={setCardHotspot}
                      placeholder='Hotspot Card'
                      label='Hotspot Card'
                      options={['Virtual', 'wlan0', 'wlan1']}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {selTab === 2 && (
          <>
            <div className='mt-5'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full pr-4 md:w-2/5'>
                  <h2 className='text-base'>Device Security</h2>
                  <p className='text-sm opacity-80'>
                    Choose what happens in case of unauthorised interractions
                  </p>
                </div>
                <div className='mt-3 w-full md:mt-0 md:w-3/5'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Select
                      selected={securityBehaviour}
                      changeEvt={setSecurityBehaviour}
                      placeholder='When unauthorised access...'
                      label='Security Behaviour'
                      options={[
                        'Kick Device',
                        'Restart',
                        'Hibernate',
                        'Shutdown',
                        '!!! DELETE CONTENT !!!',
                      ]}
                    />
                    <Select
                      selected={overrideBehaviour}
                      changeEvt={setOverrideBehaviour}
                      placeholder='Override the current job'
                      label='Override the Job'
                      options={['Prevent', 'Ask', 'Override']}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {selTab === 3 && (
          <>
            <div className='mt-5'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full pr-4 md:w-2/5'>
                  <h2 className='text-base'>Device</h2>
                  <p className='text-sm opacity-80'>Device related settings</p>
                </div>
                <div className='mt-3 w-full md:mt-0 md:w-3/5'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Select
                      selected={deviceLowBattery}
                      changeEvt={setDeviceLowBattery}
                      placeholder='When low on battery...'
                      label='Low Battery Behaviour'
                      options={['Hibernate', 'Shutdown']}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-7'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full pr-4 md:w-2/5'>
                  <h2 className='text-base'>Interface</h2>
                  <p className='text-sm opacity-80'>
                    Change settings related to the current interface
                  </p>
                </div>
                <div className='mt-3 w-full md:mt-0 md:w-3/5'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Select
                      selected={interfaceAnimatedBG}
                      changeEvt={setInterfaceAnimatedBG}
                      placeholder='Animated Background'
                      label='Animated Background'
                      options={['On', 'Off']}
                    />
                    <Select
                      selected={interfaceLoginBG}
                      changeEvt={setInterfaceLoginBG}
                      placeholder='Animated Login Screen'
                      label='Animated Login Screen'
                      options={['On', 'Off']}
                    />
                  </div>
                  <Slider
                    val={interfaceZoom}
                    label='Inteface Zoom'
                    min={5}
                    max={20}
                    step={1}
                    divideBy={10}
                    changeEvt={setInterfaceZoom}
                    className='mt-3'
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className='mt-4 w-full opacity-0 md:mt-7'>You are careful!</div>
    </Sidebar>
  );
}
