/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from 'preact';
import { tw } from '@twind';
import { useState } from 'preact/hooks';
import CareerCard from '../components/CareerCard.tsx';

interface Career {
  company: string;
  job: string;
  date: {
    in: string;
    out: string;
  }
}

interface CareersProps {
  careers: Career[];
}

export default function Careers(props: CareersProps) {
  const [careers, SetCareer] = useState(props.careers)

  return (
    <>
      <div>Career</div>
      <div class={tw`rounded bg-gray-300 career_card_list flex flex-col m-2 mt-0 p-2 pl-[16px] pr-[16px] md:grid grid-cols-12`}>
        {
          careers.map((career) => {
            return <CareerCard company={career.company} job={career.job} date={career.date} />
          })
        }
      </div>
    </>
  )
}