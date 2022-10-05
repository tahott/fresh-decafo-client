import { HandlerContext, Handlers, PageProps } from '$fresh/server.ts';
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
      <div class="p-4 mx-auto max-w-screen-lg">
        <div>
          {
            data.user && (
              <div>
                <div class="grid grid-cols-4 grid-flow-col gap-4">
                  <div class="row-span-3">
                    <div class="flex justify-center"><img class="rounded-full max-w-[128px] w-[128px]" src={data.user.avatar_url} /></div>
                  </div>
                  <div class="col-span-3">{data.user.name}</div>
                  <div class="row-span-2 col-span-3"></div>
                </div>
                <Careers />
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}