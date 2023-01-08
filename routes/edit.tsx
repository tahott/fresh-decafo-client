import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import * as djwt from "https://deno.land/x/djwt@v2.7/mod.ts";
import NavigationBar from "../islands/Navbar.tsx";
import UserBaseInfo from "../islands/userBaseInfo.tsx";
import { JwtDecode, User } from "../utils/types.ts";

interface EditProps {
  user: User;
  authUrl: string;
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

export default function Edit({ data }: PageProps<EditProps>) {
  return (
    <>
      <NavigationBar active="#" user={data.user} authUrl={data.authUrl} />
      <div class="p-4 mx-auto max-w-screen-lg">
        <UserBaseInfo user={data.user} channel={[{ name: 'github', url: 'https://github.com/tahott' }]} />
      </div>
    </>
  )
}