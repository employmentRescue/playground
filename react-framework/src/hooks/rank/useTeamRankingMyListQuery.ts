import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const MY_TEAM_INFO = '/my-team-ranking';

const fetcher = (memberId: number) => axios.get(SERVER_URL + `/ranking/${memberId}`).then(({ data }) => data)

// 페이지 들어왔을때만 query
const useMyTeamRankingListQuery = (memberId: number) => {
  return useQuery(MY_TEAM_INFO, () => fetcher(memberId), {
    staleTime: 0, cacheTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false, refetchOnReconnect: false
  });
}

export default useMyTeamRankingListQuery;