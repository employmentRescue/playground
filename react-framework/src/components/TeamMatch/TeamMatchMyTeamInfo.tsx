import myTeam from "@/stores/user/myTeam";


interface Iprops {
    myTeamData: any,
}
export default function TeamMatchMyTeamInfo({myTeamData}: Iprops) {
    return (
        <div className="flex w-full h-full m-0 p-0 bg-[#ffffff] rounded-5">
            <div className="flex flex-col items-center justify-center w-1/3 h-full">
                <span>{myTeamData.team.sports}</span>
            </div>
            <div className="flex flex-col justify-center w-1/3 h-full">
                <span className="flex-grow-0 font-inter text-[17px] font-normal text-left text-[#000]">{myTeamData.team.name}</span>
                <span className="flex-grow-0 font-inter text-[17px] font-bold text-left text-[#000]">{myTeamData.teamStats.win+"W "+ myTeamData.teamStats.lose+"L"}</span>
            </div>
            <div className="flex flex-col items-center justify-between w-1/3 h-full my-5">
                <span className="w-55 border-b-1 border-solid border-[#000] font-inter text-[12px] text-center">{myTeamData.teamStats.tier}</span>
                <div className="grid place-content-center h-23 my-15 w-60 text-center bg-[#303eff] rounded-[5px] font-inter text-[12px] text-[#fff] " onClick={(e) => { e.preventDefault(); }}>경기 등록</div>
            </div>
        </div>
    )
}