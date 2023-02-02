interface ClassNameProps {
    className: any;
    imageSrc: any;
    imageSize: any;
    onClick?: any;
}

export default function ImageCard({ className, imageSrc, imageSize, onClick }: ClassNameProps) {
    return (
        <div
            className={"rounded-15 " + className}
            onClick={onClick}
        >
            <img src={imageSrc} className={imageSize} />
        </div>
    )
}