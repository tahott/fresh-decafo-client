import { Menu } from '@headlessui/react';
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
    <nav class="bg(gray-50) py-2 border(t-2 b-2 gray-100)">
      <div
        class="flex items-center justify-between max-w-screen-lg mx-auto"
      >
        <a class="flex items-center gap-2 mx-4 tracking-tight" href='/'>
          <img src='/logo.svg' width='32' />
          <b>DECAFO</b>
        </a>
        <ul class="flex justify-end gap-8 mx-4">
          {items.map((item) => <NavItem active={active} name={item.name} href={item.href} />)}
        </ul>
        <Menu>
          <Menu.Button>More</Menu.Button>
          <Menu.Items>
            <Menu.Item>
              {
                ({ active }) => (
                  <div class={active ? 'bg-orange-300' : 'bg-orange-100'}>Item1</div>
                )
              }
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
}