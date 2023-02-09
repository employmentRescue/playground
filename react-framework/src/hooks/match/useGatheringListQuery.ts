import axios from 'axios';
import { useQuery } from 'react-query';

export const GATHERING_LIST = '/gathering';
const SERVER_URL = 'https://192.168.31.79:8080/gathering'
const LOCAL_SERVER_URL = 'https://localhost:8080/gathering'

const fetcher = () => axios.get(SERVER_URL).then(({ data }) => data)

// 베겨본 query 
const useGatheringListQuery = () => {
    return useQuery(GATHERING_LIST, () => fetcher(), { staleTime: 30 * 1000, cacheTime: 60 * 5 * 1000, refetchInterval: 30 * 1000, refetchOnWindowFocus: false });
}

export default useGatheringListQuery;