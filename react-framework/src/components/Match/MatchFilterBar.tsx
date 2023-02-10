import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortSports } from "@/stores/match/matchSort"

import { MatchDateSetting, MatchFilterDate } from "@/components/Match/MatchDateSetting"
import { MatchTimeSetting, MatchFilterTime } from "@/components/Match/MatchTimeSetting"
import { MatchDistanceSetting, MatchFilterDistance } from "@/components/Match/MatchDistanceSetting"
import { MatchFilterEtc } from "@/components/Match/MatchEtcSetting"

import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"

type listItem = {
    sportType: string,
    member: string,
    title: string,
    date: string,
}

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

// 자동 매칭 필터바 - 종목
function MatchFilterSport({ sportType, onChangeMode }: { sportType: string, onChangeMode: (type: string) => void }) {
    const basketballBorder = () => { return (sportType === '농구' ? "border-[#efad45]" : "border-[#fde9b4]") }
    const footBallBorder = () => { return (sportType === '축구' ? "border-[#9C8DD3]" : "border-[#d8caff]") }
    const badmintonBorder = () => { return (sportType === '배드민턴' ? "border-[#71D354]" : "border-[#c4ffb6]") }

    return (
        <div className="flex-col absolute top-50 left-[-11px] w-60 h-[157px] m-0 pt-7 px-10 rounded-15 border-solid border-1 border-[#303EFF]/50 bg-[#f1f3ff] z-10">
            <div className={"w-40 h-40 grow-0 mr-11 mb-10 pt-8 pl-8  rounded-20 bg-[#fde9b4] border-solid border-[2.5px] " + basketballBorder()}
                onClick={(event) => {
                    event.preventDefault();
                    onChangeMode("BASKETBALL");

                }}>
                <img src={basketballOriginal} className="w-20 h-20 grow-0" />
            </div>
            <div className={"w-40 h-40 grow-0 mr-11 mb-10 pt-8 pl-8 rounded-20 bg-[#d8caff] border-solid border-[2.5px] " + footBallBorder()}
                onClick={(event) => {
                    event.preventDefault();
                    onChangeMode("footBall");
                }}>
                <img src={footBallOriginal} className="w-20 h-20 grow-0" />
            </div>
            <div className={"w-40 h-40 grow-0 mr-11 mb-10 pt-8 pl-8 rounded-20 bg-[#c4ffb6] border-solid border-[2.5px] " + badmintonBorder()}
                onClick={(event) => {
                    event.preventDefault();
                    onChangeMode("BADMINTON");
                }}>
                <img src={badmintonOriginal} className="w-20 h-20 grow-0" />
            </div>
        </div>
    )
}

export function MatchFilterBar() {
    // 종목 탭
    const [sportState, dispatch] = useReducer(registerSportType, initialSportTypeState)
    // (useSelector((state: RootState) => {
    //     return state.matchSort.sports;
    // }))
    const isClicked = () => dispatch({ type: 'ISCLICKED' })
    const basketball = () => { sportChange("BASKETBALL"); dispatch({ type: '농구' }); }
    const footBall = () => { sportChange("footBall"); dispatch({ type: '축구' }); }
    const badminton = () => { sportChange("BADMINTON"); dispatch({ type: '배드민턴' }); }
    
    const dispatchSport = useDispatch()
    
    const [sportIcon, setSportIcon] = useState({ border: "border-[#efad45] bg-[#fde9b4]", img: basketballOriginal })
    const sportChange = (type: string) => {
        switch (type) {
            case "BASKETBALL":
                setSportIcon({ border: "border-[#efad45] bg-[#fde9b4]", img: basketballOriginal });
                break;
            case "footBall":
                setSportIcon({ border: "border-[#9C8DD3] bg-[#d8caff]", img: footBallOriginal });
                break;
            case "BADMINTON":
                setSportIcon({ border: "border-[#71D354] bg-[#c4ffb6]", img: badmintonOriginal });
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
                console.log(timeState);
                break;
            case false:
                setTimeState(true);
                console.log(timeState);
                break;
        }
    }

    const [date, setDate] = useState('YYYY-MM-DD')
    let dateDisplay = 'M-DD'
    if (date[5] === '0') {
        if (date[8] === '0') {
            dateDisplay = date.slice(6,7) + "월 " + date.slice(9) + "일"           
        }
        else {
            dateDisplay = date.slice(6,7) + "월 " + date.slice(8, 10) + "일"
        }
    }
    else {
        if (date[8] === '0') {
            dateDisplay = date.slice(5,7) + "월 " + date.slice(9) + "일"
        }
        else {
            dateDisplay = date.slice(5,7) + "월 " + date.slice(8, 10) + "일"
        }
    }

    return (
        <div className="flex flex-row relative place-content-around w-full h-93 grow-0 m-0 pt-8 pl-16 bg-[#f1f3ff]">
            <div className="relative w-40 h-40 p-0 m-0">
                <div className={"w-40 h-40 grow-0 mr-11 pt-8 pl-8 border-solid border-[2.5px] rounded-20 " + sportIcon.border}
                    onClick={(event) => {
                        event.preventDefault();
                        isClicked();
                    }}>
                    <img src={sportIcon.img} className="w-20 h-20 grow-0" />
                </div>
                {sportState.isClicked === true && <MatchFilterSport sportType={sportState.sportType} onChangeMode={(type) => {
                    switch (type) {
                        case "BASKETBALL":
                            dispatchSport(setSortSports(sportState.sportType))
                            basketball();
                            break;
                        case "footBall":
                            dispatchSport(setSortSports(sportState.sportType))
                            footBall();
                            break;
                        case "BADMINTON":
                            dispatchSport(setSortSports(sportState.sportType))
                            badminton();
                            break;
                    }
                }
                } />}
            </div>
            <MatchFilterDistance shutOtherWindow={()=>shutOtherWindow()} clicked={() => {
                distancePage();
            }} />
            {distanceState === true && <MatchDistanceSetting clicked={() => {
                distancePage();
            }} />}

            <MatchFilterDate shutOtherWindow={()=>shutOtherWindow()} clicked={() => {
                datePage();
            }} date={dateDisplay}/>
            {dateState === true && <MatchDateSetting clicked={() => {
                datePage();
            }}
            dateSetting={(dateClicked: string)=>setDate(dateClicked)} />}

            <MatchFilterTime shutOtherWindow={()=>shutOtherWindow()} clicked={() => {
                timePage();
            }} />
            {timeState === true && <MatchTimeSetting clicked={() => {
                timePage();
            }} />}

            <MatchFilterEtc shutOtherWindow={()=>shutOtherWindow()} />
        </div>
    )
}


