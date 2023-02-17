import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const MY_TEAM_INFO = '/my-team-ranking';

const fetcher = (teamId: number, sort: string) => axios.get(SERVER_URL + `/ranking/${teamId}`, { params: { sort: sort } }).then(({ data }) => data)

// 페이지 들어왔을때만 query
const useTeamRankingMyListQuery = (teamId: number, sort: string, tabIndex: number, myTeamList: any) => {
  return useQuery([MY_TEAM_INFO, sort, teamId], () => fetcher(teamId, sort), {
    staleTime: 0, cacheTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false, refetchOnReconnect: false,
    enabled: myTeamList.isSuccess && tabIndex === 2
  });
}

export default useTeamRankingMyListQuery;