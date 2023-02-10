import teamProfileCreateImg from "@/assets/profiles/team-profile-create.png";
import modifyImage from "@/assets/profiles/modify.png"
import titleFavoriteSports from "@/assets/profiles/title-favorite-sports.png"

import ButtonDesign from "../../../components/TeamCreate/Buttons/ButtonDesign";

import { useState, useRef } from "react";

interface Iprops {
    onClickChangePage: (num: number) => void;
    selectedSports: "축구" | "농구" | "배드민턴"
    setSelectedSports: any;
}

export default function TeamSettingPage({ onClickChangePage }: Iprops) {

    const [teamNameInput, setTeamNameInput] = useState("");
    const teamNameInputRef: any = useRef();

    const getNicknameInput = (event: React.BaseSyntheticEvent) => {
        setTeamNameInput(event.target.value)
    }
    return (
        <div className="flex flex-col self-center">
            <div className="mt-95" />
            <img src={teamProfileCreateImg} className="w-100 h-100 self-center" />
            <div className="flex self-center">
                <input onChange={getNicknameInput} className="w-[170px] mt-12 px-25 text-18 text-inter opacity-50 text-center font-extrabold self-center border-b-2 border-[#DBDBDB] outline-none" placeholder="팀 이름" ref={teamNameInputRef} />
                <img src={modifyImage} className="w-15 h-15 -ml-15 mb-10 self-end" onClick={() => teamNameInputRef.current.focus()} />
            </div>
            <div className="flex mt-70 self-center">
                <img src={titleFavoriteSports} className="w-20 h-20 my-5" />
                <h2 className="m-5 text-15 font-inter font-extrabold">게임 종류를 선택하세요.</h2>
            </div>
            <div className="flex justify-between">
                <ButtonDesign innerText="3 on 3" onClick={() => { }} className={"w-63 h-25 mt-10 mx-7 text-blue-700 bg-white text-14"} />
                <ButtonDesign innerText="5 on 5" onClick={() => { }} className={"w-63 h-25 mt-10 mx-7 text-blue-700 bg-white text-14"} />
                <ButtonDesign innerText="11 on 11" onClick={() => { }} className={"w-63 h-25 mt-10 mx-7 text-blue-700 bg-white text-14"} />
            </div>
            <ButtonDesign innerText="뒤로" onClick={() => onClickChangePage(-1)} className={"w-[37%] h-38 mb-32 text-16 text-blue-700 bg-white fixed left-30 bottom-55"} />
            <ButtonDesign innerText="팀만들기" onClick={() => { }} className={"w-[37%] h-38 mb-32 text-16 text-white bg-blue-700 fixed right-30 bottom-55"} />
        </div>
    )
}