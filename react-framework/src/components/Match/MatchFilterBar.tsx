import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MatchSportSetting, MatchFilterSport } from "@/components/Match/MatchSportSetting"
import { MatchDistanceSetting, MatchFilterDistance } from "@/components/Match/MatchDistanceSetting"
import { MatchDateSetting, MatchFilterDate } from "@/components/Match/MatchDateSetting"
import { MatchTimeSetting, MatchFilterTime } from "@/components/Match/MatchTimeSetting"
import { MatchEtcSetting, MatchFilterEtc } from "@/components/Match/MatchEtcSetting"

import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"
import { matchList } from "@/models/matchList";

type attrType = "startDate" | "location" | "distance" | "startTime" | "level" | "playTime" | "sex" | "sports" | "gameType" | "sort" 
type sportAction = { type: 'ISCLICKED' | '농구' | '축구' | '배드민턴' }

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

export function MatchFilterBar({setFilterData, startDate, location, distance, startTime, level, playTime, sex, sports, gameType, sort}: {setFilterData: (attr:attrType, value:any) => void, startDate : string, location: number[], distance:number, startTime:(string | null)[], level:string, playTime:number[], sex:string, sports:string, gameType:string, sort:string}) {
    // 종목 탭
    const [sportState, setSportType] = useReducer(registerSportType, initialSportTypeState)
    // (useSelector((state: RootState) => {
    //     return state.matchSort.sports;
    // }))
    const isClicked = () => setSportType({ type: 'ISCLICKED' })
    const basketball = () => { sportChange("BASKETBALL"); setSportType({ type: '농구' }); }
    const footBall = () => { sportChange("footBall"); setSportType({ type: '축구' }); }
    const badminton = () => { sportChange("BADMINTON"); setSportType({ type: '배드민턴' }); }
    
    const [sportIcon, setSportIcon] = useState({ border: "border-[#efad45] bg-[#fde9b4]", img: basketballOriginal })
    const sportChange = (type: string) => {
        switch (type) {
            case "BASKETBALL":
                setFilterData("sports", "농구")
                setSportIcon({ border: "border-[#efad45] bg-[#fde9b4]", img: basketballOriginal });
                break;
            case "footBall":
                setSportIcon({ border: "border-[#9C8DD3] bg-[#d8caff]", img: footBallOriginal });
                setFilterData("sports", "축구")
                break;
            case "BADMINTON":
                setSportIcon({ border: "border-[#71D354] bg-[#c4ffb6]", img: badmintonOriginal });
                setFilterData("sports", "배드민턴")
                break;
        }
    }
    const shutOtherWindow = ()=> {
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
    // 시간 탭
    const [etcState, setEtcState] = useState(false);
    const etcPage = () => {
        switch (etcState) {
            case true:
                setEtcState(false);
                break;
            case false:
                setEtcState(true);
                break;
        }
    }
    // 날짜 탭 포맷팅
    const dateDisplay = () => {
        if (startDate[5] === '0') {
            if (startDate[8] === '0') { 
                return startDate.slice(6,7) + "월 " + startDate.slice(9) + "일"           
            } else { 
                return startDate.slice(6,7) + "월 " + startDate.slice(8, 10) + "일" 
            }
        } else {
            if (startDate[8] === '0') {
                return startDate.slice(5,7) + "월 " + startDate.slice(9) + "일"
            } else {
                return startDate.slice(5,7) + "월 " + startDate.slice(8, 10) + "일"
            }
        }
    }
    // 기타 정렬 데이터 처리용
    const setEtcData = (level: string, playTime: number[], sex: string, gameType: string)=>{
        setFilterData("level", level);
        setFilterData("playTime", playTime);
        setFilterData("sex", sex);
        setFilterData("gameType", gameType);
    }
    return (
        <div className="flex flex-row relative place-content-around w-full h-53 grow-0 m-0 px-10 bg-[#f1f3ff]">
            <div className="relative w-40 h-40 p-0 m-0">
                <MatchFilterSport sportIcon={sportIcon} isClicked={()=>isClicked()}/>
                {sportState.isClicked === true && <MatchSportSetting sportType={sportState.sportType} onChangeMode={(type) => {
                    switch (type) {
                        case "BASKETBALL":
                            basketball();
                            break;
                        case "footBall":
                            footBall();
                            break;
                        case "BADMINTON":
                            badminton();
                            break;
                    }
                }
                } />}
            </div>
            <MatchFilterDistance shutOtherWindow={()=>shutOtherWindow()} clicked={()=>{distancePage();}} distance={distance}/>
            <MatchFilterDate shutOtherWindow={()=>shutOtherWindow()} clicked={()=>{datePage();}} date={dateDisplay()} />
            <MatchFilterTime shutOtherWindow={()=>shutOtherWindow()} clicked={()=>{timePage();}} startTime={startTime}/>
            <MatchFilterEtc shutOtherWindow={()=>shutOtherWindow()} clicked={()=>{etcPage();}} />
            {distanceState === true && <MatchDistanceSetting clicked={() => {distancePage();}} distance={distance} setFilterData={(attr: attrType, value: any)=>{setFilterData(attr,value)}}/>}
            {dateState === true && <MatchDateSetting clicked={() => {datePage();}} startDate={startDate} setFilterData={(attr: attrType, value: any)=>{setFilterData(attr,value)}}/>}
            {timeState === true && <MatchTimeSetting clicked={() => {timePage();}} startTime={startTime} setFilterData={(attr: attrType, value: any)=>{setFilterData(attr,value)}}/>}
            {etcState === true && <MatchEtcSetting clicked={() => {etcPage();}} level={level} playTime={playTime} sex={sex} gameType={gameType} setEtcData={(level: string, playTime: number[], sex: string, gameType: string)=>{setEtcData(level, playTime, sex, gameType)}}/>}
        </div>
    )
}


