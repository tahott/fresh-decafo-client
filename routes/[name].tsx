/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from 'preact';
import { PageProps } from '$fresh/server.ts';
import NavigationBar from '../components/Navbar.tsx';
import { tw } from '@twind';

export default function Greet(props: PageProps) {
  return (
    <>
      <NavigationBar active={props.url.pathname} />
      <div class={tw`p-4 mx-auto max-w-screen-lg`}>
        <div>Hello {props.params.name}</div>
      </div>
    </>
  );
}
