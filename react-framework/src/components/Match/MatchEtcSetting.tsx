import { useState, useEffect, useRef } from "react";

import EtcTypeButton from "./Buttons/EtcTypeButton";

import closeIcon from "@/assets/icons/exit.png";
import filterEtc from "@/assets/icons/filter-etc.png"

type Iprops = {
    level: string,
    playTime: number[],
    sex: string,
    gameType: string,
    clicked: ()=>void,
    setEtcData: (level: string, playTime: number[], sex: string, gameType: string)=>void,
}
type attrType = "startDate" | "location" | "distance" | "startTime" | "level" | "playTime" | "sex" | "sports" | "gameType" | "sort";

const levelList = ["입문", "초수", "중수", "고수"]
const gameTypeList = ["3대3", "5대5", "종류무관"]

// 자동 매칭 필터바 - 기타
export function MatchFilterEtc({ shutOtherWindow, clicked }: { shutOtherWindow:()=>void, clicked:()=>void }) {
    return (
        <div className=" w-25 h-25 flex-grow-0 mt-7 pt-3 pl-3 rounded-5 bg-[#303eff]" onClick={(e)=>{ e.preventDefault(); clicked(); shutOtherWindow(); }}>
            <img src={filterEtc} alt="" className="w-20 h-20 flex-grow-0" />
        </div>
    )
}

export function MatchEtcSetting({ level, playTime, sex, gameType, clicked, setEtcData }: Iprops) {
    const [temLevel, setTemLevel] = useState(level)
    const [temPlayTime, setTemPlayTime] = useState(playTime)
    const [temSex, setTemSex] = useState(sex)
    const [temGameType, setTemGameType] = useState(gameType)
    
    const levelTab = levelList.map((eachData: string, i: number)=><EtcTypeButton key={i} width={50} text={eachData} selected={temLevel}/>)
    const gameTypeTab = gameTypeList.map((eachData: string, i: number)=><EtcTypeButton key={i} width={74} text={eachData} selected={temGameType}/>)
    
    return (
        <div className="flex flex-col absolute top-[-117px] left-0 w-full h-screen m-0 p-0 z-20">
            <div className="h-1/2 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="justify-center pt-10 w-full h-1/2 flex-grow-0 bg-[#fff] z-20">
                <div className="flex relative place-content-center w-full h-1/6">
                    <span className="w-70 h-16 flex-grow-0 font-inter text-[15px] text-left text-[#000]">추가 선택</span>
                    <img src={closeIcon} alt="" className="absolute right-10 w-10 h-10 flex-grow-0 my-3"
                        onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="w-70 h-2/1 flex-grow-0 p-5 font-inter font-semibold text-[15px] text-left text-[#000]">수준</span>
                    <div className="flex w-full">
                        {levelTab}
                    </div>
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="w-70 h-2/1 flex-grow-0 p-5 font-inter font-semibold text-[15px] text-left text-[#000]">게임 시간</span>
                    <div className="flex w-full items-center">
                        <EtcTypeButton width={50} text={String(temPlayTime[0])} selected={""}/>
                        <span className="content-center w-30 h-16 font-inter text-[13px] text-[#868585]">시간</span>
                        <span className="content-center w-30 h-16 font-inter text-[13px] text-[#868585]">~</span>
                        <EtcTypeButton width={50} text={String(temPlayTime[1])} selected={""}/>
                        <span className="content-center w-30 h-16 font-inter text-[13px] text-[#868585]">시간</span>
                    </div>
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="w-70 h-2/1 flex-grow-0 p-5 font-inter font-semibold text-[15px] text-left text-[#000]">성별</span>
                    <div className="flex w-full">
                        <EtcTypeButton width={50} text={"남성"} selected={temSex}/>
                        <EtcTypeButton width={50} text={"여성"} selected={temSex}/>
                        <EtcTypeButton width={74} text={"성별무관"} selected={temSex}/>
                    </div>
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="w-70 h-2/1 flex-grow-0 p-5 font-inter font-semibold text-[15px] text-left text-[#000]">게임 종류</span>
                    <div className="flex w-full">
                        {gameTypeTab}
                    </div>
                </div>
                <div className="h-1/6 justify-center mb-15 mx-13 pt-10">
                    <div className="grid place-content-center h-34 mt-4 w-full text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff]" onClick={(e)=>{e.preventDefault(); clicked(); }}>설정 완료</div>
                </div>
            </div>
        </div>
    )
}