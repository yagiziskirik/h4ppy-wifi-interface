// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactElement } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactElement[];
  active?:
    | 'dashboard'
    | 'setup'
    | 'wifis-around'
    | 'placementhelper'
    | 'gethandshake'
    | 'eviltwinattack'
    | 'terminal'
    | 'plantnleave'
    | 'wifilockdown'
    | 'handshakecollector'
    | 'maninthehouse';
}

interface SidebarProps {
  name: string;
  active: boolean;
}

function SidebarLink({ name, active }: SidebarProps) {
  return (
    <Link
      href='/'
      className={
        active
          ? 'text-primary-300 hover:text-primary-200 mt-3 flex items-center gap-3 font-medium transition'
          : 'mt-3 flex items-center gap-3 font-light text-gray-200/70 transition hover:text-gray-200'
      }
    >
      <div
        className='h-9 w-9 rounded-md'
        style={{ backgroundColor: '#26282B' }}
      ></div>
      <p style={{ fontSize: '1.05rem' }}>{name}</p>
    </Link>
  );
}

export default function Sidebar({ children, active = 'dashboard' }: Props) {
  return (
    <div className='min-h-main flex'>
      <div
        className='min-h-main p-7'
        style={{ width: '19.5rem', backgroundColor: '#1A1C20' }}
      >
        <h3 className='sidebar-header pb-1.5 text-lg font-light text-white/80'>
          General
        </h3>
        <SidebarLink name='Dashboard' active={active === 'dashboard'} />
        <SidebarLink name='Setup' active={active === 'setup'} />
        <h3 className='sidebar-header mt-8 pb-1.5 text-lg font-light text-white/80'>
          Tools
        </h3>
        <SidebarLink name="Wi-Fi's Around" active={active === 'wifis-around'} />
        <SidebarLink
          name='Placement Helper'
          active={active === 'placementhelper'}
        />
        <SidebarLink name='Get Handshake' active={active === 'gethandshake'} />
        <SidebarLink
          name='Evil Twin Attack'
          active={active === 'eviltwinattack'}
        />
        <SidebarLink name='Terminal' active={active === 'terminal'} />
        <h3 className='sidebar-header mt-8 pb-1.5 text-lg font-light text-white/80'>
          Combined Attacks
        </h3>
        <SidebarLink name="Plant n' Leave" active={active === 'plantnleave'} />
        <SidebarLink name='Wi-Fi Lockdown' active={active === 'wifilockdown'} />
        <SidebarLink
          name='Handshake Collector'
          active={active === 'handshakecollector'}
        />
        <SidebarLink
          name='Man In The House'
          active={active === 'maninthehouse'}
        />
      </div>
      <div className='min-h-main' style={{ width: 'calc(100vw - 19.5rem)' }}>
        <div className='layout relative flex h-full flex-col items-center justify-center py-12 text-center text-gray-100'>
          {children}
        </div>
      </div>
    </div>
  );
}
