import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const LIVE_MATCH_LIST = '/live';

const fetcher = (lat: number, lng: number) => axios.get(SERVER_URL + '/live', { params: { lat: lat, lng: lng } }).then(({ data }) => data)

// 좌표를 받아왔을 때만 query
const useLiveMatchListQuery = (lat: number, lng: number) => {
    return useQuery(LIVE_MATCH_LIST, () => fetcher(lat, lng), { staleTime: 30 * 1000, cacheTime: 60 * 5 * 1000, refetchInterval: 30 * 1000, enabled: lat != null, refetchOnWindowFocus: true });
}

export default useLiveMatchListQuery;