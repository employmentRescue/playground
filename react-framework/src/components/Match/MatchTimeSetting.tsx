import useMouse from "@react-hook/mouse-position";
import { useState, useEffect, useRef } from "react";
import { Slider } from "@mui/material"

import closeIcon from "@/assets/icons/exit.png";
import whiteArrow from "@/assets/icons/white-arrow.png";

type Iprops = {
    clicked: () => void,
    startTime: (string | null)[],
    setFilterData: (attr: attrType, value: any) => void
}
type attrType = "startDate" | "location" | "distance" | "startTime" | "level" | "playTime" | "sex" | "sports" | "gameType" | "sort"

const numberToTime = (num: number) => {
    if (num / 10 < 1) {
        return "0" + String(num) + ":00:00"
    } else {
        return String(num) + ":00:00"
    }
}

// 자동 매칭 필터바 - 시간
export function MatchFilterTime({ shutOtherWindow, clicked, startTime }: { shutOtherWindow: () => void, clicked: () => void, startTime: (string | null)[] }) {
    const minStartTime = startTime[0] && startTime[0].slice(0, 2)
    const maxStartTime = startTime[1] && startTime[1].slice(0, 2)
    return (
        <div className="flex flex-row w-74 h-25 flex-grow-0 mt-7 pt-0 pl-9 pr-6 rounded-5 bg-[#303eff]" onClick={(e) => { e.preventDefault(); clicked(); shutOtherWindow(); }}>
            <span className="w-43 h-15 flex-grow mt-5 p-0  text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">{minStartTime + " ~ " + maxStartTime}</span>
            <img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />
        </div>
    )
}

export function MatchTimeSetting({ clicked, startTime, setFilterData }: Iprops) {
    const minStartTime = Number(startTime[0] && startTime[0].slice(0, 2))
    const maxStartTime = Number(startTime[1] && startTime[1].slice(0, 2))
    const [temStartTime, setTemStartTime] = useState([minStartTime, maxStartTime])
    const exportedStartTime = [numberToTime(temStartTime[0]), numberToTime(temStartTime[1])]
    const handleChange = (event: Event, value: number | number[]) => {
        event.preventDefault();
        const newValue = value as number[];
        setTemStartTime(newValue)
    }
    function valueText(value: number, index: number) {
        return `${value}:00:00`
    }
    return (
        <div className="flex flex-col absolute top-[-117px] left-0 place-content-around w-full h-screen m-0 p-0 z-20">
            <div className="h-3/4 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="justify-center pt-10 w-full h-1/4 flex-grow-0 bg-[#fff] z-20">
                <div className="flex relative place-content-center w-full h-1/6">
                    <span className="w-70 h-16 flex-grow-0  text-[15px] text-left text-[#000]">시간 선택</span>
                    <img src={closeIcon} alt="" className="absolute right-10 w-10 h-10 flex-grow-0 my-3" onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="justify-center h-1/2 py-11 px-13">
                    <div className="w-[calc(100%-30px)] ml-auto mr-auto">
                        <Slider
                            value={temStartTime}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={24}
                            sx={{
                                color: 'blue',
                                '& .MuiSlider-thumb': {
                                    width: '15px',
                                    height: '15px',
                                    color: 'white',
                                    borderWidth: '1px',
                                    borderColor: 'blue',
                                },
                            }}
                        />
                    </div>
                    <div className="flex mb-12 w-full place-content-between">
                        <div className="flex">
                            <div className="w-23 h-16 flex-grow-0 mt-3 p-0 text-left text-12 border-solid border-1 border-[#bbc0ff] bg-[#fff]">{temStartTime[0]}</div>
                            <span className=" h-15 flex-grow-0 mt-3 ml-2  text-[12px] font-[500] text-left text-[#bbc0ff]">시</span>
                        </div>
                        <div className="flex">
                            <div className="w-23 h-16 flex-grow-0 mt-3 p-0 text-left text-12 border-solid border-1 border-[#bbc0ff] bg-[#fff]">{temStartTime[1]}</div>
                            <span className=" h-15 flex-grow-0 mt-3 ml-2  text-[12px] font-[500] text-left text-[#bbc0ff]">시</span>
                        </div>
                    </div>
                </div>
                <div className="h-1/6 flex justify-center mb-15 mx-13 pt-10">
                    <div className="grid place-content-center h-34 mb-4 w-[326px] text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff]" onClick={(e) => { e.preventDefault(); clicked(); setFilterData("startTime", exportedStartTime) }}>설정 완료</div>
                </div>
            </div>
        </div>
    )
}