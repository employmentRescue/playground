import checkMark from "@/assets/icons/white-check-mark.png"
import { useEffect, useState } from "react"
import { inviteToMyTeam, dropOutOfMyTeam } from "@/stores/user/myTeam";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { SampleUser } from "@/pages/menu/teamCreate/TeamCreateDefaultPage";

interface Iprops {
    userId: number;
    className: string;
    imageSrc: string;
    nickname: string;
    isSelected: boolean;
    onClick?: any;
    selectedMemberIds: number[];
    selectedMemberInfo: SampleUser[];
    setSelectedMemberIds: any;
    setSelectedMemberInfo: any;
}

export default function CheckBox({ userId, className, imageSrc, nickname, isSelected, onClick, selectedMemberIds, selectedMemberInfo, setSelectedMemberIds, setSelectedMemberInfo }: Iprops) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(isSelected)

    const handleSelect = () => {
        setSelected(!selected)
        selected ? setSelectedMemberIds(selectedMemberIds.filter((memberId) => { return memberId != userId })) : setSelectedMemberIds([...selectedMemberIds, userId])
        selected ? setSelectedMemberInfo(selectedMemberInfo.filter((memberInfo) => { return memberInfo.id != userId })) : setSelectedMemberInfo([...selectedMemberInfo, { id: userId, imageSrc: imageSrc, nickname: nickname, isSelected: isSelected }])
    }

    return (
        <div className={className + (selected ? " bg-blue-700 border-blue-700" : " bg-white")} onClick={handleSelect}>
            <img src={checkMark} className="flex mx-2 mt-1 w-10 h-10 self-center " />
        </div>
    )
}