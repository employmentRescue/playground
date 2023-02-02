import { useParams } from "react-router-dom"
import { SpeechBubble } from "@/components/Chatting/SpeechBubble";

export default function ChattingRoomPage() {
    const params = useParams();
    return (
        <div className="w-full h-full flex flex-col">
            <div className="self-center font-inter text-20">
                {params.roomId}번 채팅방
            </div>
            <SpeechBubble isMine={false} innerText="안녕하세요. 반가워요" />
        </div>
    )
}