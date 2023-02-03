import { Profile } from "./Profile"

interface SpeechBubbleProps {
    isMine: boolean
    innerText: string
    profile: string
}

export function SpeechBubble({ innerText, isMine, profile }: SpeechBubbleProps) {
    let bubbleReverse = ""
    if (isMine) {
        bubbleReverse = "-scale-x-100"
    }
    return (
        <div className={"flex " + bubbleReverse}>
            <Profile profile={profile}/>
            <div className="border-b-12 border-b-white border-l-transparent border-l-0 border-r-16 border-r-transparent border-solid rotate-180 mt-20 ml-5">

            </div>
            <div className="flex w-[200px] my-10">
                <div className={"w-auto h-auto bg-white rounded-10 p-12 font-inter text-15 justify-self-start " + bubbleReverse}>
                    <p>{innerText}</p>
                </div>
            </div>
        </div>
    )
}