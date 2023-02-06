import { useDispatch, useSelector } from "react-redux";
import { activeIndex } from "@/stores/register/registerTab";
import useKakaoLogin from "@/hooks/login/useKakaoLogin";
import { useState } from "react";
import { RootState } from "@/stores/store";

interface CompleteButtonProps {
    innerText: string
}

export default function ChoiceCompoleteButton({ innerText }: CompleteButtonProps) {
    const dispatch = useDispatch();
    const [info, setInfo] = useState();

    const currentIndex = useSelector((state: RootState) => {
        return state.registerTab.currentIndex
    })
    const userInfo = useSelector((state: RootState) => {
        return state.userInfo
    })
    let code = location.search.split('=')[1];
    const kakaoLogin = useKakaoLogin(code);

    const saveInfo = () => {
        kakaoLogin.mutate(info)
    }

    return (
        <button
            onClick={() => {
                console.log(userInfo)
                if (innerText == "선택 완료") {
                    if (currentIndex == 2) {
                        saveInfo();
                        console.log(info)
                        location.href = "/login/register/complete"
                    } else {
                        dispatch(activeIndex(currentIndex + 1))
                    }
                }
                else if (innerText == "운동하러 가기") {
                    location.href = "/"
                }

            }}
            className="w-[300px] h-38 rounded-5 bg-blue-700 text-16 mb-32 text-white tracking-tight"
        >
            {innerText}
        </button>
    )
}