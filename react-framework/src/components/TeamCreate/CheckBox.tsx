import checkMark from "@/assets/icons/white-check-mark.png"

interface Iprops {
    isSelected: boolean
}

export default function CheckBox({ isSelected }: Iprops) {
    return (
        <div className={"w-18 h-18 p-1 rounded-10 " + (isSelected ? "bg-blue-700" : "bg-white")} />
    )
}