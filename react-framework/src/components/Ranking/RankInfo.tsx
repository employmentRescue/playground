import { teamRanking } from "@/models/teamRanking"

interface Iprops {
  rank: number,
  teamRanking: any,
  isClicked: boolean,
  sortType: string,
}

export default function RankInfo({ rank, teamRanking, isClicked, sortType }: Iprops) {
  console.log(teamRanking);
  return (
    isClicked ?
      <div className="w-full h-66 bg-blue-300 border-1 border-blue-700 flex justify-center items-center mb-2">
        <div className="w-[calc(100%-245px)] pl-10 flex" >
          <div className="w-20 text-center text-17 text-[#16b4f7] font-bold mt-5">{rank}</div>
          <div className="ml-10">
            <div className="text-gray-400 text-12">{teamRanking.teamName}</div>
            <div className="border-b-1 text-10">{teamRanking.tier}</div>
          </div>
        </div >
        {sortType === '경기' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-[#8d90b8]">{teamRanking.matchTimes}</div> : <div className="w-47 h-full flex items-center justify-center text-12">{teamRanking.matchTimes}</div>}
        {sortType === '승' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-[#8d90b8]">{teamRanking.win}</div> : <div className="w-47 h-full flex items-center justify-center text-12">{teamRanking.win}</div>}
        {sortType === '무' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-[#8d90b8]">{teamRanking.draw}</div> : <div className="w-47 h-full flex items-center justify-center text-12">{teamRanking.draw}</div>}
        {sortType === '패' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-[#8d90b8]">{teamRanking.lose}</div> : <div className="w-47 h-full flex items-center justify-center text-12">{teamRanking.lose}</div>}
        {sortType === 'Rating' ? <div className="w-57 h-full flex items-center justify-center text-12 bg-[#8d90b8]">{teamRanking.point}</div> : <div className="w-57 h-full flex items-center justify-center text-12">{teamRanking.point}</div>}
      </div> :
      <div className="w-full h-66 bg-white flex justify-center items-center mb-2">
        <div className="w-[calc(100%-245px)] pl-10 flex" >
          <div className="w-20 text-center text-17 text-[#16b4f7] font-bold mt-5">{rank}</div>
          <div className="ml-10">
            <div className="text-gray-400 text-12">{teamRanking.teamName}</div>
            <div className="border-b-1 text-10">{teamRanking.tier}</div>
          </div>
        </div>
        {sortType === '경기' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-gray-600">{teamRanking.matchTimes}</div> : <div className="w-47 h-full flex items-center justify-center text-12">{teamRanking.matchTimes}</div>}
        {sortType === '승' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-gray-600">{teamRanking.win}</div> : <div className="w-47 h-full flex items-center justify-center text-12">{teamRanking.win}</div>}
        {sortType === '무' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-gray-600">{teamRanking.draw}</div> : <div className="w-47 h-full flex items-center justify-center text-12">{teamRanking.draw}</div>}
        {sortType === '패' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-gray-600">{teamRanking.lose}</div> : <div className="w-47 h-full flex items-center justify-center text-12">{teamRanking.lose}</div>}
        {sortType === 'Rating' ? <div className="w-57 h-full flex items-center justify-center text-12 bg-gray-600">{teamRanking.point}</div> : <div className="w-57 h-full flex items-center justify-center text-12">{teamRanking.point}</div>}
      </div>
  )
}