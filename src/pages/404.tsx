import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';
import Sidebar from '@/components/Sidebar';

export default function NotFoundPage() {
  return (
    <Sidebar data={{}} active='404'>
      <Seo templateTitle='Not Found' />
      <div className='flex h-full flex-col items-center justify-center text-center text-black'>
        <RiAlarmWarningFill
          size={60}
          className='drop-shadow-glow animate-flicker text-red-500'
        />
        <h1 className='mt-8 text-4xl text-white md:text-6xl'>Page Not Found</h1>
        <ArrowLink className='mt-4 text-white/75 md:text-lg' href='/'>
          Back to Home
        </ArrowLink>
      </div>
    </Sidebar>
  );
}
