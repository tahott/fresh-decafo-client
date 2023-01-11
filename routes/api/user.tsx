export async function handler(req: Request): Promise<Response> {
  switch (req.method) {
    case 'PATCH': {
      const text = await req.text();
      const body = JSON.stringify(JSON.parse(text));

      return await fetch(`${Deno.env.get('BASE_URL')}/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
    }
    default:
      return new Response(null, {
        status: 405
      })
  }
}