import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeIndex } from "@/stores/registerTab/registerTab";

type IndexState = {
    registerTab: { currentIndex: 0 | 1 | 2 }
};

export default function ChoiceCompoleteButton() {
    const dispatch = useDispatch();
    const currentIndex = useSelector((state: IndexState) => {
        return state.registerTab.currentIndex
    })
    return (
        <button
            onClick={() =>
                dispatch(activeIndex(currentIndex + 1)
                )}
            className="w-[300px] h-38 rounded-5 bg-blue-700 text-15 mb-32 text-white"
        >
            선택 완료
        </button>
    )
}