const CAREERS = [
  {
    company: 'Never',
    job: 'Backend Enginner',
    date: {
      in: '2021.02',
      out: 'until now',
    },
  },
  {
    company: 'Next',
    job: 'Backend Enginner',
    date: {
      in: '2016.05',
      out: '2021.01',
    },
  },
]

export async function handler(req: Request): Promise<Response> {
  switch (req.method) {
    case 'POST': {
      const text = await req.text()
      CAREERS.unshift(JSON.parse(text));

      return new Response(JSON.stringify(CAREERS), {
        status: 200,
      })
    }
    case 'DELETE':
      return new Response(null, { status: 405, statusText: 'Method Not Allowed' })
    default:
      return new Response(JSON.stringify(CAREERS), {
        status: 200
      })
  }
}