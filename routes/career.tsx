/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from 'preact';
import { Handlers, HandlerContext, PageProps } from '$fresh/server.ts';
import { tw } from '@twind';
import * as djwt from 'https://deno.land/x/djwt@v2.7/mod.ts';
import NavigationBar from '../components/Navbar.tsx';
import { JwtDecode } from "../utils/types.ts";

interface CareerProps {
  isLogin: boolean;
}

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext): Promise<Response> {
    const hasToken = localStorage.getItem('token');

    if (hasToken) {
      const [_, payload, __] = djwt.decode(hasToken!) as JwtDecode;

      if (payload.exp > new Date().getTime()) {
        return await ctx.render({ isLogin: true });
      }

      localStorage.removeItem('token')
    }

    return await ctx.render({ isLogin: false })
  }
}

export default function Career({ data }: PageProps<CareerProps>) {
  return (
    <>
      <NavigationBar active='/career' isLogin={data.isLogin} />
      <div class={tw`p-4 mx-auto max-w-screen-lg`}>
        <div>Hello, Career page</div>
      </div>
    </>
  );
}
