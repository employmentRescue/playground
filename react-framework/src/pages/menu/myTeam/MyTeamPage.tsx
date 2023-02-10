import TeamImage1 from "@/assets/profiles/team-basketball.png"
import TeamImage2 from "@/assets/profiles/team-basketball2.png"

import SportsSelectButtons from "@/components/TeamCreate/Buttons/SportsSelectButtons";
import TeamCard from "@/components/MyTeam/TeamCard";

import { useState } from "react";


export default function MyTeamPage() {
    const initialSportsState = "축구"
    const initialTeamList = [
        {
            teamId: 1,
            teamName: "Football Team1",
            teamImage: TeamImage1,
            sportsType: "축구",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 1700, tier: "Bronze.2" }
        },
        {
            teamId: 2,
            teamName: "Football Team2",
            teamImage: TeamImage2,
            sportsType: "축구",
            record: { total: 4, win: 1, draw: 1, lose: 2 },
            rating: { points: 1500, tier: "Bronze.1" }
        },
        {
            teamId: 3,
            teamName: "Basketball Team1",
            teamImage: TeamImage1,
            sportsType: "농구",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 2500, tier: "Silver.2" }
        },
        {
            teamId: 4,
            teamName: "Basketball Team2",
            teamImage: TeamImage2,
            sportsType: "농구",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 1500, tier: "Gold.3" }
        },
        {
            teamId: 5,
            teamName: "Badminton Team",
            teamImage: TeamImage1,
            sportsType: "배드민턴",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 1500, tier: "Sliver.1" }
        },
        {
            teamId: 6,
            teamName: "Badminton Team",
            teamImage: TeamImage2,
            sportsType: "배드민턴",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 1500, tier: "Bronze.1" }
        },
        {
            teamId: 7,
            teamName: "Badminton Team",
            teamImage: TeamImage1,
            sportsType: "배드민턴",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 1500, tier: "Sliver.1" }
        },
        {
            teamId: 8,
            teamName: "Badminton Team",
            teamImage: TeamImage2,
            sportsType: "배드민턴",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 1500, tier: "Bronze.1" }
        },
        {
            teamId: 9,
            teamName: "Badminton Team",
            teamImage: TeamImage1,
            sportsType: "배드민턴",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 1500, tier: "Sliver.1" }
        },
        {
            teamId: 10,
            teamName: "Badminton Team",
            teamImage: TeamImage2,
            sportsType: "배드민턴",
            record: { total: 3, win: 2, draw: 0, lose: 1 },
            rating: { points: 1500, tier: "Bronze.1" }
        },
    ]
    const [myTeamList, setMyTeamList] = useState(initialTeamList);
    const [selectedSports, setSelectedSports] = useState<"축구" | "농구" | "배드민턴">(initialSportsState)

    const getTeamListBySports = (selectedSports: "축구" | "농구" | "배드민턴") => {
        return myTeamList.map((teamInfo) => {
            return (
                (teamInfo.sportsType === selectedSports) &&
                <TeamCard
                    key={teamInfo.teamId}
                    teamId={teamInfo.teamId}
                    teamImage={teamInfo.teamImage}
                    teamName={teamInfo.teamName}
                    win={teamInfo.record.win}
                    lose={teamInfo.record.lose}
                    tier={teamInfo.rating.tier}
                />
            )
        })
    }

    return (
        <div className="flex flex-col h-[calc(100vh-110px)] justify-start bg-white">
            <div className="flex justify-evenly mt-16 mb-15">
                <SportsSelectButtons selectedSports={selectedSports} setSelectedSports={setSelectedSports} />
            </div>
            <div>{getTeamListBySports(selectedSports)}</div>
        </div>
    )
}