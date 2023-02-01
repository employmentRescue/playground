import LevelButton from "./Buttons/LevelButton";

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
                <h2 className="font-inter font-extrabold text-11 text-center w-45 mt-6 tracking-tight">{innerText}</h2>
            </div>

            <div className="flex-col text-[#3B485B] text-opacity-75">
                <p className="text-11 tracking-tight leading-14">
                    입문 : {innerText}를 처음 해봄<br />
                    초수 : 동네에서 친구들과 자주함<br />
                    중수 : 동아리를 통해 {innerText}에 익숙함<br />
                    고수 : 사회인 {innerText} 대회 참여 경험<br />
                </p>
                <div className="flex">
                    <LevelButton className={"bg-white border-1 border-blue-700 rounded-5 mr-10 mt-9"} level="입문"></LevelButton>
                    <LevelButton className={"bg-white border-1 border-blue-700 rounded-5 mr-10 mt-9"} level="초수"></LevelButton>
                    <LevelButton className={"bg-white border-1 border-blue-700 rounded-5 mr-10 mt-9"} level="중수"></LevelButton>
                    <LevelButton className={"bg-white border-1 border-blue-700 rounded-5 mr-10 mt-9"} level="고수"></LevelButton>
                </div>
            </div>

        </div>
    )
}