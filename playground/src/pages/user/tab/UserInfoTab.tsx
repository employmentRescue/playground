import { useState, useRef } from "react";
import { Slider } from "@mui/material"
import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"
import NicknameCheckButton from "@/components/userRegister/Buttons/NicknameCheckButton"


type TimeState = number | number[]

const initialTimeState: TimeState = [0, 24]

export default function UserInfoTab() {
    const [favoriteTime, setFavoriteTime] = useState(initialTimeState);

    const handleChange = (event: Event, value: number | number[]) => {
        setFavoriteTime(value)
        console.log(value)
    }

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

    const nicknameInput = useRef(null);

    return (
        // calc안의 100vh-146은 탭이 끝나는 지점부터의 높이를 의미
        <div className="flex flex-col h-[calc(100vh-149px)] justify-between">
            <div className="flex flex-col mt-37 self-center">
                <h2 className="font-inter text-19 font-bold text-center">닉네임을 설정해주세요</h2>
                <div className="flex justify-center mt-35">
                    <input type="text" className="border-b-2 mx-11 border-gray-600 w-160 h-26" ref={nicknameInput} />
                    <NicknameCheckButton nicknameCheck={() => {
                        console.log(nicknameInput)
                    }} />
                </div>

                <div className="flex mt-37 self-center justify-center">
                    <h2 className="text-19 font-inter font-bold">선호시간을 입력해주세요<span className="text-gray-600">(선택)</span></h2>
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

            <div className="self-center">
                <ChoiceCompoleteButton />
            </div>
        </div>
    )
}


