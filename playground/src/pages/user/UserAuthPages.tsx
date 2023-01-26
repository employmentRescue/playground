import { KAKAO_AUTH_URL } from "@/services/oauth"
import { oauthRedirectHandler } from "@/services/oauthRedirectHandler"
import welcomeImg from "@/assets/welcome/welcome.png"

const LOGIN_URL = "https://localhost:3000/login"

export function LoginPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <img className="w-200 rounded-100 shadow-md" src={welcomeImg} />
            <h1 className="text-left font-bold text-35 font-inter mt-65 mb-25">환영합니다</h1>
            <h2 className="text-left font-bold text-20 text-gray-service to-transparent font-inter opacity-50 mt-24 mb-40">당신을 위한 스포츠 팀 매칭 서비스</h2>
            <a href={KAKAO_AUTH_URL}>
                <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                    width="200" />
            </a>
        </div>
    )
}

export function LoginRegisterPage() {
    oauthRedirectHandler();
    return (
        <div>
            <h1>인증 토큰 발급 중...</h1>
        </div>
    )
}

export function LoginSuccessPage() {
    return (
        <div>
            <h1>카카오 로그인 성공!</h1>
            <h2>인증 토큰 발급 완료</h2>
        </div>
    )
}

export function LoginFailPage() {
    return (
        <div>
            <h1>로그인에 실패했어요ㅠㅠ</h1>
            <a href={LOGIN_URL}>다시 로그인하기</a>
        </div>
    )
}

