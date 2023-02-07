import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (variables: { gatheringId?: number, memberId?: number }) => axios.delete(SERVER_URL + '/gathering/leave', { params: { gatheringId: variables.gatheringId, memberId: variables.memberId } });

const useMatchQuit = () => {
  return useMutation(fetcher);
};
export default useMatchQuit;    