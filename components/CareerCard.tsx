interface CareerProps {
  company: string;
  job: string;
  inAt: string;
  outAt: string;
}

export default function CareerCard(props: CareerProps) {
  return (
    <div class="career_card_container flex md:contents">
      <div class="col-start-1 col-end-2 mr-10 md:mx-auto relative">
        <div class="h-full w-4 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div class="w-4 h-4 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
          <i class="fas fa-check-circle text-white"></i>
        </div>
      </div>
      <div class="career_card col-start-2 col-end-12 pt-4">
        <div class="font-bold">{props.company}</div>
        <div>{props.job}</div>
        <div>{props.inAt}{" ~ "}{props.outAt}</div>
      </div>
    </div>
  )
}