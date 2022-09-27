import * as djwt from 'https://deno.land/x/djwt@v2.7/mod.ts';
import { Career, JwtDecode } from "../../utils/types.ts";

export async function handler(req: Request): Promise<Response> {
  const token = localStorage.getItem('token');
  const [_, payload, __] = djwt.decode(token!) as JwtDecode;

  switch (req.method) {
    case 'GET': {
      const response = await fetch(`${Deno.env.get('BASE_URL')}/career/${payload.user?.id}`);
      const careers = await response.json();

      return new Response(JSON.stringify(careers.data.map((career: Career) => {
        return {
          company: career.company,
          job: career.job,
          inAt: career.inAt,
          outAt: career.outAt || 'until now'
        }
      })), {
        status: 200,
      })
    }
    case 'POST': {
      const text = await req.text()
      const body = JSON.stringify(Object.assign(JSON.parse(text), { userId: payload.user?.id }));

      const res = await fetch(`${Deno.env.get('BASE_URL')}/career`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      return new Response(null, {
        status: 201,
      })
    }
    case 'DELETE':
      return new Response(null, { status: 405, statusText: 'Method Not Allowed' })
    default:
      return new Response(null, {
        status: 200
      })
  }
}