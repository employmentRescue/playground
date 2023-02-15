import goButtonImage from "@/assets/profiles/go-button.png"
import { useNavigate } from "react-router-dom";

interface Iprops {
    imgSrc: string;
    sportsType: "축구" | "농구" | "배드민턴"
    matchTitle: string;
    place: string;
    matchPersonnel?: string;     // 3 on 3, 5 on 5 같은 매칭 인원
    matchType: "개인" | "팀";
    isOldMatch: boolean;        // 약속 시간을 넘어간 매칭은 전부 흐릿하게 표시됨
    buttonColor: string;
    matchId: number;
}

export default function MatchCard({ imgSrc, matchTitle, place, matchPersonnel, matchType, isOldMatch, buttonColor, matchId }: Iprops) {
    let bgOpacity = ""
    isOldMatch ? bgOpacity = "opacity-70" : ""
    //const navigate = useNavigate();

    return (
        <div className={"flex w-full h-80 bg-white mb-3 justify-between " + bgOpacity}>
            <div className="flex">
                <div className="flex flex-col justify-center">
                    <img src={imgSrc} className="w-40 h-40 ml-23 mr-20" />
                </div>
                <div className="flex flex-col w-auto  tracking-tight">
                    <p className="text-15 mt-13 font-bold">{matchTitle}</p>
                    <p className="text-10 mt-4 text-[#969696]">{place}</p>
                    {matchPersonnel && <p className="text-10 mt-0 text-[#969696]">{matchPersonnel}</p>}
                </div>
            </div>
            <button className={"flex w-60 px-22 " + buttonColor} onClick={() => location.replace(`/match/detail/${matchId}`)} disabled={isOldMatch}>
                <img src={goButtonImage} className={"w-15 h-15 self-center"} />
            </button>
        </div >
    )
}