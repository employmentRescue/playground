import defaultProfile from "@/assets/profiles/default-profile.png"
import emoticonButton from "@/assets/icons/chatting-emoticon.png"
import sendButton from "@/assets/icons/send-message-button.png"

import { useParams } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import { RootState } from "@/stores/store";
import { setTabName } from "@/stores/tab/tabName";
import { SpeechBubble } from "@/components/Chatting/SpeechBubble";
import { CHATTING_SERVER_URL, SOCKET_URL } from "@/utils/url";


type TextList = {
    "chatroomId": string;
    "regTime": string;
    "memberId": string;
    "content": string;
    "notice": boolean;
    "type": 'TALK' | 'ENTER'
}

let sock = new SockJS(SOCKET_URL + "/ws-stomp")
let webSocket = Stomp.over(sock);
webSocket.debug = () => console.log()

export default function ChattingRoomPage() {
    const params = useParams();

    // 더미 데이터가 조금 많습니다..

    const [textList, setTextList] = useState<TextList[]>([])

    const recvMessage = (message: any) => {
        setTextList(textList => [...textList, { "chatroomId": `${message.chatroomId}`, "regTime": "10", "memberId": message.type == 'ENTER' ? '[알림]' : String(message.memberId), "content": message.content, "notice": false, "type": message.type }])

    }

    const sendMessage = (content: string) => {
        webSocket.send("/pub/chat/Message", {}, JSON.stringify({ "chatroomId": params.roomId, "regTime": '10', "memberId": myUserId, "content": content, "isNotice": false, "type": 'TALK' }));
        content = '';
    }

    const getMessageList = async () => {
        await axios.get(CHATTING_SERVER_URL + `/chat/messageList/${params.roomId}`)
            .then(response => {
                console.log(response.data)
                setTextList(textList => [...textList, ...response.data])
            });
    }
    // 채팅방 처음 접속 시 API에서 해당 채팅방의 모든 메시지 기록을 받아옴
    useEffect(() => {
        dispatch(setTabName(`roomid=${params.roomId}에 해당하는 팀 이름 넣기`))
        console.log("1111111111111111111111111")

        getMessageList()
    }, [])

    useEffect(() => {
        webSocket.connect({}, function (frame: any) {
            webSocket.subscribe(`/sub/chat/room/` + `${params.roomId}`, function (message) {
                recvMessage(JSON.parse(message.body));
            });
            webSocket.send(`/pub/chat/Message`, {}, JSON.stringify({ "chatroomId": `${params.roomId}`, "regTime": '10', "memberId": `${myUserId}`, "isNotice": false, "type": 'ENTER' }));
        }, function (error: any) {
            alert("error" + error)
        })
    }, [textList])

    // 채팅이 올라올 때 마다 스크롤도 같이 움직임
    useEffect(() => {
        window.scrollTo(0, scrollRef.current.scrollHeight)
    }, [textList])

    const [activateSend, setActivateSend] = useState("opacity-40")
    const [inputValue, setInputValue] = useState("")

    const myUserId = useSelector((state: RootState) => {
        return state.userId
    })
    let scrollRef: any | undefined = useRef(null);
    let inputRef: any | undefined = useRef(null);


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
            setInputValue("")
            setActivateSend("opacity-40")
            sendMessage(inputValue)
            inputRef.current.focus()
        }
    }

    // 버튼 클릭으로도 텍스트 전송이 가능
    function handleOnClick() {
        if (!inputValue) return
        setInputValue("")
        setActivateSend("opacity-40")
        sendMessage(inputValue)
        inputRef.current.focus()
    }

    const dispatch = useDispatch();


    // 서버에서 불러온 해당 채팅방의 모든 채팅을 화면에 렌더링 해줄 함수
    const TextListRendering = () => {
        let index = 0
        const Result = textList.map((text: TextList) => {
            index++;
            return (
                params.roomId == String(text.chatroomId) && <SpeechBubble
                    key={index}
                    isMine={String(myUserId) == text.memberId}
                    nickName={text.memberId}    // 닉네임 대신 임시로 멤버 ID
                    innerText={text.content}
                    profile={defaultProfile}    // 임시로 기본 이미지
                    dateTime={new Date()}
                />
            )
        })
        return Result
    }

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