import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { LIVE_MATCH_LIST } from './useLiveMatchListQuery';

const SERVER_URL = "https://192.168.31.79:8080/live";
const LOCAL_SERVER_URL = 'https://localhost:8080/live'

const fetcher = (liveId?: number) => axios.delete(SERVER_URL + `/${liveId}`);

const useLiveMatchDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(fetcher, {
        onSuccess: () => queryClient.invalidateQueries(LIVE_MATCH_LIST, { refetchInactive: true }),
    });
};
export default useLiveMatchDelete;        