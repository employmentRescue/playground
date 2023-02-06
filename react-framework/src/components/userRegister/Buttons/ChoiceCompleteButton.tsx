import { useDispatch, useSelector } from "react-redux";
import { activeIndex } from "@/stores/register/registerTab";

type IndexState = {
    registerTab: { currentIndex: 0 | 1 | 2 }
};

interface CompleteButtonProps {
    innerText: string
}

export default function ChoiceCompoleteButton({ innerText }: CompleteButtonProps) {
    const dispatch = useDispatch();
    const currentIndex = useSelector((state: IndexState) => {
        return state.registerTab.currentIndex
    })
    const userInfo = useSelector((state: any) => {
        return state.user
    })

    return (
        <button
            onClick={() => {
                console.log(userInfo)
                if (innerText == "선택 완료") {
                    if (currentIndex == 2) {
                        const CODE = location.search.split('=')[1];
                        console.log(CODE)
                        location.href = "/login/register/complete"
                    } else {
                        dispatch(activeIndex(currentIndex + 1))
                    }
                }
                else if (innerText == "운동하러 가기") {
                    location.href = "/"
                }

            }}
            className="w-[300px] h-38 rounded-5 bg-blue-700 text-16 mb-32 text-white tracking-tight"
        >
            {innerText}
        </button>
    )
}