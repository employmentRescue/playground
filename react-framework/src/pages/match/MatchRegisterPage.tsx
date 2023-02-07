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

interface options {
  sportsType: string,
  level: string,
  gameTime: number,
  sex: string,
  gameType: string,
}

export default function MatchRegisterPage() {
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [place, setplace] = useState<place | null>(null);
  const [deailPlace, setDetailPlace] = useState<place | null>(null);
  const [sportsType, setSportsType] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [gameTime, setGameTime] = useState<number | null>(null);
  const [sex, setSex] = useState<string | null>(null);
  const [gameType, setGameType] = useState<string | null>(null);
  const [options, setOptions] = useState<options | null>(null);


  // naver map
  const mapElement: any | null = useRef(undefined);

  // initial call
  const geolocation = useGeolocation();

  const matchId = useSelector((state: RootState) => {
    return state.match.id;
  });

  //const match = useMatchDetailQuery(1);

  const register = () => {
    console.log('register');
    const { mutate } = useMatchRegister();
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

  function getImgUrl(name: string) {
    return new URL(`../../assets/profiles/${name}.png`, import.meta.url).href;
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
      console.log(marker);
      console.log(sportsType);

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
        <img className="w-20 h-20" src={sportsIcon}></img>
        <div className="ml-7 text-15">종목</div>
      </div>
      <div className="flex mt-5">
        {sportsType === 'basketball' ?
          <button
            className="w-50 h-25 text-12 text-white bg-blue-700 rounded-5"
          >
            농구
          </button> :
          <button
            className="w-50 h-25 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setSportsType('basketball')}
          >
            농구
          </button>
        }
        {sportsType === 'football' ?
          <button
            className="w-50 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            축구
          </button> :
          <button
            className="w-50 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setSportsType('football')}
          >
            축구
          </button>
        }
        {sportsType === 'badminton' ?
          <button
            className="w-73 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            배드민턴
          </button> :
          <button
            className="w-73 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setSportsType('badminton')}
          >
            배드민턴
          </button>
        }
      </div>
      <div className="flex mt-24">
        <img className="w-20 h-20" src={writeIcon}></img>
        <div className="ml-7 text-15">글쓰기</div>
      </div>
      <input
        className="w-full h-30 mt-12 bg-gray-600 text-gray-700 pl-15 rounded-5 text-12"
        placeholder="제목을 입력해주세요."
        onChange={() => setTitle}
      ></input>
      <textarea
        className="w-full h-80 mt-12 bg-gray-600 text-gray-700 pl-15 pt-6 rounded-5 text-12"
        placeholder="내용을 입력해주세요."
        onChange={() => setDescription}
      ></textarea>
      <div className="flex mt-24">
        <img className="w-20 h-20" src={placeIcon}></img>
        <div className="ml-7 text-15">장소</div>
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
          placeholder="운동 모임 장소를 입력해주세요."
          onChange={() => setDetailPlace}
        ></input>
      </div>

      <div className="flex mt-24">
        <img className="w-20 h-20" src={calendarIcon}></img>
        <div className="ml-7 text-15">일시</div>
      </div>
      <div className="flex mt-5 items-center">
        <input className="w-50 h-25 text-12 text-blue-700 border-1 border-blue-700 rounded-5 text-center mr-10" onChange={() => setDate}></input>
        <div className="text-13 text-gray-400 mr-10">시</div>
        <input className="w-50 h-25 text-12 text-blue-700 border-1 border-blue-700 rounded-5 text-center mr-10" onChange={() => setDate}></input>
        <div className="text-13 text-gray-400">분</div>
      </div>
      <div className="flex mt-24">
        <img className="w-20 h-20" src={levelIcon}></img>
        <div className="ml-7 text-15">수준</div>
      </div>
      <div className="flex mt-5">
        {level === 'level1' ?
          <button
            className="w-50 h-25 text-12 text-white bg-blue-700 rounded-5"
          >
            입문
          </button>
          :
          <button
            className="w-50 h-25 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setLevel('level1')}
          >
            입문
          </button>
        }
        {level === 'level2' ?
          <button
            className="w-50 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            초수
          </button>
          :
          <button
            className="w-50 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setLevel('level2')}
          >
            초수
          </button>
        }
        {level === 'level3' ?
          <button
            className="w-50 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            중수
          </button>
          :
          <button
            className="w-50 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setLevel('level3')}
          >
            중수
          </button>
        }
        {level === 'level4' ?
          <button
            className="w-50 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            고수
          </button>
          :
          <button
            className="w-50 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setLevel('level4')}
          >
            고수
          </button>
        }
      </div>
      <div className="flex mt-24">
        <img className="w-20 h-20" src={timeIcon}></img>
        <div className="ml-7 text-15">게임 시간</div>
      </div>
      <div className="flex mt-5 items-center">
        <input className="w-50 h-25 text-12 text-blue-700 border-1 border-blue-700 rounded-5 text-center mr-10" onChange={() => setGameTime}></input>
        <div className="text-13 text-gray-400">시간</div>
      </div>
      <div className="flex mt-24">
        <img className="w-20 h-20" src={sexIcon}></img>
        <div className="ml-7 text-15">성별</div>
      </div>
      <div className="flex mt-5">
        {sex === 'M' ?
          <button
            className="w-50 h-25 text-12 text-white bg-blue-700 rounded-5"
          >
            남자
          </button> :
          <button
            className="w-50 h-25 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setSex('M')}
          >
            남자
          </button>
        }
        {sex === 'F' ?
          <button
            className="w-50 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            여자
          </button> :
          <button
            className="w-50 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setSex('F')}
          >
            여자
          </button>
        }
        {sex === 'MF' ?
          <button
            className="w-73 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            성별무관
          </button> :
          <button
            className="w-73 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setSex('MF')}
          >
            성별무관
          </button>
        }
      </div>
      <div className="flex mt-24">
        <img className="w-20 h-20" src={sportsIcon}></img>
        <div className="ml-7 text-15">게임 종류</div>
      </div>
      <div className="flex mt-5 mb-24">
        {gameType === '3on3' ?
          <button
            className="w-63 h-25 text-12 text-white bg-blue-700 rounded-5"
          >
            3 on 3
          </button> :
          <button
            className="w-63 h-25 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setGameType('3on3')}
          >
            3 on 3
          </button>
        }
        {gameType === '5on5' ?
          <button
            className="w-63 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            5 on 5
          </button> :
          <button
            className="w-63 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setGameType('5on5')}
          >
            5 on 5
          </button>
        }
        {gameType === 'any' ?
          <button
            className="w-73 h-25 ml-13 text-12 text-white bg-blue-700 rounded-5"
          >
            종류무관
          </button> :
          <button
            className="w-73 h-25 ml-13 text-12 text-blue-700 border-1 border-blue-700 rounded-5"
            onClick={() => setGameType('any')}
          >
            종류무관
          </button>
        }
      </div>
      <RegisterButton onClick={register}>모임 등록</RegisterButton>
    </div>
  );
}
