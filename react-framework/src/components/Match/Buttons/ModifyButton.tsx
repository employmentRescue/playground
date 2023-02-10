import { ReactNode } from "react";

interface IProps {
  onClickModify: () => void;
  onClickDelete: () => void;
}

export default function ModifyButton({ onClickModify, onClickDelete }: IProps) {
  return (
    <div className="w-full fixed bottom-55">
      <button onClick={onClickModify} className="w-2/3 h-34 rounded-5 bg-blue-700 text-15 mb-14 text-white">수정하기</button>
      <button onClick={onClickDelete} className="w-1/3 h-34 rounded-5 bg-red-600 text-15 mb-14 text-white">삭제하기</button>
    </div>

  )
}