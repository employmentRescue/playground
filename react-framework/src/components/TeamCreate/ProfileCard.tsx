import CheckBox from "./CheckBox";

interface ClassNameProps {
    className: string;
    imageSrc: string;
    imageSize: string;
    onClick?: any;
    nickname: string;
    isSelected: boolean;
}

export default function ProfileCard({ className, imageSrc, imageSize, nickname, onClick, isSelected }: ClassNameProps) {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <img src={imageSrc} className={imageSize + " self-center"} />
            <div className="flex flex-col ml-15 my-15 h-35 justify-center w-full place-self-start">
                <h2 className="text-15 font-inter">{nickname}</h2>
            </div>
            <CheckBox isSelected={isSelected} />
        </div>
    )
}