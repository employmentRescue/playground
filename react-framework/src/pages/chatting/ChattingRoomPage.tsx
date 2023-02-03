import { useParams } from "react-router-dom"
import { SpeechBubble } from "@/components/Chatting/SpeechBubble";
import defaultProfile from "@/assets/profiles/default-profile.png"
import emoticonButton from "@/assets/icons/chatting-emoticon.png"
import sendButton from "@/assets/icons/send-message-button.png"
import { useState, useRef } from "react"

type TextList = { isMine: boolean, innerText: string, profile: string }[]


export default function ChattingRoomPage() {
    const params = useParams();
    const initialTextList: TextList = [
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
    const [textList, setTextList] = useState(initialTextList)
    const [activateSend, setActivateSend] = useState("opacity-40")
    const [inputValue, setInputValue] = useState("")

    const newTextList = {
        isMine: true,
        innerText: inputValue,
        profile: defaultProfile
    }

    let inputRef: any = useRef();

    const TextListRendering = () => {
        let index = 0
        const Result = textList.map((text) => {
            index++;
            return <SpeechBubble key={index} isMine={text.isMine} innerText={text.innerText} profile={text.profile}/>
        })
        return Result
    }

    
    const handleOnChange = (e: any) => {
        setInputValue(e.target.value)
        if (e.target.value) {
            setActivateSend("")
        } else {
            setActivateSend("opacity-40")
        }
    }

    const handleKeyUp = (e: any) => {
        console.log(e)
        if (e.code === "Enter") {
            console.log(e.target.value)
            
            setTextList(
                [...textList, newTextList]
            )
            setInputValue("")
            inputRef.current.focus()
        }
    }

    function handleOnClick() {
        setTextList([...textList, newTextList])
        setInputValue("")
        inputRef.current.focus()
    }

    return (
        <div className="w-full h-auto flex flex-col justify-between">
            <div>
                <div className="flex justify-center font-inter text-20">
                    {params.roomId}번 채팅방
                </div>
                <div>{TextListRendering()}</div>
            </div>
            <div className="flex h-40 bg-white w-full sticky bottom-55">
                <img src={emoticonButton} className="w-21 h-21 ml-18 self-center" />
                <input
                    value={inputValue}
                    onChange={(e) => handleOnChange(e)}
                    className="ml-13 w-full"
                    placeholder="메시지 입력"
                    onKeyPress={(e) => handleKeyUp(e)}
                    ref={inputRef}
                />
                <img src={sendButton} onClick={() => handleOnClick()} className={"w-21 h-21 mx-10 self-center " + activateSend} />
            </div>
        </div>
    )
}