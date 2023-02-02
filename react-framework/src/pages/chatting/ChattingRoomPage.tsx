import { useParams } from "react-router-dom"

export default function ChattingRoomPage() {
    const params = useParams();
    return (
        <div>{params.roomId}번 채팅방</div>
    )
}