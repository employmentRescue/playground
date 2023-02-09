interface Iprops {
    userId: number;
    imageSrc: string;
    nickname: string;
    isSelected: boolean;
}

export default function SelectedProfile({ userId, imageSrc, nickname, isSelected }: Iprops) {
    return (
        <div>
            {isSelected && <img src={imageSrc} />}
        </div>
    )
}
