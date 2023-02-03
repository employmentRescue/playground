import { liveMatch } from '@/models/liveMatch';
import { place } from '@/models/place';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { LIVE_MATCH_LIST } from './useLiveMatchListQuery';

const SERVER_URL = "https://192.168.31.79:8080/live/register";

const fetcher = (liveMatch: liveMatch) => axios.post(SERVER_URL, { currentPeopleNum: liveMatch.currentPeopleNum, detail: liveMatch.detail, hostId: liveMatch.hostId, place: liveMatch.place, registTime: liveMatch.registTime, sports: liveMatch.sports, totalPeopleNum: liveMatch.totalPeopleNum });

const useLiveMatchRegister = () => {
    const queryClient = useQueryClient();
    return useMutation(fetcher, {
        onSuccess: () => queryClient.invalidateQueries(LIVE_MATCH_LIST, { refetchInactive: true }),
    });
};

export default useLiveMatchRegister;    