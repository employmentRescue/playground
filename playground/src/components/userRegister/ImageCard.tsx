interface ClassNameProps {
    className: any;
    imageProps: any;
    onClick?: any;
}

export default function ImageCard({ className, imageProps, onClick }: ClassNameProps) {
    return (
        <div
            className={"w-80 h-80 rounded-15 " + className}
            onClick={onClick}
        >
            <img src={imageProps} alt="" className="w-42 h-42"/>
        </div>
    )
}