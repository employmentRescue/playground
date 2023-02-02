import welcomeImg from "@/assets/welcome/welcome.png"

// 백엔드 서버 Redirect 주소 입력
const SERVER_URL = ""

export default function LoginPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <img className="w-200 rounded-100 shadow-md" src={welcomeImg} />
            <h1 className="text-left font-bold text-35 font-inter mt-65 mb-25">환영합니다</h1>
            <h2 className="text-left font-bold text-20 text-gray-service to-transparent font-inter opacity-50 mt-24 mb-40">당신을 위한 스포츠 팀 매칭 서비스</h2>
            <a href={SERVER_URL}>
                <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                    width="200" />
            </a>
        </div>
    )
}