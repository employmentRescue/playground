import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef } from "react"
import { useReducer } from "react"

type Action = { type: 'AUTOMATCH' | 'LIST' };

type props = {
    clickedTab: string, 
    changeType: () => void;
}

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

function AutoMatchTab({clickedTab, changeType}: props) {
    console.log(clickedTab);

    if (clickedTab === 'LIST'){
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div className="w-164 h-50 pt-15 pl-47 {solid} bg-[#fff]" onClick={(event)=>{
                event.preventDefault();
                changeType();
                console.log(clickedTab)
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
                console.log(clickedTab)
            }}>
                <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#303eff]">
                    자동 매칭
                </span>
            </div>
        )
    }
    
}

function ListTab({clickedTab, changeType}: props) {
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

// 매치 페이지 출력
export default function MatchPage() {
    
    const [state, dispatch] = useReducer(registReducer, initialState);

    const autoMatch = () => dispatch({type : 'AUTOMATCH'});
    const list = () => dispatch({type: 'LIST'});

    return (
        <div className="h-screen bg-[#f5f5f5] m-0 pt-12">
            <div className="w-[360px] h-50 px-16 py-0 grow-0 bg-[#fff] rounded-t-lg flex">
                <AutoMatchTab clickedTab={state.tabType} changeType={()=>{
                    autoMatch();
                }}/>
                <ListTab clickedTab={state.tabType} changeType={()=>{
                    list()
                }}/>
            </div>
        </div>
    )
}