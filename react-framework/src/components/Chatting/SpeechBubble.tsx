import { Profile } from "./Profile"

interface SpeechBubbleProps {
    isMine: boolean
    innerText: string
}

export function SpeechBubble({ innerText }: SpeechBubbleProps) {
    return (
        <div className="flex">
            <Profile />
            <div className="border-b-12 border-b-white border-l-transparent border-l-0 border-r-16 border-r-transparent border-solid rotate-180 mt-10">

            </div>
            <div className="flex w-[200px]">
                <div className="w-auto h-auto bg-white rounded-10 p-12 font-inter justify-self-start">
                    <p>{innerText}</p>
                </div>
            </div>
        </div>
    )
}