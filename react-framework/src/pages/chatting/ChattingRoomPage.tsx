import defaultProfile from "@/assets/profiles/default-profile.png"
import emoticonButton from "@/assets/icons/chatting-emoticon.png"
import sendButton from "@/assets/icons/send-message-button.png"

import { setTabName } from "@/stores/tab/tabName";
import { SpeechBubble } from "@/components/Chatting/SpeechBubble";
import useWebSocket from "@/hooks/chat/useWebSocket";

import { useParams } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux";


type TextList = {
    roomId: number,
    isMine: boolean,
    nickName?: string,
    innerText: string,
    profile: string,
    dateTime?: Date,
}

export default function ChattingRoomPage() {
    const params = useParams();

    // 더미 데이터가 조금 많습니다..
    const initialTextList: TextList[] = [
        {
            roomId: 1,
            isMine: false,
            nickName: "축구1",
            innerText: "안녕하세요. 반가워요",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 1,
            isMine: false,
            nickName: "축구2",
            innerText: "축구할 사람?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 1,
            isMine: true,
            innerText: "오늘 야근이에요ㅠㅠ",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 1,
            isMine: false,
            nickName: "축구3",
            innerText: "아쉽네요..",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 1,
            isMine: true,
            innerText: "내일 6시에 축구 하실분 계신가요?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 1,
            isMine: false,
            nickName: "축구1",
            innerText: "축구 ㄱ?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },


        {
            roomId: 2,
            isMine: false,
            nickName: "농구1",
            innerText: "안녕하세요. 반가워요",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 2,
            isMine: false,
            nickName: "농구2",
            innerText: "농구할 사람?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 2,
            isMine: true,
            innerText: "오늘 본가 내려가는 날이에요 ㅠㅠ",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 2,
            isMine: false,
            nickName: "농구1",
            innerText: "아쉽네요..",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 2,
            isMine: true,
            innerText: "내일 6시에 농구 하실분 계신가요?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 2,
            isMine: false,
            nickName: "농구2",
            innerText: "농구 ㄱ?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },


        {
            roomId: 3,
            isMine: false,
            nickName: "배민1",
            innerText: "안녕하세요. 반가워요",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 3,
            isMine: false,
            nickName: "배민2",
            innerText: "배드민턴할 사람?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 3,
            isMine: true,
            innerText: "제가 오늘 몸이 안좋아서요ㅠㅠ",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 3,
            isMine: false,
            nickName: "배민2",
            innerText: "아쉽네요..",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 3,
            isMine: true,
            innerText: "내일 6시에 배드민턴 하실분 계신가요?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 3,
            isMine: false,
            nickName: "배민6",
            innerText: "배드민턴 ㄱ?",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },

        {
            roomId: 4,
            isMine: true,
            innerText: "살려줘..",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },
        {
            roomId: 4,
            isMine: false,
            nickName: "닉네임",
            innerText: "채팅방 만들기 너무 어려워요ㅠㅠㅠㅠㅠㅠㅠㅠ",
            profile: defaultProfile,
            dateTime: new Date("2023-02-04 21:11:04")
        },

    ]
    const [textList, setTextList] = useState(initialTextList)
    const [activateSend, setActivateSend] = useState("opacity-40")
    const [inputValue, setInputValue] = useState("")
    const newTextList: TextList = {
        roomId: 1,
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
                params.roomId == String(text.roomId) && <SpeechBubble
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTabName(`roomid=${params.roomId}에 해당하는 팀 이름 넣기`))
    }, [])

    useEffect(() => {
        window.scrollTo(0, scrollRef.current.scrollHeight)
    }, [textList])

    return (
        <div className="flex flex-col h-auto w-full bg-gray-100">
            <div>
                <div className="h-10" />
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