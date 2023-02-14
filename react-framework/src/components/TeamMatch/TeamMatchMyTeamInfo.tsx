

interface Iprops {
    myTeamData: any,
}
export default function TeamMatchMyTeamInfo({myTeamData}: Iprops) {
    return (
        <div className="flex w-[259px] h-100 m-0 p-0">
            <div className="flex flex-col items-center w-1/3 h-full">
                <span>농구</span>
            </div>
            <div className="flex flex-col w-1/3 h-full"></div>
            <div className="flex flex-col w-1/3 h-full"></div>
        </div>
    )
}