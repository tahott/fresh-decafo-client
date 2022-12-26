import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const handler = [
  async function isLogin(req: Request, ctx: MiddlewareHandlerContext) {
    const paths = req.url.split('/');

    if (paths.includes('_frsh') || paths.includes('favicon.ico') || paths.some((path) => /logo.svg/g.test(path))) {
      return await ctx.next();
    }
    const hasToken = localStorage.getItem('token');

    if (hasToken) {
      return await ctx.next();
    }

    const res = await fetch(`${Deno.env.get('BASE_URL')}/authorization/code`);
    const authUrl = await res.json();
    ctx.state.authUrl = authUrl;
    return await ctx.next();
  },
]