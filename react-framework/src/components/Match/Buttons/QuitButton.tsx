import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}

export default function QuitButton({ children, onClick }: IProps) {
  return (
    <button onClick={onClick} className="w-full h-34 mt-24 rounded-5 bg-red-600 text-15 mb-14 text-white">{children}</button>
  )
}