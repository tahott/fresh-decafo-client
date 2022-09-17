/** @jsx h */

import { h } from 'preact';
import { tw } from '@twind';

interface CareerProps {
  company: string;
  job: string;
  date: {
    in: string;
    out: string;
  }
}

export default function CareerCard(props: CareerProps) {
  return (
    <div class={tw`career_card_container flex md:contents`}>
      <div class={tw`col-start-1 col-end-2 mr-10 md:mx-auto relative`}>
        <div class={tw`h-full w-4 flex items-center justify-center`}>
          <div class={tw`h-full w-1 bg-gray-200 pointer-events-none`}></div>
        </div>
        <div class={tw`w-4 h-4 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center`}>
          <i class="fas fa-check-circle text-white"></i>
        </div>
      </div>
      <div class={tw`career_card col-start-2 col-end-12 pt-4`}>
        <div class={tw`font-bold`}>{props.company}</div>
        <div>{props.job}</div>
        <div>{props.date.in}{" ~ "}{props.date.out}</div>
      </div>
    </div>
  )
}