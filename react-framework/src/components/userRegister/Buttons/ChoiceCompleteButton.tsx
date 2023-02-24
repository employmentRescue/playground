import { useDispatch, useSelector } from "react-redux";
import { activeIndex } from "@/stores/register/registerTab";
import useKakaoLogin from "@/hooks/login/useKakaoLogin";
import { useState } from "react";
import { RootState } from "@/stores/store";
import { useNavigate } from "react-router-dom";

interface CompleteButtonProps {
    innerText: string
    isNicknameDuplicated?: boolean
}

export default function ChoiceCompoleteButton({ innerText, isNicknameDuplicated }: CompleteButtonProps) {
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

    const navigate = useNavigate();

    const saveInfo = () => {
        kakaoLogin.mutate(info)
    }

    return (
        <button
            onClick={() => {
                // if (isNicknameDuplicated) {
                //     alert("닉네임이 중복되었습니다. 다시 설정해주세요.")
                //     dispatch(activeIndex(0))
                //     return
                // }
                console.log(userInfo)
                if (innerText == "선택 완료") {
                    if (currentIndex == 2) {
                        saveInfo();
                        console.log(info)

                    } else {
                        dispatch(activeIndex(currentIndex + 1))
                    }
                }
                else if (innerText == "운동하러 가기") {
                    navigate("/login")
                }

            }}
            className="w-[300px] h-38 rounded-5 bg-blue-700 text-16 mb-32 text-white tracking-tight "
        >
            {innerText}
        </button>
    )
}
