import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const PROMISEDMATCHLIST = '/promised-match-list';

const fetcher = (id: number) => axios.get(SERVER_URL + `/mypage/join/part/${id}`).then(({ data }) => data)

// 좌표를 받아왔을 때만 query
const usePromisedMatchListQuery = (id: number) => {
  return useQuery(PROMISEDMATCHLIST, () => fetcher(id));
}

export default usePromisedMatchListQuery;