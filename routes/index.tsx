/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from 'preact';
import { tw } from '@twind';
import NavigationBar from '../components/Navbar.tsx';

export default function Home() {
  return (
    <>
      <NavigationBar active='/' />
      <div class={tw`p-4 mx-auto max-w-screen-lg`}>
        <img
          src='/logo.svg'
          height='100px'
          alt='the fresh logo: a sliced lemon dripping with juice'
        />
        <p class={tw`my-6`}>
          Welcome to `DECAFO`. This page is landing page. <span style='font-size:1.5rem;'>&#128748;</span>
        </p>
      </div>
    </>
  );
}
