/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from 'preact';
import { tw } from '@twind';
import { animation, css } from 'twind/css';
import { useRef, useState, useEffect } from 'preact/hooks';
import CareerCard from '../components/CareerCard.tsx';
import { addToCareer, useCareer } from '../utils/data.ts';

declare global {
  interface HTMLDialogElement {
    showModal(): void;
    close(): void;
  }
}

const slideBottom = animation("0.4s ease normal", {
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
// deno-lint-ignore no-explicit-any
}) as any;

const backdrop = css({
  "&::backdrop": {
    background: "rgba(0, 0, 0, 0.5)",
  },
// deno-lint-ignore no-explicit-any
}) as any;

interface Career {
  company: string;
  job: string;
  date: {
    in: string;
    out: string;
  }
}

export default function Careers() {
  const { data, error } = useCareer();
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    ref.current!.close()
  }, []);

  const onDialogClick = (e: MouseEvent) => {
    e.preventDefault();
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      ref.current?.close();
    }
  }

  if (error) {
    <div>
      Error: {error.message}
    </div>
  }

  return (
    <>
      <div class={tw`flex justify-between`}>
        <div>Career</div>
        <div>
          <button onClick={() => ref.current?.showModal()}>Add</button>
        </div>
      </div>
      <div class={tw`rounded bg-gray-300 career_card_list flex flex-col m-2 mt-0 p-2 pl-[16px] pr-[16px] md:grid grid-cols-12`}>
        {
          data?.map((career) => {
            return <CareerCard company={career.company} job={career.job} date={career.date} />
          })
        }
      </div>
      <dialog
        ref={ref}
        class={tw
          `bg-transparent p-0 m-0 pt-[30%] max-w-full w-full max-h-full ${slideBottom} ${backdrop}`}
        onClick={onDialogClick}
      >
        <CareerDialog />
      </dialog>
    </>
  )
}

function CareerDialog() {
  const [company, setCompany] = useState('');
  const [job, setJob] = useState('');
  const [inDate, setInDate] = useState('');
  const [outDate, setOutDate] = useState('');

  const handleCompany = (e: Event) => {
    setCompany((e.currentTarget as HTMLInputElement).value)
  }

  const handleJob = (e: Event) => {
    setJob((e.currentTarget as HTMLInputElement).value)
  }

  const handleInDate = (e: Event) => {
    setInDate((e.currentTarget as HTMLInputElement).value)
  }

  const handleOutDate = (e: Event) => {
    setOutDate((e.currentTarget as HTMLInputElement).value)
  }

  const handleAddCareer = (e: h.JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addToCareer({
      company,
      job,
      date: {
        in: inDate,
        out: outDate,
      }
    })
  }

  const handleFormInit = () => {
    setCompany('');
    setJob('');
    setInDate('')
    setOutDate('')
  }

  return (
    <div class={tw`bg-gray-50 max-w-3xl w-full h-full mx-auto divide-y divide-rose-900 rounded-t-lg p-2`}>
      <div class={tw`flex justify-between`}>
        <h2 class={tw`text-lg font-medium text-gray-900`}>Regist Career</h2>
        <button
          class={tw`py-1`}
          onClick={(e) => {
            (e.target as HTMLButtonElement).closest("dialog")!.close();
          }}
        >
          <svg
            class={tw`w-6 h-6 fill-current text-gray-600`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <div class={tw`p-2`}>
        <div class={tw`mt-1`}>
          <label class={tw`inline-block w-[100px]`} id='company'>company</label>
          <input class={tw`ml-2 border`} for='company' value={company} onInput={handleCompany} />
        </div>
        <div class={tw`mt-1`}>
          <label class={tw`inline-block w-[100px]`} id='job'>job</label>
          <input class={tw`ml-2 border`} for='job' value={job} onInput={handleJob} />
        </div>
        <div class={tw`mt-1`}>
          <label class={tw`inline-block w-[100px]`} id='date'>date</label>
          <input class={tw`ml-2 border`} for='date' value={inDate} onInput={handleInDate} />
          <span> ~ </span>
          <input class={tw`border`} for='date' value={outDate} onInput={handleOutDate} />
        </div>
        <div class={tw`flex justify-end mt-2`}><button onClick={(e) => {
          handleAddCareer(e);
          handleFormInit();
          (e.target as HTMLButtonElement).closest("dialog")!.close();
        }} class={tw`rounded p-1 pl-2 pr-2 bg-blue-400`}>추가</button></div>
      </div>
    </div>
  )
}