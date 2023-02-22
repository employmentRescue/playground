import { useState, useEffect, useReducer, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom"
import SwiperCore from 'swiper'; // 타입지정을 위해 필요하다.
import { useDispatch, useSelector } from "react-redux";
import 'react-calendar/dist/Calendar.css'
import { RootState } from "@/stores/store";
import dayjs from "dayjs";

import { team } from "@/models/team";
import { AutoMatchTab, ListTab } from "@/components/TeamMatch/TeamMatchTab"
import TeamMatchMyTeamInfo from "@/components/TeamMatch/TeamMatchMyTeamInfo"
import useTeamMatchListQuery from "@/hooks/teamMatch/useTeamMatchListQuery";
import useTeamMatchRequestQuery from "@/hooks/teamMatch/useTeamMatchRequestQuery";
import useTeamMatchCancelQuery from "@/hooks/teamMatch/useTeamMatchCancelQuery";
import useTeamListQuery from "@/hooks/team/useTeamListQuery";

import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"
import matchButton from "@/assets/icons/personal-match-button.png"
import TeamMatchFilterBar from "@/components/TeamMatch/TeamMatchFilterBar";
import { teamMatchList } from "@/models/teamMatchList";
import { getImgUrl } from "@/utils/getImgUrl";
import { setTabName } from "@/stores/tab/tabName";

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
type matchOnOff = "매칭 시작" | "매칭 취소"
interface matchRequestData {
    distance: number,
    gameType: string,
    lat: number,
    lng: number,
    matchDate: string,
    maxStartTime: string,
    memberId: number,
    minStartTime: string,
    registerTime: string,
    sports: string,
    teamId: number
}

function MatchContent({ matchRequestData }: { matchRequestData: matchRequestData }) {
    const [matchStatus, setMatchStatus] = useState<matchOnOff>("매칭 시작")
    const useTeamMatchRequest = useTeamMatchRequestQuery()
    const useTeamMatchCancel = useTeamMatchCancelQuery()

    const handleClicked = () => {
        if (matchStatus === "매칭 시작") {
            setMatchStatus("매칭 취소")
            console.log(matchRequestData);
            useTeamMatchRequest.mutate(matchRequestData)
        } else {
            setMatchStatus("매칭 시작")
            useTeamMatchCancel.mutate(matchRequestData.teamId)
        }
    }
    const matchStatusColor = () => {
        if (matchStatus === '매칭 시작') {
            return "bg-[#303eff]"
        } else {
            return "bg-[#FF2323]"
        }
    }

    return (
        <div className="flex flex-col place-items-center w-full h-full m-0 py-[30%] bg-[#fff]">
            <div className={matchStatus === '매칭 시작' ? "absolute ml-auto mr-auto mt-auto mb-auto w-[210px] h-[210px] rounded-50" : "absolute ml-auto mr-auto mt-auto mb-auto w-[200px] h-[200px] rounded-[50%] border-t-blue-700 border-t-5 border-b-blue-200 border-b-5 border-l-blue-200 border-r-blue-200 border-r-5 border-l-5 animate-spin"}></div>
            <img src={matchButton} alt="" className={matchStatus === '매칭 시작' ? "w-[200px] h-[200px]" : "w-[200px] h-[200px] animate-pulse"} />
            <div className={"grid place-content-center w-124 h-45 mt-[5%] flex-grow-0 rounded-30 " + matchStatusColor()} onClick={(e) => { e.preventDefault(); handleClicked(); }}>
                <span className="w-90 h-28 flex-grow-0 text-20 font-[500] text-center text-[#fff]">{matchStatus}</span>
            </div>
        </div>
    )
}
// 목록 각 컴포넌트
function ListItem({ data }: { data: any }) {
    // console.log('리스트데이터', data);
    let teamImg;
    console.log('data', data)

    return (
        <Link to={"join/" + data.matchId} className="flex w-[90%] h-114 flex-grow-0 mx-10 p-10 my-10 rounded-15 bg-[#fff]">
            <div className="flex flex-col items-center justify-center w-1/4 h-full">
                <img className="w-60 h-60 rounded-[50%]" src={getImgUrl('profiles/team', data.host.teamId)} onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = getImgUrl('profiles/team', 'default_team')
                }} />
            </div>
            <div className="flex flex-col justify-center w-1/2 h-full ml-10">
                <span className="flex-grow-0 font-inter text-[17px] font-normal text-left text-[#000]">{data.host.name}</span>
                <span className="flex-grow-0 font-inter text-[17px] font-bold text-left text-[#000]">{data.preferredPlace.address}</span>
            </div>
            <div className="flex flex-col items-center justify-between w-1/4 h-full my-5">
                <span className="w-55 border-b-1 border-solid border-[#000] font-inter text-[12px] text-center">{data.matchDate}</span>
            </div>
        </Link>
    )
}
// 목록 전체 내용

// 상세 목록
// 매치 페이지 출력
export default function TeamMatchPage() {
    const [state, dispatch] = useReducer(registerTabType, initialTabState);
    // 내팀 데이터 불러오기
    const userId = useSelector((state: RootState) => {
        // console.log('userId', state.userId.id)
        return state.userId.id;
    });
    // const userId = 0

    const myTeamList = useTeamListQuery(userId);
    console.log(myTeamList)
    const [myTeamIndex, setMyTeamIndex] = useState<number>(0);
    const [matchDate, setMatchDate] = useState<string>(dayjs(new Date()).format('YYYY-MM-DD'));
    const [location, setLocation] = useState<number[]>([36.3563369, 127.2991423]);
    const [distance, setDistance] = useState<number>(0);
    const [startTime, setStartTime] = useState<string[]>(["00:00:00", "24:00:00"]);
    const [sports, setSports] = useState<string>('농구');
    const [gameType, setGameType] = useState<string>('3vs3');
    const [sort, setSort] = useState<string>("distance");
    const [currentTeamId, setCurrentTeamId] = useState<number>(1);
    // useEffect 로 슬라이더 변경시 불러오기용
    const [sliderIndex, setSliderIndex] = useState(0);
    // console.log('myTeamList', myTeamList)

    useEffect(() => {
        if (myTeamList.data != null) {
            console.log(myTeamList.data)
            setSports(myTeamList.data[myTeamIndex]?.team.sports);
            setGameType(myTeamList.data[myTeamIndex]?.team.gameType)
            setCurrentTeamId(myTeamList.data[myTeamIndex]?.team.teamId);
        }

    }, [myTeamList.isSuccess, sliderIndex])


    const [searchingData, setSearchingData] = useState<string>("");

    const teamMatchListQuery = useTeamMatchListQuery(matchDate, location[0], location[1], distance, startTime[0], startTime[1], sports, gameType, sort);

    console.log(teamMatchListQuery);
    const matchRequestData: matchRequestData = {
        distance: distance,
        gameType: gameType,
        lat: location[0],
        lng: location[1],
        matchDate: matchDate,
        maxStartTime: startTime[1],
        memberId: userId,
        minStartTime: startTime[0],
        registerTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        sports: sports,
        teamId: currentTeamId,
    }

    // console.log('filterData', filterData())
    const setFilterData = (attr: attrType, value: any) => {
        switch (attr) {
            case "matchDate": setMatchDate(value); console.log(teamMatchListQuery); break;
            case "location": setLocation(value); console.log(teamMatchListQuery); break;
            case "distance": setDistance(value); console.log(teamMatchListQuery); break;
            case "startTime": setStartTime(value); console.log(teamMatchListQuery); break;
            case "sports": setSports(value); break;
            case "gameType": setGameType(value); break;
            case "sort": setSort(value); break;
        }
    }

    useEffect(() => {
        listItems();
        // console.log('팀매치리스트', teamMatchListQuery)
    }, [sliderIndex, teamMatchListQuery.isSuccess, matchDate, location, distance, startTime, sports, gameType, sort])

    const autoMatch = () => dispatch({ type: 'AUTOMATCH' });
    const list = () => dispatch({ type: 'LIST' });

    const listItems = () => {
        if (teamMatchListQuery.isSuccess) {
            if (teamMatchListQuery.data) {
                return (
                    <div className="flex flex-col items-center w-full h-full m-0">{teamMatchListQuery.data.map((eachData: teamMatchListType, i: number) => <ListItem key={i} data={eachData} />)}</div>
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

    const content = () => {
        if (state.tabType === 'AUTOMATCH') {
            return (<MatchContent matchRequestData={matchRequestData} />)
        } else {
            return (listItems())
        }
    }
    // console.log('myteam data', myTeamList.data, Boolean(myTeamList.data))

    const navigate = useNavigate();
    const toTeamCreate = (translateNum: number) => {
        if (translateNum > 100) {
            navigate("/menu/team/create");
        }
    }

    const dispatch2 = useDispatch();

    useEffect(() => {
        dispatch2(setTabName('playGround'))
    }, [])


    return (
        <div className="flex flex-col h-auto w-full bg-[#f5f5f5] m-0">
            <div className="h-[20%] w-full m-0 p-0">
                {!(myTeamList.data?.length) && <Link to="/menu/team/create" className="flex w-full h-100 p-10">
                    <div className="flex justify-center items-center w-full h-full ml-0 p-0 bg-[#ffffff] rounded-5">
                        <span className="mx-10 font-inter text-[30px] text-left text-[#000]">+</span>
                        <span className=" h-18 font-inter text-[15px] text-left text-[#000]">새로운 팀을 생성해 주세요</span>
                    </div>
                </Link>}
                <Swiper
                    slidesPerView={1.1}
                    centeredSlides={true}
                    spaceBetween={0}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    onActiveIndexChange={(e) => { setMyTeamIndex(e.activeIndex); console.log('activeIndex', e.activeIndex) }}
                    initialSlide={0}
                    onSlideResetTransitionStart={(swiper) => toTeamCreate(swiper.getTranslate())}
                    onSlideChange={(swiper) => { setSliderIndex(swiper.activeIndex); }}
                >
                    {myTeamList.data && myTeamList.data.map((item: team, index: number) =>
                        <SwiperSlide key={index}>
                            <div className="flex w-full h-100 ml-[-10px] p-10">
                                <TeamMatchMyTeamInfo myTeamData={item} index={index} />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
            <div className="flex flex-col items-center h-[80%] w-full m-0 p-0">
                <div className="flex justify-center w-full h-[10%] px-16 py-0 grow-0 bg-[#fff] rounded-t-lg">
                    <AutoMatchTab clickedTab={state.tabType} changeType={() => { autoMatch(); }} />
                    <ListTab clickedTab={state.tabType} changeType={() => { list(); }} />
                </div>
                <TeamMatchFilterBar setFilterData={(attr: attrType, value: any) => setFilterData(attr, value)} tabState={state.tabType} matchDate={matchDate} location={location} distance={distance} startTime={startTime} sports={sports} gameType={gameType} sort={sort} />
                <div className="w-full h-auto">
                    {content()}
                </div>
            </div>
        </div>
    )
}