// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
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
        <div className='mt-5 grid grid-cols-1 grid-rows-2 gap-5 md:grid-cols-2 md:grid-rows-1'>
          <Button className='relative flex items-center gap-3 rounded-xl px-5'>
            <Lottie
              animationData={listenAnimation}
              className='h-24 w-24 md:h-32 md:w-32'
            />
            <h1 className='rounded-lg bg-neutral-800 p-3 text-lg md:text-4xl'>
              Man in the Middle
            </h1>
          </Button>
          <Button className='relative flex items-center gap-3 rounded-xl px-5'>
            <Lottie
              animationData={portalAnimation}
              className='h-24 w-24 md:h-32 md:w-32'
            />
            <h1 className='rounded-lg bg-neutral-800 p-3 text-lg md:text-4xl'>
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
