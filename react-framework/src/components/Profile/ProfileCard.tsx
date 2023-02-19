interface ClassNameProps {
    className: string;
    imageSrc: string;
    imageSize: string;
    onClick?: any;
    name: string;
    nickname: string;
}

export default function ProfileCard({ className, imageSrc, imageSize, name, nickname, onClick }: ClassNameProps) {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <img src={imageSrc} className={imageSize + " self-center"} />
            <div className="flex flex-col ml-25 my-15 h-35 justify-center w-full place-self-start">
                <h1 className="text-16 font-bold mb-5">{name}</h1>
                <h2 className="text-15 text-[#858e94]">{nickname}</h2>
            </div>
        </div>
    )
}