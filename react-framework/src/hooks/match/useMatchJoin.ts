import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (variables: { gatheringId?: number, memberId?: number }) => axios.post(SERVER_URL + '/gathering/join', { gatheringId: variables.gatheringId, memberId: variables.memberId });

const useMatchJoin = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.reload();
    },
  })
};

export default useMatchJoin;