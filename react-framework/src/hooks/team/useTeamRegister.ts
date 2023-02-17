import { team } from '@/models/team';
import { CHATTING_SERVER_URL, SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (team: team) => axios.post(SERVER_URL + '/team/register',
  {
    gameType: team.gameType,
    level: team.level,
    name: team.name,
    sports: team.sports,
    teamMemberList: team.teamMemberList
  }
).then(() => {
  axios.post(CHATTING_SERVER_URL + '/chat/GatheringChatRoom',);

});

const useTeamRegister = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.assign('/menu/team')
    },
  });
};

export default useTeamRegister;    