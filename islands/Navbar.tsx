import { useState } from 'preact/hooks';
import { Icon } from "@iconify/react";
import { User } from '../utils/types.ts';
import NavItem from '../components/NavItem.tsx';


interface NavbarProps {
  active: string;
  user?: User;
  authUrl?: string;
}

export default function Navbar({ active, user, authUrl }: NavbarProps) {
  const [modal, setModal] = useState('hidden');
  const items = [
    {
      name: 'Career',
      href: '/career',
    },
    {
      name: 'My Profile',
      href: '/profile'
    },
  ];

  const onDropdownClick = (e: MouseEvent) => {
    e.preventDefault();
    modal === 'hidden' ? setModal('block') : setModal('hidden')
  }

  return (
    <nav class="bg(gray-50) py-2 border(t-2 b-2 gray-100)">
      <div
        class="flex items-center justify-between max-w-screen-lg mx-auto"
      >
        <a class="flex items-center gap-2 mx-4 tracking-tight" href='/'>
          <img src='/logo.svg' width='32' />
          <b>DECAFO</b>
        </a>
        <ul class="flex items-center justify-end gap-8 mx-4">
          {items.map((item) => <NavItem active={active} name={item.name} href={item.href} />)}
          <li>
            {
              user?.avatar_url ? (
                <div class="relative inline-block">
                  <div onClick={onDropdownClick} class="flex items-center cursor-pointer">
                    <img src={user?.avatar_url} class="w-[36px] h-[36px] rounded" />
                    <Icon icon={"ic:round-keyboard-arrow-down"} />
                  </div>
                  <div class={`absolute w-[100px] top-14 right-0 bg-gray-200 ${modal}`} id="dropdown">
                    <a href="/edit"><p class="px-2 py-1 text-indigo-400">edit</p></a>
                    <a href="/api/signOut"><p class="px-2 py-1 text-indigo-500">sign out</p></a>
                  </div>
                </div>
              ) : <a href={authUrl}><span>Sign In</span></a>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
}