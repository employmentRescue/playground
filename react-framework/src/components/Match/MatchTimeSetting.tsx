import useMouse from "@react-hook/mouse-position";
import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Slider } from "@mui/material"
import { RootState } from "@/stores/store";

import closeIcon from "@/assets/icons/exit.png";


export default function MatchTimeSetting({ clicked }: { clicked: () => void }) {
    const [distance, setDistance] = useState('1')
    const valueChange: ComponentProps<'input'>['onChange'] = (event) => {
        setDistance(event.target.value);
    }
    const favoriteTime = useSelector((state: RootState) => {
        return state.userInfo.favoriteTime;
    });

    return (
        <div className="absolute top-[-117px] left-0 w-[360px] h-[745px] m-0 p-0 z-20">
            <div className="absolute top-0 h-3/4 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="absolute bottom-0 left-0 p-0 w-full h-1/4 flex-grow-0 bg-[#fff] z-20">
                <div>
                    <span className="inline-block w-70 h-16 flex-grow-0 mt-13 ml-[145px] font-inter text-[15px] text-left text-[#000]">시간 선택</span>
                    <img src={closeIcon} alt="" className="inline-block top-16 w-10 h-10 flex-grow-0 my-3 ml-[115px]"
                        onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="flex-row h-1/9 justify-center mt-15 mx-18">
                    <Slider
                        // value={favoriteTime}
                        // onChange={handleChange}
                        valueLabelDisplay="auto"
                        defaultValue={favoriteTime}
                        // marks={marks}
                        min={0}
                        max={24}
                        // getAriaValueText={valueText}
                        className="mt-12"
                    />
                    <div className="flex mb-12">
                        <span className="w-26 h-15 flex-grow-0 mt-3 font-inter text-[12px] font-[500] text-left text-[#bbc0ff]">0km</span>
                        <div className="w-23 h-16 flex-grow-0 mt-3 ml-[258px] p-0 text-left text-12 border-solid border-1 border-[#bbc0ff] bg-[#fff]">{distance}</div>
                        <span className="w-26 h-15 flex-grow-0 mt-3 ml-2 font-inter text-[12px] font-[500] text-left text-[#bbc0ff]">km</span>
                    </div>
                    <div className="grid place-content-center h-34 mt-4 w-full text-center bg-[#303eff] rounded-[5px] font-inter font-[15px] text-[#fff]">설정 완료</div>
                </div>
            </div>
        </div>
    )
}