import axios from 'axios';
import { useQuery } from 'react-query';

export const LIVE_MATCH_LIST = '/live';

// const fetcher = () => axios.get('http://192.168.31.79:8080/live').then(({ data }) => data)
const fetcher = () => axios.get('https://192.168.31.79:8080/live', { params: { lat: 36.3528192, lng: 127.3102336 } }).then(({ data }) => data)

const useLiveMatchListQuery = () => {
    return useQuery(LIVE_MATCH_LIST, fetcher, { staleTime: 30 * 1000, cacheTime: 60 * 5 * 1000, refetchInterval: 10 * 1000 });
}

export default useLiveMatchListQuery;