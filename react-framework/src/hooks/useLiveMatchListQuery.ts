import axios from 'axios';
import { useQuery } from 'react-query';

export const LIVE_MATCH_LIST = '/live';

// const fetcher = () => axios.get('http://192.168.31.79:8080/live').then(({ data }) => data)
const fetcher = () => axios.get('https://jsonplaceholder.typicode.com/posts/1').then(({ data }) => data)

const useLiveMatchListQuery = () => {
    return useQuery(LIVE_MATCH_LIST, fetcher);
}

export default useLiveMatchListQuery;