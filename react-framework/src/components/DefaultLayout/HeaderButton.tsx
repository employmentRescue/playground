interface Iprops {
    imgSrc: string;
    className: string;
    onClick: () => void;
}

export default function HeaderButton({ imgSrc, onClick, className }: Iprops) {
    return (
        <img src={imgSrc} onClick={onClick} className={className} />
    )
}