import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const MATCH = '/match';

const fetcher = (keyword: string) => axios.get(SERVER_URL + `/gathering/search/${keyword}`).then(({ data }) => data)

// 좌표를 받아왔을 때만 query
const useGatheringSearchQuery = (keyword: string) => {
    return useQuery(MATCH, () => fetcher(keyword), { cacheTime: 60 * 5 * 1000, refetchInterval: 30 * 1000, refetchOnWindowFocus: false });
}

export default useGatheringSearchQuery;