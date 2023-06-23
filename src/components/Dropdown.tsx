// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { HiCog } from 'react-icons/hi';

import Button from './buttons/Button';

type DropdownLink = {
  name: string;
  icon?: IconDefinition;
  clickEvent: () => void;
};

interface Props {
  links: DropdownLink[];
}

export default function Dropdown({ links }: Props) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='border-primary-300 bg-primary-300 hover:border-primary-200 hover:bg-primary-200 active:border-primary-400 active:bg-primary-400 ring-primary-300 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-neutral-800 shadow-sm ring-1 ring-inset hover:text-neutral-700 active:text-neutral-900'>
          <HiCog
            className='text-netural-800 -mx-1 h-5 w-5'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right overflow-visible rounded-md bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {links.map((link) => (
              <Menu.Item key={link.name}>
                <Button
                  variant='outline'
                  className='flex w-full items-center gap-2 border-none px-4 py-1 text-left text-sm text-neutral-200 hover:text-neutral-800'
                  onClick={link.clickEvent}
                >
                  {link.icon && (
                    <FontAwesomeIcon icon={link.icon} height={15} width={15} />
                  )}
                  <p className='!opacity-100'>{link.name}</p>
                </Button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
