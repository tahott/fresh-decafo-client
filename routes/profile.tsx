import { HandlerContext, Handlers, PageProps } from '$fresh/server.ts';
import * as djwt from 'https://deno.land/x/djwt@v2.7/mod.ts';
import NavigationBar from '../components/Navbar.tsx';
import Careers from '../islands/careers.tsx';
import { Channel, JwtDecode, User } from "../utils/types.ts";

interface ProfileProps {
  authUrl?: string;
  user?: User;
  channel?: Channel[];
}

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext): Promise<Response> {
    const hasToken = localStorage.getItem('token');

    if (hasToken) {
      const [_, payload, __] = djwt.decode(hasToken!) as JwtDecode;

      if (payload.exp > new Date().getTime()) {
        return await ctx.render({ user: payload.user });
      }

      localStorage.removeItem('token')
    }

    return await ctx.render({ authUrl: ctx.state.authUrl })
  }
}

export default function Profile({ data }: PageProps<ProfileProps>) {
  return (
    <>
      <NavigationBar active='/profile' user={data.user} authUrl={data.authUrl!} />
      <div class="p-4 mx-auto max-w-screen-lg">
        <div>
          {
            data.user && (
              <div>
                <div class="current-profile p-2">
                  <div class="grid grid-cols-4 grid-flow-col gap-4">
                    <div class="row-span-3">
                      <div class="flex justify-center"><img class="rounded-full max-w-[128px] w-[128px]" src={data.user.avatar_url} /></div>
                    </div>
                    <div class="col-span-3">
                      <div>{data.user.name}</div>
                    </div>
                    <div class="col-span-3">
                      <div>	<i class="fa-solid fa-flag"></i></div>
                    </div>
                  </div>
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