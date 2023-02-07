import { match } from '@/models/match';
import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const fetcher = (match: match) => axios.post(SERVER_URL + '/gathering/register',
  {
    sports: match.sports,
    title: match.title,
    description: match.description,
    place: match.place,
    startDate: match.startDate,
    startTime: match.startTime,
    gameType: match.gameType,
    level: match.level,
    playTime: match.playTime,
    sex: match.sex,
    hostId: match.hostId,
  }
);

const useMatchRegister = () => {
  return useMutation(fetcher);
};

export default useMatchRegister;    