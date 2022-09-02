/** @jsx h */

import { h } from 'preact';
import { tw } from '@twind';

interface NavItemProps {
  active: string;
  name: string;
  href: string;
}

export default function NavItem({active, name, href }: NavItemProps) {
  return (
    <li>
      <a
        href={href}
        class={tw`text-gray-800 hover:underline ${
          active === href ? 'font-bold' : ''
        }`}
      >
        {name}
      </a>
    </li>
  )
}