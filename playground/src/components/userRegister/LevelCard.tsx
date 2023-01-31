interface ClassNameProps {
    className: any;
    imageSrc: any;
    imageSize: any;
    onClick?: any;
    innerText?: any;
}

export default function LevelCard({ className, imageSrc, imageSize, onClick, innerText }: ClassNameProps) {
    return (
        <div
            className={"flex rounded-15 " + className}
            onClick={onClick}
        >
            <div>
                <img src={imageSrc} className={imageSize} />
                <h2 className="font-inter text-11 text-center w-40 mt-6">{innerText}</h2>
            </div>
            
            <div className="flex-col">
                <p className="text-11">입문 : 축구를 처음 해봄</p>
                <p className="text-11">초수 : 축구를 몇 번 해봄</p>
                <p className="text-11">중수 : 축구 경기에 익숙함</p>
                <p className="text-11">고수 : </p>
            </div>
            
        </div>
    )
}