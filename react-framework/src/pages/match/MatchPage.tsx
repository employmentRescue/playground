import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import 'react-calendar/dist/Calendar.css'

import MatchFilterBar from "@/components/Match/MatchFilterBar"

import useGatheringListQuery from "@/hooks/match/useGatheringListQuery";
import { RootState } from "@/stores/store";
import { setSortDate, setSortLocation, setSortDistance, setSortStartTime, setSortlevel, setSortPlayTime, setSortSex, setSortSports, setSortGameType, setSortSort, } from "@/stores/match/matchSort";

import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"

import { matchList } from "@/models/matchList";
import useGatheringSearchQuery from "@/hooks/match/useGatheringSearchQuery";
import { setTabName } from "@/stores/tab/tabName";


// ============ 기타 타입 =================================================
interface place {
    placeId: number,
    address: string,
    lat: number,
    lng: number
}
interface memberDetail {
    memberId: number,
    statusMessage: string,
    preferTime: string,
    userProfileImgUrl: string
}
interface host {
    memberId: number,
    name: string,
    nickname: string,
    memberDetail: memberDetail
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
    place: place,
    // {
    //   "placeId": 1,
    //   "address": "고운뜰공원",
    //   "lat": 36.3663369,
    //   "lng": 127.2961423
    // }
    host: host,
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
    // console.log(data);
    let sportImg;
    let sportColor;
    switch (data?.sports) {
        case "농구":
            sportImg = basketballOriginal;
            sportColor = 'bg-[#fde8b4]';
            break;
        case "축구":
            sportImg = footBallOriginal;
            sportColor = 'bg-[#d8caff]';
            break;
        case "배드민턴":
            sportImg = badmintonOriginal;
            sportColor = 'bg-[#c4ffb6]';
            break;
    }
    return (
        <Link to={"detail/" + data.gatheringId} className="flex w-9/10 h-120 flex-grow-0 my-10 mx-17 rounded-15 bg-[#fff] overflow-hidden">
            <div className={"w-1/6 h-120 flex-grow-0 pt-51 text-center " + sportColor}>
                <span className="h-18 flex-grow-0 font-inter text-[15px] font-bold text-left text-[#000]">
                    {String(data.memberGatheringList.length) + '/' + data.people}
                </span>
            </div>
            <div className="w-5/6 flex">
                <div className="w-3/4">
                    <div className="flex h-1/2 items-center">
                        <img src={sportImg} className="w-20 h-20 flex-grow-0 mx-11 my-17 p-0" />
                        <span className="w-130 h-18 flex-grow-0 font-inter text-[15px] font-bold test-left text-[#000]">{data?.title}</span>
                    </div>
                    <div className="grid items-center h-1/2 ml-42 py-10">
                        <span className="flex-grow-0 font-inter text-[13px] font-normal test-left text-[#000]">{data?.place.address.split(' ').splice(-1)[0]}</span>
                        <span className="flex-grow-0 font-inter text-[13px] font-normal test-left text-[#717070]">{data?.sex + "·" + data?.gameType + "·" + data?.level}</span>
                    </div>
                </div>
                <div className="grid justify-center items-center w-1/4 my-7 border-l-1 border-solid border-[#d9d9d9]">
                    <span className=" w-40 h-37 flex-grow-0 font-inter text-[13px] text-left font-[#000]">
                        {data?.startDate.slice(5)}
                        <br></br>
                        {data?.startTime.slice(0, 5)}
                    </span>
                </div>
            </div>
        </Link>
    )
}

// 매치 페이지 출력
export default function MatchPage() {
    const [startDate, setStartDate] = useState(useSelector((state: RootState) => { return state.matchSort.startDate; }))
    const [location, setLocation] = useState(useSelector((state: RootState) => { return [state.matchSort.lat, state.matchSort.lng]; }))
    const [distance, setDistance] = useState(useSelector((state: RootState) => { return state.matchSort.distance; }))
    const [startTime, setStartTime] = useState(useSelector((state: RootState) => { return [state.matchSort.minStartTime, state.matchSort.maxStartTime]; }))
    const [level, setLevel] = useState(useSelector((state: RootState) => { return state.matchSort.level; }))
    const [playTime, setPlayTime] = useState(useSelector((state: RootState) => { return [state.matchSort.minPlayTime, state.matchSort.maxPlayTime]; }))
    const [sex, setSex] = useState(useSelector((state: RootState) => { return state.matchSort.sex; }))
    const [sports, setSports] = useState(useSelector((state: RootState) => { return state.matchSort.sports; }))
    const [gameType, setGameType] = useState(useSelector((state: RootState) => { return state.matchSort.gameType; }))
    const [sort, setSort] = useState(useSelector((state: RootState) => { return state.matchSort.sort; }))

    const [searchingData, setSearchingData] = useState<string>("")
    // const gatheringSearchQuery = useGatheringSearchQuery(searchingData)
    // const [gatheringList, setGatheringList] = useState(<div></div>)

    const filterData: matchList = {
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
    console.log('개인 요청데이터', filterData)
    console.log(gatheringListQuery)
    // console.log(typeof(filterData))
    const filterDataDispatch = useDispatch()

    const setFilterData = (attr: attrType, value: any) => {
        switch (attr) {
            case "startDate": setStartDate(value); filterDataDispatch(setSortDate(value)); break;
            case "location": setLocation(value); filterDataDispatch(setSortLocation(value)); break;
            case "distance": setDistance(value); filterDataDispatch(setSortDistance(value)); break;
            case "startTime": setStartTime(value); filterDataDispatch(setSortStartTime(value)); break;
            case "level": setLevel(value); filterDataDispatch(setSortlevel(value)); break;
            case "playTime": setPlayTime(value); filterDataDispatch(setSortPlayTime(value)); break;
            case "sex": setSex(value); filterDataDispatch(setSortSex(value)); break;
            case "sports": setSports(value); filterDataDispatch(setSortSports(value)); break;
            case "gameType": setGameType(value); filterDataDispatch(setSortGameType(value)); break;
            case "sort": setSort(value); filterDataDispatch(setSortSort(value)); break;
        }
    }
    const listItems = () => {
        if (gatheringListQuery.isSuccess) {
            console.log('success ' + gatheringListQuery)
            if (gatheringListQuery.data) {
                // console.log(gatheringListQuery.data[0].title)
                // console.log(gatheringListQuery.data[0].title.includes("농구"))
                return gatheringListQuery.data.map((eachData: gatheringType, i: number) => eachData.title.includes(searchingData) && <ListItem key={i} data={eachData} />)
                // const gatheringList = gatheringListQuery.data.map((eachData: gatheringType, i: number)=><ListItem key={i} data={eachData}/>)
            } else { return (<div>해당 모임이 존재하지 않습니다.</div>) }
        } else {
            return (<div>로딩중</div>)
        }
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTabName('playGround'))
    }, [])
    return (
        <div className="h-auto w-full bg-[#f5f5f5] m-0 pt-12">
            <MatchFilterBar setFilterData={(attr: attrType, value: any) => setFilterData(attr, value)} setSearchingData={(value: string) => { setSearchingData(value) }} startDate={startDate} location={location} distance={distance} startTime={startTime} level={level} playTime={playTime} sex={sex} sports={sports} gameType={gameType} sort={sort} />
            <div className="flex flex-col w-full h-full m-0 pt-10 border-t-1 border-solid border-[#D8CAFF] bg=[#f5f5f5]">
                {listItems()}
            </div>
            <div className="fixed bottom-70 right-15 rounded-50 w-45 h-45 bg-blue-700 text-white text-45 flex justify-center items-center"
                onClick={() => navigate('/gather/register')}>+</div>
        </div>
    )
}       