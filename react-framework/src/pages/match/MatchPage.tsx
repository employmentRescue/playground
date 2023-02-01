import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef } from "react"
import { useReducer } from "react"

import basketBallMatch from "@/assets/icons/basketball-match.png"
import badmintonMatch from "@/assets/icons/badminton-match.png"
import soccerMatch from "@/assets/icons/soccer-match.png"
import basketBallOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import soccerOriginal from "@/assets/icons/soccer-original.png"


type Action = { type: 'AUTOMATCH' | 'LIST' };


type propsTab = {
    clickedTab: string, 
    changeType: () => void;
}

type listItem = {
    sportType: string,
    member: string,
    title: string,
    date: string,
    
}
// 더미 목록들
// #

interface State {
    tabType : string;
}

const initialState: State = {
    tabType : 'AUTOMATCH',
}


function registReducer(state: State, action: Action) {
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

// 자동 매치 탭
function AutoMatchTab({clickedTab, changeType}: propsTab) {

    if (clickedTab === 'LIST'){
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div className="w-164 h-50 pt-15 pl-47 {solid} bg-[#fff]" onClick={(event)=>{
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#000]" >
                    자동 매칭   
                </span>
            </div>
        )
    }
    else {
        return (
            <div className="w-164 h-50 pt-15 pl-47 border-b-1 border-solid border-[#303eff] bg-[#fff]" onClick={(event)=>{
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#303eff]">
                    자동 매칭
                </span>
            </div>
        )
    }
    
}

// 목록 텝
function ListTab({clickedTab, changeType}: propsTab) {
    if (clickedTab === 'AUTOMATCH'){
        return (
            <div className="w-164 h-50 pt-15 pl-66 bg-[#fff]" onClick={(event)=>{
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#000]">
                    목록
                </span>
            </div>
        )
    }
    else {
        return (
            <div className="w-164 h-50 pt-15 pl-66 border-b-1 border-solid border-[#303eff] bg-[#fff]" onClick={(event)=>{
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#303eff]">
                    목록
                </span>
            </div>
        )
    }
}

// 내용 - 자동매칭인지 목록인지
function Content({clickedTab}: {clickedTab: string}) {
    if (clickedTab === 'AUTOMATCH'){
        return (
            <div>
                <MatchFilterBar />
                <MatchContent />
            </div>
        )
    }
    else {
        return (
            <div>
                <ListFilterBar />
                <ListContent />
            </div>
        )
    }
}

// ================ 자동 매칭 관련 컴포넌트 =======================================================
// 자동 매칭 필터바
function MatchFilterBar() {
    return (
        <div className="w-[360px] h-53 grow-0 m-0 pt-8 pl-16 bg-[#f1f3ff]">
            <div className="w-40 h-40 grow-0 mr-11 border-solid border-2.5 border-[#efad45] rounded-20 bg-[#fde9b4]"></div>
            <img src={basketBallMatch} className="w-40 h-40 grow-0 mr-11"/>
        </div>
    )
}

// 자동 매칭 필터바 - 종목
function MatchFilterType() {
    return (
        <div className="absolute w-60 h-[157px] m-0 pt-7 px-10 rounded-15 border-solid border-1 border-[#303EFF]/50 bg-[#f1f3ff]">
            <img src={basketBallMatch} className="w-40 h-40 grow-0 mr-11 mb-10"/>
            <img src={soccerMatch} className="w-40 h-40 grow-0 mr-11 mb-10"/>
            <img src={badmintonMatch} className="w-40 h-40 grow-0 mr-11"/>
        </div>
    )
}

// 자동 매칭 필터바 - 거리범위
function MatchFilterDistance() {

}

// 자동 매칭 필터바 - 날짜
function MatchFilterDate() {
    
}

// 자동 매칭 필터바 - 시간
function MatchFilterTime() {
    
}

// 자동 매칭 필터바 - 기타
function MatchFilterEtc() {
    
}

// 자동 매칭 내용
function MatchContent() {
    return (
        <div className="relation w-[360px] h-[575px] m-0 pt-8 pl-6 bg-[#fff]">
            <MatchFilterType />
        </div>
    )
}

// ================ 목록 관련 컴포넌트 =======================================================
// 목록 필터바
function ListFilterBar() {
    return (
        <div className="w-[360px] h-93 grow-0 m-0 pt-8 pl-16 border-b-1 border-solid border-[#D8CAFF] bg-[#f1f3ff]">
            <img src={basketBallMatch} className="w-40 h-40 grow-0 mr-11"/>
        </div>
    )
}

// 목록 각 컴포넌트
function ListItem() {
    return (
        <div className="relative w-328 h-120 flex-grow-0 my-10 mr-15 ml-17 pr-17 rounded-15 bg-[#fff] overflow-hidden">
            <div className="absolute w-59 h-120 flex-grow-0 pt-51 text-center  mr-11 inline-block bg-[#fde8b4]">
                <span className="h-18 flex-grow-0 font-inter text-[15px] font-bold text-left text-[#000]">
                    4/6
                </span>
            </div>
            <img src={basketBallOriginal} className="absolute w-20 h-20 flex-grow-0 top-17 left-70 p-0 inline-block " />
            <span className="absolute w-[117px] h-18 flex-grow-0 top-18 left-[101px] font-inter text-[15px] font-bold test-left inline-block text-[#000]">3대 3 농구하실분~</span>
            <div className="absolute w-1 h-105 flex-grow-0 top-8 left-[259px] bg-[#d9d9d9]"></div>
            <span className="absolute w-35 h-37 flex-grow-0 top-41 left-[276px] font-inter text-[13px] text-left font-[#000]">
                01-15
                19:00
            </span>
        </div>
    )
}

// 목록 전체 내용
function ListContent(){
    return (
        <div className="w-360px h-full m-0 pt-10 bg=[#f5f5f5]">
            <ListItem />
        </div>
    )
}

// 상세 목록

// 매치 페이지 출력
export default function MatchPage() {
    
    const [state, dispatch] = useReducer(registReducer, initialState);

    const autoMatch = () => dispatch({type : 'AUTOMATCH'});
    const list = () => dispatch({type: 'LIST'});

    return (
        <div className="h-full bg-[#f5f5f5] m-0 pt-12">
            <div className="w-[360px] h-50 px-16 py-0 grow-0 bg-[#fff] rounded-t-lg flex">
                <AutoMatchTab clickedTab={state.tabType} changeType={()=>{
                    autoMatch();
                }}/>
                <ListTab clickedTab={state.tabType} changeType={()=>{
                    list();
                }}/>
            </div>
            <Content clickedTab={state.tabType}/>
        </div>
    )
}