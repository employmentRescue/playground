<!doctype html>
<html lang="en">
  <head>
    <title>Websocket Chat</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- CSS -->
    <link rel="stylesheet" href="/webjars/bootstrap/4.3.1/dist/css/bootstrap.min.css">
    <style>
      [v-cloak] {
          display: none;
      }
    </style>
  </head>
  <body>
  <h2>ddddddddd</h2>
    <div class="container" id="app" v-cloak>

        <div class="row">
            <div class="col-md-12">
                <h3>환영합니다 {{userId}}님</h3>
            </div>
        </div>
        <div class="login-box">
            <div v-if="checkId" class="login-box-child">
                <input type="text" class="input-box" v-model="inputId"><br>
                <input type="text" class="input-box" v-model="password">
            </div>
        </div>
        <div class="btn-box">
            <button v-if="checkId" class="btn btn-primary" type="button" @click="doLogin">로그인</button>
            <button v-if="!checkId" class="btn btn-primary" type="button" @click="doLogout">로그아웃</button>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h3>채팅방 리스트</h3>
            </div>
        </div>
<#--        <div class="input-group">-->
<#--            <div class="input-group-prepend">-->
<#--                <label class="input-group-text">방제목</label>-->
<#--            </div>-->
<#--            <input type="text" class="form-control" v-model="room_name" @keyup.enter="createRoom">-->
<#--            <div class="input-group-append">-->
<#--                <button class="btn btn-primary" type="button" @click="createRoom">채팅방 개설</button>-->
<#--            </div>-->
<#--        </div>-->


        <ul class="list-group">
            <li class="list-group-item list-group-item-action" v-for="item in chatrooms" v-bind:key="item.teamChatroomId" v-on:click="enterRoom(item.teamChatroomId)">
                {{item.chatroomName}}
            </li>
        </ul>
    </div>
    <!-- JavaScript -->
    <script src="/webjars/vue/2.5.16/dist/vue.min.js"></script>
    <script src="/webjars/axios/0.17.1/dist/axios.min.js"></script>
    <script src="/webjars/bootstrap/4.3.1/dist/js/bootstrap.min.js"></script>
    <script src="/webjars/sockjs-client/1.1.2/sockjs.min.js"></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                checkId: 'true',
                userId: '',
                inputId: '',
                password: '',
                room_name : '',
                chatrooms: [
                ]
            },
            created() {
                localStorage.removeItem("roomId");
                this.loginCheck();
                this.findAllRoom();

            },
            methods: {
                findAllRoom() {
                    axios.get('/chat/TeamChatRoom/'+this.userId).then(response => {
                        console.log(response.data);
                        this.chatrooms = response.data; });
                },
                loginCheck(){
                    let id = localStorage.getItem("userId");
                    if(id != null) {
                        this.checkId = false;
                        this.userId = id;
                    }
                },
                doLogin(){
                    let id  = this.inputId;
                    localStorage.setItem("userId", id);
                    location.href="/chat/roomD";
                },
                doLogout(){
                    localStorage.removeItem("userId");
                    location.href="/chat/roomD";
                },
                enterRoom(roomId){
                    localStorage.setItem("roomId", roomId);
                    location.href="/chat/room/enter/" + roomId;
                }
            } // methods
        });
    </script>
  </body>
</html>