/** @jsx h */

import { h } from 'preact';
import { tw } from '@twind';

interface NavbarProps {
  active: string
}

export default function Navbar({ active }: NavbarProps) {
  const items = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Career',
      href: '/career',
    },
    {
      name: 'My Profile',
      href: '/profile'
    },
  ];

  return (
    <nav class={tw`bg(gray-50) py-2 border(t-2 b-2 gray-100)`}>
      <div
        class={tw`flex items-center justify-between max-w-screen-lg mx-auto`}
      >
        <a class={tw`flex items-center gap-2 mx-4 tracking-tight`} href='/'>
          <img src='/logo.svg' width='32' />
          <b>DECAFO</b>
        </a>
        <ul class={tw`flex justify-end gap-8 mx-4`}>
          {items.map((item) => (
            <li>
              <a
                href={item.href}
                class={tw`text-gray-800 hover:underline ${
                  active == item.href ? 'font-bold' : ''
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}