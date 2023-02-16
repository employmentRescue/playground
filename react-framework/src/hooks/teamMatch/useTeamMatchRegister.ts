import { teamMatch } from '@/models/teamMatch';
import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (teamMatch: teamMatch) => axios.post(SERVER_URL + '/match/register',
  {
    distance: teamMatch.distance,
    matchGameType: teamMatch.matchGameType,
    matchDate: teamMatch.matchDate,
    maxStartTime: teamMatch.maxStartTime,
    minStartTime: teamMatch.minStartTime,
    preferredPlace: teamMatch.preferredPlace,
    teamMatchResultList: teamMatch.teamMatchResultList,
    matchSports: teamMatch.matchSports
  },
);

const useTeamMatchRegister = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.assign('/team-match')
    },
  });
};

export default useTeamMatchRegister;    