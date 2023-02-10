import MatchCard from "@/components/Match/MatchCard"
import footballImg from "@/assets/icons/football-bg-colored.png"
import basketballImg from "@/assets/icons/basketball-bg-colored.png"
import badmintonImg from "@/assets/icons/badminton-bg-colored.png"

import { useState } from "react"

interface MatchInfo {
    sportsType: "football" | "basketball" | "badminton"
    matchTitle: string;
    place: string;
    matchPersonnel: string;     // 3 on 3, 5 on 5 같은 매칭 인원
    matchType: "개인" | "팀";
    isOldMatch: boolean;
}

const initialMatchInfo: MatchInfo[] = [
    {
        sportsType: "basketball",
        matchTitle: "농구 3대3 하실 분~",
        place: "서울특별시 양천구 목동동로 111 양천공원",
        matchPersonnel: "3 on 3",
        matchType: "개인",
        isOldMatch: false,
    },
    {
        sportsType: "football",
        matchTitle: "월드컵 풋살장 5대5",
        place: "대전광역시 유성구 월드컵대로 32",
        matchPersonnel: "5 on 5",
        matchType: "개인",
        isOldMatch: false,
    },
    {
        sportsType: "basketball",
        matchTitle: "오목공원 농구팟",
        place: "서울특별시 양천구 목동동로 111 양천공원",
        matchPersonnel: "3 on 3",
        matchType: "개인",
        isOldMatch: true,
    },
    {
        sportsType: "badminton",
        matchTitle: "플레이그라운드 팀과의 매치",
        place: "서울특별시 양천구 목동동로 111 양천공원",
        matchPersonnel: "1 on 1",
        matchType: "팀",
        isOldMatch: true,
    },
    {
        sportsType: "badminton",
        matchTitle: "오늘도배드민턴 팀과의 매치",
        place: "서울특별시 양천구 목동동로 111 양천공원",
        matchPersonnel: "3 on 3",
        matchType: "팀",
        isOldMatch: true,
    },
    {
        sportsType: "badminton",
        matchTitle: "오늘도배드민턴 팀과의 매치",
        place: "서울특별시 양천구 목동동로 111 양천공원",
        matchPersonnel: "3 on 3",
        matchType: "팀",
        isOldMatch: false,
    },

]
initialMatchInfo.sort((a: MatchInfo, b: MatchInfo) => a.isOldMatch === b.isOldMatch ? 0 : a.isOldMatch ? 1 : -1)

export default function MatchListPage() {

    const [matchInfo, setMatchInfo] = useState(initialMatchInfo);

    const individualMatchCardRendering = () => {
        let index = 0
        const Result = matchInfo.map((match) => {
            let imgSrc = ""
            let buttonColor = ""
            switch (match.sportsType) {
                case "football":
                    imgSrc = footballImg
                    buttonColor = "bg-[#E1D7FC]"
                    break;
                case "basketball":
                    imgSrc = basketballImg
                    buttonColor = "bg-[#FDE8B4]"
                    break;
                case "badminton":
                    imgSrc = badmintonImg
                    buttonColor = "bg-[#C4FFB6]"
                    break;
            }
            index++;
            return (
                (match.matchType === "개인" &&
                    <MatchCard
                        key={index}
                        imgSrc={imgSrc}
                        sportsType={match.sportsType}
                        matchTitle={match.matchTitle}
                        place={match.place}
                        matchPersonnel={match.matchPersonnel}
                        matchType={match.matchType}
                        isOldMatch={match.isOldMatch}
                        buttonColor={buttonColor}
                    />
                )
            )
        })
        return Result
    }

    const teamMatchCardRendering = () => {
        let index = 0
        const Result = matchInfo.map((match) => {
            let imgSrc = ""
            let buttonColor = ""
            switch (match.sportsType) {
                case "football":
                    imgSrc = footballImg
                    buttonColor = "bg-[#E1D7FC]"
                    break;
                case "basketball":
                    imgSrc = basketballImg
                    buttonColor = "bg-[#FDE8B4]"
                    break;
                case "badminton":
                    imgSrc = badmintonImg
                    buttonColor = "bg-[#C4FFB6]"
                    break;
            }
            index++;
            return (
                (match.matchType === "팀" &&
                    <MatchCard
                        key={index}
                        imgSrc={imgSrc}
                        sportsType={match.sportsType}
                        matchTitle={match.matchTitle}
                        place={match.place}
                        matchPersonnel={match.matchPersonnel}
                        matchType={match.matchType}
                        isOldMatch={match.isOldMatch}
                        buttonColor={buttonColor}
                    />
                )
            )
        })
        return Result
    }

    return (
        <div className="flex flex-col h-auto w-full">
            <div className="w-full h-auto bg-white mb-5">
                <h1 className="pl-20 py-15 text-start text-18 font-inter font-bold">개인 매칭</h1>
            </div>
            <div>{individualMatchCardRendering()}</div>

            <div className="pt-12" />

            <div className="w-full h-auto bg-white mb-5">
                <h1 className="pl-20 py-15 text-start text-18 font-inter font-bold">팀 매칭</h1>
            </div>
            <div>{teamMatchCardRendering()}</div>
        </div>
    )
}