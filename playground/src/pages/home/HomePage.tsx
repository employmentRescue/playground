import { useEffect, useRef } from "react"
import { useReducer } from "react"
import useGeolocation from "react-hook-geolocation";
import basketBallMap from "@/assets/icons/basketball-map.png"
import soccerMap from "@/assets/icons/soccer-map.png"
import badmintonMap from "@/assets/icons/badminton-map.png"

type Action = { type: 'ISPRESSED' | 'BASKETBALL' | 'SOCCER' | 'BADMINTON' | 'REGISTER' | 'MODIFY' | 'DELETE' | 'QUIT' | 'BASIC' };

interface State {
    isPressed: boolean;
    sportType: string;
    modalType: string;
}

const initialState: State = {
    isPressed: false,
    sportType: '',
    modalType: 'basic',
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
        case 'DELETE':
            return {
                ...state,
                modalType: 'delete'
            }
        case 'QUIT':
            return {
                ...state,
                modalType: 'quit'
            }
        case 'BASIC':
            return {
                ...state,
                modalType: 'basic'
            }
        default:
            throw new Error('Unhandled action');
    }
}
export default function HomePage() {

    const [state, dispatch] = useReducer(registReducer, initialState);
    const onPressed = () => dispatch({ type: 'ISPRESSED' });
    const basketBall = () => dispatch({ type: 'BASKETBALL' });
    const soccer = () => dispatch({ type: 'SOCCER' });
    const badminton = () => dispatch({ type: 'BADMINTON' });
    const registerMeeting = () => dispatch({ type: 'REGISTER' });
    const modifyMeeting = () => dispatch({ type: 'MODIFY' });
    const deleteMeeting = () => dispatch({ type: 'DELETE' });
    const quitMetting = () => dispatch({ type: 'QUIT' });

    const mapElement: any | null = useRef(undefined);
    const geolocation = useGeolocation();

    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(geolocation.latitude, geolocation.longitude);
        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 17,
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);
        switch (state.sportType) {
            case 'basketball':
                new naver.maps.Marker({
                    position: location,
                    map,
                    icon: {
                        url: basketBallMap,
                        size: new naver.maps.Size(60, 60),
                        scaledSize: new naver.maps.Size(60, 60),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(30, 60)
                    }
                });
                break;
            case 'soccer':
                new naver.maps.Marker({
                    position: new naver.maps.LatLng(geolocation.latitude, geolocation.longitude),
                    map,
                    icon: {
                        url: soccerMap,
                        size: new naver.maps.Size(60, 60),
                        scaledSize: new naver.maps.Size(60, 60),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(30, 60)
                    }
                });
                break;
            case 'badminton':
                new naver.maps.Marker({
                    position: new naver.maps.LatLng(geolocation.latitude, geolocation.longitude),
                    map,
                    icon: {
                        url: badmintonMap,
                        size: new naver.maps.Size(60, 60),
                        scaledSize: new naver.maps.Size(60, 60),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(30, 60)
                    }
                });
                break;
        }
        console.log(state.sportType)
    }, [state.sportType, geolocation.latitude, geolocation.longitude]);


    return (
        <div ref={mapElement} className="w-full h-full">
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
        </div>
    )
}