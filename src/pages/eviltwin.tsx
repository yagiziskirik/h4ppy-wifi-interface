// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lottie from 'lottie-react';
import { GetStaticProps } from 'next';
import listenAnimation from 'public/lottie/86540-waling-men-listening-podcast.json';
import portalAnimation from 'public/lottie/141422-portals.json';

import Button from '@/components/buttons/Button';
import Sidebar from '@/components/Sidebar';

import SettingsType from '@/types/settingsType';

export default function TerminalPage(data: SettingsType) {
  return (
    <Sidebar data={data} active='eviltwinattack'>
      <h3 className='glitch' data-text='Evil Twin'>
        Evil Twin
      </h3>
      <div className='card custom-bg mt-7 p-7'>
        <div className='text-primary-300 flex items-center gap-3'>
          <FontAwesomeIcon icon={faPeopleArrows} width={20} />
          <h3 className='text-xl font-normal md:text-2xl'>
            Select Attack Type
          </h3>
        </div>
        <div className='mt-5 flex flex-col gap-5 md:flex-row'>
          <Button className='relative flex w-full flex-col items-center justify-center rounded-xl md:w-1/2'>
            <Lottie animationData={listenAnimation} />
            <h1 className='transform-center absolute left-1/2 top-1/2 rounded-lg bg-neutral-800 p-3'>
              Man in the Middle
            </h1>
          </Button>
          <Button className='relative flex w-full flex-col items-center justify-center rounded-xl md:w-1/2'>
            <Lottie animationData={portalAnimation} />
            <h1 className='transform-center absolute left-1/2 top-1/2 rounded-lg bg-neutral-800 p-3'>
              Captive Portal
            </h1>
          </Button>
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
