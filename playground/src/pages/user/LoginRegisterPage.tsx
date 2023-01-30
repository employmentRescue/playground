import { useState } from "react"
import UserInfoTab from "./tab/UserInfoTab"
import FavoriteSportsTab from "./tab/FavoriteSportsTab"
import SportsLevelTab from "./tab/SportsLevelTab"

type IndexState = 0 | 1 | 2;

export default function LoginRegisterPage() {
    const [activeIndex, setActiveIndex] = useState(0)
    
    function tabClickHandler(index: IndexState) {
        setActiveIndex(index)
    }
    
    function TabBar(tabName: String, tabNum: IndexState): JSX.Element {

        return (
            <div onClick={() => tabClickHandler(tabNum)} className="mt-40 mb-30">
                <p className="font-inter text-center text-12" >{tabName}</p>
                <div className={"w-92 h-3 mx-6 border-black " + (activeIndex===tabNum ? "bg-blue-700" : "bg-[#bbc0ff]")}>
                </div>
            </div>
        )
    }


    return (
        <div className="w-full">
            <div className="flex justify-center">
                {TabBar("1. 개인정보", 0)}
                {TabBar("2. 관심 운동", 1)}
                {TabBar("3. 운동 레벨", 2)}
            </div>
            <div>
                {activeIndex === 0 && <UserInfoTab />}
                {activeIndex === 1 && <FavoriteSportsTab />}
                {activeIndex === 2 && <SportsLevelTab />}
            </div>
        </div>
    )
}