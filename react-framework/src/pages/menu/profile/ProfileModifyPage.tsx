import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/stores/store"
import { setFavoriteSports, setFavoriteTime, setNickname, setStatusMessage } from "@/stores/register/userInfo"
import useGeolocation from "react-hook-geolocation"
import LevelCard from "@/components/userRegister/LevelCard"
import ImageCard from "@/components/userRegister/ImageCard"

import myProfileSampleImage from "@/assets/profiles/my-profile-sample.png"
import currentPos from '@/assets/icons/current-position.png';
import modifyImage from "@/assets/profiles/modify.png"
import profileModifyImage from "@/assets/profiles/profile-modify.png"
import titleFavoriteSports from "@/assets/profiles/title-favorite-sports.png"
import titleFavoritePlace from "@/assets/profiles/title-favorite-place.png"
import titleFavoriteTime from "@/assets/profiles/title-favorite-time.png"
import footballImg from "@/assets/icons/football-bg-colored.png"
import basketballImg from "@/assets/icons/basketball-bg-colored.png"
import badmintonImg from "@/assets/icons/badminton-bg-colored.png"
import markerIcon from '@/assets/icons/marker.png';

import searchIcon from "@/assets/icons/search.png"

import { Slider } from "@mui/material"
import { setTabName } from "@/stores/tab/tabName"
import { place } from "@/models/place"


export default function ProfileModifyPage() {
    const dispatch = useDispatch();

    const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
    const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);
    const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
    const [sportsType, setSportsType] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [place, setPlace] = useState<place | null>(null);
    const [detailPlace, setDetailPlace] = useState<string>('');
    const [preferDist, setPreferDist] = useState<number>(0);
    const [circle, setCircle] = useState<naver.maps.Circle | null>(null);

    const distMarks = [
        {
            value: 0,
            label: '0km',
        },
        {
            value: 5,
            label: '5km',
        },
        {
            value: 10,
            label: '10km',
        },
    ];
    // naver map
    const mapElement: any | null = useRef(undefined);

    // initial call
    const geolocation = useGeolocation();

    const inputTeamNameRef: any = useRef();
    const inputStatusMessageRef: any = useRef();


    const isFavoritefootball = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.football;
    });
    const isFavoriteBasketball = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.basketball;
    });
    const isFavoriteBadminton = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.badminton;
    });
    const nickname = useSelector((state: RootState) => {
        return state.userInfo.nickname;
    });
    const favoriteTime = useSelector((state: RootState) => {
        return state.userInfo.favoriteTime;
    });

    const marks = [
        {
            value: 0,
            label: '0시',
        },
        {
            value: 12,
            label: '12시',
        },
        {
            value: 24,
            label: '24시',
        },
    ];
    function valueText(value: number, index: number) {
        return `${value}시간`
    }
    const handleChange = (event: Event, value: number | number[]) => {
        event.preventDefault();
        const newValue = value as number | number[] as number[]
        // console.log(value)
        dispatch(setFavoriteTime(newValue))
    }

    const handlePreferDistChange = (event: Event, newValue: number | number[]) => {
        setPreferDist(newValue as number);
    };

    const getNicknameInput = (event: React.BaseSyntheticEvent) => {
        // console.log(e.target.value)
        event.preventDefault();
        dispatch(setNickname(event.target.value))
    }

    const getStatusMessageInput = (event: React.BaseSyntheticEvent) => {
        // console.log(e.target.value)
        event.preventDefault();
        dispatch(setStatusMessage(event.target.value))
    }

    function setMapIcon(
        icon: string,
        location: naver.maps.LatLng,
        map: naver.maps.Map,
        sizeX: number,
        sizeY: number,
        isBounce: boolean
    ) {
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


    useEffect(() => {
        dispatch(setTabName('프로필 수정'))
    }, [])


    // 네이버 지도 생성
    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;

        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(
            geolocation.latitude,
            geolocation.longitude
        );
        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 13,
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);
        setNaverMap(map);
    }, []);

    useEffect(() => {
        if (naverMap === null) return;

        const location = new naver.maps.LatLng(
            geolocation.latitude,
            geolocation.longitude
        );

        if (!curPos)
            naverMap.setCenter(location);

        // 기존 현재 위치 마커 제거
        if (curPos) {
            curPos.setMap(null);
        }

        // 현재 위치 맵에 표시
        setCurPos(setMapIcon(currentPos, location, naverMap, 40, 40, false));
    }, [geolocation]);

    useEffect(() => {
        if (naverMap === null) return;

        naver.maps.Event.addListener(naverMap, 'click', function (e) {
            const latlng = e.coord;

            if (marker) {
                marker.setPosition(latlng);
            }
            else {
                setMarker(setMapIcon(markerIcon, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 40, 40, true));

            }

            naver.maps.Service.reverseGeocode({
                coords: new naver.maps.LatLng(latlng._lat, latlng._lng),
            }, function (status, response) {
                if (status !== naver.maps.Service.Status.OK) {
                    console.log("wrong!");
                }

                const result = response.v2; // 검색 결과의 컨테이너
                const address = result.address.jibunAddress; // 검색 결과로 만든 주소
                console.log(result);
                setPlace({
                    address: address,
                    lat: latlng._lat,
                    lng: latlng._lng,
                })
            })
        });

    }, [naverMap, marker])


    useEffect(() => {
        if (!naverMap || !marker) return;
        if (circle)
            circle.setMap(null);

        setCircle(new naver.maps.Circle({
            map: naverMap,
            center: marker.getPosition(),
            radius: preferDist * 1000,
            fillColor: 'red',
            fillOpacity: 0.5
        }))
    }, [preferDist])

    return (
        <div>


            <div className="flex flex-col w-full h-auto pt-150 bg-[#EEF3FC] justify-start tracking-tight">
                <div className="flex flex-col bg-white">
                    <img src={myProfileSampleImage} className="w-100 h-100 self-center -mt-50" />
                    <img src={profileModifyImage} className="w-25 h-25 self-center ml-70 -mt-25" onClick={console.log} />
                    <div className="flex justify-center">
                        <input onChange={getNicknameInput} className="w-[170px] mt-12 px-25 text-18 text-inter opacity-50 text-center font-extrabold self-center border-b-2 border-[#DBDBDB] outline-none" ref={inputTeamNameRef} placeholder={nickname} />
                        <img src={modifyImage} className="w-15 h-15 -ml-15 mb-10 self-end" onClick={() => inputTeamNameRef.current.focus()} />
                    </div>
                    <p className="mt-4 text-16 text-[#969696] text-inter text-center">카카오톡 닉네임(본명){/* userInfo.nickname */}</p>
                    <div className="flex mt-16 mb-41 self-center ">
                        <input onChange={getStatusMessageInput} className="w-[170px] mt-12 px-25 pb-2 text-14 text-inter opacity-50 text-center font-extrabold self-center border-b-2 border-[#DBDBDB] outline-none" ref={inputStatusMessageRef} placeholder="상태 메시지 입력" />
                        <img src={modifyImage} className="w-15 h-15 -ml-15 mb-10 self-end" onClick={() => inputStatusMessageRef.current.focus()} />
                    </div>
                </div>
            </div>


            <div className="flex flex-col mt-8 pl-24 pr-24 w-full h-auto bg-white justify-start">
                <div className="flex my-20 text-18  font-extrabold">
                    <img src={titleFavoriteSports} className="w-20 h-20 mr-8 mt-2" />
                    <p>선호 운동</p>
                </div>
                <div className="flex justify-between self-center">
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "football", isSelected: !(isFavoritefootball) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoritefootball) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={footballImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center  text-11 mt-6">축구</p>
                    </div>
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "basketball", isSelected: !(isFavoriteBasketball) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoriteBasketball) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={basketballImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center  text-11 mt-6">농구</p>
                    </div>
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "badminton", isSelected: !(isFavoriteBadminton) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoriteBadminton) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={badmintonImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center  text-11 mt-6">배드민턴</p>
                    </div>
                </div>


                <div className="flex my-20 text-18  font-extrabold">
                    <img src={titleFavoriteSports} className="w-20 h-20 mr-8 mt-2" />
                    <p>운동 레벨</p>
                </div>
                <div className="flex flex-col self-center">
                    <div className="flex">
                        <LevelCard
                            className={"w-[300px] h-122 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "}
                            imageSrc={footballImg}
                            imageSize={"w-45 h-45 mr-25 mt-4"}
                            innerText="축구"
                            sportName="football"
                        />
                    </div>
                    <div className="flex">
                        <LevelCard
                            className={"w-[300px] h-122 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "}
                            imageSrc={basketballImg}
                            imageSize={"w-45 h-45 mr-25 mt-4"}
                            innerText="농구"
                            sportName="basketball"
                        />
                    </div>
                    <div className="flex">
                        <LevelCard
                            className={"w-[300px] h-122 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "}
                            imageSrc={badmintonImg}
                            imageSize={"w-45 h-45 mr-25 mt-4"}
                            innerText="배드민턴"
                            sportName="badminton"
                        />
                    </div>
                </div>


                {/* 경택님이 만든 지도 그대로 가져옴 */}
                <div className="flex mt-24">
                    <img className="w-20 h-20 self-center" src={titleFavoritePlace}></img>
                    <div className="ml-7 text-18 font-semibold">선호 지역</div>
                </div>
                <div className="flex items-center mt-12">
                    <img className="w-20 h-20" src={searchIcon}></img>
                    <input
                        className="w-full h-30 bg-gray-600 text-gray-700 ml-6 pl-15 rounded-5 text-12"
                        placeholder="검색하고 싶은 지역을 입력해주세요."
                    ></input>
                </div>
                <div ref={mapElement} className="w-full h-[364px] mt-12"></div>
                <div className='w-full text-end text-13 mt-5 font-semibold text-blue-700'>운동 모임 장소를 지도에서 클릭해주세요.</div>
                <div className='text-13 mt-10'>주소 : {place?.address}</div>
                <div className='flex mt-10 items-center'>
                    <div className='text-13 w-80'>상세 주소: </div>
                    <input
                        className="w-full h-30 bg-gray-600 text-gray-700 ml-6 pl-15 rounded-5 text-12"
                        placeholder="선호 지역을 입력해 주세요. 예) 고운뜰공원"
                        onChange={(e) => setDetailPlace(e.target.value)}
                    ></input>
                </div>
                <div className="w-[calc(100%-30px)] ml-auto mr-auto">
                    <Slider
                        value={preferDist}
                        onChange={handlePreferDistChange}
                        valueLabelDisplay="auto"
                        marks={distMarks}
                        min={0}
                        max={10}
                        sx={{
                            color: 'blue',
                            '& .MuiSlider-thumb': {
                                width: '15px',
                                height: '15px',
                                color: 'white',
                                borderWidth: '1px',
                                borderColor: 'blue',
                            },
                        }}
                    />
                </div>



                <div className="flex mt-20 mb-8 text-18  font-extrabold">
                    <img src={titleFavoriteTime} className="w-20 h-20 mr-8 mt-2" />
                    <div className="flex flex-col">
                        <p>선호 시간대</p>
                    </div>
                </div>
                <div className="w-[calc(100%-30px)] self-center mb-10">
                    <Slider
                        value={favoriteTime}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={24}
                        getAriaValueText={valueText}
                        className="mt-5"
                        sx={{
                            color: 'blue',
                            '& .MuiSlider-thumb': {
                                width: '15px',
                                height: '15px',
                                color: 'white',
                                borderWidth: '1px',
                                borderColor: 'blue',
                            },
                        }}
                    />
                </div>


            </div>
        </div>
    )
}