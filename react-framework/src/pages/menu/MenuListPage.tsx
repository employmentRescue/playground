import ProfileCard from "@/components/Profile/ProfileCard"
import myProfile from "@/assets/profiles/my-profile-sample.png"
import matchListImage from "@/assets/menu/match-list.png"
import teamRankingImage from "@/assets/menu/team-ranking.png"
import teamCreateImage from "@/assets/menu/team-create.png"
import myTeamImage from "@/assets/menu/my-team.png"

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/stores/store"
import { useEffect } from "react"

import { setTabName } from "@/stores/tab/tabName"
import useGetUserInfo from "@/hooks/user/useGetUserInfo"


export default function MenuListPage() {

    const myUserId = useSelector((state: RootState) => {
        return state.userId
    });
  const userInfo = useGetUserInfo(myUserId)
  

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTabName('playGround'))
       // mutate()
    }, [])

    return (
        <div className="flex flex-col bg-white h-[calc(100%-110px)]">
            <h1 className="ml-31 mt-41  font-bold text-18 tracking-tight">프로필</h1>
            <Link to="/menu/profile">
                <ProfileCard
                    className={"flex bg-[#F1F3FF] mx-15 mt-15 pl-15 py-20 rounded-15 tracking-tight justify-between"}
                    imageSize="w-60 h-60"
                    imageSrc={myProfile}
            name={userInfo.data?.data.name}
                    nickname={userInfo.data?.data.nickname}
                    rating="bronze.1"
                />
            </Link>

            <h1 className="ml-31 mt-40  font-bold text-18 tracking-tight">통계</h1>
            <Link to="/menu/rank" className="flex">
                <img src={teamRankingImage} className="w-15 h-15 ml-33 mt-17" />
                <p className="ml-13 my-13 text-15">팀 랭킹</p>
            </Link>
            <h1 className="ml-31 mt-30  font-bold text-18 tracking-tight">매칭</h1>
            <Link to="/menu/match" className="flex">
                <img src={matchListImage} className="w-17 h-26 ml-33 mt-11" />
                <p className="ml-11 my-13 text-15">매칭 목록</p>
            </Link>
            <h1 className="ml-31 mt-30  font-bold text-18 tracking-tight">팀</h1>
            <Link to="/menu/team/create" className="flex">
                <img src={teamCreateImage} className="w-15 h-15 ml-33 mt-17" />
                <p className="ml-13 my-13 text-15">팀 생성</p>
            </Link>
            <Link to="/menu/team" className="flex">
                <img src={myTeamImage} className="w-15 h-15 ml-33 mt-17" />
                <p className="ml-13 my-13 text-15">나의 팀</p>
            </Link>
        </div>
    )
}