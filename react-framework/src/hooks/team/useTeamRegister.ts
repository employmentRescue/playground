import { team } from '@/models/team';
import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Link, redirect, RedirectFunction, useNavigate } from 'react-router-dom';

const fetcher = (team: team) => axios.post(SERVER_URL + '/team/register',
  {
    gameType: team.gameType,
    level: team.level,
    name: team.name,
    sports: team.sports,
    teamMemberList: team.teamMemberList
  }
);

const useTeamRegister = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.replace('/menu/team')
  },
  });
};

export default useTeamRegister;    