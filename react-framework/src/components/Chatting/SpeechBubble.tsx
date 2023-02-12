import { Profile } from "./Profile"
import dayjs from "dayjs"

interface SpeechBubbleProps {
    isMine: boolean
    innerText: string
    profile: string
    nickName?: string
    dateTime?: Date
}

export function SpeechBubble({ innerText, isMine, profile, nickName, dateTime }: SpeechBubbleProps) {
    let Reversed = ""
    let squareBgColor = ""
    let triangleBgColor = ""

    function dateTimeFormat(dateTime: Date | undefined) {
        if (dateTime) return dayjs(dateTime).format("hh:mm A")
    }

    if (isMine) {
        Reversed = "-scale-x-100 "
        squareBgColor = "bg-blue-100 "
        triangleBgColor = "border-b-blue-100 "
    } else {
        squareBgColor = "bg-white "
        triangleBgColor = "border-b-white "
    }
    return (
        <div className={"flex bg-gray-100 " + Reversed}>
            <Profile profile={profile} className={"mt-10 ml-15 " + Reversed} />
            <div className={"border-b-12 border-l-transparent border-l-0 border-r-16 border-r-transparent border-solid rotate-180 mt-30 ml-5 " + triangleBgColor}>
            </div>

            <div className="flex flex-col w-auto my-10 mr-50">
                <div className="flex flex-col">
                    <div className={"-mt-5  text-10 tracking-tight " + (isMine && "pt-15 ")}>{nickName}</div>
                    <div className={"flex "}>
                        <div className={"h-auto -ml-2 rounded-10 p-12  text-15 break-all tracking-tight justify-self-start " + squareBgColor + Reversed}>
                            <p>{innerText}</p>
                        </div>
                        <div className={Reversed + "ml-4 self-end text-10"}>
                            <p className="w-48 text-[#969696]">{dateTimeFormat(dateTime)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}