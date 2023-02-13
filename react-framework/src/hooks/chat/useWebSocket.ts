import { CompatClient } from "@stomp/stompjs"
import { Stomp } from "@stomp/stompjs/esm6";
import axios from "axios";

import SockJS from "sockjs-client";

export default function useWebSocket(roomId: string, room: {}, content: string, memberId: string, messages: Array<Object>) {

    // 여긴 도열님 API 불러오는 부분이라 웹 소켓이랑 관련은 없음.
    const findRoom = () => {
        axios.get('/chat/TeamChatRoom/enter/' + roomId).then(response => {
            console.log("111111");
            console.log(response.data);
            room = response.data;
        });
    }

    const recvMessage = (message: any) => {
        messages.push({ "chatroomId": message.chatroomId, "regTime": "10", "memberId": message.type == 'ENTER' ? '[알림]' : message.memberId, "content": message.content, "isNotice": false, "type": message.type })
        axios.post('/chat/readMessage/' + roomId + '?memberId=' + memberId, message);
    }

    const bringAllMessage = () => {
        axios.get('/chat/messageList/' + roomId).then(response => {
            console.log(response.data);
            const messages = response.data;
            messages.forEach((message: any, index: number, messages: Array<Object>) =>
                messages.push(message)
            )
        });
    }
    /////////////////////////////////////////////////////////////////////

    // webSocket 관련

    const sock = new SockJS("/ws-stomp")
    const webSocket = Stomp.over(sock);

    const sendMessage = () => {
        webSocket.send("/pub/chat/Message", {}, JSON.stringify({ chatroomId: roomId, regTime: '10', memberId: memberId, content: content, isNotice: false, type: 'TALK' }));
        content = '';
    }

    webSocket.connect({}, function (frame: any) {
        webSocket.subscribe("/sub/chat/room/" + roomId, function (message) {
            const recv = JSON.parse(message.body);
            recvMessage(recv);
        });
        webSocket.send("/pub/chat/Message", {}, JSON.stringify({ chatroomId: roomId, regTime: '10', memberId: memberId, isNotice: false, type: 'ENTER' }));
    }, function (error: any) {
        console.log(error)
    })

    return {
        findRoom,
        sendMessage,
        recvMessage,
        bringAllMessage,
    }
}