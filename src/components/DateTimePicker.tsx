// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  label: string;
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
}

export default function DateTimePicker({
  label,
  selectedDate,
  setSelectedDate,
}: Props) {
  return (
    <div className='flex items-center gap-2'>
      <p>{label}</p>
      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        showTimeSelect={true}
        timeIntervals={5}
        dateFormat='Pp'
        className='focus:ring-primary-300 block w-full rounded-md border-0 bg-neutral-900/40 py-1.5 pr-3 text-neutral-100 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
      />
    </div>
  );
}
