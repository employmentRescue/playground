import { useState, useEffect, useRef } from "react";

import whiteArrow from "@/assets/icons/white-arrow.png";
import closeIcon from "@/assets/icons/exit.png";

type Iprops = { 
    clicked: () => void, 
    sort: string, 
    setFilterData: (attr:attrType, value:any) => void  
}
type attrType = "startDate" | "location" | "distance" | "sort" | "level" | "playTime" | "sex" | "sports" | "gameType" | "sort" 
type sortType = "time" | "people" | "distance"

const engToKor = (value: string)=>{
    switch (value) {
        case "time": return "시간순";
        case "people": return "인원순";
        case "distance": return "거리순";
    }
}

export function MatchFilterSort({ shutOtherWindow, clicked, sort }: { shutOtherWindow: ()=>void, clicked: ()=>void, sort: string }) {
    
    return (
        <div className="flex flex-row w-74 h-25 flex-grow-0 pt-0 pl-9 pr-6 rounded-5 bg-[#303eff]" onClick={(e)=>{ e.preventDefault(); clicked(); shutOtherWindow(); }}>
            <span className="w-43 h-15 flex-grow mt-5 p-0 font-inter text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">{engToKor(sort)}</span>
            <img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />
        </div>
    )
}

export function MatchSortSetting({ clicked, sort, setFilterData }: Iprops) {
    return (
        <div className="flex flex-col absolute top-[-170px] left-0 place-content-around w-full h-screen m-0 p-0 z-20">
            <div className="h-2/3 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="justify-center pt-10 w-full h-1/3 flex-grow-0 bg-[#fff] z-20">
                <div className="flex relative place-content-center w-full h-1/6">
                    <span className="w-70 h-16 flex-grow-0 font-inter text-[15px] text-left text-[#000]">시간 선택</span>
                    <img src={closeIcon} alt="" className="absolute right-10 w-10 h-10 flex-grow-0 my-3" onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="justify-center p-0 w-full h-5/6 flex-grow-0 bg-[#fff] ">
                    <div className="relative flex items-center w-full h-1/3 px-17 border-y-1 border-solid-[#dbdbdb]" onClick={(e)=>{e.preventDefault(); clicked(); setFilterData("sort", "time")}}>
                        <span className="h-2/1 flex-grow-0 p-5 font-inter font-medium text-[15px] text-left text-[#000]">시간순(시작 시간 최근순)</span>
                    </div>
                    <div className="relative flex items-center w-full h-1/3 px-17 border-y-1 border-solid-[#dbdbdb]" onClick={(e)=>{e.preventDefault(); clicked(); setFilterData("sort", "people")}}>
                        <span className="h-2/1 flex-grow-0 p-5 font-inter font-medium text-[15px] text-left text-[#000]">인원순(남은 인원 적은순)</span>
                    </div>
                    <div className="relative flex items-center w-full h-1/3 px-17 border-y-1 border-solid-[#dbdbdb]" onClick={(e)=>{e.preventDefault(); clicked(); setFilterData("sort", "distance")}}>
                        <span className="h-2/1 flex-grow-0 p-5 font-inter font-medium text-[15px] text-left text-[#000]">거리순(가까운순)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}