import { Handlers, HandlerContext, PageProps } from '$fresh/server.ts';
import * as djwt from 'https://deno.land/x/djwt@v2.7/mod.ts';
import NavigationBar from '../components/Navbar.tsx';
import { JwtDecode } from "../utils/types.ts";

interface IndexProps {
  isLogin: boolean;
  authUrl: string;
}

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext): Promise<Response> {
    const hasToken = localStorage.getItem('token');

    if (hasToken) {
      const [_, payload, __] = djwt.decode(hasToken!) as JwtDecode;

      if (payload.exp > new Date().getTime()) {
        return await ctx.render({ isLogin: true, authUrl: '' });
      }

      localStorage.removeItem('token')
    }

    return await ctx.render({ isLogin: false, authUrl: ctx.state.authUrl })
  }
}

export default function Home({ data }: PageProps<IndexProps>) {
  return (
    <>
      <NavigationBar active='/' isLogin={data.isLogin} authUrl={data.authUrl} />
      <div class="p-4 mx-auto max-w-screen-lg">
        <img
          src='/logo.svg'
          height='100px'
          alt='the fresh logo: a sliced lemon dripping with juice'
        />
        <p class="my-6">
          Welcome to `DECAFO`. This page is landing page. <span style='font-size:1.5rem;'>&#128748;</span>
        </p>
      </div>
    </>
  );
}
