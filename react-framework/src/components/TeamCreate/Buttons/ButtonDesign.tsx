interface Iprops {
    innerText: string;
    className: string;
    onClick: any;
}

export default function ButtonDesign({ innerText, className, onClick }: Iprops) {
    return (
        <button
            className={"rounded-5 font-inter tracking-tight self-center border-1 border-blue-700 " + className}
            onClick={onClick}
        >
            {innerText}
        </button>
    )
}