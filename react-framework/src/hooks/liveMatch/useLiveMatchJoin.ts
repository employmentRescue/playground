import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { LIVE_MATCH_LIST } from './useLiveMatchListQuery';

const fetcher = (variables: { liveId?: number, memberId?: number }) => axios.post(SERVER_URL + '/live/join', { liveId: variables.liveId, memberId: variables.memberId });

const useLiveMatchJoin = () => {
    const queryClient = useQueryClient();
    return useMutation(fetcher, {
        onSuccess: () => {
            queryClient.invalidateQueries(LIVE_MATCH_LIST, { refetchInactive: true });
            location.reload();
        },
    });
};

export default useLiveMatchJoin;    