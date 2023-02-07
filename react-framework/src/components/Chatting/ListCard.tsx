import { Profile } from "./Profile"
import { useNavigate } from "react-router-dom";

interface ListCardProps {
    roomProfile: string;    // 채팅방 사진(팀 로고, 기본 이미지 등등)
    title: string;      // 채팅방 제목
    personnel: number;  // 채팅방 인원
    latestMsg: string   // 채팅방 제목 밑에서 볼 수 있는 최근 메세지
}

export default function ListCard({ roomProfile, title, personnel, latestMsg }: ListCardProps) {

    const navigate = useNavigate();
    function handleOnClickToChattingRoom() {
        return (
            // room/1 대신 변수 사용하기
            navigate("/chatting/room/1")
        )
    }

    return (
        <div className="flex bg-white w-full h-60 py-10" onClick={() => handleOnClickToChattingRoom()}>
            <Profile profile={roomProfile} className="self-center mx-14" />
            <div className="flex flex-col font-inter">
                <div className="flex mt-5">
                    <p className="text-15 font-semibold">{title}</p>
                    <p className="ml-5 -mt-1 text-15 opacity-20">{personnel}</p>
                </div>
                <div className="text-13 opacity-50">
                    <p>{latestMsg}</p>
                </div>

            </div>
        </div>
    )
}