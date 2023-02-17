import axios from 'axios';
import { useQuery } from 'react-query';
import { SERVER_URL, LOCAL_SERVER_URL } from '@/utils/url';
import { matchList } from '@/models/matchList';

export const GATHERING_LIST = '/match';

const fetcher = (matchList: matchList) => axios.get(SERVER_URL + '/gathering',
    {
        params: {
            startDate: matchList.startDate,
            lat: matchList.lat,
            lng: matchList.lng,
            distance: matchList.distance,
            minStartTime: matchList.minStartTime,
            maxStartTime: matchList.maxStartTime,
            level: matchList.level,
            minPlayTime: matchList.minPlayTime,
            maxPlayTime: matchList.maxPlayTime,
            sex: matchList.sex,
            sports: matchList.sports,
            gameType: matchList.gameType,
            sort: matchList.sort,
        }
    }
).then(({ data }) => data)


const useGatheringListQuery = (matchList: matchList) => {
    return useQuery([GATHERING_LIST, matchList], () => fetcher(matchList), { staleTime: 0, cacheTime: 60 * 5 * 1000, refetchInterval: 30 * 1000, refetchOnWindowFocus: false });
}

export default useGatheringListQuery;