import { KAKAO_LOGIN_TEST_SERVER_URL, SERVER_URL, USER_SERVER_URL } from "@/utils/url";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetUserInfoByToken from "@/hooks/user/useGetUserInfoByToken";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { saveUserId } from '@/stores/user/userId';

export default function LoginSuccessPage() {
    // 이 페이지는 굳이 만들 필요 없이 바로 메인 페이지로 연결시켜도 될 듯 함
    // Your web app's Firebase configuration

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const locationLogin = useLocation();
    console.log("location: ", locationLogin);
    const searchParams = new URLSearchParams(locationLogin.search);
    console.log(searchParams);
  const userId = searchParams.get('user_id');
  const accessToken = searchParams.get('access_token');
  if (window.isFluttApp) {
    window.setAccess_tokenOnFlutterApp(accessToken);
  }

  console.log(userId);
  
    useEffect(() => {
        console.log(userId)
      dispatch(saveUserId(userId))
      if (userId != null) {
        navigate('/home')
      } 
    }, [userId])

    return (
        <div>
            <h1>로그인 성공!</h1>
        </div>
    )
}



