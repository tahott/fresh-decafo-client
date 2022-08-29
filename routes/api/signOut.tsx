export function handler(req: Request): Response {
  localStorage.removeItem('token');

  const headers = new Headers({
    'location': new URL(req.url).origin,
  });

  return new Response(null, {
    status: 302,
    headers,
  });
}