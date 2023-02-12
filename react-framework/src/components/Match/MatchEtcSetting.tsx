import EtcTypeButton from "./Buttons/EtcTypeButton";

import closeIcon from "@/assets/icons/exit.png";
import filterEtc from "@/assets/icons/filter-etc.png"

type Iprops = {
    level: string,
    playTime: number[],
    sex: string,
    gameType: string,
    clicked: () => void,
    setEtcData: (level: string, playTime: number[], sex: string, gameType: string) => void,
}

type attrType = "startDate" | "location" | "distance" | "startTime" | "level" | "playTime" | "sex" | "sports" | "gameType" | "sort"

// 자동 매칭 필터바 - 기타
export function MatchFilterEtc({ shutOtherWindow, clicked }: { shutOtherWindow: () => void, clicked: () => void }) {
    return (
        <div className=" w-25 h-25 flex-grow-0 mt-7 pt-3 pl-3 rounded-5 bg-[#303eff]" onClick={(e) => { e.preventDefault(); clicked(); shutOtherWindow(); }}>
            <img src={filterEtc} alt="" className="w-20 h-20 flex-grow-0" />
        </div>
    )
}

export function MatchEtcSetting({ level, playTime, sex, gameType, clicked, setEtcData }: Iprops) {


    return (
        <div className="flex flex-col absolute top-[-117px] left-0 w-full h-screen m-0 p-0 z-20">
            <div className="h-1/2 w-full bg-[#000] opacity-50" onClick={(e) => { e.preventDefault(); clicked(); }}></div>
            <div className="justify-center pt-10 w-full h-1/2 flex-grow-0 bg-[#fff] z-20">
                <div className="flex relative place-content-center w-full h-1/6">
                    <span className="w-70 h-16 flex-grow-0  text-[15px] text-left text-[#000]">추가 선택</span>
                    <img src={closeIcon} alt="" className="absolute right-10 w-10 h-10 flex-grow-0 my-3"
                        onClick={(e) => { e.preventDefault(); clicked(); }} />
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="grid place-content-center w-70 h-2/1 flex-grow-0  text-[15px] text-left text-[#000]">수준</span>
                    <div className="flex w-full">
                        <div className="grid place-content-center h-25 m-5 rounded-[5px] border-1 border-solid border-[#303eff] w-50 ">
                            <span className=" text-[12px] font-[500] text-[#303eff]">입문</span>
                        </div>
                        <EtcTypeButton width={50} text={"입문"} selected={true} />
                    </div>
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="grid place-content-center w-70 h-2/1 flex-grow-0  text-[15px] text-left text-[#000]">게임 시간</span>
                    <div className="flex w-full">

                    </div>
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="grid place-content-center w-70 h-2/1 flex-grow-0  text-[15px] text-left text-[#000]">성별</span>
                    <div className="flex w-full">

                    </div>
                </div>
                <div className="relative place-content-center w-full h-1/6 px-17 border-b-1 border-solid-[#dbdbdb]">
                    <span className="grid place-content-center w-70 h-2/1 flex-grow-0  text-[15px] text-left text-[#000]">게임 종류</span>
                    <div className="flex w-full">

                    </div>
                </div>
                <div className="h-1/6 justify-center mb-15 mx-13 pt-10">
                    <div className="grid place-content-center h-34 mt-4 w-full text-center bg-[#303eff] rounded-[5px]  font-[15px] text-[#fff]" onClick={(e) => { e.preventDefault(); clicked(); }}>설정 완료</div>
                </div>
            </div>
        </div>
    )
}