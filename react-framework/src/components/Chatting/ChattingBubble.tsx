import { Profile } from "./Profile"

export function ChattingBubble() {
    return (
        <div className="flex">
            <Profile />
            <div className="border-b-36 border-b-white border-l-transparent border-l-0 border-r-24 border-r-transparent border-solid rotate-180">

            </div>
            <div className="w-200 h-100 bg-white rounded-10">

            </div>
        </div>
    )
}