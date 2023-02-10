import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/stores/store"
import { setFavoriteSports, setFavoriteTime, setNickname, setStatusMessage } from "@/stores/register/userInfo"
import LevelCard from "@/components/userRegister/LevelCard"
import ImageCard from "@/components/userRegister/ImageCard"

import myProfileSampleImage from "@/assets/profiles/my-profile-sample.png"
import modifyImage from "@/assets/profiles/modify.png"
import profileModifyImage from "@/assets/profiles/profile-modify.png"
import titleFavoriteSports from "@/assets/profiles/title-favorite-sports.png"
import titleFavoritePlace from "@/assets/profiles/title-favorite-place.png"
import titleFavoriteTime from "@/assets/profiles/title-favorite-time.png"
import footballImg from "@/assets/icons/football-bg-colored.png"
import basketballImg from "@/assets/icons/basketball-bg-colored.png"
import badmintonImg from "@/assets/icons/badminton-bg-colored.png"

import { Slider } from "@mui/material"


export default function ProfileModifyPage() {
    const dispatch = useDispatch();

    const inputTeamNameRef: any = useRef();
    const inputStatusMessageRef: any = useRef();

    const isFavoritefootball = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.football;
    });
    const isFavoriteBasketball = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.basketball;
    });
    const isFavoriteBadminton = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.badminton;
    });
    const nickname = useSelector((state: RootState) => {
        return state.userInfo.nickname;
    });
    const favoriteTime = useSelector((state: RootState) => {
        return state.userInfo.favoriteTime;
    });

    const marks = [
        {
            value: 0,
            label: '0시',
        },
        {
            value: 12,
            label: '12시',
        },
        {
            value: 24,
            label: '24시',
        },
    ];
    function valueText(value: number, index: number) {
        return `${value}시간`
    }
    const handleChange = (event: Event, value: number | number[]) => {
        event.preventDefault();
        const newValue = value as number | number[] as number[]
        // console.log(value)
        dispatch(setFavoriteTime(newValue))
    }

    const getNicknameInput = (event: React.BaseSyntheticEvent) => {
        // console.log(e.target.value)
        event.preventDefault();
        dispatch(setNickname(event.target.value))
    }

    const getStatusMessageInput = (event: React.BaseSyntheticEvent) => {
        // console.log(e.target.value)
        event.preventDefault();
        dispatch(setStatusMessage(event.target.value))
    }

    return (
        <div>


            <div className="flex flex-col w-full h-auto pt-150 bg-[#EEF3FC] justify-start tracking-tight">
                <div className="flex flex-col bg-white">
                    <img src={myProfileSampleImage} className="w-100 h-100 self-center -mt-50" />
                    <img src={profileModifyImage} className="w-25 h-25 self-center ml-70 -mt-25" onClick={console.log} />
                    <div className="flex justify-center">
                        <input onChange={getNicknameInput} className="w-[170px] mt-12 px-25 text-18 text-inter opacity-50 text-center font-extrabold self-center border-b-2 border-[#DBDBDB] outline-none" ref={inputTeamNameRef} placeholder={nickname} />
                        <img src={modifyImage} className="w-15 h-15 -ml-15 mb-10 self-end" onClick={() => inputTeamNameRef.current.focus()} />
                    </div>
                    <p className="mt-4 text-16 text-[#969696] text-inter text-center">카카오톡 닉네임(본명){/* userInfo.nickname */}</p>
                    <div className="flex mt-16 mb-41 self-center ">
                        <input onChange={getStatusMessageInput} className="w-[170px] mt-12 px-25 pb-2 text-14 text-inter opacity-50 text-center font-extrabold self-center border-b-2 border-[#DBDBDB] outline-none" ref={inputStatusMessageRef} placeholder="상태 메시지 입력" />
                        <img src={modifyImage} className="w-15 h-15 -ml-15 mb-10 self-end" onClick={() => inputStatusMessageRef.current.focus()} />
                    </div>
                </div>
            </div>


            <div className="flex flex-col mt-8 w-full h-auto bg-white justify-start">
                <div className="flex ml-30 my-20 text-18 font-inter font-extrabold">
                    <img src={titleFavoriteSports} className="w-20 h-20 mr-8 mt-2" />
                    <p>선호 운동</p>
                </div>
                <div className="flex justify-between self-center">
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "football", isSelected: !(isFavoritefootball) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoritefootball) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={footballImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center font-inter text-11 mt-6">축구</p>
                    </div>
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "basketball", isSelected: !(isFavoriteBasketball) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoriteBasketball) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={basketballImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center font-inter text-11 mt-6">농구</p>
                    </div>
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "badminton", isSelected: !(isFavoriteBadminton) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoriteBadminton) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={badmintonImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center font-inter text-11 mt-6">배드민턴</p>
                    </div>
                </div>


                <div className="flex ml-30 my-20 text-18 font-inter font-extrabold">
                    <img src={titleFavoriteSports} className="w-20 h-20 mr-8 mt-2" />
                    <p>운동 레벨</p>
                </div>
                <div className="flex flex-col self-center">
                    <div className="flex">
                        <LevelCard
                            className={"w-[300px] h-122 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "}
                            imageSrc={footballImg}
                            imageSize={"w-45 h-45 mr-25 mt-4"}
                            innerText="축구"
                            sportName="football"
                        />
                    </div>
                    <div className="flex">
                        <LevelCard
                            className={"w-[300px] h-122 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "}
                            imageSrc={basketballImg}
                            imageSize={"w-45 h-45 mr-25 mt-4"}
                            innerText="농구"
                            sportName="basketball"
                        />
                    </div>
                    <div className="flex">
                        <LevelCard
                            className={"w-[300px] h-122 mb-15 pt-20 pl-20 bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 "}
                            imageSrc={badmintonImg}
                            imageSize={"w-45 h-45 mr-25 mt-4"}
                            innerText="배드민턴"
                            sportName="badminton"
                        />
                    </div>
                </div>


                <div className="flex ml-30 mt-20 mb-8 text-18 font-inter font-extrabold">
                    <img src={titleFavoritePlace} className="w-20 h-20 mr-8 mt-2" />
                    <div className="flex flex-col">
                        <p>선호 지역</p>
                        <p className="-ml-15 mt-8 mb-8 text-14 font-normal">서울특별시 양천구 목동동로 111 양천공원{/* userInfo.favoritePlace */}</p>
                    </div>
                </div>


                <div className="flex ml-30 mt-20 mb-8 text-18 font-inter font-extrabold">
                    <img src={titleFavoriteTime} className="w-20 h-20 mr-8 mt-2" />
                    <div className="flex flex-col">
                        <p>선호 시간대</p>
                    </div>
                </div>
                <div className="w-[260px] self-center mb-10">
                    <Slider
                        value={favoriteTime}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={24}
                        getAriaValueText={valueText}
                        className="mt-5"
                    />
                </div>


            </div>
        </div>
    )
}