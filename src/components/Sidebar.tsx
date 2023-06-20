// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  type IconDefinition,
  faBasketShopping,
  faBuildingWheat,
  faHandshake,
  faHouseChimney,
  faHouseChimneyCrack,
  faLocationCrosshairs,
  faLock,
  faPeopleArrows,
  faScrewdriverWrench,
  faTerminal,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { ReactElement } from 'react';

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
  icon: IconDefinition;
}

function SidebarLink({ name, active, icon }: SidebarProps) {
  return (
    <Link
      href='/'
      className='mt-3 flex items-center gap-3 font-light text-gray-200/70 transition hover:text-gray-200'
    >
      <div
        className='flex h-9 w-9 items-center justify-center rounded-md'
        style={{ backgroundColor: '#26282B' }}
      >
        <FontAwesomeIcon icon={icon} width={20} />
      </div>
      <p
        style={{ fontSize: '1.05rem' }}
        className={
          active ? 'text-primary-300 hover:text-primary-200 font-medium' : ''
        }
      >
        {name}
      </p>
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
        <SidebarLink
          name='Dashboard'
          icon={faHouseChimney}
          active={active === 'dashboard'}
        />
        <SidebarLink
          name='Setup'
          icon={faScrewdriverWrench}
          active={active === 'setup'}
        />
        <h3 className='sidebar-header mt-8 pb-1.5 text-lg font-light text-white/80'>
          Tools
        </h3>
        <SidebarLink
          name="Wi-Fi's Around"
          icon={faWifi}
          active={active === 'wifis-around'}
        />
        <SidebarLink
          name='Placement Helper'
          icon={faLocationCrosshairs}
          active={active === 'placementhelper'}
        />
        <SidebarLink
          name='Get Handshake'
          icon={faHandshake}
          active={active === 'gethandshake'}
        />
        <SidebarLink
          name='Evil Twin Attack'
          icon={faPeopleArrows}
          active={active === 'eviltwinattack'}
        />
        <SidebarLink
          name='Terminal'
          icon={faTerminal}
          active={active === 'terminal'}
        />
        <h3 className='sidebar-header mt-8 pb-1.5 text-lg font-light text-white/80'>
          Combined Attacks
        </h3>
        <SidebarLink
          name="Plant n' Leave"
          icon={faBuildingWheat}
          active={active === 'plantnleave'}
        />
        <SidebarLink
          name='Wi-Fi Lockdown'
          icon={faLock}
          active={active === 'wifilockdown'}
        />
        <SidebarLink
          name='Handshake Collector'
          icon={faBasketShopping}
          active={active === 'handshakecollector'}
        />
        <SidebarLink
          name='Man In The House'
          icon={faHouseChimneyCrack}
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
