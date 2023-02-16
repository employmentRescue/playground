interface Iprops {
    innerText: string;
    className: string;
    onClick: any;
}

export default function ButtonDesign({ innerText, className, onClick }: Iprops) {
    return (
        <button
            className={className + " rounded-5 tracking-tight self-center border-1 border-blue-700"}
            onClick={onClick}
        >
            {innerText}
        </button>
    )
}