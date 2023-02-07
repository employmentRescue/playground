import { useSelector } from "react-redux"
import { RootState } from "@/stores/store"
import ProfileModifyButton from "@/components/Profile/Buttons/ProfileModifyButton";
import { useState } from "react";

import myProfileSampleImage from "@/assets/profiles/my-profile-sample.png"
import titleFavoriteSports from "@/assets/profiles/title-favorite-sports.png"
import titleFavoritePlace from "@/assets/profiles/title-favorite-place.png"
import titleFavoriteTime from "@/assets/profiles/title-favorite-time.png"
import footballImage from "@/assets/profiles/auto-match-football.png"
import basketballImage from "@/assets/profiles/auto-match-basketball.png"
import badmintonImage from "@/assets/profiles/auto-match-badminton.png"


export default function ProfileMainPage() {
    const [isClicked, setIsClicked] = useState(false);

    function handleOnClick() {
        setIsClicked(!isClicked)
    }

    const userInfo = useSelector((state: RootState) => {
        return state.userInfo
    });

    console.log(userInfo.favoriteSports)

    return (
        <div>
            <div className="flex flex-col w-full h-[400px] pt-100 pb-85 bg-white justify-start">
                <img src={myProfileSampleImage} className="w-100 h-100 self-center" />
                <p className="mt-20 text-18 text-inter font-extrabold text-center">슬램덩크 {/* userInfo에 있는 팀 이름 */}</p>
                <p className="mt-10 text-15 text-[#969696] text-inter text-center">박진성 {/* userInfo.nickname */}</p>
                <p className="mt-30 w-[300px] self-center text-14 text-[#969696] text-inter text-center">주중 저녁 7시 이후, 주말 오후에 주로 합니다. {/* userInfo.statusMessage */}</p>
            </div>
            <div className="flex flex-col mt-8 w-full h-auto bg-white justify-start">
                <div className="flex ml-30 my-20 text-18 font-inter font-extrabold">
                    <img src={titleFavoriteSports} className="w-20 h-20 mr-8 mt-2" />
                    <p>선호 운동 및 레벨</p>
                </div>
                <div className="flex justify-start px-15 pb-10 text-14 text-center font-inter">
                    {userInfo.favoriteSports.football && <div className="flex-col"><img src={footballImage} className="w-40 mx-40 mt-5" />{userInfo.sportsLevel.football}</div>}
                    {userInfo.favoriteSports.basketball && <div className="flex-col"><img src={basketballImage} className="w-40 mx-40 mt-5" />{userInfo.sportsLevel.basketball}</div>}
                    {userInfo.favoriteSports.badminton && <div className="flex-col"><img src={badmintonImage} className="w-40 mx-40 mt-5" />{userInfo.sportsLevel.badminton}</div>}
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
                        <p className="-ml-15 mt-8 mb-8 text-14 font-normal">18시 ~ 20시{/* userInfo.favoriteTime */}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
