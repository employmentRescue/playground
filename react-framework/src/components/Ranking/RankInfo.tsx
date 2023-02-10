import { teamRanking } from "@/models/teamRanking"

interface Iprops {
  rank: number
  teamRanking: teamRanking
}

export default function RankInfo({ rank, teamRanking }: Iprops) {
  return (
    <div className="w-full h-66 bg-white flex justify-center items-center mb-2">
      <div className="w-[calc(100%-245px)] pl-10 flex">
        <div className="w-20 text-center text-17 text-[#16b4f7] font-bold mt-5">{rank}</div>
        <div className="ml-10">
          <div className="text-gray-400 text-12">{teamRanking.teamName}</div>
          <div className="border-b-1 text-10">{teamRanking.tier}</div>
        </div>
      </div>
      <div className="w-47 text-center text-12">{teamRanking.matchTimes}</div>
      <div className="w-47 text-center text-12">{teamRanking.win}</div>
      <div className="w-47 text-center text-12">{teamRanking.draw}</div>
      <div className="w-47 text-center text-12">{teamRanking.lose}</div>
      <div className="w-57 text-center text-12">{teamRanking.point}</div>
    </div>
  )
}