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
    isRecent: boolean;
    onClick?: any;
}

export default function CheckBox({ userId, className, imageSrc, nickname, isSelected, isRecent, onClick }: Iprops) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(isSelected)
    const memberIds = useSelector((state: RootState) => {
        return state.myTeam.memberIds
    })
    // const handleOnClick = () => {
    //     console.log(isSelected)
    //     dispatch(toggleIsSelected({ userId: userId, isSelected: !isSelected }))
    // }

    // useEffect(() =>
    //     console.log(userList)
    //     , [userList]
    // )
    const handleSelect = () => {
        for (const id of memberIds) {
            if (userId === id) {
                setSelected(true)
            }
        }
    }

    useEffect(() => {
        handleSelect()
    }, [memberIds])

    return (
        <div className={className + (selected ? " bg-blue-700 border-blue-700" : " bg-white")} onClick={() => {
            if (selected) {
                dispatch(dropOutOfMyTeam(userId))
            } else {
                dispatch(inviteToMyTeam(userId))
            }
            setSelected(!selected)
        }}>
            <img src={checkMark} className="flex mx-2 mt-1 w-10 h-10 self-center " />
        </div>
    )
}