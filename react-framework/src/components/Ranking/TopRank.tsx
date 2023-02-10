import { teamRanking } from "@/models/teamRanking"
import { getImgUrl } from "@/utils/getImgUrl"

interface Iprops {
  rank: number
  teamRanking: teamRanking
}

export default function TopRank(props: Iprops) {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-white border-t-4 border-blue-700 rounded-5">
      <div className="w-full h-30"><div className="text-17 text-[#16b4f7] font-bold mt-6 ml-6">{props.rank}</div></div>
      <img className="w-70 h-70" src={getImgUrl('profiles/team', props.teamRanking.teamName)}></img>
      <div className="w-full h-67 flex flex-col justify-center items-center">
        <div className="text-12">{props.teamRanking.teamName}</div>
        <div className="text-12 font-bold text-blue-700">{props.teamRanking.tier}</div>
      </div>
    </div>
  )
}