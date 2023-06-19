// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default function Modal() {
  return (
    <div className='newModal' style={{ display: 'none' }}>
      <div className='panel' id='js-panel'>
        <div className='panel__content'>
          <h4 className='mb-0'>Just Checking...</h4>
          <h2 className='my-0'></h2>
          <p></p>
        </div>
        <div className='panel__flaps'>
          <div className='flap outer flap--left'></div>
          <a className='flap flap__btn' href='#'>
            YES
          </a>
          <a className='flap flap__btn' href='#'>
            NO
          </a>
          <div className='flap outer flap--right'></div>
        </div>
      </div>
    </div>
  );
}
