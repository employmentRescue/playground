import { RootState } from "@/stores/store";
import { KAKAO_LOGIN_TEST_SERVER_URL } from "@/utils/url";
import axios from "axios";
import { useMutation } from "react-query"
import { useSelector } from "react-redux";


const useKakaoLogin = (code: string) => {
    const userInfo = useSelector((state: RootState) => {
        const prefer_activities = [
            { "activity": "football", "level": state.userInfo.sportsLevel.football },
            { "activity": "basketball", "level": state.userInfo.sportsLevel.basketball },
            { "activity": "badminton", "level": state.userInfo.sportsLevel.badminton }
        ]
        return (
            {
                // status_message: "",
                prefer_time: `${state.userInfo.favoriteTime[0]}-${state.userInfo.favoriteTime[1]}`,
                // web_fcm_token: "",
                // moblie_fcm_token: "",
                // user_profile_img_url: "",
                prefer_activities: prefer_activities,
                nickname: state.userInfo.nickname,
            }
        )
    })

    const fetcher = () => axios.post(KAKAO_LOGIN_TEST_SERVER_URL + `/oauth2/regist?code=` + `${code}`, { ...userInfo });
    return useMutation(fetcher, {
        onSuccess: () => console.log("성공!")
    });
};

export default useKakaoLogin;    