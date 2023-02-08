import useMouse from "@react-hook/mouse-position";
import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";

import closeIcon from "@/assets/icons/exit.png";
import searchIcon from "@/assets/icons/search-icon.png";

// 자동 매칭 필터 - 거리범위 지정
export default function MatchDistanceSetting({ clicked }: { clicked: () => void }) {
    const [distance, setDistance] = useState('1')
    const valueChange: ComponentProps<'input'>['onChange'] = (event) => {
        setDistance(event.target.value);
    }

    return (
        <div className="absolute top-[-117px] left-0 w-full h-[745px] m-0 p-0 z-20">
            <div className="absolute top-0 h-1/4 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="absolute bottom-0 left-0 p-0 w-full h-3/4 flex-grow-0 bg-[#fff] z-20">
                <div>
                    <span className="inline-block w-70 h-16 flex-grow-0 mt-13 ml-[145px] font-inter text-[15px] text-left text-[#000]">지역 선택</span>
                    <img src={closeIcon} alt="" className="inline-block top-16 w-10 h-10 flex-grow-0 my-3 ml-[115px]"
                        onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="flex flex-row">
                    <img src={searchIcon} alt="" className="inline-block w-20 h-20 flex-grow-0 mt-15 mr-6 mb-15 ml-18" />
                    <form action=""><input type="text" defaultValue="검색하고 싶은 지역을 입력하세요." className="w-[280px] h-25 flex-grow-0 mt-13 mr-28 mb-13 ml-6 pt-0 pl-11 rounded-[5px] bg-[#dbdbdb] font-inter text-[12px] font-[500] text-left text-[#a7a7a7]" /></form>
                </div>
                <div className="w-full h-3/5 bg-[#d99d9d]">
                    <h1>지도</h1>
                </div> 
                <div className="absolute bottom-0 h-1/8 justify-center mb-15 mx-13">
                    <form action=""><input type="range" min="0" max="22" className="w-full" placeholder={distance} defaultValue="1" onChange={valueChange} /></form>
                    <div className="flex mb-12">
                        <span className="w-26 h-15 flex-grow-0 mt-3 font-inter text-[12px] font-[500] text-left text-[#bbc0ff]">0km</span>
                        <div className="w-23 h-16 flex-grow-0 mt-3 ml-[258px] p-0 text-left text-12 border-solid border-1 border-[#bbc0ff] bg-[#fff]">{distance}</div>
                        <span className="w-26 h-15 flex-grow-0 mt-3 ml-2 font-inter text-[12px] font-[500] text-left text-[#bbc0ff]">km</span>
                    </div>
                    <div className="grid place-content-center h-34 mt-4 w-full text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff]">설정 완료</div>
                </div>
            </div>
        </div>
    )
}
