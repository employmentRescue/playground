import teamProfileCreateImg from "@/assets/profiles/team-profile-create.png";
import modifyImage from "@/assets/profiles/modify.png"
import titleFavoriteSports from "@/assets/profiles/title-favorite-sports.png"

import ButtonDesign from "../../../components/TeamCreate/Buttons/ButtonDesign";
import { setMyTeam } from "@/stores/register/userInfo";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "@/stores/store";
import useTeamRegister from "@/hooks/team/useTeamRegister";

interface Iprops {
    onClickChangePage: (num: number) => void;
    selectedSports: "축구" | "농구" | "배드민턴"
    setSelectedSports: any;
    memberIds: number[];
}

type Personnel = "1vs1" | "3vs3" | "5vs5" | "6vs6" | "11vs11"
type TeamLevel = "입문" | "초수" | "중수" | "고수"

const footballPersonnel: Personnel[] = ["5vs5", "6vs6", "11vs11"];
const basketballPersonnel: Personnel[] = ["3vs3", "5vs5"];
const badmintonPersonnel: Personnel[] = ["1vs1", "3vs3"];


export default function TeamSettingPage({ onClickChangePage, selectedSports, memberIds }: Iprops) {
    const [teamNameInput, setTeamNameInput] = useState<string>("");
    const [teamLevel, setTeamLevel] = useState<TeamLevel>("입문");
    const [sportsPersonnel, setSportsPersonnel] = useState<Personnel>("11vs11");
    const userId = useSelector((state: RootState) => {
        return state.userId;
    });
    const selectedMemberIds = [...memberIds, userId]

    const teamNameInputRef: any = useRef();

    const { mutate } = useTeamRegister();

    const getNicknameInput = (event: React.BaseSyntheticEvent) => {
        setTeamNameInput(event.target.value)
    }

    const handleOnClickCreateTeam = () => {
        mutate({
            gameType: sportsPersonnel,
            level: teamLevel,
            name: teamNameInput,
            sports: selectedSports,
            teamMemberList: selectedMemberIds,
        })
    }

    useEffect(() => {
        console.log(selectedMemberIds)
    })

    function personnelRendering() {
        switch (selectedSports) {
            case "축구":
                return (footballPersonnel.map((personnel) =>
                    <ButtonDesign key={personnel} innerText={personnel} onClick={() => { setSportsPersonnel(personnel) }} className={"w-63 h-25 mt-10 " + (personnel === sportsPersonnel ? "text-white bg-blue-700 text-14" : "text-blue-700 bg-white text-14")} />
                ))
            case "농구":
                return (basketballPersonnel.map((personnel) =>
                    <ButtonDesign key={personnel} innerText={personnel} onClick={() => { setSportsPersonnel(personnel) }} className={"w-63 h-25 mt-10 " + (personnel === sportsPersonnel ? "text-white bg-blue-700 text-14" : "text-blue-700 bg-white text-14")} />
                ))
            case "배드민턴":
                return (badmintonPersonnel.map((personnel) =>
                    <ButtonDesign key={personnel} innerText={personnel} onClick={() => { setSportsPersonnel(personnel) }} className={"w-63 h-25 mt-10 " + (personnel === sportsPersonnel ? "text-white bg-blue-700 text-14" : "text-blue-700 bg-white text-14")} />
                ))
        }
    }

    useEffect(() => {
        setTeamLevel("입문")
        if (selectedSports === "축구") {
            setSportsPersonnel("5vs5")
        } else if (selectedSports === "농구") {
            setSportsPersonnel("3vs3")
        } else (
            setSportsPersonnel("1vs1")
        )
    }, [selectedSports])

    return (
        <div className="flex flex-col self-center h-[100px]">
            <div className="mt-65" />
            <label htmlFor="uploadImg" className="self-center">
                <img src={teamProfileCreateImg} className="w-100 h-100 self-center" />
            </label>
            <input type="file" id="uploadImg" className="w-0 h-0 overflow-hidden" />
            <div className="flex self-center">
                <input onChange={getNicknameInput} className="w-[170px] mt-12 px-25 text-18 text-inter opacity-50 text-center font-extrabold self-center border-b-2 border-[#DBDBDB] outline-none" placeholder="팀 이름" ref={teamNameInputRef} />
                <img src={modifyImage} className="w-15 h-15 -ml-15 mb-10 self-end" onClick={() => teamNameInputRef.current.focus()} />
            </div>

            <div className="flex flex-col">
                <div className="flex mt-35 self-center">
                    <img src={titleFavoriteSports} className="w-20 h-20 my-5" />
                    <h2 className="m-5 text-15  font-extrabold">팀 실력을 선택하세요.</h2>
                </div>
                <div className="flex justify-around">
                    <ButtonDesign innerText="입문" onClick={() => { setTeamLevel("입문") }} className={"w-63 h-25 mt-10 mx-6 " + (teamLevel === "입문" ? "text-white bg-blue-700 text-14" : "text-blue-700 bg-white text-14")} />
                    <ButtonDesign innerText="초수" onClick={() => { setTeamLevel("초수") }} className={"w-63 h-25 mt-10 mx-6 " + (teamLevel === "초수" ? "text-white bg-blue-700 text-14" : "text-blue-700 bg-white text-14")} />
                    <ButtonDesign innerText="중수" onClick={() => { setTeamLevel("중수") }} className={"w-63 h-25 mt-10 mx-6 " + (teamLevel === "중수" ? "text-white bg-blue-700 text-14" : "text-blue-700 bg-white text-14")} />
                    <ButtonDesign innerText="고수" onClick={() => { setTeamLevel("고수") }} className={"w-63 h-25 mt-10 mx-6 " + (teamLevel === "고수" ? "text-white bg-blue-700 text-14" : "text-blue-700 bg-white text-14")} />
                </div>
            </div>

            <div className="w-[calc(100%-30px)] ml-auto mr-auto">

            </div>

            <div className="flex mt-35 self-center">
                <img src={titleFavoriteSports} className="w-20 h-20 my-5" />
                <h2 className="m-5 text-15  font-extrabold">게임 종류를 선택하세요.</h2>
            </div>
            <div className="flex justify-around mx-20">
                {personnelRendering()}
            </div>
            <div className="mt-[20%] flex justify-between">

                <ButtonDesign innerText="뒤로" onClick={() => onClickChangePage(-1)} className={"w-[37%] h-38 mb-32 text-16 text-blue-700 bg-white left-30 bottom-55"} />
                <ButtonDesign innerText="팀만들기" onClick={() => handleOnClickCreateTeam()} className={"w-[37%] h-38 mb-32 text-16 text-white bg-blue-700 right-30 bottom-55"} />
            </div>
        </div>
    )
}
