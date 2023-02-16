import { team } from "@/models/team"
import { teamRanking } from "@/models/teamRanking"
import { getImgUrl } from "@/utils/getImgUrl"

interface Iprops {
  rank: number
  teamRanking: any
  isMyTeam: boolean
}

export default function MyTeamInfo(props: Iprops) {
  let winRate = props.isMyTeam ? ((props.teamRanking.teamStats.win / (props.teamRanking.teamStats.win + props.teamRanking.teamStats.lose)) * 100) :
    ((props.teamRanking.win / (props.teamRanking.win + props.teamRanking.lose)) * 100)

  if (Number.isNaN(winRate)) {
    winRate = 0;
    console.log(winRate)
  } else {
    winRate.toFixed(1);
  }
  return (
    <div className="w-[calc(100%-8px)] h-167 mt-49 ml-4 mr-4 border-t-4 border-blue-700 rounded-5 flex items-center bg-white">
      <div className="w-123 flex flex-col justify-center items-center ml-10">
        <div className="w-full h-30 "><div className="text-17 text-[#16b4f7] font-bold mt-6">{props.rank}</div></div>
        <img className="w-70 h-70" src={getImgUrl('profiles/team', props.isMyTeam ? props.teamRanking.team.teamId : props.teamRanking.teamId)} onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = getImgUrl('profiles/team', 'default_team')
        }}></img>
        <div className="w-full h-67 flex flex-col justify-center items-center">
          <div className="text-15">{props.isMyTeam ? props.teamRanking.team.name : props.teamRanking.teamName}</div>
          <div className="text-15">{props.isMyTeam ? props.teamRanking.teamStats.tier : props.teamRanking.tier}</div>
        </div>
      </div>
      <div className="w-1 h-126 border-r-1 border-gray-600"></div>
      <div className="w-170 h-126 flex flex-col ml-20 justify-between mr-10">
        <div className="flex justify-between">
          <div className="w-90 text-17 font-bold text-[#a3adb5]">Total Wins</div><div className="w-63 text-right text-17 font-bold text-blue-700">{props.isMyTeam ? props.teamRanking.teamStats.win : props.teamRanking.win}승</div>
        </div>
        <div className="flex justify-between">
          <div className="w-90 text-17 font-bold text-[#a3adb5]">Win Rate</div><div className="w-63 text-right text-17 font-bold text-blue-700"> {winRate} %</div>
        </div>
        <div className="flex justify-between">
          <div className="w-90 text-17 font-bold text-[#a3adb5]">Rating</div><div className="w-63 text-right text-17 font-bold text-blue-700">{props.isMyTeam ? props.teamRanking.team.point : props.teamRanking.point}</div>
        </div>

        <div className="flex justify-between">
          <div className="w-90 text-17 font-bold text-[#a3adb5]">Tier</div><div className="w-63 text-right text-17 font-bold text-blue-700">{props.isMyTeam ? props.teamRanking.teamStats.tier : props.teamRanking.tier}</div>
        </div>
      </div>
    </div>
  )
}