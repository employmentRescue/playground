import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (variables: { matchId: number, result: string, teamId: number }) => axios.put(SERVER_URL + `/match/record/${variables.matchId}`, { result: variables.result, teamId: variables.teamId });

const useTeamMatchResultRegister = () => {
  return useMutation(fetcher,
    {
      onError: () => alert("올바른 매칭 결과가 아니거나 만료된 매치입니다.")
  });
};

export default useTeamMatchResultRegister;    