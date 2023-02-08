import SportsSelectButton from "@/components/TeamCreate/Buttons/SportsSelectButton"
import ProfileCard from "@/components/TeamCreate/ProfileCard"

import footballImg from "@/assets/icons/football-original.png"
import basketballImg from "@/assets/icons/basketball-original.png"
import badmintonImg from "@/assets/icons/badminton-original.png"
import profileSampleImg from "@/assets/profiles/my-profile-sample2.png"

import { useState } from "react"

interface Profile {
	imageSrc: string;
	imageSize: string;
	nickname: string;
}

const initialSearchList: Profile[] = [

]

export default function TeamCreatePage() {

	const [selectProfile, setSelectProfile] = useState(false)

	const [searchInput, setSearchInput] = useState("");

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

	function SearchProfileRendering() {
		if (searchInput) {
			return (
				<ProfileCard className={"flex my-10"} imageSrc={profileSampleImg} imageSize="ml-14 w-52 h-52" nickname="포르투갈 손흥민" isSelected={selectProfile} />
			)
		} else {
			return (
				<div></div>
			)
		}
	}

	return (
		<div className="flex flex-col h-[calc(100vh-110px)] justify-start bg-white">
			<div className="flex justify-evenly mt-16">
				<SportsSelectButton imgSrc={footballImg} SportsName="축구" />
				<SportsSelectButton imgSrc={basketballImg} SportsName="농구" />
				<SportsSelectButton imgSrc={badmintonImg} SportsName="배드민턴" />
			</div>
			<div>선택한 사람들</div>
			<input type="text" className="h-40 bg-[#F2EFEF] mx-14 px-10 py-5 outline-none text-14 rounded-3" placeholder="닉네임, 이름 검색" onChange={handleOnChange} />
			<div className="mx-15 mt-13 text-14">{searchTitle()}</div>
			<ProfileCard className={"flex my-10"} imageSrc={profileSampleImg} imageSize="ml-14 w-52 h-52" nickname="포르투갈 손흥민" isSelected={selectProfile} />
		</div>
	)
}