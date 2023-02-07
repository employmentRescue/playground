interface Iprops {
    isClicked: boolean;
    className: string;
    onClick: () => void;
}

export default function ProfileModifyButton({ isClicked, className, onClick }: Iprops) {
    return (
        <button onClick={onClick} className={className}>{isClicked ? "완료" : "수정"}</button>
    )
}