import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
}

export default function JoinButton({ children }: IProps) {
    return (
        <button className="w-[288px] h-34 rounded-5 bg-blue-700 text-white">{children}</button>
    )
}