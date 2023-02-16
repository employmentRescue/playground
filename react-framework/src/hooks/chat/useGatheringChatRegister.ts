import { CHATTING_SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = () => axios.post(CHATTING_SERVER_URL + '/chat/GatheringChatRoom',);

const useGatheringChatRegister = () => {
    return useMutation(fetcher);
};

export default useGatheringChatRegister;    