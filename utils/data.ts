import useSWR, { mutate } from 'swr';
import { Career } from "./types.ts";

async function careerFetcher(): Promise<Career[]> {
  const res = await fetch('/api/career', {
    method: 'GET'
  });

  return await res.json();
}

export async function addToCareer(career: Career) {
  await fetch('/api/career', {
    method: 'POST',
    body: JSON.stringify(career),
  });

  await mutate('career', careerFetcher);
}

export function useCareer() {
  return useSWR<Career[], Error>('career', careerFetcher, {});
}