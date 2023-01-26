import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef } from "react"
import { useReducer } from "react"

type Tab = { type: 'AUTOMATCH' | 'LIST' };

function ContentBox() {
    return (
        <div className="static top-16.75 w-41 h-169.5 mx-3 my-0 grow-0 bg-[#f5f5f5]">
            <h1>hi</h1>
        </div>
    )
}

export default function MatchPage() {
    return (
        <div>
            <ContentBox></ContentBox>
        </div>
    )
}