import { KAKAO_LOGIN_TEST_SERVER_URL, SERVER_URL } from "@/utils/url";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { useNavigate } from "react-router-dom";
import useGetUserInfoByToken from "@/hooks/user/useGetUserInfoByToken";
import { useEffect } from "react"

export default function LoginSuccessPage() {
    // 이 페이지는 굳이 만들 필요 없이 바로 메인 페이지로 연결시켜도 될 듯 함
    // Your web app's Firebase configuration
    const navigate = useNavigate();
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCZSaWxtPJKnVTUtkmIDxIMCreCEr0ScbA",
        authDomain: "fir-fdef7.firebaseapp.com",
        databaseURL: "https://fir-fdef7-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "fir-fdef7",
        storageBucket: "fir-fdef7.appspot.com",
        messagingSenderId: "808423483984",
        appId: "1:808423483984:web:abdb73b3b73219b3b1bf55",
        measurementId: "G-S20W3SX3K1"
    };
    const params = new URLSearchParams(location.search);
    let myToken = params.get("access_token")
    console.log("액세스 토큰 : ", myToken)
    const { data } = useGetUserInfoByToken(myToken ? myToken : "");
    console.log(data)
    useEffect(() => {
        if (data)
            console.log("내 카카오 아이디 : ", data)
    }, [data])
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    async function requestPermission() {
        console.log('Requesting permission...');
        await Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                // navigate("/");
            }
        })
    }
    requestPermission()

    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(app);
    // Add the public key generated from the console here.
    getToken(messaging, { vapidKey: "BNQmQhy0t5IXHTfP3RhasoNL_no_HYBNDPnygCfciW5c3nopkkWkqxasbcesQ5DzISkX5JvheAIOrNaeeBrQ2ho" }).then((currentToken) => {
        if (currentToken) {
            console.log("current Token : ", currentToken)
            axios.post(KAKAO_LOGIN_TEST_SERVER_URL + `/user/update/`, [{ "web_fcm_token": currentToken }])
                .then(response => {
                    console.log("토큰 보냈으니까 확인해봐")
                })
                .catch(error => console.log("뒤질래?"))
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });

    // foreground message handling
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // ...
    });

    return (
        <div>
            <h1>로그인 성공!</h1>
            <h2>인증 토큰 발급 완료</h2>
        </div>
    )
}



