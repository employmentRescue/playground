import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/stores/store"
import myProfileSampleImage from "@/assets/profiles/my-profile-sample.png"
import titleFavoriteSports from "@/assets/profiles/title-favorite-sports.png"
import titleFavoritePlace from "@/assets/profiles/title-favorite-place.png"
import titleFavoriteTime from "@/assets/profiles/title-favorite-time.png"
import footballImage from "@/assets/profiles/auto-match-football.png"
import basketballImage from "@/assets/profiles/auto-match-basketball.png"
import badmintonImage from "@/assets/profiles/auto-match-badminton.png"
import { useEffect } from "react"
import { setTabName } from "@/stores/tab/tabName"
import useGetUserInfo from "@/hooks/user/useGetUserInfo"


export default function ProfileMainPage() {
    const userId = useSelector((state: RootState) => {
        return state.userId
    })
  
  const userInfo = useGetUserInfo(userId)

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTabName('프로필'))
    }, [])

    return (
        <div>
            <div className="flex flex-col w-full h-auto pt-150 bg-[#EEF3FC] justify-start tracking-tight">
                <div className="flex flex-col bg-white">
                    <img src={myProfileSampleImage} className="w-100 h-100 self-center -mt-50" />
                    <p className="mt-12 text-18 text-inter font-extrabold text-center">{userInfo.data?.data.nickname} {/* userInfo.nickname  */}</p>
                    <p className="mt-4 text-16 text-[#969696] text-inter text-center">{userInfo.data?.data.name}{/* "카카오톡"에서 쓰는 닉네임. 아마도 userInfo.name으로 받을 듯 */}</p>
                    <p className="w-[180px] mt-16 mb-36 self-center text-14 text-inter text-center">{userInfo.data?.data.status_message} {/* userInfo.statusMessage */}</p>
                </div>
            </div>
            <div className="flex flex-col mt-8 w-full h-auto bg-white justify-start">
                <div className="flex ml-30 my-20 text-18  font-extrabold">
                    <img src={titleFavoriteSports} className="w-20 h-20 mr-8 mt-2" />
                    <p>선호 운동 및 레벨</p>
                </div>
                <div className="flex justify-start px-15 pb-10 text-14 text-center ">
                    { <div className="flex-col"><img src={footballImage} className="w-40 mx-35 mt-5" />{}</div>}
                    { <div className="flex-col"><img src={basketballImage} className="w-40 mx-35 mt-5" />{}</div>}
                    { <div className="flex-col"><img src={badmintonImage} className="w-40 mx-35 mt-5" />{}</div>}
                </div>

                <div className="flex ml-30 mt-20 mb-8 text-18  font-extrabold">
                    <img src={titleFavoritePlace} className="w-20 h-20 mr-8 mt-2" />
                    <div className="flex flex-col">
                        <p>선호 지역</p>
                        <p className="-ml-15 mt-8 mb-8 text-14 font-normal">서울특별시 양천구 목동동로 111 양천공원{/* userInfo.favoritePlace */}</p>
                    </div>
                </div>


                <div className="flex ml-30 mt-20 mb-8 text-18  font-extrabold">
                    <img src={titleFavoriteTime} className="w-20 h-20 mr-8 mt-2" />
                    <div className="flex flex-col">
                        <p>선호 시간대</p>
                        <p className="-ml-15 mt-8 mb-8 text-14 font-normal">{userInfo.data?.data.prefer_time}{/* userInfo.favoriteTime */}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
