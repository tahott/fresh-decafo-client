import { User } from '../utils/types.ts';
import NavItem from './NavItem.tsx';

interface NavbarProps {
  active: string;
  user?: User;
  authUrl?: string;
}

export default function Navbar({ active, user, authUrl }: NavbarProps) {
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
          <li>
            <a href={authUrl ? authUrl : '/api/signOut'}>
              {
                user?.avatar_url ? (
                  <img src={user?.avatar_url} class="w-[24px] h-[24px] rounded" />
                ) : <span>Sign In</span>
              }
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}