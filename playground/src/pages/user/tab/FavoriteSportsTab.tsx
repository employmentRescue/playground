import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"
import ImageCard from "@/components/userRegister/ImageCard"
import soccerImg from "@/assets/icons/soccer-original.png"
import basketballImg from "@/assets/icons/basketball-original.png"
import badmintonImg from "@/assets/icons/badminton-original.png"
import { useDispatch, useSelector } from "react-redux"
import { getFavoriteSports } from "@/stores/register/favoriteSports"

interface FavoriteSportsState {
    favoriteSports: Array<{isSelected: Boolean, sportName: String}>;
}

export default function FavoriteSportsTab() {
    const dispatch = useDispatch();
    const favoriteSports = useSelector((state: FavoriteSportsState) => {
        return state.favoriteSports;
    });

    return (
        <div className="flex flex-col h-[calc(100vh-149px)] justify-between">
            <div className="flex flex-col mt-37 self-center">
                <h1 className="font-inter text-19 font-bold text-center mb-20">관심 운동을 선택해주세요
                    <br />
                    <span className="text-15 text-[#969696]">(복수 선택)</span>
                </h1>
                <div className="flex">
                    <div className="flex-col">
                        <ImageCard 
                            onClick={() => 
                                dispatch(getFavoriteSports({isSelected: !(favoriteSports[0].isSelected), sportName: "soccer"}))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((favoriteSports[0].isSelected) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={soccerImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center font-inter text-11 mt-6">축구</p>
                    </div>
                    <div className="flex-col">
                        <ImageCard
                            onClick={() => 
                                dispatch(getFavoriteSports({isSelected: !(favoriteSports[1].isSelected), sportName: "basketball"}))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((favoriteSports[1].isSelected) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={basketballImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center font-inter text-11 mt-6">농구</p>
                    </div>
                    <div className="flex-col">
                        <ImageCard
                            onClick={() => 
                                dispatch(getFavoriteSports({isSelected: !(favoriteSports[2].isSelected), sportName: "badminton"}))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((favoriteSports[2].isSelected)  ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={badmintonImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center font-inter text-11 mt-6">배드민턴</p>
                    </div>
                    
                </div>
                <div className="self-center">
                    <button onClick={() => console.log(favoriteSports)}>console창에서 선택된 종목 확인</button>
                </div>
            </div>
            
            <div className="self-center">
                <ChoiceCompoleteButton />
            </div>
        </div>

    )
}