import { useState } from "react"

interface Iprops {
    imgSrc: string;
    SportsNameEn?: "football" | "basketball" | "Badminton";
    SportsName: "축구" | "농구" | "배드민턴";
    onclick?: any;
}

export default function SportsSelectButton({ imgSrc, SportsName, onclick }: Iprops) {
    const [isSelected, setIsSelected] = useState(false)

    return (
        <div className="flex flex-col">
            <button className={"flex h-30 w-95 mx-9 rounded-15 border-1 justify-center " + (isSelected ? "bg-[#BEE0F7] border-blue-700" : "bg-[#F1F3FF] border-[#F1F3FF]")} onClick={onclick}>
                <img src={imgSrc} className="w-20 h-20 self-center" />
            </button>
            <p className="text-center text-11">{SportsName}</p>
        </div>
    )
}