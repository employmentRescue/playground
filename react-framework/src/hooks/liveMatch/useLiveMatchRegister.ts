import { liveMatch } from '@/models/liveMatch';
import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { LIVE_MATCH_LIST } from './useLiveMatchListQuery';

const fetcher = (liveMatch: liveMatch) => axios.post(SERVER_URL + '/live/register', { currentPeopleNum: liveMatch.currentPeopleNum, detail: liveMatch.detail, hostId: liveMatch.hostId, place: liveMatch.place, registTime: liveMatch.registTime, sports: liveMatch.sports, totalPeopleNum: liveMatch.totalPeopleNum });

const useLiveMatchRegister = () => {
    const queryClient = useQueryClient();
    return useMutation(fetcher, {
        onSuccess: () => queryClient.invalidateQueries(LIVE_MATCH_LIST, { refetchInactive: true }),
    });
};

export default useLiveMatchRegister;    