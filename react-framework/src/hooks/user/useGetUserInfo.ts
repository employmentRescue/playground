import axios from 'axios';
import { USER_SERVER_URL } from '@/utils/url';
import { useQuery } from 'react-query';

const useGetUserInfo = (userId: number) => {
	const fetcher = () => axios.post(USER_SERVER_URL + "/user/search",
		["status_message", "prefer_time", "prefer_place", "prefer_activities", "nickname", "name", "web_fcm_token", "mobile_fcm_token"]
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
	});
};

export default useGetUserInfo;    