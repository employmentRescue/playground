import { KAKAO_AUTH_URL } from "@/services/oauth"
import { oauthRedirectHandler } from "@/services/oauthRedirectHandler"

const LOGIN_URL = "http://localhost:3000/login"

export function LoginPage() {
    return (
        <div>
            <h1 className="justify-center">환영합니다</h1>
            <h1 className="text-kakao">당신을 위한 스포츠 팀 매칭 서비스</h1>
            <a href={KAKAO_AUTH_URL}>
                <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                    width="242" />
            </a>
        </div>
    )
}

export function LoginRegisterPage() {
    oauthRedirectHandler();
    return (
        <div>
            <h1>카카오 로그인 성공!</h1>
            <h2>닉네임을 설정해주세요</h2>
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

