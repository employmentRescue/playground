import SportsSelectButtons from "@/components/TeamCreate/Buttons/SportsSelectButtons"
import ProfileCard from "@/components/TeamCreate/ProfileCard"
import cancleButtonImg from "@/assets/icons/profile-x-button.png"

import profileSampleImg from "@/assets/profiles/my-profile-sample.png"
import profileSampleImg2 from "@/assets/profiles/my-profile-sample2.png"
import profileSampleImg3 from "@/assets/profiles/my-profile-sample3.png"
import profileSampleImg4 from "@/assets/profiles/my-profile-sample4.png"
import profileSampleImg5 from "@/assets/profiles/my-profile-sample5.png"


import { useState } from "react"

interface Profile {
    id: number;
    imageSrc: string;
    nickname: string;
}

const initialProfileList: Profile[] = []

const recentProfileList: Profile[] = [
    {
        id: 1,
        imageSrc: profileSampleImg2,
        nickname: "포르투갈 손흥민",
    },
    {
        id: 2,
        imageSrc: profileSampleImg3,
        nickname: "크리스타이누 호날두",
    },
    {
        id: 3,
        imageSrc: profileSampleImg4,
        nickname: "얼굴 천재",
    },
    {
        id: 4,
        imageSrc: profileSampleImg5,
        nickname: "회사원",
    },
]

const searchedProfileList: Profile[] = [
    {
        id: 5,
        imageSrc: profileSampleImg2,
        nickname: "친구1",
    },
    {
        id: 6,
        imageSrc: profileSampleImg3,
        nickname: "친구2",
    },
]


export default function TeamCreatePage() {
    const [searchInput, setSearchInput] = useState("");
    const [selectedProfileList, pushSelectedProfileList] = useState(initialProfileList)

    const handleOnChange = (e: React.BaseSyntheticEvent) => {
        setSearchInput(e.target.value)
    }

    function searchTitle() {
        if (searchInput) {
            return "친구"
        } else {
            return "최근 매칭"
        }
    }

    function showSelected() {

    }

    function searchProfileRendering() {
        let Result

        if (searchInput) {
            let index = 0
            Result = searchedProfileList.map((profile) => {
                index++;
                return <ProfileCard key={index} id={profile.id} className={"flex my-10 justify-between"} imageSrc={profile.imageSrc} imageSize="ml-24 w-52 h-52" nickname={profile.nickname} />
            })
        } else {
            let index = 0
            Result = recentProfileList.map((profile) => {
                index++;
                return <ProfileCard key={index} id={profile.id} className={"flex my-10 justify-between"} imageSrc={profile.imageSrc} imageSize="ml-24 w-52 h-52" nickname={profile.nickname} />
            })
        }
        return Result
    }

    return (
        <div className="flex flex-col h-[calc(100vh-110px)] justify-start bg-white">
            <div className="flex justify-evenly mt-16">
                <SportsSelectButtons />
            </div>
            <div>선택한 사람들</div>
            <input type="text" className="h-40 bg-[#F2EFEF] mx-14 px-10 py-5 outline-none text-14 rounded-3" placeholder="닉네임, 이름 검색" onChange={handleOnChange} />
            <div className="mx-15 mt-13 text-14">{searchTitle()}</div>
            {searchProfileRendering()}
        </div>
    )
}