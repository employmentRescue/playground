import footballImg from "@/assets/icons/football-original.png"
import basketballImg from "@/assets/icons/basketball-original.png"
import badmintonImg from "@/assets/icons/badminton-original.png"

import store from "@/stores/store"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSportsType } from "@/stores/user/myTeam"

interface Iprops {
    selectedSports: "축구" | "농구" | "배드민턴";
    setSelectedSports: any;
}

export default function SportsSelectButtons({ selectedSports, setSelectedSports }: Iprops) {
    const dispatch = useDispatch();
    const personnel = {
        "축구": {}
    }
    personnel.축구

    const handleOnClick = (sportsName: "축구" | "농구" | "배드민턴") => {
        if (selectedSports == sportsName) {
            setSelectedSports("")
        } else {
            setSelectedSports(sportsName)
            dispatch(setSportsType(sportsName))
            console.log(store.getState().myTeam.sportsType)
        }
    }

    return (
        <div className="flex">
            <div className="flex flex-col">
                <button className={"flex h-30 w-95 mx-9 rounded-15 border-1 justify-center " + (selectedSports == "축구" ? "bg-[#BEE0F7] border-blue-700" : "bg-[#F1F3FF] border-[#F1F3FF]")} onClick={() => handleOnClick("축구")}>
                    <img src={footballImg} className="w-20 h-20 self-center" />
                </button>
                <p className="text-center text-11 font-inter">축구</p>
            </div>
            <div className="flex flex-col">
                <button className={"flex h-30 w-95 mx-9 rounded-15 border-1 justify-center " + (selectedSports == "농구" ? "bg-[#BEE0F7] border-blue-700" : "bg-[#F1F3FF] border-[#F1F3FF]")} onClick={() => handleOnClick("농구")}>
                    <img src={basketballImg} className="w-20 h-20 self-center" />
                </button>
                <p className="text-center text-11 font-inter">농구</p>
            </div>
            <div className="flex flex-col">
                <button className={"flex h-30 w-95 mx-9 rounded-15 border-1 justify-center " + (selectedSports == "배드민턴" ? "bg-[#BEE0F7] border-blue-700" : "bg-[#F1F3FF] border-[#F1F3FF]")} onClick={() => handleOnClick("배드민턴")}>
                    <img src={badmintonImg} className="w-20 h-20 self-center" />
                </button>
                <p className="text-center text-11 font-inter">배드민턴</p>
            </div>
        </div>
    )
}