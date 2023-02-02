import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { LIVE_MATCH_LIST } from './useLiveMatchListQuery';


const fetcher = (variables: { liveId?: number, memberId?: number }) => axios.post('https://192.168.31.79:8080/live/join', { liveId: variables.liveId, memberId: variables.memberId });

const useLiveMatchJoin = () => {
    const queryClient = useQueryClient();
    return useMutation(fetcher, {
        onSuccess: () => queryClient.invalidateQueries(LIVE_MATCH_LIST),
    });
};

export default useLiveMatchJoin;    