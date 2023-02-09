import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const TEAM_INFO = '/teamInfo';

const fetcher = (teamId: number) => axios.get(SERVER_URL + `/team/${teamId}`).then(({ data }) => data)

// 좌표를 받아왔을 때만 query
const useTeamQuery = (teamId: number) => {
  return useQuery(TEAM_INFO, () => fetcher(teamId), {
    staleTime: Infinity, cacheTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false
  });
}

export default useTeamQuery;