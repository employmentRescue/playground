import Notice from "@/components/Chatting/Notice"
import ListCard from "@/components/Chatting/ListCard"
import basketball from "@/assets/profiles/team-basketball.png"
import basketball2 from "@/assets/profiles/team-basketball2.png"
import autoMatchfootball from "@/assets/profiles/auto-match-football.png"
import autoMatchBasketball from "@/assets/profiles/auto-match-basketball.png"
import autoMatchBadminton from "@/assets/profiles/auto-match-badminton.png"

import useGetAllChattingRoomsByMemberId from "@/hooks/chat/useGetAllChattingRoomsByMemberId"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setTabName } from "@/stores/tab/tabName"
import { RootState } from "@/stores/store"

interface Room {
    roomId: number;
    roomProfile: string;
    title: string;
    personnel: number;
}

export default function ChattingListPage() {

    const myUserId = useSelector((state: RootState) => {
        return state.userId
    })
    const dispatch = useDispatch();
    const ChattingList = useGetAllChattingRoomsByMemberId(myUserId);

    useEffect(() => {
        dispatch(setTabName('채팅 목록'))
        console.log(ChattingList)
    }, [])

    return (
        <div className="flex flex-col h-auto">
            <Notice title="오늘 운동은 어떠셨나요?" content="팀원들에게 격려의 메세지를 남겨주세요!" />
            <ListCard roomId={1} roomProfile={basketball} title="슬램덩크" personnel={6} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomId={2} roomProfile={basketball2} title="대전농구팀" personnel={8} latestMsg="오늘 슬램덩크 팀과 대결 있습니다." />
            <ListCard roomId={3} roomProfile={autoMatchfootball} title="01-16축구" personnel={22} latestMsg={"매칭이 완료되었습니다!"} />
            <ListCard roomId={4} roomProfile={autoMatchBadminton} title="01-17배드민턴" personnel={2} latestMsg="매칭이 완료되었습니다!" />
        </div>
    )
}