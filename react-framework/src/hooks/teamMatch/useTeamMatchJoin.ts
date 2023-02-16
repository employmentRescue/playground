import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (matchId: number) => axios.post(SERVER_URL + `/match/join/${matchId}`);

const useTeamMatchJoin = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.assign('/team-match')
    },
  });
};

export default useTeamMatchJoin;    