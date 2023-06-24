// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  faArrowUpRightFromSquare,
  faClockRotateLeft,
  faCodeBranch,
  faCodePullRequest,
  faLock,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import Button from '@/components/buttons/Button';
import Sidebar from '@/components/Sidebar';

import SettingsType from '@/types/settingsType';

const SystemChart = dynamic(() => import('@/components/SystemChart'), {
  ssr: false,
});

export default function HomePage(data: SettingsType) {
  return (
    <Sidebar data={data}>
      <h3 className='glitch' data-text='Dashboard'>
        Dashboard
      </h3>
      <div className='mt-6 grid grid-cols-2 grid-rows-2 gap-4 md:mt-7 md:grid-cols-4 md:grid-rows-1 md:gap-7'>
        <SystemChart val={13} name='CPU' />
        <SystemChart val={22} name='RAM' />
        <SystemChart val={55} name='Storage' />
        <SystemChart val={77} name='Battery' />
      </div>
      <div className='mt-4 grid grid-cols-1 grid-rows-2 gap-4 md:mt-7 md:grid-cols-2 md:grid-rows-1 md:gap-7'>
        <div className='card custom-bg p-7'>
          <div className='text-primary-300 flex items-center gap-3'>
            <FontAwesomeIcon icon={faCodeBranch} width={20} />
            <h3 className='text-xl font-normal md:text-2xl'>Current Work</h3>
          </div>
          <p className='classy-underline mt-4 !opacity-90'>Details</p>
          <div className='mt-3 grid grid-cols-2 grid-rows-2 gap-x-1 font-thin'>
            <p>ESSID: -</p>
            <p>BSSID: -</p>
            <p>Power: -</p>
            <p>Channel: -</p>
          </div>
          <p className='classy-underline mt-4 !opacity-90'>Attempts</p>
          <ul className='ml-5 mt-3 list-disc opacity-80'>
            <li>None</li>
          </ul>
          <p className='classy-underline mt-4 !opacity-90'>Progress</p>
          <div className='mt-4 h-2.5 w-full rounded-full bg-neutral-700'>
            <div
              className='bg-primary-300 h-2.5 rounded-full'
              style={{ width: '40%' }}
            ></div>
          </div>
          <div className='mt-2 flex items-center justify-between'>
            <p className='font-semibold !opacity-90'>Idle</p>
            <p>None in progress...</p>
          </div>
        </div>
        <div className='card custom-bg p-7'>
          <div className='text-primary-300 flex items-center gap-3'>
            <FontAwesomeIcon icon={faLock} width={20} />
            <h3 className='text-xl font-normal md:text-2xl'>Security</h3>
          </div>
          <p className='classy-underline mt-4 !opacity-90'>Connected Devices</p>
          <div className='my-2 flex items-center justify-between'>
            <div>
              ◦ E3:C8:15:32:6C:42 -{' '}
              <span className='opacity-80'>Max's iPhone</span>
            </div>
            <Button variant='outline'>
              Kick
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className='ml-1'
                width={16}
              />
            </Button>
          </div>
          <div className='my-2 flex items-center justify-between'>
            <div>
              ◦ C4:46:EB:A1:FA:16 - <span className='opacity-80'>h4ck3r</span>
            </div>
            <Button variant='outline'>
              Kick
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className='ml-1'
                width={16}
              />
            </Button>
          </div>
          <p className='classy-underline mt-4 !opacity-90'>
            Accessed to System
          </p>
          <div className='my-4 flex items-center justify-between'>
            <div>◦ Max's iPhone</div>
            <div className='opacity-80'>E3:C8:15:32:6C:42</div>
          </div>
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 grid-rows-3 gap-4 pb-7 md:mt-7 md:grid-cols-3 md:grid-rows-1 md:gap-7 md:pb-9'>
        <div className='card custom-bg p-7'>
          <div className='text-primary-300 flex items-center gap-3'>
            <FontAwesomeIcon icon={faClockRotateLeft} width={20} />
            <h3 className='text-xl font-normal md:text-2xl'>Uptime</h3>
          </div>
          <h1 className='mt-5 text-center font-bold opacity-80' id='uptime'>
            00:00:00
          </h1>
        </div>
        <div className='card custom-bg p-7'>
          <div className='text-primary-300 flex items-center gap-3'>
            <FontAwesomeIcon icon={faCodePullRequest} width={20} />
            <h3 className='text-xl font-normal md:text-2xl'>Updates</h3>
          </div>
          <div className='mt-5 flex items-center justify-between'>
            <p className='text-xl'>v0.1.0</p>
            <Button variant='outline'>Check Updates</Button>
          </div>
        </div>
        <div className='card custom-bg p-7'>
          <div className='text-primary-300 flex items-center gap-3'>
            <FontAwesomeIcon icon={faMicrochip} width={20} />
            <h3 className='text-xl font-normal md:text-2xl'>System</h3>
          </div>
          <div className='mt-5 flex items-center gap-2'>
            <Button
              variant='primary'
              className='flex w-1/2 justify-center border-yellow-500 bg-yellow-500 text-center text-black transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black active:border-yellow-600 active:bg-yellow-600'
            >
              Check Updates
            </Button>
            <Button
              variant='primary'
              className='flex w-1/2 justify-center border-red-500 bg-red-500 text-center transition hover:border-red-400 hover:bg-red-400 active:border-red-600 active:bg-red-600'
            >
              Power Off
            </Button>
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
