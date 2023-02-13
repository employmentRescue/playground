import checkMark from "@/assets/icons/white-check-mark.png"
import { useEffect, useState } from "react"
import { inviteToMyTeam, dropOutOfMyTeam } from "@/stores/user/myTeam";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";

interface Iprops {
    userId: number;
    className: string;
    imageSrc: string;
    nickname: string;
    isRecent: boolean;
    toggleCheckBox: () => void;
    onClick?: any;
}

export default function CheckBox({ userId, className, imageSrc, nickname, isRecent, onClick, toggleCheckBox }: Iprops) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false)

    toggleCheckBox = () => {
        setSelected(!selected)
    }

    return (
        <div className={className + (selected ? " bg-blue-700 border-blue-700" : " bg-white")} onClick={() => {
            setSelected(!selected)
        }}>
            <img src={checkMark} className="flex mx-2 mt-1 w-10 h-10 self-center " />
        </div>
    )
}