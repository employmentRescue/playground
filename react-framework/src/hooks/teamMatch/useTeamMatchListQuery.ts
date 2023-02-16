import axios from 'axios';
import { useQuery } from 'react-query';
import { SERVER_URL, LOCAL_SERVER_URL } from '@/utils/url';
import { teamMatchList } from '@/models/teamMatchList';

export const MATCH_LIST = '/match';

const fetcher = (matchDate: string, lat: number, lng: number, distance: number, minStartTime: string, maxStartTime: string, sports: string, gameType: string, sort: string) => axios.get(SERVER_URL + MATCH_LIST,
    {
        params: {
            matchDate: matchDate,
            lat: lat,
            lng: lng,
            distance: distance,
            minStartTime: minStartTime,
            maxStartTime: maxStartTime,
            sports: sports,
            gameType: gameType,
            sort: sort,
        }
    }
).then(({ data }) => data)


const useTeamMatchListQuery = (matchDate: string, lat: number, lng: number, distance: number, minStartTime: string, maxStartTime: string, sports: string, gameType: string, sort: string) => {
    console.log(gameType, sports)
    return useQuery([MATCH_LIST, matchDate, lat, distance, sort, minStartTime, sports, gameType], () => fetcher(matchDate, lat, lng, distance, minStartTime, maxStartTime, sports, gameType, sort),);
}

export default useTeamMatchListQuery;