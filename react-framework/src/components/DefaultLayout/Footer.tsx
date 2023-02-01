import home from "@/assets/icons/home.png"
import search from "@/assets/icons/search.png"
import teamMatch from "@/assets/icons/team-match.png"
import totalList from "@/assets/icons/total-list.png"

export default function HomePage() {
    return (
        <div className="w-full h-55 pl-28 pr-28 flex justify-between items-center border-t-1 border-gray-600 bg-white ">
            <div className="w-17 h-17 flex flex-col justify-center items-center">
                <img className="w-17 h-17" src={home}></img>
                <div className="text-8 text-gray-700">홈</div>
            </div>
            <div className="w-17 h-17 flex flex-col justify-center items-center">
                <img className="w-17 h-17" src={home}></img>
                <div className="text-8 text-gray-700">홈</div>
            </div>
            <div className="w-17 h-17 flex flex-col justify-center items-center">
                <img className="w-17 h-17" src={home}></img>
                <div className="text-8 text-gray-700">홈</div>
            </div>
            <div className="w-17 h-17 flex flex-col justify-center items-center">
                <img className="w-17 h-17" src={home}></img>
                <div className="text-8 text-gray-700">홈</div>
            </div>
        </div>
    )
}