import { useParams } from "react-router-dom"
import { SpeechBubble } from "@/components/Chatting/SpeechBubble";

type TextList = { isMine: boolean, innerText: string }[]


export default function ChattingRoomPage() {
    const params = useParams();
    const textList: TextList = [
        {
            isMine: false,
            innerText: "안녕하세요. 반가워요"
        },
        {
            isMine: false,
            innerText: "축구할 사람?"
        },
        {
            isMine: true,
            innerText: "오늘 야근이에요ㅠㅠ"
        },
        {
            isMine: false,
            innerText: "아쉽네요.."
        },
        {
            isMine: true,
            innerText: "내일 6시에 축구 하실분 계신가요?"
        },
        {
            isMine: false,
            innerText: "축구 ㄱ?"
        }
    ]

    const TextListRendering = () => {
        const Result = textList.map((text) => {
            return <SpeechBubble key={""} isMine={text.isMine} innerText={text.innerText} />
        })
        return Result
    }


    return (
        <div className="w-full h-full flex flex-col">
            <div className="self-center font-inter text-20">
                {params.roomId}번 채팅방
            </div>
            <div>{TextListRendering()}</div>
        </div>
    )
}