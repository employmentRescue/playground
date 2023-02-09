import useMouse from "@react-hook/mouse-position";
import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import Calender from "react-calendar";
import dayjs from "dayjs";
import 'react-calendar/dist/Calendar.css'

import MatchDateSetting from "@/components/Match/MatchDateSetting"
import MatchTimeSetting from "@/components/Match/MatchTimeSetting"
import MatchDistanceSetting from "@/components/Match/MatchDistanceSetting"

import whiteArrow from "@/assets/icons/white-arrow.png";

import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"
import filterEtc from "@/assets/icons/filter-etc.png"
import matchButton from "@/assets/icons/personal-match-button.png"
import closeIcon from "@/assets/icons/exit.png"
import searchIcon from "@/assets/icons/search-icon.png"
import { sign } from "crypto";

import useGatheringListQuery from "@/hooks/match/useGatheringListQuery";
import { RootState } from "@/stores/store";
import { matchList } from '@/models/matchList';
import { useDispatch, useSelector } from "react-redux";
import { setSortSports } from "@/stores/match/matchSort"

// ============ 기타 타입 =================================================
// 자동 매칭, 목록 선택 탭
type propsTab = {
    clickedTab: string,
    changeType: () => void;
}

interface gatheringType {
    gatheringId: number, // 1
    title: string, // "3대3 농구하실분~"
    description: string, // "같이 농구해요"
    people: number, // 6
    startDate: string, // "2023년 2월 15일"
    startTime: string, // "18:30"
    playTime: number, // 2
    hostId: number, //111
    sex: string, // "남성"
    level: string, // "중수"
    sports: string, // "basketball"
    gameType: string, // "3대3"
    place: object,
    // {
    //   "placeId": 1,
    //   "address": "고운뜰공원",
    //   "lat": 36.3663369,
    //   "lng": 127.2961423
    // }
    host: object,
    // {
    //   "memberId": 111,
    //   "name": "이경택",
    //   "nickname": "이경택",
    //   "memberDetail": {
    //     "memberId": 111,
    //     "statusMessage": "상태메시지1",
    //     "preferTime": "10:00~11:00",
    //     "userProfileImgUrl": "taek.png"
    //   }
    // }
    memberGatheringList: any,
    // [
    //   {
    //     "gatheringMemberId": 1,
    //     "gatheringId": 1,
    //     "memberId": 111,
    //     "member": {
    //       "memberId": 111,
    //       "name": "이경택",
    //       "nickname": "이경택",
    //       "memberDetail": {
    //         "memberId": 111,
    //         "statusMessage": "상태메시지1",
    //         "preferTime": "10:00~11:00",
    //         "userProfileImgUrl": "taek.png"
    //       }
    //     }
    //   }
    // ],
    completed: boolean
}

// ============ 상단 탭 관련 ====================================================
// 종목 탭
type TabAction = { type: 'AUTOMATCH' | 'LIST' };

interface TabState {
    tabType: string;
}

const initialTabState: TabState = {
    tabType: 'AUTOMATCH',
}

function registerTabType(state: TabState, action: TabAction) {
    switch (action.type) {
        case 'AUTOMATCH':
            return {
                ...state,
                tabType: 'AUTOMATCH'
            }
        case 'LIST':
            return {
                ...state,
                tabType: 'LIST'
            }
    }
}

// 거리 탭


// ======================= 목록 아이템 관련 =============================================
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
    sportType: useSelector((state: RootState) => {
        return state.matchSort.sports;
    })
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

// ========================= 상단 탭 ===================================================
// 자동 매치 탭
function AutoMatchTab({ clickedTab, changeType }: propsTab) {

    if (clickedTab === 'LIST') {
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div className="w-164 h-50 pt-15 pl-47 {solid} bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#000]" >
                    자동 매칭
                </span>
            </div>
        )
    }
    else {
        return (
            <div className="w-164 h-50 pt-15 pl-47 border-b-1 border-solid border-[#303eff] bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#303eff]">
                    자동 매칭
                </span>
            </div>
        )
    }
}

// 목록 텝
function ListTab({ clickedTab, changeType }: propsTab) {
    if (clickedTab === 'AUTOMATCH') {
        return (
            <div className="w-164 h-50 pt-15 pl-66 bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#000]">
                    목록
                </span>
            </div>
        )
    }
    else {
        return (
            <div className="w-164 h-50 pt-15 pl-66 border-b-1 border-solid border-[#303eff] bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#303eff]">
                    목록
                </span>
            </div>
        )
    }
}

// 내용 - 자동매칭인지 목록인지
function Content({ clickedTab }: { clickedTab: string }) {

    if (clickedTab === 'AUTOMATCH') {
        return (
            <div>
                <MatchFilterBar />
                <MatchContent />
            </div>
        )
    }
    else {
        return (
            <div>
                <ListFilterBar />
                <ListContent />
            </div>
        )
    }
}

// ================ 자동 매칭 관련 컴포넌트 =======================================================
// 자동 매칭 필터바
function MatchFilterBar() {
    // 종목 탭
    const [state, dispatch] = useReducer(registerSportType, initialSportTypeState)
    const isClicked = () => dispatch({ type: 'ISCLICKED' })
    const basketball = () => { sportChange("BASKETBALL"); dispatch({ type: '농구' }); }
    const footBall = () => { sportChange("footBall"); dispatch({ type: '축구' }); }
    const badminton = () => { sportChange("BADMINTON"); dispatch({ type: '배드민턴' }); }

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
        if (state.isClicked === true) {
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
        <div className="relative w-[360px] h-53 grow-0 m-0 pt-8 pl-16 bg-[#f1f3ff]">
            <div className={"w-40 h-40 grow-0 mr-11 pt-8 pl-8 border-solid border-[2.5px] rounded-20 " + sportIcon.border}
                onClick={(event) => {
                    event.preventDefault();
                    isClicked();
                }}>
                <img src={sportIcon.img} className="w-20 h-20 grow-0" />
            </div>
            {state.isClicked === true && <MatchFilterSport sportType={state.sportType} onChangeMode={(type) => {
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

// 자동 매칭 필터바 - 종목
function MatchFilterSport({ sportType, onChangeMode }: { sportType: string, onChangeMode: (type: string) => void }) {
    const basketballBorder = () => { return (sportType === 'BASKETBALL' ? "border-[#efad45]" : "border-[#fde9b4]") }
    const footBallBorder = () => { return (sportType === 'footBall' ? "border-[#9C8DD3]" : "border-[#d8caff]") }
    const badmintonBorder = () => { return (sportType === 'BADMINTON' ? "border-[#71D354]" : "border-[#c4ffb6]") }

    return (
        <div className="absolute top-61 left-6 w-60 h-[157px] m-0 pt-7 px-10 rounded-15 border-solid border-1 border-[#303EFF]/50 bg-[#f1f3ff] z-10">
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

// 자동 매칭 필터바 - 거리범위
function MatchFilterDistance({ shutOtherWindow, clicked }: { shutOtherWindow: () => void, clicked: () => void }) {
    const distance = useSelector((state: RootState) => {
        return String(state.matchSort.distance);
    })
    return (
        <div className="flex flex-row absolute top-15 left-67 w-70 h-25 flex-grow-0 pt-0 pr-6 pb-4 pl-9 rounded-5 bg-[#303eff]"
            onClick={(e) => {
                e.preventDefault();
                clicked();
                shutOtherWindow();
            }}>
            <span className="w-41 h-15 flex-grow mt-5 p-0 font-inter text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">{'~' + distance + 'km'}</span>
            <img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />
        </div>
    )
}


// 자동 매칭 필터바 - 날짜
function MatchFilterDate({ shutOtherWindow, clicked, date }: { shutOtherWindow: ()=> void, clicked: () => void, date: string }) {
    return (
        <div className="flex flex-row absolute top-15 left-[148px] w-74 h-25 flex-grow-0 pt-0 pl-9 pr-6 rounded-5 bg-[#303eff]" onClick={(e) => { e.preventDefault(); clicked(); shutOtherWindow(); }}>
            <span className="w-45 h-15 flex-grow mt-5 p-0 font-inter text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">{date}</span>
            <img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />

        </div>
    )
}

// 자동 매칭 필터바 - 시간
function MatchFilterTime({ shutOtherWindow, clicked }: { shutOtherWindow: ()=>void, clicked: ()=>void }) {
    return (
        <div className="flex flex-row absolute top-15 left-[233px] w-74 h-25 flex-grow-0 pt-0 pl-9 pr-6 rounded-5 bg-[#303eff]" onClick={(e)=>{ e.preventDefault(); clicked(); shutOtherWindow(); }}>
            <span className="w-43 h-15 flex-grow mt-5 p-0 font-inter text-12 font-[500] line-normal tracking-normal text-left text-[#fff]">18 ~ 22</span>
            <img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />

        </div>
    )
}

// 자동 매칭 필터바 - 기타
function MatchFilterEtc({ shutOtherWindow }: { shutOtherWindow: ()=>void }) {
    return (
        <div className="absolute top-15 left-[318px] w-25 h-25 flex-grow-0 pt-3 pl-3 rounded-5 bg-[#303eff]" onClick={(e)=>{ e.preventDefault(); shutOtherWindow(); }}>
            <img src={filterEtc} alt="" className="w-20 h-20 flex-grow-0" />
        </div>
    )
}

// 자동 매칭 내용
function MatchContent() {
    return (
        <div className="relative w-[360px] h-[575px] m-0 pt-8 pl-6 bg-[#fff]">
            <img src={matchButton} alt="" className="absolute top-[133px] left-[80px] w-[200px] h-[200px] " />
            <div className="absolute w-[124px] h-45 flex-grow-0 top-[360px] left-[118px] pt-11 pl-22 rounded-30 bg-[#303eff]">
                <span className="w-70 h-24 flex-grow-0 font-inter text-20 font-[500] text-left text-[#fff]">매칭 시작</span>
            </div>
        </div>
    )
}

// ================ 목록 관련 컴포넌트 =======================================================
// 목록 필터바
function ListFilterBar() {
    // 종목 탭
    const [sportState, dispatch] = useReducer(registerSportType, initialSportTypeState)
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
        <div className="relative w-[360px] h-93 grow-0 m-0 pt-8 pl-16 border-b-1 border-solid border-[#D8CAFF] bg-[#f1f3ff]">
            <div className={"w-40 h-40 grow-0 mr-11 pt-8 pl-8 border-solid border-[2.5px] rounded-20 " + sportIcon.border}
                onClick={(event) => {
                    event.preventDefault();
                    dispatchSport(setSortSports(sportState.sportType))
                    isClicked();
                }}>
                <img src={sportIcon.img} className="w-20 h-20 grow-0" />
            </div>
            {sportState.isClicked === true && <MatchFilterSport sportType={sportState.sportType} onChangeMode={(type) => {
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

// 목록 각 컴포넌트
function ListItem({ data }: { data: gatheringType }) {
    console.log(data);
    let sportImg;
    let sportColor;
    switch (data?.sports) {
        case "basketball":
            sportImg = basketballOriginal
            sportColor = 'bg-[#fde8b4]'
            break;
        case "football":
            sportImg = footBallOriginal
            sportColor = 'bg-[#d8caff]'
            break;
        case "badminton":
            sportImg = badmintonOriginal
            sportColor = 'bg-[#c4ffb6]'
            break;
    }

    return (
        <div className="relative w-[328px] h-120 flex-grow-0 my-10 mr-15 ml-17 pr-17 rounded-15 bg-[#fff] overflow-hidden">
            <div className={"absolute w-59 h-120 flex-grow-0 pt-51 text-center  mr-11 inline-block " + sportColor}>
                <span className="h-18 flex-grow-0 font-inter text-[15px] font-bold text-left text-[#000]">
                    {String(data.memberGatheringList.length) + '/' + data.people}
                </span>
            </div>
            <img src={sportImg} className="absolute w-20 h-20 flex-grow-0 top-17 left-70 p-0 inline-block " />
            <span className="absolute w-130 h-18 flex-grow-0 top-18 left-[101px] font-inter text-[15px] font-bold test-left inline-block text-[#000]">{data?.title}</span>
            <div className="absolute w-1 h-105 flex-grow-0 top-8 left-[259px] bg-[#d9d9d9]"></div>
            <span className="absolute w-40 h-37 flex-grow-0 top-41 left-[276px] font-inter text-[13px] text-left font-[#000]">
                {data?.startDate.slice(5)}
                <br></br>
                {data?.startTime.slice(0, 5)}
            </span>
        </div>
    )
}

// 목록 전체 내용
function ListContent() {
    const dummyData : matchList = ({
        startDate: "2023-02-15",
        lat: 36.3663369,
        lng: 127.2961423,
        distance: 100,
        minStartTime: "01:00:00",
        maxStartTime: "23:00:00",
        level: "중수",
        minPlayTime: 1,
        maxPlayTime: 23,
        sex: "남성",
        sports: "basketball",
        gameType: "3대3",
        sort: "distance",
    })
    const gatheringListQuery = useGatheringListQuery(dummyData);
    console.log(gatheringListQuery)

    const listItems = () => {
        if (gatheringListQuery.isSuccess) {
            console.log('success ' + gatheringListQuery)
            if (gatheringListQuery.data) {
                const gatheringList = gatheringListQuery.data.map((eachData: gatheringType, i: number) => <ListItem key={i} data={eachData} />)
                return (
                    <div>{gatheringList}</div>
                )
            } 
            else {
                return (
                    <div>
                        해당 모임이 존재하기 않습니다.
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    로딩중
                </div>
            )
        }
    }

    return (
        <div className="flex flex-col w-360px h-full m-0 pt-10 bg=[#f5f5f5]">
            {gatheringListQuery.isSuccess && listItems()}
        </div>
    )
}

// 상세 목록

// 매치 페이지 출력
export default function MatchPage() {

    const [state, dispatch] = useReducer(registerTabType, initialTabState);

    const autoMatch = () => dispatch({ type: 'AUTOMATCH' });
    const list = () => dispatch({ type: 'LIST' });

    return (
        <div className="h-auto bg-[#f5f5f5] m-0 pt-12">
            <div className="w-full h-50 px-16 py-0 grow-0 bg-[#fff] rounded-t-lg flex">
                <AutoMatchTab clickedTab={state.tabType} changeType={() => {
                    autoMatch();
                }} />
                <ListTab clickedTab={state.tabType} changeType={() => {
                    list();
                }} />
            </div>
            <Content clickedTab={state.tabType} />
        </div>
    )
}