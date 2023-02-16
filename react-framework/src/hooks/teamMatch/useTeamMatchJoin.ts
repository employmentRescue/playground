import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (variables: { matchId: number, teamId: number }) => axios.post(SERVER_URL + `/match/join/${variables.matchId}`, { teamId: variables.teamId });

const useTeamMatchJoin = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.assign('/team-match')
    },
  });
};

export default useTeamMatchJoin;    