// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface Props {
  val: number;
  changeEvt: (val: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  divideBy?: number;
  className?: string | undefined;
}

export default function Slider({
  val,
  changeEvt,
  min,
  max,
  step,
  label,
  divideBy = 1,
  className,
}: Props) {
  const chg = (e: ChangeEvent<HTMLInputElement>) => {
    changeEvt(parseInt(e.target.value));
  };

  return (
    <>
      <label
        className={clsx(
          className && className,
          'mb-1 block text-sm font-medium text-gray-900 dark:text-white'
        )}
      >
        {label}: {val / divideBy}
      </label>
      <input
        type='range'
        min={min}
        max={max}
        value={val}
        step={step}
        onChange={chg}
        className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-600'
      />
    </>
  );
}
