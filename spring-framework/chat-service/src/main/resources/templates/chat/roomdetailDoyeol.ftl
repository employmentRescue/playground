<!doctype html>
<html lang="en">
  <head>
    <title>Websocket ChatRoom</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/webjars/bootstrap/4.3.1/dist/css/bootstrap.min.css">
    <style>
      [v-cloak] {
          display: none;
      }
    </style>
  </head>
  <body>
    <div class="container" id="app" v-cloak>
        <div>
            <h2>{{room.chatroomName}}</h2>
        </div>
        <div class="input-group">
            <div class="input-group-prepend">
                <label class="input-group-text">내용</label>
            </div>
            <input type="text" class="form-control" v-model="content" @keyup.enter="sendMessage">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="sendMessage">보내기</button>
            </div>
        </div>
        <ul class="list-group">
            <li class="list-group-item" v-for="message in messages">
                {{message.memberId}} - {{message.content}}</a>
            </li>
        </ul>
        <div></div>
    </div>
    <!-- JavaScript -->
    <script src="/webjars/vue/2.5.16/dist/vue.min.js"></script>
    <script src="/webjars/axios/0.17.1/dist/axios.min.js"></script>
    <script src="/webjars/bootstrap/4.3.1/dist/js/bootstrap.min.js"></script>
    <script src="/webjars/sockjs-client/1.1.2/sockjs.min.js"></script>
    <script src="/webjars/stomp-websocket/2.3.3-1/stomp.min.js"></script>
    <script>
        // websocket & stomp initialize
        // var sock = new SockJS("https://192.168.31.247:8080/ws-stomp");
        var sock = new SockJS("https://localhost:8080/ws-stomp");
        var ws = Stomp.over(sock);
        // vue.js
        var vm = new Vue({
            el: '#app',
            data: {
                roomId: '',
                room: {},
                memberId: '',
                content: '',
                messages: []
            },
            created() {
                this.memberId = localStorage.getItem('userId');
                this.roomId = localStorage.getItem('roomId');
                this.findRoom();
                this.bringAllMessage();
                this.readMessage();
            },
            methods: {
                findRoom: function() {
                    axios.get('/chat/TeamChatRoom/enter/'+this.roomId).then(response => {
                        console.log("111111");
                        console.log(response.data);
                        this.room = response.data; });
                },
                sendMessage: function() {
                    ws.send("/pub/chat/Message", {}, JSON.stringify({chatroomId:this.roomId, regTime: '10', memberId:this.memberId, content:this.content, isNotice:false, type:'TALK'}));
                    this.content = '';
                },
                recvMessage: function(message) { //Todo 메세지 받는거 필드값 다 넣어주고 테스트
                    this.messages.push({"chatroomId":message.chatroomId, "regTime":"10", "memberId":message.type=='ENTER'?'[알림]':message.memberId,"content":message.content, "isNotice":false, "type":message.type})
                    axios.post('/chat/readMessage/'+this.roomId+'?memberId='+this.memberId, message);
                },
                bringAllMessage(){
                    axios.get('/chat/messageList/'+this.roomId).then(response => {
                        console.log(response.data);
                        const messages = response.data;
                        messages.forEach((message, index, messages)=>
                            this.messages.push(message)
                        )
                    });
                },
                readMessage(){
                    const message = this.messages[this.messages.length-1];
                    console.log(message);
                    axios.post('/chat/readMessage/'+this.roomId+'?memberId='+this.memberId, message);
                }
            }
        });
        // pub/sub event
        ws.connect({}, function(frame) {
            ws.subscribe("/sub/chat/room/"+vm.$data.roomId, function(message) {
                var recv = JSON.parse(message.body);
                vm.recvMessage(recv);
            });
            ws.send("/pub/chat/Message", {}, JSON.stringify({chatroomId:vm.$data.roomId, regTime: '10', memberId:this.memberId, isNotice:false, type:'ENTER'}));
        }, function(error) {
            alert("error "+error);
        });
    </script>
  </body>
</html>