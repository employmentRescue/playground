import { getImgUrl } from "@/utils/getImgUrl"


interface Iprops {
  sports: string,
  date: string,
  place: string,
  time: string,
  host: string,
  people: number
}

export default function MatchSlide(props: Iprops) {
  return (
    <div className="w-full h-55 bg-white flex justify-between items-center rounded-15">
      {props.sports == '농구' && <img className="w-40 h-40 ml-7 mr-20" src={getImgUrl('../assets/icons', 'basketball-bg-colored')}></img>}
      {props.sports == '축구' && <img className="w-40 h-40 ml-7 mr-20" src={getImgUrl('../assets/icons', 'football-bg-colored')}></img>}
      {props.sports == '배드민턴' && <img className="w-40 h-40 ml-7 mr-20" src={getImgUrl('../assets/icons', 'badminton-bg-colored')}></img>}
      <div className="w-full flex flex-col">
        <div className="w-[calc(100%-30px)] h-20 flex justify-between">

          <div className="text-13 mb-4">{props.date}</div>
          <div className="text-13 mb-4">{props.time}</div>

        </div>
        <div className="w-[calc(100%-30px)] h-20 flex justify-between">
          <div className="text-13 font-bold">{props.place}</div>
          <div className="text-13 font-bold">{props.host} 외 {props.people}명</div>
        </div>
      </div>
    </div>
  )
}