import kakaoLogin from "@/assets/kakaoLogin.png";
import { ButtonDesign } from "@/components/ButtonDesign";

export default function LoginPage() {
    return (
        <div>
            <h1 className="justify-center">환영합니다</h1>
            <h1 className="text-kakao">당신을 위한 스포츠 팀 매칭 서비스</h1>
            <img src={kakaoLogin} alt="" />
            <ButtonDesign />
        </div>
    )
}
