import useSWR, { mutate } from 'swr';

interface Career {
  company: string;
  job: string;
  date: {
    in: string;
    out: string;
  }
}

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

  await mutate('career', await res.json());
}

export function useCareer() {
  return useSWR<Career[], Error>('career', careerFetcher, {});
}