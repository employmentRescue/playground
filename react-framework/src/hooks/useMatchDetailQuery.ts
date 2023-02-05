import axios from 'axios';
import { useQuery } from 'react-query';

export const MATCH = '/live';
const SERVER_URL = 'https://192.168.31.79:8080/live'
const LOCAL_SERVER_URL = 'https://localhost:8080/live'

const fetcher = (id: number) => axios.get(SERVER_URL, { params: { id: id } }).then(({ data }) => data)

// 좌표를 받아왔을 때만 query
const useMatchDetailQuery = (id: number) => {
    return useQuery(MATCH, () => fetcher(id), { staleTime: 30 * 1000, cacheTime: 60 * 5 * 1000, refetchInterval: 30 * 1000, refetchOnWindowFocus: false });
}

export default useMatchDetailQuery;