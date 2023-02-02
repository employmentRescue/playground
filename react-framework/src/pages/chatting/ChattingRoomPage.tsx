import { useParams } from "react-router-dom"
import { ChattingBubble } from "@/components/Chatting/ChattingBubble";

export default function ChattingRoomPage() {
    const params = useParams();
    return (
        <div className="w-full h-full flex flex-col">
            <div className="self-center font-inter text-20">
                {params.roomId}번 채팅방
            </div>
            <ChattingBubble />
        </div>
    )
}