import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";

import { TeamMatchDistanceSetting, MatchFilterDistance } from "@/components/TeamMatch/TeamMatchDistanceSetting"
import { TeamMatchDateSetting, MatchFilterDate } from "@/components/TeamMatch/TeamMatchDateSetting"
import { TeamMatchTimeSetting, MatchFilterTime } from "@/components/TeamMatch/TeamMatchTimeSetting"
import { MatchFilterSort, TeamMatchSortSetting } from "@/components/TeamMatch/TeamMatchSortSetting";

import searchIcon from "@/assets/icons/search-icon.png";
import { teamMatchList } from "@/models/teamMatchList";

type attrType = "matchDate" | "location" | "distance" | "startTime" | "sports" | "gameType" | "sort"
type sportAction = { type: 'ISCLICKED' | '농구' | '축구' | '배드민턴' }

type Iprops = {
    setFilterData: (attr: attrType, value: any) => void,
    tabState: string,
    matchDate: string,
    location: number[],
    distance: number,
    startTime: (string | null)[],
    sports: string,
    gameType: string,
    sort: string,
}

interface sportTypeState {
    isClicked: boolean;
    sportType: string;
}

const initialSportTypeState: sportTypeState = {
    isClicked: false,
    sportType: '농구'
}

function registerSportType(state: sportTypeState, action: sportAction) {
    switch (action.type) {
        case 'ISCLICKED':
            if (state.isClicked === false) {
                return {
                    ...state,
                    isClicked: true
                }
            }
            else {
                return {
                    ...state,
                    isClicked: false
                }
            }
        case '농구':
            return {
                ...state,
                isClicked: false,
                sportType: '농구'
            }
        case '축구':
            return {
                ...state,
                isClicked: false,
                sportType: '축구'
            }
        case '배드민턴':
            return {
                ...state,
                isClicked: false,
                sportType: '배드민턴'
            }
    }
}

export default function TeamMatchFilterBar({ setFilterData, tabState, matchDate, location, distance, startTime, sports, gameType, sort }: Iprops) {
    // 종목 탭
    const [sportState, setSportType] = useReducer(registerSportType, initialSportTypeState)

    const isClicked = () => setSportType({ type: 'ISCLICKED' })

    const shutOtherWindow = () => {
        if (sportState.isClicked === true) {
            isClicked();
        }
    }
    // 거리 탭
    const [distanceState, setDistanceState] = useState(false);
    const distancePage = () => {
        console.log('datePage')
        switch (distanceState) {
            case true:
                setDistanceState(false);
                break;
            case false:
                setDistanceState(true);
                break;
        }
    }
    // 날짜 탭
    const [dateState, setDateState] = useState(false);
    const datePage = () => {

        switch (dateState) {
            case true:
                setDateState(false);
                break;
            case false:
                setDateState(true);
                break;
        }
    }
    // 시간 탭
    const [timeState, setTimeState] = useState(false);
    const timePage = () => {
        switch (timeState) {
            case true:
                setTimeState(false);
                break;
            case false:
                setTimeState(true);
                break;
        }
    }
    // 순서 정렬 탭
    const [sortState, setSortState] = useState(false);
    const sortPage = () => {
        switch (sortState) {
            case true:
                setSortState(false);
                break;
            case false:
                setSortState(true);
                break;
        }
    }
    // 날짜 탭 포맷팅
    const dateDisplay = () => {
        if (matchDate[5] === '0') {
            if (matchDate[8] === '0') {
                return matchDate.slice(6, 7) + "월 " + matchDate.slice(9) + "일"
            } else {
                return matchDate.slice(6, 7) + "월 " + matchDate.slice(8, 10) + "일"
            }
        } else {
            if (matchDate[8] === '0') {
                return matchDate.slice(5, 7) + "월 " + matchDate.slice(9) + "일"
            } else {
                return matchDate.slice(5, 7) + "월 " + matchDate.slice(8, 10) + "일"
            }
        }
    }
    // 매칭 모임 검색
    const valueChange: ComponentProps<'input'>['onChange'] = (event) => {
        console.log(event.target.value);
    }
    const searchBarState = () => {
        if (tabState === "LIST") {
            return (
                <div className="flex flex-row relative place-content-between w-full h-40 grow-0 m-0 px-15 bg-[#f1f3ff]">
                    <img src={searchIcon} alt="" className="w-20 h-20 flex-grow-0 mt-2 mr-6 mb-15 ml-5" />
                    <input type="text" placeholder={"게시물 이름 검색"} onChange={valueChange} className="w-5/6 h-25 flex-grow-0 mr-20 mb-13 ml-6 pt-0 pl-11 rounded-[5px] bg-[#dbdbdb] font-inter text-[12px] font-[500] text-left text-[#a7a7a7]" />
                    <MatchFilterSort shutOtherWindow={() => shutOtherWindow()} clicked={() => { sortPage(); }} sort={sort} />
                    {sortState === true && <TeamMatchSortSetting clicked={() => { sortPage(); }} sort={sort} setFilterData={(attr: attrType, value: any) => { setFilterData(attr, value) }} />}
                </div>
            )
        }
    }
    return (
        <div className="w-full h-auto grow-0 m-0 p-0 bg-[#f1f3ff]">
            <div className="flex flex-row relative items-center place-content-between w-full h-53 grow-0 m-0 px-15 bg-[#f1f3ff]">

                <MatchFilterDistance shutOtherWindow={() => shutOtherWindow()} clicked={() => { distancePage(); }} distance={distance} />
                <MatchFilterDate shutOtherWindow={() => shutOtherWindow()} clicked={() => { datePage(); }} date={dateDisplay()} />
                <MatchFilterTime shutOtherWindow={() => shutOtherWindow()} clicked={() => { timePage(); }} startTime={startTime} />
                <div className="flex flex-row w-70 h-25 flex-grow-0 mt-0 pt-0 pr-6 pb-4 pl-9 rounded-5"></div>
                {distanceState === true && <TeamMatchDistanceSetting clicked={() => { distancePage(); }} sportsType={sports} location={location} distance={distance} setFilterData={(attr: attrType, value: any) => { setFilterData(attr, value) }} />}
                {dateState === true && <TeamMatchDateSetting clicked={() => { datePage(); }} matchDate={matchDate} setFilterData={(attr: attrType, value: any) => { setFilterData(attr, value) }} />}
                {timeState === true && <TeamMatchTimeSetting clicked={() => { timePage(); }} startTime={startTime} setFilterData={(attr: attrType, value: any) => { setFilterData(attr, value) }} />}
            </div>
            {searchBarState()}
        </div>
    )
}


