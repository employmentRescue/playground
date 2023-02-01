import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    onClick: () => void;
}

export default function JoinButton({ children, onClick }: IProps) {
    return (
        <button onClick={onClick} className="w-[288px] h-34 rounded-5 bg-red-600 text-15 mb-14 text-white">{children}</button>
    )
}