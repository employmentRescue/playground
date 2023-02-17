import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const MATCH = '/match';

const fetcher = (myUserId: number) => axios.get(SERVER_URL + `/mypage/join/whole/${myUserId}`).then(({ data }) => data)

// 좌표를 받아왔을 때만 query
const useGetMyMatch = (id: number) => {
    return useQuery(MATCH, () => fetcher(id),);
}

export default useGetMyMatch;