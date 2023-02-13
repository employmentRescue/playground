import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const TEAM_INFO = '/teamRanking';

const fetcher = (gameType: string, sports: string, sort: string) => axios.get(SERVER_URL + '/ranking', { params: { gameType: gameType, sports: sports, sort: sort } }).then(({ data }) => data)

// 페이지 들어왔을때만 query
const useTeamRankingListQuery = (gameType: string, sports: string, sort: string, filterModal: string) => {
  return useQuery([TEAM_INFO, filterModal === 'none', sort], () => fetcher(gameType, sports, sort), {
    staleTime: 0, cacheTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false, refetchOnReconnect: false
  });
}

export default useTeamRankingListQuery;