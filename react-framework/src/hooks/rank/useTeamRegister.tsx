import { teamInfo } from '@/models/teamInfo';
import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (teamInfo: teamInfo) => axios.post(SERVER_URL + '/team/register',
  {
    gameType: teamInfo.gameType,
    level: teamInfo.level,
    name: teamInfo.name,
    sports: teamInfo.sports,
    teamMemberList: [{ memberId: teamInfo.teamMemberList }]
  }
);

const useTeamRegister = () => {
  return useMutation(fetcher);
};

export default useTeamRegister;    