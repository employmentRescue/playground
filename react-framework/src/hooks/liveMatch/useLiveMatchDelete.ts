import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { LIVE_MATCH_LIST } from './useLiveMatchListQuery';

const fetcher = (liveId?: number) => axios.delete(SERVER_URL + '/live' + `/${liveId}`);

const useLiveMatchDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(fetcher, {
        onSuccess: () => {
            queryClient.invalidateQueries(LIVE_MATCH_LIST, { refetchInactive: true });
            location.reload();
        },
    });
};
export default useLiveMatchDelete;        