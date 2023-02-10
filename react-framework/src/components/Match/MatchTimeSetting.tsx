import useMouse from "@react-hook/mouse-position";
import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Slider } from "@mui/material"
import { RootState } from "@/stores/store";
import { setSortTimeRange } from "@/stores/match/matchSort"

import closeIcon from "@/assets/icons/exit.png";
import whiteArrow from "@/assets/icons/white-arrow.png";


// 자동 매칭 필터바 - 시간
export function MatchFilterTime({ shutOtherWindow, clicked }: { shutOtherWindow: ()=>void, clicked: ()=>void }) {
    return (
        <div className="flex flex-row w-74 h-25 flex-grow-0 pt-0 pl-9 pr-6 rounded-5 bg-[#303eff]" onClick={(e)=>{ e.preventDefault(); clicked(); shutOtherWindow(); }}>
            <span className="w-43 h-15 flex-grow mt-5 p-0 font-inter text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">18 ~ 22</span>
            <img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />

        </div>
    )
}

export function MatchTimeSetting({ clicked }: { clicked: () => void }) {
    const [distance, setDistance] = useState('1')
    const valueChange: ComponentProps<'input'>['onChange'] = (event) => {
        setDistance(event.target.value);
    }


    const dispatch = useDispatch()

    const handleChange = (event: Event, value: number | number[]) => {
        event.preventDefault();
        const newValue = value as number | number[] as number[]
        // console.log(value)
        dispatch(setSortTimeRange(newValue))
    }

    const pageSortTime = useSelector((state: RootState) => {
        if (state.matchSort.minStartTime === null) {
            return null
        }
        else {
            return [Number(state.matchSort.minStartTime), Number(state.matchSort.maxStartTime)];

        }
    });
    const userSortTime = useSelector((state: RootState) => {
        return state.userInfo.favoriteTime
    });
    // const [timeStart, timeEnd] = useSelector((state: RootState) => {
    //     if (pageSortTime === null) {
    //         return 
    //     }

    //     return state.matchSort.timeRange;
    // });

    return (
        <div className="absolute top-[-117px] left-0 w-[360px] h-[745px] m-0 p-0 z-20">
            <div className="absolute top-0 h-3/4 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="absolute bottom-0 left-0 p-0 w-full h-1/4 flex-grow-0 bg-[#fff] z-20">
                <div>
                    <span className="inline-block w-70 h-16 flex-grow-0 mt-13 ml-[145px] font-inter text-[15px] text-left text-[#000]">시간 선택</span>
                    <img src={closeIcon} alt="" className="inline-block top-16 w-10 h-10 flex-grow-0 my-3 ml-[115px]"
                        onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="flex-row h-1/9 justify-center mt-15 mx-18">
                    <Slider
                        // value={favoriteTime}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        value={pageSortTime == null ? userSortTime : pageSortTime}
                        // marks={marks}
                        min={0}
                        max={24}
                        // getAriaValueText={valueText}
                        className="mt-12"
                    />
                    <div className="flex mb-12">
                        <div className="w-23 h-16 flex-grow-0 mt-3 ml-[258px] p-0 text-left text-12 border-solid border-1 border-[#bbc0ff] bg-[#fff]">{distance}</div>
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