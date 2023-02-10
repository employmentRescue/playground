import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calender from "react-calendar";
import dayjs from "dayjs";
import 'react-calendar/dist/Calendar.css'

import { RootState } from "@/stores/store";

import closeIcon from "@/assets/icons/exit.png";
import whiteArrow from "@/assets/icons/white-arrow.png";


// 자동 매칭 필터바 - 날짜
export function MatchFilterDate({ shutOtherWindow, clicked, date }: { shutOtherWindow: ()=> void, clicked: () => void, date: string }) {
    return (
        <div className="flex flex-row  w-74 h-25 flex-grow-0 pt-0 pl-9 pr-6 rounded-5 bg-[#303eff]" onClick={(e) => { e.preventDefault(); clicked(); shutOtherWindow(); }}>
            <span className="w-45 h-15 flex-grow mt-5 p-0 font-inter text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">{date}</span>
            <img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />

        </div>
    )
}

// 자동 매칭 필터 - 날짜 지정
export function MatchDateSetting({ clicked, dateSetting }: { clicked: () => void , dateSetting: (date: string) => void}) {

    const [value, onChange] = useState(new Date())
    dateSetting(dayjs(value).format('YYYY-MM-DD'))
    console.log(dayjs(value).format('YYYY-MM-DD'))
    return (
        <div className="absolute top-[-117px] left-0 w-[360px] h-[745px] m-0 p-0 z-20">
            <div className="h-1/3 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="absolute bottom-0 left-0 p-0 w-full h-2/3 flex-grow-0 bg-[#fff] z-20">
                <div>
                    <span className="inline-block w-70 h-16 flex-grow-0 mt-13 ml-[145px] font-inter text-[15px] text-left text-[#000]">날짜 선택</span>
                    <img src={closeIcon} alt="" className="inline-block top-16 w-10 h-10 flex-grow-0 my-3 ml-[115px]"
                        onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="w-full h-3/5 place-content-centeer bg-[#fff]">
                    <Calender onChange={onChange} value={value} formatDay={(date) => dayjs(date).format('DD')}/>
                </div>
                <div className="absolute bottom-0 h-1/8 justify-center mb-15 mx-13">
                    <div className="grid place-content-center h-34 mt-4 w-full text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff]">설정 완료</div>
                </div>
            </div>
        </div>
    )
}
