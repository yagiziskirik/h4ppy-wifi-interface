// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { GetStaticProps } from 'next';

import Sidebar from '@/components/Sidebar';

import SettingsType from '@/types/settingsType';

export default function WifisAroundPage(data: SettingsType) {
  return (
    <Sidebar data={data} active='handshakecollector'>
      <div className='flex items-center justify-between'>
        <h3 className='glitch' data-text='Handshake Collector'>
          Handshake Collector
        </h3>
      </div>
      <div className='card custom-bg mt-7 p-5'>
        <div className='flex w-full items-center justify-center'>
          <div className='text-primary-300 flex items-center gap-3'>
            <h3 className='text-xl font-normal md:text-2xl'>Coming soon...</h3>
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
