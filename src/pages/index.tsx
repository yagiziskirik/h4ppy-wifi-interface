// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import dynamic from 'next/dynamic';
import * as React from 'react';

import Sidebar from '@/components/Sidebar';

const Term = dynamic(() => import('@/components/Terminal'), { ssr: false });

export default function HomePage() {
  return (
    <Sidebar>
      <h1 className='mt-4'>Next.js Terminal Test</h1>
      <p className='mb-3 mt-2 text-sm text-gray-400'>
        A brilliant test (apparently, now working) of terminal test in Next.js
        with Express server running on different port.
      </p>
      <Term />
    </Sidebar>
  );
}