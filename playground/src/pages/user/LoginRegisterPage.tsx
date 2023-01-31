import UserInfoTab from "./tab/UserInfoTab"
import FavoriteSportsTab from "./tab/FavoriteSportsTab"
import SportsLevelTab from "./tab/SportsLevelTab"
import { useDispatch, useSelector } from "react-redux"
import { activeIndex } from "@/stores/register/registerTab"

interface IndexState {
    registerTab: { currentIndex: 0 | 1 | 2 }
};

export default function LoginRegisterPage() {
    const dispatch = useDispatch();
    const currentIndex = useSelector((state: IndexState) => {
        return state.registerTab.currentIndex
    })

    function tabClickHandler(index: number) {
        console.log(`${index}번 탭으로 전환됨`)
        dispatch(activeIndex(index))
    }

    function TabBar(tabName: String, tabNum: number): JSX.Element {

        return (
            <div onClick={() => tabClickHandler(tabNum)} className="mt-40 mb-30">
                <p className="font-inter text-center text-12 mb-3" >{tabName}</p>
                <div className={"w-92 h-3 mx-6 border-black " + (currentIndex === tabNum ? "bg-blue-700" : "bg-[#bbc0ff]")}>
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
                {currentIndex === 0 && <UserInfoTab />}
                {currentIndex === 1 && <FavoriteSportsTab />}
                {currentIndex === 2 && <SportsLevelTab />}
            </div>
        </div>
    )
}
