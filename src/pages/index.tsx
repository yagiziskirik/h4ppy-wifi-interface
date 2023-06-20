// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';

import Sidebar from '@/components/Sidebar';

const SystemChart = dynamic(() => import('@/components/SystemChart'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <Sidebar>
      <h3 className='glitch' data-text='Dashboard'>
        Dashboard
      </h3>
      <div className='mt-7 grid grid-cols-2 grid-rows-2 gap-7 md:grid-cols-4 md:grid-rows-1'>
        <SystemChart val={13} name='CPU' />
        <SystemChart val={22} name='RAM' />
        <SystemChart val={55} name='Storage' />
        <SystemChart val={77} name='Battery' />
      </div>
      <div className='mt-7 grid grid-cols-1 grid-rows-2 gap-7 md:grid-cols-2 md:grid-rows-1'>
        <div className='card custom-bg p-7'>
          <div className='text-primary-300 flex items-center gap-3'>
            <FontAwesomeIcon icon={faCodeBranch} width={23} />
            <h3 className='text-2xl font-normal'>Current Work</h3>
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
      </div>
    </Sidebar>
  );
}
