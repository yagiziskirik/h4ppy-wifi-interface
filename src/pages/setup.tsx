// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import clsx from 'clsx';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiClipboardCheck } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Sidebar from '@/components/Sidebar';
import Slider from '@/components/Slider';
import Toggle from '@/components/Toggle';

import SettingsType from '@/types/settingsType';

function ValidateIPaddress(ipaddress: string) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
}

export default function SetupPage(data: SettingsType) {
  const router = useRouter();

  const refreshPage = () => {
    router.refresh();
  };

  const [selTab, setSelTab] = useState(0);
  const [wifiName, setWifiName] = useState(
    data.wifiName ? data.wifiName : 'h4ppy'
  );
  const [wifiPwd, setWifiPwd] = useState(
    data.wifiPwd ? data.wifiPwd : 'toorOnSteroids'
  );
  const [wifiVisible, setWifiVisible] = useState(
    data.wifiVisible ? data.wifiVisible : false
  );
  const [wifiChannel, setWifiChannel] = useState(
    data.wifiChannel ? data.wifiChannel : '7'
  );
  const [wifiIntIP, setWifiIntIP] = useState(
    data.wifiIntIP ? data.wifiIntIP : '192.168.7.1'
  );
  const [wifiWPA, setWifiWPA] = useState(data.wifiWPA ? data.wifiWPA : '3');
  const [wifiWPAKeyMgmt, setWifiWPAKeyMgmt] = useState(
    data.wifiWPAKeyMgmt ? data.wifiWPAKeyMgmt : 'WPA-PSK'
  );
  const [wifiWPAPairwise, setWifiWPAPairwise] = useState(
    data.wifiWPAPairwise ? data.wifiWPAPairwise : 'TKIP'
  );
  const [wifiRSNPairwise, setWifiRSNPairwise] = useState(
    data.wifiRSNPairwise ? data.wifiRSNPairwise : 'CCMP'
  );
  const [cardDefault, setCardDefault] = useState(
    data.cardDefault ? data.cardDefault : 'wlan0'
  );
  const [cardDeauth, setCardDeauth] = useState(
    data.cardDeauth ? data.cardDeauth : 'Virtual'
  );
  const [cardMonitor, setCardMonitor] = useState(
    data.cardMonitor ? data.cardMonitor : 'Activate When Needed'
  );
  const [cardHotspot, setCardHotspot] = useState(
    data.cardHotspot ? data.cardHotspot : 'Virtual'
  );
  const [securityBehaviour, setSecurityBehaviour] = useState(
    data.securityBehaviour ? data.securityBehaviour : 'Kick Device'
  );
  const [overrideBehaviour, setOverrideBehaviour] = useState(
    data.overrideBehaviour ? data.overrideBehaviour : 'Prevent'
  );
  const [securityInterfaceBehaviour, setSecurityInterfaceBehaviour] = useState(
    data.securityInterfaceBehaviour
      ? data.securityInterfaceBehaviour
      : 'Kick Device'
  );
  const [securityTryCount, setSecurityTryCount] = useState(
    data.securityTryCount ? data.securityTryCount : '3'
  );
  const [securityPassword, setSecurityPassword] = useState(
    data.securityPassword ? data.securityPassword : 'toorOnSteroids'
  );
  const [deviceLowBattery, setDeviceLowBattery] = useState(
    data.deviceLowBattery ? data.deviceLowBattery : 'Shutdown'
  );
  const [interfaceAnimatedBG, setInterfaceAnimatedBG] = useState(
    typeof data.interfaceAnimatedBG !== 'undefined'
      ? data.interfaceAnimatedBG
        ? 'On'
        : 'Off'
      : 'On'
  );
  const [interfaceLoginBG, setInterfaceLoginBG] = useState(
    typeof data.interfaceLoginBG !== 'undefined'
      ? data.interfaceLoginBG
        ? 'On'
        : 'Off'
      : 'On'
  );
  const [interfaceZoom, setInterfaceZoom] = useState(
    data.interfaceZoom ? data.interfaceZoom : 10
  );

  const sendSettings = async () => {
    if (wifiPwd.length < 8) {
      toast.error('Wi-Fi password should be longer than 8 characters.');
      return;
    }
    if (wifiName.length === 0) {
      toast.error("Wi-Fi shouldn't be empty.");
      return;
    }
    if (!ValidateIPaddress(wifiIntIP)) {
      toast.error('Please provide a valid internal IP address.');
      return;
    }
    if (securityPassword.length === 0) {
      toast.error("Interface password shouldn't be empty.");
      return;
    }
    await toast.promise(
      fetch('http://localhost:3001/setsettings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wifiName,
          wifiPwd,
          wifiVisible,
          wifiChannel,
          wifiIntIP,
          wifiWPA,
          wifiWPAKeyMgmt,
          wifiWPAPairwise,
          wifiRSNPairwise,
          cardDefault,
          cardDeauth,
          cardMonitor,
          cardHotspot,
          securityBehaviour,
          overrideBehaviour,
          securityInterfaceBehaviour,
          securityTryCount,
          securityPassword,
          deviceLowBattery,
          interfaceAnimatedBG: interfaceAnimatedBG === 'On',
          interfaceLoginBG: interfaceLoginBG === 'On',
          interfaceZoom,
        }),
      }),
      {
        loading: 'Saving...',
        success: 'Saved!',
        error: 'Server error!',
      }
    );
    setTimeout(() => {
      refreshPage();
    }, 3000);
  };

  return (
    <Sidebar data={data} active='setup'>
      <div className='flex items-center justify-between'>
        <h3 className='glitch' data-text='Setup'>
          Setup
        </h3>
        <Button
          leftIcon={HiClipboardCheck}
          onClick={sendSettings}
          variant='outline'
        >
          Save Changes
        </Button>
      </div>
      <div className='card custom-bg mt-7 p-5 pb-7'>
        <div className='border-b border-neutral-700'>
          <nav className='no-scrollbar flex space-x-4 overflow-x-scroll'>
            <button
              className={clsx(
                selTab == 0
                  ? 'border-primary-300 text-primary-300 font-medium'
                  : 'border-transparent text-neutral-500',
                'hover:text-primary-300 inline-flex items-center gap-2 whitespace-nowrap border-b-[3px] px-1 pb-2 text-lg md:text-xl'
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
                'hover:text-primary-300 inline-flex items-center gap-2 whitespace-nowrap border-b-[3px] px-1 pb-2 text-lg md:text-xl'
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
                'hover:text-primary-300 inline-flex items-center gap-2 whitespace-nowrap border-b-[3px] px-1 pb-2 text-lg md:text-xl'
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
                'hover:text-primary-300 inline-flex items-center gap-2 whitespace-nowrap border-b-[3px] px-1 pb-2 text-lg md:text-xl'
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
            <div className='mt-7'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full pr-4 md:w-2/5'>
                  <h2 className='text-base'>Interface Security</h2>
                  <p className='text-sm opacity-80'>
                    Set interface security options for this interface
                  </p>
                </div>
                <div className='mt-3 w-full md:mt-0 md:w-3/5'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                    <Select
                      selected={securityInterfaceBehaviour}
                      changeEvt={setSecurityInterfaceBehaviour}
                      placeholder='When unauthorised access...'
                      label='Unauthorised Access Behaviour'
                      options={['Kick Device', 'Hibernate', 'Shutdown']}
                    />
                    <Select
                      selected={securityTryCount}
                      changeEvt={setSecurityTryCount}
                      placeholder='x incorrect attemps...'
                      label='Try Count'
                      options={['1', '2', '3', '4', '5']}
                    />
                    <Input
                      label='Interface Password'
                      value={securityPassword}
                      placeholder='12345678'
                      changeEvent={setSecurityPassword}
                      hidable={true}
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

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetch('http://localhost:3001/settings', {
    method: 'POST',
  });
  const objectData = await result.json();

  return {
    props: objectData,
  };
};
