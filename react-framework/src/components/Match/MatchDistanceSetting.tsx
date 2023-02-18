
import { useCallback, useEffect, useRef, useState } from "react";
import { ComponentProps } from "react";

import closeIcon from "@/assets/icons/exit.png";
import searchIcon from "@/assets/icons/search-icon.png";
import whiteArrow from "@/assets/icons/white-arrow.png";
import useGeolocation from "react-hook-geolocation";
import currentPos from '@/assets/icons/current-position.png';
import basketballMap from '@/assets/icons/basketball-map.png';
import footballMap from '@/assets/icons/football-map.png';
import badmintonMap from '@/assets/icons/badminton-map.png';

type Iprops = {
	clicked: () => void,
	sportsType: string,
	location: number[],
	distance: number,
	setFilterData: (attr: attrType, value: any) => void
}
type attrType = "startDate" | "location" | "distance" | "startTime" | "level" | "playTime" | "sex" | "sports" | "gameType" | "sort"




// 자동 매칭 필터바 - 거리범위
export function MatchFilterDistance({ shutOtherWindow, clicked, distance }: { shutOtherWindow: () => void, clicked: () => void, distance: number }) {

	return (
		<div className="flex flex-row w-70 h-25 flex-grow-0 mt-7 pt-0 pr-6 pb-4 pl-9 rounded-5 bg-[#303eff]"
			onClick={(e) => {
				e.preventDefault();
				clicked();
				shutOtherWindow();
			}}>
			<span className="w-41 h-15 flex-grow mt-5 p-0  text-12 font-[500] leading-tight tracking-normal text-left text-[#fff]">{'~' + distance + 'km'}</span>
			<img className="w-8 h-4 mt-10 mr-1" src={whiteArrow} alt="" />
		</div>
	)
}

// 자동 매칭 필터 - 거리범위 지정
export function MatchDistanceSetting({ clicked, sportsType, location, distance, setFilterData }: Iprops) {
	const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
	const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);
	const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
	const [circle, setCircle] = useState<naver.maps.Circle | null>(null);
	const [markerPos, setMarkerPos] = useState<any | null>(null);
	const [temDistance, setDistance] = useState(String(distance))
	const valueChange: ComponentProps<'input'>['onChange'] = (event) => {
		setDistance(event.target.value);
	}


	// naver map
	const mapElement: any | null = useRef(undefined);

	// initial call
	const geolocation = useGeolocation();

	function setMapIcon(
		icon: string,
		location: naver.maps.LatLng,
		map: naver.maps.Map,
		sizeX: number,
		sizeY: number,
		isBounce: boolean,
		clickable: boolean
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
			clickable: clickable
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

		if (!curPos)
			naverMap.setCenter(location);

		// 기존 현재 위치 마커 제거
		if (curPos) {
			curPos.setMap(null);
		}

		// 현재 위치 맵에 표시
		setCurPos(setMapIcon(currentPos, location, naverMap, 40, 40, false, false));
	}, [geolocation]);

	useEffect(() => {
		if (naverMap === null) return;

		naver.maps.Event.once(naverMap, 'click', function (e) {
			const latlng = e.coord;
			switch (sportsType) {
				case '농구':
					setMarker(setMapIcon(basketballMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true, true));
					break;
				case '축구':
					setMarker(setMapIcon(footballMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true, true));
					break;
				case '배드민턴':
					setMarker(setMapIcon(badmintonMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true, true));
					break;
			}
		})
	}, [naverMap])

	useEffect(() => {
		if (naverMap === null) return;
		naver.maps.Event.addListener(naverMap, 'click', function (e) {
			const latlng = e.coord;
			if (marker) {
				marker.setPosition(latlng);
				setMarkerPos(marker.getPosition());
			}
		})
	}, [marker])

	useEffect(() => {
		if (!naverMap || !marker) return;

		if (circle) {
			circle.setMap(null);
		}
		setCircle(new naver.maps.Circle({
			map: naverMap,
			center: marker.getPosition(),
			radius: Number(temDistance) * 1000,
			fillColor: 'red',
			fillOpacity: 0.5
		}));

	}, [markerPos, temDistance])

	return (
		<div className="flex flex-col absolute top-[-117px] left-0 place-content-around w-full h-screen m-0 p-0 z-20">
			<div className="h-1/4 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
			<div className="justify-center pt-10 w-full h-3/4 flex-grow-0 bg-[#fff] z-20">
				<div className="flex relative place-content-center w-full">
					<span className="w-70 h-16 flex-grow-0  text-[15px] text-left text-[#000]">지역 선택</span>
					<img src={closeIcon} alt="" className="absolute right-10 w-10 h-10 flex-grow-0 my-3" onClick={(e) => { e.preventDefault(); clicked(); }} />
				</div>
				<div className="flex flex-row justify-center">
					<img src={searchIcon} alt="" className="inline-block w-20 h-20 flex-grow-0 mt-15 mr-6 mb-15 ml-18" />
					<input type="text" placeholder="검색하고 싶은 지역을 입력하세요." className="w-5/6 h-25 flex-grow-0 mt-13 mr-28 mb-13 ml-6 pt-0 pl-11 rounded-[5px] bg-[#dbdbdb] font-inter text-[12px] font-[500] text-left text-[#a7a7a7]" />
				</div>
				<div ref={mapElement} className="w-full h-2/3">
					<h1>지도</h1>
				</div>
				<div className="h-1/6 justify-center mb-15 mx-13 pt-10">
					<input type="range" min="0" max="10" className="w-full" placeholder={temDistance} defaultValue={temDistance} onChange={valueChange} />
					<div className="flex mb-12 w-full place-content-between">
						<span className="w-26 h-15 flex-grow-0 mt-3  text-[12px] font-[500] text-left text-[#bbc0ff]">0km</span>
						<div className="flex">
							<div className="w-23 h-16 flex-grow-0 mt-3 p-0 text-left text-12 border-solid border-1 border-[#bbc0ff] bg-[#fff]">{temDistance}</div>
							<span className="w-26 h-15 flex-grow-0 mt-3 ml-2  text-[12px] font-[500] text-left text-[#bbc0ff]">km</span>
						</div>
					</div>
					<div className="h-1/2 flex justify-center mb-15 mx-13 pt-10">
						<div className="grid place-content-center h-34 mt-4 w-[326px] text-center bg-[#303eff] rounded-[5px] font-inter text-[15px] text-[#fff] " onClick={(e) => { e.preventDefault(); clicked(); setFilterData("distance", Number(temDistance)) }}>설정 완료</div>
					</div>
				</div>
			</div>
		</div>
	)
}
