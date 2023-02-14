import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import 'react-calendar/dist/Calendar.css'
import { RootState } from "@/stores/store";

import { team } from "@/models/team";
import { AutoMatchTab, ListTab } from "@/components/TeamMatch/TeamMatchTab"
import TeamMatchMyTeamInfo from "@/components/TeamMatch/TeamMatchMyTeamInfo"
import useTeamMatchListQuery from "@/hooks/teamMatch/useTeamMatchListQuery";
import useTeamListQuery from "@/hooks/team/useTeamListQuery";

import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"
import matchButton from "@/assets/icons/personal-match-button.png"
import TeamMatchFilterBar from "@/components/TeamMatch/TeamMatchFilterBar";
import { teamMatchList } from "@/models/teamMatchList";

// ============ 기타 타입 =================================================
// 자동 매칭, 목록 선택 탭
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

interface teamMatchListType {
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
    memberGatheringList: [],
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
type attrType = "matchDate" | "location" | "distance" | "startTime" | "sports" | "gameType" | "sort"
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
// ========================= 상단 탭 ===================================================
// 자동 매칭 내용
function MatchContent() {
    return (
        <div className="flex flex-col place-items-center w-full h-full m-0 py-[30%] bg-[#fff]">
            <img src={matchButton} alt="" className="w-[200px] h-[200px] " />
            <div className="grid place-content-center w-124 h-45 mt-[5%] flex-grow-0 rounded-30 bg-[#303eff]">
                <span className="w-90 h-28 flex-grow-0  text-20 font-[500] text-center text-[#fff]">매칭 시작</span>
            </div>
        </div>
    )
}
// 목록 각 컴포넌트
function ListItem({ data }: { data: any }) {
    console.log('리스트데이터', data);
    let teamImg;
    
    return (
        <div className="flex w-full h-114 flex-grow-0 p-10 rounded-15 bg-[#fff]">
            <div className="flex flex-col items-center justify-center w-1/4 h-full">
                <span>{data.host.sports}</span>
            </div>
            <div className="flex flex-col justify-center w-1/2 h-full">
                <span className="flex-grow-0 font-inter text-[17px] font-normal text-left text-[#000]">{data.host.name}</span>
                <span className="flex-grow-0 font-inter text-[17px] font-bold text-left text-[#000]">{data.preferredPlace.address}</span>
            </div>
            <div className="flex flex-col items-center justify-between w-1/4 h-full my-5">
                <span className="w-55 border-b-1 border-solid border-[#000] font-inter text-[12px] text-center">{data.matchDate}</span>
            </div>
        </div>
    )
}
// 목록 전체 내용
function ListContent({filterData}: {filterData:teamMatchList}) {
    const teamMatchListQuery = useTeamMatchListQuery(filterData);
    // console.log('teamMatchListQuery', teamMatchListQuery);

    const listItems = () => {
        if (teamMatchListQuery.isSuccess) {
            console.log('success ' + teamMatchListQuery)
            if (teamMatchListQuery.data) {
                const gatheringList = teamMatchListQuery.data.map((eachData: teamMatchListType, i: number) => <ListItem key={i} data={eachData} />)
                return (
                    <div className="w-full p-15">{gatheringList}</div>
                )
            } else {
                return (
                    <div>
                        해당 모임이 존재하지 않습니다.
                    </div>
                )
            }
        } else {
            return (
                <div>
                    로딩중
                </div>
            )
        }
    }
    useEffect(() => {

    }, [teamMatchListQuery.isSuccess])
    return (
        <div className="flex flex-col items-center w-full h-full m-0 pt-10 border-t-1 border-solid border-[#D8CAFF] bg-[#f5f5f5]">
            {listItems()}
        </div>
    )
}
// 상세 목록
// 매치 페이지 출력
export default function TeamMatchPage() {
    const [state, dispatch] = useReducer(registerTabType, initialTabState);
    // 내팀 데이터 불러오기
    const userId = useSelector((state: RootState) => {
        return state.userId;
    });
    const myTeamList = useTeamListQuery(userId);
    const [myTeamIndex, setMyTeamIndex] = useState<number>(0);

    const temSports = ()=>{
        if (myTeamList.data) {
            return myTeamList.data[myTeamIndex].team.sports;
        } else {
            return "농구";
        }
    }
    const temGameType = ()=>{
        if (myTeamList.data) {
            return myTeamList.data[myTeamIndex].team.gameType;
        } else {
            return "3vs3";
        }
    }
    const [matchDate, setMatchDate] = useState<string>("2023-02-14");
    const [location, setLocation] = useState<number[]>([36.3563369, 127.2991423]);
    const [distance, setDistance] = useState<number>(0);
    const [startTime, setStartTime] = useState<string[]>(["00:00:00", "24:00:00"]);
    const [sports, setSports] = useState<string>(temSports());
    const [gameType, setGameType] = useState<string>(temGameType());
    const [sort, setSort] = useState<string>("distance");

    const [searchingData, setSearchingData] = useState<string>("")

    const filterData: teamMatchList = {
        matchDate: matchDate,
        lat: location[0],
        lng: location[1],
        distance: distance,
        minStartTime: startTime[0],
        maxStartTime: startTime[1],
        sports: sports,
        gameType: gameType,
        sort: sort,
    }

    console.log('?', filterData)
    const setFilterData = (attr: attrType, value: any) => {
        switch (attr) {
            case "matchDate": setMatchDate(value); break;
            case "location": setLocation(value); break;
            case "distance": setDistance(value); break;
            case "startTime": setStartTime(value); break;
            case "sports": setSports(value); break;
            case "gameType": setGameType(value); break;
            case "sort": setSort(value); break;
        }
    }

    const autoMatch = () => dispatch({ type: 'AUTOMATCH' });
    const list = () => dispatch({ type: 'LIST' });
    const content = () => {
        if (state.tabType === 'AUTOMATCH') {
            return (<MatchContent />)
        } else {
            return (<ListContent filterData={filterData}/>)
        }
    }
    return (
        <div className="flex flex-col h-auto w-full bg-[#f5f5f5] m-0">
            <div className="h-[20%] w-full m-0 p-0">
                <Swiper
                slidesPerView={1.1}
                centeredSlides={true}
                spaceBetween={0}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                onActiveIndexChange={(e) => { setMyTeamIndex(e.activeIndex); console.log('activeIndex', e.activeIndex) }}
                >
                    {myTeamList.data && myTeamList.data.map((item: team, index: number)=>
                        <SwiperSlide key={index}>
                        <div className="flex w-full h-100 ml-[-10px] p-10">
                            <TeamMatchMyTeamInfo myTeamData={item} />
                        {/* <MyTeamInfo rank={myTeamInfo.data.myTeamRank} teamRanking={item} /> */}
                        </div>
                    </SwiperSlide>
                    )}
                    {/* <span slot="wrapper-start">Wrapper Start</span> */}
                </Swiper>
            </div>
            <div className="flex flex-col items-center h-[80%] w-full m-0 p-0">
                <div className="flex justify-center w-full h-[10%] px-16 py-0 grow-0 bg-[#fff] rounded-t-lg">
                    <AutoMatchTab clickedTab={state.tabType} changeType={() => { autoMatch(); }} />
                    <ListTab clickedTab={state.tabType} changeType={() => { list(); }} />
                </div>
                <TeamMatchFilterBar setFilterData={(attr: attrType, value: any)=>setFilterData(attr, value)} tabState={state.tabType} matchDate={matchDate} location={location} distance={distance} startTime={startTime} sports={sports} gameType={gameType} sort={sort}/>
                <div className="w-full h-auto">
                    {content()}
                </div>
            </div>
        </div>
    )
}