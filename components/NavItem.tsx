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
        class={`text-gray-800 hover:underline ${active === href ? 'font-bold' : ''}`}
      >
        {name}
      </a>
    </li>
  )
}