import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import Calender from "react-calendar";
import dayjs from "dayjs";
import 'react-calendar/dist/Calendar.css'

import closeIcon from "@/assets/icons/exit.png";


// 자동 매칭 필터 - 날짜 지정
export default function MatchDateSetting({ clicked, dateSetting }: { clicked: () => void , dateSetting: (date: string) => void}) {

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
                    <Calender onChange={onChange} value={value} formatDay={(locale, date) => dayjs(date).format('DD')}/>
                </div>
                <div className="flex-row h-1/9 justify-center mt-15 mx-18">
                    <div className="grid place-content-center h-34 mt-4 w-full text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff]">설정 완료</div>
                </div>
            </div>
        </div>
    )
}
