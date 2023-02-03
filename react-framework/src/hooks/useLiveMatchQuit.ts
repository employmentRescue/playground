import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { LIVE_MATCH_LIST } from './useLiveMatchListQuery';

const SERVER_URL = "https://192.168.31.79:8080/live/leave";

const fetcher = (variables: { liveId?: number, memberId?: number }) => axios.delete(SERVER_URL, { params: { liveId: variables.liveId, memberId: variables.memberId } });

const useLiveMatchQuit = () => {
    const queryClient = useQueryClient();
    return useMutation(fetcher, {
        onSuccess: () => queryClient.invalidateQueries(LIVE_MATCH_LIST, { refetchInactive: true }),
    });
};
export default useLiveMatchQuit;    