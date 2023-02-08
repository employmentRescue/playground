import checkMark from "@/assets/icons/white-check-mark.png"
import { useState } from "react"
import { inviteToMyTeam, dropOutOfMyTeam } from "@/stores/user/myTeam";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";

interface Iprops {
    id: number;
    className: string;
    imageSrc: string;
    nickname: string;
}

export default function CheckBox({ id, imageSrc, className }: Iprops) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const userList = useSelector((state: RootState) => {
        return state.myTeam.memberIds
    })

    const handleOnClick = () => {
        if (checked) {
            console.log(userList)
            dispatch(inviteToMyTeam(id))
        } else {
            console.log(userList)
            dispatch(dropOutOfMyTeam(id))
        }
        setChecked(!checked)
    }
    return (
        <div className={className + (checked ? " bg-blue-700 border-blue-700" : " bg-white")} onClick={handleOnClick}>
            <img src={checkMark} className="flex mx-2 mt-1 w-10 h-10 self-center " />
        </div>
    )
}