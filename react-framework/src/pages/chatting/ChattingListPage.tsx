import Notice from "@/components/Chatting/Notice"
import ListCard from "@/components/Chatting/ListCard"
import basketball from "@/assets/profiles/team-basketball.png"
import basketball2 from "@/assets/profiles/team-basketball2.png"
import autoMatchfootball from "@/assets/profiles/auto-match-football.png"
import autoMatchBasketball from "@/assets/profiles/auto-match-basketball.png"
import autoMatchBadminton from "@/assets/profiles/auto-match-badminton.png"

import useGetAllTeamChattingRoomsByMemberId from "@/hooks/chat/useGetAllChattingRoomsByMemberId"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setTabName } from "@/stores/tab/tabName"
import { RootState } from "@/stores/store"
import useGetAllGatheringChattingRooms from "@/hooks/chat/useGetAllGatheringChattingRooms"

interface Room {
    roomId: number;
    roomProfile: string;
    title: string;
    personnel: number;
}

export default function ChattingListPage() {

    const myUserId = useSelector((state: RootState) => {
        return state.userId.id
    })
    const dispatch = useDispatch();
    const team = useGetAllTeamChattingRoomsByMemberId(myUserId);
    const gather = useGetAllGatheringChattingRooms(myUserId);

    useEffect(() => {
        dispatch(setTabName('채팅 목록'))
    }, [])

    useEffect(() => {
        console.log(team.data)
        console.log(gather.data)
    }, [team.data, gather.data])

    const renderTeamChatRooms = () => {
        return team.data && team.data.map((chattingRoom: any) => {
            return <ListCard key={chattingRoom.teamChatroomId} roomId={chattingRoom.teamChatroomId} roomProfile={basketball} title={chattingRoom.chatroomName} latestMsg={chattingRoom.lastMessageContent} unreadMsgCount={chattingRoom.unreadMessageNumber} />
        })
    }

    const renderGatheringChatRooms = () => {
        return gather.data && gather.data.map((chattingRoom: any) => {
            return <ListCard key={chattingRoom.gatheringChatroomId} roomId={chattingRoom.gatheringChatroomId} roomProfile={basketball} title={chattingRoom.chatroomName} latestMsg={chattingRoom.lastMessageContent} unreadMsgCount={chattingRoom.unreadMessageNumber} />
        })
    }

    return (
        <div className="flex flex-col h-[calc(100%-110px)] bg-white">
            <Notice title="오늘 운동은 어떠셨나요?" content="팀원들에게 격려의 메세지를 남겨주세요!" />
            {renderTeamChatRooms()}
            {renderGatheringChatRooms()}
        </div>
    )
}