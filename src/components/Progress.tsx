// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import clsx from 'clsx';

interface Props {
  percentage: number;
  className?: string;
}

export default function Progress({ percentage, className }: Props) {
  return (
    <div
      className={clsx(
        className && className,
        'h-2.5 w-full rounded-full bg-neutral-700'
      )}
    >
      <div
        className='bg-primary-300 shimmer h-2.5 rounded-full'
        style={{ width: `${percentage}%`, transition: 'all 0.3s ease-out' }}
      ></div>
    </div>
  );
}
