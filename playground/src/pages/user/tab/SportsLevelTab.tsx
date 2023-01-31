import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"
import soccerImg from "@/assets/icons/soccer-bg-colored.png"
import basketballImg from "@/assets/icons/basketball-bg-colored.png"
import badmintonImg from "@/assets/icons/badminton-bg-colored.png"
import LevelCard from "@/components/userRegister/LevelCard"

export default function SportsLevelTab() {
    return (
        <div className="flex flex-col h-[calc(100vh-149px)] justify-between">
            <div className="flex flex-col mt-37 self-center">
                <h1 className="font-inter text-19 font-bold text-center mb-40">운동 레벨을 선택해주세요</h1>
                <div>
                    <div className="flex">
                        <LevelCard 
                            className={"w-[300px] h-120 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "}
                            imageSrc={soccerImg}
                            imageSize={"w-40 h-40 mr-20 mt-4"}
                            innerText="축구"
                        />
                    </div>
                    <LevelCard className={"w-[300px] h-120 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "} imageSrc={basketballImg} imageSize={"w-40 h-40"}/>    
                    <LevelCard className={"w-[300px] h-120 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "} imageSrc={badmintonImg} imageSize={"w-40 h-40"}/>    
                </div>
            </div>
            <div className="self-center">
                <ChoiceCompoleteButton />
            </div>
        </div>
    )
}