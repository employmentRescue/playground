interface Iprops {
    innerText: string;
    className: string;
    onClick: any;
}

export default function ButtonDesign({ innerText, className, onClick }: Iprops) {
    return (
        <button
            className={"rounded-5 font-inter text-16 tracking-tight self-center " + className}
            onClick={onClick}
        >
            {innerText}
        </button>
    )
}