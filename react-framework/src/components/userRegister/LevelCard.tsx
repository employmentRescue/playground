import LevelButton from "./Buttons/LevelButton";
import { useSelector } from "react-redux"
import { User } from "@/stores/register/user"

interface userState {
    user: User
}

interface ClassNameProps {
    className: any;
    imageSrc: any;
    imageSize: any;
    onClick?: any;
    innerText?: any;
    sportName: "football" | "basketball" | "badminton" | null;
}

export default function LevelCard({ className, imageSrc, imageSize, onClick, innerText, sportName }: ClassNameProps) {

    const userSportsLevel = useSelector((state: userState) => {
        if (sportName == "football") {
            return state.user.sportsLevel.football;
        }
        else if (sportName == "basketball") {
            return state.user.sportsLevel.basketball;
        }
        else {
            return state.user.sportsLevel.badminton;
        }
    })

    return (
        <div
            className={"flex rounded-15 " + className}
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
                    <LevelButton
                        level="입문"
                        sportName={sportName}
                        className={userSportsLevel == "입문" ? "text-white bg-blue-700 border-1 border-white" : "text-blue-700 bg-white border-1 border-blue-700"}
                    />
                    <LevelButton
                        level="초수"
                        sportName={sportName}
                        className={userSportsLevel == "초수" ? "text-white bg-blue-700 border-1 border-white" : "text-blue-700 bg-white border-1 border-blue-700"}
                    />
                    <LevelButton
                        level="중수"
                        sportName={sportName}
                        className={userSportsLevel == "중수" ? "text-white bg-blue-700 border-1 border-white" : "text-blue-700 bg-white border-1 border-blue-700"}
                    />
                    <LevelButton
                        level="고수"
                        sportName={sportName}
                        className={userSportsLevel == "고수" ? "text-white bg-blue-700 border-1 border-white" : "text-blue-700 bg-white border-1 border-blue-700"}
                    />
                </div>
            </div>

        </div>
    )
}