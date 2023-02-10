import { useState, useEffect, useRef } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import useMatchDetailQuery from '@/hooks/match/useMatchDetailQuery';
import currentPos from '@/assets/icons/current-position.png';
import basketballMap from '@/assets/icons/basketball-map.png';
import basketballIcon from '@/assets/icons/basketball-bg-colored.png';
import footballMap from '@/assets/icons/football-map.png';
import footballIcon from '@/assets/icons/football-bg-colored.png';
import badmintonMap from '@/assets/icons/badminton-map.png';
import badmintonIcon from '@/assets/icons/badminton-bg-colored.png';
import placeIcon from '@/assets/icons/place.png';
import calendarIcon from '@/assets/icons/calendar.png';
import timeIcon from '@/assets/icons/time.png';
import sportsIcon from '@/assets/icons/sports.png';
import levelIcon from '@/assets/icons/level.png';
import sexIcon from '@/assets/icons/sex.png';
import JoinButton from '@/components/Match/Buttons/JoinButton';
import QuitButton from '@/components/Match/Buttons/QuitButton';
import DeleteButton from '@/components/Match/Buttons/ModifyButton';
import ModifyButton from '@/components/Match/Buttons/ModifyButton';
import useMatchJoin from '@/hooks/match/useMatchJoin';
import useMatchQuit from '@/hooks/match/useMatchQuit';
import { getImgUrl } from '@/utils/getImgUrl';
import { setTabName } from '@/stores/tab/tabName';

export default function MatchDetailPage() {
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  // naver map
  const mapElement: any | null = useRef(undefined);

  // initial call
  const geolocation = useGeolocation();

  const matchId = useSelector((state: RootState) => {
    return state.match.id;
  });

  const userId = useSelector((state: RootState) => {
    return state.userId;
  });

  const match = useMatchDetailQuery(1);
  const joinMatch = useMatchJoin();
  const quitMatch = useMatchQuit();

  const join = () => {
    console.log('join');
    joinMatch.mutate({
      gatheringId: matchId,
      memberId: userId,
    })
  };

  const quit = () => {
    console.log('quit');
    quitMatch.mutate({
      gatheringId: matchId,
      memberId: userId,
    })
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabName('상세 정보'))
  }, [])

  // 네이버 지도 생성
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(
      match.data.place.lat,
      match.data.place.lng
    );
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 13,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    setNaverMap(map);

    switch (match.data.sports) {
      case '농구':
        setMapIcon(
          basketballMap,
          new naver.maps.LatLng(match.data.place.lat, match.data.place.lng),
          map,
          60,
          60,
          true
        );
        break;
      case '축구':
        setMapIcon(
          footballMap,
          new naver.maps.LatLng(match.data.place.lat, match.data.place.lng),
          map,
          60,
          60,
          true
        );
        break;
      case '배드민턴':
        setMapIcon(
          badmintonMap,
          new naver.maps.LatLng(match.data.place.lat, match.data.place.lng),
          map,
          60,
          60,
          true
        );
        break;
    }

    console.log(userId);
    let isUserExisted = false;
    for (const member of match.data.memberGatheringList) {
      if (member.memberId === userId || member.memberId === 111) {
        isUserExisted = true;
        break;
      }
    }
    if (isUserExisted) {
      setUserType('isMember');
    } else {
      setUserType('isNotMember');
    }

  }, [match.isSuccess]);

  useEffect(() => {
    if (naverMap === null) return;

    const location = new naver.maps.LatLng(
      geolocation.latitude,
      geolocation.longitude
    );

    // 기존 현재 위치 마커 제거
    if (curPos) {
      curPos.setMap(null);
    }

    // 현재 위치 맵에 표시
    setCurPos(setMapIcon(currentPos, location, naverMap, 40, 40, false));
  }, [geolocation, match.isSuccess]);

  return match.isSuccess ? (
    <div className="bg-white h-full">
      <div className="w-full h-screen flex flex-col items-center overflow-auto">
        <div
          ref={mapElement}
          className="w-full h-[364px] pt-[419px] mb-21"
        ></div>
        <div className="w-[320px]">
          <div className="flex mb-13 items-center">
            {match.data.sports === '농구' && (
              <img className="w-30 h-30" src={basketballIcon}></img>
            )}
            {match.data.sports === '축구' && (
              <img className="w-30 h-30" src={footballIcon}></img>
            )}
            {match.data.sports === '배드민턴' && (
              <img className="w-30 h-30" src={badmintonIcon}></img>
            )}
            <div className="ml-11 text-18">{match.data.title}</div>
          </div>
          <div className="w-[320px] h-1 mb-11 bg-gray-600"></div>
          <div className="mb-22">
            <div className="flex">
              <img className="w-20 h-20" src={placeIcon}></img>
              <div className="ml-4 text-15 font-bold">장소</div>
            </div>
            <div className="mt-2 text-13">{match.data.place.address}</div>
          </div>
          <div className="flex justify-between">
            <div className="mb-22">
              <div className="flex">
                <img className="w-20 h-20" src={calendarIcon}></img>
                <div className="ml-4 text-15 font-bold">일시</div>
              </div>
              <div className="mt-2 text-13">{match.data.startDate}</div>
            </div>
            <div>
              <div className="flex mr-30">
                <img className="w-20 h-20" src={timeIcon}></img>
                <div className="ml-4 text-15 font-bold">게임 시간</div>
              </div>
              <div className="mt-2 text-13">{match.data.playTime}시간</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mb-22">
              <div className="flex">
                <img className="w-20 h-20" src={sportsIcon}></img>
                <div className="ml-4 text-15 font-bold">게임 종류</div>
              </div>
              <div className="mt-2 text-13">{match.data.gameType}</div>
            </div>
            <div>
              <div className="flex mr-30">
                <img className="w-20 h-20" src={levelIcon}></img>
                <div className="ml-4 text-15 font-bold">게임 수준</div>
              </div>
              <div className="mt-2 text-13">{match.data.level}</div>
            </div>
          </div>
          <div className="mb-22">
            <div className="flex">
              <img className="w-20 h-20" src={sexIcon}></img>
              <div className="ml-4 text-15 font-bold">성별</div>
            </div>
            <div className="mt-2 text-13">{match.data.sex}</div>
          </div>
          <div className="w-[320px] h-1 mb-24 bg-gray-600"></div>
          <div className="mb-20 flex items-center justify-between">
            <div className="text-15 font-bold">참여인원</div>
            <div className="w-180 h-1 bg-gray-600"></div>
            <div className="text-18 font-bold">
              {match.data.memberGatheringList.length}/{match.data.people}
            </div>
          </div>
          <div className="flex">
            {match.data.memberGatheringList.map((e: any, index: number) => {
              return (
                <div
                  key={index}
                  className="w-60 h-60 flex flex-col justify-center items-center"
                >
                  <img
                    className="w-40 h-40"
                    src={getImgUrl('profiles/user', e.member.memberId)}
                  ></img>
                  <div className="text-10 mt-4">{e.member.nickname}</div>
                </div>
              );
            })}
          </div>
          {userType === 'isNotMember' && <JoinButton onClick={join}>참여 하기</JoinButton>}
          {userType === 'isMember' && <QuitButton onClick={quit}>참여 취소</QuitButton>}
        </div>

      </div>
    </div>
  ) : null;
}
