
import { useState } from "react";
import { ComponentProps } from "react";

import closeIcon from "@/assets/icons/exit.png";
import searchIcon from "@/assets/icons/search-icon.png";
import whiteArrow from "@/assets/icons/white-arrow.png";

type Iprops = { 
    clicked: () => void, 
    location: number[],
    distance: number, 
    setFilterData: (attr:attrType, value:any) => void 
}
type attrType = "matchDate" | "location" | "distance" | "startTime" | "sports" | "gameType" | "sort"


// 자동 매칭 필터바 - 거리범위
export function MatchFilterDistance({ shutOtherWindow, clicked, distance }: { shutOtherWindow: () => void, clicked: () => void, distance: number }) {

    return (
        <div className="flex flex-row w-70 h-25 flex-grow-0 mt-0 pt-0 pr-6 pb-4 pl-9 rounded-5 bg-[#303eff]"
            onClick={(e) => {
                e.preventDefault();
                clicked();
                shutOtherWindow();
            }}>
            <span className="w-41 h-15 flex-grow mt-5 p-0  text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">{'~' + distance + 'km'}</span>
            <img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />
        </div>
    )
}

// 자동 매칭 필터 - 거리범위 지정
export function TeamMatchDistanceSetting({ clicked, location, distance, setFilterData }: Iprops) {
    const [temDistance, setDistance] = useState(String(distance))
    const valueChange: ComponentProps<'input'>['onChange'] = (event) => {
        setDistance(event.target.value);
    }

    return (
        <div className="flex flex-col absolute top-[-250px] left-0 place-content-around w-full h-screen m-0 p-0 z-20">
            <div className="h-1/4 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="justify-center pt-10 w-full h-3/4 flex-grow-0 bg-[#fff] z-20">
                <div className="flex relative place-content-center w-full">
                    <span className="w-70 h-16 flex-grow-0  text-[15px] text-left text-[#000]">지역 선택</span>
                    <img src={closeIcon} alt="" className="absolute right-10 w-10 h-10 flex-grow-0 my-3" onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="flex flex-row justify-center">
                    <img src={searchIcon} alt="" className="inline-block w-20 h-20 flex-grow-0 mt-15 mr-6 mb-15 ml-18" />
                    <input type="text" placeholder="검색하고 싶은 지역을 입력하세요." className="w-5/6 h-25 flex-grow-0 mt-13 mr-28 mb-13 ml-6 pt-0 pl-11 rounded-[5px] bg-[#dbdbdb] font-inter text-[12px] font-[500] text-left text-[#a7a7a7]" />
                </div>
                <div className="w-full h-2/3 bg-[#d99d9d]">
                    <h1>지도</h1>
                </div>
                <div className="h-1/6 justify-center mb-15 mx-13 pt-10">
                    <input type="range" min="0" max="22" className="w-full" placeholder={temDistance} defaultValue={temDistance} onChange={valueChange} />
                    <div className="flex mb-12 w-full place-content-between">
                        <span className="w-26 h-15 flex-grow-0 mt-3  text-[12px] font-[500] text-left text-[#bbc0ff]">0km</span>
                        <div className="flex">
                            <div className="w-23 h-16 flex-grow-0 mt-3 p-0 text-left text-12 border-solid border-1 border-[#bbc0ff] bg-[#fff]">{temDistance}</div>
                            <span className="w-26 h-15 flex-grow-0 mt-3 ml-2  text-[12px] font-[500] text-left text-[#bbc0ff]">km</span>
                        </div>
                    </div>
                    <div className="h-1/2 flex justify-center mb-15 mx-13 pt-10">
                        <div className="grid place-content-center h-34 mt-4 w-[326px] text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff] " onClick={(e)=>{e.preventDefault(); clicked(); setFilterData("distance", Number(temDistance))}}>설정 완료</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
