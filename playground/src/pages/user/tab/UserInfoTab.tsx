import React, { useState, useRef } from "react";
import { Slider } from "@mui/material"
import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"
import NicknameCheckButton from "@/components/userRegister/Buttons/NicknameCheckButton"


type TimeState = number | number[]

const initialTimeState: TimeState = [0, 24]

export default function UserInfoTab() {
    const [favoriteTime, setFavoriteTime] = useState(initialTimeState);
    const [nickname, setNickname] = useState("");

    const handleChange = (event: Event, value: number | number[]) => {
        event.preventDefault();
        setFavoriteTime(value)
        console.log(value)
    }

    const handleNickname = (e: React.BaseSyntheticEvent) => {
        // console.log(e.target.value)
        e.preventDefault();
        setNickname(e.target.value)
    }

    let nicknameInput: any = useRef();

    const marks = [
        {
            value: 0,
            label: '0시',
        },
        // {
        //     value: 4,
        //     label: '4시',
        // },
        // {
        //     value: 8,
        //     label: '8시',
        // },
        {
            value: 12,
            label: '12시',
        },
        // {
        //     value: 16,
        //     label: '16시',
        // },
        // {
        //     value: 20,
        //     label: '20시',
        // },
        {
            value: 24,
            label: '24시',
        },

    ];

    function valueText(value: number, index: number) {
        return `${value}시간`
    }

    return (
        // calc안의 100vh-146은 탭이 끝나는 지점부터의 높이를 의미
        <div className="flex flex-col h-[calc(100vh-149px)] justify-between">
            <div className="flex flex-col mt-37 self-center">
                <h2 className="font-inter text-20 font-bold text-center tracking-tight">닉네임을 설정해주세요</h2>
                <div className="flex justify-center mt-35">
                    <input
                        type="text"
                        value={nickname}
                        className="border-b-2 mx-11 border-gray-600 w-160 h-26"
                        onChange={handleNickname}
                        ref={nicknameInput}
                    />
                    <NicknameCheckButton nicknameCheck={() => {
                        if (nickname.length > 10) {
                            alert("닉네임은 10글자 이하만 사용 가능합니다.")
                            nicknameInput.current.focus()
                            setNickname("")
                            return
                        } else {
                            alert("사용 가능한 닉네임 입니다.")
                        }
                        /* 백엔드에 요청해서 중복되는 아이디가 있는지 검사하는 코드 넣기!!


                        */

                        console.log(nickname)
                    }} />
                </div>

                <div className="flex mt-37 self-center justify-center">
                    <h2 className="text-20 font-inter font-bold tracking-tight">선호시간을 입력해주세요<span className="text-gray-600">(선택)</span></h2>
                </div>
                <div className="w-[260px] self-center">
                    <Slider
                        value={favoriteTime}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={24}
                        getAriaValueText={valueText}
                        className="mt-12"
                    />
                </div>
            </div>

            <div className="self-center sticky bottom-0">
                <ChoiceCompoleteButton />
            </div>
        </div>
    )
}


