import { RootState } from "@/stores/store";
import { KAKAO_LOGIN_TEST_SERVER_URL } from "@/utils/url";
import axios from "axios";
import { useMutation } from "react-query"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useKakaoLogin = (code: string) => {
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => {
        console.log(state.userInfo)
        const prefer_activities = [
            { "activity": "football", "level": state.userInfo.sportsLevel.football, "is_preferable": state.userInfo.favoriteSports.football },
            { "activity": "basketball", "level": state.userInfo.sportsLevel.basketball, "is_preferable": state.userInfo.favoriteSports.basketball },
            { "activity": "badminton", "level": state.userInfo.sportsLevel.badminton, "is_preferable": state.userInfo.favoriteSports.badminton }
        ]
        return (
            {
                // status_message: "",
                prefer_time: `${state.userInfo.favoriteTime[0]}-${state.userInfo.favoriteTime[1]}`,
                // web_fcm_token: "",
                // moblie_fcm_token: "",
                // user_profile_img_url: "",
                name: state.userInfo.nickname,
                prefer_activities: prefer_activities,
                nickname: state.userInfo.nickname,
            }
        )
    })

    const fetcher = () => axios.post(KAKAO_LOGIN_TEST_SERVER_URL + `/oauth2/regist?code=` + `${code}`, { ...userInfo });
    return useMutation(fetcher, {
        onSuccess: () => {
            console.log("로그인 성공!")
            alert("로그인 성공!!!!!!!!!!!!!!!!!")
            navigate("/login/register/complete")
        },
        onError: () => {
            console.log("로그인 실패 ㅠㅠ")
            alert("로그인에 실패했어요ㅠㅠ 다시 시도해볼래요?")
            navigate("/login")
        }
    });
};

export default useKakaoLogin;    