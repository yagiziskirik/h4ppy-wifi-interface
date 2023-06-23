// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChangeEvent } from 'react';

interface Props {
  selected?: string | undefined;
  changeEvt: (opt: string) => void;
  label: string;
  placeholder: string;
  options: string[];
}

export default function Select({
  selected,
  label,
  placeholder,
  options,
  changeEvt,
}: Props) {
  const changeEv = (e: ChangeEvent<HTMLSelectElement>) => {
    changeEvt(e.target.value);
  };

  return (
    <div className='flex w-full flex-col'>
      <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <select
        onChange={changeEv}
        className='focus:ring-primary-300 block w-full rounded-md border-0 bg-neutral-900/40 px-3 py-1.5 text-neutral-100 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
        value={selected}
      >
        <option disabled value=''>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
