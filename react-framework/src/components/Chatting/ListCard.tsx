import { Profile } from "./Profile"
import { useNavigate } from "react-router-dom";
import { useLongPress } from "use-long-press";
import { useCallback, useState } from "react";

import ChatListModal from "./ChatListModal";

interface ListCardProps {
    roomId: number;
    roomProfile: string;    // 채팅방 사진(팀 로고, 기본 이미지 등등)
    title: string;      // 채팅방 제목
    latestMsg: string;   // 채팅방 제목 밑에서 볼 수 있는 최근 메세지
    unreadMsgCount: number;
}

export default function ListCard({ roomId, roomProfile, title, latestMsg, unreadMsgCount }: ListCardProps) {

    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    function handleOnClickToChattingRoom() {
        return (
            // room/1 대신 변수 사용하기
            location.assign(`/chatting/room/${roomId}`)
        )
    }

    const callback = useCallback((event: any) => {
        setShowModal(!showModal)
    }, [])

    const onLongPress = useLongPress(callback, { threshold: 600 })

    return (
        <div className="flex">
            {showModal && <ChatListModal showModal={showModal} setShowModal={setShowModal} />}
            <div className="flex bg-white w-full h-70 py-10" onClick={() => handleOnClickToChattingRoom()} {...onLongPress()}>
                <Profile profile={roomProfile} className="self-center mx-14" />
                <div className="flex w-full flex-col ">
                    <div className="flex w-full mt-5 justify-between">
                        <div className="text-15 font-semibold">{title}</div>
                        <div className="flex w-30 h-20 rounded-15 bg-red-600 text-white mr-20 justify-center items-center text-12">{unreadMsgCount}</div>
                    </div>
                    <div className="text-13 opacity-50">
                        <p>{latestMsg}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}