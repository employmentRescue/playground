import SportsSelectButtons from "@/components/TeamCreate/Buttons/SportsSelectButtons"
import ProfileCard from "@/components/TeamCreate/ProfileCard"
import cancleButtonImg from "@/assets/icons/profile-x-button.png"
import profileSampleImg from "@/assets/profiles/my-profile-sample.png"

import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import store, { RootState } from "@/stores/store"


export default function TeamCreatePage() {
    const [searchInput, setSearchInput] = useState("");

    const ProfileList = useSelector((state: RootState) => {
        return state.createTeam
    })

    useEffect(() => {
        console.log
    }, [ProfileList])

    const selectedMemberIds = useSelector((state: RootState) => {
        return state.myTeam.memberIds
    })

    const handleOnChange = (e: React.BaseSyntheticEvent) => {
        setSearchInput(e.target.value)
        console.log(store.getState().createTeam)
    }

    function searchTitle() {
        if (searchInput) {
            return "친구"
        } else {
            return "최근 매칭"
        }
    }

    function searchProfileRendering() {
        let Result
        let index = 0

        if (searchInput) {
            Result = ProfileList.map((profile) => {
                index++;
                return (
                    !profile.isRecent &&
                    <ProfileCard
                        key={profile.userId}
                        userId={profile.userId}
                        className={"flex my-10 justify-between"}
                        imageSrc={profile.imageSrc}
                        imageSize="ml-24 w-52 h-52"
                        nickname={profile.nickname}
                        isSelected={profile.isSelected}
                        isRecent={profile.isRecent}
                    />
                )
            })
        } else {
            Result = ProfileList.map((profile) => {
                index++;
                // if (profile.isSelected) {
                //     setSelectedMemberIds([...selectedMemberIds, profile.userId])
                // } else {
                //     setSelectedMemberIds(selectedMemberIds.filter((memberId) => memberId != profile.userId))
                // }
                return (
                    profile.isRecent &&
                    <ProfileCard
                        key={profile.userId}
                        userId={profile.userId}
                        className={"flex my-10 justify-between"}
                        imageSrc={profile.imageSrc}
                        imageSize="ml-24 w-52 h-52"
                        nickname={profile.nickname}
                        isSelected={profile.isSelected}
                        isRecent={profile.isRecent}
                    />
                )
            })
        }
        return Result
    }

    function selectedProfileRendering() {
        const Result = ProfileList.map((profile) => {
            for (const memberId of selectedMemberIds) {
                if (memberId === profile.userId) {
                    return (
                        <div key={profile.userId} className="flex flex-col w-52 mt-15 mx-7">
                            <div className="flex">
                                <img src={profile.imageSrc} className="w-52 h-52 rounded-50" />
                                <img src={cancleButtonImg} className="w-18 h-18 -ml-10" />
                            </div>
                            <p className="text-10 font-inter text-center mt-3 px-5 tracking-tight">{profile.nickname}</p>
                        </div>
                    )
                }
            }
        })
        return Result
    }

    return (
        <div className="flex flex-col h-[calc(100vh-110px)] justify-start bg-white">
            <div className="flex justify-evenly mt-16">
                <SportsSelectButtons />
            </div>
            <div className="flex mx-16">{selectedProfileRendering()}</div>
            <input type="text" className="h-40 bg-[#F2EFEF] mt-15 mx-14 px-10 py-5 outline-none text-14 rounded-3" placeholder="닉네임, 이름 검색" onChange={handleOnChange} />
            <div className="mx-15 mt-13 text-14">{searchTitle()}</div>
            {searchProfileRendering()}
            <button className="w-[300px] h-38 rounded-5 font-inter bg-blue-700 text-16 mb-32 text-white tracking-tight self-center fixed bottom-55">다음</button>
        </div>
    )
}