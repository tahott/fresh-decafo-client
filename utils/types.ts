export type JwtDecode = [unknown, JwtPayload, Uint8Array];

export interface JwtPayload {
  exp: number;
  aud: string;
  iss?: string;
  user?: User;
}

export interface User {
  id: number;
  name: string | undefined;
  avatar_url: string | undefined;
}

export interface Career {
  companyName: string;
  job: string;
  inAt: string;
  outAt: string;
}