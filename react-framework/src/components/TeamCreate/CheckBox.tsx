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
}

export default function CheckBox({ userId, className, imageSrc, nickname, isSelected }: Iprops) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(isSelected);
    const userList = useSelector((state: RootState) => {
        return state.myTeam.memberIds
    })

    const handleOnClick = () => {
        if (checked) {
            // console.log(id)
            dispatch(dropOutOfMyTeam(userId))
        } else {
            // console.log(id)
            dispatch(inviteToMyTeam(userId))
        }
        setChecked(!checked)
    }

    useEffect(() =>
        console.log(userList)
        , [userList]
    )

    return (
        <div className={className + (checked ? " bg-blue-700 border-blue-700" : " bg-white")} onClick={handleOnClick}>
            <img src={checkMark} className="flex mx-2 mt-1 w-10 h-10 self-center " />
        </div>
    )
}