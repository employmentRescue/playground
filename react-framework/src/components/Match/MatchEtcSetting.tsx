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
const gameTypeList = ["3vs3", "5vs5", "종류무관"]

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
    const [temMinPlayTime, setTemMinPlayTime] = useState(String(playTime[0]))
    const [temMaxPlayTime, setTemMaxPlayTime] = useState(String(playTime[1]))
    const [temSex, setTemSex] = useState(sex)
    const [temGameType, setTemGameType] = useState(gameType)
    const temPlayTime = [Number(temMinPlayTime), Number(temMaxPlayTime)]
    
    const levelTab = levelList.map((eachData: string, i: number)=><EtcTypeButton key={i} width={50} text={eachData} selected={temLevel} setData={(data:any)=>setTemLevel(data)}/>)
    const gameTypeTab = gameTypeList.map((eachData: string, i: number)=><EtcTypeButton key={i} width={74} text={eachData} selected={temGameType} setData={(data:any)=>setTemGameType(data)}/>)
    
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
                        <input type="text" className="h-25 m-5 rounded-[5px] border-1 border-solid border-[#303eff] w-50 font-inter text-[12px] text-center font-medium placeholder:text-[#303eff]" placeholder={String(playTime[0])} onChange={(e)=>{e.preventDefault(); setTemMinPlayTime(e.target.value)}}/>
                        <span className="content-center w-30 h-16 font-inter text-[13px] text-[#868585]">시간</span>
                        <span className="content-center w-30 h-16 font-inter text-[13px] text-[#868585]">~</span>
                        <input type="text" className="h-25 m-5 rounded-[5px] border-1 border-solid border-[#303eff] w-50 font-inter text-[12px] text-center font-medium placeholder:text-[#303eff]" placeholder={String(playTime[1])} onChange={(e)=>{e.preventDefault(); setTemMaxPlayTime(e.target.value)}}/>
                        <span className="content-center w-30 h-16 font-inter text-[13px] text-[#868585]">시간</span>
                    </div>
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="w-70 h-2/1 flex-grow-0 p-5 font-inter font-semibold text-[15px] text-left text-[#000]">성별</span>
                    <div className="flex w-full">
                        <EtcTypeButton width={50} text={"남성"} selected={temSex} setData={(data:any)=>setTemSex(data)}/>
                        <EtcTypeButton width={50} text={"여성"} selected={temSex} setData={(data:any)=>setTemSex(data)}/>
                        <EtcTypeButton width={74} text={"성별무관"} selected={temSex} setData={(data:any)=>setTemSex(data)}/>
                    </div>
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="w-70 h-2/1 flex-grow-0 p-5 font-inter font-semibold text-[15px] text-left text-[#000]">게임 종류</span>
                    <div className="flex w-full">
                        {gameTypeTab}
                    </div>
                </div>
                <div className="h-1/6 flex justify-center mb-15 mx-13 pt-10">
                    <div className="grid place-content-center h-34 mt-4 w-[326px] text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff]" onClick={(e)=>{e.preventDefault(); clicked(); setEtcData(temLevel, temPlayTime, temSex, temGameType)}}>설정 완료</div>
                </div>
            </div>
        </div>
    )
}