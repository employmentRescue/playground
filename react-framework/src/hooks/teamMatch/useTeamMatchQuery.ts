import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const TEAM_MATCH_INFO = '/teamInfo';

const fetcher = (matchId: number) => axios.get(SERVER_URL + `/match/${matchId}`).then(({ data }) => data)

// 좌표를 받아왔을 때만 query
const useTeamMatchQuery = (matchId: number) => {
  return useQuery(TEAM_MATCH_INFO, () => fetcher(matchId), {
    staleTime: 30 * 5 * 1000, cacheTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false
  });
}

export default useTeamMatchQuery;