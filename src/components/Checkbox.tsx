// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChangeEvent } from 'react';

interface Props {
  isChecked: boolean;
  checkAction: (val: boolean) => void;
  label: string;
}

export default function Checkbox({ isChecked, checkAction, label }: Props) {
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    checkAction(e.target.checked);
  };
  return (
    <label className='flex items-center gap-2'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={change}
        className='text-primary-300 focus:ring-primary-200 dark:focus:ring-primary-300 h-4 w-4 rounded border-neutral-300 bg-neutral-100 focus:ring-2 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800'
      />
      <p>{label}</p>
    </label>
  );
}
