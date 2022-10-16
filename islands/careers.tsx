import { animation, css } from 'twind/css';
import { useRef, useState, useEffect } from 'preact/hooks';
import CareerCard from '../components/CareerCard.tsx';
import { addToCareer, useCareer } from '../utils/data.ts';
import { KeyboardEvent } from 'https://esm.sh/v95/@types/react@18.0.18/X-ZS9wcmVhY3QvY29tcGF0/index.d.ts';
import { JSXInternal } from 'https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts';
import Input from '../components/Input.tsx';

declare global {
  interface HTMLDialogElement {
    showModal(): void;
    close(): void;
  }
}

const slideBottom = animation("0.4s ease normal", {
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});

const backdrop = css({
  "&::backdrop": {
    background: "rgba(0, 0, 0, 0.5)",
  },
});

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
    return (
      <div>
        Error: {error.message}
      </div>
    )
  }

  return (
    <>
      <div class="flex justify-between">
        <div>Career</div>
        <div>
          <button onClick={() => ref.current?.showModal()}>Add</button>
        </div>
      </div>
      <div class="rounded bg-gray-300 career_card_list flex flex-col m-2 mt-0 p-2 pl-[16px] pr-[16px] md:grid grid-cols-12">
        {
          data && data.length > 0 ? (
            data?.map((career) => {
              return <CareerCard company={career.company} job={career.job} inAt={career.inAt} outAt={career.outAt} />
            })
          ) : (
              <div class="col-span-12">등록 된 경력이 없습니다</div>
          )
        }
      </div>
      <dialog
        ref={ref}
        class={`bg-transparent p-0 m-0 pt-[30%] max-w-full w-full max-h-full ${slideBottom} ${backdrop}`}
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
  const [inAt, setInAt] = useState('');
  const [outAt, setOutAt] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [companyList, setCompanyList] = useState([]);

  const handleCompany = (e: Event) => {
    setCompany((e.currentTarget as HTMLInputElement).value)
  }

  const handleJob = (e: Event) => {
    setJob((e.currentTarget as HTMLInputElement).value)
  }

  const handleInDate = (e: Event) => {
    setInAt((e.currentTarget as HTMLInputElement).value);
  }

  const handleOutDate = (e: Event) => {
    setOutAt((e.currentTarget as HTMLInputElement).value)
  }

  const isNumeric = (e: Event) => {
    if (!/[0-9]/g.test((e as unknown as KeyboardEvent<HTMLInputElement>).key)) {
      e.preventDefault();
    }
  }

  const handleAddCareer = async (e: JSXInternal.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await addToCareer({
      company,
      job,
      inAt,
      outAt,
    })

    if (!res) {
      alert('등록 실패')
    }
  }

  const handleFormReset = () => {
    setCompany('');
    setJob('');
    setInAt('');
    setOutAt('');
  }

  return (
    <div class="bg-gray-50 max-w-3xl w-full h-full mx-auto divide-y divide-rose-900 rounded-t-lg p-2">
      <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">경력 추가</h2>
        <button
          class="py-1"
          onClick={(e) => {
            (e.target as HTMLButtonElement).closest("dialog")!.close();
          }}
        >
          <svg
            class="w-6 h-6 fill-current text-gray-600"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <div class="p-2">
        <div class="mt-1 grid grid-cols-8">
          <div>회사</div>
          <div class="col-span-7">
            <div class="relative w-full border ml-2">
              <input class="w-full outline-none p-1" type='search' value={company} onChange={handleCompany} onFocus={() => setFocus(true)} />
              <div id="searchList" class={`${isFocus ? 'absolute w-full' : 'hidden'}`}>
                {
                  companyList.length === 0 ? (
                    <div class="p-1 w-full bg-gray-900 text-white">No results found.</div>
                  ) : companyList.map((c) => <div onClick={() => {setCompany(c); setFocus(false);}} class="p-1 w-full bg-gray-900 text-white cursor-pointer">{c}</div>)
                }
              </div>
            </div>
          </div>
        </div>
        <div class="mt-1 grid grid-cols-8">
          <div>직책</div>
          <div class="col-span-7"><Input type='text' onChange={handleJob} /></div>
        </div>
        <div class="mt-1 grid grid-cols-8">
          <div>입사일</div>
          <div class="col-span-7">
            <Input type='text' placeholder='yyyyMM' maxLength={6} onChange={handleInDate} />
          </div>
        </div>
        <div class="mt-1 grid grid-cols-8">
          <div>퇴사일</div>
          <div class="col-span-7">
            <Input type='text' placeholder='yyyyMM' maxLength={6} onChange={handleOutDate} />
          </div>
        </div>
        <div class="flex justify-end mt-2"><button onClick={(e) => {
          handleAddCareer(e);
          handleFormReset();
          (e.target as HTMLButtonElement).closest("dialog")!.close();
        }} class="rounded p-1 pl-2 pr-2 bg-blue-400">추가</button></div>
      </div>
    </div>
  )
}