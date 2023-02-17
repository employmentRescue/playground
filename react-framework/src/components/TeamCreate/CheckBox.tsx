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
    isSelected: boolean;
    onClick?: any;
    selectedMemberIds: number[];
    selectedNicknames: string[];
    setSelectedMemberIds: any;
    setSelectedNicknames: any;
}

export default function CheckBox({ userId, className, imageSrc, nickname, isSelected, onClick, selectedMemberIds, selectedNicknames, setSelectedMemberIds, setSelectedNicknames }: Iprops) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(isSelected)

    const handleSelect = () => {
        setSelected(!selected)
        selected ? setSelectedMemberIds(selectedMemberIds.filter((memberId) => { return memberId != userId })) : setSelectedMemberIds([userId, ...selectedMemberIds])
        selected ? setSelectedNicknames(selectedNicknames.filter((name) => { return name != nickname })) : setSelectedNicknames([nickname, ...selectedNicknames])
    }

    return (
        <div className={className + (selected ? " bg-blue-700 border-blue-700" : " bg-white")} onClick={handleSelect}>
            <img src={checkMark} className="flex mx-2 mt-1 w-10 h-10 self-center " />
        </div>
    )
}