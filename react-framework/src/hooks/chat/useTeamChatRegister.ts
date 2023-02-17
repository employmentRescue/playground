import { CHATTING_SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = () => axios.post(CHATTING_SERVER_URL + '/chat/GatheringChatRoom',
);

const useTeamChatRegister = () => {
  return useMutation(fetcher);
};

export default useTeamChatRegister;    