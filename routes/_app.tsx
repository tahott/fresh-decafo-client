/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from 'preact';
import { AppProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';

export default function App({ Component } : AppProps) {
  return (
    <>
      <Head>
        <title>Fresh decafo</title>
      </Head>
      <Component />
    </>
  );
}