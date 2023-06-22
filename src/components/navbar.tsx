// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Link from 'next/link';
import { HiMenuAlt2 } from 'react-icons/hi';

import IconButton from './buttons/IconButton';
import NextImage from './NextImage';

export default function Navbar() {
  const toggleSidebar = () => {
    const togg = document.body.getAttribute('data-sidebar');
    if (togg === 'true') {
      document.body.setAttribute('data-sidebar', 'false');
    } else {
      document.body.setAttribute('data-sidebar', 'true');
    }
  };

  return (
    <div
      className='flex h-16 w-full items-center gap-3 px-4 py-4 md:px-9'
      style={{ backgroundColor: 'rgb(17, 20, 23)' }}
    >
      <div className='block md:hidden'>
        <IconButton
          icon={HiMenuAlt2}
          variant='outline'
          onClick={toggleSidebar}
        />
      </div>
      <Link href='/' className='flex w-fit items-center gap-3'>
        <NextImage src='/images/logo.png' alt='Logo' width={28} height={26} />
        <h3
          className='text-primary-300 font-normal'
          style={{ fontSize: '1.2rem' }}
        >
          h4ppy's Wi-Fi Tool
        </h3>
      </Link>
    </div>
  );
}
