import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const TEAM_INFO_LIST = '/teamInfoList';

const fetcher = (memberId: number) => axios.get(SERVER_URL + `/mypage/team/${memberId}`).then(({ data }) => data)

// 좌표를 받아왔을 때만 query
const useTeamListQuery = (memberId: number) => {
  return useQuery(TEAM_INFO_LIST, () => fetcher(memberId), {
    staleTime: 30 * 5 * 1000, cacheTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false
  });
}

export default useTeamListQuery;