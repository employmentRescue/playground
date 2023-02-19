import TeamImage1 from "@/assets/profiles/team-basketball.png"
import TeamImage2 from "@/assets/profiles/team-basketball2.png"

import SportsSelectButtons from "@/components/TeamCreate/Buttons/SportsSelectButtons";
import TeamCard from "@/components/MyTeam/TeamCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTabName } from "@/stores/tab/tabName";
import { RootState } from "@/stores/store";
import useTeamListQuery from "@/hooks/team/useTeamListQuery";

export default function MyTeamPage() {
    const userId = useSelector((state: RootState) => {
        return state.userId.id;
    });

    const { data } = useTeamListQuery(userId);
    console.log(data);
    const [selectedSports, setSelectedSports] = useState<"축구" | "농구" | "배드민턴">("축구")

    const getTeamListBySports = (selectedSports: "축구" | "농구" | "배드민턴") => {
        return data && data.map((teamInfo: any, index: number) => {
            return (
                (teamInfo.team.sports === selectedSports) &&
                <TeamCard
                    key={index}
                    teamId={teamInfo.team.teamId}
                    teamName={teamInfo.team.name}
                    win={teamInfo.teamStats.win}
                    lose={teamInfo.teamStats.lose}
                    tier={teamInfo.teamStats.tier}
                />
            )
        })
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTabName('나의 팀'))
    }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-110px)] justify-start bg-white">
            <div className="flex justify-evenly mt-16 mb-15">
                <SportsSelectButtons selectedSports={selectedSports} setSelectedSports={setSelectedSports} />
            </div>
            <div>{getTeamListBySports(selectedSports)}</div>
        </div>
    )
}