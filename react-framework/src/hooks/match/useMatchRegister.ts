import { match } from '@/models/match';
import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const fetcher = (match: match) => axios.post(SERVER_URL,
  {
    title: match.title,
    gameType: match.gameType,
    description: match.description,
    place: match.place,
    startDate: match.startDate,
    startTime: match.startTime,
    hostId: match.hostId,

  }
);

const useMatchRegister = () => {
  return useMutation(fetcher);
};

export default useMatchRegister;    