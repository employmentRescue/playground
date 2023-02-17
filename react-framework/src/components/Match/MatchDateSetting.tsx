import { useState, useEffect, useRef } from "react";
import Calender from "react-calendar";
import dayjs from "dayjs";
// import 'react-calendar/dist/Calendar.css'

import closeIcon from "@/assets/icons/exit.png";
import whiteArrow from "@/assets/icons/white-arrow.png";

type Iprops = {
	startDate: string,
	clicked: () => void,
	setFilterData: (attr: attrType, value: any) => void
}
type attrType = "startDate" | "location" | "distance" | "startTime" | "level" | "playTime" | "sex" | "sports" | "gameType" | "sort"


// 자동 매칭 필터바 - 날짜
export function MatchFilterDate({ shutOtherWindow, clicked, date }: { shutOtherWindow: () => void, clicked: () => void, date: string }) {
	return (
		<div className="flex flex-row  w-74 h-25 flex-grow-0 mt-7 pt-0 pl-9 pr-6 rounded-5 bg-[#303eff]" onClick={(e) => { e.preventDefault(); clicked(); shutOtherWindow(); }}>
			<span className="w-45 h-15 flex-grow mt-5 p-0  text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">{date}</span>
			<img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />

		</div>
	)
}

// 자동 매칭 필터 - 날짜 지정
export function MatchDateSetting({ startDate, clicked, setFilterData }: Iprops) {

	const [temDate, onChange] = useState(new Date(startDate))
	return (
		<div className="flex flex-col absolute top-[-117px] left-0 w-full h-screen m-0 p-0 z-20">
			<div className="h-2/5 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
			<div className="flex flex-col justify-center pt-10 w-full h-3/5 flex-grow-0 bg-[#fff] z-20">
				<div className="flex relative justify-center w-full h-40">
					<span className="w-70 h-16 flex-grow-0  text-[15px] text-left text-[#000]">날짜 선택</span>
					<img src={closeIcon} alt="" className="absolute right-10 w-10 h-10 flex-grow-0 my-3"
						onClick={(e) => { e.preventDefault(); clicked(); }} />
				</div>
				<div className="flex justify-center w-full h-2/3 mt-10 bg-[#fff]">
					<Calender
						onChange={onChange}
						value={temDate}
						formatDay={(locale, rawDate) => dayjs(rawDate).format('DD')}
						minDetail="month"
						maxDetail="month"
						showNeighboringMonth={false}
						calendarType='US' />
				</div>
				<div className="h-1/6 flex justify-center mb-15 mx-13 pt-10">
					<div className="grid place-content-center h-34 mt-24 w-[326px] text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff]" onClick={(e) => { e.preventDefault(); clicked(); setFilterData("startDate", dayjs(temDate).format('YYYY-MM-DD')) }}>설정 완료</div>
				</div>
			</div>
		</div>
	)
}
