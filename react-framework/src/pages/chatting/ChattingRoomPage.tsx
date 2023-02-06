import { useParams } from "react-router-dom"
import { SpeechBubble } from "@/components/Chatting/SpeechBubble";
import defaultProfile from "@/assets/profiles/default-profile.png"
import emoticonButton from "@/assets/icons/chatting-emoticon.png"
import sendButton from "@/assets/icons/send-message-button.png"
import { useState, useRef, useEffect } from "react"

type TextList = {
    isMine: boolean,
    nickName?: string,
    innerText: string,
    profile: string,
    dateTime?: Date,
}[]

export default function ChattingRoomPage() {
    const params = useParams();
    const initialTextList: TextList = [
        {
            isMine: false,
            nickName: "닉네임1",
            innerText: "안녕하세요. 반가워요",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            isMine: false,
            nickName: "축구1",
            innerText: "축구할 사람?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            isMine: true,
            innerText: "오늘 야근이에요ㅠㅠ",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            isMine: false,
            nickName: "축구1",
            innerText: "아쉽네요..",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            isMine: true,
            innerText: "내일 6시에 축구 하실분 계신가요?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            isMine: false,
            nickName: "축구2",
            innerText: "축구 ㄱ?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        }
    ]
    const [textList, setTextList] = useState(initialTextList)
    const [activateSend, setActivateSend] = useState("opacity-40")
    const [inputValue, setInputValue] = useState("")
    const newTextList = {
        isMine: true,
        innerText: inputValue,
        profile: defaultProfile,
        dateTime: new Date()
    }
    let scrollRef: any | undefined = useRef(null);
    let inputRef: any | undefined = useRef(null);

    // 서버에서 불러온 해당 채팅방의 모든 채팅을 화면에 렌더링 해줄 함수
    const TextListRendering = () => {
        let index = 0
        const Result = textList.map((text) => {
            index++;
            return (
                <SpeechBubble
                    key={index}
                    isMine={text.isMine}
                    nickName={text.nickName}
                    innerText={text.innerText}
                    profile={text.profile}
                    dateTime={text.dateTime}
                />
            )

        })
        return Result
    }

    // 메시지 입력창의 텍스트를 얻어오는 함수
    const handleOnChange = (e: any) => {
        setInputValue(e.target.value)
        if (e.target.value) {
            setActivateSend("")
        } else {
            setActivateSend("opacity-40")
        }
    }

    // Enter 입력시 메시지 입력창에 입력된 텍스트를 전송
    const handleKeyPress = (e: any) => {
        if (e.code === "Enter") {
            if (!inputValue) return
            setTextList(
                [...textList, newTextList]
            )
            setInputValue("")
            setActivateSend("opacity-40")
            inputRef.current.focus()
        }
    }

    // 버튼 클릭으로도 텍스트 전송이 가능
    function handleOnClick() {
        if (!inputValue) return
        setTextList([...textList, newTextList])
        setInputValue("")
        setActivateSend("opacity-40")
        inputRef.current.focus()
    }

    useEffect(() => {
        window.scrollTo(0, scrollRef.current.scrollHeight)
    }, [textList])

    return (
        <div className="flex flex-col h-auto w-full bg-gray-100">
            <div>
                <div className="flex justify-center font-inter text-20 my-10">
                    {params.roomId}번 채팅방
                </div>
                <div ref={scrollRef}>{TextListRendering()}</div>
                <div className="pb-40 bg-gray-100"></div>
            </div>
            <div className="flex h-40 bg-white w-full fixed bottom-55">
                <img src={emoticonButton} className="w-21 h-21 ml-18 self-center" />
                <input
                    value={inputValue}
                    onChange={(e) => handleOnChange(e)}
                    className="ml-13 w-full outline-none"
                    placeholder="메시지 입력"
                    onKeyPress={(e) => handleKeyPress(e)}
                    ref={inputRef}
                />
                <img src={sendButton} onClick={() => handleOnClick()} className={"w-21 h-21 ml-10 mr-18 self-center " + activateSend} />
            </div>
        </div>
    )
}