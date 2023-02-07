import { useState, useEffect, useRef } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { place } from '@/models/place';
import currentPos from '@/assets/icons/current-position.png';
import basketballMap from '@/assets/icons/basketball-map.png';
import footballMap from '@/assets/icons/football-map.png';
import badmintonMap from '@/assets/icons/badminton-map.png';
import writeIcon from "@/assets/icons/write.png"
import searchIcon from "@/assets/icons/search.png"
import placeIcon from '@/assets/icons/place.png';
import calendarIcon from '@/assets/icons/calendar.png';
import timeIcon from '@/assets/icons/time.png';
import sportsIcon from '@/assets/icons/sports.png';
import levelIcon from '@/assets/icons/level.png';
import sexIcon from '@/assets/icons/sex.png';
import useMatchRegister from '@/hooks/match/useMatchRegister';
import RegisterButton from '@/components/Match/Buttons/RegisterButton';
import { useNavigate } from 'react-router';

export default function TeamMatchRegisterPage() {
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string | null>(null);
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);
  const [place, setplace] = useState<place | null>(null);
  const [detailPlace, setDetailPlace] = useState<string>('');
  const [sportsType, setSportsType] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [playTime, setplayTime] = useState<number | null>(null);
  const [sex, setSex] = useState<string | null>(null);
  const [gameType, setGameType] = useState<string | null>(null);
  const [people, setPeople] = useState<number | null>(null);

  // naver map
  const mapElement: any | null = useRef(undefined);

  // initial call
  const geolocation = useGeolocation();

  const matchId = useSelector((state: RootState) => {
    return state.match.id;
  });

  const { mutate } = useMatchRegister();
  const movePage = useNavigate();

  const register = () => {
    if (sportsType && title && place && level && gameType && playTime && sex && people) {
      console.log('register');
      console.log(people);
      mutate({
        sports: sportsType,
        title: title,
        description: description,
        startDate: "2023-02-07",
        startTime: hour + ":" + minute,
        place: {
          address: place.address + " " + detailPlace,
          lat: place.lat,
          lng: place.lng,
        },
        level: level,
        gameType: gameType,
        playTime: playTime,
        sex: sex,
        hostId: 111,
        people: people,
      })

      movePage('/match')
    } else {
      console.log('fail!')
      console.log(people)
    }

  };

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

    if (marker) {
      switch (sportsType) {
        case 'basketball':
          marker.setIcon({
            url: basketballMap,
            size: new naver.maps.Size(60, 60),
            scaledSize: new naver.maps.Size(60, 60),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(30, 60)
          });
          break;
        case 'football':
          marker.setIcon({
            url: footballMap,
            size: new naver.maps.Size(60, 60),
            scaledSize: new naver.maps.Size(60, 60),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(30, 60)
          });
          break;
        case 'badminton':
          marker.setIcon({
            url: badmintonMap,
            size: new naver.maps.Size(60, 60),
            scaledSize: new naver.maps.Size(60, 60),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(30, 60)
          });
          break;
      }
    }

    naver.maps.Event.addListener(naverMap, 'click', function (e) {
      const latlng = e.coord;

      if (marker) {
        marker.setPosition(latlng);
      }
      else {
        switch (sportsType) {
          case 'basketball':
            setMarker(setMapIcon(basketballMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true));
            break;
          case 'football':
            setMarker(setMapIcon(footballMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true));
            break;
          case 'badminton':
            setMarker(setMapIcon(badmintonMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true));
            break;
        }
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
        setplace({
          address: address,
          lat: latlng._lat,
          lng: latlng._lng,
        })
      })
    });

  }, [marker, sportsType])

  return (
    <div className="bg-white h-screen pl-24 pr-24 overflow-auto">
      <div className="flex mt-24">
        <img className="w-20 h-20" src={calendarIcon}></img>
        <div className="ml-7 text-15">일시</div>
      </div>
      <div className="flex mt-24">
        <img className="w-20 h-20" src={placeIcon}></img>
        <div className="ml-7 text-15">선호 지역</div>
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
      <div className="flex mt-24">
        <img className="w-20 h-20" src={timeIcon}></img>
        <div className="ml-7 text-15">선호 시간대</div>
      </div>

      <RegisterButton onClick={register}>등록 완료</RegisterButton>
    </div>
  );
}
