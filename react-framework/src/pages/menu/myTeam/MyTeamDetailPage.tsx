import sportsIcon from "@/assets/icons/sports.png"
import levelIcon from "@/assets/icons/level.png"
import teamIcon from "@/assets/icons/team.png"
import recordIcon from "@/assets/icons/record.png"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTabName } from "@/stores/tab/tabName";
import useTeamQuery from "@/hooks/team/useTeamQuery";
import { getImgUrl } from "@/utils/getImgUrl";
import { useParams } from "react-router-dom";


export default function MyTeamDetailPage() {

  const { teamId } = useParams();
  const { data } = useTeamQuery(Number(teamId));
  console.log(data)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabName('나의 팀 상세'))
  }, [])

  return data && (
    <div className="w-full">
      <div className="w-full h-173 flex flex-col justify-center items-center bg-[#fcfffb]">
        <img className="w-100 h-100" src={getImgUrl('profiles/team', data.team.teamId)}></img>
        <div className="text-20 mt-4">{data.team.name}</div>
      </div>

      <div className="w-full h-[calc(100vh-290px)] bg-white mt-7 pt-30 pl-28 pr-28 flex flex-col justify-between overflow-auto pb-15">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={sportsIcon}></img>
              <div className="text-15 font-bold">종목</div>
            </div>
            <div className="text-15">{data.team.sports}</div>
          </div>
          <div className="flex justify-between items-center mt-18">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={recordIcon}></img>
              <div className="text-15 font-bold" >전적</div>
            </div>
            <div className="text-15">{data.teamStats.win}승 {data.teamStats.lose}패</div>
          </div>
          <div className="flex justify-between items-center mt-18">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={levelIcon}></img>
              <div className="text-15 font-bold">팀 등급</div>
            </div>
            <div className="text-15">{data.teamStats.tier}</div>
          </div>
          <div className="flex justify-between items-center mt-18">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={sportsIcon}></img>
              <div className="text-15 font-bold">게임 종류</div>
            </div>
            <div className="text-15">{data.team.gameType}</div>
          </div>
          <div className="flex flex-col mt-18">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={teamIcon}></img>
              <div className="text-15 font-bold">팀원</div>
            </div>
            <div className="flex mt-18 w-full flex-wrap">
              {data.team.teamMemberList.map((item: any, index: number) => (
                <div className="flex flex-col justify-center items-center mr-13" key={index}>
                  <img className="w-47 h-47 rounded-50" src={getImgUrl('profiles/user', item.memberId)}></img>
                  <div className="text-9">{item.member.nickname}</div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}