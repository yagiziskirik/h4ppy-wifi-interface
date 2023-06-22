// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChangeEvent } from 'react';

interface Props {
  toggle: boolean;
  toggleSet: (val: boolean) => void;
}

export default function Toggle({ toggle, toggleSet }: Props) {
  const setToggle = (e: ChangeEvent<HTMLInputElement>) => {
    toggleSet(e.target.checked);
  };

  return (
    <div className='flex items-center justify-center'>
      <label className='flex cursor-pointer items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={toggle}
            onChange={setToggle}
            className='custom-toggle sr-only'
          />
          <div className='block h-6 w-10 rounded-full bg-neutral-500'></div>
          <div className='dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition'></div>
        </div>
      </label>
    </div>
  );
}
