import { useState, useEffect, useRef } from "react"
import useGeolocation from "react-hook-geolocation";
import currentPos from "@/assets/icons/current-position.png"
import basketBallMap from "@/assets/icons/basketball-map.png"
import basketBallIcon from "@/assets/icons/basketball-original.png"
import soccerMap from "@/assets/icons/soccer-map.png"
import soccerIcon from "@/assets/icons/soccer-original.png"
import badmintonMap from "@/assets/icons/badminton-map.png"
import badmintonIcon from "@/assets/icons/badminton-original.png"
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useMatchDetailQuery from "@/hooks/match/useMatchDetailQuery";
import JoinButton from "@/components/Match/Buttons/JoinButton";



export default function MatchDetailPage() {
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);

  // naver map
  const mapElement: any | null = useRef(undefined);

  // initial call
  const geolocation = useGeolocation();

  const matchId = useSelector((state: RootState) => {
    return state.match.id;
  })

  const match = useMatchDetailQuery(matchId);

  const imgUrl = "/assets/icons" + ".png";

  const join = () => {
    console.log("join")
  }

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
    const location = new naver.maps.LatLng(geolocation.latitude, geolocation.longitude);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 14,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    setNaverMap(map);

    switch (match.data.sports) {
      case "basketball":
        setMapIcon(basketBallMap, new naver.maps.LatLng(match.data.place.lat, match.data.place.lng), map, 60, 60, true);
        break;
      case "football":
        setMapIcon(soccerMap, new naver.maps.LatLng(match.data.place.lat, match.data.place.lng), map, 60, 60, true);
        break;
      case "badminton":
        setMapIcon(badmintonMap, new naver.maps.LatLng(match.data.place.lat, match.data.place.lng), map, 60, 60, true);
        break;
    }
  }, []);

  useEffect(() => {
    if (naverMap === null)
      return;

    const location = new naver.maps.LatLng(geolocation.latitude, geolocation.longitude);
    naverMap.setCenter(location);

    // 기존 현재 위치 마커 제거
    if (curPos) {
      curPos.setMap(null);
    }

    // 현재 위치 맵에 표시
    setCurPos(setMapIcon(currentPos, location, naverMap, 40, 40, false));

  }, [geolocation])

  return (
    match.isSuccess ?
      <div>
        <div ref={mapElement} className="w-full h-[364px]" ></div >
        <div className="w-[320px] pl-23 pt-21">
          <div className="flex">
            <img src={imgUrl}></img>
            <div>{match.data.title}</div>
          </div>
          <div className="w-[320px] h-2 bg-gray-600"></div>
          <div>
            <div className="flex">
              <img></img>
              <div>장소</div>
            </div>
            <div>{match.data.place.address}</div>
          </div>
          <div className="flex">
            <div>
              <div className="flex">
                <img></img>
                <div>일시</div>
              </div>
              <div>{match.data.registerDate}</div>
            </div>
            <div>
              <div className="flex">
                <img></img>
                <div>게임 시간</div>
              </div>
              <div>{match.data.time}시간</div>
            </div>
          </div>
          <div className="flex">
            <div>
              <div className="flex">
                <img></img>
                <div>게임 종류</div>
              </div>
              <div>{match.data.type}</div>
            </div>
            <div>
              <div className="flex">
                <img></img>
                <div>게임 수준</div>
              </div>
              <div>{match.data.level}시간</div>
            </div>
          </div>
          <div>
            <div className="flex">
              <img></img>
              <div>성별</div>
            </div>
            <div>{match.data.sex}</div>
          </div>
          <div className="w-[320px] h-2 bg-gray-600"></div>
        </div>

        <JoinButton onClick={join}>참여 하기</JoinButton>
      </div > : <div></div>

  )
}
