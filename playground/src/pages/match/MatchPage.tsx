import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef } from "react"
import { useReducer } from "react"

type TabType = { type: 'AUTOMATCH' | 'LIST' };

// 탭바의 목록 탭
function MatchListTab() {
    return (
        <div className="w-164 h-50 pt-15 pl-66 border-b-1 border-solid border-[#303eff] bg-[#fff]">
            <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#303eff]">
                목록
            </span>
        </div>
    )
}

// 탭바의 자동매칭 탭
function AutoMatchTab() {
    const solid = "border-b-1 border-solid border-[#303eff]";
    return (
        <div className="w-164 h-50 pt-15 pl-47 {solid} bg-[#fff]">
            <span className="w-71 h-24 font-normal font-inter text-[17px] leading-normal text-left text-[#303eff]">
                자동 매칭
            </span>
        </div>
    )
}

// 자동매칭, 목록을 고를수 있는 탭바
function TabBar() {
    return (
        <div className="w-[360px] h-50 px-16 py-0 grow-0 bg-[#fff] rounded-t-lg flex">
            <AutoMatchTab />
            <MatchListTab />
        </div>
    )
}

export default function MatchPage() {
    return (
        <div className="h-screen bg-[#f5f5f5] m-0 pt-12">
            <TabBar />
        </div>
    )
}