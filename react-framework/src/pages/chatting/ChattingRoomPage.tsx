import { useParams } from "react-router-dom"
import { SpeechBubble } from "@/components/Chatting/SpeechBubble";
import defaultProfile from "@/assets/profiles/default-profile.png"

type TextList = { isMine: boolean, innerText: string, profile: string }[]


export default function ChattingRoomPage() {
    const params = useParams();
    const textList: TextList = [
        {
            isMine: false,
            innerText: "안녕하세요. 반가워요",
            profile: defaultProfile
        },
        {
            isMine: false,
            innerText: "축구할 사람?",
            profile: defaultProfile
        },
        {
            isMine: true,
            innerText: "오늘 야근이에요ㅠㅠ",
            profile: defaultProfile
        },
        {
            isMine: false,
            innerText: "아쉽네요..",
            profile: defaultProfile
        },
        {
            isMine: true,
            innerText: "내일 6시에 축구 하실분 계신가요?",
            profile: defaultProfile
        },
        {
            isMine: false,
            innerText: "축구 ㄱ?",
            profile: defaultProfile
        }
    ]

    const TextListRendering = () => {
        const Result = textList.map((text) => {
            return <SpeechBubble key={""} isMine={text.isMine} innerText={text.innerText} profile={text.profile}/>
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