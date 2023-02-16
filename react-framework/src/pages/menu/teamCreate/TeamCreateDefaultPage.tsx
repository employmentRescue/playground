import SportsSelectButtons from "@/components/TeamCreate/Buttons/SportsSelectButtons"
import ProfileCard from "@/components/TeamCreate/ProfileCard"
import cancleButtonImg from "@/assets/icons/profile-x-button.png"
import profileSampleImg from "@/assets/profiles/my-profile-sample.png"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import store, { RootState } from "@/stores/store"

import ButtonDesign from "../../../components/TeamCreate/Buttons/ButtonDesign"
import { dropOutOfMyTeam } from "@/stores/user/myTeam"
import TeamSettingPage from "./TeamSettingPage"
import { setTabName } from "@/stores/tab/tabName"

export default function TeamCreateDefaultPage() {
    const dispatch = useDispatch();
    const initialSportsState: "축구" | "농구" | "배드민턴" = "축구"

    const [searchInput, setSearchInput] = useState("");
    const [selectedSports, setSelectedSports] = useState(initialSportsState)
    const [currentPage, setCurrentPage] = useState(1);
    const ProfileList = useSelector((state: RootState) => {
        return state.createTeam
    })

    const selectedMemberIds = useSelector((state: RootState) => {
        return state.myTeam.memberIds
    })

    const handleOnChange = (e: React.BaseSyntheticEvent) => {
        console.log(searchInput)
        setSearchInput(e.target.value)
        console.log(store.getState().createTeam)
    }

    function handleOnClickChangePage(num: number) {
        setCurrentPage(currentPage + num)
    }

    function searchProfileRendering() {
        let Result
        let index = 0

        Result = ProfileList.map((profile) => {
            index++;
            return (
                <ProfileCard
                    key={profile.userId}
                    userId={profile.userId}
                    className={"flex my-5 justify-between"}
                    imageSrc={profile.imageSrc}
                    imageSize="ml-24 w-52 h-52"
                    nickname={profile.nickname}
                    isSelected={profile.isSelected}
                />
            )
        })
        return Result
    }

    function selectedProfileRendering() {
        const Result = ProfileList.map((profile) => {
            for (const memberId of selectedMemberIds) {
                if (memberId === profile.userId) {
                    return (
                        <div key={profile.userId} className="flex flex-col w-52 mt-15 mx-7">
                            <div className="flex" onClick={() => dispatch(dropOutOfMyTeam(profile.userId))}>
                                <img src={profile.imageSrc} className="w-47 h-47 rounded-25" />
                                <img src={cancleButtonImg} className="w-18 h-18 -ml-10" />
                            </div>
                            <p className="text-10  text-center mt-3 px-2 tracking-tight truncate">{profile.nickname}</p>
                        </div>
                    )
                }
            }
        })
        return Result
    }

    function MemberInvitePage() {
        return (
            <>
                <input value={searchInput} type="text" className="h-40 bg-[#F2EFEF] mt-15 mx-14 px-10 py-5 outline-none text-14 rounded-3" placeholder="닉네임, 이름 검색" onChange={handleOnChange} />
                <div className="mx-15 mt-13 mb-3 text-12">친구 목록</div>
                {searchInput && searchProfileRendering()}
                <ButtonDesign innerText="다음" className={"w-[300px] h-38 bg-blue-700 mb-32 text-white fixed bottom-55 border-blue-700"} onClick={() => handleOnClickChangePage(1)} />
            </>
        )
    }

    useEffect(() => {
        dispatch(setTabName('팀 생성'))
    }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-110px)] justify-start bg-white">
            <div className="flex justify-evenly mt-16">
                <SportsSelectButtons selectedSports={selectedSports} setSelectedSports={setSelectedSports} />
            </div>
            <div className="flex mx-16">{selectedProfileRendering()}</div>
            {(currentPage === 1) && MemberInvitePage()}
            {(currentPage === 2) && <TeamSettingPage onClickChangePage={handleOnClickChangePage} selectedSports={selectedSports} setSelectedSports={setSelectedSports} />}
        </div>
    )
}