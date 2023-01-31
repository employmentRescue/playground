import { useState, useEffect, useRef } from "react"
import { useReducer } from "react"
import useGeolocation from "react-hook-geolocation"
import RegisterModal from "@/components/LiveModal/RegisterModal"
import JoinModal from "@/components/LiveModal/JoinModal"
import basketBallMap from "@/assets/icons/basketball-map.png"
import soccerMap from "@/assets/icons/soccer-map.png"
import badmintonMap from "@/assets/icons/badminton-map.png"
import currentPos from "@/assets/icons/current-position.png"
import ModifyModal from "@/components/LiveModal/ModifyModal"
import QuitModal from "@/components/LiveModal/QuitModal"
import useLiveMatchListQuery from "@/hooks/useLiveMatchListQuery"

type Action = { type: 'ISPRESSED' | 'BASKETBALL' | 'SOCCER' | 'BADMINTON' | 'REGISTER' | 'MODIFY' | 'DELETE' | 'QUIT' | 'NONE' | 'DEFAULT' };

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
                sportType: 'basketball'
            }
        case 'SOCCER':
            return {
                ...state,
                sportType: 'soccer'
            }
        case 'BADMINTON':
            return {
                ...state,
                sportType: 'badminton'
            }
        case 'DEFAULT':
            return {
                ...state,
                sportType: 'default'
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

    const [state, dispatch] = useReducer(registReducer, initialState);
    const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
    const onPressed = () => dispatch({ type: 'ISPRESSED' });
    const basketBall = () => dispatch({ type: 'BASKETBALL' });
    const soccer = () => dispatch({ type: 'SOCCER' });
    const badminton = () => dispatch({ type: 'BADMINTON' });
    const defaultSportType = () => dispatch({ type: 'DEFAULT' });
    const registerMeeting = () => dispatch({ type: 'REGISTER' });
    const modifyMeeting = () => dispatch({ type: 'MODIFY' });
    const deleteMeeting = () => dispatch({ type: 'DELETE' });
    const quitMetting = () => dispatch({ type: 'QUIT' });
    const closeModal = () => dispatch({ type: 'NONE' });

    const mapElement: any | null = useRef(undefined);
    const geolocation = useGeolocation();

    const liveMatchList = useLiveMatchListQuery();
    function setMapIcon(icon: string, location: naver.maps.LatLng, map: naver.maps.Map, sizeX: number, sizeY: number, isBounce: boolean) {
        console.log(map, naverMap);
        const temp = new naver.maps.Marker({
            position: location,
            map,
            icon: {
                url: icon,
                size: new naver.maps.Size(sizeX, sizeY),
                scaledSize: new naver.maps.Size(sizeX, sizeY),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(sizeX / 2, sizeY),
            },
            animation: isBounce ? naver.maps.Animation.BOUNCE : undefined
        });
        console.log(temp);
        return temp;
    }

    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(geolocation.latitude, geolocation.longitude);
        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 14,
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);
        setNaverMap(map);
    }, []);

    useEffect(() => {
        console.log(naverMap)
        if (naverMap === null)
            return;

        const location = new naver.maps.LatLng(geolocation.latitude, geolocation.longitude);
        naverMap.setCenter(location);
        const map = setMapIcon(currentPos, location, naverMap, 40, 40, false);
        console.log(map);

    }, [geolocation.latitude, geolocation.longitude]);

    useEffect(() => {
        if (naverMap === null)
            return;

        const location = new naver.maps.LatLng(geolocation.latitude, geolocation.longitude);
        naverMap.setCenter(location);
        if (liveMatchList != undefined) {
            for (const e in liveMatchList) {
                //console.log(liveMatchList.data.title);
                // switch (e.title) {
                //     case "basketball":
                //         setMapIcon(basketBallMap, new naver.maps.LatLng(e.lat, e.lng), map, 60, 60, true);
                //         break;
                //     case "soccer":
                //         setMapIcon(soccerMap, new naver.maps.LatLng(e.lat, e.lng), map, 60, 60, true);
                //         break;
                //     case "badminton":
                //         setMapIcon(badmintonMap, new naver.maps.LatLng(e.lat, e.lng), map, 60, 60, true);
                //         break;
                //     default:
                //         console.log(data);
                //         break;
                // }
            };
        }

        let marker: naver.maps.Marker;
        switch (state.sportType) {
            case 'basketball':
                marker = setMapIcon(basketBallMap, location, naverMap, 60, 60, true)
                registerMeeting();
                break;
            case 'soccer':
                marker = setMapIcon(soccerMap, location, naverMap, 60, 60, true)
                registerMeeting();
                break;
            case 'badminton':
                marker = setMapIcon(badmintonMap, location, naverMap, 60, 60, true)
                registerMeeting();
                break;
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        }
    }, [state.sportType])

    return (
        <div ref={mapElement} className="w-full h-full relative">
            <div className="w-60 h-193 flex flex-col relative float-right mt-12 mr-9 z-10 ">{
                state.isPressed === false ?
                    <button className="w-60 h-32 rounded-20 border-2 border-blue-800 bg-blue-700 text-white" onClick={onPressed}>등록</button>
                    :
                    <div>
                        <button className="w-60 h-32 rounded-20 border-2 border-blue-800 bg-blue-700 text-white" onClick={onPressed}>취소</button>
                        <div className="flex flex-col justify-between items-center w-60 h-157 mt-4 rounded-15 border-1 border-[#303eff80] bg-blue-300">
                            <div className="w-40 h-40 mt-7 rounded-50 bg-yellow-200" onClick={basketBall} ></div>
                            <div className="w-40 h-40 rounded-50 bg-blue-400" onClick={soccer}></div>
                            <div className="w-40 h-40 mb-7 rounded-50 bg-green-400" onClick={badminton}></div>
                        </div>
                    </div>
            }
            </div>
            {state.modalType === 'register' && <RegisterModal type={state.sportType} lat={geolocation.latitude} lng={geolocation.longitude} openModal={state.modalType} closeModal={() => { closeModal(); defaultSportType(); }}></RegisterModal>}
            {state.modalType === 'modify' &&
                <ModifyModal liveMatch={liveMatchList.data} openModal={state.modalType} closeModal={closeModal} />}
            {state.modalType === 'join' && <JoinModal></JoinModal>}
            {state.modalType === 'quit' && <QuitModal />}
        </div>
    )
}