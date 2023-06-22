// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';

import NextImage from '@/components/NextImage';
import Sidebar from '@/components/Sidebar';

const Term = dynamic(() => import('@/components/Terminal'), { ssr: false });

export default function TerminalPage() {
  return (
    <Sidebar active='terminal'>
      <h3 className='glitch' data-text='Terminal'>
        Terminal
      </h3>
      <div className='card terminal mt-7'>
        <div className='ter-topbar'>
          <div className='btns w-1/4'>
            <div className='cls-btn bbttnn'></div>
            <div className='mnm-btn bbttnn'></div>
            <div className='full-btn bbttnn'></div>
          </div>
          <div className='address-bar flex w-1/2 items-center justify-center'>
            <NextImage
              src='/images/logo.png'
              alt='Logo'
              height={15}
              width={15}
            />
            <p className='ml-2 !opacity-95'>Kali's Terminal</p>
          </div>
          <div className='address-bar flex w-1/4 items-center justify-end gap-1 p-5'>
            <p className='text-sm'>h4ppy</p>
            <FontAwesomeIcon
              icon={faLock}
              className='opacity-80'
              height={15}
              width={15}
            />
          </div>
        </div>
        <Term />
      </div>
    </Sidebar>
  );
}
