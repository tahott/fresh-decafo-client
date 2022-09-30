import useSWR, { mutate } from 'swr';
import { Career } from "./types.ts";

async function careerFetcher(): Promise<Career[]> {
  const res = await fetch('/api/career', {
    method: 'GET'
  });

  return await res.json();
}

export async function addToCareer(career: Career) {
  const res = await fetch('/api/career', {
    method: 'POST',
    body: JSON.stringify(career),
  });

  if (res.status !== 201) {
    return false;
  }

  await mutate('career', careerFetcher);
  return true
}

export function useCareer() {
  return useSWR<Career[], Error>('career', careerFetcher, {});
}