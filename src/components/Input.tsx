// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { useState } from 'react';

interface Props {
  label: string;
  value?: string;
  changeEvent: (str: string) => void;
  placeholder?: string;
  start?: string;
  hidable?: boolean;
  autocomplete?: string;
}

export default function Input({
  label,
  value = '',
  placeholder = '',
  start,
  changeEvent,
  hidable = false,
  autocomplete = 'off',
}: Props) {
  const chgInternal = (e: ChangeEvent<HTMLInputElement>) => {
    changeEvent(e.target.value);
  };

  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className='w-full'>
      <label className='block text-sm font-medium leading-6 text-gray-200'>
        {label}
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        {start && (
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className='text-neutral-500 sm:text-sm'>{start}</span>
          </div>
        )}
        <input
          type={hidable && isHidden ? 'password' : 'text'}
          name='inp'
          value={value}
          autoComplete={autocomplete}
          className={clsx(
            start ? 'pl-8' : 'pl-3',
            hidable ? 'pr-9' : 'pr-3',
            'focus:ring-primary-300 block w-full rounded-md border-0 bg-neutral-900/40 py-1.5 pr-3 text-neutral-100 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
          )}
          placeholder={placeholder}
          onChange={chgInternal}
        />
        {hidable && (
          <div className='absolute inset-y-0 right-0 flex items-center'>
            <FontAwesomeIcon
              icon={isHidden ? faEyeSlash : faEye}
              height={15}
              width={15}
              className={clsx(
                isHidden ? 'text-neutral-300' : 'text-primary-300',
                'mr-3'
              )}
              onClick={() => setIsHidden(!isHidden)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
