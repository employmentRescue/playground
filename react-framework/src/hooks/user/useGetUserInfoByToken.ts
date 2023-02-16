import axios from 'axios';
import { USER_SERVER_URL } from '@/utils/url';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { saveUserId } from '@/stores/user/userId';

const USER_NICKNAMES = '/userNicknames'

const useGetUserInfoByToken = (token: string) => {
    console.log("토큰", token)
    const dispatch = useDispatch();
    const fetcher = () => axios.post(USER_SERVER_URL + "/user/search/",
        [],
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    return useQuery(USER_NICKNAMES, fetcher, {
        onSuccess: (data: any) => {
            console.log("토큰 보냈어?", data)
            dispatch(saveUserId(data.user_id))
        },
        onError: (error) => {
            console.log(error)
        },
    });
};

export default useGetUserInfoByToken;    