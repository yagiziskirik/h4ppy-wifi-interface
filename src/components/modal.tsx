// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import clsx from 'clsx';

interface Props {
  title?: string;
  prompt: string;
  confirmButton?: string;
  denyButton?: string;
  clickAction: () => void;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
}

export default function Modal({
  title = 'Just Checking...',
  prompt,
  confirmButton = 'YES',
  denyButton = 'NO',
  clickAction,
  isActive,
  setIsActive,
}: Props) {
  const clickEvent = () => {
    setIsActive(false);
    clickAction();
  };
  return (
    <div className={clsx(isActive && 'active', 'newModal')}>
      <div className={clsx(isActive && 'is--open', 'panel')}>
        <div className='panel__content'>
          <h4>{title}</h4>
          <p>{prompt}</p>
        </div>
        <div className='panel__flaps'>
          <div className='flap outer flap--left'></div>
          <div className='flap__cont'>
            <button className='flap flap__btn' onClick={clickEvent}>
              {confirmButton}
            </button>
          </div>
          <div className='flap__cont'>
            <button
              className='flap flap__btn'
              onClick={() => setIsActive(false)}
            >
              {denyButton}
            </button>
          </div>
          <div className='flap outer flap--right'></div>
        </div>
      </div>
    </div>
  );
}
