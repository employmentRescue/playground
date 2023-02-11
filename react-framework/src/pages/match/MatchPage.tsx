import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import 'react-calendar/dist/Calendar.css'

import { MatchFilterBar } from "@/components/Match/MatchFilterBar"

import useGatheringListQuery from "@/hooks/match/useGatheringListQuery";
import { RootState } from "@/stores/store";
import { useDispatch, useSelector } from "react-redux";


import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"
import matchButton from "@/assets/icons/personal-match-button.png"
import { matchList } from "@/models/matchList";

// ============ 기타 타입 =================================================
// 자동 매칭, 목록 선택 탭

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

type attrType = "startDate" | "location" | "distance" | "startTime" | "level" | "playTime" | "sex" | "sports" | "gameType" | "sort" 

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


// 매치 페이지 출력
export default function MatchPage() {

    // const filterData = useSelector((state: RootState) => {
    //     return state.matchSort;
    // })
    const [ startDate, setStartDate ] = useState(useSelector((state: RootState) => {return state.matchSort.startDate;}))
    const [ location, setLocation ] = useState(useSelector((state: RootState) => {return [state.matchSort.lat, state.matchSort.lng];}))
    const [ distance, setDistance ] = useState(useSelector((state: RootState) => {return state.matchSort.distance;}))
    const [ startTime, setStartTime ] = useState(useSelector((state: RootState) => {return [state.matchSort.minStartTime, state.matchSort.maxStartTime];}))
    const [ level, setLevel ] = useState(useSelector((state: RootState) => {return state.matchSort.level;}))
    const [ playTime, setPlayTime ] = useState(useSelector((state: RootState) => {return [state.matchSort.minPlayTime, state.matchSort.maxPlayTime];}))
    const [ sex, setSex ] = useState(useSelector((state: RootState) => {return state.matchSort.sex;}))
    const [ sports, setSports ] = useState(useSelector((state: RootState) => {return state.matchSort.sports;}))
    const [ gameType, setGameType ] = useState(useSelector((state: RootState) => {return state.matchSort.gameType;}))
    const [ sort, setSort ] = useState(useSelector((state: RootState) => {return state.matchSort.sort;}))

    const setFilterData = (attr: attrType, value: any) => {
        switch (attr) {
            case "startDate": setStartDate(value); break;
            case "location": setLocation(value); break;
            case "distance": setDistance(value); break;
            case "startTime": setStartTime(value); console.log('hi'); break;
            case "level": setLevel(value); break;
            case "playTime": setPlayTime(value); break;
            case "sex": setSex(value); break;
            case "sports": setSports(value); break;
            case "gameType": setGameType(value); break;
            case "sort": setSort(value); break;
        }
    }
    
    const filterData = {
        startDate: startDate,
        lat: location[0],
        lng: location[1],
        distance: distance,
        minStartTime: startTime[0],
        maxStartTime: startTime[1],
        level: level,
        minPlayTime: playTime[0],
        maxPlayTime: playTime[1],
        sex: sex,
        sports: sports,
        gameType: gameType,
        sort: sort,
    }

    const gatheringListQuery = useGatheringListQuery(filterData);
    console.log(gatheringListQuery)
    console.log(filterData)
    console.log(typeof(filterData))

    
    const listItems = () => {
        if (gatheringListQuery.isSuccess) {
            console.log('success ' + gatheringListQuery)
            if (gatheringListQuery.data) {
                const gatheringList = gatheringListQuery.data.map((eachData: gatheringType, i: number) => <ListItem key={i} data={eachData}/>)
                return (
                    <div>{gatheringList}</div>
                )
            } 
            else {
                return (
                    <div>
                        해당 모임이 존재하지 않습니다.
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

    useEffect(()=>{
        
    },[gatheringListQuery.isSuccess])

    return (
        <div className="h-auto w-full bg-[#f5f5f5] m-0 pt-12">
            <MatchFilterBar setFilterData={(attr: attrType, value: any) => setFilterData(attr, value)} startDate={startDate} location={location} distance={distance} startTime={startTime} level={level} playTime={playTime} sex={sex} sports={sports} gameType={gameType} sort={sort} />
            <div className="flex flex-col w-full h-full m-0 pt-10 border-t-1 border-solid border-[#D8CAFF] bg=[#f5f5f5]">
                {listItems()}
            </div>
        </div>
    )
}       