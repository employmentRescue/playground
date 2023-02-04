import { Profile } from "./Profile"

interface SpeechBubbleProps {
    isMine: boolean
    innerText: string
    profile: string
}

export function SpeechBubble({ innerText, isMine, profile }: SpeechBubbleProps) {
    let bubbleReverse = ""
    let squareBgColor = ""
    let triangleBgColor = ""
    if (isMine) {
        bubbleReverse = "-scale-x-100 "
        squareBgColor = "bg-blue-100 "
        triangleBgColor = "border-b-blue-100 "
    } else {
        squareBgColor = "bg-white "
        triangleBgColor = "border-b-white "
    }
    return (
        <div className={"flex bg-gray-100 " + bubbleReverse}>
            <Profile profile={profile} className="mt-5 ml-10" />
            <div className={"border-b-12 border-l-transparent border-l-0 border-r-16 border-r-transparent border-solid rotate-180 mt-20 ml-5 " + triangleBgColor}>

            </div>
            <div className="flex w-[200px] my-10">
                <div className={"w-auto h-auto -ml-2 rounded-10 p-12 font-inter text-15 tracking-tight justify-self-start " + bubbleReverse + squareBgColor}>
                    <p>{innerText}</p>
                </div>
            </div>
        </div>
    )
}