import SportsSelectButtons from "@/components/TeamCreate/Buttons/SportsSelectButtons"
import ProfileCard from "@/components/TeamCreate/ProfileCard"
import cancleButtonImg from "@/assets/icons/profile-x-button.png"
import profileSampleImg from "@/assets/profiles/my-profile-sample.png"
import profileSampleImg2 from "@/assets/profiles/my-profile-sample2.png"
import profileSampleImg3 from "@/assets/profiles/my-profile-sample3.png"
import profileSampleImg4 from "@/assets/profiles/my-profile-sample4.png"
import profileSampleImg5 from "@/assets/profiles/my-profile-sample5.png"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import ButtonDesign from "../../../components/TeamCreate/Buttons/ButtonDesign"
import TeamSettingPage from "./TeamSettingPage"
import { setTabName } from "@/stores/tab/tabName"
import useGetUserInfoByToken from "@/hooks/user/useGetUserInfoByToken"
import axios from "axios"
import { USER_SERVER_URL } from "@/utils/url"

interface SampleUser {
    id: number;
    imageSrc: string;
    nickname: string;
    isSelected: boolean;
}

export default function TeamCreateDefaultPage() {
    const dispatch = useDispatch();
    const initialSportsState: "축구" | "농구" | "배드민턴" = "축구"

    const [searchInput, setSearchInput] = useState("");
    const [selectedSports, setSelectedSports] = useState(initialSportsState)
    const [currentPage, setCurrentPage] = useState(1);
    const [profileList, setProfileList] = useState<SampleUser[]>([]);
    const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);

    // const { data } = useGetUserIdByNickname(searchInput);

    const handleOnChange = (e: React.BaseSyntheticEvent) => {
        // console.log(searchInput)
        setSearchInput(e.target.value)

    }

    function handleOnClickChangePage(num: number) {
        setCurrentPage(currentPage + num)
    }

    function searchProfileRendering() {
        let Result
        let index = 0

        Result = profileList.map((profile: SampleUser) => {
            index++;
            return (
                <ProfileCard
                    key={profile.id}
                    userId={profile.id}
                    className={"flex my-5 justify-between"}
                    imageSrc={profileSampleImg}
                    imageSize="ml-24 w-52 h-52"
                    nickname={profile.nickname}
                    isSelected={profile.isSelected}
                    selectedMemberIds={selectedMemberIds}
                    setSelectedMemberIds={setSelectedMemberIds}
                />
            )
        })
        return Result
    }

    //선택된 사람이 있으면  닉네임 입력창 위쪽에 프로필 사진이 추가됨
    function selectedProfileRendering() {
        const Result = profileList.map((profile) => {
            for (const memberId of selectedMemberIds) {
                if (memberId === profile.id) {
                    return (
                        <div key={profile.id} className="flex flex-col w-52 mt-15 mx-7">
                            <div className="flex w-52">
                                <img src={profileSampleImg} className="w-47 h-47 rounded-25" />
                                {/* <img src={cancleButtonImg} className="w-18 h-18 -ml-10" /> */}
                            </div>
                            <p className="text-10 text-center mt-3 px-2 tracking-tight truncate">{profile.nickname}</p>
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
                {searchInput && <div className="flex justify-between mx-15 mt-13 mb-15 ">
                    <p className="text-14 mt-8">친구 목록</p>
                    <ButtonDesign innerText="다음" className={"w-[50px] mt-5 h-28 bg-blue-700 text-14 text-white border-blue-700 rounded-40"} onClick={() => handleOnClickChangePage(1)} />
                </div>}

                {searchInput ? searchProfileRendering() : <div className="m-10 p-8 text-14 w-fit bg-[#F1F3FF] rounded-10">친구를 검색해보세요 !</div>}
            </>
        )
    }

    useEffect(() => {
        dispatch(setTabName('팀 생성'))
    }, [])

    const getNickname = async () => await axios.post(USER_SERVER_URL + `/user/search/id/similar?nickname=${searchInput}`)
        .then((response) => {
            console.log(searchInput)
            console.log("받은 응답", response.data)
            setProfileList(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
        ;

    useEffect(() => {
        if (searchInput) {
            getNickname()
        }
    }, [searchInput])

    // useEffect(() => {
    //     console.log(selectedMemberIds)
    //     // selectedProfileList = selectedMemberIds
    // }, [selectedMemberIds])

    return (
        <div className="flex flex-col h-[calc(100vh-113px)] w-auto justify-start bg-white">
            <div className="flex justify-evenly mt-16">
                <SportsSelectButtons selectedSports={selectedSports} setSelectedSports={setSelectedSports} />
            </div>
            <div className="flex mx-16 w-full overflow-x-auto">{selectedProfileRendering()}</div>
            {(currentPage === 1) && MemberInvitePage()}
            {(currentPage === 2) && <TeamSettingPage onClickChangePage={handleOnClickChangePage} selectedSports={selectedSports} setSelectedSports={setSelectedSports} memberIds={selectedMemberIds} />}
        </div>
    )
}