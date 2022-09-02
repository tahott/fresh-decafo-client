/** @jsx h */

import { h } from 'preact';
import { tw } from '@twind';
import NavItem from './NavItem.tsx';

interface NavbarProps {
  active: string;
  isLogin: boolean;
}

export default function Navbar({ active, isLogin }: NavbarProps) {
  const items = [
    {
      name: 'Career',
      href: '/career',
    },
    {
      name: 'My Profile',
      href: '/profile'
    },
    {
      name: !isLogin ? 'Sign In' : 'Sign Out',
      href: !isLogin ? '/signIn' : '/api/signOut'
    }
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
          {items.map((item) => <NavItem active={active} name={item.name} href={item.href} />)}
        </ul>
      </div>
    </nav>
  );
}