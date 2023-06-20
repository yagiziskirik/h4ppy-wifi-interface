// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Link from 'next/link';

import NextImage from './NextImage';

export default function Navbar() {
  return (
    <div className='h-16 w-full' style={{ backgroundColor: 'rgb(17, 20, 23)' }}>
      <Link href='/' className='flex w-fit items-center gap-3 px-9 py-4'>
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
