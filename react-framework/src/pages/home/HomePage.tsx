import { useState, useEffect, useRef } from "react"
import { useReducer } from "react"
import useGeolocation from "react-hook-geolocation"
import RegisterModal from "@/components/LiveModal/RegisterModal"
import JoinModal from "@/components/LiveModal/JoinModal"
import basketballMap from "@/assets/icons/basketball-map.png"
import basketballIcon from "@/assets/icons/basketball-original.png"
import footballMap from "@/assets/icons/football-map.png"
import footballIcon from "@/assets/icons/football-original.png"
import badmintonMap from "@/assets/icons/badminton-map.png"
import badmintonIcon from "@/assets/icons/badminton-original.png"
import currentPos from "@/assets/icons/current-position.png"
import ModifyModal from "@/components/LiveModal/ModifyModal"
import QuitModal from "@/components/LiveModal/QuitModal"
import useLiveMatchListQuery from "@/hooks/liveMatch/useLiveMatchListQuery"
import { liveMatch } from "@/models/liveMatch"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";
import MatchSlide from "@/components/Match/MatchSlide"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/stores/store"
import usePromisedMatchListQuery from "@/hooks/match/usePromisedMatchListQuery"
import { match } from "@/models/match"
import { setTabName } from "@/stores/tab/tabName"


type Action = { type: 'ISPRESSED' | 'BASKETBALL' | 'FOOTBALL' | 'BADMINTON' | 'JOIN' | 'QUIT' | 'REGISTER' | 'MODIFY' | 'NONE' | 'DEFAULT' };

interface State {
    isPressed: boolean;
    sportType: string;
    modalType: string;
}

const initialState: State = {
    isPressed: false,
    sportType: 'default',
    modalType: 'none',
}

function registReducer(state: State, action: Action) {
    switch (action.type) {
        case 'ISPRESSED':
            return {
                ...state,
                isPressed: !state.isPressed
            }
        case 'BASKETBALL':
            return {
                ...state,
                sportType: '농구'
            }
        case 'FOOTBALL':
            return {
                ...state,
                sportType: '축구'
            }
        case 'BADMINTON':
            return {
                ...state,
                sportType: '배드민턴'
            }
        case 'DEFAULT':
            return {
                ...state,
                sportType: 'default'
            }
        case 'JOIN':
            return {
                ...state,
                modalType: 'join'
            }
        case 'REGISTER':
            return {
                ...state,
                modalType: 'register'
            }
        case 'MODIFY':
            return {
                ...state,
                modalType: 'modify'
            }
        case 'QUIT':
            return {
                ...state,
                modalType: 'quit'
            }
        case 'NONE':
            return {
                ...state,
                modalType: 'none'
            }
        default:
            throw new Error('Unhandled action');
    }
}
export default function HomePage() {
    // Regist Reducer
    const [state, dispatch] = useReducer(registReducer, initialState);
    const onPressed = () => dispatch({ type: 'ISPRESSED' });
    const basketball = () => dispatch({ type: 'BASKETBALL' });
    const football = () => dispatch({ type: 'FOOTBALL' });
    const badminton = () => dispatch({ type: 'BADMINTON' });
    const defaultSportType = () => dispatch({ type: 'DEFAULT' });
    const joinMeeting = () => dispatch({ type: 'JOIN' });
    const registerMeeting = () => dispatch({ type: 'REGISTER' });
    const modifyMeeting = () => dispatch({ type: 'MODIFY' });
    const quitMetting = () => dispatch({ type: 'QUIT' });
    const closeModal = () => dispatch({ type: 'NONE' });

    // other state
    const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
    const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);
    const [markers, setMarkers] = useState<naver.maps.Marker[] | null>([]);
    const [liveMatch, setLiveMatch] = useState<liveMatch | null>(null);
    const [markerPos, setMarkerPos] = useState<any | null>(null);

    // naver map
    const mapElement: any | null = useRef(undefined);

    // initial call
    const geolocation = useGeolocation();
    const liveMatchList = useLiveMatchListQuery(geolocation.latitude, geolocation.longitude);
    const userId = useSelector((state: RootState) => {
        return state.userId;
    });
    const promisedMatchList = usePromisedMatchListQuery(userId);
    const dispatchTab = useDispatch();
    console.log("userId", userId)
    console.log("promisedMatchList", promisedMatchList);
    console.log("liveMatchList", liveMatchList);

    function setMapIcon(icon: string, location: naver.maps.LatLng, map: naver.maps.Map, sizeX: number, sizeY: number, isBounce: boolean) {
        return new naver.maps.Marker({
            position: location,
            map,
            icon: {
                url: icon,
                size: new naver.maps.Size(sizeX, sizeY),
                scaledSize: new naver.maps.Size(sizeX, sizeY),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(sizeX / 2, sizeY),
            },
            animation: isBounce ? naver.maps.Animation.BOUNCE : undefined,
        });
    }

    // 네이버 지도 생성
    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const locationPos = new naver.maps.LatLng(36.3562036, 127.3566635);
        const mapOptions: naver.maps.MapOptions = {
            center: locationPos,
            zoom: 14,
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);

        setNaverMap(map);
        dispatchTab(setTabName('playGround'))
        // history.pushState(null, "", location.href);
        // window.addEventListener("popstate", () => history.pushState(null, "", location.href));

    }, []);

    useEffect(() => {
        if (naverMap === null)
            return;

        const location = new naver.maps.LatLng(geolocation.latitude, geolocation.longitude);

        if (!curPos)
            naverMap.setCenter(location);

        // 기존 현재 위치 마커 제거
        if (curPos) {
            curPos.setMap(null);
        }

        // 현재 위치 맵에 표시
        setCurPos(setMapIcon(currentPos, location, naverMap, 40, 40, false));

    }, [geolocation])

    // 마커
    useEffect(() => {
        if (naverMap === null || liveMatchList === null)
            return;

        // 기존 실시간 운동 모임 마커 제거
        if (markers) {
            for (const m of markers) {
                m.setMap(null);
            }
        }

        // 실시간 운동 모임 마커 생성
        if (liveMatchList.data) { // liveMatch리스트를 받아왔으면
            let newMarkers: naver.maps.Marker[] = []
            for (const e of liveMatchList.data) {
                switch (e.sports) {
                    case '농구':
                        newMarkers.push(setMapIcon(basketballMap, new naver.maps.LatLng(e.place.lat, e.place.lng), naverMap, 60, 60, true));
                        break;
                    case '축구':
                        newMarkers.push(setMapIcon(footballMap, new naver.maps.LatLng(e.place.lat, e.place.lng), naverMap, 60, 60, true));
                        break;
                    case '배드민턴':
                        newMarkers.push(setMapIcon(badmintonMap, new naver.maps.LatLng(e.place.lat, e.place.lng), naverMap, 60, 60, true));
                        break;
                }
            };
            for (let i = 0; i < newMarkers.length; i++) {
                naver.maps.Event.addListener(newMarkers[i], "click", () => {
                    setLiveMatch({
                        liveId: liveMatchList.data[i].liveId,
                        place: {
                            address: liveMatchList.data[i].place.address,
                            lat: liveMatchList.data[i].place.lat,
                            lng: liveMatchList.data[i].place.lng
                        },
                        detail: liveMatchList.data[i].detail,
                        hostId: liveMatchList.data[i].hostId,
                        hostNickName: liveMatchList.data[i].host.nickname,
                        currentPeopleNum: liveMatchList.data[i].currentPeopleNum,
                        totalPeopleNum: liveMatchList.data[i].totalPeopleNum,
                        registTime: liveMatchList.data[i].registTime,
                        sports: liveMatchList.data[i].sports,
                        memberList: liveMatchList.data[i].liveMemberList
                    })

                    let isUserExist = false; // user가 실시간 모임에 존재 하는지 여부
                    // 모임을 순회하면서 user가 있는지 확인
                    if (liveMatchList.data[i].liveMemberList) {
                        for (const memberInfo of liveMatchList.data[i].liveMemberList) {
                            if (memberInfo.memberId === userId) {
                                isUserExist = true;
                                break;
                            }
                        }
                    }

                    // user가 만든 실시간 모임이면
                    if (liveMatchList.data[i].hostId == userId) {
                        modifyMeeting();
                    } else if (isUserExist) {
                        quitMetting();
                    } else {
                        joinMeeting();
                    }
                });
            }
            setMarkers(newMarkers);
        }

    }, [liveMatchList.isSuccess, naverMap]);

    // 실시간 운동 모임 등록
    useEffect(() => {
        if (naverMap === null)
            return;

        const location = new naver.maps.LatLng(geolocation.latitude, geolocation.longitude);
        naverMap.setCenter(location);

        let marker: naver.maps.Marker;
        switch (state.sportType) {
            case '농구':
                marker = setMapIcon(basketballMap, location, naverMap, 60, 60, true)
                setMarkerPos(location);
                registerMeeting();
                break;
            case '축구':
                marker = setMapIcon(footballMap, location, naverMap, 60, 60, true)
                setMarkerPos(location);
                registerMeeting();
                break;
            case '배드민턴':
                marker = setMapIcon(badmintonMap, location, naverMap, 60, 60, true)
                setMarkerPos(location);
                registerMeeting();
                break;
        }

        naver.maps.Event.addListener(naverMap, 'click', function (e) {
            console.log(e.coord)
            setMarkerPos(e.coord);
            marker.setPosition(e.coord);
        });

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        }
    }, [state.sportType])

    return (
        <div>
            {promisedMatchList.isSuccess && promisedMatchList.data ?
                <Swiper
                    slidesPerView={1.1}
                    centeredSlides={true}
                    spaceBetween={10}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                >{promisedMatchList.data.map((item: match, index: number) =>
                (
                    <SwiperSlide key={index} onClick={() => location.replace(`/match/detail/${item.gatheringId}`)}>
                        <div className="w-full h-55 mt-8 mb-8 ml-[-10px]">
                            <MatchSlide
                                sports={item.sports}
                                date={item.startDate}
                                place={item.place.address.split(' ').splice(-1)[0]}
                                time={item.startTime.slice(0, 5)}
                                host={item.host.name}
                                people={item.people - 1} /></div>
                    </SwiperSlide>
                )
                )}
                </Swiper> : null
            }
            <div ref={mapElement} className="w-full h-[calc(100vh-182px)] relative">
                <div className="w-60 h-193 flex flex-col relative float-right mt-12 mr-9 z-10 ">{
                    state.isPressed === false ?
                        <div>
                            <button className="w-60 h-32 rounded-20 border-2 border-blue-800 bg-blue-700 text-white" onClick={onPressed}>등록</button>
                            <div className="invisible opacity-0 duration-500 ease-out flex flex-col justify-between items-center w-60 h-157 mt-4 rounded-15 border-1 border-[#303eff80] bg-blue-300">
                                <div className="w-40 h-40 flex justify-center items-center mt-7 rounded-50 border-3 border-yellow-600 bg-yellow-200" onClick={basketball} >
                                    <img src={basketballIcon} className="w-20 h-20"></img>
                                </div>
                                <div className="w-40 h-40 flex justify-center items-center rounded-50 border-3 border-[#9c8dd3] bg-blue-400" onClick={football}>
                                    <img src={footballIcon} className="w-20 h-20"></img>
                                </div>
                                <div className="w-40 h-40 flex justify-center items-center mb-7 rounded-50 border-3 border-[#71d354] bg-green-400" onClick={badminton}>
                                    <img src={badmintonIcon} className="w-20 h-20"></img>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <button className="w-60 h-32 rounded-20 border-2 border-red-700 bg-red-600 text-white" onClick={onPressed}>취소</button>
                            <div className="visible opacity-100 duration-500 ease-out flex flex-col justify-between items-center w-60 h-157 mt-4 rounded-15 border-1 border-[#303eff80] bg-blue-300">
                                <div className="w-40 h-40 flex justify-center items-center mt-7 rounded-50 border-3 border-yellow-600 bg-yellow-200" onClick={basketball} >
                                    <img src={basketballIcon} className="w-20 h-20"></img>
                                </div>
                                <div className="w-40 h-40 flex justify-center items-center rounded-50 border-3 border-[#9c8dd3] bg-blue-400" onClick={football}>
                                    <img src={footballIcon} className="w-20 h-20"></img>
                                </div>
                                <div className="w-40 h-40 flex justify-center items-center mb-7 rounded-50 border-3 border-[#71d354] bg-green-400" onClick={badminton}>
                                    <img src={badmintonIcon} className="w-20 h-20"></img>
                                </div>
                            </div>
                        </div>
                }
                </div>

                <RegisterModal type={state.sportType} place={{ address: "", lat: markerPos?._lat, lng: markerPos?._lng }} closeModal={() => { closeModal(); defaultSportType(); }} isOpen={state.modalType === 'register'}></RegisterModal>
                {liveMatch && <ModifyModal liveMatch={liveMatch} closeModal={() => { closeModal(); }} isOpen={state.modalType === 'modify'} />}
                {liveMatch && <JoinModal liveMatch={liveMatch} closeModal={() => { closeModal(); }} isOpen={state.modalType === 'join'} />}
                {liveMatch && <QuitModal liveMatch={liveMatch} closeModal={() => { closeModal(); }} isOpen={state.modalType === 'quit'} />}
            </div>
        </div>
    )
}