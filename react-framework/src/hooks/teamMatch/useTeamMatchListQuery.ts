import axios from 'axios';
import { useQuery } from 'react-query';
import { SERVER_URL, LOCAL_SERVER_URL } from '@/utils/url';
import { teamMatchList } from '@/models/teamMatchList';

export const MATCH_LIST = '/match';

const fetcher = (teamMatchList: teamMatchList) => axios.get(SERVER_URL + MATCH_LIST,
    {
        params: {
            matchDate: teamMatchList.matchDate,
            lat: teamMatchList.lat,
            lng: teamMatchList.lng,
            distance: teamMatchList.distance,
            minStartTime: teamMatchList.minStartTime,
            maxStartTime: teamMatchList.maxStartTime,
            sports: teamMatchList.sports,
            gameType: teamMatchList.gameType,
            sort: teamMatchList.sort,
        }
    }
).then(({ data }) => data)


const useTeamMatchListQuery = (teamMatchList: teamMatchList) => {
    return useQuery([MATCH_LIST, teamMatchList], () => fetcher(teamMatchList), { staleTime: 0, cacheTime: 60 * 5 * 1000, refetchInterval: 30 * 1000, refetchOnWindowFocus: false });
}

export default useTeamMatchListQuery;