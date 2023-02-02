import axios from 'axios';
import { useMutation } from 'react-query';


const fetcher = (variables: { liveId?: number, memberId?: number }) => axios.post('https://192.168.31.79:8080/live/join', { liveId: variables.liveId, memberId: variables.memberId });

const useLiveMatchJoin = () => {
    return useMutation(fetcher);
};

export default useLiveMatchJoin;    