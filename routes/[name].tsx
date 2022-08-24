/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from 'preact';
import { Head } from '$fresh/runtime.ts';
import { PageProps } from '$fresh/server.ts';
import NavigationBar from '../components/Navbar.tsx';
import { tw } from '@twind';

export default function Greet(props: PageProps) {
  return (
    <>
      <Head>
        <title>Fresh decafo</title>
      </Head>
      <NavigationBar active={props.params.name} />
      <div class={tw`p-4 mx-auto max-w-screen-lg`}>
        <div>Hello {props.params.name}</div>
      </div>
    </>
  );
}
