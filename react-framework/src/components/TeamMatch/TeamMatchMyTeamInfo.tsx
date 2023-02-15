import myTeam from "@/stores/user/myTeam";
import { Link } from 'react-router-dom'


interface Iprops {
    myTeamData: any,
    index: number,
}
export default function TeamMatchMyTeamInfo({myTeamData, index}: Iprops) {
    return (
        <div className="relative flex w-full h-full m-0 p-0 bg-[#ffffff] rounded-5">
            {index === 0 && <div className="absolute flex w-100 h-80 left-[-40%]">
                <div className="flex flex-col justify-center items-center w-full h-full ml-0 p-0 bg-[#ffffff] rounded-5">
                    <span className="font-inter text-[30px] text-center text-[#000]">+</span>
                    <span className="font-inter text-[15px] text-center text-[#000]">팀생성</span>
                </div>
            </div>}
            <div className="flex flex-col items-center justify-center w-1/3 h-full">
                <span>{myTeamData.team.sports}</span>
            </div>
            <div className="flex flex-col justify-center w-1/3 h-full">
                <span className="flex-grow-0 font-inter text-[17px] font-normal text-left text-[#000]">{myTeamData.team.name}</span>
                <span className="flex-grow-0 font-inter text-[17px] font-bold text-left text-[#000]">{myTeamData.teamStats.win+"W "+ myTeamData.teamStats.lose+"L"}</span>
            </div>
            <div className="flex flex-col items-center justify-between w-1/3 h-full my-5">
                <span className="w-55 border-b-1 border-solid border-[#000] font-inter text-[12px] text-center">{myTeamData.teamStats.tier}</span>
                <Link to='team-match/register' className="grid place-content-center h-23 my-15 w-60 text-center bg-[#303eff] rounded-[5px] font-inter text-[12px] text-[#fff] " onClick={(e) => { e.preventDefault(); }}>경기 등록</Link>
            </div>
        </div>
    )
}