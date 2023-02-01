import { ReactNode } from "react";

interface IProps {
    onClickModify: () => void;
    onClickDelete: () => void;
}

export default function ModifyButton({ onClickModify, onClickDelete }: IProps) {
    return (
        <div className="flex justify-between w-[290px] h-34">
            <button className="w-170 h-34 rounded-5 bg-blue-700 text-15 mb-14 text-white" onClick={onClickModify}>수정하기</button>
            <button className="w-114 h-34 rounded-5 bg-red-600 text-15 mb-14 text-white" onClick={onClickDelete}>삭제하기</button>
        </div>

    )
}