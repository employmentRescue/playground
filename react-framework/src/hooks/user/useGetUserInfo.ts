import axios from 'axios';
import { KAKAO_LOGIN_TEST_SERVER_URL } from '@/utils/url';
import { useMutation, useQuery } from 'react-query';

const useGetUserInfo = (userId: number) => {
	const fetcher = () => axios.post(KAKAO_LOGIN_TEST_SERVER_URL + "/user/search",
		["status_message", "prefer_time", "user_profile_img_url", "prefer_activities", "nickname", "name", "web_fcm_token", "mobile_fcm_token"]
		,
		{
			headers: {
				"x-forwarded-for-user-id": userId
			}
		}
	);
	return useQuery('getuser', fetcher, {
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => {
			console.log(error)
		},
		onSettled: () => {
			console.log("되긴 하니?")
		}

	});
};

export default useGetUserInfo;    