/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from 'preact';
import { HandlerContext, Handlers, PageProps } from '$fresh/server.ts';
import { tw } from '@twind';
import * as djwt from 'https://deno.land/x/djwt@v2.7/mod.ts';
import NavigationBar from '../components/Navbar.tsx';
import Careers from '../islands/careers.tsx';
import { JwtDecode, User } from "../utils/types.ts";

interface ProfileProps {
  isLogin: boolean;
  authUrl?: string;
  user?: User;
}

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext): Promise<Response> {
    const hasToken = localStorage.getItem('token');

    if (hasToken) {
      const [_, payload, __] = djwt.decode(hasToken!) as JwtDecode;

      if (payload.exp > new Date().getTime()) {
        return await ctx.render({
          isLogin: true,
          user: payload.user,
        });
      }

      localStorage.removeItem('token')
    }

    return await ctx.render({ isLogin: false })
  }
}

export default function Profile({ data }: PageProps<ProfileProps>) {
  return (
    <>
      <NavigationBar active='/profile' isLogin={data.isLogin} />
      <div class={tw`p-4 mx-auto max-w-screen-lg`}>
        <div>
          {
            data.user && (
              <div>
                <div>{data.user.name}</div>
                <Careers />
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}